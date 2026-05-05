import { describe, it, expect } from 'vitest';
import { gradeSubmission, withinTolerance, buildSheet } from '../grade';
import { dcfFiveYrSuburbanOffice } from '../templates/dcfFiveYrSuburbanOffice';
import { loanSizingThreeConstraint } from '../templates/loanSizingThreeConstraint';

describe('withinTolerance', () => {
  it('passes within absolute tolerance', () => {
    expect(withinTolerance(100, 99.6, { abs: 0.5 })).toBe(true);
    expect(withinTolerance(100, 99.4, { abs: 0.5 })).toBe(false);
  });
  it('passes within relative tolerance', () => {
    expect(withinTolerance(102, 100, { rel: 0.025 })).toBe(true);
    expect(withinTolerance(105, 100, { rel: 0.025 })).toBe(false);
  });
  it('handles zero expected with relative tolerance', () => {
    expect(withinTolerance(0.001, 0, { rel: 0.01 })).toBe(true);
    expect(withinTolerance(0.05, 0, { rel: 0.01 })).toBe(false);
  });
  it('rejects NaN/Infinity', () => {
    expect(withinTolerance(NaN, 100, { rel: 0.05 })).toBe(false);
    expect(withinTolerance(Infinity, 100, { rel: 0.05 })).toBe(false);
  });
});

describe('gradeSubmission — empty sheet', () => {
  it('reports all outputs as missing and fails', () => {
    const result = gradeSubmission(dcfFiveYrSuburbanOffice, {});
    expect(result.passed).toBe(false);
    expect(result.outputsCorrect).toBe(0);
    expect(result.outputsTotal).toBe(dcfFiveYrSuburbanOffice.outputs.length);
    for (const o of result.outputs) expect(o.grade).toBe('missing');
    for (const cp of result.checkpoints) expect(cp.grade).toBe('missing');
  });
});

// Canonical correct formulas for the 5-yr DCF template.
const correctDcfFormulas: Record<string, string> = {
  // NOI roll
  B15: '=B3',
  C15: '=B15*(1+B4)',
  D15: '=C15*(1+B4)',
  E15: '=D15*(1+B4)',
  F15: '=E15*(1+B4)',
  // Debt service — constant for fully-amortizing loan
  B16: '=-PMT(B9,B10,B8)',
  C16: '=B16',
  D16: '=B16',
  E16: '=B16',
  F16: '=B16',
  // Exit
  B19: '=F15/B5',
  B20: '=B19*B6',
  B21: '=B8*(1+B9)^5+PMT(B9,B10,B8)*((1+B9)^5-1)/B9',
  B22: '=B19-B20-B21',
  // Levered CF series Y0..Y5
  B26: '=-(B2-B8)',
  C26: '=B15-B16',
  D26: '=C15-C16',
  E26: '=D15-D16',
  F26: '=E15-E16',
  G26: '=F15-F16+B22',
  // Returns
  B29: '=IRR(B26:G26)',
  B30: '=SUM(C26:G26)/(B2-B8)',
};

describe('gradeSubmission — DCF 5-yr template, canonical correct formulas', () => {
  const result = gradeSubmission(dcfFiveYrSuburbanOffice, correctDcfFormulas);

  it('passes all outputs', () => {
    expect(result.passed).toBe(true);
    expect(result.outputsCorrect).toBe(result.outputsTotal);
    for (const o of result.outputs) {
      expect(o.grade, `${o.ref} ${o.label}`).toBe('pass');
    }
  });

  it('passes all checkpoints', () => {
    for (const cp of result.checkpoints) {
      expect(cp.grade, `${cp.ref} ${cp.label}`).toBe('pass');
    }
  });

  it('resolves intermediate cells to expected values', () => {
    const { sheet } = buildSheet(dcfFiveYrSuburbanOffice, correctDcfFormulas);
    // Year-5 NOI compounded 4× at 3% from $3M
    expect(sheet['F15']).toBeCloseTo(3_000_000 * Math.pow(1.03, 4), 0);
    // Annual debt service positive
    expect(sheet['B16']).toBeGreaterThan(2_300_000);
    expect(sheet['B16']).toBeLessThan(2_400_000);
  });
});

describe('gradeSubmission — DCF 5-yr template, deliberately wrong loan balance', () => {
  // User uses the wrong amortization formula (loan − cumulative PMT, the
  // common interview error). Should fail the loan-balance checkpoint AND the
  // downstream Net sale proceeds + Levered IRR + Equity multiple outputs.
  const wrongFormulas: Record<string, string> = {
    ...correctDcfFormulas,
    B21: '=B8-(-PMT(B9,B10,B8))*5',
  };
  const result = gradeSubmission(dcfFiveYrSuburbanOffice, wrongFormulas);

  it('fails overall', () => {
    expect(result.passed).toBe(false);
  });

  it('flags Net sale proceeds + Levered IRR + Equity multiple as wrong', () => {
    const byRef = new Map(result.outputs.map((o) => [o.ref, o]));
    expect(byRef.get('B22')?.grade).toBe('fail');
    expect(byRef.get('B29')?.grade).toBe('fail');
    expect(byRef.get('B30')?.grade).toBe('fail');
  });

  it('flags the loan-balance checkpoint as wrong', () => {
    const cp = result.checkpoints.find((c) => c.ref === 'B21');
    expect(cp?.grade).toBe('fail');
  });

  it('Year-5 NOI and Exit value still pass — they do not depend on loan balance', () => {
    const byRef = new Map(result.outputs.map((o) => [o.ref, o]));
    expect(byRef.get('F15')?.grade).toBe('pass');
    expect(byRef.get('B19')?.grade).toBe('pass');
  });
});

// Canonical correct formulas for the loan-sizing template.
const correctLoanSizingFormulas: Record<string, string> = {
  B11: '=B7/(1-(1+B7)^-B8)',
  B14: '=B2/B4/B11',
  B15: '=B3*B5',
  B16: '=B2/B6',
  B19: '=MIN(B14:B16)',
  B22: '=B2/B4',
  B23: '=B2/(B15*B11)',
};

describe('gradeSubmission — Loan sizing template, canonical correct formulas', () => {
  const result = gradeSubmission(loanSizingThreeConstraint, correctLoanSizingFormulas);

  it('passes all outputs and checkpoints', () => {
    expect(result.passed).toBe(true);
    for (const o of result.outputs) {
      expect(o.grade, `${o.ref} ${o.label}`).toBe('pass');
    }
    for (const cp of result.checkpoints) {
      expect(cp.grade, `${cp.ref} ${cp.label}`).toBe('pass');
    }
  });

  it('confirms DSCR is the binding constraint', () => {
    const { sheet } = buildSheet(loanSizingThreeConstraint, correctLoanSizingFormulas);
    expect(sheet['B14']).toBeLessThan(sheet['B15']!);
    expect(sheet['B14']).toBeLessThan(sheet['B16']!);
    expect(sheet['B19']).toBeCloseTo(sheet['B14']!, 0);
    // Implied DSCR at LTV max should be well below 1.25
    expect(sheet['B23']).toBeLessThan(1.25);
    expect(sheet['B23']).toBeGreaterThan(1.05);
  });
});

describe('gradeSubmission — Loan sizing, wrong loan constant', () => {
  // Common error: forget the (1 - (1+r)^-n) denominator and just use rate.
  const wrong: Record<string, string> = {
    ...correctLoanSizingFormulas,
    B11: '=B7',
  };
  const result = gradeSubmission(loanSizingThreeConstraint, wrong);

  it('fails the loan constant output', () => {
    const o = result.outputs.find((x) => x.ref === 'B11');
    expect(o?.grade).toBe('fail');
  });

  it('cascades: DSCR-constrained max loan and final max loan also fail', () => {
    const byRef = new Map(result.outputs.map((o) => [o.ref, o]));
    expect(byRef.get('B14')?.grade).toBe('fail');
    expect(byRef.get('B19')?.grade).toBe('fail');
  });

  it('LTV and debt-yield max-loans still pass — they do not depend on the loan constant', () => {
    const byRef = new Map(result.outputs.map((o) => [o.ref, o]));
    expect(byRef.get('B15')?.grade).toBe('pass');
    expect(byRef.get('B16')?.grade).toBe('pass');
  });
});

describe('gradeSubmission — handles parse errors without crashing', () => {
  const result = gradeSubmission(dcfFiveYrSuburbanOffice, {
    ...correctDcfFormulas,
    F15: '=garbage formula',
  });
  it('reports parseError grade for the malformed cell', () => {
    const o = result.outputs.find((x) => x.ref === 'F15');
    expect(o?.grade).toBe('parseError');
  });
  it('still grades other outputs that do not depend on the broken cell', () => {
    // B19 (exit value) depends on F15 — so it should also fail (parseError or fail)
    // but the IRR series cells (B26:G26) reference F15 indirectly via F26
    // Ensure no crash and a coherent result is returned.
    expect(result.outputs.length).toBe(dcfFiveYrSuburbanOffice.outputs.length);
  });
});
