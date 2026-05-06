import type { Difficulty } from '../types/session';
import type { Question, QuestionKind } from '../types/question';
import { allKinds, templates } from './templates';
import { createRng } from './random';

/**
 * Curated subset for the daily — foundations + a sprinkle of returns/promote
 * + niche kinds. Excludes ones that need more setup than a single-line prompt
 * answers (e.g. nested waterfall multi-step).
 */
const DAILY_POOL: QuestionKind[] = [
  'goingInCap',
  'capCompression',
  'cashOnCash',
  'debtYield',
  'dscrFromNoiAndDs',
  'dscrTestPasses',
  'loanConstant',
  'equityMultiple',
  'irrSimple',
  'cagr',
  'compoundGrowth',
  'pricePerSf',
  'pricePerUnit',
  'rentPerUnit',
  'opexPerUnit',
  'allInBasis',
  'yieldOnCost',
  'devSpread',
  'reversionValue',
  'breakEvenOccupancy',
  'grossRentMultiplier',
  'operatingExpenseRatio',
  'noiFromOer',
  'lossToLease',
  'occupancyCostRatio',
  'tiPayback',
  'tiPerSfPerYearOfTerm',
  'netEffectiveRent',
  'leveredIrr',
  'prefAccrual',
  'gpCatchUp',
  'refiStressTest',
  'feeDragOnIrr',
  'leaseUpReserve',
];

const DAILY_LENGTH = 10;
const DIFFICULTY_MIX: Difficulty[] = [
  'beginner',
  'beginner',
  'beginner',
  'intermediate',
  'intermediate',
  'intermediate',
  'intermediate',
  'intermediate',
  'advanced',
  'advanced',
];

/** YYYY-MM-DD in UTC — same date for every player on the planet. */
export function dailyDate(now: Date = new Date()): string {
  const y = now.getUTCFullYear();
  const m = String(now.getUTCMonth() + 1).padStart(2, '0');
  const d = String(now.getUTCDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

/** Deterministic 32-bit seed from a YYYY-MM-DD string. */
export function seedFromDate(date: string): number {
  // FNV-1a 32-bit
  let h = 0x811c9dc5;
  for (let i = 0; i < date.length; i++) {
    h ^= date.charCodeAt(i);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return h >>> 0;
}

/**
 * Generate the daily 10-question set deterministically. Same input date →
 * exact same questions for every caller, regardless of clock or session.
 */
export function generateDaily(date: string): Question[] {
  const seed = seedFromDate(date);
  const rng = createRng(seed);
  const questions: Question[] = [];

  // Pick 10 kinds without immediate repeats — sample-without-replacement-ish
  // walk over a shuffled pool.
  const validPool = DAILY_POOL.filter((k) => allKinds.includes(k));
  const shuffled = [...validPool];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = rng.pickInt(0, i);
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  const picks = shuffled.slice(0, DAILY_LENGTH);

  for (let i = 0; i < DAILY_LENGTH; i++) {
    const kind = picks[i];
    const template = templates[kind];
    const difficulty = DIFFICULTY_MIX[i];
    const q = template.generate(rng, difficulty);
    questions.push({ ...q, appliedDifficulty: difficulty });
  }

  return questions;
}

// ============== local-side "already played" tracking ==============

const PLAYED_PREFIX = 'learncre.dailyDone.';

export function markPlayedLocally(date: string): void {
  try {
    localStorage.setItem(PLAYED_PREFIX + date, '1');
  } catch {
    /* ignore */
  }
}

export function wasPlayedLocally(date: string): boolean {
  try {
    return localStorage.getItem(PLAYED_PREFIX + date) === '1';
  } catch {
    return false;
  }
}
