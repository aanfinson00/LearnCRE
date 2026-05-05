import type { ModelingTestTemplate, ModelingTestDifficulty } from '../../../types/modelingTest';
import { dcfFiveYrSuburbanOffice } from './dcfFiveYrSuburbanOffice';
import { loanSizingThreeConstraint } from './loanSizingThreeConstraint';
import { acqProformaMultifamily } from './acqProformaMultifamily';
import { refiVsSellY5 } from './refiVsSellY5';
import { constructionLoanSizing } from './constructionLoanSizing';
import { distressedOfficeBasisPlay } from './distressedOfficeBasisPlay';

export const MODELING_TEST_TEMPLATES: ModelingTestTemplate[] = [
  dcfFiveYrSuburbanOffice,
  loanSizingThreeConstraint,
  acqProformaMultifamily,
  refiVsSellY5,
  constructionLoanSizing,
  distressedOfficeBasisPlay,
];

export interface PlannedTemplate {
  id: string;
  title: string;
  estimatedMinutes: number;
  difficulty: ModelingTestDifficulty;
  description: string;
}

/** Stubs for templates that are designed but not yet authored. Surfaced on the
 *  setup screen as locked previews so the user can see what's coming. */
export const PLANNED_TEMPLATES: PlannedTemplate[] = [];

export function findTemplate(id: string): ModelingTestTemplate | null {
  return MODELING_TEST_TEMPLATES.find((t) => t.id === id) ?? null;
}
