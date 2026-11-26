'use client';

import { useMemo, useState } from 'react';
import s from './atlas.module.css';

// An illustrated blood smear (Wright-Giemsa colors), drawn procedurally.
// Not a micrograph: a teaching illustration that shows what changes.

const TYPES = {
  rbc: { label: 'Red blood cell', note: 'Round, with a pale center where the cell is thinnest.' },
  micro: { label: 'Small, pale red cell', note: 'Microcytic and hypochromic: too little hemoglobin, as in iron deficiency.' },
  pencil: { label: 'Pencil cell', note: 'Elongated cell common in iron deficiency.' },
  sickle: { label: 'Sickle cell', note: 'Hemoglobin S polymerizes and bends the cell into a crescent.' },
  target: { label: 'Target cell', note: 'Extra membrane makes a bullseye: seen in hemoglobinopathies, liver disease and after splenectomy.' },
  schisto: { label: 'Schistocyte', note: 'A red cell fragment sliced by fibrin strands in tiny clotted vessels (TTP, HUS, DIC).' },
  sphero: { label: 'Spherocyte', note: 'Small, dense, no pale center: membrane loss (hereditary spherocytosis, autoimmune hemolysis).' },
  hj: { label: 'Howell-Jolly body', note: 'A nuclear remnant the spleen would normally remove: a sign of a missing or nonfunctioning spleen.' },
  stipple: { label: 'Basophilic stippling', note: 'Dots of leftover RNA: seen in lead poisoning and some thalassemias.' },
  nrbc: { label: 'Nucleated red cell', note: 'An immature red cell released early when the marrow is stressed.' },
  neutro: { label: 'Neutrophil', note: 'Multi-lobed nucleus; the first responder to bacteria.' },
  lympho: { label: 'Lymphocyte', note: 'Round nucleus filling most of the cell; part of adaptive immunity.' },
  blast: { label: 'Blast', note: 'Large immature cell with fine chromatin and nucleoli. Many blasts in blood suggest acute leukemia.' },
  plt: { label: 'Platelet', note: 'Tiny cell fragments that plug leaks and start clots.' },
  giant: { label: 'Large platelet', note: 'Young, large platelets: the marrow is pushing out new ones quickly, as in ITP.' },
};

export const SMEARS = {
  normal: { label: 'Normal', mix: { rbc: 64, neutro: 1, lympho: 1, plt: 12 } },
  iron: { label: 'Iron deficiency', mix: { micro: 58, pencil: 4, plt: 18 } },
  sickle: { label: 'Sickle cell disease', mix: { rbc: 40, sickle: 12, target: 6, nrbc: 1, hj: 3, plt: 12 } },
  tma: { label: 'TTP / HUS', mix: { rbc: 52, schisto: 11, plt: 2 } },
  itp: { label: 'ITP', mix: { rbc: 66, giant: 2 } },
  leukemia: { label: 'Acute leukemia', mix: { rbc: 32, blast: 9, plt: 2 } },
  asplenia: { label: 'No working spleen', mix: { rbc: 56, hj: 7, target: 6, plt: 16 } },
  lead: { label: 'Lead poisoning', mix: { micro: 44, stipple: 9, plt: 12 } },
  sphero: { label: 'Spherocytes', mix: { rbc: 50, sphero: 15, nrbc: 1, plt: 12 } },
};

const SIZE = { neutro: 17, lympho: 12, blast: 21, plt: 3, giant: 6, micro: 8.5, sphero: 8.5, nrbc: 10 };

function rng(seed) { let x = seed; return () => { x = (x * 16807) % 2147483647; return (x - 1) / 2147483646; }; }

function layout(mix, seed) {
  const r = rng(seed);
  const placed = [];
  const order = Object.entries(mix).sort((a, b) => (SIZE[b[0]] || 11) - (SIZE[a[0]] || 11));
  for (const [type, n] of order) {
    for (let k = 0; k < n; k += 1) {
      const rad = SIZE[type] || 11;
      for (let tries = 0; tries < 60; tries += 1) {
        const a = r() * Math.PI * 2; const d = Math.sqrt(r()) * (165 - rad);
        const x = 300 + Math.cos(a) * d; const y = 180 + Math.sin(a) * d;
        const clash = placed.some((p) => Math.hypot(p.x - x, p.y - y) < p.rad + rad - (type === 'plt' || p.type === 'plt' ? 0 : 3));
        if (!clash || tries === 59) { placed.push({ type, x, y, rad, rot: r() * 360, v: r() }); break; }
      }
    }
  }
  return placed;
}

function Cell({ c, dim }) {
  const op = dim ? 0.18 : 1;
  const t = `translate(${c.x} ${c.y}) rotate(${c.rot})`;
  const pink = '#E39A9E'; const pale = '#F7D9D6';
  switch (c.type) {
    case 'rbc': case 'hj': case 'stipple': return (
      <g transform={t} opacity={op}>
        <circle r="11" fill={pink} /><circle r="4.2" fill={pale} />
        {c.type === 'hj' && <circle cx="5" cy="-3" r="1.9" fill="#4B2A78" />}
        {c.type === 'stipple' && [[-5, -3], [4, -5], [6, 3], [-3, 5], [0, -7], [-7, 2], [2, 6]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="0.9" fill="#5B3A8C" />)}
      </g>);
    case 'micro': return <g transform={t} opacity={op}><circle r="8.5" fill="#EBB3B3" /><circle r="5" fill="#FBE7E4" /></g>;
    case 'pencil': return <g transform={t} opacity={op}><ellipse rx="14" ry="4.5" fill="#EBB3B3" /></g>;
    case 'sickle': return <g transform={t} opacity={op}><path d="M-14 2 C-8 -8 8 -8 14 2 C8 -3 -8 -3 -14 2 Z" fill="#D9878D" stroke="#C7737A" strokeWidth="0.6" /></g>;
    case 'target': return <g transform={t} opacity={op}><circle r="11" fill={pink} /><circle r="6.5" fill={pale} /><circle r="3" fill={pink} /></g>;
    case 'schisto': return <g transform={t} opacity={op}><path d="M-9 -6 L8 -8 L10 2 L-2 9 L-10 4 Z" fill="#DA8C91" /></g>;
    case 'sphero': return <g transform={t} opacity={op}><circle r="8.5" fill="#C9646C" /></g>;
    case 'nrbc': return <g transform={t} opacity={op}><circle r="10" fill="#D9A3B6" /><circle r="4.5" fill="#3B1F5E" /></g>;
    case 'neutro': return (
      <g transform={t} opacity={op}>
        <circle r="17" fill="#E8D5E6" />
        {[[-6, -3, 4.5], [1, -6, 4.2], [7, 0, 4.2], [0, 6, 4.4]].map(([x, y, rr], i) => <circle key={i} cx={x} cy={y} r={rr} fill="#5B3A8C" />)}
      </g>);
    case 'lympho': return <g transform={t} opacity={op}><circle r="12" fill="#B9C9EC" /><circle r="10" cx="0.8" fill="#4A2C80" /></g>;
    case 'blast': return (
      <g transform={t} opacity={op}>
        <circle r="21" fill="#AEBFE6" /><circle r="17" cx="1.5" fill="#7B5AB0" />
        <circle r="3" cx="-3" cy="-4" fill="#B7A2DA" /><circle r="2.4" cx="6" cy="4" fill="#B7A2DA" />
      </g>);
    case 'plt': return <circle cx={c.x} cy={c.y} r="2.6" fill="#7E5BB5" opacity={op} />;
    case 'giant': return <circle cx={c.x} cy={c.y} r="6" fill="#8D6CC2" opacity={op} />;
    default: return null;
  }
}

export default function BloodSmear({ presets = ['normal'], initial }) {
  const [preset, setPreset] = useState(initial || presets[0]);
  const [pick, setPick] = useState(null);
  const smear = SMEARS[preset];
  const cells = useMemo(() => layout(smear.mix, preset.length * 977 + 13), [preset]); // eslint-disable-line react-hooks/exhaustive-deps
  const present = Object.keys(smear.mix);

  return (
    <div className={s.smear}>
      {presets.length > 1 && (
        <div className={s.chips} role="group" aria-label="Choose a blood smear">
          {presets.map((p) => <button key={p} type="button" aria-pressed={p === preset} onClick={() => { setPreset(p); setPick(null); }}>{SMEARS[p].label}</button>)}
        </div>
      )}
      <div className={s.scope}>
        <svg viewBox="0 0 600 360" role="img" aria-label={`Illustrated blood smear: ${smear.label}`}>
          <defs>
            <radialGradient id="field" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#FBF3EE" /><stop offset="85%" stopColor="#F2E4DC" /><stop offset="100%" stopColor="#D9C4BA" /></radialGradient>
            <clipPath id="lens"><circle cx="300" cy="180" r="170" /></clipPath>
          </defs>
          <rect width="600" height="360" fill="#050a1a" />
          <circle cx="300" cy="180" r="170" fill="url(#field)" />
          <g clipPath="url(#lens)">{cells.map((c, i) => <Cell key={`${preset}-${i}`} c={c} dim={pick && c.type !== pick} />)}</g>
          <circle cx="300" cy="180" r="170" fill="none" stroke="#C9973F" strokeWidth="3" />
        </svg>
      </div>
      <ul className={s.legend}>
        {present.map((t) => (
          <li key={t}>
            <button type="button" aria-pressed={pick === t} onClick={() => setPick(pick === t ? null : t)}>
              <b>{TYPES[t].label}</b><span>{TYPES[t].note}</span>
            </button>
          </li>
        ))}
      </ul>
      <p className={s.fine}>Illustration in Wright-Giemsa colors, not a photograph. Tap a cell type to find it in the field.</p>
    </div>
  );
}
