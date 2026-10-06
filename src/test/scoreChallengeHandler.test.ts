import {
  handleScoreChallenge,
  type AttemptRow,
  type ChallengeDb,
  type MatchRow,
  type ScoredResult,
} from '../server/scoreChallengeHandler';
import { questionsFor } from '../server/challengeScoring';

const ALICE = 'alice';
const BOB = 'bob';
const MATCH_ID = '11111111-2222-3333-4444-555555555555';
const T0 = Date.parse('2026-10-06T12:00:00Z');
const TODAY = '2026-10-06';

/** In-memory ChallengeDb mirroring the DB's uniqueness guarantees. */
function fakeDb(match?: Partial<MatchRow>) {
  const attempts = new Map<string, AttemptRow>();
  const results = new Map<string, ScoredResult>();
  let clock = T0;
  const key = (...p: string[]) => p.join('|');
  const m: MatchRow | null = match
    ? {
        host_id: ALICE,
        opponent_id: BOB,
        seed: 987654,
        status: 'accepted',
        host_completed_at: null,
        opponent_completed_at: null,
        expires_at: new Date(T0 + 7 * 86_400_000).toISOString(),
        ...match,
      }
    : null;
  const db: ChallengeDb = {
    async getAttempt(u, k, r) {
      return attempts.get(key(u, k, r)) ?? null;
    },
    async startAttempt(u, k, r) {
      const row = attempts.get(key(u, k, r)) ?? {
        started_at: new Date(clock).toISOString(),
        submitted_at: null,
        correct: null,
        total: null,
        time_ms: null,
        flagged: false,
      };
      attempts.set(key(u, k, r), row);
      return row;
    },
    async getMatch(id) {
      return id === MATCH_ID ? m : null;
    },
    async writeResult(k, r, u, result) {
      if (results.has(key(k, r, u))) return false;
      results.set(key(k, r, u), result);
      if (m && k === 'match') {
        if (u === m.host_id) m.host_completed_at = new Date(clock).toISOString();
        else m.opponent_completed_at = new Date(clock).toISOString();
      }
      return true;
    },
    async completeAttempt(u, k, r, result) {
      const row = attempts.get(key(u, k, r))!;
      Object.assign(row, {
        submitted_at: new Date(clock).toISOString(),
        correct: result.correct,
        total: result.total,
        time_ms: result.timeMs,
        flagged: result.flagged,
      });
    },
  };
  return { db, results, advance: (ms: number) => (clock += ms), now: () => clock };
}

const perfect = (kind: 'daily' | 'match', ref: string, seed?: number) =>
  questionsFor(kind, ref, seed).map((q) => q.expected);

describe('score-challenge handler', () => {
  it('grades a daily run itself and measures time on the server clock', async () => {
    const f = fakeDb();
    const start = await handleScoreChallenge({ action: 'start', kind: 'daily', ref: TODAY }, ALICE, f.db, f.now());
    expect(start.status).toBe(200);
    f.advance(95_000);
    const answers = perfect('daily', TODAY);
    answers[0] = answers[0] * 3 + 7; // one wrong
    const res = await handleScoreChallenge(
      { action: 'submit', kind: 'daily', ref: TODAY, answers, timeMs: 1, correct: 10 },
      ALICE,
      f.db,
      f.now(),
    );
    expect(res.status).toBe(200);
    // Client-supplied `correct` / `timeMs` are ignored.
    expect(res.body).toMatchObject({ correct: 9, total: 10, timeMs: 95_000, flagged: false });
  });

  it('flags a perfect run submitted implausibly fast', async () => {
    const f = fakeDb();
    await handleScoreChallenge({ action: 'start', kind: 'daily', ref: TODAY }, ALICE, f.db, f.now());
    f.advance(3_000);
    const res = await handleScoreChallenge(
      { action: 'submit', kind: 'daily', ref: TODAY, answers: perfect('daily', TODAY) },
      ALICE,
      f.db,
      f.now(),
    );
    expect(res.body).toMatchObject({ correct: 10, flagged: true });
  });

  it('refuses a submit without a server-recorded start', async () => {
    const f = fakeDb();
    const res = await handleScoreChallenge(
      { action: 'submit', kind: 'daily', ref: TODAY, answers: perfect('daily', TODAY) },
      ALICE,
      f.db,
      f.now(),
    );
    expect(res).toMatchObject({ status: 400, body: { error: 'not_started' } });
  });

  it('allows one result per player; restarting keeps the original start time', async () => {
    const f = fakeDb();
    const first = await handleScoreChallenge({ action: 'start', kind: 'daily', ref: TODAY }, ALICE, f.db, f.now());
    f.advance(60_000);
    const again = await handleScoreChallenge({ action: 'start', kind: 'daily', ref: TODAY }, ALICE, f.db, f.now());
    expect(again.body.startedAt).toBe(first.body.startedAt);
    await handleScoreChallenge(
      { action: 'submit', kind: 'daily', ref: TODAY, answers: perfect('daily', TODAY) },
      ALICE,
      f.db,
      f.now(),
    );
    const replay = await handleScoreChallenge(
      { action: 'submit', kind: 'daily', ref: TODAY, answers: perfect('daily', TODAY) },
      ALICE,
      f.db,
      f.now(),
    );
    expect(replay).toMatchObject({ status: 409, body: { error: 'already_played', correct: 10 } });
    const restart = await handleScoreChallenge({ action: 'start', kind: 'daily', ref: TODAY }, ALICE, f.db, f.now());
    expect(restart.status).toBe(409);
  });

  it("rejects tomorrow's daily and yesterday's start, but accepts a just-after-midnight submit", async () => {
    const f = fakeDb();
    const tomorrow = await handleScoreChallenge({ action: 'start', kind: 'daily', ref: '2026-10-07' }, ALICE, f.db, f.now());
    expect(tomorrow.body.error).toBe('challenge_closed');
    await handleScoreChallenge({ action: 'start', kind: 'daily', ref: TODAY }, ALICE, f.db, f.now());
    f.advance(12 * 3_600_000 + 60_000); // 00:01 the next day
    const late = await handleScoreChallenge(
      { action: 'submit', kind: 'daily', ref: TODAY, answers: perfect('daily', TODAY) },
      ALICE,
      f.db,
      f.now(),
    );
    expect(late.status).toBe(200);
  });

  it('grades matches from the server-side seed and blocks non-participants', async () => {
    const f = fakeDb({});
    const outsider = await handleScoreChallenge({ action: 'start', kind: 'match', ref: MATCH_ID }, 'mallory', f.db, f.now());
    expect(outsider).toMatchObject({ status: 403, body: { error: 'not_a_participant' } });

    await handleScoreChallenge({ action: 'start', kind: 'match', ref: MATCH_ID }, BOB, f.db, f.now());
    f.advance(80_000);
    const res = await handleScoreChallenge(
      { action: 'submit', kind: 'match', ref: MATCH_ID, answers: perfect('match', MATCH_ID, 987654) },
      BOB,
      f.db,
      f.now(),
    );
    expect(res.body).toMatchObject({ correct: 10, total: 10, timeMs: 80_000 });
    const again = await handleScoreChallenge({ action: 'start', kind: 'match', ref: MATCH_ID }, BOB, f.db, f.now());
    expect(again.status).toBe(409);
  });

  it('rejects malformed requests', async () => {
    const f = fakeDb();
    for (const body of [
      null,
      'hi',
      { action: 'grade', kind: 'daily', ref: TODAY },
      { action: 'start', kind: 'speedrun', ref: TODAY },
      { action: 'start', kind: 'daily', ref: '' },
      { action: 'start', kind: 'match', ref: 'not-a-uuid' },
    ]) {
      const res = await handleScoreChallenge(body, ALICE, f.db, f.now());
      expect(res.status).toBeGreaterThanOrEqual(400);
    }
    await handleScoreChallenge({ action: 'start', kind: 'daily', ref: TODAY }, ALICE, f.db, f.now());
    const huge = await handleScoreChallenge(
      { action: 'submit', kind: 'daily', ref: TODAY, answers: new Array(500).fill(1) },
      ALICE,
      f.db,
      f.now(),
    );
    expect(huge.body.error).toBe('bad_answers');
  });
});
