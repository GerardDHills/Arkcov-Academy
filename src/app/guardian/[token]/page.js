'use client';

import { useEffect, useState } from 'react';
import Icon from '@/components/Icon';
import Scene from '@/components/classroom/Scene';
import VideoStage from '@/components/classroom/VideoStage';
import r from '@/components/classroom/room.module.css';

// Parent or guardian view of a cadet's one-on-one. No account needed.
export default function GuardianJoin({ params }) {
  const [d, setD] = useState(null);
  const [err, setErr] = useState('');
  useEffect(() => {
    const load = () => fetch(`/api/guardian/${params.token}`).then((x) => x.json()).then((v) => (v.error ? setErr(v.error) : setD(v)));
    load();
    const t = setInterval(load, 10000);
    return () => clearInterval(t);
  }, [params.token]);

  return (
    <Scene image="/classroom/healers-mentor.jpg" dim>
      <main id="main" className={r.wrap} style={{ padding: '60px 0 80px', maxWidth: 900 }}>
        <p className={r.eyebrow}>Arkcov Academy · Parent and guardian access</p>
        {err && <h1 className={r.title} style={{ fontSize: '2.2rem' }}>{err}</h1>}
        {d && (
          <>
            <h1 className={r.title} style={{ fontSize: 'clamp(2rem,4vw,3rem)' }}>{d.cadet}’s one-on-one</h1>
            <p className={r.lede}>With {d.staff}, during the live class “{d.session}” in the {d.program}.</p>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', margin: '14px 0 22px' }}>
              {d.open ? <span className={`${r.tag} ${r.live}`}>In progress</span> : <span className={r.tag}>Ended</span>}
              <span className={r.tag}><Icon name="record" size={12} /> Recorded</span>
            </div>
            {d.open ? (
              <VideoStage label="Join or watch" getAccess={async () => {
                const res = await fetch(`/api/guardian/${params.token}`, { method: 'POST' });
                const v = await res.json();
                if (!res.ok) throw new Error(v.error);
                return v;
              }} />
            ) : (
              <div className={r.notice}><Icon name="shield" size={18} /><div>This one-on-one has ended. Every one-on-one at Arkcov Academy happens during a full class, is recorded, and is reviewed by the Dean’s office.</div></div>
            )}
            <p className={r.muted} style={{ marginTop: 20, fontSize: 14, lineHeight: 1.6 }}>Questions or concerns? Reply to the email you received, and the Dean’s office will follow up.</p>
          </>
        )}
      </main>
    </Scene>
  );
}
