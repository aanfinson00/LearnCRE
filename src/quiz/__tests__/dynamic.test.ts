import { describe, it, expect } from 'vitest';
import { computeDynamicDifficulty, DYNAMIC_WINDOW, scoreAttempt } from '../dynamic';
import type { Attempt } from '../../types/session';

function mk(
  overrides: Partial<Attempt> & Pick<Attempt, 'correct' | 'elapsedMs'>,
): Attempt {
  return {
    questionId: 'q',
    kind: 'capCompression',
    question: {} as Attempt['question'],
    userInput: 0,
    expected: 0,
    deltaPct: 0,
    skipped: false,
    ...overrides,
  };
}

describe('quiz/dynamic', () => {
  it('scoreAttempt: correct + fast → +2', () => {
    expect(scoreAttempt(mk({ correct: true, elapsedMs: 5_000 }))).toBe(2);
  });

  it('scoreAttempt: correct + medium → +1', () => {
    expect(scoreAttempt(mk({ correct: true, elapsedMs: 20_000 }))).toBe(1);
  });

  it('scoreAttempt: correct + slow → 0', () => {
    expect(scoreAttempt(mk({ correct: true, elapsedMs: 40_000 }))).toBe(0);
  });

  it('scoreAttempt: incorrect + quick → −1', () => {
    expect(scoreAttempt(mk({ correct: false, elapsedMs: 20_000 }))).toBe(-1);
  });

  it('scoreAttempt: incorrect + very slow → −2', () => {
    expect(scoreAttempt(mk({ correct: false, elapsedMs: 90_000 }))).toBe(-2);
  });

  it('scoreAttempt: skipped → −1', () => {
    expect(
      scoreAttempt(mk({ correct: false, elapsedMs: 0, skipped: true })),
    ).toBe(-1);
  });

  it('pulse phase: first 10 alternate beginner / intermediate', () => {
    const attempts: Attempt[] = [];
    expect(computeDynamicDifficulty(attempts)).toBe('beginner');
    attempts.push(mk({ correct: true, elapsedMs: 10_000 }));
    expect(computeDynamicDifficulty(attempts)).toBe('intermediate');
    attempts.push(mk({ correct: true, elapsedMs: 10_000 }));
    expect(computeDynamicDifficulty(attempts)).toBe('beginner');
  });

  it('window of 10 fast+correct → advanced', () => {
    const attempts = Array.from({ length: DYNAMIC_WINDOW }, () =>
      mk({ correct: true, elapsedMs: 8_000 }),
    );
    expect(computeDynamicDifficulty(attempts)).toBe('advanced');
  });

  it('window of 10 slow+wrong → beginner', () => {
    const attempts = Array.from({ length: DYNAMIC_WINDOW }, () =>
      mk({ correct: false, elapsedMs: 90_000 }),
    );
    expect(computeDynamicDifficulty(attempts)).toBe('beginner');
  });

  it('mixed middle → intermediate', () => {
    const attempts = [
      ...Array.from({ length: 5 }, () => mk({ correct: true, elapsedMs: 20_000 })),
      ...Array.from({ length: 5 }, () => mk({ correct: false, elapsedMs: 20_000 })),
    ];
    expect(computeDynamicDifficulty(attempts)).toBe('intermediate');
  });

  it('only looks at last 10 — old attempts fall off window', () => {
    const easy10 = Array.from({ length: 10 }, () =>
      mk({ correct: false, elapsedMs: 90_000 }),
    );
    const recent10Fast = Array.from({ length: 10 }, () =>
      mk({ correct: true, elapsedMs: 8_000 }),
    );
    expect(computeDynamicDifficulty([...easy10, ...recent10Fast])).toBe('advanced');
  });
});
