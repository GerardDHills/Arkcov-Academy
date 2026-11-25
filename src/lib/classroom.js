import { sql as vercelSql } from '@vercel/postgres';
import { sql } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';

// ---------------------------------------------------------------------------
// Virtual classrooms: programs, lessons, live sessions, breakouts, certificates.
//
// Safeguarding rules (cadets are minors), enforced on the server:
//  1. Staff (professor, advisor, tutor) can work with cadets only after an
//     admin approves them (staff_status = 'approved').
//  2. One-on-one time happens only as a breakout during a live class session
//     that is in progress. Breakouts close when the session ends.
//  3. Every one-on-one breakout is recorded, and the cadet's parent or
//     guardian is notified (with a link to join) when it opens. A cadet
//     without a guardian email on file cannot be placed in a one-on-one.
//  4. There is no private chat. All session and breakout chat is stored and
//     visible to admins; the video tool's own chat is turned off.
// ---------------------------------------------------------------------------

export const STAFF_ROLES = ['professor', 'advisor', 'tutor'];
export const STAFF_LABEL = { professor: 'Professor', advisor: 'Advisor', tutor: 'Tutor' };

let ready = false;
export async function ensureClassroomTables() {
  if (ready) return;
  await vercelSql`ALTER TABLE users ADD COLUMN IF NOT EXISTS staff_role VARCHAR(20)`;
  await vercelSql`ALTER TABLE users ADD COLUMN IF NOT EXISTS staff_status VARCHAR(20)`;
  await vercelSql`ALTER TABLE users ADD COLUMN IF NOT EXISTS staff_type VARCHAR(20)`;
  await vercelSql`ALTER TABLE users ADD COLUMN IF NOT EXISTS staff_title VARCHAR(120)`;
  await vercelSql`ALTER TABLE users ADD COLUMN IF NOT EXISTS guardian_name VARCHAR(255)`;
  await vercelSql`ALTER TABLE users ADD COLUMN IF NOT EXISTS guardian_email VARCHAR(255)`;

  await vercelSql`CREATE TABLE IF NOT EXISTS programs (
    id SERIAL PRIMARY KEY,
    slug VARCHAR(80) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    subtitle TEXT,
    description TEXT,
    building VARCHAR(80),
    room VARCHAR(120),
    theme VARCHAR(40) DEFAULT 'healers',
    pass_score INTEGER DEFAULT 70,
    published BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW()
  )`;
  await vercelSql`CREATE TABLE IF NOT EXISTS program_steps (
    id SERIAL PRIMARY KEY,
    program_id INTEGER REFERENCES programs(id) ON DELETE CASCADE,
    sort_order INTEGER DEFAULT 0,
    unit VARCHAR(120),
    kind VARCHAR(20) NOT NULL,
    title VARCHAR(255) NOT NULL,
    summary TEXT,
    body TEXT,
    media_url TEXT,
    data JSONB DEFAULT '{}'::jsonb,
    minutes INTEGER,
    created_at TIMESTAMP DEFAULT NOW()
  )`;
  await vercelSql`CREATE TABLE IF NOT EXISTS enrollments (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    program_id INTEGER REFERENCES programs(id) ON DELETE CASCADE,
    status VARCHAR(20) DEFAULT 'active',
    started_at TIMESTAMP DEFAULT NOW(),
    completed_at TIMESTAMP,
    UNIQUE(user_id, program_id)
  )`;
  await vercelSql`CREATE TABLE IF NOT EXISTS step_progress (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    step_id INTEGER REFERENCES program_steps(id) ON DELETE CASCADE,
    completed BOOLEAN DEFAULT false,
    score INTEGER,
    attempts INTEGER DEFAULT 0,
    data JSONB DEFAULT '{}'::jsonb,
    session_id INTEGER,
    updated_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(user_id, step_id)
  )`;
  await vercelSql`CREATE TABLE IF NOT EXISTS live_sessions (
    id SERIAL PRIMARY KEY,
    program_id INTEGER REFERENCES programs(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    host_id INTEGER REFERENCES users(id),
    starts_at TIMESTAMP NOT NULL,
    minutes INTEGER DEFAULT 60,
    status VARCHAR(20) DEFAULT 'scheduled',
    room_name VARCHAR(120),
    active_step_id INTEGER,
    active_since TIMESTAMP,
    breakouts_open BOOLEAN DEFAULT false,
    started_at TIMESTAMP,
    ended_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW()
  )`;
  await vercelSql`CREATE TABLE IF NOT EXISTS session_people (
    session_id INTEGER REFERENCES live_sessions(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    first_seen TIMESTAMP DEFAULT NOW(),
    last_seen TIMESTAMP DEFAULT NOW(),
    PRIMARY KEY (session_id, user_id)
  )`;
  await vercelSql`CREATE TABLE IF NOT EXISTS breakouts (
    id SERIAL PRIMARY KEY,
    session_id INTEGER REFERENCES live_sessions(id) ON DELETE CASCADE,
    staff_id INTEGER REFERENCES users(id),
    cadet_id INTEGER REFERENCES users(id),
    room_name VARCHAR(120),
    status VARCHAR(20) DEFAULT 'open',
    guardian_email VARCHAR(255),
    guardian_notified BOOLEAN DEFAULT false,
    guardian_token VARCHAR(40),
    recorded BOOLEAN DEFAULT true,
    opened_at TIMESTAMP DEFAULT NOW(),
    closed_at TIMESTAMP
  )`;
  await vercelSql`CREATE TABLE IF NOT EXISTS session_messages (
    id SERIAL PRIMARY KEY,
    session_id INTEGER REFERENCES live_sessions(id) ON DELETE CASCADE,
    breakout_id INTEGER REFERENCES breakouts(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(id),
    body TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
  )`;
  await vercelSql`CREATE TABLE IF NOT EXISTS certificates (
    id SERIAL PRIMARY KEY,
    code VARCHAR(24) UNIQUE NOT NULL,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    program_id INTEGER REFERENCES programs(id) ON DELETE CASCADE,
    score INTEGER,
    honors VARCHAR(40),
    issued_by INTEGER REFERENCES users(id),
    issued_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(user_id, program_id)
  )`;
  await vercelSql`CREATE TABLE IF NOT EXISTS notifications (
    id SERIAL PRIMARY KEY,
    to_email VARCHAR(255) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    body TEXT NOT NULL,
    kind VARCHAR(40),
    ref_id INTEGER,
    sent BOOLEAN DEFAULT false,
    error TEXT,
    created_at TIMESTAMP DEFAULT NOW()
  )`;
  ready = true;
}

// Fresh user record (role and staff approval can change after login).
export async function getViewer() {
  const token = await getCurrentUser();
  if (!token) return null;
  await ensureClassroomTables();
  const [u] = await sql`SELECT id, email, name, role, staff_role, staff_status, staff_type, staff_title,
    guardian_name, guardian_email FROM users WHERE id = ${token.id}`;
  if (!u) return null;
  return {
    ...u,
    isAdmin: u.role === 'admin',
    isStaff: u.role === 'admin' || (STAFF_ROLES.includes(u.staff_role) && u.staff_status === 'approved'),
  };
}

export function staffLabel(u) {
  if (u.role === 'admin' && !u.staff_role) return 'Dean';
  return STAFF_LABEL[u.staff_role] || 'Cadet';
}

export function newCode(len = 10) {
  const a = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let s = '';
  for (let i = 0; i < len; i++) s += a[Math.floor(Math.random() * a.length)];
  return s;
}

export async function programBySlug(slug) {
  await ensureClassroomTables();
  const [p] = await sql`SELECT * FROM programs WHERE slug = ${slug}`;
  return p || null;
}

export async function stepsFor(programId) {
  return sql`SELECT * FROM program_steps WHERE program_id = ${programId} ORDER BY sort_order, id`;
}

// Score summary: average of graded steps (quiz/simulation) and completion count.
export async function progressSummary(userId, programId) {
  const steps = await stepsFor(programId);
  const rows = await sql`SELECT sp.* FROM step_progress sp JOIN program_steps s ON s.id = sp.step_id
    WHERE sp.user_id = ${userId} AND s.program_id = ${programId}`;
  const byStep = Object.fromEntries(rows.map((r) => [r.step_id, r]));
  const graded = steps.filter((s) => s.kind === 'quiz' || s.kind === 'simulation');
  const scores = graded.map((s) => byStep[s.id]?.score).filter((v) => typeof v === 'number');
  const done = steps.filter((s) => byStep[s.id]?.completed).length;
  return {
    total: steps.length,
    done,
    complete: steps.length > 0 && done === steps.length,
    score: scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / graded.length) : null,
    byStep,
  };
}

// Email: sent through Resend when RESEND_API_KEY is set; otherwise kept in the
// notifications table so admins can see and send it by hand.
export async function notify({ to, subject, body, kind, refId }) {
  const [n] = await sql`INSERT INTO notifications (to_email, subject, body, kind, ref_id)
    VALUES (${to}, ${subject}, ${body}, ${kind || null}, ${refId || null}) RETURNING id`;
  const key = process.env.RESEND_API_KEY;
  if (!key) return { sent: false, queued: true };
  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: process.env.EMAIL_FROM || 'Arkcov Academy <onboarding@resend.dev>',
        to: [to],
        subject,
        text: body,
      }),
    });
    if (!r.ok) throw new Error(`${r.status} ${await r.text()}`);
    await sql`UPDATE notifications SET sent = true WHERE id = ${n.id}`;
    return { sent: true };
  } catch (e) {
    await sql`UPDATE notifications SET error = ${String(e.message).slice(0, 500)} WHERE id = ${n.id}`;
    return { sent: false, error: e.message };
  }
}

export function siteUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_ENV === 'production') return 'https://arkcov-academy.vercel.app';
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return 'http://localhost:3000';
}
