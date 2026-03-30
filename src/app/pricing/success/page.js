'use client';

import { useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { useAuth } from '@/components/AuthProvider';
import styles from './success.module.css';

function SuccessContent() {
  const { fetchUser } = useAuth();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');

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
          <div className={styles.icon}>🎉</div>
          <h1>Welcome to Arkcov Academy!</h1>
          <p>Your membership is now active. You have full access to the library, interactive games, and member perks.</p>
          <div className={styles.buttons}>
            <Link href="/dashboard" className="btn btn-crimson btn-lg">Go to Dashboard</Link>
            <Link href="/explore" className="btn btn-outline btn-lg">Explore Content</Link>
          </div>
          <p className={styles.note}>
            Your account may take a moment to update. If you don't see full access yet, try refreshing the page.
          </p>
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
