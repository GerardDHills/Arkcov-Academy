// Compact authoring kit for patient cases. A case is written as an outline of
// tuples and expanded into the stage list the case engine plays:
//
//   interview -> examination -> [stabilize first] -> mental model ->
//   differential -> [laboratory] -> decision -> debrief
//
// Tuples:
//   question   [q, answer, feedback, who?]
//   finding    [label, value, flag]        flag: normal | abnormal | high | low | note
//   choice     [label, feedback, preferred?]
//   layer      [id, label, hint]
//   clue       [id, label, layerId, feedback]
//   option     [id, label, fit, why]      fit: leading | possible | cantmiss | unlikely
//   lab        [test, value, unit, ref, flag, note?]
//   step       [label, why]
//
// Every case seeds as a draft (reviewed = false) until faculty approve it.

const qn = ([q, a, feedback, who]) => ({ q, a, feedback, ...(who ? { who } : {}) });
const fd = ([label, value, flag = 'normal']) => ({ label, value, flag });
const ch = ([label, feedback, preferred]) => ({ label, feedback, ...(preferred ? { preferred: true } : {}) });
const ly = ([id, label, hint]) => ({ id, label, hint });
const cl = ([id, label, layer, feedback]) => ({ id, label, layer, feedback });
const op = ([id, label, fit, why]) => ({ id, label, fit, why });
const lb = ([test, value, unit, ref, flag = 'normal', note]) => ({ test, value, unit, ref, flag, ...(note ? { note } : {}) });
const sp = ([label, why]) => ({ label, why });

export const SYSTEMS = [
  'Emergency & Resuscitation', 'Newborn', 'Blood & Cancer', 'Heart & Circulation', 'Lungs & Breathing',
  'Digestive System', 'Kidneys & Urinary Tract', 'Hormones & Metabolism', 'Brain & Nerves',
  'Infection & Immunity', 'Bones, Joints & Sports',
];

export function makeCase(c) {
  const first = c.patient.name.split(' ')[0];
  const stages = [];

  stages.push({
    id: 'history', type: 'interview', title: c.history.title || 'Patient interview', min: c.history.min || 3,
    prompt: c.history.prompt || `Choose questions to ask${c.history.speaker ? '' : ` ${first}`}. Ask at least ${c.history.min || 3}.`,
    ...(c.history.speaker ? { speaker: c.history.speaker } : {}),
    questions: c.history.q.map(qn),
    ...(c.history.wrap ? { wrap: c.history.wrap } : {}),
  });

  stages.push({
    id: 'exam', type: 'observe', title: c.exam.title || 'Examination',
    text: c.exam.text,
    findings: c.exam.f.map(fd),
    modes: {
      junior: { prompt: c.exam.junior[0], choices: c.exam.junior[1].map(ch) },
      senior: { prompt: c.exam.senior[0], choices: c.exam.senior[1].map(ch) },
    },
  });

  if (c.act) {
    const seq = (v) => ({ prompt: v.prompt, steps: v.steps.map(sp), distractors: (v.distractors || []).map(sp), ...(v.wrap ? { wrap: v.wrap } : {}) });
    stages.push({ id: 'act', type: 'sequence', title: c.act.title || 'Stabilize first', modes: { junior: seq(c.act.junior), senior: seq(c.act.senior) } });
  }

  const model = (v, track) => ({
    prompt: v.prompt || (track === 'junior'
      ? `Build a model of what might be happening inside ${first}. Tap a clue, then tap the link in the chain it is evidence for. Each link leads to the next. Some links have no clue: you reason those out.`
      : 'Build a causal model. Assign each finding to the link in the chain it is the best evidence for, from the root process to the consequences you can observe.'),
    layers: v.layers.map(ly), clues: v.clues.map(cl), wrap: v.wrap,
  });
  stages.push({ id: 'model', type: 'model', title: 'Build the mental model', modes: { junior: model(c.model.junior, 'junior'), senior: model(c.model.senior, 'senior') } });

  const ddx = (v, track) => {
    const min = v.min || (track === 'junior' ? 3 : 4);
    const max = v.max || (track === 'junior' ? 5 : 6);
    return {
      prompt: v.prompt || (track === 'junior'
        ? `Healers never stop at the first idea. Choose at least ${min} possible causes, then move the one you think is most likely to the top.`
        : `Build your differential diagnosis. Choose ${min} to ${max}, rank them from most to least likely, and include anything dangerous you cannot afford to miss.`),
      min, max, options: v.options.map(op), ...(v.wrap ? { wrap: v.wrap } : {}),
    };
  };
  stages.push({ id: 'ddx', type: 'differential', title: 'Build a differential diagnosis', modes: { junior: ddx(c.ddx.junior, 'junior'), senior: ddx(c.ddx.senior, 'senior') } });

  if (c.labs) {
    stages.push({
      id: 'labs', type: 'labs', title: c.labs.title || 'Virtual laboratory',
      ...(c.labs.both ? {} : { modes_only: ['senior'] }),
      intro: c.labs.intro || `${first}’s results are back. Reference ranges are illustrative and vary by laboratory and age.`,
      results: c.labs.r.map(lb),
    });
  }

  stages.push({
    id: 'decision', type: 'decision', title: 'What explains the evidence?',
    modes: {
      junior: { prompt: c.decision.junior[0], choices: c.decision.junior[1].map(ch) },
      senior: { prompt: c.decision.senior[0], choices: c.decision.senior[1].map(ch) },
    },
    wrap: c.decision.wrap,
  });

  return {
    code: c.code,
    room: c.room,
    unit: c.unit || (c.emergency ? 'Emergency Cases' : 'Clinical Cases'),
    kind: 'case',
    title: c.title,
    summary: c.summary,
    minutes: c.minutes?.[0] || 20,
    honor: c.honor || (c.emergency ? 'Emergency Responder' : 'Clinical Investigator'),
    founder_notes: c.founder,
    data: {
      code: c.code,
      rev: c.rev || 1,
      specialty: c.specialty,
      system: c.system,
      emergency: Boolean(c.emergency),
      minutes: { junior: c.minutes?.[0] || 20, senior: c.minutes?.[1] || 30 },
      patient: {
        name: c.patient.name, age: c.patient.age, concern: c.patient.concern,
        ...(c.patient.interests ? { interests: c.patient.interests } : {}),
        scene: `/classroom/cases/${c.slug}.jpg`,
      },
      opening: c.opening,
      stages,
      debrief: c.debrief,
      journal: { prompt: c.journal || `What did ${first}’s story teach you about how healers think?` },
      ...(c.discussion ? { discussion: c.discussion } : {}),
    },
    art: c.art,
  };
}
