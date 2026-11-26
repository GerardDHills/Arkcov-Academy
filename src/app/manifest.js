// Web app manifest: lets Arkcov Academy open full screen from a phone's home
// screen, like an app, and keeps every page inside the app (scope "/").
export default function manifest() {
  return {
    id: '/',
    name: 'Arkcov Academy',
    short_name: 'Arkcov',
    description: 'Medical education for future healers: virtual classrooms, patient cases and games.',
    start_url: '/dashboard',
    scope: '/',
    display: 'standalone',
    orientation: 'portrait',
    background_color: '#081027',
    theme_color: '#081027',
    categories: ['education', 'medical'],
    icons: [
      { src: '/app-icons/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/app-icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: '/app-icons/maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
    shortcuts: [
      { name: 'Case Library', url: '/cases' },
      { name: 'Virtual Classrooms', url: '/classroom' },
      { name: 'Cadet Passport', url: '/passport' },
    ],
  };
}
