import { a1ToCellRef, cellRefToA1 } from './parser';

const CELL_REF_GLOBAL = /\$?[A-Z]+\$?\d+/gi;

/**
 * Shift every relative cell reference in a formula by (dCol, dRow). Absolute
 * dimensions ($-prefixed) stay put. Mirrors Excel fill-right / fill-down.
 *
 * Returns the formula text with the same leading '=' (if any) preserved.
 */
export function shiftFormula(
  formula: string,
  dCol: number,
  dRow: number,
): string {
  const hasEq = formula.startsWith('=');
  const body = hasEq ? formula.slice(1) : formula;
  const shifted = body.replace(CELL_REF_GLOBAL, (match) => {
    const ref = a1ToCellRef(match);
    if (!ref) return match;
    const col = ref.absCol ? ref.col : ref.col + dCol;
    const row = ref.absRow ? ref.row : ref.row + dRow;
    if (col < 0 || row < 0) return match;
    return cellRefToA1({ col, row, absCol: ref.absCol, absRow: ref.absRow });
  });
  return hasEq ? `=${shifted}` : shifted;
}
