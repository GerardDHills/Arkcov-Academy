'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/Icon';
import Scene from '@/components/classroom/Scene';
import { ArkcovCrest } from '@/components/BrandMark';
import { KIND } from '@/components/classroom/StepView';
import r from '@/components/classroom/room.module.css';
import s from './passport.module.css';

const day = (d) => new Date(d).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' });

export default function Passport({ searchParams }) {
  const [d, setD] = useState(null);
  const [err, setErr] = useState('');
  const user = searchParams?.user;

  useEffect(() => {
    fetch(`/api/classroom/passport${user ? `?user=${encodeURIComponent(user)}` : ''}`).then((x) => x.json())
      .then((v) => (v.error ? setErr(v.error) : setD(v))).catch(() => setErr('Could not open the passport.'));
  }, [user]);

  return (
    <Scene image="/classroom/rooms/orientation-hall.jpg" dim>
      <div className={r.wrap} style={{ padding: '100px 0 90px' }}>
        {err && <p className={r.error}>{err}</p>}
        {!d && !err && <p className={r.eyebrow}>Opening the passport…</p>}
        {d && (
          <>
            <section className={s.cover}>
              <div className={s.crest}><ArkcovCrest size={110} /></div>
              <div className={s.id}>
                <p className={r.eyebrow}>Arkcov Academy · Cadet Passport</p>
                <h1>{d.cadet.name}</h1>
                <dl>
                  <div><dt>Passport no.</dt><dd>{d.cadet.number}</dd></div>
                  <div><dt>Division</dt><dd>{d.cadet.division === 'senior' ? 'Senior Cadet' : d.cadet.division === 'junior' ? 'Junior Cadet' : 'Not set'}{d.cadet.grade ? ` · Grade ${d.cadet.grade}` : ''}</dd></div>
                  <div><dt>Issued</dt><dd>{day(d.cadet.since)}</dd></div>
                </dl>
              </div>
              <div className={s.stats}>
                <div><strong>{d.stats.lessons}</strong><span>Completed</span></div>
                <div><strong>{d.stats.cases}</strong><span>Cases & simulations</span></div>
                <div><strong>{d.stats.rooms}</strong><span>Rooms stamped</span></div>
                <div><strong>{d.stats.average ?? '—'}</strong><span>Average score</span></div>
              </div>
            </section>

            <div className={s.grid}>
              <div className={s.col}>
                <section className={r.glass}>
                  <div className={r.panelHead}><h2>Room stamps</h2><Icon name="compass" size={18} /></div>
                  {d.stamps.length === 0 ? <p className={s.empty}>Complete a lesson in any room to earn its stamp.</p> : (
                    <div className={s.stamps}>
                      {d.stamps.map((x, i) => (
                        <Link key={x.slug} href={`/classroom/${x.slug}`} className={s.stamp} style={{ '--rot': `${((i * 37) % 14) - 7}deg` }}>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={x.art} alt="" loading="lazy" />
                          <span><b>{x.room}</b><small>{day(x.first)}</small></span>
                        </Link>
                      ))}
                    </div>
                  )}
                </section>

                <section className={r.glass}>
                  <div className={r.panelHead}><h2>Journey</h2><Icon name="clock" size={18} /></div>
                  {d.timeline.length === 0 ? <p className={s.empty}>Your completed lessons and cases will appear here.</p> : (
                    <ol className={s.timeline}>
                      {d.timeline.map((t, i) => (
                        <li key={i}>
                          <span className={s.dot}><Icon name={KIND[t.kind]?.icon || 'book'} size={14} /></span>
                          <Link href={`/classroom/${t.slug}/${t.step}`}><b>{t.code ? `${t.code} · ` : ''}{t.title}</b><small>{t.room} · {day(t.at)}{t.track ? ` · ${t.track === 'senior' ? 'Senior' : 'Junior'} track` : ''}</small></Link>
                          {t.score != null && <em>{t.score}</em>}
                        </li>
                      ))}
                    </ol>
                  )}
                </section>
              </div>

              <div className={s.col}>
                <section className={r.glass}>
                  <div className={r.panelHead}><h2>Academy honors</h2><Icon name="award" size={18} /></div>
                  {d.honors.length === 0 ? <p className={s.empty}>Honors like Clinical Investigator are earned by completing signature lessons and cases.</p> : (
                    <div className={s.honors}>
                      {d.honors.map((h) => (
                        <div key={h.name} className={s.honor}><span className={s.medal}><Icon name="award" size={22} /></span><span><b>{h.name}</b><small>{h.from} · {day(h.earned)}</small></span></div>
                      ))}
                    </div>
                  )}
                </section>

                {d.certificates.length > 0 && (
                  <section className={r.glass}>
                    <div className={r.panelHead}><h2>Certificates</h2><Icon name="award" size={18} /></div>
                    <div className={s.honors}>
                      {d.certificates.map((c) => (
                        <Link key={c.code} href={`/certificates/${c.code}`} className={s.honor}><span className={s.medal}><Icon name="award" size={22} /></span><span><b>{c.title}</b><small>Score {c.score}{c.honors ? ` · ${c.honors}` : ''} · {day(c.issued_at)}</small></span></Link>
                      ))}
                    </div>
                  </section>
                )}

                <section className={r.glass}>
                  <div className={r.panelHead}><h2>Healer’s Journal</h2><Icon name="pen" size={18} /></div>
                  {d.journal.length === 0 ? <p className={s.empty}>Reflections you write at the end of lessons are kept here.</p> : (
                    <div className={s.journal}>
                      {d.journal.slice(0, 20).map((j, i) => (
                        <article key={i}><small>{j.title} · {day(j.at)}</small><p>{j.text}</p></article>
                      ))}
                    </div>
                  )}
                </section>
              </div>
            </div>
          </>
        )}
      </div>
    </Scene>
  );
}
