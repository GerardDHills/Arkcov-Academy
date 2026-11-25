import { NextResponse } from 'next/server';
import { handleUpload } from '@vercel/blob/client';
import { getViewer, canBuild } from '@/lib/classroom';

export const dynamic = 'force-dynamic';

// One-time token so a professor's browser can upload a lesson video (or a
// poster image) straight to Vercel Blob. Large files never pass through us.
export async function POST(request) {
  const body = await request.json();
  try {
    const result = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async () => {
        const me = await getViewer();
        if (!canBuild(me)) throw new Error('Only the Dean and professors can upload lesson media.');
        return {
          allowedContentTypes: ['video/mp4', 'video/webm', 'video/quicktime', 'image/jpeg', 'image/png', 'image/webp'],
          maximumSizeInBytes: 2 * 1024 * 1024 * 1024,
          addRandomSuffix: true,
        };
      },
      onUploadCompleted: async () => {},
    });
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
