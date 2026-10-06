/**
 * Product analytics (PostHog), kept deliberately small:
 *
 *  - Off unless VITE_POSTHOG_KEY is set at build time, and always off in the
 *    standalone file:// build. With no key every call is a no-op.
 *  - posthog-js is dynamically imported after first paint, in its own chunk,
 *    so it never weighs on the landing page. Events fired before it loads are
 *    queued and flushed once it's ready.
 *  - Explicit events only (no autocapture, no session recording), Do Not
 *    Track respected, and signed-in users are identified by their Supabase
 *    user id — never by email.
 *
 * Event names and properties live in `AnalyticsEvents` so the funnel stays
 * consistent; see docs/ANALYTICS.md for what each one means.
 */
import type { PostHog } from 'posthog-js';

export type ModeId =
  | 'quiz'
  | 'speedDrill'
  | 'walkthrough'
  | 'situational'
  | 'excel'
  | 'longform'
  | 'vocab'
  | 'mockInterview'
  | 'modelingTest';

export type CtaLocation = 'nav' | 'hero' | 'sample' | 'final' | 'open_app';
export type SignupLocation = 'results_nudge' | 'profile' | 'invite';

export interface AnalyticsEvents {
  landing_viewed: Record<string, never>;
  landing_sample_answered: { question_kind: string; correct: boolean };
  landing_sample_another: Record<string, never>;
  landing_cta_clicked: { location: CtaLocation; quick_start: boolean };
  session_started: {
    mode: ModeId;
    source: 'quick_start' | 'landing_quick_start' | 'setup' | 'restart' | 'retry_mistakes' | 'review_mistakes';
    planned_count?: number | null;
    difficulty?: string;
  };
  session_completed: {
    mode: ModeId;
    attempts: number;
    correct: number;
    accuracy_pct: number;
    duration_s: number;
    xp_earned: number;
  };
  session_abandoned: { path: string };
  signup_prompt_viewed: { location: SignupLocation };
  signup_submitted: { location: SignupLocation };
  signup_failed: { location: SignupLocation };
  signed_in: Record<string, never>;
}

type EventName = keyof AnalyticsEvents;
type QueuedCall = (ph: PostHog) => void;

const KEY = import.meta.env.VITE_POSTHOG_KEY as string | undefined;
const HOST = (import.meta.env.VITE_POSTHOG_HOST as string | undefined) || 'https://us.i.posthog.com';
const ENABLED = Boolean(KEY) && import.meta.env.MODE !== 'standalone' && import.meta.env.MODE !== 'test';

let client: PostHog | null = null;
let loading = false;
const queue: QueuedCall[] = [];

function debugEnabled(): boolean {
  try {
    return import.meta.env.DEV || localStorage.getItem('learncre.debugAnalytics') === '1';
  } catch {
    return false;
  }
}

function load(): void {
  if (!ENABLED || loading || client) return;
  loading = true;
  const start = () =>
    import('posthog-js')
      .then(({ default: posthog }) => {
        posthog.init(KEY!, {
          api_host: HOST,
          person_profiles: 'identified_only',
          capture_pageview: false, // the router sends $pageview itself
          capture_pageleave: true,
          autocapture: false,
          disable_session_recording: true,
          respect_dnt: true,
        });
        posthog.register({ app_build: 'web' });
        client = posthog;
        queue.splice(0).forEach((call) => call(posthog));
      })
      .catch(() => {
        // Blocked by an extension or offline: analytics just stays off.
        queue.length = 0;
      });
  // Don't compete with first paint.
  const w = window as Window & { requestIdleCallback?: (cb: () => void) => void };
  if (w.requestIdleCallback) w.requestIdleCallback(start);
  else setTimeout(start, 1);
}

function run(call: QueuedCall): void {
  if (!ENABLED) return;
  if (client) call(client);
  else {
    if (queue.length < 200) queue.push(call);
    load();
  }
}

export function track<E extends EventName>(event: E, props: AnalyticsEvents[E]): void {
  if (debugEnabled()) console.debug('[analytics]', event, props);
  run((ph) => ph.capture(event, props as Record<string, unknown>));
}

/** Manual pageview for SPA navigation. `path` is the app path, e.g. /quiz. */
export function trackPageview(path: string, props: Record<string, unknown> = {}): void {
  if (debugEnabled()) console.debug('[analytics] $pageview', path, props);
  run((ph) =>
    ph.capture('$pageview', {
      $current_url: `${window.location.origin}${path}`,
      $pathname: path,
      ...props,
    }),
  );
}

/** Link events to a signed-in account. Uses the opaque Supabase user id only. */
export function identifyUser(userId: string): void {
  run((ph) => {
    if (ph.get_distinct_id() !== userId) ph.identify(userId);
  });
}

export function resetUser(): void {
  run((ph) => ph.reset());
}

export const analyticsEnabled = ENABLED;
