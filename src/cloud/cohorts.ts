import { getSupabase } from './client';

export interface Cohort {
  id: string;
  slug: string;
  name: string;
  owner_id: string;
  invite_token: string;
  created_at: string;
  updated_at: string;
}

export interface CohortMember {
  user_id: string;
  joined_at: string;
  handle: string;
  display_name: string | null;
  avatar_color: string | null;
}

export interface CohortLeaderboardEntry {
  rank: number;
  userId: string;
  handle: string;
  displayName: string | null;
  avatarColor: string | null;
  totalXp: number;
}

/** Build the shareable invite URL for a cohort. */
export function buildCohortInviteUrl(slug: string, token: string): string {
  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  return `${origin}/c/${slug}?token=${encodeURIComponent(token)}`;
}

/** Normalize a slug — lowercase, replace runs of non-[a-z0-9] with '-'. */
export function normalizeSlug(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 32);
}

export function isValidSlug(slug: string): boolean {
  return /^[a-z0-9-]{3,32}$/.test(slug);
}

/** Create a new cohort. Returns the freshly inserted row. */
export async function createCohort(
  ownerId: string,
  name: string,
  slug: string,
): Promise<{ ok: true; cohort: Cohort } | { ok: false; error: string }> {
  const supabase = getSupabase();
  if (!supabase) return { ok: false, error: 'cloud disabled' };
  const cleanSlug = normalizeSlug(slug);
  const cleanName = name.trim();
  if (!isValidSlug(cleanSlug)) {
    return { ok: false, error: 'slug must be 3–32 chars: a-z, 0-9, -' };
  }
  if (!cleanName || cleanName.length > 80) {
    return { ok: false, error: 'name must be 1–80 chars' };
  }
  const { data, error } = await supabase
    .from('cohorts')
    .insert({ owner_id: ownerId, name: cleanName, slug: cleanSlug })
    .select('*')
    .maybeSingle();
  if (error || !data) {
    if (error?.code === '23505') return { ok: false, error: 'slug already taken' };
    return { ok: false, error: error?.message ?? 'create failed' };
  }
  // Auto-add owner as a member so they appear in the member list.
  await supabase.from('cohort_members').insert({
    cohort_id: data.id,
    user_id: ownerId,
  });
  return { ok: true, cohort: data as Cohort };
}

/** All cohorts the user owns OR is a member of. Deduped by id. */
export async function fetchMyCohorts(userId: string): Promise<Cohort[]> {
  const supabase = getSupabase();
  if (!supabase) return [];
  const [ownedRes, memberRes] = await Promise.all([
    supabase.from('cohorts').select('*').eq('owner_id', userId),
    supabase.from('cohort_members').select('cohort_id').eq('user_id', userId),
  ]);
  const owned = (ownedRes.data ?? []) as Cohort[];
  const memberCohortIds = (memberRes.data ?? []).map((r) => r.cohort_id as string);
  const idsToFetch = memberCohortIds.filter(
    (id) => !owned.some((c) => c.id === id),
  );
  let memberCohorts: Cohort[] = [];
  if (idsToFetch.length > 0) {
    const { data } = await supabase.from('cohorts').select('*').in('id', idsToFetch);
    memberCohorts = (data ?? []) as Cohort[];
  }
  return [...owned, ...memberCohorts].sort((a, b) =>
    a.name.localeCompare(b.name),
  );
}

export async function fetchCohortBySlug(slug: string): Promise<Cohort | null> {
  const supabase = getSupabase();
  if (!supabase) return null;
  const { data } = await supabase
    .from('cohorts')
    .select('*')
    .eq('slug', slug)
    .maybeSingle();
  return data as Cohort | null;
}

export async function joinCohortByToken(
  slug: string,
  token: string,
): Promise<{ ok: boolean; error: string | null }> {
  const supabase = getSupabase();
  if (!supabase) return { ok: false, error: 'cloud disabled' };
  const { error } = await supabase.rpc('join_cohort_by_token', {
    p_slug: slug.trim().toLowerCase(),
    p_token: token.trim(),
  });
  if (error) return { ok: false, error: error.message };
  return { ok: true, error: null };
}

export async function leaveCohort(
  cohortId: string,
  userId: string,
): Promise<{ ok: boolean; error: string | null }> {
  const supabase = getSupabase();
  if (!supabase) return { ok: false, error: 'cloud disabled' };
  const { error } = await supabase
    .from('cohort_members')
    .delete()
    .eq('cohort_id', cohortId)
    .eq('user_id', userId);
  if (error) return { ok: false, error: error.message };
  return { ok: true, error: null };
}

export async function fetchCohortMembers(cohortId: string): Promise<CohortMember[]> {
  const supabase = getSupabase();
  if (!supabase) return [];
  const { data: memberRows } = await supabase
    .from('cohort_members')
    .select('user_id, joined_at')
    .eq('cohort_id', cohortId)
    .order('joined_at', { ascending: true });
  const memberList = (memberRows ?? []) as { user_id: string; joined_at: string }[];
  if (memberList.length === 0) return [];

  const { data: profiles } = await supabase
    .from('profiles')
    .select('id, handle, display_name, avatar_color')
    .in('id', memberList.map((m) => m.user_id));
  const byId = new Map(
    (profiles ?? []).map((p) => [
      p.id as string,
      p as { id: string; handle: string; display_name: string | null; avatar_color: string | null },
    ]),
  );
  return memberList.map((m) => {
    const p = byId.get(m.user_id);
    return {
      user_id: m.user_id,
      joined_at: m.joined_at,
      handle: p?.handle ?? '(private)',
      display_name: p?.display_name ?? null,
      avatar_color: p?.avatar_color ?? null,
    };
  });
}

/** Cohort-scoped XP leaderboard. Same shape as PR S all-time XP. */
export async function fetchCohortAlltimeXp(
  cohortId: string,
): Promise<CohortLeaderboardEntry[]> {
  const supabase = getSupabase();
  if (!supabase) return [];
  const { data: memberRows } = await supabase
    .from('cohort_members')
    .select('user_id')
    .eq('cohort_id', cohortId);
  const memberIds = (memberRows ?? []).map((r) => r.user_id as string);
  if (memberIds.length === 0) return [];

  const [xpRes, profilesRes] = await Promise.all([
    supabase
      .from('xp_state')
      .select('user_id, total_xp')
      .in('user_id', memberIds)
      .order('total_xp', { ascending: false }),
    supabase
      .from('profiles')
      .select('id, handle, display_name, avatar_color')
      .in('id', memberIds),
  ]);
  const profiles = new Map(
    (profilesRes.data ?? []).map((p) => [
      p.id as string,
      p as { id: string; handle: string; display_name: string | null; avatar_color: string | null },
    ]),
  );
  const xpRows = (xpRes.data ?? []) as { user_id: string; total_xp: number }[];

  // Members without an xp_state row still appear at the bottom with 0 XP.
  const xpById = new Map(xpRows.map((r) => [r.user_id, r.total_xp]));
  const sorted = memberIds
    .map((id) => ({ id, xp: xpById.get(id) ?? 0 }))
    .sort((a, b) => b.xp - a.xp);

  return sorted.map((row, i) => {
    const p = profiles.get(row.id);
    return {
      rank: i + 1,
      userId: row.id,
      handle: p?.handle ?? '(private)',
      displayName: p?.display_name ?? null,
      avatarColor: p?.avatar_color ?? null,
      totalXp: row.xp,
    };
  });
}
