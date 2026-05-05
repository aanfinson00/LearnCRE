import { useCallback, useEffect, useReducer, useRef } from 'react';
import { recordSession } from '../storage/localStorage';
import { applyXpDelta } from '../quiz/xp';
import {
  aggregateMockScore,
  archetypeById,
  assembleQuestions,
} from '../quiz/mockInterview';
import { appendMockInterviewRecord } from '../storage/mockInterview';
import { useProfile } from './useProfile';
import type {
  MockArchetypeId,
  MockInterviewState,
  MockQuestionAttempt,
} from '../types/mockInterview';

type Action =
  | { type: 'start'; archetypeId: MockArchetypeId }
  | { type: 'submit'; attempt: MockQuestionAttempt }
  | { type: 'advance' }
  | { type: 'finish' }
  | { type: 'reset' };

function reducer(state: MockInterviewState | null, action: Action): MockInterviewState | null {
  switch (action.type) {
    case 'start': {
      const spec = archetypeById(action.archetypeId);
      if (!spec) return null;
      const questions = assembleQuestions(spec);
      if (questions.length === 0) return null;
      const now = Date.now();
      return {
        spec,
        questions,
        currentIndex: 0,
        attempts: [],
        startedAt: now,
        questionStartedAt: now,
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
      if (next >= state.questions.length) {
        return { ...state, status: 'finished' };
      }
      return { ...state, currentIndex: next, questionStartedAt: Date.now() };
    }
    case 'finish': {
      if (!state) return state;
      return { ...state, status: 'finished' };
    }
    case 'reset':
      return null;
  }
}

export function useMockInterview() {
  const { active } = useProfile();
  const [state, dispatch] = useReducer(reducer, null);

  const start = useCallback(
    (archetypeId: MockArchetypeId) => dispatch({ type: 'start', archetypeId }),
    [],
  );

  const submit = useCallback((attempt: MockQuestionAttempt) => {
    if (!attempt.skipped) {
      // Modest XP for prose answers (encourages completion); more for technical correct.
      const xp = attempt.kind === 'technical' && attempt.correct ? 4 : 2;
      applyXpDelta(xp);
    }
    dispatch({ type: 'submit', attempt });
  }, []);

  const advance = useCallback(() => dispatch({ type: 'advance' }), []);
  const finish = useCallback(() => dispatch({ type: 'finish' }), []);
  const reset = useCallback(() => dispatch({ type: 'reset' }), []);

  // Persist a MockInterviewRecord + a thin SessionRecord on finish.
  const recordedRef = useRef<number | null>(null);
  useEffect(() => {
    if (!state || state.status !== 'finished') return;
    if (recordedRef.current === state.startedAt) return;
    if (state.attempts.length === 0) return;
    const finishedAt = Date.now();
    const { totalScorePct, perKindScore } = aggregateMockScore(state.attempts);
    const record = {
      id: `mock_${state.startedAt}`,
      archetypeId: state.spec.id,
      startedAt: state.startedAt,
      finishedAt,
      durationMs: finishedAt - state.startedAt,
      totalScorePct,
      attempts: state.attempts,
      perKindScore,
    };
    appendMockInterviewRecord(record, active.id);

    // Slim summary into the SessionRecord stream so it shows up on Profile.
    const counted = state.attempts.filter((a) => !a.skipped);
    const correct = counted.reduce(
      (s, a) =>
        s +
        (a.kind === 'technical' || a.kind === 'situational'
          ? a.correct
            ? 1
            : 0
          : Math.round(a.scorePct)),
      0,
    );
    recordSession(
      {
        id: `mock_session_${state.startedAt}`,
        finishedAt,
        kind: 'mockInterview',
        config: {
          archetypeId: state.spec.id,
          archetypeTitle: state.spec.title,
          questionCount: state.questions.length,
        },
        attempts: counted.length,
        correct,
        accuracyPct: totalScorePct,
        durationMs: finishedAt - state.startedAt,
        xpEarned: 0,
      },
      active.id,
    );
    recordedRef.current = state.startedAt;
  }, [state, active.id]);

  return { state, start, submit, advance, finish, reset };
}
