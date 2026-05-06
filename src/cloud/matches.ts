import { getSupabase } from './client';

export type MatchStatus = 'open' | 'accepted' | 'settled' | 'expired';

export interface Match {
  id: string;
  host_id: string;
  opponent_id: string | null;
  invite_token: string;
  /** SQL bigint, but kept in JS-number range by generateSeed() (31-bit max).
   *  Don't widen past Number.MAX_SAFE_INTEGER without a string round-trip. */
  seed: number;
  status: MatchStatus;
  host_correct: number | null;
  host_time_ms: number | null;
  host_completed_at: string | null;
  opponent_correct: number | null;
  opponent_time_ms: number | null;
  opponent_completed_at: string | null;
  created_at: string;
  updated_at: string;
  expires_at: string;
}

export interface MatchWithProfiles extends Match {
  host_handle: string | null;
  host_display_name: string | null;
  opponent_handle: string | null;
  opponent_display_name: string | null;
}

/** Random 32-bit unsigned int for the match seed. */
function generateSeed(): number {
  return Math.floor(Math.random() * 2 ** 31) >>> 0;
}

export async function createMatch(
  hostId: string,
): Promise<{ ok: true; match: Match } | { ok: false; error: string }> {
  const supabase = getSupabase();
  if (!supabase) return { ok: false, error: 'cloud disabled' };
  const seed = generateSeed();
  const { data, error } = await supabase
    .from('matches')
    .insert({ host_id: hostId, seed })
    .select('*')
    .maybeSingle();
  if (error || !data) {
    return { ok: false, error: error?.message ?? 'create failed' };
  }
  return { ok: true, match: data as Match };
}

export async function fetchMyMatches(userId: string): Promise<Match[]> {
  const supabase = getSupabase();
  if (!supabase) return [];
  const [hostRes, oppRes] = await Promise.all([
    supabase
      .from('matches')
      .select('*')
      .eq('host_id', userId)
      .order('created_at', { ascending: false }),
    supabase
      .from('matches')
      .select('*')
      .eq('opponent_id', userId)
      .order('created_at', { ascending: false }),
  ]);
  const all = [...((hostRes.data ?? []) as Match[]), ...((oppRes.data ?? []) as Match[])];
  // Dedup by id (a host shouldn't appear as opponent of their own row, but defensive)
  const byId = new Map<string, Match>();
  for (const m of all) byId.set(m.id, m);
  return Array.from(byId.values()).sort(
    (a, b) => Date.parse(b.created_at) - Date.parse(a.created_at),
  );
}

export async function fetchMatchById(matchId: string): Promise<Match | null> {
  const supabase = getSupabase();
  if (!supabase) return null;
  const { data } = await supabase.from('matches').select('*').eq('id', matchId).maybeSingle();
  return data as Match | null;
}

/** Look up handles for both participants. Skips users without a public profile. */
export async function fetchMatchProfiles(match: Match): Promise<MatchWithProfiles> {
  const supabase = getSupabase();
  if (!supabase) {
    return { ...match, host_handle: null, host_display_name: null, opponent_handle: null, opponent_display_name: null };
  }
  const ids = [match.host_id];
  if (match.opponent_id) ids.push(match.opponent_id);
  const { data } = await supabase
    .from('profiles')
    .select('id, handle, display_name')
    .in('id', ids);
  const byId = new Map((data ?? []).map((p) => [p.id as string, p as { id: string; handle: string; display_name: string | null }]));
  const host = byId.get(match.host_id);
  const opp = match.opponent_id ? byId.get(match.opponent_id) : null;
  return {
    ...match,
    host_handle: host?.handle ?? null,
    host_display_name: host?.display_name ?? null,
    opponent_handle: opp?.handle ?? null,
    opponent_display_name: opp?.display_name ?? null,
  };
}

export async function acceptMatchByToken(
  matchId: string,
  token: string,
): Promise<{ ok: boolean; error: string | null }> {
  const supabase = getSupabase();
  if (!supabase) return { ok: false, error: 'cloud disabled' };
  const { error } = await supabase.rpc('accept_match_by_token', {
    p_match_id: matchId,
    p_token: token.trim(),
  });
  if (error) return { ok: false, error: error.message };
  return { ok: true, error: null };
}

export async function submitMatchResult(
  matchId: string,
  correct: number,
  timeMs: number,
): Promise<{ ok: boolean; error: string | null }> {
  const supabase = getSupabase();
  if (!supabase) return { ok: false, error: 'cloud disabled' };
  const { error } = await supabase.rpc('submit_match_result', {
    p_match_id: matchId,
    p_correct: correct,
    p_time_ms: timeMs,
  });
  if (error) return { ok: false, error: error.message };
  return { ok: true, error: null };
}

// ============== pure helpers (exported for testing) ==============

export type MatchOutcome = 'host-win' | 'opponent-win' | 'draw' | 'incomplete';

/** Determine winner when both sides have submitted. Higher correct wins;
 *  ties broken by faster time. */
export function settleOutcome(match: Match): MatchOutcome {
  if (
    match.host_completed_at == null ||
    match.opponent_completed_at == null ||
    match.host_correct == null ||
    match.opponent_correct == null ||
    match.host_time_ms == null ||
    match.opponent_time_ms == null
  ) {
    return 'incomplete';
  }
  if (match.host_correct > match.opponent_correct) return 'host-win';
  if (match.opponent_correct > match.host_correct) return 'opponent-win';
  if (match.host_time_ms < match.opponent_time_ms) return 'host-win';
  if (match.opponent_time_ms < match.host_time_ms) return 'opponent-win';
  return 'draw';
}

/** Whether the calling user is allowed to play (i.e. accepted but not yet
 *  submitted their side). */
export function canPlay(match: Match, userId: string): boolean {
  if (match.status === 'settled' || match.status === 'expired') return false;
  if (match.host_id === userId) return match.host_completed_at == null;
  if (match.opponent_id === userId) return match.opponent_completed_at == null;
  return false;
}
