import { sql } from '@/lib/db';
import { getViewer, stepsFor, progressSummary } from '@/lib/classroom';
import { json, fail, publicStep, gradeQuiz, maybeCertify } from '@/lib/classroomApi';

export const dynamic = 'force-dynamic';

async function load(id) {
  const [step] = await sql`SELECT * FROM program_steps WHERE id = ${Number(id)}`;
  if (!step) return {};
  const [program] = await sql`SELECT * FROM programs WHERE id = ${step.program_id}`;
  return { step, program };
}

export async function GET(_req, { params }) {
  const me = await getViewer();
  if (!me) return fail('Please log in.', 401);
  const { step, program } = await load(params.id);
  if (!step) return fail('Not found', 404);
  const steps = await stepsFor(program.id);
  const i = steps.findIndex((s) => s.id === step.id);
  const [mine] = await sql`SELECT completed, score, attempts, data FROM step_progress WHERE user_id = ${me.id} AND step_id = ${step.id}`;
  return json({
    program: { slug: program.slug, title: program.title, room: program.room, theme: program.theme },
    step: publicStep(step, { reveal: me.isStaff }),
    index: i,
    count: steps.length,
    prev: steps[i - 1]?.id || null,
    next: steps[i + 1]?.id || null,
    mine: mine || null,
  });
}

// Submit work for a step. Quizzes are graded here, on the server.
export async function POST(request, { params }) {
  const me = await getViewer();
  if (!me) return fail('Please log in.', 401);
  const { step, program } = await load(params.id);
  if (!step) return fail('Not found', 404);
  const body = await request.json().catch(() => ({}));
  await sql`INSERT INTO enrollments (user_id, program_id) VALUES (${me.id}, ${program.id}) ON CONFLICT DO NOTHING`;

  let score = null;
  let result = {};
  let data = {};
  if (step.kind === 'quiz') {
    result = gradeQuiz(step, body.answers || []);
    score = result.score;
    data = { answers: body.answers || [] };
  } else if (step.kind === 'simulation') {
    score = Math.max(0, Math.min(100, Math.round(Number(body.score) || 0)));
    data = { log: Array.isArray(body.log) ? body.log.slice(0, 40) : [] };
    result = { score };
  } else if (step.kind === 'activity') {
    const text = String(body.response || '').trim().slice(0, 4000);
    if (!text) return fail('Write your reflection first.');
    data = { response: text };
  }
  const sessionId = body.sessionId ? Number(body.sessionId) : null;

  // Keep the best score across attempts.
  await sql`INSERT INTO step_progress (user_id, step_id, completed, score, attempts, data, session_id, updated_at)
    VALUES (${me.id}, ${step.id}, true, ${score}, 1, ${JSON.stringify(data)}::jsonb, ${sessionId}, NOW())
    ON CONFLICT (user_id, step_id) DO UPDATE SET
      completed = true,
      score = CASE WHEN EXCLUDED.score IS NULL THEN step_progress.score
                   WHEN step_progress.score IS NULL THEN EXCLUDED.score
                   ELSE GREATEST(step_progress.score, EXCLUDED.score) END,
      attempts = step_progress.attempts + 1,
      data = EXCLUDED.data,
      session_id = COALESCE(EXCLUDED.session_id, step_progress.session_id),
      updated_at = NOW()`;

  const certificate = await maybeCertify(me.id, program);
  const summary = await progressSummary(me.id, program.id);
  return json({
    ok: true,
    result,
    step: step.kind === 'quiz' ? publicStep(step, { reveal: true }) : undefined,
    progress: { done: summary.done, total: summary.total, score: summary.score, complete: summary.complete },
    certificate: certificate ? { code: certificate.code } : null,
  });
}
