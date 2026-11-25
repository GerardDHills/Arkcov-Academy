'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/Icon';
import Scene from '@/components/classroom/Scene';
import StepView, { KIND } from '@/components/classroom/StepView';
import r from '@/components/classroom/room.module.css';

const ART = { simulation: '/classroom/healers-simbay.jpg', activity: '/classroom/healers-mentor.jpg' };

export default function Lesson({ params }) {
  const [d, setD] = useState(null);
  const [err, setErr] = useState('');
  const [cert, setCert] = useState(null);

  useEffect(() => {
    setD(null);
    fetch(`/api/classroom/steps/${params.stepId}`).then((x) => x.json()).then((v) => (v.error ? setErr(v.error) : setD(v))).catch(() => setErr('Could not load this lesson.'));
  }, [params.stepId]);

  const step = d?.step;
  const art = (d?.program?.slug === 'inspiring-healers' && ART[step?.kind]) || d?.program?.art || '/classroom/healers-studio.jpg';
  const wide = step?.kind === 'simulation';

  return (
    <Scene image={art} dim>
      <div className={r.wrap} style={{ padding: '100px 0 90px', maxWidth: wide ? 1180 : 860 }}>
        <Link href={`/classroom/${params.slug}`} className={`${r.btnGhost} ${r.small}`}><span style={{ display: 'inline-flex', transform: 'rotate(180deg)' }}><Icon name="arrow" size={15} strokeWidth={2} /></span> Back to the studio</Link>
        {err && <p className={r.error} style={{ marginTop: 20 }}>{err}</p>}
        {d && (
          <>
            <div style={{ margin: '28px 0 22px' }}>
              <p className={r.eyebrow}>{step.unit} · {d.index + 1} of {d.count}</p>
              <h1 className={r.title} style={{ fontSize: 'clamp(2.1rem, 4.4vw, 3.4rem)' }}>{step.title}</h1>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                <span className={r.tag}><Icon name={KIND[step.kind]?.icon} size={13} /> {KIND[step.kind]?.label}</span>
                {step.minutes && <span className={r.tag}><Icon name="clock" size={13} /> {step.minutes} min</span>}
                {d.mine?.score != null && <span className={r.tag}>Best score {d.mine.score}</span>}
              </div>
              {step.summary && <p className={r.lede} style={{ marginTop: 14 }}>{step.summary}</p>}
            </div>

            <div className={r.glass} style={{ padding: wide ? 18 : 28 }}>
              <StepView step={step} done={Boolean(d.mine?.completed)} onSaved={(v) => v.certificate && setCert(v.certificate)} />
            </div>

            {cert && (
              <div className={r.notice} style={{ marginTop: 18 }} role="status">
                <Icon name="award" size={22} />
                <div>You earned your Certificate of Performance. <Link href={`/certificates/${cert.code}`} style={{ color: '#E6C27A', fontWeight: 700 }}>View it now</Link></div>
              </div>
            )}

            <nav style={{ display: 'flex', justifyContent: 'space-between', gap: 12, marginTop: 22 }} aria-label="Lesson navigation">
              {d.prev ? <Link className={r.btnGhost} href={`/classroom/${params.slug}/${d.prev}`}>Previous</Link> : <span />}
              {d.next ? <Link className={r.btn} href={`/classroom/${params.slug}/${d.next}`}>Next lesson <Icon name="arrow" size={17} /></Link>
                : <Link className={r.btn} href={`/classroom/${params.slug}`}>Return to the studio</Link>}
            </nav>
          </>
        )}
      </div>
    </Scene>
  );
}
