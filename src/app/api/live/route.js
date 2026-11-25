import { sql } from '@/lib/db';
import { getViewer, staffLabel } from '@/lib/classroom';
import { ensureSeed } from '@/lib/seedHealers';
import { json, fail } from '@/lib/classroomApi';

export const dynamic = 'force-dynamic';

// Staff see every session; cadets see sessions for programs they're in.
export async function GET() {
  const me = await getViewer();
  if (!me) return fail('Please log in.', 401);
  await ensureSeed();
  const rows = me.isStaff
    ? await sql`SELECT ls.*, p.title AS program_title, p.slug, u.name AS host_name, u.staff_role, u.role AS host_role
        FROM live_sessions ls JOIN programs p ON p.id = ls.program_id LEFT JOIN users u ON u.id = ls.host_id
        WHERE ls.status <> 'ended' OR ls.ended_at > NOW() - INTERVAL '14 days'
        ORDER BY (ls.status = 'live') DESC, ls.starts_at DESC LIMIT 40`
    : await sql`SELECT ls.*, p.title AS program_title, p.slug, u.name AS host_name, u.staff_role, u.role AS host_role
        FROM live_sessions ls JOIN programs p ON p.id = ls.program_id LEFT JOIN users u ON u.id = ls.host_id
        JOIN enrollments e ON e.program_id = p.id AND e.user_id = ${me.id}
        WHERE ls.status <> 'ended' ORDER BY ls.starts_at LIMIT 20`;
  const programs = me.isStaff ? await sql`SELECT id, title, slug FROM programs ORDER BY id` : [];
  return json({
    sessions: rows.map((r) => ({ ...r, host_label: staffLabel({ role: r.host_role, staff_role: r.staff_role }) })),
    programs,
    me: { id: me.id, name: me.name, isStaff: me.isStaff, isAdmin: me.isAdmin },
  });
}

// Staff schedule a live class session.
export async function POST(request) {
  const me = await getViewer();
  if (!me?.isStaff) return fail('Only approved faculty can schedule sessions.', 403);
  const { programId, title, startsAt, minutes } = await request.json().catch(() => ({}));
  const when = new Date(startsAt);
  if (!programId || !title || Number.isNaN(when.getTime())) return fail('Add a program, title and start time.');
  const mins = Math.min(Math.max(Number(minutes) || 60, 15), 240);
  const [s] = await sql`INSERT INTO live_sessions (program_id, title, host_id, starts_at, minutes)
    VALUES (${Number(programId)}, ${String(title).slice(0, 255)}, ${me.id}, ${when.toISOString()}, ${mins}) RETURNING id`;
  return json({ id: s.id });
}
