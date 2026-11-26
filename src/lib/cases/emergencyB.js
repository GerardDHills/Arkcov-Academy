import { makeCase } from './kit';

// Emergency cases, part B. Values are illustrative teaching values.

export const NEUROGENIC = makeCase({
  code: 'CASE-007', slug: 'tyler-dive', room: 'emergency-department', emergency: true,
  title: 'Shallow Water', summary: 'Tyler dove into a lake and can’t move his legs. His heart is slow and his skin is warm. Why?',
  specialty: 'Trauma & Neurosurgery', system: 'Brain & Nerves', minutes: [20, 35],
  patient: { name: 'Tyler Nguyen', age: 17, concern: 'Can’t move his legs after diving', interests: ['Swimming', 'Fishing'] },
  art: 'a 17-year-old Vietnamese-American teenage boy lying on a spine board with a cervical collar on a wooden lake dock at golden hour, paramedics kneeling beside him, one holding his head still, calm lake water behind, serious but hopeful',
  opening: {
    scene: 'At a summer lake party, Tyler dove headfirst off a dock into water that was only waist-deep. His friends pulled him out. He is awake, but he can’t move his legs and his arms feel weak.',
    dialogue: 'My neck hurts. I can’t feel my legs.',
    narrator: 'Spinal cord injuries change more than movement. The spinal cord also controls blood vessels and heart rate. Protect the spine with every move.',
    narratorRole: 'Trauma surgeon',
  },
  history: {
    min: 3,
    q: [
      ['What happened exactly?', 'I dove off the dock. My head hit the bottom.', 'Diving into shallow water is a classic cause of neck (cervical) spine injury.'],
      ['Where does it hurt?', 'The back of my neck.', 'Neck pain after trauma means protect the spine until imaging clears it.'],
      ['Can you feel me touching your legs? Your chest?', 'My legs, no. My chest kind of, up high.', 'A level where feeling stops helps locate the spinal cord injury.'],
      ['Did you black out?', 'I don’t think so. I remember everything.', 'Helps judge whether there is also a head injury.'],
      ['Were you drinking?', 'A couple of beers.', 'Alcohol increases diving injuries and can cloud the exam.'],
      ['Are you hurt anywhere else?', 'I don’t think so.', 'In trauma, always search for hidden bleeding, especially when the patient can’t feel parts of the body.'],
    ],
  },
  exam: {
    text: 'The team keeps Tyler’s head and neck still while examining him.',
    f: [['Heart rate', '48 beats per minute', 'low'], ['Blood pressure', '80/42', 'low'], ['Skin', 'Warm, dry and pink in the legs', 'note'], ['Movement', 'Cannot move legs; weak hand grip', 'abnormal'], ['Sensation', 'Absent below the nipple line', 'abnormal'], ['Breathing', 'Belly rises more than chest', 'abnormal'], ['Abdomen', 'Soft; FAST ultrasound negative for blood', 'normal']],
    junior: ['Tyler’s blood pressure is low, but his heart is slow and his skin is warm. What could explain that?', [
      ['His injured spinal cord can’t send messages that keep blood vessels tight and the heart fast', 'Right. The spinal cord carries signals that tighten vessels and speed the heart. When it is injured, vessels relax and the heart slows.', true],
      ['He lost a lot of blood', 'Bleeding usually makes the heart race and the skin cold and pale. Tyler’s is the opposite.'],
      ['He is calm', 'Being calm doesn’t make blood pressure this low.'],
    ]],
    senior: ['How do you interpret hypotension with bradycardia and warm extremities after a cervical injury?', [
      ['Neurogenic shock from loss of sympathetic tone', 'Correct. Warm and slow is neurogenic; cold and fast suggests hemorrhage.', true],
      ['Hemorrhagic shock', 'Expected tachycardia and cool skin; FAST is negative. Still, hemorrhage must be excluded in every trauma.'],
      ['Spinal shock', 'Spinal shock is the temporary loss of reflexes below the injury, not a circulatory state.'],
    ]],
  },
  act: {
    junior: {
      prompt: 'Tyler’s friends have already pulled him onto the dock. Put the first-aid steps in order.',
      steps: [['Keep his head and neck still, in line with his body', 'Moving the neck could injure the spinal cord more.'], ['Check that he is breathing', 'Neck injuries can affect breathing muscles.'], ['Send someone to call 911', 'He needs paramedics with spine equipment.'], ['Keep him warm and still until help arrives', 'He can’t feel cold or shiver well below the injury.']],
      distractors: [['Help him sit up and walk it off', 'Never move someone who might have a neck injury.'], ['Turn his head so he can see you', 'Talk to him from where he can see you instead.']],
    },
    senior: {
      prompt: 'Order the initial trauma management for suspected cervical spinal cord injury with shock.',
      steps: [['Maintain spinal motion restriction with manual in-line stabilization and a collar', 'Protect the cord throughout.'], ['Open the airway with a jaw thrust, give oxygen, watch for respiratory failure', 'High cervical injuries can weaken the diaphragm.'], ['Obtain IV access and give isotonic fluid to restore volume', 'Start with volume before vasopressors.'], ['Exclude hemorrhage (FAST, exam, imaging)', 'Neurogenic shock is a diagnosis made after bleeding is ruled out.'], ['Start a vasopressor (norepinephrine) and give atropine for symptomatic bradycardia', 'Restore tone and heart rate; maintain spinal cord perfusion.'], ['Obtain spine imaging and consult neurosurgery', 'CT and MRI define the injury and plan decompression or stabilization.']],
      distractors: [['Use a head-tilt chin-lift to open the airway', 'Moves the neck. Use a jaw thrust.'], ['Give liters of fluid until the heart rate rises', 'Bradycardia here is neurologic; large volumes cause overload.']],
    },
  },
  model: {
    junior: {
      layers: [['hit', 'His head hits the bottom', 'Force bends the neck.'], ['cord', 'The spinal cord in the neck is hurt', 'The body’s main message cable.'], ['msg', 'Messages can’t pass below the injury', 'Movement and feeling stop.'], ['vessels', 'Blood vessels relax and the heart slows', 'Blood pressure drops.']],
      clues: [['shallow', 'Dove into waist-deep water', 'hit', 'Shallow water stops the head suddenly.'], ['neck', 'Neck pain', 'cord', 'The injury is in the neck.'], ['legs', 'Can’t move his legs', 'msg', 'Messages to the legs are blocked.'], ['numb', 'No feeling below his chest', 'msg', 'Messages from the body can’t reach the brain.'], ['slow', 'Heart rate 48', 'vessels', 'Without “speed up” signals, the heart slows.'], ['warm', 'Warm, pink legs and low blood pressure', 'vessels', 'Relaxed vessels let blood pool.']],
      wrap: 'The spinal cord is the body’s message cable. When Tyler’s was injured, his muscles, his feeling and even his blood vessels lost their signals.',
    },
    senior: {
      layers: [['sci', 'Cervical spinal cord injury', 'Axial load from diving.'], ['symp', 'Interrupted sympathetic outflow (T1–L2)', 'Descending pathways severed above the outflow.'], ['vagal', 'Unopposed vagal tone and vasodilation', 'Loss of vascular tone; parasympathetic dominance.'], ['shock', 'Hypotension, bradycardia, poikilothermia', 'Neurogenic shock.']],
      clues: [['axial', 'Head struck bottom while diving', 'sci', 'Axial loading fractures the cervical spine.'], ['level', 'Sensory level at the nipple line, weak grip', 'sci', 'Consistent with a lower cervical cord injury.'], ['diaph', 'Abdominal (diaphragmatic) breathing', 'symp', 'Intercostal muscles lose innervation; the phrenic nerve (C3–5) is spared.'], ['brady', 'Heart rate 48', 'vagal', 'Cardiac sympathetic fibers (T1–T4) are cut off.'], ['warm', 'Warm, dry, pink extremities', 'vagal', 'Vasodilation below the injury.'], ['bp', 'BP 80/42', 'shock', 'Loss of systemic vascular resistance.']],
      wrap: 'Your model predicts a lower cervical injury on imaging, normal hemoglobin, and response to vasopressors rather than large fluid volumes.',
    },
  },
  ddx: {
    junior: { options: [
      ['cord', 'An injured spinal cord in the neck', 'leading', 'A diving injury with neck pain, weak arms and no feeling or movement in his legs.'],
      ['bleed', 'Bleeding inside the body', 'possible', 'Doctors always look for hidden bleeding after an accident. His ultrasound was clear.'],
      ['head', 'A head injury', 'possible', 'He hit his head, but he remembers everything.'],
      ['cold', 'Being cold from the lake', 'possible', 'Cold can slow the heart, but it doesn’t stop the legs from moving.'],
      ['tired', 'Just tired', 'unlikely', 'Not moving and not feeling the legs is never tiredness.'],
    ] },
    senior: { options: [
      ['neuro', 'Neurogenic shock from cervical cord injury', 'leading', 'Hypotension, bradycardia and warm extremities with a sensory level.'],
      ['hem', 'Hemorrhagic shock', 'cantmiss', 'Must be excluded in every trauma; injuries below the level may be painless.'],
      ['tbi', 'Traumatic brain injury', 'possible', 'Head impact; normal mental status argues against a major injury.'],
      ['drown', 'Submersion injury with hypoxia', 'possible', 'He was underwater briefly; check oxygenation and lungs.'],
      ['hypothermia', 'Hypothermia', 'possible', 'Contributes to bradycardia; check core temperature.'],
      ['tamp', 'Cardiac tamponade or tension pneumothorax', 'possible', 'Obstructive causes of shock in trauma; exam and ultrasound evaluate them.'],
      ['conv', 'Functional weakness', 'unlikely', 'Objective bradycardia and a sensory level indicate structural injury.'],
    ] },
  },
  labs: { title: 'Labs and imaging', r: [
    ['Hemoglobin', '14.1', 'g/dL', '13.0–17.0', 'normal'],
    ['FAST ultrasound', 'No free fluid', '', 'Negative', 'normal'],
    ['Core temperature', '36.2', '°C', '36.5–37.5', 'low'],
    ['CT cervical spine', 'C5 burst fracture', '', 'Normal', 'note'],
    ['MRI', 'Spinal cord swelling at C5', '', 'Normal', 'note'],
    ['Blood alcohol', '0.06', 'g/dL', '0', 'high'],
  ] },
  decision: {
    junior: ['Look back at your differential. Why are Tyler’s blood pressure and heart rate low?', [
      ['His injured spinal cord can’t send the signals that keep blood vessels tight and the heart beating fast', 'Exactly. That’s called neurogenic shock.', true],
      ['He lost blood', 'His blood count is normal and the ultrasound showed no bleeding.'],
      ['The lake water was cold', 'Cold may play a small role, but his spinal cord injury explains everything.'],
    ]],
    senior: ['Which explanation is best supported?', [
      ['Neurogenic shock from a C5 spinal cord injury', 'Correct. Normal hemoglobin, negative FAST, and a C5 burst fracture with cord edema.', true],
      ['Occult hemorrhage', 'Normal hemoglobin and FAST make this unlikely, though reassessment continues.'],
      ['Hypothermic bradycardia alone', 'Mild hypothermia can’t explain the deficits or hypotension.'],
    ]],
    wrap: 'Tyler goes to the operating room for decompression and spinal stabilization. Rehabilitation will be a long journey, and early, expert care gives him the best chance of recovery.',
  },
  debrief: {
    science: 'The spinal cord is a cable carrying messages between the brain and body, including the signals that tighten blood vessels and speed up the heart. Injury in the neck can cut those signals, so vessels relax and the heart slows.',
    pearl: 'Shock in trauma: cold and fast suggests bleeding; warm and slow suggests neurogenic shock. Always look for bleeding first. Prevention: feet first, first time, and never dive into shallow or unknown water.',
    uncertainty: 'How much movement Tyler regains depends on the severity of the cord injury. Some recovery may come over months.',
    human: 'Tyler is 17 and terrified. Rehabilitation teams, peers with spinal cord injuries and mental health support all become part of his care.',
    closing: 'Healers protect what can still be saved, from the first moment on the dock.',
  },
  founder: 'Teaching point: neurogenic vs hemorrhagic shock (warm/slow vs cold/fast); spinal motion restriction and jaw thrust. Prevention message: feet first, first time. Consider a rehab medicine guest.',
});

export const SEPTIC = makeCase({
  code: 'CASE-008', slug: 'ava-rash', room: 'emergency-department', emergency: true,
  title: 'The Rash That Doesn’t Fade', summary: 'Ava has a fever and a spreading purple rash. Hours matter. Recognize septic shock and act.',
  specialty: 'Infectious Disease & Critical Care', system: 'Infection & Immunity', minutes: [20, 35],
  patient: { name: 'Ava Patel', age: 16, concern: 'Fever and a spreading purple rash', interests: ['Debate', 'Volleyball'] },
  art: 'a 16-year-old South Asian teenage girl lying on an emergency department stretcher looking very ill and flushed with a fever, a doctor in a mask pressing a clear drinking glass gently against small purple spots on her forearm, monitors glowing, urgent but calm atmosphere',
  opening: {
    scene: 'Ava came home from a sleepover yesterday with a headache and fever. This morning she has leg pain, cold hands and small purple spots on her legs that are spreading.',
    dialogue: 'My legs hurt so much. I just feel so sick.',
    narrator: 'Some infections move faster than any other emergency. A fever with a rash that doesn’t fade when pressed is a red flag. Act within the hour.',
  },
  history: {
    min: 3,
    q: [
      ['When did you start feeling sick?', 'Last night. Headache and fever.', 'A rapid course: hours, not days.'],
      ['When did the spots appear?', 'This morning. There are way more now.', 'A rapidly spreading rash is an ominous sign.'],
      ['Does your neck hurt or does light bother you?', 'My neck is stiff, and the light hurts.', 'Neck stiffness and light sensitivity suggest meningitis.'],
      ['Have you had your meningitis vaccines?', 'I think I missed my booster.', 'Meningococcal vaccines prevent many cases. A missed booster is a clue.'],
      ['Has anyone around you been sick?', 'No, but we all shared drinks at the sleepover.', 'Meningococcus spreads through close contact and saliva.'],
      ['How are your hands and feet?', 'Freezing, even under blankets.', 'Cold hands and feet with a fever are early signs of shock.'],
    ],
  },
  exam: {
    text: 'You observe the team’s assessment.',
    f: [['Temperature', '39.8 °C (103.6 °F)', 'high'], ['Heart rate', '150 beats per minute', 'high'], ['Blood pressure', '82/40', 'low'], ['Capillary refill', '4 seconds', 'abnormal'], ['Rash', 'Purple spots that do not fade under a glass', 'abnormal'], ['Neck', 'Stiff', 'abnormal'], ['Alertness', 'Drowsy but answers questions', 'abnormal']],
    junior: ['Why does it matter that the rash doesn’t fade when a glass is pressed on it?', [
      ['It means blood is leaking under the skin, which can signal a very serious infection', 'Right. A fever with a rash that doesn’t fade is an emergency.', true],
      ['It means she has a sunburn', 'Sunburn fades when pressed.'],
      ['It means she has an allergy', 'Allergic hives fade when pressed and usually itch.'],
    ]],
    senior: ['How do you characterize her condition?', [
      ['Septic shock with a non-blanching petechial-purpuric rash, concerning for meningococcemia', 'Correct. Fever, hypotension, poor perfusion and purpura demand immediate antibiotics and resuscitation.', true],
      ['Viral exanthem', 'Viral rashes typically blanch and patients are not in shock.'],
      ['Immune thrombocytopenia', 'ITP causes petechiae but not fever, hypotension or meningismus.'],
    ]],
  },
  act: {
    junior: {
      prompt: 'Put the team’s first steps in order.',
      steps: [['Give oxygen and call the team', 'All hands for septic shock.'], ['Put in an IV', 'To give medicine and fluid directly into the blood.'], ['Give strong germ-fighting medicine right away', 'Antibiotics within the first hour save lives.'], ['Give IV fluid to raise her blood pressure', 'Refill the leaky blood vessels.'], ['Wear masks and tell her close friends to see a doctor', 'Close contacts may need preventive medicine.']],
      distractors: [['Wait until tomorrow to see if the rash spreads', 'Hours matter.'], ['Put lotion on the rash', 'The rash is a sign of infection in the blood, not a skin problem.']],
    },
    senior: {
      prompt: 'Order the first-hour management of suspected meningococcal septic shock.',
      steps: [['Assess airway and breathing, give oxygen, attach monitors', 'ABCs first.'], ['Obtain IV or IO access', 'Two lines if possible.'], ['Draw blood cultures and labs, without delaying antibiotics', 'Cultures guide therapy later.'], ['Give IV ceftriaxone (plus vancomycin if meningitis is suspected) within the first hour', 'Every hour of delay increases mortality.'], ['Give 10–20 mL/kg isotonic fluid boluses with reassessment', 'Stop if signs of overload appear.'], ['Start epinephrine or norepinephrine if shock persists after fluids', 'Fluid-refractory shock needs vasoactive support.'], ['Use droplet precautions and notify public health', 'Close contacts need antibiotic prophylaxis.']],
      distractors: [['Do a lumbar puncture before antibiotics', 'Never delay antibiotics; LP is unsafe in shock and coagulopathy.'], ['Wait for culture results before starting antibiotics', 'Cultures take a day or more.']],
    },
  },
  model: {
    junior: {
      layers: [['spread', 'Germs spread from person to person', 'Through shared drinks.'], ['blood', 'Germs get into the blood', 'Infection spreads fast.'], ['leak', 'Blood vessels get leaky and damaged', 'Blood leaks into the skin.'], ['shock', 'Blood pressure falls', 'Organs don’t get enough blood.']],
      clues: [['drinks', 'Shared drinks at a sleepover', 'spread', 'This germ spreads through saliva.'], ['vaccine', 'Missed her meningitis booster', 'spread', 'Vaccines help block this germ.'], ['fever', 'High fever', 'blood', 'The body is fighting a serious infection.'], ['neck', 'Stiff neck and light hurts', 'blood', 'Germs can reach the coverings of the brain.'], ['spots', 'Purple spots that don’t fade', 'leak', 'Blood is leaking under the skin.'], ['cold', 'Cold hands, fast heart', 'shock', 'The body pulls blood toward vital organs.'], ['bp', 'Blood pressure 82/40', 'shock', 'Not enough pressure to feed the organs.']],
      wrap: 'Germs shared at a sleepover entered Ava’s blood. They damaged her blood vessels, causing the rash and the drop in blood pressure.',
    },
    senior: {
      layers: [['col', 'Nasopharyngeal colonization and invasion', 'Neisseria meningitidis.'], ['bact', 'Bacteremia and endotoxin release', 'Systemic inflammatory cascade.'], ['endo', 'Endothelial injury, capillary leak and coagulopathy', 'DIC with microvascular thrombosis.'], ['shock', 'Distributive and hypovolemic shock with organ hypoperfusion', 'Septic shock.']],
      clues: [['exp', 'Shared drinks; missed MenACWY booster', 'col', 'Exposure and susceptibility.'], ['fev', 'Fever 39.8 °C', 'bact', 'Systemic response to bacteremia.'], ['mening', 'Neck stiffness and photophobia', 'bact', 'Seeding of the meninges.'], ['purp', 'Non-blanching purpura', 'endo', 'Microvascular thrombosis and hemorrhage (purpura fulminans if extensive).'], ['legs', 'Severe leg pain', 'endo', 'An early sign of meningococcal sepsis from poor muscle perfusion.'], ['crt', 'Cold extremities, CRT 4 s', 'shock', 'Poor perfusion.'], ['hypo', 'BP 82/40', 'shock', 'Decompensated shock.']],
      wrap: 'Your model predicts leukocytosis, thrombocytopenia, coagulopathy, raised lactate and gram-negative diplococci on blood culture.',
    },
  },
  ddx: {
    junior: { options: [
      ['mening', 'A dangerous germ in the blood (meningococcus)', 'leading', 'Fever, a fast-spreading rash that doesn’t fade, a stiff neck and low blood pressure.'],
      ['flu', 'The flu', 'possible', 'The flu causes fever and aches, but not a rash that doesn’t fade or shock.'],
      ['allergy', 'An allergic reaction', 'unlikely', 'Allergy rashes fade when pressed and usually itch.'],
      ['blood', 'A low platelet problem', 'possible', 'Low platelets cause spots, but don’t cause a high fever and shock.'],
      ['tick', 'An infection from a tick bite', 'possible', 'Some tick infections cause a spotted rash. Ask about ticks.'],
    ] },
    senior: { options: [
      ['mcc', 'Meningococcal septic shock (meningococcemia)', 'leading', 'Rapid course, purpura, meningism, close-contact exposure and missed vaccine.'],
      ['tss', 'Toxic shock syndrome', 'possible', 'Shock with fever and rash, but the rash is a diffuse erythroderma.'],
      ['rmsf', 'Rocky Mountain spotted fever', 'possible', 'Petechial rash and shock; ask about ticks and treat with doxycycline if suspected.'],
      ['pneumo', 'Other bacterial sepsis (pneumococcal, Hib, S. aureus)', 'possible', 'Can cause purpura and DIC.'],
      ['leuk', 'Acute leukemia', 'cantmiss', 'Fever, petechiae and illness; a CBC with smear checks.'],
      ['itp', 'Immune thrombocytopenia', 'unlikely', 'Doesn’t cause fever, meningism or shock.'],
      ['hsp', 'IgA vasculitis (HSP)', 'unlikely', 'Palpable purpura in a well child, not septic shock.'],
    ] },
  },
  labs: { r: [
    ['White blood cells', '22.4', 'K/µL', '4.5–13.0', 'high'],
    ['Platelets', '68', 'K/µL', '150–450', 'low'],
    ['INR', '1.9', '', '0.9–1.2', 'high'],
    ['Fibrinogen', '118', 'mg/dL', '200–400', 'low'],
    ['Lactate', '5.2', 'mmol/L', '0.5–2.2', 'high'],
    ['CRP', '18.4', 'mg/dL', '< 0.5', 'high'],
    ['Blood culture', 'Gram-negative diplococci', '', 'No growth', 'note', 'Neisseria meningitidis confirmed later'],
  ] },
  decision: {
    junior: ['Look back at your differential. What is making Ava so sick?', [
      ['A dangerous germ in her blood is damaging her blood vessels', 'Yes. Fast antibiotics and fluids are saving her life.', true],
      ['The flu', 'The flu doesn’t cause a rash that doesn’t fade or shock.'],
      ['Being tired after a sleepover', 'Her blood tests show a severe infection.'],
    ]],
    senior: ['Which explanation is best supported?', [
      ['Meningococcal septic shock with disseminated intravascular coagulation', 'Correct. Gram-negative diplococci, low platelets, high INR, low fibrinogen and raised lactate.', true],
      ['Toxic shock syndrome', 'The rash and culture point to meningococcus.'],
      ['Leukemia', 'The WBC rise is reactive; the culture explains the illness.'],
    ]],
    wrap: 'Ava receives ceftriaxone within 30 minutes of arrival, fluid and epinephrine, and moves to the ICU. Her close friends from the sleepover receive preventive antibiotics.',
  },
  debrief: {
    science: 'Meningococcal bacteria can enter the blood and release toxins that injure blood vessels. Vessels leak, tiny clots form and blood seeps under the skin as purple spots. Blood pressure falls and organs are starved of oxygen.',
    pearl: 'The glass test: if a rash with fever doesn’t fade under a pressed glass, get emergency care now. In the hospital, give antibiotics within the first hour. Never delay antibiotics for tests.',
    uncertainty: 'Survivors can have complications like hearing loss or skin and limb injury. Ava will have hearing tests and close follow-up.',
    human: 'Ava’s parents almost waited until morning. Teaching families the warning signs saves lives.',
    closing: 'Vaccines, quick recognition and fast antibiotics turn a deadly infection into a survivable one.',
  },
  founder: 'Teaching point: septic shock bundles; antibiotics within one hour; glass test for non-blanching rash. Highlight MenACWY and MenB vaccines and contact prophylaxis.',
});

export const ANAPHYLAXIS = makeCase({
  code: 'CASE-009', slug: 'noah-party', room: 'emergency-department', emergency: true,
  title: 'One Bite at the Party', summary: 'Noah has a peanut allergy and just ate a cookie at a birthday party. Know what to do in the first minute.',
  specialty: 'Allergy & Immunology', system: 'Infection & Immunity', minutes: [15, 25],
  patient: { name: 'Noah Williams', age: 10, concern: 'Hives, swelling and trouble breathing', interests: ['Baseball', 'Magic tricks'] },
  art: 'a 10-year-old Black boy at a colorful backyard birthday party sitting down with puffy lips and red hives on his cheeks, an adult kneeling beside him holding an epinephrine auto-injector, balloons and a party table in soft focus behind, urgent but hopeful',
  opening: {
    scene: 'At a birthday party, Noah bites into a cookie. Within minutes he is scratching hives on his arms. His lips swell, he starts coughing and says his throat feels tight. He carries an epinephrine auto-injector in his backpack.',
    dialogue: 'My throat feels weird… like it’s closing.',
    narrator: 'Anaphylaxis is a severe allergic reaction that can affect breathing and blood pressure within minutes. Epinephrine is the only first-line treatment.',
    narratorRole: 'Allergist',
  },
  history: {
    min: 3,
    q: [
      ['Are you allergic to anything?', 'Peanuts. I have an EpiPen in my bag.', 'A known allergy and available epinephrine.'],
      ['What did you eat?', 'A cookie. I didn’t know it had peanut butter in it.', 'Hidden allergens in baked goods are common.'],
      ['When did the symptoms start?', 'Like five minutes after I ate it.', 'Food anaphylaxis usually starts within minutes to two hours.'],
      ['Do you feel dizzy?', 'Yeah. Kind of like I might pass out.', 'Dizziness may mean blood pressure is falling.'],
      ['Has your belly been bothering you?', 'I feel like I’m going to throw up.', 'GI symptoms count as another body system involved.'],
      ['Do you have asthma?', 'Yes, a little.', 'Asthma increases the risk of severe anaphylaxis.'],
    ],
  },
  exam: {
    text: 'The paramedics arrive and check Noah.',
    f: [['Skin', 'Hives on arms and chest, swollen lips', 'abnormal'], ['Breathing', 'Wheezing, coughing', 'abnormal'], ['Oxygen saturation', '91%', 'low'], ['Heart rate', '140 beats per minute', 'high'], ['Blood pressure', '80/44', 'low'], ['Stomach', 'Vomited once', 'abnormal']],
    junior: ['How many body systems are involved?', [
      ['Several: skin, breathing, stomach and blood pressure', 'Right. When an allergy affects more than one body system, especially breathing or blood pressure, it is anaphylaxis.', true],
      ['Only the skin', 'Hives are only part of it. His breathing and blood pressure are affected too.'],
      ['Only his stomach', 'Vomiting is one sign, but his breathing is the most dangerous.'],
    ]],
    senior: ['What is your assessment?', [
      ['Anaphylaxis with respiratory compromise and hypotension', 'Correct. Skin, respiratory, GI and cardiovascular involvement after a known allergen.', true],
      ['Isolated urticaria', 'He has respiratory and cardiovascular involvement.'],
      ['An asthma exacerbation', 'The hives, angioedema and hypotension make this anaphylaxis.'],
    ]],
  },
  act: {
    junior: {
      prompt: 'Put the anaphylaxis first-aid steps in order.',
      steps: [['Use the epinephrine auto-injector in his outer thigh', 'Epinephrine first, right away.'], ['Call 911', 'Even if he gets better, he needs to go to the hospital.'], ['Have him lie down with legs up (or sit up if breathing is hard)', 'Helps blood reach his brain.'], ['Give a second epinephrine dose if not better in 5–15 minutes', 'Some reactions need two doses.'], ['Stay with him until help arrives', 'Reactions can get worse quickly.']],
      distractors: [['Give an allergy pill and wait to see if it helps', 'Allergy pills are too slow and don’t treat breathing or blood pressure.'], ['Have him stand up and walk around', 'Standing can make his blood pressure drop further.']],
    },
    senior: {
      prompt: 'Order the management of pediatric anaphylaxis.',
      steps: [['Give IM epinephrine 0.01 mg/kg (max 0.5 mg) to the anterolateral thigh', 'Immediately. No contraindication outweighs it in anaphylaxis.'], ['Call for help and position supine with legs raised (or sitting if dyspneic)', 'Avoid sudden standing: risk of cardiovascular collapse.'], ['Give high-flow oxygen and assess the airway', 'Watch for stridor and angioedema.'], ['Establish IV access and give 20 mL/kg isotonic fluid for hypotension', 'Capillary leak causes volume loss.'], ['Repeat IM epinephrine every 5–15 minutes if not improving', 'Consider an epinephrine infusion if refractory.'], ['Give adjuncts (albuterol for wheeze; antihistamine for hives), then observe for a biphasic reaction', 'Adjuncts never replace epinephrine.']],
      distractors: [['Give diphenhydramine first and wait 20 minutes', 'Delaying epinephrine is associated with death.'], ['Give steroids as the main treatment', 'Steroids work slowly and do not reverse anaphylaxis.']],
    },
  },
  model: {
    junior: {
      layers: [['eat', 'Peanut gets into his body', 'Even a small amount.'], ['mistake', 'The immune system mistakes it for an enemy', 'His body is allergic.'], ['alarm', 'Alarm chemicals flood the body', 'Histamine and others.'], ['effects', 'Swelling, tight airways and low blood pressure', 'Many body parts react at once.']],
      clues: [['cookie', 'Cookie with hidden peanut butter', 'eat', 'The trigger.'], ['allergy', 'Known peanut allergy', 'mistake', 'His immune system is primed to react.'], ['hives', 'Itchy hives', 'alarm', 'Histamine makes the skin itchy and bumpy.'], ['lips', 'Swollen lips, tight throat', 'effects', 'Swelling can block the airway.'], ['wheeze', 'Wheezing', 'effects', 'Airways tighten.'], ['dizzy', 'Dizzy, blood pressure 80/44', 'effects', 'Blood vessels widen and leak.']],
      wrap: 'Noah’s immune system mistook peanut for a dangerous invader and flooded his body with alarm chemicals. Epinephrine reverses those effects quickly.',
    },
    senior: {
      layers: [['sens', 'Allergen exposure in a sensitized patient', 'Pre-formed peanut-specific IgE.'], ['mast', 'IgE-mediated mast cell and basophil activation', 'Cross-linking triggers degranulation.'], ['med', 'Mediator release', 'Histamine, tryptase, leukotrienes, prostaglandins.'], ['multi', 'Multisystem effects', 'Vasodilation, capillary leak, bronchospasm, angioedema.']],
      clues: [['ing', 'Peanut ingestion', 'sens', 'Exposure.'], ['hx', 'Known peanut allergy and asthma', 'sens', 'Asthma raises the risk of severe reactions.'], ['urt', 'Urticaria', 'med', 'Histamine-driven.'], ['ang', 'Lip angioedema and throat tightness', 'multi', 'Upper airway threat.'], ['bronch', 'Wheeze, SpO₂ 91%', 'multi', 'Bronchospasm.'], ['hypo', 'BP 80/44, HR 140', 'multi', 'Vasodilation and capillary leak.'], ['gi', 'Vomiting', 'multi', 'GI smooth muscle and mucosal involvement.']],
      wrap: 'Your model predicts a raised serum tryptase drawn within 1–2 hours, and rapid improvement after epinephrine.',
    },
  },
  ddx: {
    junior: { options: [
      ['ana', 'A severe allergic reaction (anaphylaxis)', 'leading', 'He ate peanut and has hives, swelling, wheezing and low blood pressure.'],
      ['asthma', 'An asthma attack', 'possible', 'He has asthma, but asthma doesn’t cause hives or swollen lips.'],
      ['choke', 'Choking on the cookie', 'possible', 'Choking can make breathing hard, but not hives or swollen lips.'],
      ['panic', 'Feeling panicked', 'unlikely', 'Panic doesn’t cause hives or a blood pressure of 80.'],
      ['bug', 'A stomach bug', 'unlikely', 'The timing right after the cookie points to allergy.'],
    ] },
    senior: { options: [
      ['ana', 'Anaphylaxis to peanut', 'leading', 'Known allergen; skin, respiratory, GI and cardiovascular involvement within minutes.'],
      ['fb', 'Foreign-body aspiration', 'cantmiss', 'Food can obstruct the airway; consider if stridor persists after epinephrine.'],
      ['asthma', 'Acute asthma exacerbation', 'possible', 'Can coexist; doesn’t explain urticaria, angioedema and hypotension.'],
      ['hae', 'Hereditary angioedema', 'possible', 'Angioedema without urticaria; doesn’t respond to epinephrine.'],
      ['vaso', 'Vasovagal reaction', 'possible', 'Bradycardia and pallor, without hives or wheeze.'],
      ['sepsis', 'Septic shock', 'unlikely', 'No fever and a clear allergen trigger.'],
    ] },
  },
  labs: { r: [
    ['Serum tryptase (1 hour)', '32', 'ng/mL', '< 11.4', 'high', 'Supports mast cell activation'],
    ['SpO₂ after epinephrine', '98', '%', '≥ 95', 'normal'],
    ['Blood pressure after epinephrine', '104/62', 'mmHg', 'Age-appropriate', 'normal'],
  ] },
  decision: {
    junior: ['What happened to Noah?', [
      ['His immune system overreacted to peanut, causing anaphylaxis', 'Exactly. Epinephrine worked within minutes.', true],
      ['He choked on the cookie', 'Choking doesn’t cause hives and swollen lips.'],
      ['He caught a cold at the party', 'Colds don’t start five minutes after eating a cookie.'],
    ]],
    senior: ['Which explanation is best supported?', [
      ['IgE-mediated anaphylaxis to peanut', 'Correct. Raised tryptase and rapid response to epinephrine confirm it.', true],
      ['Hereditary angioedema', 'HAE lacks urticaria and doesn’t respond to epinephrine.'],
      ['Asthma exacerbation', 'Asthma was a risk factor, not the diagnosis.'],
    ]],
    wrap: 'Noah is observed in the emergency department for several hours. He goes home with two new auto-injectors, an updated anaphylaxis action plan and a referral back to his allergist.',
  },
  debrief: {
    science: 'In an allergy, the immune system mistakes a harmless food for an invader. Mast cells release histamine and other chemicals that make blood vessels leak, airways tighten and skin swell. Epinephrine reverses all of these within minutes.',
    pearl: 'Epinephrine first, then call 911. Antihistamines and steroids are never substitutes. People with food allergies should always carry two auto-injectors.',
    uncertainty: 'A second wave of symptoms (biphasic reaction) can happen hours later, so observation matters.',
    human: 'Noah’s friend’s mom didn’t know the cookies had peanut butter. Food allergies are a community responsibility: read labels, ask questions and never shame a child for having one.',
    closing: 'Knowing where the epinephrine is, and having the courage to use it, saves lives.',
  },
  founder: 'Teaching point: epinephrine IM is first line; antihistamines do not treat anaphylaxis. Practice with trainer auto-injectors in a live session. Discuss food-allergy inclusion and anti-bullying.',
});

export const DKA = makeCase({
  code: 'CASE-010', slug: 'elijah-dka', room: 'emergency-department', emergency: true,
  title: 'Thirsty, Tired and Thinner', summary: 'Elijah has been drinking and peeing constantly, has lost weight and is now vomiting and breathing fast.',
  specialty: 'Endocrinology', system: 'Hormones & Metabolism', minutes: [20, 35],
  patient: { name: 'Elijah Washington', age: 12, concern: 'Vomiting, belly pain and fast breathing', interests: ['Basketball', 'Comics'] },
  art: 'a thin 12-year-old Black boy lying on an emergency room bed looking tired and unwell, breathing deeply, a water bottle on the tray table, his father sitting beside him, a nurse checking a glucose meter, calm clinical lighting',
  opening: {
    scene: 'Elijah’s dad brings him in because he’s been throwing up since last night. His clothes look loose. He takes slow, deep, fast breaths, and his breath smells fruity.',
    dialogue: 'I’ve been so thirsty for weeks. I keep waking up to pee.',
    narrator: 'The 4 Ts of type 1 diabetes are Toilet, Thirsty, Tired and Thinner. When they are missed, the body can slide into a dangerous state called diabetic ketoacidosis.',
  },
  history: {
    min: 3,
    q: [
      ['How long have you been extra thirsty?', 'Like three weeks. I drink all the time.', 'Excess thirst (polydipsia) follows fluid lost in the urine.'],
      ['Have you been peeing more?', 'Tons. I even wet the bed twice.', 'New bedwetting in an older child is a classic clue.'],
      ['Has your weight changed?', 'My pants are falling off. I’m eating more, though.', 'Weight loss despite eating more: the body can’t use the sugar it has.'],
      ['When did the vomiting start?', 'Last night. My stomach hurts too.', 'Ketones cause nausea, vomiting and belly pain.'],
      ['Are you breathing differently?', 'It feels like I can’t catch my breath.', 'Deep, fast breathing blows off acid as carbon dioxide.'],
      ['Does anyone in your family have diabetes?', 'My cousin has type 1.', 'Family history raises the risk.'],
    ],
  },
  exam: {
    text: 'You watch the examination.',
    f: [['Breathing', 'Deep and fast (34 per minute), fruity breath', 'abnormal'], ['Heart rate', '128 beats per minute', 'high'], ['Blood pressure', '108/66', 'normal'], ['Mouth and eyes', 'Dry mouth, sunken eyes', 'abnormal'], ['Capillary refill', '3 seconds', 'abnormal'], ['Alertness', 'Tired but answers questions', 'note'], ['Fingerstick glucose', '“HI” (over 500 mg/dL)', 'high']],
    junior: ['What is the most important clue?', [
      ['His blood sugar is extremely high', 'Right. His body has sugar in the blood but can’t use it.', true],
      ['His blood pressure', 'His blood pressure is still normal.'],
      ['His favorite sport', 'Interesting, but not a clue here.'],
    ]],
    senior: ['How do you interpret this picture?', [
      ['Suspected diabetic ketoacidosis with moderate dehydration and Kussmaul respirations', 'Correct. Hyperglycemia, ketotic breath and compensatory hyperventilation.', true],
      ['Gastroenteritis', 'Gastroenteritis doesn’t explain weeks of polyuria, weight loss and glucose over 500.'],
      ['Asthma exacerbation', 'Kussmaul breathing is deep and regular, without wheeze.'],
    ]],
  },
  act: {
    junior: {
      prompt: 'Put the team’s first steps in order.',
      steps: [['Check his blood sugar and blood tests', 'Confirm the problem.'], ['Put in an IV', 'To give fluid and medicine.'], ['Give fluid through the IV', 'He is very dried out.'], ['Start insulin slowly through the IV', 'Insulin lets the body use sugar again and stops the acid.'], ['Check his brain and blood sugar often', 'Changes in thinking can be a warning sign.']],
      distractors: [['Give him sugar', 'His blood sugar is already very high.'], ['Give an insulin shot and send him home', 'DKA needs careful care in the hospital.']],
    },
    senior: {
      prompt: 'Order the initial management of pediatric DKA.',
      steps: [['Assess ABCs, attach monitors, obtain IV access', 'Two IVs if possible.'], ['Send glucose, venous blood gas, electrolytes and beta-hydroxybutyrate', 'Confirm DKA and measure severity.'], ['Give a 10–20 mL/kg isotonic fluid bolus if poorly perfused', 'Then replace the deficit evenly over 24–48 hours.'], ['Start an IV insulin infusion (0.05–0.1 units/kg/hour) after initial fluids, with no bolus', 'Gradual correction is safer.'], ['Add potassium to fluids once potassium is known and he is passing urine', 'Insulin drives potassium into cells; total-body potassium is low.'], ['Monitor hourly for cerebral edema; add dextrose as glucose falls', 'Headache, falling heart rate, rising blood pressure or confusion are warning signs.']],
      distractors: [['Give an IV insulin bolus', 'Raises cerebral edema and hypokalemia risk.'], ['Give sodium bicarbonate routinely', 'Not recommended and associated with cerebral edema.']],
    },
  },
  model: {
    junior: {
      layers: [['noins', 'His body stops making insulin', 'The key that lets sugar into cells.'], ['sugar', 'Sugar builds up in the blood', 'Spills out in the urine with water.'], ['fat', 'The body burns fat for fuel', 'Fat burning makes acids called ketones.'], ['acid', 'Acid builds up', 'He breathes fast to blow off acid.']],
      clues: [['cousin', 'A cousin with type 1 diabetes', 'noins', 'Diabetes can run in families.'], ['thirst', 'Very thirsty, peeing a lot', 'sugar', 'Sugar pulls water into the urine.'], ['bg', 'Blood sugar over 500', 'sugar', 'Sugar is stuck in the blood.'], ['thin', 'Losing weight while eating more', 'fat', 'Cells are starving, so the body breaks down fat and muscle.'], ['fruity', 'Fruity breath', 'acid', 'Ketones smell fruity.'], ['breath', 'Deep, fast breathing', 'acid', 'Breathing out carbon dioxide gets rid of acid.']],
      wrap: 'Without insulin, Elijah’s cells starved even as sugar piled up in his blood. His body burned fat and made acid, which made him vomit and breathe fast.',
    },
    senior: {
      layers: [['beta', 'Autoimmune beta-cell destruction', 'Absolute insulin deficiency.'], ['hyper', 'Hyperglycemia and osmotic diuresis', 'Glucosuria pulls water and electrolytes.'], ['keto', 'Lipolysis and ketogenesis', 'Counter-regulatory hormones unopposed.'], ['acid', 'Anion-gap metabolic acidosis with compensation', 'Ketoacids consume bicarbonate.']],
      clues: [['fh', 'Family history of type 1 diabetes', 'beta', 'Genetic susceptibility.'], ['poly', 'Polyuria, polydipsia, nocturia', 'hyper', 'Osmotic diuresis.'], ['dehyd', 'Dry mucosa, CRT 3 s', 'hyper', 'Volume depletion from diuresis and vomiting.'], ['wt', 'Weight loss despite polyphagia', 'keto', 'Catabolism of fat and muscle.'], ['ab', 'Vomiting and abdominal pain', 'acid', 'Ketosis and acidosis cause GI symptoms.'], ['kuss', 'Kussmaul respirations', 'acid', 'Respiratory compensation.']],
      wrap: 'Your model predicts a low pH and bicarbonate, a raised anion gap, high ketones and a high HbA1c reflecting weeks of hyperglycemia.',
    },
  },
  ddx: {
    junior: { options: [
      ['t1d', 'New type 1 diabetes causing a dangerous acid buildup', 'leading', 'Thirst, peeing, weight loss, very high sugar and fast breathing.'],
      ['bug', 'A stomach bug', 'possible', 'Can cause vomiting, but not weeks of thirst and high blood sugar.'],
      ['appendix', 'Appendicitis', 'possible', 'Belly pain and vomiting can mean appendicitis. His sugar points elsewhere.'],
      ['asthma', 'An asthma attack', 'unlikely', 'His breathing is deep and fast, without wheezing.'],
      ['growth', 'A growth spurt', 'unlikely', 'Growth spurts don’t cause weight loss and vomiting.'],
    ] },
    senior: { options: [
      ['dka', 'New-onset type 1 diabetes with DKA', 'leading', 'Classic 4 Ts, hyperglycemia and Kussmaul respirations.'],
      ['t2', 'Type 2 diabetes presenting with DKA', 'possible', 'Can happen, especially in teens with obesity; antibodies and C-peptide distinguish.'],
      ['ge', 'Gastroenteritis', 'possible', 'Doesn’t explain weeks of polyuria or the hyperglycemia.'],
      ['appy', 'Appendicitis', 'cantmiss', 'DKA abdominal pain usually improves as acidosis corrects; persistent focal pain needs evaluation.'],
      ['sal', 'Salicylate toxicity', 'possible', 'Anion-gap acidosis with hyperventilation, but normal or low glucose.'],
      ['uti', 'Urinary tract infection', 'possible', 'Can cause frequency; infection can also trigger DKA.'],
      ['asthma', 'Asthma exacerbation', 'unlikely', 'Kussmaul breathing isn’t bronchospasm.'],
    ] },
  },
  labs: { r: [
    ['Glucose', '520', 'mg/dL', '70–140', 'high'],
    ['Venous pH', '7.12', '', '7.32–7.42', 'low'],
    ['Bicarbonate', '8', 'mmol/L', '20–28', 'low'],
    ['Anion gap', '26', 'mmol/L', '8–16', 'high'],
    ['Beta-hydroxybutyrate', '6.2', 'mmol/L', '< 0.6', 'high'],
    ['Potassium', '5.4', 'mmol/L', '3.5–5.0', 'high', 'Total-body potassium is actually low'],
    ['Sodium', '131', 'mmol/L', '135–145', 'low', 'Falsely low from hyperglycemia'],
    ['Hemoglobin A1c', '12.1', '%', '< 5.7', 'high'],
  ] },
  decision: {
    junior: ['Look back at your differential. What is happening to Elijah?', [
      ['He has new type 1 diabetes, and his body made too much acid', 'Exactly. With fluids and insulin, he will feel better over the next day.', true],
      ['He ate too much candy', 'Candy doesn’t cause type 1 diabetes. His body stopped making insulin.'],
      ['He has a stomach bug', 'His very high sugar and acid point to diabetes.'],
    ]],
    senior: ['Which explanation is best supported?', [
      ['Severe DKA from new-onset type 1 diabetes', 'Correct. pH 7.12, bicarbonate 8, high ketones and an A1c of 12.1.', true],
      ['Hyperosmolar hyperglycemic state', 'HHS has minimal ketosis and usually much higher glucose.'],
      ['Salicylate toxicity', 'Glucose is high and ketones explain the gap.'],
    ]],
    wrap: 'Elijah’s acidosis resolves over 24 hours on IV fluids and insulin. He and his dad meet the diabetes team to learn insulin, carbohydrate counting and glucose monitoring before going home.',
  },
  debrief: {
    science: 'Insulin is the key that lets sugar into cells. In type 1 diabetes, the immune system destroys the cells that make insulin. Sugar piles up in the blood while cells starve, so the body burns fat and makes acids called ketones.',
    pearl: 'Remember the 4 Ts: Toilet, Thirsty, Tired, Thinner. Checking a fingerstick glucose in a child with these symptoms can prevent DKA. In DKA, watch for brain swelling: headache, confusion or a slowing heart rate.',
    uncertainty: 'Type 1 diabetes is lifelong but very manageable with insulin, technology and support.',
    human: 'Elijah’s family worries they missed the signs. Healers can help families learn without blame.',
    closing: 'A new diagnosis is also the beginning of learning to thrive.',
  },
  founder: 'Teaching point: the 4 Ts; DKA management principles (fluids, insulin infusion without bolus, potassium, cerebral edema watch). Discuss living well with T1D and diabetes camp.',
});

export const TLS = makeCase({
  code: 'CASE-011', slug: 'daniel-tls', room: 'emergency-department', emergency: true,
  title: 'When Cancer Cells Break Apart', summary: 'Daniel started chemotherapy for lymphoma yesterday. Now his muscles cramp and he’s barely peeing. Protect his heart and kidneys.',
  specialty: 'Pediatric Hematology & Oncology', system: 'Blood & Cancer', minutes: [20, 35],
  patient: { name: 'Daniel Mensah', age: 8, concern: 'Muscle cramps, little urine, nausea after starting chemo', interests: ['Robots', 'Soccer'] },
  art: 'an 8-year-old Ghanaian-American boy with a bald head resting in a colorful pediatric oncology hospital room, an IV pole with fluid bags, a cardiac monitor beside the bed, his mother reading to him, a nurse checking the monitor, warm hopeful lighting',
  opening: {
    scene: 'Daniel was diagnosed with Burkitt lymphoma two days ago, a fast-growing cancer that caused a large mass in his belly. He started chemotherapy yesterday. Tonight he has muscle cramps, tingling fingers and nausea, and he has barely peed all day.',
    dialogue: 'My hands feel tingly and my legs keep cramping.',
    narrator: 'Fast-growing cancers can break apart quickly when treatment starts. Everything inside the cancer cells spills into the blood at once. This is tumor lysis syndrome.',
    narratorRole: 'Pediatric oncologist',
  },
  history: {
    min: 3,
    q: [
      ['When did the cramps start?', 'This afternoon. They’re getting worse.', 'Cramps and tingling can come from low calcium.'],
      ['How much have you been peeing?', 'Hardly at all since this morning.', 'Falling urine output means the kidneys are struggling.', 'Daniel'],
      ['When did chemotherapy start?', 'Yesterday morning.', 'TLS usually occurs 12–72 hours after starting therapy.', 'Daniel’s mom'],
      ['How big was the tumor?', 'The doctors said it was very large and growing fast.', 'A large, fast-growing tumor is the biggest risk factor.', 'Daniel’s mom'],
      ['Does your heart feel funny?', 'Sometimes it flutters.', 'Palpitations can mean an abnormal rhythm from high potassium.'],
      ['Has he been drinking well?', 'Not really. He’s been nauseous.', 'Poor hydration raises the risk of kidney injury.', 'Daniel’s mom'],
    ],
  },
  exam: {
    text: 'You observe the team’s exam and bedside monitor.',
    f: [['Heart monitor', 'Tall, peaked T waves', 'abnormal'], ['Heart rate', '72, with occasional extra beats', 'note'], ['Muscles', 'Twitching; hand spasms when blood pressure cuff inflates', 'abnormal'], ['Urine output', '0.3 mL/kg/hour over 6 hours', 'low'], ['Abdomen', 'Large firm mass', 'abnormal'], ['Weight', 'Up 1 kg since yesterday', 'high']],
    junior: ['Which problem is the most dangerous right now?', [
      ['The heart monitor changes, because a heart rhythm problem can be life-threatening', 'Right. Too much potassium can make the heart beat dangerously.', true],
      ['His muscle cramps', 'Cramps matter, but the heart rhythm is the most urgent.'],
      ['His weight', 'Weight gain shows fluid is building up, but the heart comes first.'],
    ]],
    senior: ['How do you interpret these findings?', [
      ['Suspected tumor lysis syndrome with hyperkalemic ECG changes, hypocalcemia and oliguric kidney injury', 'Correct. Peaked T waves and Trousseau sign 24 hours after starting chemotherapy.', true],
      ['Chemotherapy-induced nausea and dehydration', 'Doesn’t explain peaked T waves or tetany.'],
      ['Sepsis', 'Always consider in a patient with cancer, but this pattern fits TLS.'],
    ]],
  },
  act: {
    junior: {
      prompt: 'Put the team’s first steps in order.',
      steps: [['Watch his heart with a monitor', 'Catch dangerous rhythms right away.'], ['Give medicine that protects the heart (calcium)', 'Calcium steadies the heart while other treatments work.'], ['Give medicine that moves potassium into cells', 'Insulin with sugar and a breathing treatment can lower blood potassium quickly.'], ['Give medicine to clear uric acid and IV fluid to flush the kidneys', 'Helps the kidneys clean the blood.'], ['Call the kidney team for dialysis if the kidneys can’t keep up', 'A machine can clean the blood.']],
      distractors: [['Give him a banana for his cramps', 'Bananas have potassium. His potassium is already too high.'], ['Stop all his monitoring and let him rest', 'He needs close watching right now.']],
    },
    senior: {
      prompt: 'Order the management of tumor lysis syndrome with hyperkalemia and ECG changes.',
      steps: [['Continuous cardiac monitoring and a 12-lead ECG', 'Hyperkalemia can cause fatal arrhythmias.'], ['Give IV calcium gluconate to stabilize the cardiac membrane', 'For ECG changes. Use cautiously: calcium-phosphate precipitation.'], ['Shift potassium into cells with insulin plus glucose and inhaled albuterol', 'Temporary measures that work in minutes.'], ['Give rasburicase (after checking G6PD) and continue hyperhydration if he makes urine', 'Rasburicase breaks down uric acid quickly.'], ['Stop potassium in fluids and give a potassium binder', 'Remove potassium from the body.'], ['Consult nephrology for dialysis if refractory hyperkalemia, oliguria or fluid overload', 'Dialysis removes potassium, phosphate and uric acid.']],
      distractors: [['Alkalinize the urine with sodium bicarbonate', 'No longer recommended: increases calcium-phosphate precipitation.'], ['Give potassium-containing maintenance fluids', 'Potassium must be removed from fluids in TLS.']],
    },
  },
  model: {
    junior: {
      layers: [['big', 'A big, fast-growing cancer', 'Lots of cancer cells.'], ['break', 'Chemo breaks the cancer cells apart', 'All at once.'], ['spill', 'Their insides spill into the blood', 'Potassium, phosphate and uric acid.'], ['harm', 'Kidneys clog and the heart and muscles are affected', 'Too much of the wrong salts.']],
      clues: [['mass', 'Large belly tumor', 'big', 'A big, fast-growing tumor.'], ['chemo', 'Chemo started yesterday', 'break', 'Chemo kills cancer cells quickly.'], ['pee', 'Hardly any pee', 'harm', 'Crystals and salts are clogging the kidneys.'], ['twitch', 'Cramps and tingly hands', 'harm', 'Calcium drops when phosphate rises.'], ['heart', 'Peaked waves on the heart monitor', 'harm', 'Too much potassium affects the heart.'], ['weight', 'Gaining weight from fluid', 'harm', 'The kidneys can’t remove extra water.']],
      wrap: 'Chemo worked fast, breaking many cancer cells at once. Their contents flooded Daniel’s blood, clogging his kidneys and upsetting his heart and muscles.',
    },
    senior: {
      layers: [['burden', 'High tumor burden with rapid turnover', 'Burkitt lymphoma.'], ['lysis', 'Cytotoxic therapy causes massive cell lysis', 'Intracellular contents released.'], ['aki', 'Crystal nephropathy and acute kidney injury', 'Uric acid and calcium phosphate.'], ['tox', 'Electrolyte toxicity', 'Hyperkalemia, hyperphosphatemia, hypocalcemia.']],
      clues: [['bl', 'Burkitt lymphoma with large abdominal mass', 'burden', 'One of the highest-risk tumors for TLS.'], ['tx', 'Chemotherapy started 24 hours ago', 'lysis', 'Typical timing.'], ['olig', 'Urine output 0.3 mL/kg/hour', 'aki', 'Oliguric AKI.'], ['wt', 'Weight gain of 1 kg', 'aki', 'Fluid retention.'], ['ecg', 'Peaked T waves, ectopy', 'tox', 'Hyperkalemia.'], ['tet', 'Tingling and Trousseau sign', 'tox', 'Hypocalcemia from phosphate binding calcium.']],
      wrap: 'Your model predicts high potassium, phosphate, uric acid and creatinine, with low calcium.',
    },
  },
  ddx: {
    junior: { options: [
      ['tls', 'Cancer cells breaking apart too fast (tumor lysis syndrome)', 'leading', 'Big tumor, chemo yesterday, little pee and heart changes.'],
      ['dry', 'Being dried out', 'possible', 'He hasn’t drunk much, but that doesn’t explain the heart changes.'],
      ['infection', 'An infection', 'possible', 'Kids with cancer can get serious infections. Doctors always check.'],
      ['medicine', 'A side effect of chemo on the kidneys', 'possible', 'Some medicines can harm kidneys. The pattern here fits tumor lysis.'],
      ['banana', 'Eating too many bananas', 'unlikely', 'Food alone wouldn’t cause this.'],
    ] },
    senior: { options: [
      ['tls', 'Laboratory and clinical tumor lysis syndrome', 'leading', 'High-risk tumor, timing after chemotherapy, hyperkalemia, hypocalcemia and AKI.'],
      ['pseudo', 'Pseudohyperkalemia', 'possible', 'Hemolysis or very high white counts can falsely raise potassium; the ECG changes confirm true hyperkalemia.'],
      ['sepsis', 'Sepsis', 'cantmiss', 'Any febrile or unwell child on chemotherapy needs evaluation for infection.'],
      ['nephro', 'Drug nephrotoxicity', 'possible', 'Methotrexate and other agents can injure kidneys.'],
      ['obstr', 'Urinary obstruction by the tumor', 'possible', 'Abdominal masses can compress the ureters; ultrasound checks.'],
      ['dehyd', 'Prerenal injury from poor intake', 'possible', 'Contributes, but doesn’t explain the full electrolyte pattern.'],
      ['vitd', 'Vitamin D deficiency', 'unlikely', 'Doesn’t explain hyperkalemia or AKI.'],
    ] },
  },
  labs: { r: [
    ['Potassium', '6.8', 'mmol/L', '3.5–5.0', 'high'],
    ['Phosphate', '9.1', 'mg/dL', '4.0–6.5 (child)', 'high'],
    ['Calcium', '6.4', 'mg/dL', '8.8–10.8', 'low'],
    ['Uric acid', '14.2', 'mg/dL', '2.0–5.5', 'high'],
    ['Creatinine', '1.6', 'mg/dL', '0.3–0.7 (baseline 0.5)', 'high'],
    ['LDH', '3,400', 'U/L', '< 300', 'high', 'Reflects tumor burden'],
    ['G6PD', 'Normal', '', 'Normal', 'normal', 'Safe to give rasburicase'],
  ] },
  decision: {
    junior: ['Look back at your differential. What is happening to Daniel?', [
      ['Cancer cells broke apart quickly and spilled salts into his blood', 'Exactly. The treatment is working, but his body needs help cleaning up.', true],
      ['The chemo isn’t working', 'The chemo is working very fast. That’s why this happened.'],
      ['He is just nervous', 'His blood tests show a real, dangerous problem.'],
    ]],
    senior: ['Which explanation is best supported?', [
      ['Clinical tumor lysis syndrome with hyperkalemia and acute kidney injury', 'Correct. High K, phosphate and uric acid with low calcium and a rising creatinine.', true],
      ['Pseudohyperkalemia', 'ECG changes indicate true hyperkalemia.'],
      ['Isolated prerenal AKI', 'Doesn’t explain the uric acid and phosphate rise.'],
    ]],
    wrap: 'Daniel’s potassium falls with treatment, but his kidneys need a few days of dialysis. His lymphoma responds to therapy, and his kidney function recovers.',
  },
  debrief: {
    science: 'Cancer cells contain potassium, phosphate and DNA. When many die at once, these flood the blood. Uric acid from DNA and calcium phosphate crystals can block the kidneys; high potassium can stop the heart; phosphate binds calcium, causing cramps.',
    pearl: 'Prevention is best: hydration, uric acid–lowering medicine and frequent labs before and after starting chemotherapy for high-risk cancers.',
    uncertainty: 'Most children recover kidney function after TLS. His oncology team will adjust the timing of further chemotherapy.',
    human: 'Daniel’s family heard “the chemo is working” and “emergency” in the same hour. Clear, honest explanations help families hold both.',
    closing: 'Every treatment has effects to anticipate. Great healers plan for them.',
  },
  founder: 'Teaching point: TLS in high-grade lymphoma and leukemia; hyperkalemia treatment sequence (stabilize, shift, remove); rasburicase and G6PD. A personal story from heme/onc service fits well here.',
});
