import Link from 'next/link';
import { ATLAS_SYSTEMS } from '@/lib/atlas/blood';
import s from '@/components/atlas/atlas.module.css';

export const metadata = { title: 'Atlas of the Human Body | Arkcov Academy' };

const PILLARS = [
  ['Anatomy', 'Where it is and what it’s built from.'],
  ['Physiology', 'How it works when it’s healthy.'],
  ['Histology', 'What it looks like under the microscope.'],
  ['Pathology', 'What breaks, and the chain of events that follows.'],
  ['Clinical', 'What the patient feels and what healers find.'],
];

export default function AtlasHome() {
  return (
    <div className={s.page}>
      <div className={`${s.wrap} ${s.top}`}>
        <p className={s.eyebrow}>Arkcov Atlas</p>
        <h1 className={s.title}>The human body, <em>connected</em></h1>
        <p className={s.lede}>Most textbooks teach anatomy, physiology, histology and disease in separate chapters. Healers have to stitch them together at the bedside. The Arkcov Atlas does it for you: every structure is shown in all five layers at once, so you can trace a symptom back to its cause and build the mental model that makes diagnosis possible.</p>
        <div className={s.pillars}>
          {PILLARS.map(([b, p]) => <div key={b}><b>{b}</b><p>{p}</p></div>)}
        </div>
      </div>
      <div className={s.wrap}>
        <h2 className={s.h2}><small>Body systems</small>Choose a system</h2>
        <div className={s.systems}>
          {ATLAS_SYSTEMS.map((x) => x.ready ? (
            <Link key={x.slug} href={`/atlas/${x.slug}`} className={`${s.sys} ${s.sysReady}`}><b>{x.name}</b><span>Open the atlas →</span></Link>
          ) : (
            <div key={x.slug} className={`${s.sys} ${s.sysSoon}`}><b>{x.name}</b><span>Coming soon</span></div>
          ))}
        </div>
      </div>
    </div>
  );
}
