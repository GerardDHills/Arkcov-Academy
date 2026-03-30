import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';

export const dynamic = 'force-dynamic';

// GET all content (admin view)
export async function GET(request) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const published = searchParams.get('published');

    let query;

    if (type && type !== 'all') {
      query = await sql`
        SELECT c.*, u.name as created_by_name
        FROM content c
        LEFT JOIN users u ON c.created_by = u.id
        WHERE c.type = ${type}
        ORDER BY c.sort_order ASC, c.created_at DESC
      `;
    } else {
      query = await sql`
        SELECT c.*, u.name as created_by_name
        FROM content c
        LEFT JOIN users u ON c.created_by = u.id
        ORDER BY c.type ASC, c.sort_order ASC, c.created_at DESC
      `;
    }

    return NextResponse.json({ content: query });
  } catch (error) {
    console.error('Content fetch error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST create new content
export async function POST(request) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }

    const body = await request.json();
    const {
      title, description, type, thumbnail_url, media_url, trailer_url,
      access_level, category, tags, duration_minutes, release_year,
      rating, featured, sort_order, published
    } = body;

    if (!title || !type) {
      return NextResponse.json({ error: 'Title and type are required' }, { status: 400 });
    }

    const validTypes = ['course', 'podcast', 'movie', 'tv_show', 'animated_short', 'interactive_game'];
    if (!validTypes.includes(type)) {
      return NextResponse.json({ error: 'Invalid content type' }, { status: 400 });
    }

    const tagsArray = tags && tags.length > 0 ? tags : null;

    const [content] = await sql`
      INSERT INTO content (
        title, description, type, thumbnail_url, media_url, trailer_url,
        access_level, category, tags, duration_minutes, release_year,
        rating, featured, sort_order, published, created_by
      ) VALUES (
        ${title}, ${description || null}, ${type}, ${thumbnail_url || null},
        ${media_url || null}, ${trailer_url || null},
        ${access_level || 'member'}, ${category || null},
        ${tagsArray}, ${duration_minutes || null},
        ${release_year || null}, ${rating || null},
        ${featured || false}, ${sort_order || 0},
        ${published || false}, ${user.id}
      )
      RETURNING *
    `;

    return NextResponse.json({ content }, { status: 201 });
  } catch (error) {
    console.error('Content create error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
