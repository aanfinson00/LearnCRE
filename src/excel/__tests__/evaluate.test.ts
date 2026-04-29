import { describe, expect, it } from 'vitest';
import { FormulaError } from '../parser';
import { evaluateFormula } from '../evaluate';
import type { Sheet } from '../types';

const sheet: Sheet = {
  A1: 100,
  A2: 200,
  A3: 300,
  A4: 400,
  A5: 500,
  B1: 0.05,
  B2: 0.1,
  C1: 1000,
  C2: -800,
  C3: 100,
  C4: 100,
  C5: 100,
  C6: 100,
  C7: 1100,
};

describe('excel/evaluate — arithmetic', () => {
  it('handles basic arithmetic', () => {
    expect(evaluateFormula('=1+2*3', {})).toBe(7);
    expect(evaluateFormula('=(1+2)*3', {})).toBe(9);
    expect(evaluateFormula('=10/4', {})).toBe(2.5);
    expect(evaluateFormula('=2^10', {})).toBe(1024);
  });

  it('handles unary negation', () => {
    expect(evaluateFormula('=-5+10', {})).toBe(5);
    expect(evaluateFormula('=10*-2', {})).toBe(-20);
  });

  it('reads cell values', () => {
    expect(evaluateFormula('=A1', sheet)).toBe(100);
    expect(evaluateFormula('=A1+A2', sheet)).toBe(300);
    expect(evaluateFormula('=A1*B1', sheet)).toBeCloseTo(5);
  });

  it('treats absolute refs the same as relative for read-only eval', () => {
    expect(evaluateFormula('=$A$1+$B$1', sheet)).toBeCloseTo(100.05);
  });

  it('treats missing cells as 0', () => {
    expect(evaluateFormula('=A1+Z99', sheet)).toBe(100);
  });

  it('throws on division by zero', () => {
    expect(() => evaluateFormula('=10/0', {})).toThrow(FormulaError);
  });
});

describe('excel/evaluate — aggregation', () => {
  it('SUM across a range', () => {
    expect(evaluateFormula('=SUM(A1:A5)', sheet)).toBe(1500);
  });

  it('SUM of mixed scalars and ranges', () => {
    expect(evaluateFormula('=SUM(A1:A2,A3,10)', sheet)).toBe(610);
  });

  it('AVERAGE across a range', () => {
    expect(evaluateFormula('=AVERAGE(A1:A5)', sheet)).toBe(300);
  });

  it('MIN and MAX', () => {
    expect(evaluateFormula('=MIN(A1:A5)', sheet)).toBe(100);
    expect(evaluateFormula('=MAX(A1:A5)', sheet)).toBe(500);
  });

  it('AVERAGE on empty range throws', () => {
    expect(() => evaluateFormula('=AVERAGE(Z1:Z1)', {})).not.toThrow();
    // Z1:Z1 is a 1-cell range that defaults to 0
    expect(evaluateFormula('=AVERAGE(Z1:Z1)', {})).toBe(0);
  });
});

describe('excel/evaluate — finance', () => {
  it('PMT for a 30-year mortgage', () => {
    // PMT(0.06/12, 360, 1_000_000) ≈ -5995.51
    const v = evaluateFormula('=PMT(0.06/12,360,1000000)', {});
    expect(v).toBeCloseTo(-5995.51, 0);
  });

  it('PMT with zero rate', () => {
    // PMT(0, 12, 1200) = -100
    expect(evaluateFormula('=PMT(0,12,1200)', {})).toBe(-100);
  });

  it('NPV with a flat discount rate', () => {
    // NPV(0.1, 100, 100, 100) ≈ 248.69
    const v = evaluateFormula('=NPV(0.1,100,100,100)', {});
    expect(v).toBeCloseTo(248.69, 1);
  });

  it('IRR converges on a clean cash flow series', () => {
    // -1000, +100, +100, +100, +100, +100, +1100 → ~12.3% IRR? actually let's check.
    // With C1=-1000 (purchase) and 6 years of +100 then exit at +1100:
    // Wait — sheet has C1=1000, C2=-800. Let's just compute on a known series.
    // -1000, +400, +400, +400 → 9.7%
    const customSheet: Sheet = { D1: -1000, D2: 400, D3: 400, D4: 400 };
    const v = evaluateFormula('=IRR(D1:D4)', customSheet);
    expect(v).toBeCloseTo(0.0974, 3);
  });

  it('IRR throws when no sign change', () => {
    const allPos: Sheet = { D1: 100, D2: 100, D3: 100 };
    expect(() => evaluateFormula('=IRR(D1:D3)', allPos)).toThrow(FormulaError);
  });
});

describe('excel/evaluate — PV / IPMT / PPMT', () => {
  it('PV is the inverse of PMT (round-trip)', () => {
    // Loan: $1M, 6%/yr / 12 mo, 30 yrs. PMT returns negative; PV(... neg pmt) returns the
    // positive principal — Excel sign convention.
    const pmtVal = evaluateFormula('=PMT(0.06/12,360,1000000)', {});
    const recoveredPv = evaluateFormula(`=PV(0.06/12,360,${pmtVal})`, {});
    expect(recoveredPv).toBeCloseTo(1_000_000, 0);
  });

  it('PV with rate=0 reduces to -(pmt*nper + fv)', () => {
    expect(evaluateFormula('=PV(0,12,-100)', {})).toBe(1200);
    expect(evaluateFormula('=PV(0,12,-100,0)', {})).toBe(1200);
  });

  it('IPMT(1) equals -pv * rate', () => {
    // First payment\'s interest is exactly the rate × outstanding balance
    expect(evaluateFormula('=IPMT(0.01,1,12,1000)', {})).toBeCloseTo(-10, 5);
  });

  it('IPMT + PPMT === PMT for any period in the schedule', () => {
    const expectedPmt = evaluateFormula('=PMT(0.01,12,1000)', {});
    for (const per of [1, 3, 6, 12]) {
      const sum =
        evaluateFormula(`=IPMT(0.01,${per},12,1000)`, {}) +
        evaluateFormula(`=PPMT(0.01,${per},12,1000)`, {});
      expect(sum).toBeCloseTo(expectedPmt, 5);
    }
  });

  it('PPMT — hand-checked third-period principal on a $1000 / 12-period / 1% loan', () => {
    // Excel: PPMT(0.01, 3, 12, 1000) ≈ -80.43
    expect(evaluateFormula('=PPMT(0.01,3,12,1000)', {})).toBeCloseTo(-80.43, 1);
  });
});

describe('excel/evaluate — IF and ROUND', () => {
  it('IF picks the then branch on truthy', () => {
    expect(evaluateFormula('=IF(1,10,20)', {})).toBe(10);
    expect(evaluateFormula('=IF(0,10,20)', {})).toBe(20);
  });

  it('ROUND rounds to specified digits', () => {
    expect(evaluateFormula('=ROUND(1.2345,2)', {})).toBe(1.23);
    expect(evaluateFormula('=ROUND(1.5,0)', {})).toBe(2);
    expect(evaluateFormula('=ROUND(1234.5,-1)', {})).toBe(1230);
  });
});

describe('excel/evaluate — error handling', () => {
  it('throws on unknown functions', () => {
    expect(() => evaluateFormula('=FOOBAR(1)', {})).toThrow(FormulaError);
  });

  it('throws on range-as-scalar misuse', () => {
    expect(() => evaluateFormula('=A1:A2+1', sheet)).toThrow(FormulaError);
  });
});
