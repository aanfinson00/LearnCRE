import type { QuestionKind } from './question';
import type { Role } from './role';

/**
 * Cert / module / benchmark domain types.
 *
 * Benchmarks are evaluated against the user's session history (and longform
 * attempt log) — they are NOT separately tracked. A user's existing sessions
 * retroactively count toward cert progress; they don't have to "start over"
 * once certs ship.
 *
 * One CertProgress entry per cert is persisted in localStorage to track
 * final-exam attempts and the earned timestamp.
 */

export type BenchmarkMode =
  | 'quizAccuracy'
  | 'situationalCorrect'
  | 'walkthroughComplete'
  | 'excelTemplate'
  | 'longformScore';

interface BaseBenchmark {
  /** Stable id used in CertProgress.benchmarksPassed. */
  id: string;
  /** Short label shown to the user on the cert detail page. */
  label: string;
}

export interface QuizAccuracyBenchmark extends BaseBenchmark {
  kind: 'quizAccuracy';
  /** Quiz question kinds that count toward this benchmark. */
  kindSet: QuestionKind[];
  /** Pass threshold, 0-1. */
  minAccuracyPct: number;
  /** Don't pass below this many attempts (smoothing). */
  minAttempts: number;
  /** If set, only attempts at this difficulty or higher count. */
  minDifficulty?: 'intermediate' | 'advanced';
}

export interface SituationalCorrectBenchmark extends BaseBenchmark {
  kind: 'situationalCorrect';
  /** Specific case ids in scope. */
  caseIds: string[];
  /** Pass threshold for "best answer" rate, 0-1. */
  minBestAnswerPct: number;
  minAttempts: number;
}

export interface WalkthroughCompleteBenchmark extends BaseBenchmark {
  kind: 'walkthroughComplete';
  walkId: string;
  /** Min step accuracy on the user's best run, 0-1. */
  minStepAccuracyPct: number;
}

export interface ExcelTemplateBenchmark extends BaseBenchmark {
  kind: 'excelTemplate';
  /** Specific Excel template ids in scope. */
  templateIds: string[];
  /** Min fraction of templates the user has answered correctly at least once, 0-1. */
  minPassRatePct: number;
}

export interface LongformScoreBenchmark extends BaseBenchmark {
  kind: 'longformScore';
  caseIds: string[];
  /** Min average rubric score, 0-1. */
  minAvgScorePct: number;
}

export type Benchmark =
  | QuizAccuracyBenchmark
  | SituationalCorrectBenchmark
  | WalkthroughCompleteBenchmark
  | ExcelTemplateBenchmark
  | LongformScoreBenchmark;

export interface Module {
  id: string;
  title: string;
  description: string;
  benchmarks: Benchmark[];
}

export interface FinalExamSpec {
  /** Total number of items in the exam. */
  totalQuestions: number;
  /** Composition by mode, summing to totalQuestions. */
  composition: { mode: BenchmarkMode | 'quiz' | 'situational' | 'walkthrough' | 'excel' | 'longform'; count: number }[];
  /** Pass threshold on the weighted score, 0-1. */
  passThresholdPct: number;
  /** Content scopes — the exam draws from these and only these. */
  contentScopes: {
    quizKinds?: QuestionKind[];
    situationalIds?: string[];
    excelIds?: string[];
    walkIds?: string[];
    longformIds?: string[];
  };
}

export interface Cert {
  id: string;
  title: string;
  description: string;
  /** A cert this depends on; must be earned before this one is eligible. */
  prerequisiteCertId?: string;
  /** Optional role tag for grouping in the cert list. */
  role?: Role;
  modules: Module[];
  finalExam: FinalExamSpec;
}

/** Per-attempt record of a final exam. */
export interface FinalExamAttempt {
  startedAt: number;
  finishedAt: number;
  scorePct: number;
  passed: boolean;
}

/** Per-cert progress record persisted in localStorage. */
export interface CertProgress {
  certId: string;
  startedAt: number;
  benchmarksPassed: string[];
  finalExamAttempts: FinalExamAttempt[];
  /** Set when modules + final exam are all passed. */
  earnedAt?: number;
}

/** Aggregate progress info computed by the evaluator. */
export interface CertProgressView {
  certId: string;
  modulesPassed: number;
  totalModules: number;
  benchmarksPassed: number;
  totalBenchmarks: number;
  /** All modules passed, eligible to take the final exam. */
  eligibleForFinal: boolean;
  finalExamPassed: boolean;
  earned: boolean;
  /** Best final-exam score across attempts, or null if no attempts. */
  bestFinalScorePct: number | null;
}
