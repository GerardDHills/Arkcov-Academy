import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Icon from '@/components/Icon';
import { ArkcovCrest } from '@/components/BrandMark';
import styles from './healers.module.css';

export const metadata = {
  title: 'Inspiring Healers Program — Arkcov Academy',
  description: 'A four-week Arkcov Academy program by Dr. Gerard D. Hills that helps middle and high school cadets discover their Social Superpower, learn every body system, earn CPR skills and see themselves as future healers.',
};

// Source: "Inspiring Healers Program Curriculum", Gerard D. Hills, M.D. (course summary)
const OBJECTIVES = [
  { icon: 'sparkle', title: 'Social Superpowers', text: 'Learn the seven Social Superpowers and identify the ones you already carry.' },
  { icon: 'book', title: 'History of medicine', text: 'Explore a brief history of medicine from an Afrocentric lens, from ancient Egypt to pioneering Black American physicians.' },
  { icon: 'heart', title: 'Every body system', text: 'Learn the names and jobs of each body system, with the biology, math and physics behind health.' },
  { icon: 'shield', title: 'CPR', text: 'Practice CPR until you can do it with confidence, and show it at graduation.' },
  { icon: 'bolt', title: 'Growth mindset', text: 'Know the difference between a growth mindset and a fixed one, and choose growth.' },
  { icon: 'compass', title: 'Self-awareness', text: 'Use practical tools for self-awareness, self-direction and self-reflection.' },
  { icon: 'cap', title: 'Academic self-concept', text: 'Learn what academic self-concept is, how to tell when it is broken, and how to rebuild it.' },
  { icon: 'chart', title: 'Meta-learning', text: 'Learn how you learn, and use those tools to study smarter for the rest of your life.' },
];

const SYSTEMS = ['Nervous', 'Integumentary (skin)', 'Gastrointestinal', 'Cardiovascular', 'Renal', 'Reproductive', 'Musculoskeletal', 'Hematology (blood)', 'Immune', 'Lymphatic'];

const WEEKS = [
  { n: 'Week 1', theme: 'Who you are', items: ['Room rules and introductions', 'Program overview and the "Cool 2 Be Smart" song', 'Growth mindset activity', 'Academic self-concept activity', 'Social Superpower assessment', 'Self-awareness tools'] },
  { n: 'Week 2', theme: 'How you learn and how life works', items: ['Meta-learning', 'Cell Blocks activity', 'Cardiovascular: the heart', 'Reproductive system', 'Gastrointestinal system', 'CPR training'] },
  { n: 'Week 3', theme: 'The body in action', items: ['Nervous system: the brain', 'Renal and lymphatic systems', 'Immune system and skin', 'Muscles and bones', 'Blood: emergency medicine activity', 'CPR training'] },
  { n: 'Week 4', theme: 'Becoming a healer', items: ['Family activity and the official program handshake', 'Dance-off (answer a question correctly to dance)', 'Course overview quiz', 'CPR practice', 'Graduation practice', 'Graduation and CPR show'] },
];

const THREADS = ['Team building', 'Altruism', 'Compassion', 'Understanding societal constructs', 'Egyptian medical history and prominent Black American physicians'];

const STUDY = ['Distributed practice, not cramming', 'Repetition with the intent to remember', 'Visual, auditory and hands-on learning', 'Mental rehearsal', 'A positive attitude toward the subject', 'Building a study schedule', 'Pre-reading, note review and self-testing', 'Test-taking skills and calming test anxiety'];

export default function InspiringHealersPage() {
  return (
    <>
      <Navbar />
      <main id="main" className={styles.page}>
        <section className={styles.hero} aria-labelledby="ihp-title">
          <div className={styles.heroGlow} aria-hidden="true" />
          <div className={`${styles.container} ${styles.heroGrid}`}>
            <div>
              <p className={styles.eyebrowLight}>An Arkcov Academy program · Middle and high school</p>
              <h1 id="ihp-title" className={styles.heroTitle}>Inspiring <em>Healers</em> Program</h1>
              <p className={styles.heroDesc}>
                A four-week journey where cadets discover their Social Superpower, learn how every system of the human body
                works, earn real CPR skills, and leave seeing themselves as future doctors, nurses, scientists and healers.
              </p>
              <div className={styles.heroBtns}>
                <Link href="/superpower" className="btn btn-gold btn-lg">Discover your superpower</Link>
                <Link href="/signup" className="btn btn-ghost btn-lg">Enlist in the Academy</Link>
              </div>
            </div>
            <div className={styles.heroCrest}><ArkcovCrest size={240} /></div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.parchment}`} aria-labelledby="why-title">
          <div className={`${styles.container} ${styles.why}`}>
            <div>
              <p className={styles.eyebrow}>Why it exists</p>
              <h2 id="why-title" className={styles.sectionTitle}>Built from one doctor&apos;s story</h2>
            </div>
            <div className={styles.whyText}>
              <p>
                In Dr. Gerard D. Hills&apos; medical school class of 150 students, only two were Black American men, and he was one
                of them. He learned that this was not unusual. Black physicians remain far fewer than the communities they
                serve, and young Black men in particular rarely apply to medical school.
              </p>
              <p>
                Educator Dr. Jawanza Kunjufu&apos;s decades of work suggest that many Black boys begin losing interest in school as
                early as fourth grade, when they lack role models, hands-on teaching, high expectations and teachers who
                understand them. The Inspiring Healers Program was built to give young people all of those things, and it
                welcomes every cadet who dreams of healing.
              </p>
              <p className={styles.motto}>Because it&apos;s cool to be smart.</p>
            </div>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="learn-title">
          <div className={styles.container}>
            <div className={styles.head}>
              <p className={styles.eyebrow}>What cadets learn</p>
              <h2 id="learn-title" className={styles.sectionTitle}>Mind, body and purpose</h2>
            </div>
            <div className={styles.objGrid}>
              {OBJECTIVES.map((o) => (
                <article key={o.title} className={styles.obj}>
                  <div className={styles.objIcon}><Icon name={o.icon} size={22} /></div>
                  <h3>{o.title}</h3>
                  <p>{o.text}</p>
                </article>
              ))}
            </div>
            <div className={styles.systems}>
              <p className={styles.systemsLabel}>Body systems covered</p>
              <ul>{SYSTEMS.map((s) => <li key={s}>{s}</li>)}</ul>
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.navy}`} aria-labelledby="curr-title">
          <div className={styles.container}>
            <div className={styles.head}>
              <p className={styles.eyebrowLight}>The curriculum</p>
              <h2 id="curr-title" className={styles.sectionTitleLight}>Four weeks to a healer&apos;s mindset</h2>
            </div>
            <ol className={styles.weeks}>
              {WEEKS.map((w) => (
                <li key={w.n} className={styles.week}>
                  <p className={styles.weekNum}>{w.n}</p>
                  <h3>{w.theme}</h3>
                  <ul>{w.items.map((i) => <li key={i}>{i}</li>)}</ul>
                </li>
              ))}
            </ol>
            <div className={styles.threads}>
              <p>Woven through every session</p>
              <ul>{THREADS.map((t) => <li key={t}>{t}</li>)}</ul>
            </div>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="sp-title">
          <div className={`${styles.container} ${styles.spBand}`}>
            <div>
              <p className={styles.eyebrow}>Week 1 starts here</p>
              <h2 id="sp-title" className={styles.sectionTitle}>Every healer has a Social Superpower</h2>
              <p className={styles.body}>
                Communication, Courage, Grit, Craftsmanship, Leadership, Spark and Compassion. Dr. Hills created the Social
                Superpower assessment for this program so each cadet starts by naming the strength they already bring to
                medicine. Take it now and find out if you are a Connector, a Protector, an Overcomer, an Artisan, a Vanguard,
                an Innovator or a Healer.
              </p>
            </div>
            <Link href="/superpower" className="btn btn-crimson btn-lg">Take the assessment</Link>
          </div>
        </section>

        <section className={`${styles.section} ${styles.white}`} aria-labelledby="study-title">
          <div className={`${styles.container} ${styles.twoCol}`}>
            <div>
              <p className={styles.eyebrow}>Learning how to learn</p>
              <h2 id="study-title" className={styles.sectionTitle}>Study tools for life</h2>
              <p className={styles.body}>
                Cadets leave with a toolkit for every class they will ever take, plus the IHP Daily Planner, which helps them
                turn big goals into one clear task each day.
              </p>
            </div>
            <ul className={styles.check}>
              {STUDY.map((s) => <li key={s}><Icon name="check" size={18} /> {s}</li>)}
            </ul>
          </div>
        </section>

        <section className={`${styles.section} ${styles.navy}`} aria-labelledby="grad-title">
          <div className={`${styles.container} ${styles.center}`}>
            <p className={styles.eyebrowLight}>Graduation</p>
            <h2 id="grad-title" className={styles.sectionTitleLight}>Families, a CPR show and the IHP Oath</h2>
            <p className={styles.bodyLight}>
              The program ends with a graduation where cadets demonstrate CPR for their families, recite the program oath,
              and celebrate with the official Inspiring Healers handshake.
            </p>
            <div className={styles.heroBtns} style={{ justifyContent: 'center' }}>
              <Link href="/signup" className="btn btn-gold btn-lg">Enlist in the Academy</Link>
              <Link href="/#paths" className="btn btn-ghost btn-lg">Educators and partners</Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
