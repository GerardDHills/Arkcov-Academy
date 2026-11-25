'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/Icon';
import Scene from '@/components/classroom/Scene';
import StepView, { KIND } from '@/components/classroom/StepView';
import VideoStage from '@/components/classroom/VideoStage';
import r from '@/components/classroom/room.module.css';
import s from './live.module.css';

const POLL_MS = 3000;

export default function LiveRoom({ params, searchParams }) {
  const demo = searchParams?.demo === '1';
  const id = params.id;
  const [d, setD] = useState(null);
  const [err, setErr] = useState('');
  const [msgs, setMsgs] = useState([]);
  const [tab, setTab] = useState('chat');
  const [text, setText] = useState('');
  const [note, setNote] = useState('');
  const lastId = useRef(0);
  const chatEnd = useRef(null);

  const poll = useCallback(async () => {
    try {
      const res = await fetch(`/api/live/${id}?since=${lastId.current}`, { cache: 'no-store' });
      const v = await res.json();
      if (!res.ok) { setErr(v.error || 'Could not load the session.'); return; }
      setD(v);
      if (v.messages.length) {
        lastId.current = Math.max(lastId.current, ...v.messages.map((x) => x.id));
        setMsgs((m) => {
          const seen = new Set(m.map((x) => x.id));
          return [...m, ...v.messages.filter((x) => !seen.has(x.id))].slice(-200);
        });
      }
    } catch { /* keep trying */ }
  }, [id]);

  useEffect(() => {
    poll();
    const t = setInterval(poll, POLL_MS);
    return () => clearInterval(t);
  }, [poll]);
  // Scroll only the chat list, never the page.
  useEffect(() => { const ol = chatEnd.current?.parentElement; if (ol) ol.scrollTop = ol.scrollHeight; }, [msgs.length]);

  // Reset chat when moving between the class and a breakout.
  const channel = d?.myBreakout?.id || 0;
  useEffect(() => { setMsgs([]); lastId.current = 0; poll(); }, [channel]); // eslint-disable-line react-hooks/exhaustive-deps

  const act = async (body) => {
    setNote('');
    const res = await fetch(`/api/live/${id}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    const v = await res.json().catch(() => ({}));
    if (!res.ok) setNote(v.error || 'That did not work.');
    else if (body.action === 'open_breakout') setNote(v.guardianEmailed ? 'One-on-one opened. The guardian was emailed a link to join.' : 'One-on-one opened. The guardian notice is saved in Faculty & Safety (email sending is not connected yet).');
    poll();
    return v;
  };

  const send = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    const body = text; setText('');
    await act({ action: 'message', body, breakoutId: d?.myBreakout?.id });
  };

  if (err) return <Scene image="/classroom/healers-studio.jpg" dim><div className={`${r.wrap} ${r.top}`}><p className={r.error}>{err}</p><Link href="/classroom" className={r.btnGhost}>Back to classrooms</Link></div></Scene>;
  if (!d) return <Scene image="/classroom/healers-studio.jpg"><div className={`${r.wrap} ${r.top}`}><p className={r.eyebrow}>Entering the lecture theater…</p></div></Scene>;

  const { session, active, people, myBreakout, breakouts, results, steps, me } = d;
  const isLive = session.status === 'live';
  const ended = session.status === 'ended';
  const here = people.filter((p) => p.here);
  const inBreakout = Boolean(myBreakout);
  const base = session.art || '/classroom/healers-studio.jpg';
  const art = inBreakout ? '/classroom/healers-mentor.jpg' : active?.step?.kind === 'simulation' ? '/classroom/healers-simbay.jpg' : base;

  return (
    <Scene image={art} dim arches={false} motes={10}>
      <div className={s.shell}>
        <header className={s.bar}>
          <div className={s.barTitle}>
            <Link href={`/classroom/${session.slug}`} className={s.back} aria-label="Back to the studio"><Icon name="door" size={18} /></Link>
            <div>
              <small>{session.program_title} · {session.room}</small>
              <h1>{session.title}</h1>
            </div>
          </div>
          <div className={s.barRight}>
            {isLive ? <span className={`${r.tag} ${r.live}`}>Live</span> : ended ? <span className={r.tag}>Ended</span> : <span className={r.tag}>Starts {new Date(session.starts_at).toLocaleString([], { weekday: 'short', hour: 'numeric', minute: '2-digit' })}</span>}
            <span className={r.tag}><Icon name="users" size={13} /> {here.length} here</span>
            {me.isStaff && !isLive && !ended && <button className={`${r.btn} ${r.small}`} onClick={() => act({ action: 'start' })}>Start the session</button>}
            {me.isStaff && isLive && <button className={`${r.btnDanger} ${r.small}`} onClick={() => confirm('End the session for everyone? All breakouts close.') && act({ action: 'end' })}>End session</button>}
          </div>
        </header>

        {note && <div className={r.notice} style={{ margin: '0 0 12px' }} role="status"><Icon name="shield" size={18} /><div>{note}</div></div>}

        {inBreakout && (
          <div className={s.breakoutBanner} role="status">
            <Icon name="record" size={14} />
            <div><b>One-on-one with {me.id === myBreakout.staff_id ? myBreakout.cadet_name : myBreakout.staff_name}</b>
              <span>Recorded. {me.id === myBreakout.staff_id ? 'The cadet’s parent or guardian has a link to join.' : 'Your parent or guardian was notified and can join.'} The class continues in the main room.</span></div>
            {me.id === myBreakout.staff_id && <button className={`${r.btnGhost} ${r.small}`} onClick={() => act({ action: 'close_breakout', breakoutId: myBreakout.id })}>Return to class</button>}
          </div>
        )}

        <div className={s.grid}>
          <section className={s.stage}>
            {ended ? (
              <div className={`${r.glass} ${s.idle}`}><Icon name="award" size={34} /><h2>This session has ended</h2><p className={r.muted}>Keep going on the path in the studio. Your work from today is saved.</p><Link href={`/classroom/${session.slug}`} className={r.btn}>Back to the studio</Link></div>
            ) : (
              <VideoStage
                key={inBreakout ? `b${myBreakout.id}` : 'class'}
                label={inBreakout ? 'One-on-one video' : isLive ? 'Class video' : 'Video opens when the session starts'}
                recorded={inBreakout}
                ready={isLive}
                demo={demo && !ended}
                getAccess={async () => {
                  const res = await fetch(`/api/live/${id}/video`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ breakoutId: myBreakout?.id }) });
                  const v = await res.json();
                  if (!res.ok) throw new Error(v.error);
                  return v;
                }}
              />
            )}

            {!ended && (
              <div className={`${r.glass} ${s.board}`}>
                <div className={r.panelHead}>
                  <h2>{active ? 'On the board' : 'The board'}</h2>
                  {active && <span className={r.tag}><Icon name={KIND[active.step.kind]?.icon} size={13} /> {KIND[active.step.kind]?.label}</span>}
                </div>
                <div className={r.panelBody}>
                  {active ? (
                    <>
                      <h3 className={s.boardTitle}>{active.step.title}</h3>
                      <StepView key={`${active.step.id}-${active.since}`} step={active.step} done={Boolean(active.mine?.completed)} sessionId={session.id} />
                    </>
                  ) : (
                    <div className={s.waiting}>
                      <svg viewBox="0 0 200 100" aria-hidden="true"><path d="M20 100 V60 A80 50 0 0 1 180 60 V100" /><path d="M45 100 V64 A55 36 0 0 1 155 64 V100" /><path d="M70 100 V68 A30 22 0 0 1 130 68 V100" /></svg>
                      <p>{isLive ? (me.isStaff ? 'Choose a lesson from the run of show to put it on everyone’s screen.' : 'Your professor will put the next lesson, quiz or simulation here.') : 'The session has not started yet. You can wait here.'}</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </section>

          <aside className={`${r.glass} ${s.side}`}>
            <div className={s.tabs} role="tablist">
              <button role="tab" aria-selected={tab === 'chat'} onClick={() => setTab('chat')}><Icon name="chat" size={16} /> {inBreakout ? 'One-on-one chat' : 'Class chat'}</button>
              <button role="tab" aria-selected={tab === 'people'} onClick={() => setTab('people')}><Icon name="users" size={16} /> People</button>
              {me.isStaff && <button role="tab" aria-selected={tab === 'run'} onClick={() => setTab('run')}><Icon name="cap" size={16} /> Run of show</button>}
            </div>

            {tab === 'chat' && (
              <div className={s.chat}>
                <p className={s.chatNote}><Icon name="eye" size={13} /> Chat is saved and visible to Academy staff. There are no private messages.</p>
                <ol className={s.msgs}>
                  {msgs.map((m) => (
                    <li key={m.id} className={m.label !== 'Cadet' ? s.staffMsg : ''}>
                      <b>{m.name}{m.label !== 'Cadet' && <em>{m.label}</em>}</b>
                      <span>{m.body}</span>
                    </li>
                  ))}
                  <li ref={chatEnd} aria-hidden="true" />
                </ol>
                <form onSubmit={send} className={s.send}>
                  <input value={text} onChange={(e) => setText(e.target.value)} placeholder={isLive ? 'Message the class…' : 'Chat opens when the session is live'} disabled={!isLive} aria-label="Message" />
                  <button className={r.btn} type="submit" disabled={!isLive || !text.trim()} aria-label="Send"><Icon name="send" size={16} /></button>
                </form>
              </div>
            )}

            {tab === 'people' && (
              <div className={s.people}>
                {me.isStaff && isLive && (
                  <div className={s.breakoutCtl}>
                    <div>
                      <b>Breakout time</b>
                      <span>One-on-ones can only open while breakout time is on during this live class.</span>
                    </div>
                    <button className={`${session.breakouts_open ? r.btnDanger : r.btn} ${r.small}`} onClick={() => act({ action: 'breakouts', open: !session.breakouts_open })}>
                      {session.breakouts_open ? 'End breakouts' : 'Open breakouts'}
                    </button>
                  </div>
                )}
                <ul>
                  {here.map((p) => {
                    const busy = breakouts?.find((b) => b.cadet_name === p.name);
                    return (
                      <li key={p.id}>
                        <span className={s.avatar} data-staff={p.isStaff}>{p.name.split(' ').map((w) => w[0]).slice(0, 2).join('')}</span>
                        <span className={s.who}><b>{p.name}</b><small>{p.label}{busy ? ' · in a one-on-one' : ''}</small></span>
                        {me.isStaff && !p.isStaff && session.breakouts_open && !busy && (
                          <button className={`${r.btnGhost} ${r.small}`} disabled={!p.hasGuardian || inBreakout} title={!p.hasGuardian ? 'No parent or guardian email on file' : undefined}
                            onClick={() => act({ action: 'open_breakout', cadetId: p.id })}>
                            {p.hasGuardian ? 'One-on-one' : 'No guardian'}
                          </button>
                        )}
                      </li>
                    );
                  })}
                  {here.length === 0 && <li className={r.muted}>No one is here yet.</li>}
                </ul>
                {me.isStaff && breakouts?.length > 0 && (
                  <div className={s.openBreakouts}>
                    <h3>Open one-on-ones</h3>
                    {breakouts.map((b) => (
                      <div key={b.id}><span><b>{b.staff_name}</b> with {b.cadet_name}<small><Icon name="record" size={11} /> Recording · guardian {b.guardian_notified ? 'emailed' : 'notice saved'}</small></span>
                        <button className={`${r.btnGhost} ${r.small}`} onClick={() => act({ action: 'close_breakout', breakoutId: b.id })}>Close</button></div>
                    ))}
                  </div>
                )}
                {!me.isStaff && !me.hasGuardian && (
                  <p className={r.notice} style={{ margin: 16 }}><Icon name="shield" size={16} /><span>Add a parent or guardian on the studio page to be able to get one-on-one help.</span></p>
                )}
              </div>
            )}

            {tab === 'run' && me.isStaff && (
              <div className={s.run}>
                <div className={s.runTop}>
                  <b>Put on everyone’s screen</b>
                  {active && <button className={`${r.btnGhost} ${r.small}`} onClick={() => act({ action: 'push', stepId: null })} disabled={!isLive}>Clear the board</button>}
                </div>
                <ol>
                  {steps.map((st) => (
                    <li key={st.id} className={active?.step.id === st.id ? s.runOn : ''}>
                      <span className={s.runIcon}><Icon name={KIND[st.kind]?.icon} size={16} /></span>
                      <span className={s.who}><b>{st.title}</b><small>{KIND[st.kind]?.label} · {st.minutes} min</small></span>
                      <button className={`${r.btnGhost} ${r.small}`} disabled={!isLive} onClick={() => act({ action: 'push', stepId: st.id })}>{active?.step.id === st.id ? 'Restart' : 'Launch'}</button>
                    </li>
                  ))}
                </ol>
                {active && (
                  <div className={s.results}>
                    <h3>Live results · {active.step.title}</h3>
                    {results.length === 0 && <p className={r.muted}>Waiting for cadets to submit…</p>}
                    {results.map((x, i) => (
                      <div key={i}><span>{x.name}</span><b>{x.score != null ? x.score : x.completed ? 'Done' : '…'}</b></div>
                    ))}
                    {results.length > 0 && results.some((x) => x.score != null) && (
                      <div className={s.avg}><span>Class average</span><b>{Math.round(results.filter((x) => x.score != null).reduce((a, x) => a + x.score, 0) / results.filter((x) => x.score != null).length)}</b></div>
                    )}
                  </div>
                )}
              </div>
            )}
          </aside>
        </div>
      </div>
    </Scene>
  );
}
