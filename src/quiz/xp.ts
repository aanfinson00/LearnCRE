import type { Difficulty } from '../types/session';
import type { XpState } from '../types/profile';
import { profileKey } from '../storage/profiles';

const FAST_THRESHOLD_MS = 15_000;

const BASE_BY_DIFFICULTY: Record<Difficulty, number> = {
  beginner: 1,
  intermediate: 2,
  advanced: 3,
};

/**
 * Compute XP earned for a single quiz attempt.
 *
 *   base       = 1 / 2 / 3 for beginner / intermediate / advanced
 *   fastBonus  = +0.5 if correct and answered under 15s
 *   multiplier = 1 + min(streak, 10) × 0.05  (capped at 1.5× at streak 10+)
 *   xp         = correct ? round((base + fastBonus) × multiplier) : 0
 *
 * Skipped or incorrect → 0 XP.
 */
export function xpForAttempt(params: {
  correct: boolean;
  skipped: boolean;
  difficulty: Difficulty;
  elapsedMs: number;
  /** Streak BEFORE this attempt is counted (so first correct at streak 0 yields multiplier 1×). */
  streak: number;
}): number {
  if (params.skipped || !params.correct) return 0;
  const base = BASE_BY_DIFFICULTY[params.difficulty];
  const fast = params.elapsedMs < FAST_THRESHOLD_MS ? 0.5 : 0;
  const multiplier = 1 + Math.min(params.streak, 10) * 0.05;
  return Math.round((base + fast) * multiplier);
}

/** Speed-drill cells award 0.5 XP per correct (lower stakes). */
export function xpForSpeedDrillCell(correct: boolean, skipped: boolean): number {
  if (correct && !skipped) return 1; // round to whole numbers; one cell = 1 XP
  return 0;
}

/** Walkthrough steps award 2 XP each (chained reasoning is harder). */
export function xpForWalkthroughStep(correct: boolean, skipped: boolean): number {
  if (correct && !skipped) return 2;
  return 0;
}

// ---------- persistence ----------

const KEY_SUFFIX = 'xp.v1';

export function loadXp(profileId?: string): XpState {
  try {
    const raw = localStorage.getItem(profileKey(KEY_SUFFIX, profileId));
    if (!raw) return emptyXp();
    const parsed = JSON.parse(raw) as XpState;
    return {
      totalXp: parsed.totalXp ?? 0,
      bestSessionXp: parsed.bestSessionXp ?? 0,
      currentStreak: parsed.currentStreak ?? 0,
      bestStreak: parsed.bestStreak ?? 0,
    };
  } catch {
    return emptyXp();
  }
}

export function saveXp(state: XpState, profileId?: string): void {
  try {
    localStorage.setItem(profileKey(KEY_SUFFIX, profileId), JSON.stringify(state));
  } catch {
    /* ignore */
  }
}

function emptyXp(): XpState {
  return { totalXp: 0, bestSessionXp: 0, currentStreak: 0, bestStreak: 0 };
}

export function applyXpDelta(deltaXp: number, profileId?: string): XpState {
  const cur = loadXp(profileId);
  const next: XpState = { ...cur, totalXp: cur.totalXp + deltaXp };
  saveXp(next, profileId);
  return next;
}

export function noteStreak(streak: number, profileId?: string): XpState {
  const cur = loadXp(profileId);
  const next: XpState = {
    ...cur,
    currentStreak: streak,
    bestStreak: Math.max(cur.bestStreak, streak),
  };
  saveXp(next, profileId);
  return next;
}
