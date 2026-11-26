'use client';

import { useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { BLOOD, PARTS, THREAD, READING, topicBySlug } from '@/lib/atlas/blood';
import { useLevel, LevelToggle, useCaseIndex } from './useLevel';
import BloodSmear from './BloodSmear';
import Pathway from './Pathway';
import OxygenCurve from './OxygenCurve';
import s from './atlas.module.css';

const Body3D = dynamic(() => import('./Body3D'), { ssr: false });

const LAYERS = [
  ['anatomy', 'Anatomy', 'Where it is'],
  ['physiology', 'Physiology', 'How it works'],
  ['histology', 'Histology', 'Under the microscope'],
  ['pathology', 'Pathology', 'What breaks'],
  ['clinical', 'Clinical', 'What healers see'],
];

function Quiz({ items }) {
  const [ans, setAns] = useState({});
  return (
    <div className={s.quiz}>
      {items.map((q, i) => {
        const a = ans[i];
        return (
          <div key={i} className={s.q}>
            <b>{i + 1}. {q.q}</b>
            <div className={s.opts}>
              {q.options.map((o, j) => (
                <button key={j} type="button" disabled={a !== undefined} onClick={() => setAns({ ...ans, [i]: j })}
                  className={a === undefined ? '' : j === q.answer ? s.right : j === a ? s.wrong : ''}>{o}</button>
              ))}
            </div>
            {a !== undefined && <p className={s.why}>{a === q.answer ? 'Correct. ' : 'Not quite. '}{q.why}</p>}
          </div>
        );
      })}
    </div>
  );
}

export default function TopicView({ slug }) {
  const t = topicBySlug(slug);
  const [level, setLevel] = useLevel();
  const [smear, setSmear] = useState(t.smear?.presets?.[0] || 'normal');
  const cases = useCaseIndex();
  const idx = BLOOD.topics.findIndex((x) => x.slug === slug);
  const prev = BLOOD.topics[idx - 1];
  const next = BLOOD.topics[idx + 1];
  const presets = t.smear?.presets || ['normal'];
  const showSmear = (p) => {
    if (!presets.includes(p)) return;
    setSmear(p);
    document.getElementById('histology')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className={s.page}>
      <div className={`${s.wrap} ${s.top}`}>
        <nav className={s.crumbs} aria-label="Breadcrumb"><Link href="/atlas">Atlas</Link><span>/</span><Link href="/atlas/blood">{BLOOD.name}</Link><span>/</span><span>{t.title}</span></nav>
        <p className={s.eyebrow}>{t.kicker}</p>
        <h1 className={s.title}>{t.title}</h1>
        <p className={s.lede}>{t.summary}</p>
        <LevelToggle level={level} setLevel={setLevel} />
      </div>

      <div className={s.wrap}>
        <nav className={s.layerNav} aria-label="Layers">
          {LAYERS.map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}
          <a href="#check">Quick check</a>
        </nav>

        <section id="anatomy" className={`${s.glass} ${s.layer}`}>
          <div className={s.layerHead}><span className={s.layerNum}>1</span><div><h2>Anatomy</h2><span>Where it is</span></div></div>
          <p>{t.layers.anatomy[level]}</p>
          <div className={s.widget}>
            <Body3D src={BLOOD.model} parts={PARTS} focus={t.parts} height={420} />
            <p className={s.fine}>Highlighted: {t.parts.map((p) => PARTS[p].label).join('; ')}.</p>
          </div>
        </section>

        <section id="physiology" className={`${s.glass} ${s.layer}`}>
          <div className={s.layerHead}><span className={s.layerNum}>2</span><div><h2>Physiology</h2><span>How it works</span></div></div>
          <p>{t.layers.physiology[level]}</p>
          {t.widget && (
            <div className={s.widget}>
              {t.widget.intro && <p className={s.widgetIntro}>{t.widget.intro}</p>}
              {t.widget.type === 'pathway' && <Pathway pathway={t.widget.pathway} />}
              {t.widget.type === 'o2' && <OxygenCurve level={level} />}
            </div>
          )}
        </section>

        <section id="histology" className={`${s.glass} ${s.layer}`}>
          <div className={s.layerHead}><span className={s.layerNum}>3</span><div><h2>Histology</h2><span>Under the microscope</span></div></div>
          <p>{t.layers.histology[level]}</p>
          <div className={s.widget}><BloodSmear key={smear} presets={presets} initial={smear} /></div>
        </section>

        <section id="pathology" className={`${s.glass} ${s.layer}`}>
          <div className={s.layerHead}><span className={s.layerNum}>4</span><div><h2>Pathology</h2><span>Follow the mechanism from cause to symptom</span></div></div>
          <div className={s.threads}>
            {t.pathology.map((p) => {
              const linked = (p.cases || []).filter((c) => cases[c]);
              return (
                <article key={p.name} className={s.thread}>
                  <h3>{p.name}</h3>
                  <p>{p.plain}</p>
                  <ol className={s.chain}>
                    {p.chain.map((step, i) => <li key={i}><small>{THREAD[i]}</small>{step}</li>)}
                  </ol>
                  {(linked.length > 0 || (p.smear && presets.includes(p.smear))) && (
                    <div className={s.threadFoot}>
                      {p.smear && presets.includes(p.smear) && <button type="button" className={s.smearBtn} onClick={() => showSmear(p.smear)}>See the smear</button>}
                      {linked.map((c) => <Link key={c} href={cases[c].href} className={s.caseLink}>Case: {cases[c].title}</Link>)}
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </section>

        <section id="clinical" className={`${s.glass} ${s.layer}`}>
          <div className={s.layerHead}><span className={s.layerNum}>5</span><div><h2>Clinical</h2><span>What healers see</span></div></div>
          <p>{t.layers.clinical[level]}</p>
          <div className={s.twoCol}>
            <div><p className={s.sub}>Signs and symptoms</p><ul className={s.list}>{t.signs.map((x) => <li key={x}>{x}</li>)}</ul></div>
            <div>
              <p className={s.sub}>Key tests</p>
              <table className={s.labs}><tbody>{t.labs.map(([a, b]) => <tr key={a}><th>{a}</th><td>{b}</td></tr>)}</tbody></table>
            </div>
          </div>
          {t.connections?.length > 0 && (
            <div style={{ marginTop: 16 }}>
              <p className={s.sub}>Connects to</p>
              <div className={s.connect}>
                {t.connections.map((c) => { const x = topicBySlug(c); return x ? <Link key={c} href={`/atlas/blood/${c}`}>{x.title}</Link> : null; })}
              </div>
            </div>
          )}
        </section>

        <section id="check" className={`${s.glass} ${s.layer}`}>
          <div className={s.layerHead}><span className={s.layerNum}>✓</span><div><h2>Quick check</h2><span>Test your mental model</span></div></div>
          <Quiz key={slug} items={t.quiz} />
        </section>

        <section className={`${s.glass} ${s.layer}`}>
          <p className={s.sub}>Go deeper</p>
          <div className={s.sources}>
            {READING.map((r) => <div key={r.url}><a href={r.url} target="_blank" rel="noopener noreferrer">{r.title}</a> <span>{r.note}</span></div>)}
          </div>
          <p className={s.fine}>Written by Arkcov Academy for teaching. Lab ranges and thresholds are simplified; follow your institution’s references in clinical care.</p>
        </section>

        <div className={s.pager}>
          {prev ? <Link href={`/atlas/blood/${prev.slug}`}><small>← Previous</small>{prev.title}</Link> : <Link href="/atlas/blood"><small>← Back</small>{BLOOD.name}</Link>}
          {next ? <Link href={`/atlas/blood/${next.slug}`}><small>Next →</small>{next.title}</Link> : <Link href="/atlas/blood"><small>Back to</small>{BLOOD.name}</Link>}
        </div>
      </div>
    </div>
  );
}
