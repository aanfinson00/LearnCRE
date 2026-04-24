import type { Cell, CellOrder, SpeedDrillConfig } from '../types/speedDrill';
import { variants } from './speedDrillVariants';

export { CAP_PRESETS } from './speedDrillVariants';

export function shuffle<T>(arr: readonly T[]): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

export function buildCells(params: {
  variantId: SpeedDrillConfig['variantId'];
  rowValues: number[];
  colValues: number[];
}): Cell[] {
  const v = variants[params.variantId];
  const cells: Cell[] = [];
  for (let r = 0; r < params.rowValues.length; r++) {
    for (let c = 0; c < params.colValues.length; c++) {
      const rowVal = params.rowValues[r];
      const colVal = params.colValues[c];
      const isDiagonal =
        v.isDiagonalZero && Math.abs(rowVal - colVal) < 1e-9;
      cells.push({
        row: r,
        col: c,
        rowVal,
        colVal,
        expected: isDiagonal ? 0 : v.computeCell(rowVal, colVal),
        isDiagonal,
      });
    }
  }
  return cells;
}

export function buildOrder(cells: Cell[], order: CellOrder): number[] {
  const nonDiagonal: number[] = [];
  for (let i = 0; i < cells.length; i++) {
    if (!cells[i].isDiagonal) nonDiagonal.push(i);
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
  return nonDiagonal;
}

export function cellKey(row: number, col: number): string {
  return `${row},${col}`;
}

export function scoreCell(
  userInput: number,
  expected: number,
  band: number,
): { correct: boolean; deltaPct: number } {
  const absExpected = Math.abs(expected);
  const delta = userInput - expected;
  const deltaPct = absExpected < 1e-9 ? 0 : delta / absExpected;
  return { correct: Math.abs(deltaPct) <= band, deltaPct };
}
