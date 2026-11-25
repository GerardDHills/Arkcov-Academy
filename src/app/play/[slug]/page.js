'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Icon from '@/components/Icon';
import { ALL_GAMES } from '@/lib/games';

const HALL = '/classroom/gaming-hall';

// Full-screen player. The game fills the whole window; a small Academy
// control sits in the corner. When a game's own exit button is pressed it
// posts { type: 'exit' } to this page, which returns to the Gaming Hall.
export default function Play({ params }) {
  const router = useRouter();
  const game = ALL_GAMES.find((g) => g.slug === params.slug);
  const frame = useRef(null);
  const shell = useRef(null);
  const [full, setFull] = useState(false);
  const [hint, setHint] = useState(true);

  useEffect(() => {
    const onMsg = (e) => {
      if (e.origin !== window.location.origin) return;
      if (e.data && typeof e.data === 'object' && String(e.data.source || '').startsWith('warriors-thrive') && e.data.type === 'exit') router.push(HALL);
    };
    const onFs = () => setFull(Boolean(document.fullscreenElement));
    window.addEventListener('message', onMsg);
    document.addEventListener('fullscreenchange', onFs);
    const t = setTimeout(() => setHint(false), 4500);
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('message', onMsg); document.removeEventListener('fullscreenchange', onFs); clearTimeout(t); document.body.style.overflow = ''; };
  }, [router]);

  const toggleFull = () => {
    if (document.fullscreenElement) document.exitFullscreen?.();
    else shell.current?.requestFullscreen?.().catch(() => {});
    frame.current?.focus();
  };

  if (!game) {
    return (
      <main style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', background: '#070D22', color: '#F6EEDF', textAlign: 'center' }}>
        <div><h1 style={{ fontFamily: 'var(--font-display)', color: '#F6EEDF' }}>Game not found</h1><a href={HALL} style={{ color: '#E6C27A' }}>Back to the Gaming Hall</a></div>
      </main>
    );
  }

  const ctl = { display: 'inline-flex', alignItems: 'center', gap: 8, height: 40, padding: '0 14px', borderRadius: 999, border: '1px solid rgba(230,194,122,.55)', background: 'rgba(7,13,34,.78)', color: '#F6EEDF', font: 'inherit', fontWeight: 700, fontSize: 14, cursor: 'pointer', backdropFilter: 'blur(8px)', textDecoration: 'none' };

  return (
    <main ref={shell} id="main" style={{ position: 'fixed', inset: 0, background: '#000' }}>
      <iframe
        ref={frame}
        src={game.url}
        title={game.title}
        allow="autoplay; fullscreen; gamepad; accelerometer; gyroscope"
        allowFullScreen
        onLoad={() => frame.current?.focus()}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0 }}
      />
      <div style={{ position: 'absolute', right: 12, bottom: 12, display: 'flex', gap: 8, zIndex: 5 }}>
        <a href={HALL} style={ctl}><span style={{ display: 'inline-flex', transform: 'rotate(180deg)' }}><Icon name="arrow" size={16} /></span> Gaming Hall</a>
        <button type="button" onClick={toggleFull} style={ctl} aria-label={full ? 'Exit full screen' : 'Full screen'}>
          <Icon name={full ? 'close' : 'tv'} size={16} /> {full ? 'Exit full screen' : 'Full screen'}
        </button>
      </div>
      {hint && (
        <div style={{ position: 'absolute', left: '50%', top: 16, transform: 'translateX(-50%)', zIndex: 5, padding: '8px 16px', borderRadius: 999, background: 'rgba(7,13,34,.82)', color: '#F6EEDF', fontSize: 14, border: '1px solid rgba(230,194,122,.4)', pointerEvents: 'none' }}>
          {game.title} · click the game once to use your keyboard
        </div>
      )}
    </main>
  );
}
