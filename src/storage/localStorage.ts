import type { LifetimeStats } from '../types/session';
import type { SessionConfig } from '../types/session';
import type { QuestionKind } from '../types/question';

const STATS_KEY = 'learncre.stats.v1';
const CONFIG_KEY = 'learncre.config.v1';

export function loadLifetime(): LifetimeStats {
  try {
    const raw = localStorage.getItem(STATS_KEY);
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

export function saveLifetime(stats: LifetimeStats): void {
  try {
    localStorage.setItem(STATS_KEY, JSON.stringify(stats));
  } catch {
    /* ignore */
  }
}

export function recordAttempt(
  kind: QuestionKind,
  correct: boolean,
  skipped: boolean,
): LifetimeStats {
  const current = loadLifetime();
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
  saveLifetime(updated);
  return updated;
}

export function loadConfig(): SessionConfig | null {
  try {
    const raw = localStorage.getItem(CONFIG_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as SessionConfig;
  } catch {
    return null;
  }
}

export function saveConfig(config: SessionConfig): void {
  try {
    localStorage.setItem(CONFIG_KEY, JSON.stringify(config));
  } catch {
    /* ignore */
  }
}

export function clearLifetime(): void {
  try {
    localStorage.removeItem(STATS_KEY);
  } catch {
    /* ignore */
  }
}

function emptyLifetime(): LifetimeStats {
  return { attempts: 0, correct: 0, perCategory: {} };
}
