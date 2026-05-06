import { activeProfile } from '../storage/profiles';
import { getSupabase } from './client';
import type { CloudProfile, ProfileClaimPayload, PublicProfileSnapshot } from './types';

/**
 * Fetch the cloud profile row for the currently authenticated user.
 * Returns null when no row exists (first sign-in, pre-claim).
 */
export async function fetchCloudProfile(userId: string): Promise<CloudProfile | null> {
  const supabase = getSupabase();
  if (!supabase) return null;
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .maybeSingle();
  if (error) {
    console.warn('fetchCloudProfile error', error);
    return null;
  }
  return data as CloudProfile | null;
}

/**
 * Claim the active local profile by uploading it to the cloud profiles table.
 * Idempotent — calling twice with the same payload is a no-op upsert.
 */
export async function claimLocalProfile(
  userId: string,
  payload: ProfileClaimPayload,
): Promise<{ ok: boolean; error: string | null }> {
  const supabase = getSupabase();
  if (!supabase) return { ok: false, error: 'Cloud not enabled' };
  const now = new Date().toISOString();
  const { error } = await supabase.from('profiles').upsert({
    id: userId,
    handle: payload.handle,
    display_name: payload.display_name,
    avatar_color: payload.avatar_color,
    bio: null,
    is_public: false,
    imported_at: now,
    updated_at: now,
  });
  if (error) return { ok: false, error: error.message };
  return { ok: true, error: null };
}

/** Toggle the is_public flag on the current user's profile. */
export async function setProfilePublic(
  userId: string,
  isPublic: boolean,
): Promise<{ ok: boolean; error: string | null }> {
  const supabase = getSupabase();
  if (!supabase) return { ok: false, error: 'Cloud not enabled' };
  const { error } = await supabase
    .from('profiles')
    .update({ is_public: isPublic, updated_at: new Date().toISOString() })
    .eq('id', userId);
  if (error) return { ok: false, error: error.message };
  return { ok: true, error: null };
}

/**
 * Look up a public profile by handle. Returns null when no row exists or
 * the row is not flagged public (RLS enforces this server-side too).
 */
export async function getPublicProfileByHandle(
  handle: string,
): Promise<PublicProfileSnapshot | null> {
  const supabase = getSupabase();
  if (!supabase) return null;
  const cleanHandle = handle.trim().toLowerCase();
  if (!/^[a-z0-9_-]{3,24}$/.test(cleanHandle)) return null;

  const { data: profile, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('handle', cleanHandle)
    .eq('is_public', true)
    .maybeSingle();
  if (error || !profile) return null;

  const userId = (profile as CloudProfile).id;
  const [xpRes, tierRes, achievementsRes, sessionsRes] = await Promise.all([
    supabase.from('xp_state').select('total_xp, current_streak').eq('user_id', userId).maybeSingle(),
    supabase.from('tier_state').select('tier').eq('user_id', userId).maybeSingle(),
    supabase.from('achievements').select('achievement_id, unlocked_at').eq('user_id', userId),
    supabase
      .from('sessions')
      .select('id, mode, ended_at, attempts, correct')
      .eq('user_id', userId)
      .order('ended_at', { ascending: false, nullsFirst: false })
      .limit(8),
  ]);

  return {
    profile: profile as CloudProfile,
    totalXp: xpRes.data?.total_xp ?? 0,
    currentStreak: xpRes.data?.current_streak ?? 0,
    tier: tierRes.data?.tier ?? null,
    achievements: (achievementsRes.data ?? []) as PublicProfileSnapshot['achievements'],
    recentSessions: (sessionsRes.data ?? []) as PublicProfileSnapshot['recentSessions'],
  };
}

/** Suggest a default handle from the active local profile name. */
export function suggestHandle(): string {
  const local = activeProfile();
  const slug = (local.name || 'investor')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 24);
  return slug || 'investor';
}
