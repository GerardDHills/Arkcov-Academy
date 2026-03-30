# Arkcov Academy — Route & File Map

Quick reference for every page, API endpoint, and component in the app.
Use this to find any file instantly.

---

## PAGES (what users see)

| URL | File | Description | Access |
|-----|------|-------------|--------|
| `/` | `src/app/page.js` | Marketing homepage / landing page | Public |
| `/login` | `src/app/login/page.js` | Login form | Public |
| `/signup` | `src/app/signup/page.js` | Create account form | Public |
| `/pricing` | `src/app/pricing/page.js` | Plan comparison + Stripe checkout | Public |
| `/pricing/success` | `src/app/pricing/success/page.js` | Post-payment celebration | Public |
| `/dashboard` | `src/app/(member)/dashboard/page.js` | Member home — stats, progress, quick links | Logged in |
| `/explore` | `src/app/(member)/explore/page.js` | Browse all content (Netflix-style) | Logged in |
| `/explore?type=movie` | Same file, filtered | Filter by content type | Logged in |
| `/course/[id]` | `src/app/(member)/course/[id]/page.js` | Course viewer with video + progress tracking | Logged in |
| `/admin` | `src/app/(admin)/admin/page.js` | Admin dashboard — action cards + stats | Admin only |
| `/admin/content` | `src/app/(admin)/admin/content/page.js` | Content manager — CRUD for all content | Admin only |
| `/admin/users` | `src/app/(admin)/admin/users/page.js` | User list with role badges + stats | Admin only |

---

## API ROUTES (backend endpoints)

### Auth
| Method | URL | File | What it does |
|--------|-----|------|-------------|
| POST | `/api/auth/signup` | `src/app/api/auth/signup/route.js` | Create account, set JWT cookie |
| POST | `/api/auth/login` | `src/app/api/auth/login/route.js` | Verify password, set JWT cookie |
| POST | `/api/auth/logout` | `src/app/api/auth/logout/route.js` | Clear JWT cookie |
| GET | `/api/auth/me` | `src/app/api/auth/me/route.js` | Get current logged-in user |

### Content
| Method | URL | File | What it does |
|--------|-----|------|-------------|
| GET | `/api/content` | `src/app/api/content/route.js` | Public — get published content by type/access |

### Admin
| Method | URL | File | What it does |
|--------|-----|------|-------------|
| GET | `/api/admin/content` | `src/app/api/admin/content/route.js` | List all content (admin view) |
| POST | `/api/admin/content` | Same file | Create new content |
| GET | `/api/admin/content/[id]` | `src/app/api/admin/content/[id]/route.js` | Get single content item |
| PUT | `/api/admin/content/[id]` | Same file | Update content |
| DELETE | `/api/admin/content/[id]` | Same file | Delete content |
| GET | `/api/admin/users` | `src/app/api/admin/users/route.js` | List all users + stats |
| POST | `/api/admin/init-db` | `src/app/api/admin/init-db/route.js` | Initialize database tables (run once) |

### Stripe
| Method | URL | File | What it does |
|--------|-----|------|-------------|
| POST | `/api/stripe/checkout` | `src/app/api/stripe/checkout/route.js` | Create Stripe Checkout session |
| POST | `/api/stripe/webhook` | `src/app/api/stripe/webhook/route.js` | Handle subscription events |
| POST | `/api/stripe/portal` | `src/app/api/stripe/portal/route.js` | Open billing management portal |

### Progress
| Method | URL | File | What it does |
|--------|-----|------|-------------|
| GET | `/api/progress` | `src/app/api/progress/route.js` | Get user's progress + stats |
| POST | `/api/progress` | Same file | Save/update progress |

---

## COMPONENTS (reusable UI pieces)

| File | Used by | What it does |
|------|---------|-------------|
| `src/components/AuthProvider.js` | Root layout | Auth state context (login/signup/logout functions) |
| `src/components/Navbar.js` | All pages | Top navigation — adapts for public/member/admin |
| `src/components/Sidebar.js` | Member & Admin layouts | Collapsible sidebar with role-aware links |
| `src/components/LandingPage.js` | Homepage | Marketing content (hero, explore, programs, pricing) |

---

## LAYOUTS (page wrappers)

| File | Wraps | What it adds |
|------|-------|-------------|
| `src/app/layout.js` | Everything | Global CSS, AuthProvider, HTML shell |
| `src/app/(member)/layout.js` | `/dashboard`, `/explore`, `/course/*` | Navbar + Sidebar |
| `src/app/(admin)/layout.js` | `/admin/*` | Navbar + Sidebar (admin mode) |

---

## CORE LIBRARIES

| File | What it does |
|------|-------------|
| `src/lib/db.js` | Vercel Postgres connection + table schemas |
| `src/lib/auth.js` | JWT tokens, password hashing, role checks |
| `src/lib/stripe.js` | Stripe config, price IDs, role mapping |
| `src/middleware.js` | Route protection — redirects unauthenticated users |

---

## STYLES

Every page has its own `.module.css` file sitting next to its `page.js`.
Global styles are in `src/app/globals.css`.

---

## FOLDER EXPLANATION

```
src/app/(member)/    ← Parentheses = "route group" — doesn't affect the URL
                       Just means these pages share the member layout (Navbar + Sidebar)
                       
src/app/(admin)/     ← Same idea — admin pages share the admin layout

src/app/api/         ← Backend API endpoints (serverless functions on Vercel)
```

The `(member)` and `(admin)` folders do NOT appear in the URL.
`/dashboard` maps to `src/app/(member)/dashboard/page.js`
`/admin` maps to `src/app/(admin)/admin/page.js`
