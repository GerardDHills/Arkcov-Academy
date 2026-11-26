'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/Icon';
import Scene from '@/components/classroom/Scene';
import r from '@/components/classroom/room.module.css';
import s from './classroom.module.css';

const fmt = (d) => new Date(d).toLocaleString([], { weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' });

export default function ClassroomDirectory() {
  const [data, setData] = useState(null);
  const [err, setErr] = useState('');
  const [filter, setFilter] = useState('all');
  useEffect(() => {
    fetch('/api/classroom/programs').then((x) => x.json()).then((d) => (d.error ? setErr(d.error) : setData(d))).catch(() => setErr('Could not load classrooms.'));
  }, []);

  const programs = data?.programs || [];
  const featured = programs.filter((p) => p.step_count > 0);
  const buildings = (data?.buildings || []).filter((b) => filter === 'all' || b.slug === filter);

  return (
    <Scene image="/classroom/rooms/orientation-hall.jpg" dim>
      <div className={`${r.wrap} ${r.top}`}>
        <p className={r.eyebrow}>Virtual campus</p>
        <h1 className={r.title}>Virtual <em>Classrooms</em></h1>
        <p className={r.lede}>Every building on campus opens into its own rooms. Study at your own pace, join live classes with your faculty, run simulations, and earn your certificate of performance.</p>
      </div>

      <div className={r.wrap} style={{ paddingBottom: 80 }}>
        {err && <p className={r.error}>{err}</p>}
        {!data && !err && <div className={`${r.glass} ${s.loading}`}>Opening the doors…</div>}

        <div className={s.grid}>
          {featured.map((p) => (
            <Link key={p.id} href={`/classroom/${p.slug}`} className={s.feature}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.art || '/classroom/healers-studio.jpg'} alt="" />
              <div className={s.featureIn}>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  <span className={r.tag}>{p.building}</span>
                  {p.nextSession?.status === 'live' && <span className={`${r.tag} ${r.live}`}>Live now</span>}
                </div>
                <h2>{p.room}</h2>
                <p>{p.title}{p.subtitle ? `: ${p.subtitle}` : ''}</p>
                <div className={s.meta}>
                  <span><Icon name="book" size={15} /> {p.step_count} {p.step_count === 1 ? "lesson" : "lessons"}</span>
                  {p.enrolled && <span><Icon name="check" size={15} /> {p.done} complete</span>}
                  {p.nextSession && p.nextSession.status !== 'live' && <span><Icon name="calendar" size={15} /> Next live class {fmt(p.nextSession.starts_at)}</span>}
                </div>
                <span className={r.btn} style={{ marginTop: 8 }}>{p.enrolled ? 'Enter the room' : 'Step inside'} <Icon name="arrow" size={17} /></span>
              </div>
            </Link>
          ))}
        </div>

        {data && (
          <>
            <div className={s.filters} role="group" aria-label="Filter by building">
              <button aria-pressed={filter === 'all'} onClick={() => setFilter('all')}>All buildings</button>
              {data.buildings.map((b) => <button key={b.slug} aria-pressed={filter === b.slug} onClick={() => setFilter(b.slug)}>{b.name}</button>)}
            </div>
            {buildings.map((b) => {
              const rooms = programs.filter((p) => p.building_slug === b.slug);
              if (!rooms.length) return null;
              return (
                <section key={b.slug} className={s.building}>
                  <h2 className={s.h2}>{b.name} <span>{b.kind}</span></h2>
                  <div className={s.rooms}>
                    {rooms.map((p) => (
                      <Link key={p.id} href={`/classroom/${p.slug}`} className={s.room}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={p.art || '/classroom/healers-studio.jpg'} alt="" loading="lazy" />
                        <span className={s.roomIn}>
                          <small>{p.kind}</small>
                          <b>{p.room}</b>
                          <em>{p.nextSession?.status === 'live' ? <span className={`${r.tag} ${r.live}`}>Live</span> : p.step_count ? `${p.step_count} {p.step_count === 1 ? "lesson" : "lessons"}` : data.me.canBuild ? 'Ready to build' : 'Curriculum in development'}</em>
                        </span>
                      </Link>
                    ))}
                  </div>
                </section>
              );
            })}
          </>
        )}
      </div>
    </Scene>
  );
}
