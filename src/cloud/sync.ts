import type { AchievementUnlock, SessionRecord, XpState } from '../types/profile';
import type { MistakeRecord } from '../storage/mistakeBank';
import { loadXp, saveXp } from '../quiz/xp';
import { loadTierState, saveTierState } from '../quiz/gates';
import { loadSessions, saveSessions } from '../storage/localStorage';
import { loadUnlocked, saveUnlocked } from '../quiz/achievements';
import { loadMistakes, saveMistakes } from '../storage/mistakeBank';
import { getSupabase } from './client';

/**
 * Cross-device sync. Best-effort; no per-record updated_at tracking — uses
 * union-and-max semantics that handle the common cases without invading the
 * existing local-storage writers:
 *
 * - xp_state: take field-wise max across local + cloud (all fields are
 *   monotonic — totalXp grows, bestSessionXp/bestStreak only increase).
 * - tier_state: bypassGates OR-ed; row exists if either side has it.
 * - sessions: UNION by id; collisions keep the local row (recent runs).
 * - achievements: UNION by achievement_id; earliest unlock wins.
 * - mistake_bank_items: UNION by question_id; collisions keep newer
 *   loggedAt.
 */

interface PullResult {
  ok: boolean;
  error: string | null;
}

export async function pullAll(userId: string): Promise<PullResult> {
  const supabase = getSupabase();
  if (!supabase) return { ok: false, error: 'cloud disabled' };

  const [xpRes, tierRes, sessionsRes, achievementsRes, mistakesRes] =
    await Promise.all([
      supabase.from('xp_state').select('*').eq('user_id', userId).maybeSingle(),
      supabase.from('tier_state').select('*').eq('user_id', userId).maybeSingle(),
      supabase.from('sessions').select('*').eq('user_id', userId),
      supabase.from('achievements').select('*').eq('user_id', userId),
      supabase.from('mistake_bank_items').select('*').eq('user_id', userId),
    ]);

  if (xpRes.error) return { ok: false, error: xpRes.error.message };
  if (tierRes.error) return { ok: false, error: tierRes.error.message };
  if (sessionsRes.error) return { ok: false, error: sessionsRes.error.message };
  if (achievementsRes.error) return { ok: false, error: achievementsRes.error.message };
  if (mistakesRes.error) return { ok: false, error: mistakesRes.error.message };

  // XP — field-wise max (all fields monotonic).
  if (xpRes.data) {
    saveXp(mergeXp(loadXp(), {
      totalXp: xpRes.data.total_xp ?? 0,
      bestSessionXp: 0, // not yet on cloud schema — local-only field
      currentStreak: xpRes.data.current_streak ?? 0,
      bestStreak: xpRes.data.best_streak ?? 0,
    }));
  }

  // Tier — OR semantics for bypassGates.
  if (tierRes.data) {
    const local = loadTierState();
    saveTierState({
      bypassGates: local.bypassGates || (tierRes.data.tier === 'bypass'),
    });
  }

  // Sessions — UNION by id, prefer local on collision.
  if (sessionsRes.data && sessionsRes.data.length > 0) {
    const localSessions = loadSessions();
    const mergedSessions = mergeSessions(
      localSessions,
      sessionsRes.data.map(rowToSession),
    );
    saveSessions(mergedSessions);
  }

  // Achievements — UNION by id, earliest unlock wins.
  if (achievementsRes.data && achievementsRes.data.length > 0) {
    const localAch = loadUnlocked();
    saveUnlocked(
      mergeAchievements(
        localAch,
        achievementsRes.data.map((r) => ({
          id: r.achievement_id,
          unlockedAt: new Date(r.unlocked_at).getTime(),
        })),
      ),
    );
  }

  // Mistakes — UNION by question_id (= prompt-derived key), keep newer.
  if (mistakesRes.data && mistakesRes.data.length > 0) {
    const localMistakes = loadMistakes();
    saveMistakes(
      mergeMistakes(
        localMistakes,
        mistakesRes.data.map(rowToMistake),
      ),
    );
  }

  return { ok: true, error: null };
}

export async function pushAll(userId: string): Promise<PullResult> {
  const supabase = getSupabase();
  if (!supabase) return { ok: false, error: 'cloud disabled' };

  const xp = loadXp();
  const tier = loadTierState();
  const sessions = loadSessions();
  const achievements = loadUnlocked();
  const mistakes = loadMistakes();
  const now = new Date().toISOString();

  const tasks: Promise<{ error: { message: string } | null }>[] = [];

  tasks.push(
    supabase.from('xp_state').upsert({
      user_id: userId,
      total_xp: xp.totalXp,
      current_streak: xp.currentStreak,
      best_streak: xp.bestStreak,
      last_active_at: now,
      updated_at: now,
    }) as never,
  );

  tasks.push(
    supabase.from('tier_state').upsert({
      user_id: userId,
      tier: tier.bypassGates ? 'bypass' : 'standard',
      updated_at: now,
    }) as never,
  );

  if (sessions.length > 0) {
    tasks.push(
      supabase.from('sessions').upsert(
        sessions.map((s) => ({
          id: s.id,
          user_id: userId,
          mode: s.kind,
          started_at: new Date(s.finishedAt - s.durationMs).toISOString(),
          ended_at: new Date(s.finishedAt).toISOString(),
          attempts: s.attempts,
          correct: s.correct,
          payload: { config: s.config, perCategory: s.perCategory, xpEarned: s.xpEarned, accuracyPct: s.accuracyPct },
          updated_at: now,
        })),
      ) as never,
    );
  }

  if (achievements.length > 0) {
    tasks.push(
      supabase.from('achievements').upsert(
        achievements.map((a) => ({
          user_id: userId,
          achievement_id: a.id,
          unlocked_at: new Date(a.unlockedAt).toISOString(),
        })),
      ) as never,
    );
  }

  if (mistakes.length > 0) {
    tasks.push(
      supabase.from('mistake_bank_items').upsert(
        mistakes.map((m) => ({
          user_id: userId,
          question_id: mistakeKey(m),
          kind: m.kind,
          payload: m,
          added_at: new Date(m.loggedAt).toISOString(),
          updated_at: now,
        })),
      ) as never,
    );
  }

  const results = await Promise.all(tasks);
  const firstError = results.find((r) => r.error);
  if (firstError && firstError.error) {
    return { ok: false, error: firstError.error.message };
  }
  return { ok: true, error: null };
}

// ============== merge helpers (pure, exported for testing) ==============

export function mergeXp(local: XpState, cloud: XpState): XpState {
  return {
    totalXp: Math.max(local.totalXp, cloud.totalXp),
    bestSessionXp: Math.max(local.bestSessionXp, cloud.bestSessionXp),
    currentStreak: Math.max(local.currentStreak, cloud.currentStreak),
    bestStreak: Math.max(local.bestStreak, cloud.bestStreak),
  };
}

export function mergeSessions(
  local: SessionRecord[],
  cloud: SessionRecord[],
): SessionRecord[] {
  const byId = new Map<string, SessionRecord>();
  for (const s of cloud) byId.set(s.id, s);
  for (const s of local) byId.set(s.id, s); // local overrides on collision
  return Array.from(byId.values()).sort((a, b) => a.finishedAt - b.finishedAt);
}

export function mergeAchievements(
  local: AchievementUnlock[],
  cloud: AchievementUnlock[],
): AchievementUnlock[] {
  const byId = new Map<string, AchievementUnlock>();
  for (const a of cloud) byId.set(a.id, a);
  for (const a of local) {
    const existing = byId.get(a.id);
    if (!existing || a.unlockedAt < existing.unlockedAt) byId.set(a.id, a);
  }
  return Array.from(byId.values()).sort((a, b) => a.unlockedAt - b.unlockedAt);
}

export function mergeMistakes(
  local: MistakeRecord[],
  cloud: MistakeRecord[],
): MistakeRecord[] {
  const byKey = new Map<string, MistakeRecord>();
  for (const m of cloud) byKey.set(mistakeKey(m), m);
  for (const m of local) {
    const k = mistakeKey(m);
    const existing = byKey.get(k);
    if (!existing || m.loggedAt > existing.loggedAt) byKey.set(k, m);
  }
  return Array.from(byKey.values()).sort((a, b) => a.loggedAt - b.loggedAt);
}

function mistakeKey(m: MistakeRecord): string {
  // Stable key from kind + prompt hash. Prompt is unique per generated question.
  return `${m.kind}:${hashString(m.prompt)}`;
}

function hashString(s: string): string {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return h.toString(36);
}

// ============== row -> local-shape converters ==============

interface SessionRow {
  id: string;
  mode: SessionRecord['kind'];
  ended_at: string | null;
  attempts: number;
  correct: number;
  payload: { config?: Record<string, unknown>; perCategory?: SessionRecord['perCategory']; xpEarned?: number; accuracyPct?: number };
}

function rowToSession(r: SessionRow): SessionRecord {
  const finishedAt = r.ended_at ? new Date(r.ended_at).getTime() : Date.now();
  return {
    id: r.id,
    finishedAt,
    kind: r.mode,
    config: r.payload?.config ?? {},
    attempts: r.attempts,
    correct: r.correct,
    accuracyPct: r.payload?.accuracyPct ?? (r.attempts > 0 ? r.correct / r.attempts : 0),
    durationMs: 0, // not preserved in cloud schema; use 0 on pull
    xpEarned: r.payload?.xpEarned ?? 0,
    perCategory: r.payload?.perCategory,
  };
}

interface MistakeRow {
  question_id: string;
  kind: MistakeRecord['kind'];
  payload: MistakeRecord;
  added_at: string;
}

function rowToMistake(r: MistakeRow): MistakeRecord {
  // The full local-shape MistakeRecord lives in payload; cheap to round-trip.
  return r.payload;
}
