import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { progressSummary, newCode } from '@/lib/classroom';

export const json = (data, status = 200) => NextResponse.json(data, { status });
export const fail = (error, status = 400) => NextResponse.json({ error }, { status });

const stripQs = (qs) => (qs || []).map(({ q, options }) => ({ q, options }));

// Prepare a step for the viewer: cadets never receive quiz answers or the
// founder's private teaching notes.
export function publicStep(step, { reveal = false } = {}) {
  const data = step.data || {};
  let out = step;
  if (!reveal) {
    if (step.kind === 'quiz') out = { ...step, data: { ...data, questions: stripQs(data.questions) } };
    if (step.kind === 'lesson') {
      const check = data.check || {};
      out = { ...step, data: { ...data, check: { junior: stripQs(check.junior), senior: stripQs(check.senior) } } };
    }
    const { founder_notes, ...rest } = out;
    out = rest;
  }
  return out;
}

export function gradeQuestions(qs = [], answers = []) {
  const results = qs.map((q, i) => ({ correct: Number(answers?.[i]) === q.answer, answer: q.answer, explain: q.explain }));
  const right = results.filter((r) => r.correct).length;
  return { score: qs.length ? Math.round((right / qs.length) * 100) : 100, right, total: qs.length, results };
}

export function gradeQuiz(step, answers) {
  return gradeQuestions(step.data?.questions || [], answers);
}

// Issue the certificate of performance once every step is complete and the
// average graded score meets the program's passing score.
export async function maybeCertify(userId, program, issuedBy = null) {
  const s = await progressSummary(userId, program.id);
  if (!s.complete) return null;
  const score = s.score ?? 100;
  if (score < (program.pass_score || 70)) return null;
  const [have] = await sql`SELECT * FROM certificates WHERE user_id = ${userId} AND program_id = ${program.id}`;
  if (have) return have;
  const honors = score >= 90 ? 'With Distinction' : score >= 80 ? 'With Merit' : null;
  const [c] = await sql`INSERT INTO certificates (code, user_id, program_id, score, honors, issued_by)
    VALUES (${newCode()}, ${userId}, ${program.id}, ${score}, ${honors}, ${issuedBy})
    ON CONFLICT (user_id, program_id) DO NOTHING RETURNING *`;
  await sql`UPDATE enrollments SET status = 'completed', completed_at = NOW()
    WHERE user_id = ${userId} AND program_id = ${program.id}`;
  return c || null;
}
