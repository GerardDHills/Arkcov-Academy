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
// Preview of a joined class, for showing the experience before video is connected.
function DemoCall({ recorded }) {
  const cadets = [['JM', 'Jordan M.'], ['AG', 'Aaliyah G.'], ['TB', 'Tyler B.'], ['KO', 'Kemi O.'], ['DR', 'Diego R.']];
  const btn = { width: 44, height: 44, borderRadius: 14, display: 'grid', placeItems: 'center', background: 'rgba(246,238,223,.08)', border: '1px solid rgba(230,194,122,.25)', color: '#F6EEDF' };
  return (
    <div className={r.demoCall}>
      <div className={r.demoMain}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/classroom/demo/professor.jpg" alt="" />
        <span className={r.demoSpeaking} />
        <span className={r.demoName}><Icon name="mic" size={13} /> Dr. Amara Lewis · Professor</span>
        <span className={r.demoTop}><span className={`${r.tag} ${r.live}`}>Live</span>{recorded && <span className={r.tag}><Icon name="record" size={11} /> Recording</span>}<span className={r.tag}>Preview</span></span>
      </div>
      <div className={r.demoSide}>
        <div className={r.demoTile}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/classroom/demo/tutor.jpg" alt="" />
          <span className={r.demoName}>Marcus Reed · Tutor</span>
        </div>
        {cadets.map(([i, n]) => (
          <div key={i} className={`${r.demoTile} ${r.demoOff}`}>
            <span className={r.demoAvatar}>{i}</span>
            <span className={r.demoName}>{n}</span>
          </div>
        ))}
        <div className={`${r.demoTile} ${r.demoOff}`}><span className={r.demoAvatar} style={{ background: 'linear-gradient(180deg,#E6C27A,#C9973F)', color: '#0E1A3A' }}>You</span><span className={r.demoName}>You</span></div>
      </div>
      <div className={r.demoBar}>
        <span style={btn} aria-hidden="true"><Icon name="mic" size={18} /></span>
        <span style={btn} aria-hidden="true"><Icon name="video" size={18} /></span>
        <span style={btn} aria-hidden="true"><Icon name="tv" size={18} /></span>
        <span style={btn} aria-hidden="true"><Icon name="users" size={18} /></span>
        <span style={{ ...btn, width: 'auto', padding: '0 16px', background: '#A8201A', borderColor: '#A8201A', fontWeight: 700, fontSize: 14 }} aria-hidden="true">Leave</span>
      </div>
    </div>
  );
}

export default function VideoStage({ getAccess, label = 'Class video', recorded = false, ready = true, onLeft, demo = false }) {
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

  if (demo) {
    return (
      <div style={{ position: 'relative', aspectRatio: '16 / 9', maxHeight: '62vh', minHeight: 300, width: '100%', borderRadius: 16, overflow: 'hidden', border: '1px solid rgba(230,194,122,.26)', background: '#050A1A' }}>
        <DemoCall recorded={recorded} />
      </div>
    );
  }

  return (
    <div style={{ position: 'relative', aspectRatio: '16 / 9', maxHeight: '54vh', minHeight: 260, width: '100%', borderRadius: 16, overflow: 'hidden', border: '1px solid rgba(230,194,122,.26)', background: 'radial-gradient(120% 120% at 50% 0%, #13224a 0%, #050a1a 70%)' }}>
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
