import { makeCase } from './kit';

// Sickle cell complication and psychiatry cases. Values are illustrative.

const CRISIS = 'If you or someone you know is struggling or thinking about suicide, call or text 988 (the Suicide & Crisis Lifeline in the U.S.) or talk with a trusted adult right away.';

export const SEQUESTRATION = makeCase({
  code: 'CASE-042', slug: 'jayden-spleen', room: 'emergency-department', emergency: true,
  title: 'A Swollen Belly', summary: 'Jayden has sickle cell disease. Today he’s pale and sleepy, and his belly is swollen on the left. His blood is pooling in his spleen.',
  specialty: 'Pediatric Hematology', system: 'Blood & Cancer', minutes: [20, 30],
  patient: { name: 'Jayden Moore', age: 2, concern: 'Pale, sleepy, swollen belly', interests: ['Trucks', 'Bubbles'] },
  art: 'a pale sleepy 2-year-old Black toddler lying on a pediatric emergency bed, his mother kneeling beside him holding his hand, a pediatric hematologist gently feeling the left side of his belly, a nurse preparing a small IV, calm urgent atmosphere',
  opening: {
    scene: 'Jayden has sickle cell disease (HbSS). This morning his mom noticed he was unusually pale and sleepy, and his belly looked swollen on the left side.',
    dialogue: 'His doctor taught me to feel for his spleen. Today it felt huge.',
    speaker: 'Jayden’s mom',
    narrator: 'In young children with sickle cell disease, the spleen can suddenly trap a large amount of blood. This can cause shock within hours.',
    narratorRole: 'Pediatric hematologist',
  },
  history: {
    min: 3, speaker: 'Jayden’s mom', prompt: 'Ask Jayden’s mom at least three questions.',
    q: [
      ['When did you notice the swelling?', 'This morning. Yesterday he was fine.', 'Sudden onset over hours fits sequestration.'],
      ['Has he been sick?', 'A runny nose and low fever two days ago.', 'Viral infections often trigger it.'],
      ['Has this happened before?', 'No, this is the first time.', 'It can recur, which affects future decisions.'],
      ['Is he taking his penicillin?', 'Yes, twice a day.', 'Daily penicillin protects against infection because the spleen doesn’t work well.'],
      ['How much is he peeing and drinking?', 'Less than usual.', 'Signs of poor perfusion.'],
    ],
  },
  exam: {
    text: 'You observe the exam.',
    f: [['Heart rate', '178 beats per minute', 'high'], ['Capillary refill', '4 seconds', 'abnormal'], ['Skin', 'Very pale', 'abnormal'], ['Spleen', 'Enlarged, 6 cm below the ribs (baseline not felt)', 'abnormal'], ['Alertness', 'Sleepy', 'abnormal'], ['Temperature', '37.9 °C', 'note']],
    junior: ['Where has Jayden’s blood gone?', [
      ['It’s trapped in his enlarged spleen', 'Right. The spleen is holding blood the rest of his body needs.', true],
      ['He lost it in his urine', 'No sign of that.'],
      ['He doesn’t have enough water', 'The problem is blood trapped in the spleen.'],
    ]],
    senior: ['What is your assessment?', [
      ['Acute splenic sequestration crisis with hypovolemic shock', 'Correct. A rapidly enlarging spleen with acute anemia and shock.', true],
      ['Aplastic crisis', 'Aplastic crisis causes anemia with a low reticulocyte count and no splenomegaly.'],
      ['Sepsis alone', 'Always consider; the spleen size is the key finding.'],
    ]],
  },
  act: {
    junior: {
      prompt: 'Put the team’s steps in order.',
      steps: [['Give oxygen and attach monitors', 'Support him first.'], ['Start an IV', 'For fluids and blood.'], ['Give a small amount of fluid to support his blood pressure', 'While blood is prepared.'], ['Give a careful blood transfusion', 'Replaces the blood he needs.'], ['Check his spleen and blood count often', 'The spleen can release blood back.']],
      distractors: [['Wait to see if the spleen shrinks by itself', 'He is in shock.'], ['Send him home with pain medicine', 'This is an emergency.']],
    },
    senior: {
      prompt: 'Order the management of acute splenic sequestration.',
      steps: [['ABCs, oxygen, monitors', 'Shock.'], ['Obtain IV or IO access; send CBC, reticulocytes, type and crossmatch, blood culture', 'Prepare for transfusion.'], ['Give a cautious isotonic fluid bolus while blood is prepared', 'Support perfusion.'], ['Transfuse red cells in small aliquots (about 5 mL/kg)', 'Trapped blood may be released as the spleen shrinks.'], ['Give empiric antibiotics for fever', 'Functional asplenia.'], ['Reassess spleen size and hemoglobin frequently; avoid overshooting to a high hemoglobin', 'Risk of hyperviscosity.']],
      distractors: [['Transfuse to a hemoglobin of 12', 'Autotransfusion from the spleen can cause dangerous hyperviscosity.'], ['Withhold transfusion until the hemoglobin result returns', 'Shock needs action.']],
    },
  },
  model: {
    junior: {
      layers: [['sickle', 'Sickle cells get stuck in the spleen', 'The spleen filters blood.'], ['pool', 'Blood pools inside', 'It can’t get out.'], ['less', 'Less blood for the body', 'Sudden anemia.'], ['shock', 'The body goes into shock', 'Fast heart, pale, sleepy.']],
      clues: [['ss', 'Sickle cell disease', 'sickle', 'Sickle cells clog the spleen.'], ['cold', 'A cold two days ago', 'sickle', 'Infections can trigger it.'], ['belly', 'Big spleen on the left', 'pool', 'Blood trapped inside.'], ['pale', 'Very pale', 'less', 'Less blood circulating.'], ['heart', 'Heart rate 178', 'shock', 'Racing to compensate.'], ['sleepy', 'Sleepy', 'shock', 'The brain needs more blood.']],
      wrap: 'Sickle cells clogged Jayden’s spleen, trapping blood inside. The rest of his body ran short, and he went into shock.',
    },
    senior: {
      layers: [['voc', 'Intrasplenic vaso-occlusion', 'Sickled cells obstruct outflow.'], ['trap', 'Rapid splenic pooling of red cells', 'Massive splenomegaly.'], ['anemia', 'Acute anemia with marrow response', 'Hemoglobin falls ≥ 2 g/dL.'], ['shock', 'Hypovolemic shock', 'Loss of circulating volume.']],
      clues: [['hbss', 'HbSS, age 2', 'voc', 'Peak age before autosplenectomy.'], ['viral', 'Recent viral illness', 'voc', 'Common trigger.'], ['spl', 'Spleen 6 cm below costal margin', 'trap', 'Sudden enlargement.'], ['pallor', 'Marked pallor', 'anemia', 'Acute drop.'], ['tachy', 'Tachycardia, CRT 4 s, lethargy', 'shock', 'Hypovolemia.']],
      wrap: 'Your model predicts a hemoglobin far below baseline, a high reticulocyte count and a moderate platelet drop.',
    },
  },
  ddx: {
    junior: { options: [
      ['seq', 'Blood trapped in the spleen (sequestration)', 'leading', 'Sickle cell disease, a big spleen and sudden paleness.'],
      ['infection', 'A serious infection', 'cantmiss', 'Children with sickle cell disease get dangerous infections. Doctors check.'],
      ['aplastic', 'The body stopped making red cells', 'possible', 'A virus can do this, but the spleen wouldn’t be big.'],
      ['tummy', 'A tummy ache', 'unlikely', 'He is in shock.'],
      ['dry', 'Dehydration', 'possible', 'Can make him tired, but not explain the spleen.'],
    ] },
    senior: { options: [
      ['asc', 'Acute splenic sequestration crisis', 'leading', 'Splenomegaly, acute anemia, shock.'],
      ['sepsis', 'Bacteremia or sepsis', 'cantmiss', 'Fever in SCD; cover with antibiotics.'],
      ['aplastic', 'Transient aplastic crisis (parvovirus B19)', 'possible', 'Low reticulocytes, no splenomegaly.'],
      ['hyperhem', 'Hyperhemolysis', 'possible', 'After transfusion; high LDH and bilirubin.'],
      ['hepatic', 'Hepatic sequestration', 'possible', 'Enlarging liver instead of spleen.'],
    ] },
  },
  labs: { r: [
    ['Hemoglobin', '3.8', 'g/dL', 'Baseline 8.0', 'low'],
    ['Reticulocytes', '15', '%', 'Baseline 10', 'high'],
    ['Platelets', '92', 'K/µL', '150–450', 'low'],
    ['White blood cells', '16.0', 'K/µL', '5.0–15.5', 'high'],
    ['Blood culture', 'Pending', '', 'No growth', 'note'],
  ] },
  decision: {
    junior: ['What happened to Jayden?', [
      ['His spleen trapped his blood, so his body ran short', 'Exactly. A careful transfusion brought him back.', true],
      ['A tummy ache', 'His blood count dropped dangerously.'],
      ['His body stopped making blood', 'His reticulocytes are high, so his body is making blood.'],
    ]],
    senior: ['Which explanation is best supported?', [
      ['Acute splenic sequestration crisis', 'Correct. Hemoglobin 3.8 from baseline 8, reticulocytosis and thrombocytopenia.', true],
      ['Aplastic crisis', 'Reticulocytes are high.'],
      ['Sepsis alone', 'The splenic enlargement and hemoglobin drop define sequestration.'],
    ]],
    wrap: 'After two small transfusions, Jayden’s spleen shrinks and his color returns. His team discusses future prevention, including transfusions or surgery to remove the spleen if it happens again.',
  },
  debrief: {
    science: 'In young children with sickle cell disease, sickled red cells can block the spleen’s outflow. Blood pools inside, the spleen swells and the rest of the body loses blood suddenly.',
    pearl: 'Families of young children with sickle cell disease learn to feel for the spleen. A swollen belly, paleness or sleepiness needs emergency care.',
    uncertainty: 'Sequestration recurs in about half of children. The team will plan prevention with his family.',
    human: 'Jayden’s mom recognized the danger because his doctor taught her what to feel for. Teaching families saves lives.',
    closing: 'Partnership with families is one of sickle cell medicine’s strongest tools.',
  },
  founder: 'Teaching point: splenic sequestration; parental spleen palpation education; transfuse in small aliquots. Your clinical experience with families makes this case powerful.',
});

export const SCD_STROKE = makeCase({
  code: 'CASE-043', slug: 'tiana-stroke', room: 'emergency-department', emergency: true,
  title: 'A Stroke at Seven', summary: 'Tiana has sickle cell disease. At breakfast, her right arm went weak and her words came out wrong. Children can have strokes too.',
  specialty: 'Pediatric Hematology & Neurology', system: 'Blood & Cancer', minutes: [20, 35],
  patient: { name: 'Tiana Jackson', age: 7, concern: 'Sudden weak arm and slurred speech', interests: ['Dancing', 'Drawing'] },
  art: 'a 7-year-old Black girl with braids lying in a pediatric emergency bed, her right hand resting limply on a blanket, her grandmother holding her other hand, a pediatric neurologist doing a gentle exam, an MRI suite door in the background, calm serious lighting',
  opening: {
    scene: 'Tiana has sickle cell disease (HbSS). At breakfast she dropped her spoon. Her right arm wouldn’t move well, and her words came out slurred. Her grandmother called 911.',
    dialogue: 'She was talking fine and then suddenly she couldn’t say her words.',
    speaker: 'Tiana’s grandmother',
    narrator: 'Children with sickle cell disease have a much higher risk of stroke than other children. Screening can prevent most strokes.',
    narratorRole: 'Pediatric hematologist',
  },
  history: {
    min: 3, speaker: 'Tiana’s grandmother',
    q: [
      ['What time did this start?', '7:30, at breakfast.', 'Time of onset guides treatment.'],
      ['Has she had a transcranial Doppler (TCD) ultrasound?', 'We missed the last two appointments. Transportation was hard.', 'TCD screening finds children at high stroke risk. Missed screening is a key clue.'],
      ['Is she taking hydroxyurea?', 'She was supposed to start, but we didn’t fill it.', 'Hydroxyurea lowers complications.'],
      ['Did she hit her head or have a seizure?', 'No.', 'Helps exclude mimics.'],
      ['Has she had a fever?', 'No.', 'Infection is less likely.'],
    ],
  },
  exam: {
    text: 'You observe the exam.',
    f: [['Right arm and face', 'Weak', 'abnormal'], ['Speech', 'Slurred, trouble finding words', 'abnormal'], ['Oxygen saturation', '94%', 'low'], ['Fingerstick glucose', '98 mg/dL', 'normal'], ['Temperature', 'Normal', 'normal']],
    junior: ['What do Tiana’s symptoms suggest?', [
      ['A stroke: part of her brain isn’t getting enough blood', 'Right. Sudden weakness on one side and trouble speaking are stroke signs, even in children.', true],
      ['She’s tired', 'Sudden one-sided weakness is never just tiredness.'],
      ['A cold', 'Colds don’t cause weakness on one side.'],
    ]],
    senior: ['What is your assessment?', [
      ['Acute ischemic stroke in a child with sickle cell disease', 'Correct. Left hemisphere signs; imaging and emergent exchange transfusion.', true],
      ['Todd paralysis', 'No seizure.'],
      ['Hemiplegic migraine', 'No headache history; stroke must be assumed in SCD.'],
    ]],
  },
  act: {
    junior: {
      prompt: 'Put the team’s steps in order.',
      steps: [['Call 911 and note the time', 'Time matters.'], ['Give oxygen and check her blood sugar', 'Support the brain.'], ['Get a brain scan (MRI)', 'See the stroke.'], ['Exchange her blood for healthy blood', 'Lowers the sickle cells quickly.'], ['Start a plan to prevent another stroke', 'Regular transfusions and check-ups.']],
      distractors: [['Wait until tomorrow’s clinic visit', 'This is an emergency.'], ['Give her a nap and see if it passes', 'Every minute counts.']],
    },
    senior: {
      prompt: 'Order the management of acute stroke in sickle cell disease.',
      steps: [['ABCs; oxygen to keep saturation above 95%; check glucose', 'Support the brain; exclude hypoglycemia.'], ['Urgent neuroimaging (MRI with MRA; CT if MRI unavailable)', 'Confirm ischemia, exclude hemorrhage.'], ['Send CBC, HbS percentage, type and crossmatch', 'Prepare for transfusion.'], ['Begin emergent exchange transfusion to reduce HbS below 30%', 'Standard of care; simple transfusion if exchange is delayed.'], ['Plan secondary prevention with chronic transfusions', 'Recurrence risk is high without it.']],
      distractors: [['Give IV alteplase as first-line', 'Not standard for children with SCD; transfusion is the priority.'], ['Wait for neurology before transfusion', 'Hematology and neurology act in parallel.']],
    },
  },
  model: {
    junior: {
      layers: [['narrow', 'Sickle cells damage brain blood vessels over time', 'Arteries narrow.'], ['block', 'An artery gets blocked', 'Blood can’t reach part of the brain.'], ['brain', 'That part of the brain stops working', 'On the left side.'], ['signs', 'Weak right arm and trouble talking', 'What we see.']],
      clues: [['ss', 'Sickle cell disease', 'narrow', 'Damages vessels.'], ['tcd', 'Missed TCD screening', 'narrow', 'Would have shown narrowing.'], ['sudden', 'Started suddenly at breakfast', 'block', 'A blockage acts fast.'], ['arm', 'Weak right arm', 'signs', 'The left brain controls the right side.'], ['words', 'Trouble with words', 'signs', 'Language is on the left.']],
      wrap: 'Over time, sickle cells narrowed arteries in Tiana’s brain. One became blocked, and the left side of her brain lost blood flow.',
    },
    senior: {
      layers: [['vasc', 'Large-vessel cerebral vasculopathy', 'Intimal hyperplasia in the ICA/MCA.'], ['occ', 'Arterial occlusion', 'In situ thrombosis or reduced flow.'], ['isch', 'Left MCA territory ischemia', 'Infarction.'], ['def', 'Right hemiparesis and aphasia', 'Deficits.']],
      clues: [['hbss', 'HbSS without disease-modifying therapy', 'vasc', 'Untreated risk.'], ['tcd', 'Missed TCD screening', 'vasc', 'Elevated velocities would have triggered prevention.'], ['abrupt', 'Abrupt onset', 'occ', 'Arterial event.'], ['hemi', 'Right face and arm weakness', 'def', 'Left hemisphere.'], ['aph', 'Aphasia', 'def', 'Dominant hemisphere.']],
      wrap: 'Your model predicts an acute left MCA infarct with arterial stenosis, a low hemoglobin and HbS around 90%.',
    },
  },
  ddx: {
    junior: { options: [
      ['stroke', 'A stroke from sickle cell disease', 'leading', 'Sudden one-sided weakness and trouble talking.'],
      ['bleed', 'Bleeding in the brain', 'cantmiss', 'Also a kind of stroke; the scan tells them apart.'],
      ['sugar', 'Low blood sugar', 'possible', 'Can look like a stroke. Her sugar is normal.'],
      ['seizure', 'After a seizure', 'possible', 'Weakness can follow a seizure. She didn’t have one.'],
      ['tired', 'Being tired', 'unlikely', 'Never causes one-sided weakness.'],
    ] },
    senior: { options: [
      ['isch', 'Acute ischemic stroke from SCD vasculopathy', 'leading', 'Classic.'],
      ['ich', 'Hemorrhagic stroke', 'cantmiss', 'More common in adults with SCD; imaging excludes.'],
      ['hypo', 'Hypoglycemia', 'possible', 'Excluded.'],
      ['todd', 'Todd paralysis', 'possible', 'Requires a seizure.'],
      ['pres', 'Posterior reversible encephalopathy syndrome', 'possible', 'Hypertension, headache, seizures.'],
      ['mig', 'Hemiplegic migraine', 'unlikely', 'Diagnosis of exclusion.'],
    ] },
  },
  labs: { title: 'Labs and imaging', r: [
    ['Hemoglobin', '7.2', 'g/dL', 'Baseline 7.5', 'low'],
    ['HbS', '91', '%', 'Target < 30 after exchange', 'high'],
    ['MRI brain', 'Acute infarct, left middle cerebral artery territory', '', 'Normal', 'abnormal'],
    ['MR angiography', 'Narrowing of the left middle cerebral artery', '', 'Normal vessels', 'abnormal'],
  ] },
  decision: {
    junior: ['What happened to Tiana?', [
      ['A stroke caused by sickle cell disease', 'Exactly. An exchange transfusion protects her brain now.', true],
      ['She was tired', 'Her MRI shows a stroke.'],
      ['A seizure', 'Her MRI shows a stroke.'],
    ]],
    senior: ['Which explanation is best supported?', [
      ['Acute ischemic stroke from sickle cell vasculopathy', 'Correct. Emergent exchange transfusion, then chronic transfusion therapy.', true],
      ['Hemorrhagic stroke', 'MRI shows infarction.'],
      ['PRES', 'Vascular territory infarct with stenosis.'],
    ]],
    wrap: 'After an exchange transfusion, Tiana’s speech improves over days. She starts monthly transfusions and therapy. Her team helps arrange rides so she never misses a screening again.',
  },
  debrief: {
    science: 'Sickle cells damage the walls of large brain arteries, narrowing them. Narrowed arteries can block, cutting off blood to part of the brain.',
    pearl: 'Annual TCD screening for children with SCD ages 2–16 can identify those at high risk; regular transfusions for those children prevent most strokes. Hydroxyurea also helps.',
    uncertainty: 'Some children recover fully; others need long-term therapy. Bone marrow transplant can be considered.',
    human: 'Tiana missed screenings because of transportation. Barriers to care cause preventable strokes.',
    closing: 'Prevention only works when families can reach it.',
  },
  founder: 'Teaching point: TCD screening, exchange transfusion, social barriers to care in SCD. Your research on SCD outcomes fits well here.',
});

export const PRIAPISM = makeCase({
  code: 'CASE-044', slug: 'elias-priapism', room: 'emergency-department', emergency: true, seniorOnly: true,
  title: 'Four Hours', summary: 'Elias has sickle cell disease and a painful erection that won’t go away. It’s embarrassing, and it’s an emergency.',
  specialty: 'Pediatric Hematology & Urology', system: 'Blood & Cancer', minutes: [15, 25],
  patient: { name: 'Elias Ward', age: 15, concern: 'Painful, prolonged erection' },
  art: 'a 15-year-old Black teenage boy sitting on an emergency room bed in a hospital gown with a blanket over his lap, looking embarrassed and worried, a male urologist and a hematologist speaking with him respectfully, a privacy curtain, calm professional mood',
  opening: {
    scene: 'Elias has sickle cell disease. He woke up four hours ago with a painful erection that won’t go away. He waited because he was embarrassed.',
    dialogue: 'I didn’t know if this was something I could even tell anyone.',
    narrator: 'Priapism is a prolonged, often painful erection. In sickle cell disease, it is common and an emergency: lasting damage can occur after about four hours.',
    narratorRole: 'Urologist',
  },
  history: {
    min: 3,
    q: [
      ['How long has it lasted?', 'About four hours.', 'Ischemic priapism over four hours is an emergency.'],
      ['Has this happened before?', 'Short ones that went away after an hour.', 'Stuttering priapism often precedes a major episode.'],
      ['Is it painful?', 'Really painful.', 'Pain suggests ischemic (low-flow) priapism.'],
      ['Any injury or medicines?', 'No.', 'Trauma suggests high-flow priapism; some medicines can cause it.'],
      ['Are you taking hydroxyurea?', 'Not consistently.', 'Disease-modifying therapy may reduce episodes.'],
    ],
  },
  exam: {
    text: 'The urologist examines Elias with a chaperone present.',
    f: [['Penis', 'Rigid and tender', 'abnormal'], ['Heart rate', '102', 'high'], ['Temperature', 'Normal', 'normal'], ['Abdomen', 'Normal', 'normal']],
    senior: ['What type of priapism is this?', [
      ['Ischemic (low-flow) priapism from sickle cell disease', 'Correct. Painful and rigid; blood is trapped and oxygen-poor.', true],
      ['Non-ischemic (high-flow) priapism', 'Usually painless after trauma.'],
      ['Normal erection', 'Lasting four hours with pain is not normal.'],
    ]],
  },
  act: {
    senior: {
      prompt: 'Order the management of ischemic priapism in SCD.',
      steps: [['Give IV pain medicine and fluids', 'Comfort and hydration.'], ['Call urology emergently', 'Lasting more than 4 hours needs procedural treatment.'], ['Corporal aspiration with blood gas to confirm ischemia', 'Dark, low-oxygen blood confirms.'], ['Irrigation with phenylephrine injection', 'First-line procedure.'], ['Involve hematology for prevention planning', 'Hydroxyurea and other strategies.']],
      distractors: [['Wait at home until it goes away', 'Risks permanent damage.'], ['Exchange transfusion as the first treatment', 'Not first-line; urologic intervention comes first.']],
    },
  },
  model: {
    senior: {
      layers: [['sickle', 'Sickled cells in the penis', 'Low-oxygen environment.'], ['trap', 'Blood becomes trapped', 'Venous outflow blocked.'], ['isch', 'Oxygen falls and acid builds', 'Ischemia.'], ['harm', 'Pain and risk of permanent damage', 'Fibrosis after hours.']],
      clues: [['scd', 'Sickle cell disease', 'sickle', 'Up to a third of males with SCD experience priapism.'], ['prior', 'Short episodes before', 'sickle', 'Stuttering priapism.'], ['rigid', 'Rigid, painful', 'trap', 'Trapped blood.'], ['four', 'Four hours', 'isch', 'Ischemic time.'], ['pain', 'Severe pain', 'harm', 'Ischemia.']],
      wrap: 'Your model predicts a corporal blood gas with low oxygen and acidosis.',
    },
  },
  ddx: {
    senior: { options: [
      ['ischemic', 'Ischemic priapism from SCD', 'leading', 'Painful, rigid, prolonged.'],
      ['nonisch', 'Non-ischemic priapism', 'possible', 'Painless, after trauma.'],
      ['med', 'Medication-induced priapism', 'possible', 'Some antidepressants and other drugs.'],
      ['leuk', 'Leukemia with very high white count', 'cantmiss', 'A rare cause; CBC checks.'],
    ] },
  },
  labs: { r: [
    ['Corporal blood gas: pH', '7.10', '', '7.35–7.45', 'low'],
    ['Corporal blood gas: pO₂', '25', 'mmHg', '> 90 (arterial)', 'low'],
    ['Hemoglobin', '8.1', 'g/dL', 'Baseline 8.3', 'normal'],
    ['White blood cells', '11.0', 'K/µL', '4.5–13.0', 'normal'],
  ] },
  decision: {
    senior: ['Which explanation is best supported?', [
      ['Ischemic priapism due to sickle cell disease; aspiration and phenylephrine irrigation', 'Correct. Detumescence after treatment.', true],
      ['Non-ischemic priapism', 'Blood gas shows ischemia.'],
      ['Leukemia', 'Normal white count.'],
    ]],
    wrap: 'Aspiration and phenylephrine relieve the priapism. Elias’s hematologist restarts hydroxyurea and gives him a plan: if an episode lasts more than an hour despite home measures, come in immediately.',
  },
  debrief: {
    science: 'In the low-oxygen environment of an erection, sickle cells can block blood from leaving. Trapped blood loses oxygen, causing pain and, if prolonged, permanent scarring.',
    pearl: 'Any erection lasting over four hours needs emergency care. Boys and men with SCD should be taught about priapism early, without embarrassment.',
    uncertainty: 'Prevention strategies vary; his team will tailor them.',
    human: 'Elias almost didn’t come in. Talking about priapism openly, as a medical topic, protects future function.',
    closing: 'No symptom is too embarrassing to bring to a healer.',
  },
  founder: 'Teaching point: priapism is common and under-discussed in SCD; time-critical. Senior track only.',
});

export const DEPRESSION = makeCase({
  code: 'CASE-045', slug: 'marisol-depression', room: 'behavioral-health-center',
  advisory: `This case discusses depression. ${CRISIS}`,
  title: 'The Color Went Out', summary: 'Marisol stopped playing soccer, sleeps all day and feels like nothing matters. Recognize depression and how healers help.',
  specialty: 'Adolescent Psychiatry', system: 'Mind & Behavior', minutes: [20, 30],
  patient: { name: 'Marisol Vega', age: 16, concern: 'Sadness, sleeping a lot, falling grades', interests: ['Soccer (used to)', 'Music'] },
  art: 'a 16-year-old Latina teenage girl sitting on a couch in a calm counseling office hugging a pillow, looking tired and sad, a kind adolescent psychiatrist sitting across from her listening attentively, plants and soft window light, hopeful atmosphere',
  opening: {
    scene: 'Marisol’s mom brought her in because she quit soccer, sleeps 12 hours a day, and her grades dropped from A’s to C’s. She barely talks at dinner.',
    dialogue: 'It’s like all the color went out of everything.',
    narrator: 'Depression is a real medical illness, not weakness. About 1 in 5 teens experiences it. It is very treatable.',
    narratorRole: 'Adolescent psychiatrist',
  },
  history: {
    min: 4, prompt: 'Ask Marisol at least four questions. Speak with her privately and without judgment.',
    q: [
      ['How long have you felt this way?', 'About two months. Since my parents split up.', 'Symptoms lasting two weeks or more matter.'],
      ['Do you still enjoy things you used to love?', 'Not really. Even soccer feels pointless.', 'Loss of interest (anhedonia) is a core symptom.'],
      ['How are you sleeping and eating?', 'Sleeping all the time. Not hungry.', 'Sleep and appetite changes.'],
      ['Has anything been happening online or at school?', 'Some girls have been posting mean stuff about me.', 'Bullying and cyberbullying are major stressors.'],
      ['Do you ever have thoughts of hurting yourself or that you’d be better off dead?', 'No. I just feel empty.', 'Asking directly is safe and important. It does not plant the idea.'],
      ['Have you ever had times of feeling super energetic, not needing sleep?', 'No, never.', 'Screening for bipolar disorder matters before starting treatment.'],
      ['Do you use alcohol or drugs?', 'No.', 'Substances can cause or worsen depression.'],
    ],
  },
  exam: {
    text: 'You observe the visit.',
    f: [['Appearance', 'Tired, flat expression', 'abnormal'], ['Speech', 'Slow and quiet', 'abnormal'], ['Mood', 'Describes feeling “empty”', 'abnormal'], ['Thinking', 'Clear, logical', 'normal'], ['Safety', 'Denies thoughts of self-harm', 'normal'], ['Physical exam', 'Normal', 'normal']],
    junior: ['What might explain Marisol’s changes?', [
      ['Depression, a real medical illness that affects mood, sleep and interest', 'Right. It’s treatable, and asking for help is brave.', true],
      ['She’s being lazy', 'Depression is an illness, not laziness.'],
      ['She just needs to cheer up', 'Depression can’t be solved by trying to be happy.'],
    ]],
    senior: ['How do you interpret these findings?', [
      ['Major depressive episode: two months of low mood, anhedonia, sleep and appetite change, poor concentration, with impaired functioning', 'Correct. Screen with PHQ-A, assess safety, rule out medical causes.', true],
      ['Normal adolescent moodiness', 'Two months with major impairment is not normal moodiness.'],
      ['Bipolar disorder', 'No history of mania; still important to ask.'],
    ]],
  },
  model: {
    junior: {
      layers: [['risk', 'Things that raise risk', 'Family history and big changes.'], ['stress', 'Stress piles up', 'Divorce and bullying.'], ['brain', 'The brain’s mood systems change', 'It’s biology, not weakness.'], ['signs', 'Sadness, sleep and interest change', 'What we see.']],
      clues: [['divorce', 'Parents split up', 'stress', 'A major life change.'], ['bully', 'Mean posts online', 'stress', 'Bullying hurts.'], ['empty', 'Feels empty', 'brain', 'Mood systems are affected.'], ['soccer', 'Quit soccer', 'signs', 'Losing interest.'], ['sleep', 'Sleeping 12 hours', 'signs', 'Sleep changes.'], ['grades', 'Grades dropped', 'signs', 'Hard to concentrate.']],
      wrap: 'Big stresses landed on Marisol all at once. Her brain’s mood systems changed, and depression took the color out of her life. Treatment can bring it back.',
    },
    senior: {
      layers: [['vuln', 'Biological vulnerability', 'Genetics, temperament, puberty.'], ['stress', 'Psychosocial stressors', 'Family disruption, peer victimization.'], ['neuro', 'Altered stress and reward circuits', 'HPA axis, monoamines, neural networks.'], ['sx', 'Depressive syndrome with impairment', 'DSM-5 criteria.']],
      clues: [['div', 'Parental separation', 'stress', 'Loss and disruption.'], ['cyber', 'Cyberbullying', 'stress', 'Strong risk factor in teens.'], ['anhed', 'Anhedonia', 'neuro', 'Reward circuit changes.'], ['hyper', 'Hypersomnia, low appetite', 'sx', 'Neurovegetative symptoms.'], ['conc', 'Falling grades', 'sx', 'Concentration impaired.'], ['flat', 'Flat affect, slowed speech', 'sx', 'Psychomotor changes.']],
      wrap: 'Your model predicts a high PHQ-A score with normal thyroid and blood counts.',
    },
  },
  ddx: {
    junior: { options: [
      ['dep', 'Depression', 'leading', 'Two months of sadness, no interest, sleeping a lot and falling grades.'],
      ['thyroid', 'A thyroid problem', 'possible', 'Can cause tiredness and low mood; doctors check.'],
      ['anemia', 'Low iron', 'possible', 'Can cause tiredness.'],
      ['grief', 'Sadness about her parents', 'possible', 'Normal grief usually doesn’t stop someone from functioning for months.'],
      ['lazy', 'Being lazy', 'unlikely', 'Depression is an illness.'],
    ] },
    senior: { options: [
      ['mdd', 'Major depressive disorder', 'leading', 'Meets criteria with impairment.'],
      ['bipolar', 'Bipolar disorder', 'cantmiss', 'Ask about mania before starting antidepressants.'],
      ['adj', 'Adjustment disorder with depressed mood', 'possible', 'Less severe, linked to a stressor.'],
      ['hypothy', 'Hypothyroidism', 'possible', 'Check TSH.'],
      ['sud', 'Substance use', 'possible', 'Screen confidentially.'],
      ['anx', 'Anxiety disorder', 'possible', 'Often coexists.'],
    ] },
  },
  labs: { title: 'Screening and labs', both: true, r: [
    ['PHQ-A depression score', '18', 'of 27', '< 5', 'high', 'Moderately severe'],
    ['Suicide risk screen (ASQ)', 'Negative', '', 'Negative', 'normal'],
    ['TSH', '1.8', 'mIU/L', '0.5–4.5', 'normal'],
    ['Hemoglobin', '13.2', 'g/dL', '12.0–16.0', 'normal'],
  ] },
  decision: {
    junior: ['What does Marisol have?', [
      ['Depression, which is treatable', 'Exactly. Therapy, support and sometimes medicine help most teens feel better.', true],
      ['Nothing; she’ll snap out of it', 'Depression needs care.'],
      ['A thyroid problem', 'Her thyroid is normal.'],
    ]],
    senior: ['Which explanation is best supported?', [
      ['Major depressive disorder, moderately severe; CBT, family involvement and consideration of an SSRI with close monitoring', 'Correct. Address bullying with the school and recheck safety at each visit.', true],
      ['Adjustment disorder', 'Severity and duration meet criteria for major depression.'],
      ['Bipolar disorder', 'No history of mania.'],
    ]],
    wrap: 'Marisol starts weekly therapy and later fluoxetine, with regular check-ins. Her school addresses the bullying. Three months later, she’s back on the soccer field.',
  },
  debrief: {
    science: 'Depression involves changes in how the brain handles stress, reward and mood. Genetics and life stresses both play a role. It affects sleep, appetite, energy and concentration, not just mood.',
    pearl: 'Asking directly about suicidal thoughts does not plant the idea; it opens the door to help. Depression is treatable with therapy, medicine or both.',
    uncertainty: 'Some teens have more than one episode; learning early warning signs helps.',
    human: 'Marisol thought she was failing. Hearing that depression is an illness, not a flaw, was the first step.',
    closing: 'Healers treat the mind with the same seriousness as the body.',
  },
  founder: 'Teaching point: teen depression criteria, PHQ-A, asking directly about suicide, bipolar screening before SSRIs. Share 988 and destigmatize help-seeking.',
});

export const PANIC = makeCase({
  code: 'CASE-046', slug: 'lucas-panic', room: 'behavioral-health-center',
  advisory: `This case discusses anxiety and panic attacks. ${CRISIS}`,
  title: 'Is It My Heart?', summary: 'Lucas has sudden attacks of a racing heart and feeling like he’s dying. His heart tests are normal. Learn about panic disorder.',
  specialty: 'Psychiatry & Pediatrics', system: 'Mind & Behavior', minutes: [15, 25],
  patient: { name: 'Lucas Ferreira', age: 17, concern: 'Episodes of racing heart and feeling of doom', interests: ['Guitar', 'Skateboarding'] },
  art: 'a 17-year-old Brazilian-American teenage boy sitting in a calm counseling room practicing slow breathing with one hand on his chest and one on his belly, a psychologist across from him demonstrating, soft natural light, peaceful mood',
  opening: {
    scene: 'Lucas has had four emergency room visits in two months for sudden episodes: pounding heart, chest tightness, tingling hands and a feeling he’s about to die. Each time, his heart tests were normal.',
    dialogue: 'Every time, I’m sure I’m having a heart attack. Now I’m scared to ride the bus.',
    narrator: 'Panic attacks are real, intense and frightening. Ruling out medical causes matters, and so does recognizing panic disorder so it can be treated.',
  },
  history: {
    min: 3,
    q: [
      ['What happens during an attack?', 'My heart races, I can’t breathe, my hands tingle, and I feel like I’m dying.', 'Classic panic symptoms.'],
      ['How long do they last?', 'About ten minutes, then I’m exhausted.', 'Panic peaks within minutes.'],
      ['Do you avoid places because of them?', 'The bus and crowded hallways.', 'Avoidance is part of panic disorder.'],
      ['Do you drink caffeine or energy drinks?', 'Like three energy drinks a day.', 'Caffeine can trigger or worsen attacks.'],
      ['Do you ever faint or have attacks during exercise?', 'No.', 'Fainting or exercise-triggered symptoms would raise concern for heart disease.'],
      ['Does anyone in the family have anxiety or heart problems?', 'My mom has anxiety. No heart problems.', 'Family history.'],
    ],
  },
  exam: {
    text: 'You observe the visit between attacks.',
    f: [['Heart rate', '84, regular', 'normal'], ['Heart sounds', 'Normal, no murmur', 'normal'], ['Thyroid', 'Normal', 'normal'], ['Mood', 'Worried, but not depressed', 'note'], ['ECG', 'Normal', 'normal']],
    junior: ['His heart tests are normal. Does that mean the attacks aren’t real?', [
      ['No. Panic attacks are real and the body really reacts', 'Right. The alarm system fires even though there’s no danger.', true],
      ['Yes, he’s making them up', 'Panic attacks are very real.'],
      ['Yes, he should ignore them', 'They can be treated.'],
    ]],
    senior: ['What is the most likely diagnosis?', [
      ['Panic disorder with avoidance, after excluding cardiac and endocrine causes', 'Correct. Recurrent unexpected attacks plus worry and avoidance for over a month.', true],
      ['Supraventricular tachycardia', 'Must be considered; normal ECG and features favor panic, but a heart monitor can help.'],
      ['Hyperthyroidism', 'Normal exam; check TSH.'],
    ]],
  },
  model: {
    junior: {
      layers: [['sensitive', 'A sensitive alarm system', 'Can run in families.'], ['trigger', 'Something sets it off', 'Caffeine, stress, a body feeling.'], ['alarm', 'The body’s alarm fires', 'Adrenaline rushes.'], ['fear', 'Scary feelings lead to more fear', 'A cycle.']],
      clues: [['mom', 'Mom has anxiety', 'sensitive', 'Can run in families.'], ['drinks', 'Three energy drinks a day', 'trigger', 'Caffeine revs the alarm.'], ['heart', 'Racing heart, tingling hands', 'alarm', 'Adrenaline.'], ['dying', 'Feels like dying', 'alarm', 'The alarm says “danger.”'], ['bus', 'Avoids the bus', 'fear', 'Fear of the next attack.']],
      wrap: 'Lucas’s alarm system is sensitive, and caffeine helped set it off. Each attack made him fear the next, so he started avoiding places.',
    },
    senior: {
      layers: [['vuln', 'Heightened anxiety sensitivity', 'Genetic and temperamental.'], ['trig', 'Triggers', 'Stimulants, stress, interoceptive cues.'], ['surge', 'Sympathetic surge', 'Catecholamines, hyperventilation.'], ['cycle', 'Catastrophic interpretation and avoidance', 'Fear of fear.']],
      clues: [['fh', 'Maternal anxiety', 'vuln', 'Heritability.'], ['caf', 'High caffeine intake', 'trig', 'Lowers threshold.'], ['symp', 'Palpitations, chest tightness', 'surge', 'Autonomic arousal.'], ['par', 'Paresthesias', 'surge', 'Hyperventilation lowers CO₂.'], ['avoid', 'Avoidance of the bus', 'cycle', 'Maintains anxiety.']],
      wrap: 'Your model predicts normal cardiac and thyroid tests and improvement with CBT and reduced caffeine.',
    },
  },
  ddx: {
    junior: { options: [
      ['panic', 'Panic disorder', 'leading', 'Sudden attacks with normal heart tests and avoidance.'],
      ['heart', 'A heart rhythm problem', 'cantmiss', 'Doctors check the heart first. His tests are normal.'],
      ['caffeine', 'Too much caffeine', 'possible', 'Makes attacks more likely.'],
      ['asthma', 'Asthma', 'possible', 'Can cause chest tightness, usually with wheezing.'],
      ['faking', 'Faking it', 'unlikely', 'Panic attacks are real.'],
    ] },
    senior: { options: [
      ['pd', 'Panic disorder', 'leading', 'Recurrent unexpected attacks with worry and avoidance.'],
      ['svt', 'Supraventricular tachycardia', 'cantmiss', 'Sudden-onset palpitations; ambulatory monitor if suspicion remains.'],
      ['hyperthy', 'Hyperthyroidism', 'possible', 'Check TSH.'],
      ['stim', 'Stimulant or substance effect', 'possible', 'Caffeine, nicotine, other substances.'],
      ['gad', 'Generalized anxiety disorder', 'possible', 'Constant worry rather than discrete attacks.'],
      ['pheo', 'Pheochromocytoma', 'unlikely', 'Rare; episodic hypertension.'],
    ] },
  },
  labs: { title: 'Tests', both: true, r: [
    ['ECG', 'Normal sinus rhythm', '', 'Normal', 'normal'],
    ['TSH', '1.6', 'mIU/L', '0.5–4.5', 'normal'],
    ['Glucose', '90', 'mg/dL', '70–140', 'normal'],
    ['Urine drug screen', 'Negative', '', 'Negative', 'normal'],
    ['GAD-7 anxiety score', '14', 'of 21', '< 5', 'high'],
  ] },
  decision: {
    junior: ['What is happening to Lucas?', [
      ['Panic disorder: his body’s alarm goes off when there’s no danger', 'Exactly. Therapy and cutting back on caffeine can help a lot.', true],
      ['Heart disease', 'His heart tests are normal.'],
      ['He’s making it up', 'Panic attacks are real.'],
    ]],
    senior: ['Which explanation is best supported?', [
      ['Panic disorder; CBT with interoceptive exposure, caffeine reduction, consider an SSRI', 'Correct. Breathing skills help during attacks.', true],
      ['SVT', 'Normal ECG; consider a monitor only if features change.'],
      ['Generalized anxiety disorder', 'Discrete attacks and avoidance fit panic disorder.'],
    ]],
    wrap: 'Lucas cuts out energy drinks and starts CBT. He learns slow breathing and practices facing the bus ride step by step. His attacks become rare.',
  },
  debrief: {
    science: 'In a panic attack, the brain’s threat system triggers a burst of adrenaline: racing heart, fast breathing, tingling. The sensations feel dangerous, which creates more fear.',
    pearl: 'Rule out medical causes, then name panic disorder clearly. Slow breathing, CBT and gradual exposure are very effective.',
    uncertainty: 'Some people have attacks again during stressful times; skills learned in therapy keep working.',
    human: 'Lucas felt embarrassed after each ER visit. Validating his experience mattered as much as the tests.',
    closing: 'Real fear deserves real care, even when the heart is healthy.',
  },
  founder: 'Teaching point: panic attack physiology, ruling out cardiac causes, CBT and exposure. Demonstrate box breathing in a live session.',
});

export const PTSD = makeCase({
  code: 'CASE-047', slug: 'ben-ptsd', room: 'behavioral-health-center',
  advisory: `This case discusses trauma after a car crash. ${CRISIS}`,
  title: 'After the Crash', summary: 'Three months after a car crash, Ben has nightmares, startles easily and won’t ride in a car. Learn about PTSD.',
  specialty: 'Child & Adolescent Psychiatry', system: 'Mind & Behavior', minutes: [20, 30],
  patient: { name: 'Ben Harper', age: 14, concern: 'Nightmares, jumpiness and avoiding cars', interests: ['Baseball', 'Video games'] },
  art: 'a 14-year-old white teenage boy with a cast-free healed arm sitting in a calm therapy room, holding a stress ball, looking guarded, a trauma-focused therapist sitting at an angle with a gentle open posture, soft lamp light, safe and calm mood',
  opening: {
    scene: 'Three months ago, Ben was in a serious car crash. His arm has healed, but he has nightmares several nights a week, jumps at loud noises and refuses to ride in cars. He walks 40 minutes to school.',
    dialogue: 'Every time I close my eyes, I hear the brakes.',
    narrator: 'Trauma can leave lasting effects on the brain’s alarm and memory systems. PTSD is treatable, and early care helps.',
    narratorRole: 'Child psychiatrist',
  },
  history: {
    min: 3,
    q: [
      ['How often do you have nightmares?', 'Four or five nights a week.', 'Re-experiencing symptoms.'],
      ['Do memories of the crash pop up during the day?', 'Yeah, out of nowhere. Like I’m back there.', 'Intrusive memories and flashbacks.'],
      ['What do you avoid?', 'Cars, the road where it happened, talking about it.', 'Avoidance keeps PTSD going.'],
      ['How do you react to loud noises?', 'I jump and my heart pounds.', 'Hyperarousal.'],
      ['Did you hit your head in the crash?', 'Yes, but the CT was normal.', 'A concussion can overlap with PTSD symptoms.'],
      ['How is your mood?', 'Kind of down. I don’t enjoy baseball anymore.', 'Depression often coexists.'],
    ],
  },
  exam: {
    text: 'You observe the visit.',
    f: [['Behavior', 'Watchful, startles when a door closes', 'abnormal'], ['Mood', 'Anxious and low', 'abnormal'], ['Neurologic exam', 'Normal', 'normal'], ['Sleep', 'Broken by nightmares', 'abnormal'], ['Safety', 'Denies thoughts of self-harm', 'normal']],
    junior: ['How has the crash affected Ben?', [
      ['His brain’s alarm system is stuck on high, even though he is safe now', 'Right. That’s what PTSD feels like.', true],
      ['He is just scared of cars', 'It’s more than a fear; it affects sleep, mood and daily life.'],
      ['He is being dramatic', 'Trauma reactions are real.'],
    ]],
    senior: ['What best describes Ben’s condition?', [
      ['PTSD: intrusions, avoidance, negative mood changes and hyperarousal for over one month after trauma', 'Correct. Screen for depression and post-concussive symptoms too.', true],
      ['Acute stress disorder', 'Lasts less than one month.'],
      ['Specific phobia of cars', 'Doesn’t explain nightmares, intrusions and hyperarousal.'],
    ]],
  },
  model: {
    junior: {
      layers: [['event', 'A frightening event', 'The crash.'], ['alarm', 'The brain’s alarm system gets stuck on', 'It keeps sensing danger.'], ['memory', 'The memory isn’t filed away', 'It pops up as if it’s happening now.'], ['signs', 'Nightmares, jumpiness and avoiding', 'What we see.']],
      clues: [['crash', 'Serious car crash', 'event', 'The trauma.'], ['jump', 'Jumps at loud noises', 'alarm', 'Hyperarousal.'], ['brakes', 'Hears the brakes when he closes his eyes', 'memory', 'Intrusive memory.'], ['nightmares', 'Nightmares most nights', 'memory', 'Re-experiencing.'], ['walks', 'Walks 40 minutes to avoid cars', 'signs', 'Avoidance.']],
      wrap: 'The crash set Ben’s brain alarm on high. The memory keeps coming back as if it’s happening now, so he avoids anything that reminds him.',
    },
    senior: {
      layers: [['trauma', 'Traumatic exposure', 'Threat to life.'], ['fear', 'Fear-conditioning and amygdala hyperreactivity', 'Altered threat processing.'], ['mem', 'Impaired contextualization of memory', 'Hippocampal and prefrontal changes.'], ['cluster', 'Symptom clusters with impairment', 'Intrusion, avoidance, mood, arousal.']],
      clues: [['mva', 'Motor vehicle crash', 'trauma', 'Common pediatric trauma.'], ['startle', 'Exaggerated startle', 'fear', 'Hyperarousal.'], ['flash', 'Flashbacks', 'mem', 'Decontextualized memory.'], ['night', 'Nightmares', 'mem', 'Intrusion.'], ['avoid', 'Avoids cars and talking about it', 'cluster', 'Avoidance.'], ['anhed', 'Lost interest in baseball', 'cluster', 'Negative mood changes.']],
      wrap: 'Your model predicts a high PTSD screening score and benefit from trauma-focused CBT.',
    },
  },
  ddx: {
    junior: { options: [
      ['ptsd', 'PTSD (post-traumatic stress)', 'leading', 'Nightmares, flashbacks, jumpiness and avoiding cars after a crash.'],
      ['concussion', 'Lasting effects of a head injury', 'possible', 'He hit his head; doctors check.'],
      ['sad', 'Depression', 'possible', 'Often happens alongside PTSD.'],
      ['fear', 'Just a fear of cars', 'possible', 'Doesn’t explain all his symptoms.'],
      ['drama', 'Being dramatic', 'unlikely', 'Trauma reactions are real.'],
    ] },
    senior: { options: [
      ['ptsd', 'Posttraumatic stress disorder', 'leading', 'Full criteria beyond one month.'],
      ['asd', 'Acute stress disorder', 'possible', 'Only within the first month.'],
      ['pcs', 'Persistent post-concussive symptoms', 'possible', 'Headache, cognitive symptoms; can overlap.'],
      ['mdd', 'Major depressive disorder', 'possible', 'Often comorbid.'],
      ['phobia', 'Specific phobia', 'possible', 'Narrower picture.'],
      ['sud', 'Substance use to cope', 'cantmiss', 'Ask confidentially.'],
    ] },
  },
  labs: { title: 'Screening', both: true, r: [
    ['Child PTSD Symptom Scale', '38', 'of 80', '< 11', 'high'],
    ['PHQ-A depression score', '11', 'of 27', '< 5', 'high', 'Moderate'],
    ['Post-concussion symptom checklist', 'Mild', '', 'None', 'note'],
  ] },
  decision: {
    junior: ['What is happening to Ben?', [
      ['PTSD after the crash', 'Exactly. Special therapy helps the memory become less scary.', true],
      ['He just doesn’t like cars', 'His symptoms are bigger than a dislike.'],
      ['A head injury only', 'His screening points to PTSD.'],
    ]],
    senior: ['Which explanation is best supported?', [
      ['PTSD with comorbid depressive symptoms; trauma-focused CBT', 'Correct. Involve caregivers; gradual exposure to car rides.', true],
      ['Persistent post-concussive symptoms alone', 'Mild; doesn’t explain intrusions and avoidance.'],
      ['Specific phobia', 'Full PTSD criteria are met.'],
    ]],
    wrap: 'Ben starts trauma-focused CBT with his parents involved. Over months, he builds a coping toolkit, tells his story in a safe way and rides in a car again. His nightmares fade.',
  },
  debrief: {
    science: 'After a terrifying event, the brain’s alarm center can stay overactive while the memory isn’t stored as “past.” Reminders trigger the same fear as the original event.',
    pearl: 'PTSD is treatable. Trauma-focused CBT and other evidence-based therapies help children and adults process memories and reduce symptoms.',
    uncertainty: 'Recovery can take months; support from family and school matters.',
    human: 'Ben’s family noticed he walked everywhere but didn’t know why. Asking gently opened the door to help.',
    closing: 'Healing the mind after trauma is as real as healing a broken bone.',
  },
  founder: 'Teaching point: PTSD clusters, trauma-informed care, comorbidity with depression and concussion. Emphasize safety and choice in how trauma is discussed.',
});

export const ADHD = makeCase({
  code: 'CASE-048', slug: 'owen-adhd', room: 'behavioral-health-center',
  title: 'Motor Always Running', summary: 'Owen can’t sit still, loses everything and blurts out answers. Explore ADHD, and everything that can look like it.',
  specialty: 'Developmental-Behavioral Pediatrics', system: 'Mind & Behavior', minutes: [15, 25],
  patient: { name: 'Owen Fischer', age: 9, concern: 'Trouble focusing and sitting still', interests: ['Legos', 'Soccer', 'Animals'] },
  art: 'an energetic 9-year-old white boy with messy hair wiggling in a chair in a bright pediatric developmental clinic, building with blocks while a pediatrician talks with his father who holds a stack of school forms, cheerful busy room',
  opening: {
    scene: 'Owen’s teacher says he can’t stay in his seat, interrupts constantly and rarely finishes work. At home, he loses shoes, homework and jackets. His parents say he’s been “a motor that never stops” since kindergarten.',
    dialogue: 'I try to listen, but my brain jumps around.',
    narrator: 'ADHD is one of the most common conditions in childhood. Diagnosis needs symptoms in more than one setting and a careful look at things that can mimic it.',
  },
  history: {
    min: 3,
    q: [
      ['When did these behaviors start?', 'Since he was about five.', 'Symptoms must start before age 12.', 'Owen’s dad'],
      ['Does this happen at home and school?', 'Both. Even at soccer practice.', 'Symptoms in two or more settings.', 'Owen’s dad'],
      ['How does he sleep? Does he snore?', 'He sleeps well, no snoring.', 'Sleep apnea can cause ADHD-like symptoms.', 'Owen’s dad'],
      ['Does he ever stare off and not respond for a few seconds?', 'Not really. He just gets distracted.', 'Absence seizures can look like inattention.', 'Owen’s dad'],
      ['How is reading and writing going?', 'Reading is good; he just doesn’t finish.', 'Learning disabilities can coexist or mimic ADHD.', 'Owen’s dad'],
      ['Is anything stressful happening at home?', 'No big changes.', 'Stress and trauma can look like ADHD.', 'Owen’s dad'],
    ],
  },
  exam: {
    text: 'You observe the visit.',
    f: [['Behavior in clinic', 'Fidgety, climbs on the exam table, interrupts', 'abnormal'], ['Hearing and vision', 'Normal', 'normal'], ['Neurologic exam', 'Normal', 'normal'], ['Growth', 'Normal', 'normal'], ['Mood', 'Happy, engaged', 'normal']],
    junior: ['Why do doctors check hearing, vision and sleep before diagnosing ADHD?', [
      ['Because those problems can look like trouble paying attention', 'Right. A child who can’t hear or see well, or is tired, may seem distracted.', true],
      ['Because it’s a rule', 'There’s a real reason: other problems can look like ADHD.'],
      ['They don’t matter', 'They matter a lot.'],
    ]],
    senior: ['What is the next step?', [
      ['Standardized rating scales from parents and teachers (e.g., Vanderbilt)', 'Correct. Combined with history and exclusion of mimics.', true],
      ['Brain MRI', 'Not indicated with a normal exam.'],
      ['Start medication today without more information', 'Diagnosis comes first.'],
    ]],
  },
  model: {
    junior: {
      layers: [['brain', 'Brain differences in attention and self-control', 'Often run in families.'], ['manage', 'Harder to manage focus and impulses', 'The brain’s “manager” works differently.'], ['signs', 'Fidgeting, losing things, interrupting', 'What we see.'], ['impact', 'Struggles at school and home', 'Why it matters.']],
      clues: [['since5', 'Since age five', 'brain', 'Starts early.'], ['jumps', 'Brain jumps around', 'manage', 'Focus is hard to hold.'], ['seat', 'Can’t stay seated', 'signs', 'Hyperactivity.'], ['loses', 'Loses shoes and homework', 'signs', 'Inattention.'], ['blurts', 'Blurts out answers', 'signs', 'Impulsivity.'], ['finish', 'Doesn’t finish work', 'impact', 'Affects school.']],
      wrap: 'Owen’s brain manages attention and impulses differently. That shows up as fidgeting, losing things and interrupting, at home and at school.',
    },
    senior: {
      layers: [['neuro', 'Neurodevelopmental differences', 'Heritable; frontostriatal networks.'], ['exec', 'Executive function deficits', 'Working memory, inhibition.'], ['sx', 'Inattention and hyperactivity-impulsivity', 'Core symptoms.'], ['func', 'Functional impairment across settings', 'Required for diagnosis.']],
      clues: [['early', 'Onset before age 12', 'neuro', 'Developmental.'], ['org', 'Loses items, disorganized', 'exec', 'Working memory.'], ['fidget', 'Fidgety, climbs', 'sx', 'Hyperactivity.'], ['interrupt', 'Interrupts', 'sx', 'Impulsivity.'], ['both', 'Home and school', 'func', 'Pervasive.']],
      wrap: 'Your model predicts positive parent and teacher rating scales with normal hearing, vision and sleep.',
    },
  },
  ddx: {
    junior: { options: [
      ['adhd', 'ADHD', 'leading', 'Since age five, at home and school: focus, fidgeting and impulses.'],
      ['hearing', 'Trouble hearing or seeing', 'possible', 'His tests are normal.'],
      ['sleep', 'Not sleeping well', 'possible', 'He sleeps well.'],
      ['learning', 'A learning difference', 'possible', 'Can happen together with ADHD.'],
      ['bad', 'Being a bad kid', 'unlikely', 'ADHD is a brain difference, not bad behavior.'],
    ] },
    senior: { options: [
      ['adhd', 'ADHD, combined presentation', 'leading', 'Meets criteria across settings.'],
      ['ld', 'Specific learning disorder', 'possible', 'Often comorbid; psychoeducational testing.'],
      ['osa', 'Obstructive sleep apnea', 'possible', 'Snoring, daytime sleepiness.'],
      ['absence', 'Absence seizures', 'possible', 'Staring spells; EEG.'],
      ['anx', 'Anxiety or trauma', 'possible', 'Can mimic inattention.'],
      ['hearing', 'Hearing or vision impairment', 'possible', 'Screened normal.'],
    ] },
  },
  labs: { title: 'Rating scales', both: true, r: [
    ['Vanderbilt (parent): inattention items positive', '7', 'of 9', '≥ 6 suggests ADHD', 'high'],
    ['Vanderbilt (parent): hyperactivity items positive', '8', 'of 9', '≥ 6 suggests ADHD', 'high'],
    ['Vanderbilt (teacher): both domains', 'Positive', '', '—', 'high'],
    ['Hearing and vision screen', 'Normal', '', 'Normal', 'normal'],
  ] },
  decision: {
    junior: ['What does Owen have?', [
      ['ADHD', 'Exactly. With support, kids with ADHD do great things.', true],
      ['A hearing problem', 'His hearing is normal.'],
      ['He’s misbehaving on purpose', 'ADHD is a brain difference.'],
    ]],
    senior: ['Which explanation is best supported?', [
      ['ADHD, combined presentation; behavioral therapy, school supports (504 plan) and stimulant medication', 'Correct. For ages 6–11, medication plus behavioral therapy is recommended.', true],
      ['Learning disorder', 'Reading is strong; ADHD explains the pattern.'],
      ['Sleep apnea', 'Sleeps well without snoring.'],
    ]],
    wrap: 'Owen gets a 504 plan with movement breaks and starts a stimulant medicine, with parent training in behavior strategies. His teacher reports he’s finishing work and making friends more easily.',
  },
  debrief: {
    science: 'ADHD involves differences in brain networks that manage attention, impulse control and organization (executive function). It often runs in families.',
    pearl: 'Diagnosis needs symptoms in at least two settings, beginning before age 12, with real impairment. Rule out hearing, vision, sleep and other mimics.',
    uncertainty: 'Many children with ADHD keep some symptoms as adults; strategies and treatment help across life.',
    human: 'Owen had been called “the bad kid.” Understanding ADHD changes how adults respond, and how a child sees himself.',
    closing: 'Different brains need different supports, not judgment.',
  },
  founder: 'Teaching point: ADHD diagnosis criteria, mimics, multimodal treatment; reduce stigma. Highlight strengths-based framing.',
});

export const SUICIDE_RISK = makeCase({
  code: 'CASE-049', slug: 'riley-safety', room: 'behavioral-health-center', seniorOnly: true,
  advisory: `This senior case discusses suicidal thoughts and how healers respond. It does not describe methods. ${CRISIS} You can also text HOME to 741741 to reach the Crisis Text Line.`,
  title: 'Asking the Hardest Question', summary: 'A friend reported a worrying message from Riley. Learn how healers ask about suicide, assess risk and build a safety plan.',
  specialty: 'Adolescent Medicine & Psychiatry', system: 'Mind & Behavior', minutes: [25, 35],
  patient: { name: 'Riley Sullivan', age: 15, concern: 'Concerning message reported by a friend' },
  art: 'a 15-year-old teenager with short auburn hair sitting in a quiet adolescent clinic room wrapped in a hoodie, looking down, a compassionate physician sitting at eye level leaning slightly forward and listening, a box of tissues and a written plan on the table, soft warm light, hopeful and safe atmosphere',
  opening: {
    scene: 'Riley’s school counselor called her parents after a friend shared a message Riley sent: “I don’t see the point anymore.” Riley’s mom brought her to the adolescent clinic the same day.',
    dialogue: 'I didn’t think anyone would actually care.',
    narrator: 'Suicide is a leading cause of death among teenagers. Asking directly and compassionately about suicidal thoughts is safe and can save a life. Every concern is taken seriously.',
    narratorRole: 'Adolescent physician',
  },
  history: {
    min: 5, prompt: 'Speak with Riley privately. Ask at least five questions, calmly and directly.',
    q: [
      ['How have things been for you lately?', 'Bad. School, friends… everything.', 'Open-ended questions build trust.'],
      ['When you said you don’t see the point, what did you mean?', 'Just that maybe everyone would be better off without me.', 'This is a statement of suicidal thinking. Stay calm and keep listening.'],
      ['Are you having thoughts of killing yourself?', 'Sometimes. For about two weeks.', 'Asking directly, using clear words, is the right approach. It does not plant the idea.'],
      ['Do you have a plan, or have you done anything to prepare?', 'No plan. I haven’t done anything.', 'Asking about a plan, intent and preparation helps judge immediate risk.'],
      ['Have you ever tried to hurt yourself before?', 'No.', 'A past attempt is one of the strongest risk factors.'],
      ['What’s been going on that makes things feel this bad?', 'My boyfriend broke up with me and people are posting stuff about me.', 'Stressors help guide the safety plan.'],
      ['What keeps you going, even on hard days?', 'My little brother. And my dog.', 'Protective factors and reasons for living strengthen a safety plan.'],
      ['Are there medicines or firearms at home?', 'Mom’s pills are in the bathroom. My dad has a gun in the closet.', 'Asking about access to lethal means is a key, protective step.'],
    ],
  },
  exam: {
    text: 'You observe the visit.',
    f: [['Mood', 'Sad, tearful at times', 'abnormal'], ['Thinking', 'Hopeless thoughts, but organized', 'note'], ['Suicidal thoughts', 'Present for two weeks; no plan or intent', 'abnormal'], ['Past attempts', 'None', 'normal'], ['Protective factors', 'Brother, dog, willing to talk', 'normal'], ['Physical exam', 'No injuries', 'normal']],
    senior: ['How would you characterize her immediate risk?', [
      ['Positive suicide risk screen with suicidal ideation but no plan, intent or prior attempt: needs a full safety assessment and same-day safety plan; risk is not imminent if means are secured and a parent is engaged', 'Correct. Risk assessment guides the level of care.', true],
      ['No risk; she’s just upset about a breakup', 'Every expression of suicidal thinking is taken seriously.'],
      ['Imminent risk requiring immediate involuntary hospitalization', 'Not necessarily without a plan or intent, but escalate if risk changes.'],
    ]],
  },
  act: {
    title: 'Respond and keep safe',
    senior: {
      prompt: 'Order the steps of responding to a teen with suicidal thoughts.',
      steps: [['Ask directly and listen without judgment', 'Thank her for telling you.'], ['Make sure she is not left alone if risk seems immediate', 'Safety first.'], ['Complete a structured risk assessment (e.g., ASQ, C-SSRS)', 'Thoughts, plan, intent, past attempts, protective factors.'], ['Involve a parent, explaining the limits of confidentiality', 'Safety overrides confidentiality.'], ['Counsel on lethal means: lock up or remove medicines and firearms', 'Reducing access saves lives.'], ['Build a written safety plan together', 'Warning signs, coping steps, people to contact, 988.'], ['Arrange mental health care within days and check in soon', 'Close follow-up.']],
      distractors: [['Promise to keep it a secret', 'Safety requires involving trusted adults.'], ['Avoid using the word “suicide” so you don’t give her ideas', 'A myth; asking directly is protective.']],
      wrap: 'If she had a plan, intent, a recent attempt or couldn’t stay safe, the next step would be emergency evaluation.',
    },
  },
  model: {
    senior: {
      layers: [['vuln', 'Vulnerabilities', 'Depression, family history, temperament.'], ['stress', 'Acute stressors', 'Losses and humiliation.'], ['hope', 'Hopelessness and feeling like a burden', 'Psychological pain.'], ['si', 'Suicidal thoughts without a plan', 'Current state; protective factors pull the other way.']],
      clues: [['mood', 'Weeks of sadness', 'vuln', 'Underlying depression.'], ['breakup', 'Recent breakup', 'stress', 'A common trigger in teens.'], ['posts', 'Posts about her online', 'stress', 'Bullying increases risk.'], ['better', '“Better off without me”', 'hope', 'Perceived burdensomeness.'], ['point', '“I don’t see the point”', 'hope', 'Hopelessness.'], ['thoughts', 'Thoughts for two weeks, no plan', 'si', 'Ideation without plan or intent.']],
      wrap: 'Your model guides the plan: treat depression, address stressors, reduce access to means and strengthen connection.',
    },
  },
  ddx: {
    senior: {
      prompt: 'What underlying conditions should be considered? Choose 4 to 6 and rank them.',
      options: [
        ['mdd', 'Major depressive disorder', 'leading', 'Weeks of low mood with hopelessness.'],
        ['bipolar', 'Bipolar disorder', 'possible', 'Screen for mania.'],
        ['sud', 'Substance use', 'cantmiss', 'Increases impulsivity and risk; screen confidentially.'],
        ['ptsd', 'Trauma or PTSD', 'possible', 'Ask about trauma, including abuse.'],
        ['adj', 'Adjustment disorder', 'possible', 'Linked to recent stressors.'],
        ['medical', 'Medical causes of low mood', 'possible', 'Thyroid and others.'],
        ['attention', '“Attention-seeking”', 'unlikely', 'Never dismiss suicidal statements.'],
      ],
    },
  },
  labs: { title: 'Screening tools', r: [
    ['ASQ suicide risk screen', 'Positive, non-acute', '', 'Negative', 'abnormal'],
    ['Columbia (C-SSRS)', 'Ideation without plan or intent; no behavior', '', 'None', 'abnormal'],
    ['PHQ-A depression score', '20', 'of 27', '< 5', 'high', 'Severe'],
    ['Confidential substance screen', 'Negative', '', 'Negative', 'normal'],
  ] },
  decision: {
    senior: ['What is the best plan?', [
      ['Same-day safety plan with Riley and her mom, lethal means secured, urgent mental health care within 72 hours, follow-up call tomorrow', 'Correct. Treat depression and keep risk assessment ongoing.', true],
      ['Reassure her and follow up in six months', 'Inadequate for active suicidal thoughts.'],
      ['Involuntary hospitalization immediately', 'Not required at this risk level if a safe plan is in place; escalate if risk rises.'],
    ]],
    wrap: 'Riley and her mom write a safety plan together. Her mom locks up medicines, and her dad moves the firearm out of the home. Riley starts therapy two days later. At follow-up, she says telling someone was the hardest and best thing she did.',
  },
  debrief: {
    science: 'Suicidal thoughts often arise from a mix of depression, hopelessness and painful events. They can change quickly, which is why safety plans and close follow-up matter.',
    pearl: 'Ask directly, listen, don’t keep it secret, reduce access to lethal means, and connect to help. In the U.S., call or text 988 any time.',
    uncertainty: 'Risk can change; reassessment continues at every visit.',
    human: 'Riley thought no one cared. A friend who spoke up and adults who listened changed that.',
    closing: 'Every healer can learn to ask the hardest question, and to stay for the answer.',
  },
  founder: 'Teaching point: ask directly, risk assessment, safety planning, lethal means counseling, 988. Senior track only. Consider having a licensed mental health professional co-lead this session and share local resources.',
});
