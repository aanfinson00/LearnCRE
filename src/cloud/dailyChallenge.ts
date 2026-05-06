import { getSupabase } from './client';

export interface DailyResultRow {
  date: string;
  user_id: string;
  correct: number;
  total: number;
  time_ms: number;
  completed_at: string;
}

export interface LeaderboardRow extends DailyResultRow {
  handle: string;
  display_name: string | null;
  avatar_color: string | null;
}

/** Submit today's result. Idempotent on (date, user_id) — re-submits no-op. */
export async function submitDailyResult(
  userId: string,
  date: string,
  correct: number,
  total: number,
  timeMs: number,
): Promise<{ ok: boolean; error: string | null }> {
  const supabase = getSupabase();
  if (!supabase) return { ok: false, error: 'cloud disabled' };
  const { error } = await supabase.from('daily_results').insert({
    date,
    user_id: userId,
    correct,
    total,
    time_ms: timeMs,
  });
  if (error) {
    // PRIMARY KEY collision = already submitted today; treat as ok.
    if (error.code === '23505') return { ok: true, error: null };
    return { ok: false, error: error.message };
  }
  return { ok: true, error: null };
}

/** Returns the signed-in user's row for a given date, or null. */
export async function fetchMyDailyResult(
  userId: string,
  date: string,
): Promise<DailyResultRow | null> {
  const supabase = getSupabase();
  if (!supabase) return null;
  const { data, error } = await supabase
    .from('daily_results')
    .select('*')
    .eq('user_id', userId)
    .eq('date', date)
    .maybeSingle();
  if (error) return null;
  return data as DailyResultRow | null;
}

/**
 * Top N rows for a date, joined to public profiles (RLS only returns rows
 * whose owner has flipped is_public on).
 */
export async function fetchDailyLeaderboard(
  date: string,
  limit = 25,
): Promise<LeaderboardRow[]> {
  const supabase = getSupabase();
  if (!supabase) return [];
  // Two-step: read results, then fetch profile rows. Cheaper than relying on
  // a Supabase resource embed for our flat case.
  const { data: results, error } = await supabase
    .from('daily_results')
    .select('*')
    .eq('date', date)
    .order('correct', { ascending: false })
    .order('time_ms', { ascending: true })
    .limit(limit);
  if (error || !results) return [];

  const userIds = results.map((r) => r.user_id);
  if (userIds.length === 0) return [];
  const { data: profiles } = await supabase
    .from('profiles')
    .select('id, handle, display_name, avatar_color')
    .in('id', userIds);
  const byId = new Map((profiles ?? []).map((p) => [p.id, p]));
  return results
    .filter((r) => byId.has(r.user_id)) // drop rows whose profile isn't public
    .map((r) => {
      const p = byId.get(r.user_id)!;
      return {
        ...(r as DailyResultRow),
        handle: p.handle,
        display_name: p.display_name,
        avatar_color: p.avatar_color,
      };
    });
}
