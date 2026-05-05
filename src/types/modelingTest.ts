import type { SheetCell, SheetLayout } from '../excel/types';
import type { AssetClass } from './session';

export type ModelingTestDifficulty = 'beginner' | 'intermediate' | 'advanced';

export interface ToleranceSpec {
  abs?: number;
  rel?: number;
}

export interface OutputCellSpec {
  ref: string;
  label: string;
  format?: SheetCell['format'];
  expected: number;
  tolerance: ToleranceSpec;
  whenWrongTry: string;
}

export interface CheckpointCellSpec {
  ref: string;
  label: string;
  format?: SheetCell['format'];
  expected: number;
  tolerance: ToleranceSpec;
  diagnostic: string;
  /** Optional list of output refs whose failure this checkpoint helps explain. */
  explains?: string[];
}

export interface ModelingTestTemplate {
  id: string;
  title: string;
  scenario: string;
  brief?: { paragraphs: string[]; bullets?: string[] };
  estimatedMinutes: number;
  difficulty: ModelingTestDifficulty;
  assetClass?: AssetClass;
  layout: SheetLayout;
  outputs: OutputCellSpec[];
  checkpoints: CheckpointCellSpec[];
  rubric: string;
}

export type CellGrade = 'pass' | 'fail' | 'missing' | 'parseError';

export interface OutputResult {
  ref: string;
  label: string;
  format?: SheetCell['format'];
  expected: number;
  tolerance: ToleranceSpec;
  rawFormula: string;
  computed: number | null;
  parseError: string | null;
  grade: CellGrade;
  whenWrongTry: string;
}

export interface CheckpointResult {
  ref: string;
  label: string;
  format?: SheetCell['format'];
  expected: number;
  tolerance: ToleranceSpec;
  rawFormula: string;
  computed: number | null;
  parseError: string | null;
  grade: CellGrade;
  diagnostic: string;
  explains?: string[];
}

export interface GradingResult {
  /** True iff every output cell graded 'pass'. */
  passed: boolean;
  /** Output cells passed / total. Used for ranking attempts in history. */
  outputsCorrect: number;
  outputsTotal: number;
  outputs: OutputResult[];
  checkpoints: CheckpointResult[];
}

/** Per-template draft state — auto-saved as the user types. */
export interface ModelingTestDraft {
  templateId: string;
  formulas: Record<string, string>;
  startedAt: number;
  lastEditedAt: number;
}

export interface ModelingTestAttempt {
  templateId: string;
  formulas: Record<string, string>;
  result: GradingResult;
  durationMs: number;
  completedAt: number;
}

export type ModelingTestStatus = 'editing' | 'graded';

export interface ModelingTestState {
  template: ModelingTestTemplate;
  formulas: Record<string, string>;
  startedAt: number;
  status: ModelingTestStatus;
  result: GradingResult | null;
  /** A1-style address of the cell whose formula bar is currently visible. */
  focusRef: string | null;
}
