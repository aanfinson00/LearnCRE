import type { ModelingTestTemplate, ModelingTestDifficulty } from '../../../types/modelingTest';
import { dcfFiveYrSuburbanOffice } from './dcfFiveYrSuburbanOffice';
import { loanSizingThreeConstraint } from './loanSizingThreeConstraint';

export const MODELING_TEST_TEMPLATES: ModelingTestTemplate[] = [
  dcfFiveYrSuburbanOffice,
  loanSizingThreeConstraint,
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
export const PLANNED_TEMPLATES: PlannedTemplate[] = [
  {
    id: 'acq-proforma-multifamily',
    title: 'Acquisition Pro-Forma — Multifamily',
    estimatedMinutes: 25,
    difficulty: 'advanced',
    description:
      '$40M MF acquisition with rent bumps + capex reserve + DSCR-constrained debt sizing. Build trended NOI, compute exit, and report levered IRR + equity multiple.',
  },
];

export function findTemplate(id: string): ModelingTestTemplate | null {
  return MODELING_TEST_TEMPLATES.find((t) => t.id === id) ?? null;
}
