-- LearnCRE PR R — asymmetric follows
--
-- Twitter-style follows: (follower_id, followee_id) PK. Follower edges
-- are private to the follower (only you can see your own follow list).
-- The feed view leverages the existing public-read RLS on achievements +
-- daily_results — following a private profile does nothing useful, by
-- design.
--
-- Follower counts on the public profile come from a count() query that
-- reads any row whose followee profile is public.

create table if not exists public.follows (
  follower_id  uuid not null references auth.users(id) on delete cascade,
  followee_id  uuid not null references auth.users(id) on delete cascade,
  created_at   timestamptz not null default now(),
  primary key (follower_id, followee_id),
  -- No self-follow.
  check (follower_id <> followee_id)
);

create index if not exists follows_follower_idx on public.follows(follower_id, created_at desc);
create index if not exists follows_followee_idx on public.follows(followee_id, created_at desc);

alter table public.follows enable row level security;

-- Owner of the row (the follower) can do anything with their own follow edges.
drop policy if exists follows_self_all on public.follows;
create policy follows_self_all on public.follows
  for all using (auth.uid() = follower_id) with check (auth.uid() = follower_id);

-- Public profile pages can show "followed by N people" — anyone can read
-- rows whose followee's profile is_public.
drop policy if exists follows_followee_public_select on public.follows;
create policy follows_followee_public_select on public.follows
  for select using (
    exists (select 1 from public.profiles p where p.id = followee_id and p.is_public = true)
  );
