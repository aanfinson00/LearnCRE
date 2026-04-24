import { describe, it, expect } from 'vitest';
import { allKinds, templates } from '../templates';
import { createRng } from '../random';
import { value, capRate, noi } from '../../math/core';
import {
  capCompressionPctChange,
  vacancyNoiDelta,
  rentNoiDelta,
  otherIncomeValueDelta,
  opexValueDelta,
  valueDeltaFromNoiDelta,
} from '../../math/sensitivity';
import { equityMultiple, irrSingle, requiredMultiple } from '../../math/returns';
import {
  allInBasis,
  developmentSpread,
  pricePerSf,
  replacementCost,
  yieldOnCost,
} from '../../math/basis';
import {
  annualDebtService,
  breakEvenOccupancy,
  cashOnCash,
  leveredIrrApprox,
  loanConstant,
  maxLoanByDebtYield,
  maxLoanByDscr,
} from '../../math/debt';
import {
  netEffectiveRent,
  requiredRentPremiumPerSf,
  rentRollValueChange,
  taxReassessmentValueImpact,
  tiVsRentDelta,
} from '../../math/lease';

describe('quiz/templates', () => {
  it('every kind has a template', () => {
    for (const kind of allKinds) {
      expect(templates[kind]).toBeDefined();
      expect(templates[kind].kind).toBe(kind);
    }
  });

  it('generators produce questions with matching expected values (1000 seeded questions each)', () => {
    for (const kind of allKinds) {
      const template = templates[kind];
      const rng = createRng(42);
      for (let i = 0; i < 1000; i++) {
        const q = template.generate(rng);
        expect(q.kind).toBe(kind);
        expect(q.prompt).toBeTruthy();
        expect(q.expected).toBeTypeOf('number');
        expect(Number.isFinite(q.expected)).toBe(true);

        const ctx = q.context;
        switch (kind) {
          case 'capCompression': {
            const recomputed = capCompressionPctChange(ctx.capRate!, ctx.newCapRate!);
            expect(q.expected).toBeCloseTo(recomputed, 10);
            break;
          }
          case 'goingInCap': {
            const bps = Math.round(capRate(ctx.purchasePrice!, ctx.noi!) * 10_000);
            expect(q.expected).toBe(bps);
            break;
          }
          case 'vacancySensitivity': {
            const nd = vacancyNoiDelta({
              gpr: ctx.gpr!,
              otherIncome: ctx.otherIncome,
              oldVacancy: ctx.oldVacancy!,
              newVacancy: ctx.newVacancy!,
            });
            expect(q.expected).toBeCloseTo(valueDeltaFromNoiDelta(nd, ctx.capRate!), 6);
            break;
          }
          case 'otherIncomeImpact': {
            const vd = otherIncomeValueDelta({
              otherIncomeDelta: ctx.otherIncome!,
              vacancyRate: ctx.vacancyRate!,
              capRate: ctx.capRate!,
            });
            expect(q.expected).toBeCloseTo(vd, 6);
            break;
          }
          case 'rentChange': {
            const nd = rentNoiDelta({
              oldRent: ctx.oldRent!,
              newRent: ctx.newRent!,
              vacancyRate: ctx.vacancyRate!,
            });
            expect(q.expected).toBeCloseTo(valueDeltaFromNoiDelta(nd, ctx.capRate!), 6);
            break;
          }
          case 'opexChange': {
            const vd = opexValueDelta({
              opexDelta: ctx.opex!,
              capRate: ctx.capRate!,
            });
            expect(q.expected).toBeCloseTo(vd, 6);
            break;
          }
          case 'combinedScenario': {
            const v = value(
              noi({
                gpr: ctx.gpr!,
                otherIncome: ctx.otherIncome,
                vacancyRate: ctx.vacancyRate!,
                opex: ctx.opex!,
              }),
              ctx.capRate!,
            );
            expect(q.expected).toBeCloseTo(v, 6);
            break;
          }
          case 'equityMultiple': {
            expect(q.expected).toBeCloseTo(
              equityMultiple(ctx.equityIn!, ctx.equityOut!),
              10,
            );
            break;
          }
          case 'irrSimple': {
            expect(q.expected).toBeCloseTo(
              irrSingle(ctx.equityIn!, ctx.equityOut!, ctx.holdYears!),
              10,
            );
            break;
          }
          case 'targetMultiple': {
            expect(q.expected).toBeCloseTo(
              requiredMultiple(ctx.targetIrr!, ctx.holdYears!),
              10,
            );
            break;
          }
          case 'pricePerSf': {
            expect(q.expected).toBeCloseTo(pricePerSf(ctx.purchasePrice!, ctx.buildingSf!), 6);
            break;
          }
          case 'allInBasis': {
            expect(q.expected).toBeCloseTo(
              allInBasis({
                purchasePrice: ctx.purchasePrice!,
                capex: ctx.capex!,
                closingCostRate: ctx.closingCostRate!,
                buildingSf: ctx.buildingSf!,
              }),
              6,
            );
            break;
          }
          case 'yieldOnCost': {
            const bps = Math.round(yieldOnCost(ctx.stabilizedNoi ?? ctx.noi!, ctx.totalProjectCost!) * 10_000);
            expect(q.expected).toBe(bps);
            break;
          }
          case 'devSpread': {
            const yoc = yieldOnCost(ctx.stabilizedNoi ?? ctx.noi!, ctx.totalProjectCost!);
            const bps = Math.round(developmentSpread(yoc, ctx.marketCapRate!) * 10_000);
            expect(q.expected).toBe(bps);
            break;
          }
          case 'replacementCost': {
            expect(q.expected).toBeCloseTo(
              replacementCost(ctx.replacementCostPerSf!, ctx.buildingSf!),
              6,
            );
            break;
          }
          case 'debtYield': {
            expect(q.expected).toBeCloseTo(
              maxLoanByDebtYield(ctx.noi!, ctx.debtYieldTarget!),
              4,
            );
            break;
          }
          case 'dscrLoanSizing': {
            expect(q.expected).toBeCloseTo(
              maxLoanByDscr({
                noi: ctx.noi!,
                dscrTarget: ctx.dscrTarget!,
                annualRate: ctx.interestRate!,
                years: ctx.amortYears!,
              }),
              4,
            );
            break;
          }
          case 'cashOnCash': {
            const ds = annualDebtService(ctx.loanAmount!, ctx.interestRate!, ctx.amortYears!);
            expect(q.expected).toBeCloseTo(
              cashOnCash({ noi: ctx.noi!, debtServiceAnnual: ds, equity: ctx.equityIn! }),
              8,
            );
            break;
          }
          case 'breakEvenOccupancy': {
            expect(q.expected).toBeCloseTo(
              breakEvenOccupancy({
                opex: ctx.opex!,
                debtServiceAnnual: ctx.debtServiceAnnual!,
                pgi: ctx.pgi!,
              }),
              10,
            );
            break;
          }
          case 'leveredIrr': {
            expect(q.expected).toBeCloseTo(
              leveredIrrApprox({
                unleveredIrr: ctx.unleveredIrr!,
                borrowRate: ctx.borrowRate!,
                ltv: ctx.ltv!,
              }),
              10,
            );
            break;
          }
          case 'netEffectiveRent': {
            expect(q.expected).toBeCloseTo(
              netEffectiveRent({
                grossRentPerSf: ctx.rentPerSf!,
                leaseTermYears: ctx.leaseTermYears!,
                tiPerSf: ctx.tiPerSf!,
                freeMonths: ctx.freeMonths!,
              }),
              6,
            );
            break;
          }
          case 'tiVsRent': {
            expect(q.expected).toBeCloseTo(
              tiVsRentDelta({
                rentA: ctx.altRentPerSf!,
                tiA: ctx.altTiPerSf!,
                rentB: ctx.rentPerSf!,
                tiB: ctx.tiPerSf!,
                leaseTermYears: ctx.leaseTermYears!,
              }),
              6,
            );
            break;
          }
          case 'tiPayback': {
            expect(q.expected).toBeCloseTo(
              requiredRentPremiumPerSf({
                tiPerSf: ctx.tiPerSf!,
                paybackYears: ctx.paybackYears!,
              }),
              6,
            );
            break;
          }
          case 'rentRollChange': {
            expect(q.expected).toBeCloseTo(
              rentRollValueChange({
                oldRentPerSf: ctx.oldRentPerSf!,
                newRentPerSf: ctx.newRentPerSf!,
                subjectSf: ctx.buildingSf! * ctx.rolloverPct!,
                vacancy: ctx.vacancyRate!,
                capRate: ctx.capRate!,
              }),
              4,
            );
            break;
          }
          case 'taxReassessment': {
            expect(q.expected).toBeCloseTo(
              taxReassessmentValueImpact({
                purchasePrice: ctx.purchasePrice!,
                oldAnnualTax: ctx.oldAnnualTax!,
                newTaxRate: ctx.newTaxRate!,
                capRate: ctx.capRate!,
              }),
              4,
            );
            break;
          }
          case 'grossRentMultiplier': {
            expect(q.expected).toBeCloseTo(ctx.purchasePrice! / ctx.pgi!, 8);
            break;
          }
          case 'loanConstant': {
            const bps = Math.round(loanConstant(ctx.interestRate!, ctx.amortYears!) * 10_000);
            expect(q.expected).toBe(bps);
            break;
          }
        }
      }
    }
  });

  it('capCompression never produces equal old/new caps (even at band edges)', () => {
    for (const difficulty of ['beginner', 'intermediate', 'advanced'] as const) {
      const rng = createRng(42);
      for (let i = 0; i < 5_000; i++) {
        const q = templates.capCompression.generate(rng, difficulty);
        expect(q.context.capRate).not.toBe(q.context.newCapRate);
        expect(q.expected).not.toBe(0);
      }
    }
  });

  it('vacancySensitivity never produces equal old/new vacancy', () => {
    for (const difficulty of ['beginner', 'intermediate', 'advanced'] as const) {
      const rng = createRng(55);
      for (let i = 0; i < 2_000; i++) {
        const q = templates.vacancySensitivity.generate(rng, difficulty);
        expect(q.context.oldVacancy).not.toBe(q.context.newVacancy);
      }
    }
  });

  it('every question has a solution with matching answerDisplay', () => {
    for (const kind of allKinds) {
      const template = templates[kind];
      const rng = createRng(7);
      const q = template.generate(rng);
      expect(q.solution.formula).toBeTruthy();
      expect(q.solution.steps.length).toBeGreaterThan(0);
      expect(q.solution.answerDisplay).toBeTruthy();
    }
  });
});
