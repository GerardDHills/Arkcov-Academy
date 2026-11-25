import { sql } from '@/lib/db';
import { ensureClassroomTables } from '@/lib/classroom';

// Starter version of the Inspiring Healers Program, drawn from Dr. Hills'
// IHP sketchbook (Identity, Social Superpowers, The Brain and the Body).
// Everything here can be edited later; it is seeded once if missing.

const P = (...parts) => parts.join('\n\n');

export const HEALERS = {
  slug: 'inspiring-healers',
  title: 'Inspiring Healers Program',
  subtitle: 'Discover who you are, the power you carry, and how the body heals.',
  description: 'A guided program that grows a cadet into a future healer: identity, social superpowers, and the science of the brain and body, with live sessions, simulations and a certificate of performance.',
  building: 'Main Learning Hall',
  room: 'Inspiring Healers Studio',
  theme: 'healers',
  pass_score: 70,
  steps: [
    { unit: 'Unit A · Identity', kind: 'video', title: 'Welcome to the Studio', minutes: 2,
      summary: 'Step into the Inspiring Healers Studio and meet the mission.',
      media_url: '/videos/arkcov_welcome.mp4' },
    { unit: 'Unit A · Identity', kind: 'reading', title: 'Body, Spirit and Soul', minutes: 6,
      summary: 'The three parts of you, and why your dreams matter.',
      body: P(
        '## Who are you?',
        'Before we learn how to heal others, we start with the person doing the healing: you.',
        'Think of yourself in three parts that work together:',
        '- **Body**: the part of you that lives, moves and senses the world.',
        '- **Spirit**: the part of you that feels, believes and reacts to the words and actions of others.',
        '- **Soul**: the part of you that dreams. It holds your ideas, memories, likes, dislikes and the characteristics that make you, you.',
        '## Your dreams are important',
        'Dreams are made by the soul. Healers are people who carry their dreams into the world on purpose. Medicine itself began as someone’s idea of how to help.',
        '## Reflect',
        'Write down one dream you have for your life. Keep it in your Medicine Bullet Journal; we will come back to it.') },
    { unit: 'Unit A · Identity', kind: 'activity', title: 'The Potter', minutes: 15,
      summary: 'Same clay, different purpose. A team activity about being made on purpose.',
      body: P(
        '## In the live session',
        'The class splits into two teams. Each team gets the same two cans of clay. One team shapes a hammer. The other shapes a cup.',
        'Same material. Different shape. Different purpose. A hammer would make a terrible cup, and a cup would make a terrible hammer, and neither one is broken.',
        '## The lesson',
        'You were shaped with a purpose. Your job is not to be someone else’s shape; it is to discover your own.'),
      data: { prompt: 'What do you think you were shaped to do? Name one thing you are naturally good at and how it could help someone.' } },
    { unit: 'Unit A · Identity', kind: 'quiz', title: 'Identity Check', minutes: 4,
      summary: 'Four questions on body, spirit and soul.',
      data: { questions: [
        { q: 'Which part of you holds your ideas, memories and dreams?', options: ['Body', 'Spirit', 'Soul', 'Brainstem'], answer: 2, explain: 'In this program, the soul is the part of you that dreams and holds your ideas, memories and personality.' },
        { q: 'In The Potter activity, why are the hammer and the cup different?', options: ['One used better clay', 'They were shaped for different purposes', 'One team worked harder', 'The cup is broken'], answer: 1, explain: 'Same material, different purpose. Neither one is broken.' },
        { q: 'Which part of you is most hurt by mean words?', options: ['Spirit', 'Bones', 'Lungs', 'Skin'], answer: 0, explain: 'Words land on the spirit. That is why the words we use with others matter so much.' },
        { q: 'What do healers do with their dreams?', options: ['Keep them secret', 'Carry them into the world on purpose', 'Wait for someone else', 'Forget them'], answer: 1, explain: 'Healers bring their dreams into the world on purpose.' },
      ] } },

    { unit: 'Unit B · Social Superpowers', kind: 'reading', title: 'Words Have Power', minutes: 6,
      summary: 'Positive and negative words, and the “I am whole” practice.',
      body: P(
        '## Words build or break',
        'Words create images in the mind. Positive words can build a person up. Mean words, like “you are so stupid” or “you will never be good enough,” can damage the spirit, and over time a person can start to believe them.',
        '## Communication rooted in truth',
        'Healers learn to speak in a way that is grounded and centered in truth: honest, kind and clear. This is the heart of good bedside manner.',
        '## The “I am whole” practice',
        'When people call me names, when I feel weak, sad or mad, when I feel left out, when I am in pain:',
        '**I am whole. I am whole. I am whole.**',
        'Say it out loud. You were not made to be broken.') },
    { unit: 'Unit B · Social Superpowers', kind: 'reading', title: 'Your Social Superpower', minutes: 7,
      summary: 'Grit, creativity and compassion: how you connect with others.',
      body: P(
        '## What is a social superpower?',
        'Your social superpower is the way you naturally connect with other people. It makes the connection between your brain, your spirit and your soul stronger, and it helps you help others.',
        '- **Brain**: language and the senses: taste, touch, hearing, sight and smell.',
        '- **Spirit**: how you respond to negative and positive energy around you.',
        '- **Soul**: your interests, desires, ideas, dreams and personality.',
        '## Three superpowers healers use every day',
        '- **Grit**: you keep going when it gets hard.',
        '- **Creativity**: you find new ways to solve problems.',
        '- **Compassion**: you feel with people and act to help.',
        'The Social Superpower Assessment will show which one you lead with.') },
    { unit: 'Unit B · Social Superpowers', kind: 'quiz', title: 'Superpower Check', minutes: 4,
      summary: 'Words, connection and the three healer superpowers.',
      data: { questions: [
        { q: 'A patient is scared before a procedure. Which superpower helps you sit with them and calm them?', options: ['Grit', 'Compassion', 'Creativity', 'Speed'], answer: 1, explain: 'Compassion is feeling with someone and acting to help.' },
        { q: 'Your science project fails twice and you try again. Which superpower is that?', options: ['Grit', 'Compassion', 'Luck', 'Creativity'], answer: 0, explain: 'Grit is continuing when it gets hard.' },
        { q: 'Which of these is part of the brain in this lesson?', options: ['Dreams', 'Language and the senses', 'Personality', 'Desires'], answer: 1, explain: 'Language and the five senses are the brain’s part of connection.' },
        { q: 'What makes communication “rooted in truth”?', options: ['Saying whatever you feel', 'Honest, kind and clear words', 'Only saying good news', 'Avoiding hard topics'], answer: 1, explain: 'Healers speak honestly, kindly and clearly.' },
      ] } },

    { unit: 'Unit C · The Brain and the Body', kind: 'reading', title: 'Body Positions and the Brain Map', minutes: 8,
      summary: 'Anterior, posterior, superior, inferior, and what each part of the brain does.',
      body: P(
        '## Directions on the body',
        'Healers describe the body with shared words so everyone pictures the same spot:',
        '- **Anterior**: toward the front. **Posterior**: toward the back.',
        '- **Superior**: toward the head. **Inferior**: toward the feet.',
        '## The brain map',
        '- **Frontal lobe**: thinking, planning, personality, movement and producing speech.',
        '- **Parietal lobe**: touch, pain, temperature and knowing where your body is in space.',
        '- **Temporal lobe**: hearing, memory and understanding language.',
        '- **Occipital lobe** (at the back): vision.',
        '- **Cerebellum**: balance and coordination.',
        '- **Brainstem**: breathing, heart rate and staying awake.',
        '## What can harm the brain and body',
        'Alcohol and drugs change how the brain works and can damage the brain and body. Healers learn how these effects show up so they can treat them, and so they can make strong choices for themselves.') },
    { unit: 'Unit C · The Brain and the Body', kind: 'quiz', title: 'Brain Map Check', minutes: 5,
      summary: 'Match each part of the brain to its job.',
      data: { questions: [
        { q: 'Which part of the brain is mostly responsible for vision?', options: ['Frontal lobe', 'Occipital lobe', 'Cerebellum', 'Temporal lobe'], answer: 1, explain: 'The occipital lobe at the back of the brain processes vision.' },
        { q: 'A person suddenly loses their balance and coordination. Which area is most involved?', options: ['Cerebellum', 'Parietal lobe', 'Frontal lobe', 'Occipital lobe'], answer: 0, explain: 'The cerebellum controls balance and coordination.' },
        { q: '“Posterior” means toward the…', options: ['Front', 'Head', 'Back', 'Feet'], answer: 2, explain: 'Posterior means toward the back. Anterior means toward the front.' },
        { q: 'Which part keeps you breathing without thinking about it?', options: ['Brainstem', 'Temporal lobe', 'Parietal lobe', 'Frontal lobe'], answer: 0, explain: 'The brainstem controls breathing and heart rate.' },
        { q: 'Understanding the words someone says to you mostly happens in the…', options: ['Occipital lobe', 'Temporal lobe', 'Cerebellum', 'Brainstem'], answer: 1, explain: 'The temporal lobe handles hearing and understanding language.' },
      ] } },
    { unit: 'Unit C · The Brain and the Body', kind: 'simulation', title: 'Mr. Johnson: A Stroke in Progress', minutes: 12,
      summary: 'A live patient case. Spot the signs of stroke and act fast.',
      body: P(
        'Mr. Johnson is 62. His granddaughter calls because something is wrong. You will assess him, recognize the signs of stroke using BE FAST, and decide what to do.',
        'Stroke is more common among Black Americans, who are nearly twice as likely as white Americans to have a first stroke. Knowing the signs saves brain, and lives.'),
      data: { sim: 'stroke' } },
    { unit: 'Unit C · The Brain and the Body', kind: 'quiz', title: 'Chest X-Ray ABCs', minutes: 5,
      summary: 'Learn a simple order for reading a chest X-ray.',
      body: P(
        'Doctors read chest X-rays in the same order every time so nothing is missed. One common order is **A-B-C-D-E**:',
        '- **A · Airway**: is the trachea (windpipe) in the middle?',
        '- **B · Bones**: look at the ribs, collarbones and spine.',
        '- **C · Cardiac**: is the heart a normal size?',
        '- **D · Diaphragm**: are the domes smooth and in the right place?',
        '- **E · Everything else**: the lung fields, edges and any tubes or devices.'),
      data: { questions: [
        { q: 'In the chest X-ray ABCs, what does “C” stand for?', options: ['Collarbone', 'Cardiac', 'Chest wall', 'Cough'], answer: 1, explain: 'C is for cardiac: check the size and shape of the heart.' },
        { q: 'Why do doctors read X-rays in the same order every time?', options: ['It is faster to skip steps', 'So nothing is missed', 'It is the law', 'Patients ask them to'], answer: 1, explain: 'A fixed order makes sure every part of the image gets checked.' },
        { q: 'Which structure should sit in the middle under “A”?', options: ['The heart', 'The trachea', 'The diaphragm', 'The stomach'], answer: 1, explain: 'A is airway: the trachea should be in the midline.' },
      ] } },
    { unit: 'Final', kind: 'quiz', title: 'Healer’s Final Evaluation', minutes: 8,
      summary: 'Bring it together. Your score counts toward your certificate of performance.',
      data: { questions: [
        { q: 'A woman’s face droops on one side and her speech is slurred. What should you do first?', options: ['Wait to see if it gets better', 'Call 911 right away and note the time', 'Give her water', 'Have her lie down and sleep'], answer: 1, explain: 'Time is brain. Call 911 and note when symptoms started.' },
        { q: 'What does the “B” in BE FAST stand for?', options: ['Blood', 'Balance', 'Breathing', 'Brain'], answer: 1, explain: 'B is balance: sudden loss of balance or coordination.' },
        { q: 'Which superpower helps you keep studying after a hard exam?', options: ['Grit', 'Compassion', 'Creativity', 'None'], answer: 0, explain: 'Grit keeps you going.' },
        { q: 'The part of you that dreams is your…', options: ['Body', 'Soul', 'Spirit', 'Cerebellum'], answer: 1, explain: 'In this program, the soul dreams.' },
        { q: 'Which lobe of the brain handles vision?', options: ['Occipital', 'Frontal', 'Parietal', 'Temporal'], answer: 0, explain: 'Vision is processed in the occipital lobe.' },
        { q: 'Why does the way a healer speaks matter?', options: ['It doesn’t', 'Words land on the spirit and can build or break', 'Only the medicine matters', 'Patients don’t listen'], answer: 1, explain: 'Words create images and land on the spirit. Healers speak with truth and kindness.' },
      ] } },
  ],
};

export async function ensureSeed() {
  await ensureClassroomTables();
  const [have] = await sql`SELECT id FROM programs WHERE slug = ${HEALERS.slug}`;
  if (have) return have.id;
  const h = HEALERS;
  const [p] = await sql`INSERT INTO programs (slug, title, subtitle, description, building, room, theme, pass_score)
    VALUES (${h.slug}, ${h.title}, ${h.subtitle}, ${h.description}, ${h.building}, ${h.room}, ${h.theme}, ${h.pass_score})
    ON CONFLICT (slug) DO UPDATE SET slug = EXCLUDED.slug RETURNING id`;
  let i = 0;
  for (const s of h.steps) {
    i += 1;
    await sql`INSERT INTO program_steps (program_id, sort_order, unit, kind, title, summary, body, media_url, data, minutes)
      VALUES (${p.id}, ${i}, ${s.unit}, ${s.kind}, ${s.title}, ${s.summary || null}, ${s.body || null},
        ${s.media_url || null}, ${JSON.stringify(s.data || {})}::jsonb, ${s.minutes || null})`;
  }
  return p.id;
}
