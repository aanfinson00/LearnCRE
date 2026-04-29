import { afterEach, beforeEach, describe, it, expect } from 'vitest';
import { ACHIEVEMENTS, evaluateAchievements } from '../achievements';
import type { AchievementContext } from '../achievements';
import type { LifetimeStats } from '../../types/session';

beforeEach(() => {
  localStorage.clear();
});

afterEach(() => {
  localStorage.clear();
});

const emptyLifetime: LifetimeStats = { attempts: 0, correct: 0, perCategory: {} };

const ctx = (over: Partial<AchievementContext>): AchievementContext => ({
  lifetime: emptyLifetime,
  sessions: [],
  walkthroughIdsCompleted: new Set(),
  speedDrillVariantsTried: new Set(),
  pureMathAccuracy: {},
  outstandingMissKinds: new Set(),
  minutesToday: 0,
  daysSinceLastSession: Number.POSITIVE_INFINITY,
  distinctActiveDays: 0,
  bestDailyStreak: 0,
  situationalCorrectIds: new Set(),
  situationalCategoryAccuracy: {},
  excelCorrectIds: new Set(),
  ...over,
});

describe('quiz/achievements', () => {
  it('first-steps unlocks at one attempt', () => {
    const def = ACHIEVEMENTS.find((a) => a.id === 'first-steps')!;
    expect(def.evaluate(ctx({}))).toBe(false);
    expect(def.evaluate(ctx({ lifetime: { attempts: 1, correct: 0, perCategory: {} } }))).toBe(true);
  });

  it('hundred-club fires at 100 correct, not 99', () => {
    const def = ACHIEVEMENTS.find((a) => a.id === 'hundred-club')!;
    expect(def.evaluate(ctx({ lifetime: { attempts: 110, correct: 99, perCategory: {} } }))).toBe(false);
    expect(def.evaluate(ctx({ lifetime: { attempts: 110, correct: 100, perCategory: {} } }))).toBe(true);
  });

  it('hot-streak requires latestSessionStats best streak ≥ 10', () => {
    const def = ACHIEVEMENTS.find((a) => a.id === 'hot-streak')!;
    expect(def.evaluate(ctx({}))).toBe(false);
    expect(
      def.evaluate(
        ctx({
          latestSessionStats: {
            total: 10,
            correct: 10,
            accuracyPct: 1,
            currentStreak: 10,
            bestStreak: 10,
            avgResponseMs: 5000,
            perCategory: {},
          },
        }),
      ),
    ).toBe(true);
  });

  it('marathoner needs 60 minutes today', () => {
    const def = ACHIEVEMENTS.find((a) => a.id === 'marathoner')!;
    expect(def.evaluate(ctx({ minutesToday: 30 }))).toBe(false);
    expect(def.evaluate(ctx({ minutesToday: 60 }))).toBe(true);
  });

  it('time-traveler needs 30+ days since last session', () => {
    const def = ACHIEVEMENTS.find((a) => a.id === 'time-traveler')!;
    expect(def.evaluate(ctx({ daysSinceLastSession: 10 }))).toBe(false);
    expect(def.evaluate(ctx({ daysSinceLastSession: 31 }))).toBe(true);
    expect(def.evaluate(ctx({ daysSinceLastSession: Number.POSITIVE_INFINITY }))).toBe(false);
  });

  it('all-tracks needs every CRE variant tried', () => {
    const def = ACHIEVEMENTS.find((a) => a.id === 'all-tracks')!;
    const partial = new Set(['capCompression', 'irrToEm']);
    const full = new Set(['capCompression', 'irrToEm', 'loanConstant', 'noiCapToValue']);
    expect(def.evaluate(ctx({ speedDrillVariantsTried: partial }))).toBe(false);
    expect(def.evaluate(ctx({ speedDrillVariantsTried: full }))).toBe(true);
  });

  it('pure-math-master requires 90%+ on each pure-math drill with 5+ attempts', () => {
    const def = ACHIEVEMENTS.find((a) => a.id === 'pure-math-master')!;
    const insufficient = {
      percentOf: { total: 5, correct: 5 },
      divideBy: { total: 5, correct: 4 },
      combinedDiscount: { total: 5, correct: 5 },
      nthRoot: { total: 5, correct: 5 },
      reciprocalTable: { total: 5, correct: 5 },
    };
    expect(def.evaluate(ctx({ pureMathAccuracy: insufficient }))).toBe(false);
    const passing = {
      percentOf: { total: 10, correct: 10 },
      divideBy: { total: 10, correct: 9 },
      combinedDiscount: { total: 10, correct: 10 },
      nthRoot: { total: 10, correct: 9 },
      reciprocalTable: { total: 10, correct: 10 },
    };
    expect(def.evaluate(ctx({ pureMathAccuracy: passing }))).toBe(true);
  });

  it('walkthrough-apprentice requires every walkthrough id', async () => {
    const { walkthroughs } = await import('../walkthroughs');
    const def = ACHIEVEMENTS.find((a) => a.id === 'walkthrough-apprentice')!;
    expect(def.evaluate(ctx({}))).toBe(false);
    expect(
      def.evaluate(
        ctx({ walkthroughIdsCompleted: new Set(walkthroughs.map((w) => w.id)) }),
      ),
    ).toBe(true);
  });

  it('mistake-crusher needs empty mistake bank and 50+ attempts', () => {
    const def = ACHIEVEMENTS.find((a) => a.id === 'mistake-crusher')!;
    expect(def.evaluate(ctx({ outstandingMissKinds: new Set() }))).toBe(false);
    expect(
      def.evaluate(
        ctx({
          outstandingMissKinds: new Set(),
          lifetime: { attempts: 50, correct: 45, perCategory: {} },
        }),
      ),
    ).toBe(true);
    expect(
      def.evaluate(
        ctx({
          outstandingMissKinds: new Set(['capCompression']),
          lifetime: { attempts: 50, correct: 45, perCategory: {} },
        }),
      ),
    ).toBe(false);
  });

  it('evaluateAchievements persists newly-unlocked + does not double-fire', () => {
    const c = ctx({ lifetime: { attempts: 1, correct: 0, perCategory: {} } });
    const first = evaluateAchievements(c);
    expect(first).toContain('first-steps');
    const again = evaluateAchievements(c);
    expect(again).toEqual([]);
  });
});
