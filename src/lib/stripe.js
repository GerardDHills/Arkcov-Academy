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

// Map internal roles to Stripe price IDs
// Set these in your .env.local after creating products in Stripe Dashboard
export const PRICE_IDS = {
  member: process.env.STRIPE_PRICE_MEMBER || '',   // $9/mo
  family: process.env.STRIPE_PRICE_FAMILY || '',    // $14/mo
};

export const PLAN_DETAILS = {
  member: {
    name: 'Member',
    price: 9,
    interval: 'month',
    features: [
      'Full library access',
      'Interactive games',
      'Member store discounts',
      'Scholarship tools',
      'Certificates & badges',
    ],
  },
  family: {
    name: 'Family',
    price: 14,
    interval: 'month',
    features: [
      'Everything in Member',
      'Up to 5 profiles',
      'Parental controls',
      'Priority registration',
      'Family bundles',
    ],
  },
};

// Map a Stripe subscription status to our internal role
export function subscriptionStatusToRole(status, priceId) {
  if (status === 'active' || status === 'trialing') {
    if (priceId === PRICE_IDS.family) return 'family';
    if (priceId === PRICE_IDS.member) return 'member';
  }
  return 'free';
}
