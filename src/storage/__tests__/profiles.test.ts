import { afterEach, beforeEach, describe, it, expect } from 'vitest';
import {
  activeProfileId,
  createProfile,
  deleteProfile,
  loadProfiles,
  profileKey,
  renameProfile,
  switchProfile,
} from '../profiles';

beforeEach(() => {
  localStorage.clear();
});

afterEach(() => {
  localStorage.clear();
});

describe('storage/profiles', () => {
  it('loadProfiles auto-creates a default "You" profile on first run', () => {
    const reg = loadProfiles();
    expect(reg.profiles).toHaveLength(1);
    expect(reg.profiles[0].name).toBe('You');
    expect(reg.activeId).toBe(reg.profiles[0].id);
  });

  it('createProfile + switchProfile sets activeId', () => {
    loadProfiles(); // ensure default
    const p = createProfile('Alex');
    expect(activeProfileId()).toBe(p.id);
    const reg = loadProfiles();
    expect(reg.profiles).toHaveLength(2);
  });

  it('renameProfile updates the name', () => {
    const reg = loadProfiles();
    renameProfile(reg.activeId, 'Champ');
    const after = loadProfiles();
    expect(after.profiles[0].name).toBe('Champ');
  });

  it('deleteProfile drops the profile and reassigns active', () => {
    loadProfiles();
    const p = createProfile('Delete me');
    expect(loadProfiles().profiles).toHaveLength(2);
    deleteProfile(p.id);
    const after = loadProfiles();
    expect(after.profiles).toHaveLength(1);
    expect(after.activeId).toBe(after.profiles[0].id);
  });

  it('deleteProfile refuses to leave zero profiles', () => {
    const reg = loadProfiles();
    deleteProfile(reg.activeId);
    expect(loadProfiles().profiles).toHaveLength(1);
  });

  it('profileKey scopes by active profile', () => {
    const reg = loadProfiles();
    expect(profileKey('stats.v1')).toBe(`learncre.profile.${reg.activeId}.stats.v1`);
  });

  it('switchProfile changes active without removing other profiles', () => {
    loadProfiles();
    const a = createProfile('A');
    const b = createProfile('B');
    switchProfile(a.id);
    expect(activeProfileId()).toBe(a.id);
    switchProfile(b.id);
    expect(activeProfileId()).toBe(b.id);
  });

  it('migrates legacy v2 keys into the default profile namespace', () => {
    // Seed legacy data
    localStorage.setItem('learncre.stats.v1', JSON.stringify({ attempts: 5, correct: 3, perCategory: {} }));
    localStorage.setItem('learncre.mistakeBank.v1', JSON.stringify([{ kind: 'capCompression' }]));

    const reg = loadProfiles();
    const id = reg.activeId;
    expect(localStorage.getItem('learncre.stats.v1')).toBeNull();
    expect(localStorage.getItem('learncre.mistakeBank.v1')).toBeNull();
    expect(localStorage.getItem(`learncre.profile.${id}.stats.v1`)).toBeTruthy();
    expect(localStorage.getItem(`learncre.profile.${id}.mistakes.v1`)).toBeTruthy();
  });

  it('two profiles hold independent stats', () => {
    const reg = loadProfiles();
    localStorage.setItem(`learncre.profile.${reg.activeId}.stats.v1`, JSON.stringify({ attempts: 99 }));
    const other = createProfile('Other');
    localStorage.setItem(`learncre.profile.${other.id}.stats.v1`, JSON.stringify({ attempts: 1 }));
    expect(localStorage.getItem(`learncre.profile.${reg.activeId}.stats.v1`)).toContain('"attempts":99');
    expect(localStorage.getItem(`learncre.profile.${other.id}.stats.v1`)).toContain('"attempts":1');
  });
});
