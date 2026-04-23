import type { AnswerMode, Question, QuestionKind } from './question';

export type TolerancePreset = 'strict' | 'normal' | 'loose';

export interface SessionConfig {
  mode: AnswerMode;
  categories: QuestionKind[];
  plannedCount: number | null;
  tolerancePreset: TolerancePreset;
  seed?: number;
}

export interface Attempt {
  questionId: string;
  kind: QuestionKind;
  userInput: number | null;
  expected: number;
  correct: boolean;
  deltaPct: number;
  elapsedMs: number;
  skipped: boolean;
}

export type SessionStatus = 'setup' | 'active' | 'answered' | 'finished';

export interface QuizSession {
  id: string;
  startedAt: number;
  config: SessionConfig;
  attempts: Attempt[];
  currentIndex: number;
  currentQuestion: Question | null;
  questionStartedAt: number | null;
  status: SessionStatus;
  lastAttempt: Attempt | null;
}

export interface CategoryStats {
  total: number;
  correct: number;
}

export interface SessionStats {
  total: number;
  correct: number;
  accuracyPct: number;
  currentStreak: number;
  bestStreak: number;
  avgResponseMs: number;
  perCategory: Partial<Record<QuestionKind, CategoryStats>>;
}

export interface LifetimeStats {
  attempts: number;
  correct: number;
  perCategory: Partial<Record<QuestionKind, CategoryStats>>;
}
