import { makeCase } from './kit';

// Child protection and common pediatric/adult cases. Values are illustrative.

const HOTLINE = 'If you or someone you know is being hurt or isn’t safe at home, tell a trusted adult or call the Childhelp National Child Abuse Hotline at 1-800-422-4453. In an emergency, call 911.';

export const SENTINEL = makeCase({
  code: 'CASE-050', slug: 'liam-sentinel', room: 'emergency-department', seniorOnly: true,
  advisory: `This senior case teaches healers to recognize possible child physical abuse. It includes no graphic detail. ${HOTLINE}`,
  title: 'A Small Bruise', summary: 'A 4-month-old has a small bruise on his cheek. Learn why bruises in babies who can’t roll yet need careful attention, and what healers must do.',
  specialty: 'Child Abuse Pediatrics', system: 'Child Protection', minutes: [20, 30],
  patient: { name: 'Liam Foster', age: '4 months', concern: 'Fussiness; small bruise on the cheek' },
  art: 'a calm pediatric emergency exam room, a 4-month-old baby wrapped in a soft blue blanket lying in a bassinet, a pediatrician gently looking at him with a caring expression while writing notes, a social worker standing nearby with a clipboard, soft neutral light, no visible injuries',
  opening: {
    scene: 'Liam’s caregiver brings him in because he has been fussy and crying more than usual for two days. During the exam, the nurse notices a small bruise on his cheek and another on his ear.',
    dialogue: 'He must have rolled into the crib rail.',
    speaker: 'Liam’s caregiver',
    narrator: 'A bruise on a baby who isn’t yet rolling or crawling is called a sentinel injury. It can be the first warning sign of abuse. Recognizing it early can prevent more serious harm.',
    narratorRole: 'Child abuse pediatrician',
  },
  history: {
    min: 4, speaker: 'Liam’s caregiver', prompt: 'Ask the caregiver at least four questions. Stay calm, curious and nonjudgmental.',
    q: [
      ['Can Liam roll over yet?', 'Not really. Sometimes he scoots a little.', 'At 4 months, most babies can’t generate enough force to bruise themselves.'],
      ['How did the bruises happen?', 'I’m not sure. Maybe the crib.', 'An explanation that doesn’t fit the child’s development is a red flag.'],
      ['Who takes care of him?', 'Me, my partner and sometimes a neighbor.', 'Knowing all caregivers matters.'],
      ['Has he had any bleeding problems, like from shots or his umbilical cord?', 'No.', 'Bleeding disorders can cause easy bruising and must be tested.'],
      ['Has he been feeding normally? Vomiting? Sleepier than usual?', 'Feeding less. No vomiting.', 'Changes can signal hidden injuries.'],
    ],
  },
  exam: {
    text: 'The pediatrician completes a full, gentle exam and documents every finding.',
    f: [['Cheek', 'Small bruise', 'abnormal'], ['Ear', 'Small bruise', 'abnormal'], ['Mouth', 'Normal', 'normal'], ['Head', 'Soft fontanelle, normal size', 'normal'], ['Development', 'Not yet rolling', 'note'], ['General', 'Fussy but consolable', 'note']],
    senior: ['How should these bruises be interpreted?', [
      ['Bruises in a non-mobile infant, especially on the ear and cheek, are sentinel injuries requiring a full evaluation for abuse', 'Correct. Remember TEN-4-FACESp: bruising on the Torso, Ears or Neck in children under 4, or any bruising in infants under 4 months, plus Frenulum, Angle of jaw, Cheek, Eyelid, Subconjunctival and Patterned injuries.', true],
      ['Normal bumps from everyday play', 'Babies who aren’t mobile rarely bruise.'],
      ['Clearly abuse; confront the caregiver', 'Healers evaluate and report concerns; they don’t accuse or investigate.'],
    ]],
  },
  act: {
    title: 'Protect and evaluate',
    senior: {
      prompt: 'Order the healer’s response to a possible sentinel injury.',
      steps: [['Treat any medical needs and keep the child safe in the hospital', 'Safety first.'], ['Document findings objectively, with the caregiver’s exact words', 'Precise records matter.'], ['Complete a medical evaluation: skeletal survey, head imaging, blood tests for bleeding disorders, eye exam', 'Find hidden injuries and rule out mimics.'], ['Consult the child abuse pediatrics team', 'Specialized expertise.'], ['Report to child protective services as a mandated reporter', 'Reasonable suspicion is enough; proof is not required.'], ['Arrange screening of other children in the home', 'They may also be at risk.']],
      distractors: [['Wait until you are certain before reporting', 'Mandated reporters must report reasonable suspicion.'], ['Confront and accuse the caregiver', 'Can escalate danger; investigation is CPS’s role.']],
    },
  },
  model: {
    senior: {
      layers: [['risk', 'Risk factors around the child', 'Stress, isolation, many caregivers.'], ['injury', 'Inflicted injury', 'Force beyond what the baby can create.'], ['visible', 'Small visible signs', 'Sentinel injuries.'], ['hidden', 'Possible hidden injuries', 'Fractures, head injury.']],
      clues: [['many', 'Several caregivers', 'risk', 'More people to consider.'], ['story', 'Explanation doesn’t fit development', 'injury', 'A key red flag.'], ['cheek', 'Bruise on the cheek', 'visible', 'FACESp location.'], ['ear', 'Bruise on the ear', 'visible', 'TEN location.'], ['fussy', 'Fussy, feeding less', 'hidden', 'May signal pain from hidden injury.']],
      wrap: 'Your model predicts that a skeletal survey may reveal hidden injuries, and that bleeding tests will be normal.',
    },
  },
  ddx: {
    senior: { options: [
      ['abuse', 'Physical abuse', 'leading', 'Bruising in a non-mobile infant with an explanation that doesn’t fit.'],
      ['bleed', 'Bleeding disorder', 'possible', 'Test CBC and clotting studies.'],
      ['accident', 'Accidental injury', 'unlikely', 'Not consistent with a non-rolling infant.'],
      ['oi', 'Osteogenesis imperfecta', 'possible', 'Fragile bones; relevant if fractures are found.'],
      ['derm', 'Skin findings that mimic bruises (birthmarks)', 'possible', 'Congenital dermal melanocytosis doesn’t change over days.'],
      ['infection', 'Infection causing fussiness', 'possible', 'Always consider medical causes of fussiness too.'],
    ] },
  },
  labs: { title: 'Evaluation', r: [
    ['Skeletal survey', 'Healing rib fractures', '', 'No fractures', 'abnormal'],
    ['Head CT', 'Normal', '', 'Normal', 'normal'],
    ['CBC and clotting studies', 'Normal', '', 'Normal', 'normal'],
    ['Liver enzymes and lipase', 'Normal', '', 'Normal', 'normal'],
    ['Eye exam', 'Normal', '', 'Normal', 'normal'],
  ] },
  decision: {
    senior: ['What is the appropriate conclusion and action?', [
      ['Findings are concerning for physical abuse; report to CPS, keep the child safe and coordinate with the child protection team', 'Correct. Recognizing the sentinel injury may have prevented worse harm.', true],
      ['A bleeding disorder explains it', 'Clotting tests are normal, and fractures are present.'],
      ['Discharge home; bruises heal', 'This could leave the child in danger.'],
    ]],
    wrap: 'Liam is admitted while child protective services investigates, and his injuries heal. The healer’s role was to notice, evaluate, document and report, not to judge or investigate.',
  },
  debrief: {
    science: 'Infants who can’t move on their own rarely bruise. Bruises in certain places (torso, ears, neck, face) or in non-mobile babies can be the first sign of abuse, sometimes before more serious injuries.',
    pearl: 'TEN-4-FACESp helps identify concerning bruises. Healers are mandated reporters: they report reasonable suspicion, not proof.',
    uncertainty: 'CPS and law enforcement determine what happened. Medical teams focus on the child’s health and safety.',
    human: 'Many families who harm children are overwhelmed and under stress. Support services can be part of protecting children.',
    closing: 'Noticing a small bruise can change a child’s life.',
  },
  founder: 'Teaching point: sentinel injuries, TEN-4-FACESp, mandated reporting, avoiding accusation. Senior track only. Consider co-teaching with a child abuse pediatrician or social worker; prepare for cadets who may disclose their own experiences.',
});

export const NEGLECT = makeCase({
  code: 'CASE-051', slug: 'aria-growth', room: 'childrens-clinic', seniorOnly: true,
  advisory: `This senior case discusses neglect and poor growth in a toddler, with a focus on support. ${HOTLINE}`,
  title: 'Falling Off the Curve', summary: 'Aria’s weight has dropped across her growth chart. Is it a disease, or a family that needs help?',
  specialty: 'General Pediatrics & Social Work', system: 'Child Protection', minutes: [20, 30],
  patient: { name: 'Aria Simmons', age: '15 months', concern: 'Poor weight gain and missed appointments' },
  art: 'a small thin 15-month-old toddler sitting on a pediatric clinic exam table holding a sippy cup, a young tired mother beside her, a pediatrician kindly showing a growth chart on a tablet, a social worker sitting with them, warm supportive atmosphere',
  opening: {
    scene: 'Aria is 15 months old. She missed her last three check-ups. Her weight has dropped from the 50th to below the 3rd percentile. She isn’t walking yet and says no words.',
    dialogue: 'I’m working two jobs. I do my best, but it’s hard to get here.',
    speaker: 'Aria’s mom',
    narrator: 'Neglect is the most common form of child maltreatment. Often it reflects families without enough support. Healers look for medical causes and also ask about food, housing and help at home.',
  },
  history: {
    min: 4, speaker: 'Aria’s mom',
    q: [
      ['What does Aria eat and drink in a day?', 'Mostly juice and some crackers. Formula ran out.', 'Inadequate calories are the most common cause of poor growth.'],
      ['Do you ever run out of food before you can buy more?', 'Yes, often at the end of the month.', 'Food insecurity screening.'],
      ['Who watches Aria while you work?', 'My cousin, sometimes. Sometimes a neighbor.', 'Caregiving arrangements matter.'],
      ['Does she have diarrhea, vomiting or breathing problems?', 'No.', 'Helps look for medical causes.'],
      ['Where are you living?', 'We just moved in with my aunt.', 'Housing instability.'],
      ['Has she had her shots?', 'She’s behind.', 'Missed care.'],
    ],
  },
  exam: {
    text: 'You observe the exam.',
    f: [['Weight', 'Below the 3rd percentile (was 50th at 6 months)', 'low'], ['Development', 'Not walking; no words', 'abnormal'], ['Skin', 'Severe diaper rash', 'abnormal'], ['Teeth', 'Cavities on front teeth', 'abnormal'], ['General', 'Quiet, watchful, little fat', 'abnormal'], ['Organ exam', 'Heart, lungs and belly normal', 'normal']],
    senior: ['How do you interpret this?', [
      ['Failure to thrive with developmental delay and signs of unmet basic needs: evaluate for medical causes and for neglect, with a supportive approach', 'Correct. Most poor growth reflects inadequate intake.', true],
      ['A rare genetic disease', 'Possible, but common causes come first.'],
      ['Normal small child', 'Crossing major percentiles isn’t normal.'],
    ]],
  },
  act: {
    title: 'Support and protect',
    senior: {
      prompt: 'Order the response to failure to thrive with concern for neglect.',
      steps: [['Admit to the hospital for observed feeding and safety', 'Weight gain with adequate food is diagnostic.'], ['Dietitian assessment and calorie counts', 'Measure intake.'], ['Targeted tests for medical causes', 'Avoid over-testing.'], ['Social work assessment: food, housing, childcare, stress', 'Find the needs.'], ['Connect to resources: WIC, SNAP, early intervention, childcare', 'Support the family.'], ['Report to child protective services as required when basic needs aren’t met', 'Mandated reporting can open services, not only investigations.']],
      distractors: [['Blame the mother and send them home', 'Doesn’t protect Aria or help the family.'], ['Order every possible genetic test first', 'Observed feeding answers the key question faster.']],
    },
  },
  model: {
    senior: {
      layers: [['social', 'Social stressors', 'Poverty, food insecurity, unstable housing.'], ['intake', 'Inadequate calories offered', 'Juice and crackers.'], ['growth', 'Poor weight gain', 'Falling across percentiles.'], ['dev', 'Developmental and health effects', 'Delay, cavities, rashes.']],
      clues: [['jobs', 'Mom works two jobs', 'social', 'Limited time and support.'], ['food', 'Runs out of food monthly', 'social', 'Food insecurity.'], ['juice', 'Mostly juice and crackers', 'intake', 'Too few calories and nutrients.'], ['curve', 'Weight dropped to below 3rd percentile', 'growth', 'Failure to thrive.'], ['walk', 'Not walking, no words', 'dev', 'Developmental delay.'], ['teeth', 'Cavities', 'dev', 'Juice in bottles.']],
      wrap: 'Your model predicts that Aria will gain weight quickly when given enough food, pointing to inadequate intake rather than disease.',
    },
  },
  ddx: {
    senior: { options: [
      ['intake', 'Inadequate intake from unmet needs (neglect)', 'leading', 'Diet history, food insecurity and missed care.'],
      ['celiac', 'Celiac disease', 'possible', 'Malabsorption; screen if weight doesn’t improve.'],
      ['cf', 'Cystic fibrosis', 'possible', 'Greasy stools and lung infections.'],
      ['chd', 'Congenital heart disease', 'possible', 'Murmur, sweating with feeds.'],
      ['hypothy', 'Hypothyroidism', 'possible', 'Check if growth in length is also slow.'],
      ['small', 'Constitutionally small child', 'unlikely', 'Small children follow their curve; Aria fell across lines.'],
    ] },
  },
  labs: { title: 'Evaluation', r: [
    ['Weight gain in hospital', '+45 g/day on adequate feeds', '', 'Expected 10–15 g/day', 'high', 'Strongly suggests inadequate intake'],
    ['Hemoglobin', '9.8', 'g/dL', '11.0–13.5', 'low'],
    ['Ferritin', '6', 'ng/mL', '15–150', 'low'],
    ['Celiac screen', 'Negative', '', 'Negative', 'normal'],
    ['TSH', '2.4', 'mIU/L', '0.7–6.0', 'normal'],
    ['Urinalysis', 'Normal', '', 'Normal', 'normal'],
  ] },
  decision: {
    senior: ['What is the best conclusion and plan?', [
      ['Failure to thrive from inadequate intake related to neglect and unmet basic needs; report to CPS, connect resources, early intervention, close follow-up', 'Correct. The goal is a safe, well-supported child.', true],
      ['Celiac disease', 'Screen negative and rapid weight gain on feeding.'],
      ['Discharge without follow-up', 'Aria needs ongoing support.'],
    ]],
    wrap: 'Aria gains weight quickly in the hospital. Her mom enrolls in WIC and SNAP, starts a reliable childcare arrangement, and Aria begins early intervention therapy. CPS opens a family support case. At follow-up, Aria is walking.',
  },
  debrief: {
    science: 'Growing children need enough calories and nutrients. When they don’t get them, weight falls first, then length and head growth, and development slows.',
    pearl: 'The most common cause of failure to thrive is not getting enough calories. Observed feeding in the hospital is a powerful test. Screen every family for food insecurity.',
    uncertainty: 'With good nutrition and support, many children catch up in growth and development.',
    human: 'Aria’s mom loved her deeply but was overwhelmed. Healers can protect children by supporting families.',
    closing: 'Child protection includes making sure families have what they need.',
  },
  founder: 'Teaching point: failure to thrive approach, observed feeding, social determinants, neglect vs poverty, mandated reporting as access to services. Senior track only.',
});

export const BRONCHIOLITIS = makeCase({
  code: 'CASE-052', slug: 'mateo-rsv', room: 'emergency-department',
  title: 'A Baby Working to Breathe', summary: 'Three-month-old Mateo has a cold that moved into his chest. Learn what helps, and what doesn’t, in bronchiolitis.',
  specialty: 'General Pediatrics', system: 'Lungs & Breathing', minutes: [15, 25],
  patient: { name: 'Mateo Cruz', age: '3 months', concern: 'Fast breathing and poor feeding' },
  art: 'a 3-month-old Latino baby in a pediatric hospital crib with a soft nasal cannula, breathing quickly, his father gently holding his tiny hand, a nurse adjusting an oxygen monitor, soft blue night lighting, calm',
  opening: {
    scene: 'Mateo has had a runny nose and cough for three days. Today he is breathing fast and taking only half his usual bottles. His older sister has a cold.',
    dialogue: 'He keeps pulling off the bottle to breathe.',
    speaker: 'Mateo’s dad',
    narrator: 'Bronchiolitis is the most common reason infants are hospitalized. It’s usually caused by RSV and treated with supportive care.',
  },
  history: {
    min: 3, speaker: 'Mateo’s dad',
    q: [
      ['How is he feeding?', 'About half as much as usual.', 'Poor feeding can lead to dehydration.'],
      ['How many wet diapers today?', 'Three.', 'Fewer than usual.'],
      ['Has he stopped breathing for any time?', 'Once he paused for a few seconds.', 'Apnea is a warning sign in young infants.'],
      ['Was he born early?', 'Yes, at 35 weeks.', 'Prematurity raises risk.'],
      ['Is anyone else sick?', 'His sister has a cold.', 'Siblings often bring RSV home.'],
    ],
  },
  exam: {
    text: 'You observe the exam.',
    f: [['Breathing rate', '64 per minute', 'high'], ['Oxygen saturation', '88%', 'low'], ['Effort', 'Retractions and nasal flaring', 'abnormal'], ['Lungs', 'Wheezes and crackles on both sides', 'abnormal'], ['Nose', 'Lots of mucus', 'abnormal'], ['Temperature', '38.0 °C', 'note']],
    junior: ['What is making it hard for Mateo to breathe?', [
      ['Tiny airways in his lungs are swollen and full of mucus', 'Right. Babies have very small airways that clog easily.', true],
      ['Asthma', 'He is too young for an asthma diagnosis.'],
      ['He is just fussy', 'His oxygen is low.'],
    ]],
    senior: ['What is the diagnosis and what treatment helps?', [
      ['Bronchiolitis: supportive care with suctioning, oxygen and hydration', 'Correct. Albuterol and steroids aren’t routinely helpful.', true],
      ['Asthma: albuterol and steroids', 'Not recommended routinely in bronchiolitis.'],
      ['Bacterial pneumonia: antibiotics', 'Bronchiolitis is viral.'],
    ]],
  },
  model: {
    junior: {
      layers: [['virus', 'A virus (RSV) spreads to the baby', 'From family.'], ['small', 'It infects the tiniest airways', 'Babies’ airways are very narrow.'], ['clog', 'Swelling and mucus clog them', 'Air gets stuck.'], ['work', 'Breathing becomes hard work', 'And feeding gets hard.']],
      clues: [['sister', 'Sister has a cold', 'virus', 'Spread at home.'], ['nose', 'Runny nose for three days', 'small', 'Starts in the nose, moves down.'], ['wheeze', 'Wheezes and crackles', 'clog', 'Mucus-filled airways.'], ['fast', 'Breathing 64 times a minute', 'work', 'Working hard.'], ['bottle', 'Pulls off the bottle to breathe', 'work', 'Can’t breathe and eat at once.']],
      wrap: 'A virus from his sister infected Mateo’s tiniest airways. They filled with mucus, so breathing and eating became hard work.',
    },
    senior: {
      layers: [['rsv', 'RSV infection', 'Respiratory epithelium.'], ['infl', 'Bronchiolar inflammation, necrosis and mucus', 'Small-airway obstruction.'], ['obs', 'Air trapping and atelectasis', 'V/Q mismatch.'], ['clin', 'Hypoxemia, increased work of breathing, poor feeding', 'Clinical burden.']],
      clues: [['exp', 'Sick sibling', 'rsv', 'Exposure.'], ['prem', 'Born at 35 weeks', 'rsv', 'Risk factor.'], ['crack', 'Diffuse wheezes and crackles', 'infl', 'Small-airway disease.'], ['sat', 'SpO₂ 88%', 'obs', 'V/Q mismatch.'], ['apnea', 'Brief apnea', 'clin', 'Young infants with RSV.'], ['feed', 'Half usual feeds', 'clin', 'Dehydration risk.']],
      wrap: 'Your model predicts a positive RSV test and improvement with suction, oxygen and hydration.',
    },
  },
  ddx: {
    junior: { options: [
      ['bronch', 'Bronchiolitis (RSV)', 'leading', 'A baby with a cold that moved into the chest.'],
      ['pneumonia', 'Pneumonia', 'possible', 'Can look similar.'],
      ['heart', 'A heart problem', 'possible', 'Can cause fast breathing in babies.'],
      ['whooping', 'Whooping cough', 'cantmiss', 'Dangerous in babies; doctors test.'],
      ['fussy', 'Just fussy', 'unlikely', 'His oxygen is low.'],
    ] },
    senior: { options: [
      ['bronch', 'RSV bronchiolitis', 'leading', 'Classic.'],
      ['pertussis', 'Pertussis', 'cantmiss', 'Apnea, coughing spells; test and treat.'],
      ['pna', 'Bacterial pneumonia', 'possible', 'Focal findings, high fever.'],
      ['chd', 'Congenital heart disease with heart failure', 'possible', 'Murmur, hepatomegaly.'],
      ['fb', 'Foreign body', 'unlikely', 'Not at 3 months.'],
      ['sepsis', 'Sepsis', 'possible', 'Consider in young febrile infants.'],
    ] },
  },
  labs: { title: 'Tests', r: [
    ['RSV test', 'Positive', '', 'Negative', 'high'],
    ['Pertussis PCR', 'Negative', '', 'Negative', 'normal'],
    ['Oxygen saturation on high-flow', '95', '%', '≥ 90', 'normal'],
  ] },
  decision: {
    junior: ['What does Mateo have?', [
      ['Bronchiolitis from RSV', 'Exactly. Oxygen, suctioning his nose and help feeding will get him through.', true],
      ['Asthma', 'He has a virus in his small airways.'],
      ['Nothing serious', 'He needed oxygen.'],
    ]],
    senior: ['Which explanation is best supported?', [
      ['RSV bronchiolitis with hypoxemia; supportive care (suction, oxygen, high-flow, hydration)', 'Correct. Prevention: nirsevimab for infants and RSV vaccines in pregnancy.', true],
      ['Pertussis', 'PCR negative.'],
      ['Asthma', 'Not appropriate at 3 months.'],
    ]],
    wrap: 'Mateo is admitted for high-flow oxygen and tube feeds for two days. He goes home once he’s breathing comfortably and feeding well.',
  },
  debrief: {
    science: 'RSV infects the cells lining the smallest airways, causing swelling and mucus. Because babies’ airways are so small, even a little mucus can make breathing hard.',
    pearl: 'Supportive care is the treatment: clear the nose, give oxygen if needed and keep the baby hydrated. New preventive antibodies and maternal vaccines protect many infants.',
    uncertainty: 'Some babies wheeze again with later colds.',
    human: 'Mateo’s dad felt helpless. Teaching him how to suction Mateo’s nose gave him a way to help.',
    closing: 'Sometimes the best medicine is careful support while the body heals.',
  },
  founder: 'Teaching point: bronchiolitis is supportive care; avoid unnecessary albuterol, steroids and antibiotics; RSV prevention.',
});

export const CROUP = makeCase({
  code: 'CASE-053', slug: 'isabella-croup', room: 'emergency-department', emergency: true,
  title: 'A Seal’s Bark at Midnight', summary: 'Isabella woke up with a barking cough and a noisy breath. Recognize croup, and the rare cases that are more dangerous.',
  specialty: 'Pediatric Emergency Medicine', system: 'Lungs & Breathing', minutes: [15, 20],
  patient: { name: 'Isabella Hart', age: 2, concern: 'Barking cough and noisy breathing' },
  art: 'a 2-year-old girl with dark curls sitting upright on her mother’s lap in a pediatric emergency room at night, holding a nebulizer mask near her face with gentle mist, the mother calm, a nurse smiling reassuringly, soft night lighting',
  opening: {
    scene: 'At midnight, Isabella woke up with a cough that sounds like a barking seal. When she breathes in, she makes a high-pitched noise. She had a cold for two days.',
    dialogue: 'It sounds like a seal! And she’s making this whistling noise when she breathes in.',
    speaker: 'Isabella’s mom',
    narrator: 'Croup is a viral swelling of the voice box and windpipe in young children. Most cases are mild, but healers know which signs mean trouble.',
  },
  history: {
    min: 3, speaker: 'Isabella’s mom',
    q: [
      ['When did the cough start?', 'Tonight. She had a cold for two days.', 'Croup often follows a cold and worsens at night.'],
      ['Is she drooling or unable to swallow?', 'No, she drank some water.', 'Drooling would suggest epiglottitis.'],
      ['Could she have swallowed something?', 'No, she was in bed.', 'Foreign bodies cause sudden noisy breathing.'],
      ['Has she had her vaccines?', 'Yes, all of them.', 'Hib vaccination makes epiglottitis rare.'],
      ['Has she had a high fever?', 'Low fever, about 38.', 'High fever and toxicity would suggest bacterial tracheitis.'],
    ],
  },
  exam: {
    text: 'You observe the exam.',
    f: [['Cough', 'Barking', 'abnormal'], ['Stridor', 'Heard at rest', 'abnormal'], ['Effort', 'Mild retractions', 'abnormal'], ['Oxygen saturation', '96%', 'normal'], ['Voice', 'Hoarse', 'abnormal'], ['Appearance', 'Alert, not drooling', 'normal']],
    junior: ['What makes the whistling sound when Isabella breathes in?', [
      ['Air squeezing through a swollen, narrow windpipe', 'Right. That sound is called stridor.', true],
      ['Her lungs are full of fluid', 'Stridor comes from the upper airway.'],
      ['She is pretending', 'Stridor is a real sign of airway narrowing.'],
    ]],
    senior: ['How severe is this croup, and what is the treatment?', [
      ['Moderate croup (stridor at rest, mild retractions): oral dexamethasone and nebulized racemic epinephrine', 'Correct. Observe for 2–4 hours after epinephrine.', true],
      ['Mild croup: home without treatment', 'Stridor at rest makes it moderate.'],
      ['Intubate immediately', 'Not for moderate croup with good oxygenation.'],
    ]],
  },
  model: {
    junior: {
      layers: [['virus', 'A cold virus', 'Spreads to the throat.'], ['swell', 'The voice box and windpipe swell', 'Just below the vocal cords.'], ['narrow', 'The airway gets narrow', 'In a small child, a little swelling matters a lot.'], ['sounds', 'Barking cough and stridor', 'What we hear.']],
      clues: [['cold', 'A cold for two days', 'virus', 'Parainfluenza is common.'], ['hoarse', 'Hoarse voice', 'swell', 'Swollen vocal cords.'], ['night', 'Worse at night', 'narrow', 'Croup often worsens at night.'], ['bark', 'Barking cough', 'sounds', 'Swollen airway.'], ['stridor', 'High-pitched breathing in', 'sounds', 'Air through a narrow tube.']],
      wrap: 'A virus swelled Isabella’s windpipe just below her voice box. Air squeezing through makes the bark and the whistle.',
    },
    senior: {
      layers: [['para', 'Parainfluenza infection', 'Viral.'], ['sub', 'Subglottic edema', 'Narrowest part of a child’s airway.'], ['flow', 'Turbulent airflow', 'Resistance rises sharply with small changes.'], ['clin', 'Barky cough, inspiratory stridor, hoarseness', 'Clinical triad.']],
      clues: [['uri', 'Preceding cold', 'para', 'Typical.'], ['age', 'Age 2', 'sub', 'Peak age; small airway.'], ['rest', 'Stridor at rest', 'flow', 'Significant narrowing.'], ['ret', 'Mild retractions', 'flow', 'Increased work.'], ['bark', 'Barking cough', 'clin', 'Classic.'], ['voice', 'Hoarseness', 'clin', 'Laryngeal involvement.']],
      wrap: 'Your model predicts improvement within 30 minutes of racemic epinephrine and lasting benefit from dexamethasone.',
    },
  },
  ddx: {
    junior: { options: [
      ['croup', 'Croup', 'leading', 'Barking cough, whistling breath and a cold.'],
      ['epi', 'A swollen flap over the windpipe (epiglottitis)', 'cantmiss', 'Rare and dangerous: drooling, very sick-looking.'],
      ['object', 'Something stuck in the airway', 'cantmiss', 'Sudden noisy breathing after choking.'],
      ['asthma', 'Asthma', 'possible', 'Usually wheezing when breathing out.'],
      ['allergy', 'An allergic reaction', 'possible', 'Swelling with hives after a trigger.'],
    ] },
    senior: { options: [
      ['croup', 'Viral croup (laryngotracheobronchitis)', 'leading', 'Classic.'],
      ['epiglottitis', 'Epiglottitis', 'cantmiss', 'Drooling, tripod position, toxic; rare after Hib vaccine.'],
      ['tracheitis', 'Bacterial tracheitis', 'cantmiss', 'High fever, toxic, poor response to epinephrine.'],
      ['fb', 'Foreign-body aspiration', 'cantmiss', 'Sudden onset after choking.'],
      ['rpa', 'Retropharyngeal abscess', 'possible', 'Neck stiffness, drooling, fever.'],
      ['ana', 'Anaphylaxis', 'possible', 'Urticaria, exposure.'],
    ] },
  },
  labs: { title: 'Response to treatment', both: true, r: [
    ['Stridor 30 minutes after racemic epinephrine', 'Gone at rest', '', 'None', 'normal'],
    ['Stridor 3 hours later (after dexamethasone)', 'None at rest', '', 'None', 'normal'],
    ['Westley croup score', '1', '', '0', 'note', 'Down from 4'],
  ] },
  decision: {
    junior: ['What does Isabella have?', [
      ['Croup, a swollen windpipe from a virus', 'Exactly. Medicine calmed the swelling.', true],
      ['Asthma', 'Her noise is when breathing in, from the upper airway.'],
      ['Something stuck in her throat', 'She has a cold and responded to croup treatment.'],
    ]],
    senior: ['Which explanation is best supported?', [
      ['Moderate viral croup responding to dexamethasone and racemic epinephrine', 'Correct. Discharge after observation with return precautions.', true],
      ['Bacterial tracheitis', 'She responded well and isn’t toxic.'],
      ['Epiglottitis', 'No drooling or toxicity, and she’s vaccinated.'],
    ]],
    wrap: 'After a few hours, Isabella sleeps comfortably without stridor. She goes home with instructions to return if the noisy breathing comes back at rest.',
  },
  debrief: {
    science: 'Croup is caused by viruses that swell the area just below the vocal cords. In young children, this part of the airway is narrow, so swelling makes a big difference.',
    pearl: 'Stridor at rest means at least moderate croup. Dexamethasone helps all severities; racemic epinephrine helps quickly in moderate to severe cases.',
    uncertainty: 'Croup can return over the next night or two.',
    human: 'The bark sounded terrifying to Isabella’s mom. Explaining what was happening calmed both of them.',
    closing: 'Knowing which noisy breath is dangerous helps healers stay calm and act wisely.',
  },
  founder: 'Teaching point: croup severity, dexamethasone and racemic epinephrine; upper vs lower airway sounds; can’t-miss mimics.',
});

export const PYLORIC = makeCase({
  code: 'CASE-054', slug: 'samuel-pyloric', room: 'emergency-department',
  title: 'Shooting Across the Room', summary: 'Five-week-old Samuel vomits forcefully after every feed but is still hungry. Find the blockage.',
  specialty: 'Pediatric Surgery', system: 'Digestive System', minutes: [15, 25],
  patient: { name: 'Samuel Adeyemi', age: '5 weeks', concern: 'Forceful vomiting after every feed' },
  art: 'a 5-week-old Nigerian-American baby boy in a hospital bassinet looking hungry and alert, his mother sitting beside him with a bottle, a pediatric surgeon gently examining his belly, an ultrasound machine nearby, soft warm light',
  opening: {
    scene: 'For a week, Samuel has vomited forcefully after nearly every feeding. The vomit shoots across the room. Right after, he acts hungry again. He has fewer wet diapers.',
    dialogue: 'It flies out of him. And then he wants to eat again right away.',
    speaker: 'Samuel’s mom',
    narrator: 'In young infants, the color of vomit and the pattern of vomiting give important clues about where a blockage is.',
  },
  history: {
    min: 3, speaker: 'Samuel’s mom',
    q: [
      ['What color is the vomit?', 'Milky. Never green.', 'Non-bilious vomit means the blockage is before bile enters the intestine.'],
      ['Is he hungry after vomiting?', 'Starving.', 'The classic “hungry vomiter.”'],
      ['Is he your first baby?', 'Yes, our first son.', 'Pyloric stenosis is more common in firstborn boys.'],
      ['How many wet diapers?', 'Only two today.', 'Dehydration.'],
      ['Has his weight changed?', 'He lost weight since his last visit.', 'Poor weight gain.'],
    ],
  },
  exam: {
    text: 'You observe the exam.',
    f: [['Belly', 'A small, firm “olive” felt in the upper belly', 'abnormal'], ['Stomach', 'Visible waves moving left to right', 'abnormal'], ['Hydration', 'Dry mouth, sunken soft spot', 'abnormal'], ['Weight', 'Below birth weight trajectory', 'low'], ['Alertness', 'Alert and hungry', 'normal']],
    junior: ['Why does it matter that the vomit is never green?', [
      ['Green vomit means bile; no bile means the blockage is right at the stomach’s exit', 'Right. Where the blockage is changes the diagnosis.', true],
      ['Color doesn’t matter', 'Color is an important clue.'],
      ['It means he is allergic to milk', 'Allergy doesn’t cause projectile vomiting like this.'],
    ]],
    senior: ['What do the findings suggest?', [
      ['Hypertrophic pyloric stenosis', 'Correct. Projectile non-bilious vomiting, olive mass, visible peristalsis, age 2–8 weeks.', true],
      ['Malrotation with volvulus', 'Causes bilious vomiting; always a surgical emergency.'],
      ['Gastroesophageal reflux', 'Reflux is effortless spitting up, not projectile.'],
    ]],
  },
  model: {
    junior: {
      layers: [['muscle', 'The muscle at the stomach’s exit grows thick', 'In the first weeks of life.'], ['block', 'Milk can’t leave the stomach', 'The exit is blocked.'], ['vomit', 'The stomach squeezes hard and milk shoots out', 'Projectile vomiting.'], ['dry', 'He loses water and salt', 'Dehydration.']],
      clues: [['olive', 'An “olive” in his belly', 'muscle', 'The thick muscle.'], ['waves', 'Waves across his belly', 'block', 'The stomach fights the blockage.'], ['flies', 'Vomit flies across the room', 'vomit', 'Forceful squeezing.'], ['white', 'Never green', 'block', 'Blockage before bile.'], ['diapers', 'Only two wet diapers', 'dry', 'Dehydrated.']],
      wrap: 'The muscle at Samuel’s stomach exit grew thick and blocked milk from passing, so his stomach squeezed hard and the milk shot back up.',
    },
    senior: {
      layers: [['hyper', 'Pyloric muscle hypertrophy', 'Multifactorial.'], ['obs', 'Gastric outlet obstruction', 'Proximal to bile entry.'], ['loss', 'Loss of gastric acid (HCl)', 'Vomiting stomach contents.'], ['alk', 'Hypochloremic, hypokalemic metabolic alkalosis', 'Kidneys conserve volume.']],
      clues: [['olv', 'Palpable olive', 'hyper', 'Thickened pylorus.'], ['peri', 'Visible gastric peristalsis', 'obs', 'Obstruction.'], ['nonbil', 'Non-bilious vomiting', 'obs', 'Proximal to ampulla.'], ['proj', 'Projectile vomiting', 'loss', 'Loss of HCl.'], ['dehyd', 'Dehydration', 'alk', 'Volume depletion drives alkalosis.']],
      wrap: 'Your model predicts low chloride and potassium, high bicarbonate, and a thickened pylorus on ultrasound.',
    },
  },
  ddx: {
    junior: { options: [
      ['pyloric', 'A thick muscle blocking the stomach exit', 'leading', 'Projectile, never green, always hungry, olive in belly.'],
      ['reflux', 'Spitting up (reflux)', 'possible', 'Common, but gentle, not forceful.'],
      ['twist', 'A twisted intestine', 'cantmiss', 'Causes green vomit and is an emergency.'],
      ['allergy', 'Milk allergy', 'possible', 'Can cause vomiting and blood in stool.'],
      ['overfeed', 'Eating too much', 'unlikely', 'Doesn’t cause weight loss.'],
    ] },
    senior: { options: [
      ['hps', 'Hypertrophic pyloric stenosis', 'leading', 'Classic.'],
      ['volvulus', 'Malrotation with midgut volvulus', 'cantmiss', 'Bilious vomiting; emergency.'],
      ['gerd', 'Gastroesophageal reflux', 'possible', 'Effortless regurgitation.'],
      ['cmpa', 'Cow’s milk protein allergy', 'possible', 'Vomiting, bloody stools.'],
      ['uti', 'Urinary tract infection', 'possible', 'Vomiting can be the only sign in infants.'],
      ['cah', 'Congenital adrenal hyperplasia (salt-wasting)', 'possible', 'Vomiting with hyperkalemia and acidosis, the opposite pattern.'],
    ] },
  },
  labs: { r: [
    ['Chloride', '88', 'mmol/L', '98–107', 'low'],
    ['Potassium', '3.0', 'mmol/L', '3.5–5.5', 'low'],
    ['Bicarbonate', '34', 'mmol/L', '18–25', 'high'],
    ['Ultrasound: pyloric muscle thickness', '5', 'mm', '< 3', 'high'],
    ['Ultrasound: pyloric length', '18', 'mm', '< 15', 'high'],
  ] },
  decision: {
    junior: ['What does Samuel have?', [
      ['Pyloric stenosis', 'Exactly. After fluids, a small surgery fixes it.', true],
      ['Reflux', 'His vomiting is forceful and the ultrasound shows a thick muscle.'],
      ['Milk allergy', 'His ultrasound shows a blockage.'],
    ]],
    senior: ['Which explanation is best supported?', [
      ['Hypertrophic pyloric stenosis with hypochloremic hypokalemic metabolic alkalosis', 'Correct. Correct fluids and electrolytes first, then pyloromyotomy.', true],
      ['Malrotation', 'Non-bilious vomiting and ultrasound findings.'],
      ['CAH', 'CAH causes hyperkalemia and acidosis.'],
    ]],
    wrap: 'Samuel receives IV fluids to fix his electrolytes, then a pyloromyotomy the next day. He feeds within hours and goes home gaining weight.',
  },
  debrief: {
    science: 'The pylorus is a ring of muscle at the stomach’s exit. In pyloric stenosis, it thickens and blocks milk from passing. Vomiting stomach acid causes the body to lose chloride and become alkalotic.',
    pearl: 'Green (bilious) vomiting in a baby is an emergency until proven otherwise. Projectile non-bilious vomiting in a hungry 2–8-week-old suggests pyloric stenosis.',
    uncertainty: 'After surgery, most babies have no long-term problems.',
    human: 'Samuel’s parents worried they were feeding him wrong. Explaining the cause relieved their guilt.',
    closing: 'One small muscle, one small surgery, one big relief.',
  },
  founder: 'Teaching point: bilious vs non-bilious vomiting; electrolytes before surgery; why the body becomes alkalotic.',
});

export const INTUSSUSCEPTION = makeCase({
  code: 'CASE-055', slug: 'aiden-intussusception', room: 'emergency-department', emergency: true,
  title: 'Screaming, Then Silent', summary: 'Aiden has sudden fits of crying with his knees pulled up, then lies limp in between. The intestine is telescoping.',
  specialty: 'Pediatric Emergency Medicine & Radiology', system: 'Digestive System', minutes: [15, 25],
  patient: { name: 'Aiden Kowalski', age: '10 months', concern: 'Episodes of severe crying and vomiting' },
  art: 'a 10-month-old Polish-American baby boy lying pale and tired on his father’s lap in a pediatric emergency room, the father worried, a pediatric radiologist holding an ultrasound probe on the baby’s belly with gel, soft lighting',
  opening: {
    scene: 'Every 15–20 minutes, Aiden suddenly screams, pulls his knees to his chest and turns pale. In between, he lies limp and sleepy. He has vomited three times.',
    dialogue: 'He screams like something hurts terribly, then he just goes quiet and floppy.',
    speaker: 'Aiden’s dad',
    narrator: 'Intussusception is when one part of the intestine slides into the next, like a telescope. It’s the most common cause of bowel obstruction in infants and toddlers.',
  },
  history: {
    min: 3, speaker: 'Aiden’s dad',
    q: [
      ['How often do the crying fits happen?', 'Every 15 or 20 minutes.', 'Intermittent colicky pain.'],
      ['What is he like between episodes?', 'Sleepy and floppy.', 'Lethargy can be a main sign.'],
      ['Has he vomited? What color?', 'Three times. The last one looked a little green.', 'Bile suggests obstruction.'],
      ['Has his poop changed?', 'There was some red, jelly-like stuff in his diaper.', '“Currant jelly” stool is a late sign.'],
      ['Has he been sick recently?', 'A cold last week.', 'Viral illness can swell intestinal lymph tissue that becomes a lead point.'],
    ],
  },
  exam: {
    text: 'You observe the exam.',
    f: [['Belly', 'A sausage-shaped mass on the right upper side', 'abnormal'], ['Alertness', 'Lethargic between episodes', 'abnormal'], ['Heart rate', '168', 'high'], ['Diaper', 'Red jelly-like stool', 'abnormal'], ['Hydration', 'Mildly dry', 'abnormal']],
    junior: ['What do the crying fits and sleepy periods suggest?', [
      ['A painful belly problem that comes in waves', 'Right. The intestine squeezes against a blockage, then relaxes.', true],
      ['Teething', 'Teething doesn’t cause this.'],
      ['Being tired', 'Limpness between painful episodes is a warning sign.'],
    ]],
    senior: ['What is your leading diagnosis and test?', [
      ['Intussusception; abdominal ultrasound', 'Correct. Look for a target sign.', true],
      ['Gastroenteritis; oral fluids', 'Doesn’t explain the mass and currant jelly stool.'],
      ['Colic', 'Not at 10 months, and not with lethargy and blood.'],
    ]],
  },
  model: {
    junior: {
      layers: [['lump', 'A swollen lump inside the intestine', 'After a cold.'], ['slide', 'The intestine slides into itself', 'Like a telescope.'], ['squeeze', 'Blood flow gets squeezed', 'The intestine is injured.'], ['signs', 'Pain in waves, vomiting and bloody stool', 'What we see.']],
      clues: [['cold', 'A cold last week', 'lump', 'Swollen lymph tissue.'], ['mass', 'Sausage-shaped mass', 'slide', 'The telescoped intestine.'], ['jelly', 'Red jelly stool', 'squeeze', 'Injured intestine bleeds.'], ['fits', 'Screaming fits', 'signs', 'Painful waves.'], ['floppy', 'Floppy in between', 'signs', 'An important sign.']],
      wrap: 'After a cold, a swollen spot inside Aiden’s intestine got pulled into the next section, like a telescope. Blood flow was squeezed, causing waves of pain.',
    },
    senior: {
      layers: [['lead', 'Lead point', 'Often hypertrophied Peyer’s patches after viral illness.'], ['tele', 'Ileocolic invagination', 'Peristalsis pulls proximal bowel into distal.'], ['isch', 'Venous congestion and ischemia', 'Mucosal bleeding.'], ['obs', 'Obstruction and systemic signs', 'Vomiting, lethargy.']],
      clues: [['uri', 'Recent viral illness', 'lead', 'Lymphoid hyperplasia.'], ['sausage', 'RUQ sausage-shaped mass', 'tele', 'Intussusceptum.'], ['cj', 'Currant jelly stool', 'isch', 'Mucosal ischemia.'], ['colic', 'Intermittent colicky pain', 'obs', 'Peristaltic waves.'], ['bile', 'Bilious vomiting', 'obs', 'Obstruction.'], ['leth', 'Lethargy', 'obs', 'May be the dominant sign.']],
      wrap: 'Your model predicts a target sign on ultrasound and reduction by enema if there is no perforation.',
    },
  },
  ddx: {
    junior: { options: [
      ['intus', 'Intestine telescoping into itself', 'leading', 'Waves of pain, floppy between, mass and red jelly stool.'],
      ['bug', 'A stomach bug', 'possible', 'Usually with diarrhea and without a mass.'],
      ['twist', 'A twisted intestine', 'cantmiss', 'Also an emergency with green vomit.'],
      ['hernia', 'A stuck hernia', 'possible', 'A bulge in the groin.'],
      ['teething', 'Teething', 'unlikely', 'Doesn’t cause these signs.'],
    ] },
    senior: { options: [
      ['intus', 'Ileocolic intussusception', 'leading', 'Classic.'],
      ['volvulus', 'Midgut volvulus', 'cantmiss', 'Bilious vomiting; emergency.'],
      ['ge', 'Gastroenteritis', 'possible', 'Diarrhea, no mass.'],
      ['hernia', 'Incarcerated hernia', 'possible', 'Groin exam.'],
      ['meckel', 'Meckel’s diverticulum (as a lead point)', 'possible', 'Pathologic lead point, often older children.'],
      ['hsp', 'IgA vasculitis (HSP)', 'possible', 'Rash, joint pain; can cause intussusception.'],
    ] },
  },
  labs: { title: 'Imaging', both: true, r: [
    ['Abdominal ultrasound', 'Target sign in the right upper abdomen', '', 'Normal', 'abnormal'],
    ['Air enema', 'Successful reduction', '', '—', 'normal'],
  ] },
  decision: {
    junior: ['What happened to Aiden?', [
      ['His intestine telescoped into itself', 'Exactly. A special air enema pushed it back.', true],
      ['A stomach bug', 'His ultrasound shows intussusception.'],
      ['Teething', 'His intestine was blocked.'],
    ]],
    senior: ['Which explanation is best supported?', [
      ['Ileocolic intussusception, reduced by air enema', 'Correct. Surgery is needed if perforation, peritonitis or failed reduction.', true],
      ['Midgut volvulus', 'Ultrasound shows a target sign.'],
      ['Gastroenteritis', 'Imaging confirmed intussusception.'],
    ]],
    wrap: 'The air enema slides Aiden’s intestine back into place. Within an hour he is smiling and taking a bottle. He stays overnight to watch for recurrence.',
  },
  debrief: {
    science: 'In intussusception, a segment of intestine slides into the next segment. The squeezed segment loses blood flow, bleeds and swells, and the bowel becomes blocked.',
    pearl: 'Episodes of severe crying with knees pulled up and lethargy between in a baby under 3 years: think intussusception. Ultrasound diagnoses it; an enema often fixes it.',
    uncertainty: 'About 1 in 10 recur, usually within a day or two.',
    human: 'Aiden’s dad noticed the pattern and timed the episodes. Parents’ observations are often the key.',
    closing: 'Watching the pattern of pain leads to the diagnosis.',
  },
  founder: 'Teaching point: intussusception classic triad (often incomplete), lethargy as a presenting sign, ultrasound and enema reduction.',
});

export const JAUNDICE = makeCase({
  code: 'CASE-056', slug: 'zara-jaundice', room: 'newborn-nursery',
  title: 'Golden Baby', summary: 'Three-day-old Zara is turning yellow and sleepy. Learn when newborn jaundice is normal and when it needs treatment.',
  specialty: 'Neonatology', system: 'Newborn', minutes: [15, 25],
  patient: { name: 'Zara Ahmed', age: '3 days', concern: 'Yellow skin and sleepy feeding' },
  art: 'a 3-day-old newborn baby girl with a soft yellow skin tone lying under a gentle blue phototherapy light in a nursery bassinet with eye protection, her mother watching lovingly, a nurse checking a bilirubin meter, calm nursery',
  opening: {
    scene: 'Zara is three days old and exclusively breastfed. Her parents noticed her skin and the whites of her eyes are yellow, now down to her belly. She’s sleepy and feeding less.',
    dialogue: 'She looks so golden. Is that okay?',
    speaker: 'Zara’s mom',
    narrator: 'Most newborns turn a little yellow. Healers measure the level and look for causes, because very high levels can harm the brain.',
    narratorRole: 'Neonatologist',
  },
  history: {
    min: 3, speaker: 'Zara’s mom',
    q: [
      ['When did the yellow start?', 'Yesterday, on her face. Now it’s on her belly.', 'Jaundice spreads from head down as levels rise.'],
      ['How often is she feeding?', 'Every 4 hours. She falls asleep at the breast.', 'Not enough milk can raise bilirubin.'],
      ['How many wet and dirty diapers?', 'Two wet, one dirty today.', 'Fewer than expected.'],
      ['What are your blood type and hers?', 'I’m O positive. They said she’s A positive.', 'Blood type differences can cause hemolysis.'],
      ['What color are her stools?', 'Yellow-green.', 'Pale stools would suggest liver problems.'],
    ],
  },
  exam: {
    text: 'You observe the exam.',
    f: [['Skin', 'Yellow to the belly', 'abnormal'], ['Eyes', 'Yellow', 'abnormal'], ['Weight', 'Down 11% from birth weight', 'low'], ['Alertness', 'Sleepy, but wakes and cries', 'note'], ['Liver and spleen', 'Normal', 'normal'], ['Gestation', 'Born at 37 weeks', 'note']],
    junior: ['What is making Zara yellow?', [
      ['A yellow substance called bilirubin building up in her blood', 'Right. It comes from old red blood cells breaking down.', true],
      ['Eating carrots', 'She only drinks milk.'],
      ['A sunburn', 'Jaundice is from bilirubin.'],
    ]],
    senior: ['What are the key risk factors here?', [
      ['ABO incompatibility, 37 weeks’ gestation, exclusive breastfeeding with suboptimal intake and 11% weight loss', 'Correct. Check a total serum bilirubin and plot it by age in hours.', true],
      ['None; it’s physiologic', 'Several risk factors are present.'],
      ['Biliary atresia', 'Stools are colored; check direct bilirubin to be sure.'],
    ]],
  },
  model: {
    junior: {
      layers: [['break', 'Red blood cells break down faster', 'Newborns have extra red cells.'], ['bili', 'Bilirubin is made', 'A yellow pigment.'], ['slow', 'The baby’s liver and gut clear it slowly', 'Especially without enough milk.'], ['yellow', 'Bilirubin builds up', 'Yellow skin and eyes.']],
      clues: [['types', 'Mom O+, baby A+', 'break', 'Mom’s antibodies break baby’s red cells.'], ['sleepy', 'Sleepy at feeds', 'slow', 'Less milk means fewer stools to clear bilirubin.'], ['diapers', 'Few diapers', 'slow', 'Not enough milk.'], ['weight', 'Lost 11% of weight', 'slow', 'Not enough intake.'], ['belly', 'Yellow down to her belly', 'yellow', 'Higher levels spread downward.']],
      wrap: 'Zara’s red cells broke down faster than usual, and she wasn’t getting enough milk to clear the bilirubin, so it built up.',
    },
    senior: {
      layers: [['hemo', 'Increased bilirubin production', 'Hemolysis plus newborn red cell turnover.'], ['conj', 'Immature hepatic conjugation', 'Low UGT activity.'], ['entero', 'Increased enterohepatic circulation', 'Suboptimal intake, fewer stools.'], ['unconj', 'Unconjugated hyperbilirubinemia', 'Risk to the brain at high levels.']],
      clues: [['abo', 'ABO incompatibility', 'hemo', 'Maternal anti-A antibodies.'], ['37', '37 weeks', 'conj', 'Late preterm and early term risk.'], ['feed', 'Infrequent feeding', 'entero', 'Breastfeeding jaundice.'], ['wt', '11% weight loss', 'entero', 'Inadequate intake.'], ['cephalo', 'Jaundice to the abdomen', 'unconj', 'Cephalocaudal progression.']],
      wrap: 'Your model predicts a high unconjugated bilirubin, a positive DAT and a raised reticulocyte count.',
    },
  },
  ddx: {
    junior: { options: [
      ['bili', 'Newborn jaundice made worse by blood type and feeding', 'leading', 'Blood type difference and not enough milk.'],
      ['normal', 'Normal newborn jaundice', 'possible', 'Common, but hers is rising fast.'],
      ['liver', 'A liver problem', 'cantmiss', 'Pale stools would be a warning sign.'],
      ['infection', 'An infection', 'possible', 'Doctors watch for fever and poor feeding.'],
      ['food', 'Something mom ate', 'unlikely', 'Doesn’t cause jaundice.'],
    ] },
    senior: { options: [
      ['abo', 'ABO hemolytic disease with suboptimal intake jaundice', 'leading', 'Risk factors align.'],
      ['phys', 'Physiologic jaundice', 'possible', 'Usually milder.'],
      ['g6pd', 'G6PD deficiency', 'possible', 'Hemolysis; test if indicated.'],
      ['biliary', 'Biliary atresia', 'cantmiss', 'Direct hyperbilirubinemia, pale stools, usually later.'],
      ['sepsis', 'Sepsis', 'possible', 'Lethargy, temperature instability.'],
      ['hypothy', 'Congenital hypothyroidism', 'possible', 'Prolonged jaundice; newborn screen.'],
    ] },
  },
  labs: { r: [
    ['Total serum bilirubin (72 hours)', '19.5', 'mg/dL', 'Above phototherapy threshold for her risk', 'high'],
    ['Direct bilirubin', '0.4', 'mg/dL', '< 1.0', 'normal'],
    ['Direct antiglobulin test (DAT)', 'Positive', '', 'Negative', 'high'],
    ['Hemoglobin', '13.5', 'g/dL', '14–22 (newborn)', 'low'],
    ['Reticulocytes', '7', '%', '3–7', 'high'],
  ] },
  decision: {
    junior: ['What does Zara need?', [
      ['Blue light treatment (phototherapy) and help with feeding', 'Exactly. The light helps her body get rid of bilirubin.', true],
      ['Nothing; it will go away', 'Her level is high enough to treat.'],
      ['To stop breastfeeding forever', 'She needs more milk, not less. Lactation support helps.'],
    ]],
    senior: ['Which explanation and plan are best supported?', [
      ['ABO hemolytic disease with suboptimal intake; intensive phototherapy, lactation support and close bilirubin monitoring', 'Correct. Exchange transfusion only if levels approach that threshold.', true],
      ['Biliary atresia', 'Direct bilirubin is normal.'],
      ['Physiologic jaundice; no treatment', 'She’s above the phototherapy threshold.'],
    ]],
    wrap: 'Zara spends a day under phototherapy and feeds every 2–3 hours with lactation support. Her bilirubin falls steadily, and she goes home with a follow-up check.',
  },
  debrief: {
    science: 'Newborns break down red blood cells quickly, making bilirubin, while their liver is still learning to process it. Blood type differences and not enough milk raise levels further.',
    pearl: 'Every newborn is checked for jaundice before going home. Very high bilirubin can injure the brain (kernicterus), which is why phototherapy matters. Pale stools or dark urine in a jaundiced baby need urgent evaluation.',
    uncertainty: 'Some babies need a second round of phototherapy.',
    human: 'Zara’s mom worried breastfeeding was failing. Lactation support turned worry into confidence.',
    closing: 'Small lights and good support protect developing brains.',
  },
  founder: 'Teaching point: neonatal jaundice risk factors, phototherapy thresholds, conjugated vs unconjugated, kernicterus prevention.',
});

export const MENINGITIS = makeCase({
  code: 'CASE-057', slug: 'nora-meningitis', room: 'emergency-department', emergency: true,
  title: 'Fever at Six Weeks', summary: 'Baby Nora has a fever and won’t stop crying. Every fever in a young infant is taken seriously.',
  specialty: 'Pediatric Emergency Medicine & Infectious Disease', system: 'Infection & Immunity', minutes: [20, 30],
  patient: { name: 'Nora Lindqvist', age: '6 weeks', concern: 'Fever and inconsolable crying' },
  art: 'a 6-week-old baby girl with light hair lying in a hospital crib looking flushed and fussy, her mother leaning over her worried, a pediatrician gently examining the soft spot on her head, an IV pole nearby, calm urgent lighting',
  opening: {
    scene: 'Nora is six weeks old. Since this afternoon she’s had a fever of 38.6 °C, won’t feed, and cries when picked up. She seems sleepier than usual between cries.',
    dialogue: 'She cries harder when I hold her. That’s not like her.',
    speaker: 'Nora’s mom',
    narrator: 'Babies under two months can’t fight infections well, and their signs are subtle. A fever in a young infant always gets a careful evaluation.',
  },
  history: {
    min: 3, speaker: 'Nora’s mom',
    q: [
      ['How high is the fever?', '38.6 °C rectally.', 'Any fever of 38 °C or higher in a baby under 60 days needs evaluation.'],
      ['Is she feeding?', 'She refuses the bottle.', 'Poor feeding is a warning sign.'],
      ['Does she cry more when you hold her?', 'Yes, she screams when picked up.', 'Paradoxical irritability can suggest meningitis.'],
      ['Were you tested for group B strep during pregnancy?', 'I was positive and got antibiotics in labor.', 'Late-onset GBS can still occur.'],
      ['Any rash or blisters?', 'No.', 'Blisters might suggest herpes infection.'],
    ],
  },
  exam: {
    text: 'You observe the exam.',
    f: [['Temperature', '38.6 °C', 'high'], ['Soft spot (fontanelle)', 'Bulging', 'abnormal'], ['Alertness', 'Lethargic between cries', 'abnormal'], ['Heart rate', '190', 'high'], ['Capillary refill', '3 seconds', 'abnormal'], ['Skin', 'No rash', 'normal']],
    junior: ['What does the bulging soft spot on her head suggest?', [
      ['Pressure inside her head, possibly from an infection around the brain', 'Right. This is an emergency.', true],
      ['She is teething', 'Teething doesn’t cause a bulging soft spot.'],
      ['Nothing important', 'It’s an important warning sign.'],
    ]],
    senior: ['What is your assessment and immediate plan?', [
      ['Ill-appearing febrile infant with suspected bacterial meningitis: cultures (blood, urine, CSF) and immediate IV antibiotics', 'Correct. Don’t delay antibiotics if a lumbar puncture will be delayed.', true],
      ['Viral illness; observe at home', 'She is ill-appearing with a bulging fontanelle.'],
      ['UTI; oral antibiotics', 'Possible source, but she needs a full sepsis evaluation.'],
    ]],
  },
  act: {
    junior: {
      prompt: 'Put the team’s steps in order.',
      steps: [['Check her breathing and heartbeat, give oxygen if needed', 'Safety first.'], ['Start an IV and check her blood sugar', 'Babies can get low sugar when sick.'], ['Take samples of blood, urine and spinal fluid', 'Find the germ.'], ['Give strong IV antibiotics right away', 'Every minute matters.'], ['Watch her closely in the hospital', 'Babies change quickly.']],
      distractors: [['Give fever medicine and send her home', 'A sick baby with fever needs full care.'], ['Wait for test results before antibiotics', 'Too slow.']],
    },
    senior: {
      prompt: 'Order the management of suspected bacterial meningitis in a 6-week-old.',
      steps: [['ABCs, monitoring and glucose check', 'Stabilize.'], ['IV or IO access; blood culture', 'Before antibiotics if no delay.'], ['Catheter urine for analysis and culture', 'A common source.'], ['Lumbar puncture if stable', 'Do not delay antibiotics for it.'], ['IV ceftriaxone (meningitic dosing) plus vancomycin; add acyclovir if HSV is possible', 'Empiric coverage.'], ['Admit; reassess and tailor therapy to cultures', 'Supportive care and hearing test later.']],
      distractors: [['Give dexamethasone routinely', 'Not routinely recommended in young infants.'], ['Delay antibiotics until after CT and LP', 'Never delay antibiotics.']],
    },
  },
  model: {
    junior: {
      layers: [['germ', 'A germ gets into her blood', 'Babies’ defenses are still developing.'], ['brain', 'It reaches the coverings of the brain', 'Meningitis.'], ['swell', 'Inflammation raises pressure', 'Around the brain.'], ['signs', 'Fever, crying and sleepiness', 'What we see.']],
      clues: [['gbs', 'Mom had group B strep', 'germ', 'A common germ for young babies.'], ['fever', 'Fever', 'germ', 'The body fights back.'], ['bulge', 'Bulging soft spot', 'swell', 'Pressure inside her head.'], ['hold', 'Cries more when held', 'swell', 'Movement hurts inflamed tissues.'], ['sleepy', 'Very sleepy', 'signs', 'The brain is affected.'], ['nofeed', 'Won’t feed', 'signs', 'A warning sign.']],
      wrap: 'A germ got into Nora’s blood and reached the coverings of her brain, causing swelling and pressure.',
    },
    senior: {
      layers: [['bact', 'Late-onset bacteremia', 'GBS despite intrapartum prophylaxis.'], ['cns', 'Meningeal invasion', 'Crossing the blood-brain barrier.'], ['infl', 'Meningeal inflammation and raised ICP', 'Cytokines, edema.'], ['sys', 'Systemic and neurologic signs', 'Fever, lethargy, poor perfusion.']],
      clues: [['gbs', 'Maternal GBS colonization', 'bact', 'Late-onset GBS can occur after prophylaxis.'], ['fev', 'Fever 38.6 °C', 'bact', 'Bacteremia.'], ['font', 'Bulging fontanelle', 'infl', 'Raised ICP.'], ['parad', 'Paradoxical irritability', 'infl', 'Meningeal irritation.'], ['leth', 'Lethargy', 'sys', 'CNS involvement.'], ['crt', 'Tachycardia, CRT 3 s', 'sys', 'Early sepsis.']],
      wrap: 'Your model predicts CSF with many neutrophils, low glucose, high protein and gram-positive cocci.',
    },
  },
  ddx: {
    junior: { options: [
      ['mening', 'A brain covering infection (meningitis)', 'leading', 'Fever, bulging soft spot, crying when held, sleepy.'],
      ['uti', 'A urine infection', 'possible', 'Common in young babies with fever.'],
      ['virus', 'A virus', 'possible', 'Can cause fever, but she looks very sick.'],
      ['herpes', 'A herpes infection', 'cantmiss', 'Dangerous in newborns; doctors test and treat.'],
      ['teething', 'Teething', 'unlikely', 'Too young, and teething doesn’t cause this.'],
    ] },
    senior: { options: [
      ['bm', 'Bacterial meningitis', 'leading', 'Ill-appearing febrile infant with bulging fontanelle.'],
      ['hsv', 'Neonatal HSV encephalitis', 'cantmiss', 'Can occur without skin lesions; add acyclovir if suspected.'],
      ['uti', 'Urinary tract infection with bacteremia', 'possible', 'Common source.'],
      ['viral', 'Enteroviral meningitis', 'possible', 'Common in summer; usually less ill.'],
      ['nat', 'Abusive head trauma', 'possible', 'Bulging fontanelle and lethargy without fever.'],
      ['sepsis', 'Sepsis from another source', 'possible', 'Search fully.'],
    ] },
  },
  labs: { r: [
    ['CSF white cells', '1,200', 'per µL', '< 20 (young infant)', 'high', 'Mostly neutrophils'],
    ['CSF glucose', '20', 'mg/dL', '> 40', 'low'],
    ['CSF protein', '180', 'mg/dL', '< 100', 'high'],
    ['CSF Gram stain', 'Gram-positive cocci in chains', '', 'None', 'note'],
    ['Blood culture', 'Group B Streptococcus', '', 'No growth', 'note'],
    ['Urinalysis', 'Normal', '', 'Normal', 'normal'],
  ] },
  decision: {
    junior: ['What does Nora have?', [
      ['Meningitis from a germ called group B strep', 'Exactly. Fast antibiotics give her the best chance.', true],
      ['A virus', 'Her spinal fluid shows a bacterial infection.'],
      ['A urine infection', 'Her urine is normal.'],
    ]],
    senior: ['Which explanation is best supported?', [
      ['Late-onset group B streptococcal meningitis', 'Correct. Narrow to IV penicillin or ampicillin per sensitivities; 14+ days; hearing screen and developmental follow-up.', true],
      ['HSV encephalitis', 'Gram stain and culture identify GBS.'],
      ['Viral meningitis', 'CSF shows bacterial pattern.'],
    ]],
    wrap: 'Nora completes IV antibiotics in the hospital. Her hearing test is normal before discharge, and her team will follow her development closely.',
  },
  debrief: {
    science: 'Young infants have immature immune systems. Bacteria in the blood can cross into the fluid around the brain, causing inflammation and pressure.',
    pearl: 'Any fever of 38 °C (100.4 °F) or higher in a baby under 2 months needs medical evaluation right away. Never delay antibiotics in a sick infant.',
    uncertainty: 'Some babies have long-term effects like hearing loss or developmental delays, which is why follow-up matters.',
    human: 'Nora’s mom almost waited until morning. Clear guidance about fevers in young babies saves lives.',
    closing: 'In the youngest patients, subtle signs carry big messages.',
  },
  founder: 'Teaching point: febrile infant under 60 days, meningitis signs in infants, don’t delay antibiotics, GBS late-onset disease.',
});

export const LEAD = makeCase({
  code: 'CASE-058', slug: 'josiah-lead', room: 'childrens-clinic',
  title: 'The Old House', summary: 'Josiah’s routine screening shows high lead. Find the source, and protect a growing brain.',
  specialty: 'General Pediatrics & Environmental Health', system: 'Brain & Nerves', minutes: [15, 25],
  patient: { name: 'Josiah Bell', age: 2, concern: 'High lead on routine screening' },
  art: 'a 2-year-old Black toddler playing with blocks on a clinic floor mat, his grandmother sitting nearby talking with a pediatrician who holds a photo of an old house with peeling window paint on a tablet, warm clinic light',
  opening: {
    scene: 'At his 2-year check-up, Josiah’s routine fingerstick lead test came back high. His family rents an older house built in the 1920s. He says only a few words.',
    dialogue: 'He chews on everything, even the windowsills.',
    speaker: 'Josiah’s grandmother',
    narrator: 'There is no safe level of lead for children. Lead harms the developing brain, and the most important treatment is removing the source.',
  },
  history: {
    min: 3, speaker: 'Josiah’s grandmother',
    q: [
      ['How old is your home?', 'Built in the 1920s. The window paint is peeling.', 'Homes built before 1978 may contain lead paint.'],
      ['Does he put non-food things in his mouth?', 'All the time. Paint chips too.', 'Pica increases exposure.'],
      ['How is his speech?', 'Only about 10 words.', 'Lead can delay development.'],
      ['Any belly pain or constipation?', 'He’s constipated.', 'A symptom of lead poisoning.'],
      ['What does he eat?', 'Mostly milk, some snacks.', 'Low iron increases lead absorption.'],
    ],
  },
  exam: {
    text: 'You observe the exam.',
    f: [['Development', 'About 10 words (expected 50+)', 'abnormal'], ['Behavior', 'Irritable', 'note'], ['Skin and gums', 'Pale', 'abnormal'], ['Neurologic exam', 'Otherwise normal', 'normal'], ['Belly', 'Mildly firm with stool', 'note']],
    junior: ['Where is the lead most likely coming from?', [
      ['Peeling paint in his old house', 'Right. Old paint can contain lead.', true],
      ['His toys', 'Some toys can contain lead, but the old paint is the strongest clue.'],
      ['The air at the park', 'Less likely here.'],
    ]],
    senior: ['What is the next step after a high fingerstick lead?', [
      ['Confirm with a venous blood lead level, check iron status, and report to public health for an environmental investigation', 'Correct. Fingersticks can be contaminated.', true],
      ['Start chelation right away', 'Chelation is reserved for venous levels ≥ 45 µg/dL.'],
      ['Retest in a year', 'High levels need action now.'],
    ]],
  },
  model: {
    junior: {
      layers: [['source', 'Lead in old paint', 'Peeling and dust.'], ['mouth', 'Lead gets into his mouth', 'Toddlers explore with their mouths.'], ['absorb', 'His body absorbs it', 'More if iron is low.'], ['brain', 'Lead affects the growing brain', 'Speech and behavior.']],
      clues: [['1920', 'House built in the 1920s', 'source', 'Lead paint era.'], ['peel', 'Peeling window paint', 'source', 'Lead dust and chips.'], ['chews', 'Chews windowsills', 'mouth', 'Swallowing paint.'], ['milk', 'Mostly milk', 'absorb', 'Low iron increases lead absorption.'], ['words', 'Only 10 words', 'brain', 'Delayed speech.']],
      wrap: 'Peeling lead paint in Josiah’s old house got into his mouth. Low iron let his body absorb more, and lead is affecting his developing brain.',
    },
    senior: {
      layers: [['exp', 'Environmental lead exposure', 'Pre-1978 housing.'], ['ingest', 'Ingestion via hand-to-mouth and pica', 'Dust and chips.'], ['abs', 'Enhanced GI absorption', 'Iron deficiency upregulates divalent transport.'], ['tox', 'Neurotoxicity and heme synthesis inhibition', 'Developmental and hematologic effects.']],
      clues: [['house', 'Deteriorating pre-1978 paint', 'exp', 'Major source.'], ['pica', 'Pica', 'ingest', 'Exposure route.'], ['diet', 'Milk-heavy diet', 'abs', 'Iron deficiency.'], ['pallor', 'Pallor', 'tox', 'Anemia from iron deficiency and heme inhibition.'], ['speech', 'Speech delay', 'tox', 'Neurodevelopmental effect.'], ['const', 'Constipation', 'tox', 'GI symptom.']],
      wrap: 'Your model predicts a confirmed venous lead elevation, microcytic anemia with low ferritin, and possibly paint chips on X-ray.',
    },
  },
  ddx: {
    junior: { options: [
      ['lead', 'Lead poisoning', 'leading', 'Old house, peeling paint, chewing and speech delay.'],
      ['iron', 'Low iron', 'possible', 'Often happens alongside lead and makes it worse.'],
      ['hearing', 'Hearing loss', 'possible', 'Can cause speech delay; check hearing.'],
      ['autism', 'Autism', 'possible', 'Can cause speech delay; doctors screen.'],
      ['nothing', 'Nothing; he’s just quiet', 'unlikely', 'High lead always needs action.'],
    ] },
    senior: { options: [
      ['lead', 'Lead poisoning', 'leading', 'Confirmed exposure and findings.'],
      ['ida', 'Iron deficiency anemia', 'possible', 'Coexists and increases absorption.'],
      ['hearing', 'Hearing impairment', 'possible', 'Audiology.'],
      ['asd', 'Autism spectrum disorder', 'possible', 'Screen with M-CHAT.'],
      ['thal', 'Thalassemia trait', 'possible', 'Microcytosis with normal ferritin.'],
      ['enceph', 'Lead encephalopathy', 'cantmiss', 'Vomiting, seizures, altered mental status at very high levels.'],
    ] },
  },
  labs: { r: [
    ['Venous blood lead', '32', 'µg/dL', 'CDC reference value 3.5', 'high'],
    ['Hemoglobin', '10.2', 'g/dL', '11.0–13.5', 'low'],
    ['MCV', '68', 'fL', '70–86', 'low'],
    ['Ferritin', '7', 'ng/mL', '15–150', 'low'],
    ['Abdominal X-ray', 'Small flecks consistent with paint chips', '', 'Normal', 'abnormal'],
  ] },
  decision: {
    junior: ['What should happen for Josiah?', [
      ['Remove the lead from his home, give him iron and good food, and support his speech', 'Exactly. Stopping the exposure is the most important step.', true],
      ['Nothing; he’ll outgrow it', 'Lead needs action.'],
      ['Only give medicine', 'Removing the source matters most.'],
    ]],
    senior: ['Which plan is best supported?', [
      ['Lead poisoning (32 µg/dL) with iron deficiency: environmental investigation and abatement, iron, nutrition, developmental services, repeat levels; no chelation at this level', 'Correct. Chelation at ≥ 45 µg/dL.', true],
      ['Chelation therapy now', 'Not indicated below 45 µg/dL.'],
      ['Iron deficiency only', 'The lead level is well above the reference value.'],
    ]],
    wrap: 'The health department inspects the home and the landlord is required to fix the paint. Josiah starts iron and speech therapy. His lead level falls over the following months.',
  },
  debrief: {
    science: 'Lead mimics minerals the body needs and interferes with brain development and red blood cell production. Children absorb much more lead than adults, especially when iron is low.',
    pearl: 'There is no safe lead level. Screening at ages 1 and 2 in at-risk children finds exposure early. Removing the source is the main treatment.',
    uncertainty: 'Some effects of lead on learning can last, which is why early intervention and education support matter.',
    human: 'Josiah’s family can’t afford to move. Lead poisoning is an environmental justice issue; healers advocate for safe housing.',
    closing: 'Protecting children sometimes means changing the world they live in.',
  },
  founder: 'Teaching point: lead screening, no safe level, environmental justice (Flint, older housing). Great case for advocacy discussion.',
});

export const CELIAC = makeCase({
  code: 'CASE-059', slug: 'grace-celiac', room: 'childrens-clinic',
  title: 'The Bread Clue', summary: 'Grace has belly pain, poor growth and iron deficiency that won’t improve. Uncover an immune reaction to gluten.',
  specialty: 'Pediatric Gastroenterology', system: 'Digestive System', minutes: [15, 25],
  patient: { name: 'Grace Wu', age: 10, concern: 'Belly pain, bloating and slow growth', interests: ['Piano', 'Reading'] },
  art: 'a slim 10-year-old Chinese-American girl sitting on a clinic exam table holding a sandwich in one hand and looking at it suspiciously, a pediatric gastroenterologist smiling and showing a simple drawing of intestinal villi on a tablet, warm clinic room',
  opening: {
    scene: 'For a year, Grace has had belly pain, bloating and loose stools. She’s dropped from the 50th to the 15th percentile for height. Iron pills haven’t fixed her anemia.',
    dialogue: 'My stomach always hurts after lunch.',
    narrator: 'When iron pills don’t work and a child stops growing, healers ask why the gut isn’t absorbing nutrients.',
  },
  history: {
    min: 3,
    q: [
      ['What do you eat for lunch?', 'Usually a sandwich or noodles.', 'Both contain gluten.'],
      ['How are your stools?', 'Loose and smelly, and they float sometimes.', 'Malabsorption.'],
      ['Has anyone in your family had celiac disease or type 1 diabetes?', 'My aunt has celiac disease.', 'Strong family link.'],
      ['How has your energy been?', 'Tired a lot.', 'Anemia and malabsorption.'],
      ['Any blood in the stool or weight loss?', 'No blood. Not really losing weight.', 'Blood would suggest IBD.'],
    ],
  },
  exam: {
    text: 'You observe the exam.',
    f: [['Height', 'Fell from 50th to 15th percentile', 'low'], ['Belly', 'Bloated, mildly tender', 'abnormal'], ['Skin', 'Pale', 'abnormal'], ['Teeth', 'Enamel defects', 'note'], ['Other', 'Normal', 'normal']],
    junior: ['Why might Grace’s iron pills not be working?', [
      ['Her intestine may not be absorbing nutrients well', 'Right. The gut lining may be damaged.', true],
      ['She isn’t taking them', 'Possible, but her other symptoms point to the gut.'],
      ['Iron pills never work', 'They usually work if the gut absorbs them.'],
    ]],
    senior: ['What should be tested first?', [
      ['Tissue transglutaminase IgA (tTG-IgA) with total IgA', 'Correct. Screen for celiac disease while still eating gluten.', true],
      ['Colonoscopy', 'Serology first.'],
      ['Start a gluten-free diet now', 'Testing must happen while eating gluten.'],
    ]],
  },
  model: {
    junior: {
      layers: [['genes', 'Genes make the body sensitive to gluten', 'Runs in families.'], ['react', 'The immune system attacks the gut when gluten is eaten', 'A mistaken reaction.'], ['villi', 'Tiny finger-like villi flatten', 'Less surface to absorb food.'], ['signs', 'Belly pain, poor growth, low iron', 'What we see.']],
      clues: [['aunt', 'Aunt has celiac disease', 'genes', 'Family link.'], ['lunch', 'Pain after sandwiches and noodles', 'react', 'Gluten triggers it.'], ['float', 'Floating, smelly stools', 'villi', 'Fat isn’t absorbed.'], ['iron', 'Iron pills don’t help', 'villi', 'Iron is absorbed in the damaged area.'], ['height', 'Height dropping', 'signs', 'Not enough nutrients.']],
      wrap: 'Grace’s immune system attacks her gut when she eats gluten. Her villi flattened, so she can’t absorb iron and nutrients to grow.',
    },
    senior: {
      layers: [['hla', 'HLA-DQ2/DQ8 genetic susceptibility', 'Necessary but not sufficient.'], ['immune', 'Gluten-triggered T-cell response and tTG autoantibodies', 'Adaptive immunity.'], ['atrophy', 'Villous atrophy and crypt hyperplasia', 'Proximal small bowel.'], ['malab', 'Malabsorption', 'Iron, fat, nutrients.']],
      clues: [['fh', 'First-degree relative history (aunt)', 'hla', 'Familial risk.'], ['post', 'Postprandial pain', 'immune', 'Gluten exposure.'], ['ster', 'Steatorrhea', 'malab', 'Fat malabsorption.'], ['ida', 'Iron deficiency refractory to oral iron', 'atrophy', 'Duodenal absorption impaired.'], ['growth', 'Falling height percentiles', 'malab', 'Growth failure.'], ['enamel', 'Dental enamel defects', 'immune', 'An extraintestinal feature.']],
      wrap: 'Your model predicts a very high tTG-IgA and villous atrophy on biopsy.',
    },
  },
  ddx: {
    junior: { options: [
      ['celiac', 'Celiac disease', 'leading', 'Belly pain after gluten, poor growth, iron that won’t improve and family history.'],
      ['lactose', 'Trouble digesting milk (lactose intolerance)', 'possible', 'Causes bloating, not poor growth.'],
      ['ibd', 'Inflammatory bowel disease', 'possible', 'Usually with blood in stool.'],
      ['germ', 'A gut parasite', 'possible', 'Doctors may test stool.'],
      ['stress', 'Just stress', 'unlikely', 'Doesn’t explain poor growth and low iron.'],
    ] },
    senior: { options: [
      ['celiac', 'Celiac disease', 'leading', 'Classic features.'],
      ['ibd', 'Crohn’s disease', 'possible', 'Growth failure; inflammatory markers and bleeding.'],
      ['lactose', 'Lactose intolerance', 'possible', 'No growth failure.'],
      ['giardia', 'Giardiasis', 'possible', 'Stool testing.'],
      ['cf', 'Cystic fibrosis', 'possible', 'Steatorrhea with lung symptoms.'],
      ['ibs', 'Irritable bowel syndrome', 'unlikely', 'No growth failure or anemia.'],
    ] },
  },
  labs: { r: [
    ['tTG-IgA', '180', 'U/mL', '< 15', 'high'],
    ['Total IgA', 'Normal', '', 'Normal', 'normal'],
    ['Hemoglobin', '10.1', 'g/dL', '11.5–15.5', 'low'],
    ['Ferritin', '6', 'ng/mL', '15–150', 'low'],
    ['Endoscopy biopsy', 'Villous atrophy', '', 'Normal villi', 'abnormal'],
  ] },
  decision: {
    junior: ['What does Grace have?', [
      ['Celiac disease', 'Exactly. A gluten-free diet lets her gut heal.', true],
      ['Lactose intolerance', 'Her tests show celiac disease.'],
      ['Stress', 'Her biopsy shows damage from celiac disease.'],
    ]],
    senior: ['Which explanation is best supported?', [
      ['Celiac disease; strict lifelong gluten-free diet with dietitian support', 'Correct. Recheck tTG and growth; screen family members.', true],
      ['Crohn’s disease', 'tTG and histology indicate celiac.'],
      ['Giardiasis', 'Serology and biopsy point to celiac.'],
    ]],
    wrap: 'Grace starts a gluten-free diet with a dietitian. Within months, her belly pain is gone, her iron improves and she starts growing again. Her family gets screened too.',
  },
  debrief: {
    science: 'In celiac disease, gluten triggers an immune attack on the small intestine lining. The villi, tiny finger-like projections that absorb nutrients, flatten.',
    pearl: 'Iron deficiency that doesn’t respond to iron, poor growth and GI symptoms should prompt celiac testing. Test while still eating gluten.',
    uncertainty: 'Hidden gluten can cause ongoing symptoms; dietitian support helps.',
    human: 'Grace worried about birthday parties and pizza. Practical help and gluten-free options made her diet feel possible.',
    closing: 'Sometimes the treatment is in the kitchen, not the pharmacy.',
  },
  founder: 'Teaching point: celiac presentation, testing on gluten, refractory iron deficiency. Pairs with Isaiah’s and Nia’s iron deficiency cases.',
});

export const SEPTIC_HIP = makeCase({
  code: 'CASE-060', slug: 'mason-hip', room: 'emergency-department', emergency: true,
  title: 'Won’t Walk', summary: 'Mason has a fever and refuses to walk. His hip may be infected, and joints don’t wait.',
  specialty: 'Pediatric Orthopedics & Infectious Disease', system: 'Bones, Joints & Sports', minutes: [15, 25],
  patient: { name: 'Mason Diaz', age: 4, concern: 'Fever and refusing to walk' },
  art: 'a 4-year-old Mexican-American boy lying on an emergency room bed holding his right leg bent and turned outward, flushed with fever, his mother comforting him, a pediatric orthopedic surgeon reviewing a hip ultrasound on a screen, calm clinical lighting',
  opening: {
    scene: 'Mason has had a fever for two days. Today he refuses to stand or walk, and cries when anyone moves his right leg. He keeps it bent and turned outward.',
    dialogue: 'He won’t let anyone touch his leg.',
    speaker: 'Mason’s mom',
    narrator: 'A child who won’t walk and has a fever needs urgent evaluation. Bacteria in a joint can destroy cartilage within days.',
  },
  history: {
    min: 3, speaker: 'Mason’s mom',
    q: [
      ['How high has his fever been?', '39.2 °C.', 'Fever over 38.5 °C is a key predictor of septic arthritis.'],
      ['Did he get hurt?', 'No injury.', 'No trauma.'],
      ['Has he been sick recently?', 'A cold two weeks ago.', 'Transient synovitis often follows a virus.'],
      ['Can he put any weight on it?', 'None at all.', 'Non-weight bearing is another predictor.'],
      ['Any rash or tick bites?', 'No.', 'Lyme arthritis is a consideration in some regions.'],
    ],
  },
  exam: {
    text: 'You observe the exam.',
    f: [['Temperature', '39.2 °C', 'high'], ['Right hip', 'Held bent, out and rotated; severe pain with any movement', 'abnormal'], ['Weight bearing', 'Refuses', 'abnormal'], ['Skin over hip', 'Normal', 'normal'], ['Other joints', 'Normal', 'normal']],
    junior: ['Why is a fever plus refusing to walk so concerning?', [
      ['A joint could be infected, which can damage it quickly', 'Right. Joint infections need treatment fast.', true],
      ['He’s just tired', 'He refuses to move his leg because of pain.'],
      ['He has growing pains', 'Growing pains don’t cause fever.'],
    ]],
    senior: ['How do you assess his risk of septic arthritis?', [
      ['Apply the Kocher criteria (fever > 38.5 °C, non-weight bearing, ESR > 40, WBC > 12) and image the hip', 'Correct. More criteria mean higher probability.', true],
      ['Diagnose transient synovitis and send home', 'Fever and refusal to bear weight are too concerning.'],
      ['MRI before any labs', 'Labs and ultrasound come first.'],
    ]],
  },
  model: {
    junior: {
      layers: [['germ', 'Germs reach the hip joint', 'Through the blood.'], ['fight', 'The body sends fighter cells', 'Pus builds up.'], ['pressure', 'Pressure and swelling inside the joint', 'Very painful.'], ['signs', 'Fever and won’t walk', 'What we see.']],
      clues: [['fever', 'Fever of 39.2', 'fight', 'The body is fighting.'], ['held', 'Leg held bent and turned out', 'pressure', 'This position gives the most room in a swollen joint.'], ['touch', 'Cries when the leg moves', 'pressure', 'Movement presses the swollen joint.'], ['walk', 'Won’t walk', 'signs', 'Too painful.'], ['noinjury', 'No injury', 'germ', 'Germs traveled through the blood.']],
      wrap: 'Germs reached Mason’s hip through his blood. Pus and swelling built up inside the joint, causing fever and pain too great to walk.',
    },
    senior: {
      layers: [['bact', 'Hematogenous seeding of the joint', 'S. aureus, Kingella kingae.'], ['pyo', 'Purulent synovitis', 'Neutrophil influx.'], ['press', 'Intra-articular pressure and cartilage destruction', 'Proteolytic enzymes; femoral head ischemia risk.'], ['clin', 'Fever, pseudoparalysis, held position', 'Clinical picture.']],
      clues: [['fev', 'Fever > 38.5 °C', 'bact', 'Kocher criterion.'], ['flexabd', 'Hip flexed, abducted, externally rotated', 'press', 'Maximizes capsular volume.'], ['rom', 'Severe pain with motion', 'pyo', 'Inflamed synovium.'], ['nwb', 'Non-weight bearing', 'clin', 'Kocher criterion.'], ['age', 'Age 4', 'bact', 'Kingella is common under 4.']],
      wrap: 'Your model predicts high WBC, ESR and CRP, a hip effusion and purulent joint fluid.',
    },
  },
  ddx: {
    junior: { options: [
      ['septic', 'An infected joint', 'leading', 'Fever, won’t walk, hip held in a special position.'],
      ['synovitis', 'A swollen joint after a cold', 'possible', 'Common and harmless, but usually without high fever.'],
      ['bone', 'An infected bone', 'possible', 'Can happen near the joint.'],
      ['injury', 'An injury', 'unlikely', 'No injury happened.'],
      ['growing', 'Growing pains', 'unlikely', 'No fever with growing pains.'],
    ] },
    senior: { options: [
      ['sa', 'Septic arthritis of the hip', 'leading', 'Kocher criteria positive.'],
      ['ts', 'Transient synovitis', 'possible', 'Post-viral; low fever, well-appearing.'],
      ['osteo', 'Osteomyelitis (proximal femur or pelvis)', 'possible', 'Can coexist; MRI.'],
      ['lyme', 'Lyme arthritis', 'possible', 'Endemic areas; knee more common.'],
      ['leuk', 'Leukemia', 'cantmiss', 'Bone pain, fever, cytopenias.'],
      ['perthes', 'Legg-Calvé-Perthes disease', 'possible', 'No fever; subacute limp.'],
    ] },
  },
  labs: { r: [
    ['White blood cells', '17.2', 'K/µL', '5.0–15.5', 'high'],
    ['ESR', '62', 'mm/hr', '0–20', 'high'],
    ['CRP', '9.4', 'mg/dL', '< 0.5', 'high'],
    ['Hip ultrasound', 'Large right hip effusion', '', 'No effusion', 'abnormal'],
    ['Joint fluid white cells', '85,000', 'per µL', '< 200', 'high'],
    ['Joint fluid culture', 'Staphylococcus aureus (MSSA)', '', 'No growth', 'note'],
  ] },
  decision: {
    junior: ['What does Mason have?', [
      ['An infected hip joint', 'Exactly. Surgeons washed it out and antibiotics are clearing the infection.', true],
      ['Growing pains', 'His tests show a joint infection.'],
      ['A cold in his leg', 'Germs infected his joint.'],
    ]],
    senior: ['Which explanation is best supported?', [
      ['Septic arthritis of the right hip (MSSA); emergency washout and IV antibiotics', 'Correct. All four Kocher criteria positive.', true],
      ['Transient synovitis', 'Joint fluid is purulent.'],
      ['Leukemia', 'Normal blood counts aside from leukocytosis; culture positive.'],
    ]],
    wrap: 'Mason has emergency surgery to wash out his hip and starts IV antibiotics, later switching to oral. Within days, he is walking again.',
  },
  debrief: {
    science: 'Bacteria in the blood can settle in a joint. The immune response fills it with pus, and enzymes and pressure can destroy cartilage and cut off blood to the femoral head.',
    pearl: 'A child with fever who won’t bear weight needs urgent evaluation. The Kocher criteria help separate septic arthritis from transient synovitis.',
    uncertainty: 'Most children recover fully with prompt treatment; follow-up checks the hip’s growth.',
    human: 'Mason was scared of the hospital. Child life specialists helped him through.',
    closing: 'Joints don’t wait; healers shouldn’t either.',
  },
  founder: 'Teaching point: Kocher criteria, septic arthritis vs transient synovitis, surgical emergency.',
});

export const PE = makeCase({
  code: 'CASE-061', slug: 'kristen-pe', room: 'emergency-department', emergency: true,
  title: 'Short of Breath After the Road Trip', summary: 'Ms. Novak started an estrogen birth control pill, smokes and just drove 12 hours. Now her chest hurts when she breathes. Find the clot.',
  specialty: 'Emergency Medicine & Hematology', system: 'Lungs & Breathing', minutes: [20, 30],
  patient: { name: 'Kristen Novak', age: 29, concern: 'Sudden chest pain and shortness of breath' },
  art: 'a 29-year-old white woman sitting upright on an emergency room stretcher with a nasal oxygen cannula, one hand pressed to the side of her chest, her left calf slightly swollen under a blanket, a doctor reviewing a CT scan on a screen, focused calm lighting',
  opening: {
    scene: 'Ms. Novak drove 12 hours to visit family last week. Her left calf has been sore and swollen. This morning she had sudden sharp chest pain that’s worse when she breathes in, and she can’t catch her breath.',
    dialogue: 'It feels like a knife when I breathe in.',
    narrator: 'Blood clots in the legs can travel to the lungs. Estrogen, smoking, immobility and inherited factors all raise the risk.',
    narratorRole: 'Emergency physician',
  },
  history: {
    min: 3,
    q: [
      ['Do you take any hormones?', 'I started a combined birth control pill three months ago.', 'Estrogen raises clot risk.'],
      ['Do you smoke?', 'Half a pack a day.', 'Smoking plus estrogen multiplies the risk.'],
      ['Any long trips or surgery recently?', 'A 12-hour drive last week.', 'Immobility.'],
      ['Has anyone in your family had blood clots?', 'My mom had one after surgery.', 'Possible inherited thrombophilia.'],
      ['Any coughing up blood?', 'A little streak this morning.', 'Hemoptysis can occur with PE.'],
    ],
  },
  exam: {
    text: 'You observe the exam.',
    f: [['Heart rate', '118', 'high'], ['Oxygen saturation', '91%', 'low'], ['Breathing rate', '26', 'high'], ['Blood pressure', '112/70', 'normal'], ['Left calf', 'Swollen and tender', 'abnormal'], ['Lungs', 'Clear', 'normal']],
    junior: ['How could a sore calf be connected to chest pain?', [
      ['A clot in the leg may have traveled to the lungs', 'Right. That’s called a pulmonary embolism.', true],
      ['They aren’t connected', 'They likely are.'],
      ['She pulled a muscle in both places', 'A clot explains both.'],
    ]],
    senior: ['What is your pretest probability and next test?', [
      ['High (Wells: DVT signs, tachycardia, PE most likely): CT pulmonary angiography; consider starting anticoagulation now', 'Correct. Skip D-dimer when probability is high.', true],
      ['Low probability; check D-dimer and discharge if negative', 'Probability is high.'],
      ['Chest X-ray will diagnose PE', 'X-ray is often normal in PE.'],
    ]],
  },
  act: {
    junior: {
      prompt: 'Put the team’s steps in order.',
      steps: [['Give oxygen and attach monitors', 'Support breathing.'], ['Start an IV and draw blood', 'Prepare for tests and medicine.'], ['Get a CT scan of the lungs', 'Find the clot.'], ['Give blood-thinning medicine', 'Stops the clot from growing.'], ['Stop the estrogen pill and plan safer birth control', 'Prevent another clot.']],
      distractors: [['Rub the sore calf to loosen the clot', 'Could make things worse.'], ['Send her home to rest', 'PE can be life-threatening.']],
    },
    senior: {
      prompt: 'Order the management of suspected pulmonary embolism in a stable patient.',
      steps: [['Oxygen, monitoring, IV access', 'Stabilize.'], ['Assess hemodynamics and risk (blood pressure, RV strain)', 'Massive PE changes management.'], ['Start anticoagulation if high suspicion and no contraindication', 'Before imaging if delayed.'], ['CT pulmonary angiography', 'Confirm.'], ['Continue anticoagulation (DOAC or heparin) for at least 3 months', 'Treatment.'], ['Stop estrogen; offer non-estrogen contraception; support smoking cessation', 'Address risk factors.']],
      distractors: [['Give thrombolytics to every PE', 'Reserved for massive PE with hypotension.'], ['Wait for D-dimer before CT', 'Not useful when probability is high.']],
    },
  },
  model: {
    junior: {
      layers: [['risk', 'Things that make blood clot easier', 'Estrogen, smoking, sitting still.'], ['dvt', 'A clot forms in the leg', 'Deep vein.'], ['travel', 'The clot breaks off and travels', 'To the lungs.'], ['block', 'It blocks blood flow in the lung', 'Hard to breathe.']],
      clues: [['pill', 'Estrogen birth control', 'risk', 'Raises clotting.'], ['smoke', 'Smokes', 'risk', 'Raises clotting.'], ['drive', '12-hour drive', 'risk', 'Sitting still slows blood flow.'], ['calf', 'Swollen, sore calf', 'dvt', 'A clot in the leg.'], ['knife', 'Sharp pain when breathing', 'block', 'Lung tissue is irritated.'], ['ox', 'Oxygen 91%', 'block', 'Less blood flows through the lung.']],
      wrap: 'Estrogen, smoking and a long drive helped a clot form in Ms. Novak’s leg. It traveled to her lung and blocked blood flow.',
    },
    senior: {
      layers: [['virchow', 'Virchow’s triad', 'Stasis, hypercoagulability, endothelial injury.'], ['dvt', 'Deep vein thrombosis', 'Left calf.'], ['emb', 'Embolization to pulmonary arteries', 'Right lower lobe.'], ['phys', 'Dead space, hypoxemia and pleuritic pain', 'Physiologic effects.']],
      clues: [['ocp', 'Combined estrogen contraceptive', 'virchow', 'Hypercoagulability.'], ['tob', 'Smoking', 'virchow', 'Endothelial injury and hypercoagulability.'], ['stasis', 'Prolonged travel', 'virchow', 'Stasis.'], ['calf', 'Unilateral calf swelling', 'dvt', 'Source.'], ['pleur', 'Pleuritic pain and mild hemoptysis', 'phys', 'Pulmonary infarction.'], ['hyp', 'Tachycardia, tachypnea, SpO₂ 91%', 'phys', 'V/Q mismatch.']],
      wrap: 'Your model predicts a filling defect on CT angiography and a DVT on leg ultrasound.',
    },
  },
  ddx: {
    junior: { options: [
      ['pe', 'A blood clot in the lungs', 'leading', 'Sore calf, sharp chest pain and low oxygen after a long drive.'],
      ['pneumonia', 'Pneumonia', 'possible', 'Usually fever and cough.'],
      ['collapsed', 'A collapsed lung', 'possible', 'Sudden chest pain and trouble breathing.'],
      ['heart', 'A heart attack', 'possible', 'Rare at her age, but doctors check.'],
      ['anxiety', 'Anxiety', 'unlikely', 'Low oxygen and a swollen calf point to a clot.'],
    ] },
    senior: { options: [
      ['pe', 'Pulmonary embolism', 'leading', 'High Wells score.'],
      ['ptx', 'Pneumothorax', 'possible', 'Decreased breath sounds; X-ray.'],
      ['pna', 'Pneumonia', 'possible', 'Fever, crackles.'],
      ['peri', 'Pericarditis', 'possible', 'Positional pain, rub.'],
      ['acs', 'Acute coronary syndrome', 'possible', 'Less likely at 29 but checked by ECG and troponin.'],
      ['dissect', 'Aortic dissection', 'cantmiss', 'Tearing pain; rare here.'],
    ] },
  },
  labs: { title: 'Labs and imaging', r: [
    ['CT pulmonary angiography', 'Clot in the right lower lobe pulmonary artery', '', 'No clot', 'abnormal'],
    ['Leg ultrasound', 'Clot in the left popliteal vein', '', 'No clot', 'abnormal'],
    ['Troponin I', '0.03', 'ng/mL', '< 0.04', 'normal'],
    ['Pregnancy test', 'Negative', '', 'Negative', 'normal'],
    ['ECG', 'Sinus tachycardia', '', 'Normal sinus rhythm', 'note'],
  ] },
  decision: {
    junior: ['What happened to Ms. Novak?', [
      ['A clot from her leg traveled to her lung', 'Exactly. Blood thinners will help her body dissolve it.', true],
      ['Pneumonia', 'Her CT shows a clot.'],
      ['A heart attack', 'Her heart tests are normal.'],
    ]],
    senior: ['Which explanation is best supported?', [
      ['Low-risk PE with DVT, provoked by estrogen, smoking and immobility; anticoagulate, stop estrogen, offer non-estrogen contraception and smoking cessation', 'Correct. Consider thrombophilia evaluation given family history.', true],
      ['Massive PE requiring thrombolysis', 'She is normotensive without RV strain.'],
      ['Pneumonia', 'CT shows a filling defect.'],
    ]],
    wrap: 'Ms. Novak starts a blood thinner and switches to a non-estrogen birth control method. With support, she sets a quit date for smoking.',
  },
  debrief: {
    science: 'Clots form when blood moves slowly, clots more easily or vessel walls are injured (Virchow’s triad). A clot in a leg vein can break free, travel through the heart and block an artery in the lung.',
    pearl: 'Estrogen-containing birth control raises clot risk, especially with smoking, immobility, migraine with aura or family history. Non-estrogen methods are safe alternatives.',
    uncertainty: 'Some people with clots have inherited clotting disorders; her team may test after treatment.',
    human: 'Ms. Novak felt guilty about smoking. Healers support change without shame.',
    closing: 'Understanding risk helps people make choices that protect them.',
  },
  founder: 'Teaching point: Virchow’s triad, estrogen and clot risk (links to reproductive health), Wells score, contraception counseling.',
});
