'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthProvider';
import { TOUR, GUIDE, audioFor } from '@/lib/tour';
import s from './tour.module.css';

const SEEN = 'arkcov-tour-seen';
const STEP = 'arkcov-tour-step';
const MUTE = 'arkcov-tour-mute';
const store = {
  get: (k, area = 'local') => { try { return window[`${area}Storage`].getItem(k); } catch { return null; } },
  set: (k, v, area = 'local') => { try { if (v === null) window[`${area}Storage`].removeItem(k); else window[`${area}Storage`].setItem(k, v); } catch {} },
};

// Nazareth's guided tour. Lives in the root layout so audio keeps playing
// across page changes. Offers itself once on a cadet's first visit Home.
export default function Tour() {
  const { user } = useAuth();
  const path = usePathname() || '';
  const router = useRouter();
  const audio = useRef(null);
  const [mode, setMode] = useState('off'); // off | offer | on
  const [i, setI] = useState(0);
  const [muted, setMuted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [box, setBox] = useState(null);
  const [auto, setAuto] = useState(false); // after the first Next, stops advance on their own
  const timer = useRef(null);
  const stop = TOUR[i];
  const here = stop && path === stop.path;

  // Resume a tour after reload; offer it on first visit; listen for restarts.
  useEffect(() => {
    if (!user) return undefined;
    setMuted(store.get(MUTE) === '1');
    const saved = store.get(STEP, 'session');
    if (saved !== null) { setI(+saved); setMode('on'); }
    else if (path === '/dashboard' && (!store.get(SEEN) || window.location.search.includes('tour=1'))) {
      // Wait for the launch bumper to finish before Nazareth says hello.
      if (window.__arkcovBumper) window.addEventListener('arkcov:bumper-done', () => setMode('offer'), { once: true });
      else setMode('offer');
    }
    const go = () => { setI(0); setMode('offer'); };
    window.addEventListener('arkcov:tour', go);
    return () => window.removeEventListener('arkcov:tour', go);
  }, [user]); // eslint-disable-line react-hooks/exhaustive-deps

  // Go to the page for this stop.
  useEffect(() => {
    if (mode !== 'on' || !stop) return;
    store.set(STEP, String(i), 'session');
    if (path !== stop.path) router.push(stop.path);
  }, [mode, i]); // eslint-disable-line react-hooks/exhaustive-deps

  // Narrate when the page is ready.
  useEffect(() => {
    const a = audio.current;
    if (!a || mode !== 'on' || !here) return undefined;
    a.pause();
    if (muted) { setPlaying(false); return undefined; }
    const t = setTimeout(() => { a.src = audioFor(i); a.currentTime = 0; a.play().then(() => setPlaying(true)).catch(() => setPlaying(false)); }, 450);
    return () => clearTimeout(t);
  }, [mode, i, here, muted]);

  // Auto-advance: when narration ends (or after reading time if sound is off).
  const last = i === TOUR.length - 1;
  const queueNext = useCallback((ms) => {
    clearTimeout(timer.current);
    if (!auto || last) return;
    timer.current = setTimeout(() => setI((k) => Math.min(k + 1, TOUR.length - 1)), ms);
  }, [auto, last]);
  useEffect(() => {
    clearTimeout(timer.current);
    if (mode !== 'on' || !here || !auto || last) return undefined;
    if (muted) queueNext(Math.max(5000, stop.text.length * 55));
    return () => clearTimeout(timer.current);
  }, [mode, i, here, auto, muted]); // eslint-disable-line react-hooks/exhaustive-deps

  // Spotlight the target element, following scroll and resize.
  useEffect(() => {
    setBox(null);
    if (mode !== 'on' || !here || !stop.target) return undefined;
    let el = null; let tries = 0; let raf = 0;
    const measure = () => { if (!el) return; const r = el.getBoundingClientRect(); setBox({ x: r.left - 8, y: r.top - 8, w: r.width + 16, h: r.height + 16 }); };
    const find = setInterval(() => {
      el = document.querySelector(`[data-tour="${stop.target}"]`);
      if (el || ++tries > 20) { clearInterval(find); if (el) { el.scrollIntoView({ block: 'center', behavior: 'smooth' }); setTimeout(measure, 500); } }
    }, 150);
    const onMove = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(measure); };
    window.addEventListener('scroll', onMove, { passive: true });
    window.addEventListener('resize', onMove);
    return () => { clearInterval(find); cancelAnimationFrame(raf); window.removeEventListener('scroll', onMove); window.removeEventListener('resize', onMove); };
  }, [mode, i, here]); // eslint-disable-line react-hooks/exhaustive-deps

  const end = useCallback(() => {
    clearTimeout(timer.current); setAuto(false);
    audio.current?.pause(); setPlaying(false); setMode('off'); setBox(null);
    store.set(SEEN, '1'); store.set(STEP, null, 'session');
  }, []);
  const begin = () => {
    // Starting from a tap unlocks audio on phones for the rest of the tour.
    const a = audio.current;
    if (a && !muted) { a.src = audioFor(0); a.play().then(() => a.pause()).catch(() => {}); }
    setAuto(false); setI(0); setMode('on');
  };
  const next = () => { setAuto(true); if (i < TOUR.length - 1) setI(i + 1); else end(); };
  const back = () => { if (i > 0) setI(i - 1); };
  const toggleSound = () => {
    const m = !muted; setMuted(m); store.set(MUTE, m ? '1' : '0');
    if (m) { audio.current?.pause(); setPlaying(false); }
  };
  const replay = () => {
    const a = audio.current; if (!a) return;
    if (playing || auto) { a.pause(); setPlaying(false); setAuto(false); clearTimeout(timer.current); }
    else { setAuto(i > 0); a.src = audioFor(i); a.play().then(() => setPlaying(true)).catch(() => {}); }
  };

  useEffect(() => {
    if (mode === 'off') return undefined;
    const k = (e) => { if (e.key === 'Escape') end(); if (mode === 'on' && e.key === 'ArrowRight') next(); if (mode === 'on' && e.key === 'ArrowLeft') back(); };
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
  });

  if (!user) return null;
  return (
    <>
      <audio ref={audio} preload="auto" onEnded={() => { setPlaying(false); queueNext(1200); }} onError={() => { setPlaying(false); if (mode === 'on') queueNext(Math.max(5000, (stop?.text.length || 100) * 55)); }} />
      {mode === 'offer' && (
        <div className={s.scrim} role="dialog" aria-modal="true" aria-labelledby="tour-hi">
          <div className={s.offer}>
            <img src={GUIDE.portrait} alt="" className={s.offerImg} />
            <div className={s.offerBody}>
              <small>{GUIDE.role}</small>
              <h2 id="tour-hi">Hi, I’m {GUIDE.name}.</h2>
              <p>Want a quick tour of campus? It takes about two minutes, with sound.</p>
              <div className={s.row}>
                <button type="button" className={s.primary} onClick={begin}>Show me around</button>
                <button type="button" className={s.ghost} onClick={end}>Not now</button>
              </div>
            </div>
          </div>
        </div>
      )}
      {mode === 'on' && stop && (
        <>
          {box ? <div className={s.spot} style={{ left: box.x, top: box.y, width: box.w, height: box.h }} aria-hidden="true" /> : <div className={s.dim} aria-hidden="true" />}
          <section className={s.card} role="dialog" aria-live="polite" aria-label={`Campus tour, stop ${i + 1} of ${TOUR.length}`}>
            <div className={s.head}>
              <span className={`${s.face} ${playing ? s.talking : ''}`}><img src={GUIDE.face} alt={GUIDE.name} /></span>
              <div className={s.who}><b>{GUIDE.name}</b><small>{stop.title}</small></div>
              <button type="button" className={s.icon} onClick={toggleSound} aria-label={muted ? 'Turn sound on' : 'Turn sound off'}>{muted ? '🔇' : '🔊'}</button>
              <button type="button" className={s.icon} onClick={end} aria-label="End tour">✕</button>
            </div>
            <p className={s.text}>{stop.text}</p>
            <div className={s.foot}>
              <div className={s.dots} aria-hidden="true">{TOUR.map((_, k) => <span key={k} className={k === i ? s.dotOn : k < i ? s.dotDone : ''} />)}</div>
              {(!muted || auto) && <button type="button" className={s.ghost} onClick={muted ? () => { setAuto(false); clearTimeout(timer.current); } : replay}>{playing || auto ? 'Pause' : 'Play'}</button>}
              {i > 0 && <button type="button" className={s.ghost} onClick={back}>Back</button>}
              <button type="button" className={s.primary} onClick={next}>{i === TOUR.length - 1 ? 'Finish' : 'Next'}</button>
            </div>
          </section>
        </>
      )}
    </>
  );
}
