# Arkcov Academy

A full-stack medical entertainment platform.
Created by Dr. Gerard D. Hills, M.D.

**Tech:** Next.js 14 · Vercel Postgres · Stripe · JWT Auth

---

## Deployment Guide (GitHub → Vercel)

### Step 1: Create GitHub Repo

```bash
# In the arkcov-academy-app folder:
git init
git add .
git commit -m "Arkcov Academy v1"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/arkcov-academy.git
git push -u origin main
```

### Step 2: Connect to Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your `arkcov-academy` GitHub repo
3. Framework Preset: **Next.js** (should auto-detect)
4. Click **Deploy**

> ⚠️ IMPORTANT: If you previously deployed the old marketing `index.html` to this Vercel project, create a NEW Vercel project instead. The old static file will override Next.js routing.

### Step 3: Add Postgres Database

1. In your Vercel project dashboard, go to **Storage** tab
2. Click **Create Database** → **Postgres**
3. Name it `arkcov-academy-db`
4. Click **Connect**

That's it — Vercel auto-injects all `POSTGRES_*` environment variables. No manual database URL needed.

### Step 4: Set Environment Variables

In Vercel Dashboard → **Settings** → **Environment Variables**, add:

| Variable | Value | Required? |
|----------|-------|-----------|
| `JWT_SECRET` | Run `openssl rand -hex 32` and paste result | ✅ Yes |
| `SETUP_KEY` | `arkcov-init-2025` | ✅ Yes |
| `NEXT_PUBLIC_APP_URL` | `https://your-app.vercel.app` | ✅ Yes |
| `STRIPE_SECRET_KEY` | From Stripe Dashboard | Later |
| `STRIPE_WEBHOOK_SECRET` | From Stripe Webhooks | Later |
| `STRIPE_PRICE_MEMBER` | Price ID for $9/mo plan | Later |
| `STRIPE_PRICE_FAMILY` | Price ID for $14/mo plan | Later |

After adding variables, **redeploy** (push a commit or click Redeploy in Vercel).

### Step 5: Initialize Database Tables

After deploying with Postgres connected, run this command (replace URL with your Vercel app URL):

```bash
curl -X POST https://your-app.vercel.app/api/admin/init-db \
  -H "Content-Type: application/json" \
  -d '{"setupKey": "arkcov-init-2025"}'
```

You should see: `{"success":true,"message":"Database initialized"}`

### Step 6: Create Your Admin Account

1. Go to `https://your-app.vercel.app/signup`
2. Create an account with your email
3. Go to Vercel Dashboard → Storage → your database → **Data** tab
4. Run this SQL query:

```sql
UPDATE users SET role = 'admin' WHERE email = 'your@email.com';
```

5. Log out and log back in — you'll now see the Admin panel

### Step 7: Start Adding Content

1. Log in as admin
2. Go to **Admin** → **Content Manager**
3. Click **+ Add Content**
4. Fill in title, type, description, media URLs
5. Toggle **Published** to make it visible to members

---

## Ongoing Deployment

After initial setup, deploying is automatic:

```bash
git add .
git commit -m "your changes"
git push
```

Vercel auto-deploys on every push to `main`.

---

## File Map

See `ROUTES.md` for a complete map of every page, API route, and component.

---

## Roles

| Role | Access | How to get it |
|------|--------|---------------|
| `free` | Previews, newsletter, basic scholarship hub | Sign up |
| `member` | Full library, games, discounts ($9/mo) | Stripe checkout |
| `family` | Everything + 5 profiles, parental controls ($14/mo) | Stripe checkout |
| `admin` | Everything + content manager, user admin | Manual SQL update |
