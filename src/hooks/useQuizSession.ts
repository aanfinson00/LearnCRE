import { useCallback, useMemo, useReducer } from 'react';
import { generateQuestion } from '../quiz/engine';
import { scoreAnswer } from '../quiz/tolerance';
import { recordAttempt } from '../storage/localStorage';
import type { Attempt, QuizSession, SessionConfig, SessionStats } from '../types/session';
import type { Question } from '../types/question';
import { nextId } from '../quiz/random';

type Action =
  | { type: 'start'; config: SessionConfig }
  | { type: 'submit'; attempt: Attempt }
  | { type: 'advance'; question: Question | null }
  | { type: 'endSession' }
  | { type: 'enterReview' }
  | { type: 'exitReview' }
  | { type: 'reset' };

function reducer(state: QuizSession, action: Action): QuizSession {
  switch (action.type) {
    case 'start':
      return {
        id: nextId('session'),
        startedAt: Date.now(),
        config: action.config,
        attempts: [],
        currentIndex: 0,
        currentQuestion: null,
        questionStartedAt: null,
        status: 'active',
        lastAttempt: null,
      };
    case 'submit':
      return {
        ...state,
        status: 'answered',
        attempts: [...state.attempts, action.attempt],
        lastAttempt: action.attempt,
      };
    case 'advance': {
      const nextIndex = state.currentIndex + 1;
      const planned = state.config.plannedCount;
      if (planned !== null && nextIndex >= planned) {
        return { ...state, status: 'finished', currentQuestion: null };
      }
      return {
        ...state,
        status: 'active',
        currentIndex: nextIndex,
        currentQuestion: action.question,
        questionStartedAt: action.question ? Date.now() : null,
      };
    }
    case 'endSession':
      return { ...state, status: 'finished', currentQuestion: null };
    case 'enterReview':
      return { ...state, status: 'reviewing' };
    case 'exitReview':
      return { ...state, status: 'finished' };
    case 'reset':
      return initialSession();
  }
}

function initialSession(): QuizSession {
  return {
    id: '',
    startedAt: 0,
    config: {
      mode: 'free',
      categories: [],
      plannedCount: 10,
      tolerancePreset: 'normal',
      difficulty: 'intermediate',
    },
    attempts: [],
    currentIndex: 0,
    currentQuestion: null,
    questionStartedAt: null,
    status: 'setup',
    lastAttempt: null,
  };
}

export function useQuizSession() {
  const [session, dispatch] = useReducer(reducer, undefined, initialSession);

  const start = useCallback((config: SessionConfig) => {
    const first = generateQuestion({
      categories: config.categories,
      mode: config.mode,
      tolerancePreset: config.tolerancePreset,
      difficulty: config.difficulty,
      attempts: [],
    });
    dispatch({ type: 'start', config });
    dispatch({ type: 'advance', question: first });
  }, []);

  const submit = useCallback(
    (userInput: number | null, skipped: boolean) => {
      const q = session.currentQuestion;
      if (!q || !session.questionStartedAt) return;
      const elapsedMs = Date.now() - session.questionStartedAt;
      let correct = false;
      let deltaPct = 0;
      if (!skipped && userInput !== null) {
        const result = scoreAnswer(userInput, q);
        correct = result.correct;
        deltaPct = result.deltaPct;
      }
      const attempt: Attempt = {
        questionId: q.id,
        kind: q.kind,
        question: q,
        userInput,
        expected: q.expected,
        correct,
        deltaPct,
        elapsedMs,
        skipped,
      };
      recordAttempt(q.kind, correct, skipped);
      dispatch({ type: 'submit', attempt });
    },
    [session.currentQuestion, session.questionStartedAt],
  );

  const next = useCallback(() => {
    const nextIndex = session.currentIndex + 1;
    const planned = session.config.plannedCount;
    if (planned !== null && nextIndex >= planned) {
      dispatch({ type: 'advance', question: null });
      return;
    }
    const q = generateQuestion({
      categories: session.config.categories,
      mode: session.config.mode,
      tolerancePreset: session.config.tolerancePreset,
      difficulty: session.config.difficulty,
      attempts: session.attempts,
    });
    dispatch({ type: 'advance', question: q });
  }, [session.currentIndex, session.config, session.attempts]);

  const reset = useCallback(() => dispatch({ type: 'reset' }), []);
  const endSession = useCallback(() => dispatch({ type: 'endSession' }), []);
  const enterReview = useCallback(() => dispatch({ type: 'enterReview' }), []);
  const exitReview = useCallback(() => dispatch({ type: 'exitReview' }), []);

  const stats = useMemo<SessionStats>(() => computeStats(session.attempts), [session.attempts]);

  return { session, stats, start, submit, next, reset, endSession, enterReview, exitReview };
}

function computeStats(attempts: Attempt[]): SessionStats {
  const counted = attempts.filter((a) => !a.skipped);
  const total = counted.length;
  const correct = counted.filter((a) => a.correct).length;
  let currentStreak = 0;
  let bestStreak = 0;
  let running = 0;
  for (const a of counted) {
    if (a.correct) {
      running += 1;
      if (running > bestStreak) bestStreak = running;
    } else {
      running = 0;
    }
    currentStreak = running;
  }
  const avgResponseMs =
    total === 0 ? 0 : counted.reduce((acc, a) => acc + a.elapsedMs, 0) / total;

  const perCategory: SessionStats['perCategory'] = {};
  for (const a of counted) {
    const cat = perCategory[a.kind] ?? { total: 0, correct: 0 };
    perCategory[a.kind] = {
      total: cat.total + 1,
      correct: cat.correct + (a.correct ? 1 : 0),
    };
  }

  return {
    total,
    correct,
    accuracyPct: total === 0 ? 0 : correct / total,
    currentStreak,
    bestStreak,
    avgResponseMs,
    perCategory,
  };
}
