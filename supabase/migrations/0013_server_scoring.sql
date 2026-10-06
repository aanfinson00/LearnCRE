-- LearnCRE — server-side scoring for competitive surfaces
--
-- Before this migration the browser wrote its own scores: daily/weekly rows
-- were inserted directly with whatever `correct` and `time_ms` the client
-- sent, match hosts could UPDATE their match row (both sides' scores), and
-- XP totals were trusted as-is. Anyone could post 10/10 in 1 ms from the
-- console.
--
-- Now:
--   * Daily, weekly and head-to-head results are written only by the
--     `score-challenge` Edge Function (service role). It records a
--     server-side start time, regenerates the seeded questions, grades the
--     submitted answers itself, and measures time on the server clock.
--   * Implausibly fast runs are stored but `flagged` and hidden from public
--     leaderboards.
--   * Match rows can no longer be updated by participants; seeds are drawn
--     server-side.
--   * XP totals and per-session XP get plausibility limits, since practice
--     XP is earned offline and can't be fully verified.

-- ============================================================
-- Attempt ledger (written only by the score-challenge function)
-- ============================================================
create table if not exists public.challenge_attempts (
  user_id      uuid not null references auth.users(id) on delete cascade,
  kind         text not null check (kind in ('daily', 'weekly', 'match')),
  ref          text not null,
  started_at   timestamptz not null default now(),
  submitted_at timestamptz,
  correct      integer,
  total        integer,
  time_ms      integer,
  flagged      boolean not null default false,
  answers      jsonb,
  primary key (user_id, kind, ref)
);

alter table public.challenge_attempts enable row level security;

drop policy if exists challenge_attempts_owner_select on public.challenge_attempts;
create policy challenge_attempts_owner_select on public.challenge_attempts
  for select using (auth.uid() = user_id);
-- No insert / update / delete policies: only the service role writes here.

-- ============================================================
-- Daily + weekly results: server-written only, flagged runs hidden
-- ============================================================
alter table public.daily_results  add column if not exists flagged boolean not null default false;
alter table public.weekly_results add column if not exists flagged boolean not null default false;

drop policy if exists daily_results_owner_insert on public.daily_results;
drop policy if exists weekly_results_owner_insert on public.weekly_results;

drop policy if exists daily_results_public_select on public.daily_results;
create policy daily_results_public_select on public.daily_results
  for select using (
    not flagged
    and exists (select 1 from public.profiles p where p.id = user_id and p.is_public = true)
  );

drop policy if exists weekly_results_public_select on public.weekly_results;
create policy weekly_results_public_select on public.weekly_results
  for select using (
    not flagged
    and exists (select 1 from public.profiles p where p.id = user_id and p.is_public = true)
  );

-- ============================================================
-- Matches: no participant updates; server-drawn seeds; server-only results
-- ============================================================
drop policy if exists matches_host_all on public.matches;

drop policy if exists matches_host_select on public.matches;
create policy matches_host_select on public.matches
  for select using (auth.uid() = host_id);

-- Hosts create open, unplayed matches for themselves only.
drop policy if exists matches_host_insert on public.matches;
create policy matches_host_insert on public.matches
  for insert with check (
    auth.uid() = host_id
    and opponent_id is null
    and status = 'open'
    and host_correct is null and host_time_ms is null and host_completed_at is null
    and opponent_correct is null and opponent_time_ms is null and opponent_completed_at is null
  );

-- Hosts may cancel a match nobody has accepted yet.
drop policy if exists matches_host_delete on public.matches;
create policy matches_host_delete on public.matches
  for delete using (auth.uid() = host_id and status = 'open');

-- The seed decides the questions; never let a client choose it.
create or replace function public.matches_assign_seed()
returns trigger
language plpgsql
as $$
begin
  new.seed := floor(random() * 2147483647)::bigint;
  return new;
end;
$$;

drop trigger if exists matches_assign_seed on public.matches;
create trigger matches_assign_seed
  before insert on public.matches
  for each row execute function public.matches_assign_seed();

-- Clients can no longer self-report match scores.
revoke execute on function public.submit_match_result(uuid, integer, integer) from authenticated;
drop function if exists public.submit_match_result(uuid, integer, integer);

-- Called by the score-challenge function (service role) after it grades a
-- participant's answers. Settles the match once both sides are in.
create or replace function public.record_match_result(
  p_match_id uuid,
  p_user_id  uuid,
  p_correct  integer,
  p_time_ms  integer
)
returns text
language plpgsql
security definer
set search_path = public
as $$
declare
  v_host_id   uuid;
  v_opp_id    uuid;
  v_host_done timestamptz;
  v_opp_done  timestamptz;
  v_role      text;
begin
  select host_id, opponent_id, host_completed_at, opponent_completed_at
    into v_host_id, v_opp_id, v_host_done, v_opp_done
  from public.matches where id = p_match_id
  for update;
  if not found then raise exception 'match not found'; end if;

  if v_host_id = p_user_id then
    v_role := 'host';
  elsif v_opp_id = p_user_id then
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

revoke all on function public.record_match_result(uuid, uuid, integer, integer) from public;
revoke all on function public.record_match_result(uuid, uuid, integer, integer) from anon, authenticated;
grant execute on function public.record_match_result(uuid, uuid, integer, integer) to service_role;

-- ============================================================
-- XP plausibility limits
-- ============================================================
-- Practice is local-first, so XP can't be graded server-side; these limits
-- stop "set my XP to a billion" while never rejecting honest play:
--   * a first sync may bring at most 60,000 XP (about 2.4x the MD tier);
--   * after that, total XP may grow by at most 2,000 + 4,000 per hour since
--     the last write (a perfect run of fast Advanced answers earns well under
--     that);
--   * one session can't claim more than 300 + 10 XP per attempt (the largest
--     single award is 250 XP for an Advanced modeling test).
-- updated_at is always stamped by the server so the rate window can't be
-- spoofed.
create or replace function public.xp_state_guard()
returns trigger
language plpgsql
as $$
declare
  v_hours   numeric;
  v_allowed integer;
begin
  if new.total_xp < 0 then
    raise exception 'xp_state: total_xp cannot be negative';
  end if;
  if tg_op = 'INSERT' then
    if new.total_xp > 60000 then
      raise exception 'xp_state: implausible starting XP (%)', new.total_xp;
    end if;
  elsif new.total_xp > old.total_xp then
    v_hours := greatest(0, extract(epoch from (now() - old.updated_at)) / 3600.0);
    v_allowed := 2000 + floor(v_hours * 4000)::integer;
    if new.total_xp - old.total_xp > v_allowed then
      raise exception 'xp_state: XP grew by % (limit % since last sync)',
        new.total_xp - old.total_xp, v_allowed;
    end if;
  end if;
  new.updated_at := now();
  return new;
end;
$$;

drop trigger if exists xp_state_guard on public.xp_state;
create trigger xp_state_guard
  before insert or update on public.xp_state
  for each row execute function public.xp_state_guard();

create or replace function public.sessions_xp_guard()
returns trigger
language plpgsql
as $$
declare
  v_xp numeric;
begin
  v_xp := coalesce(nullif(new.payload->>'xpEarned', '')::numeric, 0);
  if v_xp < 0 or v_xp > 300 + 10 * greatest(new.attempts, 0) then
    raise exception 'sessions: implausible xpEarned % for % attempts', v_xp, new.attempts;
  end if;
  return new;
end;
$$;

drop trigger if exists sessions_xp_guard on public.sessions;
create trigger sessions_xp_guard
  before insert or update on public.sessions
  for each row execute function public.sessions_xp_guard();
