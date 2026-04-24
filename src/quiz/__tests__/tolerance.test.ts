import { describe, it, expect } from 'vitest';
import { scoreAnswer, applyPreset } from '../tolerance';
import type { Question } from '../../types/question';

function makeQ(expected: number, band: number, type: 'pct' | 'abs' = 'pct'): Question {
  return {
    id: 't',
    kind: 'capCompression',
    prompt: '',
    context: {},
    expected,
    unit: 'pctChange',
    tolerance: { type, band },
    solution: { formula: '', steps: [], answerDisplay: '' },
  };
}

describe('quiz/tolerance', () => {
  it('marks within-band pct tolerance correct', () => {
    const q = makeQ(0.06, 0.05);
    expect(scoreAnswer(0.0628, q).correct).toBe(true);
    expect(scoreAnswer(0.058, q).correct).toBe(true);
  });

  it('marks over-band pct tolerance incorrect', () => {
    const q = makeQ(0.06, 0.05);
    expect(scoreAnswer(0.07, q).correct).toBe(false);
    expect(scoreAnswer(0.05, q).correct).toBe(false);
  });

  it('abs tolerance (bps) — 15 bps band', () => {
    const q = makeQ(525, 15, 'abs');
    expect(scoreAnswer(510, q).correct).toBe(true);
    expect(scoreAnswer(509, q).correct).toBe(false);
  });

  it('applyPreset scales band', () => {
    expect(applyPreset({ type: 'pct', band: 0.05 }, 'normal').band).toBeCloseTo(0.05, 10);
    expect(applyPreset({ type: 'pct', band: 0.05 }, 'strict').band).toBeCloseTo(0.03, 10);
    expect(applyPreset({ type: 'pct', band: 0.05 }, 'loose').band).toBeCloseTo(0.1, 10);
  });
});
