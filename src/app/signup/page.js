'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthProvider';
import styles from '../login/auth.module.css';
import { ArkcovCrest } from '@/components/BrandMark';
import { SUPERPOWERS } from '@/lib/superpowers';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [superpower, setSuperpower] = useState(null);
  const { signup } = useAuth();

  // Show the cadet's Social Superpower if they took the assessment first.
  useEffect(() => {
    let key = new URLSearchParams(window.location.search).get('superpower');
    if (!key) {
      try { key = JSON.parse(window.localStorage.getItem('arkcov-ssa-v1'))?.result?.primary?.[0]?.key; } catch { key = null; }
    }
    if (key && SUPERPOWERS[key]) setSuperpower(SUPERPOWERS[key]);
  }, []);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    setLoading(true);
    try {
      await signup(name, email, password);
      router.push('/dashboard');
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
        <h1 className={styles.title}>Enlist in the Academy</h1>
        <p className={styles.subtitle}>Create your free cadet account. It&apos;s cool to be smart.</p>

        {superpower ? (
          <div className="message message-success" role="status">
            Welcome, <strong>{superpower.identity}</strong>. Enlist to unlock training on how to use your {superpower.name} as a healer.
          </div>
        ) : (
          <p className={styles.subtitle}><Link href="/superpower">New here? Discover your Social Superpower first.</Link></p>
        )}

        {error && <div className="message message-error">{error}</div>}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className="form-group">
            <label className="form-label" htmlFor="full-name">Full Name</label>
            <input
              id="full-name"
              type="text"
              className="form-input"
              placeholder="Your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
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
              placeholder="At least 8 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="confirm-password">Confirm Password</label>
            <input
              id="confirm-password"
              type="password"
              className="form-input"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-crimson btn-full btn-lg" disabled={loading}>
            {loading ? <><div className="spinner" /> Creating account...</> : 'Create Account'}
          </button>
        </form>

        <p className={styles.switchText}>
          Already have an account? <Link href="/login" className={styles.switchLink}>Log In</Link>
        </p>
      </div>
    </div>
  );
}
