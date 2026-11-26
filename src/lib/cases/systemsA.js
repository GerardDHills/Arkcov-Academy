import { makeCase } from './kit';

// Body-system cases, part A. Values are illustrative teaching values.

export const PNEUMONIA = makeCase({
  code: 'CASE-019', slug: 'amir-pneumonia', room: 'childrens-clinic',
  title: 'A Cough With a Clue', summary: 'Amir has a fever, a cough and a strange pain in his belly. Listen closely to his lungs.',
  specialty: 'General Pediatrics', system: 'Lungs & Breathing', minutes: [15, 25],
  patient: { name: 'Amir Hassan', age: 6, concern: 'Fever, cough and fast breathing', interests: ['Space', 'Building blocks'] },
  art: 'a 6-year-old Middle Eastern boy sitting on a pediatric clinic exam table wrapped in a blanket, flushed with fever, a pediatrician listening to his back with a stethoscope, a colorful space-themed clinic room with planet decals',
  opening: {
    scene: 'Amir has had a fever and cough for three days. Today he is breathing faster and says his tummy hurts on the right side.',
    dialogue: 'It hurts when I cough. Right here, by my tummy.',
    narrator: 'Sometimes a problem in one place causes pain somewhere else. Let the exam guide you.',
  },
  history: {
    min: 3,
    q: [
      ['How high has your fever been?', 'Mom said 103 last night.', 'High fever with cough suggests a bacterial infection.'],
      ['Is your cough wet or dry?', 'Wet. Sometimes yellow stuff comes up.', 'A productive cough suggests infection in the lower airways.'],
      ['Does it hurt to breathe in deeply?', 'Yes, on this side.', 'Pleuritic pain happens when inflamed lung rubs against its lining.'],
      ['Have you been eating?', 'Not really. I’m not hungry.', 'Poor appetite is common with fever.'],
      ['Has he had his vaccines?', 'Yes, all of them.', 'The pneumococcal vaccine prevents many, but not all, cases.', 'Amir’s dad'],
      ['Did you choke on anything?', 'No.', 'An inhaled object can cause a one-sided lung problem.'],
    ],
  },
  exam: {
    text: 'You observe the exam.',
    f: [['Temperature', '39.4 °C (103 °F)', 'high'], ['Breathing rate', '38 per minute', 'high'], ['Oxygen saturation', '93%', 'low'], ['Right lower chest', 'Crackles and reduced breath sounds', 'abnormal'], ['Abdomen', 'Soft, no tenderness when pressed', 'normal'], ['Effort', 'Mild retractions', 'abnormal']],
    junior: ['Amir says his tummy hurts, but his belly exam is normal. Where is the problem most likely?', [
      ['The bottom of his right lung, near his belly', 'Right. The bottom of the lung sits just above the belly, so lung pain can feel like belly pain.', true],
      ['His appendix', 'His belly isn’t tender when pressed, and his lungs sound abnormal.'],
      ['His heart', 'His heart sounds normal. The crackles are in his lung.'],
    ]],
    senior: ['How do you interpret these findings?', [
      ['Likely right lower lobe pneumonia with referred abdominal pain', 'Correct. Lower lobe pneumonia can irritate the diaphragm and refer pain to the abdomen.', true],
      ['Appendicitis', 'A soft, nontender abdomen with focal crackles and tachypnea points to the chest.'],
      ['Bronchiolitis', 'Bronchiolitis affects infants and causes diffuse wheeze and crackles.'],
    ]],
  },
  model: {
    junior: {
      layers: [['germ', 'Germs get into the lung', 'Usually bacteria or viruses.'], ['fight', 'The body fights back', 'Fever and inflammation.'], ['fill', 'Tiny air sacs fill with fluid', 'Air can’t get in.'], ['work', 'Breathing gets harder', 'Less oxygen in the blood.']],
      clues: [['cough', 'Wet cough', 'germ', 'Germs irritate the airways.'], ['fever', 'Fever of 103', 'fight', 'Fever is the body’s fight.'], ['crackles', 'Crackles on the right', 'fill', 'Air bubbles through fluid in the air sacs.'], ['belly', 'Pain by his tummy', 'fill', 'The inflamed bottom of the lung irritates nearby nerves.'], ['fast', 'Breathing fast', 'work', 'He breathes faster to get more oxygen.'], ['ox', 'Oxygen 93%', 'work', 'Less oxygen gets through.']],
      wrap: 'Germs settled in the bottom of Amir’s right lung. The air sacs filled with fluid, so he breathed faster, and the irritated lung made his belly hurt.',
    },
    senior: {
      layers: [['inv', 'Bacterial invasion of the alveoli', 'Often Streptococcus pneumoniae.'], ['infl', 'Neutrophilic inflammation', 'Systemic response.'], ['cons', 'Alveolar consolidation', 'Exudate fills air spaces.'], ['gas', 'Impaired gas exchange and pleural irritation', 'Hypoxemia, tachypnea, pain.']],
      clues: [['prod', 'Productive cough', 'inv', 'Lower respiratory tract infection.'], ['fev', 'Fever 39.4 °C', 'infl', 'Systemic inflammation.'], ['cr', 'Focal crackles and decreased sounds', 'cons', 'Consolidation.'], ['pl', 'Pleuritic pain referred to the abdomen', 'gas', 'Diaphragmatic pleura irritation.'], ['rr', 'Tachypnea 38', 'gas', 'Compensation for V/Q mismatch.'], ['sat', 'SpO₂ 93%', 'gas', 'Shunt through consolidated lung.']],
      wrap: 'Your model predicts a right lower lobe consolidation on X-ray and an elevated white count with neutrophils.',
    },
  },
  ddx: {
    junior: { options: [
      ['pna', 'A lung infection (pneumonia)', 'leading', 'Fever, wet cough, fast breathing and crackles on one side.'],
      ['cold', 'A bad cold', 'possible', 'Colds cause cough, but not low oxygen and crackles on one side.'],
      ['asthma', 'Asthma', 'possible', 'Causes cough and fast breathing, usually with wheezing on both sides.'],
      ['appendix', 'Appendicitis', 'possible', 'Causes belly pain, but his belly isn’t tender.'],
      ['faking', 'Faking to stay home', 'unlikely', 'Fever and low oxygen are real.'],
    ] },
    senior: { options: [
      ['cap', 'Bacterial community-acquired pneumonia', 'leading', 'High fever, focal findings and hypoxemia.'],
      ['viral', 'Viral pneumonia', 'possible', 'Usually bilateral, with lower fevers and wheeze.'],
      ['effusion', 'Parapneumonic effusion or empyema', 'cantmiss', 'Persistent fever, dullness to percussion; ultrasound or X-ray checks.'],
      ['appy', 'Appendicitis', 'possible', 'Abdominal pain, but the exam localizes to the chest.'],
      ['fb', 'Foreign-body aspiration', 'possible', 'Unilateral findings; no choking history.'],
      ['tb', 'Tuberculosis', 'possible', 'Consider with exposure, weight loss or chronic cough.'],
      ['asthma', 'Asthma exacerbation', 'unlikely', 'Focal crackles and high fever point to pneumonia.'],
    ] },
  },
  labs: { title: 'Tests', r: [
    ['Chest X-ray', 'Right lower lobe consolidation; no effusion', '', 'Clear', 'note'],
    ['White blood cells', '18.2', 'K/µL', '5.0–14.5', 'high'],
    ['Neutrophils', '82', '%', '35–65', 'high'],
    ['CRP', '12.0', 'mg/dL', '< 0.5', 'high'],
  ] },
  decision: {
    junior: ['Look back at your differential. What explains Amir’s illness?', [
      ['A lung infection in the bottom of his right lung', 'Exactly. Antibiotics will help him fight it.', true],
      ['Appendicitis', 'His belly is soft and his X-ray shows a lung infection.'],
      ['A cold', 'His oxygen level and X-ray show something more serious.'],
    ]],
    senior: ['Which explanation is best supported?', [
      ['Right lower lobe bacterial pneumonia', 'Correct. Lobar consolidation with neutrophilia. High-dose amoxicillin is first-line; admission if hypoxemia worsens.', true],
      ['Viral bronchiolitis', 'Wrong age and a lobar pattern.'],
      ['Empyema', 'No effusion on X-ray, though it should be considered if fever persists.'],
    ]],
    wrap: 'Amir starts high-dose amoxicillin. His oxygen level stays above 92%, so he goes home with clear return precautions. Two days later, his fever is gone.',
  },
  debrief: {
    science: 'Pneumonia is an infection of the tiny air sacs of the lungs. They fill with fluid and immune cells, so less oxygen gets into the blood. When the bottom of a lung is affected, it can irritate nerves that make the belly hurt.',
    pearl: 'Fast breathing is one of the most important signs of pneumonia in children. Always listen to the chest of a child with fever and belly pain.',
    uncertainty: 'If his fever doesn’t improve in 48–72 hours, the team will look for complications like fluid around the lung.',
    human: 'Amir was frightened by the stethoscope until the doctor let him listen to his own heart. Curiosity is medicine too.',
    closing: 'Where it hurts isn’t always where the problem is. Good healers examine the whole child.',
  },
  founder: 'Teaching point: tachypnea as a key sign; referred abdominal pain from lower lobe pneumonia. Pneumonia is a leading cause of childhood death worldwide; vaccines and access to antibiotics save lives.',
});

export const APPENDICITIS = makeCase({
  code: 'CASE-020', slug: 'andre-appendix', room: 'emergency-department',
  title: 'Pain on the Move', summary: 'Andre’s belly pain started near his belly button and moved to the lower right. Follow the pain.',
  specialty: 'Pediatric Surgery', system: 'Digestive System', minutes: [15, 25],
  patient: { name: 'Andre Lewis', age: 11, concern: 'Belly pain that moved', interests: ['Skateboarding', 'Cooking'] },
  art: 'an 11-year-old Black boy lying on an emergency room bed with knees bent, holding the lower right side of his belly in discomfort, a pediatric surgeon gently pressing on his abdomen, his mother standing nearby, bright clinical room',
  opening: {
    scene: 'Andre’s belly started hurting around his belly button last night. This morning the pain moved to the lower right side. Every bump in the car on the way to the hospital made him wince.',
    dialogue: 'It hurts way more when I walk. Even coughing hurts.',
    narrator: 'Belly pain is common and usually not serious. A few patterns, though, point to a surgical emergency.',
  },
  history: {
    min: 3,
    q: [
      ['Where did the pain start?', 'Around my belly button.', 'Early appendicitis causes vague pain near the belly button.'],
      ['Where is it now?', 'Down here, on the lower right.', 'Pain that migrates to the right lower quadrant is a classic clue.'],
      ['Are you hungry?', 'No way. I didn’t even want breakfast.', 'Loss of appetite is very common in appendicitis.'],
      ['Did you throw up before or after the pain started?', 'After. Once.', 'Vomiting after pain fits appendicitis; vomiting first fits a stomach bug.'],
      ['Any diarrhea?', 'No.', 'Lots of diarrhea suggests gastroenteritis.'],
      ['Any pain in your testicles?', 'No.', 'In boys with belly pain, testicular torsion is a can’t-miss diagnosis.'],
    ],
  },
  exam: {
    text: 'You observe the exam.',
    f: [['Temperature', '38.1 °C (100.6 °F)', 'high'], ['Abdomen', 'Tender at the lower right; guarding', 'abnormal'], ['Rebound', 'Pain when pressure is released', 'abnormal'], ['Hop test', 'Refuses to hop because of pain', 'abnormal'], ['Testicles', 'Normal', 'normal'], ['Heart rate', '108 beats per minute', 'high']],
    junior: ['Why does it matter that it hurts to hop and to cough?', [
      ['It means the lining of his belly is irritated, which can happen when something inside is inflamed', 'Right. Movement jostles the irritated lining, which makes it hurt.', true],
      ['He doesn’t like hopping', 'Pain with movement is an important clue.'],
      ['It means he has a cold', 'Colds don’t cause this kind of belly pain.'],
    ]],
    senior: ['What do these findings suggest?', [
      ['Peritoneal irritation in the right lower quadrant, concerning for appendicitis', 'Correct. Migratory pain, anorexia, fever, rebound and guarding.', true],
      ['Viral gastroenteritis', 'Diffuse pain with diarrhea and vomiting before pain would fit better.'],
      ['Constipation', 'Doesn’t cause fever, rebound and guarding.'],
    ]],
  },
  model: {
    junior: {
      layers: [['block', 'The appendix gets blocked', 'Often by a tiny hard piece of stool.'], ['swell', 'It swells and germs grow', 'Pressure builds.'], ['lining', 'The irritation reaches the belly’s lining', 'Pain moves to the lower right.'], ['body', 'The body reacts', 'Fever, no appetite, throwing up.']],
      clues: [['button', 'Pain started at the belly button', 'swell', 'A swelling appendix first causes vague pain in the middle.'], ['moved', 'Pain moved to the lower right', 'lining', 'Now the lining near the appendix is irritated.'], ['hop', 'Hurts to hop, walk or cough', 'lining', 'Movement jostles the irritated lining.'], ['hungry', 'Not hungry', 'body', 'Inflammation takes away appetite.'], ['fever', 'Low fever', 'body', 'The body is fighting inflammation.'], ['vomit', 'Threw up after the pain started', 'body', 'The gut slows when it is inflamed.']],
      wrap: 'Andre’s appendix got blocked and swelled up. At first the pain was vague; once the irritation reached the belly’s lining, it settled in the lower right.',
    },
    senior: {
      layers: [['obs', 'Luminal obstruction', 'Appendicolith or lymphoid hyperplasia.'], ['dist', 'Distension, bacterial overgrowth, ischemia', 'Visceral afferent pain (T10).'], ['perit', 'Transmural inflammation and parietal peritonitis', 'Somatic, localized pain.'], ['sys', 'Systemic inflammatory response', 'Fever, leukocytosis.']],
      clues: [['peri', 'Periumbilical onset', 'dist', 'Visceral pain referred to the T10 dermatome.'], ['rlq', 'Migration to the right lower quadrant', 'perit', 'Parietal peritoneum involvement.'], ['reb', 'Rebound and guarding', 'perit', 'Peritoneal signs.'], ['jar', 'Pain with jarring movements', 'perit', 'Peritoneal irritation.'], ['anor', 'Anorexia then emesis', 'dist', 'Visceral distension.'], ['fev', 'Low-grade fever, tachycardia', 'sys', 'Systemic response.']],
      wrap: 'Your model predicts leukocytosis with neutrophilia and a dilated, noncompressible appendix on ultrasound.',
    },
  },
  ddx: {
    junior: { options: [
      ['appy', 'Appendicitis', 'leading', 'Pain that moved to the lower right, no appetite, low fever and pain with hopping.'],
      ['bug', 'A stomach bug', 'possible', 'Usually throwing up and diarrhea come first, with pain all over.'],
      ['constipation', 'Constipation', 'possible', 'Common, but doesn’t cause fever and pain with hopping.'],
      ['testicle', 'A twisted testicle', 'cantmiss', 'Can cause belly pain in boys. Always check. His exam is normal.'],
      ['gas', 'Just gas', 'unlikely', 'Gas pain moves around and doesn’t cause fever.'],
    ] },
    senior: { options: [
      ['appy', 'Acute appendicitis', 'leading', 'Classic migration, anorexia, fever and peritoneal signs.'],
      ['torsion', 'Testicular torsion', 'cantmiss', 'Can present with abdominal pain; a testicular exam is mandatory.'],
      ['adenitis', 'Mesenteric adenitis', 'possible', 'Mimics appendicitis, often after a viral illness.'],
      ['ge', 'Gastroenteritis', 'possible', 'Vomiting and diarrhea typically precede diffuse pain.'],
      ['uti', 'Urinary tract infection or kidney stone', 'possible', 'A urinalysis helps.'],
      ['intus', 'Intussusception', 'possible', 'Less common at 11; intermittent colicky pain.'],
      ['constip', 'Constipation', 'unlikely', 'Doesn’t cause fever or peritoneal signs.'],
    ] },
  },
  labs: { title: 'Tests', r: [
    ['White blood cells', '15.8', 'K/µL', '4.5–13.5', 'high'],
    ['Neutrophils', '84', '%', '35–65', 'high'],
    ['CRP', '4.2', 'mg/dL', '< 0.5', 'high'],
    ['Urinalysis', 'Normal', '', 'Normal', 'normal'],
    ['Ultrasound', 'Dilated, noncompressible appendix (9 mm) with an appendicolith', '', 'Not seen or < 6 mm', 'note'],
  ] },
  decision: {
    junior: ['Look back at your differential. What does Andre have?', [
      ['Appendicitis: a blocked, swollen appendix', 'Exactly. A surgeon will remove it before it bursts.', true],
      ['A stomach bug', 'His ultrasound shows a swollen appendix.'],
      ['Gas', 'His tests show inflammation.'],
    ]],
    senior: ['Which explanation is best supported?', [
      ['Acute nonperforated appendicitis with an appendicolith', 'Correct. Surgical consultation for appendectomy, IV antibiotics, fluids and analgesia.', true],
      ['Mesenteric adenitis', 'The ultrasound shows an inflamed appendix.'],
      ['Gastroenteritis', 'Peritoneal signs and imaging confirm appendicitis.'],
    ]],
    wrap: 'Andre has a laparoscopic appendectomy that afternoon through three tiny incisions. He goes home the next day and is back on his skateboard in two weeks.',
  },
  debrief: {
    science: 'The appendix is a small tube attached to the large intestine. When it gets blocked, it swells and bacteria multiply. If it isn’t removed, it can burst and spread infection through the belly.',
    pearl: 'Classic appendicitis: pain starting near the belly button that moves to the lower right, no appetite, then vomiting and fever. In boys with belly pain, always examine the testicles.',
    uncertainty: 'Some uncomplicated appendicitis can be treated with antibiotics alone, but surgery is still the most common treatment.',
    human: 'Andre was scared of surgery. The surgeon showed him pictures of how small the incisions would be.',
    closing: 'Following the story of the pain leads you to the diagnosis.',
  },
  founder: 'Teaching point: migratory pain and the order of symptoms; testicular exam for boys with abdominal pain. Pain sequence is a great example of visceral vs somatic pain.',
});

export const UTI = makeCase({
  code: 'CASE-021', slug: 'mia-fever', room: 'childrens-clinic',
  title: 'A Fever Without a Source', summary: 'Mia, 18 months old, has had a high fever for two days, and nothing obvious explains it. Where is the infection hiding?',
  specialty: 'General Pediatrics', system: 'Kidneys & Urinary Tract', minutes: [15, 25],
  patient: { name: 'Mia Chen', age: '18 months', concern: 'High fever for two days' },
  art: 'an 18-month-old Chinese-American toddler girl with rosy fever cheeks sitting on her mother’s lap in a bright pediatric clinic, clutching a soft toy, a pediatrician smiling and showing her a small light, friendly cartoon wall art',
  opening: {
    scene: 'Mia has had a fever up to 39.5 °C for two days. She is fussier than usual and vomited once. She has no cough, runny nose or rash.',
    dialogue: 'She’s not herself, and I can’t figure out why she has this fever.',
    speaker: 'Mia’s mom',
    narrator: 'When a toddler has a fever with no obvious cause, healers search systematically. Some infections hide in places a toddler can’t tell you about.',
  },
  history: {
    min: 3, speaker: 'Mia’s mom', prompt: 'Mia can’t tell you how she feels. Ask her mom at least three questions.',
    q: [
      ['Has she had a cough, runny nose or ear pulling?', 'None of that.', 'No signs of a cold or ear infection.'],
      ['Have her diapers smelled different?', 'Yes, actually. Really strong.', 'Foul-smelling urine can be a sign of a urinary tract infection.'],
      ['Has she been eating and drinking?', 'Less than usual. She threw up once.', 'Vomiting can happen when an infection reaches the kidneys.'],
      ['Has she had a urine infection before?', 'No.', 'A first infection in a toddler often needs a kidney ultrasound afterward.'],
      ['Is she up to date on vaccines?', 'Yes.', 'Vaccines make dangerous blood infections much less likely.'],
      ['Has she been constipated?', 'A little.', 'Constipation increases the risk of urinary tract infections.'],
    ],
  },
  exam: {
    text: 'You observe a head-to-toe exam.',
    f: [['Temperature', '39.5 °C (103.1 °F)', 'high'], ['Ears and throat', 'Normal', 'normal'], ['Lungs', 'Clear', 'normal'], ['Skin', 'No rash', 'normal'], ['Abdomen', 'Mild discomfort low in the belly', 'note'], ['Alertness', 'Fussy but consolable and playful between fevers', 'normal']],
    junior: ['The ears, throat, lungs and skin are normal. What should the team check next?', [
      ['Her urine', 'Right. Urinary infections are a common hidden cause of fever in toddlers.', true],
      ['Her eyesight', 'Not a likely cause of fever.'],
      ['Nothing; send her home', 'A fever this high deserves a search.'],
    ]],
    senior: ['What is the most appropriate next step?', [
      ['Obtain a catheterized urine sample for urinalysis and culture', 'Correct. In a febrile toddler without a source, UTI is common; bag specimens are often contaminated.', true],
      ['A chest X-ray', 'Her lungs are clear and she has no cough.'],
      ['A lumbar puncture', 'She is well-appearing and consolable, and vaccinated.'],
    ]],
  },
  model: {
    junior: {
      layers: [['germ', 'Germs from the diaper area', 'Usually E. coli from stool.'], ['climb', 'Germs climb up the urine tube to the bladder', 'Girls have a short tube.'], ['kidney', 'Germs reach the kidneys', 'A kidney infection.'], ['body', 'The body reacts with fever', 'Fussy and throwing up.']],
      clues: [['diaper', 'Still in diapers', 'germ', 'Stool germs are close to the urine opening.'], ['constip', 'A little constipated', 'climb', 'A full bowel makes it harder for the bladder to empty.'], ['smell', 'Strong-smelling diapers', 'climb', 'Germs in the urine change its smell.'], ['belly', 'Discomfort low in the belly', 'climb', 'The bladder is irritated.'], ['fever', 'Fever of 39.5', 'kidney', 'High fever suggests the kidneys are involved.'], ['vomit', 'Threw up once', 'body', 'Kidney infections often cause vomiting.']],
      wrap: 'Germs from the diaper area climbed up into Mia’s bladder and kidneys. She couldn’t tell anyone it hurt to pee, but her fever and smelly diapers were clues.',
    },
    senior: {
      layers: [['col', 'Periurethral colonization by gut flora', 'E. coli most common.'], ['asc', 'Ascending infection to the bladder', 'Bacterial adhesion.'], ['pyelo', 'Pyelonephritis', 'Upper tract invasion.'], ['sys', 'Systemic inflammatory response', 'Fever, vomiting, irritability.']],
      clues: [['dia', 'Diapered toddler girl', 'col', 'Short urethra and proximity to stool flora.'], ['cons', 'Constipation', 'asc', 'Impairs bladder emptying.'], ['odor', 'Malodorous urine', 'asc', 'Bacteriuria.'], ['supra', 'Suprapubic discomfort', 'asc', 'Cystitis.'], ['fev', 'Fever 39.5 °C without another source', 'pyelo', 'Febrile UTI in infants usually means kidney involvement.'], ['em', 'Vomiting and irritability', 'sys', 'Systemic illness.']],
      wrap: 'Your model predicts pyuria, positive nitrite and leukocyte esterase, and a urine culture growing E. coli.',
    },
  },
  ddx: {
    junior: { options: [
      ['uti', 'A urine infection', 'leading', 'High fever, smelly diapers and no other cause found.'],
      ['virus', 'A virus', 'possible', 'Very common, usually with a runny nose or cough.'],
      ['ear', 'An ear infection', 'possible', 'Her ears look normal.'],
      ['blood', 'A serious blood infection', 'cantmiss', 'Rare in vaccinated toddlers, but doctors watch for it.'],
      ['teeth', 'Teething', 'unlikely', 'Teething doesn’t cause a fever this high.'],
    ] },
    senior: { options: [
      ['pyelo', 'Febrile urinary tract infection (pyelonephritis)', 'leading', 'Fever without source, malodorous urine, vomiting.'],
      ['viral', 'Viral syndrome', 'possible', 'Most common cause of fever, usually with other symptoms.'],
      ['bact', 'Occult bacteremia', 'cantmiss', 'Uncommon in vaccinated children but important.'],
      ['mening', 'Meningitis', 'cantmiss', 'Consider if she becomes inconsolable, lethargic or develops a rash or bulging fontanelle.'],
      ['pna', 'Occult pneumonia', 'possible', 'Can occur without cough; her lungs are clear.'],
      ['kd', 'Kawasaki disease', 'possible', 'Consider if fever persists 5 days with other features.'],
      ['teeth', 'Teething', 'unlikely', 'Doesn’t cause high fever.'],
    ] },
  },
  labs: { title: 'Tests', r: [
    ['Urine leukocyte esterase', 'Positive', '', 'Negative', 'high'],
    ['Urine nitrite', 'Positive', '', 'Negative', 'high'],
    ['Urine white cells', '> 50', 'per HPF', '< 5', 'high'],
    ['Urine culture (catheter)', 'E. coli > 50,000', 'CFU/mL', 'No growth', 'note'],
    ['CRP', '8.2', 'mg/dL', '< 0.5', 'high'],
    ['Kidney ultrasound', 'Normal kidneys', '', 'Normal', 'normal'],
  ] },
  decision: {
    junior: ['Look back at your differential. Why does Mia have a fever?', [
      ['A urine infection that reached her kidneys', 'Exactly. Antibiotics will clear it.', true],
      ['Teething', 'Her urine test found the cause.'],
      ['A cold', 'She has no cold symptoms, and her urine shows infection.'],
    ]],
    senior: ['Which explanation is best supported?', [
      ['E. coli pyelonephritis in a febrile toddler', 'Correct. Oral cephalosporin for 7–14 days if she can take fluids; ultrasound after a first febrile UTI.', true],
      ['Asymptomatic bacteriuria with a viral illness', 'Pyuria, nitrite and fever with no other source indicate UTI.'],
      ['Occult bacteremia', 'The urine explains the fever.'],
    ]],
    wrap: 'Mia takes an oral antibiotic and her fever breaks within two days. Her kidney ultrasound is normal. Her parents learn to treat constipation and watch for future fevers.',
  },
  debrief: {
    science: 'Urine is usually sterile. Germs from stool can climb up the urethra to the bladder and kidneys. Babies and toddlers can’t say it burns to pee, so fever may be the only sign.',
    pearl: 'In a toddler with fever and no obvious source, check the urine. Use a clean-catch or catheter sample; bag samples are often contaminated.',
    uncertainty: 'Repeated kidney infections can scar kidneys, so her team will watch for recurrence and treat constipation.',
    human: 'Mia’s mom felt unsure because nothing seemed wrong. Taking parents’ instincts seriously often leads to the answer.',
    closing: 'When a patient can’t tell you where it hurts, a careful search speaks for them.',
  },
  founder: 'Teaching point: fever without source in toddlers; urine collection method matters; constipation and UTI. Good place to discuss how pediatricians examine children who can’t talk.',
});

export const NEPHROTIC = makeCase({
  code: 'CASE-022', slug: 'caleb-puffy', room: 'childrens-clinic',
  title: 'Puffy Eyes, Foamy Pee', summary: 'Caleb’s eyes are puffy every morning and now his legs are swollen. Find where his protein is going.',
  specialty: 'Pediatric Nephrology', system: 'Kidneys & Urinary Tract', minutes: [15, 25],
  patient: { name: 'Caleb Rivera', age: 4, concern: 'Swelling around eyes and legs', interests: ['Dinosaurs', 'Bubbles'] },
  art: 'a 4-year-old Puerto Rican boy with noticeably puffy eyelids and a slightly swollen belly sitting on a clinic exam table holding a toy dinosaur, a pediatric nephrologist gently pressing his swollen ankle, cheerful clinic room',
  opening: {
    scene: 'For a week, Caleb has woken up with puffy eyes. His parents thought it was allergies. Now his legs and belly are swollen, his shoes don’t fit, and his pee looks foamy.',
    dialogue: 'His eyes were so puffy he could barely open them this morning.',
    speaker: 'Caleb’s dad',
    narrator: 'Swelling tells you fluid has moved into the wrong place. The question is why.',
  },
  history: {
    min: 3, speaker: 'Caleb’s dad',
    q: [
      ['When is the puffiness worst?', 'In the morning. His legs swell more by evening.', 'Fluid shifts with gravity: face after lying down, legs after standing.'],
      ['Does his urine look different?', 'Foamy, like bubbles in the toilet.', 'Foamy urine suggests a lot of protein in the urine.'],
      ['Is his urine red or brown?', 'No, just yellow and foamy.', 'No blood in the urine fits minimal change disease.'],
      ['Has he been sick recently?', 'He had a cold two weeks ago.', 'Infections can trigger nephrotic syndrome.'],
      ['Has he had any trouble breathing?', 'No.', 'Fluid can collect around the lungs in severe cases.'],
      ['Is anyone in the family allergic?', 'Not really.', 'Allergies were suspected, but they don’t explain the leg swelling or foamy urine.'],
    ],
  },
  exam: {
    text: 'You observe the exam.',
    f: [['Eyelids', 'Puffy', 'abnormal'], ['Legs', 'Pitting swelling: a dent stays when pressed', 'abnormal'], ['Belly', 'Swollen with fluid (ascites)', 'abnormal'], ['Blood pressure', '96/60', 'normal'], ['Weight', 'Up 2 kg in a week', 'high'], ['Urine dipstick', 'Protein 4+, no blood', 'high']],
    junior: ['Where is the problem most likely?', [
      ['The kidneys are letting protein leak into the urine', 'Right. The foamy urine and dipstick show lots of protein.', true],
      ['An allergy', 'Allergies don’t cause protein in the urine or leg swelling.'],
      ['He’s eating too much', 'His weight gain is fluid, not food.'],
    ]],
    senior: ['What syndrome do these findings suggest?', [
      ['Nephrotic syndrome: heavy proteinuria, edema, likely low albumin', 'Correct. Normal blood pressure and no hematuria in a 4-year-old suggest minimal change disease.', true],
      ['Nephritic syndrome', 'Nephritis typically causes blood in the urine, hypertension and reduced kidney function.'],
      ['Congestive heart failure', 'His heart and breathing are normal; heavy proteinuria points to the kidneys.'],
    ]],
  },
  model: {
    junior: {
      layers: [['filter', 'The kidney’s filter gets leaky', 'The immune system affects the filter.'], ['leak', 'Protein leaks into the urine', 'Normally protein stays in the blood.'], ['low', 'Blood protein gets low', 'Protein helps hold water inside blood vessels.'], ['swell', 'Water leaks into tissues', 'Swelling.']],
      clues: [['cold', 'A cold two weeks ago', 'filter', 'Infections can trigger the immune system.'], ['foam', 'Foamy urine', 'leak', 'Protein makes urine bubbly.'], ['dip', 'Protein 4+ on the dipstick', 'leak', 'Lots of protein in the urine.'], ['eyes', 'Puffy eyes', 'swell', 'Fluid collects in soft tissue around the eyes.'], ['legs', 'Swollen legs', 'swell', 'Gravity pulls fluid to the legs.'], ['belly', 'Swollen belly', 'swell', 'Fluid collects in the belly.']],
      wrap: 'Caleb’s kidney filters became leaky, so protein spilled into his urine. Without enough protein in his blood, water seeped into his tissues.',
    },
    senior: {
      layers: [['pod', 'Podocyte injury', 'Effacement of foot processes.'], ['prot', 'Massive proteinuria', 'Loss of the charge and size barrier.'], ['hypo', 'Hypoalbuminemia', 'Falling oncotic pressure.'], ['edema', 'Edema and hyperlipidemia', 'Fluid shifts; hepatic lipoprotein synthesis rises.']],
      clues: [['trig', 'Recent viral illness', 'pod', 'Immune triggers precede many episodes.'], ['foamy', 'Foamy urine', 'prot', 'Proteinuria.'], ['dip', 'Dipstick protein 4+ without blood', 'prot', 'Selective proteinuria typical of minimal change disease.'], ['peri', 'Periorbital edema worse in the morning', 'edema', 'Dependent fluid shifts overnight.'], ['asc', 'Ascites and pitting edema', 'edema', 'Low oncotic pressure.'], ['wt', 'Weight gain of 2 kg', 'edema', 'Fluid retention.']],
      wrap: 'Your model predicts a very high urine protein-to-creatinine ratio, low albumin, high cholesterol and normal kidney function.',
    },
  },
  ddx: {
    junior: { options: [
      ['neph', 'Leaky kidney filters (nephrotic syndrome)', 'leading', 'Puffiness, swelling, foamy urine and protein on the dipstick.'],
      ['allergy', 'Allergies', 'possible', 'Can cause puffy eyes, but not leg swelling or protein in urine.'],
      ['heart', 'A heart problem', 'possible', 'Can cause swelling, but his heart and breathing are normal.'],
      ['liver', 'A liver problem', 'possible', 'The liver makes protein; doctors check it too.'],
      ['food', 'Eating too much salt', 'unlikely', 'Salt doesn’t cause protein in the urine.'],
    ] },
    senior: { options: [
      ['mcd', 'Nephrotic syndrome (likely minimal change disease)', 'leading', 'Age 4, heavy proteinuria, edema, normal BP and no hematuria.'],
      ['fsgs', 'Focal segmental glomerulosclerosis', 'possible', 'Considered if steroid-resistant.'],
      ['psgn', 'Post-streptococcal glomerulonephritis', 'possible', 'Hematuria, hypertension and low complement.'],
      ['liver', 'Liver disease', 'possible', 'Low albumin from poor synthesis, without proteinuria.'],
      ['hf', 'Heart failure', 'possible', 'Edema without proteinuria.'],
      ['clot', 'Thrombosis complicating nephrotic syndrome', 'cantmiss', 'Nephrotic syndrome raises clot risk; watch for leg swelling on one side or headache.'],
      ['allergy', 'Allergic angioedema', 'unlikely', 'No urticaria and doesn’t explain the proteinuria.'],
    ] },
  },
  labs: { r: [
    ['Urine protein-to-creatinine ratio', '8.4', 'mg/mg', '< 0.2', 'high'],
    ['Albumin', '1.6', 'g/dL', '3.5–5.0', 'low'],
    ['Cholesterol', '380', 'mg/dL', '< 170', 'high'],
    ['Creatinine', '0.3', 'mg/dL', '0.2–0.4', 'normal'],
    ['Urine blood', 'Negative', '', 'Negative', 'normal'],
    ['Complement C3', 'Normal', '', 'Normal', 'normal'],
  ] },
  decision: {
    junior: ['Look back at your differential. What explains Caleb’s swelling?', [
      ['His kidney filters are leaking protein, so water seeps into his tissues', 'Exactly. Steroid medicine usually closes the leak within weeks.', true],
      ['An allergy', 'His urine is full of protein, which points to the kidneys.'],
      ['Too much water', 'Drinking water doesn’t cause this.'],
    ]],
    senior: ['Which explanation is best supported?', [
      ['Idiopathic nephrotic syndrome, most likely minimal change disease', 'Correct. Prednisone is first-line; about 90% of children respond.', true],
      ['Post-streptococcal glomerulonephritis', 'No hematuria, hypertension or low complement.'],
      ['Liver failure', 'Massive proteinuria explains the low albumin.'],
    ]],
    wrap: 'Caleb starts prednisone. Within two weeks the protein disappears from his urine and the swelling fades. His family learns to check his urine at home for relapses.',
  },
  debrief: {
    science: 'Kidney filters normally keep protein in the blood. In nephrotic syndrome, the filter cells change and let protein leak out. Albumin holds water in blood vessels like a sponge, so when it falls, water seeps into tissues.',
    pearl: 'Puffy eyes in a young child aren’t always allergies. A simple urine dipstick can find protein.',
    uncertainty: 'Many children relapse, often with colds, and need more steroid courses. Most outgrow it by adulthood.',
    human: 'Caleb’s parents felt guilty for blaming allergies. Healers can reassure families that many conditions look alike at first.',
    closing: 'One simple test can turn a puzzling sign into a clear plan.',
  },
  founder: 'Teaching point: nephrotic vs nephritic syndrome; albumin and oncotic pressure; infection and clot risks. Good companion to the HUS case.',
});

export const KAWASAKI = makeCase({
  code: 'CASE-023', slug: 'ethan-kawasaki', room: 'childrens-clinic',
  title: 'Five Days of Fever', summary: 'Ethan has had a fever for five days, red eyes, cracked lips and a rash. Protect his heart.',
  specialty: 'Pediatric Cardiology & Rheumatology', system: 'Heart & Circulation', minutes: [15, 30],
  patient: { name: 'Ethan Murphy', age: 3, concern: 'Fever for five days with red eyes and rash', interests: ['Fire trucks', 'Puppies'] },
  art: 'an irritable 3-year-old white boy with red eyes, bright red cracked lips and a rash on his chest, sitting on his father’s lap in a pediatric clinic, his hands look red and puffy, a pediatrician kneeling gently, warm clinic light',
  opening: {
    scene: 'Ethan has had a fever over 39 °C for five days. Today his eyes are red, his lips are bright red and cracked, and he has a rash on his chest. His hands and feet look red and swollen. He is the crankiest his parents have ever seen.',
    dialogue: 'Nothing brings his fever down, and he just keeps crying.',
    speaker: 'Ethan’s dad',
    narrator: 'Some fevers are more than an infection. Recognizing a pattern early can prevent damage to a child’s heart.',
  },
  history: {
    min: 3, speaker: 'Ethan’s dad',
    q: [
      ['How long has the fever lasted?', 'Five days, even with medicine.', 'Fever lasting five or more days is the first criterion for Kawasaki disease.'],
      ['Is there pus or discharge from his eyes?', 'No, just red.', 'Red eyes without discharge (non-exudative conjunctivitis) is a classic feature.'],
      ['Has he been around anyone sick?', 'Not that we know.', 'Kawasaki disease isn’t contagious, but infections that look like it can be.'],
      ['Are his vaccines up to date?', 'Yes, including measles.', 'Measles can cause fever, red eyes and rash; vaccination makes it unlikely.'],
      ['Has he had any new medicines?', 'Only fever medicine.', 'Drug reactions can cause rash and fever.'],
      ['Have you noticed lumps in his neck?', 'One on the right side.', 'A single enlarged neck node is a criterion.'],
    ],
  },
  exam: {
    text: 'You observe the exam.',
    f: [['Eyes', 'Red, no discharge', 'abnormal'], ['Lips and tongue', 'Red, cracked lips; “strawberry” tongue', 'abnormal'], ['Skin', 'Red, blotchy rash on trunk', 'abnormal'], ['Hands and feet', 'Red and swollen', 'abnormal'], ['Neck', 'One enlarged lymph node (2 cm)', 'abnormal'], ['Heart rate', '150, high even for fever', 'high']],
    junior: ['How many warning signs does Ethan have along with his fever?', [
      ['Five: red eyes, red lips and tongue, rash, swollen hands and feet, and a neck lump', 'Right. Together with five days of fever, this pattern points to Kawasaki disease.', true],
      ['Just one: the fever', 'Look again. He has several other signs.'],
      ['None, he just has a cold', 'Colds don’t cause this pattern.'],
    ]],
    senior: ['Which diagnosis do these findings fulfill?', [
      ['Complete Kawasaki disease: fever of 5 days plus at least 4 of 5 principal features', 'Correct. Remember CRASH and Burn: Conjunctivitis, Rash, Adenopathy, Strawberry tongue and lips, Hands and feet; Burn = fever ≥ 5 days.', true],
      ['Scarlet fever', 'Scarlet fever has a sandpaper rash and exudative pharyngitis, without conjunctivitis or extremity changes.'],
      ['Viral exanthem', 'Doesn’t explain the full constellation and persistent fever.'],
    ]],
  },
  model: {
    junior: {
      layers: [['trigger', 'Something sets off the immune system', 'The trigger is still unknown.'], ['over', 'The immune system overreacts', 'Inflammation everywhere.'], ['vessels', 'Blood vessels get inflamed', 'Red eyes, lips, hands and rash.'], ['heart', 'Heart arteries can swell', 'The danger to watch for.']],
      clues: [['fever', 'Fever for five days', 'over', 'The immune system won’t calm down.'], ['cranky', 'Very cranky', 'over', 'Inflammation makes children feel awful.'], ['eyes', 'Red eyes', 'vessels', 'Inflamed vessels in the eyes.'], ['lips', 'Red, cracked lips and strawberry tongue', 'vessels', 'Inflamed vessels in the mouth.'], ['hands', 'Swollen red hands and feet', 'vessels', 'Inflamed vessels in the skin.'], ['hr', 'Fast heart rate', 'heart', 'The heart may be inflamed too.']],
      wrap: 'Ethan’s immune system overreacted, inflaming blood vessels throughout his body. The most important vessels to protect are the arteries that feed his heart.',
    },
    senior: {
      layers: [['trig', 'Unknown trigger in a genetically susceptible child', 'Possibly infectious.'], ['imm', 'Immune activation', 'Cytokine release.'], ['vasc', 'Medium-vessel vasculitis', 'Mucocutaneous inflammation.'], ['cor', 'Coronary arteritis', 'Risk of aneurysm.']],
      clues: [['age', 'Age 3', 'trig', 'Most cases occur under age 5.'], ['fev', 'Fever ≥ 5 days unresponsive to antipyretics', 'imm', 'Persistent inflammation.'], ['conj', 'Non-exudative conjunctivitis', 'vasc', 'Principal criterion.'], ['oral', 'Strawberry tongue, cracked lips', 'vasc', 'Principal criterion.'], ['ext', 'Extremity erythema and edema', 'vasc', 'Principal criterion.'], ['tach', 'Tachycardia out of proportion to fever', 'cor', 'Possible myocarditis.']],
      wrap: 'Your model predicts high CRP and ESR, rising platelets, low albumin and possible coronary dilation on echocardiogram.',
    },
  },
  ddx: {
    junior: { options: [
      ['kd', 'Kawasaki disease', 'leading', 'Five days of fever plus red eyes, red lips, rash, swollen hands and a neck lump.'],
      ['scarlet', 'Strep (scarlet fever)', 'possible', 'Causes rash and red tongue, but not red eyes and swollen hands.'],
      ['measles', 'Measles', 'possible', 'Causes fever, red eyes and rash, but he is vaccinated.'],
      ['virus', 'A virus', 'possible', 'Many viruses cause fever and rash, usually without all these signs.'],
      ['allergy', 'An allergic reaction', 'unlikely', 'Allergies don’t cause five days of fever.'],
    ] },
    senior: { options: [
      ['kd', 'Kawasaki disease', 'leading', 'Fulfills classic criteria.'],
      ['misc', 'MIS-C', 'possible', 'Overlaps with Kawasaki; more GI symptoms, shock and myocardial dysfunction; prior COVID-19.'],
      ['adeno', 'Adenovirus infection', 'possible', 'Conjunctivitis and fever, but often exudative pharyngitis.'],
      ['scarlet', 'Scarlet fever', 'possible', 'Rapid strep test distinguishes it.'],
      ['tss', 'Toxic shock syndrome', 'cantmiss', 'Fever, rash and shock; check blood pressure and perfusion.'],
      ['sjs', 'Drug reaction (Stevens-Johnson syndrome)', 'possible', 'Mucosal involvement with blistering and a drug trigger.'],
      ['measles', 'Measles', 'unlikely', 'Vaccinated; would show cough, coryza and Koplik spots.'],
    ] },
  },
  labs: { title: 'Labs and echo', r: [
    ['CRP', '11.0', 'mg/dL', '< 0.5', 'high'],
    ['ESR', '82', 'mm/hr', '0–20', 'high'],
    ['White blood cells', '17.4', 'K/µL', '5.0–14.5', 'high'],
    ['Platelets', '520', 'K/µL', '150–450', 'high', 'Rises further in the second week'],
    ['Albumin', '2.9', 'g/dL', '3.5–5.0', 'low'],
    ['Urinalysis', 'White cells without bacteria (sterile pyuria)', '', 'Normal', 'note'],
    ['Echocardiogram', 'Left anterior descending artery mildly dilated (Z-score 2.8)', '', 'Z-score < 2', 'note'],
  ] },
  decision: {
    junior: ['Look back at your differential. What does Ethan have?', [
      ['Kawasaki disease, which is starting to affect his heart arteries', 'Exactly. A medicine called IVIG calms the inflammation and protects his heart.', true],
      ['A cold', 'His tests show strong inflammation and heart artery changes.'],
      ['An allergy', 'Allergies don’t cause these heart findings.'],
    ]],
    senior: ['Which explanation is best supported?', [
      ['Kawasaki disease with early coronary artery dilation', 'Correct. IVIG 2 g/kg and aspirin; treatment within 10 days of fever onset lowers aneurysm risk.', true],
      ['MIS-C', 'No shock, GI predominance or myocardial dysfunction, and no COVID exposure.'],
      ['Scarlet fever', 'Doesn’t explain coronary changes.'],
    ]],
    wrap: 'Ethan receives IVIG and aspirin. His fever breaks within 24 hours. At six weeks, his heart artery is back to normal size.',
  },
  debrief: {
    science: 'Kawasaki disease is inflammation of medium-sized blood vessels throughout the body. The most important are the coronary arteries, which feed the heart muscle. Without treatment, about 1 in 4 children develop coronary aneurysms.',
    pearl: 'Think Kawasaki disease when a young child has a fever for five days. Remember CRASH and Burn: Conjunctivitis, Rash, Adenopathy, Strawberry tongue, Hands and feet, and Burn for five days of fever.',
    uncertainty: 'Kawasaki disease is the most common cause of acquired heart disease in children in developed countries. Ethan will have follow-up echocardiograms.',
    human: 'Ethan’s parents had been told twice it was “just a virus.” Persistent fever deserves a fresh look.',
    closing: 'Pattern recognition protects hearts.',
  },
  founder: 'Teaching point: Kawasaki criteria (CRASH and Burn), timing of IVIG, coronary aneurysms. Note incomplete Kawasaki disease in infants.',
});

export const STREP = makeCase({
  code: 'CASE-024', slug: 'aaliyah-throat', room: 'childrens-clinic',
  title: 'More Than a Sore Throat', summary: 'Aaliyah’s throat hurts, she has a fever and no cough. Learn why treating this infection protects the heart.',
  specialty: 'General Pediatrics', system: 'Infection & Immunity', minutes: [15, 20],
  patient: { name: 'Aaliyah Davis', age: 9, concern: 'Sore throat and fever', interests: ['Singing', 'Braiding hair'] },
  art: 'a 9-year-old Black girl with braids sitting on a pediatric clinic exam table opening her mouth wide while a pediatrician shines a light to look at her throat with a tongue depressor, colorful friendly clinic',
  opening: {
    scene: 'Aaliyah woke up with a very sore throat and a headache. Swallowing hurts, she has a fever, and her stomach aches. She doesn’t have a cough or runny nose.',
    dialogue: 'It feels like swallowing glass. And I have a solo at choir on Sunday!',
    narrator: 'Most sore throats are caused by viruses and get better on their own. One kind, from strep bacteria, needs antibiotics for an important reason.',
  },
  history: {
    min: 3,
    q: [
      ['Did this start suddenly?', 'Yes, this morning.', 'Sudden onset fits strep throat.'],
      ['Do you have a cough or runny nose?', 'No.', 'Cough and runny nose suggest a virus. Their absence points toward strep.'],
      ['Does your stomach hurt?', 'Yes, a little.', 'Stomachaches are common with strep throat in children.'],
      ['Has anyone at school been sick?', 'A few kids in my class had strep.', 'Strep spreads in classrooms.'],
      ['Are you allergic to any medicines?', 'No.', 'Penicillin allergy would change the antibiotic choice.'],
      ['Can you open your mouth all the way?', 'Yes.', 'Trouble opening the mouth suggests an abscess.'],
    ],
  },
  exam: {
    text: 'You observe the exam.',
    f: [['Temperature', '39.0 °C (102.2 °F)', 'high'], ['Tonsils', 'Red and swollen with white patches', 'abnormal'], ['Roof of mouth', 'Tiny red spots', 'abnormal'], ['Neck', 'Tender, swollen lymph nodes in front', 'abnormal'], ['Uvula', 'Midline', 'normal'], ['Spleen', 'Not enlarged', 'normal']],
    junior: ['Which clues point to strep instead of a cold virus?', [
      ['Sudden sore throat, fever, white patches, swollen neck glands and no cough', 'Right. That combination makes strep likely. A quick test can check.', true],
      ['Her choir solo', 'Exciting, but not a clue.'],
      ['Having a stomachache only', 'It helps, but the throat findings are stronger clues.'],
    ]],
    senior: ['What is her modified Centor (McIsaac) score, and what does it mean?', [
      ['5 points: fever, tonsillar exudate, tender anterior nodes, no cough and age 3–14; test for strep', 'Correct. A high score warrants a rapid antigen test.', true],
      ['1 point; no testing needed', 'She meets all five criteria.'],
      ['Treat without testing', 'Testing avoids unnecessary antibiotics.'],
    ]],
  },
  model: {
    junior: {
      layers: [['spread', 'Strep germs spread at school', 'Through coughs and shared cups.'], ['throat', 'Strep infects the throat', 'The tonsils fight back.'], ['body', 'The body reacts', 'Fever, swollen glands, stomachache.'], ['heart', 'Without treatment, the immune system can confuse the heart for strep', 'Rheumatic fever.']],
      clues: [['class', 'Classmates had strep', 'spread', 'Strep spreads in classrooms.'], ['sudden', 'Sudden sore throat', 'throat', 'Strep comes on fast.'], ['white', 'White patches on tonsils', 'throat', 'The tonsils are fighting the infection.'], ['glands', 'Swollen neck glands', 'body', 'Lymph nodes swell when fighting germs.'], ['fever', 'Fever', 'body', 'The body heats up to fight.'], ['nocough', 'No cough', 'throat', 'Colds usually cause a cough; strep usually doesn’t.']],
      wrap: 'Strep spread from classmates to Aaliyah’s throat. Treating it with antibiotics also protects her heart from a rare but serious immune reaction.',
    },
    senior: {
      layers: [['trans', 'Droplet transmission of Group A Streptococcus', 'Close contact.'], ['inf', 'Pharyngotonsillar infection', 'Local invasion.'], ['resp', 'Local and systemic immune response', 'Exudate, adenopathy, fever.'], ['seq', 'Potential non-suppurative sequelae', 'Rheumatic fever via molecular mimicry.']],
      clues: [['exp', 'Classmates with strep', 'trans', 'Exposure.'], ['ex', 'Tonsillar exudate', 'inf', 'Bacterial pharyngitis.'], ['pal', 'Palatal petechiae', 'inf', 'Suggestive of GAS.'], ['ln', 'Tender anterior cervical adenopathy', 'resp', 'Regional lymphatic response.'], ['fev', 'Fever 39 °C', 'resp', 'Systemic response.'], ['abd', 'Abdominal pain and headache', 'resp', 'Common GAS symptoms in children.']],
      wrap: 'Your model predicts a positive rapid strep test. Treatment within 9 days of onset prevents rheumatic fever.',
    },
  },
  ddx: {
    junior: { options: [
      ['strep', 'Strep throat', 'leading', 'Sudden sore throat, fever, white patches, swollen glands and no cough.'],
      ['virus', 'A throat virus', 'possible', 'The most common cause of sore throats, usually with cough and runny nose.'],
      ['mono', 'Mono', 'possible', 'Causes sore throat and tiredness, often with a big spleen.'],
      ['abscess', 'A pocket of pus behind the tonsil', 'cantmiss', 'Causes trouble opening the mouth and a muffled voice.'],
      ['singing', 'Singing too much', 'unlikely', 'Singing doesn’t cause fever and white patches.'],
    ] },
    senior: { options: [
      ['gas', 'Group A streptococcal pharyngitis', 'leading', 'Centor/McIsaac score 5.'],
      ['viral', 'Viral pharyngitis', 'possible', 'Most common overall; cough, coryza and conjunctivitis favor viral.'],
      ['ebv', 'Infectious mononucleosis', 'possible', 'Exudative pharyngitis, posterior nodes, splenomegaly; amoxicillin can cause a rash.'],
      ['pta', 'Peritonsillar abscess', 'cantmiss', 'Trismus, muffled voice, uvular deviation.'],
      ['epi', 'Epiglottitis', 'cantmiss', 'Drooling, stridor and toxic appearance; rare after Hib vaccination.'],
      ['allergy', 'Allergic rhinitis with postnasal drip', 'unlikely', 'No fever or exudate.'],
    ] },
  },
  labs: { title: 'Tests', r: [
    ['Rapid strep antigen test', 'Positive', '', 'Negative', 'high'],
  ] },
  decision: {
    junior: ['Look back at your differential. What does Aaliyah have?', [
      ['Strep throat', 'Exactly. Ten days of amoxicillin treats it and protects her heart.', true],
      ['A cold virus', 'Her strep test is positive.'],
      ['Mono', 'Her strep test is positive and her spleen isn’t enlarged.'],
    ]],
    senior: ['Which explanation is best supported?', [
      ['Group A streptococcal pharyngitis', 'Correct. Amoxicillin for 10 days; she can return to school after 12 hours of antibiotics without fever.', true],
      ['Viral pharyngitis', 'The rapid test is positive.'],
      ['Peritonsillar abscess', 'No trismus or uvular deviation.'],
    ]],
    wrap: 'Aaliyah takes amoxicillin. Her fever is gone in a day, and she sings her solo on Sunday.',
  },
  debrief: {
    science: 'Group A strep bacteria infect the throat and tonsils. Rarely, if untreated, the immune system’s antibodies against strep also attack the heart, joints and brain. This is rheumatic fever, which can permanently damage heart valves.',
    pearl: 'Not every sore throat needs antibiotics. Test first. Finish the full course when strep is confirmed. Rheumatic heart disease is still common in parts of the world without easy access to testing and treatment.',
    uncertainty: 'Some children carry strep in their throat without being sick, which is why testing is reserved for children with signs of infection.',
    human: 'Aaliyah worried about missing her solo. Treatment plans fit into real lives.',
    closing: 'A simple antibiotic course can prevent a lifetime of heart disease.',
  },
  founder: 'Teaching point: Centor/McIsaac criteria, antibiotic stewardship, rheumatic heart disease as a global health issue.',
});

export const ALL = makeCase({
  code: 'CASE-025', slug: 'sophia-leukemia', room: 'childrens-clinic',
  title: 'Not Just Growing Pains', summary: 'Sophia is tired, pale and bruised, and her legs hurt at night. Look closely at her blood.',
  specialty: 'Pediatric Hematology & Oncology', system: 'Blood & Cancer', minutes: [20, 35],
  patient: { name: 'Sophia Rossi', age: 5, concern: 'Tired, pale, bruised, with leg pain', interests: ['Ballet', 'Unicorns'] },
  art: 'a pale tired 5-year-old Italian-American girl in a tutu-print shirt sitting on her mother’s lap in a pediatric clinic, small bruises on her shins, a pediatrician gently examining her neck, soft caring light',
  opening: {
    scene: 'For three weeks Sophia has been unusually tired and pale. She has bruises on her legs that nobody remembers her getting, fevers that come and go, and her legs hurt so much at night that she wakes up crying.',
    dialogue: 'Her teacher says she’s been falling asleep in class. And she stopped wanting to go to ballet.',
    speaker: 'Sophia’s mom',
    narrator: 'Leg pain is common in children. But pain that wakes a child at night, along with other changes, deserves a careful look.',
  },
  history: {
    min: 3, speaker: 'Sophia’s mom',
    q: [
      ['Where exactly does her leg pain happen?', 'Her shins and knees. It wakes her up at night.', 'Bone pain that wakes a child is a red flag, unlike typical growing pains.'],
      ['Has she had fevers?', 'On and off for two weeks.', 'Recurrent fevers can come from infections that her body can’t fight well.'],
      ['Has she lost weight?', 'Her clothes are looser.', 'Weight loss is a concerning sign.'],
      ['Any nosebleeds or bleeding gums?', 'A few nosebleeds.', 'Bleeding suggests low platelets.'],
      ['Has she been more tired than usual?', 'Yes, she naps every day now.', 'Fatigue and pallor suggest anemia.'],
      ['Has she been sick with a virus recently?', 'Just these fevers.', 'Some viruses can lower blood counts temporarily.'],
    ],
  },
  exam: {
    text: 'You observe the exam.',
    f: [['Skin', 'Pale, with bruises and tiny red spots', 'abnormal'], ['Neck', 'Several enlarged lymph nodes', 'abnormal'], ['Belly', 'Liver and spleen enlarged', 'abnormal'], ['Legs', 'Tender over the shins; joints not swollen', 'abnormal'], ['Temperature', '38.3 °C (100.9 °F)', 'high'], ['Heart', 'Soft flow murmur', 'note']],
    junior: ['Which parts of her blood seem to be affected?', [
      ['Red cells, platelets and maybe white cells', 'Right. Pale means low red cells, bruises mean low platelets, fevers can mean her white cells aren’t working well.', true],
      ['Only her platelets', 'Her paleness and fevers suggest more than one type of blood cell is affected.'],
      ['None; she is just tired', 'Pain that wakes her up, bruising and pallor together are concerning.'],
    ]],
    senior: ['What does this combination suggest?', [
      ['A process affecting multiple blood cell lines with organ infiltration, concerning for acute leukemia', 'Correct. Pallor, bruising, fever, bone pain, lymphadenopathy and hepatosplenomegaly.', true],
      ['Immune thrombocytopenia', 'ITP causes isolated bruising in a well child without organomegaly or bone pain.'],
      ['Growing pains', 'Growing pains don’t cause pallor, bruising, fevers or organomegaly.'],
    ]],
  },
  model: {
    junior: {
      layers: [['mistake', 'A blood-making cell gets a mistake', 'In the bone marrow.'], ['copies', 'It copies itself out of control', 'Leukemia cells (blasts).'], ['crowd', 'Leukemia cells crowd out healthy ones', 'Fewer healthy blood cells.'], ['spread', 'Leukemia cells collect in other places', 'Bones, liver, spleen and glands.']],
      clues: [['pale', 'Pale and tired', 'crowd', 'Too few red cells.'], ['bruises', 'Bruises and nosebleeds', 'crowd', 'Too few platelets.'], ['fevers', 'Fevers on and off', 'crowd', 'Healthy white cells are crowded out.'], ['bones', 'Leg pain that wakes her', 'copies', 'The crowded marrow stretches the bone.'], ['liver', 'Big liver and spleen', 'spread', 'Leukemia cells collect there.'], ['glands', 'Swollen neck glands', 'spread', 'Leukemia cells collect in lymph nodes.']],
      wrap: 'A blood-making cell in Sophia’s bone marrow began copying itself out of control. Those cells crowded out healthy ones and spread to other organs.',
    },
    senior: {
      layers: [['clone', 'Malignant transformation of a lymphoid progenitor', 'Genetic changes in a precursor B cell.'], ['prolif', 'Clonal proliferation of lymphoblasts', 'Marrow expansion.'], ['fail', 'Bone marrow failure', 'Anemia, thrombocytopenia, neutropenia.'], ['infil', 'Extramedullary infiltration', 'Liver, spleen, lymph nodes.']],
      clues: [['bone', 'Nocturnal bone pain', 'prolif', 'Marrow expansion and periosteal stretch.'], ['pallor', 'Pallor and flow murmur', 'fail', 'Anemia.'], ['pet', 'Petechiae and bruising', 'fail', 'Thrombocytopenia.'], ['fev', 'Recurrent fever', 'fail', 'Neutropenia or the disease itself.'], ['hsm', 'Hepatosplenomegaly', 'infil', 'Extramedullary disease.'], ['ln', 'Lymphadenopathy', 'infil', 'Nodal infiltration.']],
      wrap: 'Your model predicts anemia, thrombocytopenia, blasts on the smear, and high LDH and uric acid.',
    },
  },
  ddx: {
    junior: { options: [
      ['all', 'A blood cancer (leukemia)', 'leading', 'Pale, bruised, fevers, bone pain, swollen glands and a big liver and spleen.'],
      ['virus', 'A virus like mono', 'possible', 'Can cause tiredness, swollen glands and a big spleen.'],
      ['itp', 'Low platelets only (ITP)', 'possible', 'Explains bruises, but not paleness or a big spleen.'],
      ['joint', 'Joint inflammation (arthritis)', 'possible', 'Can cause leg pain and fevers.'],
      ['growing', 'Growing pains', 'unlikely', 'Growing pains don’t cause paleness, bruises or fevers.'],
    ] },
    senior: { options: [
      ['all', 'Acute lymphoblastic leukemia', 'leading', 'Multilineage cytopenias, bone pain and extramedullary infiltration.'],
      ['ebv', 'Infectious mononucleosis', 'possible', 'Lymphadenopathy and splenomegaly; atypical lymphocytes, not blasts.'],
      ['aa', 'Aplastic anemia', 'possible', 'Pancytopenia without organomegaly.'],
      ['jia', 'Systemic juvenile idiopathic arthritis', 'possible', 'Fever and limb pain; leukemia must be excluded before steroids.'],
      ['nb', 'Neuroblastoma', 'possible', 'Can infiltrate marrow and cause bone pain.'],
      ['itp', 'Immune thrombocytopenia', 'unlikely', 'Doesn’t explain anemia, fever or organomegaly.'],
      ['gp', 'Growing pains', 'unlikely', 'Never with cytopenias or organomegaly.'],
    ] },
  },
  labs: { r: [
    ['White blood cells', '42.0', 'K/µL', '5.0–14.5', 'high'],
    ['Blasts on smear', '70', '%', '0', 'high'],
    ['Hemoglobin', '6.9', 'g/dL', '11.5–13.5', 'low'],
    ['Platelets', '18', 'K/µL', '150–450', 'low'],
    ['Absolute neutrophil count', '400', '/µL', '1,500–8,500', 'low'],
    ['LDH', '900', 'U/L', '< 300', 'high'],
    ['Flow cytometry', 'Precursor B-cell lymphoblasts', '', '—', 'note'],
  ] },
  decision: {
    junior: ['Look back at your differential. What does Sophia have?', [
      ['Leukemia, a cancer of the blood-making cells', 'Yes. It is serious, and most children with this type are cured.', true],
      ['Growing pains', 'Her blood test shows leukemia cells.'],
      ['A virus', 'Her blood shows leukemia cells, not virus-fighting cells.'],
    ]],
    senior: ['Which explanation is best supported?', [
      ['B-cell acute lymphoblastic leukemia', 'Correct. Blasts with B-precursor immunophenotype. Bone marrow evaluation and lumbar puncture will stage it.', true],
      ['Infectious mononucleosis', 'Flow cytometry confirms lymphoblasts.'],
      ['Aplastic anemia', 'The marrow is full of blasts, not empty.'],
    ]],
    wrap: 'Sophia begins treatment with the oncology team. About 90% of children with this type of leukemia are cured. Her team will watch for tumor lysis syndrome and infections as therapy starts.',
  },
  debrief: {
    science: 'Bone marrow makes red cells, white cells and platelets. In leukemia, one young cell copies itself out of control and fills the marrow, crowding out healthy cells. That’s why Sophia was pale, bruised and getting fevers.',
    pearl: 'Growing pains happen at night, in both legs, with a healthy child in the daytime and normal exam. Pain that wakes a child with pallor, bruising, fevers, weight loss or organ enlargement needs blood tests.',
    uncertainty: 'Treatment lasts about two to three years. Her doctors will tailor intensity to how quickly the leukemia responds.',
    human: 'Hearing the word leukemia is terrifying. Sophia’s team explains the high cure rate and the plan, step by step.',
    closing: 'Childhood leukemia was once almost always fatal. Research and teamwork turned it into one of medicine’s great success stories.',
  },
  founder: 'Teaching point: growing pains vs red flags; ALL presentation; one of pediatric oncology’s success stories. Link to the TLS case. Your own oncology experience fits well here.',
});
