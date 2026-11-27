import { NextResponse } from 'next/server';
import { getStripe } from '@/lib/stripe';
import { getCurrentUser } from '@/lib/auth';
import { SPONSOR } from '@/lib/plans';

export const dynamic = 'force-dynamic';

// Sponsor a Cadet: a one-time gift that pays for Cadet years for students on
// scholarship. No account needed. The amount comes from the server catalog.
export async function POST(request) {
  try {
    const body = await request.json().catch(() => ({}));
    const seats = Math.min(Math.max(parseInt(body.seats, 10) || 1, 1), 25);
    const user = await getCurrentUser().catch(() => null);
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || new URL(request.url).origin;

    const params = {
      mode: 'payment',
      line_items: [
        {
          quantity: seats,
          price_data: {
            currency: 'usd',
            unit_amount: SPONSOR.amount,
            product_data: {
              name: 'Sponsor a Cadet: one Cadet year',
              description: 'A full year of Arkcov Academy for a student on scholarship.',
            },
          },
        },
      ],
      success_url: `${appUrl}/pricing/success?sponsor=1`,
      cancel_url: `${appUrl}/pricing#sponsor`,
      metadata: { kind: 'sponsor', seats: String(seats), userId: user ? String(user.id) : '' },
      payment_intent_data: { metadata: { kind: 'sponsor', seats: String(seats) } },
    };
    if (user?.email) params.customer_email = user.email;

    const session = await getStripe().checkout.sessions.create(params);
    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Sponsor checkout error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
