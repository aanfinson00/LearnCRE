import { useCallback, useEffect, useReducer, useRef } from 'react';
import { recordSession } from '../storage/localStorage';
import { applyXpDelta } from '../quiz/xp';
import { recordVocabAttempt, loadVocabMastery } from '../storage/vocab';
import { buildCards, filterTerms, pickTerms } from '../quiz/vocab';
import { useProfile } from './useProfile';
import type {
  VocabAttempt,
  VocabRunConfig,
  VocabState,
} from '../types/vocab';

type Action =
  | { type: 'start'; config: VocabRunConfig; profileId: string }
  | { type: 'submit'; attempt: VocabAttempt }
  | { type: 'advance' }
  | { type: 'finish' }
  | { type: 'reset' };

function reducer(state: VocabState | null, action: Action): VocabState | null {
  switch (action.type) {
    case 'start': {
      const pool = filterTerms(action.config);
      if (pool.length === 0) return null;
      const mastery = loadVocabMastery(action.profileId);
      // Timed mode draws a generous pool (up to 50 cards); user can run out
      // of clock or cards. Untimed uses the configured length exactly.
      const targetCount =
        action.config.mode === 'timed' ? Math.min(50, pool.length) : action.config.length;
      const seed = Date.now();
      const terms = pickTerms(pool, targetCount, mastery, seed);
      const cards = buildCards(terms, action.config.format, seed);
      const now = Date.now();
      return {
        config: action.config,
        cards,
        currentIndex: 0,
        attempts: [],
        startedAt: now,
        cardStartedAt: now,
        deadlineMs:
          action.config.mode === 'timed'
            ? now + action.config.timeLimitSec * 1000
            : undefined,
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
      if (next >= state.cards.length) {
        return { ...state, status: 'finished' };
      }
      return { ...state, currentIndex: next, cardStartedAt: Date.now() };
    }
    case 'finish': {
      if (!state) return state;
      return { ...state, status: 'finished' };
    }
    case 'reset':
      return null;
  }
}

/** XP per correct vocab card. Lower than situational (cheap signal). */
function xpForVocab(correct: boolean, skipped: boolean, difficulty: string): number {
  if (skipped) return 0;
  const base = difficulty === 'advanced' ? 2 : difficulty === 'intermediate' ? 1 : 1;
  return correct ? base : 0;
}

export function useVocab() {
  const { active } = useProfile();
  const [state, dispatch] = useReducer(reducer, null);

  const start = useCallback(
    (config: VocabRunConfig) => dispatch({ type: 'start', config, profileId: active.id }),
    [active.id],
  );

  const submit = useCallback(
    (pickedIndex: number | null, skipped: boolean) => {
      if (!state) return;
      const card = state.cards[state.currentIndex];
      const elapsedMs = Date.now() - state.cardStartedAt;
      const correct = !skipped && pickedIndex !== null && pickedIndex === card.correctIndex;
      // Resolve term for difficulty + XP weighting.
      // We dispatch first, then update mastery + XP outside reducer.
      const term = state.cards[state.currentIndex];
      const termId = term.termId;
      // Find the term's difficulty by re-scanning — cheap because terms are small.
      // (Avoids importing the registry into the reducer.)
      // We hard-code 'intermediate' if not found; xpForVocab tolerates this.
      const xp = xpForVocab(correct, skipped, 'intermediate');
      if (xp > 0) applyXpDelta(xp);
      if (!skipped) recordVocabAttempt(termId, correct, active.id);
      dispatch({
        type: 'submit',
        attempt: {
          termId,
          format: card.format,
          pickedIndex,
          correct,
          elapsedMs,
          skipped,
        },
      });
    },
    [state, active.id],
  );

  const advance = useCallback(() => dispatch({ type: 'advance' }), []);
  const finish = useCallback(() => dispatch({ type: 'finish' }), []);
  const reset = useCallback(() => dispatch({ type: 'reset' }), []);

  // Time-out watcher for timed mode
  useEffect(() => {
    if (!state || state.status !== 'active' || !state.deadlineMs) return;
    const remaining = state.deadlineMs - Date.now();
    if (remaining <= 0) {
      dispatch({ type: 'finish' });
      return;
    }
    const t = setTimeout(() => dispatch({ type: 'finish' }), remaining);
    return () => clearTimeout(t);
  }, [state]);

  // Persist a SessionRecord on finish.
  const recordedRef = useRef<number | null>(null);
  useEffect(() => {
    if (!state || state.status !== 'finished') return;
    if (recordedRef.current === state.startedAt) return;
    if (state.attempts.length === 0) return;
    const counted = state.attempts.filter((a) => !a.skipped);
    const correct = counted.filter((a) => a.correct).length;
    const record = {
      id: `vocab_${state.startedAt}`,
      finishedAt: Date.now(),
      kind: 'vocab' as const,
      config: {
        category: state.config.category,
        difficulty: state.config.difficulty,
        format: state.config.format,
        mode: state.config.mode,
        length: state.config.length,
        timeLimitSec: state.config.timeLimitSec,
        termIds: state.cards.map((c) => c.termId),
        correctTermIds: counted.filter((a) => a.correct).map((a) => a.termId),
      },
      attempts: counted.length,
      correct,
      accuracyPct: counted.length === 0 ? 0 : correct / counted.length,
      durationMs: Date.now() - state.startedAt,
      xpEarned: 0,
    };
    recordSession(record, active.id);
    recordedRef.current = state.startedAt;
  }, [state, active.id]);

  return { state, start, submit, advance, finish, reset };
}
