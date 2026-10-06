/**
 * Server-side grading for competitive challenges (daily, weekly, head-to-head).
 *
 * This module is pure and isomorphic: the browser imports it for previews,
 * and `npm run build:edge` bundles it into
 * supabase/functions/_shared/challengeScoring.js for the `score-challenge`
 * Edge Function. Both sides therefore generate the exact same seeded
 * questions and grade with the exact same tolerance rules, but only the
 * server's result is ever written to a leaderboard.
 */
import { generateDaily, generateFromSeed } from '../quiz/dailyChallenge';
import { WEEKLY_CHALLENGES, generateWeekly } from '../quiz/weeklyChallenges';
import { scoreAnswer } from '../quiz/tolerance';
import type { Question } from '../types/question';

export type ChallengeKind = 'daily' | 'weekly' | 'match';

export const CHALLENGE_KINDS: readonly ChallengeKind[] = ['daily', 'weekly', 'match'];

/**
 * Below this average time per question a run is kept but flagged out of the
 * public rankings: nobody reads, computes and types ten CRE answers in under
 * 25 seconds.
 */
export const MIN_MS_PER_QUESTION = 2_500;

/** Runs longer than this still count, with the time capped for storage. */
export const MAX_RECORDED_MS = 6 * 60 * 60 * 1000;

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const DAY_MS = 24 * 60 * 60 * 1000;

function utcDate(t: number): string {
  return new Date(t).toISOString().slice(0, 10);
}

/**
 * A daily challenge may be started on its own UTC day. Submissions get a
 * grace window past midnight so a run started at 23:58 still counts.
 */
export function isDailyRefOpen(
  date: string,
  nowMs: number,
  phase: 'start' | 'submit',
): boolean {
  if (!DATE_RE.test(date)) return false;
  if (date === utcDate(nowMs)) return true;
  return phase === 'submit' && date === utcDate(nowMs - DAY_MS);
}

export function isWeeklyRefOpen(
  challengeId: string,
  nowMs: number,
  phase: 'start' | 'submit',
): boolean {
  const c = WEEKLY_CHALLENGES.find((w) => w.id === challengeId);
  if (!c) return false;
  const start = Date.parse(c.startsAtIso);
  const end = Date.parse(c.endsAtIso) + (phase === 'submit' ? DAY_MS : 0);
  return nowMs >= start && nowMs < end;
}

/** Regenerates the exact question set a client was shown. */
export function questionsFor(
  kind: ChallengeKind,
  ref: string,
  matchSeed?: number,
): Question[] {
  switch (kind) {
    case 'daily':
      return generateDaily(ref);
    case 'weekly': {
      const c = WEEKLY_CHALLENGES.find((w) => w.id === ref);
      if (!c) throw new Error(`unknown weekly challenge ${ref}`);
      return generateWeekly(c);
    }
    case 'match':
      if (typeof matchSeed !== 'number') throw new Error('match seed required');
      return generateFromSeed(matchSeed);
  }
}

export interface GradeResult {
  correct: number;
  total: number;
  perQuestion: boolean[];
}

/**
 * Grades submitted answers (already parsed to numbers by the client; `null`
 * for blank or unparseable). Anything malformed counts as wrong rather than
 * erroring, so a hostile payload can never score higher than an honest one.
 */
export function gradeAnswers(questions: Question[], answers: unknown): GradeResult {
  const list = Array.isArray(answers) ? answers : [];
  const perQuestion = questions.map((q, i) => {
    const a = list[i];
    if (typeof a !== 'number' || !Number.isFinite(a)) return false;
    return scoreAnswer(a, q).correct;
  });
  return {
    correct: perQuestion.filter(Boolean).length,
    total: questions.length,
    perQuestion,
  };
}

/** True when a run is too fast to be a human answering honestly. */
export function isImplausiblyFast(timeMs: number, result: GradeResult): boolean {
  return result.correct > 0 && timeMs < MIN_MS_PER_QUESTION * result.total;
}

export function recordedTimeMs(startedAtMs: number, nowMs: number): number {
  return Math.max(0, Math.min(MAX_RECORDED_MS, Math.round(nowMs - startedAtMs)));
}
