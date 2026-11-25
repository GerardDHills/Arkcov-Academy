'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { upload } from '@vercel/blob/client';
import Icon from '@/components/Icon';
import Scene from '@/components/classroom/Scene';
import StepView, { KIND } from '@/components/classroom/StepView';
import r from '@/components/classroom/room.module.css';
import s from './build.module.css';

const TYPES = ['video', 'reading', 'activity', 'quiz', 'simulation'];
const BLANK_Q = () => ({ q: '', options: ['', '', '', ''], answer: 0, explain: '' });
const blank = (unit) => ({ kind: 'video', unit: unit || '', title: '', summary: '', minutes: 5, body: '', media_url: '', data: {} });

function Editor({ initial, units, onSave, onCancel, saving }) {
  const [st, setSt] = useState(initial);
  const [uploading, setUploading] = useState('');
  const [preview, setPreview] = useState(false);
  const [err, setErr] = useState('');
  const fileRef = useRef(null);
  const set = (k, v) => setSt((x) => ({ ...x, [k]: v }));
  const setData = (k, v) => setSt((x) => ({ ...x, data: { ...(x.data || {}), [k]: v } }));
  const qs = st.data?.questions || [];
  const setQ = (i, patch) => setData('questions', qs.map((q, j) => (j === i ? { ...q, ...patch } : q)));

  useEffect(() => {
    if (st.kind === 'quiz' && !qs.length) setData('questions', [BLANK_Q()]);
    if (st.kind === 'simulation' && !st.data?.sim) setData('sim', 'stroke');
  }, [st.kind]); // eslint-disable-line react-hooks/exhaustive-deps

  const pickVideo = async (file) => {
    if (!file) return;
    setErr(''); setUploading(`Uploading ${file.name} (${Math.round(file.size / 1048576)} MB)…`);
    try {
      const safe = file.name.replace(/[^a-zA-Z0-9._-]/g, '-');
      const blob = await upload(`lessons/${safe}`, file, {
        access: 'public', handleUploadUrl: '/api/classroom/upload', contentType: file.type || 'video/mp4', multipart: file.size > 50 * 1048576,
      });
      set('media_url', blob.url);
      if (!st.title) set('title', file.name.replace(/\.[^.]+$/, '').replace(/[-_]+/g, ' '));
      setUploading('');
    } catch (e) { setErr(e.message || 'Upload failed'); setUploading(''); }
  };
  const pickPoster = async (file) => {
    if (!file) return;
    setUploading('Uploading poster image…');
    try {
      const blob = await upload(`lessons/posters/${file.name.replace(/[^a-zA-Z0-9._-]/g, '-')}`, file, { access: 'public', handleUploadUrl: '/api/classroom/upload', contentType: file.type });
      setData('poster', blob.url);
    } catch (e) { setErr(e.message); }
    setUploading('');
  };

  return (
    <div className={`${r.glass} ${s.editor}`}>
      <div className={r.panelHead}>
        <h2>{initial.id ? 'Edit lesson' : 'New lesson'}</h2>
        <div style={{ display: 'flex', gap: 8 }}>
          <button type="button" className={`${r.btnGhost} ${r.small}`} onClick={() => setPreview(!preview)}><Icon name="eye" size={15} /> {preview ? 'Edit' : 'Preview'}</button>
          <button type="button" className={`${r.btnGhost} ${r.small}`} onClick={onCancel} aria-label="Close"><Icon name="close" size={15} /></button>
        </div>
      </div>

      {preview ? (
        <div className={r.panelBody}>
          <h3 className={s.previewTitle}>{st.title || 'Untitled lesson'}</h3>
          <StepView step={{ ...st, id: initial.id || 0 }} previewOnly />
        </div>
      ) : (
        <form className={r.panelBody} style={{ display: 'grid', gap: 14 }} onSubmit={(e) => { e.preventDefault(); onSave(st, setErr); }}>
          <div className={s.types} role="radiogroup" aria-label="Lesson type">
            {TYPES.map((t) => (
              <button key={t} type="button" role="radio" aria-checked={st.kind === t} className={s.type} onClick={() => set('kind', t)}>
                <Icon name={KIND[t].icon} size={20} /><span>{KIND[t].label}</span>
              </button>
            ))}
          </div>

          <div className={s.row2}>
            <label className={r.field}><span>Unit</span><input list="units" value={st.unit} onChange={(e) => set('unit', e.target.value)} placeholder="Unit A · Identity" /></label>
            <label className={r.field}><span>Minutes</span><input type="number" min="1" max="240" value={st.minutes} onChange={(e) => set('minutes', e.target.value)} /></label>
          </div>
          <datalist id="units">{units.map((u) => <option key={u} value={u} />)}</datalist>
          <label className={r.field}><span>Title</span><input required value={st.title} onChange={(e) => set('title', e.target.value)} /></label>
          <label className={r.field}><span>One-line summary</span><input value={st.summary || ''} onChange={(e) => set('summary', e.target.value)} /></label>

          {st.kind === 'video' && (
            <div className={s.media}>
              <div className={s.drop} onClick={() => fileRef.current?.click()} onDragOver={(e) => e.preventDefault()} onDrop={(e) => { e.preventDefault(); pickVideo(e.dataTransfer.files?.[0]); }} role="button" tabIndex={0}>
                <Icon name="video" size={30} />
                <b>{st.media_url ? 'Replace the video' : 'Upload a video'}</b>
                <span>Drop an MP4, MOV or WebM here, or tap to choose. Large films are fine.</span>
                <input ref={fileRef} type="file" accept="video/mp4,video/webm,video/quicktime" hidden onChange={(e) => pickVideo(e.target.files?.[0])} />
              </div>
              {uploading && <div className={s.uploading}><span className={s.spinner} />{uploading}</div>}
              <label className={r.field}><span>…or paste a video link (YouTube, Vimeo or a direct MP4)</span><input value={st.media_url || ''} onChange={(e) => set('media_url', e.target.value)} placeholder="https://" /></label>
              {st.media_url && !/youtu|vimeo/.test(st.media_url) && (
                <label className={s.posterBtn}><Icon name="sparkle" size={15} /> {st.data?.poster ? 'Change cover image' : 'Add a cover image'}
                  <input type="file" accept="image/*" hidden onChange={(e) => pickPoster(e.target.files?.[0])} /></label>
              )}
            </div>
          )}

          {st.kind === 'activity' && (
            <label className={r.field}><span>Reflection prompt for cadets</span><input value={st.data?.prompt || ''} onChange={(e) => setData('prompt', e.target.value)} placeholder="What do you think you were shaped to do?" /></label>
          )}

          {st.kind === 'simulation' && (
            <label className={r.field}><span>Simulation</span>
              <select value={st.data?.sim || 'stroke'} onChange={(e) => setData('sim', e.target.value)}>
                <option value="stroke">Mr. Johnson: a stroke in progress (BE FAST)</option>
              </select>
            </label>
          )}

          <label className={r.field}>
            <span>{st.kind === 'video' ? 'Notes under the film (optional)' : st.kind === 'quiz' ? 'Teaching text before the questions (optional)' : 'Lesson text'}</span>
            <textarea value={st.body || ''} onChange={(e) => set('body', e.target.value)} style={{ minHeight: st.kind === 'reading' ? 260 : 120 }}
              placeholder={'## A heading\n\nA paragraph of text.\n\n- A bullet point\n- **Bold words** with two stars'} />
          </label>

          {st.kind === 'quiz' && (
            <div className={s.questions}>
              {qs.map((q, i) => (
                <div key={i} className={s.qCard}>
                  <div className={s.qHead}><b>Question {i + 1}</b>
                    {qs.length > 1 && <button type="button" className={`${r.btnGhost} ${r.small}`} onClick={() => setData('questions', qs.filter((_, j) => j !== i))}>Remove</button>}
                  </div>
                  <label className={r.field}><span>Question</span><input value={q.q} onChange={(e) => setQ(i, { q: e.target.value })} /></label>
                  <div className={s.opts}>
                    {q.options.map((o, oi) => (
                      <div key={oi} className={s.opt}>
                        <button type="button" className={s.correct} aria-pressed={q.answer === oi} title="Mark as the correct answer" onClick={() => setQ(i, { answer: oi })}>
                          {q.answer === oi ? <Icon name="check" size={14} /> : String.fromCharCode(65 + oi)}
                        </button>
                        <input value={o} placeholder={`Answer ${String.fromCharCode(65 + oi)}`} onChange={(e) => setQ(i, { options: q.options.map((x, k) => (k === oi ? e.target.value : x)) })} />
                      </div>
                    ))}
                  </div>
                  <label className={r.field}><span>Why it’s right (shown after they answer)</span><input value={q.explain} onChange={(e) => setQ(i, { explain: e.target.value })} /></label>
                </div>
              ))}
              <button type="button" className={r.btnGhost} onClick={() => setData('questions', [...qs, BLANK_Q()])}>Add a question</button>
            </div>
          )}

          {err && <p className={r.error} role="alert">{err}</p>}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
            <button type="button" className={r.btnGhost} onClick={onCancel}>Cancel</button>
            <button type="submit" className={r.btn} disabled={saving || Boolean(uploading)}>{saving ? 'Saving…' : 'Save lesson'}</button>
          </div>
        </form>
      )}
    </div>
  );
}

export default function Builder({ params }) {
  const [d, setD] = useState(null);
  const [err, setErr] = useState('');
  const [edit, setEdit] = useState(null);
  const [saving, setSaving] = useState(false);
  const [room, setRoom] = useState(null);

  const load = useCallback(async () => {
    const res = await fetch(`/api/classroom/build/${params.slug}`);
    const v = await res.json();
    if (!res.ok) setErr(v.error); else { setD(v); setRoom({ title: v.program.title, subtitle: v.program.subtitle || '', description: v.program.description || '', pass_score: v.program.pass_score }); }
  }, [params.slug]);
  useEffect(() => { load(); }, [load]);

  const save = async (st, setEditErr) => {
    setSaving(true);
    const res = await fetch(st.id ? `/api/classroom/build/step/${st.id}` : `/api/classroom/build/${params.slug}`, {
      method: st.id ? 'PATCH' : 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(st),
    });
    const v = await res.json();
    setSaving(false);
    if (!res.ok) { setEditErr(v.error); return; }
    setEdit(null); load();
  };
  const move = async (i, dir) => {
    const ids = d.steps.map((x) => x.id);
    const j = i + dir;
    if (j < 0 || j >= ids.length) return;
    [ids[i], ids[j]] = [ids[j], ids[i]];
    setD({ ...d, steps: ids.map((id) => d.steps.find((x) => x.id === id)) });
    await fetch(`/api/classroom/build/${params.slug}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ order: ids }) });
  };
  const remove = async (st) => {
    if (!confirm(`Delete “${st.title}”? Cadet progress on it is removed too.`)) return;
    await fetch(`/api/classroom/build/step/${st.id}`, { method: 'DELETE' });
    load();
  };
  const saveRoom = async (e) => {
    e.preventDefault();
    await fetch(`/api/classroom/programs/${params.slug}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(room) });
    load();
  };

  const art = d?.program?.art || '/classroom/healers-studio.jpg';
  const units = [...new Set((d?.steps || []).map((x) => x.unit).filter(Boolean))];

  return (
    <Scene image={art} dim>
      <div className={r.wrap} style={{ padding: '100px 0 90px' }}>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <Link href="/teach" className={`${r.btnGhost} ${r.small}`}><Icon name="cap" size={15} /> Faculty Hall</Link>
          {d && <Link href={`/classroom/${params.slug}`} className={`${r.btnGhost} ${r.small}`}><Icon name="door" size={15} /> View the room</Link>}
        </div>
        {err && <p className={r.error} style={{ marginTop: 20 }}>{err}</p>}
        {d && (
          <>
            <div style={{ margin: '26px 0 22px' }}>
              <p className={r.eyebrow}>Lesson Builder · {d.program.building}</p>
              <h1 className={r.title} style={{ fontSize: 'clamp(2.1rem,4.4vw,3.4rem)' }}>{d.program.room}</h1>
            </div>

            <div className={s.grid}>
              <div style={{ display: 'grid', gap: 18, minWidth: 0 }}>
                {edit && <Editor key={edit.id || 'new'} initial={edit} units={units} saving={saving} onSave={save} onCancel={() => setEdit(null)} />}

                <div className={r.glass}>
                  <div className={r.panelHead}>
                    <h2>The path · {d.steps.length} lessons</h2>
                    <button type="button" className={`${r.btn} ${r.small}`} onClick={() => setEdit(blank(units[units.length - 1]))}>Add a lesson</button>
                  </div>
                  {d.steps.length === 0 && (
                    <div className={s.empty}>
                      <Icon name="sparkle" size={28} />
                      <b>This room is ready for its first lesson</b>
                      <span>Add a film, a reading, an activity, an evaluation or a simulation. Cadets see lessons in the order you set here.</span>
                    </div>
                  )}
                  <ol className={s.list}>
                    {d.steps.map((st, i) => (
                      <li key={st.id}>
                        <span className={s.num}>{i + 1}</span>
                        <span className={s.icon}><Icon name={KIND[st.kind]?.icon} size={17} /></span>
                        <span className={s.text}><small>{st.unit} · {KIND[st.kind]?.label} · {st.minutes} min</small><b>{st.title}</b></span>
                        <span className={s.actions}>
                          <button type="button" aria-label="Move up" onClick={() => move(i, -1)} disabled={i === 0}><span style={{ display: 'inline-flex', transform: 'rotate(-90deg)' }}><Icon name="arrow" size={15} /></span></button>
                          <button type="button" aria-label="Move down" onClick={() => move(i, 1)} disabled={i === d.steps.length - 1}><span style={{ display: 'inline-flex', transform: 'rotate(90deg)' }}><Icon name="arrow" size={15} /></span></button>
                          <button type="button" aria-label="Edit" onClick={() => setEdit({ ...st, data: st.data || {} })}><Icon name="pen" size={15} /></button>
                          <button type="button" aria-label="Delete" onClick={() => remove(st)}><Icon name="close" size={15} /></button>
                        </span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>

              <aside style={{ display: 'grid', gap: 18 }}>
                {room && (
                  <form className={r.glass} onSubmit={saveRoom}>
                    <div className={r.panelHead}><h3>Room details</h3><Icon name="settings" size={17} /></div>
                    <div className={r.panelBody} style={{ display: 'grid', gap: 12 }}>
                      <label className={r.field}><span>Program title</span><input value={room.title} onChange={(e) => setRoom({ ...room, title: e.target.value })} /></label>
                      <label className={r.field}><span>Tagline</span><input value={room.subtitle} onChange={(e) => setRoom({ ...room, subtitle: e.target.value })} /></label>
                      <label className={r.field}><span>Description</span><textarea value={room.description} onChange={(e) => setRoom({ ...room, description: e.target.value })} /></label>
                      <label className={r.field}><span>Passing score for the certificate</span><input type="number" min="0" max="100" value={room.pass_score} onChange={(e) => setRoom({ ...room, pass_score: e.target.value })} /></label>
                      <button className={`${r.btn} ${r.small}`} type="submit">Save details</button>
                    </div>
                  </form>
                )}
                <div className={r.glass}>
                  <div className={r.panelHead}><h3>Writing tips</h3><Icon name="pen" size={17} /></div>
                  <ul className={s.tips}>
                    <li><code>## Heading</code> starts a section.</li>
                    <li><code>- item</code> lines make a list.</li>
                    <li><code>**words**</code> makes them bold.</li>
                    <li>Leave a blank line between paragraphs.</li>
                    <li>In a live class, use Run of show to put any lesson on every screen.</li>
                  </ul>
                </div>
              </aside>
            </div>
          </>
        )}
      </div>
    </Scene>
  );
}
