import { sql } from '@/lib/db';
import { HYPOGLYCEMIA, SEIZURE, NEONATAL, HYPOVOLEMIC, CARDIOGENIC } from './emergencyA';
import { NEUROGENIC, SEPTIC, ANAPHYLAXIS, DKA, TLS } from './emergencyB';
import { HUS, TTP, ITP, STROKE, MI, ASTHMA, ACS } from './emergencyC';
import { PNEUMONIA, APPENDICITIS, UTI, NEPHROTIC, KAWASAKI, STREP, ALL } from './systemsA';
import { CONCUSSION, SCFE, T2DM, GRAVES, HMB, HASHIMOTO } from './systemsB';
import { TORSION, TESTICULAR_CANCER, PROSTATE, ECTOPIC, PREECLAMPSIA, OVARIAN_TORSION, PCOS, ENDOMETRIOSIS, PID, TURNER } from './repro';
import { SEQUESTRATION, SCD_STROKE, PRIAPISM, DEPRESSION, PANIC, PTSD, ADHD, SUICIDE_RISK } from './sickleMind';
import { SENTINEL, NEGLECT, BRONCHIOLITIS, CROUP, PYLORIC, INTUSSUSCEPTION, JAUNDICE, MENINGITIS, LEAD, CELIAC, SEPTIC_HIP, PE } from './protectPeds';

export { SYSTEMS } from './kit';

// The Case Library, in order. CASE-001 (Isaiah) lives in seasonOne.js.
export const CASE_LIBRARY = [
  HYPOGLYCEMIA, SEIZURE, NEONATAL, HYPOVOLEMIC, CARDIOGENIC,
  NEUROGENIC, SEPTIC, ANAPHYLAXIS, DKA, TLS,
  HUS, TTP, ITP, STROKE, MI, ASTHMA, ACS,
  PNEUMONIA, APPENDICITIS, UTI, NEPHROTIC, KAWASAKI, STREP, ALL,
  CONCUSSION, SCFE, T2DM, GRAVES, HMB, HASHIMOTO,
  TORSION, TESTICULAR_CANCER, PROSTATE, ECTOPIC, PREECLAMPSIA, OVARIAN_TORSION, PCOS, ENDOMETRIOSIS, PID, TURNER,
  SEQUESTRATION, SCD_STROKE, PRIAPISM, DEPRESSION, PANIC, PTSD, ADHD, SUICIDE_RISK,
  SENTINEL, NEGLECT, BRONCHIOLITIS, CROUP, PYLORIC, INTUSSUSCEPTION, JAUNDICE, MENINGITIS, LEAD, CELIAC, SEPTIC_HIP, PE,
];

// Seeds every library case into its room as an unapproved draft. Existing
// drafts refresh when a case's `rev` rises; approved cases are never touched.
let seeded = false;
export async function ensureCaseLibrary() {
  if (seeded) return;
  const rooms = [...new Set(CASE_LIBRARY.map((c) => c.room))];
  const progs = await sql`SELECT id, slug FROM programs WHERE slug = ANY(${rooms})`;
  const pid = Object.fromEntries(progs.map((p) => [p.slug, p.id]));
  const have = await sql`SELECT id, code, reviewed, COALESCE((data->>'rev')::int, 1) AS rev FROM program_steps WHERE code = ANY(${CASE_LIBRARY.map((c) => c.code)})`;
  const byCode = Object.fromEntries(have.map((h) => [h.code, h]));
  let order = 0;
  for (const c of CASE_LIBRARY) {
    order += 1;
    const programId = pid[c.room];
    if (!programId) continue;
    const h = byCode[c.code];
    if (h) {
      if (!h.reviewed && h.rev < c.data.rev) {
        await sql`UPDATE program_steps SET data = ${JSON.stringify(c.data)}::jsonb, title = ${c.title}, summary = ${c.summary},
          minutes = ${c.minutes}, founder_notes = ${c.founder_notes}, honor = ${c.honor} WHERE id = ${h.id}`;
      }
      continue;
    }
    await sql`INSERT INTO program_steps (program_id, sort_order, unit, kind, title, summary, body, data, minutes, reviewed, founder_notes, code, honor)
      VALUES (${programId}, ${100 + order}, ${c.unit}, 'case', ${c.title}, ${c.summary}, null, ${JSON.stringify(c.data)}::jsonb,
        ${c.minutes}, false, ${c.founder_notes}, ${c.code}, ${c.honor})`;
  }
  seeded = true;
}
