-- LearnCRE PR Q — head-to-head async match
--
-- 1v1 async match. Host creates a match → gets an invite token → opponent
-- accepts via SECURITY DEFINER function → both play the same seeded
-- 10-question set independently → result auto-settles when both have
-- submitted (or after the 7-day expiry).
--
-- Visibility model:
--   - Match row: visible to host + accepted opponent.
--   - Pre-acceptance, the opponent doesn't have direct read access — they
--     hand the (match_id, token) pair to accept_match_by_token() to claim
--     the slot.
--   - Result submission goes through submit_match_result() so the row's
--     status flips to 'settled' atomically when both sides have played.

create extension if not exists pgcrypto;

-- ============================================================
-- matches
-- ============================================================
create table if not exists public.matches (
  id                     uuid primary key default gen_random_uuid(),
  host_id                uuid not null references auth.users(id) on delete cascade,
  opponent_id            uuid references auth.users(id) on delete cascade,
  invite_token           text not null default encode(gen_random_bytes(12), 'hex'),
  seed                   bigint not null,
  status                 text not null default 'open'
                         check (status in ('open', 'accepted', 'settled', 'expired')),
  host_correct           integer,
  host_time_ms           integer,
  host_completed_at      timestamptz,
  opponent_correct       integer,
  opponent_time_ms       integer,
  opponent_completed_at  timestamptz,
  created_at             timestamptz not null default now(),
  updated_at             timestamptz not null default now(),
  expires_at             timestamptz not null default (now() + interval '7 days'),
  check (host_id <> opponent_id)
);

create index if not exists matches_host_idx on public.matches(host_id, created_at desc);
create index if not exists matches_opponent_idx on public.matches(opponent_id, created_at desc);

-- ============================================================
-- RLS — matches
-- ============================================================
alter table public.matches enable row level security;

-- Host can do anything with their matches.
drop policy if exists matches_host_all on public.matches;
create policy matches_host_all on public.matches
  for all using (auth.uid() = host_id) with check (auth.uid() = host_id);

-- Opponent can read their accepted matches.
drop policy if exists matches_opponent_select on public.matches;
create policy matches_opponent_select on public.matches
  for select using (auth.uid() = opponent_id);

-- ============================================================
-- accept_match_by_token: opponent claims the slot
-- ============================================================
create or replace function public.accept_match_by_token(p_match_id uuid, p_token text)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if auth.uid() is null then
    raise exception 'must be signed in';
  end if;
  update public.matches
    set opponent_id = auth.uid(),
        status      = 'accepted',
        updated_at  = now()
  where id = p_match_id
    and invite_token = p_token
    and status = 'open'
    and opponent_id is null
    and host_id <> auth.uid()
    and expires_at > now();
  if not found then
    raise exception 'invalid match, token, already accepted, expired, or you are the host';
  end if;
end;
$$;
revoke all on function public.accept_match_by_token(uuid, text) from public;
grant execute on function public.accept_match_by_token(uuid, text) to authenticated;

-- ============================================================
-- submit_match_result: writes the calling user's side, auto-settles
-- when both sides have submitted.
-- ============================================================
create or replace function public.submit_match_result(
  p_match_id uuid,
  p_correct  integer,
  p_time_ms  integer
)
returns text
language plpgsql
security definer
set search_path = public
as $$
declare
  v_host_id uuid;
  v_opp_id  uuid;
  v_role    text;
  v_host_done timestamptz;
  v_opp_done  timestamptz;
begin
  if auth.uid() is null then raise exception 'must be signed in'; end if;
  select host_id, opponent_id, host_completed_at, opponent_completed_at
    into v_host_id, v_opp_id, v_host_done, v_opp_done
  from public.matches where id = p_match_id;
  if not found then raise exception 'match not found'; end if;

  if v_host_id = auth.uid() then
    v_role := 'host';
  elsif v_opp_id = auth.uid() then
    v_role := 'opponent';
  else
    raise exception 'not a participant';
  end if;

  if (v_role = 'host' and v_host_done is not null)
     or (v_role = 'opponent' and v_opp_done is not null) then
    raise exception 'already submitted';
  end if;

  if v_role = 'host' then
    update public.matches set
      host_correct = p_correct,
      host_time_ms = p_time_ms,
      host_completed_at = now(),
      updated_at = now(),
      status = case when opponent_completed_at is not null then 'settled' else status end
    where id = p_match_id;
  else
    update public.matches set
      opponent_correct = p_correct,
      opponent_time_ms = p_time_ms,
      opponent_completed_at = now(),
      updated_at = now(),
      status = case when host_completed_at is not null then 'settled' else status end
    where id = p_match_id;
  end if;

  return v_role;
end;
$$;
revoke all on function public.submit_match_result(uuid, integer, integer) from public;
grant execute on function public.submit_match_result(uuid, integer, integer) to authenticated;
