import { getSupabase } from './client';
import type { ChallengeKind } from '../server/challengeScoring';

/**
 * Client for the `score-challenge` Edge Function. Competitive results
 * (daily, weekly, head-to-head) are graded and timed on the server; the
 * browser only sends its raw answers.
 */

export interface ServerResult {
  correct: number;
  total: number;
  timeMs: number;
  /** Too fast to be plausible: recorded, but hidden from public rankings. */
  flagged: boolean;
}

export type ChallengeCallError =
  | 'already_played'
  | 'challenge_closed'
  | 'not_signed_in'
  | 'not_started'
  | 'unavailable'
  | string;

export type ChallengeCall<T> =
  | ({ ok: true } & T)
  | { ok: false; error: ChallengeCallError; result?: ServerResult };

async function invoke<T>(body: Record<string, unknown>): Promise<ChallengeCall<T>> {
  const supabase = getSupabase();
  if (!supabase) return { ok: false, error: 'unavailable' };
  const { data, error } = await supabase.functions.invoke('score-challenge', { body });
  if (!error) return { ok: true, ...(data as T) };

  // Non-2xx: the function's JSON body carries the reason.
  let payload: Record<string, unknown> | null = null;
  try {
    const ctx = (error as { context?: Response }).context;
    if (ctx && typeof ctx.json === 'function') payload = await ctx.json();
  } catch {
    /* network error or non-JSON body */
  }
  const code = typeof payload?.error === 'string' ? payload.error : 'unavailable';
  const result =
    payload && typeof payload.correct === 'number'
      ? {
          correct: payload.correct as number,
          total: payload.total as number,
          timeMs: payload.timeMs as number,
          flagged: Boolean(payload.flagged),
        }
      : undefined;
  return { ok: false, error: code, result };
}

/** Records the server-side start time. Call when the player clicks Begin. */
export function startChallenge(kind: ChallengeKind, ref: string) {
  return invoke<{ startedAt: string }>({ action: 'start', kind, ref });
}

/** Sends raw answers (parsed numbers, null for blank) for server grading. */
export function submitChallenge(kind: ChallengeKind, ref: string, answers: (number | null)[]) {
  return invoke<ServerResult & { perQuestion: boolean[] }>({ action: 'submit', kind, ref, answers });
}
