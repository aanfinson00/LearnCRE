import type {
  LongformCase,
  LongformDifficulty,
  LongformRunConfig,
} from '../../types/longform';
import { matchesRole } from '../../types/role';
import { walkMeThroughBid } from './walkMeThroughBid';
import { diagnoseNoiMiss } from './diagnoseNoiMiss';
import { defendDealToIc } from './defendDealToIc';
import { refiOrSellMemo } from './refiOrSellMemo';
import { walkMeThroughWaterfall } from './walkMeThroughWaterfall';
import { defendWaterfallTerms } from './defendWaterfallTerms';

export const LONGFORM_CASES: LongformCase[] = [
  walkMeThroughBid,
  diagnoseNoiMiss,
  defendDealToIc,
  refiOrSellMemo,
  walkMeThroughWaterfall,
  defendWaterfallTerms,
];

export function caseById(id: string): LongformCase | undefined {
  return LONGFORM_CASES.find((c) => c.id === id);
}

function matchesDifficulty(
  c: LongformCase,
  d: LongformDifficulty | 'all',
): boolean {
  return d === 'all' || c.difficulty === d;
}

export function filterCases(
  config: Pick<LongformRunConfig, 'difficulty' | 'role'>,
): LongformCase[] {
  return LONGFORM_CASES.filter((c) => {
    if (!matchesDifficulty(c, config.difficulty)) return false;
    if (!matchesRole(c.roles, config.role)) return false;
    return true;
  });
}

export function pickCases(
  pool: LongformCase[],
  length: number,
  seed = Date.now(),
): LongformCase[] {
  const arr = [...pool];
  let s = (seed >>> 0) || 0x9e3779b9;
  for (let i = arr.length - 1; i > 0; i--) {
    s = (s * 1664525 + 1013904223) >>> 0;
    const j = s % (i + 1);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.slice(0, Math.min(length, arr.length));
}
