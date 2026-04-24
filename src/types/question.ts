import type { DealInputs } from './deal';
import type { Difficulty } from './session';

export type QuestionKind =
  | 'capCompression'
  | 'vacancySensitivity'
  | 'otherIncomeImpact'
  | 'rentChange'
  | 'opexChange'
  | 'goingInCap'
  | 'combinedScenario'
  | 'equityMultiple'
  | 'irrSimple'
  | 'targetMultiple'
  | 'pricePerSf'
  | 'allInBasis'
  | 'yieldOnCost'
  | 'devSpread'
  | 'replacementCost'
  | 'debtYield'
  | 'dscrLoanSizing'
  | 'cashOnCash'
  | 'breakEvenOccupancy'
  | 'leveredIrr'
  | 'netEffectiveRent'
  | 'tiVsRent'
  | 'tiPayback'
  | 'rentRollChange'
  | 'taxReassessment'
  | 'grossRentMultiplier'
  | 'loanConstant';

export type UnitFormat = 'usd' | 'pct' | 'bps' | 'pctChange' | 'usdChange' | 'multiple' | 'usdPerSf';

export type AnswerMode = 'free' | 'mc';

export interface Tolerance {
  type: 'pct' | 'abs';
  band: number;
}

export interface SolutionStep {
  label: string;
  expression: string;
  result: string;
}

export interface Solution {
  formula: string;
  steps: SolutionStep[];
  answerDisplay: string;
}

export interface Question {
  id: string;
  kind: QuestionKind;
  prompt: string;
  context: DealInputs;
  expected: number;
  unit: UnitFormat;
  tolerance: Tolerance;
  appliedDifficulty?: Difficulty;
  choices?: number[];
  solution: Solution;
}

export interface Rng {
  pickRange(min: number, max: number, opts?: { step?: number }): number;
  pickFromSet<T>(values: readonly T[]): T;
  pickInt(min: number, max: number): number;
  next(): number;
}

export interface QuestionTemplate<K extends QuestionKind = QuestionKind> {
  kind: K;
  label: string;
  description: string;
  category: 'valuation' | 'returns';
  tips: string[];
  generate(rng: Rng, difficulty?: Difficulty): Question;
}
