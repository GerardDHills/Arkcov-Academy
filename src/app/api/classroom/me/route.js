import { sql } from '@/lib/db';
import { getViewer } from '@/lib/classroom';
import { json, fail } from '@/lib/classroomApi';

export const dynamic = 'force-dynamic';

export async function GET() {
  const me = await getViewer();
  if (!me) return fail('Please log in.', 401);
  return json({ me });
}

// Parent or guardian contact. Required before a cadet can join a one-on-one.
export async function PATCH(request) {
  const me = await getViewer();
  if (!me) return fail('Please log in.', 401);
  const body = await request.json().catch(() => ({}));
  if (body.grade !== undefined && body.guardian_email === undefined) {
    const g = Number(body.grade);
    if (!(g >= 6 && g <= 12)) return fail('Choose a grade from 6 to 12.');
    await sql`UPDATE users SET grade = ${g}, updated_at = NOW() WHERE id = ${me.id}`;
    return json({ ok: true });
  }
  const { guardian_name, guardian_email } = body;
  const email = String(guardian_email || '').trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return fail('Enter a valid email address.');
  if (email === me.email.toLowerCase()) return fail('Use a parent or guardian’s email, not your own.');
  await sql`UPDATE users SET guardian_name = ${String(guardian_name || '').trim().slice(0, 255) || null},
    guardian_email = ${email}, updated_at = NOW() WHERE id = ${me.id}`;
  return json({ ok: true });
}
