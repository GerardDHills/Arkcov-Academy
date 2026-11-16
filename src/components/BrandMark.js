// Arkcov brand marks — the Covenant Arch.
// Three nested arches (cherubim wings over the Ark, an "A", a doorway, the covenant rainbow)
// over a crimson drop (life is in the blood).
// Print-ready master files live in /public/brand.

const ARCHES = ["M6.5,176 C6.5,75.2 67.7,24.8 96.5,8 L96.5,24.2 C71.9,38.2 19.5,80.2 19.5,164 Z", "M193.5,176 C193.5,75.2 132.3,24.8 103.5,8 L103.5,24.2 C128.1,38.2 180.5,80.2 180.5,164 Z", "M28.5,176 C28.5,94.4 74.7,53.6 96.5,40 L96.5,56.2 C78.9,67.0 41.5,99.4 41.5,164 Z", "M171.5,176 C171.5,94.4 125.3,53.6 103.5,40 L103.5,56.2 C121.1,67.0 158.5,99.4 158.5,164 Z", "M50.5,176 C50.5,113.6 81.8,82.4 96.5,72 L96.5,88.2 C85.9,95.8 63.5,118.6 63.5,164 Z", "M149.5,176 C149.5,113.6 118.2,82.4 103.5,72 L103.5,88.2 C114.1,95.8 136.5,118.6 136.5,164 Z"];
const DROP = "M100 104 C100 104 120 130 120 147 A20 20 0 1 1 80 147 C80 130 100 104 100 104 Z";
const ONE_COLOR = { navy: '#0E1A3A', cream: '#F6EEDF', gold: '#C9973F', white: '#FFFFFF' };

/** The arch-and-drop symbol. tone: "color" (default) or a single color: "navy", "cream", "gold", "white". */
export function ArkcovMark({ size = 40, tone = 'color', title = 'Arkcov', className, style }) {
  const one = ONE_COLOR[tone];
  const archFill = one || '#C9973F';
  const dropFill = one || '#A8201A';
  const label = title ? { role: 'img', 'aria-label': title } : { 'aria-hidden': true };
  return (
    <svg viewBox="0 0 200 190" width={(size * 200) / 190} height={size} className={className} style={style} {...label}>
      {ARCHES.map((d, i) => <path key={i} d={d} fill={archFill} />)}
      <path d={DROP} fill={dropFill} />
    </svg>
  );
}

/** Symbol + "ARKCOV / ACADEMY" wordmark. onDark switches the text to cream and gold. */
export function ArkcovLockup({ size = 40, onDark = false, sub = 'ACADEMY', className }) {
  return (
    <span className={className} style={{ display: 'inline-flex', alignItems: 'center', gap: size * 0.28 }}>
      <ArkcovMark size={size} title="" />
      <span style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
        <span style={{ fontFamily: 'var(--font-brand)', fontWeight: 600, fontSize: size * 0.5, letterSpacing: '0.2em', color: onDark ? '#F6EEDF' : '#0E1A3A' }}>ARKCOV</span>
        <span style={{ fontFamily: 'var(--font-brand)', fontWeight: 500, fontSize: Math.max(9, size * 0.2), letterSpacing: '0.5em', marginTop: size * 0.12, color: onDark ? '#C9973F' : '#A8201A' }}>{sub}</span>
      </span>
    </span>
  );
}

/** The Arkcov Academy crest (shield). Use for certificates, badges and achievements. */
export function ArkcovCrest({ size = 120, title = 'Arkcov Academy crest', className }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src="/brand/crest.svg" alt={title} height={size} width={Math.round((size * 240) / 296)} className={className} />;
}
