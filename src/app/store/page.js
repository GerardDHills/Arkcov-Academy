'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import { useAuth } from '@/components/AuthProvider';
import { PRODUCTS, priceFor, formatPrice, MEMBER_DISCOUNT } from '@/lib/products';
import styles from './store.module.css';

const CATEGORIES = ['All', ...Array.from(new Set(PRODUCTS.map((p) => p.category)))];

function ProductCard({ product, role }) {
  const [variantId, setVariantId] = useState(product.variants?.[0]?.id || '');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const variant = product.variants?.find((v) => v.id === variantId);
  const base = variant?.price || product.price;
  const yours = priceFor({ ...product, price: base }, role);
  const soon = product.status !== 'available';

  async function buy() {
    setBusy(true);
    setError('');
    try {
      const res = await fetch('/api/store/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug: product.slug, variantId, quantity: 1 }),
      });
      const json = await res.json();
      if (!res.ok || !json.url) throw new Error(json.error || 'Checkout could not start.');
      window.location.href = json.url;
    } catch (e) {
      setError(e.message);
      setBusy(false);
    }
  }

  return (
    <article className={styles.card}>
      <div className={styles.media}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={variant?.image || product.image} alt={product.name} loading="lazy" />
        {soon && <span className={styles.soon}>Coming soon</span>}
      </div>
      <div className={styles.body}>
        <p className={styles.cat}>{product.category}</p>
        <h2>{product.name}</h2>
        <p className={styles.blurb}>{product.blurb}</p>
        {product.details?.length > 0 && (
          <ul className={styles.details}>{product.details.map((d) => <li key={d}>{d}</li>)}</ul>
        )}
        {product.variants?.length > 0 && (
          <label className={styles.select}>
            <span>Size and color</span>
            <select value={variantId} onChange={(e) => setVariantId(e.target.value)} disabled={soon}>
              {product.variants.map((v) => <option key={v.id} value={v.id}>{v.label}</option>)}
            </select>
          </label>
        )}
        <div className={styles.buyRow}>
          <p className={styles.price}>
            {yours < base && <s>{formatPrice(base)}</s>} {formatPrice(yours)}
          </p>
          <button className="btn btn-crimson" onClick={buy} disabled={soon || busy}>
            {soon ? 'Coming soon' : busy ? 'Opening checkout…' : product.kind === 'digital' ? 'Buy and download' : 'Buy now'}
          </button>
        </div>
        {error && <p className={styles.error} role="alert">{error}</p>}
      </div>
    </article>
  );
}

export default function StorePage() {
  const { user } = useAuth();
  const [cat, setCat] = useState('All');
  const shown = PRODUCTS.filter((p) => cat === 'All' || p.category === cat);
  const member = ['member', 'family', 'admin'].includes(user?.role);

  return (
    <>
      <Navbar />
      <main id="main" className={styles.page}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>Cadet gear</p>
          <h1>The Academy store</h1>
          <p>Tools and gear for the journey to medicine.{' '}
            {member ? `Your member price is already applied: ${Math.round(MEMBER_DISCOUNT * 100)}% off.` : `Members save ${Math.round(MEMBER_DISCOUNT * 100)}% on every order.`}
          </p>
        </header>
        {CATEGORIES.length > 2 && (
          <div className={styles.tabs} role="group" aria-label="Filter by category">
            {CATEGORIES.map((c) => (
              <button key={c} aria-pressed={cat === c} onClick={() => setCat(c)}>{c}</button>
            ))}
          </div>
        )}
        <section className={styles.grid}>
          {shown.map((p) => <ProductCard key={p.slug} product={p} role={user?.role} />)}
        </section>
        <p className={styles.small}>Secure checkout by Stripe. Apparel and accessories are made to order and ship within the US.</p>
      </main>
    </>
  );
}
