import type { DealInputs } from './deal';
import type { Tolerance, UnitFormat } from './question';
import type { Role } from './role';

export type WalkthroughKind =
  | 'combinedScenarioWalk'
  | 'dscrLoanSizingWalk'
  | 'mockAcquisitionWalk'
  | 'valueAddWalk'
  | 'developmentFeasibilityWalk'
  | 'holdSellWalk'
  | 'distressedLoanWorkoutWalk'
  | 'waterfallWalk';

export interface WalkthroughStep {
  /** Stable id used as key + used in stats */
  id: string;
  /** Short label shown above the step ("Step 1 — Compute EGI") */
  label: string;
  /** The question to compute at this step */
  prompt: string;
  /** Canonical answer */
  expected: number;
  unit: UnitFormat;
  tolerance: Tolerance;
  /** One-line hint if the user wants to peek (optional) */
  hint?: string;
  /** Solution narrative once committed */
  resultDescription: string;
}

export interface WalkthroughDef {
  id: string;
  kind: WalkthroughKind;
  label: string;
  description: string;
  context: DealInputs;
  /** Friendly setup paragraph the user reads before step 1 */
  setupNarrative: string;
  steps: WalkthroughStep[];
  /** What the user should ultimately understand from chaining the steps */
  takeaway: string;
  /** Position roles this walkthrough is most relevant for. Untagged = all roles. */
  roles?: Role[];
}

export interface WalkthroughAttempt {
  stepId: string;
  userInput: number | null;
  correct: boolean;
  deltaPct: number;
  elapsedMs: number;
  skipped: boolean;
}

export interface WalkthroughState {
  def: WalkthroughDef;
  currentStep: number;
  attempts: WalkthroughAttempt[];
  startedAt: number;
  stepStartedAt: number;
  status: 'active' | 'finished';
}
