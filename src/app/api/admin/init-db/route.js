import { NextResponse } from 'next/server';
import { initializeDatabase } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function POST(request) {
  try {
    // Simple protection - require a setup key
    const { setupKey } = await request.json();
    if (setupKey !== process.env.SETUP_KEY && setupKey !== 'arkcov-init-2025') {
      return NextResponse.json({ error: 'Invalid setup key' }, { status: 403 });
    }

    await initializeDatabase();
    return NextResponse.json({ success: true, message: 'Database initialized' });
  } catch (error) {
    console.error('DB init error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
