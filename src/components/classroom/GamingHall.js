'use client';

import { useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/Icon';
import { SPECIALTIES } from '@/lib/games';
import r from './room.module.css';
import s from './gaming.module.css';

// Game catalog for the Arkcov Gaming Hall, organized by specialty.
// Games open in a full-screen player inside the Academy.
export default function GamingHall() {
  const [tab, setTab] = useState('hematology');
  const spec = SPECIALTIES.find((x) => x.slug === tab);


  return (
    <div className={r.glass}>
      <div className={r.panelHead}>
        <h2>Game library</h2>
        <span className={r.muted} style={{ fontSize: 13 }}>Organized by medical specialty</span>
      </div>
      <div className={s.tabs} role="tablist" aria-label="Specialties">
        {SPECIALTIES.map((x) => (
          <button key={x.slug} role="tab" aria-selected={tab === x.slug} onClick={() => setTab(x.slug)}>
            {x.name}{x.games.length > 0 && <span>{x.games.length}</span>}
          </button>
        ))}
      </div>

      <div className={s.specHead}>
        <div>
          <b>{spec.name}</b> · {spec.field}
          <small>Conditions: {spec.conditions}. Cared for by {spec.team.toLowerCase()}.</small>
        </div>
      </div>

      {spec.games.length ? (
        <div className={s.grid}>
          {spec.games.map((g, i) => (
            <article key={g.slug} className={s.card} style={{ animationDelay: `${i * 70}ms` }}>
              <Link href={`/play/${g.slug}`} className={s.cover} aria-label={`Play ${g.title}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={g.cover} alt="" loading="lazy" />
                <span className={s.play}><Icon name="play" size={22} /></span>
              </Link>
              <div className={s.body}>
                <small>{g.series} · {g.condition}</small>
                <h3>{g.title}</h3>
                <p>{g.text}</p>
                <div className={s.meta}><span>{g.players}</span><span>{g.ages}</span>{g.landscape && <span>Wide screen</span>}</div>
                <Link href={`/play/${g.slug}`} className={`${r.btn} ${r.small}`}>Play <Icon name="arrow" size={15} /></Link>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className={s.empty}>
          <Icon name="game" size={30} />
          <b>{spec.name} games are in development</b>
          <span>Games for {spec.conditions.toLowerCase()} will appear here as they are built.</span>
        </div>
      )}

    </div>
  );
}
