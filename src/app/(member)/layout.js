'use client';

import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import styles from './member.module.css';

export default function MemberLayout({ children }) {
  return (
    <>
      <Navbar />
      <div className={styles.layout}>
        <Sidebar />
        <main className={styles.main}>
          {children}
        </main>
      </div>
    </>
  );
}
