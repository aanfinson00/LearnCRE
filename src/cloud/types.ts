/**
 * TypeScript shapes for the cloud-side `profiles` row.
 *
 * Mirrors the schema in supabase/migrations/0001_initial.sql. Keep in sync
 * when the schema evolves; ideally generate via `supabase gen types
 * typescript` once a CI step is in place. For PR L we hand-write to keep
 * the dependency surface small.
 */
export interface CloudProfile {
  id: string; // FK auth.users.id
  handle: string; // unique, public-safe
  display_name: string | null;
  avatar_color: string | null;
  bio: string | null;
  is_public: boolean;
  imported_at: string | null; // ISO timestamp; non-null when claimed from local
  created_at: string;
  updated_at: string;
}

export interface ProfileClaimPayload {
  handle: string;
  display_name: string | null;
  avatar_color: string;
  /** Local profile id being uploaded — stamped into imported_at metadata */
  local_profile_id: string;
}

/** Joined view returned by getPublicProfileByHandle. */
export interface PublicProfileSnapshot {
  profile: CloudProfile;
  totalXp: number;
  currentStreak: number;
  tier: string | null;
  achievements: { achievement_id: string; unlocked_at: string }[];
  recentSessions: {
    id: string;
    mode: string;
    ended_at: string | null;
    attempts: number;
    correct: number;
  }[];
}
