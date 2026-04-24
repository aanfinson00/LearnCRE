import { describe, it, expect } from 'vitest';
import { buildCells, buildOrder, cellKey, scoreCell, shuffle } from '../speedDrill';
import { capCompressionPctChange } from '../../math/sensitivity';
import { variants } from '../speedDrillVariants';

describe('quiz/speedDrill', () => {
  it('buildCells: cap compression 5x5 produces 25 cells, 5 diagonal', () => {
    const caps = [0.04, 0.05, 0.06, 0.07, 0.08];
    const cells = buildCells({ variantId: 'capCompression', rowValues: caps, colValues: caps });
    expect(cells).toHaveLength(25);
    const diag = cells.filter((c) => c.isDiagonal);
    expect(diag).toHaveLength(5);
    for (const c of diag) expect(c.expected).toBe(0);
  });

  it('each cap-compression cell expected matches capCompressionPctChange', () => {
    const caps = variants.capCompression.rowAxis.values;
    const cells = buildCells({
      variantId: 'capCompression',
      rowValues: caps,
      colValues: caps,
    });
    for (const cell of cells) {
      if (cell.isDiagonal) continue;
      expect(cell.expected).toBeCloseTo(capCompressionPctChange(cell.rowVal, cell.colVal), 10);
    }
  });

  it('buildCells: IRR × years variant produces a multiple >= 1 for every cell', () => {
    const v = variants.irrToEm;
    const cells = buildCells({
      variantId: 'irrToEm',
      rowValues: v.rowAxis.values,
      colValues: v.colAxis.values,
    });
    for (const cell of cells) {
      expect(cell.expected).toBeGreaterThanOrEqual(1);
      expect(cell.isDiagonal).toBe(false);
    }
  });

  it('buildCells: loan constant variant has bps values in ~550-950 range', () => {
    const v = variants.loanConstant;
    const cells = buildCells({
      variantId: 'loanConstant',
      rowValues: v.rowAxis.values,
      colValues: v.colAxis.values,
    });
    for (const cell of cells) {
      expect(cell.expected).toBeGreaterThan(400);
      expect(cell.expected).toBeLessThan(1000);
    }
  });

  it('buildCells: NOI × cap values are positive dollar amounts', () => {
    const v = variants.noiCapToValue;
    const cells = buildCells({
      variantId: 'noiCapToValue',
      rowValues: v.rowAxis.values,
      colValues: v.colAxis.values,
    });
    for (const cell of cells) {
      expect(cell.expected).toBeGreaterThan(0);
    }
  });

  it('buildOrder: rowByRow excludes diagonals', () => {
    const caps = [0.05, 0.06, 0.07];
    const cells = buildCells({ variantId: 'capCompression', rowValues: caps, colValues: caps });
    const order = buildOrder(cells, 'rowByRow');
    expect(order).toHaveLength(6);
    for (const idx of order) expect(cells[idx].isDiagonal).toBe(false);
  });

  it('buildOrder: colByCol sorts by column first', () => {
    const caps = [0.05, 0.06, 0.07];
    const cells = buildCells({ variantId: 'capCompression', rowValues: caps, colValues: caps });
    const order = buildOrder(cells, 'colByCol');
    const colIdx = order.map((i) => cells[i].col);
    for (let i = 1; i < colIdx.length; i++) {
      expect(colIdx[i]).toBeGreaterThanOrEqual(colIdx[i - 1]);
    }
  });

  it('shuffle: preserves set membership and length', () => {
    const input = [1, 2, 3, 4, 5, 6, 7];
    const out = shuffle(input);
    expect(out).toHaveLength(input.length);
    expect(new Set(out)).toEqual(new Set(input));
  });

  it('scoreCell: within band correct, over band incorrect', () => {
    expect(scoreCell(0.062, 0.06, 0.05).correct).toBe(true);
    expect(scoreCell(0.068, 0.06, 0.05).correct).toBe(false);
  });

  it('cellKey: stable format', () => {
    expect(cellKey(2, 5)).toBe('2,5');
  });
});
