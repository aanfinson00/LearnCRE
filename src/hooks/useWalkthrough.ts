import { useCallback, useReducer } from 'react';
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
      dispatch({
        type: 'submit',
        attempt: { stepId: step.id, userInput, correct, deltaPct, elapsedMs, skipped },
      });
    },
    [state],
  );

  const advance = useCallback(() => dispatch({ type: 'advance' }), []);
  const reset = useCallback(() => dispatch({ type: 'reset' }), []);

  return { state, start, submit, advance, reset };
}
