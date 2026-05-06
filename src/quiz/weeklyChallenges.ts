import type { Difficulty } from '../types/session';
import type { Question, QuestionKind } from '../types/question';
import { allKinds, templates } from './templates';
import { createRng } from './random';
import { seedFromDate } from './dailyChallenge';

export interface WeeklyChallenge {
  id: string;
  theme: string;
  blurb: string;
  curatorHandle: string;
  /** ISO timestamp (Monday 12:00 UTC start). */
  startsAtIso: string;
  /** ISO timestamp (the next Monday 12:00 UTC). */
  endsAtIso: string;
  /** Pool of question kinds the theme draws from (deterministic shuffle, take 10). */
  kinds: QuestionKind[];
}

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

/**
 * Hand-authored weekly themes. Each one swaps in/out at Monday 12:00 UTC.
 * Add new themes here — the schedule is part of the codebase, not the DB.
 */
export const WEEKLY_CHALLENGES: WeeklyChallenge[] = [
  {
    id: 'wk-2026-19-debt',
    theme: 'Debt fundamentals',
    blurb: 'DSCR + debt yield + loan constant + sizing — the lender-side toolkit.',
    curatorHandle: 'learncre',
    startsAtIso: '2026-05-04T12:00:00Z',
    endsAtIso: '2026-05-11T12:00:00Z',
    kinds: [
      'dscrFromNoiAndDs',
      'dscrTestPasses',
      'dscrSensitivityRate',
      'dscrLoanSizing',
      'debtYield',
      'loanConstant',
      'cashOnCash',
      'leveredIrr',
      'refiStressTest',
      'breakEvenOccupancy',
    ],
  },
  {
    id: 'wk-2026-20-lease',
    theme: 'Lease economics',
    blurb: 'NER, TI giveaway math, loss-to-lease, renewal weighting — the AM lever set.',
    curatorHandle: 'learncre',
    startsAtIso: '2026-05-11T12:00:00Z',
    endsAtIso: '2026-05-18T12:00:00Z',
    kinds: [
      'netEffectiveRent',
      'tiPayback',
      'tiVsRent',
      'tiPerSfPerYearOfTerm',
      'lossToLease',
      'rentChange',
      'rentRollChange',
      'walt',
      'renewalProbabilityWeightedRent',
      'occupancyCostRatio',
    ],
  },
  {
    id: 'wk-2026-21-mf',
    theme: 'Multifamily acquisition',
    blurb: 'Per-unit comps + going-in cap + value-add levers — the MF buyer\'s checklist.',
    curatorHandle: 'learncre',
    startsAtIso: '2026-05-18T12:00:00Z',
    endsAtIso: '2026-05-25T12:00:00Z',
    kinds: [
      'pricePerUnit',
      'rentPerUnit',
      'opexPerUnit',
      'goingInCap',
      'capCompression',
      'cashOnCash',
      'irrSimple',
      'equityMultiple',
      'reversionValue',
      'noiFromOer',
    ],
  },
  {
    id: 'wk-2026-22-promote',
    theme: 'Capital stack & promote',
    blurb: 'Pref + catch-up + promote tier + post-promote IRR. The waterfall gauntlet.',
    curatorHandle: 'learncre',
    startsAtIso: '2026-05-25T12:00:00Z',
    endsAtIso: '2026-06-01T12:00:00Z',
    kinds: [
      'prefAccrual',
      'gpCatchUp',
      'waterfallSimpleSplit',
      'gpEffectivePromote',
      'irrAfterPromote',
      'feeDragOnIrr',
      'leveredIrr',
      'equityMultiple',
      'irrSimple',
      'cagr',
    ],
  },
  {
    id: 'wk-2026-23-hotel',
    theme: 'Hotel underwriting',
    blurb: 'RevPAR · RevPOR · GOP margin · FF&E. Sector-specific math interviewers love.',
    curatorHandle: 'learncre',
    startsAtIso: '2026-06-01T12:00:00Z',
    endsAtIso: '2026-06-08T12:00:00Z',
    kinds: [
      'revparFromAdrOcc',
      'revporVsRevpar',
      'gopMargin',
      'ffeReserveDollars',
      'goingInCap',
      'cashOnCash',
      'allInBasis',
      'reversionValue',
      'capCompression',
      'compoundGrowth',
    ],
  },
  {
    id: 'wk-2026-24-refi-exit',
    theme: 'Refi & exit',
    blurb: 'Refi-stress cap, hold-vs-sell, reversion, extension drag. The exit-decision toolkit.',
    curatorHandle: 'learncre',
    startsAtIso: '2026-06-08T12:00:00Z',
    endsAtIso: '2026-06-15T12:00:00Z',
    kinds: [
      'refiStressTest',
      'reversionValue',
      'holdVsSellIrr',
      'extensionDrag',
      'taxReassessment',
      'dscrSensitivityRate',
      'devSpread',
      'yieldOnCost',
      'cagr',
      'compoundGrowth',
    ],
  },
];

/** Returns the theme active at the given moment, or null if none. */
export function getCurrentWeeklyChallenge(
  now: Date = new Date(),
): WeeklyChallenge | null {
  const t = now.getTime();
  for (const c of WEEKLY_CHALLENGES) {
    const s = Date.parse(c.startsAtIso);
    const e = Date.parse(c.endsAtIso);
    if (t >= s && t < e) return c;
  }
  return null;
}

/** Whether `now` is before any theme's start — pre-launch state. */
export function getNextWeeklyChallenge(
  now: Date = new Date(),
): WeeklyChallenge | null {
  const t = now.getTime();
  let next: WeeklyChallenge | null = null;
  for (const c of WEEKLY_CHALLENGES) {
    const s = Date.parse(c.startsAtIso);
    if (s > t && (!next || Date.parse(next.startsAtIso) > s)) next = c;
  }
  return next;
}

/**
 * Generate a weekly challenge's 10 questions deterministically. Same
 * challenge id → same questions for every caller.
 */
export function generateWeekly(challenge: WeeklyChallenge): Question[] {
  const seed = seedFromDate(challenge.id);
  const rng = createRng(seed);
  const validPool = challenge.kinds.filter((k) => allKinds.includes(k));

  // Sample 10 with replacement when the pool < 10 (rare) — otherwise shuffle
  // and take 10.
  const picks: QuestionKind[] = [];
  if (validPool.length >= DAILY_LENGTH) {
    const shuffled = [...validPool];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = rng.pickInt(0, i);
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    for (let i = 0; i < DAILY_LENGTH; i++) picks.push(shuffled[i]);
  } else {
    for (let i = 0; i < DAILY_LENGTH; i++) {
      picks.push(validPool[rng.pickInt(0, validPool.length - 1)]);
    }
  }

  const questions: Question[] = [];
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

const PLAYED_PREFIX = 'learncre.weeklyDone.';

export function markWeeklyPlayedLocally(challengeId: string): void {
  try {
    localStorage.setItem(PLAYED_PREFIX + challengeId, '1');
  } catch {
    /* ignore */
  }
}

export function wasWeeklyPlayedLocally(challengeId: string): boolean {
  try {
    return localStorage.getItem(PLAYED_PREFIX + challengeId) === '1';
  } catch {
    return false;
  }
}
