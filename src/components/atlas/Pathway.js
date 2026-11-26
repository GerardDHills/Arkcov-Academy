'use client';

import { useState } from 'react';
import s from './atlas.module.css';

// Pathway explorer: a diagram of how a normal process works, with a set of
// conditions that break it. Picking a condition marks the affected steps and
// shows the lab pattern that results. Coordinates are in a 100-wide space.
//
// pathway = { height, nodes: [{ id, label, x, y, w?, desc }], edges: [[from, to]],
//   conditions: [{ id, label, note, states: { nodeId: 'up'|'down'|'blocked'|'bad' }, labs: [[test, value, dir]] }] }

const STATE = {
  up: { tag: 'Increased', cls: 'stUp' },
  down: { tag: 'Decreased', cls: 'stDown' },
  blocked: { tag: 'Blocked', cls: 'stBlocked' },
  bad: { tag: 'Damaged', cls: 'stBad' },
};

export default function Pathway({ pathway }) {
  const [cond, setCond] = useState(null);
  const [node, setNode] = useState(null);
  const c = pathway.conditions.find((x) => x.id === cond);
  const st = (id) => c?.states?.[id];
  const by = Object.fromEntries(pathway.nodes.map((n) => [n.id, n]));
  const H = pathway.height || 60;
  const sel = node ? by[node] : null;

  return (
    <div className={s.pathway}>
      <div className={s.chips} role="group" aria-label="Choose a condition">
        <button type="button" aria-pressed={!cond} onClick={() => setCond(null)}>Normal</button>
        {pathway.conditions.map((x) => <button key={x.id} type="button" aria-pressed={cond === x.id} onClick={() => setCond(x.id)}>{x.label}</button>)}
      </div>
      <div className={s.pathFrame}>
        <svg viewBox={`0 0 100 ${H}`} role="img" aria-label={pathway.title || 'Pathway diagram'}>
          <defs>
            <marker id="arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="#E6C27A" /></marker>
            <marker id="arrX" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="#FF7A6B" /></marker>
          </defs>
          {pathway.edges.map(([a, b], i) => {
            const A = by[a]; const B = by[b];
            const broken = ['blocked', 'bad'].includes(st(a)) || ['blocked', 'bad'].includes(st(b)) || st(a) === 'down';
            return <line key={i} x1={A.x} y1={A.y} x2={B.x} y2={B.y} className={`${s.edge} ${broken ? s.edgeBroken : ''}`} markerEnd={`url(#${broken ? 'arrX' : 'arr'})`} />;
          })}
          {pathway.nodes.map((n) => {
            const w = n.w || 22; const state = st(n.id);
            return (
              <g key={n.id} transform={`translate(${n.x - w / 2} ${n.y - 4.2})`} className={`${s.pnode} ${state ? s[STATE[state].cls] : ''} ${node === n.id ? s.pnodeOn : ''}`} onClick={() => setNode(node === n.id ? null : n.id)} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setNode(node === n.id ? null : n.id); }} aria-label={`${n.label}${state ? `, ${STATE[state].tag}` : ''}`}>
                <rect width={w} height="8.4" rx="2" />
                <text x={w / 2} y="5.3" textAnchor="middle">{n.label}</text>
                {state && <text x={w - 1.2} y="-0.8" textAnchor="end" className={s.ptag}>{STATE[state].tag}</text>}
              </g>
            );
          })}
        </svg>
      </div>
      <div className={s.pathInfo}>
        {sel && <div className={s.pathNote}><b>{sel.label}</b><p>{sel.desc}</p></div>}
        {!sel && !c && <p className={s.fine}>Tap any step to learn what it does. Then pick a condition to see what breaks.</p>}
        {c && (
          <div className={s.pathNote}>
            <b>{c.label}</b>
            <p>{c.note}</p>
            {c.labs?.length > 0 && (
              <table className={s.labTable}>
                <tbody>
                  {c.labs.map(([test, value, dir]) => (
                    <tr key={test}><th>{test}</th><td className={dir === 'up' ? s.vUp : dir === 'down' ? s.vDown : ''}>{value}</td></tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
