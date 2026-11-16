# Arkcov Academy — Brand Guide for Developers

The site uses the Arkcov **Covenant** theme (crimson, gold, navy, cream).

## Where things live
| What | File |
|------|------|
| Colors, fonts, buttons, focus styles | `src/app/globals.css` (`:root` tokens at the top) |
| Logo components | `src/components/BrandMark.js` → `<ArkcovMark />`, `<ArkcovLockup />`, `<ArkcovCrest />` |
| Line icons (no emoji) | `src/components/Icon.js` → `<Icon name="book" />` |
| Print-ready logo files | `public/brand/` |
| Browser tab icon | `src/app/icon.svg`, `src/app/apple-icon.png` |
| Homepage copy (paths, videos, tiers, store) | arrays at the top of `src/components/LandingPage.js` |

## Colors
| Token | Hex | Use |
|-------|-----|-----|
| `--crimson` | #A8201A | primary buttons, key accents |
| `--gold` | #C9973F | rules, borders, highlights on navy |
| `--navy` | #0E1A3A | top bar, dark sections, headings |
| `--cream` | #F6EEDF | page background |

## Type
- `--font-brand` Cinzel: wordmark, small-caps labels ("eyebrows")
- `--font-display` Cormorant Garamond: page titles and big numbers
- `--font-body` Nunito Sans: everything people read

## Buttons
`btn btn-crimson` (main action) · `btn btn-navy` · `btn btn-outline` · `btn btn-gold` (on navy) · `btn btn-ghost` (outline on navy). Sizes: `btn-sm`, `btn-lg`, `btn-full`.

## Accessibility rules we follow
- Every form input has a `<label htmlFor>` matching its `id`.
- Icons are SVG with `aria-hidden`, or a `title` when they carry meaning.
- Keyboard focus shows a gold outline; a "Skip to content" link is the first item on every page.
- Motion is reduced automatically for people who turn it off on their device.
