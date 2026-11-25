import { sql } from '@/lib/db';
import { getViewer, staffLabel } from '@/lib/classroom';
import { dailyConfigured, ensureRoom, meetingToken } from '@/lib/daily';
import { json, fail } from '@/lib/classroomApi';

export const dynamic = 'force-dynamic';

// Returns a room URL and a short-lived token for the class room or for the
// viewer's own open breakout. Breakouts are always recorded.
export async function POST(request, { params }) {
  const me = await getViewer();
  if (!me) return fail('Please log in.', 401);
  if (!dailyConfigured()) return json({ configured: false });
  const [s] = await sql`SELECT * FROM live_sessions WHERE id = ${Number(params.id)}`;
  if (!s) return fail('Session not found', 404);
  if (s.status !== 'live') return fail('The session is not live yet.');
  const { breakoutId } = await request.json().catch(() => ({}));
  const endsAt = Math.floor(new Date(s.started_at || Date.now()).getTime() / 1000) + (s.minutes + 30) * 60;
  const exp = Math.max(endsAt, Math.floor(Date.now() / 1000) + 15 * 60);
  const name = me.isStaff ? `${me.name} · ${staffLabel(me)}` : me.name;

  try {
    if (breakoutId) {
      const [b] = await sql`SELECT * FROM breakouts WHERE id = ${Number(breakoutId)} AND session_id = ${s.id}
        AND status = 'open' AND (staff_id = ${me.id} OR cadet_id = ${me.id})`;
      if (!b) return fail('That breakout is closed.');
      const url = await ensureRoom(b.room_name, { expSeconds: exp, record: true });
      // The faculty member's token starts the cloud recording on join.
      const token = await meetingToken({ room: b.room_name, userName: name, userId: me.id, owner: b.staff_id === me.id, expSeconds: exp, record: b.staff_id === me.id });
      return json({ configured: true, url, token, recorded: true });
    }
    const room = `ark-session-${s.id}`;
    if (!s.room_name) await sql`UPDATE live_sessions SET room_name = ${room} WHERE id = ${s.id}`;
    const url = await ensureRoom(room, { expSeconds: exp, record: true });
    const token = await meetingToken({ room, userName: name, userId: me.id, owner: me.isStaff, expSeconds: exp, record: false });
    return json({ configured: true, url, token });
  } catch (e) {
    return fail(`Video could not start: ${e.message}`, 502);
  }
}
