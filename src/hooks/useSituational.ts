import { useCallback, useEffect, useReducer, useRef } from 'react';
import { recordSession } from '../storage/localStorage';
import { applyXpDelta } from '../quiz/xp';
import { evaluateAchievements } from '../quiz/achievements';
import { buildContext } from '../quiz/achievementContext';
import { showAchievementToast } from '../components/AchievementToast';
import { filterCases, pickCases } from '../quiz/situational';
import type {
  SituationalAttempt,
  SituationalRunConfig,
  SituationalState,
} from '../types/situational';

type Action =
  | { type: 'start'; config: SituationalRunConfig }
  | { type: 'submit'; attempt: SituationalAttempt }
  | { type: 'advance' }
  | { type: 'reset' };

function reducer(state: SituationalState | null, action: Action): SituationalState | null {
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
      if (next >= state.cases.length) {
        return { ...state, status: 'finished' };
      }
      return { ...state, currentIndex: next, caseStartedAt: Date.now() };
    }
    case 'reset':
      return null;
  }
}

/** Reasoning is worth more per-attempt than a math drill but less than a full quiz step. */
function xpForSituational(correct: boolean, skipped: boolean, difficulty: string): number {
  if (skipped) return 0;
  const base = difficulty === 'advanced' ? 4 : difficulty === 'intermediate' ? 3 : 2;
  return correct ? base : 1;
}

export function useSituational() {
  const [state, dispatch] = useReducer(reducer, null);

  const start = useCallback(
    (config: SituationalRunConfig) => dispatch({ type: 'start', config }),
    [],
  );

  const submit = useCallback(
    (pickedIndex: number | null, skipped: boolean) => {
      if (!state) return;
      const c = state.cases[state.currentIndex];
      const elapsedMs = Date.now() - state.caseStartedAt;
      const correct =
        !skipped && pickedIndex !== null && c.options[pickedIndex]?.isBest === true;
      const xp = xpForSituational(correct, skipped, c.difficulty);
      if (xp > 0) applyXpDelta(xp);
      dispatch({
        type: 'submit',
        attempt: { caseId: c.id, pickedIndex, correct, elapsedMs, skipped },
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
    const correct = counted.filter((a) => a.correct).length;
    const record = {
      id: `sit_${state.startedAt}`,
      finishedAt: Date.now(),
      kind: 'situational' as const,
      config: {
        category: state.config.category,
        difficulty: state.config.difficulty,
        assetClass: state.config.assetClass,
        length: state.config.length,
        caseIds: state.cases.map((c) => c.id),
        attemptedCaseIds: counted.map((a) => a.caseId),
        correctCaseIds: counted.filter((a) => a.correct).map((a) => a.caseId),
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

  return { state, start, submit, advance, reset };
}
