'use client';

import { useMemo, useState } from 'react';
import s from './case.module.css';

// Oxygen content of blood ≈ 1.34 mL O2 per gram of hemoglobin × saturation
// (dissolved oxygen is small and left out for teaching).
const content = (hb, sat = 0.98) => 1.34 * hb * sat;

function Lane({ label, hb, maxHb }) {
  const cells = 7;
  const dots = Math.max(1, Math.round((hb / maxHb) * 4));
  const pct = Math.round((content(hb) / content(maxHb)) * 100);
  return (
    <div className={s.lane}>
      <div className={s.laneHead}><b>{label}</b><span>Hemoglobin {hb} g/dL</span></div>
      <div className={s.vessel}>
        {Array.from({ length: cells }, (_, i) => (
          <span key={i} className={s.rbc} style={{ animationDelay: `${-i * 0.9}s`, '--i': i }}>
            {Array.from({ length: dots }, (_, k) => <i key={k} />)}
          </span>
        ))}
        <div className={s.muscle}><span>Leg muscle</span><div className={s.meter}><em style={{ width: `${pct}%` }} /></div></div>
      </div>
      <div className={s.laneFoot}>Oxygen carried: <b>{content(hb).toFixed(1)} mL per 100 mL of blood</b> · {pct}% of typical</div>
    </div>
  );
}

export default function OxygenTransit({ normal = 14, patient = 8.9, track = 'junior', patientName = 'Patient' }) {
  const [hb, setHb] = useState(patient);
  const drop = useMemo(() => Math.round((1 - content(patient) / content(normal)) * 100), [normal, patient]);
  return (
    <div className={s.oxygen}>
      <Lane label="Typical bloodstream" hb={normal} maxHb={normal} />
      <Lane label={`${patientName}’s bloodstream`} hb={track === 'senior' ? hb : patient} maxHb={normal} />
      {track === 'senior' ? (
        <div className={s.slider}>
          <label htmlFor="hb">Change {patientName}’s hemoglobin and watch oxygen delivery change</label>
          <input id="hb" type="range" min="5" max="16" step="0.1" value={hb} onChange={(e) => setHb(Number(e.target.value))} />
          <p className={s.formula}>Oxygen content ≈ 1.34 × hemoglobin × oxygen saturation. At {hb.toFixed(1)} g/dL and 98% saturation: <b>{content(hb).toFixed(1)} mL O₂ per 100 mL</b>.</p>
        </div>
      ) : (
        <p className={s.formula}>Each red blood cell in {patientName}’s bloodstream carries less oxygen: about {drop}% less reaches his muscles, so his heart beats faster to keep up.</p>
      )}
    </div>
  );
}
