import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';

export const dynamic = 'force-dynamic';

// GET user progress
export async function GET(request) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { searchParams } = new URL(request.url);
    const contentId = searchParams.get('contentId');


    if (contentId) {
      const progress = await sql`
        SELECT up.*, c.title as content_title, c.type as content_type, c.thumbnail_url
        FROM user_progress up
        JOIN content c ON up.content_id = c.id
        WHERE up.user_id = ${user.id} AND up.content_id = ${contentId}
        ORDER BY up.updated_at DESC
      `;
      return NextResponse.json({ progress });
    }

    // Get all progress for dashboard
    const progress = await sql`
      SELECT up.*, c.title as content_title, c.type as content_type, 
             c.thumbnail_url, c.duration_minutes
      FROM user_progress up
      JOIN content c ON up.content_id = c.id
      WHERE up.user_id = ${user.id}
      ORDER BY up.updated_at DESC
    `;

    // Get stats
    const [stats] = await sql`
      SELECT 
        COUNT(*) FILTER (WHERE completed = true) as completed_count,
        COUNT(*) as total_in_progress,
        COALESCE(SUM(
          CASE WHEN c.duration_minutes IS NOT NULL 
          THEN c.duration_minutes * up.progress_percent / 100.0 
          ELSE 0 END
        ), 0) as minutes_watched
      FROM user_progress up
      JOIN content c ON up.content_id = c.id
      WHERE up.user_id = ${user.id}
    `;

    return NextResponse.json({ progress, stats });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST update progress
export async function POST(request) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { contentId, lessonId, progressPercent, lastPositionSeconds, completed } = await request.json();

    if (!contentId) {
      return NextResponse.json({ error: 'contentId is required' }, { status: 400 });
    }


    const completedAt = completed ? new Date().toISOString() : null;

    const [progress] = await sql`
      INSERT INTO user_progress (user_id, content_id, lesson_id, progress_percent, last_position_seconds, completed, completed_at, updated_at)
      VALUES (
        ${user.id}, ${contentId}, ${lessonId || null},
        ${progressPercent || 0}, ${lastPositionSeconds || 0},
        ${completed || false},
        ${completedAt},
        NOW()
      )
      ON CONFLICT (user_id, content_id, lesson_id)
      DO UPDATE SET
        progress_percent = COALESCE(${progressPercent}, user_progress.progress_percent),
        last_position_seconds = COALESCE(${lastPositionSeconds}, user_progress.last_position_seconds),
        completed = COALESCE(${completed}, user_progress.completed),
        completed_at = CASE WHEN ${completed} = true AND user_progress.completed_at IS NULL THEN NOW() ELSE user_progress.completed_at END,
        updated_at = NOW()
      RETURNING *
    `;

    return NextResponse.json({ progress });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
