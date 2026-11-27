import { roleForPlan } from './plans';
import Stripe from 'stripe';

let stripe;

export function getStripe() {
  if (!stripe) {
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error('STRIPE_SECRET_KEY is not set');
    }
    stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2024-06-20',
    });
  }
  return stripe;
}

// Price IDs from subscriptions created before plans moved to src/lib/plans.js.
// New checkouts build their prices from the plan catalog, so these are optional.
export const LEGACY_PRICE_IDS = {
  member: process.env.STRIPE_PRICE_MEMBER || '',
  family: process.env.STRIPE_PRICE_FAMILY || '',
};

// Map a Stripe subscription to our internal role. The plan key is stored on the
// subscription metadata at checkout; legacy price IDs are the fallback.
export function subscriptionStatusToRole(status, priceId, planKey) {
  if (status === 'active' || status === 'trialing') {
    const fromPlan = roleForPlan(planKey);
    if (fromPlan) return fromPlan;
    if (priceId && priceId === LEGACY_PRICE_IDS.family) return 'family';
    if (priceId && priceId === LEGACY_PRICE_IDS.member) return 'member';
  }
  return 'free';
}
