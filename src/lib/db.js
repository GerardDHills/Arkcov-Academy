import { sql as vercelSql } from '@vercel/postgres';

// Wrapper: Vercel Postgres sql`` returns { rows: [...] }
// This wrapper returns rows directly so existing code works unchanged
// Usage: const result = await sql`SELECT * FROM users` → returns array of rows
export async function sql(strings, ...values) {
  const result = await vercelSql(strings, ...values);
  return result.rows;
}

// Run this once to initialize all tables
// Call POST /api/admin/init-db to trigger this
export async function initializeDatabase() {
  await vercelSql`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      email VARCHAR(255) UNIQUE NOT NULL,
      password_hash VARCHAR(255) NOT NULL,
      name VARCHAR(255) NOT NULL,
      role VARCHAR(20) DEFAULT 'free',
      avatar_url TEXT,
      subscription_status VARCHAR(20) DEFAULT 'active',
      stripe_customer_id VARCHAR(255),
      stripe_subscription_id VARCHAR(255),
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
    )
  `;

  await vercelSql`
    CREATE TABLE IF NOT EXISTS content (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      type VARCHAR(30) NOT NULL,
      thumbnail_url TEXT,
      media_url TEXT,
      trailer_url TEXT,
      access_level VARCHAR(20) DEFAULT 'member',
      category VARCHAR(100),
      tags TEXT[],
      duration_minutes INTEGER,
      release_year INTEGER,
      rating VARCHAR(10),
      featured BOOLEAN DEFAULT false,
      sort_order INTEGER DEFAULT 0,
      published BOOLEAN DEFAULT false,
      created_by INTEGER REFERENCES users(id),
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
    )
  `;

  await vercelSql`
    CREATE TABLE IF NOT EXISTS course_lessons (
      id SERIAL PRIMARY KEY,
      course_id INTEGER REFERENCES content(id) ON DELETE CASCADE,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      media_url TEXT,
      sort_order INTEGER DEFAULT 0,
      duration_minutes INTEGER,
      created_at TIMESTAMP DEFAULT NOW()
    )
  `;

  await vercelSql`
    CREATE TABLE IF NOT EXISTS user_progress (
      id SERIAL PRIMARY KEY,
      user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
      content_id INTEGER REFERENCES content(id) ON DELETE CASCADE,
      lesson_id INTEGER REFERENCES course_lessons(id) ON DELETE SET NULL,
      progress_percent REAL DEFAULT 0,
      completed BOOLEAN DEFAULT false,
      last_position_seconds INTEGER DEFAULT 0,
      completed_at TIMESTAMP,
      updated_at TIMESTAMP DEFAULT NOW(),
      UNIQUE(user_id, content_id, lesson_id)
    )
  `;

  await vercelSql`
    CREATE TABLE IF NOT EXISTS tv_episodes (
      id SERIAL PRIMARY KEY,
      show_id INTEGER REFERENCES content(id) ON DELETE CASCADE,
      season INTEGER NOT NULL,
      episode INTEGER NOT NULL,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      media_url TEXT,
      thumbnail_url TEXT,
      duration_minutes INTEGER,
      sort_order INTEGER DEFAULT 0,
      created_at TIMESTAMP DEFAULT NOW()
    )
  `;

  return 'Database initialized successfully';
}
