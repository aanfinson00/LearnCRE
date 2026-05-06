import { dailyDate } from '../quiz/dailyChallenge';
import { getSupabase } from './client';

export type LeaderboardKind = 'xpAlltime' | 'xpWeekly' | 'streakAlltime' | 'dailyToday';

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  handle: string;
  displayName: string | null;
  avatarColor: string | null;
  /** The metric value displayed for this leaderboard. */
  value: number;
  /** Optional secondary metric (e.g. accuracy % on daily). */
  secondary?: string;
}

/** ISO-week-start (Monday 00:00 UTC) for the given moment. */
export function startOfIsoWeek(now: Date = new Date()): Date {
  const d = new Date(now);
  const day = d.getUTCDay() || 7; // 1-7, Mon-Sun (treat Sun as 7)
  d.setUTCHours(0, 0, 0, 0);
  d.setUTCDate(d.getUTCDate() - (day - 1));
  return d;
}

interface ProfileRow {
  id: string;
  handle: string;
  display_name: string | null;
  avatar_color: string | null;
}

async function fetchPublicProfiles(userIds: string[]): Promise<Map<string, ProfileRow>> {
  const supabase = getSupabase();
  if (!supabase || userIds.length === 0) return new Map();
  const { data } = await supabase
    .from('profiles')
    .select('id, handle, display_name, avatar_color')
    .in('id', userIds);
  return new Map((data ?? []).map((p) => [p.id, p as ProfileRow]));
}

/** Top N by lifetime total XP. */
export async function fetchAlltimeXp(limit = 100): Promise<LeaderboardEntry[]> {
  const supabase = getSupabase();
  if (!supabase) return [];
  const { data, error } = await supabase
    .from('xp_state')
    .select('user_id, total_xp')
    .order('total_xp', { ascending: false })
    .limit(limit);
  if (error || !data) return [];
  const profiles = await fetchPublicProfiles(data.map((r) => r.user_id));
  return data
    .filter((r) => profiles.has(r.user_id))
    .map((r, i) => {
      const p = profiles.get(r.user_id)!;
      return {
        rank: i + 1,
        userId: r.user_id,
        handle: p.handle,
        displayName: p.display_name,
        avatarColor: p.avatar_color,
        value: r.total_xp ?? 0,
      };
    });
}

/** Top N by best daily streak. */
export async function fetchAlltimeStreak(limit = 100): Promise<LeaderboardEntry[]> {
  const supabase = getSupabase();
  if (!supabase) return [];
  const { data, error } = await supabase
    .from('xp_state')
    .select('user_id, best_streak')
    .order('best_streak', { ascending: false })
    .limit(limit);
  if (error || !data) return [];
  const profiles = await fetchPublicProfiles(data.map((r) => r.user_id));
  return data
    .filter((r) => profiles.has(r.user_id) && (r.best_streak ?? 0) > 0)
    .map((r, i) => {
      const p = profiles.get(r.user_id)!;
      return {
        rank: i + 1,
        userId: r.user_id,
        handle: p.handle,
        displayName: p.display_name,
        avatarColor: p.avatar_color,
        value: r.best_streak ?? 0,
      };
    });
}

/**
 * Top N by XP earned this ISO week. Sums sessions.payload->>'xpEarned' over
 * sessions whose started_at >= Monday 00:00 UTC.
 */
export async function fetchWeeklyXp(limit = 100): Promise<LeaderboardEntry[]> {
  const supabase = getSupabase();
  if (!supabase) return [];
  const since = startOfIsoWeek().toISOString();
  // Pull rows + sum client-side. With public-read RLS on sessions this is a
  // small enough working set for v1; revisit when leaderboards get long.
  const { data, error } = await supabase
    .from('sessions')
    .select('user_id, payload')
    .gte('started_at', since);
  if (error || !data) return [];
  const tally = new Map<string, number>();
  for (const row of data as { user_id: string; payload: { xpEarned?: number } }[]) {
    const xp = Number(row.payload?.xpEarned ?? 0);
    if (!xp) continue;
    tally.set(row.user_id, (tally.get(row.user_id) ?? 0) + xp);
  }
  const sorted = Array.from(tally.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit);
  const profiles = await fetchPublicProfiles(sorted.map(([id]) => id));
  return sorted
    .filter(([id]) => profiles.has(id))
    .map(([userId, xp], i) => {
      const p = profiles.get(userId)!;
      return {
        rank: i + 1,
        userId,
        handle: p.handle,
        displayName: p.display_name,
        avatarColor: p.avatar_color,
        value: xp,
      };
    });
}

/** Today's daily-challenge leaderboard (top N). */
export async function fetchTodaysDaily(limit = 100): Promise<LeaderboardEntry[]> {
  const supabase = getSupabase();
  if (!supabase) return [];
  const today = dailyDate();
  const { data, error } = await supabase
    .from('daily_results')
    .select('user_id, correct, total, time_ms')
    .eq('date', today)
    .order('correct', { ascending: false })
    .order('time_ms', { ascending: true })
    .limit(limit);
  if (error || !data) return [];
  const profiles = await fetchPublicProfiles(data.map((r) => r.user_id));
  return data
    .filter((r) => profiles.has(r.user_id))
    .map((r, i) => {
      const p = profiles.get(r.user_id)!;
      const acc = r.total > 0 ? Math.round((r.correct / r.total) * 100) : 0;
      const m = Math.floor(r.time_ms / 60_000);
      const s = Math.floor((r.time_ms % 60_000) / 1000);
      return {
        rank: i + 1,
        userId: r.user_id,
        handle: p.handle,
        displayName: p.display_name,
        avatarColor: p.avatar_color,
        value: r.correct,
        secondary: `${acc}% · ${m}:${String(s).padStart(2, '0')}`,
      };
    });
}
