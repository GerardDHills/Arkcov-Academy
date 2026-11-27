'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { useAuth } from '@/components/AuthProvider';
import { PLANS, SPONSOR, dollars, yearlySavings, foundingOpen } from '@/lib/plans';
import styles from './pricing.module.css';

const TIERS = [PLANS.free, PLANS.cadet, PLANS.family];

const ADD_ONS = [
  { title: 'Inspiring Healers mentorship', text: 'Live cohort classes with working physicians and healers, with breakout coaching inside every session. Priced per semester.', status: 'Applications open', href: '/inspiring-healers', cta: 'Learn about the program' },
  { title: 'ACT and SAT prep', text: 'Test prep built the Arkcov way: science reasoning, reading and math taught through real patient stories.', status: 'Coming 2027' },
  { title: 'MCAT and NCLEX prep', text: 'For our college cadets: question banks and case-based review, priced well below the big prep companies.', status: 'Coming later' },
];

export default function PricingPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [loadingPlan, setLoadingPlan] = useState(null);
  const [error, setError] = useState('');
  const [billing, setBilling] = useState('year');
  const [seats, setSeats] = useState(1);
  const founding = foundingOpen();
  const partnerEmail = process.env.NEXT_PUBLIC_PARTNER_EMAIL;
  const paid = user && (user.role === 'member' || user.role === 'family');

  const startCheckout = async (url, payload, key) => {
    setLoadingPlan(key);
    setError('');
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      window.location.href = data.url; // Stripe Checkout
    } catch (err) {
      setError(err.message);
      setLoadingPlan(null);
    }
  };

  const handleSubscribe = (plan) => {
    if (!user) {
      router.push('/signup');
      return;
    }
    startCheckout('/api/stripe/checkout', { plan, interval: plan === 'founding' ? 'year' : billing }, plan);
  };

  const handleSponsor = () => startCheckout('/api/stripe/sponsor', { seats }, 'sponsor');

  const handleManageBilling = async () => {
    setError('');
    try {
      const res = await fetch('/api/stripe/portal', { method: 'POST' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      window.location.href = data.url;
    } catch (err) {
      setError(err.message);
    }
  };

  const isCurrentPlan = (planKey) => !!user && user.role === PLANS[planKey].role;

  const priceLine = (plan) => {
    if (!plan.prices.month) return { big: '$0', per: '', note: 'Free forever' };
    if (billing === 'year') {
      return {
        big: dollars(plan.prices.year),
        per: '/yr',
        note: `About ${dollars(Math.round(plan.prices.year / 1200) * 100)}/mo. Save ${yearlySavings(plan)}% vs monthly.`,
      };
    }
    return { big: dollars(plan.prices.month), per: '/mo', note: `Or ${dollars(plan.prices.year)}/yr and save ${yearlySavings(plan)}%` };
  };

  const spinner = <><div className="spinner" /> Opening checkout...</>;

  return (
    <>
      <Navbar />
      <div className={styles.page}>
        <div className={styles.bgShapes}>
          <div className={styles.shape1} />
          <div className={styles.shape2} />
        </div>

        <div className={styles.container}>
          <div className={styles.header}>
            <div className={styles.eyebrow}>Membership</div>
            <h1>Start your healer&rsquo;s head start</h1>
            <p>Physician-built training that prepares middle and high school cadets for medical school, nursing school and every healthcare career.</p>
          </div>

          <div className={styles.toggle} role="group" aria-label="Billing period">
            <button className={billing === 'month' ? styles.toggleOn : ''} onClick={() => setBilling('month')} aria-pressed={billing === 'month'}>Monthly</button>
            <button className={billing === 'year' ? styles.toggleOn : ''} onClick={() => setBilling('year')} aria-pressed={billing === 'year'}>
              Yearly <span className={styles.save}>Save up to 35%</span>
            </button>
          </div>

          {error && <div className="message message-error" style={{ maxWidth: 500, margin: '0 auto 1.5rem' }}>{error}</div>}

          <div className={styles.grid}>
            {TIERS.map((plan) => {
              const current = isCurrentPlan(plan.key);
              const p = priceLine(plan);
              const cta = plan.key === 'cadet' ? 'Become a Cadet' : 'Start the Family plan';
              return (
                <div key={plan.key} className={`${styles.card} ${plan.featured ? styles.featured : ''} ${current ? styles.current : ''}`}>
                  {plan.featured && !current && <div className={styles.badge}>Most popular</div>}
                  {current && <div className={styles.currentBadge}>Your plan</div>}

                  <div className={styles.planName}>{plan.name}</div>
                  <div className={styles.planDesc}>{plan.tagline}</div>
                  <div className={styles.planPrice}>
                    {p.big}
                    {p.per && <span>{p.per}</span>}
                  </div>
                  <div className={styles.planNote}>{p.note}</div>

                  <div className={styles.unlockLabel}>{plan.key === 'free' ? 'Includes' : 'Unlocks'}</div>
                  <div className={styles.features}>
                    {plan.unlocks.map((f) => (
                      <div key={f} className={styles.feature}>
                        <span className={styles.checkIcon}>✓</span>
                        {f}
                      </div>
                    ))}
                  </div>

                  {plan.key === 'free' ? (
                    user ? (
                      <div className={styles.currentLabel}>{current ? 'Current plan' : 'Included with every plan'}</div>
                    ) : (
                      <Link href="/signup" className="btn btn-outline btn-full">Enlist free</Link>
                    )
                  ) : current ? (
                    <button className="btn btn-outline btn-full" onClick={handleManageBilling}>Manage billing</button>
                  ) : (
                    <button
                      className={`btn ${plan.featured ? 'btn-crimson' : 'btn-navy'} btn-full`}
                      onClick={() => handleSubscribe(plan.key)}
                      disabled={!!loadingPlan}
                    >
                      {loadingPlan === plan.key ? spinner : cta}
                    </button>
                  )}
                </div>
              );
            })}
          </div>

          {founding && !paid && (
            <div className={styles.founding}>
              <div>
                <div className={styles.foundingTag}>Founding Cadet rate · limited time</div>
                <h2>{PLANS.founding.name}: {dollars(PLANS.founding.prices.year)}/yr, locked in</h2>
                <p>Everything in Cadet for our first families. Your rate never goes up while you stay enrolled.</p>
              </div>
              <button className="btn btn-gold" onClick={() => handleSubscribe('founding')} disabled={!!loadingPlan}>
                {loadingPlan === 'founding' ? spinner : 'Claim the founding rate'}
              </button>
            </div>
          )}

          {paid && (
            <div className={styles.billingLink}>
              <button onClick={handleManageBilling} className={styles.manageLink}>
                Manage billing, update payment method, or cancel →
              </button>
            </div>
          )}

          <section className={styles.extras} aria-labelledby="extras-title">
            <h2 id="extras-title">Go further</h2>
            <p className={styles.extrasLede}>Add-ons for cadets who are ready for more. Every plan keeps the core academy.</p>
            <div className={styles.extrasGrid}>
              {ADD_ONS.map((a) => (
                <div key={a.title} className={styles.extraCard}>
                  <span className={styles.extraStatus}>{a.status}</span>
                  <h3>{a.title}</h3>
                  <p>{a.text}</p>
                  {a.href && <Link href={a.href} className={styles.extraLink}>{a.cta} &rarr;</Link>}
                </div>
              ))}
            </div>
          </section>

          <section className={styles.giveGrid} aria-label="Sponsor and partner">
            <div className={styles.giveCard} id="sponsor">
              <span className={styles.extraStatus}>Give</span>
              <h3>{SPONSOR.name}</h3>
              <p>{dollars(SPONSOR.amount)} gives a student on scholarship a full Cadet year. Churches, alumni and friends can sponsor one cadet or a whole class.</p>
              <div className={styles.sponsorRow}>
                <label htmlFor="seats">Cadets</label>
                <select id="seats" value={seats} onChange={(e) => setSeats(parseInt(e.target.value, 10))}>
                  {[1, 2, 3, 5, 10, 25].map((n) => <option key={n} value={n}>{n}</option>)}
                </select>
                <span className={styles.sponsorTotal}>{dollars(SPONSOR.amount * seats)}</span>
              </div>
              <button className="btn btn-crimson" onClick={handleSponsor} disabled={!!loadingPlan}>
                {loadingPlan === 'sponsor' ? spinner : 'Sponsor a cadet'}
              </button>
            </div>
            <div className={styles.giveCard}>
              <span className={styles.extraStatus}>Partners</span>
              <h3>Schools, churches and programs</h3>
              <p>Bring Arkcov Academy to a whole group with per-seat yearly licenses and live classes for your cadets.</p>
              {partnerEmail ? (
                <a className="btn btn-navy" href={`mailto:${partnerEmail}?subject=Arkcov%20Academy%20partner%20pricing`}>Ask about partner pricing</a>
              ) : (
                <div className={styles.currentLabel}>Partner pricing opens soon</div>
              )}
            </div>
          </section>

          <div className={styles.faq}>
            <h2>Common Questions</h2>
            <div className={styles.faqGrid}>
              <div className={styles.faqItem}>
                <h3>Can I cancel anytime?</h3>
                <p>Yes. Cancel anytime from your billing portal. You keep access until the end of your billing period.</p>
              </div>
              <div className={styles.faqItem}>
                <h3>What do Recruits get for free?</h3>
                <p>The orientation mission, TV Show Episode 1, the Social Superpower Assessment, and sample lessons and cases. Become a Cadet to unlock every case, the full curriculum and certificates.</p>
              </div>
              <div className={styles.faqItem}>
                <h3>What is the Founding Cadet rate?</h3>
                <p>Our first families pay {dollars(PLANS.founding.prices.year)} a year for everything in Cadet, and that rate stays the same for as long as you stay enrolled.</p>
              </div>
              <div className={styles.faqItem}>
                <h3>Is my payment secure?</h3>
                <p>All payments are processed securely through Stripe. We never see or store your card details.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
