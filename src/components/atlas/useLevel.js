'use client';

import { useEffect, useState } from 'react';
import { LEVELS } from '@/lib/atlas/blood';
import s from './atlas.module.css';

const KEY = 'arkcov-atlas-level';

// The reader's chosen depth (cadet, college, medical), remembered on this device.
export function useLevel() {
  const [level, setLevelState] = useState('cadet');
  useEffect(() => {
    try { const v = localStorage.getItem(KEY); if (LEVELS.some((l) => l.id === v)) setLevelState(v); } catch {}
  }, []);
  const setLevel = (v) => { setLevelState(v); try { localStorage.setItem(KEY, v); } catch {} };
  return [level, setLevel];
}

export function LevelToggle({ level, setLevel }) {
  return (
    <div className={s.levels} role="group" aria-label="Reading level">
      {LEVELS.map((l) => (
        <button key={l.id} type="button" aria-pressed={level === l.id} onClick={() => setLevel(l.id)}>
          {l.label}<small>{l.note}</small>
        </button>
      ))}
    </div>
  );
}

// Map case codes to Case Library entries the viewer can open.
export function useCaseIndex() {
  const [map, setMap] = useState({});
  useEffect(() => {
    fetch('/api/classroom/cases').then((r) => r.json()).then((d) => {
      const m = {};
      (d.cases || []).forEach((c) => { if (c.code) m[c.code] = { title: c.title, href: `/classroom/${c.room_slug}/${c.id}` }; });
      setMap(m);
    }).catch(() => {});
  }, []);
  return map;
}
