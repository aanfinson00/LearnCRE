import type { Role } from './role';

/**
 * Vocab mode — flashcard-style MC drill on industry terminology.
 *
 * Two formats:
 *   - 'forward': term shown, user picks the matching definition from 4
 *   - 'reverse': definition shown, user picks the matching term from 4
 *
 * Two run modes:
 *   - 'timed': fixed wall-clock window (60s); user answers as many as
 *     possible; streak + correct count are the headline metrics.
 *   - 'untimed': fixed length (10/25/50); each card is shown until the
 *     user answers; explanation appears post-answer for learning.
 */

export type VocabCategory =
  | 'returns-math'
  | 'capital-structure'
  | 'debt'
  | 'lease-ops'
  | 'asset-class'
  | 'tax-regulatory';

export type VocabDifficulty = 'beginner' | 'intermediate' | 'advanced';

export type VocabFormat = 'forward' | 'reverse';

export interface VocabTerm {
  /** Stable id used as a key in mastery storage. */
  id: string;
  /** The term itself, e.g. 'RUBS', 'WALT'. */
  term: string;
  category: VocabCategory;
  difficulty: VocabDifficulty;
  /** One-line definition used as the correct MC option. */
  shortDef: string;
  /** Full definition shown post-answer for learning. */
  longDef: string;
  /**
   * Plausible wrong definitions for forward MC. Need 3+ to seed distractors.
   * Authoring tip: real-sounding, near-miss meanings — not absurd.
   */
  distractors: string[];
  /**
   * Term ids that work as wrong-answer terms in reverse MC. The runner
   * resolves these against the full term registry to render their `term`.
   */
  reverseDistractorIds: string[];
  /** Optional context blurb for the post-answer reveal. */
  context?: string;
  /** Position roles where this term shows up most. */
  roles?: Role[];
}

export interface VocabAttempt {
  termId: string;
  format: VocabFormat;
  pickedIndex: number | null;
  correct: boolean;
  elapsedMs: number;
  skipped: boolean;
}

export type VocabStatus = 'active' | 'finished';

export type VocabRunMode = 'timed' | 'untimed';

export type VocabFormatChoice = 'forward' | 'reverse' | 'mixed';

export interface VocabRunConfig {
  category: VocabCategory | 'all';
  difficulty: VocabDifficulty | 'all';
  mode: VocabRunMode;
  format: VocabFormatChoice;
  /** Untimed: fixed card count. Timed: ignored. */
  length: 10 | 25 | 50;
  /** Timed: wall-clock window in seconds. */
  timeLimitSec: 60 | 120;
  role?: Role | 'all';
}

export interface VocabCardOption {
  /** A label rendered to the user — either a definition (forward) or a term (reverse). */
  text: string;
}

export interface VocabCard {
  termId: string;
  format: VocabFormat;
  /** What the user reads at the top of the card (term in forward; def in reverse). */
  prompt: string;
  /** 4 options; one matches the term. */
  options: VocabCardOption[];
  correctIndex: number;
}

export interface VocabState {
  config: VocabRunConfig;
  /** All cards prepared up front; spaced rep applied at card-build time. */
  cards: VocabCard[];
  currentIndex: number;
  attempts: VocabAttempt[];
  startedAt: number;
  cardStartedAt: number;
  /** Wall-clock deadline for timed mode. */
  deadlineMs?: number;
  status: VocabStatus;
}

export const VOCAB_CATEGORIES: { id: VocabCategory; label: string; hint: string }[] = [
  { id: 'returns-math', label: 'Returns + math', hint: 'NOI, IRR, EM, MOIC, CoC, NER, GRM' },
  {
    id: 'capital-structure',
    label: 'Capital structure',
    hint: 'Pref, promote, catch-up, GP/LP, mezz, pari-passu',
  },
  { id: 'debt', label: 'Debt + financing', hint: 'LTV, LTC, DSCR, defeasance, lockbox, IO' },
  {
    id: 'lease-ops',
    label: 'Lease + ops',
    hint: 'NNN, base year, RUBS, WALT, CAM, loss to lease',
  },
  {
    id: 'asset-class',
    label: 'Asset class + market',
    hint: 'ADR, RevPAR, stack plan, last mile, MSA',
  },
  {
    id: 'tax-regulatory',
    label: 'Tax + regulatory',
    hint: '1031, OZ, cost seg, bonus depreciation, REIT',
  },
];
