import type { LifetimeStats, SessionConfig } from '../types/session';
import type { QuestionKind } from '../types/question';
import type { SessionRecord } from '../types/profile';
import { profileKey } from './profiles';

const SESSIONS_LIMIT = 100;

export function loadLifetime(profileId?: string): LifetimeStats {
  try {
    const raw = localStorage.getItem(profileKey('stats.v1', profileId));
    if (!raw) return emptyLifetime();
    const parsed = JSON.parse(raw) as LifetimeStats;
    return {
      attempts: parsed.attempts ?? 0,
      correct: parsed.correct ?? 0,
      perCategory: parsed.perCategory ?? {},
    };
  } catch {
    return emptyLifetime();
  }
}

export function saveLifetime(stats: LifetimeStats, profileId?: string): void {
  try {
    localStorage.setItem(profileKey('stats.v1', profileId), JSON.stringify(stats));
  } catch {
    /* ignore */
  }
}

export function recordAttempt(
  kind: QuestionKind,
  correct: boolean,
  skipped: boolean,
  profileId?: string,
): LifetimeStats {
  const current = loadLifetime(profileId);
  if (skipped) return current;
  const cat = current.perCategory[kind] ?? { total: 0, correct: 0 };
  const updated: LifetimeStats = {
    attempts: current.attempts + 1,
    correct: current.correct + (correct ? 1 : 0),
    perCategory: {
      ...current.perCategory,
      [kind]: {
        total: cat.total + 1,
        correct: cat.correct + (correct ? 1 : 0),
      },
    },
  };
  saveLifetime(updated, profileId);
  return updated;
}

export function loadConfig(profileId?: string): SessionConfig | null {
  try {
    const raw = localStorage.getItem(profileKey('config.v1', profileId));
    if (!raw) return null;
    return JSON.parse(raw) as SessionConfig;
  } catch {
    return null;
  }
}

export function saveConfig(config: SessionConfig, profileId?: string): void {
  try {
    localStorage.setItem(profileKey('config.v1', profileId), JSON.stringify(config));
  } catch {
    /* ignore */
  }
}

export function clearLifetime(profileId?: string): void {
  try {
    localStorage.removeItem(profileKey('stats.v1', profileId));
  } catch {
    /* ignore */
  }
}

function emptyLifetime(): LifetimeStats {
  return { attempts: 0, correct: 0, perCategory: {} };
}

// ---------- Session history ----------

export function loadSessions(profileId?: string): SessionRecord[] {
  try {
    const raw = localStorage.getItem(profileKey('sessions.v1', profileId));
    if (!raw) return [];
    const parsed = JSON.parse(raw) as SessionRecord[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveSessions(records: SessionRecord[], profileId?: string): void {
  try {
    localStorage.setItem(
      profileKey('sessions.v1', profileId),
      JSON.stringify(records.slice(-SESSIONS_LIMIT)),
    );
  } catch {
    /* ignore */
  }
}

export function recordSession(record: SessionRecord, profileId?: string): SessionRecord[] {
  const next = [...loadSessions(profileId), record].slice(-SESSIONS_LIMIT);
  saveSessions(next, profileId);
  return next;
}
