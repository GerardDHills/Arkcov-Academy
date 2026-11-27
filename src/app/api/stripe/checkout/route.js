import { NextResponse } from 'next/server';
import { getStripe } from '@/lib/stripe';
import { getCurrentUser } from '@/lib/auth';
import { sql } from '@/lib/db';
import { PLANS, foundingOpen } from '@/lib/plans';

export const dynamic = 'force-dynamic';

// Membership checkout. Prices come from the server plan catalog (src/lib/plans.js),
// never from the browser, and Stripe builds the recurring price at checkout.
export async function POST(request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Must be logged in' }, { status: 401 });
    }

    const body = await request.json();
    const key = body.plan === 'member' ? 'cadet' : body.plan;
    const plan = PLANS[key];
    const interval = key === 'founding' ? 'year' : body.interval === 'year' ? 'year' : 'month';
    const amount = plan?.prices?.[interval];
    if (!plan || !amount) {
      return NextResponse.json({ error: 'Please choose the Cadet, Family or Founding Cadet plan.' }, { status: 400 });
    }
    if (key === 'founding' && !foundingOpen()) {
      return NextResponse.json({ error: 'The Founding Cadet rate is closed. The Cadet plan is still open.' }, { status: 400 });
    }

    const stripe = getStripe();
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || new URL(request.url).origin;

    // Get or create Stripe customer
    const [dbUser] = await sql`SELECT stripe_customer_id FROM users WHERE id = ${user.id}`;
    let customerId = dbUser?.stripe_customer_id;

    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        name: user.name,
        metadata: { userId: String(user.id) },
      });
      customerId = customer.id;
      await sql`UPDATE users SET stripe_customer_id = ${customerId} WHERE id = ${user.id}`;
    }

    const meta = { userId: String(user.id), plan: key, interval };

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: 'subscription',
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: 'usd',
            unit_amount: amount,
            recurring: { interval },
            product_data: {
              name: `Arkcov Academy ${plan.name} (${interval === 'year' ? 'yearly' : 'monthly'})`,
              description: plan.tagline,
            },
          },
        },
      ],
      allow_promotion_codes: true,
      success_url: `${appUrl}/pricing/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/pricing`,
      metadata: meta,
      subscription_data: { metadata: meta },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
