// Arkcov Academy — Social Superpower Assessment (arkcov-ssa-1.0)
// Framework originally developed by Dr. Gerard D. Hills for the Inspiring Healers Program (Oct 30, 2023).
// Educational self-reflection tool. Not a validated psychological assessment; never used for admissions.

export const ASSESSMENT_VERSION = 'arkcov-ssa-1.0';

// Emblem paths are drawn on a 24x24 grid (see SuperpowerEmblem in the assessment page).
export const SUPERPOWERS = {
  communication: {
    name: 'Communication',
    identity: 'The Connector',
    questions: [1, 8, 13],
    color: '#397BC4',
    definition: 'The power to express ideas, listen, build relationships, and help others understand one another.',
    attributes: ['Listening', 'Expression', 'Understanding', 'Connection'],
    result: 'You have the power to build bridges between people and help others feel heard and understood.',
    mission: 'Interview someone and share their story accurately.',
    inMedicine: 'Healers who connect explain a diagnosis so a scared family understands it, and listen for what a patient is not saying.',
    emblem: 'M4 7.5A3.5 3.5 0 0 1 7.5 4h5A3.5 3.5 0 0 1 16 7.5v2A3.5 3.5 0 0 1 12.5 13H9l-3 2.5V13A3.5 3.5 0 0 1 4 9.5v-2ZM18.5 10.6A3 3 0 0 1 20 13.2v1.6a3 3 0 0 1-2 2.8V20l-2.8-2.2H13a3 3 0 0 1-2.4-1.2',
  },
  courage: {
    name: 'Courage',
    identity: 'The Protector',
    questions: [2, 9, 16, 18],
    color: '#B94D43',
    definition: 'The power to confront fear, advocate for others, stand up for what is right, and face uncertainty.',
    attributes: ['Bravery', 'Advocacy', 'Integrity', 'Confidence'],
    result: 'You have the power to confront challenges and stand up for what is right, even when it is difficult.',
    mission: 'Practice respectfully advocating for someone in need.',
    inMedicine: 'Healers who protect speak up for patients, make hard calls in emergencies, and push for fair care.',
    emblem: 'M12 3 4 6.5V12c0 4.6 3.4 8 8 9 4.6-1 8-4.4 8-9V6.5L12 3ZM8.5 12l2.5 2.5 4.5-5',
  },
  grit: {
    name: 'Grit',
    identity: 'The Overcomer',
    questions: [3, 14, 23, 25],
    color: '#398044',
    definition: 'The power to persevere through challenges, recover from setbacks, and remain committed to a goal.',
    attributes: ['Perseverance', 'Resilience', 'Determination', 'Discipline'],
    result: 'You have the power to rise above setbacks and continue pursuing meaningful goals.',
    mission: 'Commit to learning a challenging skill over 30 days.',
    inMedicine: 'Healers who overcome keep going through years of training and long shifts, and never give up on a patient.',
    emblem: 'M2 20 9 8l4 6 3-4 6 10H2ZM9 8V3l4 1.6L9 6.2',
  },
  craftsmanship: {
    name: 'Craftsmanship',
    identity: 'The Artisan',
    questions: [4, 11, 17],
    color: '#7953B4',
    definition: 'The power to create excellent work through precision, patience, skill, and dedication to improvement.',
    attributes: ['Excellence', 'Mastery', 'Precision', 'Attention to detail'],
    result: 'You have the power to transform ordinary work into extraordinary accomplishments through dedication and precision.',
    mission: 'Create a project and refine it through multiple iterations.',
    inMedicine: 'Healers who craft are the surgeons, researchers and diagnosticians whose precision saves lives.',
    emblem: 'M6.5 4h11L21 9l-9 11L3 9l3.5-5ZM3 9h18M9.5 4 12 20l2.5-16',
  },
  leadership: {
    name: 'Leadership',
    identity: 'The Vanguard',
    questions: [5, 15, 22],
    color: '#167B70',
    definition: 'The power to guide, organize, empower, and inspire others toward a shared purpose.',
    attributes: ['Initiative', 'Responsibility', 'Influence', 'Collaboration'],
    result: 'You have the power to bring people together and inspire them to accomplish something meaningful.',
    mission: 'Lead a small team through a community service project.',
    inMedicine: 'Healers who lead run care teams, build clinics, and change how a whole community stays healthy.',
    emblem: 'M12 3l2.6 5.6 6.1.7-4.5 4.1 1.2 6L12 16.5l-5.4 2.9 1.2-6-4.5-4.1 6.1-.7L12 3Z',
  },
  spark: {
    name: 'Spark',
    identity: 'The Innovator',
    questions: [6, 10, 20, 24],
    color: '#C49A28',
    definition: 'The power to generate new ideas, bring energy into an environment, imagine possibilities, and inspire creativity.',
    attributes: ['Imagination', 'Enthusiasm', 'Innovation', 'Adaptability'],
    result: 'You have the power to see possibilities that others may overlook and bring new ideas to life.',
    mission: 'Invent a creative solution to an everyday problem.',
    inMedicine: 'Healers who spark invent new treatments, devices and ways to teach health that reach more people.',
    emblem: 'M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2V16h5v-.1c0-.8.4-1.5 1-2A6 6 0 0 0 12 3Z',
  },
  compassion: {
    name: 'Compassion',
    identity: 'The Healer',
    questions: [7, 12, 19, 21],
    color: '#BD4565',
    definition: 'The power to recognize the needs of others, demonstrate empathy, and respond through meaningful acts of kindness.',
    attributes: ['Empathy', 'Altruism', 'Kindness', 'Service'],
    result: 'You have the power to make others feel valued, supported, and understood.',
    mission: 'Complete intentional acts of kindness and reflect on their impact.',
    inMedicine: 'Healers with compassion make patients feel seen, and turn hard moments into moments of comfort.',
    emblem: 'M12 20s-7.5-4.6-9.3-9.2C1.5 7.4 3.8 4 7.3 4c2 0 3.5 1.1 4.7 2.8C13.2 5.1 14.7 4 16.7 4c3.5 0 5.8 3.4 4.6 6.8C19.5 15.4 12 20 12 20ZM12 9v5.5M9.25 11.75h5.5',
  },
};

// Order used around the radar chart.
export const SUPERPOWER_ORDER = ['communication', 'courage', 'grit', 'craftsmanship', 'leadership', 'spark', 'compassion'];

export const ANSWER_POINTS = { A: 3, B: 2, C: 1, D: 0 };

// Option letters are the scoring keys only. Display order is shuffled per cadet so A is not always first.
export const QUESTIONS = [
  { id: 1, text: 'When you are working with a group of people who have different opinions, how do you usually respond?', options: { A: "I listen to everyone and help them understand each other's perspectives.", B: 'I share my perspective and try to understand others.', C: 'I participate when someone asks for my opinion.', D: 'I usually remain quiet and let others discuss.' } },
  { id: 2, text: 'If you witnessed someone being treated unfairly, what would you most likely do?', options: { A: 'Speak up or seek help to ensure the person is treated fairly.', B: 'Offer support and consider how I could intervene.', C: 'Feel concerned but hesitate to get involved.', D: 'Avoid becoming involved in the situation.' } },
  { id: 3, text: 'When you encounter a difficult task that you cannot complete on your first attempt, what do you do?', options: { A: 'Continue trying and explore different strategies until I improve.', B: 'Try again, especially if someone encourages me.', C: 'Give it another attempt before moving on.', D: 'Usually move on to something easier.' } },
  { id: 4, text: 'How do you approach an assignment or project that is important to you?', options: { A: 'Carefully plan, refine, and review my work to achieve excellence.', B: 'Complete the assignment thoughtfully and check most details.', C: 'Focus primarily on meeting the requirements.', D: 'Finish as quickly as possible without much review.' } },
  { id: 5, text: 'When your group needs someone to organize a project, how do you respond?', options: { A: 'Take initiative and help everyone contribute toward a shared goal.', B: 'Volunteer to help organize part of the project.', C: 'Wait for someone to assign me a responsibility.', D: 'Prefer to let others organize the project.' } },
  { id: 6, text: 'When presented with a problem that has no obvious solution, what do you do?', options: { A: 'Generate several creative ideas and explore new possibilities.', B: 'Try to think of an alternative approach.', C: 'Look for an example of how someone else solved it.', D: 'Wait for someone to provide a solution.' } },
  { id: 7, text: 'When you notice someone who seems sad or discouraged, how do you respond?', options: { A: 'Check on them, listen, and offer meaningful support.', B: 'Ask whether they are okay and offer encouragement.', C: 'Feel concerned but struggle to approach them.', D: 'Usually continue with what I was doing.' } },
  { id: 8, text: 'How comfortable are you explaining a difficult concept to someone who does not understand it?', options: { A: 'I enjoy finding different ways to help them understand.', B: 'I try to explain it as clearly as possible.', C: 'I explain it briefly but may struggle to adjust my approach.', D: 'I prefer someone else to explain it.' } },
  { id: 9, text: 'How do you respond when presented with an opportunity that excites you but also makes you nervous?', options: { A: 'Pursue the opportunity despite my fear.', B: 'Pursue it after receiving reassurance or support.', C: 'Consider it but often hesitate to act.', D: 'Avoid the opportunity because it makes me uncomfortable.' } },
  { id: 10, text: 'When you have an opportunity to create something new, how do you approach it?', options: { A: 'Explore original ideas and experiment with different possibilities.', B: 'Add my own creative elements to an existing idea.', C: 'Follow an example or established design.', D: 'Prefer activities with predetermined instructions and outcomes.' } },
  { id: 11, text: 'How important is attention to detail when you are completing a project?', options: { A: 'Very important; I carefully examine and refine the details of my work.', B: 'Important; I check the major details before finishing.', C: 'Somewhat important; I focus mainly on the overall result.', D: 'I rarely spend additional time reviewing details.' } },
  { id: 12, text: 'If a friend is going through a difficult personal situation, what would you most likely do?', options: { A: 'Listen without judgment and find ways to support them.', B: 'Offer encouragement and check on them occasionally.', C: 'Express sympathy but remain unsure how to help.', D: 'Give them space without usually checking in.' } },
  { id: 13, text: 'When participating in a group discussion, how do you contribute your ideas?', options: { A: 'Clearly express my thoughts while encouraging others to share.', B: 'Share my ideas and listen to the responses.', C: 'Contribute primarily when someone asks me directly.', D: 'Usually keep my ideas to myself.' } },
  { id: 14, text: 'When you face a significant challenge, how do you usually respond?', options: { A: 'Break it into manageable steps and continue working toward my goal.', B: 'Make an effort and seek support when needed.', C: 'Try initially but may lose motivation when progress is slow.', D: 'Prefer to avoid challenges that seem especially difficult.' } },
  { id: 15, text: 'When members of your team begin losing motivation, what do you do?', options: { A: 'Encourage them, help address obstacles, and remind them of our shared goal.', B: 'Offer encouragement and continue contributing.', C: 'Focus primarily on completing my own responsibilities.', D: 'Wait for someone else to motivate the team.' } },
  { id: 16, text: 'When a situation requires you to make a difficult decision quickly, how do you respond?', options: { A: 'Assess the situation and take responsible action despite uncertainty.', B: 'Make a decision after seeking brief reassurance when possible.', C: 'Hesitate because I worry about making the wrong decision.', D: 'Prefer someone else to make the decision.' } },
  { id: 17, text: 'When learning a new skill, how do you approach improving your abilities?', options: { A: 'Practice intentionally, seek feedback, and refine my technique.', B: 'Practice regularly until I become comfortable.', C: 'Practice enough to understand the basics.', D: 'Usually move on after my initial experience.' } },
  { id: 18, text: 'How do you approach difficult but necessary conversations?', options: { A: 'Address the issue respectfully even when the conversation is uncomfortable.', B: 'Have the conversation after preparing or seeking advice.', C: 'Postpone the conversation until I feel more comfortable.', D: 'Usually avoid the conversation.' } },
  { id: 19, text: 'If you notice someone being excluded from a group activity, what would you do?', options: { A: 'Actively invite them to participate and help them feel included.', B: 'Make an effort to acknowledge them and offer an invitation.', C: 'Notice the exclusion but feel uncertain about intervening.', D: 'Continue participating without becoming involved.' } },
  { id: 20, text: 'When plans change unexpectedly, how do you respond?', options: { A: 'See the change as an opportunity to explore new possibilities.', B: 'Adjust my plans and look for an alternative.', C: 'Eventually adapt but prefer the original plan.', D: 'Find it difficult to engage once the original plan changes.' } },
  { id: 21, text: 'When someone needs help with a task that does not directly benefit you, what do you do?', options: { A: 'Offer assistance when I am reasonably able to help.', B: 'Help when asked and when my schedule allows.', C: 'Occasionally help but usually focus on my own responsibilities.', D: 'Rarely volunteer to assist.' } },
  { id: 22, text: 'When two members of your team disagree, how do you respond?', options: { A: 'Help them identify common ground and work toward a shared resolution.', B: 'Offer suggestions that might help resolve the disagreement.', C: 'Listen but generally allow them to resolve it themselves.', D: 'Avoid becoming involved in team disagreements.' } },
  { id: 23, text: 'If you are interested in learning something but have limited guidance, what do you do?', options: { A: 'Independently find resources, practice, and continue learning despite obstacles.', B: 'Explore available resources and seek guidance when needed.', C: 'Make some progress but may stop without additional instruction.', D: 'Usually wait until someone is available to teach me.' } },
  { id: 24, text: 'If you were asked to help plan an event for your school or community, what would you contribute?', options: { A: 'Develop exciting new ideas and creative experiences.', B: 'Suggest some original activities and improvements.', C: 'Help implement ideas that others develop.', D: 'Prefer to follow established instructions without developing new ideas.' } },
  { id: 25, text: 'When you experience failure after investing significant time and effort, how do you respond?', options: { A: 'Reflect on what happened, learn from it, and continue pursuing my goal.', B: 'Take time to recover before trying again.', C: 'Consider trying again but often lose confidence.', D: 'Usually abandon the goal and pursue something else.' } },
];

export const LEVELS = [
  { min: 90, name: 'Exceptional', text: 'Consistently demonstrates this strength' },
  { min: 75, name: 'Strong', text: 'Frequently demonstrates this strength' },
  { min: 50, name: 'Developing', text: 'Demonstrates this strength in many situations' },
  { min: 25, name: 'Emerging', text: 'Beginning to develop this strength' },
  { min: 0, name: 'Discovery', text: 'Has opportunities to explore and practice this strength' },
];

export function getDevelopmentLevel(score) {
  return LEVELS.find((l) => score >= l.min).name;
}

// answers: { 1: 'A', 2: 'C', ... } — all 25 required.
export function calculateSuperpowers(answers) {
  for (const q of QUESTIONS) {
    if (!Object.hasOwn(ANSWER_POINTS, answers[q.id])) {
      throw new Error(`Question ${q.id} requires a valid answer.`);
    }
  }

  const results = Object.entries(SUPERPOWERS).map(([key, c]) => {
    const rawScore = c.questions.reduce((sum, id) => sum + ANSWER_POINTS[answers[id]], 0);
    const maxScore = c.questions.length * 3;
    const score = (rawScore / maxScore) * 100;
    return { key, name: c.name, identity: c.identity, color: c.color, rawScore, maxScore, score, displayScore: Math.round(score), level: getDevelopmentLevel(score) };
  });

  // Stable sort by unrounded score; ties stay tied (never broken arbitrarily).
  results.sort((a, b) => b.score - a.score || SUPERPOWER_ORDER.indexOf(a.key) - SUPERPOWER_ORDER.indexOf(b.key));
  const keyOf = (s) => Number(s.toFixed(8));
  const distinct = [...new Set(results.map((r) => keyOf(r.score)))];
  const rank = (i) => (i < distinct.length ? results.filter((r) => keyOf(r.score) === distinct[i]) : []);

  const primary = rank(0);
  return {
    assessmentVersion: ASSESSMENT_VERSION,
    completedAt: new Date().toISOString(),
    profileType: primary.length === 1 ? 'single' : primary.length === 2 ? 'dual' : 'multiple',
    primary,
    secondary: rank(1),
    supporting: rank(2),
    // Only name development opportunities when scores actually differ.
    developmentOpportunities: distinct.length > 1 ? rank(distinct.length - 1) : [],
    results,
  };
}
