import type { Attempt } from '../types/session';
import type { QuestionKind } from '../types/question';

const KEY = 'learncre.mistakeBank.v1';
const MAX = 200;

export interface MistakeRecord {
  kind: QuestionKind;
  prompt: string;
  expected: number;
  userInput: number | null;
  deltaPct: number;
  unit: string;
  pattern: string;
  appliedDifficulty?: string;
  loggedAt: number;
}

export function loadMistakes(): MistakeRecord[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as MistakeRecord[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveMistakes(records: MistakeRecord[]): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(records.slice(-MAX)));
  } catch {
    /* ignore */
  }
}

export function recordMistake(attempt: Attempt): MistakeRecord[] {
  if (attempt.correct || attempt.skipped) return loadMistakes();
  const all = loadMistakes();
  const rec: MistakeRecord = {
    kind: attempt.kind,
    prompt: attempt.question.prompt,
    expected: attempt.expected,
    userInput: attempt.userInput,
    deltaPct: attempt.deltaPct,
    unit: attempt.question.unit,
    pattern: '',
    appliedDifficulty: attempt.question.appliedDifficulty,
    loggedAt: Date.now(),
  };
  const next = [...all, rec].slice(-MAX);
  saveMistakes(next);
  return next;
}

export function clearMistakes(): void {
  try {
    localStorage.removeItem(KEY);
  } catch {
    /* ignore */
  }
}

/** Returns unique kinds where the user has missed at least one question. */
export function recentMissKinds(maxAgeMs?: number): QuestionKind[] {
  const all = loadMistakes();
  const cutoff = maxAgeMs ? Date.now() - maxAgeMs : 0;
  const seen = new Set<QuestionKind>();
  for (const m of all) {
    if (cutoff && m.loggedAt < cutoff) continue;
    seen.add(m.kind);
  }
  return [...seen];
}

export function mistakeCounts(): Record<string, number> {
  const all = loadMistakes();
  const counts: Record<string, number> = {};
  for (const m of all) {
    counts[m.kind] = (counts[m.kind] ?? 0) + 1;
  }
  return counts;
}
