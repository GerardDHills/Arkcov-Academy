import { sql } from '@/lib/db';
import { getViewer, canBuild } from '@/lib/classroom';
import { ensureSeed } from '@/lib/seedHealers';
import { BUILDINGS } from '@/lib/rooms';
import { json, fail } from '@/lib/classroomApi';

export const dynamic = 'force-dynamic';

export async function GET() {
  const me = await getViewer();
  if (!me) return fail('Please log in.', 401);
  await ensureSeed();
  const programs = await sql`SELECT p.id, p.slug, p.title, p.subtitle, p.building, p.room, p.art, p.building_slug, p.kind,
      (SELECT COUNT(*)::int FROM program_steps s WHERE s.program_id = p.id) AS step_count
    FROM programs p WHERE p.published = true ORDER BY p.sort_order, p.id`;
  const enrolled = await sql`SELECT e.program_id,
      (SELECT COUNT(*)::int FROM step_progress sp JOIN program_steps s ON s.id = sp.step_id
        WHERE sp.user_id = ${me.id} AND s.program_id = e.program_id AND sp.completed) AS done
    FROM enrollments e WHERE e.user_id = ${me.id}`;
  const byProgram = Object.fromEntries(enrolled.map((e) => [e.program_id, e]));
  const sessions = await sql`SELECT DISTINCT ON (program_id) program_id, id, title, starts_at, status FROM live_sessions
    WHERE status <> 'ended' ORDER BY program_id, (status = 'live') DESC, starts_at`;
  const nextBy = Object.fromEntries(sessions.map((x) => [x.program_id, x]));
  return json({
    buildings: BUILDINGS,
    programs: programs.map((p) => ({
      ...p,
      enrolled: Boolean(byProgram[p.id]),
      done: byProgram[p.id]?.done || 0,
      nextSession: nextBy[p.id] || null,
    })),
    me: { name: me.name, isStaff: me.isStaff, isAdmin: me.isAdmin, canBuild: canBuild(me) },
  });
}
