export interface CellRef {
  /** 0-indexed column (A=0, B=1, …) */
  col: number;
  /** 0-indexed row (so A1 = row 0) */
  row: number;
  absCol: boolean;
  absRow: boolean;
}

export type Expr =
  | { kind: 'num'; value: number }
  | { kind: 'cell'; ref: CellRef }
  | { kind: 'range'; start: CellRef; end: CellRef }
  | { kind: 'binop'; op: '+' | '-' | '*' | '/' | '^'; left: Expr; right: Expr }
  | { kind: 'unary'; op: '-'; expr: Expr }
  | { kind: 'call'; name: string; args: Expr[] };

/** Evaluator returns either a scalar or a flat array (for ranges fed into functions). */
export type EvalValue = number | number[];

/** Sheet is keyed by uppercased A1-style key, e.g. { A1: 100, B2: 0.05 }. */
export type Sheet = Record<string, number>;

/** Cell metadata for rendering — labels and roles for assumption / target / output cells. */
export interface SheetCell {
  /** A1-style address */
  address: string;
  /** Display label above the cell ("Vacancy", "Year 1 NOI"). */
  label?: string;
  /** Numeric value if any (assumption inputs). */
  value?: number;
  /** Display format hint */
  format?: 'usd' | 'pct' | 'multiple' | 'usdPerSf' | 'years' | 'number' | 'bps';
  /** Role of this cell — controls colouring + interactivity. */
  role: 'assumption' | 'target' | 'computed' | 'header' | 'spacer';
  /** For 'header' cells: the text displayed instead of a number. */
  text?: string;
  /** For 'computed' cells: the precomputed value to render (so users see the surrounding calc). */
  computed?: number;
}

/** Static layout: a 2D grid of cells. Rows × cols. */
export interface SheetLayout {
  rows: number;
  cols: number;
  cells: SheetCell[];
}

export type ExcelTemplateCategory =
  | 'arithmetic'
  | 'aggregation'
  | 'finance'
  | 'normalization';

export interface ExcelTemplate {
  id: string;
  title: string;
  category: ExcelTemplateCategory;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  /** Position roles this template is most relevant for. Untagged = all roles. */
  roles?: import('../types/role').Role[];
  /** 1–2 sentence prompt setting the scenario */
  scenario: string;
  /** Concrete instruction for the user (which cell, what to compute) */
  instruction: string;
  /** Target cell address (e.g. 'B7'). */
  targetCell: string;
  /** Expected numeric value */
  expected: number;
  /** Tolerance for value match — defaults to ±0.5% */
  tolerancePct?: number;
  /** Layout including assumption cells and surrounding labels. */
  layout: SheetLayout;
  /** One-paragraph teaching takeaway shown after submission */
  takeaway: string;
  /** Worked solution prose */
  solution: string;
  /** A canonical formula example for the post-submit reveal */
  exampleFormula: string;
}

export interface ExcelAttempt {
  templateId: string;
  rawFormula: string;
  parsedOk: boolean;
  computedValue: number | null;
  correct: boolean;
  deltaPct: number;
  elapsedMs: number;
  skipped: boolean;
}

export type ExcelStatus = 'active' | 'finished';

export interface ExcelRunConfig {
  category: ExcelTemplateCategory | 'all';
  difficulty: ExcelTemplate['difficulty'] | 'all';
  length: 3 | 5 | 10;
  role?: import('../types/role').Role | 'all';
}

export interface ExcelState {
  config: ExcelRunConfig;
  templates: ExcelTemplate[];
  currentIndex: number;
  attempts: ExcelAttempt[];
  startedAt: number;
  caseStartedAt: number;
  status: ExcelStatus;
}

export const EXCEL_CATEGORIES: { id: ExcelTemplateCategory; label: string }[] = [
  { id: 'arithmetic', label: 'Arithmetic' },
  { id: 'aggregation', label: 'Aggregation (SUM / AVG)' },
  { id: 'finance', label: 'Finance (IRR / NPV / PMT)' },
  { id: 'normalization', label: 'Normalization' },
];
