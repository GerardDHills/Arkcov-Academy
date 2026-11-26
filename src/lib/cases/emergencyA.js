import { makeCase } from './kit';

// Emergency cases, part A. Values are illustrative teaching values.

export const HYPOGLYCEMIA = makeCase({
  code: 'CASE-002', slug: 'maya-recess', room: 'emergency-department', emergency: true,
  title: 'Shaky at Recess', summary: 'Maya has type 1 diabetes and suddenly feels shaky and confused. Act fast, then figure out why.',
  specialty: 'Endocrinology', system: 'Hormones & Metabolism', minutes: [15, 25],
  patient: { name: 'Maya Torres', age: 9, concern: 'Shaky, sweaty and confused', interests: ['Soccer', 'Drawing'] },
  art: 'a 9-year-old Latina girl with a ponytail sitting on a bench at the edge of a sunny school soccer field, looking pale, sweaty and shaky, a school nurse kneeling beside her with a small glucose meter, a juice box nearby',
  opening: {
    scene: 'During PE, Maya stops in the middle of a soccer drill. She is pale and sweaty, and her hands are trembling. When her teacher asks what is wrong, her words come out slowly.',
    dialogue: 'I feel… weird. Shaky. My head feels foggy.',
    narrator: 'Maya has type 1 diabetes and takes insulin. The school nurse has called you over. Some problems need action first and explanations second.',
    narratorRole: 'School nurse',
  },
  history: {
    min: 3,
    q: [
      ['Did you take insulin today?', 'Yes, at lunch. My mom set it for my whole lunch.', 'Insulin moves sugar from the blood into the body’s cells. The dose was planned for a full meal.'],
      ['How much of your lunch did you eat?', 'Only half. I wanted to get to the field early.', 'A key clue: the insulin dose was for more food than she actually ate.'],
      ['What were you doing right before you felt this way?', 'Running drills in soccer for like twenty minutes.', 'Exercise makes muscles use extra sugar from the blood.'],
      ['Has this happened before?', 'Once, at camp. Juice helped.', 'Patients and families often know their own warning signs well. Ask them.'],
      ['Did you hit your head?', 'No. I just started feeling shaky.', 'Ruling out a head injury matters whenever someone is confused during sports.'],
    ],
  },
  exam: {
    text: 'The nurse checks Maya quickly while you watch.',
    f: [['Fingerstick blood sugar', '48 mg/dL', 'low'], ['Skin', 'Pale and sweaty', 'abnormal'], ['Heart rate', '122 beats per minute', 'high'], ['Hands', 'Trembling', 'abnormal'], ['Speech', 'Slow, a little confused', 'abnormal'], ['Swallowing', 'Able to swallow safely', 'normal']],
    junior: ['What do these findings tell you?', [
      ['Her blood sugar is too low, and her body is sounding an alarm', 'Right. A blood sugar under 70 is low. The shaking, sweating and fast heartbeat are the body’s alarm system.', true],
      ['She is just tired from soccer', 'Tired kids don’t usually become confused and sweaty with a blood sugar of 48.'],
      ['She has a cold', 'A cold doesn’t make blood sugar fall this fast.'],
    ]],
    senior: ['How would you interpret the findings?', [
      ['Symptomatic hypoglycemia with adrenergic and neuroglycopenic features, still able to swallow', 'Correct. Tremor, sweating and tachycardia are adrenergic; confusion is neuroglycopenic. Because she can swallow, oral glucose is the right first treatment.', true],
      ['Diabetic ketoacidosis', 'DKA causes high blood sugar, vomiting and fast deep breathing. Her glucose is 48.'],
      ['Vasovagal syncope', 'She hasn’t fainted, and syncope doesn’t explain a glucose of 48.'],
    ]],
  },
  act: {
    junior: {
      prompt: 'Maya can still swallow. Put the first-aid steps in order.',
      steps: [['Stop the activity and have her sit down safely', 'A confused person can fall. Safety first.'], ['Check her blood sugar', 'Confirm the problem with a number.'], ['Give a fast sugar, like half a cup of juice', '15 grams of fast sugar raises blood sugar within minutes.'], ['Wait 15 minutes, then check again', 'If it is still under 70, give more fast sugar.'], ['Once she feels better, give a snack', 'A snack with carbohydrate and protein keeps the sugar from dropping again.']],
      distractors: [['Give her more insulin', 'Insulin lowers blood sugar. That would make this dangerous.'], ['Let her rest alone to sleep it off', 'Low blood sugar can get worse quickly. Never leave her alone.']],
    },
    senior: {
      prompt: 'Order the management of symptomatic hypoglycemia in a child who can swallow.',
      steps: [['Stop exercise, seat her safely and stay with her', 'Prevents injury if she worsens.'], ['Confirm with a point-of-care glucose', 'Under 70 mg/dL is hypoglycemia.'], ['Give 15 g of fast-acting carbohydrate (juice or glucose tablets)', 'The “rule of 15.” Avoid chocolate first: fat slows absorption.'], ['Recheck glucose in 15 minutes and repeat treatment if still under 70', 'Repeat the cycle until she is above 70 and alert.'], ['Give a snack with complex carbohydrate and protein', 'Prevents recurrence while the insulin is still working.'], ['Notify her family and diabetes team to review dosing', 'The mismatch that caused this can be prevented.']],
      distractors: [['Give an insulin correction dose', 'Contraindicated: insulin causes hypoglycemia.'], ['Give oral food to an unresponsive patient', 'If she cannot swallow, give glucagon and call 911; never put food in an unresponsive person’s mouth.']],
      wrap: 'If Maya could not swallow safely or had a seizure, the next step would be glucagon (intramuscular or intranasal) and a 911 call.',
    },
  },
  model: {
    junior: {
      layers: [['mismatch', 'Insulin and food are out of balance', 'The insulin was for more food than she ate.'], ['exercise', 'Exercise uses up sugar', 'Working muscles pull sugar from the blood.'], ['low', 'Blood sugar drops below 70', 'Too little fuel in the blood.'], ['alarm', 'The brain and body react', 'Alarm signals and a foggy brain.']],
      clues: [['dose', 'Insulin dose set for a full lunch', 'mismatch', 'The dose expected more food.'], ['half', 'Ate only half of lunch', 'mismatch', 'Less food than the insulin planned for.'], ['drills', 'Twenty minutes of soccer drills', 'exercise', 'Exercise burns sugar.'], ['bg', 'Blood sugar 48', 'low', 'Under 70 is low.'], ['shaky', 'Shaky, sweaty, fast heartbeat', 'alarm', 'Adrenaline makes the body shake and sweat.'], ['foggy', 'Foggy thinking, slow words', 'alarm', 'The brain runs on sugar. Without enough, thinking slows.']],
      wrap: 'Too much insulin for the food, plus exercise, pushed Maya’s blood sugar too low. Her body sounded the alarm and her brain ran short of fuel.',
    },
    senior: {
      layers: [['rel', 'Relative insulin excess', 'Bolus dosed for carbohydrate that wasn’t eaten.'], ['uptake', 'Increased glucose uptake by exercising muscle', 'Insulin-independent uptake rises with exercise.'], ['hypo', 'Hypoglycemia (glucose under 70 mg/dL)', 'Supply falls below demand.'], ['resp', 'Counter-regulatory and neuroglycopenic response', 'Epinephrine surge; brain glucose deprivation.']],
      clues: [['bolus', 'Full lunch bolus given', 'rel', 'Insulin on board exceeds need.'], ['ate', 'Half of the planned carbohydrate eaten', 'rel', 'Creates the mismatch.'], ['pe', 'Sustained running in PE', 'uptake', 'Exercise increases muscle glucose uptake and insulin sensitivity.'], ['glu', 'Glucose 48 mg/dL', 'hypo', 'Confirms hypoglycemia.'], ['adr', 'Tremor, diaphoresis, tachycardia 122', 'resp', 'Adrenergic symptoms from the epinephrine response.'], ['neuro', 'Slowed speech and confusion', 'resp', 'Neuroglycopenia: the brain depends on glucose.']],
      wrap: 'Your model predicts rapid improvement with glucose, and a recurrence risk while the insulin is still active.',
    },
  },
  ddx: {
    junior: { options: [
      ['low', 'Low blood sugar', 'leading', 'Fits everything: insulin, a skipped half-lunch, exercise and a blood sugar of 48.'],
      ['high', 'High blood sugar', 'possible', 'High sugar can make people feel unwell, but her meter reads 48.'],
      ['heat', 'Too hot or dehydrated', 'possible', 'Heat can cause weakness, but not a blood sugar of 48.'],
      ['head', 'A bump on the head', 'possible', 'Always worth asking about in sports. She says she didn’t hit her head.'],
      ['faint', 'About to faint', 'possible', 'Fainting can look similar, but the low sugar explains her symptoms.'],
      ['silly', 'Just being silly', 'unlikely', 'Never assume someone is pretending when they feel unwell.'],
    ] },
    senior: { options: [
      ['hypo', 'Insulin-induced hypoglycemia', 'leading', 'Insulin-food mismatch plus exercise with a glucose of 48.'],
      ['dka', 'Diabetic ketoacidosis', 'possible', 'Important in type 1 diabetes, but DKA brings hyperglycemia, vomiting and Kussmaul breathing.'],
      ['seiz', 'Seizure or postictal state', 'possible', 'Hypoglycemia can itself cause seizures. Check glucose in anyone who seizes.'],
      ['tbi', 'Head injury', 'cantmiss', 'Confusion during sports demands asking about head impact.'],
      ['adrenal', 'Adrenal insufficiency', 'possible', 'More common in people with type 1 diabetes and can cause hypoglycemia, but this is explained by the mismatch.'],
      ['heat', 'Exertional heat illness', 'possible', 'Consider on hot days, but it doesn’t explain a glucose of 48.'],
      ['vaso', 'Vasovagal syncope', 'unlikely', 'No syncope, and it wouldn’t lower glucose.'],
    ] },
  },
  labs: { r: [
    ['Fingerstick glucose', '48', 'mg/dL', '70–180 (target in diabetes)', 'low'],
    ['Glucose 15 minutes after juice', '96', 'mg/dL', '70–180', 'normal'],
    ['Blood ketones', '0.1', 'mmol/L', '< 0.6', 'normal'],
  ] },
  decision: {
    junior: ['What caused Maya’s low blood sugar?', [
      ['Her insulin was for a full lunch, she ate only half, then played hard', 'Exactly. More insulin than food, plus exercise, used up her blood sugar.', true],
      ['She ate too much sugar at lunch', 'Too much sugar raises blood sugar. Hers was low.'],
      ['Diabetes medicine doesn’t work', 'Her insulin worked. The problem was the balance between insulin, food and exercise.'],
    ]],
    senior: ['Which explanation is best supported?', [
      ['Hypoglycemia from an insulin-carbohydrate mismatch compounded by exercise', 'Correct. The labs confirm rapid correction with oral glucose and no ketosis.', true],
      ['Insulin pump failure', 'Pump failure deprives the body of insulin, causing hyperglycemia and ketosis.'],
      ['Adrenal crisis', 'Possible in type 1 diabetes, but the rapid response to glucose and the clear trigger make it unlikely.'],
    ]],
    wrap: 'After a second check reads 96, Maya eats crackers and cheese and feels like herself. Her diabetes team adjusts her plan for school days with PE.',
  },
  debrief: {
    science: 'Insulin lets sugar leave the blood and enter cells. When insulin is greater than what food and exercise require, blood sugar falls. The body releases adrenaline, causing shaking and sweating, while the brain, which runs on sugar, starts to slow down.',
    pearl: 'Use the rule of 15: 15 grams of fast sugar, recheck in 15 minutes. If someone with diabetes cannot swallow or is having a seizure, give glucagon and call 911. Never put food in an unconscious person’s mouth.',
    uncertainty: 'Her care team will look at her glucose monitor history and adjust insulin on PE days. A continuous glucose monitor with low alarms can warn her earlier.',
    human: 'Maya felt embarrassed in front of her classmates. Kids with diabetes manage a complicated job every day. Calm, quick help protects both their safety and their dignity.',
    closing: 'Knowing what to do in the first five minutes can change the outcome of an emergency.',
  },
  founder: 'Teaching point: hypoglycemia is an act-first emergency. Emphasize the rule of 15, glucagon for anyone who cannot swallow, and the insulin-food-exercise balance in type 1 diabetes. Invite a cadet with diabetes, if comfortable, to share how they recognize their own lows.',
});

export const SEIZURE = makeCase({
  code: 'CASE-003', slug: 'leo-seizure', room: 'emergency-department', emergency: true,
  title: 'The Storm That Won’t Stop', summary: 'Leo’s seizure has lasted more than five minutes. Protect him, stop the seizure, then find the cause.',
  specialty: 'Neurology', system: 'Brain & Nerves', minutes: [15, 30],
  patient: { name: 'Leo Kim', age: 7, concern: 'Seizure lasting over 5 minutes', interests: ['Legos', 'Dinosaurs'] },
  art: 'a calm pediatric emergency room bay, a 7-year-old Korean-American boy lying on his side on a stretcher with an oxygen mask, a pediatric nurse and doctor beside him, a parent holding his hand, warm professional lighting, no visible distress',
  opening: {
    scene: 'Paramedics roll Leo into the emergency department. His arms and legs are jerking rhythmically and he doesn’t respond to his name. His mother says it started at home eight minutes ago.',
    dialogue: 'He has epilepsy, but his seizures usually stop in a minute. This one won’t stop.',
    speaker: 'Leo’s mom',
    narrator: 'A seizure lasting more than five minutes is an emergency called status epilepticus. The longer it lasts, the harder it is to stop. Act first, investigate second.',
  },
  history: {
    min: 3, speaker: 'Leo’s mom', prompt: 'Leo can’t answer right now, so ask his mom. Ask at least three questions.',
    q: [
      ['When did the seizure start?', 'About eight minutes before we got here. I timed it on my phone.', 'Timing matters. Treatment starts at five minutes.'],
      ['Has he been taking his seizure medicine?', 'We ran out three days ago. The pharmacy was waiting on a refill.', 'The key clue. Missing antiseizure medicine is one of the most common causes of breakthrough seizures.'],
      ['Has he been sick or had a fever?', 'No fever. He’s been healthy.', 'No fever makes infection of the brain less likely, though not impossible.'],
      ['Did he hit his head or fall?', 'No. He was on the couch watching a movie.', 'No trauma, so bleeding in the brain is less likely.'],
      ['Could he have swallowed any medicine or chemicals?', 'No. Everything is locked up.', 'Poisoning can cause seizures in children. Always ask.'],
      ['How has he been sleeping?', 'He had a sleepover and barely slept last night.', 'Sleep loss lowers the seizure threshold.'],
    ],
  },
  exam: {
    text: 'You observe while the team assesses Leo.',
    f: [['Movements', 'Rhythmic jerking of both arms and legs', 'abnormal'], ['Responsiveness', 'Does not respond to voice or touch', 'abnormal'], ['Oxygen saturation', '88% on room air', 'low'], ['Heart rate', '150 beats per minute', 'high'], ['Temperature', '37.4 °C (99.3 °F)', 'normal'], ['Head', 'No bruises or swelling', 'normal']],
    junior: ['What matters most right now?', [
      ['Keeping him safe, helping him breathe and stopping the seizure', 'Right. Protect, breathe, stop. Explanations come after.', true],
      ['Finding out what movie he was watching', 'It isn’t important right now. The seizure needs to stop.'],
      ['Waiting to see if it stops by itself', 'After five minutes, seizures often don’t stop on their own. Medicine is needed.'],
    ]],
    senior: ['How would you classify this event?', [
      ['Convulsive status epilepticus with hypoxemia', 'Correct. A generalized convulsive seizure beyond five minutes is status epilepticus and needs treatment now.', true],
      ['A simple febrile seizure', 'He has no fever, he is 7, and it has lasted over five minutes.'],
      ['A psychogenic event', 'Hypoxemia, tachycardia and an epilepsy history point to an epileptic seizure. Treat it as one.'],
    ]],
  },
  act: {
    junior: {
      prompt: 'Put the seizure first-aid steps in order.',
      steps: [['Stay calm and time the seizure', 'The length of the seizure guides treatment.'], ['Move hard or sharp things away and cushion the head', 'Prevent injury.'], ['Turn him onto his side', 'Saliva can drain and the airway stays open.'], ['Call 911 if it lasts more than five minutes', 'Long seizures need medicine.'], ['Stay with him until help arrives', 'Keep watching his breathing.']],
      distractors: [['Put something in his mouth so he doesn’t bite his tongue', 'Never. It can break teeth or block the airway.'], ['Hold his arms and legs down', 'Restraining can cause injuries. Let the movements happen safely.']],
    },
    senior: {
      prompt: 'Order the first-line management of convulsive status epilepticus.',
      steps: [['Position on side, support the airway and give oxygen', 'ABCs first; SpO₂ is 88%.'], ['Attach monitors and note the seizure start time', 'Track vitals and time to each intervention.'], ['Check a point-of-care glucose', 'Hypoglycemia is a fast, treatable cause.'], ['Give a benzodiazepine (IV lorazepam, or IM/intranasal midazolam)', 'First-line therapy at five minutes.'], ['Repeat the benzodiazepine once if still seizing after 5 more minutes', 'Maximum of two doses to limit respiratory depression.'], ['Give a second-line IV antiseizure medicine (levetiracetam, fosphenytoin or valproate)', 'For seizures continuing after benzodiazepines.']],
      distractors: [['Wait 20 minutes before giving medicine', 'Delay makes status epilepticus harder to stop.'], ['Get a head CT before any treatment', 'Stabilize and stop the seizure first; imaging can follow.']],
    },
  },
  model: {
    junior: {
      layers: [['trigger', 'His brain lost its protection', 'Missed medicine and little sleep.'], ['storm', 'Brain cells fire all at once', 'An electrical storm in the brain.'], ['body', 'The body shakes and he can’t respond', 'The storm controls the muscles.'], ['breath', 'Breathing gets harder', 'Less oxygen gets in during a long seizure.']],
      clues: [['ran', 'Ran out of seizure medicine 3 days ago', 'trigger', 'The medicine kept the storm from starting.'], ['sleep', 'Barely slept at a sleepover', 'trigger', 'Tired brains have seizures more easily.'], ['jerk', 'Jerking arms and legs', 'body', 'The storm sends signals to the muscles.'], ['resp', 'Not answering his name', 'body', 'During the storm the brain can’t respond.'], ['ox', 'Oxygen level 88%', 'breath', 'Long seizures make breathing less effective.']],
      wrap: 'Without his medicine, and tired from a sleepover, Leo’s brain had a storm it couldn’t stop by itself.',
    },
    senior: {
      layers: [['thr', 'Lowered seizure threshold', 'Missed medicine, sleep deprivation.'], ['sync', 'Hypersynchronous cortical discharge', 'Failure of inhibitory mechanisms.'], ['gtc', 'Generalized tonic-clonic activity with impaired consciousness', 'Clinical seizure.'], ['sec', 'Systemic consequences', 'Hypoxemia, tachycardia, lactic acidosis.']],
      clues: [['asm', 'No levetiracetam for 3 days', 'thr', 'Subtherapeutic medication is the most common precipitant in known epilepsy.'], ['sd', 'Sleep deprivation', 'thr', 'Sleep loss lowers the threshold.'], ['gen', 'Rhythmic bilateral jerking', 'gtc', 'Generalized convulsive activity.'], ['unr', 'Unresponsive to voice and touch', 'gtc', 'Impaired awareness.'], ['spo2', 'SpO₂ 88%', 'sec', 'Ineffective ventilation during convulsion.'], ['hr', 'Heart rate 150', 'sec', 'Sympathetic surge.']],
      wrap: 'Your model predicts a low levetiracetam level, normal glucose and sodium, and a lactate rise that clears after the seizure ends.',
    },
  },
  ddx: {
    junior: { options: [
      ['missed', 'A breakthrough seizure from missed medicine', 'leading', 'He has epilepsy and ran out of medicine three days ago.'],
      ['sugar', 'Very low blood sugar', 'possible', 'Low sugar can cause seizures. Check it every time.'],
      ['infection', 'An infection in the brain', 'possible', 'Serious, but he has no fever.'],
      ['head', 'A head injury', 'possible', 'He didn’t fall or hit his head.'],
      ['poison', 'Swallowing medicine or chemicals', 'possible', 'Always ask. His mom says everything is locked up.'],
      ['faking', 'Pretending', 'unlikely', 'His oxygen level fell. This is a real medical emergency.'],
    ] },
    senior: { options: [
      ['asm', 'Breakthrough seizure from missed antiseizure medicine', 'leading', 'Known epilepsy, three days without levetiracetam, and sleep deprivation.'],
      ['hypo', 'Hypoglycemia', 'cantmiss', 'Rapidly reversible. Check glucose in every seizing patient.'],
      ['cns', 'Meningitis or encephalitis', 'cantmiss', 'Less likely without fever, but must be considered if he does not return to baseline.'],
      ['na', 'Hyponatremia', 'possible', 'An electrolyte cause, checked with a basic metabolic panel.'],
      ['tox', 'Toxic ingestion', 'possible', 'Common in young children; history argues against it.'],
      ['ich', 'Intracranial hemorrhage', 'possible', 'No trauma, but consider imaging if there are focal signs.'],
      ['pnes', 'Psychogenic nonepileptic event', 'unlikely', 'Hypoxemia and known epilepsy point to an epileptic seizure.'],
    ] },
  },
  labs: { r: [
    ['Glucose', '104', 'mg/dL', '70–140', 'normal'],
    ['Sodium', '138', 'mmol/L', '135–145', 'normal'],
    ['Levetiracetam level', 'Undetectable', '', 'Therapeutic range varies', 'low', 'Confirms missed doses'],
    ['Lactate', '4.8', 'mmol/L', '0.5–2.2', 'high', 'Expected after a convulsion; should clear'],
    ['White blood cells', '9.1', 'K/µL', '4.5–13.5', 'normal'],
    ['Urine drug screen', 'Negative', '', 'Negative', 'normal'],
  ] },
  decision: {
    junior: ['Look back at your differential. What most likely caused Leo’s seizure?', [
      ['Running out of his seizure medicine, plus not sleeping', 'Yes. His medicine protects his brain from storms. Without it, a storm started and wouldn’t stop.', true],
      ['A brain infection', 'He has no fever, and his tests point to missed medicine.'],
      ['Watching a movie', 'Most movies don’t cause seizures. His missing medicine is the clue.'],
    ]],
    senior: ['With the results in hand, which explanation is best supported?', [
      ['Status epilepticus from subtherapeutic antiseizure medication and sleep deprivation', 'Correct. Undetectable levetiracetam with normal glucose, sodium and toxicology.', true],
      ['Hyponatremic seizure', 'Sodium is 138.'],
      ['Encephalitis', 'No fever and normal white count; reconsider if he fails to return to baseline.'],
    ]],
    wrap: 'After intranasal midazolam and IV levetiracetam, Leo’s seizure stops. An hour later he is sleepy but talking. The team makes sure the refill is in hand and gives his family a rescue medicine plan.',
  },
  debrief: {
    science: 'A seizure is a sudden storm of electrical activity in the brain. Antiseizure medicines calm brain cells. When Leo missed his medicine and lost sleep, the storm began and his brain couldn’t stop it alone.',
    pearl: 'Seizure first aid: time it, protect the head, turn them on their side, nothing in the mouth, and call 911 if it lasts more than five minutes. In the hospital, check glucose early and give a benzodiazepine at five minutes.',
    uncertainty: 'His neurologist will review whether his medicine dose needs adjusting and make sure his family has a home rescue medicine for future long seizures.',
    human: 'A pharmacy delay caused this emergency. Healers look beyond the body to the systems around patients: refills, cost and access.',
    closing: 'Fast, calm action protects the brain. Thoughtful follow-up protects the family.',
  },
  founder: 'Teaching point: status epilepticus is time-critical; benzodiazepine at five minutes and glucose check. Discuss medication access as a social driver of emergencies. Share a story about a family navigating a refill barrier.',
});

export const NEONATAL = makeCase({
  code: 'CASE-004', slug: 'baby-amara', room: 'newborn-nursery', emergency: true,
  title: 'The First Breath', summary: 'A newborn is limp and not breathing. The first minute after birth matters most.',
  specialty: 'Neonatology', system: 'Newborn', minutes: [15, 30],
  patient: { name: 'Baby Amara Okafor', age: 'Newborn (39 weeks)', concern: 'Not breathing at birth' },
  art: 'a bright modern delivery room with a newborn baby on a radiant warmer bed wrapped in a white towel, gloved hands of a neonatal nurse holding a small bag-mask over the baby, warm overhead light, a neonatologist watching a monitor, calm focused atmosphere',
  opening: {
    scene: 'Baby Amara is born after a long labor. She is limp, her skin is bluish and she isn’t crying or breathing. The neonatal team carries her to the warmer.',
    narrator: 'Most newborns start breathing on their own. About 1 in 10 need some help, and a few need breaths given for them. The first 60 minutes after birth is called the golden hour, and the first 60 seconds is the golden minute.',
    narratorRole: 'Neonatologist',
  },
  history: {
    min: 3, speaker: 'Labor nurse', prompt: 'Ask the labor nurse about the pregnancy and delivery. Ask at least three questions.',
    q: [
      ['How many weeks pregnant was mom?', '39 weeks. Full term.', 'A full-term baby has mature lungs, so breathing problems likely came from the birth itself.'],
      ['Was the amniotic fluid clear?', 'Yes, clear.', 'Clear fluid makes meconium (the baby’s first stool) a less likely cause of breathing trouble.'],
      ['How did the labor go?', 'Long. The baby’s heart rate dipped during the last hour.', 'Heart-rate dips during labor can mean the baby received less oxygen before birth.'],
      ['Did mom receive pain medicine?', 'An IV opioid about an hour before delivery.', 'Opioids cross the placenta and can make a newborn breathe less. Breathing support still comes first.'],
      ['Did mom have a fever or infection?', 'No fever.', 'Maternal fever raises the risk of newborn infection.'],
    ],
  },
  exam: {
    title: 'First 30 seconds',
    text: 'After drying and stimulating, the team assesses Amara.',
    f: [['Breathing', 'Not breathing, occasional gasps', 'abnormal'], ['Heart rate', '80 beats per minute', 'low'], ['Muscle tone', 'Limp', 'abnormal'], ['Color', 'Blue', 'abnormal'], ['Temperature', 'Dried and warm under the warmer', 'normal']],
    junior: ['Amara is not breathing and her heart is slow. What does she need most?', [
      ['Help breathing: breaths given with a bag and mask', 'Yes. In newborns, a slow heart rate is almost always caused by not enough breathing. Breaths fix it.', true],
      ['A bath', 'Warmth and breathing come first.'],
      ['Time to wake up on her own', 'She has already been dried and stimulated. Waiting would be dangerous.'],
    ]],
    senior: ['Apnea with heart rate 80 after initial steps. What is indicated?', [
      ['Positive-pressure ventilation within the first minute of life', 'Correct. Apnea, gasping or heart rate under 100 means PPV now. Ventilation is the most important step in neonatal resuscitation.', true],
      ['Chest compressions', 'Compressions start only if the heart rate stays under 60 after 30 seconds of effective ventilation.'],
      ['Naloxone', 'Not recommended as a first step. Support breathing with PPV.'],
    ]],
  },
  act: {
    title: 'The golden minute',
    junior: {
      prompt: 'Put the newborn rescue steps in order.',
      steps: [['Keep the baby warm and dry', 'Newborns lose heat quickly. Cold babies breathe less well.'], ['Rub the baby’s back to help her breathe', 'Gentle stimulation can start breathing.'], ['Open the airway by tilting the head a little', 'The “sniffing” position opens the airway.'], ['Give breaths with a bag and mask', 'Breathing for the baby brings oxygen to the heart.'], ['Check the heart rate', 'A rising heart rate means the breaths are working.']],
      distractors: [['Hold the baby upside down and pat her', 'An old myth. It doesn’t help and can hurt.'], ['Give the baby a bath first', 'A bath would make her cold and delay breathing help.']],
    },
    senior: {
      prompt: 'Order the neonatal resuscitation steps for this apneic newborn with heart rate 80.',
      steps: [['Warm, dry and stimulate under the radiant warmer', 'Initial steps, done in the first 30 seconds.'], ['Position the head in “sniffing” position and clear secretions if needed', 'Opens the airway.'], ['Begin positive-pressure ventilation at 40–60 breaths per minute', 'Within 60 seconds of birth: the golden minute.'], ['Place a pulse oximeter on the right hand', 'Pre-ductal saturation guides oxygen.'], ['Check that the heart rate is rising after 15 seconds of PPV', 'The best sign of effective ventilation.'], ['If not rising, do ventilation corrective steps (MR. SOPA)', 'Mask, Reposition, Suction, Open mouth, Pressure, Airway alternative.']],
      distractors: [['Start chest compressions immediately', 'Only if the heart rate stays under 60 after 30 seconds of effective ventilation.'], ['Give naloxone before ventilating', 'Ventilation comes first; naloxone is not recommended in the initial resuscitation.']],
      wrap: 'With good breaths, Amara’s heart rate climbs to 140. At three minutes she takes her first cry.',
    },
  },
  model: {
    junior: {
      layers: [['labor', 'A long, hard birth', 'Stress before birth.'], ['less', 'Less oxygen before birth', 'The baby used up her reserve.'], ['tired', 'Too tired to start breathing', 'No breathing means no new oxygen.'], ['heart', 'The heart slows down', 'A heart without oxygen beats slowly.']],
      clues: [['long', 'Long labor', 'labor', 'Long labors are stressful for babies.'], ['dips', 'Heart-rate dips during labor', 'less', 'Dips can mean less oxygen reached the baby.'], ['opioid', 'Pain medicine given to mom', 'tired', 'Some pain medicines make newborns sleepy and breathe less.'], ['apnea', 'Not breathing, limp', 'tired', 'She can’t start breathing on her own yet.'], ['hr80', 'Heart rate 80', 'heart', 'Without oxygen, the heart slows.'], ['blue', 'Blue color', 'heart', 'Blue skin means low oxygen in the blood.']],
      wrap: 'A hard birth left Amara too tired to breathe, so her heart slowed. Giving breaths brings oxygen back to the heart.',
    },
    senior: {
      layers: [['stress', 'Perinatal stressors', 'Prolonged labor, late decelerations, maternal opioid.'], ['apnea', 'Primary or secondary apnea', 'Hypoxia suppresses the drive to breathe.'], ['vent', 'Inadequate ventilation and hypoxemia', 'Lungs not inflated.'], ['brady', 'Bradycardia', 'Myocardial hypoxia; reverses with ventilation.']],
      clues: [['pl', 'Prolonged labor', 'stress', 'Increases risk of intrapartum hypoxia.'], ['ld', 'Fetal heart-rate decelerations', 'stress', 'Suggests intrapartum hypoxia.'], ['op', 'Maternal IV opioid 1 hour before birth', 'apnea', 'Can depress neonatal respiratory drive.'], ['gasp', 'Apnea with occasional gasps', 'apnea', 'Gasping is not effective breathing.'], ['cy', 'Central cyanosis', 'vent', 'Hypoxemia from absent ventilation.'], ['hr', 'Heart rate 80', 'brady', 'Neonatal bradycardia is almost always respiratory in origin.']],
      wrap: 'Your model predicts that effective ventilation alone will raise the heart rate, and that cord gases will show acidosis.',
    },
  },
  ddx: {
    junior: { options: [
      ['birth', 'Needs help starting to breathe after a hard birth', 'leading', 'A long labor with heart-rate dips explains why Amara was too tired to breathe.'],
      ['med', 'Sleepy from mom’s pain medicine', 'possible', 'Can add to the problem. Breaths still come first.'],
      ['infection', 'An infection', 'possible', 'Mom had no fever, so infection is less likely.'],
      ['heart', 'A heart problem from birth', 'possible', 'If breaths don’t help, the team looks for heart problems.'],
      ['sleep', 'Just sleeping', 'unlikely', 'A sleeping baby breathes. Amara wasn’t breathing.'],
    ] },
    senior: { options: [
      ['asphyxia', 'Respiratory depression after perinatal hypoxia', 'leading', 'Prolonged labor, decelerations, apnea and bradycardia that respond to PPV.'],
      ['opioid', 'Maternal opioid effect', 'possible', 'Contributes to decreased respiratory drive.'],
      ['sepsis', 'Early-onset sepsis', 'possible', 'No maternal fever, but monitor closely.'],
      ['ptx', 'Pneumothorax', 'cantmiss', 'Suspect if she suddenly worsens during ventilation.'],
      ['chd', 'Congenital heart disease', 'possible', 'Consider if hypoxemia persists despite good ventilation.'],
      ['cdh', 'Congenital diaphragmatic hernia', 'possible', 'Scaphoid abdomen and poor response to bag-mask; avoid prolonged bag-mask.'],
      ['normal', 'Normal transition', 'unlikely', 'Apnea with a heart rate of 80 is not normal transition.'],
    ] },
  },
  labs: { title: 'Cord blood and scores', r: [
    ['Umbilical arterial pH', '7.12', '', '7.20–7.38', 'low'],
    ['Base deficit', '10', 'mmol/L', '< 8', 'high'],
    ['Glucose (1 hour)', '52', 'mg/dL', '> 45', 'normal'],
    ['Apgar score at 1 minute', '3', '', '7–10', 'low'],
    ['Apgar score at 5 minutes', '7', '', '7–10', 'normal', 'Improved with ventilation'],
  ] },
  decision: {
    junior: ['Look back at your differential. Why did Amara need help?', [
      ['A hard birth left her too tired to start breathing, so her heart slowed', 'Exactly. Once the team breathed for her, her heart sped up and she started breathing on her own.', true],
      ['She had a heart problem', 'Her heart sped up as soon as she got oxygen, so the problem was breathing.'],
      ['She was cold', 'Staying warm matters, but the main problem was breathing.'],
    ]],
    senior: ['Which explanation is best supported?', [
      ['Respiratory depression after perinatal hypoxia, reversed by effective ventilation', 'Correct. Mild cord acidosis, Apgar 3 → 7 and a rapid heart-rate response to PPV.', true],
      ['Cyanotic congenital heart disease', 'Her saturation and heart rate normalized with ventilation.'],
      ['Septic shock', 'No maternal risk factors, and she responded quickly to ventilation.'],
    ]],
    wrap: 'Amara is monitored in the nursery. The team checks her for signs of brain injury from low oxygen, since cooling therapy can help babies who meet criteria.',
  },
  debrief: {
    science: 'Before birth, the placenta supplies oxygen. At birth, the lungs must fill with air for the first time. A stressful birth can leave a baby unable to start breathing, and in newborns a slow heart rate nearly always means not enough breathing.',
    pearl: 'In newborn resuscitation, ventilation is the most important step. Warm, dry, stimulate, open the airway, and if the baby isn’t breathing or the heart rate is under 100, start breaths within the first minute.',
    uncertainty: 'The team will watch Amara for feeding, blood sugar and signs of brain injury over the next hours and days.',
    human: 'Amara’s parents watched the team work in silence. Afterward, explaining what happened in simple words helped them breathe again too.',
    closing: 'The golden minute belongs to the people who practice before it comes.',
  },
  founder: 'Teaching point: in neonates, bradycardia is a ventilation problem until proven otherwise; PPV within 60 seconds. Compressions only if HR < 60 after 30 s of effective PPV. Consider bringing a newborn manikin to a live session.',
});

export const HYPOVOLEMIC = makeCase({
  code: 'CASE-005', slug: 'sofia-dehydration', room: 'emergency-department', emergency: true,
  title: 'Running on Empty', summary: 'Sofia has been vomiting and having diarrhea for three days. Now she is too quiet. Recognize shock and refill the tank.',
  specialty: 'Emergency Medicine', system: 'Digestive System', minutes: [15, 30],
  patient: { name: 'Sofia Ramirez', age: 2, concern: 'Vomiting, diarrhea and very sleepy' },
  art: 'a pediatric emergency room with a sleepy 2-year-old Latina toddler lying on her mother’s lap on a hospital bed, pale with dry lips and sunken eyes, a nurse gently placing a small blanket, soft professional lighting',
  opening: {
    scene: 'Sofia’s mother carries her into the emergency department. Sofia is pale, her lips are dry and cracked, and she barely opens her eyes when the nurse touches her.',
    dialogue: 'She’s been throwing up and having diarrhea for three days. Today she won’t play at all.',
    speaker: 'Sofia’s mom',
    narrator: 'Shock means the body’s organs aren’t getting enough blood and oxygen. In children, the heart rate climbs to compensate, and blood pressure can stay normal until very late.',
  },
  history: {
    min: 3, speaker: 'Sofia’s mom', prompt: 'Sofia is too young to explain. Ask her mom at least three questions.',
    q: [
      ['How many times has she vomited or had diarrhea?', 'Vomiting maybe eight times today. Watery diarrhea all day.', 'Large ongoing fluid losses.'],
      ['When was her last wet diaper?', 'This morning. More than eight hours ago.', 'Very few wet diapers means the kidneys are saving every drop.'],
      ['Is she drinking?', 'She throws up everything, even water.', 'She can’t replace what she is losing.'],
      ['Is there any blood in the diarrhea?', 'No blood. Just watery.', 'Bloody diarrhea would raise concern for other infections or HUS.'],
      ['Has anyone else been sick?', 'Her daycare had a stomach bug going around.', 'Viral gastroenteritis spreads quickly in daycares.'],
      ['Does she have any medical problems?', 'No. She’s always been healthy.', 'A healthy child usually responds well to treatment.'],
    ],
  },
  exam: {
    text: 'You watch as the team examines Sofia.',
    f: [['Heart rate', '170 beats per minute', 'high'], ['Blood pressure', '84/48', 'note'], ['Capillary refill', '4 seconds', 'abnormal'], ['Hands and feet', 'Cool and mottled', 'abnormal'], ['Eyes and mouth', 'Sunken eyes, no tears, dry mouth', 'abnormal'], ['Alertness', 'Sleepy, weak cry', 'abnormal'], ['Weight', '10 kg (11 kg last month)', 'low']],
    junior: ['What do these findings tell you?', [
      ['Her body is very low on fluid, and her heart is racing to make up for it', 'Right. A fast heart, cool hands and slow capillary refill show her blood vessels are running low.', true],
      ['She is just tired from being sick', 'Sleepiness here is a warning sign that her brain isn’t getting enough blood.'],
      ['She has a fever', 'Her signs show low fluid, not fever.'],
    ]],
    senior: ['How do you classify her circulation?', [
      ['Hypovolemic shock with signs of poor perfusion; blood pressure is not yet low', 'Correct. Tachycardia, delayed capillary refill, mottling and altered mental status define shock. Hypotension is a late sign in children.', true],
      ['Mild dehydration', 'She has lost about 10% of her body weight and shows signs of shock.'],
      ['Cardiogenic shock', 'Her history of fluid losses points to hypovolemia; no gallop, enlarged liver or crackles.'],
    ]],
  },
  act: {
    junior: {
      prompt: 'Put the team’s first steps in order.',
      steps: [['Call the team and give oxygen', 'Shock is an all-hands emergency.'], ['Put in a small IV', 'A tiny tube in a vein lets fluid go directly into the blood.'], ['Give a big dose of salt water through the IV quickly', 'This refills the blood vessels.'], ['Check if she is getting better', 'Look at her heart rate, hands and alertness.'], ['Give more fluid if she still needs it', 'Some children need more than one dose.']],
      distractors: [['Give her a big cup of juice', 'She is vomiting everything and too sleepy to drink safely.'], ['Wait for blood test results first', 'Shock needs treatment now.']],
    },
    senior: {
      prompt: 'Order the initial management of pediatric hypovolemic shock.',
      steps: [['Assess airway and breathing, give oxygen, attach monitors', 'ABCs first.'], ['Obtain IV access, or intraosseous if IV fails within 90 seconds', 'Rapid vascular access.'], ['Give a 20 mL/kg isotonic crystalloid bolus over 5–10 minutes', 'Normal saline or lactated Ringer’s; for Sofia, 200 mL.'], ['Check point-of-care glucose', 'Young children with gastroenteritis can become hypoglycemic.'], ['Reassess heart rate, capillary refill, mental status and urine output', 'After every bolus.'], ['Repeat 20 mL/kg boluses as needed, watching for fluid overload', 'Then transition to maintenance plus replacement.']],
      distractors: [['Bolus with half-normal saline with dextrose', 'Hypotonic fluids can cause hyponatremia; boluses should be isotonic.'], ['Start an inotrope before giving any fluid', 'Hypovolemic shock is treated with volume first.']],
    },
  },
  model: {
    junior: {
      layers: [['bug', 'A stomach bug', 'An infection in the intestines.'], ['loss', 'Fluid pours out', 'Vomiting and diarrhea.'], ['empty', 'Blood vessels run low', 'Less blood to pump.'], ['shock', 'The body protects its most important organs', 'Hands get cold, the heart races and the brain gets sleepy.']],
      clues: [['daycare', 'Stomach bug at daycare', 'bug', 'Germs spread easily among toddlers.'], ['vomit', 'Vomiting everything', 'loss', 'She can’t keep fluid in.'], ['watery', 'Watery diarrhea all day', 'loss', 'Diarrhea drains a lot of water and salt.'], ['diaper', 'No wet diaper for 8 hours', 'empty', 'The kidneys are saving water.'], ['hr', 'Heart rate 170', 'shock', 'The heart races to move the blood that is left.'], ['cold', 'Cool, blotchy hands and feet', 'shock', 'Blood is pulled away from the skin toward vital organs.'], ['sleepy', 'Very sleepy', 'shock', 'The brain isn’t getting enough blood.']],
      wrap: 'A stomach bug drained Sofia’s fluid faster than she could drink, so her blood vessels ran low and her body went into shock.',
    },
    senior: {
      layers: [['ge', 'Acute viral gastroenteritis', 'Enteric infection.'], ['vol', 'Ongoing GI losses exceed intake', 'Water and electrolyte loss.'], ['preload', 'Reduced intravascular volume and preload', 'Lower stroke volume.'], ['comp', 'Compensated shock', 'Tachycardia and vasoconstriction maintain blood pressure.']],
      clues: [['exp', 'Daycare outbreak', 'ge', 'Epidemiologic exposure.'], ['emesis', 'Persistent emesis', 'vol', 'Inability to replace losses.'], ['diar', 'Watery stools', 'vol', 'Large water and sodium losses.'], ['wt', '10% weight loss', 'preload', 'Estimates severe dehydration.'], ['olig', 'Oliguria', 'preload', 'Renal conservation of volume.'], ['tachy', 'Heart rate 170', 'comp', 'Maintains cardiac output when stroke volume falls.'], ['crt', 'Capillary refill 4 s, mottling', 'comp', 'Peripheral vasoconstriction.']],
      wrap: 'Your model predicts metabolic acidosis, raised BUN and lactate, and improvement after isotonic boluses.',
    },
  },
  ddx: {
    junior: { options: [
      ['dehydration', 'Losing too much fluid from a stomach bug', 'leading', 'Three days of vomiting and diarrhea and almost no wet diapers.'],
      ['infection', 'A blood infection', 'possible', 'Serious infections can cause shock. The team watches for fever and rash.'],
      ['blockage', 'A blocked intestine', 'possible', 'Can cause vomiting and sleepiness. Doctors check her belly.'],
      ['sugar', 'A blood sugar problem', 'possible', 'Doctors check sugar in every sick child.'],
      ['tired', 'Just tired', 'unlikely', 'Sleepiness with a racing heart is a warning sign.'],
    ] },
    senior: { options: [
      ['hypo', 'Hypovolemic shock from viral gastroenteritis', 'leading', 'Large GI losses, oliguria and compensated shock.'],
      ['sepsis', 'Septic shock', 'cantmiss', 'Can coexist with or mimic hypovolemia. Look for fever, rash, and poor response to fluid.'],
      ['intus', 'Intussusception', 'cantmiss', 'Lethargy and vomiting in toddlers; look for intermittent pain and bloody stools.'],
      ['dka', 'Diabetic ketoacidosis', 'possible', 'Vomiting and dehydration in a child; glucose distinguishes it.'],
      ['adrenal', 'Adrenal crisis', 'possible', 'Rare; consider if shock is refractory with low sodium and high potassium.'],
      ['hus', 'Hemolytic uremic syndrome', 'possible', 'Follows bloody diarrhea; her diarrhea is not bloody.'],
      ['tox', 'Toxic ingestion', 'unlikely', 'No exposure history.'],
    ] },
  },
  labs: { r: [
    ['Sodium', '134', 'mmol/L', '135–145', 'low'],
    ['Potassium', '3.2', 'mmol/L', '3.5–5.0', 'low'],
    ['Bicarbonate', '13', 'mmol/L', '20–28', 'low'],
    ['BUN', '34', 'mg/dL', '5–18', 'high'],
    ['Creatinine', '0.5', 'mg/dL', '0.2–0.4 (age 2)', 'high'],
    ['Glucose', '64', 'mg/dL', '70–140', 'low'],
    ['Lactate', '3.6', 'mmol/L', '0.5–2.2', 'high'],
  ] },
  decision: {
    junior: ['Look back at your differential. What caused Sofia’s shock?', [
      ['A stomach bug made her lose more fluid than she could drink', 'Yes. Refilling her blood vessels with IV fluid brought her color and energy back.', true],
      ['A broken bone', 'Nothing in her story points to an injury.'],
      ['Eating too much', 'She couldn’t keep anything down.'],
    ]],
    senior: ['Which explanation is best supported?', [
      ['Hypovolemic shock from gastroenteritis with metabolic acidosis and prerenal kidney injury', 'Correct. Raised BUN and creatinine, low bicarbonate and lactate all fit poor perfusion.', true],
      ['Diabetic ketoacidosis', 'Glucose is 64, not high.'],
      ['Septic shock', 'Possible early, but she has no fever and improves with fluids.'],
    ]],
    wrap: 'After two boluses, Sofia’s heart rate falls to 130, her hands warm up and she cries for her mom: a good sign. She gets dextrose-containing fluids, anti-nausea medicine and is admitted until she can drink.',
  },
  debrief: {
    science: 'Blood vessels need enough fluid to carry oxygen to the organs. When a child loses more fluid than they take in, the heart beats faster and the vessels in the skin squeeze shut to protect the brain, heart and kidneys. That is compensated shock.',
    pearl: 'In children, low blood pressure is a late sign of shock. Watch the heart rate, capillary refill, skin temperature, alertness and wet diapers. Oral rehydration prevents most cases if started early.',
    uncertainty: 'Most viral gastroenteritis gets better in a few days. The team will watch her electrolytes and kidney function as she recovers.',
    human: 'Sofia’s mom tried everything at home. Families need clear guidance on warning signs and when to come in.',
    closing: 'Small bodies hold small reserves. Recognizing shock early lets healers act while there is still time.',
  },
  founder: 'Teaching point: pediatric shock is recognized by tachycardia and perfusion signs before hypotension. Isotonic 20 mL/kg boluses with reassessment. Mention the rotavirus vaccine and oral rehydration as global health successes.',
});

export const CARDIOGENIC = makeCase({
  code: 'CASE-006', slug: 'marcus-heart', room: 'emergency-department', emergency: true,
  title: 'A Tired Heart', summary: 'Two weeks after the flu, Marcus can’t catch his breath and can’t lie flat. Recognize when the pump itself is failing.',
  specialty: 'Cardiology', system: 'Heart & Circulation', minutes: [20, 35],
  patient: { name: 'Marcus Johnson', age: 15, concern: 'Short of breath, can’t lie flat', interests: ['Track', 'Music production'] },
  art: 'a 15-year-old Black teenage boy sitting upright on an emergency room stretcher, breathing hard, wearing a hospital gown with cardiac monitor leads, a cardiologist holding a bedside ultrasound probe, monitor glowing in the background, tense but calm',
  opening: {
    scene: 'Marcus sits bolt upright on the stretcher, breathing fast. He says he had “the flu” two weeks ago. Now he can’t climb stairs and has been sleeping sitting up in a chair.',
    dialogue: 'Every time I lie down, I feel like I’m drowning.',
    narrator: 'Not every shock comes from low fluid. Sometimes the heart itself is too weak to pump. Then the treatment is very different, and giving too much fluid can make things worse.',
  },
  history: {
    min: 3,
    q: [
      ['When did you start feeling this way?', 'About a week after I had the flu. It’s gotten worse every day.', 'A viral illness followed by heart symptoms is a classic story for myocarditis.'],
      ['Can you lie flat?', 'No. I sleep sitting up in a chair.', 'Breathlessness lying flat (orthopnea) suggests fluid backing up into the lungs from a weak heart.'],
      ['Do you have chest pain?', 'A pressure, kind of in the middle.', 'Inflammation of the heart muscle can cause chest discomfort.'],
      ['How is your stomach?', 'It hurts on the right side, and I threw up this morning.', 'A congested liver from a backed-up heart can cause right upper belly pain and vomiting.'],
      ['Has your heart ever raced or skipped?', 'Yeah, it feels like it’s pounding.', 'Palpitations can mean fast or irregular heart rhythms.'],
      ['Does anyone in your family have heart problems?', 'Not that I know of.', 'Family history helps screen for inherited heart muscle diseases.'],
    ],
  },
  exam: {
    text: 'You observe as the team examines Marcus.',
    f: [['Heart rate', '140 beats per minute', 'high'], ['Blood pressure', '86/60', 'low'], ['Breathing', '32 per minute, crackles in both lungs', 'abnormal'], ['Oxygen saturation', '93%', 'low'], ['Heart sounds', 'Extra sound (gallop rhythm)', 'abnormal'], ['Liver', 'Enlarged, 4 cm below the ribs', 'abnormal'], ['Hands and feet', 'Cool and clammy, capillary refill 4 s', 'abnormal']],
    junior: ['Which body system needs attention first?', [
      ['The heart: it isn’t pumping strongly enough', 'Yes. The extra heart sound, enlarged liver and fluid in the lungs all point to a heart that is struggling.', true],
      ['The stomach', 'His belly pain comes from blood backing up into the liver because the heart is weak.'],
      ['The bones', 'Nothing points to the bones.'],
    ]],
    senior: ['What type of shock is this?', [
      ['Cardiogenic shock with pulmonary and hepatic congestion', 'Correct. Hypotension and poor perfusion with a gallop, crackles and hepatomegaly mean pump failure.', true],
      ['Hypovolemic shock', 'He has signs of fluid overload: crackles, hepatomegaly, orthopnea.'],
      ['Distributive (septic) shock', 'Septic shock usually starts warm; his extremities are cold and congested.'],
    ]],
  },
  act: {
    junior: {
      prompt: 'Put the team’s first steps in order for a heart that isn’t pumping well.',
      steps: [['Give oxygen and keep him sitting up', 'Sitting up helps him breathe.'], ['Put on heart monitors', 'Watch his rhythm and blood pressure.'], ['Look at the heart with an ultrasound', 'See how strongly it squeezes.'], ['Give medicine that helps the heart squeeze', 'A weak pump needs help, not just more fluid.'], ['Call the heart team and the ICU', 'He needs a team that cares for sick hearts.']],
      distractors: [['Give lots and lots of fluid quickly', 'Too much fluid can flood a weak heart and lungs.'], ['Lay him flat to rest', 'Lying flat makes his breathing worse.']],
    },
    senior: {
      prompt: 'Order the initial management of suspected cardiogenic shock.',
      steps: [['Support breathing with oxygen; sit him upright; attach monitors', 'Avoid laying flat.'], ['Obtain an ECG and point-of-care echocardiogram', 'Assess rhythm and ventricular function.'], ['Give a small, cautious fluid bolus (5–10 mL/kg) only if preload seems low, then reassess', 'Large boluses can worsen pulmonary edema.'], ['Start an inotrope such as epinephrine or milrinone', 'Support contractility and perfusion.'], ['Involve cardiology and the ICU early; prepare for mechanical support (ECMO) if he worsens', 'Children with fulminant myocarditis can deteriorate quickly.']],
      distractors: [['Give repeated 20 mL/kg boluses', 'Standard for hypovolemia, but dangerous in cardiogenic shock.'], ['Give a beta-blocker to slow the heart rate', 'His tachycardia is compensatory; slowing it could cause collapse.']],
    },
  },
  model: {
    junior: {
      layers: [['virus', 'A virus attacks the heart muscle', 'After the flu.'], ['weak', 'The heart squeezes weakly', 'The pump is tired.'], ['back', 'Blood backs up', 'Into the lungs and liver.'], ['less', 'Less blood reaches the body', 'Cold hands, fast heart.']],
      clues: [['flu', 'Flu two weeks ago', 'virus', 'Some viruses can inflame the heart.'], ['gallop', 'Extra heart sound', 'weak', 'A tired, stretched heart makes an extra sound.'], ['flat', 'Can’t breathe lying flat', 'back', 'Fluid backs into the lungs.'], ['liver', 'Big liver, belly pain', 'back', 'Blood backs up into the liver too.'], ['cold', 'Cold, clammy hands', 'less', 'The body pulls blood away from the skin.'], ['fast', 'Heart rate 140', 'less', 'The heart beats faster to make up for weak squeezes.']],
      wrap: 'A virus made Marcus’s heart muscle weak. Blood backed up into his lungs and liver, and less reached the rest of his body.',
    },
    senior: {
      layers: [['myo', 'Viral myocarditis', 'Inflammation and injury of myocytes.'], ['sys', 'Systolic dysfunction', 'Reduced ejection fraction.'], ['cong', 'Elevated filling pressures and congestion', 'Pulmonary and systemic venous congestion.'], ['low', 'Low cardiac output and compensatory responses', 'Hypoperfusion and sympathetic drive.']],
      clues: [['prod', 'Viral prodrome two weeks earlier', 'myo', 'Common antecedent of myocarditis.'], ['cp', 'Central chest pressure', 'myo', 'Myocardial inflammation.'], ['s3', 'Gallop rhythm (S3)', 'sys', 'Rapid filling of a dilated, dysfunctional ventricle.'], ['orth', 'Orthopnea and crackles', 'cong', 'Pulmonary venous congestion.'], ['hep', 'Hepatomegaly with RUQ pain', 'cong', 'Systemic venous congestion.'], ['cool', 'Cool extremities, CRT 4 s', 'low', 'Peripheral vasoconstriction from low output.'], ['bp', 'BP 86/60', 'low', 'Decompensated shock.']],
      wrap: 'Your model predicts elevated troponin and BNP, a reduced ejection fraction, and worsening with large fluid boluses.',
    },
  },
  ddx: {
    junior: { options: [
      ['myo', 'A virus that weakened the heart muscle', 'leading', 'Flu two weeks ago, then a weak pump with fluid backing up.'],
      ['pneum', 'Pneumonia', 'possible', 'Can cause breathing trouble, but not an enlarged liver and extra heart sound.'],
      ['asthma', 'Asthma', 'unlikely', 'Asthma causes wheezing, not a weak heart.'],
      ['blood', 'A blood infection', 'possible', 'Serious infections can cause shock. The heart findings point elsewhere.'],
      ['anx', 'Feeling anxious', 'unlikely', 'Anxiety doesn’t cause crackles, an enlarged liver and low blood pressure.'],
    ] },
    senior: { options: [
      ['myo', 'Acute viral myocarditis', 'leading', 'Viral prodrome, chest pain, heart failure and cardiogenic shock in a previously healthy teen.'],
      ['dcm', 'Dilated cardiomyopathy', 'possible', 'Genetic or idiopathic; may present similarly. Family screening and MRI help distinguish.'],
      ['tamp', 'Pericardial effusion with tamponade', 'cantmiss', 'Also causes hypotension and congestion; bedside echo distinguishes it immediately.'],
      ['sepsis', 'Septic shock', 'cantmiss', 'Must be considered in any shock; the congestion favors cardiogenic.'],
      ['arr', 'Tachyarrhythmia-induced cardiomyopathy', 'possible', 'An ECG identifies an incessant arrhythmia.'],
      ['acapa', 'Anomalous coronary artery', 'possible', 'A congenital cause of ischemia in young people.'],
      ['pna', 'Pneumonia', 'unlikely', 'Doesn’t explain the gallop, hepatomegaly and low output.'],
    ] },
  },
  labs: { title: 'Labs, ECG and echo', r: [
    ['Troponin I', '4.2', 'ng/mL', '< 0.04', 'high'],
    ['BNP', '3,200', 'pg/mL', '< 100', 'high'],
    ['Lactate', '4.1', 'mmol/L', '0.5–2.2', 'high'],
    ['ALT (liver)', '220', 'U/L', '7–40', 'high', 'From liver congestion'],
    ['ECG', 'Sinus tachycardia, low voltage', '', 'Normal sinus rhythm', 'note'],
    ['Echo: ejection fraction', '25', '%', '55–70', 'low'],
    ['Respiratory viral PCR', 'Enterovirus positive', '', 'Negative', 'note'],
  ] },
  decision: {
    junior: ['Look back at your differential. What explains Marcus’s illness?', [
      ['A virus weakened his heart muscle, so it can’t pump well', 'Exactly. His heart test shows it is squeezing at half strength or less.', true],
      ['He is out of shape', 'Exercise level doesn’t explain these findings.'],
      ['He has asthma', 'His problem is a weak heart, not narrowed airways.'],
    ]],
    senior: ['Which explanation is best supported?', [
      ['Acute myocarditis with cardiogenic shock', 'Correct. High troponin and BNP, EF 25% and a viral trigger.', true],
      ['Pericardial tamponade', 'The echo shows poor squeeze, not a large effusion.'],
      ['Septic shock', 'Congestion, low EF and a cold, wet profile fit cardiogenic shock.'],
    ]],
    wrap: 'Marcus goes to the cardiac ICU on milrinone and careful diuresis. Many children with myocarditis recover heart function over weeks to months; some need mechanical support or transplant evaluation.',
  },
  debrief: {
    science: 'The heart is a pump. When a virus inflames its muscle, each squeeze is weak. Blood backs up into the lungs (making it hard to breathe lying down) and the liver, while too little reaches the rest of the body.',
    pearl: 'Not all shock gets the same treatment. Fluid helps hypovolemic shock but can flood a weak heart. Clues for cardiogenic shock: a gallop, an enlarged liver, crackles and breathlessness lying flat.',
    uncertainty: 'Cardiac MRI and follow-up echocardiograms will show how much his heart recovers. He will need to avoid competitive sports until cleared.',
    human: 'Marcus thought he was just out of shape. Teens often downplay symptoms; asking specific questions, like whether he can lie flat, uncovers the truth.',
    closing: 'Knowing why the body is failing tells healers how to help it.',
  },
  founder: 'Teaching point: distinguish cardiogenic from hypovolemic shock; hepatomegaly, gallop and orthopnea are the clues, and fluid can harm. Myocarditis after a viral illness; return-to-play restrictions for athletes.',
});
