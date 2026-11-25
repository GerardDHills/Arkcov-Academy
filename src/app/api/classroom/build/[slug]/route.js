import { sql } from '@/lib/db';
import { getViewer, programBySlug, stepsFor, canBuild } from '@/lib/classroom';
import { ensureSeed } from '@/lib/seedHealers';
import { cleanStep } from '@/lib/stepInput';
import { json, fail } from '@/lib/classroomApi';

export const dynamic = 'force-dynamic';

async function guard(slug) {
  const me = await getViewer();
  if (!canBuild(me)) return { error: fail('Only the Dean and professors can build curriculum.', 403) };
  await ensureSeed();
  const program = await programBySlug(slug);
  if (!program) return { error: fail('Room not found', 404) };
  return { me, program };
}

// Full lessons (with answers) for the builder.
export async function GET(_req, { params }) {
  const g = await guard(params.slug);
  if (g.error) return g.error;
  return json({ program: g.program, steps: await stepsFor(g.program.id) });
}

// Add a lesson to the end of the room's path.
export async function POST(request, { params }) {
  const g = await guard(params.slug);
  if (g.error) return g.error;
  let st;
  try { st = cleanStep(await request.json()); } catch (e) { return fail(e.message); }
  const [{ n }] = await sql`SELECT COALESCE(MAX(sort_order), 0)::int AS n FROM program_steps WHERE program_id = ${g.program.id}`;
  const [row] = await sql`INSERT INTO program_steps (program_id, sort_order, unit, kind, title, summary, body, media_url, data, minutes)
    VALUES (${g.program.id}, ${n + 1}, ${st.unit}, ${st.kind}, ${st.title}, ${st.summary}, ${st.body}, ${st.media_url},
      ${JSON.stringify(st.data)}::jsonb, ${st.minutes}) RETURNING id`;
  return json({ id: row.id });
}

// Reorder: { order: [stepId, stepId, ...] }
export async function PUT(request, { params }) {
  const g = await guard(params.slug);
  if (g.error) return g.error;
  const { order } = await request.json().catch(() => ({}));
  if (!Array.isArray(order)) return fail('Missing order');
  let i = 0;
  for (const id of order) {
    i += 1;
    await sql`UPDATE program_steps SET sort_order = ${i} WHERE id = ${Number(id)} AND program_id = ${g.program.id}`;
  }
  return json({ ok: true });
}
