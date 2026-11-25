'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from './AuthProvider';
import styles from './Navbar.module.css';
import { ArkcovLockup } from './BrandMark';

export default function Navbar() {
  const { user, loading, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <nav className={styles.nav} aria-label="Main">
      <a href="#main" className="skip-link">Skip to content</a>
      <Link href={user ? '/dashboard' : '/'} className={styles.logo} aria-label="Arkcov Academy home">
        <ArkcovLockup size={38} onDark />
      </Link>

      <ul className={`${styles.links} ${menuOpen ? styles.open : ''}`}>
        {!user ? (
          <>
            <li><a href="/campus" onClick={() => setMenuOpen(false)}>Campus</a></li>
            <li><Link href="/#paths" onClick={() => setMenuOpen(false)}>Find your path</Link></li>
            <li><Link href="/#explore" onClick={() => setMenuOpen(false)}>Library</Link></li>
            <li><Link href="/#programs" onClick={() => setMenuOpen(false)}>Programs</Link></li>
            <li><Link href="/store" onClick={() => setMenuOpen(false)}>Store</Link></li>
            <li><Link href="/#about" onClick={() => setMenuOpen(false)}>About</Link></li>
            <li><Link href="/login" onClick={() => setMenuOpen(false)}>Log In</Link></li>
            <li><Link href="/signup" className={styles.cta} onClick={() => setMenuOpen(false)}>Join Now</Link></li>
          </>
        ) : (
          <>
            <li><Link href="/dashboard" onClick={() => setMenuOpen(false)}>Dashboard</Link></li>
            <li><Link href="/explore" onClick={() => setMenuOpen(false)}>Explore</Link></li>
            <li><a href="/campus" onClick={() => setMenuOpen(false)}>Campus</a></li>
            <li><Link href="/store" onClick={() => setMenuOpen(false)}>Store</Link></li>
            {user.role === 'admin' && (
              <li><Link href="/admin" onClick={() => setMenuOpen(false)}>Admin</Link></li>
            )}
            <li className={styles.profileWrap}>
              <button
                className={styles.profileBtn}
                onClick={() => setProfileOpen(!profileOpen)}
                aria-expanded={profileOpen}
                aria-haspopup="menu"
              >
                <div className={styles.avatar}>
                  {user.name?.charAt(0).toUpperCase()}
                </div>
                <span className={styles.profileName}>{user.name?.split(' ')[0]}</span>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
              {profileOpen && (
                <div className={styles.dropdown}>
                  <div className={styles.dropdownHeader}>
                    <div className={styles.dropdownName}>{user.name}</div>
                    <div className={styles.dropdownEmail}>{user.email}</div>
                    <div className={styles.roleBadge}>{user.role}</div>
                  </div>
                  <div className={styles.dropdownDivider} />
                  <Link href="/dashboard" className={styles.dropdownItem} onClick={() => setProfileOpen(false)}>Dashboard</Link>
                  <Link href="/pricing" className={styles.dropdownItem} onClick={() => setProfileOpen(false)}>Membership &amp; billing</Link>
                  <div className={styles.dropdownDivider} />
                  <button className={styles.dropdownItem} onClick={() => { setProfileOpen(false); logout(); }}>
                    Log Out
                  </button>
                </div>
              )}
            </li>
          </>
        )}
      </ul>

      <button className={styles.hamburger} onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen}>
        <span /><span /><span />
      </button>
    </nav>
  );
}
