'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/Icon';
import { useAuth } from '@/components/AuthProvider';
import Link from 'next/link';
import { GUIDE, startTour } from '@/lib/tour';
import styles from './dashboard.module.css';

const quickLinks = [
  { href: '/explore?type=course', icon: 'book', label: 'Courses', desc: 'Structured lessons, at your pace' },
  { href: '/explore?type=movie', icon: 'film', label: 'Movies', desc: 'Watch medical entertainment' },
  { href: '/explore?type=podcast', icon: 'mic', label: 'Podcasts', desc: 'Listen and learn' },
  { href: '/explore?type=tv_show', icon: 'tv', label: 'TV Shows', desc: 'Binge health science' },
  { href: '/explore?type=animated_short', icon: 'sparkle', label: 'Animated Shorts', desc: 'Warriors Thrive and more' },
  { href: '/explore?type=interactive_game', icon: 'game', label: 'Games', desc: 'Play Warriors Thrive' },
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

  const [academy, setAcademy] = useState(null);
  useEffect(() => {
    document.body.classList.add('dark-home');
    return () => document.body.classList.remove('dark-home');
  }, []);
  useEffect(() => {
    fetch('/api/classroom/programs').then((x) => x.json()).then((d) => { if (!d.error) setAcademy(d); }).catch(() => {});
  }, []);
  const myRooms = (academy?.programs || []).filter((p) => p.enrolled).sort((a, b) => (a.done >= a.step_count) - (b.done >= b.step_count));
  const resume = myRooms.find((p) => p.done < p.step_count) || myRooms[0];

  const { progress, stats } = progressData;
  const inProgress = progress.filter(p => !p.completed);
  const completed = progress.filter(p => p.completed);
  const hoursWatched = Math.round((stats.minutes_watched || 0) / 60 * 10) / 10;

  return (
    <div className={styles.dashboard}>
      <div className={styles.welcome}>
        <div>
          <h1 className={styles.welcomeTitle}>
            Welcome back, Cadet <span className={styles.highlight}>{user?.name?.split(' ')[0]}</span>
          </h1>
          <p className={styles.welcomeSub}>Ready to continue your mission? Train · Heal · Discover · Inspire</p>
        </div>
        <div className={styles.welcomeAvatar}>
          {user?.name?.charAt(0).toUpperCase()}
        </div>
      </div>

      <section className={styles.academy} aria-labelledby="academy-title" data-tour="doors">
        <h2 id="academy-title" className={styles.sectionTitle}>Your Academy</h2>
        <button type="button" className={styles.guide} onClick={startTour} data-tour="tour-button">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={GUIDE.face} alt="" />
          <span><b>Take the campus tour</b><small>with {GUIDE.name}, {GUIDE.role.toLowerCase()}</small></span>
          <Icon name="play" size={18} />
        </button>
        {resume && (
          <Link href={`/classroom/${resume.slug}`} className={styles.resume}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={resume.art || '/classroom/healers-studio.jpg'} alt="" />
            <span className={styles.resumeIn}>
              <small>Pick up where you left off</small>
              <b>{resume.room}</b>
              <em>{resume.done} of {resume.step_count} complete</em>
            </span>
            <span className={styles.resumeGo}>Continue <Icon name="arrow" size={18} /></span>
          </Link>
        )}
        <div className={styles.doors}>
          {[
            { href: '/classroom', icon: 'door', label: 'Virtual Classrooms', desc: 'Every building and room on campus' },
            { href: '/cases', icon: 'stethoscope', label: 'Case Library', desc: 'Solve patient cases, from clinic to emergency' },
            { href: '/atlas', icon: 'heart', label: 'Body Atlas', desc: 'Anatomy to bedside, all connected' },
            { href: '/passport', icon: 'award', label: 'Cadet Passport', desc: 'Stamps, honors and your journal' },
            { href: '/superpower', icon: 'sparkle', label: 'Superpower Assessment', desc: 'Discover your social superpower' },
            { href: '/classroom/gaming-hall', icon: 'game', label: 'Gaming Hall', desc: 'Games by medical specialty' },
            { href: '/campus', icon: 'compass', label: 'Campus Map', desc: 'Walk the grounds' },
          ].map((d) => (
            <Link key={d.href} href={d.href} className={styles.door}>
              <span className={styles.doorIcon}><Icon name={d.icon} size={24} /></span>
              <b>{d.label}</b>
              <span>{d.desc}</span>
            </Link>
          ))}
        </div>
      </section>

      {user?.role === 'free' ? (
        <div className={styles.upgradeBanner}>
          <div>
            <h3>Unlock Full Access</h3>
            <p>Become a Cadet ($19/mo or $149/yr) to unlock every patient case, the full curriculum, games and certificates.</p>
          </div>
          <Link href="/pricing" className="btn btn-crimson">Upgrade Now</Link>
        </div>
      ) : user?.role !== 'admin' && (
        <div className={styles.memberBanner}>
          <div>
            <h3>{user?.role === 'family' ? 'Family Plan' : 'Member Plan'} Active</h3>
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
        <h2 className={styles.sectionTitle}>Watch &amp; listen</h2>
        <div className={styles.quickGrid}>
          {quickLinks.map((link) => (
            <Link key={link.href} href={link.href} className={styles.quickCard}>
              <div className={styles.quickIcon}><Icon name={link.icon} size={26} /></div>
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
                    <div className={styles.progressThumbFallback}><Icon name="book" size={28} /></div>
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
            <div className={styles.emptyIcon}><Icon name="book" size={40} /></div>
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
