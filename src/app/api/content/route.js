import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';

export const dynamic = 'force-dynamic';


export async function GET(request) {
  try {
    const user = await getCurrentUser();
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const featured = searchParams.get('featured');


    // Determine what access levels the user can see
    const userRole = user?.role || 'free';
    let accessLevels;
    if (userRole === 'admin' || userRole === 'family') {
      accessLevels = ['free', 'member', 'family'];
    } else if (userRole === 'member') {
      accessLevels = ['free', 'member'];
    } else {
      accessLevels = ['free'];
    }

    let query;
    if (type && type !== 'all') {
      query = await sql`
        SELECT id, title, description, type, thumbnail_url, trailer_url, media_url,
               access_level, category, tags, duration_minutes, release_year,
               rating, featured, sort_order
        FROM content
        WHERE published = true
          AND type = ${type}
          AND access_level = ANY(${accessLevels})
        ORDER BY featured DESC, sort_order ASC, created_at DESC
      `;
    } else if (featured === 'true') {
      query = await sql`
        SELECT id, title, description, type, thumbnail_url, trailer_url, media_url,
               access_level, category, tags, duration_minutes, release_year,
               rating, featured, sort_order
        FROM content
        WHERE published = true
          AND featured = true
          AND access_level = ANY(${accessLevels})
        ORDER BY sort_order ASC, created_at DESC
      `;
    } else {
      query = await sql`
        SELECT id, title, description, type, thumbnail_url, trailer_url, media_url,
               access_level, category, tags, duration_minutes, release_year,
               rating, featured, sort_order
        FROM content
        WHERE published = true
          AND access_level = ANY(${accessLevels})
        ORDER BY type ASC, featured DESC, sort_order ASC, created_at DESC
      `;
    }

    return NextResponse.json({ content: query });
  } catch (error) {
    console.error('Public content fetch error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
