// Cleans a lesson submitted from the Lesson Builder.
export const KINDS = ['video', 'reading', 'activity', 'quiz', 'simulation'];

export function cleanStep(b) {
  const kind = KINDS.includes(b.kind) ? b.kind : null;
  if (!kind) throw new Error('Choose a lesson type.');
  const title = String(b.title || '').trim().slice(0, 255);
  if (!title) throw new Error('Give the lesson a title.');
  const data = {};
  if (kind === 'quiz') {
    const qs = Array.isArray(b.data?.questions) ? b.data.questions : [];
    data.questions = qs.slice(0, 40).map((q, i) => {
      const options = (q.options || []).map((o) => String(o || '').trim().slice(0, 300)).filter(Boolean).slice(0, 6);
      const answer = Number(q.answer);
      if (!String(q.q || '').trim()) throw new Error(`Question ${i + 1} needs text.`);
      if (options.length < 2) throw new Error(`Question ${i + 1} needs at least two answers.`);
      if (!(answer >= 0 && answer < options.length)) throw new Error(`Mark the correct answer for question ${i + 1}.`);
      return { q: String(q.q).trim().slice(0, 600), options, answer, explain: String(q.explain || '').trim().slice(0, 800) };
    });
    if (!data.questions.length) throw new Error('Add at least one question.');
  }
  if (kind === 'activity') data.prompt = String(b.data?.prompt || '').trim().slice(0, 600) || 'Your reflection';
  if (kind === 'simulation') data.sim = b.data?.sim === 'stroke' ? 'stroke' : 'stroke';
  const media = kind === 'video' ? String(b.media_url || '').trim().slice(0, 1000) : null;
  if (kind === 'video' && !media) throw new Error('Upload a video or paste a video link.');
  return {
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
