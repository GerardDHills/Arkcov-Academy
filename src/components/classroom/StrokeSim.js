'use client';

import { useEffect, useMemo, useState } from 'react';
import Icon from '@/components/Icon';
import s from './sim.module.css';
import r from './room.module.css';

// Mr. Johnson: a stroke in progress. Cadets examine with BE FAST, decide,
// and act. Score = decisions answered correctly on the first try.

const EXAM = [
  { k: 'B', name: 'Balance', finding: 'He sways when he stands and grabs the counter. New since this morning.' },
  { k: 'E', name: 'Eyes', finding: 'He says things on his right side look blurry and doubled.' },
  { k: 'F', name: 'Face', finding: 'When he smiles, the right side of his mouth droops.' },
  { k: 'A', name: 'Arms', finding: 'Arms out, eyes closed: his right arm drifts down.' },
  { k: 'S', name: 'Speech', finding: '“It’s… a… sunny… day” comes out slow and slurred.' },
];

const STAGES = [
  {
    id: 'clock', title: 'Find the clock',
    scene: 'Mr. Johnson, 62, is sitting at the kitchen table. His granddaughter Maya says he “isn’t acting right.” He looks confused but awake.',
    ask: 'Before anything else, what is the most important question to ask Maya?',
    choices: [
      { t: 'When was he last seen acting normal?', ok: true, why: 'Exactly. Stroke treatment depends on time. The clock starts when he was last known well, and Maya says that was 45 minutes ago.' },
      { t: 'Has he eaten breakfast today?', why: 'Useful later, but the first thing a stroke team needs is when he was last known well.' },
      { t: 'Can he take an aspirin now?', why: 'Never give aspirin before a scan. If the stroke is a bleed, aspirin could make it worse.' },
    ],
  },
  { id: 'exam', title: 'BE FAST exam', exam: true,
    scene: 'Check each sign. Tap a letter to examine Mr. Johnson.' },
  {
    id: 'sugar', title: 'Rule out a look-alike',
    scene: 'Your exam shows sudden problems with balance, vision, face, arm and speech, all on the right side.',
    ask: 'One quick bedside test can reveal a common stroke look-alike. Which one?',
    choices: [
      { t: 'Check his blood sugar with a fingerstick', ok: true, why: 'Right. Very low blood sugar can mimic a stroke. His reads 112 mg/dL, which is normal, so this is not low sugar.', reveal: 'glucose' },
      { t: 'Take his temperature', why: 'A fever doesn’t cause sudden one-sided weakness. Blood sugar is the look-alike to rule out.' },
      { t: 'Listen to his lungs', why: 'His breathing is fine. Low blood sugar is the classic stroke look-alike.' },
    ],
  },
  {
    id: 'act', title: 'Act fast',
    scene: 'Blood pressure 178/96, heart rate 92, oxygen 97%. Every minute of a stroke, the brain loses about 1.9 million nerve cells.',
    ask: 'What do you do now?',
    choices: [
      { t: 'Call 911 now, and tell them the time he was last known well', ok: true, why: 'Yes. Paramedics alert the stroke team on the way, and the time tells doctors which treatments are still possible.' },
      { t: 'Have Maya drive him to the clinic after lunch', why: 'Waiting costs brain. Call 911: paramedics start care and alert the hospital.' },
      { t: 'Let him lie down and check again in an hour', why: 'Symptoms can look like they’re improving while damage continues. Call 911 now.' },
    ],
  },
  {
    id: 'ct', title: 'At the hospital',
    scene: 'The stroke team meets Mr. Johnson at the door and takes him straight to the CT scanner.',
    ask: 'Why is a brain scan done before giving a clot-busting medicine?',
    choices: [
      { t: 'To tell a blocked vessel from bleeding in the brain', ok: true, why: 'Correct. A clot-buster helps a blocked vessel but would be dangerous if the brain is bleeding.' },
      { t: 'To check for a broken skull', why: 'The scan’s key job here is to tell a clot from a bleed before treatment.' },
      { t: 'It isn’t needed; the medicine is always safe', why: 'Clot-busting medicine can worsen a bleed. That’s why the scan comes first.' },
    ],
  },
  {
    id: 'side', title: 'Think like a neurologist',
    scene: 'The scan shows a blocked vessel, and the team treats him quickly. His weakness and slurred speech were on the right side.',
    ask: 'Which side of his brain is the stroke most likely on?',
    choices: [
      { t: 'The left side', ok: true, why: 'Right. Each side of the brain controls the opposite side of the body, and speech is usually managed on the left.' },
      { t: 'The right side', why: 'Each side of the brain controls the opposite side of the body, so right-sided weakness points to the left brain.' },
      { t: 'The cerebellum only', why: 'Balance can involve the cerebellum, but face, arm and speech on the right point to the left side of the brain.' },
    ],
  },
];

const GRADED = STAGES.filter((x) => x.choices).length;

function useVitals(alarm) {
  const [v, setV] = useState({ hr: 92, sys: 178, dia: 96, spo2: 97 });
  useEffect(() => {
    const id = setInterval(() => {
      setV((p) => ({
        hr: Math.max(84, Math.min(100, p.hr + Math.round((Math.random() - 0.5) * 4))),
        sys: Math.max(170, Math.min(186, p.sys + Math.round((Math.random() - 0.5) * 4))),
        dia: Math.max(92, Math.min(100, p.dia + Math.round((Math.random() - 0.5) * 2))),
        spo2: Math.max(96, Math.min(98, p.spo2 + Math.round((Math.random() - 0.5) * 1.2))),
      }));
    }, 1600);
    return () => clearInterval(id);
  }, [alarm]);
  return v;
}

export default function StrokeSim({ onFinish, disabled = false }) {
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState({});
  const [firstTry, setFirstTry] = useState({});
  const [seen, setSeen] = useState({});
  const [glucose, setGlucose] = useState(null);
  const [log, setLog] = useState([]);
  const [finished, setFinished] = useState(false);
  const v = useVitals(i);
  const stage = STAGES[i];
  const ecg = useMemo(() => {
    let d = 'M0 40';
    for (let x = 0; x < 8; x++) {
      const o = x * 100;
      d += ` L${o + 20} 40 L${o + 28} 34 L${o + 34} 40 L${o + 44} 40 L${o + 48} 46 L${o + 53} 6 L${o + 58} 56 L${o + 62} 40 L${o + 76} 40 L${o + 86} 30 L${o + 96} 40 L${o + 100} 40`;
    }
    return d;
  }, []);

  const choose = (ci) => {
    if (picked[stage.id] !== undefined && stage.choices[picked[stage.id]].ok) return;
    const c = stage.choices[ci];
    if (firstTry[stage.id] === undefined) setFirstTry((f) => ({ ...f, [stage.id]: Boolean(c.ok) }));
    setPicked((p) => ({ ...p, [stage.id]: ci }));
    setLog((l) => [...l, { stage: stage.id, choice: c.t, ok: Boolean(c.ok) }]);
    if (c.ok && c.reveal === 'glucose') setGlucose(112);
  };
  const canNext = stage.exam ? Object.keys(seen).length === EXAM.length : stage.choices?.[picked[stage.id]]?.ok;
  const score = Math.round((Object.values(firstTry).filter(Boolean).length / GRADED) * 100);

  const next = () => {
    if (i < STAGES.length - 1) setI(i + 1);
    else {
      setFinished(true);
      onFinish?.(score, log);
    }
  };

  return (
    <div className={s.sim}>
      <div className={s.monitor} aria-label="Patient monitor">
        <div className={s.monHead}>
          <span><Icon name="pulse" size={16} /> Bedside monitor</span>
          <span className={s.bed}>Bay 3 · Johnson, R. · 62 M</span>
        </div>
        <div className={s.ecg} aria-hidden="true">
          <svg viewBox="0 0 800 60" preserveAspectRatio="none"><path d={ecg} /></svg>
        </div>
        <div className={s.vitals}>
          <div className={s.vHr}><small>HR</small><strong>{v.hr}</strong><em>bpm</em></div>
          <div className={s.vBp}><small>NIBP</small><strong>{v.sys}/{v.dia}</strong><em>mmHg</em></div>
          <div className={s.vO2}><small>SpO₂</small><strong>{v.spo2}</strong><em>%</em></div>
          <div className={s.vGlu}><small>Glucose</small><strong>{glucose ?? '—'}</strong><em>mg/dL</em></div>
        </div>
        <div className={s.clock}><Icon name="clock" size={15} /> Last known well: {i === 0 && picked.clock === undefined ? 'unknown' : '45 min ago'}</div>
      </div>

      <div className={s.case}>
        <ol className={s.rail} aria-label="Case progress">
          {STAGES.map((st, k) => (
            <li key={st.id} className={k < i || finished ? s.done : k === i ? s.now : ''}><span>{k + 1}</span><b>{st.title}</b></li>
          ))}
        </ol>

        {!finished ? (
          <div className={s.card} key={stage.id}>
            <p className={r.eyebrow}>Step {i + 1} of {STAGES.length}</p>
            <h3 className={s.h}>{stage.title}</h3>
            <p className={s.scene}>{stage.scene}</p>

            {stage.exam && (
              <div className={s.exam}>
                {EXAM.map((e) => (
                  <button key={e.k} type="button" className={`${s.examBtn} ${seen[e.k] ? s.examSeen : ''}`} onClick={() => setSeen((x) => ({ ...x, [e.k]: true }))} aria-expanded={Boolean(seen[e.k])} disabled={disabled}>
                    <span className={s.letter}>{e.k}</span>
                    <span><b>{e.name}</b>{seen[e.k] && <em>{e.finding}</em>}</span>
                  </button>
                ))}
                <div className={s.examLast}><span className={s.letter}>T</span><span><b>Time</b><em>Time to call 911. Note when symptoms began.</em></span></div>
              </div>
            )}

            {stage.choices && (
              <>
                <p className={s.ask}>{stage.ask}</p>
                <div className={r.opts}>
                  {stage.choices.map((c, ci) => {
                    const on = picked[stage.id] === ci;
                    return (
                      <button key={ci} type="button" disabled={disabled} className={`${r.opt} ${on ? (c.ok ? r.right : r.wrong) : ''}`} aria-pressed={on} onClick={() => choose(ci)}>
                        <span className={r.key}>{String.fromCharCode(65 + ci)}</span>{c.t}
                      </button>
                    );
                  })}
                </div>
                {picked[stage.id] !== undefined && <p className={r.explain}>{stage.choices[picked[stage.id]].why}</p>}
              </>
            )}

            <div className={s.actions}>
              <button type="button" className={r.btn} onClick={next} disabled={!canNext || disabled}>
                {i < STAGES.length - 1 ? 'Continue' : 'Finish the case'} <Icon name="arrow" size={17} />
              </button>
            </div>
          </div>
        ) : (
          <div className={s.card}>
            <p className={r.eyebrow}>Case complete</p>
            <h3 className={s.h}>Mr. Johnson is recovering</h3>
            <div className={r.scoreDial}><strong>{score}</strong><span>Clinical decisions correct on the first try. Because his family acted fast, the stroke team treated him in time and his speech is returning.</span></div>
          </div>
        )}
      </div>
    </div>
  );
}
