import { describe, expect, it } from 'vitest';
import {
  gpCatchUp,
  gpEffectivePromote,
  prefAccrual,
  runWaterfall,
  splitDollars,
} from '../waterfall';

describe('prefAccrual', () => {
  it('compounds at the stated rate over the hold', () => {
    // $10M @ 8% over 5 years compound: 10M × ((1.08)^5 - 1) ≈ 4,693,280
    const v = prefAccrual(10_000_000, 0.08, 5, 'compound');
    expect(v).toBeGreaterThan(4_690_000);
    expect(v).toBeLessThan(4_700_000);
  });

  it('simple accrual = capital × rate × years', () => {
    expect(prefAccrual(10_000_000, 0.08, 5, 'simple')).toBe(4_000_000);
  });

  it('compound > simple over multi-year holds at the same rate', () => {
    const c = prefAccrual(10_000_000, 0.08, 5, 'compound');
    const s = prefAccrual(10_000_000, 0.08, 5, 'simple');
    expect(c).toBeGreaterThan(s);
  });

  it('returns 0 for zero hold or zero rate', () => {
    expect(prefAccrual(10_000_000, 0, 5, 'compound')).toBe(0);
    expect(prefAccrual(10_000_000, 0.08, 0, 'compound')).toBe(0);
  });
});

describe('gpCatchUp', () => {
  it('full catch-up to 20% target = pref × 0.20 / 0.80', () => {
    // $4.69M pref, 20% target → $4.69M × 0.25 = $1.17M
    const c = gpCatchUp(4_690_000, 0.20);
    expect(c).toBeCloseTo(1_172_500, -2);
  });

  it('catch-up returns 0 when target = 0 or pref = 0', () => {
    expect(gpCatchUp(1_000_000, 0)).toBe(0);
    expect(gpCatchUp(0, 0.20)).toBe(0);
  });

  it('after catch-up, GP ends with exactly target % of (pref + cat-up)', () => {
    const pref = 5_000_000;
    const target = 0.20;
    const c = gpCatchUp(pref, target);
    const gpShare = c / (pref + c);
    expect(gpShare).toBeCloseTo(target, 6);
  });
});

describe('splitDollars', () => {
  it('splits residual at the stated ratio', () => {
    const r = splitDollars(10_000_000, { lp: 0.8, gp: 0.2 });
    expect(r.lp).toBe(8_000_000);
    expect(r.gp).toBe(2_000_000);
  });

  it('returns zeros for non-positive residual', () => {
    expect(splitDollars(0, { lp: 0.8, gp: 0.2 })).toEqual({ lp: 0, gp: 0 });
    expect(splitDollars(-5, { lp: 0.8, gp: 0.2 })).toEqual({ lp: 0, gp: 0 });
  });
});

describe('gpEffectivePromote', () => {
  it('zero promote when GP take equals pro-rata share', () => {
    // 10% capital, 10% of profit → no promote
    const p = gpEffectivePromote({
      gpTake: 1_000_000 + 100_000, // capital + 10% of $1M profit
      gpCapital: 1_000_000,
      lpCapital: 9_000_000,
      totalDistributable: 11_000_000, // $1M total profit
    });
    expect(p).toBeCloseTo(0, -1);
  });

  it('positive promote when GP exceeds pro-rata', () => {
    // 10% cap, but GP took $300k of $1M profit → $200k of promote
    const p = gpEffectivePromote({
      gpTake: 1_000_000 + 300_000,
      gpCapital: 1_000_000,
      lpCapital: 9_000_000,
      totalDistributable: 11_000_000,
    });
    expect(p).toBeCloseTo(200_000, -1);
  });

  it('clamps to 0 when totalProfit is negative', () => {
    const p = gpEffectivePromote({
      gpTake: 0,
      gpCapital: 1_000_000,
      lpCapital: 9_000_000,
      totalDistributable: 5_000_000, // loss
    });
    expect(p).toBe(0);
  });
});

describe('runWaterfall — 3-tier American', () => {
  const baseInputs = {
    lpCapital: 20_000_000,
    gpCapital: 2_200_000,
    prefRate: 0.08,
    prefAccrual: 'compound' as const,
    catchUpTargetGpPct: 0.20,
    aboveSplit: { lp: 0.8, gp: 0.2 },
    holdYears: 5,
  };

  it('LP + GP totals equal total distributable', () => {
    const r = runWaterfall({ ...baseInputs, totalDistributable: 40_000_000 });
    expect(r.lpTotal + r.gpTotal).toBeCloseTo(40_000_000, 0);
  });

  it('produces a 4-tier breakdown when there is residual above the catch-up', () => {
    const r = runWaterfall({ ...baseInputs, totalDistributable: 40_000_000 });
    // Tiers: pref + ROC + cat-up + above-split
    expect(r.tiers).toHaveLength(4);
    expect(r.prefDue).toBeGreaterThan(0);
    expect(r.catchUp).toBeGreaterThan(0);
    expect(r.aboveSplitResidual).toBeGreaterThan(0);
  });

  it('skips the catch-up tier when target = 0', () => {
    const r = runWaterfall({
      ...baseInputs,
      catchUpTargetGpPct: 0,
      totalDistributable: 40_000_000,
    });
    // Pref + ROC + above-split (no cat-up)
    expect(r.tiers).toHaveLength(3);
    expect(r.catchUp).toBe(0);
  });

  it('caps pref at available cash (no over-distribution)', () => {
    // Distributable is less than pref due — pref tier consumes everything
    const r = runWaterfall({ ...baseInputs, totalDistributable: 1_000_000 });
    expect(r.lpTotal).toBeCloseTo(1_000_000, 0);
    expect(r.gpTotal).toBe(0);
    expect(r.aboveSplitResidual).toBe(0);
  });

  it('GP earns positive promote on a profitable deal', () => {
    const r = runWaterfall({ ...baseInputs, totalDistributable: 40_000_000 });
    expect(r.gpPromote).toBeGreaterThan(0);
  });

  it('matches a textbook example to within $25k', () => {
    // $20M LP + $2.2M GP, 8% compound pref over 5y, 100% cat-up to 20%, 80/20.
    // Total distributable: $40M.
    //   Pref due: 20M × ((1.08)^5 - 1) ≈ 9.386M
    //   ROC pool: 22.2M (full)
    //   Cat-up: 9.386M × 0.20/0.80 ≈ 2.347M
    //   Above-split residual: 40 - 9.386 - 22.2 - 2.347 = 6.067M
    //   80/20: LP +4.854M, GP +1.213M
    // LP total: 9.386 + 20 + 0 + 4.854 = 34.240M
    // GP total: 0 + 2.2 + 2.347 + 1.213 = 5.760M
    const r = runWaterfall({ ...baseInputs, totalDistributable: 40_000_000 });
    expect(r.lpTotal).toBeGreaterThan(34_215_000);
    expect(r.lpTotal).toBeLessThan(34_265_000);
    expect(r.gpTotal).toBeGreaterThan(5_735_000);
    expect(r.gpTotal).toBeLessThan(5_785_000);
  });
});
