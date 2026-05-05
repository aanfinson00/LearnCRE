/**
 * Per-profile vocab mastery storage.
 *
 * For each term seen, we track total attempts + correct count + last-seen
 * timestamp. Used by the runner for spaced-rep weighting (terms with low
 * mastery + long gap surface first) and by the results screen for
 * "newly learned" / "still weak" callouts.
 *
 * Storage key: learncre.profile.<id>.vocab.v1
 */

import { profileKey } from './profiles';

const KEY_SUFFIX = 'vocab.v1';

export interface VocabTermMastery {
  total: number;
  correct: number;
  lastSeenAt: number;
}

export type VocabMasteryMap = Record<string, VocabTermMastery>;

export function loadVocabMastery(profileId?: string): VocabMasteryMap {
  try {
    const raw = localStorage.getItem(profileKey(KEY_SUFFIX, profileId));
    if (!raw) return {};
    const parsed = JSON.parse(raw) as VocabMasteryMap;
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch {
    return {};
  }
}

export function saveVocabMastery(map: VocabMasteryMap, profileId?: string): void {
  try {
    localStorage.setItem(profileKey(KEY_SUFFIX, profileId), JSON.stringify(map));
  } catch {
    /* ignore */
  }
}

export function recordVocabAttempt(
  termId: string,
  correct: boolean,
  profileId?: string,
): VocabMasteryMap {
  const map = loadVocabMastery(profileId);
  const cur = map[termId] ?? { total: 0, correct: 0, lastSeenAt: 0 };
  map[termId] = {
    total: cur.total + 1,
    correct: cur.correct + (correct ? 1 : 0),
    lastSeenAt: Date.now(),
  };
  saveVocabMastery(map, profileId);
  return map;
}

/**
 * Returns a "weakness weight" for spaced-rep card selection.
 * Higher weight = surface more often.
 */
export function vocabWeight(
  termId: string,
  mastery: VocabMasteryMap,
  now: number = Date.now(),
): number {
  const m = mastery[termId];
  if (!m || m.total === 0) return 4.0; // never seen — surface aggressively
  const accuracy = m.correct / m.total;
  const daysSince = Math.max(0, (now - m.lastSeenAt) / (1000 * 60 * 60 * 24));
  // Base weight from accuracy: 1.0 at perfect, 4.0 at 0%.
  const accWeight = 4.0 - 3.0 * accuracy;
  // Recency bonus: terms unseen for >7 days get a 1.5x surface bonus.
  const recencyMult = daysSince > 30 ? 2.0 : daysSince > 7 ? 1.5 : 1.0;
  return accWeight * recencyMult;
}

export function clearVocabMastery(profileId?: string): void {
  try {
    localStorage.removeItem(profileKey(KEY_SUFFIX, profileId));
  } catch {
    /* ignore */
  }
}
