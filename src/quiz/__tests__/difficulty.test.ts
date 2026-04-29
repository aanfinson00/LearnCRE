import { describe, it, expect } from 'vitest';
import { templates } from '../templates';
import { createRng } from '../random';

function isMultipleOf(value: number, step: number, eps = 1e-6): boolean {
  const q = value / step;
  return Math.abs(q - Math.round(q)) < eps;
}

describe('quiz/difficulty', () => {
  it('beginner cap rates land on 0.5% round caps (0.005 step)', () => {
    // Beginner step multiplier was tightened from 4× to 2× to expand the
    // sample space; cap step is now 0.005 (50 bps) instead of 0.01.
    const rng = createRng(101);
    for (let i = 0; i < 300; i++) {
      const q = templates.capCompression.generate(rng, 'beginner');
      expect(isMultipleOf(q.context.capRate!, 0.005, 1e-4)).toBe(true);
    }
  });

  it('intermediate cap rates land on 25 bps (0.0025 step)', () => {
    const rng = createRng(102);
    for (let i = 0; i < 300; i++) {
      const q = templates.capCompression.generate(rng, 'intermediate');
      expect(isMultipleOf(q.context.capRate!, 0.0025, 1e-6)).toBe(true);
    }
  });

  it('advanced cap rates can land on 5 bps (0.0005 step)', () => {
    const rng = createRng(103);
    let sawNon25bps = false;
    for (let i = 0; i < 300; i++) {
      const q = templates.capCompression.generate(rng, 'advanced');
      expect(isMultipleOf(q.context.capRate!, 0.0005, 1e-6)).toBe(true);
      if (!isMultipleOf(q.context.capRate!, 0.0025, 1e-6)) sawNon25bps = true;
    }
    expect(sawNon25bps).toBe(true);
  });

  it('beginner NOI lands on $50k round numbers (2× the base 25k step)', () => {
    const rng = createRng(104);
    for (let i = 0; i < 300; i++) {
      const q = templates.capCompression.generate(rng, 'beginner');
      expect(isMultipleOf(q.context.noi!, 50_000, 1e-6)).toBe(true);
    }
  });

  it('beginner IRR hold years stay within the holdYears band (2-10)', () => {
    // We dropped the [5, 7, 10] pickFromSet in favor of pickInt(2, 10) so the
    // user sees a wider variety of hold periods even on beginner. Just check
    // values stay inside the band.
    const rng = createRng(105);
    const seen = new Set<number>();
    for (let i = 0; i < 100; i++) {
      const q = templates.irrSimple.generate(rng, 'beginner');
      seen.add(q.context.holdYears!);
    }
    for (const y of seen) {
      expect(y).toBeGreaterThanOrEqual(2);
      expect(y).toBeLessThanOrEqual(10);
    }
    // And confirm we actually got variety — otherwise the variety bump is wasted.
    expect(seen.size).toBeGreaterThanOrEqual(5);
  });
});
