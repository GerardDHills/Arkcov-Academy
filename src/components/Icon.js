// Simple line icons for the Academy (replaces emoji so icons look consistent on every device
// and read correctly with screen readers). Usage: <Icon name="book" size={20} />
const PATHS = {
  home: 'M3 10.5 12 4l9 6.5M5 9.5V20h14V9.5M9.5 20v-5h5v5',
  compass: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm3.5-12.5-2 5-5 2 2-5 5-2Z',
  book: 'M3 5.5C6 4 9 4 12 6c3-2 6-2 9-.5v13c-3-1.5-6-1.5-9 .5-3-2-6-2-9-.5v-13ZM12 6v13',
  mic: 'M12 3a3 3 0 0 0-3 3v5a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3ZM5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21M8.5 21h7',
  film: 'M3 5h18v14H3zM7 5v14M17 5v14M3 9.5h4M3 14.5h4M17 9.5h4M17 14.5h4',
  tv: 'M3 7h18v12H3zM8 3l4 4 4-4',
  sparkle: 'M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3ZM19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8L19 16Z',
  game: 'M7 8h10a5 5 0 0 1 5 5v1a3 3 0 0 1-5.4 1.8L15 14H9l-1.6 1.8A3 3 0 0 1 2 14v-1a5 5 0 0 1 5-5ZM7 11v3M5.5 12.5h3M16 12h.01M18 13.5h.01',
  bolt: 'M13 2 4 14h7l-1 8 9-12h-7l1-8Z',
  folder: 'M3 6.5A1.5 1.5 0 0 1 4.5 5H9l2 2h8.5A1.5 1.5 0 0 1 21 8.5v9a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 17.5v-11Z',
  users: 'M9 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM2.5 20c.6-3.7 3.2-6 6.5-6s5.9 2.3 6.5 6M16 4.5a3.3 3.3 0 0 1 0 6.3M18 14c2 .7 3.2 2.8 3.5 6',
  chart: 'M4 20V10M10 20V4M16 20v-7M2 20h20',
  heart: 'M12 20s-7.5-4.6-9.3-9.2C1.5 7.4 3.8 4 7.3 4c2 0 3.5 1.1 4.7 2.8C13.2 5.1 14.7 4 16.7 4c3.5 0 5.8 3.4 4.6 6.8C19.5 15.4 12 20 12 20Z',
  shield: 'M12 3 4 6.5V12c0 4.6 3.4 8 8 9 4.6-1 8-4.4 8-9V6.5L12 3Z',
  cap: 'M2 9l10-5 10 5-10 5L2 9ZM6 11v5c3.5 2.5 8.5 2.5 12 0v-5M22 9v6',
  stethoscope: 'M6 3v6a4 4 0 0 0 8 0V3M10 13v2a5 5 0 0 0 10 0v-2M20 13a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z',
  family: 'M7 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM17 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM12 13a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM2.5 20c.4-4 2-7 4.5-7s4 2 4.3 4M21.5 20c-.4-4-2-7-4.5-7s-4 2-4.3 4M9 21c.3-2.5 1.4-4 3-4s2.7 1.5 3 4',
  school: 'M3 10.5 12 5l9 5.5M5 9.5V19h14V9.5M9 19v-4h6v4M12 5V2.5',
  bag: 'M5 8h14l-1 12H6L5 8ZM9 8V6a3 3 0 0 1 6 0v2',
  drop: 'M12 3s6 6.6 6 11a6 6 0 0 1-12 0c0-4.4 6-11 6-11Z',
  play: 'M7 4.5v15l12-7.5-12-7.5Z',
  arrow: 'M5 12h14M13 6l6 6-6 6',
  check: 'M4 12.5 9.5 18 20 6',
  journal: 'M6 3h11a2 2 0 0 1 2 2v16H8a2 2 0 0 1-2-2V3ZM6 17h13M10 7h5M10 10h5',
  settings: 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM19.4 13a7.6 7.6 0 0 0 0-2l2-1.6-2-3.4-2.4 1a7.4 7.4 0 0 0-1.7-1L15 3.5h-4l-.4 2.5a7.4 7.4 0 0 0-1.7 1l-2.4-1-2 3.4 2 1.6a7.6 7.6 0 0 0 0 2l-2 1.6 2 3.4 2.4-1c.5.4 1.1.8 1.7 1l.4 2.5h4l.4-2.5c.6-.2 1.2-.6 1.7-1l2.4 1 2-3.4-2-1.6Z',
};

export default function Icon({ name, size = 20, strokeWidth = 1.7, className, title }) {
  const d = PATHS[name] || PATHS.sparkle;
  const label = title ? { role: 'img', 'aria-label': title } : { 'aria-hidden': true };
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor"
      strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} {...label}>
      <path d={d} />
    </svg>
  );
}
