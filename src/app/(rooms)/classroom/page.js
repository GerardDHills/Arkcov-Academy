'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/Icon';
import Scene from '@/components/classroom/Scene';
import r from '@/components/classroom/room.module.css';
import s from './classroom.module.css';

// Buildings that will get their own rooms on the same engine.
const COMING = [
  { name: 'Anatomy & Clinical Skills Lab', where: 'Main Learning Hall', img: '/classroom/healers-simbay.jpg' },
  { name: 'Healers Library', where: 'Main Learning Hall', img: '/classroom/healers-mentor.jpg' },
  { name: 'Junior Cadet Classrooms', where: 'Middle School Building', img: '/campus/img/junior-2.jpg' },
  { name: 'College & Career Center', where: 'High School Building', img: '/campus/img/dress-f.jpg' },
  { name: 'Main Auditorium', where: 'Conference Hall', img: '/campus/img/conference-hall.jpg' },
  { name: 'The Human Body Experience', where: 'BodyWorld', img: '/campus/img/bodyworld-plaza.jpg' },
];

const fmt = (d) => new Date(d).toLocaleString([], { weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' });

export default function ClassroomDirectory() {
  const [data, setData] = useState(null);
  const [err, setErr] = useState('');
  useEffect(() => {
    fetch('/api/classroom/programs').then((x) => x.json()).then((d) => (d.error ? setErr(d.error) : setData(d))).catch(() => setErr('Could not load classrooms.'));
  }, []);

  return (
    <Scene image="/classroom/healers-studio.jpg" dim>
      <div className={`${r.wrap} ${r.top}`}>
        <p className={r.eyebrow}>Virtual campus</p>
        <h1 className={r.title}>Virtual <em>Classrooms</em></h1>
        <p className={r.lede}>Every building on campus opens into its own room. Study at your own pace, join live classes with your professors, run simulations, and earn your certificate of performance.</p>
      </div>

      <div className={r.wrap} style={{ paddingBottom: 80 }}>
        {err && <p className={r.error}>{err}</p>}
        <div className={s.grid}>
          {(data?.programs || []).map((p) => (
            <Link key={p.id} href={`/classroom/${p.slug}`} className={s.feature}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/classroom/healers-studio.jpg" alt="" />
              <div className={s.featureIn}>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  <span className={r.tag}>{p.building}</span>
                  {p.nextSession?.status === 'live' && <span className={`${r.tag} ${r.live}`}>Live now</span>}
                </div>
                <h2>{p.room}</h2>
                <p>{p.title}: {p.subtitle}</p>
                <div className={s.meta}>
                  <span><Icon name="book" size={15} /> {p.step_count} lessons</span>
                  {p.enrolled && <span><Icon name="check" size={15} /> {p.done} complete</span>}
                  {p.nextSession && p.nextSession.status !== 'live' && <span><Icon name="calendar" size={15} /> Next live class {fmt(p.nextSession.starts_at)}</span>}
                </div>
                <span className={r.btn} style={{ marginTop: 8 }}>{p.enrolled ? 'Enter the studio' : 'Step inside'} <Icon name="arrow" size={17} /></span>
              </div>
            </Link>
          ))}
          {!data && !err && <div className={`${r.glass} ${s.loading}`}>Opening the doors…</div>}
        </div>

        <h2 className={s.h2}>Opening across campus</h2>
        <div className={s.coming}>
          {COMING.map((c) => (
            <div key={c.name} className={s.card}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={c.img} alt="" loading="lazy" />
              <div>
                <small>{c.where}</small>
                <strong>{c.name}</strong>
                <span className={s.soon}><Icon name="lock" size={13} /> Opening soon</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Scene>
  );
}
