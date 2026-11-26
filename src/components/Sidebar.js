'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from './AuthProvider';
import styles from './Sidebar.module.css';
import Icon from './Icon';

const memberLinks = [
  { href: '/dashboard', label: 'Academy Home', icon: 'home' },
  { href: '/classroom', label: 'Virtual Classrooms', icon: 'door' },
  { href: '/cases', label: 'Case Library', icon: 'stethoscope' },
  { href: '/passport', label: 'Cadet Passport', icon: 'award' },
  { href: '/superpower', label: 'Superpower Assessment', icon: 'sparkle' },
  { href: '/classroom/gaming-hall', label: 'Gaming Hall', icon: 'game' },
  { href: '/teach', label: 'Faculty Hall', icon: 'cap' },
  { section: 'Watch & listen' },
  { href: '/explore', label: 'Explore the library', icon: 'compass' },
  { href: '/explore?type=course', label: 'Courses', icon: 'book' },
  { href: '/explore?type=podcast', label: 'Podcasts', icon: 'mic' },
  { href: '/explore?type=movie', label: 'Movies', icon: 'film' },
  { href: '/explore?type=tv_show', label: 'TV Shows', icon: 'tv' },
  { href: '/explore?type=animated_short', label: 'Animated Shorts', icon: 'sparkle' },
];

const adminLinks = [
  { href: '/admin', label: 'Admin Home', icon: 'bolt' },
  { href: '/admin/content', label: 'Content Manager', icon: 'folder' },
  { href: '/admin/users', label: 'Users', icon: 'users' },
  { href: '/admin/store', label: 'Store Files', icon: 'folder' },
  { href: '/admin/staff', label: 'Faculty & Safety', icon: 'shield' },
];

export default function Sidebar() {
  const { user } = useAuth();
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const isAdmin = pathname.startsWith('/admin');
  const links = isAdmin ? adminLinks : memberLinks;

  return (
    <aside className={`${styles.sidebar} ${collapsed ? styles.collapsed : ''}`} aria-label={isAdmin ? 'Admin menu' : 'Academy menu'}>
      <button className={styles.toggle} onClick={() => setCollapsed(!collapsed)} aria-label={collapsed ? 'Expand menu' : 'Collapse menu'} aria-expanded={!collapsed}>
        {collapsed ? '→' : '←'}
      </button>

      <div className={styles.section}>
        <div className={styles.sectionLabel}>{isAdmin ? 'Admin' : 'Academy'}</div>
        {links.map((link) => link.section ? (
          !collapsed && <div key={link.section} className={styles.sectionLabel} style={{ marginTop: 14 }}>{link.section}</div>
        ) : (
          <Link
            key={link.href}
            href={link.href}
            className={`${styles.link} ${pathname === link.href ? styles.active : ''}`}
            aria-current={pathname === link.href ? 'page' : undefined}
            title={collapsed ? link.label : undefined}
          >
            <span className={styles.icon}><Icon name={link.icon} size={19} /></span>
            {!collapsed && <span className={styles.label}>{link.label}</span>}
          </Link>
        ))}
      </div>

      {!isAdmin && user?.role === 'admin' && (
        <div className={styles.section}>
          <div className={styles.sectionLabel}>Admin</div>
          {adminLinks.slice(0, 2).map((link) => (
            <Link key={link.href} href={link.href} className={styles.link}>
              <span className={styles.icon}><Icon name={link.icon} size={19} /></span>
              {!collapsed && <span className={styles.label}>{link.label}</span>}
            </Link>
          ))}
        </div>
      )}

      {!collapsed && (
        <div className={styles.tierCard}>
          <div className={styles.tierLabel}>{user?.role === 'free' ? 'Free cadet' : user?.role === 'admin' ? 'Admin' : `${user?.role} plan`}</div>
          {user?.role === 'free' && (
            <>
              <p className={styles.tierDesc}>Upgrade for the full library, games and certificates</p>
              <Link href="/pricing" className={styles.upgradeBtn}>Upgrade</Link>
            </>
          )}
        </div>
      )}
    </aside>
  );
}
