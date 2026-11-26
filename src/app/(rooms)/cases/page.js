'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/Icon';
import Scene from '@/components/classroom/Scene';
import r from '@/components/classroom/room.module.css';
import s from './cases.module.css';

// The Case Library: every patient case on campus, by body system.
export default function CaseLibrary() {
  const [data, setData] = useState(null);
  const [err, setErr] = useState('');
  const [filter, setFilter] = useState('all');
  const [q, setQ] = useState('');
  const [busy, setBusy] = useState(null);

  const load = () => fetch('/api/classroom/cases').then((x) => x.json()).then((d) => (d.error ? setErr(d.error) : setData(d))).catch(() => setErr('Could not load the Case Library.'));
  useEffect(() => { load(); }, []);

  const cases = data?.cases || [];
  const drafts = cases.filter((c) => c.reviewed === false).length;
  const shown = useMemo(() => {
    const t = q.trim().toLowerCase();
    return cases.filter((c) => {
      if (filter === 'emergency' && !c.emergency) return false;
      if (filter === 'drafts' && c.reviewed !== false) return false;
      if (filter === 'done' && !c.completed) return false;
      if (!['all', 'emergency', 'drafts', 'done'].includes(filter) && c.system !== filter) return false;
      if (!t) return true;
      return [c.title, c.summary, c.patient, c.concern, c.specialty, c.system, c.code].some((x) => x && x.toLowerCase().includes(t));
    });
  }, [cases, filter, q]);
  const systems = (data?.systems || []).filter((name) => cases.some((c) => c.system === name));

  const approve = async (c, value) => {
    setBusy(c.id);
    await fetch(`/api/classroom/build/step/${c.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ reviewed: value }) });
    setBusy(null);
    load();
  };

  return (
    <Scene image="/classroom/rooms/emergency-department.jpg" dim>
      <div className={`${r.wrap} ${r.top}`}>
        <p className={r.eyebrow}>Arkcov Teaching Hospital</p>
        <h1 className={r.title}>Case <em>Library</em></h1>
        <p className={r.lede}>Step into the clinic and the emergency department. Interview patients, examine them, build a mental model and a differential diagnosis, then test your thinking. Every case has a junior and a senior track.</p>
        {data && (
          <div className={s.stats}>
            <span><b>{cases.length}</b> cases</span>
            <span><b>{cases.filter((c) => c.emergency).length}</b> emergencies</span>
            <span><b>{cases.filter((c) => c.completed).length}</b> solved by you</span>
            {data.me.isStaff && drafts > 0 && <span className={s.draftStat}><b>{drafts}</b> awaiting faculty review</span>}
          </div>
        )}
      </div>

      <div className={r.wrap} style={{ paddingBottom: 96 }}>
        {err && <p className={r.error}>{err}</p>}
        {!data && !err && <div className={`${r.glass} ${s.loading}`}>Opening the hospital doors…</div>}

        {data && (
          <>
            <div className={s.toolbar}>
              <label className={s.search}>
                <Icon name="eye" size={16} />
                <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by condition, patient or symptom" aria-label="Search cases" />
              </label>
            </div>
            <div className={s.filters} role="group" aria-label="Filter cases">
              <button type="button" aria-pressed={filter === 'all'} onClick={() => setFilter('all')}>All</button>
              <button type="button" aria-pressed={filter === 'emergency'} onClick={() => setFilter('emergency')} className={s.emer}>Emergencies</button>
              {systems.filter((x) => x !== 'Emergency & Resuscitation').map((x) => <button key={x} type="button" aria-pressed={filter === x} onClick={() => setFilter(x)}>{x}</button>)}
              <button type="button" aria-pressed={filter === 'done'} onClick={() => setFilter('done')}>Solved</button>
              {data.me.isStaff && <button type="button" aria-pressed={filter === 'drafts'} onClick={() => setFilter('drafts')}>Drafts ({drafts})</button>}
            </div>

            {shown.length === 0 && <div className={`${r.glass} ${s.loading}`}>{cases.length ? 'No cases match.' : 'Cases are being prepared. Check back soon.'}</div>}

            <div className={s.grid}>
              {shown.map((c) => (
                <article key={c.id} className={`${s.card} ${c.reviewed === false ? s.isDraft : ''}`}>
                  <Link href={`/classroom/${c.room_slug}/${c.id}`} className={s.cardLink}>
                    <span className={s.art}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      {c.image && <img src={c.image} alt="" loading="lazy" />}
                      <span className={s.tags}>
                        {c.emergency && <span className={`${s.tag} ${s.tagEmer}`}><Icon name="bolt" size={12} /> Emergency</span>}
                        {c.reviewed === false && <span className={`${s.tag} ${s.tagDraft}`}>Draft</span>}
                        {c.completed && <span className={`${s.tag} ${s.tagDone}`}><Icon name="check" size={12} /> {c.score != null ? `${c.score}%` : 'Solved'}</span>}
                      </span>
                    </span>
                    <span className={s.body}>
                      <small>{c.code} · {c.system || c.specialty}</small>
                      <b>{c.title}</b>
                      <span className={s.pt}>{c.patient}{c.age ? `, ${c.age}` : ''} · {c.concern}</span>
                      <span className={s.sum}>{c.summary}</span>
                      <span className={s.meta}><Icon name="clock" size={13} /> {c.minutes} min · {c.room}</span>
                    </span>
                  </Link>
                  {data.me.canBuild && (
                    <div className={s.faculty}>
                      <button type="button" className={`${r.small} ${c.reviewed === false ? r.btn : r.btnGhost}`} disabled={busy === c.id} onClick={() => approve(c, c.reviewed === false)}>
                        {c.reviewed === false ? 'Approve for cadets' : 'Return to draft'}
                      </button>
                      <Link href={`/teach/build/${c.room_slug}`} className={`${r.small} ${r.btnGhost}`}><Icon name="pen" size={14} /> Edit</Link>
                    </div>
                  )}
                </article>
              ))}
            </div>
          </>
        )}
      </div>
    </Scene>
  );
}
