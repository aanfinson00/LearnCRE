import type { Attempt } from '../types/session';
import type { QuestionKind } from '../types/question';
import { profileKey } from './profiles';

const MAX = 200;
const KEY_SUFFIX = 'mistakes.v1';

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

export function loadMistakes(profileId?: string): MistakeRecord[] {
  try {
    const raw = localStorage.getItem(profileKey(KEY_SUFFIX, profileId));
    if (!raw) return [];
    const parsed = JSON.parse(raw) as MistakeRecord[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveMistakes(records: MistakeRecord[], profileId?: string): void {
  try {
    localStorage.setItem(
      profileKey(KEY_SUFFIX, profileId),
      JSON.stringify(records.slice(-MAX)),
    );
  } catch {
    /* ignore */
  }
}

export function recordMistake(attempt: Attempt, profileId?: string): MistakeRecord[] {
  if (attempt.correct || attempt.skipped) return loadMistakes(profileId);
  const all = loadMistakes(profileId);
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
  saveMistakes(next, profileId);
  return next;
}

export function clearMistakes(profileId?: string): void {
  try {
    localStorage.removeItem(profileKey(KEY_SUFFIX, profileId));
  } catch {
    /* ignore */
  }
}

export function recentMissKinds(maxAgeMs?: number, profileId?: string): QuestionKind[] {
  const all = loadMistakes(profileId);
  const cutoff = maxAgeMs ? Date.now() - maxAgeMs : 0;
  const seen = new Set<QuestionKind>();
  for (const m of all) {
    if (cutoff && m.loggedAt < cutoff) continue;
    seen.add(m.kind);
  }
  return [...seen];
}

export function mistakeCounts(profileId?: string): Record<string, number> {
  const all = loadMistakes(profileId);
  const counts: Record<string, number> = {};
  for (const m of all) {
    counts[m.kind] = (counts[m.kind] ?? 0) + 1;
  }
  return counts;
}
