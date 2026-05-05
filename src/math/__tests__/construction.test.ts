import { describe, expect, it } from 'vitest';
import {
  contingencyRemaining,
  costToCompleteDollars,
  costToCompletePct,
  drawWithRetainage,
  equityFirstDraw,
  pariPassuDraw,
  retainageBalance,
} from '../construction';

describe('costToCompletePct', () => {
  it('returns fraction of budget incurred', () => {
    expect(costToCompletePct(30_000_000, 50_000_000)).toBe(0.6);
  });

  it('caps at 1.0 when overrun', () => {
    expect(costToCompletePct(60_000_000, 50_000_000)).toBe(1.0);
  });

  it('returns 0 for zero budget', () => {
    expect(costToCompletePct(1_000_000, 0)).toBe(0);
  });
});

describe('costToCompleteDollars', () => {
  it('returns remaining budget', () => {
    expect(costToCompleteDollars(50_000_000, 30_000_000)).toBe(20_000_000);
  });

  it('goes negative on overrun', () => {
    expect(costToCompleteDollars(50_000_000, 55_000_000)).toBe(-5_000_000);
  });
});

describe('retainageBalance', () => {
  it('sums retainage at the stated rate across draws', () => {
    expect(retainageBalance([1_000_000, 2_000_000, 3_000_000], 0.1)).toBe(600_000);
  });

  it('returns 0 for 0% retainage', () => {
    expect(retainageBalance([1_000_000, 2_000_000], 0)).toBe(0);
  });
});

describe('contingencyRemaining', () => {
  it('subtracts overruns from contingency', () => {
    expect(contingencyRemaining(2_000_000, [500_000, 500_000])).toBe(1_000_000);
  });

  it('floors at 0 when contingency exhausted', () => {
    expect(contingencyRemaining(2_000_000, [3_000_000])).toBe(0);
  });

  it('ignores negative overruns', () => {
    expect(contingencyRemaining(2_000_000, [500_000, -100_000])).toBe(1_500_000);
  });
});

describe('equityFirstDraw', () => {
  it('funds entirely from equity when equity remaining covers draw', () => {
    const r = equityFirstDraw({
      equityCommitted: 20_000_000,
      equityDrawnSoFar: 5_000_000,
      drawAmount: 5_000_000,
    });
    expect(r).toEqual({ fromEquity: 5_000_000, fromLender: 0 });
  });

  it('splits when draw exceeds equity remaining', () => {
    const r = equityFirstDraw({
      equityCommitted: 20_000_000,
      equityDrawnSoFar: 18_000_000,
      drawAmount: 5_000_000,
    });
    expect(r).toEqual({ fromEquity: 2_000_000, fromLender: 3_000_000 });
  });

  it('funds entirely from lender after equity exhausted', () => {
    const r = equityFirstDraw({
      equityCommitted: 20_000_000,
      equityDrawnSoFar: 20_000_000,
      drawAmount: 5_000_000,
    });
    expect(r).toEqual({ fromEquity: 0, fromLender: 5_000_000 });
  });
});

describe('pariPassuDraw', () => {
  it('splits in committed-capital ratio (60/40 D/E)', () => {
    const r = pariPassuDraw({
      equityCommitted: 20_000_000,
      lenderCommitted: 30_000_000,
      drawAmount: 5_000_000,
    });
    expect(r.fromEquity).toBeCloseTo(2_000_000, 0);
    expect(r.fromLender).toBeCloseTo(3_000_000, 0);
  });

  it('returns zeros for zero total commitment', () => {
    const r = pariPassuDraw({
      equityCommitted: 0,
      lenderCommitted: 0,
      drawAmount: 1_000_000,
    });
    expect(r).toEqual({ fromEquity: 0, fromLender: 0 });
  });
});

describe('drawWithRetainage', () => {
  it('splits draw into funded + held at the retainage rate', () => {
    const r = drawWithRetainage(1_000_000, 0.1);
    expect(r).toEqual({ funded: 900_000, held: 100_000 });
  });

  it('clamps retainage to [0, 1]', () => {
    expect(drawWithRetainage(1_000_000, -0.1)).toEqual({
      funded: 1_000_000,
      held: 0,
    });
    expect(drawWithRetainage(1_000_000, 1.5)).toEqual({
      funded: 0,
      held: 1_000_000,
    });
  });
});
