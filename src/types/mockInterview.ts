import type { LongformRubricItem } from './longform';
import type { QuestionKind } from './question';
import type { Role } from './role';

/**
 * Mock-Interview mode — a sequence of mixed-kind prompts simulating a
 * real-world finance interview. Prompts come from existing content banks
 * (technical / situational / longform) plus three new prompt types:
 * fit, behavioral, and market-view.
 *
 * A run is governed by a MockArchetypeSpec — a declarative spec like
 * "30-min Mega-Fund Acquisitions" that pins composition (kind counts,
 * order, content scopes) so users can rehearse a particular interview
 * style. Archetypes ship as data files in src/quiz/mockInterview/archetypes/.
 */

export type MockArchetypeId =
  | 'mega-fund-acq'
  | 'opportunistic-pe'
  | 'reit-am'
  | 'regional-sponsor'
  | 'mortgage-debt';

export type MockQuestionKind =
  /** Opening warmup. "Tell me about yourself." Not graded; flow practice. */
  | 'fit'
  /** "Tell me about a time when..." STAR-format prose. Self-graded rubric. */
  | 'behavioral'
  /** Generated quiz question (numeric). Auto-graded against expected. */
  | 'technical'
  /** Existing situational case (4-MC). Auto-graded against best answer. */
  | 'situational'
  /** Existing long-form case (prose). Self-graded rubric. */
  | 'longform'
  /** "What's your view on cap rates?" Open prose. Self-graded rubric on a few axes. */
  | 'marketView';

/** Author-supplied prose prompt for fit / behavioral / marketView kinds. */
export interface MockProsePrompt {
  id: string;
  kind: 'fit' | 'behavioral' | 'marketView';
  prompt: string;
  /**
   * Recommended answer-time in seconds. Surfaced in the UI so the user
   * can pace; not enforced.
   */
  expectedDurationSec: number;
  /** Per-rubric-item scoring axes. Empty for `fit` (warmup, not graded). */
  rubric: LongformRubricItem[];
  /** Reference / "model" answer shown after self-grading. */
  modelAnswer: string;
  /** 2-4 short rules-of-thumb for the post-answer reveal. */
  tips: string[];
  /** Optional role tags for archetype filtering. */
  roles?: Role[];
}

/**
 * Spec for one archetype run. Describes composition + content scopes;
 * the assembler resolves it to a concrete list of MockQuestion objects.
 */
export interface MockArchetypeSpec {
  id: MockArchetypeId;
  title: string;
  description: string;
  /** Approximate total run time (sum of expectedDurationSec). */
  durationMin: number;
  /** Position roles this archetype matches. */
  roles: Role[];
  /** Sequence of question slots. Order matters. */
  composition: MockArchetypeSlot[];
  /** Content scopes the assembler draws from for technical/situational/longform slots. */
  contentScopes: {
    technicalKindPool?: QuestionKind[];
    situationalIdPool?: string[];
    longformIdPool?: string[];
    /** Prose-prompt ids (fit / behavioral / marketView) drawn for the matching slots. */
    fitIdPool?: string[];
    behavioralIdPool?: string[];
    marketViewIdPool?: string[];
  };
}

export interface MockArchetypeSlot {
  kind: MockQuestionKind;
  /** Difficulty hint passed to technical slot generators. Ignored for prose kinds. */
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  /** Free-text label shown on the question header (e.g. "Opening · Fit"). */
  sectionLabel: string;
}

/**
 * Concrete question assembled for a single run. Either a generated
 * technical question, a referenced situational/longform case, or a
 * referenced prose prompt.
 */
export type MockQuestion =
  | { kind: 'technical'; sectionLabel: string; questionId: string; question: import('./question').Question; }
  | { kind: 'situational'; sectionLabel: string; caseId: string; case: import('./situational').SituationalCase; }
  | { kind: 'longform'; sectionLabel: string; caseId: string; case: import('./longform').LongformCase; }
  | { kind: 'fit' | 'behavioral' | 'marketView'; sectionLabel: string; promptId: string; prompt: MockProsePrompt; };

export type MockQuestionAttempt =
  | {
      kind: 'technical';
      questionId: string;
      userInput: number | null;
      correct: boolean;
      elapsedMs: number;
      skipped: boolean;
    }
  | {
      kind: 'situational';
      caseId: string;
      pickedIndex: number | null;
      correct: boolean;
      elapsedMs: number;
      skipped: boolean;
    }
  | {
      kind: 'longform' | 'fit' | 'behavioral' | 'marketView';
      promptOrCaseId: string;
      userAnswer: string;
      /** Per-rubric-item self-grades, 0-3 scale. */
      rubricScores: Record<string, number>;
      /** Computed: weighted sum / max possible. 0-1. */
      scorePct: number;
      elapsedMs: number;
      skipped: boolean;
    };

export type MockInterviewStatus = 'active' | 'reviewing' | 'finished';

export interface MockInterviewState {
  spec: MockArchetypeSpec;
  questions: MockQuestion[];
  currentIndex: number;
  attempts: MockQuestionAttempt[];
  startedAt: number;
  questionStartedAt: number;
  status: MockInterviewStatus;
}

/** Persisted summary of a completed run. One per finished session. */
export interface MockInterviewRecord {
  id: string;
  archetypeId: MockArchetypeId;
  startedAt: number;
  finishedAt: number;
  durationMs: number;
  /** Aggregate score across all attempts. 0-1. */
  totalScorePct: number;
  /** Per-question breakdown for replay + history. */
  attempts: MockQuestionAttempt[];
  /** Per-kind aggregate: { fit: { total: 0, correct: 0 }, ... } */
  perKindScore: Partial<
    Record<MockQuestionKind, { count: number; scoreSum: number }>
  >;
}
