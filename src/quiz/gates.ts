import type { TierState } from '../types/profile';
import { profileKey } from '../storage/profiles';
import { TIERS, tierAtLeast, type Tier } from './tiers';

export type GateFeature =
  | 'difficulty.advanced'
  | 'difficulty.dynamic'
  | 'mode.speedDrill'
  | 'mode.walkthrough';

interface GateRule {
  feature: GateFeature;
  label: string;
  /** Either tier-based or attempt-based unlock — first to fire wins. */
  minTier?: Tier['id'];
  minAttempts?: number;
}

export const GATES: GateRule[] = [
  {
    feature: 'difficulty.advanced',
    label: 'Analyst I or 50 Q answered',
    minTier: 'analyst1',
    minAttempts: 50,
  },
  {
    feature: 'difficulty.dynamic',
    label: 'Analyst II or 200 Q answered',
    minTier: 'analyst2',
    minAttempts: 200,
  },
  {
    feature: 'mode.speedDrill',
    label: 'Analyst I or 30 Q answered',
    minTier: 'analyst1',
    minAttempts: 30,
  },
  {
    feature: 'mode.walkthrough',
    label: 'Analyst I or 25 Q answered',
    minTier: 'analyst1',
    minAttempts: 25,
  },
];

export function isUnlocked(
  feature: GateFeature,
  ctx: { totalXp: number; lifetimeAttempts: number; bypassGates: boolean },
): boolean {
  if (ctx.bypassGates) return true;
  const rule = GATES.find((g) => g.feature === feature);
  if (!rule) return true;
  if (rule.minTier && tierAtLeast(ctx.totalXp, rule.minTier)) return true;
  if (rule.minAttempts !== undefined && ctx.lifetimeAttempts >= rule.minAttempts) return true;
  return false;
}

export function gateLabel(feature: GateFeature): string {
  return GATES.find((g) => g.feature === feature)?.label ?? '';
}

// ---------- persistence ----------

const KEY_SUFFIX = 'tier.v1';

export function loadTierState(profileId?: string): TierState {
  try {
    const raw = localStorage.getItem(profileKey(KEY_SUFFIX, profileId));
    if (!raw) return { bypassGates: false };
    const parsed = JSON.parse(raw) as TierState;
    return { bypassGates: Boolean(parsed.bypassGates) };
  } catch {
    return { bypassGates: false };
  }
}

export function saveTierState(state: TierState, profileId?: string): void {
  try {
    localStorage.setItem(profileKey(KEY_SUFFIX, profileId), JSON.stringify(state));
  } catch {
    /* ignore */
  }
}

void TIERS;
