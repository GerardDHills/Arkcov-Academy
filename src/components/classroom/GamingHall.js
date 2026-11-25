'use client';

import { useEffect, useState } from 'react';
import Icon from '@/components/Icon';
import { SPECIALTIES } from '@/lib/games';
import r from './room.module.css';
import s from './gaming.module.css';

// Game catalog for the Arkcov Gaming Hall, organized by specialty.
// Games open in a full-screen player inside the Academy.
export default function GamingHall() {
  const [tab, setTab] = useState('hematology');
  const [playing, setPlaying] = useState(null);
  const spec = SPECIALTIES.find((x) => x.slug === tab);

  useEffect(() => {
    if (!playing) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => e.key === 'Escape' && setPlaying(null);
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = prev; window.removeEventListener('keydown', onKey); };
  }, [playing]);

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
              <button type="button" className={s.cover} onClick={() => setPlaying(g)} aria-label={`Play ${g.title}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={g.cover} alt="" loading="lazy" />
                <span className={s.play}><Icon name="play" size={22} /></span>
              </button>
              <div className={s.body}>
                <small>{g.series} · {g.condition}</small>
                <h3>{g.title}</h3>
                <p>{g.text}</p>
                <div className={s.meta}><span>{g.players}</span><span>{g.ages}</span>{g.landscape && <span>Best sideways</span>}</div>
                <button type="button" className={`${r.btn} ${r.small}`} onClick={() => setPlaying(g)}>Play <Icon name="arrow" size={15} /></button>
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

      {playing && (
        <div className={s.player} role="dialog" aria-modal="true" aria-label={playing.title}>
          <div className={s.playerBar}>
            <span><b>{playing.title}</b> <small>{playing.specialtyName || spec.name} · {playing.condition}</small></span>
            <span style={{ display: 'flex', gap: 8 }}>
              <a className={`${r.btnGhost} ${r.small}`} href={playing.url} target="_blank" rel="noopener noreferrer">Open full screen</a>
              <button type="button" className={`${r.btn} ${r.small}`} onClick={() => setPlaying(null)}>Back to the Gaming Hall</button>
            </span>
          </div>
          <iframe src={playing.url} title={playing.title} allow="autoplay; fullscreen; gamepad; accelerometer; gyroscope" allowFullScreen />
        </div>
      )}
    </div>
  );
}
