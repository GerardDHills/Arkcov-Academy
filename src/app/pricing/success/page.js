'use client';

import { useEffect, Suspense } from 'react';
import { ArkcovCrest } from '@/components/BrandMark';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { useAuth } from '@/components/AuthProvider';
import styles from './success.module.css';

function SuccessContent() {
  const { fetchUser } = useAuth();
  const searchParams = useSearchParams();
  const sponsor = searchParams.get('sponsor') === '1';

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchUser();
    }, 2000);
    return () => clearTimeout(timer);
  }, [fetchUser]);

  return (
    <>
      <Navbar />
      <div className={styles.page}>
        <div className={styles.card}>
          <div className={styles.icon}><ArkcovCrest size={110} title="Arkcov Academy crest" /></div>
          <h1>{sponsor ? 'Thank you for sponsoring a cadet!' : 'Welcome to Arkcov Academy, Cadet!'}</h1>
          <p>
            {sponsor
              ? 'Your gift pays for a full Cadet year for a student on scholarship. Our team will place your seat with a cadet and email your receipt from Stripe.'
              : 'Your membership is active. Every case, the full Season One curriculum, films, games and certificates are now open to you.'}
          </p>
          {!sponsor && <div className={styles.buttons}>
            <Link href="/dashboard" className="btn btn-crimson btn-lg">Go to Dashboard</Link>
            <Link href="/explore" className="btn btn-outline btn-lg">Explore Content</Link>
          </div>}
          {sponsor && <div className={styles.buttons}><Link href="/" className="btn btn-crimson btn-lg">Back to Arkcov Academy</Link></div>}
          {!sponsor && <p className={styles.note}>
            Your account may take a moment to update. If you don't see full access yet, try refreshing the page.
          </p>}
        </div>
      </div>
    </>
  );
}

export default function SuccessPage() {
  return (
    <Suspense>
      <SuccessContent />
    </Suspense>
  );
}
