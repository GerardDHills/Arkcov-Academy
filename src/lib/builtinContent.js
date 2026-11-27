// Library items that ship with the site itself (not stored in the database).
// /api/content merges these in with the admin-managed rows.
export const BUILTIN_CONTENT = [
  {
    id: 'tv-arkcov-academy-ep1',
    title: 'Arkcov Academy: Mission 001 — A Mystery in the Blood',
    description:
      'Nazareth and a squad of cadets take on their first mission: finding out why 13-year-old Isaiah is tired all the time. Pause and answer along with the cadets, travel inside the body to see how iron gets lost, laugh with Nico & Gene, watch the Connector superpower in action, and earn the Clinical Investigator patch.',
    type: 'tv_show',
    thumbnail_url: '/images/posters/arkcov-academy-ep1.jpg',
    trailer_url: null,
    media_url: '/videos/arkcov-academy-ep1.mp4',
    access_level: 'free',
    category: 'Arkcov Academy: The TV Show',
    tags: ['tv show', 'hematology', 'gastroenterology', 'clinical reasoning'],
    duration_minutes: 6,
    release_year: 2026,
    rating: 'TV-G',
    featured: true,
    sort_order: 0,
  },
  {
    id: 'short-nico-gene-group-project',
    title: 'Nico & Gene: Group Project',
    description:
      'Same parents, different gene shuffle. Gene is sure he got the “handsome gene.” His brainy brother Nico explains that lots of genes shape how you look — which makes Gene’s face a group project.',
    type: 'animated_short',
    thumbnail_url: '/images/posters/nico-gene-group-project.jpg',
    trailer_url: null,
    media_url: '/videos/nico-gene-group-project.mp4',
    access_level: 'free',
    category: 'Nico & Gene',
    tags: ['animated short', 'genetics', 'inheritance', 'comedy'],
    duration_minutes: 1,
    release_year: 2026,
    rating: 'TV-G',
    featured: false,
    sort_order: 0,
  },
];

export function builtinContentFor({ type, featured } = {}) {
  return BUILTIN_CONTENT.filter((c) => {
    if (featured === 'true' && !c.featured) return false;
    if (type && type !== 'all' && c.type !== type) return false;
    return true;
  });
}
