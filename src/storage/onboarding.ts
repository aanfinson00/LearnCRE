import { profileKey } from './profiles';
import type { Role } from '../types/role';

const WELCOME_KEY = 'welcome.v1';
const PRIMERS_KEY = 'modePrimers.v1';
const PREFERRED_ROLE_KEY = 'preferredRole.v1';

export function hasSeenWelcome(): boolean {
  try {
    return localStorage.getItem(profileKey(WELCOME_KEY)) === '1';
  } catch {
    return false;
  }
}

export function markWelcomeSeen(): void {
  try {
    localStorage.setItem(profileKey(WELCOME_KEY), '1');
  } catch {
    /* ignore */
  }
}

export function loadDismissedPrimers(): Set<string> {
  try {
    const raw = localStorage.getItem(profileKey(PRIMERS_KEY));
    if (!raw) return new Set();
    const parsed = JSON.parse(raw) as string[];
    return Array.isArray(parsed) ? new Set(parsed) : new Set();
  } catch {
    return new Set();
  }
}

export function isModePrimerDismissed(modeId: string): boolean {
  return loadDismissedPrimers().has(modeId);
}

export function dismissModePrimer(modeId: string): void {
  try {
    const set = loadDismissedPrimers();
    set.add(modeId);
    localStorage.setItem(profileKey(PRIMERS_KEY), JSON.stringify(Array.from(set)));
  } catch {
    /* ignore */
  }
}

export function loadPreferredRole(): Role | 'all' | null {
  try {
    const raw = localStorage.getItem(profileKey(PREFERRED_ROLE_KEY));
    if (!raw) return null;
    return raw as Role | 'all';
  } catch {
    return null;
  }
}

export function savePreferredRole(role: Role | 'all'): void {
  try {
    localStorage.setItem(profileKey(PREFERRED_ROLE_KEY), role);
  } catch {
    /* ignore */
  }
}
