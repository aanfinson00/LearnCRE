import { describe, it, expect } from 'vitest';
import {
  cagr,
  compoundGrowth,
  noiFromOer,
  operatingExpenseRatio,
  perUnit,
  reversionValue,
} from '../growth';

describe('math/growth', () => {
  it('cagr: $500k → $800k over 6y ≈ 8.16%', () => {
    expect(cagr(500_000, 800_000, 6)).toBeCloseTo(0.0816, 3);
  });

  it('cagr round-trip: compoundGrowth then cagr returns rate', () => {
    const end = compoundGrowth(1_000_000, 0.035, 7);
    expect(cagr(1_000_000, end, 7)).toBeCloseTo(0.035, 10);
  });

  it('compoundGrowth: $1M at 3% for 5y ≈ $1.159M', () => {
    expect(compoundGrowth(1_000_000, 0.03, 5)).toBeCloseTo(1_159_274, 0);
  });

  it('reversionValue: $1.2M NOI / 6.5% cap', () => {
    expect(reversionValue(1_200_000, 0.065)).toBeCloseTo(1_200_000 / 0.065, 4);
  });

  it('operatingExpenseRatio: $400k opex / $1M EGI = 40%', () => {
    expect(operatingExpenseRatio(400_000, 1_000_000)).toBeCloseTo(0.4, 10);
  });

  it('noiFromOer: EGI $1M @ 40% OER = $600k NOI', () => {
    expect(noiFromOer(1_000_000, 0.4)).toBeCloseTo(600_000, 6);
  });

  it('perUnit: $X / N units', () => {
    expect(perUnit(240_000, 120)).toBe(2_000);
  });
});
