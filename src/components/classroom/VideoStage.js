'use client';

import { useEffect, useRef, useState } from 'react';
import Icon from '@/components/Icon';
import r from './room.module.css';

const THEME = {
  colors: {
    accent: '#C9973F',
    accentText: '#0E1A3A',
    background: '#070D22',
    backgroundAccent: '#0E1A3A',
    baseText: '#F6EEDF',
    border: '#2A3A66',
    mainAreaBg: '#050A1A',
    mainAreaBgAccent: '#0E1A3A',
    mainAreaText: '#F6EEDF',
    supportiveText: '#CFC4AE',
  },
};

// Embeds a Daily video room. `getAccess` returns { configured, url, token }.
export default function VideoStage({ getAccess, label = 'Class video', recorded = false, ready = true, onLeft }) {
  const box = useRef(null);
  const callRef = useRef(null);
  const [state, setState] = useState('idle'); // idle | joining | joined | off | error
  const [err, setErr] = useState('');

  useEffect(() => () => { callRef.current?.destroy(); callRef.current = null; }, []);

  const join = async () => {
    setState('joining'); setErr('');
    try {
      const access = await getAccess();
      if (!access?.configured) { setState('off'); return; }
      const Daily = (await import('@daily-co/daily-js')).default;
      callRef.current?.destroy();
      const call = Daily.createFrame(box.current, {
        iframeStyle: { width: '100%', height: '100%', border: '0', borderRadius: '16px' },
        showLeaveButton: true,
        showFullscreenButton: true,
        theme: THEME,
      });
      callRef.current = call;
      call.on('left-meeting', () => { call.destroy(); callRef.current = null; setState('idle'); onLeft?.(); });
      await call.join({ url: access.url, token: access.token });
      setState('joined');
    } catch (e) {
      setErr(e.message || 'Video could not start'); setState('error');
    }
  };

  return (
    <div style={{ position: 'relative', aspectRatio: '16 / 10', width: '100%', borderRadius: 16, overflow: 'hidden', border: '1px solid rgba(230,194,122,.26)', background: 'radial-gradient(120% 120% at 50% 0%, #13224a 0%, #050a1a 70%)' }}>
      <div ref={box} style={{ position: 'absolute', inset: 0, display: state === 'joined' || state === 'joining' ? 'block' : 'none' }} />
      {state !== 'joined' && (
        <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', textAlign: 'center', padding: 24 }}>
          <div style={{ maxWidth: 420, display: 'grid', gap: 14, justifyItems: 'center' }}>
            <span style={{ width: 64, height: 64, borderRadius: '50%', display: 'grid', placeItems: 'center', border: '1px solid rgba(230,194,122,.5)', color: '#E6C27A', boxShadow: '0 0 40px rgba(201,151,63,.25)' }}>
              <Icon name="video" size={28} />
            </span>
            <strong style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 600 }}>{label}</strong>
            {state === 'off' && <p className={r.muted}>Live video is not connected yet. The lesson, activities and chat still work. An admin turns video on by adding the Daily key.</p>}
            {state === 'error' && <p className={r.error}>{err}</p>}
            {recorded && <span className={r.tag}><Icon name="record" size={12} /> This one-on-one is recorded</span>}
            {state !== 'off' && ready && (
              <button type="button" className={r.btn} onClick={join} disabled={state === 'joining'}>
                {state === 'joining' ? 'Connecting…' : 'Join with camera and mic'}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
