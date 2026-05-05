import { useCallback, useEffect, useReducer, useRef } from 'react';
import { gradeSubmission } from '../excel/modelingTest/grade';
import {
  clearDraft,
  loadDraft,
  recordAttempt,
  saveDraft,
} from '../storage/modelingTest';
import { applyXpDelta } from '../quiz/xp';
import { recordSession } from '../storage/localStorage';
import { evaluateAchievements } from '../quiz/achievements';
import { buildContext } from '../quiz/achievementContext';
import { showAchievementToast } from '../components/AchievementToast';
import type {
  ModelingTestState,
  ModelingTestTemplate,
} from '../types/modelingTest';

type Action =
  | { type: 'open'; template: ModelingTestTemplate }
  | { type: 'setFormula'; ref: string; raw: string }
  | { type: 'focus'; ref: string | null }
  | { type: 'submit' }
  | { type: 'tryAgain' }
  | { type: 'reset' };

function reducer(state: ModelingTestState | null, action: Action): ModelingTestState | null {
  switch (action.type) {
    case 'open': {
      const draft = loadDraft(action.template.id);
      const formulas = draft?.formulas ?? {};
      const startedAt = draft?.startedAt ?? Date.now();
      return {
        template: action.template,
        formulas,
        startedAt,
        status: 'editing',
        result: null,
        focusRef: firstTargetRef(action.template),
      };
    }
    case 'setFormula': {
      if (!state || state.status !== 'editing') return state;
      const next = { ...state.formulas, [action.ref]: action.raw };
      return { ...state, formulas: next };
    }
    case 'focus': {
      if (!state) return state;
      return { ...state, focusRef: action.ref };
    }
    case 'submit': {
      if (!state) return state;
      const result = gradeSubmission(state.template, state.formulas);
      return { ...state, status: 'graded', result };
    }
    case 'tryAgain': {
      if (!state) return state;
      return {
        ...state,
        formulas: {},
        startedAt: Date.now(),
        status: 'editing',
        result: null,
        focusRef: firstTargetRef(state.template),
      };
    }
    case 'reset':
      return null;
  }
}

function firstTargetRef(t: ModelingTestTemplate): string | null {
  const target = t.layout.cells.find((c) => c.role === 'target');
  return target?.address ?? null;
}

function xpForModelingTest(
  passed: boolean,
  outputsCorrect: number,
  outputsTotal: number,
  difficulty: ModelingTestTemplate['difficulty'],
): number {
  const baseByDifficulty = { beginner: 75, intermediate: 150, advanced: 250 } as const;
  if (passed) return baseByDifficulty[difficulty];
  const ratio = outputsTotal === 0 ? 0 : outputsCorrect / outputsTotal;
  if (ratio >= 0.6) {
    return Math.round(baseByDifficulty[difficulty] / 3);
  }
  return 0;
}

export function useModelingTest() {
  const [state, dispatch] = useReducer(reducer, null);

  const open = useCallback(
    (template: ModelingTestTemplate) => dispatch({ type: 'open', template }),
    [],
  );
  const setFormula = useCallback(
    (ref: string, raw: string) => dispatch({ type: 'setFormula', ref, raw }),
    [],
  );
  const focus = useCallback((ref: string | null) => dispatch({ type: 'focus', ref }), []);
  const submit = useCallback(() => dispatch({ type: 'submit' }), []);
  const tryAgain = useCallback(() => dispatch({ type: 'tryAgain' }), []);
  const reset = useCallback(() => dispatch({ type: 'reset' }), []);

  // Debounced auto-save while editing.
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    if (!state || state.status !== 'editing') return;
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    const snapshot = {
      templateId: state.template.id,
      formulas: state.formulas,
      startedAt: state.startedAt,
      lastEditedAt: Date.now(),
    };
    saveTimerRef.current = setTimeout(() => saveDraft(snapshot), 400);
    return () => {
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    };
  }, [state]);

  // Persist attempt + XP + session record on grade.
  const recordedRef = useRef<number | null>(null);
  useEffect(() => {
    if (!state || state.status !== 'graded' || !state.result) return;
    if (recordedRef.current === state.startedAt) return;
    const completedAt = Date.now();
    const durationMs = completedAt - state.startedAt;
    recordAttempt({
      templateId: state.template.id,
      formulas: state.formulas,
      result: state.result,
      durationMs,
      completedAt,
    });
    clearDraft(state.template.id);
    const xp = xpForModelingTest(
      state.result.passed,
      state.result.outputsCorrect,
      state.result.outputsTotal,
      state.template.difficulty,
    );
    if (xp > 0) applyXpDelta(xp);
    const checkpointsPassed = state.result.checkpoints.filter(
      (c) => c.grade === 'pass',
    ).length;
    const sessionRecord = {
      id: `modelingTest_${state.startedAt}`,
      finishedAt: completedAt,
      kind: 'modelingTest' as const,
      config: {
        templateId: state.template.id,
        title: state.template.title,
        difficulty: state.template.difficulty,
        passed: state.result.passed,
        outputsCorrect: state.result.outputsCorrect,
        outputsTotal: state.result.outputsTotal,
        checkpointsPassed,
        checkpointsTotal: state.result.checkpoints.length,
      },
      attempts: 1,
      correct: state.result.passed ? 1 : 0,
      accuracyPct: state.result.outputsTotal === 0
        ? 0
        : state.result.outputsCorrect / state.result.outputsTotal,
      durationMs,
      xpEarned: xp,
    };
    recordSession(sessionRecord);
    const ctx = buildContext({ latestSession: sessionRecord });
    for (const id of evaluateAchievements(ctx)) showAchievementToast(id);
    recordedRef.current = state.startedAt;
  }, [state]);

  return { state, open, setFormula, focus, submit, tryAgain, reset };
}
