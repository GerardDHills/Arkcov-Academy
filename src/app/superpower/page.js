'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { ArkcovCrest } from '@/components/BrandMark';
import {
  QUESTIONS, SUPERPOWERS, SUPERPOWER_ORDER, LEVELS, ASSESSMENT_VERSION, calculateSuperpowers,
} from '@/lib/superpowers';
import styles from './superpower.module.css';

const STORAGE_KEY = 'arkcov-ssa-v1';
const LETTERS = ['A', 'B', 'C', 'D'];

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function newOrder() {
  return Object.fromEntries(QUESTIONS.map((q) => [q.id, shuffle(LETTERS)]));
}

function load() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function save(state) {
  try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch { /* storage unavailable */ }
}

function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
}

// ---------- Emblem ----------
function SuperpowerEmblem({ k, size = 96, title }) {
  const sp = SUPERPOWERS[k];
  return (
    <svg width={size} height={size * 1.12} viewBox="0 0 100 112" role={title ? 'img' : undefined} aria-hidden={title ? undefined : true} aria-label={title}>
      <defs>
        <linearGradient id={`g-${k}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1B2D5E" />
          <stop offset="1" stopColor="#081027" />
        </linearGradient>
      </defs>
      <path d="M50 4 92 18v36c0 26-18 44-42 54C26 98 8 80 8 54V18L50 4Z" fill={`url(#g-${k})`} stroke="#C9973F" strokeWidth="3" />
      <path d="M50 12 84 23.5V54c0 21-14.5 36-34 44.5C30.5 90 16 75 16 54V23.5L50 12Z" fill="none" stroke={sp.color} strokeWidth="1.6" opacity="0.9" />
      <g transform="translate(26 30) scale(2)">
        <path d={sp.emblem} fill="none" stroke="#E6C27A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  );
}

// ---------- Radar ----------
function Radar({ results }) {
  const byKey = Object.fromEntries(results.map((r) => [r.key, r]));
  const cx = 160; const cy = 150; const R = 108; const n = SUPERPOWER_ORDER.length;
  const pt = (i, v) => {
    const a = (-Math.PI / 2) + (i * 2 * Math.PI) / n;
    return [cx + Math.cos(a) * R * v, cy + Math.sin(a) * R * v];
  };
  const ring = (v) => SUPERPOWER_ORDER.map((_, i) => pt(i, v).join(',')).join(' ');
  const shape = SUPERPOWER_ORDER.map((k, i) => pt(i, byKey[k].score / 100).join(',')).join(' ');
  return (
    <svg viewBox="-40 0 400 300" className={styles.radar} role="img"
      aria-label={`Radar chart of your seven Social Superpowers: ${SUPERPOWER_ORDER.map((k) => `${SUPERPOWERS[k].name} ${byKey[k].displayScore} percent`).join(', ')}`}>
      {[0.25, 0.5, 0.75, 1].map((v) => <polygon key={v} points={ring(v)} className={styles.radarRing} />)}
      {SUPERPOWER_ORDER.map((k, i) => { const [x, y] = pt(i, 1); return <line key={k} x1={cx} y1={cy} x2={x} y2={y} className={styles.radarAxis} />; })}
      <polygon points={shape} className={styles.radarShape} />
      {SUPERPOWER_ORDER.map((k, i) => {
        const [x, y] = pt(i, byKey[k].score / 100);
        return <circle key={k} cx={x} cy={y} r="4.5" fill={SUPERPOWERS[k].color} stroke="#FBF7EF" strokeWidth="1.5" />;
      })}
      {SUPERPOWER_ORDER.map((k, i) => {
        const [x, y] = pt(i, 1.2);
        const anchor = Math.abs(x - cx) < 8 ? 'middle' : x > cx ? 'start' : 'end';
        return <text key={k} x={x} y={y + 4} textAnchor={anchor} className={styles.radarLabel}>{SUPERPOWERS[k].name}</text>;
      })}
    </svg>
  );
}

// ---------- Shareable identity card (PNG) ----------
async function downloadCard(result) {
  const canvas = document.createElement('canvas');
  canvas.width = 1200; canvas.height = 675;
  const c = canvas.getContext('2d');
  try { await document.fonts?.ready; } catch { /* ignore */ }
  const g = c.createLinearGradient(0, 0, 0, 675);
  g.addColorStop(0, '#1B2D5E'); g.addColorStop(1, '#081027');
  c.fillStyle = g; c.fillRect(0, 0, 1200, 675);
  c.strokeStyle = '#C9973F'; c.lineWidth = 3; c.strokeRect(28, 28, 1144, 619);

  const top = result.primary;
  const sp = SUPERPOWERS[top[0].key];
  // Emblem
  c.save(); c.translate(90, 150);
  c.scale(3.2, 3.2);
  const shield = new Path2D('M50 4 92 18v36c0 26-18 44-42 54C26 98 8 80 8 54V18L50 4Z');
  c.fillStyle = '#0E1A3A'; c.fill(shield); c.lineWidth = 2; c.strokeStyle = '#C9973F'; c.stroke(shield);
  c.translate(26, 30); c.scale(2, 2);
  c.lineWidth = 1.5; c.lineCap = 'round'; c.lineJoin = 'round'; c.strokeStyle = '#E6C27A';
  c.stroke(new Path2D(sp.emblem));
  c.restore();

  c.fillStyle = '#C9973F';
  c.font = '600 22px "Cinzel", Georgia, serif';
  c.fillText('ARKCOV ACADEMY  ·  SOCIAL SUPERPOWER', 470, 140);
  c.fillStyle = '#F6EEDF';
  c.font = '600 84px "Cormorant Garamond", Georgia, serif';
  const title = top.length === 1 ? sp.identity : top.map((t) => SUPERPOWERS[t.key].identity.replace('The ', '')).join(' & ');
  c.fillText(title, 465, 230);
  c.fillStyle = '#E6C27A';
  c.font = '600 30px "Nunito Sans", system-ui, sans-serif';
  c.fillText(`${top.length === 1 ? 'Primary Superpower' : 'Shared top Superpowers'}: ${top.map((t) => t.name).join(' + ')}`, 470, 285);

  const rows = result.results.slice(0, 4);
  rows.forEach((r, i) => {
    const y = 350 + i * 62;
    c.fillStyle = '#F6EEDF'; c.font = '600 24px "Nunito Sans", system-ui, sans-serif';
    c.fillText(r.name, 470, y);
    c.fillStyle = 'rgba(246,238,223,0.15)'; c.fillRect(700, y - 18, 360, 14);
    c.fillStyle = r.color; c.fillRect(700, y - 18, 3.6 * r.score, 14);
    c.fillStyle = '#E6C27A'; c.fillText(`${r.displayScore}%`, 1075, y);
  });
  c.fillStyle = 'rgba(246,238,223,0.7)';
  c.font = 'italic 26px "Cormorant Garamond", Georgia, serif';
  c.fillText('Train · Heal · Discover · Inspire', 470, 610);

  const url = canvas.toDataURL('image/png');
  const a = document.createElement('a');
  a.href = url; a.download = `arkcov-superpower-${sp.identity.toLowerCase().replace(/\s+/g, '-')}.png`;
  document.body.appendChild(a); a.click(); a.remove();
}

// ---------- Page ----------
export default function SuperpowerPage() {
  const [loaded, setLoaded] = useState(false);
  const [stage, setStage] = useState('intro'); // intro | quiz | reveal | results
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [order, setOrder] = useState(null);
  const [result, setResult] = useState(null);
  const headingRef = useRef(null);
  const advanceTimer = useRef(null);

  useEffect(() => {
    const s = load();
    if (s && s.version === ASSESSMENT_VERSION) {
      setAnswers(s.answers || {});
      setOrder(s.order || null);
      setIdx(Math.min(s.idx || 0, QUESTIONS.length - 1));
      setResult(s.result || null);
      setStage(s.stage === 'reveal' ? 'results' : s.stage || 'intro');
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    save({ version: ASSESSMENT_VERSION, stage, idx, answers, order, result });
  }, [loaded, stage, idx, answers, order, result]);

  useEffect(() => {
    if (stage === 'quiz' || stage === 'results') headingRef.current?.focus();
  }, [stage, idx]);

  useEffect(() => () => clearTimeout(advanceTimer.current), []);

  const answeredCount = useMemo(() => QUESTIONS.filter((q) => answers[q.id]).length, [answers]);
  const allAnswered = answeredCount === QUESTIONS.length;
  const hasProgress = answeredCount > 0 && stage === 'intro';

  const start = () => {
    if (!order) setOrder(newOrder());
    setStage('quiz');
  };

  const restart = () => {
    setAnswers({}); setResult(null); setIdx(0); setOrder(newOrder()); setStage('quiz');
  };

  const choose = (qid, letter) => {
    setAnswers((prev) => ({ ...prev, [qid]: letter }));
    clearTimeout(advanceTimer.current);
    if (idx < QUESTIONS.length - 1) {
      advanceTimer.current = setTimeout(() => setIdx((i) => Math.min(i + 1, QUESTIONS.length - 1)), prefersReducedMotion() ? 0 : 380);
    }
  };

  const reveal = useCallback(() => {
    const r = calculateSuperpowers(answers);
    setResult(r);
    if (prefersReducedMotion()) { setStage('results'); return; }
    setStage('reveal');
    setTimeout(() => setStage('results'), 3200);
  }, [answers]);

  if (!loaded) return (<><Navbar /><main className={styles.page} id="main" /></>);

  return (
    <>
      <Navbar />
      <main className={styles.page} id="main">
        <div className={styles.stars} aria-hidden="true" />

        {stage === 'intro' && (
          <section className={styles.intro} aria-labelledby="ssa-title">
            <div className={styles.introCrest}><ArkcovCrest size={130} /></div>
            <p className={styles.eyebrow}>Arkcov Academy · Admissions</p>
            <h1 id="ssa-title" className={styles.title}>Discover your <em>Social</em> <span>Superpower</span></h1>
            <p className={styles.lead}>
              Every person has extraordinary abilities. Some inspire others to dream bigger. Some bring people together.
              Others have the courage to stand up for what is right, the determination to overcome, or the compassion to heal.
            </p>
            <p className={styles.lead}>
              Before you enlist, answer 25 questions about how you think, handle challenges and treat other people.
              There are no right or wrong answers. Choose what describes who you are today, not who you think you should be.
            </p>
            <ul className={styles.powerRow} aria-label="The seven Social Superpowers">
              {SUPERPOWER_ORDER.map((k) => (
                <li key={k}>
                  <SuperpowerEmblem k={k} size={54} />
                  <span>{SUPERPOWERS[k].name}</span>
                </li>
              ))}
            </ul>
            <div className={styles.introBtns}>
              {hasProgress ? (
                <>
                  <button type="button" className="btn btn-crimson btn-lg" onClick={start}>Resume ({answeredCount} of 25 answered)</button>
                  <button type="button" className="btn btn-ghost btn-lg" onClick={restart}>Start over</button>
                </>
              ) : (
                <button type="button" className="btn btn-crimson btn-lg" onClick={start}>Begin the assessment</button>
              )}
            </div>
            <p className={styles.fine}>About 5 minutes · Your answers stay on this device and are not shared · Every superpower can be developed</p>
          </section>
        )}

        {stage === 'quiz' && (
          <Quiz
            idx={idx} setIdx={setIdx} answers={answers} order={order} choose={choose}
            answeredCount={answeredCount} allAnswered={allAnswered} reveal={reveal} headingRef={headingRef}
          />
        )}

        {stage === 'reveal' && result && <Reveal result={result} />}

        {stage === 'results' && result && (
          <Results result={result} headingRef={headingRef} restart={restart} />
        )}
      </main>
    </>
  );
}

function Quiz({ idx, setIdx, answers, order, choose, answeredCount, allAnswered, reveal, headingRef }) {
  const q = QUESTIONS[idx];
  const letters = order?.[q.id] || LETTERS;
  const isLast = idx === QUESTIONS.length - 1;
  const firstUnanswered = QUESTIONS.findIndex((x) => !answers[x.id]);
  return (
    <section className={styles.quiz} aria-labelledby="q-text">
      <div className={styles.progressWrap}>
        <div className={styles.progressMeta}>
          <span>Question {idx + 1} of {QUESTIONS.length}</span>
          <span>{answeredCount} answered</span>
        </div>
        <div className={styles.progress} role="progressbar" aria-label="Assessment progress" aria-valuemin={0} aria-valuemax={QUESTIONS.length} aria-valuenow={answeredCount}>
          <div style={{ width: `${(answeredCount / QUESTIONS.length) * 100}%` }} />
        </div>
      </div>

      <div className={styles.card} key={q.id}>
        <fieldset className={styles.fieldset}>
          <legend id="q-text" tabIndex={-1} ref={headingRef} className={styles.question}>{q.text}</legend>
          <div className={styles.options}>
            {letters.map((L, i) => {
              const id = `q${q.id}-${L}`;
              const checked = answers[q.id] === L;
              return (
                <label key={L} htmlFor={id} className={`${styles.option} ${checked ? styles.optionOn : ''}`}>
                  <input type="radio" id={id} name={`q${q.id}`} value={L} checked={checked} onChange={() => choose(q.id, L)} />
                  <span className={styles.optKey} aria-hidden="true">{String.fromCharCode(65 + i)}</span>
                  <span>{q.options[L]}</span>
                </label>
              );
            })}
          </div>
        </fieldset>
      </div>

      <div className={styles.quizNav}>
        <button type="button" className="btn btn-ghost" onClick={() => setIdx(Math.max(0, idx - 1))} disabled={idx === 0}>Back</button>
        {!isLast && (
          <button type="button" className="btn btn-ghost" onClick={() => setIdx(idx + 1)} disabled={!answers[q.id]}>Next</button>
        )}
        {isLast && (
          allAnswered ? (
            <button type="button" className="btn btn-gold btn-lg" onClick={reveal}>Reveal my superpower</button>
          ) : (
            <button type="button" className="btn btn-ghost" onClick={() => setIdx(firstUnanswered)} disabled={firstUnanswered < 0}>
              Go to question {firstUnanswered + 1} (unanswered)
            </button>
          )
        )}
      </div>
      <ol className={styles.dots} aria-label="Jump to a question">
        {QUESTIONS.map((x, i) => (
          <li key={x.id}>
            <button type="button" onClick={() => setIdx(i)} aria-label={`Question ${i + 1}${answers[x.id] ? ', answered' : ''}`}
              aria-current={i === idx ? 'step' : undefined}
              className={`${styles.dot} ${answers[x.id] ? styles.dotDone : ''} ${i === idx ? styles.dotNow : ''}`} />
          </li>
        ))}
      </ol>
    </section>
  );
}

function Reveal({ result }) {
  const k = result.primary[0].key;
  return (
    <section className={styles.reveal} aria-live="polite">
      <p className={styles.revealLine1}>Reading your answers…</p>
      <div className={styles.revealEmblem}><SuperpowerEmblem k={k} size={170} /></div>
      <p className={styles.revealLine2}>Your Social Superpower is</p>
      <h1 className={styles.revealName}>{result.primary.length === 1 ? SUPERPOWERS[k].identity : 'More than one'}</h1>
    </section>
  );
}

function Results({ result, headingRef, restart }) {
  const top = result.primary;
  const lead = SUPERPOWERS[top[0].key];
  const isTie = top.length > 1;
  const second = result.secondary;
  const growth = result.developmentOpportunities;
  const nameList = (arr) => arr.map((r) => SUPERPOWERS[r.key].identity).join(' & ');

  return (
    <section className={styles.results} aria-labelledby="result-title">
      <header className={styles.resultHero}>
        <div className={styles.resultEmblems}>
          {top.slice(0, 3).map((r) => <SuperpowerEmblem key={r.key} k={r.key} size={isTie ? 120 : 170} title={`${SUPERPOWERS[r.key].identity} emblem`} />)}
        </div>
        <div>
          <p className={styles.eyebrow}>Arkcov Academy · Social Superpower</p>
          <h1 id="result-title" ref={headingRef} tabIndex={-1} className={styles.resultTitle}>
            {isTie ? nameList(top) : lead.identity}
          </h1>
          <p className={styles.resultSub}>
            {isTie ? (top.length === 2 ? 'Dual Superpower' : 'Multiple Superpowers') : 'Primary Superpower'}: {top.map((r) => r.name).join(' + ')}
            <strong> · {top[0].displayScore}%</strong>
          </p>
          {top.map((r) => <p key={r.key} className={styles.resultText}>{SUPERPOWERS[r.key].result}</p>)}
        </div>
      </header>

      <div className={styles.resultGrid}>
        <div className={styles.panel}>
          <h2 className={styles.panelTitle}>Your Superpower DNA</h2>
          <Radar results={result.results} />
        </div>
        <div className={styles.panel}>
          <h2 className={styles.panelTitle}>All seven powers</h2>
          <ul className={styles.bars}>
            {result.results.map((r) => (
              <li key={r.key}>
                <div className={styles.barHead}>
                  <span className={styles.barName}><i style={{ background: r.color }} />{r.name} <em>{SUPERPOWERS[r.key].identity}</em></span>
                  <span className={styles.barVal}>{r.displayScore}% · {r.level}</span>
                </div>
                <div className={styles.barTrack}><div style={{ width: `${r.score}%`, background: r.color }} /></div>
              </li>
            ))}
          </ul>
          <details className={styles.levels}>
            <summary>What the levels mean</summary>
            <dl>{LEVELS.map((l) => (<div key={l.name}><dt>{l.name}{l.min ? ` (${l.min}%+)` : ''}</dt><dd>{l.text}</dd></div>))}</dl>
          </details>
        </div>
      </div>

      <div className={styles.trio}>
        {!isTie && second.length > 0 && (
          <article className={styles.mini}>
            <p className={styles.miniLabel}>Secondary Superpower</p>
            <h3>{nameList(second)}</h3>
            <p>{second.map((r) => SUPERPOWERS[r.key].name).join(' + ')} · {second[0].displayScore}%</p>
          </article>
        )}
        <article className={styles.mini}>
          <p className={styles.miniLabel}>How healers use it</p>
          <h3>{lead.identity} in medicine</h3>
          <p>{lead.inMedicine}</p>
        </article>
        <article className={styles.mini}>
          <p className={styles.miniLabel}>Power-up mission</p>
          <h3>Use your {lead.name}</h3>
          <p>{lead.mission}</p>
        </article>
        {growth.length > 0 && (
          <article className={styles.mini}>
            <p className={styles.miniLabel}>Your next development mission</p>
            <h3>Grow your {growth[0].name}</h3>
            <p>{SUPERPOWERS[growth[0].key].mission}</p>
          </article>
        )}
      </div>

      <div className={styles.enlist}>
        <div>
          <p className={styles.eyebrowGold}>Your training is waiting</p>
          <h2>Learn to use your superpower as a healer</h2>
          <p>
            Knowing your superpower is the first step. Cadets who enlist unlock the Inspiring Healers curriculum, where you
            learn how {isTie ? 'your superpowers work' : `${lead.identity.replace('The ', '')}s like you work`} in medicine, train all seven powers through missions,
            and earn badges and certificates as you grow.
          </p>
        </div>
        <div className={styles.enlistBtns}>
          <Link href={`/signup?superpower=${top[0].key}`} className="btn btn-crimson btn-lg">Enlist in the Academy</Link>
          <Link href="/inspiring-healers" className="btn btn-ghost btn-lg">See the Inspiring Healers Program</Link>
        </div>
      </div>

      <div className={styles.resultActions}>
        <button type="button" className="btn btn-gold" onClick={() => downloadCard(result)}>Download my superpower card</button>
        <button type="button" className="btn btn-ghost" onClick={restart}>Retake the assessment</button>
      </div>

      <p className={styles.fine}>
        Every Social Superpower is valuable, and every cadet can strengthen all seven. This is an educational
        self-reflection activity from the Inspiring Healers Program, not a psychological test, and it is never used to decide
        who can join. Your answers and results are saved only on this device.
      </p>
    </section>
  );
}
