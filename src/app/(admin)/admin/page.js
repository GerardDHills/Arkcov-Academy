'use client';

import { useAuth } from '@/components/AuthProvider';
import Link from 'next/link';
import styles from './admin.module.css';

export default function AdminPage() {
  const { user } = useAuth();

  return (
    <div className={styles.admin}>
      <div className={styles.header}>
        <h1>Admin Dashboard</h1>
        <p>Manage Arkcov Academy content, users, and subscriptions</p>
      </div>

      <div className={styles.grid}>
        <Link href="/admin/content" className={styles.actionCard}>
          <div className={styles.actionIcon}>📁</div>
          <h3>Content Manager</h3>
          <p>Upload and manage courses, movies, podcasts, TV shows, and games</p>
          <span className={styles.actionArrow}>→</span>
        </Link>

        <Link href="/admin/users" className={styles.actionCard}>
          <div className={styles.actionIcon}>👥</div>
          <h3>User Management</h3>
          <p>View members, manage roles, and track subscriptions</p>
          <span className={styles.actionArrow}>→</span>
        </Link>

        <Link href="/admin/analytics" className={styles.actionCard}>
          <div className={styles.actionIcon}>📊</div>
          <h3>Analytics</h3>
          <p>Track engagement, revenue, and platform growth</p>
          <span className={styles.actionArrow}>→</span>
        </Link>

        <div className={styles.actionCard} style={{ cursor: 'default' }}>
          <div className={styles.actionIcon}>⚙️</div>
          <h3>Platform Settings</h3>
          <p>Configure tiers, branding, and feature flags</p>
          <span className={styles.comingSoon}>Coming Soon</span>
        </div>
      </div>

      <div className={styles.quickStats}>
        <h2>Quick Stats</h2>
        <div className={styles.statsRow}>
          <div className={styles.stat}>
            <div className={styles.statNum}>—</div>
            <div className={styles.statLabel}>Total Users</div>
          </div>
          <div className={styles.stat}>
            <div className={styles.statNum}>—</div>
            <div className={styles.statLabel}>Active Members</div>
          </div>
          <div className={styles.stat}>
            <div className={styles.statNum}>—</div>
            <div className={styles.statLabel}>Content Items</div>
          </div>
          <div className={styles.stat}>
            <div className={styles.statNum}>—</div>
            <div className={styles.statLabel}>Monthly Revenue</div>
          </div>
        </div>
      </div>
    </div>
  );
}
