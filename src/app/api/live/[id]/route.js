import { sql } from '@/lib/db';
import { getViewer, staffLabel, newCode, notify, siteUrl } from '@/lib/classroom';
import { json, fail, publicStep } from '@/lib/classroomApi';

export const dynamic = 'force-dynamic';

async function loadSession(id) {
  const [s] = await sql`SELECT ls.*, p.title AS program_title, p.slug, p.room, p.theme, p.art
    FROM live_sessions ls JOIN programs p ON p.id = ls.program_id WHERE ls.id = ${Number(id)}`;
  return s || null;
}

// Polled every few seconds by everyone in the session.
export async function GET(request, { params }) {
  const me = await getViewer();
  if (!me) return fail('Please log in.', 401);
  const s = await loadSession(params.id);
  if (!s) return fail('Session not found', 404);
  if (!me.isStaff) {
    const [enr] = await sql`SELECT 1 FROM enrollments WHERE user_id = ${me.id} AND program_id = ${s.program_id}`;
    if (!enr) await sql`INSERT INTO enrollments (user_id, program_id) VALUES (${me.id}, ${s.program_id}) ON CONFLICT DO NOTHING`;
  }
  const since = Number(new URL(request.url).searchParams.get('since') || 0);

  if (s.status === 'live') {
    await sql`INSERT INTO session_people (session_id, user_id) VALUES (${s.id}, ${me.id})
      ON CONFLICT (session_id, user_id) DO UPDATE SET last_seen = NOW()`;
  }

  let active = null;
  if (s.active_step_id) {
    const [step] = await sql`SELECT * FROM program_steps WHERE id = ${s.active_step_id}`;
    if (step) {
      const [mine] = await sql`SELECT completed, score FROM step_progress WHERE user_id = ${me.id} AND step_id = ${step.id}
        AND updated_at >= ${s.active_since}`;
      active = { step: publicStep(step, { reveal: me.isStaff }), since: s.active_since, mine: mine || null };
    }
  }

  const people = await sql`SELECT u.id, u.name, u.role, u.staff_role, u.staff_status,
      (u.guardian_email IS NOT NULL) AS has_guardian,
      (sp.last_seen > NOW() - INTERVAL '25 seconds') AS here
    FROM session_people sp JOIN users u ON u.id = sp.user_id
    WHERE sp.session_id = ${s.id} ORDER BY u.name`;

  const myBreakout = (await sql`SELECT b.id, b.staff_id, b.cadet_id, su.name AS staff_name, cu.name AS cadet_name
    FROM breakouts b JOIN users su ON su.id = b.staff_id JOIN users cu ON cu.id = b.cadet_id
    WHERE b.session_id = ${s.id} AND b.status = 'open' AND (b.staff_id = ${me.id} OR b.cadet_id = ${me.id})
    ORDER BY b.id DESC LIMIT 1`)[0] || null;

  const breakouts = me.isStaff
    ? await sql`SELECT b.id, b.status, b.guardian_notified, b.opened_at, su.name AS staff_name, cu.name AS cadet_name
        FROM breakouts b JOIN users su ON su.id = b.staff_id JOIN users cu ON cu.id = b.cadet_id
        WHERE b.session_id = ${s.id} AND b.status = 'open' ORDER BY b.id`
    : [];

  // Chat: the main room, plus my own breakout. Everything is stored for admins.
  const messages = await sql`SELECT m.id, m.body, m.created_at, m.breakout_id, u.name, u.role, u.staff_role, u.staff_status
    FROM session_messages m JOIN users u ON u.id = m.user_id
    WHERE m.session_id = ${s.id} AND m.id > ${since}
      AND (m.breakout_id IS NULL OR m.breakout_id = ${myBreakout?.id || 0})
    ORDER BY m.id LIMIT 100`;

  // Live results for the activity on screen (faculty only).
  let results = [];
  if (me.isStaff && s.active_step_id) {
    results = await sql`SELECT u.name, sp.score, sp.completed FROM step_progress sp JOIN users u ON u.id = sp.user_id
      WHERE sp.step_id = ${s.active_step_id} AND sp.updated_at >= ${s.active_since}
        AND sp.user_id IN (SELECT user_id FROM session_people WHERE session_id = ${s.id})
      ORDER BY u.name`;
  }

  const steps = me.isStaff
    ? await sql`SELECT id, unit, kind, title, minutes FROM program_steps WHERE program_id = ${s.program_id} ORDER BY sort_order, id`
    : [];

  return json({
    session: {
      id: s.id, title: s.title, status: s.status, starts_at: s.starts_at, minutes: s.minutes,
      program_title: s.program_title, slug: s.slug, room: s.room, theme: s.theme, art: s.art,
      breakouts_open: s.breakouts_open, host_id: s.host_id,
    },
    active,
    people: people.map((p) => ({
      id: p.id, name: p.name, here: p.here,
      label: staffLabel(p.staff_status === 'approved' || p.role === 'admin' ? p : {}),
      isStaff: p.role === 'admin' || p.staff_status === 'approved',
      hasGuardian: me.isStaff ? p.has_guardian : undefined,
    })),
    myBreakout,
    breakouts,
    messages: messages.map((m) => ({
      id: m.id, body: m.body, at: m.created_at, name: m.name, breakout: m.breakout_id,
      label: staffLabel(m.staff_status === 'approved' || m.role === 'admin' ? m : {}),
    })),
    results,
    steps,
    me: { id: me.id, name: me.name, isStaff: me.isStaff, isAdmin: me.isAdmin, hasGuardian: Boolean(me.guardian_email) },
  });
}

export async function POST(request, { params }) {
  const me = await getViewer();
  if (!me) return fail('Please log in.', 401);
  const s = await loadSession(params.id);
  if (!s) return fail('Session not found', 404);
  const body = await request.json().catch(() => ({}));
  const action = body.action;

  // Anyone in the session can chat. Messages are kept for admin review.
  if (action === 'message') {
    const text = String(body.body || '').trim().slice(0, 1000);
    if (!text) return fail('Empty message');
    if (s.status !== 'live') return fail('Chat opens when the session is live.');
    let breakoutId = null;
    if (body.breakoutId) {
      const [b] = await sql`SELECT * FROM breakouts WHERE id = ${Number(body.breakoutId)} AND session_id = ${s.id}
        AND status = 'open' AND (staff_id = ${me.id} OR cadet_id = ${me.id})`;
      if (!b) return fail('That breakout is closed.');
      breakoutId = b.id;
    }
    await sql`INSERT INTO session_messages (session_id, breakout_id, user_id, body) VALUES (${s.id}, ${breakoutId}, ${me.id}, ${text})`;
    return json({ ok: true });
  }

  if (!me.isStaff) return fail('Only faculty can do that.', 403);

  switch (action) {
    case 'start':
      await sql`UPDATE live_sessions SET status = 'live', started_at = COALESCE(started_at, NOW()) WHERE id = ${s.id}`;
      return json({ ok: true });

    case 'end':
      await sql`UPDATE live_sessions SET status = 'ended', ended_at = NOW(), breakouts_open = false, active_step_id = NULL WHERE id = ${s.id}`;
      await sql`UPDATE breakouts SET status = 'closed', closed_at = NOW() WHERE session_id = ${s.id} AND status = 'open'`;
      return json({ ok: true });

    case 'push': {
      const stepId = body.stepId ? Number(body.stepId) : null;
      if (stepId) {
        const [ok] = await sql`SELECT 1 FROM program_steps WHERE id = ${stepId} AND program_id = ${s.program_id}`;
        if (!ok) return fail('That lesson is not in this program.');
      }
      await sql`UPDATE live_sessions SET active_step_id = ${stepId}, active_since = NOW() WHERE id = ${s.id}`;
      return json({ ok: true });
    }

    case 'breakouts':
      if (s.status !== 'live') return fail('Start the session first.');
      await sql`UPDATE live_sessions SET breakouts_open = ${Boolean(body.open)} WHERE id = ${s.id}`;
      if (!body.open) await sql`UPDATE breakouts SET status = 'closed', closed_at = NOW() WHERE session_id = ${s.id} AND status = 'open'`;
      return json({ ok: true });

    // One-on-one: only during breakout time in a live class, recorded,
    // and the cadet's parent or guardian is notified with a link to join.
    case 'open_breakout': {
      const [fresh] = await sql`SELECT status, breakouts_open FROM live_sessions WHERE id = ${s.id}`;
      if (fresh.status !== 'live' || !fresh.breakouts_open) return fail('Open breakout time for the class first.');
      const [cadet] = await sql`SELECT u.id, u.name, u.guardian_email, u.guardian_name, u.role, u.staff_status FROM users u
        JOIN session_people sp ON sp.user_id = u.id AND sp.session_id = ${s.id}
        WHERE u.id = ${Number(body.cadetId)}`;
      if (!cadet) return fail('That cadet is not in this session.');
      if (cadet.role === 'admin' || cadet.staff_status === 'approved') return fail('Breakouts are for cadets.');
      if (!cadet.guardian_email) return fail(`${cadet.name} has no parent or guardian email on file, so a one-on-one can't open. Ask them to add one in their classroom page.`);
      const [busy] = await sql`SELECT 1 FROM breakouts WHERE session_id = ${s.id} AND status = 'open' AND (cadet_id = ${cadet.id} OR staff_id = ${me.id})`;
      if (busy) return fail('You or this cadet are already in a breakout.');
      const guardianToken = newCode(24);
      const [b] = await sql`INSERT INTO breakouts (session_id, staff_id, cadet_id, room_name, guardian_email, guardian_token)
        VALUES (${s.id}, ${me.id}, ${cadet.id}, ${`ark-s${s.id}-b${Date.now().toString(36)}`}, ${cadet.guardian_email}, ${guardianToken})
        RETURNING id`;
      const link = `${siteUrl()}/guardian/${guardianToken}`;
      const r = await notify({
        to: cadet.guardian_email,
        subject: `${cadet.name} is in a one-on-one session at Arkcov Academy`,
        body: [
          `Hello${cadet.guardian_name ? ` ${cadet.guardian_name}` : ''},`,
          '',
          `${cadet.name} has just started a one-on-one breakout with ${me.name} (${staffLabel(me)}) during the live class "${s.title}" in the ${s.program_title}.`,
          '',
          'Every one-on-one at Arkcov Academy happens during a full class session, is recorded, and is open to parents and guardians.',
          `You can join or watch here while it is open: ${link}`,
          '',
          'Arkcov Academy',
        ].join('\n'),
        kind: 'breakout',
        refId: b.id,
      });
      await sql`UPDATE breakouts SET guardian_notified = ${r.sent} WHERE id = ${b.id}`;
      return json({ ok: true, breakoutId: b.id, guardianEmailed: r.sent, queued: !r.sent });
    }

    case 'close_breakout':
      await sql`UPDATE breakouts SET status = 'closed', closed_at = NOW() WHERE id = ${Number(body.breakoutId)} AND session_id = ${s.id}`;
      return json({ ok: true });

    default:
      return fail('Unknown action');
  }
}
