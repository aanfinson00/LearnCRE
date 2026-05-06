import { activeProfile } from '../storage/profiles';
import { getSupabase } from './client';
import type { CloudProfile, ProfileClaimPayload } from './types';

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
