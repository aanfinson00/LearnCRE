/**
 * Per-profile cert progress storage.
 *
 * Most cert progress is *derived* from session history (see evaluate.ts) —
 * what we actually persist here is the small slice that isn't derivable:
 *   - which final-exam attempts have been taken
 *   - the earnedAt timestamp once a cert is fully passed
 *   - the startedAt timestamp (when the user first opened the cert)
 *
 * This keeps the storage footprint tiny; benchmark progress recomputes from
 * sessions on every render.
 */

import type {
  CertProgress,
  FinalExamAttempt,
} from '../types/cert';
import { profileKey } from './profiles';

const KEY_SUFFIX = 'certs.v1';

type CertProgressMap = Record<string, CertProgress>;

export function loadCertProgressMap(profileId?: string): CertProgressMap {
  try {
    const raw = localStorage.getItem(profileKey(KEY_SUFFIX, profileId));
    if (!raw) return {};
    const parsed = JSON.parse(raw) as CertProgressMap;
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch {
    return {};
  }
}

export function saveCertProgressMap(
  map: CertProgressMap,
  profileId?: string,
): void {
  try {
    localStorage.setItem(profileKey(KEY_SUFFIX, profileId), JSON.stringify(map));
  } catch {
    /* ignore quota / privacy-mode failures */
  }
}

export function loadCertProgress(
  certId: string,
  profileId?: string,
): CertProgress | undefined {
  return loadCertProgressMap(profileId)[certId];
}

/**
 * Lazy-initialize a CertProgress entry. Idempotent — if the entry already
 * exists, returns it untouched.
 */
export function ensureCertProgress(
  certId: string,
  profileId?: string,
): CertProgress {
  const map = loadCertProgressMap(profileId);
  if (map[certId]) return map[certId];
  const fresh: CertProgress = {
    certId,
    startedAt: Date.now(),
    benchmarksPassed: [],
    finalExamAttempts: [],
  };
  map[certId] = fresh;
  saveCertProgressMap(map, profileId);
  return fresh;
}

export function recordFinalExamAttempt(
  certId: string,
  attempt: FinalExamAttempt,
  profileId?: string,
): CertProgress {
  const map = loadCertProgressMap(profileId);
  const cur = map[certId] ?? {
    certId,
    startedAt: Date.now(),
    benchmarksPassed: [],
    finalExamAttempts: [],
  };
  cur.finalExamAttempts = [...cur.finalExamAttempts, attempt];
  map[certId] = cur;
  saveCertProgressMap(map, profileId);
  return cur;
}

export function markCertEarned(
  certId: string,
  earnedAt: number = Date.now(),
  profileId?: string,
): CertProgress {
  const map = loadCertProgressMap(profileId);
  const cur = map[certId] ?? {
    certId,
    startedAt: Date.now(),
    benchmarksPassed: [],
    finalExamAttempts: [],
  };
  if (!cur.earnedAt) cur.earnedAt = earnedAt;
  map[certId] = cur;
  saveCertProgressMap(map, profileId);
  return cur;
}

export function clearCertProgress(
  certId: string,
  profileId?: string,
): void {
  const map = loadCertProgressMap(profileId);
  delete map[certId];
  saveCertProgressMap(map, profileId);
}
