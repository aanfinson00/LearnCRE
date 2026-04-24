import type { UnitFormat } from './question';

export type CellOrder = 'rowByRow' | 'colByCol' | 'random';

export type DrillVariantId =
  | 'capCompression'
  | 'irrToEm'
  | 'loanConstant'
  | 'noiCapToValue'
  | 'percentOf'
  | 'divideBy'
  | 'combinedDiscount'
  | 'nthRoot'
  | 'reciprocalTable';

export interface DrillVariantAxis {
  label: string;
  values: number[];
  format: (v: number) => string;
}

export interface DrillVariant {
  id: DrillVariantId;
  name: string;
  description: string;
  rowAxis: DrillVariantAxis;
  colAxis: DrillVariantAxis;
  computeCell(rowVal: number, colVal: number): number;
  unit: UnitFormat;
  toleranceBand: number;
  isDiagonalZero: boolean;
  inputHint?: string;
  formulaLabel: string;
}

export interface SpeedDrillConfig {
  variantId: DrillVariantId;
  rowValues: number[];
  colValues: number[];
  order: CellOrder;
  timeBudgetSec: number | null;
  toleranceBand: number;
  shuffleAxes: boolean;
}

export interface Cell {
  row: number;
  col: number;
  rowVal: number;
  colVal: number;
  expected: number;
  isDiagonal: boolean;
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
  variantId: DrillVariantId;
  cells: Cell[];
  currentRow: number | null;
  currentCol: number | null;
  results: Record<string, CellResult>;
  startedAt: number;
  cellStartedAt: number;
  remainingMs: number | null;
  status: 'active' | 'finished';
}
