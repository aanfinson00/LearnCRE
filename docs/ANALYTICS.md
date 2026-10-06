# Analytics

LearnCRE sends a small set of explicit product events to [PostHog](https://posthog.com) so we can see where visitors drop out between "landed on the site" and "signed up". Everything lives in `src/analytics.ts`.

## Setup

1. Create a PostHog project (US or EU cloud). Copy the **Project API key** (`phc_…`).
2. In Vercel → Project → Settings → Environment Variables, add `VITE_POSTHOG_KEY` (and `VITE_POSTHOG_HOST=https://eu.i.posthog.com` if the project is EU-hosted). Add it for Production and Preview.
3. Redeploy. The key is read at build time.

Without a key, every analytics call is a no-op and no request leaves the browser. The standalone `file://` build never sends analytics.

**Debugging:** run `localStorage.setItem('learncre.debugAnalytics', '1')` in the browser console. Every event is then logged as `[analytics] <event> <props>`. Dev builds always log.

## Privacy defaults

- Explicit events only: no autocapture and no session recording.
- Do Not Track is respected (`respect_dnt`).
- `person_profiles: 'identified_only'`: anonymous visitors don't create person profiles.
- Signed-in users are identified by their opaque Supabase user id, never by email.
- `posthog-js` loads after first paint in its own chunk (`vendor-posthog`), so it never slows the landing page.

## Event catalog

The source of truth is the `AnalyticsEvents` type in `src/analytics.ts`.

| Event | When | Properties |
|---|---|---|
| `$pageview` | Landing page shown; every route change in the app | `$pathname`, `mode` / `page` |
| `landing_viewed` | Landing page mounted | none |
| `landing_sample_answered` | Visitor answers the live sample question | `question_kind`, `correct` |
| `landing_sample_another` | Visitor clicks "Another one" | none |
| `landing_cta_clicked` | Any landing CTA | `location` (`hero`, `sample`, `nav`, `final`, `open_app`), `quick_start` |
| `session_started` | Any mode's session begins | `mode`, `source` (see below), `planned_count`, `difficulty` (the last two are quiz only) |
| `session_completed` | Any mode's session is recorded (fired from `recordSession`) | `mode`, `attempts`, `correct`, `accuracy_pct`, `duration_s`, `xp_earned` |
| `session_abandoned` | User confirms the "leave this session?" prompt | `path` |
| `signup_prompt_viewed` | Post-session "save your progress" card shown | `location` |
| `signup_submitted` / `signup_failed` | Magic-link request sent / errored | `location` (`results_nudge`, `profile`, `invite`) |
| `signed_in` | A real sign-in completes (not token restores) | none |

`session_started.source` values:
- `landing_quick_start`: the landing page CTA.
- `quick_start`: the setup screen card.
- `review_mistakes`: the setup screen card.
- `setup`: a custom setup.
- `restart`: "Play again".
- `retry_mistakes`: from the results screen.

## Suggested PostHog insights

1. **Activation funnel:** `landing_viewed` → `landing_sample_answered` → `landing_cta_clicked` → `session_started` → `session_completed` → `signup_submitted` → `signed_in`. Break down by `utm_source` once campaigns run.
2. **Does the sample question sell?** `landing_cta_clicked` conversion, comparing visitors who fired `landing_sample_answered` with those who didn't.
3. **Mode engagement:** `session_completed` by `mode`, weekly.
4. **Completion rate by mode:** `session_completed / session_started`, broken down by `mode`. Pair it with `session_abandoned` by `path`.
5. **Retention:** returning users with `session_completed`, using a weekly cohort.

Adding an event: add it to `AnalyticsEvents` first. The compiler then enforces the property shape at every call site. Update this table too.
