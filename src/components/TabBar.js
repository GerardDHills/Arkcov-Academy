'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from './AuthProvider';
import Icon from './Icon';
import styles from './TabBar.module.css';

// Bottom tab bar for signed-in cadets on phones: the five places they go most.
const TABS = [
  { href: '/dashboard', label: 'Home', icon: 'home', match: ['/dashboard'] },
  { href: '/classroom', label: 'Classrooms', icon: 'door', match: ['/classroom', '/live'] },
  { href: '/cases', label: 'Cases', icon: 'stethoscope', match: ['/cases'] },
  { href: '/atlas', label: 'Atlas', icon: 'heart', match: ['/atlas'] },
  { href: '/classroom/gaming-hall', label: 'Games', icon: 'game', match: ['/classroom/gaming-hall', '/play', '/games'] },
];

export default function TabBar() {
  const { user } = useAuth();
  const path = usePathname() || '';
  useEffect(() => {
    if (!user) return undefined;
    document.body.classList.add('has-tabbar');
    return () => document.body.classList.remove('has-tabbar');
  }, [user]);
  if (!user) return null;
  const active = (t) => t.match.some((m) => path === m || path.startsWith(`${m}/`));
  // Longest match wins, so the Games tab beats Classrooms inside the Gaming Hall.
  const current = [...TABS].filter(active).sort((a, b) => Math.max(...b.match.map((m) => (path.startsWith(m) ? m.length : 0))) - Math.max(...a.match.map((m) => (path.startsWith(m) ? m.length : 0))))[0];
  return (
    <nav className={styles.bar} aria-label="Academy">
      {TABS.map((t) => (
        <Link key={t.href} href={t.href} className={`${styles.tab} ${current === t ? styles.on : ''}`} aria-current={current === t ? 'page' : undefined}>
          <Icon name={t.icon} size={21} />
          <span>{t.label}</span>
        </Link>
      ))}
    </nav>
  );
}
