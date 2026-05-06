-- LearnCRE — friend-unlock notification trigger
--
-- Closes the parked piece of PR U: an AFTER INSERT trigger on achievements
-- fires the send-notifications Edge Function with type=friend_unlock,
-- carrying the user_id + achievement_id so the function can fan out to
-- public-profile followers who have friend_unlock_enabled = true.
--
-- ============================================================
-- One-time setup (run as service-role / postgres superuser, NOT in this
-- migration since the values are project-specific):
--
--   alter database postgres
--     set app.notification_function_url =
--         'https://<project-ref>.supabase.co/functions/v1/send-notifications';
--   alter database postgres
--     set app.cron_secret = '<your CRON_SECRET>';
--
-- pg_net + pg_cron extensions must be enabled in the Supabase dashboard
-- (Database → Extensions). pg_net.http_post is the async HTTP call used
-- here; the trigger does not block the achievement insert if the call
-- fails (the http_post returns immediately and the result lands in
-- net._http_response asynchronously).
-- ============================================================

create extension if not exists pg_net;

create or replace function public.notify_friends_on_achievement()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_url    text;
  v_secret text;
begin
  -- Fresh-unlock filter: skip backfill / re-sync inserts whose unlocked_at
  -- is in the past. A genuine new unlock has unlocked_at = now() (give or
  -- take seconds for clock skew), so 5 minutes is a generous floor.
  if NEW.unlocked_at < now() - interval '5 minutes' then
    return NEW;
  end if;

  -- Pull config from database-level settings; gracefully no-op if unset
  -- (so dev / unconfigured environments don't error on every insert).
  v_url := current_setting('app.notification_function_url', true);
  v_secret := current_setting('app.cron_secret', true);
  if v_url is null or v_secret is null then
    return NEW;
  end if;

  perform net.http_post(
    url     := v_url,
    headers := jsonb_build_object(
      'Authorization', 'Bearer ' || v_secret,
      'Content-Type',  'application/json'
    ),
    body    := jsonb_build_object(
      'type',           'friend_unlock',
      'user_id',        NEW.user_id,
      'achievement_id', NEW.achievement_id,
      'unlocked_at',    NEW.unlocked_at
    )
  );
  return NEW;
exception when others then
  -- Never let a notification failure block the achievement write.
  return NEW;
end;
$$;
revoke all on function public.notify_friends_on_achievement() from public;

drop trigger if exists notify_friends_on_achievement_insert on public.achievements;
create trigger notify_friends_on_achievement_insert
  after insert on public.achievements
  for each row
  execute function public.notify_friends_on_achievement();
