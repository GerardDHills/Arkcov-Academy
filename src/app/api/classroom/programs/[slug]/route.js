import { sql } from '@/lib/db';
import { getViewer, programBySlug, stepsFor, progressSummary, staffLabel, canBuild } from '@/lib/classroom';
import { ensureSeed } from '@/lib/seedHealers';
import { json, fail, publicStep } from '@/lib/classroomApi';

export const dynamic = 'force-dynamic';

export async function GET(_req, { params }) {
  const me = await getViewer();
  if (!me) return fail('Please log in.', 401);
  await ensureSeed();
  const program = await programBySlug(params.slug);
  if (!program) return fail('Not found', 404);
  const steps = await stepsFor(program.id, { drafts: me.isStaff });
  const [enr] = await sql`SELECT * FROM enrollments WHERE user_id = ${me.id} AND program_id = ${program.id}`;
  const progress = await progressSummary(me.id, program.id);
  const sessions = await sql`SELECT ls.id, ls.title, ls.starts_at, ls.minutes, ls.status, u.name AS host_name, u.staff_role, u.role AS host_role
    FROM live_sessions ls LEFT JOIN users u ON u.id = ls.host_id
    WHERE ls.program_id = ${program.id} AND (ls.status <> 'ended' OR ls.ended_at > NOW() - INTERVAL '7 days')
    ORDER BY (ls.status = 'live') DESC, ls.starts_at LIMIT 8`;
  const [cert] = await sql`SELECT code, score, honors, issued_at FROM certificates WHERE user_id = ${me.id} AND program_id = ${program.id}`;
  const neighbors = await sql`SELECT slug, room, art, kind,
      (SELECT COUNT(*)::int FROM program_steps s WHERE s.program_id = p.id AND s.reviewed IS NOT FALSE) AS step_count
    FROM programs p WHERE p.building_slug = ${program.building_slug || ''} AND p.id <> ${program.id} AND p.published = true
    ORDER BY p.sort_order LIMIT 8`;
  const faculty = await sql`SELECT name, staff_role, staff_title, role FROM users
    WHERE (staff_status = 'approved' AND staff_role IS NOT NULL) ORDER BY staff_role, name LIMIT 12`;
  return json({
    program,
    steps: steps.map((s) => {
      const p = progress.byStep[s.id];
      return { ...publicStep(s, { reveal: me.isStaff }), done: Boolean(p?.completed), score: p?.score ?? null };
    }),
    enrolled: Boolean(enr),
    progress: { total: progress.total, done: progress.done, score: progress.score, complete: progress.complete },
    sessions: sessions.map((s) => ({ ...s, host_label: staffLabel({ role: s.host_role, staff_role: s.staff_role }) })),
    certificate: cert || null,
    neighbors,
    faculty: faculty.map((f) => ({ name: f.name, label: staffLabel(f), title: f.staff_title })),
    me: { id: me.id, name: me.name, isStaff: me.isStaff, isAdmin: me.isAdmin, canBuild: canBuild(me), hasGuardian: Boolean(me.guardian_email), division: me.division, grade: me.grade || null },
  });
}

export async function POST(_req, { params }) {
  const me = await getViewer();
  if (!me) return fail('Please log in.', 401);
  const program = await programBySlug(params.slug);
  if (!program) return fail('Not found', 404);
  await sql`INSERT INTO enrollments (user_id, program_id) VALUES (${me.id}, ${program.id}) ON CONFLICT DO NOTHING`;
  return json({ ok: true });
}

// Room details (title, description, passing score). Dean and professors.
export async function PATCH(request, { params }) {
  const me = await getViewer();
  if (!canBuild(me)) return fail('Only the Dean and professors can edit rooms.', 403);
  const program = await programBySlug(params.slug);
  if (!program) return fail('Not found', 404);
  const b = await request.json().catch(() => ({}));
  const clip = (v, n) => (v == null ? null : String(v).slice(0, n));
  await sql`UPDATE programs SET
    title = COALESCE(${clip(b.title, 255)}, title),
    subtitle = COALESCE(${clip(b.subtitle, 600)}, subtitle),
    description = COALESCE(${clip(b.description, 4000)}, description),
    pass_score = COALESCE(${b.pass_score != null ? Math.min(100, Math.max(0, Number(b.pass_score) || 0)) : null}, pass_score)
    WHERE id = ${program.id}`;
  return json({ ok: true });
}
