'use client';

import Link from 'next/link';
import styles from './LandingPage.module.css';
import Icon from './Icon';
import { ArkcovMark, ArkcovLockup, ArkcovCrest } from './BrandMark';

// ---------- Content (edit copy here without touching layout) ----------

const PATHS = [
  {
    icon: 'family',
    title: 'Young explorers & families',
    image: '/images/paths/families.jpg',
    alt: 'A family learning about the heart together at the kitchen table, the children in Arkcov Academy sweaters',
    who: 'Ages 7 and up, learning together',
    text: 'Animated shorts, games and stories that make the human body an adventure you share at home.',
    links: [{ label: 'Browse the library', href: '#explore' }, { label: 'Family plan', href: '#join' }],
  },
  {
    icon: 'shield',
    title: 'Cadets',
    image: '/images/paths/cadets.jpg',
    alt: 'Arkcov Academy cadets in uniform working with a microscope and a training mannequin in the science lab',
    who: 'Middle and high school students',
    text: 'Structured courses, progress tracking and certificates for students who are curious about science and medicine.',
    links: [{ label: 'Discover your superpower', href: '/superpower' }, { label: 'Inspiring Healers', href: '/inspiring-healers' }],
  },
  {
    icon: 'stethoscope',
    title: 'Future healers',
    image: '/images/paths/future-healers.jpg',
    alt: 'Two Arkcov Academy alumni at college graduation, wearing stoles from the University of Pennsylvania and Spelman College with the Arkcov Academy crest',
    who: 'College, pre-med and health-science students',
    text: 'Mentorship, scholarship opportunities and the encouragement to keep going on the road into medicine.',
    links: [{ label: 'Scholars Foundation', href: '#programs' }, { label: 'Join the Academy', href: '/signup' }],
  },
  {
    icon: 'school',
    title: 'Educators & partners',
    image: '/images/paths/educators.jpg',
    alt: 'A teacher and a community health worker leading Arkcov Academy cadets in a lesson about the heart',
    who: 'Schools, churches, clinics and community groups',
    text: 'Bring Arkcov stories, games and curriculum to your classroom or community.',
    links: [{ label: 'About the Academy', href: '#about' }, { label: 'Create a free account', href: '/signup' }],
  },
];

const CONTENT_TYPES = [
  { icon: 'book', label: 'Courses', type: 'course' },
  { icon: 'mic', label: 'Podcasts', type: 'podcast' },
  { icon: 'film', label: 'Movies', type: 'movie' },
  { icon: 'tv', label: 'TV shows', type: 'tv_show' },
  { icon: 'sparkle', label: 'Animated shorts', type: 'animated_short' },
  { icon: 'game', label: 'Interactive games', type: 'interactive_game' },
];

const VIDEOS = [
  { src: '/videos/arkcov_welcome.mp4', poster: '/images/posters/arkcov-welcome.jpg', tag: 'Featured', title: 'Welcome to Arkcov Academy', text: 'Where young minds discover the art of medicine, and curiosity becomes a calling.' },
  { src: '/videos/arkcov_bodyworld.mp4', poster: '/images/posters/arkcov-bodyworld.jpg', tag: 'Virtual campus', title: 'BodyWorld: Your Virtual Campus', text: 'Explore real medicine from inside the human body. Study together, run labs and prepare for college.', href: '/campus' },
  { src: '/videos/arkcov-academy-ep1.mp4', poster: '/images/posters/arkcov-academy-ep1.jpg', badge: 'New episode', tag: 'TV series · Mission 001', title: 'Arkcov Academy: The TV Show', text: 'Episode 1, \u201cA Mystery in the Blood.\u201d Nazareth and the cadets solve Isaiah\u2019s case, and you answer along with them.', href: '/explore?type=tv_show', linkLabel: 'Watch in TV Shows' },
];

const PILLARS = [
  { word: 'Train', text: 'Learn how the body works through courses, films and games.' },
  { word: 'Heal', text: 'Understand health and illness, and how care really happens.' },
  { word: 'Discover', text: 'Explore science, technology, engineering, arts and medicine.' },
  { word: 'Inspire', text: 'See yourself as a healer, and lift others up with you.' },
];

const STEPS = [
  { n: 'I', title: 'Enlist', text: 'Create a free account and choose what you want to learn first.' },
  { n: 'II', title: 'Train', text: 'Work through courses and media at your own pace. Your progress is saved on your dashboard.' },
  { n: 'III', title: 'Earn', text: 'Members complete courses for certificates and badges, and unlock mentorship and scholarship tools.' },
];

const GEAR = [
  { icon: 'journal', title: 'Medicine Bullet Journal', text: "The cadet's field journal for learning, reflection and rounds. Digital PDF available now; printed edition coming soon.", status: 'Available now', href: '/store', cta: 'Shop the journal' },
  { icon: 'game', title: 'Warriors Thrive', text: 'The cooperative sickle cell board game for 2 to 8 Warriors, ages 7 and up.', status: 'Available now', href: 'https://playwarriorsthrive.com', external: true, cta: 'Visit playwarriorsthrive.com' },
  { icon: 'shield', title: 'Cadet apparel & accessories', text: 'Hoodies, tees, hats, sneakers and bags with the Academy crest.', status: 'Available now', href: '/store', cta: 'Shop cadet gear' },
];

const TIERS = [
  { name: 'Free', price: '$0', desc: 'Explore and get started', features: ['Content previews', 'Newsletter & updates', 'Scholarship hub (basic)', 'Store access'], cta: 'Sign up free', btn: 'btn-outline' },
  { name: 'Member', price: '$9', per: '/mo', desc: 'Full access to everything', features: ['Full library access', 'Interactive games', 'Certificates & badges', 'Scholarship tools', 'Member store discounts'], cta: 'Become a member', btn: 'btn-crimson', featured: true },
  { name: 'Family', price: '$14', per: '/mo', desc: 'For families learning together', features: ['Everything in Member', 'Up to 5 profiles', 'Parental controls', 'Priority registration', 'Family bundles'], cta: 'Start family plan', btn: 'btn-navy' },
];

// ---------- Page ----------

export default function LandingPage() {
  const year = new Date().getFullYear();

  return (
    <main className={styles.landing} id="main">
      {/* ===== HERO ===== */}
      <section className={styles.hero} id="home" aria-labelledby="hero-title">
        <div className={styles.heroGlow} aria-hidden="true" />
        <div className={`${styles.container} ${styles.heroGrid}`}>
          <div className={styles.heroText}>
            <p className={styles.eyebrowLight}><span className={styles.pulseDot} aria-hidden="true" /> Arkcov Academy · Now enrolling</p>
            <h1 id="hero-title" className={styles.heroTitle}>
              Your mission <em>begins</em> <span className="text-gold">here.</span>
            </h1>
            <p className={styles.motto}>Train · Heal · Discover · Inspire</p>
            <p className={styles.heroDesc}>
              Arkcov Academy trains middle and high school students the way medical school trains doctors.
              Built by physicians, it gives cadets a years-long head start on the science, clinical reasoning and
              character that medical school, nursing school and every healthcare career demand.
            </p>
            <ul className={styles.heroPoints}>
              <li>Solve real patient cases, from first symptom to diagnosis</li>
              <li>Learn the body the way doctors do, with anatomy, physiology and disease connected</li>
              <li>Get mentored by working healers, from first lesson to college application</li>
            </ul>
            <div className={styles.heroBtns}>
              <Link href="/signup" className="btn btn-crimson btn-lg">Join the Academy</Link>
              <Link href="#paths" className="btn btn-ghost btn-lg">Find your path</Link>
            </div>
            <ul className={styles.stats}>
              <li><strong>Grade 6</strong><span>start years ahead</span></li>
              <li><strong>Physician-led</strong><span>built by doctors</span></li>
              <li><strong>Free</strong><span>to start</span></li>
            </ul>
          </div>

          <div className={styles.heroVisual}>
            <div className={styles.archFrame}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/cadets_fall.jpg" alt="Arkcov Academy cadets in fall collegiate wear (crimson, navy and cream knits, blazers and tweeds with the Arkcov crest) on the Academy steps" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className={styles.archAlt} src="/images/cadets_summer.jpg" alt="Arkcov Academy cadets in summer collegiate wear (cream linen, crimson and navy polos with the Arkcov crest) on the Academy steps" />
            </div>
            <div className={styles.heroCrest}><ArkcovCrest size={150} /></div>
          </div>
        </div>
      </section>

      {/* ===== FEATURED COMMERCIAL ===== */}
      <section className={styles.featureSection} id="watch" aria-labelledby="watch-title">
        <div className={`${styles.container} ${styles.featureGrid}`}>
          <div className={styles.featureVideo}>
            <video src="/videos/cadets_commercial.mp4" poster="/images/posters/cadets-commercial.jpg" controls playsInline preload="metadata"
              aria-describedby="watch-desc">
              <track kind="captions" src="/videos/cadets_commercial.vtt" srcLang="en" label="English" />
            </video>
          </div>
          <div>
            <p className={styles.eyebrow}>Now enrolling · Middle and high school</p>
            <h2 id="watch-title" className={styles.sectionTitle}>Cadets come here to study medicine</h2>
            <p id="watch-desc" className={styles.sectionSub}>
              Arkcov Academy is a channel, a brand and a real program. Cadets train in real medicine with physician mentors,
              hands-on labs and stories that bring science to life.
            </p>
            <div className={styles.featureBtns}>
              <Link href="/superpower" className="btn btn-crimson">Discover your superpower</Link>
              <Link href="/inspiring-healers" className="btn btn-outline">Inspiring Healers Program</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FIND YOUR PATH ===== */}
      <section className={styles.section} id="paths" aria-labelledby="paths-title">
        <div className={styles.container}>
          <div className={styles.head}>
            <p className={styles.eyebrow}>Every learner has a place here</p>
            <h2 id="paths-title" className={styles.sectionTitle}>Find your path</h2>
            <p className={styles.sectionSub}>Start where you are. Each path points to the parts of the Academy built for you.</p>
          </div>
          <div className={styles.pathsGrid}>
            {PATHS.map((p) => (
              <article key={p.title} className={styles.pathCard}>
                {p.image && (
                  <div className={styles.pathMedia}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.image} alt={p.alt} loading="lazy" />
                  </div>
                )}
                <div className={`${styles.pathIcon} ${p.image ? styles.pathIconOn : ''}`}><Icon name={p.icon} size={24} /></div>
                <h3>{p.title}</h3>
                <p className={styles.pathWho}>{p.who}</p>
                <p>{p.text}</p>
                <ul className={styles.pathLinks}>
                  {p.links.map((l) => (
                    <li key={l.label}><Link href={l.href}>{l.label} <Icon name="arrow" size={16} /></Link></li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===== LIBRARY ===== */}
      <section className={`${styles.section} ${styles.sectionWhite}`} id="explore" aria-labelledby="explore-title">
        <div className={styles.container}>
          <div className={styles.head}>
            <p className={styles.eyebrow}>The library</p>
            <h2 id="explore-title" className={styles.sectionTitle}>Courses. Podcasts. Movies. Games.<br />All in one place.</h2>
            <p className={styles.sectionSub}>From animated series to interactive medical games, complex health science made clear and exciting.</p>
          </div>
          <ul className={styles.typeChips} aria-label="Ways to learn">
            {CONTENT_TYPES.map((t) => (
              <li key={t.type}><Link href={`/explore?type=${t.type}`}><Icon name={t.icon} size={18} /> {t.label}</Link></li>
            ))}
          </ul>
          <div className={styles.contentGrid}>
            {VIDEOS.map((v) => (
              <article key={v.title} className={styles.contentCard}>
                <div className={styles.cardMedia}>
                  {v.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={v.image} alt={`${v.title} artwork`} loading="lazy" />
                  ) : (
                    <video src={v.src} poster={v.poster} controls playsInline preload="metadata" aria-label={`${v.title} trailer`} />
                  )}
                  {v.soon && <span className={styles.soonBadge}>Coming soon</span>}
                  {v.badge && <span className={`${styles.soonBadge} ${styles.newBadge}`}>{v.badge}</span>}
                </div>
                <div className={styles.cardBody}>
                  <span className={styles.cardTag}>{v.tag}</span>
                  <h3>{v.title}</h3>
                  <p>{v.text}</p>
                  {v.href && <a href={v.href} className={styles.cardLink}>{v.linkLabel || 'Tour the virtual campus'}</a>}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CADET TRAINING ===== */}
      <section className={`${styles.section} ${styles.sectionNavy}`} id="training" aria-labelledby="training-title">
        <div className={styles.container}>
          <div className={styles.trainingGrid}>
            <div>
              <p className={styles.eyebrowLight}>Cadet training</p>
              <h2 id="training-title" className={styles.sectionTitleLight}>How the Academy works</h2>
              <p className={styles.sectionSubLight}>Learning that feels like a mission, with a clear path from first lesson to certificate.</p>
              <ol className={styles.steps}>
                {STEPS.map((s) => (
                  <li key={s.title}>
                    <span className={styles.stepNum} aria-hidden="true">{s.n}</span>
                    <div><h3>{s.title}</h3><p>{s.text}</p></div>
                  </li>
                ))}
              </ol>
              <Link href="/signup" className="btn btn-gold btn-lg">Enlist free</Link>
            </div>
            <div className={styles.pillars}>
              {PILLARS.map((p) => (
                <div key={p.word} className={styles.pillar}>
                  <h3>{p.word}</h3>
                  <p>{p.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== PROGRAMS ===== */}
      <section className={styles.section} id="programs" aria-labelledby="programs-title">
        <div className={styles.container}>
          <div className={styles.head}>
            <p className={styles.eyebrow}>Empowerment programs</p>
            <h2 id="programs-title" className={styles.sectionTitle}>Real pathways to healing careers</h2>
          </div>
          <div className={styles.programsGrid}>
            <article className={styles.programCard}>
              <div className={styles.programIcon}><Icon name="stethoscope" size={28} /></div>
              <h3>Inspiring Healers Program</h3>
              <p>A four-week journey through every body system, CPR, growth mindset and the history of medicine, for middle and high school cadets who dream of healing.</p>
              <Link href="/inspiring-healers" className="btn btn-crimson btn-sm">Explore the program</Link>
            </article>
            <article className={`${styles.programCard} ${styles.programGold}`}>
              <div className={styles.programIcon}><Icon name="sparkle" size={28} /></div>
              <h3>Social Superpower Assessment</h3>
              <p>Every cadet starts here. Twenty-five questions reveal whether you are a Connector, Protector, Overcomer, Artisan, Vanguard, Innovator or Healer.</p>
              <Link href="/superpower" className="btn btn-navy btn-sm">Discover your superpower</Link>
            </article>
            <article className={`${styles.programCard} ${styles.programDark}`}>
              <div className={styles.programIcon}><Icon name="cap" size={28} /></div>
              <h3>Arkcov Scholars Foundation</h3>
              <p>A curated hub connecting aspiring healers with scholarships and funding, from high school through medical school.</p>
              <Link href="/signup" className="btn btn-gold btn-sm">Explore scholarships</Link>
            </article>
          </div>
        </div>
      </section>

      {/* ===== STORE ===== */}
      <section className={`${styles.section} ${styles.sectionWhite}`} id="store" aria-labelledby="store-title">
        <div className={styles.container}>
          <div className={styles.head}>
            <p className={styles.eyebrow}>Cadet gear</p>
            <h2 id="store-title" className={styles.sectionTitle}>The Academy store</h2>
            <p className={styles.sectionSub}>Tools and gear for the journey. Members save on every order.</p>
          </div>
          <div className={styles.gearGrid}>
            {GEAR.map((g) => (
              <article key={g.title} className={styles.gearCard}>
                <div className={styles.gearIcon}><Icon name={g.icon} size={30} /></div>
                <span className={g.href ? styles.badgeLive : styles.badgeSoon}>{g.status}</span>
                <h3>{g.title}</h3>
                <p>{g.text}</p>
                {g.href ? (
                  g.external ? (
                    <a href={g.href} className={styles.gearLink} target="_blank" rel="noopener noreferrer">{g.cta} <Icon name="arrow" size={16} /></a>
                  ) : (
                    <Link href={g.href} className={styles.gearLink}>{g.cta} <Icon name="arrow" size={16} /></Link>
                  )
                ) : (
                  <Link href="/signup" className={styles.gearLink}>Get notified <Icon name="arrow" size={16} /></Link>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ABOUT ===== */}
      <section className={`${styles.section} ${styles.sectionParchment}`} id="about" aria-labelledby="about-title">
        <div className={styles.container}>
          <div className={styles.aboutGrid}>
            <div className={styles.aboutPortrait}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/dr_hills.png" alt="Dr. Gerard D. Hills, founder of Arkcov" />
            </div>
            <div>
              <p className={styles.eyebrow}>A house of Arkcov Enterprises</p>
              <h2 id="about-title" className={styles.sectionTitle}>Fearfully and wonderfully made</h2>
              <p className={styles.aboutText}>
                Arkcov takes its name from the Ark of the Covenant, the sign that God keeps His promises. Arkcov Academy
                exists to help every learner see the glory in their own human design, by re-presenting medicine as art
                through powerful stories and experiences.
              </p>
              <p className={styles.aboutText}>
                The Academy was founded by Dr. Gerard D. Hills, a pediatric hematologist/oncologist and clinical
                informaticist, to build the most diverse generation of healers, especially young people who rarely see
                themselves in medicine.
              </p>
              <blockquote className={styles.verse}>
                “I will praise thee; for I am fearfully and wonderfully made.”
                <cite>Psalm 139:14</cite>
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* ===== MEMBERSHIP ===== */}
      <section className={styles.section} id="join" aria-labelledby="join-title">
        <div className={styles.container}>
          <div className={`${styles.head} ${styles.center}`}>
            <p className={styles.eyebrow}>Membership</p>
            <h2 id="join-title" className={styles.sectionTitle}>Join Arkcov Academy</h2>
            <p className={styles.sectionSub}>Start free. Upgrade any time for the full library, games and certificates.</p>
          </div>
          <div className={styles.tiersGrid}>
            {TIERS.map((t) => (
              <article key={t.name} className={`${styles.tierCard} ${t.featured ? styles.featured : ''}`}>
                {t.featured && <div className={styles.tierBadge}>Most popular</div>}
                <h3 className={styles.tierName}>{t.name}</h3>
                <div className={styles.tierPrice}>{t.price}{t.per && <span>{t.per}</span>}</div>
                <p className={styles.tierDesc}>{t.desc}</p>
                <ul className={styles.tierFeatures}>
                  {t.features.map((f) => <li key={f}><Icon name="check" size={16} /> {f}</li>)}
                </ul>
                <Link href="/signup" className={`btn ${t.btn} btn-full`}>{t.cta}</Link>
              </article>
            ))}
          </div>
          <p className={styles.compare}><Link href="/pricing">Compare plans in detail</Link></p>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className={styles.footer}>
        <div className={styles.container}>
          <div className={styles.footerGrid}>
            <div>
              <ArkcovLockup size={44} onDark />
              <p className={styles.footerTag}>Medicine, re-presented as art. Building the most diverse generation of healers.</p>
            </div>
            <nav className={styles.footerCol} aria-label="Learn">
              <h4>Learn</h4>
              <Link href="/explore">Library</Link>
              <Link href="#training">Cadet training</Link>
              <Link href="#join">Membership</Link>
            </nav>
            <nav className={styles.footerCol} aria-label="Programs">
              <h4>Programs</h4>
              <Link href="/inspiring-healers">Inspiring Healers</Link>
              <Link href="/superpower">Social Superpower</Link>
              <Link href="#programs">Scholars Foundation</Link>
              <Link href="/store">Store</Link>
            </nav>
            <nav className={styles.footerCol} aria-label="Arkcov">
              <h4>Arkcov</h4>
              <Link href="#about">About</Link>
              <a href="https://playwarriorsthrive.com" target="_blank" rel="noopener noreferrer">Warriors Thrive</a>
              <Link href="/login">Cadet log in</Link>
            </nav>
          </div>
          <div className={styles.footerBottom}>
            <ArkcovMark size={22} tone="gold" title="" />
            <p>© {year} Arkcov Enterprises, LLC. All rights reserved. Created by Dr. Gerard D. Hills, M.D.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
