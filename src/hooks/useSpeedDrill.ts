import { useCallback, useEffect, useReducer, useRef } from 'react';
import { buildCells, cellKey, scoreCell } from '../quiz/speedDrill';
import { recordSession } from '../storage/localStorage';
import { applyXpDelta, xpForSpeedDrillCell } from '../quiz/xp';
import { evaluateAchievements } from '../quiz/achievements';
import { buildContext } from '../quiz/achievementContext';
import { showAchievementToast } from '../components/AchievementToast';
import type { Cell, CellResult, SpeedDrillConfig, SpeedDrillState } from '../types/speedDrill';

type Action =
  | { type: 'start'; config: SpeedDrillConfig }
  | { type: 'select'; row: number; col: number }
  | { type: 'submit'; input: number | null; skipped: boolean }
  | { type: 'tick'; now: number }
  | { type: 'finish' }
  | { type: 'reset' };

function initial(): SpeedDrillState {
  return {
    config: {
      variantId: 'capCompression',
      rowValues: [],
      colValues: [],
      order: 'rowByRow',
      timeBudgetSec: 60,
      toleranceBand: 0.05,
      shuffleAxes: false,
    },
    variantId: 'capCompression',
    cells: [],
    currentRow: null,
    currentCol: null,
    results: {},
    startedAt: 0,
    cellStartedAt: 0,
    remainingMs: null,
    status: 'active',
  };
}

function findFirstUnanswered(
  cells: Cell[],
  results: Record<string, CellResult>,
  order: SpeedDrillConfig['order'],
): { row: number; col: number } | null {
  const candidates = cells.filter((c) => !c.isDiagonal && !results[cellKey(c.row, c.col)]);
  if (candidates.length === 0) return null;
  if (order === 'colByCol') {
    candidates.sort((a, b) => (a.col !== b.col ? a.col - b.col : a.row - b.row));
  } else if (order === 'random') {
    const idx = Math.floor(Math.random() * candidates.length);
    const c = candidates[idx];
    return { row: c.row, col: c.col };
  }
  return { row: candidates[0].row, col: candidates[0].col };
}

function reducer(state: SpeedDrillState, action: Action): SpeedDrillState {
  switch (action.type) {
    case 'start': {
      const cells = buildCells({
        variantId: action.config.variantId,
        rowValues: action.config.rowValues,
        colValues: action.config.colValues,
      });
      const first = findFirstUnanswered(cells, {}, action.config.order);
      const now = Date.now();
      return {
        config: action.config,
        variantId: action.config.variantId,
        cells,
        currentRow: first?.row ?? null,
        currentCol: first?.col ?? null,
        results: {},
        startedAt: now,
        cellStartedAt: now,
        remainingMs:
          action.config.timeBudgetSec !== null ? action.config.timeBudgetSec * 1000 : null,
        status: 'active',
      };
    }
    case 'select': {
      if (state.status !== 'active') return state;
      const cell = state.cells.find((c) => c.row === action.row && c.col === action.col);
      if (!cell || cell.isDiagonal) return state;
      return { ...state, currentRow: action.row, currentCol: action.col, cellStartedAt: Date.now() };
    }
    case 'submit': {
      if (state.status !== 'active' || state.currentRow === null || state.currentCol === null) return state;
      const cell = state.cells.find(
        (c) => c.row === state.currentRow && c.col === state.currentCol,
      );
      if (!cell) return state;
      const now = Date.now();
      const elapsedMs = now - state.cellStartedAt;
      const result: CellResult = action.skipped
        ? { userInput: null, correct: false, skipped: true, deltaPct: 0, elapsedMs }
        : {
            userInput: action.input,
            ...(action.input === null
              ? { correct: false, deltaPct: 0 }
              : scoreCell(action.input, cell.expected, state.config.toleranceBand)),
            skipped: false,
            elapsedMs,
          };
      const newResults = { ...state.results, [cellKey(cell.row, cell.col)]: result };
      const next = findFirstUnanswered(state.cells, newResults, state.config.order);
      const finished = next === null;
      return {
        ...state,
        results: newResults,
        currentRow: next?.row ?? null,
        currentCol: next?.col ?? null,
        cellStartedAt: now,
        status: finished ? 'finished' : 'active',
      };
    }
    case 'tick': {
      if (state.remainingMs === null || state.status !== 'active') return state;
      const elapsed = action.now - state.startedAt;
      const remaining = state.config.timeBudgetSec! * 1000 - elapsed;
      if (remaining <= 0) {
        return { ...state, remainingMs: 0, status: 'finished' };
      }
      return { ...state, remainingMs: remaining };
    }
    case 'finish':
      return { ...state, status: 'finished' };
    case 'reset':
      return initial();
  }
}

export function useSpeedDrill() {
  const [state, dispatch] = useReducer(reducer, undefined, initial);
  const tickingRef = useRef<number | null>(null);

  const start = useCallback((config: SpeedDrillConfig) => {
    dispatch({ type: 'start', config });
  }, []);

  const selectCell = useCallback((row: number, col: number) => {
    dispatch({ type: 'select', row, col });
  }, []);

  const submit = useCallback((input: number | null, skipped: boolean) => {
    dispatch({ type: 'submit', input, skipped });
  }, []);

  // Award XP at the moment a cell result lands.
  const lastCellResultRef = useRef<number>(0);
  useEffect(() => {
    const total = Object.keys(state.results).length;
    if (total === lastCellResultRef.current) return;
    // Only the most-recent result is new
    const newKeys = Object.keys(state.results).slice(lastCellResultRef.current);
    let earned = 0;
    for (const k of newKeys) {
      const r = state.results[k];
      earned += xpForSpeedDrillCell(r.correct, r.skipped);
    }
    if (earned > 0) applyXpDelta(earned);
    lastCellResultRef.current = total;
  }, [state.results]);

  const finish = useCallback(() => dispatch({ type: 'finish' }), []);
  const reset = useCallback(() => dispatch({ type: 'reset' }), []);

  useEffect(() => {
    if (state.status !== 'active' || state.remainingMs === null) return;
    const id = window.setInterval(() => {
      dispatch({ type: 'tick', now: Date.now() });
    }, 200);
    tickingRef.current = id;
    return () => {
      if (tickingRef.current !== null) window.clearInterval(tickingRef.current);
    };
  }, [state.status, state.remainingMs !== null]);

  const currentCell: Cell | null =
    state.status === 'active' && state.currentRow !== null && state.currentCol !== null
      ? state.cells.find(
          (c) => c.row === state.currentRow && c.col === state.currentCol,
        ) ?? null
      : null;

  const recordedRef = useRef<number | null>(null);
  useEffect(() => {
    if (state.status !== 'finished') return;
    if (recordedRef.current === state.startedAt) return;
    if (state.startedAt === 0) return;
    let correct = 0;
    let attempted = 0;
    let totalElapsed = 0;
    for (const r of Object.values(state.results)) {
      if (r.skipped) continue;
      attempted += 1;
      totalElapsed += r.elapsedMs;
      if (r.correct) correct += 1;
    }
    if (attempted === 0) return;
    const record = {
      id: `drill_${state.startedAt}`,
      finishedAt: Date.now(),
      kind: 'speedDrill' as const,
      config: { ...state.config } as Record<string, unknown>,
      attempts: attempted,
      correct,
      accuracyPct: correct / attempted,
      durationMs: totalElapsed,
      xpEarned: 0,
    };
    recordSession(record);
    recordedRef.current = state.startedAt;
    const ctx = buildContext({ latestSession: record });
    for (const id of evaluateAchievements(ctx)) showAchievementToast(id);
  }, [state.status, state.startedAt, state.results, state.config]);

  return { state, currentCell, start, selectCell, submit, finish, reset };
}
