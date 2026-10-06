// LearnCRE — server-side scoring for daily, weekly and head-to-head
// challenges (Supabase Edge Function, Deno).
//
// The request logic lives in src/server/scoreChallengeHandler.ts and is
// bundled (with the question generators) into ../_shared/scoring.bundle.js by
// `npm run build:edge`. This file only does auth, CORS and database I/O.
//
// Deploy:  supabase functions deploy score-challenge
// Uses the platform-provided SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.

// @ts-expect-error: Deno runtime resolves the URL specifier at runtime.
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { handleScoreChallenge } from '../_shared/scoring.bundle.js';

declare const Deno: {
  env: { get(key: string): string | undefined };
  serve: (handler: (req: Request) => Response | Promise<Response>) => void;
};

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SERVICE_ROLE = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

function json(status: number, body: unknown): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...CORS, 'Content-Type': 'application/json' },
  });
}

// deno-lint-ignore no-explicit-any
type Db = any;

const RESULT_TABLE = { daily: 'daily_results', weekly: 'weekly_results' } as const;

function challengeDb(admin: Db) {
  return {
    async getAttempt(userId: string, kind: string, ref: string) {
      const { data, error } = await admin
        .from('challenge_attempts')
        .select('started_at, submitted_at, correct, total, time_ms, flagged')
        .eq('user_id', userId)
        .eq('kind', kind)
        .eq('ref', ref)
        .maybeSingle();
      if (error) throw error;
      return data;
    },

    async startAttempt(userId: string, kind: string, ref: string) {
      // ignoreDuplicates keeps the original started_at on a restart.
      const { error } = await admin
        .from('challenge_attempts')
        .upsert({ user_id: userId, kind, ref }, { onConflict: 'user_id,kind,ref', ignoreDuplicates: true });
      if (error) throw error;
      return this.getAttempt(userId, kind, ref);
    },

    async getMatch(matchId: string) {
      const { data, error } = await admin
        .from('matches')
        .select('host_id, opponent_id, seed, status, host_completed_at, opponent_completed_at, expires_at')
        .eq('id', matchId)
        .maybeSingle();
      if (error) throw error;
      return data ? { ...data, seed: Number(data.seed) } : null;
    },

    async writeResult(
      kind: 'daily' | 'weekly' | 'match',
      ref: string,
      userId: string,
      r: { correct: number; total: number; timeMs: number; flagged: boolean },
    ) {
      if (kind === 'match') {
        const { error } = await admin.rpc('record_match_result', {
          p_match_id: ref,
          p_user_id: userId,
          p_correct: r.correct,
          p_time_ms: r.timeMs,
        });
        if (error) {
          if (/already submitted/i.test(error.message)) return false;
          throw error;
        }
        return true;
      }
      const row = {
        user_id: userId,
        correct: r.correct,
        total: r.total,
        time_ms: r.timeMs,
        flagged: r.flagged,
        ...(kind === 'daily' ? { date: ref } : { challenge_id: ref }),
      };
      const { error } = await admin.from(RESULT_TABLE[kind]).insert(row);
      if (error) {
        if (error.code === '23505') return false; // one result per player
        throw error;
      }
      return true;
    },

    async completeAttempt(
      userId: string,
      kind: string,
      ref: string,
      r: { correct: number; total: number; timeMs: number; flagged: boolean },
      answers: unknown[],
    ) {
      const { error } = await admin
        .from('challenge_attempts')
        .update({
          submitted_at: new Date().toISOString(),
          correct: r.correct,
          total: r.total,
          time_ms: r.timeMs,
          flagged: r.flagged,
          answers,
        })
        .eq('user_id', userId)
        .eq('kind', kind)
        .eq('ref', ref);
      if (error) throw error;
    },
  };
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: CORS });
  if (req.method !== 'POST') return json(405, { error: 'method_not_allowed' });

  const admin = createClient(SUPABASE_URL, SERVICE_ROLE, { auth: { persistSession: false } });
  const jwt = (req.headers.get('Authorization') ?? '').replace(/^Bearer\s+/i, '');
  const { data: auth } = jwt ? await admin.auth.getUser(jwt) : { data: null };
  const userId = auth?.user?.id;
  if (!userId) return json(401, { error: 'not_signed_in' });

  let body: unknown = null;
  try {
    body = await req.json();
  } catch {
    return json(400, { error: 'bad_request' });
  }

  try {
    const res = await handleScoreChallenge(body, userId, challengeDb(admin), Date.now());
    return json(res.status, res.body);
  } catch (e) {
    console.error('score-challenge failed', e);
    return json(500, { error: 'server_error' });
  }
});
