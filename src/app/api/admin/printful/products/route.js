import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { pf, allowedAdmin } from '@/lib/printful';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

// Lists the Printful store's products with sync variant ids and mockup previews,
// to fill in the store catalog.
export async function GET(request) {
  if (!(await allowedAdmin(request, getCurrentUser))) {
    return NextResponse.json({ error: 'Admins only' }, { status: 403 });
  }
  const list = await pf('/store/products?limit=100');
  if (!list.ok) return NextResponse.json({ error: list.json }, { status: 502 });
  const out = [];
  for (const p of list.json.result) {
    const one = await pf(`/store/products/${p.id}`);
    const sp = one.json.result;
    out.push({
      id: p.id,
      slug: p.external_id,
      name: p.name,
      thumbnail: p.thumbnail_url,
      variants: (sp?.sync_variants || []).map((v) => ({
        id: v.id,
        name: v.name,
        catalogVariantId: v.variant_id,
        price: v.retail_price,
        color: v.color,
        size: v.size,
        preview: v.files?.find((f) => f.type === 'preview')?.preview_url || null,
      })),
    });
  }
  return NextResponse.json({ products: out });
}
