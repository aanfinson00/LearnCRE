-- LearnCRE PR U — notification preferences + unsubscribe
--
-- Per-user preference row. The Edge Function in
-- supabase/functions/send-notifications/index.ts reads opted-in users with a
-- service-role client and posts to a transactional email provider (Resend by
-- default). Throttling lives in last_*_sent_at columns.
--
-- Unsubscribe is anonymous: each row carries a hex token; the
-- unsubscribe_by_token() function (granted to anon + authenticated) flips
-- every notification flag off when the token matches.

create extension if not exists pgcrypto;

create table if not exists public.notification_preferences (
  user_id                  uuid primary key references auth.users(id) on delete cascade,
  email                    text,                          -- denorm cached for the edge fn
  weekly_digest_enabled    boolean not null default false,
  daily_reminder_enabled   boolean not null default false,
  daily_reminder_hour_utc  integer not null default 13 check (daily_reminder_hour_utc between 0 and 23),
  friend_unlock_enabled    boolean not null default false,
  unsubscribe_token        text not null default encode(gen_random_bytes(16), 'hex'),
  last_weekly_sent_at      timestamptz,
  last_daily_sent_at       timestamptz,
  created_at               timestamptz not null default now(),
  updated_at               timestamptz not null default now()
);

create unique index if not exists notif_unsubscribe_token_idx
  on public.notification_preferences(unsubscribe_token);

alter table public.notification_preferences enable row level security;

drop policy if exists notif_owner_all on public.notification_preferences;
create policy notif_owner_all on public.notification_preferences
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ============================================================
-- unsubscribe_by_token: anonymous one-click opt-out
-- ============================================================
create or replace function public.unsubscribe_by_token(p_token text)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  update public.notification_preferences
    set weekly_digest_enabled = false,
        daily_reminder_enabled = false,
        friend_unlock_enabled = false,
        updated_at = now()
  where unsubscribe_token = p_token;
  if not found then
    raise exception 'invalid token';
  end if;
end;
$$;
revoke all on function public.unsubscribe_by_token(text) from public;
grant execute on function public.unsubscribe_by_token(text) to anon, authenticated;
