import { describe, expect, it } from 'vitest';
import { SITUATIONAL_CASES, pickCases } from '../situational';

describe('quiz/situational — option shuffling', () => {
  it('every shipped case has exactly one isBest option', () => {
    for (const c of SITUATIONAL_CASES) {
      const bestCount = c.options.filter((o) => o.isBest).length;
      expect(bestCount, `case ${c.id}`).toBe(1);
    }
  });

  it('pickCases shuffles options across the pool — best answer is not always at index 0', () => {
    // Use a fixed seed so the test is deterministic.
    const picked = pickCases(SITUATIONAL_CASES, SITUATIONAL_CASES.length, 12345);
    const bestIndices = picked.map((c) => c.options.findIndex((o) => o.isBest));
    // If shuffling happened, at least one case should have its best answer at a
    // non-zero position. (It's astronomically unlikely all 12 cases end up with
    // best at index 0 after shuffling — the original bug.)
    const allAtZero = bestIndices.every((i) => i === 0);
    expect(allAtZero).toBe(false);
  });

  it('preserves the isBest flag — every shuffled case still has exactly one best', () => {
    const picked = pickCases(SITUATIONAL_CASES, SITUATIONAL_CASES.length, 7);
    for (const c of picked) {
      expect(c.options.filter((o) => o.isBest).length, `case ${c.id}`).toBe(1);
    }
  });

  it('does not mutate the global SITUATIONAL_CASES catalog', () => {
    const before = SITUATIONAL_CASES.map((c) => c.options.map((o) => o.label));
    pickCases(SITUATIONAL_CASES, SITUATIONAL_CASES.length, 1);
    pickCases(SITUATIONAL_CASES, SITUATIONAL_CASES.length, 2);
    const after = SITUATIONAL_CASES.map((c) => c.options.map((o) => o.label));
    expect(after).toEqual(before);
  });

  it('is deterministic — same seed → same shuffle', () => {
    const a = pickCases(SITUATIONAL_CASES, 6, 999);
    const b = pickCases(SITUATIONAL_CASES, 6, 999);
    expect(a.map((c) => c.id)).toEqual(b.map((c) => c.id));
    expect(a[0].options.map((o) => o.label)).toEqual(b[0].options.map((o) => o.label));
  });
});
