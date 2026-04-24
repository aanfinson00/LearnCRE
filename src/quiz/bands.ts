import type { Rng } from '../types/question';
import type { Difficulty } from '../types/session';

export interface Band {
  min: number;
  max: number;
  step?: number;
}

const DIFFICULTY_STEP_MULT: Record<Difficulty, number> = {
  beginner: 4,
  intermediate: 1,
  advanced: 0.2,
};

export function effectiveStep(band: Band, difficulty: Difficulty): number | undefined {
  if (band.step === undefined) return undefined;
  return band.step * DIFFICULTY_STEP_MULT[difficulty];
}

export function pickBand(rng: Rng, band: Band, difficulty: Difficulty = 'intermediate'): number {
  const step = effectiveStep(band, difficulty);
  const opts = step !== undefined ? { step } : undefined;
  return rng.pickRange(band.min, band.max, opts);
}

export function clampToBand(
  value: number,
  band: Band,
  difficulty: Difficulty = 'intermediate',
): number {
  const clamped = Math.max(band.min, Math.min(band.max, value));
  const step = effectiveStep(band, difficulty);
  if (step !== undefined) {
    return Math.round(clamped / step) * step;
  }
  return clamped;
}

export function applyMove(
  start: number,
  move: number,
  band: Band,
  difficulty: Difficulty = 'intermediate',
): number {
  const candidate = clampToBand(start + move, band, difficulty);
  if (Math.abs(candidate - start) > 1e-12) return candidate;
  const flipped = clampToBand(start - move, band, difficulty);
  if (Math.abs(flipped - start) > 1e-12) return flipped;
  const step = effectiveStep(band, difficulty) ?? (band.max - band.min) / 100;
  const mid = (band.min + band.max) / 2;
  const dir = start >= mid ? -1 : 1;
  return clampToBand(start + dir * step, band, difficulty);
}

export const bands = {
  capRate: { min: 0.035, max: 0.1, step: 0.0025 },
  noi: { min: 250_000, max: 15_000_000, step: 25_000 },
  gpr: { min: 500_000, max: 15_000_000, step: 100_000 },
  otherIncome: { min: 0, max: 750_000, step: 25_000 },
  vacancy: { min: 0.02, max: 0.15, step: 0.005 },
  opexRatio: { min: 0.3, max: 0.55, step: 0.025 },
  sf: { min: 10_000, max: 1_500_000, step: 5_000 },
  rentPerSf: { min: 8, max: 80, step: 0.25 },
  tiPerSf: { min: 0, max: 100, step: 1 },
  rolloverPct: { min: 0.1, max: 0.6, step: 0.05 },
  equityIn: { min: 1_000_000, max: 100_000_000, step: 500_000 },
  holdYears: { min: 2, max: 10 },
  targetIrr: { min: 0.08, max: 0.25, step: 0.005 },
  irrExitMultiple: { min: 1.2, max: 3.5, step: 0.1 },
  otherIncomeDelta: { min: 25_000, max: 500_000, step: 25_000 },
  rentLevel: { min: 500_000, max: 8_000_000, step: 100_000 },
  purchasePrice: { min: 5_000_000, max: 250_000_000, step: 500_000 },
  capex: { min: 250_000, max: 15_000_000, step: 250_000 },
  closingCostRate: { min: 0.01, max: 0.03, step: 0.0025 },
  projectCost: { min: 10_000_000, max: 300_000_000, step: 1_000_000 },
  replacementCostPerSf: { min: 150, max: 500, step: 5 },
  yocDelta: { min: 0.015, max: 0.05, step: 0.0025 },
  debtYieldTarget: { min: 0.08, max: 0.12, step: 0.0025 },
  loanAmount: { min: 2_000_000, max: 100_000_000, step: 500_000 },
  interestRate: { min: 0.04, max: 0.085, step: 0.0025 },
  amortYears: { min: 20, max: 30 },
  dscrTarget: { min: 1.15, max: 1.4, step: 0.05 },
  ltv: { min: 0.4, max: 0.75, step: 0.05 },
  unleveredIrr: { min: 0.05, max: 0.12, step: 0.005 },
  pgiPerSf: { min: 15, max: 60, step: 0.5 },
  leaseTermYears: { min: 3, max: 10 },
  freeMonths: { min: 0, max: 6 },
  paybackYears: { min: 2, max: 5 },
  taxRate: { min: 0.008, max: 0.025, step: 0.00125 },
  rentPerSfDelta: { min: 0.5, max: 5, step: 0.25 },
  units: { min: 25, max: 500, step: 5 },
  growthRate: { min: 0.02, max: 0.06, step: 0.0025 },
  projectionYears: { min: 3, max: 10 },
  egi: { min: 500_000, max: 15_000_000, step: 100_000 },
  rentPerUnitYear: { min: 12_000, max: 36_000, step: 500 },
  opexPerUnitYear: { min: 4_000, max: 14_000, step: 250 },
  pricePerUnitValue: { min: 150_000, max: 600_000, step: 5_000 },
  exitCapRate: { min: 0.045, max: 0.095, step: 0.0025 },
} as const;

export const discreteMoves = {
  capMoves: [-0.0075, -0.005, -0.0025, 0.0025, 0.005, 0.0075] as const,
  vacancyMoves: [-0.03, -0.02, -0.01, 0.01, 0.02, 0.03] as const,
  rentMoves: [-100_000, -50_000, 50_000, 100_000, 150_000, 250_000] as const,
  opexMoves: [25_000, 50_000, 75_000, 100_000, 150_000, 250_000] as const,
  vacancySet: [0, 0.03, 0.05, 0.07, 0.1] as const,
  vacancySetNonZero: [0.03, 0.05, 0.07, 0.1] as const,
  opexRatios: [0.3, 0.35, 0.4, 0.45, 0.5] as const,
  targetIrrs: [0.08, 0.1, 0.12, 0.125, 0.14, 0.15, 0.17, 0.18, 0.2, 0.22, 0.25] as const,
} as const;
