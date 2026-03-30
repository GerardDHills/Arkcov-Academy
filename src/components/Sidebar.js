'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from './AuthProvider';
import styles from './Sidebar.module.css';

const memberLinks = [
  { href: '/dashboard', label: 'Dashboard', icon: '🏠' },
  { href: '/explore', label: 'Explore', icon: '🔍' },
  { href: '/explore?type=course', label: 'Courses', icon: '📚' },
  { href: '/explore?type=podcast', label: 'Podcasts', icon: '🎙️' },
  { href: '/explore?type=movie', label: 'Movies', icon: '🎬' },
  { href: '/explore?type=tv_show', label: 'TV Shows', icon: '📺' },
  { href: '/explore?type=animated_short', label: 'Animated Shorts', icon: '✨' },
  { href: '/explore?type=interactive_game', label: 'Interactive Games', icon: '🎮' },
];

const adminLinks = [
  { href: '/admin', label: 'Admin Home', icon: '⚡' },
  { href: '/admin/content', label: 'Content Manager', icon: '📁' },
  { href: '/admin/users', label: 'Users', icon: '👥' },
  { href: '/admin/analytics', label: 'Analytics', icon: '📊' },
];

export default function Sidebar() {
  const { user } = useAuth();
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const isAdmin = pathname.startsWith('/admin');
  const links = isAdmin ? adminLinks : memberLinks;

  return (
    <aside className={`${styles.sidebar} ${collapsed ? styles.collapsed : ''}`}>
      <button className={styles.toggle} onClick={() => setCollapsed(!collapsed)}>
        {collapsed ? '→' : '←'}
      </button>

      <div className={styles.section}>
        <div className={styles.sectionLabel}>{isAdmin ? 'Admin' : 'Menu'}</div>
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`${styles.link} ${pathname === link.href ? styles.active : ''}`}
          >
            <span className={styles.icon}>{link.icon}</span>
            {!collapsed && <span className={styles.label}>{link.label}</span>}
          </Link>
        ))}
      </div>

      {!isAdmin && user?.role === 'admin' && (
        <div className={styles.section}>
          <div className={styles.sectionLabel}>Admin</div>
          {adminLinks.slice(0, 2).map((link) => (
            <Link key={link.href} href={link.href} className={styles.link}>
              <span className={styles.icon}>{link.icon}</span>
              {!collapsed && <span className={styles.label}>{link.label}</span>}
            </Link>
          ))}
        </div>
      )}

      {!collapsed && (
        <div className={styles.tierCard}>
          <div className={styles.tierLabel}>{user?.role === 'free' ? 'Free Plan' : user?.role === 'admin' ? 'Admin' : `${user?.role} Plan`}</div>
          {user?.role === 'free' && (
            <>
              <p className={styles.tierDesc}>Upgrade for full access</p>
              <Link href="/pricing" className={styles.upgradeBtn}>Upgrade</Link>
            </>
          )}
        </div>
      )}
    </aside>
  );
}
