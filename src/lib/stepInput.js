// Cleans a lesson submitted from the Lesson Builder.
export const KINDS = ['video', 'reading', 'activity', 'quiz', 'simulation', 'lesson', 'case'];

export function cleanStep(b) {
  const kind = KINDS.includes(b.kind) ? b.kind : null;
  if (!kind) throw new Error('Choose a lesson type.');
  const title = String(b.title || '').trim().slice(0, 255);
  if (!title) throw new Error('Give the lesson a title.');
  const data = {};
  if (kind === 'quiz') {
    data.questions = cleanQuestions(b.data?.questions);
    if (!data.questions.length) throw new Error('Add at least one question.');
  }
  if (kind === 'lesson') {
    const L = b.data || {};
    const txt = (v, n = 20000) => String(v || '').slice(0, n);
    const lines = (v) => (Array.isArray(v) ? v : String(v || '').split('\n')).map((x) => String(x).trim()).filter(Boolean).slice(0, 20);
    Object.assign(data, {
      code: txt(L.code, 24),
      minutes: { junior: Number(L.minutes?.junior) || 20, senior: Number(L.minutes?.senior) || 30 },
      objectives: { junior: lines(L.objectives?.junior), senior: lines(L.objectives?.senior) },
      hook: { narration: txt(L.hook?.narration, 2000) },
      discovery: { junior: txt(L.discovery?.junior), senior: txt(L.discovery?.senior) },
      spotlight: L.spotlight?.name ? {
        name: txt(L.spotlight.name, 200), years: txt(L.spotlight.years, 40), contribution: txt(L.spotlight.contribution, 3000),
        connection: txt(L.spotlight.connection, 2000), source: { title: txt(L.spotlight.source?.title, 300), url: txt(L.spotlight.source?.url, 600) },
      } : null,
      mission: (L.mission?.spots || []).length || L.mission?.title ? {
        type: 'explore', title: txt(L.mission.title, 200), intro: txt(L.mission.intro, 2000), reward: txt(L.mission.reward, 200),
        spots: (L.mission.spots || []).slice(0, 12).map((x) => ({ name: txt(x.name, 120), art: txt(x.art, 600), href: txt(x.href, 300), text: txt(x.text, 1000) })).filter((x) => x.name),
      } : null,
      check: { junior: cleanQuestions(L.check?.junior, true), senior: cleanQuestions(L.check?.senior, true) },
      physician: { prompt: txt(L.physician?.prompt, 2000), questions: lines(L.physician?.questions) },
      journal: { prompt: txt(L.journal?.prompt, 1000) },
      closing: txt(L.closing, 2000),
    });
    if (!data.hook.narration) throw new Error('Write the Hook narration.');
    if (!data.discovery.junior && !data.discovery.senior) throw new Error('Write the Discovery for at least one track.');
  }
  if (kind === 'case') {
    const C = b.data || {};
    if (!C.patient?.name) throw new Error('The case needs a patient name.');
    if (!Array.isArray(C.stages) || !C.stages.length) throw new Error('The case needs at least one stage.');
    const raw = JSON.stringify(C);
    if (raw.length > 120000) throw new Error('This case is too long.');
    Object.assign(data, JSON.parse(raw));
  }
  if (kind === 'activity') data.prompt = String(b.data?.prompt || '').trim().slice(0, 600) || 'Your reflection';
  if (kind === 'simulation') data.sim = b.data?.sim === 'stroke' ? 'stroke' : 'stroke';
  const media = kind === 'video' ? String(b.media_url || '').trim().slice(0, 1000) : null;
  if (kind === 'video' && !media) throw new Error('Upload a video or paste a video link.');
  return {
    reviewed: b.reviewed !== false,
    founder_notes: String(b.founder_notes || '').slice(0, 20000) || null,
    honor: String(b.honor || '').trim().slice(0, 60) || null,
    code: String(b.code || data.code || '').trim().slice(0, 24) || null,
    kind,
    title,
    unit: String(b.unit || '').trim().slice(0, 120) || 'Lessons',
    summary: String(b.summary || '').trim().slice(0, 600) || null,
    body: String(b.body || '').slice(0, 20000) || null,
    media_url: media,
    minutes: Math.min(240, Math.max(1, Number(b.minutes) || 5)),
    data,
  };
}

export function cleanQuestions(list, optional = false) {
  const qs = Array.isArray(list) ? list : [];
  return qs.slice(0, 40).filter((q) => !optional || String(q?.q || '').trim()).map((q, i) => {
    const options = (q.options || []).map((o) => String(o || '').trim().slice(0, 300)).filter(Boolean).slice(0, 6);
    const answer = Number(q.answer);
    if (!String(q.q || '').trim()) throw new Error(`Question ${i + 1} needs text.`);
    if (options.length < 2) throw new Error(`Question ${i + 1} needs at least two answers.`);
    if (!(answer >= 0 && answer < options.length)) throw new Error(`Mark the correct answer for question ${i + 1}.`);
    return { q: String(q.q).trim().slice(0, 600), options, answer, explain: String(q.explain || '').trim().slice(0, 800) };
  });
}
