// Every room on the virtual campus. Each one is a program in the classroom
// engine with its own art; curriculum is added in the Lesson Builder.
// `prompt` is the art brief used to generate the room (kept for regenerating).

export const BUILDINGS = [
  { slug: 'welcome-gate', name: 'Welcome Gate', kind: 'Start here' },
  { slug: 'learning-hall', name: 'Main Learning Hall', kind: 'Learn' },
  { slug: 'conference-hall', name: 'Conference Hall & Auditorium', kind: 'Watch' },
  { slug: 'bodyworld', name: 'BodyWorld', kind: 'Play' },
  { slug: 'sports-complex', name: 'Sports Complex', kind: 'Athletics' },
  { slug: 'middle-school', name: 'Middle School Building', kind: 'Junior Cadets' },
  { slug: 'high-school', name: 'High School Building', kind: 'Senior Cadets' },
  { slug: 'teaching-hospital', name: 'Arkcov Teaching Hospital', kind: 'Patient Cases' },
  { slug: 'junior-boys-house', name: "Junior Cadet Boys' House", kind: 'Residence' },
  { slug: 'junior-girls-house', name: "Junior Cadet Girls' House", kind: 'Residence' },
  { slug: 'senior-mens-house', name: "Senior Cadet Men's House", kind: 'Residence' },
  { slug: 'senior-womens-house', name: "Senior Cadet Women's House", kind: 'Residence' },
];

const R = (building, slug, room, kind, art, text, prompt) => ({ building, slug, room, kind, art: `/classroom/rooms/${art}.jpg`, text, prompt });

export const ROOMS = [
  R('welcome-gate', 'orientation-hall', 'Orientation Hall', 'Experience', 'orientation-hall', 'A guided first walk through the campus for new cadets and families.',
    'grand circular orientation rotunda at the entrance of a medical academy, illuminated floor map of a campus inlaid in marble, tall cream stone arches nested three deep with gold trim, navy and crimson banners, warm morning light through a glass dome'),
  R('welcome-gate', 'superpower-studio', 'Superpower Studio', 'Assessment', 'superpower-studio', 'Take the Social Superpower Assessment and meet your strength.',
    'intimate assessment studio with a single elegant reflective console facing a curved wall of softly glowing abstract light ribbons in gold and crimson, cream stone arch, navy velvet walls, mysterious and inspiring, like discovering a hidden talent'),
  R('welcome-gate', 'family-lounge', 'Family Lounge', 'Families', 'family-lounge', 'Information sessions and Q&A for parents and guardians.',
    'warm welcoming family lounge in a prestigious academy, clusters of navy sofas and armchairs, fireplace with brass surround, coffee service, large window to a green campus quad, cream stone arch, crimson accents, soft afternoon light'),

  R('learning-hall', 'clinical-skills-lab', 'Anatomy & Clinical Skills Lab', 'Lab', 'clinical-skills-lab', 'Hands-on virtual labs: explore organs, take vitals, practice cases.',
    'modern anatomy and clinical skills lab inside a classic academy, rows of white workstations with holographic organ models (heart, lungs, kidney) floating above them in soft blue light, anatomical models, stethoscopes on hooks, navy walls, cream stone arches, brass fixtures'),
  R('learning-hall', 'study-tables', 'Study Group Tables', 'Study', 'study-tables', 'Join or start a study group by course or by grade.',
    'long walnut study tables with green-shaded brass lamps in a vaulted academy reading room, small glowing tablet screens at each seat, stacks of books and journals, cream stone arches, crimson runners, evening glow'),
  R('learning-hall', 'healers-library', 'Healers Library', 'Library', 'healers-library', 'Readings, films and the Medicine Bullet Journal.',
    'magnificent two-story medical library with spiral brass staircase, floor-to-ceiling walnut shelves of leather medical books, rolling ladders, a central reading table with an open anatomy atlas, glowing globe, cream stone arches, gold light'),

  R('conference-hall', 'main-auditorium', 'Main Auditorium', 'Event', 'main-auditorium', 'Symposia, guest healer talks and cadet graduations.',
    'grand auditorium with a deep stage framed by three nested gold-trimmed cream arches, crimson velvet curtains, a lectern with a brass lamp, a giant screen, tiered navy seating, chandeliers, dramatic warm stage lighting'),
  R('conference-hall', 'town-hall', 'Town Hall', 'Gathering', 'town-hall', 'Academy-wide gatherings and announcements.',
    'round town hall chamber with concentric rings of navy benches around a central speaking floor with a brass medallion, crimson banners hanging from a cream stone colonnade, skylight, civic and welcoming'),
  R('conference-hall', 'cadet-showcase', 'Cadet Showcase', 'Showcase', 'cadet-showcase', 'Cadets present projects and research to the Academy.',
    'science fair style showcase hall in an elegant academy, rows of illuminated poster boards and display pedestals with medical models, spotlights, a small presentation stage, cream stone arches, navy and gold palette, exciting atmosphere'),

  R('bodyworld', 'human-body-experience', 'The Human Body Experience', 'Experience', 'human-body-experience', 'Travel through the body at the scale of a cell.',
    'immersive walkway inside a giant stylized human body, glowing blood vessels arching overhead like a cathedral, red blood cells drifting in warm light, bioluminescent nerve fibers, a sleek observation path with gold railings, awe-inspiring and family friendly'),
  R('bodyworld', 'heart-dome', 'Heart & Circulation Dome', 'Experience', 'heart-dome', 'Ride the bloodstream and watch the heart at work.',
    'vast domed theater with an enormous anatomically inspired glowing heart suspended in the center, crimson and gold light pulsing through arteries that spread across the dome ceiling, viewing balcony with navy seats, cinematic'),
  R('bodyworld', 'brain-pavilion', 'Brain & Mind Pavilion', 'Experience', 'brain-pavilion', 'Explore how we think, feel and learn.',
    'futuristic pavilion with a giant translucent brain sculpture glowing with gold neural pathways and sparks of light, mirrored floor, curved navy walls, cream arch entry, calm wonder'),
  R('bodyworld', 'gaming-hall', 'Arkcov Gaming Hall', 'Games', 'gaming-hall', 'Play Arkcov games by medical specialty, starting with the Warriors Thrive games for sickle cell disease.',
    'stylish game arcade lounge with neon purple and blue light accents, large game tables with a glowing board game, gaming screens, navy booth seating, a big illuminated sign area left blank, energetic but classy'),
  R('bodyworld', 'channel-theater', 'Arkcov Academy Channel Theater', 'Watch', 'channel-theater', 'Watch shows together with other cadets.',
    'boutique cinema with navy velvet recliners, gold sconces, crimson curtains framing a huge glowing screen, cream stone proscenium arch, soft popcorn-warm lighting'),

  R('sports-complex', 'movement-lab', 'Movement Lab', 'Training', 'movement-lab', 'Learn how muscles, bones and the heart respond to training.',
    'high-tech sports science movement lab, running track treadmill with motion capture cameras, holographic skeleton and muscle display, force plates, navy and gold athletic branding, arched cream stone windows, bright clean light'),
  R('sports-complex', 'sports-medicine-clinic', 'Sports Medicine Clinic', 'Lab', 'sports-medicine-clinic', 'Virtual cases: sprains, concussions, recovery and return to play.',
    'sports medicine clinic with padded treatment tables, ice and rehab equipment, a lightbox with knee x-rays, resistance bands on walnut racks, navy walls with crimson stripe, cream arch doorway to a gym'),
  R('sports-complex', 'team-rooms', 'Team Rooms', 'Social', 'team-rooms', 'Meet up with teammates and form clubs.',
    'elegant athletic team room with wood lockers, a strategy whiteboard wall, trophy case with gold trophies, navy leather benches, crimson accents, warm lighting'),

  R('middle-school', 'junior-classrooms', 'Junior Cadet Classrooms', 'Classroom', 'junior-classrooms', 'Grades 6–8: body foundations and careers in healthcare.',
    'bright inviting middle school classroom in a prestigious academy, colorful anatomy posters, a big interactive display showing a friendly heart diagram, desks in clusters, plants, cream arched windows, navy and gold accents, cheerful daylight'),
  R('middle-school', 'discovery-lab', 'Discovery Lab', 'Lab', 'discovery-lab', 'First experiments, models and simulations.',
    'playful science discovery lab for young students, microscopes, colorful beakers, a large model of a cell, magnifying stations, cream arches, navy cabinets with brass handles, sunlit and curious'),
  R('middle-school', 'homework-hub', 'Homework Hub', 'Study', 'homework-hub', 'Study groups and peer help by subject.',
    'cozy homework hub with round tables, beanbag nooks, a bookshelf wall, chalkboard with science doodles, warm lamps, navy and crimson cushions, cream arch, friendly'),
  R('middle-school', 'career-explorers', 'Career Explorers', 'Mentoring', 'career-explorers', 'Meet nurses, doctors, therapists, techs and more.',
    'career exploration gallery with display alcoves each showing tools of a healthcare career: stethoscope and white coat, nursing scrubs, physical therapy bands, lab microscope, dental mirror, under spotlights, cream arches, navy walls'),

  R('high-school', 'senior-classrooms', 'Senior Cadet Classrooms', 'Classroom', 'senior-classrooms', 'Grades 9–12: advanced science and clinical reasoning.',
    'sophisticated high school seminar classroom with an oval walnut seminar table, leather chairs, a large screen showing an ECG and chest x-ray, chalkboard with chemistry, cream stone arches, navy and gold palette'),
  R('high-school', 'research-lab', 'Research Lab', 'Lab', 'research-lab', 'Real research projects with mentors.',
    'professional biomedical research lab, glass fume hoods, pipettes, centrifuges, a genome sequence on a wall display, clean white benches with navy accents, cream arch windows, precise cool light'),
  R('high-school', 'college-career-center', 'College & Career Center', 'College prep', 'college-career-center', 'Applications, test prep, essays and pathways into healthcare.',
    'college and career center with university pennants in navy and crimson, a wall of acceptance letters in frames, counseling desks, laptops, a pathway map mural to medicine, cream arches, optimistic light'),
  R('high-school', 'leadership-studio', 'Leadership Studio', 'Leadership', 'leadership-studio', 'Lead teams, plan service and mentor Junior Cadets.',
    'leadership studio with a boardroom table, a wall of community service photos, a podium, flags in navy and crimson, cream stone arches, gold details, confident atmosphere'),
  R('teaching-hospital', 'emergency-department', 'Emergency Department', 'Cases', 'emergency-department', 'Emergency cases: shock, seizures, anaphylaxis, stroke and more. Act first, then reason.',
    'a sleek modern pediatric and adult emergency department resuscitation bay with a stretcher, monitors glowing teal, a crash cart, glass doors, navy and cream walls with gold accents, cinematic calm lighting, no people'),
  R('teaching-hospital', 'newborn-nursery', 'Newborn Nursery & Delivery Suite', 'Cases', 'newborn-nursery', 'Newborn cases, starting with the first breath.',
    'a bright modern delivery suite with a neonatal radiant warmer bed, a small bag-mask on a tray, soft warm lights, cream walls with navy and gold accents, peaceful and hopeful, no people'),
  R('teaching-hospital', 'childrens-clinic', "Children's Clinic", 'Cases', 'childrens-clinic', 'Clinic cases for children and teens across every body system.',
    'a warm, playful pediatric clinic exam room with a padded exam table, a growth chart on the wall, a stethoscope on a hook, a window with afternoon light, navy and cream with gold accents and subtle illustrated animals, no people'),
  R('teaching-hospital', 'adult-clinic', 'Adult Medicine Clinic', 'Cases', 'adult-clinic', 'Clinic cases for adults: diabetes, thyroid disease and more.',
    'an elegant adult primary care exam room with an exam table, a blood pressure cuff on the wall, a desk with a computer, bookshelves, large window with city view, navy and cream with gold accents, calm daylight, no people'),
];

// Each residence house gets its own rooms (houses are single-sex).
const HOUSE_ROOMS = [
  ['commons', 'House Commons', 'Social', 'house-commons', 'Hang out with your housemates, play games and plan house events.',
    'residence house common room with navy sofas, a game table with chess, a fireplace, crimson rugs, house banners, cream stone arches, warm evening light, no beds'],
  ['study-lounge', 'Study Lounge', 'Study', 'house-study', 'Quiet group study tables with shared notes and timers.',
    'quiet residence study lounge with individual walnut carrels and brass lamps, a long window seat, bookshelves, navy and gold, calm night lighting, no beds'],
  ['mentor-hours', 'House Mentor Hours', 'Mentoring', 'house-mentor', 'Drop in with an upper-class cadet or healthcare mentor during scheduled hours.',
    'open mentoring corner in a residence hall with two armchairs and a round table beside a glass wall facing a busy lounge, plants, cream arch, transparent and welcoming, no beds'],
  ['wellness', 'Wellness Corner', 'Wellness', 'house-wellness', 'Check-ins, sleep and stress habits, and healthy routines.',
    'serene wellness room with yoga mats, a water feature, plants, soft cushions, a calm sunrise window, navy and cream with gold accents, peaceful, no beds'],
];
for (const b of ['junior-boys-house', 'junior-girls-house', 'senior-mens-house', 'senior-womens-house']) {
  for (const [key, room, kind, art, text, prompt] of HOUSE_ROOMS) {
    ROOMS.push(R(b, `${b}-${key}`, room, kind, art, text, prompt));
  }
}

export const HEALERS_ART = '/classroom/healers-studio.jpg';

export function buildingName(slug) {
  return BUILDINGS.find((b) => b.slug === slug)?.name || slug;
}
