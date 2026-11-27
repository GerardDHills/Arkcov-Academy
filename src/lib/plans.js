// Single source of truth for Arkcov Academy membership plans.
// Used by the landing page, the /pricing page and the Stripe checkout route.
// Amounts are in cents. Checkout builds Stripe prices from these numbers
// (the same way the store does), so changing a price here changes it everywhere.

export const PLANS = {
  free: {
    key: 'free',
    name: 'Recruit',
    tagline: 'See what Arkcov is, free',
    role: 'free',
    prices: {},
    unlocks: [
      'Orientation mission: what Arkcov Academy is for',
      'TV Show Episode 1, “A Mystery in the Blood”',
      'Social Superpower Assessment',
      'Sample lessons, films and cases',
      'Newsletter and the cadet store',
    ],
  },
  cadet: {
    key: 'cadet',
    name: 'Cadet',
    tagline: 'Train like a medical student, years early',
    role: 'member',
    featured: true,
    prices: { month: 1900, year: 14900 },
    unlocks: [
      'Every patient case, first symptom to diagnosis',
      'The full Season One curriculum and body atlas',
      'Every film, TV episode and interactive game',
      'Certificates, badges and cadet rank',
      'Scholarship tools and 10% off cadet gear',
    ],
  },
  family: {
    key: 'family',
    name: 'Family',
    tagline: 'Every future healer in your home',
    role: 'family',
    prices: { month: 2900, year: 24900 },
    unlocks: [
      'Everything in Cadet, for up to 5 cadets',
      'Parental controls',
      'Parent and guardian access to live sessions',
      'Priority registration for live classes',
      'Family bundles and 10% off cadet gear',
    ],
  },
  founding: {
    key: 'founding',
    name: 'Founding Cadet',
    tagline: 'Our first families, rewarded for life',
    role: 'member',
    prices: { year: 9900 },
    unlocks: ['Everything in Cadet', 'Your $99 a year rate never goes up while you stay enrolled'],
  },
};

// Sponsor a Cadet: a one-time gift of one Cadet year for a student on scholarship.
export const SPONSOR = { name: 'Sponsor a Cadet', amount: 14900 };

// Whether the founding offer is open. Set NEXT_PUBLIC_FOUNDING_RATE_OPEN=false in Vercel to close it.
export function foundingOpen() {
  return (process.env.NEXT_PUBLIC_FOUNDING_RATE_OPEN || 'true') !== 'false';
}

export function dollars(cents) {
  const d = cents / 100;
  return Number.isInteger(d) ? `$${d}` : `$${d.toFixed(2)}`;
}

// Yearly savings versus paying monthly for 12 months, as a whole percent.
export function yearlySavings(plan) {
  const { month, year } = plan.prices;
  if (!month || !year) return 0;
  return Math.round((1 - year / (month * 12)) * 100);
}

// Plan key on a Stripe subscription -> the access role it grants.
export function roleForPlan(key) {
  if (key === 'member') return 'member'; // subscriptions made before Nov 2026
  return PLANS[key]?.role && PLANS[key].role !== 'free' ? PLANS[key].role : null;
}
