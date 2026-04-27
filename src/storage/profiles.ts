import { AVATAR_COLORS, type Profile, type ProfilesRegistry } from '../types/profile';

const KEY = 'learncre.profiles.v1';
/** Marker so legacy migration only runs once even if registry is missing later. */
const MIGRATION_DONE_KEY = 'learncre.legacyMigrated.v1';

const LEGACY_KEYS = {
  stats: 'learncre.stats.v1',
  config: 'learncre.config.v1',
  mistakes: 'learncre.mistakeBank.v1',
};

function uuid(): string {
  // Plain client-side uuid; not cryptographic.
  return `p_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;
}

function readRaw(): ProfilesRegistry | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as ProfilesRegistry;
    if (!parsed || !Array.isArray(parsed.profiles)) return null;
    return parsed;
  } catch {
    return null;
  }
}

function writeRaw(reg: ProfilesRegistry): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(reg));
  } catch {
    /* ignore */
  }
}

/** True when first profile is being created on a browser that previously held v2 data. */
function legacyDataPresent(): boolean {
  try {
    return localStorage.getItem(LEGACY_KEYS.stats) !== null
      || localStorage.getItem(LEGACY_KEYS.mistakes) !== null
      || localStorage.getItem(LEGACY_KEYS.config) !== null;
  } catch {
    return false;
  }
}

function legacyMigrate(profileId: string): void {
  try {
    if (localStorage.getItem(MIGRATION_DONE_KEY) === '1') return;
    const move = (legacyKey: string, suffix: string) => {
      const v = localStorage.getItem(legacyKey);
      if (v === null) return;
      const targetKey = `learncre.profile.${profileId}.${suffix}`;
      if (localStorage.getItem(targetKey) === null) {
        localStorage.setItem(targetKey, v);
      }
      localStorage.removeItem(legacyKey);
    };
    move(LEGACY_KEYS.stats, 'stats.v1');
    move(LEGACY_KEYS.config, 'config.v1');
    move(LEGACY_KEYS.mistakes, 'mistakes.v1');
    localStorage.setItem(MIGRATION_DONE_KEY, '1');
  } catch {
    /* ignore */
  }
}

function pickAvatarColor(existing: Profile[]): string {
  const used = new Set(existing.map((p) => p.avatarColor));
  for (const c of AVATAR_COLORS) {
    if (!used.has(c)) return c;
  }
  return AVATAR_COLORS[existing.length % AVATAR_COLORS.length];
}

/**
 * Returns the registry, creating a default profile (with legacy migration) on first run.
 */
export function loadProfiles(): ProfilesRegistry {
  let reg = readRaw();
  if (!reg || reg.profiles.length === 0) {
    const hadLegacy = legacyDataPresent();
    const profile: Profile = {
      id: uuid(),
      name: 'You',
      createdAt: Date.now(),
      lastActiveAt: Date.now(),
      avatarColor: AVATAR_COLORS[0],
    };
    reg = { profiles: [profile], activeId: profile.id };
    writeRaw(reg);
    if (hadLegacy) legacyMigrate(profile.id);
  }
  const activeId = reg.activeId;
  if (!activeId || !reg.profiles.find((p) => p.id === activeId)) {
    reg = { ...reg, activeId: reg.profiles[0].id };
    writeRaw(reg);
  }
  return reg;
}

export function activeProfileId(): string {
  return loadProfiles().activeId;
}

export function activeProfile(): Profile {
  const reg = loadProfiles();
  return reg.profiles.find((p) => p.id === reg.activeId) ?? reg.profiles[0];
}

export function createProfile(name: string): Profile {
  const reg = loadProfiles();
  const profile: Profile = {
    id: uuid(),
    name: name.trim() || `Profile ${reg.profiles.length + 1}`,
    createdAt: Date.now(),
    lastActiveAt: Date.now(),
    avatarColor: pickAvatarColor(reg.profiles),
  };
  const next: ProfilesRegistry = {
    profiles: [...reg.profiles, profile],
    activeId: profile.id,
  };
  writeRaw(next);
  return profile;
}

export function switchProfile(id: string): void {
  const reg = loadProfiles();
  if (!reg.profiles.find((p) => p.id === id)) return;
  const next: ProfilesRegistry = { ...reg, activeId: id };
  // Touch lastActiveAt
  next.profiles = next.profiles.map((p) =>
    p.id === id ? { ...p, lastActiveAt: Date.now() } : p,
  );
  writeRaw(next);
}

export function renameProfile(id: string, name: string): void {
  const reg = loadProfiles();
  const next: ProfilesRegistry = {
    ...reg,
    profiles: reg.profiles.map((p) => (p.id === id ? { ...p, name: name.trim() || p.name } : p)),
  };
  writeRaw(next);
}

export function deleteProfile(id: string): void {
  const reg = loadProfiles();
  if (reg.profiles.length <= 1) return; // never leave zero profiles
  // Wipe per-profile keys
  try {
    const prefix = `learncre.profile.${id}.`;
    const toRemove: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && k.startsWith(prefix)) toRemove.push(k);
    }
    for (const k of toRemove) localStorage.removeItem(k);
  } catch {
    /* ignore */
  }
  const remaining = reg.profiles.filter((p) => p.id !== id);
  const next: ProfilesRegistry = {
    profiles: remaining,
    activeId: reg.activeId === id ? remaining[0].id : reg.activeId,
  };
  writeRaw(next);
}

export function profileKey(suffix: string, profileId?: string): string {
  const id = profileId ?? activeProfileId();
  return `learncre.profile.${id}.${suffix}`;
}
