import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import type { Session, User } from '@supabase/supabase-js';
import { getSupabase } from './client';

interface AuthContextValue {
  /** Current Supabase user, or null when signed out / cloud disabled. */
  user: User | null;
  /** Active Supabase session, or null. */
  session: Session | null;
  /** True until the initial session probe completes. */
  loading: boolean;
  /** Triggers a magic-link send. Returns null on success, error message on failure.
   *  Optional `redirectTo` overrides the default origin (used by invite-link
   *  landings so the magic-link callback returns to the same invite URL). */
  signInWithEmail: (email: string, redirectTo?: string) => Promise<string | null>;
  /** Signs out and clears the local session. */
  signOut: () => Promise<void>;
  /** True when env vars are present and the client is initialized. */
  cloudEnabled: boolean;
}

const noop = async () => null;
const noopVoid = async () => {
  /* no-op */
};

const AuthContext = createContext<AuthContextValue>({
  user: null,
  session: null,
  loading: false,
  signInWithEmail: noop,
  signOut: noopVoid,
  cloudEnabled: false,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const supabase = getSupabase();
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState<boolean>(supabase !== null);

  useEffect(() => {
    if (!supabase) return;
    let active = true;

    supabase.auth.getSession().then(({ data }) => {
      if (!active) return;
      setSession(data.session);
      setLoading(false);
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_event, next) => {
      if (!active) return;
      setSession(next);
    });

    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, [supabase]);

  const value = useMemo<AuthContextValue>(() => {
    if (!supabase) {
      return {
        user: null,
        session: null,
        loading: false,
        signInWithEmail: noop,
        signOut: noopVoid,
        cloudEnabled: false,
      };
    }
    return {
      user: session?.user ?? null,
      session,
      loading,
      cloudEnabled: true,
      signInWithEmail: async (email, redirectTo) => {
        const { error } = await supabase.auth.signInWithOtp({
          email,
          options: { emailRedirectTo: redirectTo ?? window.location.origin },
        });
        return error?.message ?? null;
      },
      signOut: async () => {
        await supabase.auth.signOut();
      },
    };
  }, [supabase, session, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  return useContext(AuthContext);
}
