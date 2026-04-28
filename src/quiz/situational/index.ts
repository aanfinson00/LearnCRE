import type {
  SituationalCase,
  SituationalDifficulty,
  SituationalRunConfig,
} from '../../types/situational';
import type { AssetClass } from '../assetClasses';
import { capRateDivergence } from './capRateDivergence';
import { absorptionTiming } from './absorptionTiming';
import { markToMarketUpside } from './markToMarketUpside';
import { noiGrowthSmellTest } from './noiGrowthSmellTest';
import { compSetVetting } from './compSetVetting';
import { taxReassessmentSurprise } from './taxReassessmentSurprise';

export const SITUATIONAL_CASES: SituationalCase[] = [
  capRateDivergence,
  absorptionTiming,
  markToMarketUpside,
  noiGrowthSmellTest,
  compSetVetting,
  taxReassessmentSurprise,
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
  config: Pick<SituationalRunConfig, 'category' | 'difficulty' | 'assetClass'>,
): SituationalCase[] {
  return SITUATIONAL_CASES.filter((c) => {
    if (config.category !== 'all' && c.category !== config.category) return false;
    if (!matchesDifficulty(c, config.difficulty)) return false;
    if (!matchesAssetClass(c, config.assetClass)) return false;
    return true;
  });
}

/**
 * Pick up to `length` cases, deterministic-ish: shuffle by a session seed so
 * repeat runs vary, but always return at most the available pool.
 */
export function pickCases(
  pool: SituationalCase[],
  length: number,
  seed = Date.now(),
): SituationalCase[] {
  const arr = [...pool];
  let s = seed >>> 0;
  for (let i = arr.length - 1; i > 0; i--) {
    s = (s * 1664525 + 1013904223) >>> 0;
    const j = s % (i + 1);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.slice(0, Math.min(length, arr.length));
}
