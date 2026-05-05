import type { AssetClass } from '../quiz/assetClasses';
import type { Role } from './role';

export type SituationalCategory =
  | 'pricing'
  | 'absorption'
  | 'risk'
  | 'investment-thesis'
  | 'diagnostic'
  | 'lease-econ'
  | 'comp-selection'
  | 'sensitivity'
  | 'deal-process'
  | 'document-literacy';

/**
 * Doc types for the document-literacy category. Drives the badge label
 * on the rendered excerpt block.
 */
export type DocType = 'psa' | 'loan' | 'lease' | 'om' | 'lpa' | 'construction';

export interface DocumentExcerpt {
  /** What kind of doc this is, for the badge. */
  docType: DocType;
  /** Optional source label, e.g. "Section 7.2 (Survival of Reps)". */
  label?: string;
  /** Verbatim text rendered in monospace above the scenario. Newlines preserved. */
  text: string;
}

export type SituationalDifficulty = 'beginner' | 'intermediate' | 'advanced';

export interface SituationalOption {
  label: string;
  isBest: boolean;
  explanation: string;
}

export interface SituationalDataPoint {
  label: string;
  value: string;
}

export interface SituationalCase {
  id: string;
  title: string;
  category: SituationalCategory;
  scenario: string;
  data?: SituationalDataPoint[];
  question: string;
  options: SituationalOption[];
  takeaway: string;
  tips: string[];
  difficulty: SituationalDifficulty;
  assetClass?: AssetClass;
  /** Position roles this case is most relevant for. Untagged = all roles. */
  roles?: Role[];
  /** Optional doc-literacy excerpt rendered above the scenario. */
  documentExcerpt?: DocumentExcerpt;
}

export interface SituationalAttempt {
  caseId: string;
  pickedIndex: number | null;
  correct: boolean;
  elapsedMs: number;
  skipped: boolean;
}

export type SituationalStatus = 'active' | 'finished';

export interface SituationalRunConfig {
  category: SituationalCategory | 'all';
  difficulty: SituationalDifficulty | 'all';
  assetClass: AssetClass;
  length: 5 | 10 | 20;
  role?: Role | 'all';
}

export interface SituationalState {
  config: SituationalRunConfig;
  cases: SituationalCase[];
  currentIndex: number;
  attempts: SituationalAttempt[];
  startedAt: number;
  caseStartedAt: number;
  status: SituationalStatus;
}

export const SITUATIONAL_CATEGORIES: { id: SituationalCategory; label: string }[] = [
  { id: 'pricing', label: 'Pricing' },
  { id: 'absorption', label: 'Absorption' },
  { id: 'risk', label: 'Risk' },
  { id: 'investment-thesis', label: 'Investment thesis' },
  { id: 'diagnostic', label: 'Diagnostic' },
  { id: 'lease-econ', label: 'Lease economics' },
  { id: 'comp-selection', label: 'Comp selection' },
  { id: 'sensitivity', label: 'Sensitivity' },
  { id: 'deal-process', label: 'Deal process' },
  { id: 'document-literacy', label: 'Document literacy' },
];

export const DOC_TYPE_LABELS: Record<DocType, string> = {
  psa: 'Purchase & Sale Agreement',
  loan: 'Loan Agreement',
  lease: 'Lease',
  om: 'Offering Memorandum',
  lpa: 'LP Agreement / Operating Agreement',
  construction: 'Construction Contract',
};
