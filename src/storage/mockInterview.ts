/**
 * Per-profile mock-interview history.
 *
 * Stored separately from the SessionRecord stream because each record is
 * larger (full per-question attempts + rubric scores) and benefits from
 * a dedicated dropdown / replay UI. SessionRecord still gets a thin
 * 'mockInterview'-kind summary entry on finish for the existing Profile
 * recent-sessions list.
 */

import { profileKey } from './profiles';
import type { MockInterviewRecord } from '../types/mockInterview';

const KEY_SUFFIX = 'mockInterviews.v1';

export function loadMockInterviewRecords(profileId?: string): MockInterviewRecord[] {
  try {
    const raw = localStorage.getItem(profileKey(KEY_SUFFIX, profileId));
    if (!raw) return [];
    const parsed = JSON.parse(raw) as MockInterviewRecord[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveMockInterviewRecords(
  records: MockInterviewRecord[],
  profileId?: string,
): void {
  try {
    localStorage.setItem(profileKey(KEY_SUFFIX, profileId), JSON.stringify(records));
  } catch {
    /* ignore quota / privacy-mode failures */
  }
}

export function appendMockInterviewRecord(
  record: MockInterviewRecord,
  profileId?: string,
): MockInterviewRecord[] {
  const all = loadMockInterviewRecords(profileId);
  all.push(record);
  saveMockInterviewRecords(all, profileId);
  return all;
}

export function clearMockInterviewRecords(profileId?: string): void {
  try {
    localStorage.removeItem(profileKey(KEY_SUFFIX, profileId));
  } catch {
    /* ignore */
  }
}
