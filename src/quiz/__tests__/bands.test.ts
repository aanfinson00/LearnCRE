import { describe, it, expect } from 'vitest';
import { bands, pickBand } from '../bands';
import { allKinds, templates } from '../templates';
import { createRng } from '../random';

const EPSILON = 1e-9;

describe('quiz/bands', () => {
  it('cap rate band is 3.5% to 10%', () => {
    expect(bands.capRate.min).toBeCloseTo(0.035, 10);
    expect(bands.capRate.max).toBeCloseTo(0.1, 10);
  });

  it('square feet band is 10k to 1.5M', () => {
    expect(bands.sf.min).toBe(10_000);
    expect(bands.sf.max).toBe(1_500_000);
  });

  it('pickBand stays within declared range with step applied', () => {
    const rng = createRng(1);
    for (let i = 0; i < 2000; i++) {
      const v = pickBand(rng, bands.capRate);
      expect(v).toBeGreaterThanOrEqual(bands.capRate.min - EPSILON);
      expect(v).toBeLessThanOrEqual(bands.capRate.max + EPSILON);
      expect(Math.round(v / bands.capRate.step) * bands.capRate.step).toBeCloseTo(v, 10);
    }
  });

  it('generated questions keep cap rates within band', () => {
    for (const kind of allKinds) {
      const rng = createRng(99);
      for (let i = 0; i < 500; i++) {
        const q = templates[kind].generate(rng);
        const caps = [q.context.capRate, q.context.newCapRate, q.context.exitCap].filter(
          (c): c is number => typeof c === 'number',
        );
        for (const c of caps) {
          expect(c).toBeGreaterThanOrEqual(bands.capRate.min - EPSILON);
          expect(c).toBeLessThanOrEqual(bands.capRate.max + EPSILON);
        }
      }
    }
  });

  it('generated questions keep vacancy within band', () => {
    const rng = createRng(7);
    for (const kind of allKinds) {
      for (let i = 0; i < 500; i++) {
        const q = templates[kind].generate(rng);
        const vacs = [q.context.vacancyRate, q.context.oldVacancy, q.context.newVacancy].filter(
          (v): v is number => typeof v === 'number',
        );
        for (const v of vacs) {
          expect(v).toBeGreaterThanOrEqual(0 - EPSILON);
          expect(v).toBeLessThanOrEqual(bands.vacancy.max + EPSILON);
        }
      }
    }
  });

  it('generated questions keep hold years within band', () => {
    const rng = createRng(3);
    for (const kind of ['irrSimple', 'targetMultiple'] as const) {
      for (let i = 0; i < 200; i++) {
        const q = templates[kind].generate(rng);
        const years = q.context.holdYears!;
        expect(years).toBeGreaterThanOrEqual(bands.holdYears.min);
        expect(years).toBeLessThanOrEqual(bands.holdYears.max);
      }
    }
  });
});
