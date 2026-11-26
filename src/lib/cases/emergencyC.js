import { makeCase } from './kit';

// Emergency cases, part C. Values are illustrative teaching values.

export const HUS = makeCase({
  code: 'CASE-012', slug: 'lily-hus', room: 'emergency-department', emergency: true,
  title: 'After the County Fair', summary: 'A week after bloody diarrhea, Lily is pale, puffy and barely peeing. Connect the gut, the blood and the kidneys.',
  specialty: 'Pediatric Nephrology & Hematology', system: 'Kidneys & Urinary Tract', minutes: [20, 35],
  patient: { name: 'Lily Anderson', age: 4, concern: 'Pale, puffy and hardly peeing' },
  art: 'a pale tired 4-year-old girl with blond curly hair and a slightly puffy face sitting in a hospital bed holding a stuffed animal, her father beside her, a nurse checking her blood pressure with a small cuff, gentle pediatric ward lighting',
  opening: {
    scene: 'A week ago, Lily had cramping belly pain and bloody diarrhea after a visit to the county fair, where she petted farm animals and ate a hamburger. The diarrhea is getting better, but today she looks pale, her face is puffy and her diaper has been dry all day.',
    dialogue: 'She was finally getting better. Now she looks worse than ever.',
    speaker: 'Lily’s dad',
    narrator: 'Sometimes the most dangerous part of an illness arrives after the first symptoms fade. Follow the story from the gut to the blood to the kidneys.',
  },
  history: {
    min: 3, speaker: 'Lily’s dad', prompt: 'Ask Lily’s dad at least three questions.',
    q: [
      ['What happened at the county fair?', 'She petted goats at the petting zoo and ate a hamburger.', 'Farm animals and undercooked ground beef can carry Shiga toxin–producing E. coli.'],
      ['Was there blood in the diarrhea?', 'Yes, a lot, for about three days.', 'Bloody diarrhea is the classic first phase.'],
      ['Did she get antibiotics or diarrhea medicine?', 'No, we were waiting it out.', 'Antibiotics and antimotility medicines can raise the risk of HUS with this germ.'],
      ['When did she last pee?', 'Last night. Her diaper has been dry all day.', 'Falling urine output points to kidney injury.'],
      ['Have you noticed bruises or spots?', 'A few tiny red dots on her legs.', 'Petechiae can mean low platelets.'],
      ['Is she acting differently?', 'She’s very sleepy and cranky.', 'HUS can affect the brain too.'],
    ],
  },
  exam: {
    text: 'You observe the exam.',
    f: [['Skin', 'Pale with a yellow tint; petechiae on legs', 'abnormal'], ['Face and ankles', 'Puffy (edema)', 'abnormal'], ['Blood pressure', '128/82 (high for age)', 'high'], ['Heart rate', '130 beats per minute', 'high'], ['Abdomen', 'Mildly tender', 'note'], ['Urine output', 'None in 12 hours', 'low']],
    junior: ['Which body parts seem to be in trouble?', [
      ['Her blood and her kidneys', 'Right. Pale skin and spots point to the blood; puffiness and no pee point to the kidneys.', true],
      ['Only her stomach', 'Her diarrhea is improving. Something new is happening.'],
      ['Her lungs', 'Her breathing is fine.'],
    ]],
    senior: ['What pattern do you recognize?', [
      ['Possible thrombotic microangiopathy: anemia, thrombocytopenia and acute kidney injury after bloody diarrhea', 'Correct. This triad after STEC diarrhea suggests hemolytic uremic syndrome.', true],
      ['Dehydration from gastroenteritis', 'She is edematous and hypertensive, not dry.'],
      ['Nephrotic syndrome', 'Edema, but nephrotic syndrome doesn’t cause pallor, petechiae or anuria after bloody diarrhea.'],
    ]],
  },
  act: {
    junior: {
      prompt: 'Put the team’s first steps in order.',
      steps: [['Check her blood and urine tests', 'Confirm what is happening to her blood and kidneys.'], ['Give careful IV fluid', 'Just enough. Too much fluid can overload kidneys that aren’t working.'], ['Give a blood transfusion if she is very pale', 'Replaces red blood cells that were destroyed.'], ['Call the kidney team', 'They may need to use dialysis to clean her blood.'], ['Watch her blood pressure, pee and brain closely', 'Things can change quickly.']],
      distractors: [['Give antibiotics to kill the germ', 'With this germ, antibiotics can release more toxin.'], ['Give medicine to stop the diarrhea', 'Can keep the toxin in the body longer.']],
    },
    senior: {
      prompt: 'Order the initial management of suspected STEC-HUS.',
      steps: [['Assess perfusion, blood pressure and fluid status', 'She is oliguric and hypertensive.'], ['Send CBC with smear, chemistry, LDH, haptoglobin, Coombs and stool Shiga toxin testing', 'Confirm hemolysis and the cause.'], ['Restrict fluid to insensible losses plus output if oliguric', 'Avoid overload.'], ['Transfuse red cells if hemoglobin falls below about 6–7 g/dL or she is symptomatic', 'Avoid platelet transfusion unless bleeding or a procedure is needed.'], ['Treat hypertension and electrolyte problems', 'Watch potassium closely.'], ['Consult nephrology for dialysis (anuria, refractory hyperkalemia, overload)', 'Up to half of children with HUS need temporary dialysis.']],
      distractors: [['Start antibiotics for E. coli O157', 'May increase Shiga toxin release.'], ['Give loperamide', 'Antimotility agents are associated with worse outcomes.']],
    },
  },
  model: {
    junior: {
      layers: [['germ', 'A germ from animals or undercooked meat', 'A dangerous kind of E. coli.'], ['toxin', 'The germ makes a poison', 'The poison enters the blood.'], ['vessels', 'The poison hurts tiny blood vessels, especially in the kidneys', 'Small clots form.'], ['harm', 'Red cells get chopped, platelets get used up, kidneys stop working', 'Three problems at once.']],
      clues: [['fair', 'Petting zoo and a hamburger', 'germ', 'Where the germ came from.'], ['bloody', 'Bloody diarrhea', 'toxin', 'The germ injures the gut and releases its poison.'], ['pale', 'Pale and yellowish', 'harm', 'Red blood cells are being destroyed.'], ['spots', 'Tiny red spots', 'harm', 'Platelets are being used up.'], ['dry', 'No pee all day, puffy face', 'harm', 'The kidneys stopped filtering.'], ['bp', 'High blood pressure', 'vessels', 'Injured kidney vessels raise blood pressure.']],
      wrap: 'A germ’s poison traveled from Lily’s gut into her blood and damaged tiny vessels, especially in her kidneys.',
    },
    senior: {
      layers: [['stec', 'STEC infection (often O157:H7)', 'Colonic infection.'], ['stx', 'Shiga toxin absorption and endothelial binding', 'Gb3 receptors in glomeruli.'], ['tma', 'Thrombotic microangiopathy', 'Platelet-fibrin microthrombi in small vessels.'], ['triad', 'Microangiopathic hemolytic anemia, thrombocytopenia, AKI', 'The HUS triad.']],
      clues: [['exp', 'Petting zoo and undercooked beef', 'stec', 'Classic exposures.'], ['bd', 'Bloody diarrhea 5–10 days before', 'stx', 'Toxin-mediated colitis precedes HUS.'], ['htn', 'Hypertension', 'tma', 'Glomerular injury and volume overload.'], ['pal', 'Pallor and mild jaundice', 'triad', 'Hemolysis.'], ['pet', 'Petechiae', 'triad', 'Platelet consumption.'], ['anuria', 'Anuria and edema', 'triad', 'Acute kidney injury.']],
      wrap: 'Your model predicts schistocytes, high LDH, low haptoglobin, a negative Coombs test and a positive stool Shiga toxin.',
    },
  },
  ddx: {
    junior: { options: [
      ['hus', 'A germ poison damaging her blood and kidneys (HUS)', 'leading', 'Bloody diarrhea, then pale skin, spots, puffiness and no pee.'],
      ['dry', 'Being dried out', 'possible', 'Dehydration can reduce pee, but she is puffy, not dry.'],
      ['itp', 'A low platelet problem only', 'possible', 'Explains the spots, but not the kidneys or paleness.'],
      ['leuk', 'A blood cancer', 'possible', 'Can cause paleness and spots. Her story points to the germ.'],
      ['tired', 'Just tired after being sick', 'unlikely', 'No pee for a whole day is never just tiredness.'],
    ] },
    senior: { options: [
      ['stec', 'STEC hemolytic uremic syndrome', 'leading', 'Prodrome of bloody diarrhea followed by MAHA, thrombocytopenia and AKI.'],
      ['ahus', 'Complement-mediated (atypical) HUS', 'possible', 'No diarrheal trigger is typical; consider if STEC testing is negative or relapses occur.'],
      ['ttp', 'Thrombotic thrombocytopenic purpura', 'possible', 'Rare in young children; ADAMTS13 testing distinguishes it.'],
      ['dic', 'Sepsis with DIC', 'cantmiss', 'Also causes thrombocytopenia and organ injury; coagulation studies differ.'],
      ['aiha', 'Autoimmune hemolytic anemia', 'possible', 'Coombs-positive and without schistocytes.'],
      ['pre', 'Prerenal AKI from dehydration', 'possible', 'Doesn’t explain hemolysis, thrombocytopenia, edema or hypertension.'],
      ['itp', 'Immune thrombocytopenia', 'unlikely', 'Isolated thrombocytopenia without hemolysis or AKI.'],
    ] },
  },
  labs: { r: [
    ['Hemoglobin', '6.8', 'g/dL', '11.5–13.5', 'low'],
    ['Platelets', '42', 'K/µL', '150–450', 'low'],
    ['Blood smear', 'Schistocytes (fragmented red cells)', '', 'None', 'note'],
    ['LDH', '1,800', 'U/L', '< 300', 'high'],
    ['Haptoglobin', '< 10', 'mg/dL', '30–200', 'low'],
    ['Creatinine', '2.4', 'mg/dL', '0.2–0.5 (age 4)', 'high'],
    ['Potassium', '5.6', 'mmol/L', '3.5–5.0', 'high'],
    ['Direct Coombs test', 'Negative', '', 'Negative', 'normal'],
    ['Stool Shiga toxin', 'Positive', '', 'Negative', 'note'],
  ] },
  decision: {
    junior: ['Look back at your differential. What is happening to Lily?', [
      ['A germ’s poison is damaging her blood vessels, destroying blood cells and stopping her kidneys', 'Exactly. It’s called hemolytic uremic syndrome (HUS).', true],
      ['She is dehydrated', 'Her puffy face and high blood pressure show she has too much fluid, not too little.'],
      ['She has the flu', 'Her tests show something very different.'],
    ]],
    senior: ['Which explanation is best supported?', [
      ['STEC-associated hemolytic uremic syndrome', 'Correct. Coombs-negative MAHA with schistocytes, thrombocytopenia, AKI and stool Shiga toxin.', true],
      ['Atypical HUS', 'The STEC prodrome and positive Shiga toxin point to STEC-HUS.'],
      ['Autoimmune hemolytic anemia', 'The Coombs test is negative.'],
    ]],
    wrap: 'Lily needs dialysis for eight days and two red cell transfusions. Her kidneys slowly recover. She will have kidney check-ups for years, because some children have lasting effects.',
  },
  debrief: {
    science: 'Some E. coli make Shiga toxin. After injuring the gut, the toxin enters the blood and attacks tiny vessels, especially in the kidneys. Tiny clots use up platelets and slice red blood cells as they squeeze past, while the kidneys stop filtering.',
    pearl: 'HUS is the most common cause of sudden kidney failure in young children. Prevention: cook ground beef thoroughly and wash hands after touching farm animals. Avoid antibiotics and antidiarrheal medicines in suspected STEC.',
    uncertainty: 'Most children recover, but some develop high blood pressure or kidney problems later, so follow-up continues for years.',
    human: 'Lily’s dad feels guilty for the hamburger. Healers can turn guilt into prevention and partnership.',
    closing: 'Connecting the gut, the blood and the kidneys is how a healer sees the whole patient.',
  },
  founder: 'Teaching point: HUS triad after bloody diarrhea; no antibiotics or antimotility agents in suspected STEC; dialysis need. Contrast HUS and TTP in a live session.',
});

export const TTP = makeCase({
  code: 'CASE-013', slug: 'denise-ttp', room: 'emergency-department', emergency: true,
  title: 'Lost for Words', summary: 'Denise, a 34-year-old teacher, keeps losing her words and has tiny spots on her skin. A blood emergency hides behind the confusion.',
  specialty: 'Hematology', system: 'Blood & Cancer', minutes: [20, 35],
  patient: { name: 'Denise Morgan', age: 34, concern: 'Confusion, headache and tiny red spots', interests: ['Teaching', 'Gospel choir'] },
  art: 'a 34-year-old Black woman teacher sitting on an emergency room stretcher looking tired and puzzled, small red pinpoint spots on her forearm, a hematologist sitting beside her explaining with a tablet, plasma exchange machine visible in the background, calm hopeful lighting',
  opening: {
    scene: 'Denise, a fourth-grade teacher, came in because she twice forgot words in the middle of a lesson and has a bad headache. Her sister noticed tiny red spots on her arms and that her urine has turned dark.',
    dialogue: 'I was reading to my class and suddenly couldn’t find the word for “butterfly.”',
    narrator: 'Some blood disorders form tiny clots throughout the body’s smallest vessels. In TTP, hours matter. A missed diagnosis can be fatal; a fast one is usually survivable.',
  },
  history: {
    min: 3,
    q: [
      ['When did the word-finding trouble start?', 'Yesterday. It comes and goes.', 'Symptoms that come and go can mean small blood clots affecting the brain.'],
      ['What color is your urine?', 'Dark, like tea.', 'Dark urine can mean red blood cells are breaking apart (hemolysis).'],
      ['Have you noticed bruising or bleeding?', 'These little red dots, and my gums bleed when I brush.', 'Signs of a very low platelet count.'],
      ['How is your energy?', 'Exhausted. I get winded on the stairs.', 'Anemia reduces oxygen delivery.'],
      ['Are you pregnant or taking new medicines?', 'Not pregnant. No new medicines.', 'Pregnancy and some drugs can trigger thrombotic microangiopathies.'],
      ['Any diarrhea recently?', 'No.', 'Bloody diarrhea before kidney failure would suggest HUS.'],
    ],
  },
  exam: {
    text: 'You observe the exam.',
    f: [['Skin', 'Petechiae on arms and legs', 'abnormal'], ['Eyes', 'Slightly yellow', 'abnormal'], ['Neurologic', 'Mild word-finding difficulty; strength normal', 'abnormal'], ['Temperature', '37.9 °C (100.2 °F)', 'note'], ['Heart rate', '112 beats per minute', 'high'], ['Blood pressure', '138/86', 'note']],
    junior: ['Which clues point to a problem in the blood?', [
      ['Tiny red spots, yellow eyes, dark urine and tiredness', 'Right. These suggest low platelets and red blood cells breaking apart.', true],
      ['Her job as a teacher', 'Her job isn’t a clue to this illness.'],
      ['Her heart rate alone', 'A fast heart rate fits, but the spots and dark urine are stronger clues.'],
    ]],
    senior: ['What should you suspect?', [
      ['A thrombotic microangiopathy such as TTP: thrombocytopenia, hemolysis and neurologic symptoms', 'Correct. TTP is a medical emergency; a CBC with smear and LDH should be sent immediately.', true],
      ['Transient ischemic attack', 'Neurologic symptoms plus petechiae and hemolysis point to a systemic blood disorder.'],
      ['Immune thrombocytopenia', 'ITP doesn’t cause hemolysis or neurologic symptoms.'],
    ]],
  },
  act: {
    junior: {
      prompt: 'Put the team’s steps in order.',
      steps: [['Draw a special blood test before treatment starts', 'This test confirms TTP, but the result takes time.'], ['Call the blood experts (hematology) right away', 'TTP is an emergency.'], ['Use a machine to swap out her plasma', 'Removes the harmful antibodies and adds the missing protein.'], ['Give medicine to calm her immune system', 'Stops the body from attacking itself.'], ['Watch her brain and heart closely', 'Tiny clots can affect any organ.']],
      distractors: [['Give her extra platelets', 'In TTP, extra platelets can feed more clots.'], ['Send her home to rest', 'TTP can be fatal without treatment.']],
    },
    senior: {
      prompt: 'Order the management of suspected immune TTP.',
      steps: [['Send ADAMTS13 activity and inhibitor before plasma is given', 'Plasma will alter the result.'], ['Calculate a PLASMIC score and call hematology urgently', 'High pretest probability justifies treatment before confirmation.'], ['Start therapeutic plasma exchange as soon as possible', 'Infuse plasma if exchange is delayed.'], ['Give corticosteroids', 'Suppress autoantibody production.'], ['Add caplacizumab and rituximab per hematology', 'Caplacizumab blocks platelet-vWF binding; rituximab reduces relapse.'], ['Monitor platelets, LDH, troponin and neurologic status daily', 'Response guides therapy.']],
      distractors: [['Transfuse platelets to correct the count', 'Platelet transfusion may worsen thrombosis unless there is life-threatening bleeding.'], ['Wait for the ADAMTS13 result before treating', 'Results take days; untreated TTP is often fatal.']],
    },
  },
  model: {
    junior: {
      layers: [['attack', 'The immune system attacks a helper protein', 'The protein that snips sticky strings.'], ['strings', 'Giant sticky strings build up in the blood', 'Nothing is cutting them.'], ['clots', 'Platelets stick and form tiny clots', 'Platelets get used up.'], ['harm', 'Clots block small vessels and shred red cells', 'Brain, kidneys and heart are at risk.']],
      clues: [['young', 'A healthy 34-year-old woman', 'attack', 'Autoimmune TTP is most common in young adult women.'], ['spots', 'Tiny red spots and bleeding gums', 'clots', 'Platelets are used up in clots.'], ['words', 'Losing words on and off', 'harm', 'Tiny clots briefly block brain vessels.'], ['urine', 'Tea-colored urine', 'harm', 'Shredded red cells release pigment.'], ['yellow', 'Yellowish eyes', 'harm', 'Broken red cells release a yellow pigment.'], ['tired', 'Exhausted, winded', 'harm', 'Fewer red cells carry oxygen.']],
      wrap: 'Denise’s immune system disabled the protein that keeps sticky clotting strings small. Tiny clots formed everywhere, using up platelets and shredding red cells.',
    },
    senior: {
      layers: [['ab', 'Autoantibody against ADAMTS13', 'Acquired severe deficiency.'], ['vwf', 'Ultra-large von Willebrand factor multimers accumulate', 'Not cleaved.'], ['tma', 'Platelet-rich microthrombi', 'Thrombotic microangiopathy.'], ['organ', 'MAHA and ischemic end-organ injury', 'Brain, heart, kidneys.']],
      clues: [['demo', 'Young woman without a trigger', 'ab', 'Typical demographic for immune TTP.'], ['pet', 'Petechiae and gum bleeding', 'tma', 'Consumptive thrombocytopenia.'], ['neuro', 'Fluctuating aphasia and headache', 'organ', 'Cerebral microvascular ischemia.'], ['icterus', 'Scleral icterus', 'organ', 'Hemolysis raises unconjugated bilirubin.'], ['urine', 'Dark urine', 'organ', 'Hemoglobinuria from intravascular hemolysis.'], ['tachy', 'Tachycardia and fatigue', 'organ', 'Anemia; consider cardiac involvement.']],
      wrap: 'Your model predicts severe thrombocytopenia, schistocytes, high LDH, low haptoglobin, a high PLASMIC score and ADAMTS13 activity below 10%.',
    },
  },
  ddx: {
    junior: { options: [
      ['ttp', 'Tiny clots forming in the blood (TTP)', 'leading', 'Spots, dark urine, yellow eyes and brain symptoms together.'],
      ['stroke', 'A stroke', 'possible', 'Word trouble can be a stroke, but strokes don’t cause spots and dark urine.'],
      ['itp', 'A low platelet problem only', 'possible', 'Explains spots, but not the dark urine or brain symptoms.'],
      ['infection', 'A serious infection', 'possible', 'Infections can cause some of these problems. Doctors check.'],
      ['stress', 'Stress from teaching', 'unlikely', 'Stress doesn’t cause spots and dark urine.'],
    ] },
    senior: { options: [
      ['ittp', 'Immune thrombotic thrombocytopenic purpura', 'leading', 'Thrombocytopenia, MAHA and neurologic symptoms in a young woman.'],
      ['hus', 'Hemolytic uremic syndrome', 'possible', 'Kidney injury predominates; usually preceded by diarrhea.'],
      ['dic', 'Disseminated intravascular coagulation', 'possible', 'Prolonged clotting times and low fibrinogen, usually with sepsis.'],
      ['evans', 'Evans syndrome', 'possible', 'Coombs-positive hemolysis with ITP; no schistocytes.'],
      ['hellp', 'HELLP syndrome', 'possible', 'Pregnancy-associated; pregnancy test is negative.'],
      ['stroke', 'Ischemic stroke or TIA', 'cantmiss', 'Neurologic deficits demand imaging, but don’t explain the blood findings.'],
      ['itp', 'Immune thrombocytopenia', 'unlikely', 'No hemolysis or organ ischemia.'],
    ] },
  },
  labs: { r: [
    ['Platelets', '12', 'K/µL', '150–400', 'low'],
    ['Hemoglobin', '7.9', 'g/dL', '12.0–15.5', 'low'],
    ['Blood smear', 'Many schistocytes', '', 'None', 'note'],
    ['LDH', '1,500', 'U/L', '< 250', 'high'],
    ['Haptoglobin', '< 10', 'mg/dL', '30–200', 'low'],
    ['Reticulocytes', '6.5', '%', '0.5–2.5', 'high'],
    ['Creatinine', '1.3', 'mg/dL', '0.6–1.1', 'high'],
    ['Troponin I', '0.09', 'ng/mL', '< 0.04', 'high', 'Possible cardiac microthrombi'],
    ['ADAMTS13 activity', '< 5', '%', '> 60', 'low', 'Resulted 2 days later'],
    ['Pregnancy test', 'Negative', '', 'Negative', 'normal'],
  ] },
  decision: {
    junior: ['Look back at your differential. What is happening to Denise?', [
      ['Her immune system disabled a protein, so tiny clots are forming throughout her body', 'Exactly. This is TTP, and plasma exchange can save her life.', true],
      ['She had a stroke', 'Brain scans and blood tests point to tiny clots everywhere, not one blocked artery.'],
      ['She is overworked', 'Her symptoms come from a serious blood disorder.'],
    ]],
    senior: ['Which explanation is best supported?', [
      ['Immune TTP with severe ADAMTS13 deficiency', 'Correct. Platelets 12, schistocytes, high LDH and ADAMTS13 under 5%.', true],
      ['Hemolytic uremic syndrome', 'Mild kidney injury with severe neurologic signs and ADAMTS13 deficiency point to TTP.'],
      ['Evans syndrome', 'Schistocytes indicate mechanical hemolysis; Coombs-mediated hemolysis wouldn’t produce them.'],
    ]],
    wrap: 'Denise starts plasma exchange within six hours, with steroids, caplacizumab and rituximab. Her platelets recover over a week, and her words come back. She will be monitored for relapse.',
  },
  debrief: {
    science: 'ADAMTS13 is a protein that snips von Willebrand factor, a sticky clotting string, into small pieces. When an antibody blocks it, giant strings grab platelets and form tiny clots in small vessels everywhere, shredding red cells as they pass.',
    pearl: 'Low platelets plus hemolysis (schistocytes, high LDH) is TTP until proven otherwise. Treat first, confirm later, and avoid platelet transfusion.',
    uncertainty: 'Immune TTP can relapse, so Denise will have ADAMTS13 levels monitored and may need preventive treatment.',
    human: 'Denise was frightened she was losing her mind. Naming the cause and the plan gave her back a sense of control.',
    closing: 'Some emergencies whisper. Healers learn to listen for the quiet ones.',
  },
  founder: 'Teaching point: TTP as a can’t-miss diagnosis; treat on suspicion (PLASMIC), avoid platelets. Pair with the HUS case to compare thrombotic microangiopathies.',
});

export const ITP = makeCase({
  code: 'CASE-014', slug: 'gabriel-itp', room: 'emergency-department', emergency: true,
  title: 'Bruises Out of Nowhere', summary: 'Gabriel has sudden bruises, tiny spots and a nosebleed that won’t stop. Think carefully, including about what you can’t miss.',
  specialty: 'Pediatric Hematology', system: 'Blood & Cancer', minutes: [20, 30],
  patient: { name: 'Gabriel Santos', age: 5, concern: 'Bruises, spots and a nosebleed that won’t stop', interests: ['Superheroes', 'Trucks'] },
  art: 'a 5-year-old Brazilian-American boy sitting on his mother’s lap in an emergency room, holding a tissue to his nose, scattered bruises on his shins and tiny red dots on his arms, a pediatrician kneeling at eye level smiling reassuringly, bright friendly room',
  opening: {
    scene: 'Gabriel’s mom noticed bruises on his legs two days ago. This morning, he woke up with tiny red dots all over his body, and now his nose has been bleeding for 40 minutes. Otherwise, he is playing and chatty.',
    dialogue: 'My nose won’t stop bleeding! Are those dots on me going to go away?',
    narrator: 'A child who looks well but suddenly bruises everywhere needs a careful, calm investigation. Some causes are common and benign; a few can’t be missed.',
  },
  history: {
    min: 3,
    q: [
      ['Has he been sick recently?', 'He had a cold about two weeks ago.', 'Immune thrombocytopenia often follows a viral illness.', 'Gabriel’s mom'],
      ['Does anything hurt? Your bones or legs?', 'No. I feel fine.', 'Bone pain would raise concern for leukemia.'],
      ['Has he had fevers, night sweats or weight loss?', 'No, none of that.', 'Their absence makes cancer less likely.', 'Gabriel’s mom'],
      ['Is there blood in his mouth, pee or poop?', 'There are little blood blisters inside his cheeks.', 'Wet purpura (mouth blood blisters) is a sign of a higher bleeding risk.', 'Gabriel’s mom'],
      ['Has he had a headache or been throwing up?', 'No.', 'Important: these can be warning signs of bleeding in the brain.', 'Gabriel’s mom'],
      ['How did he get the bruises?', 'I don’t know. They just appeared.', 'Unexplained bruising in a child can have medical causes, and abuse must also be thoughtfully considered.', 'Gabriel’s mom'],
    ],
  },
  exam: {
    text: 'You observe the exam.',
    f: [['General', 'Playful, well-appearing', 'normal'], ['Skin', 'Widespread petechiae; bruises on shins and back', 'abnormal'], ['Mouth', 'Blood blisters on inner cheeks', 'abnormal'], ['Nose', 'Ongoing oozing despite pressure', 'abnormal'], ['Lymph nodes, liver, spleen', 'Not enlarged', 'normal'], ['Neurologic', 'Normal', 'normal']],
    junior: ['What part of the blood might be the problem?', [
      ['Platelets, the tiny cells that help blood clot', 'Right. Too few platelets means easy bruising and bleeding.', true],
      ['Red blood cells', 'Red cells carry oxygen. Bruising points to platelets.'],
      ['White blood cells', 'White cells fight infection. Bruising points to platelets.'],
    ]],
    senior: ['What does this exam suggest?', [
      ['Isolated thrombocytopenia with mucocutaneous bleeding in a well child, without organomegaly', 'Correct. This fits ITP, but a CBC with smear is essential to exclude marrow disease.', true],
      ['Leukemia', 'Possible, but he lacks bone pain, fever, pallor, lymphadenopathy and organomegaly. The smear decides.'],
      ['Hemophilia', 'Hemophilia causes joint and muscle bleeds, not petechiae.'],
    ]],
  },
  act: {
    junior: {
      prompt: 'Put the team’s steps in order.',
      steps: [['Pinch the soft part of his nose and have him lean forward', 'Steady pressure for 10–15 minutes stops most nosebleeds.'], ['Check his platelet count and look at his blood under a microscope', 'Shows whether platelets are the only problem.'], ['Check him for warning signs like headache or vomiting', 'Bleeding in the brain is rare but serious.'], ['Give medicine that stops the immune system from destroying platelets', 'His bleeding means he needs treatment.'], ['Avoid ibuprofen and rough play until platelets recover', 'Protects him from new bleeding.']],
      distractors: [['Tilt his head back', 'Blood runs down the throat and can cause vomiting.'], ['Give ibuprofen for comfort', 'Ibuprofen makes platelets work less well.']],
    },
    senior: {
      prompt: 'Order the evaluation and management of suspected ITP with mucosal bleeding.',
      steps: [['Assess hemodynamics and screen for intracranial hemorrhage symptoms', 'Headache, vomiting, altered mental status.'], ['Control epistaxis with firm anterior pressure, leaning forward', 'Then topical measures if needed.'], ['Send CBC with smear, reticulocyte count and blood type', 'Confirm isolated thrombocytopenia; exclude blasts and hemolysis.'], ['Treat mucosal bleeding with IVIG or corticosteroids', 'Observation is reasonable for skin-only bleeding; treat when there is mucosal bleeding.'], ['Counsel: avoid NSAIDs and contact sports; return for head injury or bleeding', 'Safety plan for home.']],
      distractors: [['Transfuse platelets as first-line', 'Transfused platelets are destroyed quickly; reserve for life-threatening bleeding.'], ['Perform a bone marrow biopsy before any treatment', 'Not needed for typical ITP with a reassuring smear.']],
    },
  },
  model: {
    junior: {
      layers: [['cold', 'A cold wakes up the immune system', 'The body makes antibodies.'], ['mistake', 'Antibodies tag platelets by mistake', 'Friendly fire.'], ['remove', 'The spleen removes tagged platelets', 'Platelets disappear fast.'], ['bleed', 'Too few platelets: bruises and bleeding', 'Tiny leaks aren’t plugged.']],
      clues: [['virus', 'A cold two weeks ago', 'cold', 'Common trigger.'], ['well', 'Playful and feels fine', 'mistake', 'Only platelets are affected; the rest of him is healthy.'], ['bruise', 'Bruises out of nowhere', 'bleed', 'Small bumps cause bruises without platelets.'], ['dots', 'Tiny red dots', 'bleed', 'Tiny vessels leak.'], ['nose', 'Nosebleed that won’t stop', 'bleed', 'No platelet plug.'], ['mouth', 'Blood blisters in his mouth', 'bleed', 'A sign of higher bleeding risk.']],
      wrap: 'After a cold, Gabriel’s immune system mistakenly tagged his platelets. His spleen removed them, leaving too few to plug tiny leaks.',
    },
    senior: {
      layers: [['trig', 'Post-viral immune dysregulation', 'Loss of tolerance.'], ['ab', 'Anti-platelet autoantibodies', 'Often against GPIIb/IIIa.'], ['clear', 'Splenic clearance and reduced production', 'Platelet survival shortened.'], ['bleed', 'Isolated thrombocytopenia with mucocutaneous bleeding', 'Petechiae, purpura, epistaxis.']],
      clues: [['uri', 'Viral illness 2 weeks before', 'trig', 'Typical antecedent in childhood ITP.'], ['age', 'Age 5, abrupt onset', 'trig', 'Peak age for childhood ITP.'], ['well', 'Well-appearing, no organomegaly', 'ab', 'Argues against marrow infiltration.'], ['pet', 'Petechiae and purpura', 'bleed', 'Platelet-type bleeding.'], ['epi', 'Prolonged epistaxis', 'bleed', 'Mucosal bleeding.'], ['wet', 'Oral blood blisters', 'bleed', 'Wet purpura predicts higher bleeding risk.']],
      wrap: 'Your model predicts a very low platelet count with large platelets on the smear, and otherwise normal blood counts.',
    },
  },
  ddx: {
    junior: { options: [
      ['itp', 'The immune system destroying platelets (ITP)', 'leading', 'A healthy child, a recent cold and sudden bruises and spots.'],
      ['leuk', 'A blood cancer (leukemia)', 'cantmiss', 'Can cause bruising. He has no fever, bone pain or swollen glands, and his blood smear will check.'],
      ['hurt', 'Someone hurting him', 'cantmiss', 'Healers always think about safety when a child has unexplained bruises.'],
      ['infection', 'A serious infection', 'possible', 'Infections can cause spots, but he has no fever and looks well.'],
      ['clumsy', 'Being clumsy', 'unlikely', 'Clumsiness doesn’t cause tiny red dots and nosebleeds.'],
    ] },
    senior: { options: [
      ['itp', 'Newly diagnosed immune thrombocytopenia', 'leading', 'Well child, post-viral, isolated mucocutaneous bleeding.'],
      ['leuk', 'Acute leukemia', 'cantmiss', 'Look for cytopenias, blasts, bone pain and organomegaly.'],
      ['nat', 'Non-accidental trauma', 'cantmiss', 'Unexplained bruising requires thoughtful consideration; petechiae with a low platelet count favor ITP.'],
      ['aplastic', 'Aplastic anemia', 'possible', 'Pancytopenia rather than isolated thrombocytopenia.'],
      ['vwd', 'Von Willebrand disease', 'possible', 'Causes nosebleeds and bruising, but platelets are usually normal.'],
      ['hus', 'Hemolytic uremic syndrome', 'possible', 'Thrombocytopenia with hemolysis and kidney injury.'],
      ['mcc', 'Meningococcemia', 'unlikely', 'Petechiae with fever and toxicity; he is afebrile and well.'],
    ] },
  },
  labs: { r: [
    ['Platelets', '3', 'K/µL', '150–450', 'low'],
    ['Hemoglobin', '10.9', 'g/dL', '11.5–13.5', 'low', 'From the nosebleed'],
    ['White blood cells', '7.4', 'K/µL', '5.0–14.5', 'normal'],
    ['Blood smear', 'Large platelets; no blasts', '', 'Normal morphology', 'note'],
    ['Reticulocytes', '1.8', '%', '0.5–2.5', 'normal'],
    ['PT and PTT', 'Normal', '', 'Normal', 'normal'],
  ] },
  decision: {
    junior: ['Look back at your differential. What is happening to Gabriel?', [
      ['His immune system is destroying his platelets after a cold (ITP)', 'Exactly. Most children recover within weeks to months.', true],
      ['He has leukemia', 'His blood smear shows no cancer cells and his other blood counts are normal.'],
      ['He bumped into things', 'His platelets are very low; that’s the cause of his bruises.'],
    ]],
    senior: ['Which explanation is best supported?', [
      ['Newly diagnosed ITP with mucosal bleeding', 'Correct. Isolated severe thrombocytopenia with large platelets and normal other lines.', true],
      ['Acute leukemia', 'Normal WBC and hemoglobin (aside from blood loss) and no blasts.'],
      ['Von Willebrand disease', 'The platelet count of 3 explains the bleeding.'],
    ]],
    wrap: 'Gabriel receives IVIG. His platelet count rises to 85 within two days and the nosebleeds stop. Most children with ITP recover fully within a year.',
  },
  debrief: {
    science: 'Platelets plug tiny leaks in blood vessels. In ITP, the immune system mistakenly tags platelets for destruction. With very few platelets, tiny vessels leak under the skin as dots and bruises.',
    pearl: 'Treat the child, not just the number. Many children with very low platelets and only skin bleeding can be watched; mucosal bleeding or wet purpura often warrants treatment. Always look at the smear.',
    uncertainty: 'A small number of children develop chronic ITP lasting more than a year.',
    human: 'Gabriel’s mom felt judged when asked about his bruises. Healers can ask about safety in a way that is respectful and routine.',
    closing: 'Calm, careful thinking protects children from both missed diagnoses and unnecessary procedures.',
  },
  founder: 'Teaching point: ITP is a diagnosis of exclusion; the smear is key; leukemia and non-accidental trauma are can’t-miss. Treatment decisions based on bleeding, not platelet count alone.',
});

export const STROKE = makeCase({
  code: 'CASE-015', slug: 'harold-stroke', room: 'emergency-department', emergency: true,
  title: 'Grandpa’s Face', summary: 'At Sunday dinner, Grandpa Harold’s face droops and his words come out wrong. Time is brain.',
  specialty: 'Neurology', system: 'Brain & Nerves', minutes: [15, 30],
  patient: { name: 'Harold Jenkins', age: 68, concern: 'Face droop, arm weakness and slurred speech', interests: ['Gardening', 'Jazz', 'His grandkids'] },
  art: 'a 68-year-old Black grandfather at a family dinner table, the right side of his face drooping slightly, his teenage granddaughter calling 911 on her phone while holding his hand, a warm home dining room with food on the table, urgent but loving moment',
  opening: {
    scene: 'At Sunday dinner, Grandpa Harold suddenly drops his fork. The right side of his face droops, and when he tries to speak, his words come out jumbled. His granddaughter remembers learning BE-FAST in health class.',
    dialogue: 'I… I can’t… the word won’t come.',
    narrator: 'In a stroke, about two million brain cells die every minute that blood flow is blocked. Recognizing it fast and calling 911 is the most important thing anyone can do.',
    narratorRole: 'Neurologist',
  },
  history: {
    min: 3, speaker: 'Harold’s daughter', prompt: 'Harold has trouble speaking. Ask his daughter at least three questions.',
    q: [
      ['Exactly when was he last normal?', 'At 1:15. He was telling a joke. It happened at about 1:20.', 'The time last known well decides which treatments are possible.'],
      ['Does he have heart problems?', 'He has an irregular heartbeat, atrial fibrillation.', 'Atrial fibrillation can form clots in the heart that travel to the brain.'],
      ['Does he take a blood thinner?', 'He stopped it a month ago because he didn’t like the bruising.', 'A key clue: no protection against clots from atrial fibrillation.'],
      ['Does he have diabetes or take insulin?', 'No diabetes.', 'Low blood sugar can mimic stroke; always check glucose.'],
      ['Has he had any recent surgery or bleeding?', 'No.', 'Recent bleeding or surgery can affect clot-busting treatment.'],
      ['Does he have high blood pressure?', 'Yes, for years.', 'A major risk factor for stroke.'],
    ],
  },
  exam: {
    text: 'Paramedics and then the stroke team examine him.',
    f: [['Face', 'Right side droops when he smiles', 'abnormal'], ['Arms', 'Right arm drifts down when held up', 'abnormal'], ['Speech', 'Word-finding trouble; understands most of what is said', 'abnormal'], ['Pulse', 'Irregularly irregular, 96 per minute', 'abnormal'], ['Blood pressure', '182/96', 'high'], ['Fingerstick glucose', '118 mg/dL', 'normal']],
    junior: ['Which letters of BE-FAST does Harold have?', [
      ['Face drooping, Arm weakness and Speech difficulty, so it’s Time to call 911', 'Right. BE-FAST: Balance, Eyes, Face, Arm, Speech, Time.', true],
      ['None. He’s just tired.', 'A sudden face droop and arm weakness are stroke warning signs.'],
      ['Only Balance', 'He has face, arm and speech signs.'],
    ]],
    senior: ['Where in the brain is the problem most likely?', [
      ['Left hemisphere, in the middle cerebral artery territory', 'Correct. Right face and arm weakness with aphasia localize to the left MCA territory.', true],
      ['Right hemisphere', 'Each side of the brain controls the opposite side of the body; language is usually on the left.'],
      ['Cerebellum', 'Cerebellar strokes cause imbalance and incoordination rather than aphasia and hemiparesis.'],
    ]],
  },
  act: {
    junior: {
      prompt: 'Put the steps in order.',
      steps: [['Recognize the signs: face, arm, speech', 'Notice something is wrong.'], ['Call 911 right away', 'An ambulance brings him to a stroke center fastest.'], ['Write down the time the symptoms started', 'Doctors need this to choose treatment.'], ['Keep him safe and give nothing to eat or drink', 'Swallowing may be affected.'], ['Tell the paramedics his medicines and the time', 'Every minute counts.']],
      distractors: [['Let him nap to see if it goes away', 'Waiting loses brain cells and treatment time.'], ['Drive him to the doctor next week', 'Stroke is an emergency now.']],
    },
    senior: {
      prompt: 'Order the acute ischemic stroke workflow.',
      steps: [['Stabilize ABCs and check glucose', 'Hypoglycemia is a stroke mimic.'], ['Establish the time last known well', '1:15 pm.'], ['Perform a rapid stroke scale (NIHSS)', 'Measures severity.'], ['Obtain a non-contrast head CT immediately, with CT angiography', 'Exclude hemorrhage; find a large-vessel occlusion.'], ['Give IV thrombolysis if no hemorrhage and within the time window', 'Alteplase or tenecteplase within 4.5 hours.'], ['Proceed to endovascular thrombectomy for large-vessel occlusion', 'Up to 24 hours in selected patients.']],
      distractors: [['Give aspirin before the CT', 'Aspirin is held until hemorrhage is excluded and, after thrombolysis, for 24 hours.'], ['Lower blood pressure to normal quickly', 'Permissive hypertension helps perfusion; lower only to treatment thresholds.']],
    },
  },
  model: {
    junior: {
      layers: [['afib', 'His heart beats unevenly', 'Atrial fibrillation.'], ['clot', 'A clot forms and travels', 'From the heart to the brain.'], ['block', 'The clot blocks a brain artery', 'Blood can’t get through.'], ['signs', 'The brain area for face, arm and speech stops working', 'On the left side of the brain.']],
      clues: [['irreg', 'Irregular heartbeat', 'afib', 'Uneven beats let blood pool.'], ['stopped', 'Stopped his blood thinner', 'clot', 'Nothing preventing clots.'], ['sudden', 'Sudden start at dinner', 'block', 'A blocked artery acts suddenly.'], ['face', 'Right face droop', 'signs', 'The left brain controls the right face.'], ['arm', 'Right arm weakness', 'signs', 'The left brain controls the right arm.'], ['words', 'Trouble finding words', 'signs', 'Language lives mostly on the left side.']],
      wrap: 'Harold’s uneven heartbeat let a clot form in his heart. With no blood thinner, the clot traveled and blocked an artery feeding the left side of his brain.',
    },
    senior: {
      layers: [['af', 'Atrial fibrillation without anticoagulation', 'Left atrial stasis.'], ['emb', 'Cardioembolism', 'Thrombus travels to the cerebral circulation.'], ['occ', 'Left middle cerebral artery occlusion', 'Large-vessel occlusion.'], ['def', 'Ischemic core and penumbra producing deficits', 'Salvageable tissue if reperfused.']],
      clues: [['iii', 'Irregularly irregular pulse', 'af', 'Atrial fibrillation.'], ['noac', 'Stopped anticoagulation 1 month ago', 'af', 'Loss of stroke prevention.'], ['abrupt', 'Abrupt onset at maximal severity', 'emb', 'Typical of embolic stroke.'], ['aph', 'Expressive aphasia', 'def', 'Dominant hemisphere cortical involvement.'], ['hemi', 'Right face and arm weakness', 'def', 'Contralateral motor cortex.'], ['htn', 'BP 182/96', 'def', 'Reactive hypertension supports penumbral perfusion.']],
      wrap: 'Your model predicts a CT without hemorrhage and a left MCA occlusion on CT angiography: a thrombectomy candidate.',
    },
  },
  ddx: {
    junior: { options: [
      ['stroke', 'A stroke from a blocked brain artery', 'leading', 'Sudden face droop, arm weakness and speech trouble with an irregular heartbeat.'],
      ['bleed', 'Bleeding in the brain', 'cantmiss', 'Also a stroke, but treated differently. A brain scan tells them apart.'],
      ['sugar', 'Low blood sugar', 'possible', 'Can look like a stroke. His sugar is normal.'],
      ['tired', 'Being tired', 'unlikely', 'Tiredness doesn’t cause one-sided face and arm weakness.'],
      ['bell', 'A face nerve problem (Bell’s palsy)', 'possible', 'Causes face droop, but not arm weakness or word trouble.'],
    ] },
    senior: { options: [
      ['isch', 'Acute ischemic stroke (cardioembolic)', 'leading', 'Sudden deficits in a left MCA pattern with untreated atrial fibrillation.'],
      ['ich', 'Intracerebral hemorrhage', 'cantmiss', 'Hypertension is a risk factor; CT excludes it before thrombolysis.'],
      ['hypo', 'Hypoglycemia', 'cantmiss', 'A common mimic; glucose is 118.'],
      ['todd', 'Seizure with postictal (Todd) paralysis', 'possible', 'No witnessed seizure activity.'],
      ['tia', 'Transient ischemic attack', 'possible', 'Only if symptoms fully resolve.'],
      ['mig', 'Migraine with aura', 'possible', 'Usually younger patients with gradually spreading symptoms.'],
      ['bell', 'Bell’s palsy', 'unlikely', 'Affects the whole face (including forehead) and spares the arm and speech.'],
    ] },
  },
  labs: { title: 'Labs and imaging', r: [
    ['Glucose', '118', 'mg/dL', '70–140', 'normal'],
    ['INR', '1.0', '', '0.9–1.1', 'normal', 'Not anticoagulated'],
    ['Platelets', '210', 'K/µL', '150–400', 'normal'],
    ['ECG', 'Atrial fibrillation', '', 'Sinus rhythm', 'note'],
    ['Head CT', 'No hemorrhage', '', 'Normal', 'normal'],
    ['CT angiography', 'Left middle cerebral artery occlusion', '', 'Patent vessels', 'note'],
    ['NIH Stroke Scale', '12', '', '0', 'high'],
  ] },
  decision: {
    junior: ['Look back at your differential. What happened to Grandpa Harold?', [
      ['A clot from his heart blocked an artery in his brain', 'Exactly. Because his granddaughter called 911 fast, he can get treatment to remove the clot.', true],
      ['He was tired from dinner', 'His brain scans show a blocked artery.'],
      ['He had low blood sugar', 'His sugar was normal.'],
    ]],
    senior: ['Which explanation is best supported?', [
      ['Cardioembolic left MCA ischemic stroke from untreated atrial fibrillation', 'Correct. No hemorrhage, left MCA occlusion and AF on ECG.', true],
      ['Hypertensive intracerebral hemorrhage', 'CT shows no bleeding.'],
      ['Todd paralysis', 'CTA shows a vessel occlusion.'],
    ]],
    wrap: 'Harold receives IV thrombolysis and goes straight to thrombectomy. The clot is removed 95 minutes after symptoms began. Two days later he is talking and lifting his arm. He restarts a blood thinner before going home.',
  },
  debrief: {
    science: 'In atrial fibrillation, the top chambers of the heart quiver instead of squeezing, so blood pools and can clot. A clot that travels to the brain blocks blood flow, and the brain cells it feeds stop working and begin to die.',
    pearl: 'BE-FAST: Balance, Eyes, Face, Arm, Speech, Time to call 911. Note the time symptoms started. Clot-busting medicine and clot removal work best when given quickly.',
    uncertainty: 'Recovery continues over months with rehabilitation. Restarting and staying on a blood thinner greatly lowers his risk of another stroke.',
    human: 'Harold stopped his blood thinner because of bruising and didn’t tell his doctor. Patients deserve to have side effects taken seriously, and options explained.',
    closing: 'A teenager who knew the signs saved her grandfather’s brain. Health literacy is lifesaving.',
  },
  founder: 'Teaching point: BE-FAST and “time is brain”; why stroke cases belong in a youth program (cadets as first recognizers for family). Discuss medication adherence and shared decision-making.',
});

export const MI = makeCase({
  code: 'CASE-016', slug: 'robert-mi', room: 'emergency-department', emergency: true,
  title: 'Pressure on the Chest', summary: 'Mr. Hayes has crushing chest pressure at work. Recognize a heart attack and open the artery fast.',
  specialty: 'Cardiology', system: 'Heart & Circulation', minutes: [15, 30],
  patient: { name: 'Robert Hayes', age: 58, concern: 'Crushing chest pressure and sweating', interests: ['Fishing', 'Barbecue'] },
  art: 'a 58-year-old white construction supervisor in a hard hat and safety vest sitting on a stack of lumber at a construction site, clutching his chest and sweating, a coworker calling 911, a portable AED case nearby, late afternoon light',
  opening: {
    scene: 'At a construction site, Mr. Hayes sits down suddenly, pale and sweating. He says it feels like an elephant is sitting on his chest, and the pain spreads to his left arm and jaw.',
    dialogue: 'It’s like a heavy weight on my chest. It won’t go away.',
    narrator: 'In a heart attack, a blocked artery starves part of the heart muscle. The faster the artery is opened, the more heart muscle is saved.',
    narratorRole: 'Cardiologist',
  },
  history: {
    min: 3,
    q: [
      ['When did the pain start?', 'About 40 minutes ago, while I was carrying supplies.', 'Ongoing pain lasting over 20 minutes is concerning for a heart attack.'],
      ['Where is the pain and where does it go?', 'Middle of my chest, down my left arm and up into my jaw.', 'Classic radiation of cardiac pain.'],
      ['Do you smoke?', 'A pack a day for 30 years.', 'Smoking damages arteries and promotes clots.'],
      ['Do you have diabetes or high cholesterol?', 'Both. I don’t always take my pills.', 'Major risk factors for coronary artery disease.'],
      ['Do you feel sick or sweaty?', 'Nauseous, and I’m drenched.', 'Sweating and nausea often accompany a heart attack.'],
      ['Have you taken any erectile dysfunction medicine in the last two days?', 'No.', 'These interact dangerously with nitroglycerin.'],
    ],
  },
  exam: {
    text: 'Paramedics arrive and assess him.',
    f: [['Skin', 'Pale, cool and sweaty', 'abnormal'], ['Heart rate', '102 beats per minute', 'high'], ['Blood pressure', '138/88', 'normal'], ['Oxygen saturation', '96%', 'normal'], ['Lungs', 'Clear', 'normal'], ['12-lead ECG', 'ST elevation in leads II, III and aVF', 'abnormal']],
    junior: ['What do you think is happening?', [
      ['His heart muscle isn’t getting enough blood: a heart attack', 'Right. Crushing chest pain spreading to the arm and jaw with sweating is a heart attack until proven otherwise.', true],
      ['Heartburn', 'Heartburn doesn’t usually cause sweating, arm pain and ECG changes.'],
      ['A pulled muscle', 'Pulled muscles hurt when you move or press on them.'],
    ]],
    senior: ['How do you interpret the ECG and presentation?', [
      ['Inferior ST-elevation myocardial infarction (STEMI)', 'Correct. ST elevation in II, III and aVF indicates an occluded right coronary artery in most people.', true],
      ['Pericarditis', 'Pericarditis causes diffuse ST elevation and positional, pleuritic pain.'],
      ['Stable angina', 'Angina is brief and relieved by rest; his pain is ongoing with ST elevation.'],
    ]],
  },
  act: {
    junior: {
      prompt: 'Put the steps in order.',
      steps: [['Call 911', 'Paramedics can do an ECG and alert the hospital.'], ['Have him stop working and sit down to rest', 'Resting reduces the heart’s work.'], ['Have him chew an aspirin if he isn’t allergic', 'Aspirin helps stop the clot from growing.'], ['If he collapses and isn’t breathing, start CPR and use an AED', 'CPR and an AED can save a life when the heart stops.']],
      distractors: [['Drive him home to rest', 'He needs a hospital with a heart team now.'], ['Give him a big meal to feel better', 'Food doesn’t help and can make nausea worse.']],
    },
    senior: {
      prompt: 'Order the management of STEMI.',
      steps: [['Obtain a 12-lead ECG within 10 minutes and attach monitors', 'Identify STEMI and arrhythmias.'], ['Give aspirin 162–325 mg to chew', 'Antiplatelet therapy immediately.'], ['Give oxygen only if saturation is under 90%; consider nitroglycerin if blood pressure allows', 'Avoid nitrates in right ventricular infarction or hypotension.'], ['Activate the cardiac catheterization lab', 'STEMI is diagnosed by ECG; don’t wait for troponin.'], ['Give heparin and a P2Y12 inhibitor per cardiology', 'Antithrombotic therapy.'], ['Perform primary PCI within 90 minutes of first medical contact', 'Open the artery.']],
      distractors: [['Wait for the troponin result before calling the cath lab', 'Troponin rises late; delay costs heart muscle.'], ['Give high-dose nitroglycerin despite hypotension', 'Inferior MI can involve the right ventricle; nitrates can cause collapse.']],
    },
  },
  model: {
    junior: {
      layers: [['plaque', 'Fatty plaque builds up in heart arteries', 'Over many years.'], ['crack', 'A plaque cracks and a clot forms', 'Suddenly.'], ['block', 'The artery is blocked', 'Heart muscle doesn’t get oxygen.'], ['signs', 'Pain, sweating and a changed heart tracing', 'The heart sounds an alarm.']],
      clues: [['smoke', 'Smoked for 30 years', 'plaque', 'Smoking damages arteries.'], ['dm', 'Diabetes and high cholesterol', 'plaque', 'Speed up plaque buildup.'], ['lift', 'Started while carrying supplies', 'crack', 'Exertion can trigger a plaque to crack.'], ['ecg', 'ECG changes', 'block', 'Shows a part of the heart isn’t getting blood.'], ['pain', 'Crushing chest pain to arm and jaw', 'signs', 'Heart pain often spreads.'], ['sweat', 'Pale and sweaty', 'signs', 'The body’s alarm response.']],
      wrap: 'Years of smoking, diabetes and cholesterol built plaque in Mr. Hayes’s heart arteries. One cracked, a clot formed, and part of his heart lost its blood supply.',
    },
    senior: {
      layers: [['ath', 'Atherosclerotic coronary disease', 'Risk-factor driven.'], ['rup', 'Plaque rupture and thrombosis', 'Acute coronary syndrome.'], ['occ', 'Complete coronary occlusion', 'Transmural ischemia.'], ['inj', 'Myocardial injury and sympathetic response', 'Infarction progresses with time.']],
      clues: [['tob', '30 pack-year smoking history', 'ath', 'Endothelial injury.'], ['meta', 'Poorly controlled diabetes and hyperlipidemia', 'ath', 'Accelerates atherosclerosis.'], ['exert', 'Onset with exertion', 'rup', 'Increased shear stress and demand.'], ['st', 'ST elevation II, III, aVF', 'occ', 'Transmural inferior ischemia.'], ['rad', 'Pressure radiating to arm and jaw', 'inj', 'Visceral cardiac pain.'], ['diaph', 'Diaphoresis and tachycardia', 'inj', 'Sympathetic activation.']],
      wrap: 'Your model predicts a rising troponin and an occluded right coronary artery at catheterization.',
    },
  },
  ddx: {
    junior: { options: [
      ['mi', 'A heart attack', 'leading', 'Crushing chest pain spreading to the arm and jaw, sweating and risk factors.'],
      ['heartburn', 'Heartburn', 'possible', 'Can cause chest burning, but not ECG changes.'],
      ['lung', 'A blood clot in the lungs', 'cantmiss', 'Also causes chest pain and is dangerous. The ECG points to the heart.'],
      ['muscle', 'A pulled chest muscle', 'possible', 'Would hurt more when he moves or presses on it.'],
      ['panic', 'A panic attack', 'unlikely', 'Panic doesn’t change the ECG like this.'],
    ] },
    senior: { options: [
      ['stemi', 'Inferior STEMI', 'leading', 'Ischemic pain with ST elevation in II, III and aVF.'],
      ['dissect', 'Aortic dissection', 'cantmiss', 'Tearing pain radiating to the back; can involve coronary arteries. Thrombolytics would be catastrophic.'],
      ['pe', 'Pulmonary embolism', 'cantmiss', 'Pleuritic pain and hypoxemia; ECG and imaging distinguish.'],
      ['peri', 'Acute pericarditis', 'possible', 'Diffuse ST elevation and positional pain.'],
      ['ptx', 'Pneumothorax', 'possible', 'Sudden pleuritic pain and decreased breath sounds.'],
      ['gerd', 'Gastroesophageal reflux', 'unlikely', 'Doesn’t cause ST elevation.'],
    ] },
  },
  labs: { title: 'Labs and imaging', r: [
    ['Troponin I (first)', '0.8', 'ng/mL', '< 0.04', 'high'],
    ['Troponin I (3 hours)', '12.4', 'ng/mL', '< 0.04', 'high'],
    ['Glucose', '214', 'mg/dL', '70–140', 'high'],
    ['LDL cholesterol', '168', 'mg/dL', '< 100', 'high'],
    ['Chest X-ray', 'Normal mediastinum, clear lungs', '', 'Normal', 'normal'],
    ['Cardiac catheterization', '100% right coronary artery occlusion; stent placed', '', 'Patent arteries', 'note'],
  ] },
  decision: {
    junior: ['Look back at your differential. What happened to Mr. Hayes?', [
      ['A clot blocked a heart artery: a heart attack', 'Exactly. The cardiologists opened the artery with a tiny balloon and stent.', true],
      ['He had heartburn', 'His ECG and blood tests show heart muscle damage.'],
      ['He was just tired from work', 'His heart artery was completely blocked.'],
    ]],
    senior: ['Which explanation is best supported?', [
      ['Inferior STEMI from right coronary artery occlusion', 'Correct. Rising troponin and an occluded RCA treated with PCI.', true],
      ['Aortic dissection', 'Normal mediastinum and catheterization findings make this unlikely.'],
      ['Pericarditis', 'Localized ST elevation and coronary occlusion indicate STEMI.'],
    ]],
    wrap: 'The artery is opened 68 minutes after Mr. Hayes reaches the hospital. He enters cardiac rehabilitation, starts medicines that protect his heart, and joins a program to quit smoking.',
  },
  debrief: {
    science: 'Plaque is a buildup of fat and inflammation inside artery walls. When a plaque cracks, the body forms a clot on it. If the clot blocks a heart artery, the muscle it feeds begins to die within minutes.',
    pearl: 'Time is muscle. Call 911 for chest pain lasting more than a few minutes, especially with sweating, nausea or pain spreading to the arm, jaw or back. Women and people with diabetes may have subtler symptoms.',
    uncertainty: 'How well his heart recovers depends on how much muscle was damaged. An echocardiogram will measure his heart function.',
    human: 'Mr. Hayes skipped his medicines because of cost. Healers ask about barriers without judgment and help solve them.',
    closing: 'Prevention, recognition and rapid treatment form a chain. Every link saves lives.',
  },
  founder: 'Teaching point: STEMI recognition, aspirin, door-to-balloon time; hands-only CPR and AED use for bystanders. Consider teaching hands-only CPR in a live session.',
});

export const ASTHMA = makeCase({
  code: 'CASE-017', slug: 'zoe-asthma', room: 'emergency-department', emergency: true,
  title: 'Every Breath Is Work', summary: 'Zoe’s asthma is flaring after a cold, and her inhaler isn’t helping. Help her breathe and learn why it happened.',
  specialty: 'Pulmonology', system: 'Lungs & Breathing', minutes: [15, 30],
  patient: { name: 'Zoe Mitchell', age: 8, concern: 'Wheezing and struggling to breathe', interests: ['Gymnastics', 'Slime'] },
  art: 'an 8-year-old biracial girl with curly hair sitting upright on an emergency room stretcher breathing through a nebulizer mask with mist, her shoulders hunched with effort, her mother beside her, a respiratory therapist adjusting the machine, calm pediatric ER',
  opening: {
    scene: 'Zoe has had a cold for two days. Last night her wheezing got worse, and she has needed her albuterol inhaler every two hours with little relief. Now she can only say a few words at a time.',
    dialogue: 'I… can’t… catch… my breath.',
    narrator: 'Asthma is the most common long-term disease of childhood. Most flares are manageable, but a severe one can become life-threatening.',
  },
  history: {
    min: 3,
    q: [
      ['How often have you used your inhaler?', 'Every… two hours… since last night.', 'Needing albuterol more than every four hours signals a severe flare.'],
      ['Do you take a daily controller inhaler?', 'We ran out… two weeks ago.', 'Daily inhaled steroids reduce airway swelling. Without them, flares are more likely and more severe.', 'Zoe'],
      ['Have you ever been in the ICU for asthma?', 'No, she’s been in the ER twice.', 'Prior ICU admission or intubation would mark very high risk.', 'Zoe’s mom'],
      ['What usually triggers your asthma?', 'Colds… and cats.', 'Viral infections are the most common trigger in children.'],
      ['Any fever?', 'A little, yesterday.', 'Low-grade fever with a cold is common; high fever might suggest pneumonia.', 'Zoe’s mom'],
      ['Did she choke on anything?', 'No.', 'Sudden wheeze after choking suggests an inhaled object.', 'Zoe’s mom'],
    ],
  },
  exam: {
    text: 'You observe the exam.',
    f: [['Breathing rate', '44 per minute', 'high'], ['Oxygen saturation', '90%', 'low'], ['Heart rate', '145 beats per minute', 'high'], ['Chest', 'Wheezing; reduced air movement at the bases', 'abnormal'], ['Effort', 'Retractions between ribs and at the neck', 'abnormal'], ['Speech', 'Speaks only two or three words at a time', 'abnormal']],
    junior: ['What tells you this flare is severe?', [
      ['She can only say a few words, her ribs pull in and her oxygen is low', 'Right. Those are signs of a severe asthma attack.', true],
      ['She has a cold', 'The cold is the trigger. Her breathing signs show how severe it is.'],
      ['She likes gymnastics', 'Not a clue here.'],
    ]],
    senior: ['How severe is this exacerbation?', [
      ['Severe: hypoxemia, retractions, speaking in words, diminished air entry', 'Correct. Diminished air movement is an ominous sign: too little air moving to wheeze.', true],
      ['Mild', 'Mild flares allow full sentences and normal oxygen saturation.'],
      ['Moderate', 'Her hypoxemia, word-limited speech and poor air entry make it severe.'],
    ]],
  },
  act: {
    junior: {
      prompt: 'Put the team’s steps in order.',
      steps: [['Sit her up and give oxygen', 'Sitting up makes breathing easier.'], ['Give breathing medicine (albuterol) through a nebulizer', 'Relaxes the tight muscles around her airways.'], ['Give steroid medicine', 'Calms the swelling inside the airways.'], ['Check if her breathing is getting better', 'Watch her effort, words and oxygen.'], ['Give stronger treatments if she isn’t improving', 'Some children need extra medicine or the ICU.']],
      distractors: [['Lie her flat to rest', 'Lying flat makes breathing harder.'], ['Have her breathe into a paper bag', 'This lowers oxygen. Never for asthma.']],
    },
    senior: {
      prompt: 'Order the management of a severe pediatric asthma exacerbation.',
      steps: [['Give oxygen to keep saturation at or above 94%', 'Treat hypoxemia.'], ['Give back-to-back albuterol with ipratropium (three doses)', 'Bronchodilation.'], ['Give systemic corticosteroids early (oral dexamethasone or prednisolone)', 'Reduce airway inflammation; takes hours to act.'], ['Reassess work of breathing, air entry and saturation', 'Guides escalation.'], ['Give IV magnesium sulfate if response is poor', 'A bronchodilator for severe exacerbations.'], ['Escalate to continuous albuterol, high-flow or noninvasive ventilation, and ICU care as needed', 'Intubation is a last resort.']],
      distractors: [['Give a sedative to calm her breathing', 'Sedation can cause respiratory failure.'], ['Get a chest X-ray before starting albuterol', 'Treat first; imaging only if pneumonia or pneumothorax is suspected.']],
    },
  },
  model: {
    junior: {
      layers: [['trigger', 'A cold irritates her airways', 'The trigger.'], ['swell', 'Airways swell and fill with mucus', 'Inflammation.'], ['squeeze', 'Muscles around the airways squeeze tight', 'The airways narrow.'], ['trap', 'Air gets trapped and breathing is hard', 'Less oxygen gets in.']],
      clues: [['cold', 'A cold for two days', 'trigger', 'Viruses are the most common trigger.'], ['controller', 'Ran out of her daily inhaler', 'swell', 'Her daily medicine kept swelling down.'], ['wheeze', 'Wheezing', 'squeeze', 'Air whistles through narrow tubes.'], ['inhaler', 'Needs albuterol every two hours', 'squeeze', 'The muscles keep tightening.'], ['ribs', 'Ribs pulling in', 'trap', 'She works hard to move air.'], ['words', 'Only a few words at a time', 'trap', 'No breath to spare for talking.'], ['ox', 'Oxygen 90%', 'trap', 'Not enough fresh air reaches the blood.']],
      wrap: 'A cold set off swelling in Zoe’s airways, and without her daily inhaler the swelling got worse. Tight muscles and mucus trapped air, so every breath became work.',
    },
    senior: {
      layers: [['trig', 'Viral trigger in poorly controlled asthma', 'Loss of controller therapy.'], ['infl', 'Airway inflammation, edema and mucus', 'Eosinophilic and neutrophilic.'], ['bronch', 'Bronchospasm', 'Smooth muscle constriction.'], ['phys', 'Air trapping and V/Q mismatch', 'Hypoxemia and rising work of breathing.']],
      clues: [['uri', 'Viral URI for 2 days', 'trig', 'Rhinovirus is the most common trigger.'], ['ics', 'No inhaled corticosteroid for 2 weeks', 'infl', 'Uncontrolled inflammation.'], ['saba', 'Escalating albuterol use', 'bronch', 'Inadequate response to bronchodilator.'], ['wh', 'Wheeze', 'bronch', 'Turbulent flow through narrowed airways.'], ['dim', 'Diminished air entry', 'phys', 'Severe obstruction; a silent chest is ominous.'], ['spo2', 'SpO₂ 90%', 'phys', 'V/Q mismatch.'], ['ret', 'Retractions and accessory muscle use', 'phys', 'Increased work of breathing.']],
      wrap: 'Your model predicts hyperinflation on chest X-ray and a venous CO₂ that should be low; a normal or rising CO₂ means she is tiring.',
    },
  },
  ddx: {
    junior: { options: [
      ['asthma', 'An asthma attack triggered by a cold', 'leading', 'Known asthma, a cold, wheezing and no daily inhaler.'],
      ['pneumonia', 'Pneumonia', 'possible', 'A lung infection can cause trouble breathing. A chest X-ray can check.'],
      ['choke', 'Something stuck in her airway', 'possible', 'Can cause wheezing. She didn’t choke on anything.'],
      ['allergy', 'A severe allergic reaction', 'possible', 'Can cause wheezing, usually with hives or swelling.'],
      ['nervous', 'Just nervous', 'unlikely', 'Low oxygen means a real breathing problem.'],
    ] },
    senior: { options: [
      ['asthma', 'Severe acute asthma exacerbation', 'leading', 'Viral trigger, lapsed controller and classic obstruction.'],
      ['pna', 'Community-acquired pneumonia', 'possible', 'Fever and focal findings; can coexist with asthma.'],
      ['ptx', 'Pneumothorax', 'cantmiss', 'Sudden worsening with unilateral decreased breath sounds.'],
      ['fb', 'Foreign-body aspiration', 'possible', 'Unilateral wheeze and a choking episode.'],
      ['ana', 'Anaphylaxis', 'possible', 'Wheeze with urticaria, angioedema or hypotension.'],
      ['vcd', 'Vocal cord dysfunction', 'possible', 'Inspiratory stridor in adolescents; normal oxygen saturation.'],
      ['bronchiolitis', 'Bronchiolitis', 'unlikely', 'A disease of infants and toddlers.'],
    ] },
  },
  labs: { title: 'Tests', r: [
    ['Venous pCO₂', '44', 'mmHg', '35–45 (expected low in asthma)', 'note', 'A “normal” CO₂ in distress means she is tiring'],
    ['Chest X-ray', 'Hyperinflation; no pneumonia or pneumothorax', '', 'Normal', 'note'],
    ['Peak flow', '40', '% predicted', '> 80', 'low'],
    ['Respiratory viral panel', 'Rhinovirus', '', 'Negative', 'note'],
  ] },
  decision: {
    junior: ['Look back at your differential. What is happening to Zoe?', [
      ['A cold triggered a severe asthma attack, made worse by running out of her daily inhaler', 'Exactly. Getting her daily inhaler back is part of the treatment.', true],
      ['Pneumonia', 'Her X-ray shows no pneumonia.'],
      ['She was nervous', 'Her oxygen and breathing tests show real airway narrowing.'],
    ]],
    senior: ['Which explanation is best supported?', [
      ['Severe asthma exacerbation triggered by rhinovirus in poorly controlled asthma, with early fatigue', 'Correct. Hyperinflation, low peak flow and a pCO₂ that is no longer low.', true],
      ['Pneumonia with secondary wheeze', 'No infiltrate on X-ray.'],
      ['Foreign-body aspiration', 'No choking history and bilateral findings.'],
    ]],
    wrap: 'After three nebulizers, steroids and IV magnesium, Zoe speaks in full sentences. She is admitted overnight, and leaves with a refilled controller inhaler, a spacer and an updated asthma action plan.',
  },
  debrief: {
    science: 'In asthma, the airways are sensitive and inflamed. Triggers like viruses make them swell, fill with mucus and tighten. Air gets in but struggles to get out, so it becomes trapped and oxygen levels fall.',
    pearl: 'Daily controller inhalers prevent attacks; rescue inhalers treat them. Needing a rescue inhaler more often than every four hours, or being unable to speak in sentences, means get emergency care. A quiet chest in a struggling child is dangerous, not reassuring.',
    uncertainty: 'Her care team will work with her family to make sure refills never run out and to reduce triggers at home.',
    human: 'Zoe’s family ran out of her controller because the pharmacy needed a new prior authorization. Insurance hurdles can become emergencies.',
    closing: 'Every breath matters. Healers help families keep them easy.',
  },
  founder: 'Teaching point: controller vs rescue medicines; severity signs; silent chest and normal pCO₂ as danger signs. Show a spacer technique demonstration in a live session.',
});

export const ACS = makeCase({
  code: 'CASE-018', slug: 'kayla-acs', room: 'emergency-department', emergency: true,
  title: 'Pain That Moves to the Chest', summary: 'Kayla has sickle cell disease and was admitted for a pain crisis. Now she has chest pain, fever and low oxygen.',
  specialty: 'Pediatric Hematology', system: 'Blood & Cancer', minutes: [20, 35],
  patient: { name: 'Kayla Brown', age: 14, concern: 'Chest pain, fever and low oxygen during a pain crisis', interests: ['Poetry', 'Track', 'K-pop'] },
  art: 'a 14-year-old Black teenage girl with braids lying in a hospital bed with a nasal oxygen cannula, holding an incentive spirometer toy device, a hematologist and nurse at her bedside reviewing a chest x-ray on a screen, hopeful warm lighting',
  opening: {
    scene: 'Kayla, who has sickle cell disease (HbSS), was admitted two days ago with severe back and leg pain from a vaso-occlusive crisis. Tonight she has new chest pain, a fever of 38.6 °C and her oxygen level has dropped.',
    dialogue: 'It hurts to take a deep breath. My chest feels tight.',
    narrator: 'Acute chest syndrome is a leading cause of death in sickle cell disease, and it often begins during a hospital stay for pain. Healers watch for it closely.',
    narratorRole: 'Pediatric hematologist',
  },
  history: {
    min: 3,
    q: [
      ['When did the chest pain start?', 'This evening. It hurts when I breathe in.', 'Pleuritic chest pain during a pain crisis is a warning sign.'],
      ['Have you been using your breathing toy (incentive spirometer)?', 'Not really. It hurts too much to take deep breaths.', 'Shallow breathing collapses small areas of lung and can trigger acute chest syndrome.'],
      ['How is your pain medicine working?', 'It helps, but it makes me really sleepy.', 'Opioids can slow breathing; pain control and deep breathing must be balanced.'],
      ['Have you had a cough?', 'Yes, since this afternoon.', 'Cough and fever suggest infection, a common trigger.'],
      ['Do you take hydroxyurea?', 'I stopped taking it a few months ago.', 'Hydroxyurea reduces pain crises and acute chest syndrome by raising fetal hemoglobin.'],
      ['Have you had acute chest syndrome before?', 'Once, when I was ten.', 'Prior episodes increase the risk of recurrence.'],
    ],
  },
  exam: {
    text: 'You observe the exam.',
    f: [['Temperature', '38.6 °C (101.5 °F)', 'high'], ['Oxygen saturation', '89% on room air', 'low'], ['Breathing rate', '30 per minute, shallow', 'high'], ['Lungs', 'Crackles and decreased sounds at the right base', 'abnormal'], ['Heart rate', '124 beats per minute', 'high'], ['Spleen', 'Not felt', 'normal']],
    junior: ['What new problem is Kayla developing?', [
      ['A lung problem: low oxygen, fever and chest pain', 'Right. In sickle cell disease, this is called acute chest syndrome and is an emergency.', true],
      ['Her pain crisis is just getting better', 'New fever, chest pain and low oxygen are warning signs.'],
      ['A stomach bug', 'Her symptoms are in her chest and lungs.'],
    ]],
    senior: ['What is your assessment?', [
      ['Acute chest syndrome: new respiratory symptoms, fever and hypoxemia during a vaso-occlusive crisis', 'Correct. Confirm with a chest X-ray showing a new infiltrate.', true],
      ['Opioid-induced hypoventilation only', 'Contributes, but doesn’t explain fever, focal crackles and hypoxemia.'],
      ['Uncomplicated vaso-occlusive crisis', 'Fever, hypoxemia and focal lung findings indicate a complication.'],
    ]],
  },
  act: {
    junior: {
      prompt: 'Put the team’s steps in order.',
      steps: [['Give oxygen', 'Low oxygen makes more cells sickle.'], ['Get a chest X-ray and blood tests', 'Confirms the lung problem and checks her blood.'], ['Give antibiotics', 'Infections often trigger acute chest syndrome.'], ['Use the breathing toy to take deep breaths every hour while awake', 'Keeps the lungs open.'], ['Give a blood transfusion if she gets worse', 'New red blood cells carry oxygen and don’t sickle.']],
      distractors: [['Stop all pain medicine', 'Pain makes her breathe shallowly. She needs balanced pain control.'], ['Stay as still as possible and avoid deep breaths', 'Deep breaths help prevent and treat this.']],
    },
    senior: {
      prompt: 'Order the management of acute chest syndrome.',
      steps: [['Give supplemental oxygen to keep saturation at or above 95%, and continuous pulse oximetry', 'Hypoxemia promotes sickling.'], ['Obtain a chest X-ray, CBC, reticulocyte count, blood culture and type and screen', 'Confirm, find triggers and prepare for transfusion.'], ['Start empiric antibiotics: a cephalosporin plus a macrolide', 'Covers typical and atypical organisms; functional asplenia increases risk.'], ['Encourage incentive spirometry and balanced analgesia; avoid fluid overload', 'Prevent atelectasis; maintain euvolemia.'], ['Give a simple red cell transfusion for hypoxemia or falling hemoglobin', 'Improves oxygen-carrying capacity.'], ['Arrange exchange transfusion and ICU care for rapid progression', 'Lowers HbS percentage quickly.']],
      distractors: [['Give IV fluids at twice maintenance', 'Overhydration can cause pulmonary edema in ACS.'], ['Withhold opioids to protect breathing', 'Untreated pain causes splinting and atelectasis.']],
    },
  },
  model: {
    junior: {
      layers: [['sickle', 'Her red blood cells can turn into sickle shapes', 'Sickle cell disease.'], ['stuck', 'Sickle cells get stuck in lung vessels', 'Plus shallow breathing and infection.'], ['lung', 'Part of the lung doesn’t get air or blood well', 'A patch of lung stops working.'], ['cycle', 'Oxygen drops, making more cells sickle', 'A dangerous cycle.']],
      clues: [['hbss', 'Sickle cell disease (HbSS)', 'sickle', 'Her hemoglobin can stiffen and bend her red cells.'], ['nohu', 'Stopped hydroxyurea', 'sickle', 'Her medicine helped keep cells from sickling.'], ['shallow', 'Shallow breathing because of pain', 'stuck', 'Parts of the lung stop filling with air.'], ['cough', 'Cough and fever', 'stuck', 'Infection is a common trigger.'], ['crackles', 'Crackles at the right base', 'lung', 'Part of the lung is filled or collapsed.'], ['ox', 'Oxygen 89%', 'cycle', 'Less oxygen means more sickling.']],
      wrap: 'Pain made Kayla breathe shallowly, and an infection added to it. Sickle cells got stuck in her lung, oxygen dropped and more cells sickled.',
    },
    senior: {
      layers: [['poly', 'HbS polymerization under deoxygenation', 'Rigid, adhesive red cells.'], ['trig', 'Triggers: atelectasis, infection, fat embolism', 'Hypoventilation from pain and opioids.'], ['voc', 'Pulmonary vaso-occlusion and infiltrate', 'Infarction and inflammation.'], ['vq', 'V/Q mismatch and hypoxemia', 'Hypoxemia drives further sickling.']],
      clues: [['ss', 'HbSS genotype', 'poly', 'Highest-risk genotype.'], ['hu', 'Off hydroxyurea', 'poly', 'Lower fetal hemoglobin.'], ['splint', 'Splinting and poor incentive spirometry use', 'trig', 'Atelectasis.'], ['opi', 'Opioid-related sedation', 'trig', 'Hypoventilation.'], ['fev', 'Fever and cough', 'trig', 'Infection (atypical bacteria and viruses are common).'], ['cr', 'Focal crackles, right base', 'voc', 'New consolidation.'], ['spo2', 'SpO₂ 89%', 'vq', 'Hypoxemia.']],
      wrap: 'Your model predicts a new infiltrate, a hemoglobin drop from baseline and a rising white count.',
    },
  },
  ddx: {
    junior: { options: [
      ['acs', 'Acute chest syndrome', 'leading', 'Sickle cell disease with chest pain, fever, cough and low oxygen.'],
      ['pneumonia', 'Pneumonia', 'possible', 'A lung infection. In sickle cell disease, it can trigger acute chest syndrome.'],
      ['clot', 'A blood clot in the lungs', 'possible', 'Can cause chest pain and low oxygen.'],
      ['sleepy', 'Too sleepy from pain medicine', 'possible', 'Can slow breathing, but doesn’t cause fever or crackles.'],
      ['bug', 'A stomach bug', 'unlikely', 'Her symptoms are in her lungs.'],
    ] },
    senior: { options: [
      ['acs', 'Acute chest syndrome', 'leading', 'New hypoxemia, fever, chest pain and focal findings during VOC.'],
      ['pna', 'Bacterial pneumonia', 'possible', 'Often indistinguishable; treated as ACS with antibiotics.'],
      ['sepsis', 'Bacteremia or sepsis', 'cantmiss', 'Functional asplenia makes fever in SCD an emergency.'],
      ['pe', 'Pulmonary embolism', 'possible', 'Higher risk in SCD; consider if hypoxemia is out of proportion.'],
      ['opioid', 'Opioid-induced hypoventilation', 'possible', 'Contributes, without fever or infiltrate.'],
      ['overload', 'Fluid overload', 'possible', 'Iatrogenic pulmonary edema from IV fluids.'],
      ['rib', 'Rib infarction', 'possible', 'Causes pleuritic pain and splinting; a common precursor.'],
    ] },
  },
  labs: { title: 'Labs and imaging', r: [
    ['Hemoglobin', '6.4', 'g/dL', 'Baseline 8.2', 'low'],
    ['White blood cells', '21.0', 'K/µL', '4.5–13.0', 'high'],
    ['Reticulocytes', '12', '%', 'Baseline 9', 'high'],
    ['Chest X-ray', 'New right lower lobe infiltrate', '', 'Clear', 'note'],
    ['Hemoglobin S', '88', '%', 'Target < 30 after exchange', 'high'],
    ['Blood culture', 'Pending', '', 'No growth', 'note'],
    ['Mycoplasma PCR', 'Positive', '', 'Negative', 'note'],
  ] },
  decision: {
    junior: ['Look back at your differential. What is happening to Kayla?', [
      ['Acute chest syndrome: sickle cells and infection are blocking part of her lung', 'Exactly. Oxygen, antibiotics, deep breaths and a transfusion will help her.', true],
      ['She is just tired', 'Her X-ray shows a new problem in her lung.'],
      ['Her pain crisis is over', 'A new and serious complication has started.'],
    ]],
    senior: ['Which explanation is best supported?', [
      ['Acute chest syndrome with Mycoplasma infection and atelectasis as triggers', 'Correct. New infiltrate, hypoxemia, fever and a hemoglobin drop.', true],
      ['Isolated opioid hypoventilation', 'The infiltrate and fever indicate ACS.'],
      ['Pulmonary embolism', 'The new infiltrate and infection explain the picture.'],
    ]],
    wrap: 'Kayla receives a simple transfusion, antibiotics and oxygen. Her oxygen improves over two days. Before discharge, she and her family talk with her hematologist about restarting hydroxyurea.',
  },
  debrief: {
    science: 'Sickle hemoglobin stiffens red cells when oxygen is low. In the lungs, shallow breathing, infection or fat from bone marrow can start a cycle: cells sickle, vessels block, oxygen drops, and more cells sickle.',
    pearl: 'During a pain crisis, deep breathing with an incentive spirometer helps prevent acute chest syndrome. Fever in someone with sickle cell disease is always an emergency because the spleen doesn’t protect against infection.',
    uncertainty: 'Restarting hydroxyurea will lower her risk of future episodes. Her team will listen to why she stopped and plan together.',
    human: 'Kayla stopped hydroxyurea because she was tired of taking pills every day. Teens deserve to be heard, not lectured, about their medicines.',
    closing: 'People with sickle cell disease have often had their pain doubted. Healers believe, act and advocate.',
  },
  founder: 'Teaching point: ACS as a leading cause of death in SCD; incentive spirometry, fever as emergency, hydroxyurea. Draw on your own clinical experience with SCD patients and adolescent adherence.',
});
