import { getSupabase } from './client';

export interface WeeklyResultRow {
  challenge_id: string;
  user_id: string;
  correct: number;
  total: number;
  time_ms: number;
  completed_at: string;
}

export interface WeeklyLeaderboardRow extends WeeklyResultRow {
  handle: string;
  display_name: string | null;
  avatar_color: string | null;
}

/** Submit a weekly result. Idempotent on (challenge_id, user_id). */
export async function submitWeeklyResult(
  userId: string,
  challengeId: string,
  correct: number,
  total: number,
  timeMs: number,
): Promise<{ ok: boolean; error: string | null }> {
  const supabase = getSupabase();
  if (!supabase) return { ok: false, error: 'cloud disabled' };
  const { error } = await supabase.from('weekly_results').insert({
    challenge_id: challengeId,
    user_id: userId,
    correct,
    total,
    time_ms: timeMs,
  });
  if (error) {
    if (error.code === '23505') return { ok: true, error: null };
    return { ok: false, error: error.message };
  }
  return { ok: true, error: null };
}

export async function fetchMyWeeklyResult(
  userId: string,
  challengeId: string,
): Promise<WeeklyResultRow | null> {
  const supabase = getSupabase();
  if (!supabase) return null;
  const { data, error } = await supabase
    .from('weekly_results')
    .select('*')
    .eq('user_id', userId)
    .eq('challenge_id', challengeId)
    .maybeSingle();
  if (error) return null;
  return data as WeeklyResultRow | null;
}

export async function fetchWeeklyLeaderboard(
  challengeId: string,
  limit = 25,
): Promise<WeeklyLeaderboardRow[]> {
  const supabase = getSupabase();
  if (!supabase) return [];
  const { data: results, error } = await supabase
    .from('weekly_results')
    .select('*')
    .eq('challenge_id', challengeId)
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
    .filter((r) => byId.has(r.user_id))
    .map((r) => {
      const p = byId.get(r.user_id)!;
      return {
        ...(r as WeeklyResultRow),
        handle: p.handle,
        display_name: p.display_name,
        avatar_color: p.avatar_color,
      };
    });
}
