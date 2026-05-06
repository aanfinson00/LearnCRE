import { describe, expect, it } from 'vitest';
import {
  WEEKLY_CHALLENGES,
  generateWeekly,
  getCurrentWeeklyChallenge,
  getNextWeeklyChallenge,
} from '../weeklyChallenges';

describe('quiz/weeklyChallenges', () => {
  it('every theme has a 10+ kind pool', () => {
    for (const c of WEEKLY_CHALLENGES) {
      expect(c.kinds.length).toBeGreaterThanOrEqual(10);
    }
  });

  it('themes have unique ids', () => {
    const ids = WEEKLY_CHALLENGES.map((c) => c.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('themes have non-overlapping windows', () => {
    const sorted = [...WEEKLY_CHALLENGES].sort(
      (a, b) => Date.parse(a.startsAtIso) - Date.parse(b.startsAtIso),
    );
    for (let i = 1; i < sorted.length; i++) {
      const prevEnd = Date.parse(sorted[i - 1].endsAtIso);
      const thisStart = Date.parse(sorted[i].startsAtIso);
      expect(thisStart).toBeGreaterThanOrEqual(prevEnd);
    }
  });

  describe('getCurrentWeeklyChallenge', () => {
    it('finds the theme active at a given instant', () => {
      const wk = WEEKLY_CHALLENGES[0];
      const mid = new Date(
        (Date.parse(wk.startsAtIso) + Date.parse(wk.endsAtIso)) / 2,
      );
      expect(getCurrentWeeklyChallenge(mid)?.id).toBe(wk.id);
    });

    it('returns null between themes', () => {
      // Before all themes start
      expect(getCurrentWeeklyChallenge(new Date('2020-01-01T00:00:00Z'))).toBeNull();
    });
  });

  describe('getNextWeeklyChallenge', () => {
    it('returns the soonest upcoming theme', () => {
      const next = getNextWeeklyChallenge(new Date('2020-01-01T00:00:00Z'));
      expect(next?.id).toBe(WEEKLY_CHALLENGES[0].id);
    });

    it('returns null when all themes have started', () => {
      const last = WEEKLY_CHALLENGES[WEEKLY_CHALLENGES.length - 1];
      const after = new Date(Date.parse(last.startsAtIso) + 1);
      expect(getNextWeeklyChallenge(after)).toBeNull();
    });
  });

  describe('generateWeekly', () => {
    it('produces exactly 10 questions', () => {
      for (const c of WEEKLY_CHALLENGES) {
        expect(generateWeekly(c)).toHaveLength(10);
      }
    });

    it('is deterministic — same challenge yields same prompts', () => {
      const c = WEEKLY_CHALLENGES[0];
      const a = generateWeekly(c);
      const b = generateWeekly(c);
      expect(a.map((q) => q.prompt)).toEqual(b.map((q) => q.prompt));
      expect(a.map((q) => q.expected)).toEqual(b.map((q) => q.expected));
    });

    it('different challenges produce different question sets', () => {
      const a = generateWeekly(WEEKLY_CHALLENGES[0]);
      const b = generateWeekly(WEEKLY_CHALLENGES[1]);
      const aPrompts = new Set(a.map((q) => q.prompt));
      const overlapping = b.filter((q) => aPrompts.has(q.prompt));
      // Different themes share no kind pool overlap, so prompts should be
      // entirely distinct. (Even with overlap, deterministic seed bumps
      // would still differ.)
      expect(overlapping.length).toBe(0);
    });

    it('all questions match the theme\'s kind pool', () => {
      for (const c of WEEKLY_CHALLENGES) {
        const allowed = new Set(c.kinds);
        for (const q of generateWeekly(c)) {
          expect(allowed.has(q.kind)).toBe(true);
        }
      }
    });

    it('uses 3 beginner / 5 intermediate / 2 advanced difficulty mix', () => {
      const qs = generateWeekly(WEEKLY_CHALLENGES[0]);
      const counts = { beginner: 0, intermediate: 0, advanced: 0 };
      for (const q of qs) if (q.appliedDifficulty) counts[q.appliedDifficulty]++;
      expect(counts).toEqual({ beginner: 3, intermediate: 5, advanced: 2 });
    });
  });
});
