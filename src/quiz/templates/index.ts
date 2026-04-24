import type { QuestionKind, QuestionTemplate } from '../../types/question';
import { allInBasisTemplate } from './allInBasis';
import { capCompressionTemplate } from './capCompression';
import { combinedScenarioTemplate } from './combinedScenario';
import { devSpreadTemplate } from './devSpread';
import { equityMultipleTemplate } from './equityMultiple';
import { goingInCapTemplate } from './goingInCap';
import { irrSimpleTemplate } from './irrSimple';
import { opexChangeTemplate } from './opexChange';
import { otherIncomeImpactTemplate } from './otherIncomeImpact';
import { pricePerSfTemplate } from './pricePerSf';
import { rentChangeTemplate } from './rentChange';
import { replacementCostTemplate } from './replacementCost';
import { targetMultipleTemplate } from './targetMultiple';
import { vacancySensitivityTemplate } from './vacancySensitivity';
import { yieldOnCostTemplate } from './yieldOnCost';

export const templates: Record<QuestionKind, QuestionTemplate> = {
  capCompression: capCompressionTemplate,
  goingInCap: goingInCapTemplate,
  vacancySensitivity: vacancySensitivityTemplate,
  otherIncomeImpact: otherIncomeImpactTemplate,
  rentChange: rentChangeTemplate,
  opexChange: opexChangeTemplate,
  combinedScenario: combinedScenarioTemplate,
  equityMultiple: equityMultipleTemplate,
  irrSimple: irrSimpleTemplate,
  targetMultiple: targetMultipleTemplate,
  pricePerSf: pricePerSfTemplate,
  allInBasis: allInBasisTemplate,
  yieldOnCost: yieldOnCostTemplate,
  devSpread: devSpreadTemplate,
  replacementCost: replacementCostTemplate,
};

export const allKinds: QuestionKind[] = [
  'capCompression',
  'goingInCap',
  'vacancySensitivity',
  'otherIncomeImpact',
  'rentChange',
  'opexChange',
  'combinedScenario',
  'equityMultiple',
  'irrSimple',
  'targetMultiple',
  'pricePerSf',
  'allInBasis',
  'yieldOnCost',
  'devSpread',
  'replacementCost',
];
