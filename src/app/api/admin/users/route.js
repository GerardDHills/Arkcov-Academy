import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }

    const users = await sql`
      SELECT id, email, name, role, subscription_status, created_at, updated_at
      FROM users
      ORDER BY created_at DESC
    `;

    const stats = await sql`
      SELECT 
        COUNT(*) as total,
        COUNT(*) FILTER (WHERE role = 'free') as free_count,
        COUNT(*) FILTER (WHERE role = 'member') as member_count,
        COUNT(*) FILTER (WHERE role = 'family') as family_count,
        COUNT(*) FILTER (WHERE role = 'admin') as admin_count
      FROM users
    `;

    return NextResponse.json({ users, stats: stats[0] });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
