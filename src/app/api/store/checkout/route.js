import { NextResponse } from 'next/server';
import { getStripe } from '@/lib/stripe';
import { getCurrentUser } from '@/lib/auth';
import { getProduct, isStoreOpen, priceFor } from '@/lib/products';

export const dynamic = 'force-dynamic';

// One-time store purchase (journal PDF or Printful merch). Prices come from the
// server catalog, never from the browser.
export async function POST(request) {
  try {
    const { slug, variantId, quantity } = await request.json();
    if (!isStoreOpen()) {
      return NextResponse.json({ error: 'The store opens soon.' }, { status: 403 });
    }
    const product = getProduct(slug);
    if (!product || product.status !== 'available') {
      return NextResponse.json({ error: 'This item is not available yet.' }, { status: 400 });
    }

    let variant = null;
    if (product.variants?.length) {
      variant = product.variants.find((v) => v.id === variantId);
      if (!variant) return NextResponse.json({ error: 'Please choose a size and color.' }, { status: 400 });
    }

    const qty = product.kind === 'digital' ? 1 : Math.min(Math.max(parseInt(quantity, 10) || 1, 1), 10);
    const user = await getCurrentUser();
    const unitAmount = priceFor({ ...product, price: variant?.price || product.price }, user?.role);
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || new URL(request.url).origin;

    const params = {
      mode: 'payment',
      line_items: [
        {
          quantity: qty,
          price_data: {
            currency: 'usd',
            unit_amount: unitAmount,
            product_data: {
              name: variant ? `${product.name} (${variant.label})` : product.name,
              images: (variant?.image || product.image) ? [`${appUrl}${variant?.image || product.image}`] : undefined,
            },
          },
        },
      ],
      success_url: `${appUrl}/store/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/store`,
      metadata: {
        kind: 'store',
        slug: product.slug,
        variantId: variant?.id || '',
        quantity: String(qty),
        userId: user ? String(user.id) : '',
      },
    };

    if (user?.email) params.customer_email = user.email;

    if (product.kind === 'physical') {
      params.shipping_address_collection = { allowed_countries: ['US'] };
      params.shipping_options = [
        {
          shipping_rate_data: {
            display_name: 'Standard shipping',
            type: 'fixed_amount',
            fixed_amount: { amount: 599, currency: 'usd' },
            delivery_estimate: {
              minimum: { unit: 'business_day', value: 5 },
              maximum: { unit: 'business_day', value: 10 },
            },
          },
        },
      ];
      params.phone_number_collection = { enabled: true };
    }

    const session = await getStripe().checkout.sessions.create(params);
    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Store checkout error:', error);
    return NextResponse.json({ error: 'Checkout could not start. Please try again.' }, { status: 500 });
  }
}
