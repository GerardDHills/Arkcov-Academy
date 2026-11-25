import { sql } from '@/lib/db';
import { ensureClassroomTables, staffLabel } from '@/lib/classroom';
import { dailyConfigured, ensureRoom, meetingToken } from '@/lib/daily';
import { json, fail } from '@/lib/classroomApi';

export const dynamic = 'force-dynamic';

// A parent or guardian opens the link from their email to join or watch
// their cadet's one-on-one while it is open. No account needed.
async function load(token) {
  await ensureClassroomTables();
  if (!token || token.length < 20) return null;
  const [b] = await sql`SELECT b.*, cu.name AS cadet_name, su.name AS staff_name, su.staff_role, su.role AS staff_user_role,
      ls.title AS session_title, ls.minutes, ls.started_at, p.title AS program_title
    FROM breakouts b JOIN users cu ON cu.id = b.cadet_id JOIN users su ON su.id = b.staff_id
    JOIN live_sessions ls ON ls.id = b.session_id JOIN programs p ON p.id = ls.program_id
    WHERE b.guardian_token = ${token}`;
  return b || null;
}

export async function GET(_req, { params }) {
  const b = await load(params.token);
  if (!b) return fail('This link is not valid.', 404);
  return json({
    cadet: b.cadet_name,
    staff: `${b.staff_name} (${staffLabel({ role: b.staff_user_role, staff_role: b.staff_role })})`,
    session: b.session_title,
    program: b.program_title,
    open: b.status === 'open',
    openedAt: b.opened_at,
    closedAt: b.closed_at,
    video: dailyConfigured(),
  });
}

export async function POST(_req, { params }) {
  const b = await load(params.token);
  if (!b) return fail('This link is not valid.', 404);
  if (b.status !== 'open') return fail('This one-on-one has ended.');
  if (!dailyConfigured()) return json({ configured: false });
  const exp = Math.floor(Date.now() / 1000) + 90 * 60;
  const url = await ensureRoom(b.room_name, { expSeconds: exp, record: true });
  const token = await meetingToken({ room: b.room_name, userName: `Guardian of ${b.cadet_name}`, userId: `guardian-${b.id}`, expSeconds: exp });
  return json({ configured: true, url, token });
}
