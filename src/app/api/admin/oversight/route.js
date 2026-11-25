import { sql } from '@/lib/db';
import { getViewer, ensureClassroomTables } from '@/lib/classroom';
import { json, fail } from '@/lib/classroomApi';

export const dynamic = 'force-dynamic';

// Safety log for admins: every one-on-one, every guardian notice, all chat.
export async function GET() {
  const me = await getViewer();
  if (!me?.isAdmin) return fail('Admin access required', 403);
  await ensureClassroomTables();
  const breakouts = await sql`SELECT b.id, b.status, b.opened_at, b.closed_at, b.guardian_email, b.guardian_notified, b.recorded,
      su.name AS staff_name, cu.name AS cadet_name, ls.title AS session_title,
      (SELECT COUNT(*)::int FROM session_messages m WHERE m.breakout_id = b.id) AS messages
    FROM breakouts b JOIN users su ON su.id = b.staff_id JOIN users cu ON cu.id = b.cadet_id
    JOIN live_sessions ls ON ls.id = b.session_id ORDER BY b.id DESC LIMIT 100`;
  const notices = await sql`SELECT id, to_email, subject, body, sent, error, created_at FROM notifications ORDER BY id DESC LIMIT 50`;
  const messages = await sql`SELECT m.id, m.body, m.created_at, m.breakout_id, u.name, ls.title AS session_title
    FROM session_messages m JOIN users u ON u.id = m.user_id JOIN live_sessions ls ON ls.id = m.session_id
    ORDER BY m.id DESC LIMIT 200`;
  return json({ breakouts, notices, messages, emailOn: Boolean(process.env.RESEND_API_KEY), videoOn: Boolean(process.env.DAILY_API_KEY) });
}
