import { sql } from '@/lib/db';
import { getViewer, ensureClassroomTables, divisionFor } from '@/lib/classroom';
import { json, fail } from '@/lib/classroomApi';

export const dynamic = 'force-dynamic';

// The Cadet Passport: a cadet's record of lessons, cases, reflections,
// honors and certificates. Cadets see their own; faculty can open any cadet's.
export async function GET(request) {
  const me = await getViewer();
  if (!me) return fail('Please log in.', 401);
  await ensureClassroomTables();
  const asked = Number(new URL(request.url).searchParams.get('user') || 0);
  const userId = asked && me.isStaff ? asked : me.id;

  const [cadet] = await sql`SELECT id, name, grade, created_at FROM users WHERE id = ${userId}`;
  if (!cadet) return fail('Cadet not found', 404);

  const entries = await sql`SELECT sp.step_id, sp.score, sp.data, sp.updated_at, sp.attempts,
      s.title, s.kind, s.code, s.honor, s.unit, p.room, p.slug, p.art, p.building
    FROM step_progress sp JOIN program_steps s ON s.id = sp.step_id JOIN programs p ON p.id = s.program_id
    WHERE sp.user_id = ${userId} AND sp.completed
    ORDER BY sp.updated_at DESC LIMIT 300`;
  const certificates = await sql`SELECT c.code, c.score, c.honors, c.issued_at, p.title, p.room
    FROM certificates c JOIN programs p ON p.id = c.program_id WHERE c.user_id = ${userId} ORDER BY c.issued_at DESC`;

  const stamps = [];
  const seen = new Set();
  for (const e of [...entries].reverse()) {
    if (seen.has(e.slug)) continue;
    seen.add(e.slug);
    stamps.push({ slug: e.slug, room: e.room, art: e.art, building: e.building, first: e.updated_at });
  }
  const honors = [...new Map(entries.filter((e) => e.honor).map((e) => [e.honor, { name: e.honor, earned: e.updated_at, from: e.title }])).values()];
  const journal = entries
    .map((e) => ({ title: e.title, room: e.room, at: e.updated_at, text: e.data?.journal || e.data?.response || null }))
    .filter((j) => j.text);
  const scores = entries.map((e) => e.score).filter((v) => typeof v === 'number');

  return json({
    cadet: { name: cadet.name, grade: cadet.grade, division: divisionFor(cadet.grade), since: cadet.created_at, number: `AC-${String(cadet.id).padStart(5, '0')}` },
    stats: {
      lessons: entries.length,
      cases: entries.filter((e) => e.kind === 'case' || e.kind === 'simulation').length,
      rooms: stamps.length,
      average: scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : null,
    },
    stamps,
    honors,
    journal,
    certificates,
    timeline: entries.slice(0, 40).map((e) => ({ title: e.title, code: e.code, kind: e.kind, room: e.room, slug: e.slug, step: e.step_id, score: e.score, at: e.updated_at, track: e.data?.track || null })),
    viewer: { isStaff: me.isStaff, own: userId === me.id },
  });
}
