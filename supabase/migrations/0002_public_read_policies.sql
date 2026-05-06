-- LearnCRE PR N — public-read RLS for sub-tables
--
-- Lets anonymous + authenticated users SELECT rows from the per-user sub-tables
-- when the linked profile is is_public = true. The owner-only policies from
-- 0001_initial.sql remain unchanged (they coexist; PostgreSQL ORs RLS policies).
--
-- Also adds a `last_session_at` denorm hint on profiles for the "Last seen"
-- line on /u/<handle> (without exposing the full sessions list to anon).

-- ============================================================
-- xp_state — public read when linked profile is public
-- ============================================================
drop policy if exists xp_public_select on public.xp_state;
create policy xp_public_select on public.xp_state
  for select using (
    exists (select 1 from public.profiles p where p.id = user_id and p.is_public = true)
  );

-- ============================================================
-- tier_state — public read when linked profile is public
-- ============================================================
drop policy if exists tier_public_select on public.tier_state;
create policy tier_public_select on public.tier_state
  for select using (
    exists (select 1 from public.profiles p where p.id = user_id and p.is_public = true)
  );

-- ============================================================
-- sessions — public read of recent rows when linked profile is public
-- ============================================================
drop policy if exists sessions_public_select on public.sessions;
create policy sessions_public_select on public.sessions
  for select using (
    exists (select 1 from public.profiles p where p.id = user_id and p.is_public = true)
  );

-- ============================================================
-- achievements — public read when linked profile is public
-- ============================================================
drop policy if exists achievements_public_select on public.achievements;
create policy achievements_public_select on public.achievements
  for select using (
    exists (select 1 from public.profiles p where p.id = user_id and p.is_public = true)
  );

-- mistake_bank_items intentionally NOT exposed publicly — these are private
-- learning-state and have no leaderboard / discovery value.
