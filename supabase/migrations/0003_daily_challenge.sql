-- LearnCRE PR O — daily challenge results
--
-- One row per (date, user) — primary key enforces "one play per day". Public
-- read for the leaderboard view (gated on linked profile being public);
-- owner-only insert/select otherwise.

create table if not exists public.daily_results (
  date         date not null,
  user_id      uuid not null references auth.users(id) on delete cascade,
  correct      integer not null,
  total        integer not null default 10,
  time_ms      integer not null,
  completed_at timestamptz not null default now(),
  primary key (date, user_id)
);

create index if not exists daily_results_rank_idx
  on public.daily_results(date, correct desc, time_ms asc);

alter table public.daily_results enable row level security;

-- Owner can insert their own row (PRIMARY KEY blocks duplicates).
drop policy if exists daily_results_owner_insert on public.daily_results;
create policy daily_results_owner_insert on public.daily_results
  for insert with check (auth.uid() = user_id);

-- Owner can select their own row (for "you played today" check).
drop policy if exists daily_results_owner_select on public.daily_results;
create policy daily_results_owner_select on public.daily_results
  for select using (auth.uid() = user_id);

-- Public read of rows whose owner has a public profile (for leaderboard).
drop policy if exists daily_results_public_select on public.daily_results;
create policy daily_results_public_select on public.daily_results
  for select using (
    exists (select 1 from public.profiles p where p.id = user_id and p.is_public = true)
  );

-- No update / delete policies — daily results are immutable once submitted.
