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
        }
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
