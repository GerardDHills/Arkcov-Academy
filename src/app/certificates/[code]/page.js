import { sql } from '@/lib/db';
import { ensureClassroomTables } from '@/lib/classroom';
import { ArkcovCrest } from '@/components/BrandMark';
import PrintButton from './PrintButton';
import s from './cert.module.css';

export const dynamic = 'force-dynamic';

async function load(code) {
  await ensureClassroomTables();
  const [c] = await sql`SELECT c.*, u.name, p.title AS program_title, p.building, p.room
    FROM certificates c JOIN users u ON u.id = c.user_id JOIN programs p ON p.id = c.program_id
    WHERE c.code = ${String(code).toUpperCase().slice(0, 24)}`;
  return c || null;
}

export async function generateMetadata({ params }) {
  const c = await load(params.code);
  return { title: c ? `${c.name} · Certificate of Performance · Arkcov Academy` : 'Certificate not found · Arkcov Academy' };
}

export default async function Certificate({ params }) {
  const c = await load(params.code);
  if (!c) {
    return <main className={s.page}><div className={s.missing}><h1>Certificate not found</h1><p>Check the code and try again.</p></div></main>;
  }
  const date = new Date(c.issued_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  return (
    <main className={s.page}>
      <div className={s.tools}><PrintButton /></div>
      <article className={s.cert} aria-label="Certificate of Performance">
        <svg className={s.arches} viewBox="0 0 600 300" aria-hidden="true">
          <path d="M40 300 V170 A260 160 0 0 1 560 170 V300" />
          <path d="M90 300 V180 A210 128 0 0 1 510 180 V300" />
          <path d="M140 300 V190 A160 98 0 0 1 460 190 V300" />
        </svg>
        <div className={s.inner}>
          <ArkcovCrest size={92} />
          <p className={s.academy}>Arkcov Academy</p>
          <h1 className={s.kind}>Certificate of Performance</h1>
          <p className={s.pre}>This certifies that</p>
          <p className={s.name}>{c.name}</p>
          <p className={s.body}>has completed the <b>{c.program_title}</b> in the {c.room} of the {c.building}, demonstrating the knowledge, character and compassion of a future healer.</p>
          <div className={s.score}>
            <span>Performance score</span>
            <strong>{c.score}</strong>
            {c.honors && <em>{c.honors}</em>}
          </div>
          <div className={s.sign}>
            <div><span className={s.line} /><b>Dr. Gerard D. Hills, M.D.</b><small>Founder and Dean, Arkcov Academy</small></div>
            <div><span className={s.dateText}>{date}</span><span className={s.line} /><small>Date awarded</small></div>
          </div>
          <p className={s.verify}>Verify at arkcovacademy.com/certificates/{c.code} · Code {c.code}</p>
        </div>
      </article>
    </main>
  );
}
