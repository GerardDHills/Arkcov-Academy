// Arkcov Academy store catalog.
// Prices are in cents and are the only prices the server trusts at checkout.
//
// kind:
//   'digital'  — delivered as a download after payment (needs its file URL env var)
//   'physical' — shipped; fulfilled by Printful when PRINTFUL_API_TOKEN is set
// status:
//   'available'   — can be bought
//   'coming_soon' — shown, not purchasable
//
// For Printful items, each variant carries the Printful *sync variant* id from the
// Printful store, so paid orders can be sent to Printful automatically.

import { MERCH_PRODUCTS } from './merchCatalog';

// Store checkout is open on previews always, and in production only when
// NEXT_PUBLIC_STORE_OPEN=true is set in Vercel (then redeploy).
export function isStoreOpen() {
  if (process.env.NEXT_PUBLIC_STORE_OPEN === 'true') return true;
  const env = process.env.NEXT_PUBLIC_VERCEL_ENV || process.env.VERCEL_ENV;
  return env !== 'production';
}

export const MEMBER_DISCOUNT = 0.1; // members and family plans save 10%

export const PRODUCTS = [
  {
    slug: 'rounds-journal-pdf',
    name: 'ROUNDS Journal: Medicine Bullet Journal',
    category: 'Digital downloads',
    kind: 'digital',
    status: 'available',
    price: 1999,
    fileEnv: 'JOURNAL_PDF_URL',
    image: '/images/store/rounds-journal.jpg',
    blurb: 'A bullet journal for medicine: thoughts, reflections and field notes from training. Hyperlinked for iPad, reMarkable and other tablets, or print at home.',
    details: [
      '206 pages, 7 × 10 in, with index, key and future log',
      'Tappable links between the index, key and every page',
      'Vintage clinical design with a write-in Property Of plate',
      'Instant download after checkout (PDF)',
    ],
  },
  {
    slug: 'rounds-planner-2026-2027-pdf',
    name: 'ROUNDS Planner 2026–2027',
    category: 'Digital downloads',
    kind: 'digital',
    status: 'available',
    price: 2499,
    fileEnv: 'PLANNER_PDF_URL',
    image: '/images/store/rounds-planner.jpg',
    blurb: 'A full-year hyperlinked digital planner, November 2026 to October 2027, built for the pace of medicine.',
    details: [
      '454 pages: year at a glance, monthly, weekly and daily pages',
      'Daily Top 3, to-do list, Spiraldex 24-hour tracker and 30-minute schedule',
      'Monthly quote pages and tappable navigation throughout',
      'Instant download after checkout (PDF)',
    ],
  },
  {
    slug: 'rounds-planner-2026-2027-represented-pdf',
    name: 'ROUNDS Planner 2026–2027: Represented Edition',
    category: 'Digital downloads',
    kind: 'digital',
    status: 'available',
    price: 2499,
    fileEnv: 'PLANNER_REPRESENTED_PDF_URL',
    image: '/images/store/rounds-planner-represented.jpg',
    blurb: 'The full ROUNDS Planner with the Represented collection: original words of encouragement honoring young men of color on the journey into medicine, one card for every month.',
    details: [
      'Everything in the ROUNDS Planner, November 2026 to October 2027',
      'Represented intro page plus a card on every month opener',
      'Tappable navigation throughout',
      'Instant download after checkout (PDF)',
    ],
  },
  {
    slug: 'rounds-service-log-pdf',
    name: 'ROUNDS Inpatient Service Log',
    category: 'Digital downloads',
    kind: 'digital',
    status: 'available',
    price: 999,
    fileEnv: 'SERVICE_LOG_PDF_URL',
    image: '/images/store/rounds-service-log.jpg',
    blurb: 'A patient rounding notebook for your time on service: track your list across the week in one place.',
    details: [
      '252 landscape pages, 3 patients per page',
      'Monday to Sunday columns for labs, imaging, active problems, plan and care coordination',
      'Tappable page index for jumping to any patient page',
      'Instant download after checkout (PDF)',
    ],
  },
  {
    slug: 'rounds-journal-print',
    name: 'ROUNDS Journal (Printed Edition)',
    category: 'Printed editions',
    kind: 'physical',
    status: 'coming_soon',
    price: 3999,
    image: '/images/store/rounds-journal.jpg',
    blurb: 'The ROUNDS Journal as a printed, bound edition.',
    details: ['Printed edition coming soon'],
  },
  {
    slug: 'rounds-planner-print',
    name: 'ROUNDS Planner 2026–2027 (Printed Edition)',
    category: 'Printed editions',
    kind: 'physical',
    status: 'coming_soon',
    price: 3999,
    image: '/images/store/rounds-planner.jpg',
    blurb: 'The full-year ROUNDS Planner as a printed, coil-bound executive edition.',
    details: ['Printed edition coming soon'],
  },
  {
    slug: 'rounds-planner-represented-print',
    name: 'ROUNDS Planner 2026–2027: Represented Edition (Printed)',
    category: 'Printed editions',
    kind: 'physical',
    status: 'coming_soon',
    price: 3999,
    image: '/images/store/rounds-planner-represented.jpg',
    blurb: 'The Represented Edition of the ROUNDS Planner as a printed, coil-bound executive edition.',
    details: ['Printed edition coming soon'],
  },
  ...MERCH_PRODUCTS,
];

export function getProduct(slug) {
  return PRODUCTS.find((p) => p.slug === slug) || null;
}

export function priceFor(product, role) {
  const member = role === 'member' || role === 'family' || role === 'admin';
  return member ? Math.round(product.price * (1 - MEMBER_DISCOUNT)) : product.price;
}

export function formatPrice(cents) {
  return `$${(cents / 100).toFixed(2)}`;
}
