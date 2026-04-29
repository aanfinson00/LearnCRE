import type { QuestionKind, QuestionTemplate } from '../../types/question';
import { allInBasisTemplate } from './allInBasis';
import { breakEvenOccupancyTemplate } from './breakEvenOccupancy';
import { cagrTemplate } from './cagr';
import { capCompressionTemplate } from './capCompression';
import { cashOnCashTemplate } from './cashOnCash';
import { combinedScenarioTemplate } from './combinedScenario';
import { compoundGrowthTemplate } from './compoundGrowth';
import { debtYieldTemplate } from './debtYield';
import { devSpreadTemplate } from './devSpread';
import { dscrFromNoiAndDsTemplate } from './dscrFromNoiAndDs';
import { dscrLoanSizingTemplate } from './dscrLoanSizing';
import { dscrSensitivityRateTemplate } from './dscrSensitivityRate';
import { dscrTestPassesTemplate } from './dscrTestPasses';
import { extensionDragTemplate } from './extensionDrag';
import { holdVsSellIrrTemplate } from './holdVsSellIrr';
import { taxAdjustedExitTemplate } from './taxAdjustedExit';
import { equityMultipleTemplate } from './equityMultiple';
import { goingInCapTemplate } from './goingInCap';
import { grossRentMultiplierTemplate } from './grossRentMultiplier';
import { loanConstantTemplate } from './loanConstant';
import { noiFromOerTemplate } from './noiFromOer';
import { operatingExpenseRatioTemplate } from './operatingExpenseRatio';
import { opexPerUnitTemplate } from './opexPerUnit';
import { pricePerUnitTemplate } from './pricePerUnit';
import { rentPerUnitTemplate } from './rentPerUnit';
import { reversionValueTemplate } from './reversionValue';
import { irrSimpleTemplate } from './irrSimple';
import { leveredIrrTemplate } from './leveredIrr';
import { netEffectiveRentTemplate } from './netEffectiveRent';
import { opexChangeTemplate } from './opexChange';
import { otherIncomeImpactTemplate } from './otherIncomeImpact';
import { pricePerSfTemplate } from './pricePerSf';
import { rentChangeTemplate } from './rentChange';
import { rentRollChangeTemplate } from './rentRollChange';
import { replacementCostTemplate } from './replacementCost';
import { targetMultipleTemplate } from './targetMultiple';
import { taxReassessmentTemplate } from './taxReassessment';
import { tiPaybackTemplate } from './tiPayback';
import { tiVsRentTemplate } from './tiVsRent';
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
  debtYield: debtYieldTemplate,
  dscrLoanSizing: dscrLoanSizingTemplate,
  cashOnCash: cashOnCashTemplate,
  breakEvenOccupancy: breakEvenOccupancyTemplate,
  leveredIrr: leveredIrrTemplate,
  netEffectiveRent: netEffectiveRentTemplate,
  tiVsRent: tiVsRentTemplate,
  tiPayback: tiPaybackTemplate,
  rentRollChange: rentRollChangeTemplate,
  taxReassessment: taxReassessmentTemplate,
  grossRentMultiplier: grossRentMultiplierTemplate,
  loanConstant: loanConstantTemplate,
  cagr: cagrTemplate,
  compoundGrowth: compoundGrowthTemplate,
  reversionValue: reversionValueTemplate,
  operatingExpenseRatio: operatingExpenseRatioTemplate,
  noiFromOer: noiFromOerTemplate,
  rentPerUnit: rentPerUnitTemplate,
  opexPerUnit: opexPerUnitTemplate,
  pricePerUnit: pricePerUnitTemplate,
  dscrFromNoiAndDs: dscrFromNoiAndDsTemplate,
  dscrSensitivityRate: dscrSensitivityRateTemplate,
  dscrTestPasses: dscrTestPassesTemplate,
  holdVsSellIrr: holdVsSellIrrTemplate,
  taxAdjustedExit: taxAdjustedExitTemplate,
  extensionDrag: extensionDragTemplate,
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
  'debtYield',
  'dscrLoanSizing',
  'cashOnCash',
  'breakEvenOccupancy',
  'leveredIrr',
  'netEffectiveRent',
  'tiVsRent',
  'tiPayback',
  'rentRollChange',
  'taxReassessment',
  'grossRentMultiplier',
  'loanConstant',
  'cagr',
  'compoundGrowth',
  'reversionValue',
  'operatingExpenseRatio',
  'noiFromOer',
  'rentPerUnit',
  'opexPerUnit',
  'pricePerUnit',
  'dscrFromNoiAndDs',
  'dscrSensitivityRate',
  'dscrTestPasses',
  'holdVsSellIrr',
  'taxAdjustedExit',
  'extensionDrag',
];
