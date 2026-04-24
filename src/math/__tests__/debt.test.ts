import { describe, it, expect } from 'vitest';
import {
  loanConstant,
  annualDebtService,
  debtYield,
  maxLoanByDebtYield,
  maxLoanByDscr,
  dscr,
  cashOnCash,
  breakEvenOccupancy,
  leveredIrrApprox,
} from '../debt';

describe('math/debt', () => {
  it('loanConstant: 30yr at 6% monthly amort ≈ 0.0720', () => {
    expect(loanConstant(0.06, 30)).toBeCloseTo(0.07195, 4);
  });

  it('loanConstant: 25yr at 6% ≈ 0.0773', () => {
    expect(loanConstant(0.06, 25)).toBeCloseTo(0.07734, 4);
  });

  it('loanConstant: 30yr at 5% ≈ 0.0644', () => {
    expect(loanConstant(0.05, 30)).toBeCloseTo(0.06442, 4);
  });

  it('annualDebtService: $10M at 6% 30yr ≈ $719.5k', () => {
    expect(annualDebtService(10_000_000, 0.06, 30)).toBeCloseTo(719_461, -2);
  });

  it('debtYield = NOI / Loan', () => {
    expect(debtYield(800_000, 10_000_000)).toBeCloseTo(0.08, 10);
  });

  it('maxLoanByDebtYield: $800k NOI @ 9% → ~$8.89M', () => {
    expect(maxLoanByDebtYield(800_000, 0.09)).toBeCloseTo(8_888_888.89, 2);
  });

  it('maxLoanByDscr: $500k NOI, 1.25 DSCR, 30yr @ 6% → ~$5.56M', () => {
    expect(
      maxLoanByDscr({
        noi: 500_000,
        dscrTarget: 1.25,
        annualRate: 0.06,
        years: 30,
      }),
    ).toBeCloseTo(500_000 / (1.25 * loanConstant(0.06, 30)), 4);
  });

  it('dscr: $500k NOI / $400k DS = 1.25x', () => {
    expect(dscr(500_000, 400_000)).toBeCloseTo(1.25, 10);
  });

  it('cashOnCash: NOI $600k, DS $350k, equity $4M → 6.25%', () => {
    expect(
      cashOnCash({ noi: 600_000, debtServiceAnnual: 350_000, equity: 4_000_000 }),
    ).toBeCloseTo(0.0625, 10);
  });

  it('breakEvenOccupancy: opex + DS over PGI', () => {
    expect(
      breakEvenOccupancy({ opex: 525_000, debtServiceAnnual: 400_000, pgi: 1_500_000 }),
    ).toBeCloseTo(925_000 / 1_500_000, 10);
  });

  it('leveredIrrApprox: unlevered 8%, 60% LTV, 5% borrow → 12.5%', () => {
    expect(
      leveredIrrApprox({ unleveredIrr: 0.08, borrowRate: 0.05, ltv: 0.6 }),
    ).toBeCloseTo(0.08 + (0.6 * 0.03) / 0.4, 10);
  });

  it('leveredIrrApprox: IRR = borrow rate → levered = unlevered', () => {
    expect(
      leveredIrrApprox({ unleveredIrr: 0.05, borrowRate: 0.05, ltv: 0.7 }),
    ).toBeCloseTo(0.05, 10);
  });
});
