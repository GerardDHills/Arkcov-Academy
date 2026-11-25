'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/Icon';
import Scene from '@/components/classroom/Scene';
import { KIND } from '@/components/classroom/StepView';
import GamingHall from '@/components/classroom/GamingHall';
import r from '@/components/classroom/room.module.css';
import s from './studio.module.css';

const SPACES = [
  { img: '/classroom/healers-studio.jpg', name: 'Lecture Theater', text: 'Live classes and films on the great display wall.' },
  { img: '/classroom/healers-simbay.jpg', name: 'Simulation Bay', text: 'Patient cases you work through in real time.' },
  { img: '/classroom/healers-mentor.jpg', name: 'Mentoring Alcove', text: 'One-on-one help during class breakouts: always recorded, always open to parents.' },
];

const fmt = (d) => new Date(d).toLocaleString([], { weekday: 'long', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' });

export default function Studio({ params }) {
  const [d, setD] = useState(null);
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);
  const [g, setG] = useState({ guardian_name: '', guardian_email: '' });
  const [gMsg, setGMsg] = useState('');

  const load = useCallback(() => {
    fetch(`/api/classroom/programs/${params.slug}`).then((x) => x.json()).then((v) => (v.error ? setErr(v.error) : setD(v))).catch(() => setErr('Could not open the studio.'));
  }, [params.slug]);
  useEffect(() => { load(); }, [load]);

  const enroll = async () => {
    setBusy(true);
    await fetch(`/api/classroom/programs/${params.slug}`, { method: 'POST' });
    setBusy(false); load();
  };
  const saveGuardian = async (e) => {
    e.preventDefault(); setGMsg('');
    const res = await fetch('/api/classroom/me', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(g) });
    const v = await res.json();
    if (!res.ok) setGMsg(v.error); else { setGMsg('Saved.'); load(); }
  };

  if (err) return <Scene image="/classroom/healers-studio.jpg" dim><div className={`${r.wrap} ${r.top}`}><p className={r.error}>{err}</p></div></Scene>;
  if (!d) return <Scene image="/classroom/healers-studio.jpg"><div className={`${r.wrap} ${r.top}`}><p className={r.eyebrow}>Opening the studio…</p></div></Scene>;

  const { program, steps, progress, sessions, certificate, faculty, me, neighbors = [] } = d;
  const art = program.art || '/classroom/healers-studio.jpg';
  const isHealers = program.slug === 'inspiring-healers';
  const words = (isHealers ? 'Inspiring Healers' : program.room).split(' ');
  const empty = steps.length === 0;
  const units = [];
  steps.forEach((st) => {
    let u = units.find((x) => x.name === st.unit);
    if (!u) { u = { name: st.unit, steps: [] }; units.push(u); }
    u.steps.push(st);
  });
  const nextStep = steps.find((x) => !x.done) || steps[0];
  const live = sessions.find((x) => x.status === 'live');
  const pct = progress.total ? Math.round((progress.done / progress.total) * 100) : 0;

  return (
    <Scene image={art}>
      <section className={`${r.wrap} ${s.hero}`}>
        <p className={r.eyebrow}>{program.building} · {isHealers ? program.room : program.kind || 'Room'}</p>
        <h1 className={r.title}>{words.length > 1 ? <>{words.slice(0, -1).join(' ')} <em>{words[words.length - 1]}</em></> : <em>{words[0]}</em>}</h1>
        <p className={r.lede}>{program.description}</p>
        <div className={s.heroActions}>
          {live && <Link href={`/live/${live.id}`} className={r.btn}><span className={`${r.tag} ${r.live}`} style={{ padding: '2px 8px' }}>Live</span> Join the live class</Link>}
          {empty ? null : d.enrolled ? (
            nextStep && <Link href={`/classroom/${program.slug}/${nextStep.id}`} className={live ? r.btnGhost : r.btn}>{progress.done ? 'Continue the path' : 'Begin the path'} <Icon name="arrow" size={17} /></Link>
          ) : (
            <button type="button" className={live ? r.btnGhost : r.btn} onClick={enroll} disabled={busy}>Enroll in the program <Icon name="arrow" size={17} /></button>
          )}
          {me.canBuild && <Link href={`/teach/build/${program.slug}`} className={empty ? r.btn : r.btnGhost}><Icon name="pen" size={17} /> {empty ? 'Build this room’s curriculum' : 'Lesson Builder'}</Link>}
          {me.isStaff && !me.canBuild && <Link href="/teach" className={r.btnGhost}><Icon name="cap" size={17} /> Faculty Hall</Link>}
        </div>
        {!empty && <div className={s.stats}>
          <div><strong>{progress.done}<small>/{progress.total}</small></strong><span>Lessons complete</span></div>
          <div><strong>{progress.score ?? '—'}</strong><span>Performance score</span></div>
          <div><strong>{units.length}</strong><span>Units</span></div>
          <div className={s.ring} style={{ '--p': pct }}><svg viewBox="0 0 36 36"><circle cx="18" cy="18" r="15.9" /><circle cx="18" cy="18" r="15.9" className={s.ringFill} /></svg><b>{pct}%</b></div>
        </div>}
      </section>

      <section className={`${r.wrap} ${s.body}`}>
        <div className={s.main}>
          {program.slug === 'gaming-hall' && <GamingHall />}
          {!(program.slug === 'gaming-hall' && empty) && <div className={r.glass}>
            <div className={r.panelHead}><h2>The path</h2><span className={r.muted} style={{ fontSize: 13 }}>Self-paced between live classes</span></div>
            {empty && (
              <div className={s.emptyPath}>
                <Icon name="sparkle" size={28} />
                <b>Curriculum is being written for this room</b>
                <span>{me.canBuild ? 'Add films, readings, activities, evaluations and simulations in the Lesson Builder. They appear here in the order you set.' : 'Lessons, live classes and activities will open here soon.'}</span>
                {me.canBuild && <Link href={`/teach/build/${program.slug}`} className={`${r.btn} ${r.small}`}>Open the Lesson Builder</Link>}
              </div>
            )}
            <div className={s.units}>
              {units.map((u, ui) => (
                <div key={u.name} className={s.unit} style={{ animationDelay: `${ui * 90}ms` }}>
                  <h3>{u.name}</h3>
                  <ol>
                    {u.steps.map((st) => (
                      <li key={st.id}>
                        <Link href={`/classroom/${program.slug}/${st.id}`} className={`${s.step} ${st.done ? s.stepDone : ''}`}>
                          <span className={s.stepIcon}><Icon name={st.done ? 'check' : KIND[st.kind]?.icon} size={18} /></span>
                          <span className={s.stepText}><small>{KIND[st.kind]?.label} · {st.minutes} min</small><b>{st.title}</b></span>
                          {st.score != null && <span className={s.stepScore}>{st.score}</span>}
                          <Icon name="arrow" size={16} />
                        </Link>
                      </li>
                    ))}
                  </ol>
                </div>
              ))}
            </div>
          </div>}

          {isHealers && (
            <>
              <h2 className={s.h2}>Inside the studio</h2>
              <div className={s.spaces}>
                {SPACES.map((sp) => (
                  <figure key={sp.name} className={s.space}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={sp.img} alt="" loading="lazy" />
                    <figcaption><b>{sp.name}</b><span>{sp.text}</span></figcaption>
                  </figure>
                ))}
              </div>
            </>
          )}
          {neighbors.length > 0 && (
            <>
              <h2 className={s.h2}>More in the {program.building}</h2>
              <div className={s.spaces}>
                {neighbors.map((n) => (
                  <Link key={n.slug} href={`/classroom/${n.slug}`} className={s.space}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={n.art || '/classroom/healers-studio.jpg'} alt="" loading="lazy" />
                    <span className={s.cap}><b>{n.room}</b><span>{n.step_count ? `${n.step_count} lessons` : 'Curriculum in development'}</span></span>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>

        <aside className={s.side}>
          {empty ? null : certificate ? (
            <div className={`${r.glass} ${s.cert}`}>
              <Icon name="award" size={30} />
              <p className={r.eyebrow}>Certificate of Performance</p>
              <strong>{certificate.score}{certificate.honors ? ` · ${certificate.honors}` : ''}</strong>
              <Link href={`/certificates/${certificate.code}`} className={r.btn}>View certificate</Link>
            </div>
          ) : (
            <div className={r.glass}>
              <div className={r.panelHead}><h3>Certificate</h3><Icon name="award" size={18} /></div>
              <div className={r.panelBody}><p className={r.muted} style={{ margin: 0, lineHeight: 1.6 }}>Complete every lesson with a performance score of {program.pass_score} or higher to earn your Certificate of Performance.</p></div>
            </div>
          )}

          <div className={r.glass}>
            <div className={r.panelHead}><h3>Live classes</h3><Icon name="calendar" size={18} /></div>
            <div className={r.panelBody} style={{ display: 'grid', gap: 12 }}>
              {sessions.length === 0 && <p className={r.muted} style={{ margin: 0 }}>No live classes scheduled yet.</p>}
              {sessions.map((x) => (
                <div key={x.id} className={s.session}>
                  <div>
                    {x.status === 'live' ? <span className={`${r.tag} ${r.live}`}>Live now</span> : x.status === 'ended' ? <span className={r.tag}>Ended</span> : <span className={r.tag}>{fmt(x.starts_at)}</span>}
                    <b>{x.title}</b>
                    <small>{x.host_name} · {x.host_label}</small>
                  </div>
                  {x.status !== 'ended' && <Link href={`/live/${x.id}`} className={`${r.btnGhost} ${r.small}`}>{x.status === 'live' ? 'Join' : 'Open'}</Link>}
                </div>
              ))}
            </div>
          </div>

          {!me.isStaff && (
            <div className={r.glass}>
              <div className={r.panelHead}><h3>Parent or guardian</h3><Icon name="shield" size={18} /></div>
              <div className={r.panelBody}>
                {me.hasGuardian ? (
                  <p className={r.muted} style={{ margin: 0, lineHeight: 1.6 }}>On file. Your parent or guardian is emailed whenever you join a one-on-one, with a link to join it.</p>
                ) : (
                  <form onSubmit={saveGuardian} style={{ display: 'grid', gap: 10 }}>
                    <p className={r.muted} style={{ margin: 0, lineHeight: 1.55, fontSize: 14 }}>Add a parent or guardian to unlock one-on-one help with your faculty during live classes.</p>
                    <label className={r.field}><span>Name</span><input value={g.guardian_name} onChange={(e) => setG({ ...g, guardian_name: e.target.value })} /></label>
                    <label className={r.field}><span>Email</span><input type="email" required value={g.guardian_email} onChange={(e) => setG({ ...g, guardian_email: e.target.value })} /></label>
                    <button className={`${r.btn} ${r.small}`} type="submit">Save</button>
                    {gMsg && <p className={r.muted} role="status" style={{ margin: 0 }}>{gMsg}</p>}
                  </form>
                )}
              </div>
            </div>
          )}

          {faculty.length > 0 && (
            <div className={r.glass}>
              <div className={r.panelHead}><h3>Faculty</h3><Icon name="users" size={18} /></div>
              <ul className={s.faculty}>
                {faculty.map((f, i) => (
                  <li key={i}><span className={s.avatar}>{f.name.split(' ').map((w) => w[0]).slice(0, 2).join('')}</span><span><b>{f.name}</b><small>{f.title || f.label}</small></span></li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      </section>
    </Scene>
  );
}
