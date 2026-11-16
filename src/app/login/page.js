'use client';

import { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/components/AuthProvider';
import styles from './auth.module.css';
import { ArkcovCrest } from '@/components/BrandMark';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const user = await login(email, password);
      const redirect = searchParams.get('redirect') || (user.role === 'admin' ? '/admin' : '/dashboard');
      router.push(redirect);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.authPage}>
      <div className={styles.bgShapes}>
        <div className={styles.shape1} />
        <div className={styles.shape2} />
      </div>
      <div className={styles.authCard}>
        <Link href="/" className={styles.logoLink}>
          <ArkcovCrest size={110} title="Arkcov Academy home" />
        </Link>
        <h1 className={styles.title}>Welcome back, Cadet</h1>
        <p className={styles.subtitle}>Log in to continue your mission</p>

        {error && <div className="message message-error">{error}</div>}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className="form-group">
            <label className="form-label" htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              className="form-input"
              placeholder="cadet@example.com"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              className="form-input"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-crimson btn-full btn-lg" disabled={loading}>
            {loading ? <><div className="spinner" /> Logging in...</> : 'Log In'}
          </button>
        </form>

        <p className={styles.switchText}>
          Don&apos;t have an account? <Link href="/signup" className={styles.switchLink}>Join the Academy</Link>
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
