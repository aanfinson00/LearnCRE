import { useCallback, useEffect, useReducer, useRef } from 'react';
import { recordSession } from '../storage/localStorage';
import { applyXpDelta } from '../quiz/xp';
import { evaluateAchievements } from '../quiz/achievements';
import { buildContext } from '../quiz/achievementContext';
import { showAchievementToast } from '../components/AchievementToast';
import { evaluateFormula } from '../excel/evaluate';
import { FormulaError } from '../excel/parser';
import { filterTemplates, pickTemplates, sheetFromLayout } from '../excel/templates';
import type { ExcelAttempt, ExcelRunConfig, ExcelState, ExcelTemplate } from '../excel/types';

type Action =
  | { type: 'start'; config: ExcelRunConfig }
  | { type: 'submit'; attempt: ExcelAttempt }
  | { type: 'advance' }
  | { type: 'reset' };

function reducer(state: ExcelState | null, action: Action): ExcelState | null {
  switch (action.type) {
    case 'start': {
      const pool = filterTemplates(action.config);
      const templates = pickTemplates(pool, action.config.length);
      if (templates.length === 0) return null;
      const now = Date.now();
      return {
        config: action.config,
        templates,
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
      if (next >= state.templates.length) return { ...state, status: 'finished' };
      return { ...state, currentIndex: next, caseStartedAt: Date.now() };
    }
    case 'reset':
      return null;
  }
}

function xpForExcel(correct: boolean, skipped: boolean, difficulty: string): number {
  if (skipped) return 0;
  const base = difficulty === 'advanced' ? 5 : difficulty === 'intermediate' ? 4 : 3;
  return correct ? base : 1;
}

export interface ExcelLivePreview {
  raw: string;
  ok: boolean;
  value: number | null;
  error: string | null;
}

export function evaluatePreview(rawFormula: string, template: ExcelTemplate): ExcelLivePreview {
  const trimmed = rawFormula.trim();
  if (trimmed === '' || trimmed === '=') {
    return { raw: trimmed, ok: false, value: null, error: null };
  }
  try {
    const sheet = sheetFromLayout(template.layout);
    const v = evaluateFormula(trimmed, sheet);
    return { raw: trimmed, ok: true, value: v, error: null };
  } catch (e) {
    const msg = e instanceof FormulaError ? e.message : String(e);
    return { raw: trimmed, ok: false, value: null, error: msg };
  }
}

export function isWithinTolerance(
  computed: number,
  expected: number,
  tolerancePct: number,
): boolean {
  if (!Number.isFinite(computed) || !Number.isFinite(expected)) return false;
  if (expected === 0) return Math.abs(computed) <= tolerancePct;
  return Math.abs(computed - expected) / Math.abs(expected) <= tolerancePct;
}

export function useExcel() {
  const [state, dispatch] = useReducer(reducer, null);

  const start = useCallback((config: ExcelRunConfig) => dispatch({ type: 'start', config }), []);

  const submit = useCallback(
    (rawFormula: string, skipped: boolean) => {
      if (!state) return;
      const t = state.templates[state.currentIndex];
      const elapsedMs = Date.now() - state.caseStartedAt;
      const tol = t.tolerancePct ?? 0.005;
      let parsedOk = false;
      let computedValue: number | null = null;
      let correct = false;
      let deltaPct = 0;
      if (!skipped) {
        try {
          const sheet = sheetFromLayout(t.layout);
          const v = evaluateFormula(rawFormula, sheet);
          parsedOk = true;
          computedValue = v;
          correct = isWithinTolerance(v, t.expected, tol);
          deltaPct = t.expected === 0 ? 0 : (v - t.expected) / Math.abs(t.expected);
        } catch {
          /* parse / eval failure → not correct */
        }
      }
      const xp = xpForExcel(correct, skipped, t.difficulty);
      if (xp > 0) applyXpDelta(xp);
      dispatch({
        type: 'submit',
        attempt: {
          templateId: t.id,
          rawFormula,
          parsedOk,
          computedValue,
          correct,
          deltaPct,
          elapsedMs,
          skipped,
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
    const correct = counted.filter((a) => a.correct).length;
    const record = {
      id: `excel_${state.startedAt}`,
      finishedAt: Date.now(),
      kind: 'excel' as const,
      config: {
        category: state.config.category,
        difficulty: state.config.difficulty,
        length: state.config.length,
        templateIds: state.templates.map((t) => t.id),
        attemptedTemplateIds: counted.map((a) => a.templateId),
        correctTemplateIds: counted.filter((a) => a.correct).map((a) => a.templateId),
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
