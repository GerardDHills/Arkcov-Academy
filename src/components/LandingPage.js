'use client';

import Link from 'next/link';
import styles from './LandingPage.module.css';

export default function LandingPage() {
  return (
    <div className={styles.landing}>
      {/* Hero */}
      <section className={styles.hero} id="home">
        <div className={styles.bgShapes}>
          <div className={styles.shape1} />
          <div className={styles.shape2} />
          <div className={styles.shape3} />
        </div>
        <div className={styles.heroGrid}>
          <div className={styles.heroText}>
            <div className={styles.eyebrow}><div className={styles.pulseDot} /> Now Enrolling</div>
            <h1 className={styles.heroTitle}>
              Medical Entertainment That Builds <span className={styles.highlight}>Health Literacy</span>
            </h1>
            <p className={styles.heroDesc}>
              Streaming. Courses. Games. Mentorship. Scholarships. Arkcov Academy re-presents medicine as art — because <strong>it&apos;s cool to be smart.</strong>
            </p>
            <div className={styles.heroBtns}>
              <Link href="/signup" className="btn btn-crimson btn-lg">🚀 Join the Academy</Link>
              <Link href="#explore" className="btn btn-outline btn-lg">▶ Explore Content</Link>
            </div>
            <div className={styles.stats}>
              <div className={styles.stat}>
                <div className={styles.statVal}>6+</div>
                <div className={styles.statLabel}>Content Types</div>
              </div>
              <div className={styles.stat}>
                <div className={styles.statVal}>All Ages</div>
                <div className={styles.statLabel}>Kids to Adults</div>
              </div>
              <div className={styles.stat}>
                <div className={styles.statVal}>STEM</div>
                <div className={styles.statLabel}>Education + Fun</div>
              </div>
            </div>
          </div>
          <div className={styles.heroVisual}>
            <div className={styles.floatCard} style={{ top: '15%', left: '-20px' }}>
              <span className={styles.floatIcon}>🩺</span> Inspiring Healers
            </div>
            <div className={styles.floatCard} style={{ bottom: '15%', right: '-15px', animationDelay: '2s' }}>
              <span className={styles.floatIcon}>🎓</span> Scholarship Hub
            </div>
            <div className={styles.visualCard}>
              <img src="/images/students.png" alt="Arkcov Academy Students" />
            </div>
          </div>
        </div>
      </section>

      {/* Explore Preview */}
      <section className={styles.section} id="explore" style={{ background: 'var(--warm-white)' }}>
        <div className={styles.container}>
          <div className={styles.sectionEyebrow}>📺 Explore the Library</div>
          <h2 className={styles.sectionTitle}>Courses. Podcasts. Movies.<br/>Games. All in One Place.</h2>
          <p className={styles.sectionSub}>From animated series to interactive medical games — complex health science made accessible and exciting for everyone.</p>
          <div className={styles.contentGrid}>
            <div className={styles.contentCard}>
              <div className={styles.cardMedia}><video src="/videos/arkcov_commercial.mp4" muted preload="metadata" /><div className={styles.playOverlay}><div className={styles.playBtn}>▶</div></div></div>
              <div className={styles.cardBody}><span className={styles.cardTag}>Featured</span><h3>Welcome to Arkcov Academy</h3><p>The world&apos;s first medical entertainment platform designed to inspire the next generation of healers.</p></div>
            </div>
            <div className={styles.contentCard}>
              <div className={styles.cardMedia}><video src="/videos/healthworld_commercial.mp4" muted preload="metadata" /><div className={styles.playOverlay}><div className={styles.playBtn}>▶</div></div></div>
              <div className={styles.cardBody}><span className={styles.cardTag}>Series</span><h3>HealthWorld Academy</h3><p>Immersive medical education that brings health science to life through compelling storytelling.</p></div>
            </div>
            <div className={styles.contentCard}>
              <div className={styles.cardMedia}><video src="/videos/characters_glow.mp4" muted preload="metadata" /><div className={styles.playOverlay}><div className={styles.playBtn}>▶</div></div></div>
              <div className={styles.cardBody}><span className={styles.cardTag}>Animated Short</span><h3>Characters Come to Life</h3><p>Watch the Warriors Thrive characters leap off the board into a world of adventure and healing.</p></div>
            </div>
          </div>
        </div>
      </section>

      {/* Programs */}
      <section className={styles.section} id="programs">
        <div className={styles.container}>
          <div className={styles.sectionEyebrow}>🌟 Empowerment Programs</div>
          <h2 className={styles.sectionTitle}>Beyond Streaming. Real Pathways to Healing Careers.</h2>
          <div className={styles.programsGrid}>
            <div className={`${styles.programCard} ${styles.healers}`}>
              <div className={styles.programIcon}>🩺</div>
              <h3>Inspiring Healers Program</h3>
              <p>A hands-on mentorship and enrichment program for families and young people who dream of careers in medicine and health sciences.</p>
              <Link href="/signup" className="btn btn-crimson btn-sm">Learn More</Link>
            </div>
            <div className={`${styles.programCard} ${styles.scholars}`}>
              <div className={styles.programIcon}>🎓</div>
              <h3>Arkcov Scholars Foundation</h3>
              <p>A curated scholarship hub connecting aspiring healers with funding opportunities from high school through medical school.</p>
              <Link href="/signup" className="btn btn-navy btn-sm">Explore Scholarships</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Join / Pricing */}
      <section className={styles.section} id="join" style={{ background: 'var(--warm-white)' }}>
        <div className={styles.container}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div className={styles.sectionEyebrow} style={{ justifyContent: 'center' }}>🔑 Membership</div>
            <h2 className={styles.sectionTitle} style={{ textAlign: 'center' }}>Join Arkcov Academy</h2>
          </div>
          <div className={styles.tiersGrid}>
            <div className={styles.tierCard}>
              <div className={styles.tierName}>Free</div>
              <div className={styles.tierPrice}>$0</div>
              <div className={styles.tierDesc}>Explore and get started</div>
              <Link href="/signup" className="btn btn-outline btn-full">Sign Up Free</Link>
            </div>
            <div className={`${styles.tierCard} ${styles.featured}`}>
              <div className={styles.tierBadge}>Most Popular</div>
              <div className={styles.tierName}>Member</div>
              <div className={styles.tierPrice}>$9 <span>/mo</span></div>
              <div className={styles.tierDesc}>Full access to everything</div>
              <Link href="/signup" className="btn btn-crimson btn-full">Join Now</Link>
            </div>
            <div className={styles.tierCard}>
              <div className={styles.tierName}>Family</div>
              <div className={styles.tierPrice}>$14 <span>/mo</span></div>
              <div className={styles.tierDesc}>For families learning together</div>
              <Link href="/signup" className="btn btn-navy btn-full">Start Family Plan</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.container}>
          <div className={styles.footerGrid}>
            <div>
              <img src="/images/logo_new.png" alt="Arkcov Academy" style={{ height: '45px', marginBottom: '1rem' }} />
              <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, maxWidth: '280px' }}>
                Merging medicine, entertainment, and education to build the most diverse generation of healers.
              </p>
            </div>
            <div className={styles.footerCol}>
              <h4>Platform</h4>
              <Link href="/explore">Explore</Link>
              <Link href="/signup">Membership</Link>
              <Link href="#store">Store</Link>
            </div>
            <div className={styles.footerCol}>
              <h4>Programs</h4>
              <Link href="#programs">Inspiring Healers</Link>
              <Link href="#programs">Scholars Foundation</Link>
            </div>
            <div className={styles.footerCol}>
              <h4>Company</h4>
              <Link href="#about">About</Link>
              <Link href="#">Contact</Link>
              <Link href="#">Press</Link>
            </div>
          </div>
          <div className={styles.footerBottom}>
            <p>© 2025 Arkcov Enterprises. All rights reserved. Created by Dr. Gerard D. Hills, M.D.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
