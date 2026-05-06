import { describe, expect, it } from 'vitest';
import { dailyDate, generateDaily, seedFromDate } from '../dailyChallenge';

describe('quiz/dailyChallenge', () => {
  describe('dailyDate', () => {
    it('formats UTC YYYY-MM-DD', () => {
      // 2026-01-15 12:00 UTC
      const d = new Date(Date.UTC(2026, 0, 15, 12, 0, 0));
      expect(dailyDate(d)).toBe('2026-01-15');
    });

    it('zero-pads single-digit month + day', () => {
      const d = new Date(Date.UTC(2026, 8, 5, 0, 0, 0));
      expect(dailyDate(d)).toBe('2026-09-05');
    });

    it('uses UTC, not local timezone', () => {
      // 2026-01-01 23:30 UTC = late-Jan-1 globally regardless of locale.
      const d = new Date(Date.UTC(2026, 0, 1, 23, 30, 0));
      expect(dailyDate(d)).toBe('2026-01-01');
    });
  });

  describe('seedFromDate', () => {
    it('is deterministic for the same date', () => {
      expect(seedFromDate('2026-01-15')).toBe(seedFromDate('2026-01-15'));
    });

    it('produces different seeds for different dates', () => {
      expect(seedFromDate('2026-01-15')).not.toBe(seedFromDate('2026-01-16'));
      expect(seedFromDate('2026-01-15')).not.toBe(seedFromDate('2025-01-15'));
    });

    it('returns a 32-bit unsigned integer', () => {
      const s = seedFromDate('2026-01-15');
      expect(Number.isInteger(s)).toBe(true);
      expect(s).toBeGreaterThanOrEqual(0);
      expect(s).toBeLessThan(2 ** 32);
    });
  });

  describe('generateDaily', () => {
    it('produces exactly 10 questions', () => {
      const qs = generateDaily('2026-01-15');
      expect(qs).toHaveLength(10);
    });

    it('is deterministic — same date produces same questions', () => {
      const a = generateDaily('2026-03-22');
      const b = generateDaily('2026-03-22');
      expect(a.map((q) => q.kind)).toEqual(b.map((q) => q.kind));
      expect(a.map((q) => q.expected)).toEqual(b.map((q) => q.expected));
      expect(a.map((q) => q.prompt)).toEqual(b.map((q) => q.prompt));
    });

    it('produces different questions for different dates', () => {
      const a = generateDaily('2026-03-22');
      const b = generateDaily('2026-03-23');
      // At least one question should differ in prompt (extremely unlikely
      // collision otherwise).
      const same = a.every((q, i) => q.prompt === b[i].prompt);
      expect(same).toBe(false);
    });

    it('mixes difficulties (3 beginner / 5 intermediate / 2 advanced)', () => {
      const qs = generateDaily('2026-04-01');
      const counts = { beginner: 0, intermediate: 0, advanced: 0 };
      for (const q of qs) {
        if (q.appliedDifficulty) counts[q.appliedDifficulty]++;
      }
      expect(counts.beginner).toBe(3);
      expect(counts.intermediate).toBe(5);
      expect(counts.advanced).toBe(2);
    });

    it('all questions have valid expected + prompt + kind', () => {
      const qs = generateDaily('2026-05-10');
      for (const q of qs) {
        expect(q.kind).toBeTruthy();
        expect(q.prompt).toBeTruthy();
        expect(typeof q.expected).toBe('number');
        expect(Number.isFinite(q.expected)).toBe(true);
      }
    });
  });
});
