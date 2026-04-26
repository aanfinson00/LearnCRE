import { loadLifetime, loadSessions } from '../storage/localStorage';
import { loadMistakes } from '../storage/mistakeBank';
import type { SessionRecord } from '../types/profile';
import type { LifetimeStats, SessionStats } from '../types/session';
import type { AchievementContext } from './achievements';

const PURE_MATH_VARIANTS = [
  'percentOf',
  'divideBy',
  'combinedDiscount',
  'nthRoot',
  'reciprocalTable',
];

function startOfDay(t: number): number {
  const d = new Date(t);
  d.setHours(0, 0, 0, 0);
  return d.getTime();
}

function distinctActiveDays(sessions: SessionRecord[]): number {
  const set = new Set<number>();
  for (const s of sessions) set.add(startOfDay(s.finishedAt));
  return set.size;
}

function bestDailyStreak(sessions: SessionRecord[]): number {
  if (sessions.length === 0) return 0;
  const days = Array.from(new Set(sessions.map((s) => startOfDay(s.finishedAt)))).sort();
  let best = 1;
  let run = 1;
  const ONE_DAY = 86_400_000;
  for (let i = 1; i < days.length; i++) {
    if (days[i] - days[i - 1] === ONE_DAY) {
      run += 1;
      if (run > best) best = run;
    } else {
      run = 1;
    }
  }
  return best;
}

function minutesToday(sessions: SessionRecord[]): number {
  const today = startOfDay(Date.now());
  let totalMs = 0;
  for (const s of sessions) {
    if (startOfDay(s.finishedAt) === today) totalMs += s.durationMs;
  }
  return Math.round(totalMs / 60_000);
}

function daysSinceLastSessionBefore(sessions: SessionRecord[], reference: SessionRecord | undefined): number {
  if (!sessions.length) return Number.POSITIVE_INFINITY;
  const others = reference
    ? sessions.filter((s) => s.id !== reference.id)
    : sessions.slice(0, -1);
  if (others.length === 0) return Number.POSITIVE_INFINITY;
  const latest = Math.max(...others.map((s) => s.finishedAt));
  const ref = reference?.finishedAt ?? Date.now();
  return Math.max(0, Math.floor((ref - latest) / 86_400_000));
}

function pureMathAccuracyFromSessions(
  sessions: SessionRecord[],
): Record<string, { total: number; correct: number }> {
  const out: Record<string, { total: number; correct: number }> = {};
  for (const s of sessions) {
    if (s.kind !== 'speedDrill') continue;
    const cfg = s.config as Record<string, unknown> | undefined;
    const variantId = (cfg?.variantId as string | undefined) ?? '';
    if (!PURE_MATH_VARIANTS.includes(variantId)) continue;
    const cur = out[variantId] ?? { total: 0, correct: 0 };
    out[variantId] = {
      total: cur.total + s.attempts,
      correct: cur.correct + s.correct,
    };
  }
  return out;
}

function speedDrillVariantsTried(sessions: SessionRecord[]): Set<string> {
  const set = new Set<string>();
  for (const s of sessions) {
    if (s.kind !== 'speedDrill') continue;
    const cfg = s.config as Record<string, unknown> | undefined;
    const variantId = cfg?.variantId as string | undefined;
    if (variantId) set.add(variantId);
  }
  return set;
}

function walkthroughIdsCompleted(sessions: SessionRecord[]): Set<string> {
  const set = new Set<string>();
  for (const s of sessions) {
    if (s.kind !== 'walkthrough') continue;
    const cfg = s.config as Record<string, unknown> | undefined;
    const id = cfg?.defId as string | undefined;
    if (id) set.add(id);
  }
  return set;
}

function outstandingMissKinds(): Set<string> {
  const out = new Set<string>();
  for (const m of loadMistakes()) out.add(m.kind);
  return out;
}

export function buildContext(opts?: {
  latestSession?: SessionRecord;
  latestSessionStats?: SessionStats;
  lifetime?: LifetimeStats;
  sessions?: SessionRecord[];
}): AchievementContext {
  const lifetime = opts?.lifetime ?? loadLifetime();
  const sessions = opts?.sessions ?? loadSessions();
  return {
    lifetime,
    sessions,
    latestSession: opts?.latestSession,
    latestSessionStats: opts?.latestSessionStats,
    walkthroughIdsCompleted: walkthroughIdsCompleted(sessions),
    speedDrillVariantsTried: speedDrillVariantsTried(sessions),
    pureMathAccuracy: pureMathAccuracyFromSessions(sessions),
    outstandingMissKinds: outstandingMissKinds(),
    minutesToday: minutesToday(sessions),
    daysSinceLastSession: daysSinceLastSessionBefore(sessions, opts?.latestSession),
    distinctActiveDays: distinctActiveDays(sessions),
    bestDailyStreak: bestDailyStreak(sessions),
  };
}
