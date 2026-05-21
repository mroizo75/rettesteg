import type {
  AssessmentResponse,
  AssessmentQuestion,
  RiasecScores,
  BigFiveScores,
  ValuesScores,
  Career,
} from '@/lib/supabase/types';

type QWithResponse = AssessmentQuestion & { answer_value: number };

// ============================================================
// RIASEC SCORING
// ============================================================
export function scoreRiasec(responses: QWithResponse[]): RiasecScores {
  const totals: Record<string, number> = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };
  const counts: Record<string, number> = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };

  for (const r of responses) {
    const cat = r.category.toUpperCase();
    if (cat in totals) {
      totals[cat] += r.answer_value * r.weight;
      counts[cat]++;
    }
  }

  const normalize = (total: number, count: number) =>
    count > 0 ? Math.round((total / (count * 5)) * 100) : 0;

  return {
    R: normalize(totals['R'], counts['R']),
    I: normalize(totals['I'], counts['I']),
    A: normalize(totals['A'], counts['A']),
    S: normalize(totals['S'], counts['S']),
    E: normalize(totals['E'], counts['E']),
    C: normalize(totals['C'], counts['C']),
  };
}

// ============================================================
// BIG FIVE SCORING
// ============================================================
export function scoreBigFive(responses: QWithResponse[]): BigFiveScores {
  const totals: Record<string, number> = { O: 0, C: 0, E: 0, A: 0, N: 0 };
  const counts: Record<string, number> = { O: 0, C: 0, E: 0, A: 0, N: 0 };

  for (const r of responses) {
    const cat = r.category.toUpperCase();
    if (cat in totals) {
      totals[cat] += r.answer_value * r.weight;
      counts[cat]++;
    }
  }

  const normalize = (total: number, count: number) =>
    count > 0 ? Math.round((total / (count * 5)) * 100) : 0;

  return {
    O: normalize(totals['O'], counts['O']),
    C: normalize(totals['C'], counts['C']),
    E: normalize(totals['E'], counts['E']),
    A: normalize(totals['A'], counts['A']),
    N: normalize(totals['N'], counts['N']),
  };
}

// ============================================================
// VALUES SCORING
// ============================================================
export function scoreValues(responses: QWithResponse[]): ValuesScores {
  const categories = ['autonomy', 'security', 'achievement', 'relationships', 'creativity', 'helping', 'prestige', 'variety'];
  const totals: Record<string, number> = Object.fromEntries(categories.map((c) => [c, 0]));
  const counts: Record<string, number> = Object.fromEntries(categories.map((c) => [c, 0]));

  for (const r of responses) {
    const cat = r.category.toLowerCase();
    if (cat in totals) {
      totals[cat] += r.answer_value * r.weight;
      counts[cat]++;
    }
  }

  const normalize = (total: number, count: number) =>
    count > 0 ? Math.round((total / (count * 5)) * 100) : 0;

  return {
    autonomy: normalize(totals['autonomy'], counts['autonomy']),
    security: normalize(totals['security'], counts['security']),
    achievement: normalize(totals['achievement'], counts['achievement']),
    relationships: normalize(totals['relationships'], counts['relationships']),
    creativity: normalize(totals['creativity'], counts['creativity']),
    helping: normalize(totals['helping'], counts['helping']),
    prestige: normalize(totals['prestige'], counts['prestige']),
    variety: normalize(totals['variety'], counts['variety']),
  };
}

// ============================================================
// CAREER MATCHING — cosine similarity on RIASEC vectors
// ============================================================
const RIASEC_ORDER: (keyof RiasecScores)[] = ['R', 'I', 'A', 'S', 'E', 'C'];

function toVector(scores: RiasecScores): number[] {
  return RIASEC_ORDER.map((k) => scores[k]);
}

function dotProduct(a: number[], b: number[]): number {
  return a.reduce((sum, val, i) => sum + val * b[i], 0);
}

function magnitude(v: number[]): number {
  return Math.sqrt(v.reduce((sum, val) => sum + val * val, 0));
}

function cosineSimilarity(a: number[], b: number[]): number {
  const mag = magnitude(a) * magnitude(b);
  if (mag === 0) return 0;
  return dotProduct(a, b) / mag;
}

function careerRiasecVector(career: Career): number[] {
  const base: RiasecScores = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };
  career.riasec_codes.forEach((code, idx) => {
    const key = code as keyof RiasecScores;
    if (key in base) base[key] = Math.max(0, 100 - idx * 25);
  });
  return toVector(base);
}

export function matchCareers(
  riasecScores: RiasecScores,
  careers: Career[]
): Array<{ career: Career; score: number }> {
  const userVec = toVector(riasecScores);
  return careers
    .map((career) => ({
      career,
      score: Math.round(cosineSimilarity(userVec, careerRiasecVector(career)) * 100),
    }))
    .sort((a, b) => b.score - a.score);
}

// ============================================================
// RIASEC type descriptions
// ============================================================
export const riasecDescriptions: Record<keyof RiasecScores, { no: string; en: string; label: string; color: string }> = {
  R: {
    label: 'Realistisk',
    no: 'Du liker praktisk, konkret arbeid med hender, verktøy og maskiner. Du er handlingsorientert og trives best med synlige, fysiske resultater.',
    en: 'You enjoy practical, hands-on work with tools and machines. You are action-oriented and thrive with visible, physical results.',
    color: '#3b82f6',
  },
  I: {
    label: 'Undersøkende',
    no: 'Du er analytisk og intellektuelt nysgjerrig. Du elsker å løse komplekse problemer, forske og forstå verden gjennom vitenskap og logikk.',
    en: 'You are analytical and intellectually curious. You love solving complex problems, researching and understanding the world through science and logic.',
    color: '#8b5cf6',
  },
  A: {
    label: 'Kunstnerisk',
    no: 'Du er kreativ og ekspressiv. Du trives med kunstnerisk arbeid, skriving, design og å skape nye ting på originale måter.',
    en: 'You are creative and expressive. You thrive with artistic work, writing, design and creating new things in original ways.',
    color: '#ec4899',
  },
  S: {
    label: 'Sosial',
    no: 'Du er omgjengelig og omsorgsfull. Du trives best med å hjelpe, undervise, veilede og samarbeide med andre mennesker.',
    en: 'You are sociable and caring. You thrive best by helping, teaching, guiding and working with other people.',
    color: '#10b981',
  },
  E: {
    label: 'Ledende',
    no: 'Du er energisk og overbevisende. Du liker å lede, selge ideer, ta initiativ og nå høye mål gjennom andre mennesker.',
    en: 'You are energetic and persuasive. You enjoy leading, selling ideas, taking initiative and achieving high goals through others.',
    color: '#f59e0b',
  },
  C: {
    label: 'Konvensjonell',
    no: 'Du er nøyaktig og systematisk. Du liker orden, klare regler og strukturerte oppgaver med definerte prosedyrer.',
    en: 'You are precise and systematic. You enjoy order, clear rules and structured tasks with defined procedures.',
    color: '#6b7280',
  },
};
