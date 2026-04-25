import { describe, it, expect } from 'vitest';
import { pickKindWeighted, weightsForKinds } from '../spacedRepetition';
import { createRng } from '../random';
import type { LifetimeStats } from '../../types/session';
import type { QuestionKind } from '../../types/question';

const stats = (entries: Record<string, { total: number; correct: number }>): LifetimeStats => ({
  attempts: 0,
  correct: 0,
  perCategory: entries as LifetimeStats['perCategory'],
});

describe('quiz/spacedRepetition', () => {
  it('untested kinds get a baseline weight', () => {
    const w = weightsForKinds(['capCompression'] as QuestionKind[], null);
    expect(w[0]).toBe(1.5);
  });

  it('kinds with <3 attempts also use baseline', () => {
    const w = weightsForKinds(
      ['capCompression'] as QuestionKind[],
      stats({ capCompression: { total: 2, correct: 1 } }),
    );
    expect(w[0]).toBe(1.5);
  });

  it('high accuracy → low weight', () => {
    const w = weightsForKinds(
      ['capCompression'] as QuestionKind[],
      stats({ capCompression: { total: 20, correct: 19 } }),
    );
    expect(w[0]).toBeLessThan(1);
  });

  it('low accuracy → high weight', () => {
    const w = weightsForKinds(
      ['capCompression'] as QuestionKind[],
      stats({ capCompression: { total: 20, correct: 6 } }),
    );
    expect(w[0]).toBeGreaterThan(2);
  });

  it('weight is monotonically decreasing in accuracy', () => {
    const a = weightsForKinds(
      ['capCompression'] as QuestionKind[],
      stats({ capCompression: { total: 100, correct: 90 } }),
    )[0];
    const b = weightsForKinds(
      ['capCompression'] as QuestionKind[],
      stats({ capCompression: { total: 100, correct: 50 } }),
    )[0];
    expect(b).toBeGreaterThan(a);
  });

  it('sampler picks the higher-weight kind more often over many draws', () => {
    const rng = createRng(7);
    const candidates: QuestionKind[] = ['capCompression', 'leveredIrr'];
    const s = stats({
      capCompression: { total: 50, correct: 49 },
      leveredIrr: { total: 50, correct: 15 },
    });
    let easy = 0;
    let hard = 0;
    for (let i = 0; i < 1000; i++) {
      const k = pickKindWeighted(candidates, s, rng);
      if (k === 'capCompression') easy += 1;
      else hard += 1;
    }
    expect(hard).toBeGreaterThan(easy);
  });
});
