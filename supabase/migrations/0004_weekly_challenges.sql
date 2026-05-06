-- LearnCRE PR P — weekly themed challenge results
--
-- The weekly themes themselves live in app code (src/quiz/weeklyChallenges.ts)
-- so the schedule + curator + question pool is versioned with the rest of
-- the codebase. The cloud only stores per-user results.
--
-- Mirrors the shape of daily_results from 0003. Primary key (challenge_id,
-- user_id) enforces one play per theme. Immutable once submitted.

create table if not exists public.weekly_results (
  challenge_id text not null,
  user_id      uuid not null references auth.users(id) on delete cascade,
  correct      integer not null,
  total        integer not null default 10,
  time_ms      integer not null,
  completed_at timestamptz not null default now(),
  primary key (challenge_id, user_id)
);

create index if not exists weekly_results_rank_idx
  on public.weekly_results(challenge_id, correct desc, time_ms asc);

alter table public.weekly_results enable row level security;

drop policy if exists weekly_results_owner_insert on public.weekly_results;
create policy weekly_results_owner_insert on public.weekly_results
  for insert with check (auth.uid() = user_id);

drop policy if exists weekly_results_owner_select on public.weekly_results;
create policy weekly_results_owner_select on public.weekly_results
  for select using (auth.uid() = user_id);

drop policy if exists weekly_results_public_select on public.weekly_results;
create policy weekly_results_public_select on public.weekly_results
  for select using (
    exists (select 1 from public.profiles p where p.id = user_id and p.is_public = true)
  );
