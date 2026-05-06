// LearnCRE PR U — notification dispatcher (Supabase Edge Function, Deno).
//
// Invoke via:
//   POST /functions/v1/send-notifications?type=weekly_digest
//   POST /functions/v1/send-notifications?type=daily_reminder
//   Authorization: Bearer <CRON_SECRET>
//
// Schedule via pg_cron + pg_net (recommended), Supabase Scheduled Functions,
// or any external cron (GitHub Actions, etc.). Examples in the PR U commit
// message and supabase/functions/send-notifications/README.md.
//
// Required env vars (set via `supabase secrets set`):
//   SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY  — auto-injected
//   CRON_SECRET                              — chosen by you, shared with cron
//   RESEND_API_KEY                           — from https://resend.com
//   NOTIFICATIONS_FROM_EMAIL                 — verified sender (default: noreply@learncre.app)
//   APP_URL                                  — base URL (default: https://learncre.app)
//
// Throttling:
//   - weekly_digest: skipped if last_weekly_sent_at within 6 days
//   - daily_reminder: skipped if last_daily_sent_at within 20 hours
//   - daily_reminder also matches the user's chosen daily_reminder_hour_utc
//     against the current UTC hour, so the dispatcher can run hourly.

// @ts-expect-error: Deno runtime resolves the URL specifier at runtime.
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

declare const Deno: {
  env: { get(key: string): string | undefined };
  serve: (handler: (req: Request) => Response | Promise<Response>) => void;
};

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SUPABASE_SERVICE_ROLE = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY') ?? '';
const CRON_SECRET = Deno.env.get('CRON_SECRET') ?? '';
const FROM_EMAIL =
  Deno.env.get('NOTIFICATIONS_FROM_EMAIL') ?? 'noreply@learncre.app';
const APP_URL = Deno.env.get('APP_URL') ?? 'https://learncre.app';

interface PrefsRow {
  user_id: string;
  email: string | null;
  weekly_digest_enabled: boolean;
  daily_reminder_enabled: boolean;
  daily_reminder_hour_utc: number;
  unsubscribe_token: string;
  last_weekly_sent_at: string | null;
  last_daily_sent_at: string | null;
}

async function sendEmail(to: string, subject: string, html: string): Promise<boolean> {
  if (!RESEND_API_KEY) {
    console.warn('RESEND_API_KEY missing; would have sent to', to, subject);
    return false;
  }
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ from: FROM_EMAIL, to, subject, html }),
  });
  if (!res.ok) {
    console.error('resend error', res.status, await res.text());
    return false;
  }
  return true;
}

function unsubscribeFooter(token: string): string {
  return `<p style="color:#7d7470;font-size:11px;margin-top:24px">
    You're receiving this because you opted in on your LearnCRE Profile screen.
    <a href="${APP_URL}/unsubscribe?token=${token}">Unsubscribe</a> ·
    <a href="${APP_URL}">Manage preferences</a>
  </p>`;
}

function weeklyDigestHtml(prefs: PrefsRow, weeklyXp: number, alltimeRank: number | null): string {
  const greeting = `<p>Your past 7 days at a glance:</p>`;
  const stats = `<ul>
    <li><b>${weeklyXp.toLocaleString()}</b> XP earned this ISO week</li>
    ${alltimeRank ? `<li>You sit <b>#${alltimeRank}</b> on the all-time XP leaderboard</li>` : ''}
  </ul>`;
  return `<div style="font-family:system-ui,sans-serif;max-width:520px;margin:0 auto">
    <h2 style="font-weight:500">LearnCRE weekly digest</h2>
    ${greeting}
    ${stats}
    <p><a href="${APP_URL}">Resume training →</a></p>
    ${unsubscribeFooter(prefs.unsubscribe_token)}
  </div>`;
}

function dailyReminderHtml(prefs: PrefsRow): string {
  return `<div style="font-family:system-ui,sans-serif;max-width:520px;margin:0 auto">
    <h2 style="font-weight:500">Today's daily challenge is ready</h2>
    <p>Same 10-question set worldwide. Faster + more correct climbs the leaderboard.</p>
    <p><a href="${APP_URL}">Play today's daily →</a></p>
    ${unsubscribeFooter(prefs.unsubscribe_token)}
  </div>`;
}

async function handleWeeklyDigest(client: ReturnType<typeof createClient>): Promise<{ sent: number; skipped: number }> {
  const since = new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString();
  const { data: prefs } = await client
    .from('notification_preferences')
    .select('*')
    .eq('weekly_digest_enabled', true)
    .or(`last_weekly_sent_at.is.null,last_weekly_sent_at.lt.${since}`);
  const rows = (prefs ?? []) as PrefsRow[];
  let sent = 0;
  let skipped = 0;

  for (const row of rows) {
    if (!row.email) {
      skipped++;
      continue;
    }
    // Compute weekly XP from sessions for this user
    const startOfWeek = startOfIsoWeek(new Date()).toISOString();
    const { data: sessions } = await client
      .from('sessions')
      .select('payload')
      .eq('user_id', row.user_id)
      .gte('started_at', startOfWeek);
    const weeklyXp = (sessions ?? []).reduce((sum, s) => {
      const xp = Number((s.payload as { xpEarned?: number })?.xpEarned ?? 0);
      return sum + xp;
    }, 0);

    // Compute all-time rank (cheap approximation: count users with higher total_xp)
    const { data: meXp } = await client
      .from('xp_state')
      .select('total_xp')
      .eq('user_id', row.user_id)
      .maybeSingle();
    const myXp = meXp?.total_xp ?? 0;
    const { count } = await client
      .from('xp_state')
      .select('user_id', { count: 'exact', head: true })
      .gt('total_xp', myXp);
    const alltimeRank = count !== null ? count + 1 : null;

    const html = weeklyDigestHtml(row, weeklyXp, alltimeRank);
    const ok = await sendEmail(row.email, 'Your LearnCRE weekly digest', html);
    if (ok) {
      sent++;
      await client
        .from('notification_preferences')
        .update({ last_weekly_sent_at: new Date().toISOString() })
        .eq('user_id', row.user_id);
    } else {
      skipped++;
    }
  }
  return { sent, skipped };
}

async function handleDailyReminder(client: ReturnType<typeof createClient>): Promise<{ sent: number; skipped: number }> {
  const currentUtcHour = new Date().getUTCHours();
  const since = new Date(Date.now() - 20 * 60 * 60 * 1000).toISOString();
  const { data: prefs } = await client
    .from('notification_preferences')
    .select('*')
    .eq('daily_reminder_enabled', true)
    .eq('daily_reminder_hour_utc', currentUtcHour)
    .or(`last_daily_sent_at.is.null,last_daily_sent_at.lt.${since}`);
  const rows = (prefs ?? []) as PrefsRow[];
  let sent = 0;
  let skipped = 0;

  for (const row of rows) {
    if (!row.email) {
      skipped++;
      continue;
    }
    const html = dailyReminderHtml(row);
    const ok = await sendEmail(row.email, "Today's LearnCRE daily is ready", html);
    if (ok) {
      sent++;
      await client
        .from('notification_preferences')
        .update({ last_daily_sent_at: new Date().toISOString() })
        .eq('user_id', row.user_id);
    } else {
      skipped++;
    }
  }
  return { sent, skipped };
}

function startOfIsoWeek(now: Date): Date {
  const d = new Date(now);
  const day = d.getUTCDay() || 7;
  d.setUTCHours(0, 0, 0, 0);
  d.setUTCDate(d.getUTCDate() - (day - 1));
  return d;
}

Deno.serve(async (req) => {
  const auth = req.headers.get('authorization');
  if (auth !== `Bearer ${CRON_SECRET}`) {
    return new Response('unauthorized', { status: 401 });
  }
  const url = new URL(req.url);
  const type = url.searchParams.get('type');

  const client = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE);

  if (type === 'weekly_digest') {
    const r = await handleWeeklyDigest(client);
    return new Response(JSON.stringify(r), {
      headers: { 'content-type': 'application/json' },
    });
  }
  if (type === 'daily_reminder') {
    const r = await handleDailyReminder(client);
    return new Response(JSON.stringify(r), {
      headers: { 'content-type': 'application/json' },
    });
  }
  return new Response('unknown type (use weekly_digest or daily_reminder)', {
    status: 400,
  });
});
