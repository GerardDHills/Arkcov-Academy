import { NextResponse } from 'next/server';
import { getPaidStoreSession, recordStoreOrder, getFileUrl } from '@/lib/store';

export const dynamic = 'force-dynamic';

// Paid buyers download their digital product here. The Stripe session is checked
// on every request, so the file's address is only handed to someone who paid.
export async function GET(request) {
  const sessionId = new URL(request.url).searchParams.get('session_id');
  try {
    const paid = await getPaidStoreSession(sessionId);
    if (!paid || paid.product.kind !== 'digital') {
      return NextResponse.json({ error: 'We could not find a paid order for this link.' }, { status: 403 });
    }
    const fileUrl = await getFileUrl(paid.product);
    if (!fileUrl) {
      return NextResponse.json({ error: 'The download is being prepared. Please email support and we will send it.' }, { status: 503 });
    }
    // Make sure the order is recorded even if the webhook has not arrived yet
    recordStoreOrder(paid.session.id).catch(() => {});
    return NextResponse.redirect(fileUrl, 302);
  } catch (err) {
    console.error('Download error:', err);
    return NextResponse.json({ error: 'Download failed. Please try again.' }, { status: 500 });
  }
}
