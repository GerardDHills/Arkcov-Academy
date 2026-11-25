import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { getProduct, PRODUCTS } from '@/lib/products';
import { sql } from '@/lib/db';
import { ensureStoreFilesTable } from '@/lib/store';

export const dynamic = 'force-dynamic';

async function requireAdmin() {
  const user = await getCurrentUser();
  return user?.role === 'admin';
}

export async function GET() {
  if (!(await requireAdmin())) return NextResponse.json({ error: 'Admins only' }, { status: 403 });
  await ensureStoreFilesTable();
  const rows = await sql`SELECT slug, url, uploaded_at FROM store_files`;
  const files = PRODUCTS.filter((p) => p.kind === 'digital').map((p) => {
    const row = rows.find((r) => r.slug === p.slug);
    return { slug: p.slug, name: p.name, uploaded: !!row, uploadedAt: row?.uploaded_at || null, envSet: !!process.env[p.fileEnv] };
  });
  return NextResponse.json({ files, blobReady: !!process.env.BLOB_READ_WRITE_TOKEN });
}

export async function POST(request) {
  if (!(await requireAdmin())) return NextResponse.json({ error: 'Admins only' }, { status: 403 });
  const { slug, url } = await request.json();
  const product = getProduct(slug);
  if (!product || product.kind !== 'digital') return NextResponse.json({ error: 'Unknown product' }, { status: 400 });
  if (typeof url !== 'string' || !/^https:\/\/[a-z0-9.-]+\.blob\.vercel-storage\.com\//i.test(url)) {
    return NextResponse.json({ error: 'Not a Vercel Blob address' }, { status: 400 });
  }
  await ensureStoreFilesTable();
  await sql`
    INSERT INTO store_files (slug, url, uploaded_at) VALUES (${slug}, ${url}, NOW())
    ON CONFLICT (slug) DO UPDATE SET url = EXCLUDED.url, uploaded_at = NOW()
  `;
  return NextResponse.json({ ok: true });
}
