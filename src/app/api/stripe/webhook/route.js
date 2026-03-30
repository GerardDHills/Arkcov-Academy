import { NextResponse } from 'next/server';
import { getStripe, subscriptionStatusToRole } from '@/lib/stripe';
import { sql } from '@/lib/db';

export const dynamic = 'force-dynamic';

// Disable body parsing for webhooks - Stripe needs raw body

export async function POST(request) {
  try {
    const stripe = getStripe();
    const body = await request.text();
    const sig = request.headers.get('stripe-signature');

    let event;

    if (process.env.STRIPE_WEBHOOK_SECRET) {
      try {
        event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET);
      } catch (err) {
        console.error('Webhook signature verification failed:', err.message);
        return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
      }
    } else {
      // Dev mode - parse without verification
      event = JSON.parse(body);
    }

    const { type, data } = event;

    switch (type) {
      case 'checkout.session.completed': {
        const session = data.object;
        const userId = session.metadata?.userId;
        const subscriptionId = session.subscription;

        if (userId && subscriptionId) {
          // Fetch subscription to get the price/plan
          const subscription = await stripe.subscriptions.retrieve(subscriptionId);
          const priceId = subscription.items.data[0]?.price?.id;
          const newRole = subscriptionStatusToRole(subscription.status, priceId);

          await sql`
            UPDATE users SET
              role = ${newRole},
              stripe_subscription_id = ${subscriptionId},
              subscription_status = ${subscription.status},
              updated_at = NOW()
            WHERE id = ${parseInt(userId)}
          `;
          console.log(`User ${userId} upgraded to ${newRole}`);
        }
        break;
      }

      case 'customer.subscription.updated': {
        const subscription = data.object;
        const userId = subscription.metadata?.userId;
        const priceId = subscription.items.data[0]?.price?.id;
        const newRole = subscriptionStatusToRole(subscription.status, priceId);

        if (userId) {
          await sql`
            UPDATE users SET
              role = ${newRole},
              subscription_status = ${subscription.status},
              updated_at = NOW()
            WHERE id = ${parseInt(userId)}
          `;
          console.log(`User ${userId} subscription updated to ${newRole} (${subscription.status})`);
        }
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = data.object;
        const userId = subscription.metadata?.userId;

        if (userId) {
          await sql`
            UPDATE users SET
              role = 'free',
              subscription_status = 'canceled',
              stripe_subscription_id = NULL,
              updated_at = NOW()
            WHERE id = ${parseInt(userId)}
          `;
          console.log(`User ${userId} subscription canceled, downgraded to free`);
        }
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = data.object;
        const customerId = invoice.customer;

        // Find user by Stripe customer ID
        const [user] = await sql`
          SELECT id FROM users WHERE stripe_customer_id = ${customerId}
        `;
        if (user) {
          await sql`
            UPDATE users SET
              subscription_status = 'past_due',
              updated_at = NOW()
            WHERE id = ${user.id}
          `;
          console.log(`User ${user.id} payment failed - marked as past_due`);
        }
        break;
      }

      default:
        console.log(`Unhandled webhook event: ${type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
