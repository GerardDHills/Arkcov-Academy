// Arkcov Gaming Hall catalog. Games are grouped by the specialty whose
// healthcare professionals care for the condition (sickle cell disease is
// Hematology, asthma is Pulmonology, and so on).

const LIFE_APP = 'https://gerarddhills.github.io/warriors-thrive-life-app';

export const SPECIALTIES = [
  {
    slug: 'hematology', name: 'Hematology', field: 'Blood and bone marrow', conditions: 'Sickle cell disease',
    team: 'Hematologists, hematology nurses and pharmacists',
    games: [
      { slug: 'warriors-thrive-board-game', title: 'Warriors Thrive: The Board Game', series: 'Warriors Thrive', condition: 'Sickle cell disease',
        cover: '/games/board-game.jpg', url: `${LIFE_APP}/board/`, players: '2–8 players', ages: 'Ages 7+',
        text: 'The cooperative board game, now playable online. Move through the body’s organs, beat crises and protect the Warriors together.' },
      { slug: 'warrior-mission', title: 'Warrior Mission', series: 'Warriors Thrive', condition: 'Sickle cell disease',
        cover: '/games/mission.jpg', url: `${LIFE_APP}/mission/`, players: '1 player', ages: 'Ages 7+', landscape: true,
        text: 'Choose your Warrior, bust sickle cell myths, find truth clues and collect health crystals across the city.' },
      { slug: 'hemoglobin-heroes', title: 'Hemoglobin Heroes', series: 'Warriors Thrive', condition: 'Sickle cell disease',
        cover: '/games/hemoglobin-heroes.jpg', url: `${LIFE_APP}/molecule/`, players: '1 player', ages: 'Ages 9+',
        text: 'Shrink down with Dr. Amos to see how sickle cell works at the molecule level, and how every medicine fights back. Ten boards.' },
      { slug: 'bloodstream-rush', title: 'Bloodstream Rush', series: 'Warriors Thrive', condition: 'Sickle cell disease',
        cover: '/games/bloodstream-rush.jpg', url: `${LIFE_APP}/race/`, players: '1 player', ages: 'Ages 7+', landscape: true,
        text: 'Race through the body as a blood cell or a medicine. Treat blockages, dodge The Society and make it back to the bone marrow.' },
      { slug: 'health-crystal-run', title: 'Health Crystal Run', series: 'Warriors Thrive', condition: 'Sickle cell disease',
        cover: '/games/health-crystal-run.jpg', url: `${LIFE_APP}/runner/`, players: '1 player', ages: 'Ages 7+',
        text: 'Race healthy-habit crystals from the lab to the hospital, with Acute Chest Rescue and Stroke Shield levels.' },
    ],
  },
  { slug: 'pulmonology', name: 'Pulmonology', field: 'Lungs and breathing', conditions: 'Asthma, cystic fibrosis', team: 'Pulmonologists and respiratory therapists', games: [] },
  { slug: 'cardiology', name: 'Cardiology', field: 'Heart and blood vessels', conditions: 'Congenital heart disease, hypertension', team: 'Cardiologists and cardiac nurses', games: [] },
  { slug: 'endocrinology', name: 'Endocrinology', field: 'Hormones and metabolism', conditions: 'Type 1 and type 2 diabetes', team: 'Endocrinologists and diabetes educators', games: [] },
  { slug: 'neurology', name: 'Neurology', field: 'Brain and nerves', conditions: 'Epilepsy, stroke, migraine', team: 'Neurologists and neuroscience nurses', games: [] },
  { slug: 'nephrology', name: 'Nephrology', field: 'Kidneys', conditions: 'Chronic kidney disease', team: 'Nephrologists and dialysis teams', games: [] },
  { slug: 'oncology', name: 'Oncology', field: 'Cancer care', conditions: 'Childhood leukemia and other cancers', team: 'Oncologists and oncology nurses', games: [] },
  { slug: 'gastroenterology', name: 'Gastroenterology', field: 'Digestive system', conditions: 'Crohn’s disease, celiac disease', team: 'Gastroenterologists and dietitians', games: [] },
  { slug: 'immunology', name: 'Allergy & Immunology', field: 'Immune system', conditions: 'Food allergies, eczema', team: 'Allergists and immunologists', games: [] },
  { slug: 'infectious-disease', name: 'Infectious Disease', field: 'Infections and vaccines', conditions: 'Flu, HIV, vaccine-preventable illness', team: 'Infectious disease specialists', games: [] },
  { slug: 'mental-health', name: 'Mental Health', field: 'Mind and emotions', conditions: 'Anxiety, depression, ADHD', team: 'Psychiatrists, psychologists and counselors', games: [] },
];

export const ALL_GAMES = SPECIALTIES.flatMap((s) => s.games.map((g) => ({ ...g, specialty: s.slug, specialtyName: s.name })));
