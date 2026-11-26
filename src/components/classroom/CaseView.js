'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/Icon';
import OxygenTransit from './OxygenTransit';
import { ModelStage, DifferentialStage, SequenceStage } from './CaseReasoning';
import r from './room.module.css';
import s from './case.module.css';

// Reusable patient-case engine. A case is content: patient, opening scene and
// a list of stages (interview, observe, model, differential, labs, decision,
// oxygen) with junior and senior variants. Score averages the graded stages:
// a choice counts if right on the first try; model and differential stages
// give partial credit.

function Choices({ id, prompt, choices, picked, onPick, disabled }) {
  const pick = picked[id];
  return (
    <div className={s.choices}>
      <p className={s.ask}>{prompt}</p>
      <div className={r.opts}>
        {choices.map((c, i) => {
          const on = pick === i;
          return (
            <button key={i} type="button" disabled={disabled} className={`${r.opt} ${on ? (c.preferred ? r.right : r.wrong) : ''}`} aria-pressed={on} onClick={() => onPick(id, i, c)}>
              <span className={r.key}>{String.fromCharCode(65 + i)}</span>{c.label}
            </button>
          );
        })}
      </div>
      {pick !== undefined && <p className={r.explain}>{choices[pick].feedback}</p>}
    </div>
  );
}

export default function CaseView({ step, track = 'junior', sessionId = null, onSaved, previewOnly = false }) {
  const d = step.data || {};
  const pt = d.patient || {};
  const stages = useMemo(() => (d.stages || []).filter((st) => !st.modes_only || st.modes_only.includes(track)), [d.stages, track]);
  const [i, setI] = useState(-1); // -1 = opening scene
  const [asked, setAsked] = useState({});
  const [picked, setPicked] = useState({});
  const [first, setFirst] = useState({});
  const [credit, setCredit] = useState({});
  const [log, setLog] = useState([]);
  const [journal, setJournal] = useState('');
  const [saved, setSaved] = useState(null);
  const [err, setErr] = useState('');

  const st = stages[i];
  const variant = st?.modes ? st.modes[track] || st.modes.junior : st;
  const isReasoning = (x) => x.type === 'model' || x.type === 'differential' || x.type === 'sequence';
  const graded = stages.filter((x) => isReasoning(x) || (x.modes ? (x.modes[track] || x.modes.junior)?.choices : x.choices));
  const score = graded.length
    ? Math.round((graded.reduce((a, x) => a + (isReasoning(x) ? credit[x.id] || 0 : first[x.id] ? 1 : 0), 0) / graded.length) * 100)
    : 100;
  const reason = (id) => (fraction, entry) => {
    setCredit((c) => (c[id] === undefined ? { ...c, [id]: fraction } : c));
    setLog((l) => [...l, { stage: id, ...entry, credit: Math.round(fraction * 100) }]);
  };
  const finished = i >= stages.length;

  const onPick = (id, idx, c) => {
    const cur = picked[id];
    if (cur !== undefined && (variant.choices[cur]?.preferred)) return;
    if (first[id] === undefined) setFirst((f) => ({ ...f, [id]: Boolean(c.preferred) }));
    setPicked((p) => ({ ...p, [id]: idx }));
    setLog((l) => [...l, { stage: id, choice: c.label, preferred: Boolean(c.preferred) }]);
  };

  const canNext = (() => {
    if (!st) return true;
    if (st.type === 'interview') return Object.keys(asked).length >= (st.min || 1);
    if (isReasoning(st)) return credit[st.id] !== undefined;
    if (variant?.choices) return variant.choices[picked[st.id]]?.preferred;
    return true;
  })();

  const finish = async () => {
    if (previewOnly) return;
    setErr('');
    try {
      const res = await fetch(`/api/classroom/steps/${step.id}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ track, score, log, journal, sessionId }) });
      const v = await res.json();
      if (!res.ok) throw new Error(v.error);
      setSaved(v); onSaved?.(v);
    } catch (e) { setErr(e.message); }
  };

  return (
    <div className={s.case}>
      <aside className={s.chart}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {(pt.portrait || pt.scene) && <img src={pt.portrait || pt.scene} alt="" className={s.portrait} />}
        <div className={s.chartBody}>
          <small>{d.code} · {d.specialty} · fictional patient</small>
          <h3>{pt.name}</h3>
          <dl>
            <div><dt>Age</dt><dd>{pt.age}</dd></div>
            <div><dt>Concern</dt><dd>{pt.concern}</dd></div>
            {pt.interests?.length > 0 && <div><dt>Loves</dt><dd>{pt.interests.join(', ')}</dd></div>}
          </dl>
          <ol className={s.stageList}>
            {stages.map((x, k) => <li key={x.id} className={k < i || finished ? s.sDone : k === i ? s.sNow : ''}><span>{k + 1}</span>{x.title}</li>)}
            <li className={finished ? s.sNow : ''}><span>{stages.length + 1}</span>Debrief</li>
          </ol>
          <span className={r.tag}>{track === 'senior' ? 'Senior' : 'Junior'} mode</span>
        </div>
      </aside>

      <div className={s.stage}>
        {i === -1 && (
          <div className={s.card}>
            {pt.scene && (
              <div className={s.scene}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={pt.scene} alt="" />
                {d.opening?.dialogue && <blockquote className={s.bubble}><b>{d.opening.speaker || pt.name?.split(' ')[0]}</b>{d.opening.dialogue}</blockquote>}
              </div>
            )}
            <p className={s.sceneText}>{d.opening?.scene}</p>
            <div className={s.attending}><Icon name="cap" size={18} /><p><b>{d.opening?.narratorRole || 'Attending physician'}</b>{d.opening?.narrator}</p></div>
            <div className={s.actions}><button type="button" className={r.btn} onClick={() => setI(0)}>{d.emergency ? 'Respond now' : 'Enter the clinic'} <Icon name="arrow" size={16} /></button></div>
          </div>
        )}

        {st && (
          <div className={s.card} key={st.id}>
            <p className={r.eyebrow}>Stage {i + 1} of {stages.length}</p>
            <h3 className={s.h}>{st.title}</h3>

            {st.type === 'interview' && (
              <>
                <p className={s.ask}>{st.prompt}</p>
                <div className={s.qGrid}>
                  {st.questions.map((q, k) => (
                    <button key={k} type="button" className={`${s.qBtn} ${asked[k] ? s.qAsked : ''}`} onClick={() => { setAsked((a) => ({ ...a, [k]: true })); setLog((l) => [...l, { stage: st.id, asked: q.q }]); }}>
                      <Icon name="chat" size={15} />{q.q}
                    </button>
                  ))}
                </div>
                <div className={s.transcript} aria-live="polite">
                  {st.questions.map((q, k) => asked[k] && (
                    <div key={k} className={s.turn}>
                      <p className={s.you}>{q.q}</p>
                      <p className={s.them}><b>{q.who || st.speaker || pt.name?.split(' ')[0]}</b>“{q.a}”</p>
                      <p className={s.why}>{q.feedback}</p>
                    </div>
                  ))}
                </div>
                {Object.keys(asked).length >= (st.min || 1) && st.wrap && <p className={r.explain}>{st.wrap}</p>}
              </>
            )}

            {st.type === 'observe' && (
              <>
                <p className={s.sceneText}>{st.text}</p>
                <div className={s.findings}>
                  {st.findings.map((f, k) => (
                    <div key={k} className={`${s.finding} ${s[`f_${f.flag}`] || ''}`} style={{ animationDelay: `${k * 180}ms` }}>
                      <span>{f.label}</span><b>{f.value}</b>
                    </div>
                  ))}
                </div>
                {variant?.choices && <Choices id={st.id} prompt={variant.prompt} choices={variant.choices} picked={picked} onPick={onPick} />}
              </>
            )}

            {st.type === 'model' && variant && <ModelStage v={variant} onDone={reason(st.id)} />}
            {st.type === 'differential' && variant && <DifferentialStage v={variant} onDone={reason(st.id)} />}
            {st.type === 'sequence' && variant && <SequenceStage v={variant} onDone={reason(st.id)} />}

            {st.type === 'labs' && (
              <>
                <p className={s.sceneText}>{st.intro}</p>
                <div className={s.labs} role="table" aria-label="Laboratory results">
                  <div className={s.labHead} role="row"><span>Test</span><span>Result</span><span>Reference</span><span /></div>
                  {st.results.map((x, k) => (
                    <div key={k} className={s.labRow} role="row" style={{ animationDelay: `${k * 160}ms` }}>
                      <span>{x.test}</span>
                      <b>{x.value} <small>{x.unit}</small></b>
                      <span className={s.ref}>{x.ref}</span>
                      <span className={`${s.flag} ${s[`fl_${x.flag}`] || ''}`}>{x.flag === 'low' ? 'Low' : x.flag === 'high' ? 'High' : x.note || ''}</span>
                    </div>
                  ))}
                </div>
              </>
            )}

            {st.type === 'decision' && variant?.choices && (
              <>
                <Choices id={st.id} prompt={variant.prompt} choices={variant.choices} picked={picked} onPick={onPick} />
                {variant.choices[picked[st.id]]?.preferred && st.wrap && <p className={r.explain}>{st.wrap}</p>}
              </>
            )}

            {st.type === 'oxygen' && (
              <>
                <p className={s.sceneText}>{st.intro}</p>
                <OxygenTransit normal={st.normal_hb} patient={st.patient_hb} track={track} patientName={pt.name?.split(' ')[0]} />
              </>
            )}

            <div className={s.actions}>
              {!canNext && st.type === 'interview' && <span className={r.muted}>Ask at least {st.min} questions.</span>}
              <button type="button" className={r.btn} disabled={!canNext} onClick={() => setI(i + 1)}>{i < stages.length - 1 ? 'Continue' : 'Go to the debrief'} <Icon name="arrow" size={16} /></button>
            </div>
          </div>
        )}

        {finished && (
          <div className={s.card}>
            <p className={r.eyebrow}>Debrief</p>
            <h3 className={s.h}>What we learned</h3>
            <div className={r.scoreDial}><strong>{score}</strong><span>Clinical reasoning score: your model, your differential and your decisions.</span></div>
            <div className={s.debrief}>
              <div><b>The science</b><p>{d.debrief?.science}</p></div>
              {d.debrief?.pearl && <div><b>Thinking like a clinician</b><p>{d.debrief.pearl}</p></div>}
              <div><b>What’s next</b><p>{d.debrief?.uncertainty}</p></div>
              <div><b>The human lesson</b><p>{d.debrief?.human}</p></div>
            </div>
            <p className={s.closing}>{d.debrief?.closing}</p>
            {saved ? (
              <div className={s.saved} role="status">
                <Icon name="award" size={20} /> Saved to your Cadet Passport{step.honor ? `: ${step.honor}` : ''}.
                <Link href="/passport" className={`${r.btnGhost} ${r.small}`}>Open my Passport</Link>
              </div>
            ) : !previewOnly && (
              <>
                <label className={r.field}><span>{d.journal?.prompt || 'Healer’s Journal'}</span><textarea value={journal} onChange={(e) => setJournal(e.target.value)} placeholder="Write a few sentences…" /></label>
                <div className={s.actions}><button type="button" className={r.btn} onClick={finish}>Close the case <Icon name="check" size={16} /></button></div>
              </>
            )}
            {err && <p className={r.error}>{err}</p>}
          </div>
        )}
      </div>
    </div>
  );
}
