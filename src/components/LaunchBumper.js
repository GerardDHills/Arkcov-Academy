'use client';

import { useEffect, useRef, useState } from 'react';
import s from './LaunchBumper.module.css';

const SRC = '/videos/arkcov-bumper-teen.mp4';
const KEY = 'arkcov-bumper-played';

// Plays the Arkcov Academy bumper once each time the app is opened on a phone.
// Phones only autoplay muted video, so a tap turns the sound on.
export default function LaunchBumper() {
  const v = useRef(null);
  const [show, setShow] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    let seen = null;
    try { seen = sessionStorage.getItem(KEY); } catch {}
    const phone = window.matchMedia('(max-width: 768px)').matches;
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (seen || !phone || calm) return;
    try { sessionStorage.setItem(KEY, '1'); } catch {}
    window.__arkcovBumper = true;
    setShow(true);
  }, []);

  const done = () => {
    if (leaving) return;
    setLeaving(true);
    setTimeout(() => {
      setShow(false);
      window.__arkcovBumper = false;
      window.dispatchEvent(new Event('arkcov:bumper-done'));
    }, 450);
  };

  useEffect(() => {
    if (!show) return undefined;
    const safety = setTimeout(done, 12000);
    v.current?.play().catch(() => {});
    return () => clearTimeout(safety);
  }, [show]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!show) return null;
  return (
    <div className={`${s.wrap} ${leaving ? s.out : ''}`} role="presentation">
      <video ref={v} className={s.video} src={SRC} poster="/videos/arkcov-bumper-teen.jpg" autoPlay muted={muted} playsInline preload="auto" onEnded={done} onError={done} />
      <div className={s.bar}>
        <button type="button" onClick={() => { setMuted(false); if (v.current) { v.current.muted = false; v.current.play().catch(() => {}); } }} hidden={!muted}>🔊 Sound</button>
        <button type="button" onClick={done}>Skip</button>
      </div>
    </div>
  );
}
