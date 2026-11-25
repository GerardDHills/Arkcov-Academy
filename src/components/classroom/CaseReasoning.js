'use client';

import { useState } from 'react';
import Icon from '@/components/Icon';
import r from './room.module.css';
import s from './case.module.css';

// Two clinical-reasoning stages for the case engine.
//
// ModelStage: the cadet builds a causal chain (a mental model). Each clue is
// tapped, then placed on the link of the chain it is evidence for. Credit is
// the share of clues placed right on the first try.
//
// DifferentialStage: the cadet picks possible diagnoses, ranks them, then
// checks the list. Each option is tagged leading, possible, cantmiss or
// unlikely. Credit rewards including and ranking the leading diagnosis,
// including can't-miss diagnoses, and leaving out unlikely ones.

export function ModelStage({ v, onDone }) {
  const [sel, setSel] = useState(null);
  const [placed, setPlaced] = useState({});
  const [missed, setMissed] = useState({});
  const [note, setNote] = useState(null);
  const left = v.clues.filter((c) => !placed[c.id]);

  const drop = (layerId) => {
    if (!sel) return;
    const clue = v.clues.find((c) => c.id === sel);
    if (clue.layer === layerId) {
      const next = { ...placed, [clue.id]: layerId };
      setPlaced(next);
      setNote({ ok: true, text: clue.feedback || 'That clue fits here.' });
      setSel(null);
      if (Object.keys(next).length === v.clues.length) {
        const wrongFirst = Object.keys(missed).length;
        onDone(Math.max(0, 1 - wrongFirst / v.clues.length), { model: next, missed: Object.keys(missed) });
      }
    } else {
      setMissed((m) => ({ ...m, [clue.id]: true }));
      const layer = v.layers.find((l) => l.id === layerId);
      setNote({ ok: false, text: `“${clue.label}” is better explained by another link than “${layer.label}.” Look at the chain again and try once more.` });
    }
  };

  const done = left.length === 0;
  return (
    <div className={s.model}>
      <p className={s.ask}>{v.prompt}</p>
      {!done && (
        <div className={s.tray} role="group" aria-label="Clues">
          {left.map((c) => (
            <button key={c.id} type="button" aria-pressed={sel === c.id} className={`${s.clue} ${sel === c.id ? s.clueOn : ''} ${missed[c.id] ? s.clueMissed : ''}`} onClick={() => setSel(sel === c.id ? null : c.id)}>
              {c.label}
            </button>
          ))}
        </div>
      )}
      {!done && <p className={r.muted}>{sel ? 'Now tap the link in the chain this clue is evidence for.' : 'Tap a clue to pick it up.'}</p>}
      <ol className={s.chain}>
        {v.layers.map((l, k) => (
          <li key={l.id}>
            <button type="button" className={`${s.link} ${sel ? s.linkReady : ''}`} onClick={() => drop(l.id)} disabled={!sel} aria-label={`Place clue on: ${l.label}`}>
              <span className={s.linkNum}>{k + 1}</span>
              <span className={s.linkText}><b>{l.label}</b>{l.hint && <small>{l.hint}</small>}</span>
              <span className={s.linkClues}>
                {v.clues.filter((c) => placed[c.id] === l.id).map((c) => <em key={c.id}>{c.label}</em>)}
              </span>
            </button>
            {k < v.layers.length - 1 && <span className={s.arrow} aria-hidden="true">leads to</span>}
          </li>
        ))}
      </ol>
      {note && !done && <p className={`${r.explain} ${note.ok ? '' : s.noteWarn}`} role="status">{note.text}</p>}
      {done && v.wrap && <p className={r.explain}>{v.wrap}</p>}
    </div>
  );
}

const FIT = {
  leading: { label: 'Leading diagnosis', cls: 'fitLead' },
  possible: { label: 'Reasonable to consider', cls: 'fitPoss' },
  cantmiss: { label: 'Can’t-miss diagnosis', cls: 'fitMiss' },
  unlikely: { label: 'Unlikely', cls: 'fitUnl' },
};

export function DifferentialStage({ v, onDone }) {
  const [list, setList] = useState([]);
  const [checked, setChecked] = useState(false);
  const min = v.min || 3;
  const max = v.max || 5;
  const opt = (id) => v.options.find((o) => o.id === id);

  const toggle = (id) => {
    if (checked) return;
    setList((l) => (l.includes(id) ? l.filter((x) => x !== id) : l.length >= max ? l : [...l, id]));
  };
  const move = (k, dir) => setList((l) => {
    const n = [...l]; const j = k + dir;
    if (j < 0 || j >= n.length) return l;
    [n[k], n[j]] = [n[j], n[k]];
    return n;
  });

  const check = () => {
    const lead = v.options.filter((o) => o.fit === 'leading').map((o) => o.id);
    const must = v.options.filter((o) => o.fit === 'cantmiss').map((o) => o.id);
    let pts = 0;
    const total = 3 + must.length;
    if (lead.some((id) => list.includes(id))) pts += 2;
    if (lead.includes(list[0])) pts += 1;
    pts += must.filter((id) => list.includes(id)).length;
    pts -= list.filter((id) => opt(id)?.fit === 'unlikely').length * 0.5;
    setChecked(true);
    onDone(Math.max(0, Math.min(1, pts / total)), { differential: list.map((id) => opt(id)?.label) });
  };

  const forgot = checked ? v.options.filter((o) => (o.fit === 'leading' || o.fit === 'cantmiss') && !list.includes(o.id)) : [];

  return (
    <div className={s.ddx}>
      <p className={s.ask}>{v.prompt}</p>
      {!checked && (
        <div className={s.ddxPool} role="group" aria-label="Possible diagnoses">
          {v.options.map((o) => (
            <button key={o.id} type="button" aria-pressed={list.includes(o.id)} className={`${s.clue} ${list.includes(o.id) ? s.clueOn : ''}`} onClick={() => toggle(o.id)}>
              {list.includes(o.id) && <Icon name="check" size={14} />}{o.label}
            </button>
          ))}
        </div>
      )}
      <div className={s.ddxList}>
        <p className={s.ddxHead}>My differential diagnosis <span>{list.length ? 'Most likely at the top' : `Choose ${min} to ${max}`}</span></p>
        {list.length === 0 && <p className={r.muted}>Nothing listed yet.</p>}
        <ol>
          {list.map((id, k) => {
            const o = opt(id);
            const f = FIT[o.fit] || FIT.possible;
            return (
              <li key={id} className={checked ? s[f.cls] : ''}>
                <span className={s.rank}>{k + 1}</span>
                <div className={s.ddxBody}>
                  <b>{o.label}</b>
                  {checked && <><small>{f.label}</small><p>{o.why}</p></>}
                </div>
                {!checked && (
                  <span className={s.mover}>
                    <button type="button" onClick={() => move(k, -1)} disabled={k === 0} aria-label={`Move ${o.label} up`}>▲</button>
                    <button type="button" onClick={() => move(k, 1)} disabled={k === list.length - 1} aria-label={`Move ${o.label} down`}>▼</button>
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </div>
      {forgot.length > 0 && (
        <div className={s.forgot}>
          <b>Also belongs on the list</b>
          {forgot.map((o) => <p key={o.id}><em>{o.label}</em> ({FIT[o.fit].label.toLowerCase()}): {o.why}</p>)}
        </div>
      )}
      {!checked && (
        <div className={s.actions}>
          {list.length < min && <span className={r.muted}>Add at least {min - list.length} more.</span>}
          <button type="button" className={r.btn} disabled={list.length < min} onClick={check}>Check my differential <Icon name="check" size={16} /></button>
        </div>
      )}
      {checked && v.wrap && <p className={r.explain}>{v.wrap}</p>}
    </div>
  );
}
