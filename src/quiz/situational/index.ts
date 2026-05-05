import type {
  SituationalCase,
  SituationalDifficulty,
  SituationalRunConfig,
} from '../../types/situational';
import { matchesRole } from '../../types/role';
import type { AssetClass } from '../assetClasses';
import { capRateDivergence } from './capRateDivergence';
import { absorptionTiming } from './absorptionTiming';
import { markToMarketUpside } from './markToMarketUpside';
import { noiGrowthSmellTest } from './noiGrowthSmellTest';
import { compSetVetting } from './compSetVetting';
import { taxReassessmentSurprise } from './taxReassessmentSurprise';
import { rentRollUndervalued } from './rentRollUndervalued';
import { tiVsRentGiveBack } from './tiVsRentGiveBack';
import { refiVsSell } from './refiVsSell';
import { capSpread } from './capSpread';
import { vacancySpike } from './vacancySpike';
import { tenantCreditPricing } from './tenantCreditPricing';
import { dscrRefiFailing } from './dscrRefiFailing';
import { compVintageAdjustment } from './compVintageAdjustment';
import { exitCapConservatism } from './exitCapConservatism';
import { trendedVsInplaceLeaseup } from './trendedVsInplaceLeaseup';
import { noiGrowthMissing } from './noiGrowthMissing';
import { rolloverConcentration } from './rolloverConcentration';
import { sponsorProformaAggressive } from './sponsorProformaAggressive';
import { debtYieldVsDscr } from './debtYieldVsDscr';
import { overWeightOffice } from './overWeightOffice';
import { holdExtensionDiscipline } from './holdExtensionDiscipline';
import { taxVsIrrTradeoff } from './taxVsIrrTradeoff';
import { capexReserveDiscipline } from './capexReserveDiscipline';
import { refiCapStress } from './refiCapStress';
import { fundVsDealIrrGap } from './fundVsDealIrrGap';
import { devLtcVsLtv } from './devLtcVsLtv';
import { distressedLoanWorkout } from './distressedLoanWorkout';
import { leaseStructureNnnVsGross } from './leaseStructureNnnVsGross';
import { sponsorRecourseVsCovenants } from './sponsorRecourseVsCovenants';
import { groundLeaseVsFee } from './groundLeaseVsFee';
import { capitalCallMechanics } from './capitalCallMechanics';
import { closingProrations } from './closingProrations';
import { constructionCostOverrun } from './constructionCostOverrun';
import { lenderDrawMechanics } from './lenderDrawMechanics';
import { bankAccountStructure } from './bankAccountStructure';
import { balanceSheetRefiImpact } from './balanceSheetRefiImpact';
import { budgetVsActualVariance } from './budgetVsActualVariance';
import { distributionWaterfall } from './distributionWaterfall';
import { closingChecklistSequence } from './closingChecklistSequence';
import { covenantTestingCadence } from './covenantTestingCadence';
import { costSegregationBasics } from './costSegregationBasics';
import { omRedFlags } from './omRedFlags';
import { tenantImprovementApproval } from './tenantImprovementApproval';
import { waterfallEuropeanVsAmerican } from './waterfallEuropeanVsAmerican';
import { waterfallCatchupMechanics } from './waterfallCatchupMechanics';
import { waterfallIrrVsMoicHurdle } from './waterfallIrrVsMoicHurdle';
import { waterfallClawbackMechanics } from './waterfallClawbackMechanics';
import { waterfallPrefCompoundVsSimple } from './waterfallPrefCompoundVsSimple';
import { waterfallKeyPersonEvent } from './waterfallKeyPersonEvent';
import { dscrTestTimingMechanics } from './dscrTestTimingMechanics';
import { dscrCashTrapTrigger } from './dscrCashTrapTrigger';
import { dscrCureRights } from './dscrCureRights';
import { dscrSpringingRecourse } from './dscrSpringingRecourse';
import { lpaInitialVsAdditionalCapital } from './lpaInitialVsAdditionalCapital';
import { lpaCapitalCallDefault } from './lpaCapitalCallDefault';
import { lpaCostOverrunSharing } from './lpaCostOverrunSharing';
import { lpaContributionRatios } from './lpaContributionRatios';
import { leaseBillbackAllowance } from './leaseBillbackAllowance';
import { leaseBaseYearVsStop } from './leaseBaseYearVsStop';
import { leaseCamReconciliation } from './leaseCamReconciliation';
import { constructionLiquidatedDamages } from './constructionLiquidatedDamages';
import { psaEarnestMoneyDefault } from './psaEarnestMoneyDefault';
import { constructionEquityFirstVsParipassu } from './constructionEquityFirstVsParipassu';
import { constructionChangeOrderPricing } from './constructionChangeOrderPricing';
import { constructionRetainageRelease } from './constructionRetainageRelease';

export const SITUATIONAL_CASES: SituationalCase[] = [
  capRateDivergence,
  absorptionTiming,
  markToMarketUpside,
  noiGrowthSmellTest,
  compSetVetting,
  taxReassessmentSurprise,
  rentRollUndervalued,
  tiVsRentGiveBack,
  refiVsSell,
  capSpread,
  vacancySpike,
  tenantCreditPricing,
  dscrRefiFailing,
  compVintageAdjustment,
  exitCapConservatism,
  trendedVsInplaceLeaseup,
  noiGrowthMissing,
  rolloverConcentration,
  sponsorProformaAggressive,
  debtYieldVsDscr,
  overWeightOffice,
  holdExtensionDiscipline,
  taxVsIrrTradeoff,
  capexReserveDiscipline,
  refiCapStress,
  fundVsDealIrrGap,
  devLtcVsLtv,
  distressedLoanWorkout,
  leaseStructureNnnVsGross,
  sponsorRecourseVsCovenants,
  groundLeaseVsFee,
  capitalCallMechanics,
  closingProrations,
  constructionCostOverrun,
  lenderDrawMechanics,
  bankAccountStructure,
  balanceSheetRefiImpact,
  budgetVsActualVariance,
  distributionWaterfall,
  closingChecklistSequence,
  covenantTestingCadence,
  costSegregationBasics,
  omRedFlags,
  tenantImprovementApproval,
  waterfallEuropeanVsAmerican,
  waterfallCatchupMechanics,
  waterfallIrrVsMoicHurdle,
  waterfallClawbackMechanics,
  waterfallPrefCompoundVsSimple,
  waterfallKeyPersonEvent,
  dscrTestTimingMechanics,
  dscrCashTrapTrigger,
  dscrCureRights,
  dscrSpringingRecourse,
  lpaInitialVsAdditionalCapital,
  lpaCapitalCallDefault,
  lpaCostOverrunSharing,
  lpaContributionRatios,
  leaseBillbackAllowance,
  leaseBaseYearVsStop,
  leaseCamReconciliation,
  constructionLiquidatedDamages,
  psaEarnestMoneyDefault,
  constructionEquityFirstVsParipassu,
  constructionChangeOrderPricing,
  constructionRetainageRelease,
];

export function caseById(id: string): SituationalCase | undefined {
  return SITUATIONAL_CASES.find((c) => c.id === id);
}

function matchesAssetClass(c: SituationalCase, ac: AssetClass): boolean {
  if (ac === 'mixed') return true;
  if (!c.assetClass) return true;
  return c.assetClass === ac;
}

function matchesDifficulty(
  c: SituationalCase,
  d: SituationalDifficulty | 'all',
): boolean {
  return d === 'all' || c.difficulty === d;
}

export function filterCases(
  config: Pick<SituationalRunConfig, 'category' | 'difficulty' | 'assetClass' | 'role'>,
): SituationalCase[] {
  return SITUATIONAL_CASES.filter((c) => {
    if (config.category !== 'all' && c.category !== config.category) return false;
    if (!matchesDifficulty(c, config.difficulty)) return false;
    if (!matchesAssetClass(c, config.assetClass)) return false;
    if (!matchesRole(c.roles, config.role)) return false;
    return true;
  });
}

function shuffleInPlace<T>(arr: T[], seed: number): void {
  let s = seed >>> 0;
  // Avoid s === 0 (LCG with seed 0 produces a constant — would no-op the shuffle)
  if (s === 0) s = 0x9e3779b9;
  for (let i = arr.length - 1; i > 0; i--) {
    s = (s * 1664525 + 1013904223) >>> 0;
    const j = s % (i + 1);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

/**
 * Pick up to `length` cases for a session and shuffle each case's options.
 *
 * Both shuffles are seeded — repeat runs from the same seed are deterministic.
 * The option shuffle uses a per-index derived seed so the choice order varies
 * even when the same case shows up in two consecutive runs. Returns a deep-
 * enough clone (cases get a fresh options array) so the global catalog is not
 * mutated.
 *
 * Without this, every shipped case has `isBest: true` on option A and the user
 * would learn to pick A on autopilot.
 */
export function pickCases(
  pool: SituationalCase[],
  length: number,
  seed = Date.now(),
): SituationalCase[] {
  const arr = [...pool];
  shuffleInPlace(arr, seed);
  const picked = arr.slice(0, Math.min(length, arr.length));
  return picked.map((c, i) => {
    const options = [...c.options];
    shuffleInPlace(options, (seed ^ ((i + 1) * 0x9e3779b9)) >>> 0);
    return { ...c, options };
  });
}
