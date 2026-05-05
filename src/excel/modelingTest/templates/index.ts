import type { ModelingTestTemplate, ModelingTestDifficulty } from '../../../types/modelingTest';
import { dcfFiveYrSuburbanOffice } from './dcfFiveYrSuburbanOffice';

export const MODELING_TEST_TEMPLATES: ModelingTestTemplate[] = [
  dcfFiveYrSuburbanOffice,
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
    id: 'loan-sizing-three-constraint',
    title: 'Loan Sizing — Three Constraints',
    estimatedMinutes: 15,
    difficulty: 'intermediate',
    description:
      'NOI $5M, value $80M. Solve max loan that simultaneously passes 1.25× DSCR, 75% LTV, and 8% debt yield. Identify the binding constraint.',
  },
  {
    id: 'acq-proforma-sensitivity',
    title: 'Acquisition Pro-Forma + Sensitivity',
    estimatedMinutes: 25,
    difficulty: 'advanced',
    description:
      '$40M multifamily acquisition. Build trended NOI (yr 1-5), build a 5×5 sensitivity matrix (going-in cap × exit cap → levered IRR), and report base-case equity multiple.',
  },
];

export function findTemplate(id: string): ModelingTestTemplate | null {
  return MODELING_TEST_TEMPLATES.find((t) => t.id === id) ?? null;
}
