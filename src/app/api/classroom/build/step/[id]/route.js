import { sql } from '@/lib/db';
import { getViewer, canBuild } from '@/lib/classroom';
import { cleanStep } from '@/lib/stepInput';
import { json, fail } from '@/lib/classroomApi';

export const dynamic = 'force-dynamic';

export async function PATCH(request, { params }) {
  const me = await getViewer();
  if (!canBuild(me)) return fail('Only the Dean and professors can build curriculum.', 403);
  let st;
  try { st = cleanStep(await request.json()); } catch (e) { return fail(e.message); }
  const rows = await sql`UPDATE program_steps SET unit = ${st.unit}, kind = ${st.kind}, title = ${st.title}, summary = ${st.summary},
    body = ${st.body}, media_url = ${st.media_url}, data = ${JSON.stringify(st.data)}::jsonb, minutes = ${st.minutes}
    WHERE id = ${Number(params.id)} RETURNING id`;
  if (!rows.length) return fail('Lesson not found', 404);
  return json({ ok: true });
}

export async function DELETE(_req, { params }) {
  const me = await getViewer();
  if (!canBuild(me)) return fail('Only the Dean and professors can build curriculum.', 403);
  await sql`UPDATE live_sessions SET active_step_id = NULL WHERE active_step_id = ${Number(params.id)}`;
  await sql`DELETE FROM program_steps WHERE id = ${Number(params.id)}`;
  return json({ ok: true });
}
