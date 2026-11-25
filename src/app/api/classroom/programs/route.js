import { sql } from '@/lib/db';
import { getViewer, progressSummary } from '@/lib/classroom';
import { ensureSeed } from '@/lib/seedHealers';
import { json, fail } from '@/lib/classroomApi';

export const dynamic = 'force-dynamic';

export async function GET() {
  const me = await getViewer();
  if (!me) return fail('Please log in.', 401);
  await ensureSeed();
  const programs = await sql`SELECT p.*, (SELECT COUNT(*)::int FROM program_steps s WHERE s.program_id = p.id) AS step_count
    FROM programs p WHERE p.published = true ORDER BY p.id`;
  const out = [];
  for (const p of programs) {
    const [enr] = await sql`SELECT status FROM enrollments WHERE user_id = ${me.id} AND program_id = ${p.id}`;
    const prog = enr ? await progressSummary(me.id, p.id) : null;
    const [next] = await sql`SELECT id, title, starts_at, status FROM live_sessions
      WHERE program_id = ${p.id} AND status <> 'ended' ORDER BY starts_at LIMIT 1`;
    out.push({ ...p, enrolled: Boolean(enr), done: prog?.done || 0, score: prog?.score ?? null, nextSession: next || null });
  }
  return json({ programs: out, me: { name: me.name, isStaff: me.isStaff, isAdmin: me.isAdmin } });
}
