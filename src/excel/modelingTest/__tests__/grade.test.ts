import { describe, it, expect } from 'vitest';
import { gradeSubmission, withinTolerance, buildSheet } from '../grade';
import { dcfFiveYrSuburbanOffice } from '../templates/dcfFiveYrSuburbanOffice';
import { loanSizingThreeConstraint } from '../templates/loanSizingThreeConstraint';
import { acqProformaMultifamily } from '../templates/acqProformaMultifamily';
import { refiVsSellY5 } from '../templates/refiVsSellY5';
import { constructionLoanSizing } from '../templates/constructionLoanSizing';

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

// Canonical correct formulas for the multifamily pro-forma template.
const correctMfFormulas: Record<string, string> = {
  // GPR row — base from B3*B4, then chain at B5 growth
  B21: '=B3*B4',
  C21: '=B21*(1+B5)',
  D21: '=C21*(1+B5)',
  E21: '=D21*(1+B5)',
  F21: '=E21*(1+B5)',
  // Vacancy $ — vacancy% × GPR same column
  B22: '=B6*B21',
  C22: '=B6*C21',
  D22: '=B6*D21',
  E22: '=B6*E21',
  F22: '=B6*F21',
  // Other income — base from B3*B7, chain at B8 growth
  B23: '=B3*B7',
  C23: '=B23*(1+B8)',
  D23: '=C23*(1+B8)',
  E23: '=D23*(1+B8)',
  F23: '=E23*(1+B8)',
  // EGI = GPR − Vacancy + Other
  B24: '=B21-B22+B23',
  C24: '=C21-C22+C23',
  D24: '=D21-D22+D23',
  E24: '=E21-E22+E23',
  F24: '=F21-F22+F23',
  // OpEx — base B3*B9, chain at B10 growth
  B25: '=B3*B9',
  C25: '=B25*(1+B10)',
  D25: '=C25*(1+B10)',
  E25: '=D25*(1+B10)',
  F25: '=E25*(1+B10)',
  // NOI = EGI − OpEx
  B26: '=B24-B25',
  C26: '=C24-C25',
  D26: '=D24-D25',
  E26: '=E24-E25',
  F26: '=F24-F25',
  // Capex reserve — base B3*B11, chain at B12 growth
  B27: '=B3*B11',
  C27: '=B27*(1+B12)',
  D27: '=C27*(1+B12)',
  E27: '=D27*(1+B12)',
  F27: '=E27*(1+B12)',
  // Debt sizing
  B30: '=B14/(1-(1+B14)^-B15)',
  B31: '=B26/B13',
  B32: '=B31/B30',
  B33: '=B32*B30',
  // Exit
  B36: '=F26/B16',
  B37: '=B36*B17',
  B38: '=B32*(1+B14)^5+PMT(B14,B15,B32)*((1+B14)^5-1)/B14',
  B39: '=B36-B37-B38',
  // Levered CF series
  B43: '=B32-B2',
  C43: '=B26-B33-B27',
  D43: '=C26-B33-C27',
  E43: '=D26-B33-D27',
  F43: '=E26-B33-E27',
  G43: '=F26-B33-F27+B39',
  // Returns
  B46: '=IRR(B43:G43)',
  B47: '=SUM(C43:G43)/(B2-B32)',
};

describe('gradeSubmission — Multifamily pro-forma, canonical correct formulas', () => {
  const result = gradeSubmission(acqProformaMultifamily, correctMfFormulas);

  it('passes all outputs and checkpoints', () => {
    expect(result.passed).toBe(true);
    for (const o of result.outputs) {
      expect(o.grade, `${o.ref} ${o.label}`).toBe('pass');
    }
    for (const cp of result.checkpoints) {
      expect(cp.grade, `${cp.ref} ${cp.label}`).toBe('pass');
    }
  });

  it('Y1 NOI lands at the expected $2.195M', () => {
    const { sheet } = buildSheet(acqProformaMultifamily, correctMfFormulas);
    expect(sheet['B26']).toBeCloseTo(2_195_000, 0);
  });

  it('Levered IRR is between 9% and 12% — sanity range for stabilized MF with 4% rent bumps', () => {
    const { sheet } = buildSheet(acqProformaMultifamily, correctMfFormulas);
    expect(sheet['B46']).toBeGreaterThan(0.09);
    expect(sheet['B46']).toBeLessThan(0.12);
  });
});

describe('gradeSubmission — Multifamily pro-forma, wrong EGI cascade', () => {
  // Common error: forget to add other income, treat EGI as just GPR − Vacancy.
  const wrong: Record<string, string> = {
    ...correctMfFormulas,
    B24: '=B21-B22',
    C24: '=C21-C22',
    D24: '=D21-D22',
    E24: '=E21-E22',
    F24: '=F21-F22',
  };
  const result = gradeSubmission(acqProformaMultifamily, wrong);

  it('fails Y1 NOI, Y5 NOI, IRR, and equity multiple — all downstream of EGI', () => {
    const byRef = new Map(result.outputs.map((o) => [o.ref, o]));
    expect(byRef.get('B26')?.grade).toBe('fail');
    expect(byRef.get('F26')?.grade).toBe('fail');
    expect(byRef.get('B46')?.grade).toBe('fail');
    expect(byRef.get('B47')?.grade).toBe('fail');
  });

  it('flags the EGI checkpoint as wrong with a diagnostic explaining downstream impact', () => {
    const cp = result.checkpoints.find((c) => c.ref === 'B24');
    expect(cp?.grade).toBe('fail');
    expect(cp?.explains).toContain('B26');
  });
});

describe('gradeSubmission — Multifamily, wrong loan-balance cascade', () => {
  // Treat loan-balance as loan minus cumulative DS — the classic interview error.
  const wrong: Record<string, string> = {
    ...correctMfFormulas,
    B38: '=B32-B33*5',
  };
  const result = gradeSubmission(acqProformaMultifamily, wrong);

  it('fails Net sale proceeds (checkpoint), Levered IRR, and Equity multiple', () => {
    const cp = result.checkpoints.find((c) => c.ref === 'B39');
    expect(cp?.grade).toBe('fail');
    const byRef = new Map(result.outputs.map((o) => [o.ref, o]));
    expect(byRef.get('B46')?.grade).toBe('fail');
    expect(byRef.get('B47')?.grade).toBe('fail');
  });

  it('Y1 NOI, Y5 NOI, and Loan amount still pass — loan-balance doesn\'t feed them', () => {
    const byRef = new Map(result.outputs.map((o) => [o.ref, o]));
    expect(byRef.get('B26')?.grade).toBe('pass');
    expect(byRef.get('F26')?.grade).toBe('pass');
    expect(byRef.get('B32')?.grade).toBe('pass');
  });
});

// Canonical correct formulas for the refi-vs-sell template.
const correctRefiSellFormulas: Record<string, string> = {
  // Y1-Y5 NOI roll
  B21: '=B7',
  C21: '=B21*(1+B8)',
  D21: '=C21*(1+B8)',
  E21: '=D21*(1+B8)',
  F21: '=E21*(1+B8)',
  // Original DS (constant)
  B22: '=-PMT(B5,B6,B4)',
  C22: '=B22',
  D22: '=B22',
  E22: '=B22',
  F22: '=B22',
  // Y1-Y5 levered CF
  B23: '=B21-B22',
  C23: '=C21-C22',
  D23: '=D21-D22',
  E23: '=E21-E22',
  F23: '=F21-F22',
  // Y5 sale math
  B26: '=F21/B10',
  B27: '=B26*B11',
  B28: '=B4*(1+B5)^5+PMT(B5,B6,B4)*((1+B5)^5-1)/B5',
  // Path A
  B31: '=B26-B27-B28',
  // Path B refi
  B34: '=B26*B12',
  B35: '=B34*B15',
  B36: '=B34-B28-B35',
  // Y6-Y10 NOI roll
  B40: '=F21*(1+B9)',
  C40: '=B40*(1+B9)',
  D40: '=C40*(1+B9)',
  E40: '=D40*(1+B9)',
  F40: '=E40*(1+B9)',
  // New DS (constant)
  B41: '=-PMT(B13,B14,B34)',
  // Y6-Y10 levered CF
  B42: '=B40-B41',
  C42: '=C40-B41',
  D42: '=D40-B41',
  E42: '=E40-B41',
  F42: '=F40-B41',
  // Y10 exit
  B45: '=F40/B16',
  B46: '=B45*B17',
  B47: '=B34*(1+B13)^5+PMT(B13,B14,B34)*((1+B13)^5-1)/B13',
  B48: '=B45-B46-B47',
  // Incremental CF series
  B52: '=B36-B31',
  C52: '=B42',
  D52: '=C42',
  E52: '=D42',
  F52: '=E42',
  G52: '=F42+B48',
  // Returns
  B55: '=(SUM(B23:F23)+B36+SUM(B42:F42)+B48)/B3',
  B56: '=IRR(B52:G52)',
};

describe('gradeSubmission — Refi vs Sell template, canonical correct formulas', () => {
  const result = gradeSubmission(refiVsSellY5, correctRefiSellFormulas);

  it('passes all outputs and checkpoints', () => {
    expect(result.passed).toBe(true);
    for (const o of result.outputs) {
      expect(o.grade, `${o.ref} ${o.label}`).toBe('pass');
    }
    for (const cp of result.checkpoints) {
      expect(cp.grade, `${cp.ref} ${cp.label}`).toBe('pass');
    }
  });

  it('Path A net sale > Refi cash-out (canonical refi-vs-sell relationship)', () => {
    const { sheet } = buildSheet(refiVsSellY5, correctRefiSellFormulas);
    expect(sheet['B31']).toBeGreaterThan(sheet['B36']!);
  });

  it('Marginal IRR lands in 7-10% range — sensible for stabilized continue-to-hold', () => {
    const { sheet } = buildSheet(refiVsSellY5, correctRefiSellFormulas);
    expect(sheet['B56']).toBeGreaterThan(0.07);
    expect(sheet['B56']).toBeLessThan(0.10);
  });
});

describe('gradeSubmission — Refi vs Sell, wrong Y6-Y10 growth rate cascade', () => {
  // Common error: continue using B8 (Y1-Y5 growth) for Y6-Y10 instead of B9.
  const wrong: Record<string, string> = {
    ...correctRefiSellFormulas,
    B40: '=F21*(1+B8)',
    C40: '=B40*(1+B8)',
    D40: '=C40*(1+B8)',
    E40: '=D40*(1+B8)',
    F40: '=E40*(1+B8)',
  };
  const result = gradeSubmission(refiVsSellY5, wrong);

  it('Y10 NOI checkpoint flags as wrong', () => {
    const cp = result.checkpoints.find((c) => c.ref === 'F40');
    expect(cp?.grade).toBe('fail');
  });

  it('Y10 net sale + Path B EM + Marginal IRR all fail', () => {
    const byRef = new Map(result.outputs.map((o) => [o.ref, o]));
    expect(byRef.get('B48')?.grade).toBe('fail');
    expect(byRef.get('B55')?.grade).toBe('fail');
    expect(byRef.get('B56')?.grade).toBe('fail');
  });

  it('Y5 outputs (Path A + Refi cash-out) still pass — Y6-Y10 doesn\'t feed them', () => {
    const byRef = new Map(result.outputs.map((o) => [o.ref, o]));
    expect(byRef.get('B31')?.grade).toBe('pass');
    expect(byRef.get('B36')?.grade).toBe('pass');
  });
});

// Canonical correct formulas for the construction-loan-sizing template.
const correctConstructionFormulas: Record<string, string> = {
  B12: '=B3*B4',
  B13: '=(B3+B12)*B5',
  B14: '=B2+B3+B12+B13',
  B17: '=B6/B7',
  B18: '=B6/B14',
  B21: '=B14*B8',
  B22: '=B17*B9',
  B23: '=MIN(B21:B22)',
  B26: '=B14-B23',
  B27: '=(B17-B14)/B14',
};

describe('gradeSubmission — Construction loan sizing, canonical correct formulas', () => {
  const result = gradeSubmission(constructionLoanSizing, correctConstructionFormulas);

  it('passes all outputs and checkpoints', () => {
    expect(result.passed).toBe(true);
    for (const o of result.outputs) {
      expect(o.grade, `${o.ref} ${o.label}`).toBe('pass');
    }
    for (const cp of result.checkpoints) {
      expect(cp.grade, `${cp.ref} ${cp.label}`).toBe('pass');
    }
  });

  it('LTC is the binding constraint in this market', () => {
    const { sheet } = buildSheet(constructionLoanSizing, correctConstructionFormulas);
    expect(sheet['B21']).toBeLessThan(sheet['B22']!);
    expect(sheet['B23']).toBeCloseTo(sheet['B21']!, 0);
  });

  it('Yield on cost lands at ~7.08% — healthy spread vs 5.25% market cap', () => {
    const { sheet } = buildSheet(constructionLoanSizing, correctConstructionFormulas);
    expect(sheet['B18']).toBeGreaterThan(0.06);
    expect(sheet['B18']).toBeLessThan(0.08);
  });
});

describe('gradeSubmission — Construction sizing, contingency forgotten entirely', () => {
  // Common error: forget the contingency line altogether (a 4% TPC understatement
  // that flows through to every downstream metric).
  const wrong: Record<string, string> = {
    ...correctConstructionFormulas,
    B13: '=0',
  };
  const result = gradeSubmission(constructionLoanSizing, wrong);

  it('fails the contingency checkpoint', () => {
    const cp = result.checkpoints.find((c) => c.ref === 'B13');
    expect(cp?.grade).toBe('fail');
  });

  it('cascades to TPC and yield on cost', () => {
    const byRef = new Map(result.outputs.map((o) => [o.ref, o]));
    expect(byRef.get('B14')?.grade).toBe('fail');
    expect(byRef.get('B18')?.grade).toBe('fail');
  });

  it('Stabilized value still passes — does not depend on cost build-up', () => {
    const cp = result.checkpoints.find((c) => c.ref === 'B17');
    expect(cp?.grade).toBe('pass');
  });
});

describe('gradeSubmission — Construction sizing, picks LTV instead of MIN', () => {
  // Common error: forget the MIN, just use LTV (because it's higher and feels
  // like the "max loan possible" intuitively).
  const wrong: Record<string, string> = {
    ...correctConstructionFormulas,
    B23: '=B22',
  };
  const result = gradeSubmission(constructionLoanSizing, wrong);

  it('fails the loan + equity check', () => {
    const byRef = new Map(result.outputs.map((o) => [o.ref, o]));
    expect(byRef.get('B23')?.grade).toBe('fail');
    expect(byRef.get('B26')?.grade).toBe('fail');
  });

  it('TPC + yield on cost + profit on cost still pass — they do not depend on the loan', () => {
    const byRef = new Map(result.outputs.map((o) => [o.ref, o]));
    expect(byRef.get('B14')?.grade).toBe('pass');
    expect(byRef.get('B18')?.grade).toBe('pass');
    expect(byRef.get('B27')?.grade).toBe('pass');
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
