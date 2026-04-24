import type { Attempt, Difficulty } from '../types/session';

export const DYNAMIC_WINDOW = 10;

const FAST_SECONDS = 15;
const SLOW_SECONDS = 30;
const VERY_SLOW_SECONDS = 60;

export function scoreAttempt(a: Attempt): number {
  if (a.skipped) return -1;
  const seconds = a.elapsedMs / 1000;
  if (a.correct) {
    if (seconds < FAST_SECONDS) return 2;
    if (seconds < SLOW_SECONDS) return 1;
    return 0;
  }
  if (seconds >= VERY_SLOW_SECONDS) return -2;
  return -1;
}

export function computeDynamicDifficulty(attempts: Attempt[]): Difficulty {
  if (attempts.length < DYNAMIC_WINDOW) {
    return attempts.length % 2 === 0 ? 'beginner' : 'intermediate';
  }
  const window = attempts.slice(-DYNAMIC_WINDOW);
  const score = window.reduce((s, a) => s + scoreAttempt(a), 0);
  if (score >= 8) return 'advanced';
  if (score >= 0) return 'intermediate';
  return 'beginner';
}
