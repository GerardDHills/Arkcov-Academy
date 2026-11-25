import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { MERCH, place } from '@/lib/printfulMerch';
import { pf, allowedAdmin } from '@/lib/printful';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

async function createOne(item) {
  const existing = await pf(`/store/products/@${item.slug}`);
  if (existing.ok) return { slug: item.slug, status: 'exists', id: existing.json.result?.sync_product?.id };

  const catalog = await pf(`/products/${item.productId}`, { auth: false });
  if (!catalog.ok) return { slug: item.slug, status: 'error', step: 'catalog', error: catalog.json };
  const variants = catalog.json.result.variants;

  const pfs = await pf(`/mockup-generator/printfiles/${item.productId}`);
  if (!pfs.ok) return { slug: item.slug, status: 'error', step: 'printfiles', error: pfs.json };
  const printfiles = Object.fromEntries(pfs.json.result.printfiles.map((p) => [p.printfile_id, p]));
  const byVariant = Object.fromEntries(pfs.json.result.variant_printfiles.map((v) => [v.variant_id, v.placements]));

  const sync_variants = [];
  const missing = [];
  for (const color of item.colors) {
    for (const size of item.sizes) {
      const v = variants.find((x) => x.color === color && x.size === size);
      if (!v) { missing.push(`${color}/${size}`); continue; }
      const placements = byVariant[v.id] || {};
      const files = item.files.map((f) => {
        const pfId = placements[f.type];
        const area = printfiles[pfId];
        return area ? { type: f.type, url: f.url, position: place(f, area) } : { type: f.type, url: f.url };
      });
      sync_variants.push({
        variant_id: v.id,
        retail_price: (item.price + (item.upcharge?.[size] || 0)).toFixed(2),
        files,
        ...(item.options ? { options: item.options } : {}),
      });
    }
  }

  const created = await pf('/store/products', {
    method: 'POST',
    body: { sync_product: { name: item.name, external_id: item.slug }, sync_variants },
  });
  if (!created.ok) return { slug: item.slug, status: 'error', step: 'create', missing, error: created.json };
  return { slug: item.slug, status: 'created', id: created.json.result?.id, variants: sync_variants.length, missing };
}

// Creates the crest collection in the Printful store. Safe to run again:
// products that already exist (matched by external id) are skipped.
export async function POST(request) {
  if (!(await allowedAdmin(request, getCurrentUser))) {
    return NextResponse.json({ error: 'Admins only' }, { status: 403 });
  }
  const only = new URL(request.url).searchParams.get('only');
  const results = [];
  for (const item of MERCH.filter((m) => !only || m.slug === only)) {
    try {
      results.push(await createOne(item));
    } catch (e) {
      results.push({ slug: item.slug, status: 'error', error: e.message });
    }
  }
  return NextResponse.json({ results });
}
