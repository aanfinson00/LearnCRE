export type CellOrder = 'rowByRow' | 'colByCol' | 'random';

export interface SpeedDrillConfig {
  caps: number[];
  order: CellOrder;
  timeBudgetSec: number | null;
  toleranceBand: number;
}

export interface Cell {
  row: number;
  col: number;
  oldCap: number;
  newCap: number;
  expected: number;
}

export interface CellResult {
  userInput: number | null;
  correct: boolean;
  skipped: boolean;
  deltaPct: number;
  elapsedMs: number;
}

export interface SpeedDrillState {
  config: SpeedDrillConfig;
  cells: Cell[];
  order: number[];
  currentIndex: number;
  results: Record<string, CellResult>;
  startedAt: number;
  cellStartedAt: number;
  remainingMs: number | null;
  status: 'active' | 'finished';
}
