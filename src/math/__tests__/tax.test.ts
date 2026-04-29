import { describe, expect, it } from 'vitest';
import { afterTaxSaleProceeds, depreciationStraightLine } from '../tax';
import { irrMulti } from '../returns';

describe('math/tax — depreciationStraightLine', () => {
  it('computes annual depreciation over 27.5-year MF life', () => {
    // $10M depreciable basis, 5 years held → 5 × ($10M / 27.5) = $1.818M
    expect(depreciationStraightLine(10_000_000, 5)).toBeCloseTo(1_818_182, 0);
  });

  it('caps at the asset life — never depreciates more than basis', () => {
    expect(depreciationStraightLine(10_000_000, 30)).toBeCloseTo(10_000_000, 0);
  });

  it('supports commercial 39-year life', () => {
    expect(depreciationStraightLine(10_000_000, 5, 39)).toBeCloseTo(1_282_051, 0);
  });

  it('returns 0 for non-positive basis or years', () => {
    expect(depreciationStraightLine(0, 5)).toBe(0);
    expect(depreciationStraightLine(10_000_000, 0)).toBe(0);
    expect(depreciationStraightLine(-1, 5)).toBe(0);
  });
});

describe('math/tax — afterTaxSaleProceeds', () => {
  it('hand-checked: $10M purchase, $14M sale, $1.8M depreciation', () => {
    const r = afterTaxSaleProceeds({
      purchasePrice: 10_000_000,
      saleProceeds: 14_000_000,
      accumulatedDepreciation: 1_800_000,
    });
    // netSale = 14M × (1 - 0.015) = 13.79M
    // adjustedBasis = 10M - 1.8M = 8.2M
    // totalGain = 13.79M - 8.2M = 5.59M
    // recaptureGain = min(5.59M, 1.8M) = 1.8M
    // capitalGain = 5.59M - 1.8M = 3.79M
    // recaptureTax = 1.8M × 0.25 = 450k
    // capGainsTax = 3.79M × 0.20 = 758k
    // afterTax = 13.79M - 450k - 758k = 12.582M
    expect(r.netSale).toBeCloseTo(13_790_000, 0);
    expect(r.adjustedBasis).toBeCloseTo(8_200_000, 0);
    expect(r.totalGain).toBeCloseTo(5_590_000, 0);
    expect(r.recaptureGain).toBeCloseTo(1_800_000, 0);
    expect(r.capitalGain).toBeCloseTo(3_790_000, 0);
    expect(r.recaptureTax).toBeCloseTo(450_000, 0);
    expect(r.capGainsTax).toBeCloseTo(758_000, 0);
    expect(r.afterTaxProceeds).toBeCloseTo(12_582_000, 0);
  });

  it('caps recapture at total gain when gain < accumulated depreciation', () => {
    // If you sell for less than you bought, recapture is capped at the gain.
    const r = afterTaxSaleProceeds({
      purchasePrice: 10_000_000,
      saleProceeds: 9_500_000,
      accumulatedDepreciation: 1_800_000,
    });
    // netSale = 9.5M × 0.985 = 9.358M
    // adjustedBasis = 8.2M
    // totalGain = 9.358M - 8.2M = 1.158M (positive — recovered some depreciation)
    // recapture = min(1.158M, 1.8M) = 1.158M
    // cap gain = 0
    expect(r.totalGain).toBeCloseTo(1_157_500, 0);
    expect(r.recaptureGain).toBeCloseTo(1_157_500, 0);
    expect(r.capitalGain).toBe(0);
  });

  it('produces no tax on a real loss (sale below adjusted basis)', () => {
    const r = afterTaxSaleProceeds({
      purchasePrice: 10_000_000,
      saleProceeds: 7_000_000,
      accumulatedDepreciation: 1_800_000,
    });
    // netSale ≈ 6.895M; adjusted basis = 8.2M → real loss
    expect(r.totalGain).toBeLessThan(0);
    expect(r.recaptureGain).toBe(0);
    expect(r.capitalGain).toBe(0);
    expect(r.recaptureTax).toBe(0);
    expect(r.capGainsTax).toBe(0);
  });

  it('honors custom rates', () => {
    const r = afterTaxSaleProceeds({
      purchasePrice: 10_000_000,
      saleProceeds: 14_000_000,
      accumulatedDepreciation: 1_800_000,
      recaptureRate: 0.3,
      capGainsRate: 0.25,
    });
    // recaptureTax = 1.8M × 0.30 = 540k
    // capGainsTax = 3.79M × 0.25 = 947.5k
    // afterTax = 13.79M - 540k - 947.5k = 12.3025M
    expect(r.recaptureTax).toBeCloseTo(540_000, 0);
    expect(r.capGainsTax).toBeCloseTo(947_500, 0);
    expect(r.afterTaxProceeds).toBeCloseTo(12_302_500, 0);
  });
});

describe('math/returns — irrMulti', () => {
  it('matches irrSingle for a simple two-period series', () => {
    // -1000, +1500 over implied 1 period → 50%
    expect(irrMulti([-1000, 1500])).toBeCloseTo(0.5, 4);
  });

  it('computes a known multi-period IRR', () => {
    // 10% coupon bond: -1000, 100×5, 100+1000 → exactly 10% IRR
    const r = irrMulti([-1000, 100, 100, 100, 100, 100, 1100]);
    expect(r).toBeCloseTo(0.1, 4);
  });

  it('returns NaN when there is no sign change', () => {
    expect(Number.isNaN(irrMulti([100, 100, 100]))).toBe(true);
    expect(Number.isNaN(irrMulti([-100, -100, -100]))).toBe(true);
  });
});
