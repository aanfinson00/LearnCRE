import { describe, it, expect } from 'vitest';
import {
  pricePerSf,
  allInBasis,
  totalProjectCost,
  yieldOnCost,
  developmentSpread,
  replacementCost,
} from '../basis';

describe('math/basis', () => {
  it('price/SF = price / SF', () => {
    expect(pricePerSf(50_000_000, 250_000)).toBe(200);
    expect(pricePerSf(12_000_000, 100_000)).toBe(120);
  });

  it('all-in basis adds capex + closing costs', () => {
    expect(
      allInBasis({
        purchasePrice: 15_000_000,
        capex: 2_000_000,
        closingCostRate: 0.02,
        buildingSf: 150_000,
      }),
    ).toBeCloseTo((15_000_000 + 2_000_000 + 300_000) / 150_000, 6);
  });

  it('total project cost composes', () => {
    expect(
      totalProjectCost({ purchasePrice: 10_000_000, capex: 1_000_000, closingCostRate: 0.025 }),
    ).toBeCloseTo(11_250_000, 6);
  });

  it('yield-on-cost = NOI / total cost', () => {
    expect(yieldOnCost(3_000_000, 50_000_000)).toBeCloseTo(0.06, 10);
  });

  it('development spread = YoC − market cap', () => {
    expect(developmentSpread(0.08, 0.05)).toBeCloseTo(0.03, 10);
    expect(developmentSpread(0.05, 0.06)).toBeCloseTo(-0.01, 10);
  });

  it('replacement cost = $/SF × SF', () => {
    expect(replacementCost(275, 200_000)).toBe(55_000_000);
  });

  it('round trip: allInBasis × SF matches totalProjectCost', () => {
    const params = {
      purchasePrice: 20_000_000,
      capex: 3_000_000,
      closingCostRate: 0.015,
      buildingSf: 175_000,
    };
    expect(allInBasis(params) * params.buildingSf).toBeCloseTo(totalProjectCost(params), 4);
  });
});
