import { sql } from '@/lib/db';
import { getViewer, progressSummary } from '@/lib/classroom';
import { json, fail } from '@/lib/classroomApi';

export const dynamic = 'force-dynamic';

// Faculty view of cadet progress across programs.
export async function GET() {
  const me = await getViewer();
  if (!me?.isStaff) return fail('Faculty only', 403);
  const rows = await sql`SELECT e.user_id, e.program_id, e.status, e.started_at, u.name, p.title AS program_title, p.slug,
      (u.guardian_email IS NOT NULL) AS has_guardian,
      c.code AS cert_code, c.score AS cert_score
    FROM enrollments e JOIN users u ON u.id = e.user_id JOIN programs p ON p.id = e.program_id
    LEFT JOIN certificates c ON c.user_id = e.user_id AND c.program_id = e.program_id
    WHERE (u.staff_status IS DISTINCT FROM 'approved') AND u.role <> 'admin'
    ORDER BY e.started_at DESC LIMIT 200`;
  const out = [];
  for (const r of rows) {
    const s = await progressSummary(r.user_id, r.program_id);
    out.push({ ...r, done: s.done, total: s.total, score: s.score });
  }
  return json({ roster: out });
}
