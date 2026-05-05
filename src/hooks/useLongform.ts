import { useCallback, useEffect, useReducer, useRef } from 'react';
import { recordSession } from '../storage/localStorage';
import { applyXpDelta } from '../quiz/xp';
import { evaluateAchievements } from '../quiz/achievements';
import { buildContext } from '../quiz/achievementContext';
import { showAchievementToast } from '../components/AchievementToast';
import { filterCases, pickCases } from '../quiz/longform';
import {
  computeScorePct,
  type LongformAttempt,
  type LongformCase,
  type LongformRunConfig,
  type LongformState,
} from '../types/longform';

type Action =
  | { type: 'start'; config: LongformRunConfig }
  | { type: 'submit'; attempt: LongformAttempt }
  | { type: 'advance' }
  | { type: 'reset' };

function reducer(state: LongformState | null, action: Action): LongformState | null {
  switch (action.type) {
    case 'start': {
      const pool = filterCases(action.config);
      const cases = pickCases(pool, action.config.length);
      if (cases.length === 0) return null;
      const now = Date.now();
      return {
        config: action.config,
        cases,
        currentIndex: 0,
        attempts: [],
        startedAt: now,
        caseStartedAt: now,
        status: 'active',
      };
    }
    case 'submit': {
      if (!state) return state;
      return { ...state, attempts: [...state.attempts, action.attempt] };
    }
    case 'advance': {
      if (!state) return state;
      const next = state.currentIndex + 1;
      if (next >= state.cases.length) return { ...state, status: 'finished' };
      return { ...state, currentIndex: next, caseStartedAt: Date.now() };
    }
    case 'reset':
      return null;
  }
}

/**
 * Long-form is graded on a 0-3 scale per rubric item. We translate the
 * percent score into an XP value: 100% = 10 XP, 50% = 5 XP, etc.
 */
function xpForLongform(scorePct: number, skipped: boolean): number {
  if (skipped) return 0;
  return Math.round(scorePct / 10);
}

export interface SubmitGradeArgs {
  userAnswer: string;
  rubricScores: Record<string, number>;
  skipped: boolean;
}

export function useLongform() {
  const [state, dispatch] = useReducer(reducer, null);

  const start = useCallback((config: LongformRunConfig) => dispatch({ type: 'start', config }), []);

  const submit = useCallback(
    (args: SubmitGradeArgs) => {
      if (!state) return;
      const c = state.cases[state.currentIndex];
      const elapsedMs = Date.now() - state.caseStartedAt;
      const scorePct = args.skipped
        ? 0
        : computeScorePct(c.rubric, args.rubricScores);
      const xp = xpForLongform(scorePct, args.skipped);
      if (xp > 0) applyXpDelta(xp);
      dispatch({
        type: 'submit',
        attempt: {
          caseId: c.id,
          userAnswer: args.userAnswer,
          rubricScores: args.rubricScores,
          totalScorePct: scorePct,
          elapsedMs,
          skipped: args.skipped,
        },
      });
    },
    [state],
  );

  const advance = useCallback(() => dispatch({ type: 'advance' }), []);
  const reset = useCallback(() => dispatch({ type: 'reset' }), []);

  const recordedRef = useRef<number | null>(null);
  useEffect(() => {
    if (!state || state.status !== 'finished') return;
    if (recordedRef.current === state.startedAt) return;
    if (state.attempts.length === 0) return;
    const counted = state.attempts.filter((a) => !a.skipped);
    // For long-form, "correct" is fuzzy — we treat anything ≥70% as a
    // correct attempt for session-record purposes.
    const correct = counted.filter((a) => a.totalScorePct >= 70).length;
    const record = {
      id: `lf_${state.startedAt}`,
      finishedAt: Date.now(),
      kind: 'longform' as const,
      config: {
        difficulty: state.config.difficulty,
        role: state.config.role,
        length: state.config.length,
        caseIds: state.cases.map((c) => c.id),
        avgScorePct:
          counted.length === 0
            ? 0
            : Math.round(
                counted.reduce((sum, a) => sum + a.totalScorePct, 0) / counted.length,
              ),
        // Compact per-case scores for the agent / future analysis
        attempts: counted.map((a) => ({
          caseId: a.caseId,
          score: a.totalScorePct,
          rubricScores: a.rubricScores,
        })),
      },
      attempts: counted.length,
      correct,
      accuracyPct: counted.length === 0 ? 0 : correct / counted.length,
      durationMs: Date.now() - state.startedAt,
      xpEarned: 0,
    };
    recordSession(record);
    recordedRef.current = state.startedAt;
    const ctx = buildContext({ latestSession: record });
    for (const id of evaluateAchievements(ctx)) showAchievementToast(id);
  }, [state]);

  // Re-export for convenience
  const currentCase: LongformCase | null =
    state && state.status === 'active' ? state.cases[state.currentIndex] : null;

  return { state, currentCase, start, submit, advance, reset };
}
