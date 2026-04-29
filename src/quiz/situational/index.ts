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
