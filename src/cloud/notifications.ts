import { getSupabase } from './client';

export interface NotificationPreferences {
  user_id: string;
  email: string | null;
  weekly_digest_enabled: boolean;
  daily_reminder_enabled: boolean;
  daily_reminder_hour_utc: number;
  friend_unlock_enabled: boolean;
  unsubscribe_token: string;
  last_weekly_sent_at: string | null;
  last_daily_sent_at: string | null;
}

/** Fetch (or create) the prefs row for the current user. Returns null when
 *  cloud is disabled or the user is signed out. */
export async function fetchNotificationPreferences(
  userId: string,
  email: string | null,
): Promise<NotificationPreferences | null> {
  const supabase = getSupabase();
  if (!supabase) return null;
  const { data, error } = await supabase
    .from('notification_preferences')
    .select('*')
    .eq('user_id', userId)
    .maybeSingle();
  if (error) return null;
  if (data) {
    // Refresh the denormalized email if the auth.users one drifted.
    if (email && data.email !== email) {
      await supabase
        .from('notification_preferences')
        .update({ email, updated_at: new Date().toISOString() })
        .eq('user_id', userId);
      return { ...(data as NotificationPreferences), email };
    }
    return data as NotificationPreferences;
  }
  // First-touch: create the row with defaults, all toggles off.
  const { data: created, error: insertError } = await supabase
    .from('notification_preferences')
    .insert({ user_id: userId, email })
    .select('*')
    .maybeSingle();
  if (insertError || !created) return null;
  return created as NotificationPreferences;
}

export type PreferencesPatch = Partial<
  Pick<
    NotificationPreferences,
    | 'weekly_digest_enabled'
    | 'daily_reminder_enabled'
    | 'daily_reminder_hour_utc'
    | 'friend_unlock_enabled'
  >
>;

export async function updateNotificationPreferences(
  userId: string,
  patch: PreferencesPatch,
): Promise<{ ok: boolean; error: string | null }> {
  const supabase = getSupabase();
  if (!supabase) return { ok: false, error: 'cloud disabled' };
  const { error } = await supabase
    .from('notification_preferences')
    .update({ ...patch, updated_at: new Date().toISOString() })
    .eq('user_id', userId);
  if (error) return { ok: false, error: error.message };
  return { ok: true, error: null };
}

/** Public unsubscribe endpoint — called from the /unsubscribe?token=XXX page. */
export async function unsubscribeByToken(
  token: string,
): Promise<{ ok: boolean; error: string | null }> {
  const supabase = getSupabase();
  if (!supabase) return { ok: false, error: 'cloud disabled' };
  const { error } = await supabase.rpc('unsubscribe_by_token', {
    p_token: token.trim(),
  });
  if (error) return { ok: false, error: error.message };
  return { ok: true, error: null };
}
