import { makeCase } from './kit';

// Body-system cases, part B. Values are illustrative teaching values.

export const CONCUSSION = makeCase({
  code: 'CASE-026', slug: 'chris-concussion', room: 'sports-medicine-clinic',
  title: 'Back in the Game?', summary: 'Chris took a hard hit in football and wants to go back in. Decide what’s safe, and why the brain needs time.',
  specialty: 'Sports Medicine', system: 'Brain & Nerves', minutes: [15, 25],
  patient: { name: 'Chris Taylor', age: 15, concern: 'Headache and dizziness after a tackle', interests: ['Football', 'Video editing'] },
  art: 'a 15-year-old white teenage football player sitting on the sideline bench holding his helmet, looking dazed, an athletic trainer kneeling and shining a penlight in his eyes, stadium lights and a blurred game in the background, evening',
  opening: {
    scene: 'During the third quarter, Chris makes a helmet-to-helmet tackle. He stands up slowly, looks confused and walks to the wrong sideline. Now he says he’s fine and wants to go back in.',
    dialogue: 'I’m good, Coach. Just a little headache. Put me back in.',
    narrator: 'A concussion is a brain injury you can’t see on the outside. When in doubt, sit them out.',
    narratorRole: 'Team physician',
  },
  history: {
    min: 3,
    q: [
      ['Did you black out?', 'I don’t think so. I don’t remember walking off the field, though.', 'Memory gaps are a concussion sign, even without passing out.'],
      ['How does your head feel?', 'Pounding. And the lights are really bright.', 'Headache and light sensitivity are common concussion symptoms.'],
      ['Do you feel sick to your stomach?', 'A little.', 'Nausea is common; repeated vomiting is a red flag.'],
      ['Do you feel foggy or slowed down?', 'Kind of like I’m in a dream.', 'Feeling foggy is a cognitive symptom.'],
      ['Have you had a concussion before?', 'One last season.', 'Prior concussions can mean a slower recovery.'],
      ['Does your neck hurt?', 'No.', 'Neck pain after a hit requires protecting the spine.'],
    ],
  },
  exam: {
    text: 'The athletic trainer and physician examine Chris on the sideline.',
    f: [['Alertness', 'Awake, answers slowly', 'note'], ['Memory', 'Can’t remember the score or the previous play', 'abnormal'], ['Balance', 'Wobbles standing on one foot', 'abnormal'], ['Pupils', 'Equal and reactive', 'normal'], ['Strength and feeling', 'Normal', 'normal'], ['Neck', 'No tenderness', 'normal']],
    junior: ['Should Chris go back into the game?', [
      ['No. He has signs of a concussion, so he’s out for the rest of the day', 'Right. When in doubt, sit them out. A second hit before the brain heals can be dangerous.', true],
      ['Yes, he says he’s fine', 'Athletes often say they’re fine. His memory and balance tell a different story.'],
      ['Yes, after a 15-minute break', 'Concussions need days, not minutes.'],
    ]],
    senior: ['How do you interpret the sideline evaluation?', [
      ['Sport-related concussion without red flags; no same-day return to play', 'Correct. Altered memory, balance and symptoms after a hit. Normal neurologic exam without red flags.', true],
      ['No concussion because he didn’t lose consciousness', 'Most concussions occur without loss of consciousness.'],
      ['Intracranial hemorrhage requiring immediate CT', 'No red flags now, but he must be watched for worsening.'],
    ]],
  },
  act: {
    title: 'Sideline steps',
    junior: {
      prompt: 'Put the sideline steps in order.',
      steps: [['Take him out of the game', 'Never play with a possible concussion.'], ['Check for danger signs', 'Like a headache that gets worse, vomiting, weakness or confusion that gets worse.'], ['Don’t leave him alone', 'Someone should watch him for the next few hours.'], ['No more sports today', 'His brain needs time to heal.'], ['See a doctor before returning to play', 'Return happens step by step.']],
      distractors: [['Let him play if he says he feels better', 'Feeling better isn’t the same as being healed.'], ['Keep him awake all night', 'An old myth. Rest and sleep help the brain heal; just check on him.']],
    },
    senior: {
      prompt: 'Order the concussion response.',
      steps: [['Remove from play immediately', 'No same-day return.'], ['Assess for red flags and cervical spine injury', 'Escalate to emergency care if present.'], ['Perform a structured assessment (SCAT6)', 'Symptoms, cognition, balance.'], ['Monitor for deterioration over the next hours', 'Never leave alone.'], ['Relative rest for 24–48 hours, then light activity as tolerated', 'Early light activity can speed recovery.'], ['Graduated return to learn, then return to play after medical clearance', 'Each step at least 24 hours without symptoms.']],
      distractors: [['Order a head CT for every concussion', 'Not needed without red flags; CT doesn’t show concussion.'], ['Complete dark-room rest for two weeks', 'Prolonged strict rest can slow recovery.']],
    },
  },
  model: {
    junior: {
      layers: [['hit', 'A hard hit shakes the brain', 'The brain moves inside the skull.'], ['stretch', 'Brain cells get stretched', 'They can’t send messages normally.'], ['energy', 'The brain runs low on energy', 'It needs time to recover.'], ['signs', 'Headache, fog, memory and balance trouble', 'What we see.']],
      clues: [['helmet', 'Helmet-to-helmet tackle', 'hit', 'A big force on the head.'], ['memory', 'Can’t remember walking off', 'stretch', 'Memory messages were disrupted.'], ['foggy', 'Feels foggy', 'energy', 'A tired brain thinks slowly.'], ['light', 'Bright lights hurt', 'signs', 'An injured brain is sensitive to light.'], ['balance', 'Wobbly on one foot', 'signs', 'Balance centers are affected.'], ['head', 'Pounding headache', 'signs', 'The most common symptom.']],
      wrap: 'The tackle shook Chris’s brain inside his skull. His brain cells were stretched and running low on energy, which caused his headache, fog and balance trouble.',
    },
    senior: {
      layers: [['force', 'Rotational and linear acceleration forces', 'Biomechanical injury.'], ['axon', 'Axonal stretch and ionic flux', 'Potassium efflux, calcium influx.'], ['crisis', 'Neurometabolic crisis', 'Energy demand exceeds supply.'], ['sx', 'Functional disturbance', 'Symptoms without structural injury on CT.']],
      clues: [['h2h', 'Helmet-to-helmet impact', 'force', 'High acceleration.'], ['amnesia', 'Anterograde amnesia', 'axon', 'Disrupted neural transmission.'], ['fog', 'Mental fogginess', 'crisis', 'Cognitive symptoms from energy mismatch.'], ['photo', 'Photophobia and headache', 'sx', 'Common somatic symptoms.'], ['bal', 'Balance errors', 'sx', 'Vestibular and cerebellar dysfunction.'], ['prior', 'Prior concussion', 'crisis', 'Risk factor for prolonged recovery.']],
      wrap: 'Your model predicts a high symptom score with a normal neurologic exam, and gradual recovery over days to weeks.',
    },
  },
  ddx: {
    junior: { options: [
      ['conc', 'A concussion', 'leading', 'A hard hit, memory gaps, headache, foggy feeling and balance trouble.'],
      ['bleed', 'Bleeding in the brain', 'cantmiss', 'Rare but serious. A worsening headache, vomiting or sleepiness would mean go to the hospital.'],
      ['neck', 'A neck injury', 'cantmiss', 'Always check the neck after a hit. His neck is fine.'],
      ['heat', 'Too hot or dehydrated', 'possible', 'Can cause headache and dizziness, but not memory gaps after a hit.'],
      ['fine', 'He’s fine', 'unlikely', 'His symptoms show his brain was injured.'],
    ] },
    senior: { options: [
      ['conc', 'Sport-related concussion', 'leading', 'Mechanism plus symptoms, amnesia and balance deficits.'],
      ['edh', 'Epidural or subdural hematoma', 'cantmiss', 'Worsening headache, vomiting, declining consciousness or focal deficits require emergency imaging.'],
      ['cspine', 'Cervical spine injury', 'cantmiss', 'Assessed before moving; no tenderness or deficits.'],
      ['heat', 'Exertional heat illness', 'possible', 'Consider in hot conditions.'],
      ['mig', 'Post-traumatic migraine', 'possible', 'A concussion subtype with migraine features.'],
      ['sis', 'Second impact syndrome', 'cantmiss', 'Rare, catastrophic brain swelling from a second hit before recovery; the reason for no same-day return.'],
    ] },
  },
  labs: { title: 'Assessment tools', r: [
    ['SCAT6 symptom severity', '32', 'of 132', '0 at baseline', 'high'],
    ['Balance errors (modified BESS)', '9', 'errors', '0–3 at baseline', 'high'],
    ['Delayed word recall', '2', 'of 10', '7 at baseline', 'low'],
    ['Head CT', 'Not indicated (no red flags)', '', '—', 'note'],
  ] },
  decision: {
    junior: ['Look back at your differential. What happened to Chris?', [
      ['He has a concussion and needs time and a step-by-step plan before playing again', 'Exactly. Most teens recover within a few weeks.', true],
      ['Nothing; he can play', 'His tests show his brain needs time to heal.'],
      ['He was just tired', 'The hit caused a brain injury.'],
    ]],
    senior: ['Which explanation is best supported?', [
      ['Sport-related concussion; graduated return to learn and play after symptom resolution and clearance', 'Correct. Most adolescents recover within four weeks.', true],
      ['Structural brain injury', 'No red flags; normal neurologic exam.'],
      ['No injury', 'Symptom, balance and memory scores are well below his baseline.'],
    ]],
    wrap: 'Chris rests for two days, then returns to school with shorter days. After two weeks without symptoms, he works through return-to-play steps and is cleared after seven more days.',
  },
  debrief: {
    science: 'A hit can shake the brain inside the skull, stretching brain cells. They temporarily can’t send signals normally and need more energy than they have. Scans usually look normal because the injury is in how cells work, not their structure.',
    pearl: 'When in doubt, sit them out. Danger signs that need an emergency room: a headache that gets worse, repeated vomiting, seizures, weakness, slurred speech or increasing confusion.',
    uncertainty: 'Some teens have symptoms lasting longer than four weeks and benefit from specialized care.',
    human: 'Chris felt pressure from teammates to play. Coaches and teammates who protect each other build a safer sports culture.',
    closing: 'You only get one brain. Protecting it is part of being an athlete.',
  },
  founder: 'Teaching point: concussion recognition, no same-day return, return-to-learn before return-to-play. Invite a sports medicine physician or athletic trainer.',
});

export const SCFE = makeCase({
  code: 'CASE-027', slug: 'derrick-hip', room: 'sports-medicine-clinic',
  title: 'The Knee That Wasn’t', summary: 'Derrick’s knee has hurt for a month and now he limps. The answer is not where it hurts.',
  specialty: 'Pediatric Orthopedics', system: 'Bones, Joints & Sports', minutes: [15, 25],
  patient: { name: 'Derrick Hall', age: 12, concern: 'Knee pain and a limp for four weeks', interests: ['Basketball', 'Drawing comics'] },
  art: 'a 12-year-old Black boy in basketball shorts lying on an orthopedic clinic exam table while an orthopedic doctor gently bends his left hip, his left foot turned outward, an x-ray light box on the wall, bright sports clinic',
  opening: {
    scene: 'Derrick’s left knee has ached for four weeks, especially after basketball. Now he walks with a limp and his foot turns outward. He doesn’t remember hurting it.',
    dialogue: 'My knee hurts, but nothing happened to it. It just started.',
    narrator: 'Pain isn’t always felt where the problem is. Nerves can carry hip pain to the knee.',
    narratorRole: 'Orthopedic surgeon',
  },
  history: {
    min: 3,
    q: [
      ['Did you hurt your knee?', 'No, I don’t remember any injury.', 'No injury makes a sprain less likely.'],
      ['Does it hurt more after activity?', 'Yes, especially after basketball.', 'Activity-related pain fits a mechanical problem.'],
      ['Do you have any pain in your hip or groin?', 'Sometimes my groin feels sore.', 'A clue that the hip may be involved.'],
      ['Have you had a fever?', 'No.', 'No fever makes infection less likely.'],
      ['Have you grown a lot recently?', 'Yes, I grew three inches this year.', 'Growth spurts make growth plates weaker.'],
      ['How has your weight changed?', 'I’ve gained some weight this year.', 'Extra weight puts more force on the hip growth plate.'],
    ],
  },
  exam: {
    text: 'You observe the exam.',
    f: [['Knee', 'Normal: no swelling or tenderness', 'normal'], ['Walking', 'Limp with left foot turned outward', 'abnormal'], ['Left hip', 'Rolls outward when bent (obligatory external rotation)', 'abnormal'], ['Left hip rotation', 'Inward rotation very limited and painful', 'abnormal'], ['Temperature', 'Normal', 'normal'], ['BMI', 'Above the 95th percentile', 'note']],
    junior: ['The knee exam is normal. Where is the problem?', [
      ['The hip: nerves can make hip pain feel like knee pain', 'Right. That’s called referred pain.', true],
      ['The knee, even though the exam is normal', 'His knee exam is normal, and his hip moves abnormally.'],
      ['The ankle', 'His ankle isn’t involved.'],
    ]],
    senior: ['What do these findings suggest?', [
      ['Slipped capital femoral epiphysis (SCFE) with referred knee pain', 'Correct. Obligatory external rotation with hip flexion is a classic sign.', true],
      ['Osgood-Schlatter disease', 'That causes tenderness at the tibial tubercle; his knee exam is normal.'],
      ['Septic arthritis', 'No fever; he can bear weight; subacute course.'],
    ]],
  },
  model: {
    junior: {
      layers: [['weak', 'The hip growth plate is weak during a growth spurt', 'The growing zone near the hip.'], ['force', 'Extra force pushes on it', 'Body weight and sports.'], ['slip', 'The top of the thigh bone slips', 'Like a scoop of ice cream sliding off a cone.'], ['signs', 'Limp, turned-out foot, knee pain', 'What we see.']],
      clues: [['growth', 'Grew three inches this year', 'weak', 'Growth plates are softest during growth spurts.'], ['weight', 'Gained weight', 'force', 'More force on the growth plate.'], ['bball', 'Hurts after basketball', 'force', 'Jumping adds force.'], ['out', 'Hip rolls outward when bent', 'slip', 'The slipped bone changes how the hip moves.'], ['limp', 'Limp with foot turned out', 'signs', 'The hip can’t move normally.'], ['knee', 'Knee pain with a normal knee', 'signs', 'Hip pain travels along a nerve to the knee.']],
      wrap: 'During a growth spurt, extra force made the top of Derrick’s thigh bone slip at the hip. The pain traveled down a nerve, so he felt it in his knee.',
    },
    senior: {
      layers: [['physis', 'Weakened proximal femoral physis', 'Adolescent growth spurt; hormonal factors.'], ['load', 'Increased shear forces', 'Obesity and activity.'], ['slip', 'Posterior-inferior slip of the epiphysis', 'Metaphysis moves anterior and up.'], ['clin', 'Altered hip mechanics and referred pain', 'Obturator nerve referral to the knee.']],
      clues: [['spurt', 'Rapid growth', 'physis', 'Physis widens and weakens during puberty.'], ['bmi', 'BMI above 95th percentile', 'load', 'Major risk factor.'], ['act', 'Pain after activity', 'load', 'Mechanical load.'], ['oer', 'Obligatory external rotation', 'slip', 'Classic sign of SCFE.'], ['ir', 'Loss of internal rotation', 'slip', 'Altered femoral head position.'], ['knee', 'Knee pain with a normal knee', 'clin', 'Referred via the obturator nerve.']],
      wrap: 'Your model predicts a slipped epiphysis on frog-leg lateral X-ray, with Klein’s line failing to intersect the femoral head.',
    },
  },
  ddx: {
    junior: { options: [
      ['scfe', 'A slipped hip growth plate', 'leading', 'Growth spurt, limp, outward foot, abnormal hip motion and a normal knee.'],
      ['osgood', 'A sore bump below the knee (Osgood-Schlatter)', 'possible', 'Common in athletes, but his knee exam is normal.'],
      ['strain', 'A pulled muscle', 'possible', 'Usually after an injury.'],
      ['infection', 'A joint infection', 'cantmiss', 'Would cause fever and he couldn’t walk. Always ask.'],
      ['growing', 'Growing pains', 'unlikely', 'Don’t cause a limp or abnormal hip motion.'],
    ] },
    senior: { options: [
      ['scfe', 'Slipped capital femoral epiphysis', 'leading', 'Classic age, habitus, exam and referred pain.'],
      ['septic', 'Septic arthritis of the hip', 'cantmiss', 'Fever, refusal to bear weight and raised inflammatory markers.'],
      ['lcp', 'Legg-Calvé-Perthes disease', 'possible', 'Avascular necrosis of the femoral head, typically ages 4–8.'],
      ['osgood', 'Osgood-Schlatter disease', 'possible', 'Tibial tubercle tenderness; normal knee here.'],
      ['tumor', 'Bone tumor', 'possible', 'Night pain, systemic symptoms or a mass.'],
      ['ts', 'Transient synovitis', 'possible', 'Usually younger, after a viral illness, self-limited.'],
    ] },
  },
  labs: { title: 'Imaging', r: [
    ['Hip X-ray (AP and frog-leg lateral)', 'Left femoral epiphysis slipped posteriorly', '', 'Normal alignment', 'note'],
    ['Klein’s line', 'Does not intersect the left femoral head', '', 'Intersects', 'abnormal'],
    ['Right hip', 'Normal', '', 'Normal', 'normal'],
  ] },
  decision: {
    junior: ['Look back at your differential. What is causing Derrick’s knee pain?', [
      ['The top of his thigh bone slipped at the hip growth plate', 'Exactly. He needs crutches right away and surgery to hold it in place.', true],
      ['A knee injury', 'His knee is normal. The X-ray shows the problem is at the hip.'],
      ['Growing pains', 'The X-ray shows a slipped growth plate.'],
    ]],
    senior: ['Which explanation is best supported?', [
      ['Stable left SCFE requiring non-weight-bearing and surgical in situ pinning', 'Correct. Prompt fixation prevents further slip and avascular necrosis.', true],
      ['Legg-Calvé-Perthes disease', 'The X-ray shows a physeal slip, not femoral head necrosis.'],
      ['Septic arthritis', 'No fever, and imaging is diagnostic of SCFE.'],
    ]],
    wrap: 'Derrick goes on crutches immediately and has surgery the next day to place a screw across the growth plate. The team watches his other hip too, since SCFE can happen on both sides.',
  },
  debrief: {
    science: 'Near the top of the thigh bone is a growth plate where bone grows. During a growth spurt it is weaker. With enough force, the ball at the top can slip off, like a scoop of ice cream sliding off its cone.',
    pearl: 'Knee pain in a child or teen with a normal knee exam: always examine the hip.',
    uncertainty: 'Some children develop SCFE in the other hip, so follow-up continues until growth finishes.',
    human: 'Derrick had been told to “walk it off” for weeks. Listening to persistent pain matters.',
    closing: 'The source of pain can be far from where it’s felt. Curiosity finds it.',
  },
  founder: 'Teaching point: referred pain from hip to knee; SCFE risk factors; urgency of non-weight-bearing. Discuss weight in a stigma-free way.',
});

export const T2DM = makeCase({
  code: 'CASE-028', slug: 'angela-diabetes', room: 'adult-clinic',
  title: 'Thirsty Behind the Wheel', summary: 'Ms. Reed, a bus driver, is always thirsty, tired and her vision is blurry. Uncover a common, quiet disease.',
  specialty: 'Internal Medicine & Endocrinology', system: 'Hormones & Metabolism', minutes: [15, 25],
  patient: { name: 'Angela Reed', age: 52, concern: 'Thirst, fatigue and blurry vision', interests: ['Her grandchildren', 'Church choir', 'Cooking'] },
  art: 'a 52-year-old Black woman city bus driver in uniform sitting in a primary care exam room talking with a friendly internist, a water bottle in her hand, a glucose meter and an educational poster about healthy plates on the wall, warm natural light',
  opening: {
    scene: 'Ms. Reed drives a city bus. For months she has kept a big water bottle by her seat and needs bathroom breaks at every stop. At night she gets up to pee three times. Lately, the signs on the road look blurry.',
    dialogue: 'I figured I was just getting older. But the blurry vision scared me. I drive people for a living.',
    narrator: 'Some diseases develop quietly over years. Finding them early prevents damage to the eyes, kidneys, nerves and heart.',
    narratorRole: 'Internist',
  },
  history: {
    min: 3,
    q: [
      ['How long have you been extra thirsty?', 'Maybe six months.', 'High blood sugar pulls water into the urine, causing thirst.'],
      ['Does anyone in your family have diabetes?', 'My mother and two brothers.', 'Type 2 diabetes runs strongly in families.'],
      ['How active are you during the week?', 'I sit all day driving. I’m too tired after work.', 'Physical activity helps the body use insulin.'],
      ['Have you noticed cuts healing slowly or numb feet?', 'My feet tingle at night.', 'Tingling feet can mean nerve damage from high blood sugar.'],
      ['When was your last check-up?', 'Honestly, about five years ago.', 'Gaps in care are common, especially with demanding work schedules.'],
      ['Do you snore or feel sleepy during the day?', 'My husband says I snore.', 'Sleep apnea is common and also causes fatigue.'],
    ],
  },
  exam: {
    text: 'You observe the exam.',
    f: [['BMI', '34', 'high'], ['Blood pressure', '142/88', 'high'], ['Neck', 'Dark, velvety skin (acanthosis nigricans)', 'abnormal'], ['Feet', 'Reduced feeling to light touch', 'abnormal'], ['Eyes', 'Vision improves with pinhole test', 'note'], ['Fingerstick glucose (random)', '246 mg/dL', 'high']],
    junior: ['What does the dark, velvety skin on her neck tell you?', [
      ['Her body may not be responding well to insulin', 'Right. Acanthosis nigricans is a sign of insulin resistance.', true],
      ['She needs to scrub harder', 'It isn’t dirt and can’t be washed off.'],
      ['She has a sunburn', 'It’s a sign of how her body handles insulin.'],
    ]],
    senior: ['What does the picture suggest?', [
      ['Probable type 2 diabetes with insulin resistance, early neuropathy and hypertension', 'Correct. Confirm with HbA1c or fasting glucose.', true],
      ['Type 1 diabetes', 'Age, family history, habitus and acanthosis favor type 2. Antibodies help if unsure.'],
      ['Diabetes insipidus', 'Causes thirst and urination but with normal glucose.'],
    ]],
  },
  model: {
    junior: {
      layers: [['risk', 'Genes plus less activity and extra weight', 'Risk builds over years.'], ['resist', 'The body stops responding well to insulin', 'Insulin resistance.'], ['high', 'Blood sugar rises', 'The pancreas can’t keep up.'], ['harm', 'High sugar affects the body', 'Thirst, peeing and damage to small blood vessels and nerves.']],
      clues: [['family', 'Mother and brothers have diabetes', 'risk', 'Genes matter.'], ['sitting', 'Sits all day at work', 'risk', 'Less activity makes insulin work less well.'], ['neck', 'Dark, velvety skin on her neck', 'resist', 'A sign of insulin resistance.'], ['sugar', 'Blood sugar 246', 'high', 'Sugar stays in the blood.'], ['thirst', 'Very thirsty, peeing at night', 'harm', 'Sugar pulls water into the urine.'], ['feet', 'Tingling feet', 'harm', 'High sugar damages nerves.'], ['blurry', 'Blurry vision', 'harm', 'Sugar changes the shape of the eye’s lens.']],
      wrap: 'Ms. Reed’s genes, long days sitting and extra weight made her body resist insulin. Her blood sugar rose and began to affect her eyes, nerves and kidneys.',
    },
    senior: {
      layers: [['pred', 'Genetic and lifestyle predisposition', 'Polygenic risk; visceral adiposity.'], ['ir', 'Insulin resistance', 'Reduced peripheral glucose uptake.'], ['beta', 'Progressive beta-cell dysfunction', 'Relative insulin deficiency.'], ['comp', 'Chronic hyperglycemia and microvascular complications', 'Retina, kidneys, nerves.']],
      clues: [['fh', 'Strong family history', 'pred', 'Heritability is high.'], ['bmi', 'BMI 34, sedentary work', 'pred', 'Central adiposity drives insulin resistance.'], ['an', 'Acanthosis nigricans', 'ir', 'Hyperinsulinemia stimulates skin growth.'], ['glu', 'Random glucose 246', 'beta', 'Beta cells can no longer compensate.'], ['poly', 'Polyuria, polydipsia, nocturia', 'comp', 'Osmotic diuresis.'], ['neuro', 'Distal sensory loss', 'comp', 'Peripheral neuropathy.']],
      wrap: 'Your model predicts an HbA1c over 6.5%, early kidney involvement (albumin in urine) and abnormal cholesterol.',
    },
  },
  ddx: {
    junior: { options: [
      ['t2', 'Type 2 diabetes', 'leading', 'Thirst, peeing, family history, high blood sugar and dark neck skin.'],
      ['t1', 'Type 1 diabetes', 'possible', 'Usually starts younger and comes on faster.'],
      ['sleep', 'Not sleeping well', 'possible', 'Can cause tiredness, but not high blood sugar.'],
      ['thyroid', 'A thyroid problem', 'possible', 'Can cause tiredness. Doctors may check.'],
      ['age', 'Just getting older', 'unlikely', 'Aging doesn’t cause blood sugar of 246.'],
    ] },
    senior: { options: [
      ['t2dm', 'Type 2 diabetes mellitus', 'leading', 'Hyperglycemia with insulin resistance and family history.'],
      ['lada', 'Latent autoimmune diabetes in adults', 'possible', 'Slower autoimmune diabetes; antibodies distinguish.'],
      ['osa', 'Obstructive sleep apnea', 'possible', 'Common comorbidity causing fatigue; screen.'],
      ['hypothyroid', 'Hypothyroidism', 'possible', 'Fatigue and weight gain; check TSH if suspected.'],
      ['di', 'Diabetes insipidus', 'unlikely', 'Polyuria with normal glucose.'],
      ['cushing', 'Cushing syndrome', 'possible', 'Secondary diabetes with stretch marks, easy bruising, proximal weakness.'],
    ] },
  },
  labs: { r: [
    ['Hemoglobin A1c', '8.4', '%', '< 5.7 (diabetes ≥ 6.5)', 'high'],
    ['Fasting glucose', '168', 'mg/dL', '70–99', 'high'],
    ['Urine albumin-to-creatinine ratio', '45', 'mg/g', '< 30', 'high'],
    ['Creatinine', '0.9', 'mg/dL', '0.6–1.1', 'normal'],
    ['LDL cholesterol', '142', 'mg/dL', '< 100', 'high'],
    ['TSH', '2.1', 'mIU/L', '0.4–4.0', 'normal'],
  ] },
  decision: {
    junior: ['Look back at your differential. What does Ms. Reed have?', [
      ['Type 2 diabetes', 'Exactly. Healthy habits and medicine can bring her blood sugar down and protect her body.', true],
      ['Just getting older', 'Her blood sugar shows diabetes.'],
      ['A thyroid problem', 'Her thyroid test is normal.'],
    ]],
    senior: ['Which explanation is best supported?', [
      ['Type 2 diabetes with early nephropathy and neuropathy, plus hypertension and dyslipidemia', 'Correct. Start metformin, lifestyle support, blood pressure and cholesterol treatment, and arrange eye and foot exams.', true],
      ['Latent autoimmune diabetes', 'Possible, but phenotype favors type 2; antibodies if she doesn’t respond.'],
      ['Prediabetes', 'An A1c of 8.4% is diabetes.'],
    ]],
    wrap: 'Ms. Reed starts metformin and works with a diabetes educator and a nutritionist. Her employer agrees to schedule her breaks. Six months later, her A1c is 6.9% and her vision is clear.',
  },
  debrief: {
    science: 'In type 2 diabetes, the body’s cells stop responding well to insulin. At first, the pancreas makes extra insulin to keep up; over time, it can’t. High sugar slowly damages small blood vessels in the eyes and kidneys and the nerves in the feet.',
    pearl: 'Type 2 diabetes often has no symptoms for years. Screening adults, especially those with risk factors, finds it early. Small daily changes in movement, food and sleep make a big difference.',
    uncertainty: 'Some people can bring diabetes into remission with weight loss; others need more medicine over time. Newer medicines also protect the heart and kidneys.',
    human: 'Ms. Reed hadn’t seen a doctor in five years because her job made appointments hard. Healthcare that fits people’s lives saves lives.',
    closing: 'Prevention and early detection are some of medicine’s most powerful tools.',
  },
  founder: 'Teaching point: insulin resistance, screening, complications, social determinants (work schedules, food access). Type 2 diabetes is rising in teens too; consider a youth-focused follow-up case.',
});

export const GRAVES = makeCase({
  code: 'CASE-029', slug: 'hannah-thyroid', room: 'childrens-clinic',
  title: 'Running Too Fast', summary: 'Hannah is losing weight while eating more, her heart races and she can’t focus. Something is revving her body’s engine.',
  specialty: 'Pediatric Endocrinology', system: 'Hormones & Metabolism', minutes: [15, 25],
  patient: { name: 'Hannah Cohen', age: 15, concern: 'Racing heart, weight loss and trouble focusing', interests: ['Cross-country', 'Violin'] },
  art: 'a slim 15-year-old Jewish teenage girl with wavy brown hair sitting on a clinic exam table, holding out her hands with a slight tremor, a pediatric endocrinologist gently examining the front of her neck, warm clinic light',
  opening: {
    scene: 'Over three months Hannah has lost weight even though she’s hungrier than ever. Her heart pounds, her hands shake while playing violin, and she feels hot when everyone else is cold. Her grades are slipping because she can’t concentrate or sleep.',
    dialogue: 'I feel like I drank ten cups of coffee, but I haven’t had any.',
    narrator: 'Hormones control the body’s speed. When one gland works too hard, everything runs too fast.',
  },
  history: {
    min: 3,
    q: [
      ['Has your appetite changed?', 'I’m starving all the time, but I keep losing weight.', 'Weight loss with a big appetite suggests the body is burning energy too fast.'],
      ['Do you feel hot or cold more than others?', 'Always hot. I wear T-shirts in winter.', 'Heat intolerance is a classic sign of an overactive thyroid.'],
      ['How are you sleeping?', 'Badly. My mind races.', 'Too much thyroid hormone can cause insomnia and anxiety.'],
      ['Have your bowel habits changed?', 'I go more often.', 'Thyroid hormone speeds up the gut.'],
      ['Do you drink energy drinks or take any supplements?', 'No, nothing.', 'Caffeine and stimulants can mimic these symptoms.'],
      ['Does anyone in your family have thyroid disease?', 'My aunt has Graves’ disease.', 'Autoimmune thyroid disease runs in families.'],
    ],
  },
  exam: {
    text: 'You observe the exam.',
    f: [['Heart rate', '118 beats per minute at rest', 'high'], ['Blood pressure', '132/60', 'note'], ['Hands', 'Fine tremor; warm, moist skin', 'abnormal'], ['Neck', 'Smoothly enlarged thyroid (goiter)', 'abnormal'], ['Eyes', 'Slight stare; upper lids lag when looking down', 'abnormal'], ['Reflexes', 'Brisk', 'abnormal']],
    junior: ['Which gland might be causing this?', [
      ['The thyroid, the butterfly-shaped gland in her neck', 'Right. It’s enlarged, and the thyroid controls the body’s speed.', true],
      ['Her stomach', 'Her stomach isn’t the source.'],
      ['Her lungs', 'Her lungs are fine.'],
    ]],
    senior: ['What do these findings suggest?', [
      ['Hyperthyroidism, likely Graves’ disease: diffuse goiter, eye signs and adrenergic symptoms', 'Correct. Eye findings and a diffuse goiter point to Graves’.', true],
      ['Generalized anxiety disorder', 'Anxiety doesn’t cause a goiter, lid lag or weight loss with increased appetite.'],
      ['Pheochromocytoma', 'Rare; causes episodic symptoms and hypertension, without goiter.'],
    ]],
  },
  model: {
    junior: {
      layers: [['immune', 'The immune system makes a mistaken antibody', 'It acts like the thyroid’s “on” switch.'], ['gland', 'The thyroid is switched on nonstop', 'It grows bigger.'], ['hormone', 'Too much thyroid hormone', 'The body’s engine revs.'], ['fast', 'Everything runs too fast', 'Heart, gut, brain and metabolism.']],
      clues: [['aunt', 'Aunt has Graves’ disease', 'immune', 'This immune problem runs in families.'], ['goiter', 'Enlarged thyroid', 'gland', 'A gland that’s always on grows.'], ['heart', 'Heart racing at 118', 'fast', 'Thyroid hormone speeds the heart.'], ['weight', 'Losing weight while eating more', 'fast', 'The body burns energy too fast.'], ['hot', 'Always feeling hot', 'fast', 'A fast metabolism makes heat.'], ['shake', 'Shaky hands', 'fast', 'Nerves and muscles are revved up.']],
      wrap: 'Hannah’s immune system made an antibody that switched her thyroid on and left it on. Too much thyroid hormone made her whole body run too fast.',
    },
    senior: {
      layers: [['ab', 'TSH-receptor stimulating antibodies (TSI)', 'Autoimmunity.'], ['stim', 'Thyroid stimulation and hyperplasia', 'Diffuse goiter.'], ['th', 'Excess thyroid hormone', 'Suppressed TSH.'], ['eff', 'Hypermetabolic and adrenergic effects; orbitopathy', 'Multisystem.']],
      clues: [['fh', 'Family history of Graves’', 'ab', 'Genetic predisposition.'], ['eye', 'Stare and lid lag', 'ab', 'Orbital fibroblasts also carry TSH receptors (orbitopathy is specific to Graves’).'], ['goit', 'Diffuse goiter', 'stim', 'Antibody-driven growth.'], ['tachy', 'Tachycardia, wide pulse pressure', 'eff', 'Increased cardiac output.'], ['wt', 'Weight loss with hyperphagia', 'eff', 'Raised metabolic rate.'], ['trem', 'Tremor, brisk reflexes, heat intolerance', 'eff', 'Adrenergic sensitization and thermogenesis.']],
      wrap: 'Your model predicts suppressed TSH, high free T4 and T3, and positive thyroid-stimulating antibodies.',
    },
  },
  ddx: {
    junior: { options: [
      ['graves', 'An overactive thyroid (Graves’ disease)', 'leading', 'Big thyroid, racing heart, weight loss, heat and eye changes.'],
      ['anxiety', 'Anxiety', 'possible', 'Can cause racing heart and trouble sleeping, but not a big thyroid.'],
      ['caffeine', 'Too much caffeine', 'possible', 'She doesn’t drink caffeine or energy drinks.'],
      ['running', 'Training too hard', 'possible', 'Can cause weight loss, but not a big thyroid or racing heart at rest.'],
      ['allergy', 'An allergy', 'unlikely', 'Doesn’t explain these symptoms.'],
    ] },
    senior: { options: [
      ['graves', 'Graves’ disease', 'leading', 'Hyperthyroid symptoms, diffuse goiter, eye signs and family history.'],
      ['thyroiditis', 'Painless or subacute thyroiditis', 'possible', 'Transient hormone release; no orbitopathy; low uptake on scan.'],
      ['nodule', 'Toxic nodule', 'possible', 'A single overactive nodule, rather than a diffuse goiter.'],
      ['anx', 'Anxiety disorder', 'possible', 'Shares symptoms but not the goiter or eye findings.'],
      ['ed', 'An eating disorder', 'possible', 'Important to consider with weight loss in teens; her appetite is increased and she has a goiter.'],
      ['stim', 'Stimulant use', 'possible', 'Caffeine, ADHD medicine or supplements can mimic hyperthyroidism.'],
      ['storm', 'Thyroid storm', 'cantmiss', 'Life-threatening: fever, agitation, very high heart rate. She is not in storm.'],
    ] },
  },
  labs: { r: [
    ['TSH', '< 0.01', 'mIU/L', '0.5–4.5', 'low'],
    ['Free T4', '4.2', 'ng/dL', '0.8–1.8', 'high'],
    ['Total T3', '380', 'ng/dL', '80–190', 'high'],
    ['Thyroid-stimulating immunoglobulin (TSI)', 'Positive', '', 'Negative', 'high'],
  ] },
  decision: {
    junior: ['Look back at your differential. What does Hannah have?', [
      ['Graves’ disease: an immune problem that turned her thyroid on too high', 'Exactly. Medicine can calm her thyroid and her racing heart.', true],
      ['Anxiety', 'Her blood tests show too much thyroid hormone.'],
      ['Running too much', 'Her thyroid is the cause.'],
    ]],
    senior: ['Which explanation is best supported?', [
      ['Graves’ disease', 'Correct. Methimazole to reduce hormone production and a beta-blocker for symptoms. Remission occurs in some patients; others need radioactive iodine or surgery.', true],
      ['Subacute thyroiditis', 'Positive TSI and orbitopathy point to Graves’.'],
      ['Toxic nodule', 'The goiter is diffuse and TSI is positive.'],
    ]],
    wrap: 'Hannah starts methimazole and a beta-blocker. Within weeks her heart slows, her hands steady and she sleeps well again. Her teachers adjust deadlines while she recovers.',
  },
  debrief: {
    science: 'The thyroid makes hormones that set the body’s speed. In Graves’ disease, an antibody mimics the signal that turns the thyroid on, so it never turns off. Everything speeds up: heart, gut, brain and metabolism.',
    pearl: 'Unexplained weight loss, a fast heart rate, heat intolerance and trouble focusing in a teen should prompt a thyroid check. It’s a simple blood test.',
    uncertainty: 'Graves’ disease in teens often needs long-term treatment. Her eye findings will be monitored.',
    human: 'Hannah’s falling grades were blamed on stress. Medical conditions can look like behavior problems.',
    closing: 'Sometimes a struggling student is a patient waiting to be diagnosed.',
  },
  founder: 'Teaching point: hyperthyroidism presentation; TSH as the screening test; Graves’ orbitopathy; contrast with the Hashimoto case. Note how medical conditions get misread as behavior.',
});

export const HMB = makeCase({
  code: 'CASE-030', slug: 'nia-iron', room: 'childrens-clinic',
  title: 'Tired Every Month', summary: 'Nia is exhausted and craving ice. Her periods are heavy, and so were her mom’s. Find the cause behind the cause.',
  specialty: 'Adolescent Medicine & Hematology', system: 'Blood & Cancer', minutes: [20, 30],
  patient: { name: 'Nia Robinson', age: 15, concern: 'Fatigue, dizziness and heavy periods', interests: ['Dance', 'Science fair'] },
  art: 'a tired 15-year-old Black teenage girl in dancewear sitting with her mother in an adolescent medicine clinic, holding a cup of ice chips, a kind physician sitting across from them with a laptop, warm private exam room',
  opening: {
    scene: 'Nia has been dizzy when she stands up and out of breath in dance class. She keeps chewing ice. In private, she tells the doctor her periods are very heavy.',
    dialogue: 'I thought heavy periods were just normal. My mom’s were like this too.',
    narrator: 'In teenage girls, heavy menstrual bleeding is a common cause of iron deficiency. The next question is why the periods are so heavy.',
  },
  history: {
    min: 4, prompt: 'Ask Nia at least four questions. Questions about periods are asked privately and respectfully.',
    q: [
      ['How long do your periods last?', 'About eight or nine days.', 'Periods lasting more than seven days are considered heavy.'],
      ['How often do you change pads or tampons on heavy days?', 'Every hour or two. I bleed through at night.', 'Soaking through protection every 1–2 hours or flooding overnight means heavy menstrual bleeding.'],
      ['Do you pass clots?', 'Yes, bigger than a quarter.', 'Large clots suggest heavy bleeding.'],
      ['Do you have other bleeding, like nosebleeds or after dental work?', 'Lots of nosebleeds, and I bled a long time after a tooth was pulled.', 'Bleeding in more than one place suggests a bleeding disorder.'],
      ['Has anyone in your family had bleeding problems?', 'My mom has heavy periods too and needed a blood transfusion after I was born.', 'A family history of bleeding is a strong clue to an inherited bleeding disorder.'],
      ['Do you crave ice or other unusual things?', 'Ice. All the time.', 'Craving ice (pagophagia) is a classic sign of iron deficiency.'],
      ['What do you usually eat?', 'Normal stuff. Chicken, rice, cereal, veggies.', 'Her diet is not the main cause.'],
    ],
  },
  exam: {
    text: 'You observe the exam.',
    f: [['Skin and inner eyelids', 'Pale', 'abnormal'], ['Heart rate', '104 beats per minute', 'high'], ['Heart', 'Soft flow murmur', 'note'], ['Standing', 'Heart rate rises and she feels dizzy', 'abnormal'], ['Nails', 'Thin and slightly spoon-shaped', 'abnormal'], ['Skin', 'A few bruises on her legs', 'note']],
    junior: ['What do the pale skin, fast heart and dizziness suggest?', [
      ['Her blood is low on red cells, likely from losing iron', 'Right. Heavy periods can drain the body’s iron every month.', true],
      ['She is dehydrated from dancing', 'She drinks plenty. Her pale skin and ice craving point to the blood.'],
      ['She is out of shape', 'She’s a dancer. Her symptoms are new.'],
    ]],
    senior: ['What is your assessment?', [
      ['Symptomatic iron deficiency anemia from heavy menstrual bleeding, with features suggesting an underlying bleeding disorder', 'Correct. Mucocutaneous bleeding and a family history warrant testing for von Willebrand disease.', true],
      ['Iron deficiency from poor diet', 'Her diet is adequate; her blood loss explains it.'],
      ['Anemia of chronic disease', 'Her history points to blood loss, not inflammation.'],
    ]],
  },
  model: {
    junior: {
      layers: [['gene', 'A family bleeding condition', 'Passed down from her mom.'], ['clot', 'Blood doesn’t clot as well', 'Small cuts and periods bleed longer.'], ['loss', 'Heavy periods drain iron every month', 'More iron lost than she eats.'], ['anemia', 'Too little iron to make red cells', 'Less oxygen for her body.']],
      clues: [['mom', 'Mom has heavy periods too', 'gene', 'Bleeding conditions can run in families.'], ['nose', 'Lots of nosebleeds', 'clot', 'Bleeding in more than one place.'], ['tooth', 'Bled long after a tooth was pulled', 'clot', 'Clotting is slow.'], ['heavy', 'Soaking through every hour or two', 'loss', 'Heavy bleeding.'], ['ice', 'Craving ice', 'anemia', 'A sign of low iron.'], ['dizzy', 'Dizzy, short of breath, fast heart', 'anemia', 'Less oxygen reaches her body.']],
      wrap: 'Nia likely inherited a condition that makes clotting slower, so her periods are very heavy. Each month she lost more iron than she could replace, and her red cells ran low.',
    },
    senior: {
      layers: [['vwd', 'Inherited deficiency of von Willebrand factor', 'Autosomal dominant (type 1).'], ['hemo', 'Impaired primary hemostasis', 'Platelet adhesion fails; factor VIII less stable.'], ['hmb', 'Heavy menstrual bleeding', 'Chronic blood loss.'], ['ida', 'Iron deficiency anemia', 'Iron-restricted erythropoiesis.']],
      clues: [['fh', 'Mother with heavy periods and postpartum hemorrhage', 'vwd', 'Family history.'], ['epi', 'Frequent epistaxis', 'hemo', 'Mucocutaneous bleeding pattern.'], ['dental', 'Prolonged bleeding after extraction', 'hemo', 'Hemostatic challenge.'], ['menses', 'Periods over 7 days, flooding, large clots', 'hmb', 'Meets heavy menstrual bleeding criteria.'], ['pica', 'Pagophagia', 'ida', 'Classic iron deficiency symptom.'], ['koil', 'Spoon-shaped nails', 'ida', 'Chronic iron deficiency.'], ['ortho', 'Orthostatic tachycardia', 'ida', 'Anemia with reduced reserve.']],
      wrap: 'Your model predicts microcytic anemia with very low ferritin, and low von Willebrand factor antigen and activity.',
    },
  },
  ddx: {
    junior: { options: [
      ['iron', 'Low iron from heavy periods', 'leading', 'Heavy periods every month, ice craving, pale and dizzy.'],
      ['bleed', 'A family bleeding condition', 'cantmiss', 'Nosebleeds, bleeding after a tooth was pulled and a mom with the same problem.'],
      ['thyroid', 'A thyroid problem', 'possible', 'Can cause heavy periods and tiredness. Doctors check.'],
      ['diet', 'Not eating enough iron', 'possible', 'Can add to the problem, but her diet is normal.'],
      ['lazy', 'Not trying hard enough in dance', 'unlikely', 'Her body is low on red cells.'],
    ] },
    senior: { options: [
      ['ida', 'Iron deficiency anemia from heavy menstrual bleeding', 'leading', 'Chronic menstrual blood loss and classic iron deficiency features.'],
      ['vwd', 'Von Willebrand disease', 'cantmiss', 'About 1 in 5 teens with heavy menstrual bleeding has a bleeding disorder; her mucocutaneous bleeding and family history make it likely.'],
      ['plt', 'Platelet function disorder', 'possible', 'Also causes mucocutaneous bleeding; tested if VWF studies are normal.'],
      ['thyroid', 'Hypothyroidism', 'possible', 'Can cause heavy periods; check TSH.'],
      ['preg', 'Pregnancy-related bleeding', 'possible', 'Always test confidentially.'],
      ['celiac', 'Celiac disease', 'possible', 'Iron malabsorption can coexist.'],
      ['thal', 'Thalassemia trait', 'unlikely', 'Microcytosis with normal ferritin.'],
    ] },
  },
  labs: { r: [
    ['Hemoglobin', '8.1', 'g/dL', '12.0–16.0', 'low'],
    ['MCV', '68', 'fL', '78–95', 'low'],
    ['Ferritin', '4', 'ng/mL', '15–150', 'low'],
    ['Platelets', '380', 'K/µL', '150–450', 'normal'],
    ['PTT', '39', 'sec', '25–36', 'high'],
    ['VWF antigen', '32', '%', '50–160', 'low'],
    ['VWF activity', '28', '%', '50–160', 'low'],
    ['Factor VIII', '45', '%', '50–150', 'low'],
    ['TSH', '1.8', 'mIU/L', '0.5–4.5', 'normal'],
    ['Pregnancy test', 'Negative', '', 'Negative', 'normal'],
  ] },
  decision: {
    junior: ['Look back at your differential. Why is Nia so tired?', [
      ['Her periods are heavy because of a family bleeding condition, and she lost too much iron', 'Exactly. Treating both the bleeding and the low iron will help her feel like herself again.', true],
      ['She doesn’t eat enough iron', 'Her diet is fine. Her blood loss is the cause.'],
      ['She is dancing too much', 'Her blood tests show low iron and a bleeding condition.'],
    ]],
    senior: ['Which explanation is best supported?', [
      ['Iron deficiency anemia from heavy menstrual bleeding due to type 1 von Willebrand disease', 'Correct. Low VWF antigen and activity with low ferritin. Treatment: iron, hormonal therapy and/or tranexamic acid, and hematology care.', true],
      ['Dietary iron deficiency', 'Her diet is adequate and blood loss is substantial.'],
      ['Thalassemia trait', 'Ferritin is very low.'],
    ]],
    wrap: 'Nia starts iron and works with adolescent gynecology and hematology on treatment that makes her periods lighter. Her mom is tested too, and is also diagnosed. Two months later, Nia is back to full dance practices.',
  },
  debrief: {
    science: 'Von Willebrand factor helps platelets stick to injured blood vessels. When there isn’t enough, bleeding takes longer to stop, so periods can be very heavy. Each month, more iron leaves than comes in, and the body can’t make enough hemoglobin.',
    pearl: 'Heavy periods are common, but not normal. Bleeding through protection every hour or two, periods over seven days, or large clots deserve evaluation. In teenage girls, heavy periods are a common cause of iron deficiency; in teenage boys, a GI cause should be sought.',
    uncertainty: 'VWF levels can rise with stress, exercise and hormones, so testing sometimes needs repeating.',
    human: 'Nia and her mom both thought heavy periods were just part of life. Talking openly about periods helps girls get the care they deserve.',
    closing: 'Asking one more “why” can help a whole family.',
  },
  founder: 'Teaching point: pairs with Isaiah’s case. In adolescent girls, menses are a common cause of iron deficiency; ask about heavy menstrual bleeding and screen for bleeding disorders (VWD). Emphasize respectful, private conversations about periods.',
});

export const HASHIMOTO = makeCase({
  code: 'CASE-031', slug: 'linda-thyroid', room: 'adult-clinic',
  title: 'Running on Low', summary: 'Ms. Price is tired, cold, gaining weight and thinking slowly. Something is turning her body’s engine down.',
  specialty: 'Internal Medicine & Endocrinology', system: 'Hormones & Metabolism', minutes: [15, 25],
  patient: { name: 'Linda Price', age: 45, concern: 'Fatigue, feeling cold and weight gain', interests: ['Reading', 'Gardening'] },
  art: 'a 45-year-old white woman school librarian wearing a thick cardigan and scarf indoors, sitting in a primary care exam room looking tired, an internist checking the front of her neck, bookshelves visible through a window, soft daylight',
  opening: {
    scene: 'Ms. Price, a school librarian, wears a sweater even in summer. For six months she has been exhausted, has gained weight without eating more, and feels like her thinking is in slow motion.',
    dialogue: 'I sleep ten hours and still wake up tired. I can’t remember where I put anything.',
    narrator: 'Compare this case to Hannah’s. The same gland can push the body too fast or too slow.',
    narratorRole: 'Internist',
  },
  history: {
    min: 3,
    q: [
      ['Do you feel cold when others don’t?', 'Always. I keep a heater under my desk.', 'Cold intolerance is a classic sign of an underactive thyroid.'],
      ['Have your bowel habits changed?', 'I’m constipated a lot.', 'Thyroid hormone slows the gut when it is low.'],
      ['Have you noticed changes in your skin or hair?', 'My skin is dry and my hair is thinning.', 'Low thyroid hormone slows skin and hair renewal.'],
      ['How is your mood?', 'Low. I don’t enjoy things as much.', 'Hypothyroidism can cause low mood, and depression can look similar.'],
      ['How are your periods?', 'Heavier than before.', 'Hypothyroidism can cause heavier periods.'],
      ['Does anyone in your family have thyroid disease?', 'My sister takes thyroid medicine.', 'Autoimmune thyroid disease runs in families.'],
    ],
  },
  exam: {
    text: 'You observe the exam.',
    f: [['Heart rate', '56 beats per minute', 'low'], ['Skin', 'Dry and coarse', 'abnormal'], ['Face', 'Puffy around the eyes', 'abnormal'], ['Neck', 'Firm, enlarged, non-tender thyroid', 'abnormal'], ['Reflexes', 'Slow to relax', 'abnormal'], ['Weight', 'Up 15 pounds in six months', 'high']],
    junior: ['How is Ms. Price different from Hannah, the teen with a racing heart?', [
      ['Everything is slowed down instead of sped up', 'Right. Slow heart, feeling cold, constipation and slow thinking: an underactive thyroid.', true],
      ['She’s exactly the same', 'Hannah’s body ran fast; Ms. Price’s runs slow.'],
      ['She has a different gland', 'It’s the same gland, working too little instead of too much.'],
    ]],
    senior: ['What do these findings suggest?', [
      ['Primary hypothyroidism, likely Hashimoto thyroiditis', 'Correct. Bradycardia, delayed reflex relaxation, dry skin and a firm goiter.', true],
      ['Major depressive disorder', 'Can overlap, but doesn’t cause goiter, bradycardia or delayed reflexes. Check thyroid function in fatigue and low mood.'],
      ['Graves’ disease', 'Graves’ causes hyperthyroidism, the opposite picture.'],
    ]],
  },
  model: {
    junior: {
      layers: [['immune', 'The immune system attacks the thyroid', 'Slowly, over years.'], ['damage', 'The thyroid can’t make enough hormone', 'The gland is damaged.'], ['low', 'Too little thyroid hormone', 'The body’s engine slows.'], ['slow', 'Everything runs slowly', 'Heart, gut, brain and metabolism.']],
      clues: [['sister', 'Sister takes thyroid medicine', 'immune', 'Runs in families.'], ['goiter', 'Firm, enlarged thyroid', 'damage', 'An inflamed gland can swell.'], ['cold', 'Always cold', 'slow', 'A slow metabolism makes less heat.'], ['tired', 'Tired after ten hours of sleep', 'slow', 'Her body’s engine is turned down.'], ['heart', 'Heart rate 56', 'slow', 'Thyroid hormone sets heart speed.'], ['constip', 'Constipation', 'slow', 'The gut slows down too.']],
      wrap: 'Ms. Price’s immune system slowly damaged her thyroid. With too little thyroid hormone, her whole body slowed down.',
    },
    senior: {
      layers: [['auto', 'Autoimmune thyroiditis (Hashimoto)', 'Anti-TPO antibodies, lymphocytic infiltration.'], ['fail', 'Progressive thyroid failure', 'Reduced hormone synthesis.'], ['tsh', 'Low thyroid hormone with high TSH', 'Primary hypothyroidism.'], ['hypo', 'Hypometabolic state', 'Multisystem slowing.']],
      clues: [['fh', 'Sister with thyroid disease', 'auto', 'Familial autoimmunity.'], ['goit', 'Firm, non-tender goiter', 'auto', 'Lymphocytic infiltration.'], ['wt', 'Weight gain without increased intake', 'hypo', 'Reduced metabolic rate and fluid retention.'], ['brady', 'Bradycardia', 'hypo', 'Reduced cardiac chronotropy.'], ['refl', 'Delayed reflex relaxation', 'hypo', 'Slowed muscle relaxation.'], ['menorr', 'Heavier periods', 'hypo', 'Altered hormonal regulation.']],
      wrap: 'Your model predicts a high TSH, low free T4, positive anti-TPO antibodies, and possibly high cholesterol and mild anemia.',
    },
  },
  ddx: {
    junior: { options: [
      ['hypo', 'An underactive thyroid', 'leading', 'Tired, cold, weight gain, slow heart and a big thyroid.'],
      ['sad', 'Feeling sad (depression)', 'possible', 'Can cause tiredness and low mood. Doctors check the thyroid too.'],
      ['anemia', 'Low iron', 'possible', 'Heavy periods can cause low iron and tiredness.'],
      ['sleep', 'Sleep problems', 'possible', 'Can cause tiredness, but not a big thyroid.'],
      ['age', 'Just getting older', 'unlikely', 'Aging doesn’t cause all of these changes together.'],
    ] },
    senior: { options: [
      ['hashimoto', 'Hashimoto thyroiditis with primary hypothyroidism', 'leading', 'Classic symptoms, goiter and family history.'],
      ['mdd', 'Major depressive disorder', 'possible', 'Overlapping symptoms; may coexist.'],
      ['ida', 'Iron deficiency anemia', 'possible', 'Heavier periods; check a CBC and ferritin.'],
      ['osa', 'Obstructive sleep apnea', 'possible', 'Fatigue despite long sleep.'],
      ['peri', 'Perimenopause', 'possible', 'Menstrual changes and fatigue at this age.'],
      ['central', 'Central (pituitary) hypothyroidism', 'possible', 'Low T4 with low or normal TSH.'],
      ['myx', 'Myxedema coma', 'cantmiss', 'Severe hypothyroidism with confusion and hypothermia; she is stable.'],
    ] },
  },
  labs: { r: [
    ['TSH', '38', 'mIU/L', '0.4–4.0', 'high'],
    ['Free T4', '0.4', 'ng/dL', '0.8–1.8', 'low'],
    ['Anti-TPO antibodies', '650', 'IU/mL', '< 35', 'high'],
    ['LDL cholesterol', '172', 'mg/dL', '< 100', 'high'],
    ['Hemoglobin', '11.4', 'g/dL', '12.0–15.5', 'low'],
  ] },
  decision: {
    junior: ['Look back at your differential. What does Ms. Price have?', [
      ['An underactive thyroid caused by her immune system', 'Exactly. A daily thyroid hormone pill will bring her energy back.', true],
      ['She’s just getting older', 'Her blood tests show a thyroid problem.'],
      ['An overactive thyroid', 'Her thyroid is underactive, the opposite of Hannah’s.'],
    ]],
    senior: ['Which explanation is best supported?', [
      ['Primary hypothyroidism from Hashimoto thyroiditis', 'Correct. Levothyroxine, with TSH rechecked in 6–8 weeks.', true],
      ['Central hypothyroidism', 'TSH is high, so the problem is the thyroid itself.'],
      ['Depression', 'May coexist, but the labs confirm hypothyroidism.'],
    ]],
    wrap: 'Ms. Price starts levothyroxine. Over two months her energy returns, she stops feeling cold and her memory sharpens. Her cholesterol improves too.',
  },
  debrief: {
    science: 'In Hashimoto thyroiditis, the immune system gradually damages the thyroid. With less thyroid hormone, the body’s metabolism slows. The brain senses this and raises TSH to push the thyroid harder.',
    pearl: 'TSH is like a thermostat signal: high TSH means the thyroid is underactive; very low TSH means it is overactive. Compare Ms. Price with Hannah to see both sides.',
    uncertainty: 'Most people with Hashimoto’s need lifelong thyroid hormone and do very well.',
    human: 'Ms. Price was told for months that she was just stressed. Taking fatigue seriously can uncover treatable causes.',
    closing: 'The same gland, two opposite problems. Understanding the system lets healers reason through both.',
  },
  founder: 'Teaching point: hypothyroidism vs hyperthyroidism; TSH feedback loop. Pair with the Graves case in a live session comparing the two.',
});
