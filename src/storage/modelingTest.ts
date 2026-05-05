import { profileKey } from './profiles';
import type {
  ModelingTestAttempt,
  ModelingTestDraft,
} from '../types/modelingTest';

const HISTORY_LIMIT = 50;

function draftKey(templateId: string): string {
  return profileKey(`modelingTest.${templateId}.draft.v1`);
}

const HISTORY_KEY_SUFFIX = 'modelingTest.history.v1';

export function loadDraft(templateId: string): ModelingTestDraft | null {
  try {
    const raw = localStorage.getItem(draftKey(templateId));
    if (!raw) return null;
    const parsed = JSON.parse(raw) as ModelingTestDraft;
    if (parsed.templateId !== templateId) return null;
    if (typeof parsed.formulas !== 'object' || parsed.formulas === null) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function saveDraft(draft: ModelingTestDraft): void {
  try {
    localStorage.setItem(draftKey(draft.templateId), JSON.stringify(draft));
  } catch {
    /* ignore */
  }
}

export function clearDraft(templateId: string): void {
  try {
    localStorage.removeItem(draftKey(templateId));
  } catch {
    /* ignore */
  }
}

export function loadAttempts(): ModelingTestAttempt[] {
  try {
    const raw = localStorage.getItem(profileKey(HISTORY_KEY_SUFFIX));
    if (!raw) return [];
    const parsed = JSON.parse(raw) as ModelingTestAttempt[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function recordAttempt(attempt: ModelingTestAttempt): ModelingTestAttempt[] {
  const next = [...loadAttempts(), attempt].slice(-HISTORY_LIMIT);
  try {
    localStorage.setItem(profileKey(HISTORY_KEY_SUFFIX), JSON.stringify(next));
  } catch {
    /* ignore */
  }
  return next;
}

export function bestAttempt(templateId: string): ModelingTestAttempt | null {
  const attempts = loadAttempts().filter((a) => a.templateId === templateId);
  if (attempts.length === 0) return null;
  return attempts.reduce((best, a) => {
    if (a.result.outputsCorrect > best.result.outputsCorrect) return a;
    if (
      a.result.outputsCorrect === best.result.outputsCorrect &&
      a.completedAt > best.completedAt
    ) {
      return a;
    }
    return best;
  });
}
