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
  const [track, setTrack] = useState(null);
  const [grade, setGrade] = useState('');

  useEffect(() => {
    setD(null);
    fetch(`/api/classroom/steps/${params.stepId}`).then((x) => x.json()).then((v) => {
      if (v.error) { setErr(v.error); return; }
      setD(v);
      setTrack((t) => t || v.me?.division || 'junior');
    }).catch(() => setErr('Could not load this lesson.'));
  }, [params.stepId]);

  const step = d?.step;
  const art = (d?.program?.slug === 'inspiring-healers' && ART[step?.kind]) || d?.program?.art || '/classroom/healers-studio.jpg';
  const wide = ['simulation', 'lesson', 'case'].includes(step?.kind);
  const tracked = step?.kind === 'lesson' || step?.kind === 'case';
  const needsGrade = tracked && d && !d.me?.isStaff && !d.me?.grade;
  const saveGrade = async () => {
    const res = await fetch('/api/classroom/me', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ grade: Number(grade) }) });
    if (res.ok) { const g = Number(grade); setTrack(g >= 9 ? 'senior' : 'junior'); setD({ ...d, me: { ...d.me, grade: g } }); }
  };

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

            {d.me?.isStaff && step.reviewed === false && (
              <div className={r.notice} style={{ marginBottom: 14 }}><Icon name="lock" size={18} /><div><b>Draft.</b> Cadets can’t see this lesson until you approve it in the Lesson Builder, after checking its history and medical content.</div></div>
            )}
            {d.me?.isStaff && tracked && (
              <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 14, flexWrap: 'wrap' }}>
                <span className={r.muted} style={{ fontSize: 14 }}>Preview as:</span>
                {['junior', 'senior'].map((t) => (
                  <button key={t} type="button" className={`${track === t ? r.btn : r.btnGhost} ${r.small}`} onClick={() => setTrack(t)}>{t === 'senior' ? 'Senior Cadet (9–12)' : 'Junior Cadet (6–8)'}</button>
                ))}
              </div>
            )}

            {needsGrade ? (
              <div className={r.glass} style={{ padding: 28, maxWidth: 560 }}>
                <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, margin: '0 0 8px' }}>What grade are you in?</h2>
                <p className={r.muted} style={{ lineHeight: 1.6 }}>Lessons come in a Junior Cadet version (grades 6–8) and a Senior Cadet version (grades 9–12).</p>
                <div style={{ display: 'flex', gap: 10, alignItems: 'end', flexWrap: 'wrap' }}>
                  <label className={r.field}><span>Grade</span>
                    <select value={grade} onChange={(e) => setGrade(e.target.value)}>
                      <option value="">Choose…</option>
                      {[6, 7, 8, 9, 10, 11, 12].map((g) => <option key={g} value={g}>Grade {g}</option>)}
                    </select>
                  </label>
                  <button type="button" className={r.btn} disabled={!grade} onClick={saveGrade}>Start the lesson</button>
                </div>
              </div>
            ) : (
              <div className={r.glass} style={{ padding: wide ? 18 : 28 }}>
                <StepView key={`${step.id}-${track}`} step={step} track={track || 'junior'} done={Boolean(d.mine?.completed)} onSaved={(v) => v.certificate && setCert(v.certificate)} />
              </div>
            )}

            {d.me?.isStaff && step.founder_notes && (
              <div className={r.glass} style={{ marginTop: 18 }}>
                <div className={r.panelHead}><h3>Founder’s notes · faculty only</h3><Icon name="lock" size={16} /></div>
                <div className={r.panelBody}><p style={{ margin: 0, lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>{step.founder_notes}</p></div>
              </div>
            )}

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
