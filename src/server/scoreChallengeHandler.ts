/**
 * Request logic for the `score-challenge` Edge Function, kept free of Deno
 * and Supabase specifics so it can be unit-tested with an in-memory store.
 * supabase/functions/score-challenge/index.ts supplies the real ChallengeDb.
 *
 * Protocol (POST, signed-in users only):
 *   { action: 'start',  kind, ref }           → { startedAt }
 *   { action: 'submit', kind, ref, answers }  → { correct, total, timeMs, flagged, perQuestion }
 *
 * `ref` is the daily date (YYYY-MM-DD), the weekly challenge id, or the
 * match id. Time is measured from the server-recorded start, never taken
 * from the client.
 */
import {
  CHALLENGE_KINDS,
  gradeAnswers,
  isDailyRefOpen,
  isImplausiblyFast,
  isWeeklyRefOpen,
  questionsFor,
  recordedTimeMs,
  type ChallengeKind,
} from './challengeScoring';

export interface AttemptRow {
  started_at: string;
  submitted_at: string | null;
  correct: number | null;
  total: number | null;
  time_ms: number | null;
  flagged: boolean;
}

export interface MatchRow {
  host_id: string;
  opponent_id: string | null;
  seed: number;
  status: string;
  host_completed_at: string | null;
  opponent_completed_at: string | null;
  expires_at: string;
}

export interface ScoredResult {
  correct: number;
  total: number;
  timeMs: number;
  flagged: boolean;
}

export interface ChallengeDb {
  getAttempt(userId: string, kind: ChallengeKind, ref: string): Promise<AttemptRow | null>;
  /** Inserts the attempt if absent (keeping any existing start time) and returns it. */
  startAttempt(userId: string, kind: ChallengeKind, ref: string): Promise<AttemptRow>;
  getMatch(matchId: string): Promise<MatchRow | null>;
  /**
   * Writes the graded result to the leaderboard table (daily/weekly) or the
   * match. Returns false if this user already has a result there.
   */
  writeResult(kind: ChallengeKind, ref: string, userId: string, result: ScoredResult): Promise<boolean>;
  /** Marks the attempt submitted and stores the graded result and raw answers. */
  completeAttempt(
    userId: string,
    kind: ChallengeKind,
    ref: string,
    result: ScoredResult,
    answers: unknown[],
  ): Promise<void>;
}

export interface HandlerResponse {
  status: number;
  body: Record<string, unknown>;
}

const MAX_ANSWERS = 50;
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const err = (status: number, error: string, extra: Record<string, unknown> = {}): HandlerResponse => ({
  status,
  body: { error, ...extra },
});

function resultBody(a: AttemptRow): Record<string, unknown> {
  return { correct: a.correct, total: a.total, timeMs: a.time_ms, flagged: a.flagged };
}

/** Checks the ref is playable now; for matches also returns the match. */
async function checkRef(
  kind: ChallengeKind,
  ref: string,
  userId: string,
  db: ChallengeDb,
  nowMs: number,
  phase: 'start' | 'submit',
): Promise<{ ok: true; match?: MatchRow } | { ok: false; res: HandlerResponse }> {
  if (kind === 'daily') {
    return isDailyRefOpen(ref, nowMs, phase)
      ? { ok: true }
      : { ok: false, res: err(400, 'challenge_closed') };
  }
  if (kind === 'weekly') {
    return isWeeklyRefOpen(ref, nowMs, phase)
      ? { ok: true }
      : { ok: false, res: err(400, 'challenge_closed') };
  }
  if (!UUID_RE.test(ref)) return { ok: false, res: err(400, 'bad_ref') };
  const match = await db.getMatch(ref);
  if (!match) return { ok: false, res: err(404, 'match_not_found') };
  const isHost = match.host_id === userId;
  if (!isHost && match.opponent_id !== userId) return { ok: false, res: err(403, 'not_a_participant') };
  if (match.status === 'expired' || (phase === 'start' && Date.parse(match.expires_at) <= nowMs)) {
    return { ok: false, res: err(400, 'challenge_closed') };
  }
  const done = isHost ? match.host_completed_at : match.opponent_completed_at;
  if (done) return { ok: false, res: err(409, 'already_played') };
  return { ok: true, match };
}

export async function handleScoreChallenge(
  body: unknown,
  userId: string,
  db: ChallengeDb,
  nowMs: number,
): Promise<HandlerResponse> {
  if (!body || typeof body !== 'object') return err(400, 'bad_request');
  const { action, kind, ref, answers } = body as Record<string, unknown>;
  if (action !== 'start' && action !== 'submit') return err(400, 'bad_action');
  if (typeof kind !== 'string' || !CHALLENGE_KINDS.includes(kind as ChallengeKind)) {
    return err(400, 'bad_kind');
  }
  if (typeof ref !== 'string' || ref.length === 0 || ref.length > 64) return err(400, 'bad_ref');
  const k = kind as ChallengeKind;

  const existing = await db.getAttempt(userId, k, ref);
  if (existing?.submitted_at) return err(409, 'already_played', resultBody(existing));

  const check = await checkRef(k, ref, userId, db, nowMs, action);
  if (!check.ok) return check.res;

  if (action === 'start') {
    const attempt = existing ?? (await db.startAttempt(userId, k, ref));
    return { status: 200, body: { startedAt: attempt.started_at } };
  }

  // submit
  if (!existing) return err(400, 'not_started');
  if (!Array.isArray(answers) || answers.length > MAX_ANSWERS) return err(400, 'bad_answers');

  const questions = questionsFor(k, ref, check.match?.seed);
  const graded = gradeAnswers(questions, answers);
  const timeMs = recordedTimeMs(Date.parse(existing.started_at), nowMs);
  const result: ScoredResult = {
    correct: graded.correct,
    total: graded.total,
    timeMs,
    flagged: isImplausiblyFast(timeMs, graded),
  };

  // The result tables' keys (and the match RPC) reject a second result, so
  // concurrent submits can't both land.
  const wrote = await db.writeResult(k, ref, userId, result);
  if (!wrote) return err(409, 'already_played');
  await db.completeAttempt(userId, k, ref, result, answers.slice(0, questions.length));

  return { status: 200, body: { ...result, perQuestion: graded.perQuestion } };
}
