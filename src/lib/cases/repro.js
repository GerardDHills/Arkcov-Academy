import { makeCase } from './kit';

// Reproductive health cases. Values are illustrative teaching values.

const R = 'Reproductive Health';

export const TORSION = makeCase({
  code: 'CASE-032', slug: 'deshawn-torsion', room: 'emergency-department', emergency: true,
  title: 'Six Hours', summary: 'DeShawn woke up with sudden, severe pain in his scrotum. He almost didn’t tell anyone. Every hour matters.',
  specialty: 'Pediatric Urology', system: R, minutes: [15, 25],
  patient: { name: 'DeShawn Carter', age: 14, concern: 'Sudden severe scrotal pain', interests: ['Track', 'Chess'] },
  art: 'a 14-year-old Black teenage boy sitting hunched on an emergency room bed in a hospital gown, clutching a blanket, looking pale and worried, his father beside him with a hand on his shoulder, a pediatric urologist speaking calmly, no exposed body, dignified clinical scene',
  opening: {
    scene: 'At 3 a.m., DeShawn woke up with sudden, terrible pain in his left testicle. He threw up twice. He waited two hours before waking his dad because he was embarrassed.',
    dialogue: 'I didn’t want to say anything. It’s… embarrassing.',
    narrator: 'Some emergencies are hard to talk about. Testicular torsion can cost a boy his testicle within hours. Teaching boys to speak up saves organs.',
    narratorRole: 'Pediatric urologist',
  },
  history: {
    min: 3,
    q: [
      ['When did the pain start, and how fast?', 'Suddenly at 3 a.m. It woke me up.', 'Sudden onset, often during sleep, is typical of torsion.'],
      ['Did you get hurt?', 'No, nothing happened.', 'No trauma.'],
      ['Have you thrown up?', 'Twice.', 'Nausea and vomiting are common with torsion and less common with infection.'],
      ['Has this happened before?', 'Once, for a few minutes, a month ago.', 'Brief past episodes may be torsions that untwisted on their own.'],
      ['Any burning when you pee or discharge?', 'No.', 'Urinary symptoms would point more toward epididymitis.'],
    ],
  },
  exam: {
    text: 'The urologist examines DeShawn with a chaperone present.',
    f: [['Left testicle', 'Swollen, very tender, sits higher than the right', 'abnormal'], ['Position', 'Lies horizontally', 'abnormal'], ['Cremasteric reflex', 'Absent on the left', 'abnormal'], ['Right testicle', 'Normal', 'normal'], ['Temperature', 'Normal', 'normal']],
    junior: ['What should happen next?', [
      ['Call the surgeon right away. This could be a twisted testicle that needs surgery within hours', 'Right. Time matters most.', true],
      ['Give him an ice pack and send him home', 'If it’s torsion, waiting could mean losing the testicle.'],
      ['Wait until the morning clinic', 'Every hour of delay lowers the chance of saving it.'],
    ]],
    senior: ['How do you interpret the exam?', [
      ['High probability of testicular torsion (high-riding, horizontal lie, absent cremasteric reflex, vomiting); emergency urology consult', 'Correct. If suspicion is high, surgery should not wait for imaging.', true],
      ['Epididymitis', 'Usually gradual onset, urinary symptoms and a preserved cremasteric reflex.'],
      ['Torsion of the appendix testis', 'Causes focal pain at the upper pole, sometimes a “blue dot,” with a normal reflex.'],
    ]],
  },
  act: {
    junior: {
      prompt: 'Put the steps in order.',
      steps: [['Tell a trusted adult right away, even if it feels embarrassing', 'Doctors see this often. Speaking up saves the testicle.'], ['Go to the emergency room', 'Torsion is an emergency.'], ['Doctors examine and may do a quick ultrasound', 'Checks blood flow.'], ['A surgeon untwists the testicle and stitches it in place', 'Both sides are secured to prevent it happening again.']],
      distractors: [['Wait to see if it goes away overnight', 'Waiting can cost the testicle.'], ['Take a hot shower and go back to sleep', 'This doesn’t help torsion.']],
    },
    senior: {
      prompt: 'Order the management of suspected testicular torsion.',
      steps: [['Call urology immediately', 'Don’t delay for tests when suspicion is high.'], ['Keep him NPO and give pain and nausea medicine', 'Prepare for surgery.'], ['Doppler ultrasound only if it won’t delay surgery', 'Absent flow confirms torsion.'], ['Attempt manual detorsion if surgery will be delayed', '“Open the book”: rotate outward.'], ['Surgical exploration, detorsion and bilateral orchiopexy', 'Best salvage within 6 hours.']],
      distractors: [['Treat with antibiotics for epididymitis first', 'Missing torsion costs the testicle.'], ['Wait for a urinalysis before calling urology', 'Call first; tests can run in parallel.']],
    },
  },
  model: {
    junior: {
      layers: [['shape', 'The testicle can move too freely', 'Some boys are born with this.'], ['twist', 'It twists on its cord', 'The cord carries blood.'], ['block', 'Blood flow is cut off', 'The testicle gets no oxygen.'], ['signs', 'Sudden pain, swelling and vomiting', 'The body’s alarm.']],
      clues: [['before', 'A short episode a month ago', 'shape', 'A sign it can twist.'], ['night', 'Pain woke him at 3 a.m.', 'twist', 'Torsion often happens during sleep.'], ['high', 'Sits higher and sideways', 'twist', 'A twisted cord pulls it up.'], ['swollen', 'Swollen and very tender', 'block', 'No blood flow injures the tissue.'], ['vomit', 'Threw up twice', 'signs', 'Severe pain causes vomiting.']],
      wrap: 'DeShawn’s testicle twisted on its cord, cutting off its blood supply. Untwisting it fast can save it.',
    },
    senior: {
      layers: [['bell', 'Bell-clapper anatomy', 'Inadequate fixation of the testis.'], ['rot', 'Rotation of the spermatic cord', 'Often during sleep or cremasteric contraction.'], ['isch', 'Venous then arterial occlusion and ischemia', 'Time-dependent necrosis.'], ['clin', 'Acute pain, swelling, vagal symptoms', 'Clinical picture.']],
      clues: [['prior', 'Prior brief self-resolving episode', 'bell', 'Intermittent torsion.'], ['horiz', 'Horizontal lie', 'bell', 'Classic bell-clapper sign.'], ['ride', 'High-riding testis', 'rot', 'Cord shortening from twisting.'], ['crem', 'Absent cremasteric reflex', 'rot', 'Highly sensitive for torsion.'], ['swell', 'Swelling and exquisite tenderness', 'isch', 'Venous congestion then ischemia.'], ['nv', 'Nausea and vomiting', 'clin', 'Vagal response.']],
      wrap: 'Your model predicts absent blood flow on Doppler and a twisted cord at surgery.',
    },
  },
  ddx: {
    junior: { options: [
      ['torsion', 'A twisted testicle (torsion)', 'leading', 'Sudden pain at night, vomiting, sitting high and sideways.'],
      ['infection', 'An infection near the testicle', 'possible', 'Usually comes on more slowly with burning pee.'],
      ['hernia', 'A hernia', 'possible', 'Can cause a bulge and pain in the groin.'],
      ['injury', 'An injury', 'unlikely', 'Nothing hit him.'],
      ['wait', 'Nothing serious', 'unlikely', 'Sudden severe pain here is always checked right away.'],
    ] },
    senior: { options: [
      ['torsion', 'Testicular torsion', 'leading', 'Sudden onset, vomiting, absent cremasteric reflex, high-riding testis.'],
      ['epid', 'Epididymitis', 'possible', 'Gradual onset, dysuria, preserved reflex.'],
      ['appendix', 'Torsion of the appendix testis', 'possible', 'Focal upper-pole tenderness, blue dot sign.'],
      ['hernia', 'Incarcerated inguinal hernia', 'cantmiss', 'Also a surgical emergency.'],
      ['stone', 'Kidney stone with referred pain', 'possible', 'Flank pain and hematuria with a normal testicular exam.'],
      ['trauma', 'Testicular trauma', 'unlikely', 'No injury history.'],
    ] },
  },
  labs: { title: 'Tests', both: true, r: [
    ['Doppler ultrasound', 'No blood flow to the left testicle', '', 'Normal flow on both sides', 'abnormal'],
    ['Urinalysis', 'Normal', '', 'Normal', 'normal'],
  ] },
  decision: {
    junior: ['What happened to DeShawn?', [
      ['His testicle twisted and lost its blood supply', 'Exactly. The surgeon untwisted it in time.', true],
      ['An infection', 'The ultrasound shows no blood flow, which means torsion.'],
      ['He pulled a muscle', 'Muscles don’t cause this.'],
    ]],
    senior: ['Which explanation is best supported?', [
      ['Left testicular torsion; emergency detorsion and bilateral orchiopexy', 'Correct. Surgery at 5 hours from onset: the testis pinked up and was saved.', true],
      ['Epididymitis', 'Absent flow rules this out.'],
      ['Torsion of the appendix testis', 'Flow to the testis itself is absent.'],
    ]],
    wrap: 'In surgery, the testicle turns pink again after untwisting. Both testicles are stitched in place so it can’t happen again.',
  },
  debrief: {
    science: 'The testicle hangs from a cord carrying its blood supply. If it isn’t anchored well, it can twist, cutting off blood flow. Without blood, tissue begins to die within hours.',
    pearl: 'Sudden testicular pain is an emergency. Salvage is highest within 6 hours. In boys with belly pain, always check the testicles.',
    uncertainty: 'Even after surgery, doctors watch the testicle’s growth over time.',
    human: 'DeShawn almost stayed silent. Doctors and nurses handle these exams every day, respectfully and with a chaperone.',
    closing: 'Courage to speak up is part of health.',
  },
  founder: 'Teaching point: torsion is time-critical; normalize talking about genital symptoms; chaperones and dignity. Pair with ovarian torsion.',
});

export const TESTICULAR_CANCER = makeCase({
  code: 'CASE-033', slug: 'ryan-lump', room: 'reproductive-health-clinic',
  title: 'The Lump He Found', summary: 'Ryan felt a painless lump in the shower. Learn why self-exams matter and why this cancer is so curable.',
  specialty: 'Urology & Oncology', system: R, minutes: [15, 25],
  patient: { name: 'Ryan Walsh', age: 24, concern: 'Painless testicular lump', interests: ['Rock climbing', 'Coding'] },
  art: 'a 24-year-old white man with short hair sitting fully clothed on a urology clinic exam table, talking seriously but calmly with a urologist who holds a tablet showing an ultrasound image, bright modern clinic, hopeful mood',
  opening: {
    scene: 'Ryan noticed a hard, painless lump on his right testicle while showering. It has been there about a month, with a dull heavy feeling.',
    dialogue: 'It doesn’t hurt, so I figured it was nothing. My girlfriend made me come in.',
    narrator: 'Testicular cancer is the most common cancer in young men ages 15–35, and one of the most curable. Painless lumps deserve attention.',
    narratorRole: 'Urologist',
  },
  history: {
    min: 3,
    q: [
      ['Does it hurt?', 'No, just feels heavy.', 'Painless masses are more concerning than painful ones.'],
      ['How long has it been there?', 'About a month.', 'Persistence argues against infection.'],
      ['Did you have an undescended testicle as a baby?', 'Yes, on the right. I had surgery at age one.', 'A major risk factor.'],
      ['Any back pain, cough or breast tenderness?', 'No.', 'These can signal spread or hormone production.'],
      ['Any burning when you pee?', 'No.', 'Infection is less likely.'],
    ],
  },
  exam: {
    text: 'The urologist examines Ryan with a chaperone present.',
    f: [['Right testicle', 'Firm, non-tender mass within the testicle', 'abnormal'], ['Light test (transillumination)', 'Light does not pass through', 'abnormal'], ['Left testicle', 'Normal', 'normal'], ['Abdomen and lymph nodes', 'Normal', 'normal'], ['Breasts', 'Normal', 'normal']],
    junior: ['Why does it matter that light doesn’t shine through the lump?', [
      ['It means the lump is solid, not filled with fluid', 'Right. Fluid sacs let light through; solid lumps don’t.', true],
      ['It means the lump is nothing', 'Solid lumps need more testing.'],
      ['It means it’s infected', 'Infections are usually painful.'],
    ]],
    senior: ['What is the next step?', [
      ['Scrotal ultrasound and tumor markers (AFP, beta-hCG, LDH)', 'Correct. A solid intratesticular mass is cancer until proven otherwise.', true],
      ['Needle biopsy through the scrotum', 'Avoided: it risks spreading tumor cells.'],
      ['Antibiotics and recheck in a month', 'A painless solid mass shouldn’t wait.'],
    ]],
  },
  model: {
    junior: {
      layers: [['risk', 'A risk from birth', 'An undescended testicle.'], ['cells', 'Cells in the testicle grow out of control', 'Cancer.'], ['lump', 'A hard lump forms', 'Usually painless.'], ['found', 'Found early by self-exam', 'Most are cured.']],
      clues: [['undesc', 'Undescended testicle as a baby', 'risk', 'Raises the risk.'], ['hard', 'Hard lump', 'lump', 'A solid growth.'], ['painless', 'Painless', 'lump', 'Cancer often doesn’t hurt.'], ['heavy', 'Heavy feeling', 'lump', 'The lump adds weight.'], ['shower', 'Found it in the shower', 'found', 'Self-exams find most lumps.']],
      wrap: 'Ryan had a higher risk from birth. Cells grew into a hard, painless lump that he found early.',
    },
    senior: {
      layers: [['risk', 'Cryptorchidism and germ cell neoplasia in situ', 'Precursor lesion.'], ['tumor', 'Germ cell tumor', 'Seminoma or non-seminoma.'], ['mass', 'Firm intratesticular mass', 'Painless enlargement.'], ['spread', 'Lymphatic spread to retroperitoneal nodes', 'Stage-defining.']],
      clues: [['crypt', 'History of orchiopexy for cryptorchidism', 'risk', 'Strongest risk factor.'], ['firm', 'Firm, non-tender intratesticular mass', 'mass', 'Classic.'], ['trans', 'Does not transilluminate', 'mass', 'Solid.'], ['heavy', 'Dull heaviness', 'mass', 'Mass effect.'], ['noback', 'No back pain', 'spread', 'Argues against bulky retroperitoneal disease.']],
      wrap: 'Your model predicts a hypoechoic solid mass on ultrasound and possibly raised tumor markers.',
    },
  },
  ddx: {
    junior: { options: [
      ['cancer', 'Testicular cancer', 'leading', 'A hard, painless, solid lump in a young man.'],
      ['fluid', 'A fluid sac (hydrocele)', 'possible', 'Light would shine through.'],
      ['veins', 'Swollen veins (varicocele)', 'possible', 'Feels like a bag of worms, usually on the left.'],
      ['infection', 'An infection', 'possible', 'Usually painful.'],
      ['nothing', 'Nothing important', 'unlikely', 'A new hard lump always needs checking.'],
    ] },
    senior: { options: [
      ['gct', 'Testicular germ cell tumor', 'leading', 'Painless solid intratesticular mass, cryptorchidism history.'],
      ['hydrocele', 'Hydrocele', 'possible', 'Transilluminates.'],
      ['varicocele', 'Varicocele', 'possible', 'Extratesticular, “bag of worms.”'],
      ['spermatocele', 'Spermatocele', 'possible', 'Extratesticular cyst above the testis.'],
      ['epid', 'Epididymo-orchitis', 'possible', 'Painful, with urinary symptoms.'],
      ['lymphoma', 'Testicular lymphoma', 'possible', 'The most common testicular tumor in older men.'],
    ] },
  },
  labs: { r: [
    ['Scrotal ultrasound', 'Solid hypoechoic mass in the right testis', '', 'Normal', 'abnormal'],
    ['AFP', '3', 'ng/mL', '< 9', 'normal'],
    ['Beta-hCG', '12', 'mIU/mL', '< 2', 'high'],
    ['LDH', '310', 'U/L', '< 250', 'high'],
    ['CT abdomen and pelvis', 'No enlarged lymph nodes', '', 'Normal', 'normal'],
  ] },
  decision: {
    junior: ['What does Ryan have?', [
      ['Testicular cancer, found early', 'Exactly. Most men with this cancer are cured.', true],
      ['A fluid sac', 'His lump is solid on ultrasound.'],
      ['An infection', 'It isn’t painful and the ultrasound shows a solid mass.'],
    ]],
    senior: ['Which explanation is best supported?', [
      ['Stage I seminoma, treated with radical inguinal orchiectomy', 'Correct. Normal AFP and a mildly raised hCG fit seminoma. Cure rates exceed 95%.', true],
      ['Hydrocele', 'The mass is solid.'],
      ['Non-seminomatous tumor', 'A raised AFP would suggest non-seminoma.'],
    ]],
    wrap: 'Ryan has surgery to remove the testicle through a groin incision and is offered sperm banking beforehand. His cancer hasn’t spread. He’ll have regular check-ups.',
  },
  debrief: {
    science: 'Testicular cancer starts in the cells that make sperm. It usually forms a hard, painless lump and spreads first to lymph nodes in the back of the abdomen.',
    pearl: 'Monthly testicular self-exams help young men find lumps early. Painless doesn’t mean harmless.',
    uncertainty: 'He has a small chance of relapse, so follow-up includes scans and markers for years.',
    human: 'Ryan worried about fertility and how he’d feel about his body. Healers address those fears directly, including options like sperm banking and implants.',
    closing: 'Early detection turns a frightening diagnosis into a story of survival.',
  },
  founder: 'Teaching point: self-exam, cryptorchidism risk, no scrotal biopsy, high cure rate. Normalize men’s health conversations.',
});

export const PROSTATE = makeCase({
  code: 'CASE-034', slug: 'walter-prostate', room: 'reproductive-health-clinic',
  title: 'Up All Night', summary: 'Mr. Green gets up five times a night to pee. Explore the prostate, and how to talk about screening.',
  specialty: 'Urology & Primary Care', system: R, minutes: [15, 25],
  patient: { name: 'Walter Green', age: 67, concern: 'Weak stream and peeing at night', interests: ['Bowling', 'Grandchildren'] },
  art: 'a 67-year-old Black man with gray hair and glasses sitting fully clothed in a primary care exam room, talking with a urologist who points to a simple anatomical model of the bladder and prostate, warm clinic light',
  opening: {
    scene: 'Mr. Green wakes up five times a night to pee. His stream is weak, it’s hard to start, and he never feels empty. He’s tired all day.',
    dialogue: 'I spend half the night in the bathroom. My wife says I should finally ask about it.',
    narrator: 'The prostate grows with age. Most urinary symptoms in older men come from benign growth, but healers also think about cancer and screening.',
    narratorRole: 'Urologist',
  },
  history: {
    min: 3,
    q: [
      ['How many times do you get up at night?', 'Four or five.', 'Nocturia.'],
      ['Is it hard to start, or is the stream weak?', 'Both. It dribbles at the end.', 'Obstructive symptoms suggest an enlarged prostate.'],
      ['Any blood in the urine or burning?', 'No.', 'Blood would need evaluation for bladder cancer or stones.'],
      ['Any family history of prostate cancer?', 'My brother had it at 60.', 'A family history raises risk.'],
      ['Do you drink coffee or fluids late?', 'Coffee after dinner.', 'Evening fluids and caffeine worsen nocturia.'],
    ],
  },
  exam: {
    text: 'You observe the exam.',
    f: [['Prostate (rectal exam)', 'Enlarged, smooth, rubbery; no hard nodules', 'abnormal'], ['Bladder after urinating (ultrasound)', '120 mL left behind', 'high'], ['Blood pressure', '134/82', 'normal'], ['Abdomen', 'Normal', 'normal'], ['Legs', 'No swelling', 'normal']],
    junior: ['Why does an enlarged prostate make peeing hard?', [
      ['It squeezes the tube that carries urine out of the bladder', 'Right. The prostate wraps around the urethra.', true],
      ['It makes extra urine', 'The prostate doesn’t make urine.'],
      ['It causes an infection', 'Not by itself.'],
    ]],
    senior: ['What does the exam suggest?', [
      ['Benign prostatic hyperplasia with incomplete emptying', 'Correct. A smooth, symmetric, rubbery gland without nodules.', true],
      ['Prostate cancer', 'Cancer often feels hard or nodular; a PSA and shared decision-making help.'],
      ['Acute urinary retention', 'He can still void; retention would mean he can’t.'],
    ]],
  },
  model: {
    junior: {
      layers: [['age', 'The prostate grows with age', 'Hormones over decades.'], ['squeeze', 'It squeezes the urine tube', 'Narrower path.'], ['empty', 'The bladder can’t empty fully', 'Urine is left behind.'], ['signs', 'Weak stream and peeing at night', 'What he notices.']],
      clues: [['67', 'Age 67', 'age', 'Common after 50.'], ['rubbery', 'Enlarged, smooth prostate', 'squeeze', 'The growing gland.'], ['weak', 'Weak, dribbling stream', 'squeeze', 'Narrow outlet.'], ['left', '120 mL left after peeing', 'empty', 'Incomplete emptying.'], ['night', 'Up five times a night', 'signs', 'A bladder that’s never empty fills fast.']],
      wrap: 'Mr. Green’s prostate grew with age and squeezed the tube that drains his bladder.',
    },
    senior: {
      layers: [['dht', 'DHT-driven stromal and glandular hyperplasia', 'Transition zone.'], ['obs', 'Bladder outlet obstruction', 'Static and dynamic components.'], ['ret', 'Incomplete emptying and detrusor changes', 'Elevated post-void residual.'], ['luts', 'Lower urinary tract symptoms', 'Voiding and storage symptoms.']],
      clues: [['age', 'Age 67', 'dht', 'Prevalence rises with age.'], ['dre', 'Smooth, enlarged gland', 'dht', 'Benign hyperplasia.'], ['hes', 'Hesitancy and weak stream', 'obs', 'Voiding symptoms.'], ['pvr', 'Post-void residual 120 mL', 'ret', 'Incomplete emptying.'], ['noct', 'Nocturia ×5', 'luts', 'Storage symptom; worsened by evening caffeine.']],
      wrap: 'Your model predicts a mildly raised PSA, normal kidney function and response to an alpha-blocker.',
    },
  },
  ddx: {
    junior: { options: [
      ['bph', 'An enlarged prostate (BPH)', 'leading', 'Age, weak stream, peeing at night, smooth enlarged prostate.'],
      ['cancer', 'Prostate cancer', 'cantmiss', 'Can cause similar symptoms; doctors talk about screening.'],
      ['infection', 'A bladder infection', 'possible', 'Usually burning and urgency.'],
      ['diabetes', 'Diabetes', 'possible', 'High sugar causes peeing a lot.'],
      ['coffee', 'Only too much coffee', 'possible', 'Makes it worse, but doesn’t explain the weak stream.'],
    ] },
    senior: { options: [
      ['bph', 'Benign prostatic hyperplasia', 'leading', 'Classic symptoms and exam.'],
      ['pca', 'Prostate cancer', 'cantmiss', 'Higher risk with family history and in Black men; discuss PSA screening.'],
      ['uti', 'Urinary tract infection or prostatitis', 'possible', 'Dysuria, fever; check urinalysis.'],
      ['dm', 'Diabetes mellitus', 'possible', 'Polyuria; check glucose.'],
      ['stricture', 'Urethral stricture', 'possible', 'Prior instrumentation or infection.'],
      ['oab', 'Overactive bladder', 'possible', 'Urgency without obstruction.'],
    ] },
  },
  labs: { r: [
    ['PSA', '3.2', 'ng/mL', 'Age-adjusted < 4.5', 'normal'],
    ['Urinalysis', 'Normal', '', 'Normal', 'normal'],
    ['Creatinine', '1.0', 'mg/dL', '0.7–1.3', 'normal'],
    ['Glucose (fasting)', '94', 'mg/dL', '70–99', 'normal'],
  ] },
  decision: {
    junior: ['What does Mr. Green have?', [
      ['An enlarged prostate squeezing his urine tube', 'Exactly. Medicine and fewer evening drinks can help.', true],
      ['A bladder infection', 'His urine test is normal.'],
      ['Diabetes', 'His blood sugar is normal.'],
    ]],
    senior: ['Which explanation is best supported?', [
      ['Benign prostatic hyperplasia; start an alpha-blocker (tamsulosin) and limit evening fluids', 'Correct. A 5-alpha-reductase inhibitor can shrink the gland over months.', true],
      ['Prostate cancer', 'Smooth exam and PSA within the age range; continue shared decision-making about screening.'],
      ['Overactive bladder', 'His elevated residual indicates obstruction.'],
    ]],
    wrap: 'Mr. Green starts tamsulosin and switches to decaf after noon. A month later, he gets up only once a night. Given his brother’s history, he and his doctor plan regular PSA checks.',
  },
  debrief: {
    science: 'The prostate surrounds the urethra just below the bladder. As it grows with age, it can narrow the urethra, making it hard to empty the bladder.',
    pearl: 'Most urinary symptoms in older men are from benign growth, but prostate cancer screening is a shared decision. Black men and men with a family history face higher risk.',
    uncertainty: 'If medicines don’t help enough, minimally invasive procedures or surgery are options.',
    human: 'Mr. Green waited years because he was embarrassed. Many men do. Open conversations lead to better sleep and earlier cancer detection.',
    closing: 'Men’s health includes talking about what’s hard to talk about.',
  },
  founder: 'Teaching point: BPH vs cancer; shared decision-making for PSA; disparities in prostate cancer for Black men.',
});

export const ECTOPIC = makeCase({
  code: 'CASE-035', slug: 'jasmine-ectopic', room: 'emergency-department', emergency: true, seniorOnly: true,
  title: 'The Wrong Place', summary: 'Ms. Ortiz has a positive pregnancy test, belly pain and dizziness. A pregnancy outside the uterus can be life-threatening.',
  specialty: 'Obstetrics & Gynecology', system: R, minutes: [20, 30],
  patient: { name: 'Jasmine Ortiz', age: 26, concern: 'Abdominal pain and dizziness in early pregnancy' },
  art: 'a 26-year-old Latina woman lying on an emergency room stretcher looking pale and in pain with a hand over her lower abdomen, an obstetrician performing a bedside ultrasound with a gel probe over the gown, a nurse starting an IV, urgent but composed',
  opening: {
    scene: 'Ms. Ortiz had a positive home pregnancy test last week. Today she has sharp pain low on her left side, light vaginal bleeding, and she nearly fainted at work. Now her right shoulder hurts too.',
    dialogue: 'I thought cramps were normal in early pregnancy. But this is so much worse.',
    narrator: 'Any person of reproductive age with abdominal pain needs a pregnancy test. Pain and bleeding in early pregnancy can signal an ectopic pregnancy.',
    narratorRole: 'Obstetrician',
  },
  history: {
    min: 3,
    q: [
      ['When was your last menstrual period?', 'About seven weeks ago.', 'Ectopic pregnancies usually present at 6–8 weeks.'],
      ['Have you had pelvic infections or tubal surgery?', 'I was treated for chlamydia two years ago.', 'Prior pelvic infection scars the fallopian tubes, raising the risk.'],
      ['Where is the pain?', 'Low on the left, and now my right shoulder.', 'Shoulder pain can come from blood in the abdomen irritating the diaphragm.'],
      ['How much bleeding?', 'Spotting, not heavy.', 'Bleeding may be light even when internal bleeding is severe.'],
      ['Do you feel faint?', 'I almost passed out at work.', 'A sign of blood loss.'],
    ],
  },
  exam: {
    text: 'You observe the exam.',
    f: [['Heart rate', '124 beats per minute', 'high'], ['Blood pressure', '88/54', 'low'], ['Abdomen', 'Tender low on the left with guarding', 'abnormal'], ['Skin', 'Pale and clammy', 'abnormal'], ['Urine pregnancy test', 'Positive', 'note']],
    senior: ['What is your assessment?', [
      ['Suspected ruptured ectopic pregnancy with hemorrhagic shock', 'Correct. Hypotension, tachycardia, peritoneal signs and shoulder pain in early pregnancy.', true],
      ['Threatened miscarriage', 'Would not explain shock and peritoneal signs.'],
      ['Ovarian cyst', 'Possible, but shock in early pregnancy is ectopic until proven otherwise.'],
    ]],
  },
  act: {
    senior: {
      prompt: 'Order the management of suspected ruptured ectopic pregnancy.',
      steps: [['Call for help; two large-bore IVs; send type and crossmatch and blood counts', 'Prepare for transfusion.'], ['Begin fluid and blood resuscitation', 'Treat hemorrhagic shock.'], ['Bedside ultrasound for free fluid and an intrauterine pregnancy', 'FAST and transvaginal views.'], ['Call obstetrics-gynecology for emergency surgery', 'Unstable patients go to the operating room.'], ['Check Rh status; give anti-D immune globulin if Rh-negative', 'Prevents sensitization.']],
      distractors: [['Discharge with follow-up beta-hCG in 48 hours', 'Only for stable patients without rupture.'], ['Give methotrexate now', 'Methotrexate is for stable, unruptured ectopics.']],
    },
  },
  model: {
    senior: {
      layers: [['tube', 'Damaged fallopian tube', 'Scarring slows transport.'], ['implant', 'Implantation outside the uterus', 'Usually the ampulla of the tube.'], ['rupture', 'Tubal rupture', 'The tube can’t stretch.'], ['bleed', 'Hemoperitoneum and hemorrhagic shock', 'Internal bleeding.']],
      clues: [['chlam', 'Prior chlamydia infection', 'tube', 'Tubal scarring.'], ['lmp', 'Seven weeks since last period', 'implant', 'Typical timing.'], ['left', 'Left lower abdominal pain', 'rupture', 'Side of the affected tube.'], ['shoulder', 'Right shoulder pain', 'bleed', 'Blood irritating the diaphragm (referred pain).'], ['shock', 'Tachycardia and hypotension', 'bleed', 'Blood loss.']],
      wrap: 'Your model predicts no pregnancy inside the uterus, a left adnexal mass and free fluid on ultrasound.',
    },
  },
  ddx: {
    senior: { options: [
      ['ectopic', 'Ruptured ectopic pregnancy', 'leading', 'Positive test, risk factor, shock and peritoneal signs.'],
      ['miscarriage', 'Spontaneous miscarriage', 'possible', 'Bleeding and cramps, usually without shock.'],
      ['cyst', 'Ruptured corpus luteum cyst', 'possible', 'Can cause hemoperitoneum in early pregnancy.'],
      ['torsion', 'Ovarian torsion', 'possible', 'Sudden pain and vomiting.'],
      ['appy', 'Appendicitis', 'possible', 'Usually right-sided with fever.'],
      ['pid', 'Pelvic inflammatory disease', 'possible', 'Fever, discharge, cervical motion tenderness.'],
    ] },
  },
  labs: { r: [
    ['Beta-hCG', '3,400', 'mIU/mL', 'Varies in pregnancy', 'note'],
    ['Transvaginal ultrasound', 'No intrauterine pregnancy; left adnexal mass; free fluid', '', 'Intrauterine pregnancy', 'abnormal'],
    ['Hemoglobin', '9.8', 'g/dL', '12.0–15.5', 'low'],
    ['Blood type', 'O negative', '', '—', 'note'],
  ] },
  decision: {
    senior: ['Which explanation is best supported?', [
      ['Ruptured left tubal ectopic pregnancy with hemoperitoneum', 'Correct. Emergency laparoscopy, transfusion as needed and anti-D immune globulin.', true],
      ['Miscarriage', 'No intrauterine pregnancy and free fluid.'],
      ['Corpus luteum cyst rupture', 'An adnexal mass with an hCG of 3,400 and no IUP makes ectopic most likely.'],
    ]],
    wrap: 'Ms. Ortiz has emergency laparoscopic surgery to stop the bleeding. She receives blood and anti-D immune globulin. Her team talks with her about grief, recovery and future pregnancies.',
  },
  debrief: {
    science: 'A fertilized egg normally travels down the fallopian tube to the uterus. If the tube is scarred, it can implant in the tube. As it grows, the tube can burst and bleed inside the abdomen.',
    pearl: 'Every person of reproductive age with abdominal pain or fainting gets a pregnancy test. Shoulder pain can mean blood in the abdomen.',
    uncertainty: 'Her chance of a future healthy pregnancy remains good, though risk of another ectopic is higher.',
    human: 'Ms. Ortiz lost a pregnancy she wanted. Healers acknowledge loss, not only the emergency.',
    closing: 'Fast recognition saves lives; compassion helps people heal.',
  },
  founder: 'Teaching point: pregnancy test in all reproductive-age patients with abdominal pain; ruptured ectopic as hemorrhagic shock; link to the PID case. Senior track only.',
});

export const PREECLAMPSIA = makeCase({
  code: 'CASE-036', slug: 'imani-preeclampsia', room: 'emergency-department', emergency: true,
  title: 'A Headache at 34 Weeks', summary: 'Mrs. Grant is pregnant, with a headache that won’t quit and spots in her vision. Protect two lives at once.',
  specialty: 'Obstetrics & Maternal-Fetal Medicine', system: R, minutes: [20, 30],
  patient: { name: 'Imani Grant', age: 31, concern: 'Severe headache and vision changes at 34 weeks pregnant', interests: ['Baking', 'Nursery decorating'] },
  art: 'a 31-year-old Black pregnant woman at 34 weeks sitting upright on a labor and delivery bed with a hand on her forehead, a blood pressure cuff on her arm, a fetal heart monitor strap on her belly over her gown, an obstetrician and nurse attentive beside her, calm serious lighting',
  opening: {
    scene: 'Mrs. Grant is 34 weeks pregnant with her first baby. Since this morning she has had a pounding headache that medicine doesn’t touch, she sees flashing spots, and her face and hands are swollen.',
    dialogue: 'I’ve never had a headache like this. And everything has sparkles in it.',
    narrator: 'High blood pressure in pregnancy is a leading cause of maternal death in the United States, and Black mothers are at greater risk. Listening to symptoms saves lives.',
    narratorRole: 'Obstetrician',
  },
  history: {
    min: 3,
    q: [
      ['Is this your first pregnancy?', 'Yes, my first.', 'First pregnancies carry higher risk.'],
      ['Has your blood pressure been high before?', 'It was a little high at my last visit.', 'An early warning sign.'],
      ['Do you have pain in your belly?', 'Yes, under my right ribs.', 'Right upper pain suggests liver involvement.'],
      ['Is the baby moving?', 'Yes, he’s kicking.', 'Reassuring, but the baby needs monitoring.'],
      ['Any trouble breathing?', 'No.', 'Shortness of breath could mean fluid in the lungs.'],
    ],
  },
  exam: {
    text: 'You observe the exam.',
    f: [['Blood pressure', '168/112 (repeated: 166/110)', 'high'], ['Reflexes', 'Very brisk', 'abnormal'], ['Face and hands', 'Swollen', 'abnormal'], ['Upper right abdomen', 'Tender', 'abnormal'], ['Urine dipstick', 'Protein 3+', 'high'], ['Fetal heart rate', '140, reassuring', 'normal']],
    junior: ['Why is this an emergency?', [
      ['Very high blood pressure in pregnancy can harm both mom and baby, and can cause seizures', 'Right. Treatment starts now.', true],
      ['Headaches are normal in pregnancy', 'Not with blood pressure this high and vision changes.'],
      ['Swelling is the main problem', 'Swelling is common; the blood pressure and symptoms are the danger.'],
    ]],
    senior: ['How do you classify this?', [
      ['Preeclampsia with severe features', 'Correct. BP ≥ 160/110, headache, visual changes, RUQ pain and proteinuria after 20 weeks.', true],
      ['Gestational hypertension', 'Severe features and proteinuria make this preeclampsia.'],
      ['Migraine', 'Doesn’t explain severe hypertension, proteinuria and RUQ pain.'],
    ]],
  },
  act: {
    junior: {
      prompt: 'Put the team’s steps in order.',
      steps: [['Check her blood pressure again to confirm', 'Make sure the reading is right.'], ['Give medicine to bring blood pressure down', 'Protects her brain.'], ['Give magnesium to prevent seizures', 'An important protection.'], ['Watch the baby’s heartbeat', 'The baby is a patient too.'], ['Plan for the baby’s delivery', 'Delivery is the cure.']],
      distractors: [['Send her home to rest', 'This is dangerous.'], ['Give water pills for the swelling', 'They don’t treat preeclampsia.']],
    },
    senior: {
      prompt: 'Order the management of preeclampsia with severe features at 34 weeks.',
      steps: [['Confirm severe-range BP within 15 minutes', 'Two readings.'], ['Give IV labetalol or hydralazine, or oral nifedipine, within 30–60 minutes', 'Prevent stroke.'], ['Start IV magnesium sulfate for seizure prophylaxis', 'Watch reflexes, breathing and urine output.'], ['Send CBC, liver enzymes, creatinine and assess for HELLP', 'Severity.'], ['Continuous fetal monitoring', 'Fetal well-being.'], ['Plan delivery after stabilization', 'At ≥ 34 weeks with severe features, deliver.']],
      distractors: [['Give a diuretic for edema', 'Worsens volume depletion.'], ['Wait until 37 weeks to deliver', 'Not with severe features.']],
    },
  },
  model: {
    junior: {
      layers: [['placenta', 'The placenta doesn’t form perfectly', 'Early in pregnancy.'], ['signals', 'It releases signals that harm blood vessels', 'All over mom’s body.'], ['pressure', 'Blood pressure rises', 'Vessels squeeze.'], ['organs', 'Brain, eyes, liver and kidneys are affected', 'Warning signs.']],
      clues: [['first', 'First pregnancy', 'placenta', 'A risk factor.'], ['bp', 'Blood pressure 168/112', 'pressure', 'Dangerously high.'], ['head', 'Pounding headache', 'organs', 'The brain is affected.'], ['sparkles', 'Sparkles in her vision', 'organs', 'The eyes and brain are affected.'], ['ribs', 'Pain under her right ribs', 'organs', 'The liver is swelling.'], ['protein', 'Protein in urine', 'organs', 'The kidneys are leaking.']],
      wrap: 'A placenta that didn’t form perfectly released signals that damaged Mrs. Grant’s blood vessels, raising her blood pressure and affecting her organs.',
    },
    senior: {
      layers: [['plac', 'Abnormal placentation', 'Incomplete spiral artery remodeling.'], ['anti', 'Antiangiogenic factors (sFlt-1)', 'Placental ischemia releases mediators.'], ['endo', 'Systemic endothelial dysfunction', 'Vasoconstriction and leak.'], ['end', 'End-organ injury', 'Brain, liver, kidneys, platelets.']],
      clues: [['nullip', 'Nulliparity', 'plac', 'Risk factor.'], ['htn', 'BP 168/112', 'endo', 'Vasoconstriction.'], ['edema', 'Facial and hand edema', 'endo', 'Capillary leak.'], ['vision', 'Scotomata and headache', 'end', 'Cerebral involvement.'], ['ruq', 'RUQ tenderness', 'end', 'Hepatic capsule distension.'], ['prot', 'Proteinuria', 'end', 'Glomerular endotheliosis.']],
      wrap: 'Your model predicts low platelets, raised liver enzymes and possibly rising creatinine.',
    },
  },
  ddx: {
    junior: { options: [
      ['pre', 'Preeclampsia (high blood pressure of pregnancy)', 'leading', 'High blood pressure, headache, vision changes and protein in urine.'],
      ['migraine', 'A migraine', 'possible', 'Doesn’t explain the blood pressure.'],
      ['normal', 'Normal pregnancy swelling', 'unlikely', 'Swelling alone is common; these other signs are not.'],
      ['stroke', 'A stroke', 'cantmiss', 'Very high blood pressure can cause one; treatment prevents it.'],
      ['virus', 'A virus', 'unlikely', 'Doesn’t raise blood pressure like this.'],
    ] },
    senior: { options: [
      ['pre', 'Preeclampsia with severe features', 'leading', 'Classic criteria.'],
      ['hellp', 'HELLP syndrome', 'possible', 'Hemolysis, elevated liver enzymes, low platelets; a severe variant.'],
      ['ecl', 'Eclampsia', 'cantmiss', 'Seizures; magnesium prevents them.'],
      ['chronic', 'Chronic hypertension', 'possible', 'Present before 20 weeks.'],
      ['afl', 'Acute fatty liver of pregnancy', 'possible', 'Liver failure with hypoglycemia.'],
      ['ttp', 'TTP', 'possible', 'Can mimic HELLP; ADAMTS13 distinguishes.'],
    ] },
  },
  labs: { r: [
    ['Platelets', '92', 'K/µL', '150–400', 'low'],
    ['AST', '140', 'U/L', '< 35', 'high'],
    ['ALT', '120', 'U/L', '< 35', 'high'],
    ['Creatinine', '1.1', 'mg/dL', '0.4–0.8 (pregnancy)', 'high'],
    ['Urine protein-to-creatinine ratio', '2.4', 'mg/mg', '< 0.3', 'high'],
    ['LDH', '420', 'U/L', '< 250', 'high'],
  ] },
  decision: {
    junior: ['What is happening to Mrs. Grant?', [
      ['Preeclampsia: dangerous high blood pressure in pregnancy', 'Exactly. Medicine protects her now, and delivering the baby cures it.', true],
      ['A migraine', 'Her blood pressure and tests show preeclampsia.'],
      ['Normal pregnancy', 'These are warning signs, not normal.'],
    ]],
    senior: ['Which explanation is best supported?', [
      ['Preeclampsia with severe features, evolving toward HELLP; stabilize and deliver', 'Correct. Low platelets and raised liver enzymes.', true],
      ['Acute fatty liver of pregnancy', 'Glucose and coagulation are normal.'],
      ['Chronic hypertension', 'New after 20 weeks with end-organ involvement.'],
    ]],
    wrap: 'Mrs. Grant receives labetalol and magnesium, and her baby boy is delivered safely that night. Her blood pressure returns to normal over the following weeks, with close follow-up because preeclampsia can occur after delivery too.',
  },
  debrief: {
    science: 'In preeclampsia, the placenta releases substances that injure the mother’s blood vessels. Blood pressure rises and organs like the brain, liver and kidneys are affected. Delivery of the placenta is the cure.',
    pearl: 'Severe headache, vision changes, upper belly pain or sudden swelling in late pregnancy or after delivery need urgent care. Low-dose aspirin can help prevent preeclampsia in high-risk pregnancies.',
    uncertainty: 'Women who have preeclampsia have a higher lifelong risk of heart disease and benefit from long-term blood pressure care.',
    human: 'Black women in the United States die from pregnancy complications at much higher rates. Believing women’s symptoms is part of closing that gap.',
    closing: 'Healers who listen protect two lives at once.',
  },
  founder: 'Teaching point: severe features, magnesium, delivery as cure; maternal health disparities. Consider a maternal health advocate guest.',
});

export const OVARIAN_TORSION = makeCase({
  code: 'CASE-037', slug: 'olivia-torsion', room: 'emergency-department', emergency: true,
  title: 'Pain That Comes in Waves', summary: 'Olivia has sudden pain low on her right side and keeps throwing up. Is it her appendix, or something else?',
  specialty: 'Pediatric Gynecology & Surgery', system: R, minutes: [15, 25],
  patient: { name: 'Olivia Bennett', age: 13, concern: 'Sudden lower right abdominal pain and vomiting', interests: ['Volleyball', 'Baking'] },
  art: 'a 13-year-old white girl with a ponytail lying curled on her side on an emergency room bed holding her lower right belly, her mother stroking her hair, a pediatric surgeon reviewing an ultrasound on a monitor, calm clinical room',
  opening: {
    scene: 'During volleyball practice, Olivia felt sudden, sharp pain low on her right side. It comes in waves. She has thrown up three times.',
    dialogue: 'It comes and goes, and when it comes, I can’t even move.',
    narrator: 'Like testicles, ovaries can twist on their blood supply. Torsion is an emergency, and it can look like appendicitis.',
  },
  history: {
    min: 3,
    q: [
      ['Did the pain start suddenly?', 'Yes, all at once during a jump.', 'Sudden onset with activity fits torsion.'],
      ['Does it come in waves?', 'Yes, it gets better and then really bad.', 'Intermittent twisting and untwisting.'],
      ['Have you thrown up?', 'Three times.', 'Vomiting is very common with torsion.'],
      ['Have you started your periods?', 'Yes, a year ago. My last one was two weeks ago.', 'Mid-cycle cysts can make the ovary heavier.'],
      ['Do you have a fever?', 'No.', 'Appendicitis more often brings fever.'],
    ],
  },
  exam: {
    text: 'You observe the exam.',
    f: [['Abdomen', 'Tender low on the right', 'abnormal'], ['Temperature', 'Normal', 'normal'], ['Heart rate', '112', 'high'], ['Rebound', 'Mild', 'note'], ['Pregnancy test', 'Negative', 'normal']],
    junior: ['What could be causing pain on the lower right side in a girl?', [
      ['Her appendix, or her right ovary', 'Right. Both sit on the lower right side.', true],
      ['Her heart', 'The heart is in the chest.'],
      ['Her left kidney', 'Wrong side.'],
    ]],
    senior: ['What should be at the top of your differential?', [
      ['Ovarian torsion and appendicitis; urgent pelvic ultrasound and surgical consult', 'Correct. Sudden pain with vomiting and no fever favors torsion.', true],
      ['Constipation', 'Doesn’t explain sudden severe pain with vomiting.'],
      ['Ectopic pregnancy', 'Her pregnancy test is negative.'],
    ]],
  },
  model: {
    junior: {
      layers: [['heavy', 'A cyst makes the ovary heavier', 'Normal cysts form each month.'], ['twist', 'The ovary twists', 'With a sudden movement.'], ['block', 'Blood flow is blocked', 'The ovary gets no oxygen.'], ['signs', 'Sudden pain and vomiting', 'The body’s alarm.']],
      clues: [['mid', 'Middle of her cycle', 'heavy', 'Cysts form mid-cycle.'], ['jump', 'Started during a jump', 'twist', 'Sudden movement can twist it.'], ['waves', 'Pain in waves', 'twist', 'Twisting and untwisting.'], ['vomit', 'Vomited three times', 'signs', 'Severe pain causes vomiting.'], ['nofever', 'No fever', 'signs', 'Torsion usually doesn’t cause fever early.']],
      wrap: 'A cyst made Olivia’s ovary heavy enough to twist during a jump, cutting off its blood supply.',
    },
    senior: {
      layers: [['mass', 'Adnexal enlargement (cyst or mass)', 'Lead point.'], ['rot', 'Rotation on the infundibulopelvic ligament', 'Intermittent or complete.'], ['isch', 'Venous then arterial compromise', 'Ischemia.'], ['clin', 'Acute pain, nausea, vomiting', 'Visceral and peritoneal irritation.']],
      clues: [['cyc', 'Mid-cycle timing', 'mass', 'Functional cyst.'], ['onset', 'Sudden onset with exertion', 'rot', 'Typical.'], ['inter', 'Intermittent pain', 'rot', 'Partial torsion-detorsion.'], ['tend', 'RLQ tenderness', 'isch', 'Ischemic ovary.'], ['nv', 'Vomiting', 'clin', 'Common with torsion.']],
      wrap: 'Your model predicts an enlarged ovary with a cyst; Doppler flow may still appear normal.',
    },
  },
  ddx: {
    junior: { options: [
      ['torsion', 'A twisted ovary', 'leading', 'Sudden pain in waves with vomiting and no fever.'],
      ['appendix', 'Appendicitis', 'cantmiss', 'Also on the lower right; usually with fever and pain that moves.'],
      ['cyst', 'A burst ovary cyst', 'possible', 'Can cause sudden pain.'],
      ['bug', 'A stomach bug', 'possible', 'Usually with diarrhea and pain all over.'],
      ['period', 'Period cramps', 'unlikely', 'She isn’t on her period and the pain is severe.'],
    ] },
    senior: { options: [
      ['torsion', 'Ovarian torsion', 'leading', 'Sudden intermittent pain with vomiting.'],
      ['appy', 'Appendicitis', 'cantmiss', 'Migration, anorexia, fever.'],
      ['cyst', 'Hemorrhagic or ruptured ovarian cyst', 'possible', 'Free fluid on ultrasound.'],
      ['ectopic', 'Ectopic pregnancy', 'possible', 'Excluded by negative hCG.'],
      ['stone', 'Kidney stone', 'possible', 'Colicky flank pain and hematuria.'],
      ['pid', 'Pelvic inflammatory disease', 'unlikely', 'Fever, discharge; unlikely at 13 without exposure.'],
    ] },
  },
  labs: { title: 'Tests', both: true, r: [
    ['Pelvic ultrasound', 'Right ovary enlarged (7 cm) with a cyst; reduced blood flow', '', 'Normal ovaries', 'abnormal'],
    ['Appendix on ultrasound', 'Normal', '', 'Normal', 'normal'],
    ['White blood cells', '11.2', 'K/µL', '4.5–13.5', 'normal'],
  ] },
  decision: {
    junior: ['What happened to Olivia?', [
      ['Her right ovary twisted', 'Exactly. A surgeon untwisted it with tiny cameras and saved it.', true],
      ['Appendicitis', 'Her appendix looks normal.'],
      ['A stomach bug', 'Her ultrasound shows a twisted ovary.'],
    ]],
    senior: ['Which explanation is best supported?', [
      ['Right ovarian torsion with a functional cyst; laparoscopic detorsion', 'Correct. Even a dusky ovary is usually preserved.', true],
      ['Appendicitis', 'Normal appendix.'],
      ['Ruptured cyst', 'The enlarged ovary with reduced flow indicates torsion.'],
    ]],
    wrap: 'In surgery, Olivia’s ovary is untwisted and turns pink. Surgeons preserve the ovary, which protects her future fertility.',
  },
  debrief: {
    science: 'Ovaries hang from ligaments that carry their blood supply. A heavy ovary can twist, like a testicle in torsion, and lose blood flow.',
    pearl: 'Normal blood flow on ultrasound doesn’t rule out ovarian torsion. Sudden pain with vomiting deserves urgent surgical evaluation.',
    uncertainty: 'Her gynecologist will monitor the cyst, which usually disappears on its own.',
    human: 'Olivia worried she had done something wrong at practice. Torsion isn’t anyone’s fault.',
    closing: 'Saving an ovary today protects choices tomorrow.',
  },
  founder: 'Teaching point: ovarian torsion parallels testicular torsion; ovary-sparing surgery. Pair the two cases.',
});

export const PCOS = makeCase({
  code: 'CASE-038', slug: 'priya-pcos', room: 'reproductive-health-clinic',
  title: 'Irregular', summary: 'Priya’s periods are rare, her acne is worse and she’s growing hair on her chin. Explore hormones, metabolism and self-image.',
  specialty: 'Adolescent Medicine & Endocrinology', system: R, minutes: [15, 25],
  patient: { name: 'Priya Shah', age: 16, concern: 'Irregular periods, acne and extra hair growth', interests: ['Robotics', 'Dance'] },
  art: 'a 16-year-old Indian-American teenage girl with long dark hair sitting in an adolescent medicine clinic, talking openly with a friendly physician, a laptop with a simple hormone diagram, warm private room, supportive mood',
  opening: {
    scene: 'Priya has had only four periods in the past year. Her acne is worse, she shaves dark hairs on her chin, and she has gained weight despite dancing.',
    dialogue: 'I feel like my body is doing its own thing. I’m embarrassed about my face.',
    narrator: 'Polycystic ovary syndrome is common, affecting about 1 in 10 people with ovaries. It involves hormones, metabolism and how someone feels about themselves.',
  },
  history: {
    min: 3,
    q: [
      ['When did your periods start, and how often do they come?', 'At 12. Now only every three or four months.', 'Irregular cycles more than two years after the first period are significant.'],
      ['Where are you noticing extra hair?', 'Chin, upper lip and belly.', 'Hirsutism suggests extra androgens (male-type hormones).'],
      ['Has your weight changed?', 'I gained 20 pounds in two years.', 'Insulin resistance is common in PCOS.'],
      ['Has anyone in your family had diabetes or PCOS?', 'My mom has PCOS and type 2 diabetes.', 'Strong family link.'],
      ['How do you feel about all this?', 'Honestly, kind of down about it.', 'PCOS can affect mood and self-esteem; always ask.'],
    ],
  },
  exam: {
    text: 'You observe the exam.',
    f: [['Skin', 'Acne on face and back', 'abnormal'], ['Hair', 'Coarse hair on chin and lower abdomen', 'abnormal'], ['Neck', 'Dark, velvety skin (acanthosis nigricans)', 'abnormal'], ['BMI', '29', 'high'], ['Blood pressure', '124/78', 'normal']],
    junior: ['What could connect Priya’s periods, acne and hair growth?', [
      ['A hormone imbalance', 'Right. Extra male-type hormones can cause all three.', true],
      ['Eating chocolate', 'Food doesn’t cause these together.'],
      ['Not washing her face', 'Acne isn’t about cleanliness, and doesn’t explain her periods.'],
    ]],
    senior: ['What does this pattern suggest?', [
      ['Polycystic ovary syndrome: ovulatory dysfunction with hyperandrogenism and insulin resistance', 'Correct. Rule out other causes with labs.', true],
      ['Pregnancy', 'Always test, but this has lasted years.'],
      ['Cushing syndrome', 'Would add easy bruising, purple stretch marks and muscle weakness.'],
    ]],
  },
  model: {
    junior: {
      layers: [['genes', 'Genes and insulin resistance', 'Runs in families.'], ['androgen', 'The ovaries make extra male-type hormones', 'Androgens.'], ['ovulate', 'Eggs aren’t released regularly', 'Periods become rare.'], ['signs', 'Acne, hair growth and irregular periods', 'What she notices.']],
      clues: [['mom', 'Mom has PCOS and diabetes', 'genes', 'Family link.'], ['neck', 'Dark velvety neck skin', 'genes', 'A sign of insulin resistance.'], ['rare', 'Only four periods a year', 'ovulate', 'Not ovulating regularly.'], ['acne', 'Worse acne', 'signs', 'Androgens boost oil.'], ['chin', 'Hair on chin and lip', 'signs', 'Androgens grow coarse hair.']],
      wrap: 'Insulin resistance and family genes pushed Priya’s ovaries to make extra androgens, which disrupted her periods and caused acne and hair growth.',
    },
    senior: {
      layers: [['ir', 'Insulin resistance and genetic predisposition', 'Hyperinsulinemia.'], ['hyper', 'Ovarian hyperandrogenism', 'Insulin and LH stimulate theca cells.'], ['anov', 'Chronic anovulation', 'Follicles arrest.'], ['clin', 'Hirsutism, acne, oligomenorrhea, metabolic risk', 'Phenotype.']],
      clues: [['fh', 'Maternal PCOS and type 2 diabetes', 'ir', 'Heritability.'], ['an', 'Acanthosis nigricans', 'ir', 'Hyperinsulinemia.'], ['wt', 'Weight gain', 'ir', 'Worsens insulin resistance.'], ['oligo', 'Oligomenorrhea', 'anov', 'Anovulation.'], ['hirs', 'Hirsutism', 'clin', 'Androgen excess.'], ['acne', 'Acne', 'clin', 'Androgen excess.']],
      wrap: 'Your model predicts high testosterone, normal thyroid and prolactin, and an A1c in the prediabetes range.',
    },
  },
  ddx: {
    junior: { options: [
      ['pcos', 'Polycystic ovary syndrome (PCOS)', 'leading', 'Rare periods, acne, extra hair and family history.'],
      ['thyroid', 'A thyroid problem', 'possible', 'Can change periods; doctors check.'],
      ['pregnancy', 'Pregnancy', 'possible', 'Always checked when periods change.'],
      ['stress', 'Stress', 'possible', 'Can delay periods, but doesn’t cause hair growth.'],
      ['normal', 'Normal teenage changes', 'unlikely', 'This pattern deserves a check-up.'],
    ] },
    senior: { options: [
      ['pcos', 'Polycystic ovary syndrome', 'leading', 'Oligomenorrhea plus hyperandrogenism.'],
      ['thyroid', 'Thyroid disease', 'possible', 'Check TSH.'],
      ['prl', 'Hyperprolactinemia', 'possible', 'Check prolactin; galactorrhea.'],
      ['ncah', 'Nonclassic congenital adrenal hyperplasia', 'possible', 'Check 17-hydroxyprogesterone.'],
      ['tumor', 'Androgen-secreting tumor', 'cantmiss', 'Rapid virilization, very high testosterone.'],
      ['preg', 'Pregnancy', 'possible', 'Always test.'],
    ] },
  },
  labs: { r: [
    ['Total testosterone', '78', 'ng/dL', '< 50 (adolescent female)', 'high'],
    ['TSH', '1.9', 'mIU/L', '0.5–4.5', 'normal'],
    ['Prolactin', '11', 'ng/mL', '< 25', 'normal'],
    ['17-hydroxyprogesterone', '80', 'ng/dL', '< 200', 'normal'],
    ['Hemoglobin A1c', '5.9', '%', '< 5.7', 'high'],
    ['Pregnancy test', 'Negative', '', 'Negative', 'normal'],
  ] },
  decision: {
    junior: ['What does Priya have?', [
      ['PCOS, a common hormone condition', 'Exactly. It’s very treatable, and she’s not alone.', true],
      ['A thyroid problem', 'Her thyroid test is normal.'],
      ['Nothing; it’s normal', 'Her hormones are out of balance.'],
    ]],
    senior: ['Which explanation is best supported?', [
      ['Polycystic ovary syndrome with prediabetes', 'Correct. Treatment: lifestyle support, combined hormonal contraception for cycles and androgen symptoms, metformin for insulin resistance, and mental health support.', true],
      ['Nonclassic CAH', '17-OHP is normal.'],
      ['Androgen-secreting tumor', 'Testosterone is only mildly raised without rapid virilization.'],
    ]],
    wrap: 'Priya starts a birth control pill to regulate her cycles and reduce acne and hair growth, plus metformin. She meets a dietitian and a counselor, and joins an online support group for teens with PCOS.',
  },
  debrief: {
    science: 'In PCOS, insulin resistance and hormone signals push the ovaries to make extra androgens. Eggs don’t mature and release regularly, so periods become rare, while androgens cause acne and hair growth.',
    pearl: 'Irregular periods more than two years after periods begin, with acne or extra hair, deserve evaluation. PCOS raises the risk of diabetes, so screening matters.',
    uncertainty: 'Many people with PCOS can become pregnant, sometimes with help.',
    human: 'Priya felt ashamed of her skin and hair. Addressing self-image is part of treating PCOS.',
    closing: 'Treating the whole person means caring for how they feel, not only their numbers.',
  },
  founder: 'Teaching point: PCOS diagnosis in adolescents; metabolic risk; mental health and body image.',
});

export const ENDOMETRIOSIS = makeCase({
  code: 'CASE-039', slug: 'grace-endo', room: 'reproductive-health-clinic',
  title: 'Not Just Bad Cramps', summary: 'Grace misses school every month because of period pain. Learn why severe pain deserves answers.',
  specialty: 'Adolescent Gynecology', system: R, minutes: [15, 25],
  patient: { name: 'Grace Okonkwo', age: 17, concern: 'Severe period pain causing missed school', interests: ['Debate team', 'Painting'] },
  art: 'a 17-year-old Nigerian-American teenage girl sitting on an exam room chair with a heating pad on her lower belly, talking with a compassionate female gynecologist who is listening carefully, a calendar with marked days on the desk, soft warm light',
  opening: {
    scene: 'Since age 14, Grace has missed two or three days of school each month because of period pain. Ibuprofen and birth control pills haven’t helped enough. She was told it’s “just cramps.”',
    dialogue: 'People keep saying everyone has cramps. But I can’t get out of bed.',
    narrator: 'Pain that stops someone from going to school or work is not normal. Endometriosis often takes years to diagnose because pain is dismissed.',
  },
  history: {
    min: 3,
    q: [
      ['How bad is the pain on a scale of 0 to 10?', 'Nine. I throw up sometimes.', 'Severe pain.'],
      ['Does it hurt at other times too?', 'Sometimes between periods, and when I poop during my period.', 'Pain with bowel movements suggests endometriosis near the bowel.'],
      ['What have you tried?', 'Ibuprofen and the pill for a year.', 'Pain despite first-line treatment is a red flag.'],
      ['Does anyone in your family have endometriosis?', 'My mom does.', 'A family history increases risk.'],
      ['How is this affecting you?', 'I’m falling behind and I feel like no one believes me.', 'Impact on life matters.'],
    ],
  },
  exam: {
    text: 'You observe the exam.',
    f: [['Abdomen', 'Mild lower tenderness', 'note'], ['General', 'Well-appearing between periods', 'normal'], ['Pelvic ultrasound', 'Normal', 'normal'], ['Pregnancy test', 'Negative', 'normal'], ['Vital signs', 'Normal', 'normal']],
    junior: ['Her ultrasound is normal. Does that mean nothing is wrong?', [
      ['No. Some conditions, like endometriosis, often don’t show up on ultrasound', 'Right. Normal tests don’t mean normal pain.', true],
      ['Yes, she’s fine', 'Her symptoms are real even if the ultrasound is normal.'],
      ['Yes, she’s exaggerating', 'Never assume someone is exaggerating pain.'],
    ]],
    senior: ['What is the most likely explanation?', [
      ['Probable endometriosis: severe dysmenorrhea refractory to NSAIDs and hormones, dyschezia, family history', 'Correct. A normal ultrasound is common in early endometriosis.', true],
      ['Primary dysmenorrhea', 'Usually responds to NSAIDs and hormones.'],
      ['Irritable bowel syndrome', 'May coexist, but cyclic pain points to endometriosis.'],
    ]],
  },
  model: {
    junior: {
      layers: [['tissue', 'Tissue like the uterus lining grows outside the uterus', 'In the pelvis.'], ['bleed', 'It reacts to each period', 'Swells and bleeds.'], ['inflame', 'It causes inflammation', 'Irritates nearby nerves.'], ['pain', 'Severe pain', 'During periods and more.']],
      clues: [['mom', 'Mom has endometriosis', 'tissue', 'Runs in families.'], ['monthly', 'Pain every period', 'bleed', 'The tissue responds to hormones.'], ['poop', 'Pain with bowel movements', 'inflame', 'Tissue near the bowel.'], ['between', 'Pain between periods too', 'inflame', 'Ongoing inflammation.'], ['missed', 'Misses school', 'pain', 'Real impact.']],
      wrap: 'Tissue like the uterus lining grows in Grace’s pelvis. It bleeds and inflames every month, causing real, severe pain.',
    },
    senior: {
      layers: [['ectopic', 'Ectopic endometrial-like tissue', 'Retrograde menstruation and other mechanisms.'], ['horm', 'Estrogen-dependent cyclic activity', 'Bleeding and proliferation.'], ['infl', 'Inflammation and nerve sensitization', 'Prostaglandins, neuroangiogenesis.'], ['pain', 'Dysmenorrhea, chronic pelvic pain, dyschezia', 'Clinical picture.']],
      clues: [['fh', 'Maternal endometriosis', 'ectopic', 'Genetic predisposition.'], ['cyc', 'Cyclic severe pain', 'horm', 'Hormone-responsive.'], ['refr', 'Refractory to NSAIDs and pills', 'infl', 'Suggests secondary dysmenorrhea.'], ['dysch', 'Pain with bowel movements', 'pain', 'Posterior cul-de-sac involvement.'], ['acyc', 'Non-cyclic pain', 'infl', 'Central sensitization.']],
      wrap: 'Your model predicts normal imaging and a diagnosis confirmed at laparoscopy or treated empirically.',
    },
  },
  ddx: {
    junior: { options: [
      ['endo', 'Endometriosis', 'leading', 'Severe pain every month that medicine doesn’t fix, and her mom has it.'],
      ['cramps', 'Regular period cramps', 'possible', 'Common, but usually helped by ibuprofen.'],
      ['cyst', 'An ovary cyst', 'possible', 'Her ultrasound is normal.'],
      ['bowel', 'A bowel problem', 'possible', 'Can cause belly pain.'],
      ['faking', 'Faking it', 'unlikely', 'Pain is real. Always believe patients.'],
    ] },
    senior: { options: [
      ['endo', 'Endometriosis', 'leading', 'Refractory dysmenorrhea, dyschezia, family history.'],
      ['primary', 'Primary dysmenorrhea', 'possible', 'Should respond to first-line therapy.'],
      ['obstr', 'Obstructive Müllerian anomaly', 'cantmiss', 'Can cause severe cyclic pain from blocked menstrual flow; imaging checks.'],
      ['pid', 'Pelvic inflammatory disease', 'possible', 'Fever and discharge.'],
      ['ibs', 'Irritable bowel syndrome', 'possible', 'Can coexist.'],
      ['adeno', 'Adenomyosis', 'possible', 'More common in older patients.'],
    ] },
  },
  labs: { r: [
    ['Pelvic ultrasound', 'Normal uterus and ovaries', '', 'Normal', 'normal'],
    ['Pregnancy test', 'Negative', '', 'Negative', 'normal'],
    ['STI testing', 'Negative', '', 'Negative', 'normal'],
    ['Diagnostic laparoscopy (later)', 'Endometriosis implants in the pelvis', '', 'Normal', 'note'],
  ] },
  decision: {
    junior: ['What is causing Grace’s pain?', [
      ['Endometriosis', 'Exactly. With the right treatment, she can get her life back.', true],
      ['Regular cramps', 'Hers are much more severe and don’t respond to usual treatment.'],
      ['She is exaggerating', 'Her surgery found endometriosis.'],
    ]],
    senior: ['Which explanation is best supported?', [
      ['Endometriosis; continuous hormonal suppression, pain management and gynecology follow-up', 'Correct. Laparoscopy confirmed and treated implants.', true],
      ['Primary dysmenorrhea', 'Laparoscopy showed implants.'],
      ['Obstructive anomaly', 'Imaging was normal.'],
    ]],
    wrap: 'Grace switches to continuous hormonal therapy to stop her periods, and her pain improves. She gets a school plan for flare days and starts pelvic floor physical therapy.',
  },
  debrief: {
    science: 'In endometriosis, tissue similar to the uterus lining grows outside the uterus. It responds to monthly hormones, causing inflammation, scarring and pain.',
    pearl: 'Period pain that causes missed school or work, or doesn’t improve with ibuprofen or birth control, deserves evaluation.',
    uncertainty: 'Endometriosis is chronic, but treatments can control symptoms well, and many people with endometriosis have children.',
    human: 'It takes an average of several years to diagnose endometriosis, often because pain is dismissed. Believing patients shortens that time.',
    closing: 'Taking pain seriously is a form of respect.',
  },
  founder: 'Teaching point: dysmenorrhea that limits life is not normal; diagnostic delay; pain dismissal. Normalize talking about periods.',
});

export const PID = makeCase({
  code: 'CASE-040', slug: 'brianna-pid', room: 'reproductive-health-clinic', seniorOnly: true,
  advisory: 'This senior case discusses a sexually transmitted infection and confidential care for adolescents and young adults.',
  title: 'A Hidden Infection', summary: 'Brianna has lower belly pain and a fever. Treat an infection that threatens future fertility, with confidentiality and respect.',
  specialty: 'Gynecology & Infectious Disease', system: R, minutes: [20, 30],
  patient: { name: 'Brianna Lee', age: 19, concern: 'Lower abdominal pain and fever' },
  art: 'a 19-year-old Korean-American young woman sitting fully clothed on an exam table in a private clinic room, talking openly with a nurse practitioner who is listening with a supportive expression, a privacy curtain, calm respectful mood',
  opening: {
    scene: 'Brianna, a college student, has had pain low in her belly on both sides for three days, with a fever and unusual vaginal discharge.',
    dialogue: 'Is this going to stay between us? I don’t want my parents to know.',
    narrator: 'Pelvic inflammatory disease is an infection of the uterus, tubes and ovaries, usually from sexually transmitted bacteria. Confidential, nonjudgmental care helps people seek treatment.',
    narratorRole: 'Nurse practitioner',
  },
  history: {
    min: 3,
    q: [
      ['Is this conversation private?', 'Yes. We keep this confidential, with a few safety exceptions.', 'Confidentiality builds trust.', 'Nurse practitioner'],
      ['When did the pain start?', 'Three days ago, after my period.', 'PID often starts shortly after menses.'],
      ['Have you had a new partner, and do you use condoms?', 'A new partner two months ago. Not always condoms.', 'A key risk.'],
      ['Any fever or vomiting?', 'Fever, no vomiting.', 'Systemic signs.'],
      ['When was your last period?', 'Ten days ago.', 'Ectopic pregnancy must still be ruled out.'],
    ],
  },
  exam: {
    text: 'The nurse practitioner examines Brianna with a chaperone present.',
    f: [['Temperature', '38.4 °C (101.1 °F)', 'high'], ['Lower abdomen', 'Tender on both sides', 'abnormal'], ['Pelvic exam', 'Cervical motion tenderness; adnexal tenderness', 'abnormal'], ['Discharge', 'Abnormal', 'abnormal'], ['Right upper abdomen', 'Not tender', 'normal']],
    senior: ['What is the working diagnosis?', [
      ['Pelvic inflammatory disease', 'Correct. Cervical motion, uterine or adnexal tenderness in a sexually active young woman meets criteria to treat.', true],
      ['Appendicitis', 'Bilateral pain and pelvic findings favor PID; always consider.'],
      ['Urinary tract infection', 'Doesn’t cause cervical motion tenderness.'],
    ]],
  },
  model: {
    senior: {
      layers: [['acq', 'Sexually transmitted infection of the cervix', 'Chlamydia or gonorrhea.'], ['asc', 'Ascending infection', 'Into uterus, tubes and ovaries.'], ['infl', 'Inflammation and scarring', 'Tubal damage.'], ['risk', 'Long-term risks', 'Infertility, ectopic pregnancy, chronic pain.']],
      clues: [['new', 'New partner, inconsistent condom use', 'acq', 'Exposure.'], ['disc', 'Abnormal discharge', 'acq', 'Cervicitis.'], ['menses', 'Started after her period', 'asc', 'Menses facilitates ascent.'], ['cmt', 'Cervical motion and adnexal tenderness', 'infl', 'Upper tract inflammation.'], ['fever', 'Fever', 'infl', 'Systemic response.']],
      wrap: 'Your model predicts a positive chlamydia or gonorrhea test and a negative pregnancy test.',
    },
  },
  ddx: {
    senior: { options: [
      ['pid', 'Pelvic inflammatory disease', 'leading', 'Classic findings.'],
      ['ectopic', 'Ectopic pregnancy', 'cantmiss', 'Always check a pregnancy test.'],
      ['appy', 'Appendicitis', 'cantmiss', 'Right-sided migratory pain.'],
      ['toa', 'Tubo-ovarian abscess', 'possible', 'A complication; ultrasound checks.'],
      ['torsion', 'Ovarian torsion', 'possible', 'Sudden unilateral pain.'],
      ['uti', 'Urinary tract infection', 'possible', 'Dysuria; no pelvic organ tenderness.'],
    ] },
  },
  labs: { r: [
    ['Pregnancy test', 'Negative', '', 'Negative', 'normal'],
    ['Chlamydia NAAT', 'Positive', '', 'Negative', 'high'],
    ['Gonorrhea NAAT', 'Negative', '', 'Negative', 'normal'],
    ['White blood cells', '13.1', 'K/µL', '4.5–11.0', 'high'],
    ['Pelvic ultrasound', 'No abscess', '', 'Normal', 'normal'],
    ['HIV and syphilis screening', 'Negative', '', 'Negative', 'normal'],
  ] },
  decision: {
    senior: ['Which explanation is best supported?', [
      ['Chlamydial PID; ceftriaxone, doxycycline and metronidazole for 14 days; partner treatment', 'Correct. Recheck in 72 hours, retest in 3 months.', true],
      ['Tubo-ovarian abscess', 'No abscess on ultrasound.'],
      ['Ectopic pregnancy', 'Pregnancy test is negative.'],
    ]],
    wrap: 'Brianna improves within three days. Her partner is treated too. She leaves with information about condoms, regular STI testing and the HPV vaccine.',
  },
  debrief: {
    science: 'Bacteria from a sexually transmitted infection can travel from the cervix up into the uterus and fallopian tubes. Inflammation can scar the tubes, raising the risk of infertility and ectopic pregnancy.',
    pearl: 'Many STIs cause no symptoms. Regular testing for sexually active young people and condom use prevent PID. Treat on clinical suspicion.',
    uncertainty: 'One episode of PID raises the risk of future fertility problems, which is why early treatment matters.',
    human: 'Brianna asked first about privacy. Confidential care and a nonjudgmental tone help young people come in early.',
    closing: 'Respect is preventive medicine.',
  },
  founder: 'Teaching point: PID criteria and treatment, confidential adolescent care, link to ectopic pregnancy. Senior track only.',
});

export const TURNER = makeCase({
  code: 'CASE-041', slug: 'emma-turner', room: 'reproductive-health-clinic',
  title: 'Still Waiting to Grow', summary: 'Emma is 14, the shortest in her class, and hasn’t started puberty. Find the chromosome clue.',
  specialty: 'Pediatric Endocrinology & Genetics', system: R, minutes: [15, 25],
  patient: { name: 'Emma Clarke', age: 14, concern: 'Short stature and no signs of puberty', interests: ['Soccer', 'Writing stories'] },
  art: 'a petite 14-year-old white girl with brown hair standing against a height measuring board in a pediatric endocrinology clinic, a pediatric endocrinologist smiling and reading the measurement, her mother nearby, bright cheerful room',
  opening: {
    scene: 'Emma is 14. She’s the shortest girl in her grade and hasn’t had any breast development or periods. Her friends have all started puberty.',
    dialogue: 'Everyone keeps asking if I’m in sixth grade.',
    narrator: 'Short stature with delayed puberty in a girl can have many causes. One is a difference in the chromosomes.',
  },
  history: {
    min: 3,
    q: [
      ['How tall are your parents?', 'Mom is 5’6” and dad is 6’0”.', 'Emma is much shorter than expected for her family.', 'Emma’s mom'],
      ['Was anything noticed when she was a baby?', 'Her hands and feet were puffy at birth.', 'Puffy hands and feet in a newborn girl is a clue to Turner syndrome.', 'Emma’s mom'],
      ['Has she had ear infections or hearing trouble?', 'Lots of ear infections. She had tubes.', 'Common in Turner syndrome.', 'Emma’s mom'],
      ['Any breast development?', 'No.', 'No puberty by 13 in girls is delayed.'],
      ['How is school?', 'Good, but math is hard.', 'Some girls with Turner syndrome find spatial math harder.'],
    ],
  },
  exam: {
    text: 'You observe the exam.',
    f: [['Height', 'Below the 3rd percentile', 'low'], ['Puberty stage', 'Tanner 1 (no development)', 'abnormal'], ['Neck', 'Mild webbing; low hairline at the back', 'abnormal'], ['Chest', 'Broad, widely spaced nipples', 'abnormal'], ['Blood pressure', 'Arm 132/80, leg 118/70', 'note']],
    junior: ['What do Emma’s features suggest?', [
      ['A genetic condition affecting growth and puberty', 'Right. Several features together point to a condition present from birth.', true],
      ['She just needs to eat more', 'Nutrition matters, but these features suggest something else.'],
      ['She will definitely catch up', 'Some children are late bloomers, but her features suggest a specific cause.'],
    ]],
    senior: ['What should you suspect and test?', [
      ['Turner syndrome; karyotype, FSH/LH and estradiol', 'Correct. Short stature, absent puberty, webbed neck and history of lymphedema.', true],
      ['Constitutional delay', 'Delay usually comes with a family history and normal features.'],
      ['Growth hormone deficiency alone', 'Doesn’t explain absent puberty and dysmorphic features.'],
    ]],
  },
  model: {
    junior: {
      layers: [['chrom', 'One X chromosome is missing', 'From before birth.'], ['growth', 'Genes for growth are affected', 'Shorter height.'], ['ovary', 'The ovaries don’t develop fully', 'Fewer hormones.'], ['signs', 'Short stature and no puberty', 'What we see.']],
      clues: [['puffy', 'Puffy hands and feet at birth', 'chrom', 'An early sign.'], ['neck', 'Webbed neck', 'chrom', 'From fluid before birth.'], ['short', 'Shortest in her grade', 'growth', 'A growth gene is on the X chromosome.'], ['nopub', 'No breast development', 'ovary', 'Ovaries aren’t making estrogen.'], ['ears', 'Many ear infections', 'signs', 'Ear shape changes.']],
      wrap: 'Emma is missing part or all of one X chromosome. That affects her height and her ovaries, so she hasn’t started puberty.',
    },
    senior: {
      layers: [['karyo', 'Monosomy X (45,X) or mosaicism', 'Chromosomal.'], ['shox', 'SHOX haploinsufficiency', 'Short stature, skeletal features.'], ['ovary', 'Gonadal dysgenesis', 'Accelerated oocyte loss.'], ['lymph', 'Lymphatic and cardiac anomalies', 'Prenatal lymphedema, left-sided heart lesions.']],
      clues: [['ht', 'Height below 3rd percentile', 'shox', 'SHOX loss.'], ['chest', 'Broad chest', 'shox', 'Skeletal feature.'], ['tanner', 'Tanner 1 at 14', 'ovary', 'Primary ovarian insufficiency.'], ['web', 'Webbed neck, low hairline', 'lymph', 'Prenatal cystic hygroma.'], ['bp', 'Arm BP higher than leg', 'lymph', 'Suggests coarctation of the aorta.']],
      wrap: 'Your model predicts a 45,X karyotype, high FSH and LH, low estradiol, and possibly cardiac and kidney findings.',
    },
  },
  ddx: {
    junior: { options: [
      ['turner', 'Turner syndrome', 'leading', 'Short, no puberty, webbed neck, puffy hands at birth.'],
      ['late', 'A late bloomer', 'possible', 'Common, but doesn’t explain her other features.'],
      ['thyroid', 'A thyroid problem', 'possible', 'Can slow growth; doctors check.'],
      ['celiac', 'Celiac disease', 'possible', 'Can slow growth.'],
      ['food', 'Not eating enough', 'unlikely', 'Her features point elsewhere.'],
    ] },
    senior: { options: [
      ['turner', 'Turner syndrome', 'leading', 'Classic features.'],
      ['cdgp', 'Constitutional delay of growth and puberty', 'possible', 'FSH and LH would be low, not high.'],
      ['ghd', 'Growth hormone deficiency', 'possible', 'Doesn’t explain ovarian failure.'],
      ['hypothy', 'Hypothyroidism', 'possible', 'Check TSH.'],
      ['celiac', 'Celiac disease', 'possible', 'Screen in all short children.'],
      ['coarct', 'Coarctation of the aorta', 'cantmiss', 'Associated lesion; arm-leg BP difference.'],
    ] },
  },
  labs: { r: [
    ['Karyotype', '45,X', '', '46,XX', 'abnormal'],
    ['FSH', '85', 'mIU/mL', 'Pubertal range varies', 'high'],
    ['Estradiol', '< 10', 'pg/mL', 'Rises in puberty', 'low'],
    ['TSH', '2.0', 'mIU/L', '0.5–4.5', 'normal'],
    ['Echocardiogram', 'Bicuspid aortic valve; mild coarctation', '', 'Normal', 'abnormal'],
    ['Kidney ultrasound', 'Horseshoe kidney', '', 'Normal', 'note'],
  ] },
  decision: {
    junior: ['What does Emma have?', [
      ['Turner syndrome', 'Exactly. Medicines can help her grow and start puberty.', true],
      ['She’s just a late bloomer', 'Her chromosome test shows Turner syndrome.'],
      ['A thyroid problem', 'Her thyroid is normal.'],
    ]],
    senior: ['Which explanation is best supported?', [
      ['Turner syndrome (45,X) with bicuspid aortic valve, coarctation and horseshoe kidney', 'Correct. Growth hormone, estrogen to induce puberty, and cardiology care.', true],
      ['Constitutional delay', 'High FSH means primary ovarian insufficiency.'],
      ['Isolated coarctation', 'The karyotype explains the whole picture.'],
    ]],
    wrap: 'Emma starts growth hormone and, later, low-dose estrogen to begin puberty. Cardiology plans repair of her coarctation. She meets other girls through a Turner syndrome support network.',
  },
  debrief: {
    science: 'Turner syndrome happens when a girl is missing all or part of one X chromosome. Genes on the X chromosome affect height, ovary development, the heart and kidneys.',
    pearl: 'Every short girl without a clear cause should be considered for Turner syndrome. Early diagnosis allows growth hormone, heart care and planned puberty.',
    uncertainty: 'Fertility options exist, including future reproductive technology. Her team will discuss them over time.',
    human: 'Emma was tired of being mistaken for a younger kid. Diagnosis gave her an explanation and a community.',
    closing: 'A single chromosome can shape a life; good care helps it flourish.',
  },
  founder: 'Teaching point: short stature evaluation in girls; Turner associations (heart, kidney, hearing); hypergonadotropic hypogonadism.',
});
