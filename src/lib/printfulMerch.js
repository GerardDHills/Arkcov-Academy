// The Arkcov Academy crest collection, as it is created in the Printful store.
// Product ids come from Printful's public catalog (api.printful.com/products).
// Retail prices are in dollars. Design files live in public/brand/print and are
// read by Printful from the public GitHub copy of this repository.

const BRANCH = process.env.VERCEL_GIT_COMMIT_REF || 'main';
const FILES = `https://raw.githubusercontent.com/GerardDHills/arkcov-academy/${BRANCH}/public/brand/print`;

// Pixel size of each design file, used to place it inside Printful's print areas
export const FILE_SIZES = {
  'arkcov-mark-embroidery.png': [1800, 1617],
  'arkcov-crest.png': [3090, 3990],
  'arkcov-wordmark-navy.png': [4441, 1107],
  'arkcov-pattern-navy.png': [4000, 4000],
  'arkcov-mug-wrap.png': [2700, 1140],
};
const MARK_EMB = `${FILES}/arkcov-mark-embroidery.png`;
const THREADS = ['#A67843', '#CC3333']; // Old Gold arches, Red drop

const APPAREL = ['S', 'M', 'L', 'XL', '2XL', '3XL'];

export const MERCH = [
  {
    slug: 'crest-hoodie',
    name: 'Arkcov Academy Crest Hoodie',
    productId: 146,
    colors: ['Navy', 'Maroon', 'Sand'],
    sizes: APPAREL,
    price: 54.99,
    upcharge: { '2XL': 2, '3XL': 4 },
    files: [{ type: 'embroidery_chest_left', url: MARK_EMB, fit: 'contain' }],
    options: [{ id: 'thread_colors_chest_left', value: THREADS }],
    blurb: 'Heavy blend fleece hoodie with the embroidered Academy arch over the heart.',
  },
  {
    slug: 'crest-crewneck',
    name: 'Arkcov Academy Crest Crewneck',
    productId: 145,
    colors: ['Navy', 'Maroon', 'Sand'],
    sizes: APPAREL,
    price: 49.99,
    upcharge: { '2XL': 2, '3XL': 4 },
    files: [{ type: 'embroidery_chest_left', url: MARK_EMB, fit: 'contain' }],
    options: [{ id: 'thread_colors_chest_left', value: THREADS }],
    blurb: 'Classic crewneck sweatshirt with the embroidered Academy arch.',
  },
  {
    slug: 'crest-tee',
    name: 'Arkcov Academy Crest Tee',
    productId: 71,
    colors: ['Navy', 'Maroon', 'Natural'],
    sizes: APPAREL,
    price: 29.99,
    upcharge: { '2XL': 2, '3XL': 3 },
    files: [{ type: 'front', url: `${FILES}/arkcov-crest.png`, fit: 'contain', scale: 0.55 }],
    blurb: 'Soft cotton tee with the full Academy crest printed on the chest.',
  },
  {
    slug: 'crest-dad-hat',
    name: 'Arkcov Academy Dad Hat',
    productId: 206,
    colors: ['Navy', 'Cranberry', 'Stone'],
    sizes: ['One size'],
    price: 29.99,
    files: [{ type: 'embroidery_front', url: MARK_EMB, fit: 'contain' }],
    options: [{ id: 'embroidery_type', value: 'flat' }, { id: 'thread_colors', value: THREADS }],
    blurb: 'Unstructured cotton twill cap with the embroidered Academy arch.',
  },
  {
    slug: 'crest-beanie',
    name: 'Arkcov Academy Cuffed Beanie',
    productId: 266,
    colors: ['Navy', 'Black'],
    sizes: ['One size'],
    price: 24.99,
    files: [{ type: 'embroidery_front', url: MARK_EMB, fit: 'contain' }],
    options: [{ id: 'embroidery_type', value: 'flat' }, { id: 'thread_colors', value: THREADS }],
    blurb: 'Warm knit cuffed beanie with the embroidered Academy arch.',
  },
  {
    slug: 'academy-high-tops-mens',
    name: "Arkcov Academy High Tops (Men's)",
    productId: 513,
    colors: ['White'],
    sizes: ['7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12', '13'],
    price: 79.99,
    files: ['shoe_quarters_left', 'shoe_quarters_right', 'shoe_tongue_left', 'shoe_tongue_right'].map((type) => ({
      type, url: `${FILES}/arkcov-pattern-navy.png`, fit: 'cover',
    })),
    blurb: 'Canvas high-top sneakers in Academy navy with a repeating gold arch pattern.',
  },
  {
    slug: 'academy-high-tops-womens',
    name: "Arkcov Academy High Tops (Women's)",
    productId: 525,
    colors: ['White'],
    sizes: ['5', '5.5', '6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10', '11'],
    price: 79.99,
    files: ['shoe_quarters_left', 'shoe_quarters_right', 'shoe_tongue_left', 'shoe_tongue_right'].map((type) => ({
      type, url: `${FILES}/arkcov-pattern-navy.png`, fit: 'cover',
    })),
    blurb: 'Canvas high-top sneakers in Academy navy with a repeating gold arch pattern.',
  },
  {
    slug: 'academy-backpack',
    name: 'Arkcov Academy Backpack',
    productId: 847,
    colors: ['Midnight Navy'],
    sizes: ['One size'],
    price: 64.99,
    files: [{ type: 'embroidery_apparel_front', url: MARK_EMB, fit: 'contain' }],
    options: [{ id: 'thread_colors_apparel', value: THREADS }],
    blurb: 'Under Armour backpack with a laptop sleeve and the embroidered Academy arch.',
  },
  {
    slug: 'academy-tote',
    name: 'Arkcov Academy Tote',
    productId: 367,
    colors: ['Oyster'],
    sizes: ['One size'],
    price: 24.99,
    files: [{ type: 'front', url: `${FILES}/arkcov-wordmark-navy.png`, fit: 'contain', scale: 0.8 }],
    blurb: 'Organic cotton tote with the Arkcov Academy wordmark.',
  },
  {
    slug: 'academy-mug',
    name: 'Arkcov Academy Mug',
    productId: 19,
    colors: ['White'],
    sizes: ['11 oz', '15 oz'],
    price: 17.99,
    upcharge: { '15 oz': 2 },
    files: [{ type: 'default', url: `${FILES}/arkcov-mug-wrap.png`, fit: 'contain' }],
    blurb: 'Glossy ceramic mug wrapped with the Academy wordmark and arches.',
  },
  {
    slug: 'academy-socks',
    name: 'Arkcov Academy Crew Socks',
    productId: 502,
    colors: ['White', 'Black'],
    sizes: ['S/M', 'L/XL'],
    price: 19.99,
    files: ['embroidery_outside_left', 'embroidery_outside_right'].map((type) => ({ type, url: MARK_EMB, fit: 'contain' })),
    options: [
      { id: 'thread_colors_outside_left', value: THREADS },
      { id: 'thread_colors_outside_right', value: THREADS },
    ],
    blurb: 'Cushioned crew socks with the Academy arch embroidered on each ankle.',
  },
];

// Fit a design file inside a Printful print area
export function place(file, area) {
  const name = file.url.split('/').pop();
  const [iw, ih] = FILE_SIZES[name] || [1000, 1000];
  const aw = area.width;
  const ah = area.height;
  let s = file.fit === 'cover' ? Math.max(aw / iw, ah / ih) : Math.min(aw / iw, ah / ih);
  s *= file.scale || 1;
  const width = Math.round(iw * s);
  const height = Math.round(ih * s);
  const top = file.type === 'front' ? Math.round(ah * 0.06) : Math.round((ah - height) / 2);
  return { area_width: aw, area_height: ah, width, height, top, left: Math.round((aw - width) / 2) };
}

