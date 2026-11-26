'use client';

import { useState } from 'react';
import s from './atlas.module.css';

// Oxygen-hemoglobin dissociation curve (Hill equation) with the factors that
// shift it, and how much oxygen actually reaches tissue at a given hemoglobin.
const N = 2.7;
const sat = (po2, p50) => (po2 ** N) / (p50 ** N + po2 ** N);
const BASE = { A: 26.8, F: 19, S: 31 };

export default function OxygenCurve({ level = 'college' }) {
  const [ph, setPh] = useState(7.4);
  const [temp, setTemp] = useState(37);
  const [bpg, setBpg] = useState(5);
  const [hb, setHb] = useState('A');
  const [hgb, setHgb] = useState(14);

  const p50 = BASE[hb] * 10 ** (-0.48 * (ph - 7.4) + 0.024 * (temp - 37)) + (bpg - 5) * 1.5;
  const ref = BASE.A;
  const pts = (p) => Array.from({ length: 51 }, (_, i) => { const x = i * 2.4; return `${10 + x * 0.66},${90 - sat(x, p) * 80}`; }).join(' ');
  const sa = sat(100, p50); const sv = sat(40, p50);
  const ca = 1.34 * hgb * sa + 0.003 * 100; const cv = 1.34 * hgb * sv + 0.003 * 40;
  const shift = p50 > ref + 1 ? 'right' : p50 < ref - 1 ? 'left' : 'none';
  const X = (po2) => 10 + po2 * 0.66;

  return (
    <div className={s.o2}>
      <div className={s.o2Grid}>
        <svg viewBox="0 0 100 100" className={s.o2Plot} role="img" aria-label={`Oxygen dissociation curve, P50 ${p50.toFixed(1)} mmHg`}>
          {[0, 25, 50, 75, 100].map((y) => <line key={y} x1="10" x2="91" y1={90 - y * 0.8} y2={90 - y * 0.8} className={s.grid} />)}
          <line x1={X(40)} x2={X(40)} y1="10" y2="90" className={s.mark} />
          <line x1={X(100)} x2={X(100)} y1="10" y2="90" className={s.mark} />
          <text x={X(40)} y="96" textAnchor="middle" className={s.axis}>Tissue 40</text>
          <text x={X(100) - 2} y="96" textAnchor="middle" className={s.axis}>Lungs 100</text>
          <text x="2" y="12" className={s.axis}>100%</text>
          <text x="4" y="90" className={s.axis}>0</text>
          <polyline points={pts(ref)} className={s.refCurve} />
          <polyline points={pts(p50)} className={s.curve} />
          <circle cx={X(p50)} cy={90 - 0.5 * 80} r="1.6" className={s.p50dot} />
          <text x={X(p50) + 2} y={90 - 0.5 * 80 + 1} className={s.axis}>P50 {p50.toFixed(0)}</text>
        </svg>
        <div className={s.o2Controls}>
          <label>Hemoglobin type
            <select value={hb} onChange={(e) => setHb(e.target.value)}>
              <option value="A">Adult (HbA)</option><option value="F">Fetal (HbF)</option><option value="S">Sickle (HbS, in vivo)</option>
            </select>
          </label>
          <label>Blood pH <b>{ph.toFixed(2)}</b><input type="range" min="7.1" max="7.6" step="0.01" value={ph} onChange={(e) => setPh(+e.target.value)} /></label>
          <label>Temperature <b>{temp} °C</b><input type="range" min="34" max="41" step="0.5" value={temp} onChange={(e) => setTemp(+e.target.value)} /></label>
          <label>2,3-BPG <b>{bpg.toFixed(1)} mmol/L</b><input type="range" min="3" max="8" step="0.5" value={bpg} onChange={(e) => setBpg(+e.target.value)} /></label>
          <label>Hemoglobin <b>{hgb} g/dL</b><input type="range" min="4" max="17" step="0.5" value={hgb} onChange={(e) => setHgb(+e.target.value)} /></label>
        </div>
      </div>
      <div className={s.o2Read}>
        <div><small>Saturation in lungs</small><b>{Math.round(sa * 100)}%</b></div>
        <div><small>Saturation leaving tissue</small><b>{Math.round(sv * 100)}%</b></div>
        <div><small>Oxygen delivered per 100 mL blood</small><b>{(ca - cv).toFixed(1)} mL</b></div>
        <div><small>Curve shift</small><b>{shift === 'none' ? 'Normal' : shift === 'right' ? 'Right: lets go of O₂' : 'Left: holds on to O₂'}</b></div>
      </div>
      <p className={s.fine}>
        {level === 'cadet'
          ? 'The gold line shows how tightly hemoglobin holds oxygen. Make the blood more acidic or warmer, like a working muscle, and hemoglobin lets go of more oxygen. Lower the hemoglobin and less oxygen reaches the body, even though the saturation looks normal.'
          : 'Dashed line: normal adult curve. Acidosis, fever and raised 2,3-BPG shift the curve right (more unloading); HbF shifts it left. Saturation can be normal in anemia while oxygen content and delivery fall. Model values are approximate.'}
      </p>
    </div>
  );
}
