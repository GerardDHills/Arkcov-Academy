'use client';

import { useMemo } from 'react';
import s from './room.module.css';

// Room art with slow camera drift, the Covenant arches drawing in, and
// gold motes of light rising through the space.
export default function Scene({ image, dim = false, arches = true, motes = 18, children, className = '' }) {
  const dots = useMemo(
    () => Array.from({ length: motes }, (_, i) => ({
      left: `${(i * 53) % 100}%`,
      delay: `${(i * 1.7) % 14}s`,
      dur: `${14 + ((i * 7) % 12)}s`,
      dx: `${((i % 5) - 2) * 18}px`,
      size: 2 + (i % 3),
    })),
    [motes],
  );
  return (
    <div className={`${s.scene} ${dim ? s.dim : ''} ${className}`}>
      <div className={s.backdrop} aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {image && <img src={image} alt="" />}
        {arches && (
          <svg className={s.arches} viewBox="0 0 600 300">
            <path d="M40 300 V170 A260 160 0 0 1 560 170 V300" />
            <path d="M90 300 V180 A210 128 0 0 1 510 180 V300" />
            <path d="M140 300 V190 A160 98 0 0 1 460 190 V300" />
          </svg>
        )}
        <div className={s.motes}>
          {dots.map((d, i) => (
            <span key={i} style={{ left: d.left, animationDelay: d.delay, animationDuration: d.dur, width: d.size, height: d.size, '--dx': d.dx }} />
          ))}
        </div>
      </div>
      {children}
    </div>
  );
}

export function RichText({ text }) {
  if (!text) return null;
  const blocks = String(text).split(/\n{2,}/);
  const inline = (t) => {
    const parts = t.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((p, i) => (p.startsWith('**') && p.endsWith('**') ? <strong key={i}>{p.slice(2, -2)}</strong> : p));
  };
  return (
    <div className={s.prose}>
      {blocks.map((b, i) => {
        if (b.startsWith('## ')) return <h2 key={i}>{b.slice(3)}</h2>;
        const lines = b.split('\n');
        if (lines.every((l) => l.startsWith('- '))) {
          return <ul key={i}>{lines.map((l, j) => <li key={j}>{inline(l.slice(2))}</li>)}</ul>;
        }
        return <p key={i}>{inline(b)}</p>;
      })}
    </div>
  );
}
