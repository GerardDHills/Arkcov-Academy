'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/Icon';
import Scene from '@/components/classroom/Scene';
import r from '@/components/classroom/room.module.css';
import s from './teach.module.css';

const fmt = (d) => new Date(d).toLocaleString([], { weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' });
const ROLES = [['professor', 'Professor'], ['advisor', 'Advisor'], ['tutor', 'Tutor']];

function inAnHour() {
  const d = new Date(Date.now() + 60 * 60 * 1000);
  d.setMinutes(0, 0, 0);
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:00`;
}

export default function FacultyHall() {
  const [me, setMe] = useState(null);
  const [live, setLive] = useState(null);
  const [roster, setRoster] = useState([]);
  const [rooms, setRooms] = useState(null);
  const [form, setForm] = useState({ programId: '', title: '', startsAt: inAnHour(), minutes: 60 });
  const [apply, setApply] = useState({ staff_role: 'professor', staff_type: 'volunteer', staff_title: '' });
  const [msg, setMsg] = useState('');

  const load = useCallback(async () => {
    const m = await fetch('/api/classroom/me').then((x) => x.json());
    setMe(m.me || null);
    const l = await fetch('/api/live').then((x) => x.json());
    setLive(l);
    if (l.programs?.[0]) setForm((f) => ({ ...f, programId: f.programId || l.programs[0].id }));
    if (l.me?.isStaff) {
      setRoster((await fetch('/api/classroom/roster').then((x) => x.json())).roster || []);
      const pr = await fetch('/api/classroom/programs').then((x) => x.json());
      if (pr.me?.canBuild) setRooms(pr);
    }
  }, []);
  useEffect(() => { load(); }, [load]);

  const schedule = async (e) => {
    e.preventDefault(); setMsg('');
    const res = await fetch('/api/live', { method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, startsAt: new Date(form.startsAt).toISOString() }) });
    const v = await res.json();
    if (!res.ok) setMsg(v.error); else { setMsg('Session scheduled.'); setForm((f) => ({ ...f, title: '' })); load(); }
  };
  const sendApply = async (e) => {
    e.preventDefault(); setMsg('');
    const res = await fetch('/api/classroom/staff-apply', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(apply) });
    const v = await res.json();
    if (!res.ok) setMsg(v.error); else load();
  };

  const isStaff = live?.me?.isStaff;
  const sessions = live?.sessions || [];

  return (
    <Scene image="/classroom/healers-mentor.jpg" dim>
      <div className={`${r.wrap} ${r.top}`}>
        <p className={r.eyebrow}>Faculty Hall</p>
        <h1 className={r.title}>Teach, mentor, <em>inspire</em></h1>
        <p className={r.lede}>Professors, advisors and tutors run live classes, launch simulations and evaluations in session, and meet one-on-one with cadets during class breakouts.</p>
      </div>

      <div className={r.wrap} style={{ paddingBottom: 90 }}>
        {!live && <p className={r.eyebrow}>Opening the hall…</p>}

        {live && !isStaff && (
          <div className={r.glass} style={{ maxWidth: 620 }}>
            <div className={r.panelHead}><h2>Join the faculty</h2><Icon name="cap" size={18} /></div>
            <div className={r.panelBody}>
              {me?.staff_status === 'pending' ? (
                <div className={r.notice}><Icon name="clock" size={18} /><div>Your request to join as a {me.staff_role} is with the Dean. You’ll be able to teach once it’s approved.</div></div>
              ) : me?.staff_status === 'suspended' ? (
                <div className={r.notice}><Icon name="lock" size={18} /><div>Your faculty access is paused. Contact the Dean.</div></div>
              ) : (
                <form onSubmit={sendApply} style={{ display: 'grid', gap: 12 }}>
                  <p className={r.muted} style={{ margin: 0, lineHeight: 1.6 }}>Faculty work with minors, so every professor, advisor and tutor is approved by the Dean before they can meet cadets.</p>
                  <label className={r.field}><span>Role</span>
                    <select value={apply.staff_role} onChange={(e) => setApply({ ...apply, staff_role: e.target.value })}>{ROLES.map(([v, l]) => <option key={v} value={v}>{l}</option>)}</select>
                  </label>
                  <label className={r.field}><span>Position</span>
                    <select value={apply.staff_type} onChange={(e) => setApply({ ...apply, staff_type: e.target.value })}><option value="volunteer">Volunteer</option><option value="hired">Hired</option></select>
                  </label>
                  <label className={r.field}><span>Title shown to cadets (optional)</span><input value={apply.staff_title} onChange={(e) => setApply({ ...apply, staff_title: e.target.value })} placeholder="e.g., Pediatric nurse, Biology tutor" /></label>
                  <button className={r.btn} type="submit">Request faculty access</button>
                  {msg && <p className={r.error}>{msg}</p>}
                </form>
              )}
            </div>
          </div>
        )}

        {isStaff && (
          <div className={s.grid}>
            <div className={s.col}>
              <div className={r.glass}>
                <div className={r.panelHead}><h2>Sessions</h2><Icon name="calendar" size={18} /></div>
                <div className={r.panelBody} style={{ display: 'grid', gap: 10 }}>
                  {sessions.length === 0 && <p className={r.muted} style={{ margin: 0 }}>No sessions yet. Schedule your first one.</p>}
                  {sessions.map((x) => (
                    <div key={x.id} className={s.row}>
                      <div>
                        {x.status === 'live' ? <span className={`${r.tag} ${r.live}`}>Live</span> : x.status === 'ended' ? <span className={r.tag}>Ended</span> : <span className={r.tag}>{fmt(x.starts_at)}</span>}
                        <b>{x.title}</b>
                        <small>{x.program_title} · {x.host_name} ({x.host_label}) · {x.minutes} min</small>
                      </div>
                      {x.status !== 'ended' && (
                        <span style={{ display: 'flex', gap: 6 }}>
                          <Link href={`/live/${x.id}?demo=1`} className={`${r.btnGhost} ${r.small}`}>Preview</Link>
                          <Link href={`/live/${x.id}`} className={`${x.status === 'live' ? r.btn : r.btnGhost} ${r.small}`}>{x.status === 'live' ? 'Enter' : 'Open room'}</Link>
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {rooms && (
                <div className={r.glass}>
                  <div className={r.panelHead}><h2>Lesson Builder</h2><Icon name="pen" size={18} /></div>
                  <div className={s.buildGrid}>
                    {rooms.buildings.map((b) => {
                      const list = rooms.programs.filter((p) => p.building_slug === b.slug);
                      if (!list.length) return null;
                      return (
                        <div key={b.slug} className={s.buildGroup}>
                          <h3>{b.name}</h3>
                          {list.map((p) => (
                            <Link key={p.id} href={`/teach/build/${p.slug}`} className={s.buildRow}>
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img src={p.art} alt="" loading="lazy" />
                              <span><b>{p.room}</b><small>{p.step_count ? `${p.step_count} lessons` : 'Empty, ready to build'}</small></span>
                              <Icon name="arrow" size={15} />
                            </Link>
                          ))}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              <div className={r.glass}>
                <div className={r.panelHead}><h2>Cadets</h2><Icon name="users" size={18} /></div>
                <div className={s.table}>
                  <div className={s.th}><span>Cadet</span><span>Program</span><span>Progress</span><span>Score</span><span>Certificate</span></div>
                  {roster.length === 0 && <p className={r.muted} style={{ padding: '12px 22px' }}>No cadets enrolled yet.</p>}
                  {roster.map((c, i) => (
                    <div key={i} className={s.tr}>
                      <span><b>{c.name}</b>{!c.has_guardian && <small>No guardian on file</small>}</span>
                      <span>{c.program_title}</span>
                      <span><span className={s.bar}><i style={{ width: `${c.total ? (c.done / c.total) * 100 : 0}%` }} /></span>{c.done}/{c.total}</span>
                      <span>{c.score ?? '—'}</span>
                      <span>{c.cert_code ? <Link href={`/certificates/${c.cert_code}`} className={s.link}>View</Link> : '—'}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className={s.col}>
              <div className={r.glass}>
                <div className={r.panelHead}><h2>Schedule a live class</h2><Icon name="video" size={18} /></div>
                <form className={r.panelBody} onSubmit={schedule} style={{ display: 'grid', gap: 12 }}>
                  <label className={r.field}><span>Program</span>
                    <select value={form.programId} onChange={(e) => setForm({ ...form, programId: e.target.value })}>{(live.programs || []).map((p) => <option key={p.id} value={p.id}>{p.title}</option>)}</select>
                  </label>
                  <label className={r.field}><span>Session title</span><input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Unit C: The Brain and the Body" /></label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 110px', gap: 10 }}>
                    <label className={r.field}><span>Starts</span><input type="datetime-local" required value={form.startsAt} onChange={(e) => setForm({ ...form, startsAt: e.target.value })} /></label>
                    <label className={r.field}><span>Minutes</span><input type="number" min="15" max="240" step="15" value={form.minutes} onChange={(e) => setForm({ ...form, minutes: e.target.value })} /></label>
                  </div>
                  <button className={r.btn} type="submit">Schedule session</button>
                  {msg && <p className={r.muted} role="status" style={{ margin: 0 }}>{msg}</p>}
                </form>
              </div>

              <div className={r.glass}>
                <div className={r.panelHead}><h2>Safeguards</h2><Icon name="shield" size={18} /></div>
                <ul className={s.rules}>
                  <li>One-on-ones open only during breakout time in a live class.</li>
                  <li>Every one-on-one is recorded.</li>
                  <li>The cadet’s parent or guardian is emailed a link to join.</li>
                  <li>All chat is saved and visible to the Dean. There are no private messages.</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </Scene>
  );
}
