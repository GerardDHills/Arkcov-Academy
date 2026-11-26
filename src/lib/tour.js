// The campus tour, narrated by Nazareth, an upperclassman scholar.
// Each stop opens a page, optionally spotlights an element ([data-tour="..."]),
// and plays /guide/tour/NN.mp3 when it exists. Captions always show.
export const GUIDE = {
  name: 'Nazareth',
  role: 'Upperclassman Scholar',
  portrait: '/guide/nazareth.jpg',
  face: '/guide/nazareth-face.jpg',
};

export const TOUR = [
  { path: '/dashboard', title: 'Welcome to Arkcov Academy',
    text: 'Hey, welcome to Arkcov Academy. I’m Nazareth, an upperclassman scholar here. I’ll walk you around campus so you know where everything is. Tap Next whenever you’re ready.' },
  { path: '/dashboard', target: 'doors', title: 'Your Academy Home',
    text: 'This is your Academy Home. The top card picks up right where you left off, and these doors take you to every part of campus. If you ever feel lost, come back here.' },
  { path: '/classroom', title: 'Virtual Classrooms',
    text: 'These are the Virtual Classrooms. Each building on campus holds rooms, and each room holds lessons. Walk in, learn something new, and collect stamps for your passport as you go.' },
  { path: '/cases', title: 'The Case Library',
    text: 'This is the Case Library, my favorite place. You meet patients, ask them questions, examine them, and figure out what’s going on, just like a real healer. Start with a clinic case, then work your way up to the emergencies.' },
  { path: '/atlas/blood', title: 'The Body Atlas',
    text: 'This is the Body Atlas. Spin the 3D body, tap an organ, and see how anatomy, cells and disease connect. When a case stumps you, this is where you come to think it through.' },
  { path: '/passport', title: 'Your Cadet Passport',
    text: 'This is your Cadet Passport. Every lesson and case you finish earns a stamp, and your honors and journal live here too. It’s the record of how far you’ve come.' },
  { path: '/superpower', title: 'Superpower Assessment',
    text: 'This is the Superpower Assessment. It helps you discover how you work best with other people. Every great healer has a social superpower. Go find yours.' },
  { path: '/classroom/gaming-hall', title: 'The Gaming Hall',
    text: 'And this is the Gaming Hall, where you practice what you’ve learned through games by medical specialty. Learning counts here, too.' },
  { path: '/dashboard', target: 'tour-button', title: 'You’re ready',
    text: 'That’s the tour. You can take it again anytime from your Academy Home. I’m glad you’re here, cadet. Let’s get to work.' },
];

export const audioFor = (i) => `/guide/tour/${String(i + 1).padStart(2, '0')}.mp3`;
export const startTour = () => { if (typeof window !== 'undefined') window.dispatchEvent(new Event('arkcov:tour')); };
