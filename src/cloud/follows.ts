import { ACHIEVEMENTS } from '../quiz/achievements';
import { getSupabase } from './client';

export type FeedEventKind = 'achievement' | 'daily';

export interface FeedEvent {
  kind: FeedEventKind;
  userId: string;
  handle: string;
  displayName: string | null;
  avatarColor: string | null;
  /** ISO timestamp; used for chronological sort. */
  timestamp: string;
  /** Free-form headline displayed in the feed row. */
  headline: string;
  /** Optional secondary line (e.g. "9/10 · 90% · 4:32"). */
  detail?: string;
}

interface ProfileLite {
  id: string;
  handle: string;
  display_name: string | null;
  avatar_color: string | null;
}

const ACH_LABEL: Record<string, string> = Object.fromEntries(
  ACHIEVEMENTS.map((a) => [a.id, a.label]),
);

async function fetchProfilesByIds(ids: string[]): Promise<Map<string, ProfileLite>> {
  const supabase = getSupabase();
  if (!supabase || ids.length === 0) return new Map();
  const { data } = await supabase
    .from('profiles')
    .select('id, handle, display_name, avatar_color')
    .in('id', ids);
  return new Map((data ?? []).map((p) => [p.id, p as ProfileLite]));
}

/** Insert a follow edge (auth.uid() → followeeId). Idempotent on PK collision. */
export async function follow(
  followerId: string,
  followeeId: string,
): Promise<{ ok: boolean; error: string | null }> {
  if (followerId === followeeId) {
    return { ok: false, error: 'cannot follow yourself' };
  }
  const supabase = getSupabase();
  if (!supabase) return { ok: false, error: 'cloud disabled' };
  const { error } = await supabase
    .from('follows')
    .insert({ follower_id: followerId, followee_id: followeeId });
  if (error) {
    if (error.code === '23505') return { ok: true, error: null };
    return { ok: false, error: error.message };
  }
  return { ok: true, error: null };
}

/** Delete a follow edge. */
export async function unfollow(
  followerId: string,
  followeeId: string,
): Promise<{ ok: boolean; error: string | null }> {
  const supabase = getSupabase();
  if (!supabase) return { ok: false, error: 'cloud disabled' };
  const { error } = await supabase
    .from('follows')
    .delete()
    .eq('follower_id', followerId)
    .eq('followee_id', followeeId);
  if (error) return { ok: false, error: error.message };
  return { ok: true, error: null };
}

/** Returns true when the follower already follows the followee. */
export async function isFollowing(
  followerId: string,
  followeeId: string,
): Promise<boolean> {
  const supabase = getSupabase();
  if (!supabase) return false;
  const { data } = await supabase
    .from('follows')
    .select('follower_id')
    .eq('follower_id', followerId)
    .eq('followee_id', followeeId)
    .maybeSingle();
  return data !== null;
}

/** Public follower count for a profile. RLS only returns rows when the
 *  followee's profile is public, so private profiles always count 0 here. */
export async function fetchFollowerCount(followeeId: string): Promise<number> {
  const supabase = getSupabase();
  if (!supabase) return 0;
  const { count } = await supabase
    .from('follows')
    .select('follower_id', { count: 'exact', head: true })
    .eq('followee_id', followeeId);
  return count ?? 0;
}

/**
 * Aggregated feed of recent activity across a follower's followees. Pulls
 * achievements + daily_results, joins to public profiles, sorts by ts
 * descending, returns up to `limit` events.
 *
 * Privacy: rows from non-public followees never surface (RLS on
 * achievements / daily_results gates on profile.is_public).
 */
export async function fetchFriendsFeed(
  followerId: string,
  limit = 30,
): Promise<FeedEvent[]> {
  const supabase = getSupabase();
  if (!supabase) return [];

  const { data: edges } = await supabase
    .from('follows')
    .select('followee_id')
    .eq('follower_id', followerId);
  const followeeIds = (edges ?? []).map((r) => r.followee_id as string);
  if (followeeIds.length === 0) return [];

  const [achRes, dailyRes] = await Promise.all([
    supabase
      .from('achievements')
      .select('user_id, achievement_id, unlocked_at')
      .in('user_id', followeeIds)
      .order('unlocked_at', { ascending: false })
      .limit(limit),
    supabase
      .from('daily_results')
      .select('user_id, date, correct, total, time_ms, completed_at')
      .in('user_id', followeeIds)
      .order('completed_at', { ascending: false })
      .limit(limit),
  ]);

  const userIds = new Set<string>();
  (achRes.data ?? []).forEach((r) => userIds.add(r.user_id as string));
  (dailyRes.data ?? []).forEach((r) => userIds.add(r.user_id as string));
  const profiles = await fetchProfilesByIds(Array.from(userIds));

  const events: FeedEvent[] = [];

  for (const a of achRes.data ?? []) {
    const p = profiles.get(a.user_id as string);
    if (!p) continue; // followee is private; RLS would have filtered, but defensive
    events.push({
      kind: 'achievement',
      userId: a.user_id as string,
      handle: p.handle,
      displayName: p.display_name,
      avatarColor: p.avatar_color,
      timestamp: a.unlocked_at as string,
      headline: `unlocked ${ACH_LABEL[a.achievement_id as string] ?? a.achievement_id}`,
    });
  }

  for (const d of dailyRes.data ?? []) {
    const p = profiles.get(d.user_id as string);
    if (!p) continue;
    const correct = d.correct as number;
    const total = d.total as number;
    const timeMs = d.time_ms as number;
    const acc = total > 0 ? Math.round((correct / total) * 100) : 0;
    const m = Math.floor(timeMs / 60_000);
    const s = Math.floor((timeMs % 60_000) / 1000);
    events.push({
      kind: 'daily',
      userId: d.user_id as string,
      handle: p.handle,
      displayName: p.display_name,
      avatarColor: p.avatar_color,
      timestamp: d.completed_at as string,
      headline: `played ${d.date as string} daily`,
      detail: `${correct}/${total} · ${acc}% · ${m}:${String(s).padStart(2, '0')}`,
    });
  }

  events.sort((a, b) => b.timestamp.localeCompare(a.timestamp));
  return events.slice(0, limit);
}

// ============== pure helpers (exported for testing) ==============

/** Merge + sort a heterogeneous event list. Pure; isolated for testing. */
export function mergeFeedEvents(
  ...lists: FeedEvent[][]
): FeedEvent[] {
  const all: FeedEvent[] = [];
  for (const l of lists) all.push(...l);
  all.sort((a, b) => b.timestamp.localeCompare(a.timestamp));
  return all;
}
