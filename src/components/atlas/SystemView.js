'use client';

import { useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { BLOOD, PARTS, topicBySlug } from '@/lib/atlas/blood';
import { useLevel, LevelToggle } from './useLevel';
import s from './atlas.module.css';

const Body3D = dynamic(() => import('./Body3D'), { ssr: false });

export default function SystemView() {
  const [level, setLevel] = useLevel();
  const [part, setPart] = useState(null);
  const [hot, setHot] = useState(null);
  const hotTopic = hot ? topicBySlug(hot) : null;
  const focus = part ? [part] : hotTopic ? hotTopic.parts : [];
  const picked = part ? PARTS[part] : null;
  const pickedTopic = picked ? topicBySlug(picked.topic) : null;

  return (
    <div className={s.page}>
      <div className={`${s.wrap} ${s.top}`}>
        <nav className={s.crumbs} aria-label="Breadcrumb"><Link href="/atlas">Atlas</Link><span>/</span><span>{BLOOD.name}</span></nav>
        <p className={s.eyebrow}>Arkcov Atlas</p>
        <h1 className={s.title}>Blood &amp; <em>Bone Marrow</em></h1>
        <p className={s.lede}>{BLOOD.tagline}</p>
        <LevelToggle level={level} setLevel={setLevel} />
        <p className={s.lede} style={{ marginTop: 16 }}>{BLOOD.intro[level]}</p>
      </div>

      <div className={s.wrap}>
        <div className={s.split}>
          <div>
            <Body3D src={BLOOD.model} parts={PARTS} focus={focus} onPick={(p) => setPart(p === part ? null : p)} height={540} />
            <div className={s.parts} role="group" aria-label="Structures">
              {Object.entries(PARTS).map(([k, v]) => (
                <button key={k} type="button" aria-pressed={part === k} onClick={() => setPart(part === k ? null : k)}>{v.label.split(':')[0]}</button>
              ))}
            </div>
            {picked && (
              <div className={`${s.glass} ${s.picked}`}>
                <b>{picked.label}</b>
                {pickedTopic && <> · Learn more in <Link href={`/atlas/blood/${pickedTopic.slug}`}>{pickedTopic.title}</Link></>}
              </div>
            )}
          </div>
          <div className={s.topics}>
            {BLOOD.topics.map((t, i) => (
              <Link key={t.slug} href={`/atlas/blood/${t.slug}`} className={`${s.topic} ${hot === t.slug ? s.topicHot : ''}`} onMouseEnter={() => { setHot(t.slug); setPart(null); }} onMouseLeave={() => setHot(null)} onFocus={() => setHot(t.slug)} onBlur={() => setHot(null)}>
                <div>
                  <small>{String(i + 1).padStart(2, '0')} · {t.kicker}</small>
                  <b>{t.title}</b>
                  <span>{t.summary}</span>
                </div>
                <span className={s.arrow} aria-hidden="true">→</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
