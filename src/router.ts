import { useEffect, useSyncExternalStore } from 'react';

/**
 * Minimal URL router for the app shell. Every top-level mode gets its own
 * path so the back button, deep links and per-page analytics work.
 *
 * Web builds use real paths (`/quiz`). The standalone single-file build runs
 * from `file://`, where pushState can't change the path, so it uses hash
 * routes (`#/quiz`) instead.
 */

export type Mode =
  | 'quiz'
  | 'speedDrill'
  | 'study'
  | 'walkthrough'
  | 'situational'
  | 'excel'
  | 'longform'
  | 'vocab'
  | 'mockInterview'
  | 'modelingTest'
  | 'certify'
  | 'profile'
  | 'daily'
  | 'weekly'
  | 'leaderboards'
  | 'friends'
  | 'cohorts'
  | 'headToHead'
  | 'submitQuestion'
  | 'feedbackReview';

export type CertView =
  | { kind: 'list' }
  | { kind: 'detail'; certId: string }
  | { kind: 'exam'; certId: string };

export interface AppRoute {
  mode: Mode;
  /** Only meaningful when mode === 'certify'. */
  cert: CertView;
}

export const MODE_PATHS: Record<Mode, string> = {
  quiz: '/quiz',
  speedDrill: '/speed-drill',
  vocab: '/vocab',
  walkthrough: '/walkthroughs',
  situational: '/situational',
  longform: '/case-study',
  excel: '/excel',
  modelingTest: '/modeling-test',
  mockInterview: '/mock-interview',
  daily: '/daily',
  weekly: '/weekly',
  leaderboards: '/leaderboards',
  friends: '/friends',
  cohorts: '/cohorts',
  headToHead: '/head-to-head',
  study: '/study',
  submitQuestion: '/submit-question',
  feedbackReview: '/feedback-studio',
  certify: '/certify',
  profile: '/profile',
};

const PATH_TO_MODE: Record<string, Mode> = Object.fromEntries(
  Object.entries(MODE_PATHS).map(([m, p]) => [p, m as Mode]),
);

const DEFAULT_ROUTE: AppRoute = { mode: 'quiz', cert: { kind: 'list' } };

export const useHashRouting = import.meta.env.MODE === 'standalone';

function normalize(path: string): string {
  const p = path.replace(/\/+$/, '');
  return p === '' ? '/' : p.toLowerCase();
}

/** The app-level path for the current location (hash-aware). */
export function currentAppPath(): string {
  if (typeof window === 'undefined') return '/';
  if (useHashRouting) {
    const h = window.location.hash.replace(/^#/, '');
    return normalize(h.startsWith('/') ? h : '/');
  }
  return normalize(window.location.pathname);
}

/** Maps a path to a route. Unknown paths (and `/`, `/app`) fall back to the quiz. */
export function parseRoute(path: string): AppRoute {
  const p = normalize(path);
  const cert = p.match(/^\/certify(?:\/([a-z0-9-]+))?(\/exam)?$/);
  if (cert) {
    if (!cert[1]) return { mode: 'certify', cert: { kind: 'list' } };
    return {
      mode: 'certify',
      cert: cert[2] ? { kind: 'exam', certId: cert[1] } : { kind: 'detail', certId: cert[1] },
    };
  }
  const mode = PATH_TO_MODE[p];
  return mode ? { mode, cert: { kind: 'list' } } : DEFAULT_ROUTE;
}

export function pathFor(mode: Mode, cert?: CertView): string {
  if (mode === 'certify' && cert && cert.kind !== 'list') {
    return `/certify/${cert.certId}${cert.kind === 'exam' ? '/exam' : ''}`;
  }
  return MODE_PATHS[mode];
}

/** The href to put on a link for this path in the current routing scheme. */
export function hrefFor(path: string): string {
  return useHashRouting ? `#${path}` : path;
}

// ---------------------------------------------------------------------------
// Leave guard: a mode with unsaved in-progress work can ask for confirmation
// before navigation unmounts it.

let leaveGuard: string | null = null;

export function setLeaveGuard(message: string | null): void {
  leaveGuard = message;
}

/** While `active`, navigating away (sidebar, back button, reload) asks first. */
export function useLeaveGuard(
  active: boolean,
  message = 'Leave this session? Your progress in it will be lost.',
): void {
  useEffect(() => {
    if (!active) return;
    setLeaveGuard(message);
    return () => setLeaveGuard(null);
  }, [active, message]);
}

function confirmLeave(): boolean {
  return leaveGuard === null || window.confirm(leaveGuard);
}

if (typeof window !== 'undefined') {
  window.addEventListener('beforeunload', (e) => {
    if (leaveGuard !== null) {
      e.preventDefault();
      e.returnValue = '';
    }
  });
}

// ---------------------------------------------------------------------------
// Location store

const listeners = new Set<() => void>();
let lastPath = typeof window !== 'undefined' ? currentAppPath() : '/';

function emit() {
  lastPath = currentAppPath();
  listeners.forEach((l) => l());
}

function onBrowserNav() {
  if (currentAppPath() === lastPath) return;
  if (!confirmLeave()) {
    // Put the URL back where it was; the mode stays mounted.
    writeUrl(lastPath, true);
    return;
  }
  leaveGuard = null;
  emit();
}

function subscribe(cb: () => void) {
  if (listeners.size === 0) {
    window.addEventListener(useHashRouting ? 'hashchange' : 'popstate', onBrowserNav);
  }
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
    if (listeners.size === 0) {
      window.removeEventListener(useHashRouting ? 'hashchange' : 'popstate', onBrowserNav);
    }
  };
}

function writeUrl(path: string, replace: boolean) {
  if (useHashRouting) {
    const url = `${window.location.pathname}${window.location.search}#${path}`;
    if (replace) window.history.replaceState(null, '', url);
    else window.history.pushState(null, '', url);
  } else {
    const url = `${path}${window.location.search}`;
    if (replace) window.history.replaceState(null, '', url);
    else window.history.pushState(null, '', url);
  }
}

/** Navigate to a path. Returns false if a leave guard blocked it. */
export function navigateTo(path: string, opts: { replace?: boolean } = {}): boolean {
  const target = normalize(path);
  if (target === currentAppPath()) return true;
  if (!confirmLeave()) return false;
  leaveGuard = null;
  writeUrl(target, opts.replace ?? false);
  window.scrollTo(0, 0);
  emit();
  return true;
}

export function navigateToMode(mode: Mode, cert?: CertView): boolean {
  return navigateTo(pathFor(mode, cert));
}

export function useAppRoute(): AppRoute {
  const path = useSyncExternalStore(subscribe, currentAppPath, () => '/');
  return parseRoute(path);
}
