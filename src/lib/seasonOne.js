import { sql } from '@/lib/db';

// Season One starter content from the Curriculum Blueprint (Volume I).
// Seeded as drafts (reviewed = false): cadets don't see them until the Dean
// approves each lesson in the Lesson Builder.

const P = (...parts) => parts.join('\n\n');

export const SEVEN_SUPERPOWERS = [
  ['Communication', 'The Connector', 'Listens first and helps people understand each other.'],
  ['Courage', 'The Protector', 'Speaks up and keeps others safe, even when it’s uncomfortable.'],
  ['Grit', 'The Overcomer', 'Keeps going after setbacks and finds a new way forward.'],
  ['Craftsmanship', 'The Artisan', 'Practices with precision and takes pride in doing it right.'],
  ['Leadership', 'The Vanguard', 'Helps a whole team succeed, not just themselves.'],
  ['Spark', 'The Innovator', 'Imagines new solutions to ordinary problems.'],
  ['Compassion', 'The Healer', 'Sees the person before the problem and acts to help.'],
];

export const OR01 = {
  code: 'OR-01',
  room: 'orientation-hall',
  unit: 'Becoming an Arkcov Cadet',
  kind: 'lesson',
  title: 'Welcome to Your Future',
  summary: 'Your first mission: meet the Academy, find your way around campus and set your first learning goal.',
  minutes: 20,
  honor: 'Cadet Passport',
  data: {
    code: 'OR-01',
    minutes: { junior: 20, senior: 30 },
    objectives: {
      junior: ['Explain what Arkcov Academy is for', 'Find your way around the virtual campus', 'Name at least three healthcare professions', 'Write a personal learning goal'],
      senior: ['Explain the Academy’s purpose and expectations', 'Identify academic pathways, electives and research opportunities', 'Name at least three healthcare professions and how they work together', 'Write a personal learning goal with a first step'],
    },
    hook: {
      narration: 'Every great discovery began with someone who was curious. Every great healer began as someone who still had much to learn. Today, you begin your own journey. You don’t need to have all the answers. You only need the courage to start asking questions. Welcome to Arkcov Academy.',
    },
    discovery: {
      junior: P(
        '## A campus built for curious minds',
        'Arkcov Academy is a place to explore how the human body works and how people care for one another. Every building is a different way to learn:',
        '- **Main Learning Hall**: lessons, labs and the Healers Library.',
        '- **BodyWorld**: travel through the heart, brain and bloodstream, and play in the Gaming Hall.',
        '- **Conference Hall**: talks from real healers and the Cadet Showcase.',
        '- **Your house**: study with housemates and meet your mentors.',
        '## Healthcare is a team',
        'Doctors are only one part of the team. Nurses, pharmacists, lab scientists, therapists, social workers and many others work together to help each patient. As you explore, look for the ones that interest you.'),
      senior: P(
        '## More than a campus: a pathway',
        'Arkcov Academy prepares future healers for the science, reasoning and character that healthcare demands. Senior Cadets move from learning facts to investigating problems.',
        '- **Core curriculum**: biomedical science in the Senior Cadet Classrooms, from molecules to clinical reasoning.',
        '- **Clinical Skills Lab**: patient cases where you interview, examine, interpret data and explain your reasoning.',
        '- **Research Lab**: ask a real question, analyze data and present your findings.',
        '- **College & Career Center**: plan coursework, applications and pathways into healthcare.',
        '## What we expect of you',
        'Curiosity, honesty about what you don’t yet know, and respect for the people learning beside you. Your performance matters here, and so does how you treat others.'),
    },
    spotlight: {
      name: 'Dr. Rebecca Lee Crumpler',
      years: '1831–1895',
      contribution: 'In 1864 she became the first African American woman in the United States to earn an M.D. degree, graduating from the New England Female Medical College. In 1883 she published A Book of Medical Discourses, one of the very first medical publications by an African American, with guidance for mothers and children.',
      connection: 'She began as someone with a question and a calling, faced barriers few people could imagine, and turned what she learned into knowledge she could share with families. That’s the journey you’re starting today.',
      source: { title: 'National Library of Medicine: Changing the Face of Medicine', url: 'https://www.nlm.nih.gov/exhibition/changing-the-face-of-medicine/physicians/biography_rebecca_crumpler.html' },
    },
    mission: {
      type: 'explore',
      title: 'The First Mission',
      intro: 'Your Academy guide hands you a campus map with three destinations. Visit each one to complete your first mission and receive your Cadet Passport.',
      reward: 'Cadet Passport issued',
      spots: [
        { name: 'Main Learning Hall', art: '/classroom/healers-studio.jpg', href: '/classroom/inspiring-healers', text: 'Home of the Inspiring Healers Studio, the Clinical Skills Lab and the Healers Library. This is where your core lessons and live classes happen.' },
        { name: 'Family Lounge', art: '/classroom/rooms/family-lounge.jpg', href: '/classroom/family-lounge', text: 'Where parents and guardians learn about the Academy and how to support you. Your family is part of your team.' },
        { name: 'Superpower Studio', art: '/classroom/rooms/superpower-studio.jpg', href: '/classroom/superpower-studio', text: 'Discover your social superpowers: the Connector, Protector, Overcomer, Artisan, Vanguard, Innovator and Healer. Medicine needs all seven.' },
      ],
    },
    check: {
      junior: [
        { q: 'Which statement best describes a healthcare team?', options: ['Only doctors help patients', 'Many professionals work together to help each patient', 'Patients take care of themselves', 'Nurses only work at night'], answer: 1, explain: 'Doctors, nurses, pharmacists, lab scientists, therapists and many others work together.' },
        { q: 'Where would you go to learn about your social superpowers?', options: ['The Gaming Hall', 'The Superpower Studio', 'The Family Lounge', 'The Team Rooms'], answer: 1, explain: 'The Superpower Studio in the Welcome Gate.' },
        { q: 'What do you need to start your journey at Arkcov?', options: ['All the answers', 'Perfect grades', 'The courage to start asking questions', 'A white coat'], answer: 2, explain: 'Curiosity and the courage to ask questions are where every healer starts.' },
        { q: 'Dr. Rebecca Lee Crumpler is remembered as…', options: ['The first African American woman in the U.S. to earn an M.D.', 'The inventor of the stethoscope', 'The first nurse', 'A famous athlete'], answer: 0, explain: 'She earned her M.D. in 1864 and later wrote a medical book for families.' },
      ],
      senior: [
        { q: 'A patient’s care depends on a pharmacist, a nurse, a lab scientist and a physician. What does this show?', options: ['Physicians make every decision alone', 'Healthcare is interdisciplinary', 'Lab work isn’t part of care', 'Only specialists matter'], answer: 1, explain: 'Good care depends on many professions communicating well.' },
        { q: 'Where would a Senior Cadet analyze data and present findings?', options: ['Research Lab', 'Family Lounge', 'Channel Theater', 'Wellness Corner'], answer: 0, explain: 'The Research Lab runs the Junior Investigator Program.' },
        { q: 'What made Dr. Crumpler’s 1883 book historically significant?', options: ['It was the first book about surgery', 'It was one of the first medical publications by an African American', 'It introduced vaccines', 'It was written for physicians only'], answer: 1, explain: 'A Book of Medical Discourses is one of the very first medical publications by an African American, written for families.' },
        { q: 'Which learning goal is strongest?', options: ['“Be smart.”', '“Become a doctor someday.”', '“Finish the Heart and Blood lessons this month and explain blood flow to my family.”', '“Get through the program.”'], answer: 2, explain: 'Strong goals are specific, have a timeframe and include a way to show what you learned.' },
      ],
    },
    physician: {
      prompt: 'In the live session, Dr. Hills shares the earliest moment he considered becoming a physician.',
      questions: ['What was the first moment you thought about helping people for a living?', 'Who helped you take your first step?'],
    },
    journal: { prompt: 'Write your first learning goal. What do you want to learn at Arkcov Academy this season, and what is one first step you will take?' },
    closing: 'You’ve found your way around the Academy, met a pioneer who opened doors for those who followed, and set your first goal. Your Cadet Passport is ready. Your journey has begun.',
  },
  founder_notes: 'Live connection: tell students about the earliest moment in your life when you considered becoming a physician. Use the Founder’s Story Guide: what was happening, who helped you, and what you want a middle schooler versus a high schooler to take from it.',
};

export const CASE001 = {
  code: 'CASE-001',
  room: 'clinical-skills-lab',
  unit: 'Clinical Cases',
  kind: 'case',
  title: 'A Mystery in the Blood',
  summary: 'Why is Isaiah so tired? Interview, examine and investigate with the clinic team.',
  minutes: 15,
  honor: 'Clinical Investigator',
  data: {
    code: 'CASE-001',
    specialty: 'Hematology',
    minutes: { junior: 15, senior: 30 },
    patient: {
      name: 'Isaiah Brooks', age: 13, interests: ['Basketball', 'Video games'], concern: 'Fatigue',
      portrait: '/classroom/cases/isaiah-portrait.jpg', scene: '/classroom/cases/isaiah-gym.jpg',
    },
    opening: {
      scene: 'Isaiah is playing basketball in the school gym. After running the court a few times, he stops, sits on the bench and looks exhausted. His friend asks if he’s all right.',
      dialogue: 'I don’t know what’s happening. I used to play the entire game without getting tired. Now I feel like I can barely keep up.',
      narrator: 'Isaiah has come to the clinic because he has been feeling tired. Your job is to observe, ask good questions and help the team understand the evidence.',
    },
    stages: [
      {
        id: 'history', type: 'interview', title: 'Patient interview', min: 3,
        prompt: 'Choose questions to ask Isaiah. Ask at least three.',
        questions: [
          { q: 'When did the tiredness begin?', a: 'About two months ago.', feedback: 'How long a symptom has lasted helps organize the investigation.' },
          { q: 'Does anything make it worse?', a: 'Running and walking upstairs.', feedback: 'Tiredness with exertion suggests the body may not be meeting its oxygen needs.' },
          { q: 'Have you felt dizzy?', a: 'Sometimes when I stand up.', feedback: 'Dizziness on standing can be a clue the body is working harder to deliver blood and oxygen.' },
          { q: 'What kinds of foods do you eat?', a: 'I don’t eat a lot of meat or beans.', feedback: 'Diet is an important clue. Meat and beans are major sources of iron.' },
          { q: 'Have you noticed any bleeding?', a: 'No.', feedback: 'Bleeding is one way the body loses iron, so it’s an important question even when the answer is no.' },
          { q: 'How are you sleeping?', a: 'Pretty normal. I go to bed around ten.', feedback: 'Normal sleep makes simple sleepiness less likely as the full explanation.' },
        ],
        wrap: 'The history gives us clues, but it doesn’t give us a diagnosis yet.',
      },
      {
        id: 'exam', type: 'observe', title: 'Examination',
        text: 'The clinician examines Isaiah while you observe.',
        findings: [
          { label: 'Skin and inner eyelids', value: 'Mildly pale', flag: 'abnormal' },
          { label: 'Heart rate at rest', value: '105 beats per minute', flag: 'high' },
          { label: 'Breathing', value: 'Normal, clear lungs', flag: 'normal' },
          { label: 'Temperature', value: '98.4 °F', flag: 'normal' },
        ],
        modes: {
          junior: { prompt: 'Which body system is most likely involved?', choices: [
            { label: 'The blood, which carries oxygen', preferred: true, feedback: 'Yes. Paleness and a fast heart rate suggest the blood may not be carrying enough oxygen.' },
            { label: 'The bones', feedback: 'Bones don’t explain paleness and a fast heart rate. Think about what carries oxygen.' },
            { label: 'The skin only', feedback: 'The paleness shows up in the skin, but the cause is likely in what flows beneath it.' },
          ] },
          senior: { prompt: 'What would help most to evaluate his fatigue next?', choices: [
            { label: 'A complete blood count and iron studies', preferred: true, feedback: 'Right. Pallor and a fast resting heart rate point toward anemia, and a CBC with iron studies tests that directly.' },
            { label: 'A chest X-ray', feedback: 'His lungs sound clear and his breathing is normal. Blood tests are the more direct next step.' },
            { label: 'Tell him to rest more and recheck in a year', feedback: 'Two months of fatigue with pallor and tachycardia deserves evaluation now.' },
          ] },
        },
      },
      {
        id: 'labs', type: 'labs', title: 'Virtual laboratory', modes_only: ['senior'],
        intro: 'The lab returns Isaiah’s results. Reference ranges are illustrative for a teenager and vary by laboratory.',
        results: [
          { test: 'Hemoglobin', value: '8.9', unit: 'g/dL', ref: '12.5–16.0', flag: 'low' },
          { test: 'MCV (red cell size)', value: '66', unit: 'fL', ref: '78–95', flag: 'low' },
          { test: 'RDW (variation in size)', value: '19', unit: '%', ref: '11.5–14.5', flag: 'high' },
          { test: 'Ferritin (iron stores)', value: '5', unit: 'ng/mL', ref: '15–150', flag: 'low' },
          { test: 'Reticulocytes (new red cells)', value: '0.8', unit: '%', ref: '0.5–2.5', flag: 'note', note: 'Not appropriately raised for this degree of anemia' },
        ],
      },
      {
        id: 'decision', type: 'decision', title: 'What explains the evidence?',
        modes: {
          junior: { prompt: 'Isaiah’s blood has less hemoglobin, the part of red blood cells that carries oxygen. He doesn’t eat many iron-rich foods. Which explanation fits best?', choices: [
            { label: 'His body doesn’t have enough iron to make hemoglobin', preferred: true, feedback: 'Exactly. Iron is needed to build hemoglobin. Without enough, red blood cells carry less oxygen, and he gets tired faster.' },
            { label: 'He has a broken bone', feedback: 'A fracture wouldn’t cause paleness and tiredness for two months.' },
            { label: 'He just has a cold', feedback: 'A cold doesn’t last two months or cause low hemoglobin.' },
            { label: 'He isn’t trying hard enough', feedback: 'His tiredness is biological, not a lack of effort. That’s an important lesson for every healer.' },
          ] },
          senior: { prompt: 'Which explanation is best supported by the available evidence?', choices: [
            { label: 'Iron deficiency anemia', preferred: true, feedback: 'Correct. Low hemoglobin, small cells (low MCV), varied cell sizes (high RDW) and very low ferritin together support iron deficiency.' },
            { label: 'Thalassemia trait', feedback: 'Thalassemia trait also causes small red cells, but iron stores (ferritin) are usually normal and RDW is often normal. His very low ferritin points to iron deficiency.' },
            { label: 'Anemia of inflammation', feedback: 'In anemia of inflammation, ferritin is typically normal or high. His ferritin is very low.' },
            { label: 'Acute asthma exacerbation', feedback: 'Asthma wouldn’t explain these laboratory findings, and his lungs are clear.' },
          ] },
        },
        wrap: 'The findings support iron deficiency anemia. The supervising physician explains that finding the underlying cause and making a treatment plan still require further clinical evaluation.',
      },
      {
        id: 'bodyworld', type: 'oxygen', title: 'Into the bloodstream',
        intro: 'The camera moves into Isaiah’s bloodstream. Deliver oxygen to his leg muscles and compare a typical bloodstream with his.',
        normal_hb: 14, patient_hb: 8.9,
      },
    ],
    debrief: {
      science: 'Hemoglobin carries oxygen in red blood cells, and the body needs iron to make it. With less hemoglobin, Isaiah’s blood carries less oxygen to working muscles, so his heart beats faster and he tires more easily.',
      uncertainty: 'The clinical team still needs to find out why Isaiah is low on iron and create a management plan with him and his family.',
      human: 'Fatigue should never be dismissed as a lack of effort.',
      closing: 'Isaiah’s fatigue was not a failure of determination. His body was experiencing a biological problem. Understanding that difference helps us care for people with compassion.',
    },
    journal: { prompt: 'What did Isaiah’s story teach you about listening to someone who says they’re tired?' },
    discussion: ['What did Isaiah’s story teach us about listening?', 'What additional information might a clinician need?'],
  },
  founder_notes: 'Talk about the importance of taking children’s symptoms seriously, especially when they aren’t visible to others. A hematology story about a child whose fatigue was dismissed works well here.',
};

const SUPERPOWER_BODY = P(
  '## What is a social superpower?',
  'Your social superpower is the way you naturally connect with other people. It strengthens the connection between your brain, your spirit and your soul, and it helps you help others.',
  '## The seven social superpowers',
  ...SEVEN_SUPERPOWERS.map(([p, c, t]) => `- **${p}, ${c}**: ${t}`),
  'Medicine needs all seven. The Social Superpower Assessment in the Superpower Studio shows which ones you lead with, and which you can keep growing.',
);

const SUPERPOWER_CHECK = {
  questions: [
    { q: 'A patient is scared before a procedure. Which superpower helps you sit with them and calm them?', options: ['The Overcomer (Grit)', 'The Healer (Compassion)', 'The Innovator (Spark)', 'The Artisan (Craftsmanship)'], answer: 1, explain: 'Compassion, the Healer, sees the person first and acts to help.' },
    { q: 'Your science project fails twice and you try a new approach. Which superpower is that?', options: ['The Overcomer (Grit)', 'The Connector (Communication)', 'The Vanguard (Leadership)', 'The Protector (Courage)'], answer: 0, explain: 'Grit, the Overcomer, keeps going and finds a new way forward.' },
    { q: 'A teammate notices a safety problem in the lab and speaks up. Which superpower is that?', options: ['The Artisan', 'The Protector (Courage)', 'The Innovator', 'The Connector'], answer: 1, explain: 'Courage, the Protector, speaks up to keep others safe.' },
    { q: 'How many social superpowers are there?', options: ['Three', 'Five', 'Seven', 'Ten'], answer: 2, explain: 'Seven: Connector, Protector, Overcomer, Artisan, Vanguard, Innovator and Healer.' },
  ],
};

let seeded = false;
export async function ensureSeasonOne() {
  if (seeded) return;
  // Correct the earlier three-superpower draft to the original seven.
  await sql`UPDATE program_steps SET body = ${SUPERPOWER_BODY},
      summary = 'The seven social superpowers and how healers use them.'
    WHERE title = 'Your Social Superpower' AND body LIKE '%Three superpowers%'`;
  await sql`UPDATE program_steps SET data = ${JSON.stringify(SUPERPOWER_CHECK)}::jsonb,
      summary = 'The seven superpowers in action.'
    WHERE title = 'Superpower Check' AND data::text LIKE '%Creativity%'`;

  for (const item of [OR01, CASE001]) {
    const [p] = await sql`SELECT id FROM programs WHERE slug = ${item.room}`;
    if (!p) continue;
    const [have] = await sql`SELECT id FROM program_steps WHERE program_id = ${p.id} AND code = ${item.code}`;
    if (have) continue;
    await sql`UPDATE program_steps SET sort_order = sort_order + 1 WHERE program_id = ${p.id}`;
    await sql`INSERT INTO program_steps (program_id, sort_order, unit, kind, title, summary, body, data, minutes, reviewed, founder_notes, code, honor)
      VALUES (${p.id}, 1, ${item.unit}, ${item.kind}, ${item.title}, ${item.summary}, null, ${JSON.stringify(item.data)}::jsonb,
        ${item.minutes}, false, ${item.founder_notes}, ${item.code}, ${item.honor})`;
  }
  seeded = true;
}

export { SUPERPOWER_BODY, SUPERPOWER_CHECK };
