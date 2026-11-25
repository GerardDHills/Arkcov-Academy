'use client';

import { useEffect, useState } from 'react';
import Icon from '@/components/Icon';
import StrokeSim from './StrokeSim';
import { RichText } from './Scene';
import r from './room.module.css';

export const KIND = {
  video: { label: 'Film', icon: 'video' },
  reading: { label: 'Reading', icon: 'book' },
  activity: { label: 'Activity', icon: 'pen' },
  quiz: { label: 'Evaluation', icon: 'quiz' },
  simulation: { label: 'Simulation', icon: 'flask' },
};

async function submit(stepId, payload) {
  const res = await fetch(`/api/classroom/steps/${stepId}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Could not save');
  return data;
}

// Renders one lesson step in the room's style. Used for self-paced study
// and inside live sessions (where the instructor pushes the step).
export default function StepView({ step, done = false, sessionId = null, onSaved, previewOnly = false }) {
  const [answers, setAnswers] = useState({});
  const [graded, setGraded] = useState(null);
  const [reveal, setReveal] = useState(null);
  const [text, setText] = useState('');
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState('');
  const [complete, setComplete] = useState(done);

  useEffect(() => { setAnswers({}); setGraded(null); setReveal(null); setText(''); setErr(''); setComplete(done); }, [step.id, done]);

  const save = async (payload) => {
    if (previewOnly) return;
    setSaving(true); setErr('');
    try {
      const data = await submit(step.id, { ...payload, sessionId });
      setComplete(true);
      if (data.result?.results) { setGraded(data.result); setReveal(data.step?.data?.questions || null); }
      onSaved?.(data);
    } catch (e) { setErr(e.message); }
    setSaving(false);
  };

  const qs = step.data?.questions || [];
  const allAnswered = qs.length > 0 && qs.every((_, i) => answers[i] !== undefined);

  return (
    <div>
      {step.kind === 'video' && (
        <>
          <div className={r.videoFrame}>
            <video src={step.media_url} controls playsInline preload="metadata" onEnded={() => !complete && save({})} />
          </div>
          {step.body && <div style={{ marginTop: 18 }}><RichText text={step.body} /></div>}
        </>
      )}

      {(step.kind === 'reading' || step.kind === 'activity' || step.kind === 'simulation' || step.kind === 'quiz') && step.body && (
        <div style={{ marginBottom: 20 }}><RichText text={step.body} /></div>
      )}

      {step.kind === 'activity' && (
        <div style={{ display: 'grid', gap: 12 }}>
          <label className={r.field}>
            <span>{step.data?.prompt || 'Your reflection'}</span>
            <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Write a few sentences…" disabled={previewOnly} />
          </label>
        </div>
      )}

      {step.kind === 'simulation' && step.data?.sim === 'stroke' && (
        <StrokeSim disabled={previewOnly} onFinish={(score, log) => save({ score, log })} />
      )}

      {step.kind === 'quiz' && (
        <div>
          {graded && (
            <div className={r.scoreDial} role="status">
              <strong>{graded.score}</strong>
              <span>{graded.right} of {graded.total} correct. {graded.score >= 70 ? 'Well done, healer.' : 'Review the explanations and try again; your best score counts.'}</span>
            </div>
          )}
          {qs.map((q, qi) => {
            const res = graded?.results?.[qi];
            const ans = reveal?.[qi]?.answer;
            return (
              <div key={qi} className={r.q}>
                <div className={r.qText}><span className={r.qNum}>{String(qi + 1).padStart(2, '0')}</span><span>{q.q}</span></div>
                <div className={r.opts} role="group" aria-label={`Question ${qi + 1}`}>
                  {q.options.map((o, oi) => {
                    const on = answers[qi] === oi;
                    let cls = '';
                    if (graded) cls = oi === ans ? r.right : on ? r.wrong : '';
                    return (
                      <button key={oi} type="button" className={`${r.opt} ${cls}`} aria-pressed={on} disabled={Boolean(graded) || previewOnly}
                        onClick={() => setAnswers((a) => ({ ...a, [qi]: oi }))}>
                        <span className={r.key}>{String.fromCharCode(65 + oi)}</span>{o}
                      </button>
                    );
                  })}
                </div>
                {res && <p className={r.explain}>{res.explain}</p>}
              </div>
            );
          })}
        </div>
      )}

      {err && <p className={r.error} role="alert" style={{ marginTop: 12 }}>{err}</p>}

      {!previewOnly && (
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', justifyContent: 'flex-end', marginTop: 20, flexWrap: 'wrap' }}>
          {complete && !graded && <span className={r.tag}><Icon name="check" size={14} /> Complete</span>}
          {(step.kind === 'reading' || step.kind === 'video') && !complete && (
            <button type="button" className={r.btn} onClick={() => save({})} disabled={saving}>Mark complete <Icon name="check" size={17} /></button>
          )}
          {step.kind === 'activity' && (
            <button type="button" className={r.btn} onClick={() => save({ response: text })} disabled={saving || !text.trim()}>
              {complete ? 'Save new reflection' : 'Submit reflection'} <Icon name="send" size={16} />
            </button>
          )}
          {step.kind === 'quiz' && !graded && (
            <button type="button" className={r.btn} onClick={() => save({ answers: qs.map((_, i) => answers[i]) })} disabled={saving || !allAnswered}>
              Submit answers <Icon name="arrow" size={17} />
            </button>
          )}
          {step.kind === 'quiz' && graded && (
            <button type="button" className={r.btnGhost} onClick={() => { setGraded(null); setReveal(null); setAnswers({}); }}>Try again</button>
          )}
        </div>
      )}
    </div>
  );
}
