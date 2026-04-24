import { describe, it, expect } from 'vitest';
import {
  netEffectiveRent,
  effectiveRentCostPerSf,
  tiVsRentDelta,
  requiredRentPremiumPerSf,
  rentRollNoiChange,
  rentRollValueChange,
  taxReassessmentValueImpact,
} from '../lease';

describe('math/lease', () => {
  it('NER: $20/SF, 5yr, $15 TI, 3 free months', () => {
    const ner = netEffectiveRent({
      grossRentPerSf: 20,
      leaseTermYears: 5,
      tiPerSf: 15,
      freeMonths: 3,
    });
    // Gross total over 5y = $100/SF. TI = $15. Free rent 3 mo × ($20/12) = $5.
    // Net total = $100 - $15 - $5 = $80/SF over 60 months = $16/SF/yr.
    expect(ner).toBeCloseTo(16, 6);
  });

  it('NER: no TI, no free rent → face rent', () => {
    expect(
      netEffectiveRent({ grossRentPerSf: 25, leaseTermYears: 7, tiPerSf: 0, freeMonths: 0 }),
    ).toBeCloseTo(25, 10);
  });

  it('effectiveRentCostPerSf: TI annualizes across lease', () => {
    expect(
      effectiveRentCostPerSf({ rentPerSf: 20, tiPerSf: 15, leaseTermYears: 5 }),
    ).toBeCloseTo(17, 10);
  });

  it('tiVsRentDelta: negative means option A is cheaper', () => {
    // A: $20, no TI → effective $20/yr
    // B: $18, $30 TI over 5y → effective $18 - $6 = $12/yr
    // A - B = $8 → A costs $8/SF/yr MORE → landlord prefers A, tenant prefers B
    expect(
      tiVsRentDelta({ rentA: 20, tiA: 0, rentB: 18, tiB: 30, leaseTermYears: 5 }),
    ).toBeCloseTo(8, 10);
  });

  it('requiredRentPremiumPerSf: $25 TI / 3yr payback = $8.33/SF', () => {
    expect(requiredRentPremiumPerSf({ tiPerSf: 25, paybackYears: 3 })).toBeCloseTo(8.333, 3);
  });

  it('rentRollNoiChange: $1/SF × 100k SF × 95% = $95k', () => {
    expect(
      rentRollNoiChange({
        oldRentPerSf: 7,
        newRentPerSf: 8,
        subjectSf: 100_000,
        vacancy: 0.05,
      }),
    ).toBeCloseTo(95_000, 6);
  });

  it('rentRollValueChange: NOI change / cap', () => {
    expect(
      rentRollValueChange({
        oldRentPerSf: 7,
        newRentPerSf: 8,
        subjectSf: 100_000,
        vacancy: 0.05,
        capRate: 0.06,
      }),
    ).toBeCloseTo(95_000 / 0.06, 4);
  });

  it('taxReassessmentValueImpact: $30M @ 1.25% reassess vs $200k old tax @ 5.5% cap', () => {
    const impact = taxReassessmentValueImpact({
      purchasePrice: 30_000_000,
      oldAnnualTax: 200_000,
      newTaxRate: 0.0125,
      capRate: 0.055,
    });
    // New tax: $375k. Delta: +$175k → negative value impact.
    expect(impact).toBeCloseTo(-175_000 / 0.055, 4);
  });
});
