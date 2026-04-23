import { describe, it, expect } from 'vitest';
import {
  capCompressionPctChange,
  vacancyNoiDelta,
  rentNoiDelta,
  otherIncomeValueDelta,
  opexValueDelta,
  valueDeltaFromNoiDelta,
  pctValueChange,
} from '../sensitivity';

describe('math/sensitivity', () => {
  it('cap compression: 5.3% → 5.0% = +6% value', () => {
    expect(capCompressionPctChange(0.053, 0.05)).toBeCloseTo(0.06, 10);
  });

  it('cap expansion: 5% → 5.5% = -~9.09% value', () => {
    expect(capCompressionPctChange(0.05, 0.055)).toBeCloseTo(-0.0909, 3);
  });

  it('vacancy NOI delta: 2pt vacancy rise reduces NOI by 2% * gross', () => {
    expect(
      vacancyNoiDelta({
        gpr: 1_000_000,
        otherIncome: 50_000,
        oldVacancy: 0.05,
        newVacancy: 0.07,
      }),
    ).toBeCloseTo(-21_000, 6);
  });

  it('rent NOI delta: $50k rent lift at 5% vacancy = $47.5k NOI', () => {
    expect(
      rentNoiDelta({ oldRent: 1_000_000, newRent: 1_050_000, vacancyRate: 0.05 }),
    ).toBeCloseTo(47_500, 6);
  });

  it('other income of $100k at 6% cap and 0% vacancy → ~$1.667M value', () => {
    expect(
      otherIncomeValueDelta({ otherIncomeDelta: 100_000, vacancyRate: 0, capRate: 0.06 }),
    ).toBeCloseTo(1_666_666.67, 1);
  });

  it('opex increase of $50k at 6% cap = -$833,333 value', () => {
    expect(opexValueDelta({ opexDelta: 50_000, capRate: 0.06 })).toBeCloseTo(-833_333.33, 1);
  });

  it('valueDeltaFromNoiDelta: $100k NOI at 5% cap = $2M', () => {
    expect(valueDeltaFromNoiDelta(100_000, 0.05)).toBe(2_000_000);
  });

  it('pctValueChange', () => {
    expect(pctValueChange(10_000_000, 11_000_000)).toBeCloseTo(0.1, 10);
  });
});
