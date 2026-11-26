import { sql } from '@/lib/db';
import { getViewer, canBuild } from '@/lib/classroom';
import { ensureSeed } from '@/lib/seedHealers';
import { SYSTEMS } from '@/lib/cases';
import { json, fail } from '@/lib/classroomApi';

export const dynamic = 'force-dynamic';

// Every patient case on campus, for the Case Library. Cadets see approved
// cases; faculty also see drafts so they can review and approve them.
export async function GET() {
  const me = await getViewer();
  if (!me) return fail('Please log in.', 401);
  await ensureSeed();
  const rows = await sql`SELECT s.id, s.title, s.summary, s.minutes, s.code, s.honor, s.reviewed,
      s.data->>'system' AS system, s.data->>'specialty' AS specialty, (s.data->>'emergency')::boolean AS emergency,
      s.data->'patient'->>'name' AS patient, s.data->'patient'->>'age' AS age, s.data->'patient'->>'concern' AS concern,
      COALESCE(s.data->'patient'->>'scene', s.data->'patient'->>'portrait') AS image,
      p.slug AS room_slug, p.room,
      sp.completed, sp.score
    FROM program_steps s JOIN programs p ON p.id = s.program_id
    LEFT JOIN step_progress sp ON sp.step_id = s.id AND sp.user_id = ${me.id}
    WHERE s.kind = 'case' AND (s.reviewed IS NOT FALSE OR ${me.isStaff})
    ORDER BY s.code NULLS LAST, s.id`;
  return json({
    cases: rows,
    systems: SYSTEMS,
    me: { isStaff: me.isStaff, canBuild: canBuild(me), division: me.division },
  });
}
