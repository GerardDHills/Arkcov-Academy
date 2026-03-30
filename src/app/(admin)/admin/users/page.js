'use client';

import { useState, useEffect } from 'react';
import styles from './users.module.css';

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await fetch('/api/admin/users');
        const data = await res.json();
        if (res.ok) {
          setUsers(data.users || []);
          setStats(data.stats || {});
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, []);

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1>User Management</h1>
        <p>View and manage Arkcov Academy members</p>
      </div>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statValue}>{stats.total || 0}</div>
          <div className={styles.statLabel}>Total Users</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statValue}>{stats.free_count || 0}</div>
          <div className={styles.statLabel}>Free</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statValue}>{stats.member_count || 0}</div>
          <div className={styles.statLabel}>Members</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statValue}>{stats.family_count || 0}</div>
          <div className={styles.statLabel}>Family</div>
        </div>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '3rem' }}>
          <div className="spinner" style={{ borderColor: 'var(--warm-gray)', borderTopColor: 'var(--crimson)', width: 32, height: 32, margin: '0 auto' }} />
        </div>
      ) : (
        <div className={styles.table}>
          <div className={styles.tableHeader}>
            <div>Name</div>
            <div>Email</div>
            <div>Role</div>
            <div>Joined</div>
          </div>
          {users.map(user => (
            <div key={user.id} className={styles.tableRow}>
              <div className={styles.nameCell}>
                <div className={styles.avatar}>{user.name?.charAt(0).toUpperCase()}</div>
                <span className={styles.name}>{user.name}</span>
              </div>
              <div className={styles.email}>{user.email}</div>
              <div>
                <span className={`${styles.roleBadge} ${styles[user.role]}`}>{user.role}</span>
              </div>
              <div className={styles.date}>{new Date(user.created_at).toLocaleDateString()}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
