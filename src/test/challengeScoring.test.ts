import {
  MIN_MS_PER_QUESTION,
  gradeAnswers,
  isDailyRefOpen,
  isImplausiblyFast,
  isWeeklyRefOpen,
  questionsFor,
  recordedTimeMs,
} from '../server/challengeScoring';
import { WEEKLY_CHALLENGES } from '../quiz/weeklyChallenges';

const NOON = Date.parse('2026-10-06T12:00:00Z');

describe('challenge scoring', () => {
  it('regenerates the same questions for the same ref (client and server agree)', () => {
    const a = questionsFor('daily', '2026-10-06').map((q) => [q.kind, q.prompt, q.expected]);
    const b = questionsFor('daily', '2026-10-06').map((q) => [q.kind, q.prompt, q.expected]);
    expect(a).toEqual(b);
    expect(a).toHaveLength(10);
    const m1 = questionsFor('match', 'x', 12345).map((q) => q.expected);
    expect(questionsFor('match', 'y', 12345).map((q) => q.expected)).toEqual(m1);
  });

  it('grades exact answers as correct and everything malformed as wrong', () => {
    const qs = questionsFor('daily', '2026-10-06');
    expect(gradeAnswers(qs, qs.map((q) => q.expected)).correct).toBe(10);
    expect(gradeAnswers(qs, []).correct).toBe(0);
    expect(gradeAnswers(qs, 'all correct please').correct).toBe(0);
    expect(gradeAnswers(qs, qs.map(() => null)).correct).toBe(0);
    expect(gradeAnswers(qs, qs.map(() => Number.NaN)).correct).toBe(0);
    // Extra answers beyond the question count are ignored, not credited.
    expect(gradeAnswers(qs, [...qs.map((q) => q.expected), 1, 2, 3]).total).toBe(10);
    const half = qs.map((q, i) => (i % 2 === 0 ? q.expected : q.expected * 10 + 1));
    expect(gradeAnswers(qs, half).perQuestion.filter(Boolean)).toHaveLength(5);
  });

  it('uses the normal tolerance band, not exact equality', () => {
    const qs = questionsFor('daily', '2026-10-06');
    const nudged = qs.map((q) =>
      q.tolerance.type === 'pct' ? q.expected * (1 + q.tolerance.band / 2) : q.expected + q.tolerance.band / 2,
    );
    expect(gradeAnswers(qs, nudged).correct).toBe(10);
  });

  it('flags implausibly fast runs only when they scored', () => {
    const ten = { correct: 10, total: 10, perQuestion: [] };
    const zero = { correct: 0, total: 10, perQuestion: [] };
    expect(isImplausiblyFast(MIN_MS_PER_QUESTION * 10 - 1, ten)).toBe(true);
    expect(isImplausiblyFast(MIN_MS_PER_QUESTION * 10, ten)).toBe(false);
    expect(isImplausiblyFast(1_000, zero)).toBe(false);
  });

  it('opens a daily ref on its own UTC day, with a submit-only grace day', () => {
    expect(isDailyRefOpen('2026-10-06', NOON, 'start')).toBe(true);
    expect(isDailyRefOpen('2026-10-05', NOON, 'start')).toBe(false);
    expect(isDailyRefOpen('2026-10-05', NOON, 'submit')).toBe(true);
    expect(isDailyRefOpen('2026-10-07', NOON, 'start')).toBe(false);
    expect(isDailyRefOpen('not-a-date', NOON, 'start')).toBe(false);
  });

  it('only opens a weekly ref inside its window', () => {
    const c = WEEKLY_CHALLENGES[0];
    const start = Date.parse(c.startsAtIso);
    const end = Date.parse(c.endsAtIso);
    expect(isWeeklyRefOpen(c.id, start + 1000, 'start')).toBe(true);
    expect(isWeeklyRefOpen(c.id, start - 1000, 'start')).toBe(false);
    expect(isWeeklyRefOpen(c.id, end + 1000, 'start')).toBe(false);
    expect(isWeeklyRefOpen(c.id, end + 1000, 'submit')).toBe(true);
    expect(isWeeklyRefOpen('no-such-week', start + 1000, 'start')).toBe(false);
  });

  it('records server-measured time, clamped', () => {
    expect(recordedTimeMs(1_000, 61_000)).toBe(60_000);
    expect(recordedTimeMs(5_000, 1_000)).toBe(0);
    expect(recordedTimeMs(0, 10 * 60 * 60 * 1000)).toBe(6 * 60 * 60 * 1000);
  });
});
