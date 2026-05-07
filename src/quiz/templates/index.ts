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
import { prefAccrualTemplate } from './prefAccrual';
import { waterfallSimpleSplitTemplate } from './waterfallSimpleSplit';
import { gpCatchUpTemplate } from './gpCatchUp';
import { gpEffectivePromoteTemplate } from './gpEffectivePromote';
import { irrAfterPromoteTemplate } from './irrAfterPromote';
import { costToCompleteTemplate } from './costToComplete';
import { drawAllocationTemplate } from './drawAllocation';
import { retainageRunningTemplate } from './retainageRunning';
import { contingencyDrawDownTemplate } from './contingencyDrawDown';
import { revparFromAdrOccTemplate } from './revparFromAdrOcc';
import { gopMarginTemplate } from './gopMargin';
import { ffeReserveDollarsTemplate } from './ffeReserveDollars';
import { revporVsRevparTemplate } from './revporVsRevpar';
import { waltTemplate } from './walt';
import { tiPerSfPerYearOfTermTemplate } from './tiPerSfPerYearOfTerm';
import { renewalProbabilityWeightedRentTemplate } from './renewalProbabilityWeightedRent';
import { salesPerSfTemplate } from './salesPerSf';
import { occupancyCostRatioTemplate } from './occupancyCostRatio';
import { percentageRentBreakpointTemplate } from './percentageRentBreakpoint';
import { clearHeightPremiumTemplate } from './clearHeightPremium';
import { truckCountPerSfTemplate } from './truckCountPerSf';
import { lossToLeaseTemplate } from './lossToLease';
import { refiStressTestTemplate } from './refiStressTest';
import { feeDragOnIrrTemplate } from './feeDragOnIrr';
import { leaseUpReserveTemplate } from './leaseUpReserve';
import { constructionLoanSizingTemplate } from './constructionLoanSizing';
import { capexReserveSizingTemplate } from './capexReserveSizing';

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
  prefAccrual: prefAccrualTemplate,
  waterfallSimpleSplit: waterfallSimpleSplitTemplate,
  gpCatchUp: gpCatchUpTemplate,
  gpEffectivePromote: gpEffectivePromoteTemplate,
  irrAfterPromote: irrAfterPromoteTemplate,
  costToComplete: costToCompleteTemplate,
  drawAllocation: drawAllocationTemplate,
  retainageRunning: retainageRunningTemplate,
  contingencyDrawDown: contingencyDrawDownTemplate,
  revparFromAdrOcc: revparFromAdrOccTemplate,
  gopMargin: gopMarginTemplate,
  ffeReserveDollars: ffeReserveDollarsTemplate,
  revporVsRevpar: revporVsRevparTemplate,
  walt: waltTemplate,
  tiPerSfPerYearOfTerm: tiPerSfPerYearOfTermTemplate,
  renewalProbabilityWeightedRent: renewalProbabilityWeightedRentTemplate,
  salesPerSf: salesPerSfTemplate,
  occupancyCostRatio: occupancyCostRatioTemplate,
  percentageRentBreakpoint: percentageRentBreakpointTemplate,
  clearHeightPremium: clearHeightPremiumTemplate,
  truckCountPerSf: truckCountPerSfTemplate,
  lossToLease: lossToLeaseTemplate,
  refiStressTest: refiStressTestTemplate,
  feeDragOnIrr: feeDragOnIrrTemplate,
  leaseUpReserve: leaseUpReserveTemplate,
  constructionLoanSizing: constructionLoanSizingTemplate,
  capexReserveSizing: capexReserveSizingTemplate,
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
  'prefAccrual',
  'waterfallSimpleSplit',
  'gpCatchUp',
  'gpEffectivePromote',
  'irrAfterPromote',
  'costToComplete',
  'drawAllocation',
  'retainageRunning',
  'contingencyDrawDown',
  'revparFromAdrOcc',
  'gopMargin',
  'ffeReserveDollars',
  'revporVsRevpar',
  'walt',
  'tiPerSfPerYearOfTerm',
  'renewalProbabilityWeightedRent',
  'salesPerSf',
  'occupancyCostRatio',
  'percentageRentBreakpoint',
  'clearHeightPremium',
  'truckCountPerSf',
  'lossToLease',
  'refiStressTest',
  'feeDragOnIrr',
  'leaseUpReserve',
  'constructionLoanSizing',
  'capexReserveSizing',
];
