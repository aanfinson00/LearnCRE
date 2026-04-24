import { describe, it, expect } from 'vitest';
import { buildCells, buildOrder, CAP_PRESETS, cellKey, scoreCell } from '../speedDrill';
import { capCompressionPctChange } from '../../math/sensitivity';

describe('quiz/speedDrill', () => {
  it('buildCells: 5x5 warmup produces 25 cells', () => {
    const cells = buildCells([...CAP_PRESETS.warmup]);
    expect(cells).toHaveLength(25);
  });

  it('buildCells: 9x9 gauntlet produces 81 cells', () => {
    const cells = buildCells([...CAP_PRESETS.gauntlet]);
    expect(cells).toHaveLength(81);
  });

  it('each cell expected matches capCompressionPctChange', () => {
    const caps = [...CAP_PRESETS.standard];
    const cells = buildCells(caps);
    for (const cell of cells) {
      expect(cell.expected).toBeCloseTo(capCompressionPctChange(cell.oldCap, cell.newCap), 10);
    }
  });

  it('diagonal cells have zero expected', () => {
    const cells = buildCells([...CAP_PRESETS.standard]);
    for (const c of cells) {
      if (c.row === c.col) expect(c.expected).toBe(0);
    }
  });

  it('buildOrder: rowByRow excludes diagonal, preserves row-major', () => {
    const caps = [0.05, 0.06, 0.07];
    const cells = buildCells(caps);
    const order = buildOrder(cells, 'rowByRow', caps.length);
    expect(order).toHaveLength(6);
    for (const idx of order) {
      expect(cells[idx].row).not.toBe(cells[idx].col);
    }
  });

  it('buildOrder: colByCol sorts by column first', () => {
    const caps = [0.05, 0.06, 0.07];
    const cells = buildCells(caps);
    const order = buildOrder(cells, 'colByCol', caps.length);
    expect(order).toHaveLength(6);
    const cols = order.map((i) => cells[i].col);
    for (let i = 1; i < cols.length; i++) {
      expect(cols[i]).toBeGreaterThanOrEqual(cols[i - 1]);
    }
  });

  it('scoreCell: within ±5% band → correct', () => {
    expect(scoreCell(0.062, 0.06, 0.05).correct).toBe(true);
    expect(scoreCell(0.058, 0.06, 0.05).correct).toBe(true);
  });

  it('scoreCell: over band → incorrect', () => {
    expect(scoreCell(0.068, 0.06, 0.05).correct).toBe(false);
  });

  it('cellKey: stable format', () => {
    expect(cellKey(2, 5)).toBe('2,5');
  });
});
