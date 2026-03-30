import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';

export const dynamic = 'force-dynamic';

// GET single content item
export async function GET(request, { params }) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }

    const [content] = await sql`SELECT * FROM content WHERE id = ${params.id}`;

    if (!content) {
      return NextResponse.json({ error: 'Content not found' }, { status: 404 });
    }

    return NextResponse.json({ content });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// PUT update content
export async function PUT(request, { params }) {
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

    const [content] = await sql`
      UPDATE content SET
        title = COALESCE(${title}, title),
        description = COALESCE(${description}, description),
        type = COALESCE(${type}, type),
        thumbnail_url = COALESCE(${thumbnail_url}, thumbnail_url),
        media_url = COALESCE(${media_url}, media_url),
        trailer_url = COALESCE(${trailer_url}, trailer_url),
        access_level = COALESCE(${access_level}, access_level),
        category = COALESCE(${category}, category),
        duration_minutes = COALESCE(${duration_minutes}, duration_minutes),
        release_year = COALESCE(${release_year}, release_year),
        rating = COALESCE(${rating}, rating),
        featured = COALESCE(${featured}, featured),
        sort_order = COALESCE(${sort_order}, sort_order),
        published = COALESCE(${published}, published),
        updated_at = NOW()
      WHERE id = ${params.id}
      RETURNING *
    `;

    if (!content) {
      return NextResponse.json({ error: 'Content not found' }, { status: 404 });
    }

    return NextResponse.json({ content });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE content
export async function DELETE(request, { params }) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }

    const [content] = await sql`DELETE FROM content WHERE id = ${params.id} RETURNING id`;

    if (!content) {
      return NextResponse.json({ error: 'Content not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
