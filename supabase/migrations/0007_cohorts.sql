-- LearnCRE PR T — cohort / org leaderboards
--
-- Invite-by-link cohorts ("Acme RE summer interns") with their own scoped
-- leaderboard. Owner creates a cohort + invite_token; invitees POST the
-- (slug, token) pair to the join_cohort_by_token() function which verifies
-- the token server-side before inserting a cohort_members row.
--
-- Visibility model:
-- - Cohort row: visible to owner + active members only (RLS).
-- - Membership rows: visible to owner of the cohort + any member of the
--   same cohort. Owner can manage rows; members can delete their own.
-- - Joining: only via the SECURITY DEFINER function (so non-members can't
--   even read invite_token by slug-guessing).

create extension if not exists pgcrypto;

-- ============================================================
-- cohorts
-- ============================================================
create table if not exists public.cohorts (
  id           uuid primary key default gen_random_uuid(),
  slug         text not null unique,
  name         text not null,
  owner_id     uuid not null references auth.users(id) on delete cascade,
  invite_token text not null default encode(gen_random_bytes(12), 'hex'),
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now(),
  check (length(slug) between 3 and 32 and slug ~ '^[a-z0-9-]+$'),
  check (length(name) between 1 and 80)
);

create index if not exists cohorts_owner_idx on public.cohorts(owner_id);

-- ============================================================
-- cohort_members
-- ============================================================
create table if not exists public.cohort_members (
  cohort_id uuid not null references public.cohorts(id) on delete cascade,
  user_id   uuid not null references auth.users(id) on delete cascade,
  joined_at timestamptz not null default now(),
  primary key (cohort_id, user_id)
);

create index if not exists cohort_members_user_idx on public.cohort_members(user_id);

-- ============================================================
-- Helper: SECURITY DEFINER membership check breaks RLS recursion
-- ============================================================
create or replace function public.is_cohort_member(p_cohort_id uuid)
returns boolean
language sql
security definer
stable
set search_path = public
as $$
  select exists (
    select 1 from public.cohort_members
    where cohort_id = p_cohort_id and user_id = auth.uid()
  );
$$;
revoke all on function public.is_cohort_member(uuid) from public;
grant execute on function public.is_cohort_member(uuid) to authenticated;

-- ============================================================
-- Join function: validates token, inserts cohort_members
-- ============================================================
create or replace function public.join_cohort_by_token(p_slug text, p_token text)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_cohort_id uuid;
begin
  if auth.uid() is null then
    raise exception 'must be signed in';
  end if;
  select id into v_cohort_id from public.cohorts
    where slug = p_slug and invite_token = p_token;
  if v_cohort_id is null then
    raise exception 'invalid cohort or token';
  end if;
  insert into public.cohort_members (cohort_id, user_id)
    values (v_cohort_id, auth.uid())
    on conflict do nothing;
  return v_cohort_id;
end;
$$;
revoke all on function public.join_cohort_by_token(text, text) from public;
grant execute on function public.join_cohort_by_token(text, text) to authenticated;

-- ============================================================
-- RLS — cohorts
-- ============================================================
alter table public.cohorts enable row level security;

drop policy if exists cohorts_owner_all on public.cohorts;
create policy cohorts_owner_all on public.cohorts
  for all using (auth.uid() = owner_id) with check (auth.uid() = owner_id);

drop policy if exists cohorts_member_select on public.cohorts;
create policy cohorts_member_select on public.cohorts
  for select using (is_cohort_member(id));

-- ============================================================
-- RLS — cohort_members
-- ============================================================
alter table public.cohort_members enable row level security;

-- Owner can manage all members of cohorts they own.
drop policy if exists cohort_members_owner_all on public.cohort_members;
create policy cohort_members_owner_all on public.cohort_members
  for all using (
    exists (select 1 from public.cohorts c where c.id = cohort_id and c.owner_id = auth.uid())
  ) with check (
    exists (select 1 from public.cohorts c where c.id = cohort_id and c.owner_id = auth.uid())
  );

-- Members can see all members of their own cohort.
drop policy if exists cohort_members_peer_select on public.cohort_members;
create policy cohort_members_peer_select on public.cohort_members
  for select using (is_cohort_member(cohort_id));

-- Members can delete their own row to leave.
drop policy if exists cohort_members_self_delete on public.cohort_members;
create policy cohort_members_self_delete on public.cohort_members
  for delete using (auth.uid() = user_id);
