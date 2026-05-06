import { describe, expect, it } from 'vitest';
import { shiftFormula } from '../shift';

describe('excel/shift — shiftFormula', () => {
  it('shifts a single relative reference right by 1 column', () => {
    expect(shiftFormula('=A1', 1, 0)).toBe('=B1');
  });

  it('shifts every relative reference in a binary expression', () => {
    expect(shiftFormula('=A1+B1', 1, 0)).toBe('=B1+C1');
  });

  it('preserves absolute column anchors', () => {
    expect(shiftFormula('=$A1+B1', 1, 0)).toBe('=$A1+C1');
  });

  it('preserves absolute row anchors', () => {
    expect(shiftFormula('=A$1+B1', 0, 2)).toBe('=A$1+B3');
  });

  it('preserves both absolute anchors ($A$1)', () => {
    expect(shiftFormula('=$A$1*B1', 1, 1)).toBe('=$A$1*C2');
  });

  it('handles ranges correctly', () => {
    expect(shiftFormula('=SUM(A1:A5)', 1, 0)).toBe('=SUM(B1:B5)');
  });

  it('handles fill-down (row delta)', () => {
    expect(shiftFormula('=A1+B1', 0, 1)).toBe('=A2+B2');
  });

  it('returns the original ref when shifting would go below A1', () => {
    expect(shiftFormula('=A1', -1, 0)).toBe('=A1');
    expect(shiftFormula('=A1', 0, -1)).toBe('=A1');
  });

  it('handles formulas without leading =', () => {
    expect(shiftFormula('A1+B1', 1, 0)).toBe('B1+C1');
  });

  it('leaves non-cell tokens untouched', () => {
    expect(shiftFormula('=IF(A1>0,B1,C1)', 1, 0)).toBe('=IF(B1>0,C1,D1)');
  });

  it('handles multi-letter columns', () => {
    expect(shiftFormula('=Z1+AA1', 1, 0)).toBe('=AA1+AB1');
  });
});
