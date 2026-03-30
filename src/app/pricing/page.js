'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { useAuth } from '@/components/AuthProvider';
import styles from './pricing.module.css';

const plans = [
  {
    key: 'free',
    name: 'Free',
    price: 0,
    desc: 'Explore and get started',
    features: [
      'Content previews',
      'Newsletter & updates',
      'Scholarship hub (basic)',
      'Store access',
    ],
    cta: 'Current Plan',
    style: 'outline',
  },
  {
    key: 'member',
    name: 'Member',
    price: 9,
    desc: 'Full access to everything',
    featured: true,
    features: [
      'Full library access',
      'Interactive games',
      'Member store discounts',
      'Scholarship tools',
      'Certificates & badges',
    ],
    cta: 'Upgrade to Member',
    style: 'crimson',
  },
  {
    key: 'family',
    name: 'Family',
    price: 14,
    desc: 'For families learning together',
    features: [
      'Everything in Member',
      'Up to 5 profiles',
      'Parental controls',
      'Priority registration',
      'Family bundles',
    ],
    cta: 'Start Family Plan',
    style: 'navy',
  },
];

export default function PricingPage() {
  const { user, fetchUser } = useAuth();
  const router = useRouter();
  const [loadingPlan, setLoadingPlan] = useState(null);
  const [error, setError] = useState('');

  const handleSubscribe = async (plan) => {
    if (!user) {
      router.push('/signup');
      return;
    }

    if (user.role === plan) return;

    setLoadingPlan(plan);
    setError('');

    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      // Redirect to Stripe Checkout
      window.location.href = data.url;
    } catch (err) {
      setError(err.message);
      setLoadingPlan(null);
    }
  };

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

  const isCurrentPlan = (planKey) => {
    if (!user) return false;
    if (planKey === 'free') return user.role === 'free';
    return user.role === planKey;
  };

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
            <div className={styles.eyebrow}>🔑 Membership</div>
            <h1>Choose Your Plan</h1>
            <p>Unlock the full Arkcov Academy experience</p>
          </div>

          {error && <div className="message message-error" style={{ maxWidth: 500, margin: '0 auto 1.5rem' }}>{error}</div>}

          <div className={styles.grid}>
            {plans.map((plan) => {
              const current = isCurrentPlan(plan.key);
              return (
                <div key={plan.key} className={`${styles.card} ${plan.featured ? styles.featured : ''} ${current ? styles.current : ''}`}>
                  {plan.featured && <div className={styles.badge}>Most Popular</div>}
                  {current && <div className={styles.currentBadge}>Your Plan</div>}

                  <div className={styles.planName}>{plan.name}</div>
                  <div className={styles.planPrice}>
                    ${plan.price}
                    {plan.price > 0 && <span>/mo</span>}
                  </div>
                  <div className={styles.planDesc}>{plan.desc}</div>

                  <div className={styles.features}>
                    {plan.features.map((f, i) => (
                      <div key={i} className={styles.feature}>
                        <span className={styles.checkIcon}>✓</span>
                        {f}
                      </div>
                    ))}
                  </div>

                  {plan.key === 'free' ? (
                    current ? (
                      <div className={styles.currentLabel}>Current Plan</div>
                    ) : (
                      <Link href="/signup" className={`btn btn-outline btn-full`}>Sign Up Free</Link>
                    )
                  ) : current ? (
                    <button className="btn btn-outline btn-full" onClick={handleManageBilling}>
                      Manage Billing
                    </button>
                  ) : (
                    <button
                      className={`btn btn-${plan.style} btn-full`}
                      onClick={() => handleSubscribe(plan.key)}
                      disabled={loadingPlan === plan.key}
                    >
                      {loadingPlan === plan.key ? (
                        <><div className="spinner" /> Processing...</>
                      ) : plan.cta}
                    </button>
                  )}
                </div>
              );
            })}
          </div>

          {user && user.role !== 'free' && (
            <div className={styles.billingLink}>
              <button onClick={handleManageBilling} className={styles.manageLink}>
                Manage billing, update payment method, or cancel →
              </button>
            </div>
          )}

          <div className={styles.faq}>
            <h2>Common Questions</h2>
            <div className={styles.faqGrid}>
              <div className={styles.faqItem}>
                <h3>Can I cancel anytime?</h3>
                <p>Yes. Cancel anytime from your billing portal — no questions asked. You'll retain access until the end of your billing period.</p>
              </div>
              <div className={styles.faqItem}>
                <h3>Can I switch plans?</h3>
                <p>Absolutely. Upgrade or downgrade at any time. Changes take effect immediately, and billing is prorated.</p>
              </div>
              <div className={styles.faqItem}>
                <h3>Is my payment secure?</h3>
                <p>All payments are processed securely through Stripe. We never see or store your card details.</p>
              </div>
              <div className={styles.faqItem}>
                <h3>What's included in Free?</h3>
                <p>Free members get content previews, newsletter access, and basic scholarship hub features. Upgrade for the full experience.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
