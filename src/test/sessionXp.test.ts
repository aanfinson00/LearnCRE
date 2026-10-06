import { applyXpDelta, takeSessionXp } from '../quiz/xp';
import { loadSessions, recordSession } from '../storage/localStorage';
import type { SessionRecord } from '../types/profile';

const base: SessionRecord = {
  id: 's1',
  finishedAt: 0,
  kind: 'quiz',
  config: {},
  attempts: 3,
  correct: 3,
  accuracyPct: 1,
  durationMs: 1000,
  xpEarned: 0,
};

describe('session XP attribution', () => {
  beforeEach(() => {
    localStorage.clear();
    takeSessionXp();
  });

  it('records the XP granted during the session (weekly XP leaderboard sums this)', () => {
    applyXpDelta(4);
    applyXpDelta(6);
    const [rec] = recordSession({ ...base }).slice(-1);
    expect(rec.xpEarned).toBe(10);
    // Claimed once: the next session starts from zero.
    const [next] = recordSession({ ...base, id: 's2' }).slice(-1);
    expect(next.xpEarned).toBe(0);
    expect(loadSessions().map((s) => s.xpEarned)).toEqual([10, 0]);
  });

  it('does not double count modes that pass an explicit total', () => {
    applyXpDelta(250);
    const [rec] = recordSession({ ...base, kind: 'modelingTest', xpEarned: 250 }).slice(-1);
    expect(rec.xpEarned).toBe(250);
  });
});
