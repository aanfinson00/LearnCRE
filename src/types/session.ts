import type { AnswerMode, Question, QuestionKind } from './question';
import type { AssetClass } from '../quiz/assetClasses';
import type { Role } from './role';
export type { Question };
export type { AssetClass };

export type TolerancePreset = 'strict' | 'normal' | 'loose';
export type Difficulty = 'beginner' | 'intermediate' | 'advanced';
export type DifficultyMode = Difficulty | 'dynamic';

export interface SessionConfig {
  mode: AnswerMode;
  categories: QuestionKind[];
  plannedCount: number | null;
  tolerancePreset: TolerancePreset;
  difficulty: DifficultyMode;
  assetClass: AssetClass;
  spacedRepetition?: boolean;
  seed?: number;
  role?: Role | 'all';
}

export interface Attempt {
  questionId: string;
  kind: QuestionKind;
  question: Question;
  userInput: number | null;
  expected: number;
  correct: boolean;
  deltaPct: number;
  elapsedMs: number;
  skipped: boolean;
}

export type SessionStatus = 'setup' | 'active' | 'answered' | 'finished' | 'reviewing';

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
