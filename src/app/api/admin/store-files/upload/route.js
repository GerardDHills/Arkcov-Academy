import { NextResponse } from 'next/server';
import { handleUpload } from '@vercel/blob/client';
import { getCurrentUser } from '@/lib/auth';
import { getProduct } from '@/lib/products';

export const dynamic = 'force-dynamic';

// Issues a one-time token so an admin's browser can upload a store PDF straight to Vercel Blob.
export async function POST(request) {
  const body = await request.json();
  try {
    const result = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname, clientPayload) => {
        const user = await getCurrentUser();
        if (user?.role !== 'admin') throw new Error('Admins only');
        const product = getProduct(clientPayload);
        if (!product || product.kind !== 'digital') throw new Error('Unknown digital product');
        return {
          allowedContentTypes: ['application/pdf'],
          maximumSizeInBytes: 200 * 1024 * 1024,
          addRandomSuffix: true,
          tokenPayload: JSON.stringify({ slug: product.slug }),
        };
      },
      onUploadCompleted: async () => {},
    });
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
