import { describe, expect, it } from 'vitest';
import {
  mergeAchievements,
  mergeMistakes,
  mergeSessions,
  mergeXp,
} from '../sync';
import type { AchievementUnlock, SessionRecord, XpState } from '../../types/profile';
import type { MistakeRecord } from '../../storage/mistakeBank';

describe('cloud/sync — merge helpers', () => {
  describe('mergeXp', () => {
    it('takes field-wise max across local and cloud', () => {
      const local: XpState = { totalXp: 100, bestSessionXp: 30, currentStreak: 5, bestStreak: 7 };
      const cloud: XpState = { totalXp: 80, bestSessionXp: 50, currentStreak: 3, bestStreak: 10 };
      expect(mergeXp(local, cloud)).toEqual({
        totalXp: 100,
        bestSessionXp: 50,
        currentStreak: 5,
        bestStreak: 10,
      });
    });

    it('handles empty local (new device case)', () => {
      const local: XpState = { totalXp: 0, bestSessionXp: 0, currentStreak: 0, bestStreak: 0 };
      const cloud: XpState = { totalXp: 250, bestSessionXp: 80, currentStreak: 12, bestStreak: 15 };
      expect(mergeXp(local, cloud)).toEqual(cloud);
    });
  });

  describe('mergeSessions', () => {
    const s = (id: string, finishedAt: number): SessionRecord => ({
      id,
      finishedAt,
      kind: 'quiz',
      config: {},
      attempts: 10,
      correct: 7,
      accuracyPct: 0.7,
      durationMs: 60_000,
      xpEarned: 50,
    });

    it('UNIONs local + cloud by id', () => {
      const merged = mergeSessions([s('a', 1), s('b', 2)], [s('c', 3), s('d', 4)]);
      expect(merged.map((m) => m.id)).toEqual(['a', 'b', 'c', 'd']);
    });

    it('local wins on id collision (recent runs)', () => {
      const localRow = { ...s('a', 5), correct: 9 };
      const cloudRow = { ...s('a', 5), correct: 1 };
      const merged = mergeSessions([localRow], [cloudRow]);
      expect(merged).toHaveLength(1);
      expect(merged[0].correct).toBe(9);
    });

    it('sorts ascending by finishedAt', () => {
      const merged = mergeSessions([s('a', 30)], [s('b', 10), s('c', 20)]);
      expect(merged.map((m) => m.id)).toEqual(['b', 'c', 'a']);
    });
  });

  describe('mergeAchievements', () => {
    it('UNIONs and keeps the earliest unlock', () => {
      const local: AchievementUnlock[] = [{ id: 'first-quiz', unlockedAt: 1000 }];
      const cloud: AchievementUnlock[] = [{ id: 'first-quiz', unlockedAt: 500 }];
      const merged = mergeAchievements(local, cloud);
      expect(merged).toHaveLength(1);
      expect(merged[0].unlockedAt).toBe(500);
    });

    it('combines distinct ids', () => {
      const local: AchievementUnlock[] = [{ id: 'a', unlockedAt: 1 }];
      const cloud: AchievementUnlock[] = [{ id: 'b', unlockedAt: 2 }];
      expect(mergeAchievements(local, cloud).map((m) => m.id)).toEqual(['a', 'b']);
    });
  });

  describe('mergeMistakes', () => {
    const m = (kind: MistakeRecord['kind'], prompt: string, loggedAt: number): MistakeRecord => ({
      kind,
      prompt,
      expected: 1,
      userInput: 0,
      deltaPct: 1,
      unit: 'pct',
      pattern: 'X',
      loggedAt,
    });

    it('UNIONs by (kind + prompt) and keeps the newer loggedAt', () => {
      const localRow = m('cashOnCash', 'Compute CoC for $1M', 2000);
      const cloudRow = m('cashOnCash', 'Compute CoC for $1M', 1000);
      const merged = mergeMistakes([localRow], [cloudRow]);
      expect(merged).toHaveLength(1);
      expect(merged[0].loggedAt).toBe(2000);
    });

    it('treats different prompts as distinct', () => {
      const merged = mergeMistakes(
        [m('cashOnCash', 'p1', 1)],
        [m('cashOnCash', 'p2', 2)],
      );
      expect(merged).toHaveLength(2);
    });
  });
});
