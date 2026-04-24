import { useCallback, useEffect, useReducer, useRef } from 'react';
import { buildCells, buildOrder, cellKey, scoreCell } from '../quiz/speedDrill';
import type { Cell, CellResult, SpeedDrillConfig, SpeedDrillState } from '../types/speedDrill';

type Action =
  | { type: 'start'; config: SpeedDrillConfig }
  | { type: 'submit'; input: number | null; skipped: boolean }
  | { type: 'tick'; now: number }
  | { type: 'finish' }
  | { type: 'reset' };

function initial(): SpeedDrillState {
  return {
    config: {
      caps: [],
      order: 'rowByRow',
      timeBudgetSec: 60,
      toleranceBand: 0.05,
    },
    cells: [],
    order: [],
    currentIndex: 0,
    results: {},
    startedAt: 0,
    cellStartedAt: 0,
    remainingMs: null,
    status: 'active',
  };
}

function reducer(state: SpeedDrillState, action: Action): SpeedDrillState {
  switch (action.type) {
    case 'start': {
      const cells = buildCells(action.config.caps);
      const order = buildOrder(cells, action.config.order, action.config.caps.length);
      const now = Date.now();
      return {
        config: action.config,
        cells,
        order,
        currentIndex: 0,
        results: {},
        startedAt: now,
        cellStartedAt: now,
        remainingMs: action.config.timeBudgetSec !== null ? action.config.timeBudgetSec * 1000 : null,
        status: 'active',
      };
    }
    case 'submit': {
      if (state.status !== 'active' || state.order.length === 0) return state;
      const cellIdx = state.order[state.currentIndex];
      const cell = state.cells[cellIdx];
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
      const nextIndex = state.currentIndex + 1;
      const finished = nextIndex >= state.order.length;
      return {
        ...state,
        results: { ...state.results, [cellKey(cell.row, cell.col)]: result },
        currentIndex: finished ? state.currentIndex : nextIndex,
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

  const submit = useCallback((input: number | null, skipped: boolean) => {
    dispatch({ type: 'submit', input, skipped });
  }, []);

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
    state.status === 'active' && state.order.length > 0
      ? state.cells[state.order[state.currentIndex]]
      : null;

  return { state, currentCell, start, submit, finish, reset };
}
