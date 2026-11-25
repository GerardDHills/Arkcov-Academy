'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/Icon';
import { RichText } from './Scene';
import r from './room.module.css';
import s from './lesson.module.css';

const PARTS = [
  ['hook', 'The Hook'],
  ['discovery', 'The Discovery'],
  ['spotlight', 'Healer Spotlight'],
  ['mission', 'The Mission'],
  ['check', 'Knowledge Check'],
  ['physician', 'Physician Connection'],
  ['journal', 'Healer’s Journal'],
];

function Narration({ text }) {
  const words = useMemo(() => String(text || '').split(' '), [text]);
  return (
    <p className={s.narration} aria-label={text}>
      {words.map((w, i) => <span key={i} style={{ animationDelay: `${i * 70}ms` }} aria-hidden="true">{w} </span>)}
    </p>
  );
}

// The seven-part Arkcov lesson, in a junior or senior version.
export default function LessonView({ step, track = 'junior', done = false, sessionId = null, onSaved, previewOnly = false }) {
  const d = step.data || {};
  const qs = d.check?.[track] || [];
  const spots = d.mission?.spots || [];
  const [visited, setVisited] = useState({});
  const [answers, setAnswers] = useState({});
  const [journal, setJournal] = useState('');
  const [result, setResult] = useState(null);
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState('');
  const [active, setActive] = useState('hook');

  useEffect(() => { setAnswers({}); setResult(null); }, [track, step.id]);
  useEffect(() => {
    const els = PARTS.map(([id]) => document.getElementById(`part-${id}`)).filter(Boolean);
    const io = new IntersectionObserver((ents) => ents.forEach((e) => e.isIntersecting && setActive(e.target.id.replace('part-', ''))), { rootMargin: '-40% 0px -55% 0px' });
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, [step.id]);

  const missionDone = spots.length === 0 || spots.every((_, i) => visited[i]);
  const allAnswered = qs.every((_, i) => answers[i] !== undefined);
  const ready = missionDone && allAnswered && journal.trim().length > 0;

  const submit = async () => {
    if (previewOnly) return;
    setSaving(true); setErr('');
    try {
      const res = await fetch(`/api/classroom/steps/${step.id}`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ track, answers: qs.map((_, i) => answers[i]), journal, mission: missionDone, sessionId }),
      });
      const v = await res.json();
      if (!res.ok) throw new Error(v.error);
      setResult(v.result); onSaved?.(v);
    } catch (e) { setErr(e.message); }
    setSaving(false);
  };

  const minutes = d.minutes?.[track] || step.minutes;

  return (
    <div className={s.lesson}>
      <nav className={s.rail} aria-label="Lesson parts">
        {PARTS.map(([id, label], i) => (
          <a key={id} href={`#part-${id}`} className={active === id ? s.railOn : ''}><span>{i + 1}</span>{label}</a>
        ))}
      </nav>

      <div className={s.parts}>
        <section id="part-hook" className={`${s.part} ${s.hook}`}>
          <p className={r.eyebrow}>{d.code ? `${d.code} · ` : ''}{track === 'senior' ? 'Senior Cadet' : 'Junior Cadet'} track · {minutes} min</p>
          <Narration text={d.hook?.narration} />
          {d.objectives?.[track]?.length > 0 && (
            <div className={s.objectives}>
              <b>You will be able to</b>
              <ul>{d.objectives[track].map((o, i) => <li key={i}>{o}</li>)}</ul>
            </div>
          )}
        </section>

        <section id="part-discovery" className={s.part}>
          <h3 className={s.h}><span>2</span> The Discovery</h3>
          <RichText text={d.discovery?.[track] || d.discovery?.junior} />
        </section>

        {d.spotlight?.name && (
          <section id="part-spotlight" className={`${s.part} ${s.spotlight}`}>
            <h3 className={s.h}><span>3</span> Healer Spotlight</h3>
            <div className={s.spotCard}>
              <div className={s.medal}><Icon name="award" size={30} /></div>
              <div>
                <h4>{d.spotlight.name}{d.spotlight.years && <small> · {d.spotlight.years}</small>}</h4>
                <p>{d.spotlight.contribution}</p>
                {d.spotlight.connection && <p className={s.connect}>{d.spotlight.connection}</p>}
                {d.spotlight.source?.url && <a href={d.spotlight.source.url} target="_blank" rel="noopener noreferrer" className={s.source}>Source: {d.spotlight.source.title}</a>}
              </div>
            </div>
          </section>
        )}

        {d.mission && (
          <section id="part-mission" className={s.part}>
            <h3 className={s.h}><span>4</span> The Mission{d.mission.title ? `: ${d.mission.title}` : ''}</h3>
            {d.mission.intro && <p className={s.lead}>{d.mission.intro}</p>}
            <div className={s.spots}>
              {spots.map((sp, i) => (
                <button key={i} type="button" className={`${s.spot} ${visited[i] ? s.spotOn : ''}`} onClick={() => setVisited((v) => ({ ...v, [i]: true }))} aria-pressed={Boolean(visited[i])}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={sp.art} alt="" loading="lazy" />
                  <span className={s.spotIn}>
                    <b>{visited[i] && <Icon name="check" size={15} />} {sp.name}</b>
                    {visited[i] ? <em>{sp.text}</em> : <em>Tap to visit</em>}
                  </span>
                </button>
              ))}
            </div>
            {missionDone && spots.length > 0 && (
              <div className={s.reward} role="status"><Icon name="award" size={20} /> Mission complete. {d.mission.reward || ''}</div>
            )}
          </section>
        )}

        {qs.length > 0 && (
          <section id="part-check" className={s.part}>
            <h3 className={s.h}><span>5</span> Knowledge Check</h3>
            {qs.map((q, qi) => {
              const rev = result?.reveal?.[qi];
              const res = result?.results?.[qi];
              return (
                <div key={qi} className={r.q}>
                  <div className={r.qText}><span className={r.qNum}>{String(qi + 1).padStart(2, '0')}</span><span>{q.q}</span></div>
                  <div className={r.opts}>
                    {q.options.map((o, oi) => {
                      const on = answers[qi] === oi;
                      const cls = rev ? (oi === rev.answer ? r.right : on ? r.wrong : '') : '';
                      return (
                        <button key={oi} type="button" className={`${r.opt} ${cls}`} aria-pressed={on} disabled={Boolean(result) || previewOnly}
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
          </section>
        )}

        {d.physician && (
          <section id="part-physician" className={s.part}>
            <h3 className={s.h}><span>6</span> Physician Connection</h3>
            <div className={s.physician}>
              <Icon name="video" size={22} />
              <div>
                <p>{d.physician.prompt}</p>
                {d.physician.questions?.length > 0 && <ul>{d.physician.questions.map((x, i) => <li key={i}>{x}</li>)}</ul>}
                <Link href="/classroom" className={s.source}>See upcoming live classes</Link>
              </div>
            </div>
          </section>
        )}

        <section id="part-journal" className={s.part}>
          <h3 className={s.h}><span>7</span> Healer’s Journal</h3>
          <label className={r.field}>
            <span>{d.journal?.prompt || 'What did you learn about science, yourself and other people?'}</span>
            <textarea value={journal} onChange={(e) => setJournal(e.target.value)} disabled={Boolean(result) || previewOnly} placeholder="Write a few sentences…" />
          </label>

          {result ? (
            <div className={s.finish} role="status">
              {result.total > 0 && <div className={r.scoreDial}><strong>{result.score}</strong><span>{result.right} of {result.total} correct on the Knowledge Check. Your best score counts.</span></div>}
              {d.closing && <Narration text={d.closing} />}
              {step.honor && <div className={s.reward}><Icon name="award" size={20} /> Added to your Cadet Passport: {step.honor}</div>}
              <Link href="/passport" className={r.btn}>Open my Cadet Passport <Icon name="arrow" size={16} /></Link>
            </div>
          ) : (
            !previewOnly && (
              <div className={s.submitRow}>
                {!missionDone && <span className={r.muted}>Visit every mission stop first.</span>}
                {missionDone && !allAnswered && <span className={r.muted}>Answer every Knowledge Check question.</span>}
                <button type="button" className={r.btn} onClick={submit} disabled={!ready || saving}>{saving ? 'Saving…' : done ? 'Submit again' : 'Complete the lesson'} <Icon name="check" size={16} /></button>
              </div>
            )
          )}
          {err && <p className={r.error} role="alert">{err}</p>}
        </section>
      </div>
    </div>
  );
}
