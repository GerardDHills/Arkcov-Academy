'use client';

import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import styles from '../(member)/member.module.css';

export default function AdminLayout({ children }) {
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
