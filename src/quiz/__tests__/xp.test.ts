import { describe, it, expect } from 'vitest';
import { xpForAttempt, xpForSpeedDrillCell, xpForWalkthroughStep } from '../xp';

describe('quiz/xp', () => {
  it('skipped or incorrect → 0', () => {
    expect(
      xpForAttempt({ correct: false, skipped: false, difficulty: 'beginner', elapsedMs: 5_000, streak: 0 }),
    ).toBe(0);
    expect(
      xpForAttempt({ correct: true, skipped: true, difficulty: 'beginner', elapsedMs: 5_000, streak: 0 }),
    ).toBe(0);
  });

  it('beginner correct slow at no streak → 1', () => {
    expect(
      xpForAttempt({ correct: true, skipped: false, difficulty: 'beginner', elapsedMs: 30_000, streak: 0 }),
    ).toBe(1);
  });

  it('beginner correct fast at no streak → 2 (1 + 0.5 fast = 1.5 → round = 2)', () => {
    expect(
      xpForAttempt({ correct: true, skipped: false, difficulty: 'beginner', elapsedMs: 5_000, streak: 0 }),
    ).toBe(2);
  });

  it('advanced correct fast at streak 5 → round((3+0.5)*1.25) = 4', () => {
    expect(
      xpForAttempt({ correct: true, skipped: false, difficulty: 'advanced', elapsedMs: 8_000, streak: 5 }),
    ).toBe(4);
  });

  it('streak multiplier caps at 1.5× by streak 10', () => {
    const at10 = xpForAttempt({
      correct: true,
      skipped: false,
      difficulty: 'advanced',
      elapsedMs: 8_000,
      streak: 10,
    });
    const at100 = xpForAttempt({
      correct: true,
      skipped: false,
      difficulty: 'advanced',
      elapsedMs: 8_000,
      streak: 100,
    });
    expect(at10).toBe(at100);
    // (3+0.5) * 1.5 = 5.25 → round to 5
    expect(at10).toBe(5);
  });

  it('intermediate slow at streak 0 → 2', () => {
    expect(
      xpForAttempt({ correct: true, skipped: false, difficulty: 'intermediate', elapsedMs: 30_000, streak: 0 }),
    ).toBe(2);
  });

  it('speed-drill cell: 1 XP for correct, 0 otherwise', () => {
    expect(xpForSpeedDrillCell(true, false)).toBe(1);
    expect(xpForSpeedDrillCell(false, false)).toBe(0);
    expect(xpForSpeedDrillCell(true, true)).toBe(0);
  });

  it('walkthrough step: 2 XP for correct, 0 otherwise', () => {
    expect(xpForWalkthroughStep(true, false)).toBe(2);
    expect(xpForWalkthroughStep(false, false)).toBe(0);
  });
});
