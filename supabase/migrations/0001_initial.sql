-- LearnCRE cloud foundation — PR L
--
-- Creates the `profiles` table (1:1 with auth.users) and placeholder tables
-- for cross-device sync (data writes come in PR M). All tables RLS-locked
-- to the row owner; profiles get a public-read policy for opt-in publishing.
--
-- Apply via the Supabase SQL editor or `supabase migration up`.

-- ============================================================
-- profiles — 1:1 with auth.users
-- ============================================================
create table if not exists public.profiles (
  id            uuid primary key references auth.users(id) on delete cascade,
  handle        citext not null unique,
  display_name  text,
  avatar_color  text,
  bio           text,
  is_public     boolean not null default false,
  imported_at   timestamptz,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create extension if not exists citext;

-- Length + char-set guard on handle
alter table public.profiles
  drop constraint if exists profiles_handle_format,
  add constraint profiles_handle_format
    check (length(handle) between 3 and 24 and handle ~ '^[a-z0-9_-]+$');

-- Auto-bump updated_at
create or replace function public.set_updated_at() returns trigger as $$
begin
  new.updated_at := now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists profiles_updated_at on public.profiles;
create trigger profiles_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

alter table public.profiles enable row level security;

-- Owner reads + writes.
drop policy if exists profiles_owner_select on public.profiles;
create policy profiles_owner_select on public.profiles
  for select using (auth.uid() = id);

drop policy if exists profiles_owner_insert on public.profiles;
create policy profiles_owner_insert on public.profiles
  for insert with check (auth.uid() = id);

drop policy if exists profiles_owner_update on public.profiles;
create policy profiles_owner_update on public.profiles
  for update using (auth.uid() = id);

-- Public reads when is_public = true (for /u/<handle> in PR N).
drop policy if exists profiles_public_select on public.profiles;
create policy profiles_public_select on public.profiles
  for select using (is_public = true);

-- ============================================================
-- Placeholder tables for PR M (cross-device sync)
-- ============================================================
-- Created with RLS enabled so the schema is ready when sync lands. No app
-- code reads/writes these in PR L — they're shape-only.

create table if not exists public.xp_state (
  user_id        uuid primary key references auth.users(id) on delete cascade,
  total_xp       integer not null default 0,
  current_streak integer not null default 0,
  last_active_at timestamptz,
  updated_at     timestamptz not null default now()
);
alter table public.xp_state enable row level security;
drop policy if exists xp_owner on public.xp_state;
create policy xp_owner on public.xp_state
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create table if not exists public.tier_state (
  user_id    uuid primary key references auth.users(id) on delete cascade,
  tier       text not null,
  unlocked_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.tier_state enable row level security;
drop policy if exists tier_owner on public.tier_state;
create policy tier_owner on public.tier_state
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create table if not exists public.sessions (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid not null references auth.users(id) on delete cascade,
  mode         text not null,
  started_at   timestamptz not null,
  ended_at     timestamptz,
  attempts     integer not null default 0,
  correct      integer not null default 0,
  payload      jsonb not null default '{}'::jsonb,
  updated_at   timestamptz not null default now()
);
create index if not exists sessions_user_idx on public.sessions(user_id, started_at desc);
alter table public.sessions enable row level security;
drop policy if exists sessions_owner on public.sessions;
create policy sessions_owner on public.sessions
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create table if not exists public.achievements (
  user_id     uuid not null references auth.users(id) on delete cascade,
  achievement_id text not null,
  unlocked_at timestamptz not null default now(),
  primary key (user_id, achievement_id)
);
alter table public.achievements enable row level security;
drop policy if exists achievements_owner on public.achievements;
create policy achievements_owner on public.achievements
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create table if not exists public.mistake_bank_items (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users(id) on delete cascade,
  question_id text not null,
  kind        text not null,
  payload     jsonb not null default '{}'::jsonb,
  added_at    timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  unique (user_id, question_id)
);
create index if not exists mistakes_user_idx on public.mistake_bank_items(user_id, added_at desc);
alter table public.mistake_bank_items enable row level security;
drop policy if exists mistakes_owner on public.mistake_bank_items;
create policy mistakes_owner on public.mistake_bank_items
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
