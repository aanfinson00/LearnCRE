import { useCallback, useEffect, useReducer, useRef } from 'react';
import { recordSession } from '../storage/localStorage';
import { applyXpDelta, xpForWalkthroughStep } from '../quiz/xp';
import { evaluateAchievements } from '../quiz/achievements';
import { buildContext } from '../quiz/achievementContext';
import { showAchievementToast } from '../components/AchievementToast';
import type {
  WalkthroughAttempt,
  WalkthroughDef,
  WalkthroughState,
} from '../types/walkthrough';

type Action =
  | { type: 'start'; def: WalkthroughDef }
  | { type: 'submit'; attempt: WalkthroughAttempt }
  | { type: 'advance' }
  | { type: 'reset' };

function reducer(state: WalkthroughState | null, action: Action): WalkthroughState | null {
  switch (action.type) {
    case 'start': {
      const now = Date.now();
      return {
        def: action.def,
        currentStep: 0,
        attempts: [],
        startedAt: now,
        stepStartedAt: now,
        status: 'active',
      };
    }
    case 'submit': {
      if (!state) return state;
      return { ...state, attempts: [...state.attempts, action.attempt] };
    }
    case 'advance': {
      if (!state) return state;
      const next = state.currentStep + 1;
      if (next >= state.def.steps.length) {
        return { ...state, status: 'finished' };
      }
      return { ...state, currentStep: next, stepStartedAt: Date.now() };
    }
    case 'reset':
      return null;
  }
}

export function scoreStep(
  userInput: number | null,
  expected: number,
  tolerance: { type: 'pct' | 'abs'; band: number },
  skipped: boolean,
): { correct: boolean; deltaPct: number } {
  if (skipped || userInput === null) return { correct: false, deltaPct: 0 };
  const delta = userInput - expected;
  const deltaPct = expected === 0 ? 0 : delta / Math.abs(expected);
  const within =
    tolerance.type === 'pct'
      ? Math.abs(deltaPct) <= tolerance.band
      : Math.abs(delta) <= tolerance.band;
  return { correct: within, deltaPct };
}

export function useWalkthrough() {
  const [state, dispatch] = useReducer(reducer, null);

  const start = useCallback((def: WalkthroughDef) => dispatch({ type: 'start', def }), []);

  const submit = useCallback(
    (userInput: number | null, skipped: boolean) => {
      if (!state) return;
      const step = state.def.steps[state.currentStep];
      const elapsedMs = Date.now() - state.stepStartedAt;
      const { correct, deltaPct } = scoreStep(userInput, step.expected, step.tolerance, skipped);
      const xp = xpForWalkthroughStep(correct, skipped);
      if (xp > 0) applyXpDelta(xp);
      dispatch({
        type: 'submit',
        attempt: { stepId: step.id, userInput, correct, deltaPct, elapsedMs, skipped },
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
      id: `walk_${state.startedAt}`,
      finishedAt: Date.now(),
      kind: 'walkthrough' as const,
      config: { defId: state.def.id, kind: state.def.kind },
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
