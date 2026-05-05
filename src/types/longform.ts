import type { AssetClass } from '../quiz/assetClasses';
import type { Role } from './role';

/**
 * Long-form case studies: open-text answers graded against a model answer +
 * rubric. Self-graded on a 0-3 scale per rubric dimension for v1; the same
 * rubric structure makes the cases auto-gradable by an LLM later (the agent
 * script can ingest case + user-answer + rubric and emit per-dimension scores).
 */

export type LongformDifficulty = 'beginner' | 'intermediate' | 'advanced';

export interface LongformDataPoint {
  label: string;
  value: string;
}

export interface LongformRubricItem {
  /** Stable id used as a key in score maps + future training data. */
  id: string;
  /** What the user is being graded on (e.g. "Identifies the cap-rate divergence as the central question"). */
  dimension: string;
  /** Per-item weight; defaults to 1. Higher = bigger contribution to the total. */
  weight?: number;
}

export interface LongformCase {
  id: string;
  title: string;
  difficulty: LongformDifficulty;
  /** Position roles this case is most relevant for. Untagged = all roles. */
  roles?: Role[];
  /** Optional asset-class tag for filtering. */
  assetClass?: AssetClass;
  /** 4-8 sentences setting up the deal context. Longer than situational scenarios. */
  scenario: string;
  /** Optional sidebar facts grid. */
  data?: LongformDataPoint[];
  /** The prompt the user is answering. */
  question: string;
  /** Optional "here's what we want you to address" framing — usually empty so users have to surface the right structure themselves. */
  guidanceHint?: string;
  /** The model answer (1-3 paragraphs of the kind of response we'd expect from a strong analyst). */
  modelAnswer: string;
  /** Rubric items the user (or future LLM grader) scores on a 0-3 scale. */
  rubric: LongformRubricItem[];
  /** One-paragraph distillation of the principle, shown after grading. */
  takeaway: string;
  /** 3 short rules-of-thumb. */
  tips: string[];
}

/** A single attempt at a single case. */
export interface LongformAttempt {
  caseId: string;
  /** What the user typed. */
  userAnswer: string;
  /** Per-rubric-item scores, keyed by item id. 0-3 scale. */
  rubricScores: Record<string, number>;
  /** Computed: weighted sum / max possible × 100, percent. */
  totalScorePct: number;
  elapsedMs: number;
  skipped: boolean;
}

export type LongformStatus = 'active' | 'finished';

export interface LongformRunConfig {
  difficulty: LongformDifficulty | 'all';
  role?: Role | 'all';
  /** Long-form is heavier per case; default to fewer than situational. */
  length: 1 | 3 | 5;
}

export interface LongformState {
  config: LongformRunConfig;
  cases: LongformCase[];
  currentIndex: number;
  attempts: LongformAttempt[];
  startedAt: number;
  caseStartedAt: number;
  status: LongformStatus;
}

/** Compute a percentage score given rubric items + actual scores. */
export function computeScorePct(
  rubric: LongformRubricItem[],
  scores: Record<string, number>,
): number {
  if (rubric.length === 0) return 0;
  let earned = 0;
  let max = 0;
  for (const item of rubric) {
    const w = item.weight ?? 1;
    earned += (scores[item.id] ?? 0) * w;
    max += 3 * w;
  }
  return max === 0 ? 0 : Math.round((earned / max) * 100);
}
