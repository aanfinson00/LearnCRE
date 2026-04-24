import type { Question, Tolerance } from '../types/question';
import type { TolerancePreset } from '../types/session';

const PRESET_MULTIPLIER: Record<TolerancePreset, number> = {
  strict: 0.6,
  normal: 1.0,
  loose: 2.0,
};

export function applyPreset(base: Tolerance, preset: TolerancePreset): Tolerance {
  const m = PRESET_MULTIPLIER[preset];
  return { type: base.type, band: base.band * m };
}

export function scoreAnswer(
  userInput: number,
  question: Question,
): { correct: boolean; deltaPct: number; deltaAbs: number } {
  const { expected, tolerance } = question;
  const deltaAbs = userInput - expected;
  const deltaPct = expected === 0 ? 0 : deltaAbs / Math.abs(expected);

  const within =
    tolerance.type === 'pct'
      ? Math.abs(deltaPct) <= tolerance.band
      : Math.abs(deltaAbs) <= tolerance.band;

  return { correct: within, deltaPct, deltaAbs };
}
