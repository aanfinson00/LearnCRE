import { useCallback, useEffect, useState } from 'react';
import {
  activeProfile,
  createProfile,
  deleteProfile,
  loadProfiles,
  renameProfile,
  switchProfile,
} from '../storage/profiles';
import type { Profile } from '../types/profile';

interface UseProfileShape {
  active: Profile;
  profiles: Profile[];
  switchTo: (id: string) => void;
  create: (name: string) => Profile;
  rename: (id: string, name: string) => void;
  remove: (id: string) => void;
}

/**
 * Lightweight observable wrapper around the profile registry. Components that
 * read per-profile data should subscribe so they re-render on profile switches.
 */
export function useProfile(): UseProfileShape {
  const [{ profiles, active }, setState] = useState(() => {
    const reg = loadProfiles();
    const a = activeProfile();
    return { profiles: reg.profiles, active: a };
  });

  const refresh = useCallback(() => {
    const reg = loadProfiles();
    setState({ profiles: reg.profiles, active: activeProfile() });
  }, []);

  useEffect(() => {
    // Listen for cross-tab profile changes too
    const onStorage = (e: StorageEvent) => {
      if (e.key === 'learncre.profiles.v1') refresh();
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, [refresh]);

  return {
    active,
    profiles,
    switchTo: useCallback(
      (id: string) => {
        switchProfile(id);
        refresh();
      },
      [refresh],
    ),
    create: useCallback(
      (name: string) => {
        const p = createProfile(name);
        refresh();
        return p;
      },
      [refresh],
    ),
    rename: useCallback(
      (id: string, name: string) => {
        renameProfile(id, name);
        refresh();
      },
      [refresh],
    ),
    remove: useCallback(
      (id: string) => {
        deleteProfile(id);
        refresh();
      },
      [refresh],
    ),
  };
}
