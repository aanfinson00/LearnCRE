# send-notifications

Edge Function that dispatches LearnCRE notification emails. Reads opted-in
users from `notification_preferences`, sends through Resend, throttles via
`last_*_sent_at`.

## One-time setup

1. **Resend** — sign up at https://resend.com, verify a sending domain,
   create an API key.
2. **Secrets** — `supabase secrets set RESEND_API_KEY=re_xxx
   CRON_SECRET=$(openssl rand -hex 24) NOTIFICATIONS_FROM_EMAIL=noreply@yourdomain.com
   APP_URL=https://your-app-host.example.com` (the first three are required;
   `APP_URL` falls back to `https://learncre.app`).
3. **Deploy** — `supabase functions deploy send-notifications`.

## Scheduling

Pick whichever cron fits your stack — the function is stateless.

### pg_cron + pg_net (in-database)

```sql
-- Enable extensions (Supabase dashboard → Database → Extensions)
create extension if not exists pg_cron;
create extension if not exists pg_net;

-- Weekly digest: Mondays 14:00 UTC
select cron.schedule(
  'weekly-digest',
  '0 14 * * 1',
  $$
  select net.http_post(
    url     := 'https://<project>.supabase.co/functions/v1/send-notifications?type=weekly_digest',
    headers := '{"Authorization":"Bearer <CRON_SECRET>"}'::jsonb
  );
  $$
);

-- Daily reminder dispatcher: every hour on the hour
select cron.schedule(
  'daily-reminder',
  '0 * * * *',
  $$
  select net.http_post(
    url     := 'https://<project>.supabase.co/functions/v1/send-notifications?type=daily_reminder',
    headers := '{"Authorization":"Bearer <CRON_SECRET>"}'::jsonb
  );
  $$
);
```

The daily handler matches `daily_reminder_hour_utc` against the current UTC
hour, so an hourly invocation reaches each user once per day at their chosen
time.

### External cron (GitHub Actions, Vercel cron, etc.)

```bash
curl -X POST \
  -H "Authorization: Bearer $CRON_SECRET" \
  "https://<project>.supabase.co/functions/v1/send-notifications?type=daily_reminder"
```

### Friend-unlock trigger (event-driven, not cron)

The `friend_unlock` type is invoked by a Postgres trigger on
`achievements` (migration `0012_friend_unlock_trigger.sql`). Two
database-level settings need to be set once after deploying the function:

```sql
alter database postgres
  set app.notification_function_url =
      'https://<project>.supabase.co/functions/v1/send-notifications';
alter database postgres
  set app.cron_secret = '<your CRON_SECRET>';
```

`pg_net` must be enabled in Database → Extensions. The trigger filters
to fresh unlocks only (within 5 min of `now()`), so backfill / re-sync
inserts whose `unlocked_at` is in the past won't spam followers.

## Returns

JSON `{ sent, skipped }` per invocation.
