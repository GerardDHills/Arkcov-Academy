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

export const MEMBER_DISCOUNT = 0.1; // members and family plans save 10%

export const PRODUCTS = [
  {
    slug: 'medicine-bullet-journal-pdf',
    name: 'Medicine Bullet Journal (Digital PDF)',
    category: 'Journals',
    kind: 'digital',
    status: 'available',
    price: 1999,
    fileEnv: 'JOURNAL_PDF_URL',
    image: '/images/store/bullet-journal.jpg',
    blurb: 'A full year of daily Schedule and Concepts spreads, built by a physician for medical training. Instant download for iPad, reMarkable and other tablets, or print at home.',
    details: [
      '732 pages: two pages for every day of the year',
      'Hour-by-hour schedule, top 3 priorities and habit check',
      'Concepts page with a 24-hour spaced-review wheel',
      'Instant download after checkout',
    ],
  },
  {
    slug: 'medicine-bullet-journal-print',
    name: 'Medicine Bullet Journal (Printed Edition)',
    category: 'Journals',
    kind: 'physical',
    status: 'coming_soon',
    price: 3999,
    image: '/images/store/bullet-journal.jpg',
    blurb: 'The full-year Medicine Bullet Journal as a printed, bound edition.',
    details: ['Printed edition coming soon'],
  },
  // Printful merch is added below once the products exist in the Printful store.
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
