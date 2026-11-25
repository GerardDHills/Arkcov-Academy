import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { MERCH, FILE_SIZES } from '@/lib/printfulMerch';
import { pf, allowedAdmin } from '@/lib/printful';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// Generates product photos with Printful's mockup generator: one per color.
// GET /api/admin/printful/mockups?slug=crest-hoodie
export async function GET(request) {
  if (!(await allowedAdmin(request, getCurrentUser))) {
    return NextResponse.json({ error: 'Admins only' }, { status: 403 });
  }
  const slug = new URL(request.url).searchParams.get('slug');
  const item = MERCH.find((m) => m.slug === slug);
  if (!item) return NextResponse.json({ error: 'Unknown slug' }, { status: 400 });

  const sp = await pf(`/store/products/@${slug}`);
  if (!sp.ok) return NextResponse.json({ error: 'Product not in Printful yet', detail: sp.json }, { status: 404 });
  const syncVariants = sp.json.result.sync_variants;

  // one catalog variant per color
  const perColor = {};
  for (const v of syncVariants) if (!perColor[v.color]) perColor[v.color] = v;
  const sample = Object.values(perColor);
  const files = sample[0].files
    .filter((f) => f.type !== 'preview')
    .map((f) => ({ placement: f.type, image_url: f.url || item.files.find((x) => x.type === f.type)?.url, position: f.position || undefined }));

  const task = await pf(`/mockup-generator/create-task/${item.productId}`, {
    method: 'POST',
    body: {
      variant_ids: sample.map((v) => v.variant_id),
      format: 'jpg',
      files,
      ...(item.options ? { options: item.options.filter((o) => o.id === 'embroidery_type') } : {}),
    },
  });
  if (!task.ok) return NextResponse.json({ error: 'create-task failed', detail: task.json, files }, { status: 502 });
  const key = task.json.result.task_key;

  for (let i = 0; i < 18; i++) {
    await sleep(2500);
    const st = await pf(`/mockup-generator/task?task_key=${encodeURIComponent(key)}`);
    const r = st.json.result;
    if (r?.status === 'completed') {
      const byVariant = {};
      for (const m of r.mockups) for (const vid of m.variant_ids) if (!byVariant[vid]) byVariant[vid] = m.mockup_url;
      return NextResponse.json({
        slug,
        mockups: sample.map((v) => ({ color: v.color, url: byVariant[v.variant_id] || r.mockups[0]?.mockup_url })),
      });
    }
    if (r?.status === 'failed') return NextResponse.json({ error: 'Mockup task failed', detail: r }, { status: 502 });
  }
  return NextResponse.json({ error: 'Mockups still generating', task_key: key }, { status: 202 });
}
