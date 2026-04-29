import type { AchievementUnlock, SessionRecord } from '../types/profile';
import type { LifetimeStats, SessionStats } from '../types/session';
import { profileKey } from '../storage/profiles';
import { allKinds } from './templates';
import { walkthroughs } from './walkthroughs';

const KEY_SUFFIX = 'achievements.v1';

/** Pure-math drill IDs — in sync with src/quiz/speedDrillVariants.ts */
const PURE_MATH_VARIANTS = [
  'percentOf',
  'divideBy',
  'combinedDiscount',
  'nthRoot',
  'reciprocalTable',
] as const;

/** CRE speed drill variant IDs — for "All Tracks" */
const CRE_VARIANTS = ['capCompression', 'irrToEm', 'loanConstant', 'noiCapToValue'] as const;

export interface AchievementContext {
  lifetime: LifetimeStats;
  sessions: SessionRecord[];
  /** The session that just finished, if any (for "in this session" criteria) */
  latestSession?: SessionRecord;
  latestSessionStats?: SessionStats;
  walkthroughIdsCompleted: Set<string>;
  /** Variant ids the user has tried at least once on the speed drill */
  speedDrillVariantsTried: Set<string>;
  /** Per-pure-math-variant accuracy from session history */
  pureMathAccuracy: Record<string, { total: number; correct: number }>;
  /** Mistakes outstanding (from mistake bank) by kind */
  outstandingMissKinds: Set<string>;
  /** Total minutes drilled today */
  minutesToday: number;
  /** Days since the user's last session before this one (Infinity if never) */
  daysSinceLastSession: number;
  /** Distinct calendar days the user has drilled */
  distinctActiveDays: number;
  /** Best login-streak in days */
  bestDailyStreak: number;
  /** Distinct situational case ids the user has answered correctly */
  situationalCorrectIds: Set<string>;
  /** Per-situational-category accuracy across session history */
  situationalCategoryAccuracy: Record<string, { total: number; correct: number }>;
  /** Distinct excel template ids the user has answered correctly */
  excelCorrectIds: Set<string>;
}

export interface AchievementDef {
  id: string;
  label: string;
  description: string;
  icon: string;
  evaluate(ctx: AchievementContext): boolean;
}

export const ACHIEVEMENTS: AchievementDef[] = [
  {
    id: 'first-steps',
    label: 'First Steps',
    description: 'Answer your first question.',
    icon: '🌱',
    evaluate: (c) => c.lifetime.attempts >= 1,
  },
  {
    id: 'foundations',
    label: 'Foundations',
    description: 'Finish a 10-question session covering the core eight kinds.',
    icon: '🧱',
    evaluate: (c) => {
      const last = c.latestSession;
      if (!last) return false;
      const cfg = last.config as Record<string, unknown> | undefined;
      const cats = (cfg?.categories ?? []) as string[];
      const FOUNDATIONS = [
        'capCompression',
        'goingInCap',
        'vacancySensitivity',
        'otherIncomeImpact',
        'rentChange',
        'combinedScenario',
        'equityMultiple',
        'irrSimple',
      ];
      const isFoundationsSet =
        cats.length > 0 && cats.every((k) => FOUNDATIONS.includes(k));
      return last.kind === 'quiz' && last.attempts >= 10 && isFoundationsSet;
    },
  },
  {
    id: 'hot-streak',
    label: 'Hot Streak',
    description: '10 correct in a row in one session.',
    icon: '🔥',
    evaluate: (c) => (c.latestSessionStats?.bestStreak ?? 0) >= 10,
  },
  {
    id: 'week-one',
    label: 'Week One',
    description: 'Drill 7 days in a row.',
    icon: '📅',
    evaluate: (c) => c.bestDailyStreak >= 7,
  },
  {
    id: 'hundred-club',
    label: 'Hundred Club',
    description: '100 correct answers lifetime.',
    icon: '💯',
    evaluate: (c) => c.lifetime.correct >= 100,
  },
  {
    id: 'five-hundred-club',
    label: 'Five-Hundred Club',
    description: '500 correct answers lifetime.',
    icon: '🏆',
    evaluate: (c) => c.lifetime.correct >= 500,
  },
  {
    id: 'marathoner',
    label: 'Marathoner',
    description: '60 minutes drilled in a single day.',
    icon: '🏃',
    evaluate: (c) => c.minutesToday >= 60,
  },
  {
    id: 'time-traveler',
    label: 'Time Traveler',
    description: 'Return to drill after 30+ days away.',
    icon: '⏳',
    evaluate: (c) => Number.isFinite(c.daysSinceLastSession) && c.daysSinceLastSession >= 30,
  },
  {
    id: 'all-tracks',
    label: 'All Tracks',
    description: 'Try every CRE-flavored speed drill at least once.',
    icon: '🛤️',
    evaluate: (c) => CRE_VARIANTS.every((v) => c.speedDrillVariantsTried.has(v)),
  },
  {
    id: 'pure-math-master',
    label: 'Pure Math Master',
    description: '90%+ accuracy on each pure-math drill (5+ attempts each).',
    icon: '🧮',
    evaluate: (c) => {
      return PURE_MATH_VARIANTS.every((v) => {
        const acc = c.pureMathAccuracy[v];
        if (!acc || acc.total < 5) return false;
        return acc.correct / acc.total >= 0.9;
      });
    },
  },
  {
    id: 'walkthrough-apprentice',
    label: 'Walkthrough Apprentice',
    description: 'Complete every walkthrough.',
    icon: '🧗',
    evaluate: (c) => walkthroughs.every((w) => c.walkthroughIdsCompleted.has(w.id)),
  },
  {
    id: 'mistake-crusher',
    label: 'Mistake Crusher',
    description: 'Clear your mistake bank — answer every kind in it correctly.',
    icon: '⚒️',
    evaluate: (c) => allKinds.length > 0 && c.outstandingMissKinds.size === 0 && c.lifetime.attempts >= 50,
  },
  {
    id: 'reasoning-apprentice',
    label: 'Reasoning Apprentice',
    description: 'Pick the most-defensible answer in 5 distinct situational cases.',
    icon: '🧭',
    evaluate: (c) => c.situationalCorrectIds.size >= 5,
  },
  {
    id: 'diagnostic-eye',
    label: 'Diagnostic Eye',
    description: '90%+ accuracy on diagnostic situational cases (5+ attempts).',
    icon: '🔍',
    evaluate: (c) => {
      const acc = c.situationalCategoryAccuracy['diagnostic'];
      if (!acc || acc.total < 5) return false;
      return acc.correct / acc.total >= 0.9;
    },
  },
  {
    id: 'spreadsheet-apprentice',
    label: 'Spreadsheet Apprentice',
    description: 'Write 5 distinct Excel formulas that compute the right value.',
    icon: '📊',
    evaluate: (c) => c.excelCorrectIds.size >= 5,
  },
];

// ---------- persistence ----------

export function loadUnlocked(profileId?: string): AchievementUnlock[] {
  try {
    const raw = localStorage.getItem(profileKey(KEY_SUFFIX, profileId));
    if (!raw) return [];
    const parsed = JSON.parse(raw) as AchievementUnlock[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveUnlocked(unlocks: AchievementUnlock[], profileId?: string): void {
  try {
    localStorage.setItem(profileKey(KEY_SUFFIX, profileId), JSON.stringify(unlocks));
  } catch {
    /* ignore */
  }
}

/**
 * Evaluate every achievement against ctx, persist new unlocks, and return only
 * the IDs that became newly unlocked this call.
 */
export function evaluateAchievements(ctx: AchievementContext, profileId?: string): string[] {
  const existing = loadUnlocked(profileId);
  const knownIds = new Set(existing.map((u) => u.id));
  const newlyUnlocked: string[] = [];
  const now = Date.now();
  const next = [...existing];
  for (const def of ACHIEVEMENTS) {
    if (knownIds.has(def.id)) continue;
    let ok = false;
    try {
      ok = def.evaluate(ctx);
    } catch {
      ok = false;
    }
    if (ok) {
      next.push({ id: def.id, unlockedAt: now });
      newlyUnlocked.push(def.id);
    }
  }
  if (newlyUnlocked.length > 0) saveUnlocked(next, profileId);
  return newlyUnlocked;
}
