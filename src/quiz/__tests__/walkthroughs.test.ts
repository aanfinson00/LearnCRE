import { describe, it, expect } from 'vitest';
import { walkthroughs } from '../walkthroughs';
import { scoreStep } from '../../hooks/useWalkthrough';
import { egi, noi as computeNoi, value as computeValue } from '../../math/core';
import { loanConstant, maxLoanByDscr } from '../../math/debt';

describe('quiz/walkthroughs', () => {
  it('combinedScenario walkthrough has 4 steps', () => {
    const w = walkthroughs.find((x) => x.kind === 'combinedScenarioWalk')!;
    expect(w).toBeDefined();
    expect(w.steps).toHaveLength(4);
  });

  it('combinedScenario step expecteds match math primitives', () => {
    const w = walkthroughs.find((x) => x.kind === 'combinedScenarioWalk')!;
    const ctx = w.context;
    const gross = (ctx.gpr ?? 0) + (ctx.otherIncome ?? 0);
    const egiVal = egi({
      gpr: ctx.gpr!,
      otherIncome: ctx.otherIncome,
      vacancyRate: ctx.vacancyRate!,
    });
    const noiVal = computeNoi({
      gpr: ctx.gpr!,
      otherIncome: ctx.otherIncome,
      vacancyRate: ctx.vacancyRate!,
      opex: ctx.opex!,
    });
    const valueVal = computeValue(noiVal, ctx.capRate!);

    expect(w.steps[0].expected).toBe(gross);
    expect(w.steps[1].expected).toBeCloseTo(egiVal, 6);
    expect(w.steps[2].expected).toBeCloseTo(noiVal, 6);
    expect(w.steps[3].expected).toBeCloseTo(valueVal, 6);
  });

  it('dscr walkthrough has 3 steps and matches debt math', () => {
    const w = walkthroughs.find((x) => x.kind === 'dscrLoanSizingWalk')!;
    expect(w.steps).toHaveLength(3);
    const ctx = w.context;
    const constantBps = Math.round(loanConstant(ctx.interestRate!, ctx.amortYears!) * 10_000);
    expect(w.steps[0].expected).toBe(constantBps);
    expect(w.steps[1].expected).toBeCloseTo(ctx.noi! / ctx.dscrTarget!, 6);
    expect(w.steps[2].expected).toBeCloseTo(
      maxLoanByDscr({
        noi: ctx.noi!,
        dscrTarget: ctx.dscrTarget!,
        annualRate: ctx.interestRate!,
        years: ctx.amortYears!,
      }),
      4,
    );
  });

  it('scoreStep: within pct band → correct', () => {
    expect(
      scoreStep(105, 100, { type: 'pct', band: 0.05 }, false).correct,
    ).toBe(true);
  });

  it('scoreStep: outside pct band → incorrect', () => {
    expect(
      scoreStep(110, 100, { type: 'pct', band: 0.05 }, false).correct,
    ).toBe(false);
  });

  it('scoreStep: skipped → incorrect', () => {
    expect(scoreStep(100, 100, { type: 'pct', band: 0.05 }, true).correct).toBe(false);
  });

  it('scoreStep: within abs band (bps)', () => {
    expect(
      scoreStep(720, 720, { type: 'abs', band: 15 }, false).correct,
    ).toBe(true);
    expect(
      scoreStep(700, 720, { type: 'abs', band: 15 }, false).correct,
    ).toBe(false);
  });
});
