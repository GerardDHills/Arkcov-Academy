'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/components/AuthProvider';
import Link from 'next/link';
import styles from './dashboard.module.css';

const quickLinks = [
  { href: '/explore?type=course', icon: '📚', label: 'Courses', desc: 'Learn about sickle cell disease' },
  { href: '/explore?type=movie', icon: '🎬', label: 'Movies', desc: 'Watch medical entertainment' },
  { href: '/explore?type=podcast', icon: '🎙️', label: 'Podcasts', desc: 'Listen and learn' },
  { href: '/explore?type=tv_show', icon: '📺', label: 'TV Shows', desc: 'Binge health science' },
  { href: '/explore?type=animated_short', icon: '✨', label: 'Animated Shorts', desc: 'Warriors Thrive and more' },
  { href: '/explore?type=interactive_game', icon: '🎮', label: 'Games', desc: 'Play Warriors Thrive' },
];

export default function DashboardPage() {
  const { user } = useAuth();
  const [progressData, setProgressData] = useState({ progress: [], stats: {} });

  useEffect(() => {
    async function fetchProgress() {
      try {
        const res = await fetch('/api/progress');
        const data = await res.json();
        if (res.ok) setProgressData(data);
      } catch (err) { console.error(err); }
    }
    fetchProgress();
  }, []);

  const { progress, stats } = progressData;
  const inProgress = progress.filter(p => !p.completed);
  const completed = progress.filter(p => p.completed);
  const hoursWatched = Math.round((stats.minutes_watched || 0) / 60 * 10) / 10;

  return (
    <div className={styles.dashboard}>
      <div className={styles.welcome}>
        <div>
          <h1 className={styles.welcomeTitle}>
            Welcome back, <span className={styles.highlight}>{user?.name?.split(' ')[0]}</span>
          </h1>
          <p className={styles.welcomeSub}>Ready to continue your healing journey?</p>
        </div>
        <div className={styles.welcomeAvatar}>
          {user?.name?.charAt(0).toUpperCase()}
        </div>
      </div>

      {user?.role === 'free' ? (
        <div className={styles.upgradeBanner}>
          <div>
            <h3>Unlock Full Access</h3>
            <p>Upgrade to Member ($9/mo) for the complete library, interactive games, and more.</p>
          </div>
          <Link href="/pricing" className="btn btn-crimson">Upgrade Now</Link>
        </div>
      ) : user?.role !== 'admin' && (
        <div className={styles.memberBanner}>
          <div>
            <h3>{user?.role === 'family' ? '👨‍👩‍👧‍👦 Family Plan' : '⭐ Member Plan'} Active</h3>
            <p>You have full access to the Arkcov Academy library</p>
          </div>
          <button className="btn btn-outline" onClick={async () => {
            const res = await fetch('/api/stripe/portal', { method: 'POST' });
            const data = await res.json();
            if (data.url) window.location.href = data.url;
          }}>Manage Billing</button>
        </div>
      )}

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Explore the Library</h2>
        <div className={styles.quickGrid}>
          {quickLinks.map((link) => (
            <Link key={link.href} href={link.href} className={styles.quickCard}>
              <div className={styles.quickIcon}>{link.icon}</div>
              <h3>{link.label}</h3>
              <p>{link.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Continue Learning</h2>
        {inProgress.length > 0 ? (
          <div className={styles.progressGrid}>
            {inProgress.slice(0, 4).map(item => (
              <Link key={item.id} href={`/course/${item.content_id}`} className={styles.progressCard}>
                <div className={styles.progressThumb}>
                  {item.thumbnail_url ? (
                    <img src={item.thumbnail_url} alt={item.content_title} />
                  ) : (
                    <div className={styles.progressThumbFallback}>📚</div>
                  )}
                  <div className={styles.progressBar}>
                    <div className={styles.progressFill} style={{ width: `${item.progress_percent}%` }} />
                  </div>
                </div>
                <div className={styles.progressInfo}>
                  <h4>{item.content_title}</h4>
                  <span>{Math.round(item.progress_percent)}% complete</span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>📖</div>
            <h3>No courses in progress yet</h3>
            <p>Start a course to track your progress here</p>
            <Link href="/explore?type=course" className="btn btn-outline btn-sm">Browse Courses</Link>
          </div>
        )}
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Your Stats</h2>
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statValue}>{stats.completed_count || 0}</div>
            <div className={styles.statLabel}>Completed</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statValue}>{hoursWatched}</div>
            <div className={styles.statLabel}>Hours Watched</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statValue}>{stats.total_in_progress || 0}</div>
            <div className={styles.statLabel}>In Progress</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statValue}>{user?.role}</div>
            <div className={styles.statLabel}>Membership</div>
          </div>
        </div>
      </section>
    </div>
  );
}
