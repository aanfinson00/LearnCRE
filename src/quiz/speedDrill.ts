import { capCompressionPctChange } from '../math/sensitivity';
import type { Cell, CellOrder, SpeedDrillConfig } from '../types/speedDrill';

export const CAP_PRESETS = {
  warmup: [0.04, 0.05, 0.06, 0.07, 0.08],
  standard: [0.04, 0.045, 0.05, 0.055, 0.06, 0.065, 0.07],
  gauntlet: [0.04, 0.045, 0.05, 0.055, 0.06, 0.065, 0.07, 0.075, 0.08],
} as const;

export function buildCells(caps: number[]): Cell[] {
  const cells: Cell[] = [];
  for (let r = 0; r < caps.length; r++) {
    for (let c = 0; c < caps.length; c++) {
      cells.push({
        row: r,
        col: c,
        oldCap: caps[r],
        newCap: caps[c],
        expected: capCompressionPctChange(caps[r], caps[c]),
      });
    }
  }
  return cells;
}

export function buildOrder(cells: Cell[], order: CellOrder, size: number): number[] {
  const nonDiagonal: number[] = [];
  for (let i = 0; i < cells.length; i++) {
    if (cells[i].row !== cells[i].col) nonDiagonal.push(i);
  }
  if (order === 'colByCol') {
    nonDiagonal.sort((a, b) => {
      const ca = cells[a];
      const cb = cells[b];
      if (ca.col !== cb.col) return ca.col - cb.col;
      return ca.row - cb.row;
    });
  } else if (order === 'random') {
    for (let i = nonDiagonal.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [nonDiagonal[i], nonDiagonal[j]] = [nonDiagonal[j], nonDiagonal[i]];
    }
  }
  // rowByRow is already in row-major order from buildCells
  void size;
  return nonDiagonal;
}

export function cellKey(row: number, col: number): string {
  return `${row},${col}`;
}

export function scoreCell(userInput: number, expected: number, band: number): {
  correct: boolean;
  deltaPct: number;
} {
  const absExpected = Math.abs(expected);
  const delta = userInput - expected;
  const deltaPct = absExpected < 1e-9 ? 0 : delta / absExpected;
  return { correct: Math.abs(deltaPct) <= band, deltaPct };
}

export interface DrillSummary {
  total: number;
  attempted: number;
  correct: number;
  skipped: number;
  avgElapsedMs: number;
  accuracyPct: number;
  perRow: Map<number, { total: number; correct: number }>;
  perCol: Map<number, { total: number; correct: number }>;
}

export function summarize(config: SpeedDrillConfig, cells: Cell[], results: Record<string, ReturnType<typeof scoreCell> & { skipped: boolean; elapsedMs: number }>): DrillSummary {
  let attempted = 0;
  let correct = 0;
  let skipped = 0;
  let totalElapsed = 0;
  const perRow = new Map<number, { total: number; correct: number }>();
  const perCol = new Map<number, { total: number; correct: number }>();

  for (const cell of cells) {
    if (cell.row === cell.col) continue;
    const key = cellKey(cell.row, cell.col);
    const r = results[key];
    if (!r) continue;
    if (r.skipped) {
      skipped += 1;
      continue;
    }
    attempted += 1;
    totalElapsed += r.elapsedMs;
    if (r.correct) correct += 1;
    const row = perRow.get(cell.row) ?? { total: 0, correct: 0 };
    row.total += 1;
    if (r.correct) row.correct += 1;
    perRow.set(cell.row, row);
    const col = perCol.get(cell.col) ?? { total: 0, correct: 0 };
    col.total += 1;
    if (r.correct) col.correct += 1;
    perCol.set(cell.col, col);
  }

  const nonDiag = cells.filter((c) => c.row !== c.col).length;
  void config;
  return {
    total: nonDiag,
    attempted,
    correct,
    skipped,
    avgElapsedMs: attempted === 0 ? 0 : totalElapsed / attempted,
    accuracyPct: attempted === 0 ? 0 : correct / attempted,
    perRow,
    perCol,
  };
}
