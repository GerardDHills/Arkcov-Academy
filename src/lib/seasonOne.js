import { sql } from '@/lib/db';
import { ensureCaseLibrary } from '@/lib/cases';

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
  summary: 'Why is Isaiah so tired? Interview, examine, build a model and a differential, then investigate.',
  minutes: 20,
  honor: 'Clinical Investigator',
  data: {
    code: 'CASE-001',
    rev: 4,
    specialty: 'Hematology · Gastroenterology',
    system: 'Digestive System',
    minutes: { junior: 20, senior: 35 },
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
        id: 'history', type: 'interview', title: 'Patient interview', min: 4,
        prompt: 'Choose questions to ask Isaiah. Ask at least four. Good healers ask about the whole body, not only the symptom that brought someone in.',
        questions: [
          { q: 'When did the tiredness begin?', a: 'About three months ago. It keeps getting worse.', feedback: 'How long a symptom has lasted, and whether it is getting worse, helps organize the investigation.' },
          { q: 'Does anything make it worse?', a: 'Running and walking upstairs.', feedback: 'Tiredness with exertion suggests the body may not be meeting its oxygen needs.' },
          { q: 'What kinds of foods do you eat?', a: 'Pretty much everything. Chicken, burgers, rice and beans, cereal. My mom cooks a lot.', feedback: 'His diet includes iron-rich foods. That makes “not eating enough iron” an unlikely explanation, so the team has to look harder.' },
          { q: 'How is your stomach feeling?', a: 'It hurts sometimes, down low on the right side, especially after I eat.', feedback: 'Belly pain is an important clue. The intestines are where the body absorbs iron.' },
          { q: 'How often are you going to the bathroom?', a: 'A lot more than before. Sometimes four or five times a day, and it’s loose.', feedback: 'Frequent, loose stools over weeks are not normal and point toward the digestive system.' },
          { q: 'Have you noticed any blood, like in the toilet?', a: 'Um… a few times there was some red. I didn’t want to say anything.', feedback: 'A key finding. Blood loss from the intestines is one of the main ways the body loses iron. Asking calmly and privately helps patients share hard things.' },
          { q: 'Has your weight changed?', a: 'My basketball shorts are loose now. I don’t really feel hungry.', feedback: 'Weight loss and low appetite in a growing teenager are warning signs that something is wrong.' },
          { q: 'How are you sleeping?', a: 'Pretty normal. I go to bed around ten.', feedback: 'Normal sleep makes simple sleepiness less likely as the full explanation.' },
        ],
        wrap: 'The history gives us clues from the blood and from the belly. It doesn’t give us a diagnosis yet.',
      },
      {
        id: 'exam', type: 'observe', title: 'Examination',
        text: 'The clinician examines Isaiah while you observe, and pulls up his growth chart.',
        findings: [
          { label: 'Skin and inner eyelids', value: 'Mildly pale', flag: 'abnormal' },
          { label: 'Heart rate at rest', value: '105 beats per minute', flag: 'high' },
          { label: 'Growth chart', value: 'Weight fell from the 50th to the 25th percentile in six months', flag: 'abnormal' },
          { label: 'Abdomen', value: 'Tender in the lower right side', flag: 'abnormal' },
          { label: 'Neurological exam', value: 'Normal', flag: 'normal' },
          { label: 'Breathing', value: 'Normal, clear lungs', flag: 'normal' },
        ],
        modes: {
          junior: { prompt: 'Which body systems should the team investigate?', choices: [
            { label: 'The blood and the digestive system', preferred: true, feedback: 'Yes. Paleness and a fast heart rate point to the blood. Belly pain, weight loss and blood in the toilet point to the digestive system. The two may be connected.' },
            { label: 'The bones', feedback: 'Bones don’t explain paleness, belly pain and weight loss. Think about what carries oxygen, and where iron is absorbed.' },
            { label: 'Only the lungs', feedback: 'His lungs sound clear. Look at the other clues: the belly and the growth chart.' },
          ] },
          senior: { prompt: 'What would help most to evaluate him next?', choices: [
            { label: 'A CBC, iron studies, inflammatory markers and a stool test for intestinal inflammation', preferred: true, feedback: 'Right. Pallor and tachycardia point to anemia, and the GI symptoms with weight loss call for looking for inflammation in the gut at the same time.' },
            { label: 'Start an iron supplement and recheck in three months', feedback: 'Iron alone would skip the most important question: why he is losing iron. Weight loss and blood in the stool need a workup now.' },
            { label: 'A chest X-ray', feedback: 'His lungs are clear. The history and exam point to the blood and the gut.' },
          ] },
        },
      },
      {
        id: 'model', type: 'model', title: 'Build the mental model',
        modes: {
          junior: {
            prompt: 'Build a model of what might be happening inside Isaiah. Tap a clue, then tap the link in the chain it is evidence for. Read the chain from top to bottom: each link leads to the next.',
            layers: [
              { id: 'gut', label: 'It starts in the belly', hint: 'Something is irritating his intestines.' },
              { id: 'iron', label: 'His body loses iron', hint: 'Blood leaks out, and iron isn’t absorbed well.' },
              { id: 'blood', label: 'His blood can’t make enough hemoglobin', hint: 'Fewer oxygen carriers in each drop of blood.' },
              { id: 'body', label: 'His muscles get less oxygen', hint: 'His body works harder to keep up.' },
            ],
            clues: [
              { id: 'pain', label: 'Belly pain after eating', layer: 'gut', feedback: 'Pain after eating points to the intestines.' },
              { id: 'stool', label: 'Loose stools many times a day', layer: 'gut', feedback: 'Irritated intestines move food through too fast.' },
              { id: 'weight', label: 'Losing weight, not hungry', layer: 'gut', feedback: 'When the intestines are inflamed, the body can’t take in enough food and energy.' },
              { id: 'blood', label: 'Blood in the toilet', layer: 'iron', feedback: 'Every bit of blood that leaves the body takes iron with it.' },
              { id: 'pale', label: 'Pale skin and eyelids', layer: 'blood', feedback: 'Hemoglobin gives blood its red color. Less of it makes skin look pale.' },
              { id: 'tired', label: 'Tired when running', layer: 'body', feedback: 'Working muscles need oxygen. With less oxygen, they tire quickly.' },
              { id: 'heart', label: 'Fast heartbeat at rest', layer: 'body', feedback: 'His heart pumps faster to move the oxygen he does have.' },
            ],
            wrap: 'You just built a mental model: a chain that connects what we see to what might be causing it. Healers use models like this to decide what could be wrong and what to test next.',
          },
          senior: {
            prompt: 'Build a causal model before ordering more tests. Assign each finding to the link in the chain it is best evidence for. The chain runs from root process to the consequences you can observe.',
            layers: [
              { id: 'root', label: 'Root process: intestinal inflammation', hint: 'Mucosal injury in the bowel.' },
              { id: 'mech', label: 'Mechanism: iron loss and malabsorption', hint: 'Chronic blood loss plus impaired iron uptake.' },
              { id: 'phys', label: 'Pathophysiology: iron-deficient erythropoiesis and anemia', hint: 'Too little iron to build hemoglobin.' },
              { id: 'comp', label: 'Consequence: reduced oxygen delivery and compensation', hint: 'Cardiac output rises to protect tissues.' },
            ],
            clues: [
              { id: 'rlq', label: 'Right lower quadrant tenderness', layer: 'root', feedback: 'The terminal ileum sits in the right lower quadrant and is commonly involved in Crohn’s disease.' },
              { id: 'diarrhea', label: 'Diarrhea four to five times daily', layer: 'root', feedback: 'Chronic diarrhea reflects inflamed bowel that absorbs poorly and moves contents quickly.' },
              { id: 'growth', label: 'Weight fell two percentile lines', layer: 'root', feedback: 'Growth deceleration is a classic clue to pediatric IBD: inflammation raises energy needs and lowers appetite and absorption.' },
              { id: 'heme', label: 'Blood in the stool', layer: 'mech', feedback: 'Visible or occult GI blood loss steadily drains iron stores.' },
              { id: 'gradual', label: 'Fatigue building gradually over three months', layer: 'phys', feedback: 'A slow fall in hemoglobin lets the body adapt, so anemia can become significant before symptoms are obvious.' },
              { id: 'pallor', label: 'Conjunctival pallor', layer: 'phys', feedback: 'Pallor reflects a lower hemoglobin concentration.' },
              { id: 'hr', label: 'Resting heart rate 105', layer: 'comp', feedback: 'Tachycardia raises cardiac output to maintain oxygen delivery.' },
              { id: 'exert', label: 'Exertional fatigue', layer: 'comp', feedback: 'Oxygen demand during exercise outstrips what anemic blood can carry.' },
            ],
            wrap: 'A good model is a hypothesis you can test. Yours predicts the labs should show low hemoglobin with small, iron-poor red cells, low ferritin and markers of inflammation.',
          },
        },
      },
      {
        id: 'ddx', type: 'differential', title: 'Build a differential diagnosis',
        modes: {
          junior: {
            prompt: 'Healers never stop at the first idea. List the possible causes: choose at least three that could explain Isaiah’s story, then move the one you think is most likely to the top.',
            min: 3, max: 5,
            options: [
              { id: 'ibd', label: 'Swelling and sores in the intestines (like Crohn’s disease)', fit: 'leading', why: 'Fits the belly pain, loose stools, blood, weight loss and low iron. This is the top suspect.' },
              { id: 'celiac', label: 'Trouble absorbing food (like celiac disease)', fit: 'possible', why: 'Can cause belly pain, weight loss and low iron. Worth testing, though it doesn’t usually cause visible blood.' },
              { id: 'infection', label: 'A stomach bug (infection)', fit: 'possible', why: 'Infections can cause diarrhea and even blood, but they usually get better in a week or two. Isaiah has been sick for three months.' },
              { id: 'ulcer', label: 'A sore in the stomach (an ulcer)', fit: 'possible', why: 'Ulcers can bleed and hurt, but the pain is usually higher up and they rarely cause diarrhea and weight loss in kids.' },
              { id: 'diet', label: 'Not eating enough iron', fit: 'unlikely', why: 'Isaiah eats chicken, burgers and beans. Diet doesn’t explain his belly pain or the blood.' },
              { id: 'asthma', label: 'Asthma', fit: 'unlikely', why: 'His lungs are clear, and asthma doesn’t cause low iron or belly symptoms.' },
              { id: 'shape', label: 'He’s just out of shape', fit: 'unlikely', why: 'That isn’t a diagnosis. It ignores the clues his body is giving us.' },
            ],
            wrap: 'A list of possible causes, ranked from most to least likely, is called a differential diagnosis. Tests help the team move ideas up or down the list.',
          },
          senior: {
            prompt: 'Build your differential diagnosis before the labs return. Choose four to six diagnoses, then rank them from most to least likely. Include anything dangerous you cannot afford to miss.',
            min: 4, max: 6,
            options: [
              { id: 'crohn', label: 'Crohn’s disease', fit: 'leading', why: 'Right lower quadrant pain, chronic diarrhea, blood in the stool, growth deceleration and iron deficiency form the classic pediatric picture. Terminal ileal disease fits the right-sided pain.' },
              { id: 'uc', label: 'Ulcerative colitis', fit: 'possible', why: 'Also causes bloody diarrhea and iron deficiency. Right-sided pain and growth failure fit Crohn’s better, but only endoscopy with biopsy can tell them apart.' },
              { id: 'celiac', label: 'Celiac disease', fit: 'possible', why: 'Impairs iron absorption and causes diarrhea and poor weight gain. Visible blood is unusual. A tTG-IgA screen is a simple first test.' },
              { id: 'infect', label: 'Infectious colitis (bacterial or parasitic)', fit: 'possible', why: 'Can cause bloody diarrhea. A three-month course makes most bacterial infections less likely, but stool studies are still part of the workup.' },
              { id: 'leuk', label: 'Leukemia', fit: 'cantmiss', why: 'Fatigue, pallor and weight loss in a child should always bring it to mind. A CBC with smear checks the other cell lines quickly. It would not explain the GI bleeding.' },
              { id: 'meckel', label: 'Meckel’s diverticulum', fit: 'possible', why: 'A pediatric cause of GI bleeding and iron deficiency, but usually painless and without diarrhea or weight loss.' },
              { id: 'diet', label: 'Dietary iron deficiency', fit: 'unlikely', why: 'His diet is adequate, and in an adolescent boy diet alone rarely explains iron deficiency. Anchoring here would miss the GI disease.' },
              { id: 'thal', label: 'Thalassemia trait', fit: 'unlikely', why: 'Can cause small red cells, but not GI symptoms, weight loss or blood loss.' },
              { id: 'decond', label: 'Deconditioning', fit: 'unlikely', why: 'Doesn’t explain pallor, tachycardia at rest, GI bleeding or weight loss.' },
            ],
            wrap: 'Now test your differential. The labs should help you move diagnoses up or down the list.',
          },
        },
      },
      {
        id: 'labs', type: 'labs', title: 'Virtual laboratory', modes_only: ['senior'],
        intro: 'The lab returns Isaiah’s results. Reference ranges are illustrative for a teenager and vary by laboratory.',
        results: [
          { test: 'Hemoglobin', value: '8.9', unit: 'g/dL', ref: '12.5–16.0', flag: 'low' },
          { test: 'MCV (red cell size)', value: '66', unit: 'fL', ref: '78–95', flag: 'low' },
          { test: 'RDW (variation in size)', value: '19', unit: '%', ref: '11.5–14.5', flag: 'high' },
          { test: 'Platelets', value: '520', unit: 'K/µL', ref: '150–450', flag: 'high' },
          { test: 'Ferritin (iron stores)', value: '5', unit: 'ng/mL', ref: '15–150', flag: 'low' },
          { test: 'Reticulocytes (new red cells)', value: '0.8', unit: '%', ref: '0.5–2.5', flag: 'note', note: 'Not appropriately raised for this degree of anemia' },
          { test: 'CRP (inflammation)', value: '4.1', unit: 'mg/dL', ref: '< 0.5', flag: 'high' },
          { test: 'ESR (inflammation)', value: '46', unit: 'mm/hr', ref: '0–20', flag: 'high' },
          { test: 'Albumin', value: '3.1', unit: 'g/dL', ref: '3.5–5.0', flag: 'low' },
          { test: 'Fecal calprotectin (gut inflammation)', value: '820', unit: 'µg/g', ref: '< 50', flag: 'high' },
          { test: 'Celiac screen (tTG-IgA)', value: 'Negative', unit: '', ref: 'Negative', flag: 'normal' },
        ],
      },
      {
        id: 'decision', type: 'decision', title: 'What explains the evidence?',
        modes: {
          junior: { prompt: 'Look back at your differential. Isaiah’s blood has less hemoglobin because he is low on iron, and he eats plenty of iron-rich foods. Which explanation fits best?', choices: [
            { label: 'Something in his digestive system is losing blood or not absorbing iron', preferred: true, feedback: 'Exactly. His belly pain, weight loss and the blood he noticed suggest his intestines are inflamed. That can leak blood and keep iron from being absorbed, so his body can’t make enough hemoglobin.' },
            { label: 'He isn’t eating enough iron', feedback: 'He eats chicken, burgers and beans. For a teenage boy, diet alone rarely explains this much iron loss, so healers look for where the iron is going.' },
            { label: 'He just has a cold', feedback: 'A cold doesn’t last three months or cause weight loss and low hemoglobin.' },
            { label: 'He isn’t trying hard enough', feedback: 'His tiredness is biological, not a lack of effort. That’s an important lesson for every healer.' },
          ] },
          senior: { prompt: 'Look back at your differential. With the labs in hand, which explanation is now best supported?', choices: [
            { label: 'Iron deficiency anemia from intestinal blood loss and inflammation, concerning for inflammatory bowel disease such as Crohn’s disease', preferred: true, feedback: 'Correct. Small cells, high RDW and very low ferritin show iron deficiency. High CRP, ESR, platelets and calprotectin, low albumin, weight loss and right-sided pain point to inflamed bowel. Diagnosis is confirmed by a pediatric gastroenterologist with endoscopy and colonoscopy.' },
            { label: 'Dietary iron deficiency', feedback: 'His diet includes iron-rich foods, and in an adolescent boy with normal development diet alone is an uncommon cause. The inflammation and GI symptoms need an explanation.' },
            { label: 'Thalassemia trait', feedback: 'Thalassemia trait causes small red cells, but ferritin is usually normal and it doesn’t cause weight loss, abdominal pain or inflammation.' },
            { label: 'Anemia of inflammation alone', feedback: 'Inflammation is clearly present, but in anemia of inflammation alone ferritin is usually normal or high. A ferritin of 5 means true iron deficiency too.' },
          ] },
        },
        wrap: 'The findings support iron deficiency anemia caused by a problem in the gut. The supervising physician refers Isaiah to pediatric gastroenterology, where a scope of his intestines can confirm the diagnosis and guide treatment.',
      },
      {
        id: 'bodyworld', type: 'oxygen', title: 'Into the bloodstream',
        intro: 'The camera moves into Isaiah’s bloodstream. Deliver oxygen to his leg muscles and compare a typical bloodstream with his.',
        normal_hb: 14, patient_hb: 8.9,
      },
    ],
    debrief: {
      science: 'Hemoglobin carries oxygen in red blood cells, and the body needs iron to make it. Isaiah’s inflamed intestines were losing small amounts of blood and absorbing iron poorly, so he couldn’t make enough hemoglobin. Less oxygen reached his working muscles, his heart beat faster and he tired easily.',
      pearl: 'Low iron is a clue, not a final answer. Healers always ask why. In a teenage boy who eats a normal diet, iron deficiency often means blood loss or poor absorption in the gut, such as inflammatory bowel disease. In a teenage girl, heavy menstrual periods that begin at puberty are a common cause. In very young children, drinking too much cow’s milk is a frequent reason.',
      uncertainty: 'A pediatric gastroenterologist will confirm the diagnosis with endoscopy and colonoscopy, then build a treatment plan with Isaiah and his family to calm the inflammation and restore his iron.',
      human: 'Isaiah almost didn’t mention the blood because he was embarrassed. Fatigue should never be dismissed as a lack of effort, and a calm, private question can uncover the most important clue.',
      closing: 'Isaiah’s fatigue was not a failure of determination. His body was experiencing a biological problem. Understanding that difference helps us care for people with compassion.',
    },
    journal: { prompt: 'What did Isaiah’s story teach you about listening to someone who says they’re tired?' },
    discussion: ['Why didn’t Isaiah mention the blood at first? How could a healer make it easier to share?', 'How might the cause of iron deficiency be different for a teenage girl, or a toddler?'],
  },
  founder_notes: 'Talk about the importance of taking children’s symptoms seriously, especially when they aren’t visible to others. Teaching point: in an adolescent boy with a normal diet and normal development, iron deficiency is rarely dietary; look for GI causes such as IBD or Crohn’s disease. In adolescent girls, consider menstrual losses after menarche. A story about a teen whose GI symptoms surfaced only after a careful history works well here.',
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
    if (have) {
      // Refresh an unapproved draft when the seeded content has been revised.
      if (item.data.rev) {
        await sql`UPDATE program_steps SET data = ${JSON.stringify(item.data)}::jsonb, summary = ${item.summary},
            founder_notes = ${item.founder_notes}, title = ${item.title}, minutes = ${item.minutes}
          WHERE id = ${have.id} AND reviewed = false AND COALESCE((data->>'rev')::int, 1) < ${item.data.rev}`;
      }
      continue;
    }
    await sql`UPDATE program_steps SET sort_order = sort_order + 1 WHERE program_id = ${p.id}`;
    await sql`INSERT INTO program_steps (program_id, sort_order, unit, kind, title, summary, body, data, minutes, reviewed, founder_notes, code, honor)
      VALUES (${p.id}, 1, ${item.unit}, ${item.kind}, ${item.title}, ${item.summary}, null, ${JSON.stringify(item.data)}::jsonb,
        ${item.minutes}, false, ${item.founder_notes}, ${item.code}, ${item.honor})`;
  }
  seeded = true;
  await ensureCaseLibrary();
}

export { SUPERPOWER_BODY, SUPERPOWER_CHECK };
