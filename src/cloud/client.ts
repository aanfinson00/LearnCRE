/**
 * Cloud-optional Supabase client wrapper.
 *
 * When VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY is missing, the app runs
 * fully local-first. Cloud features simply don't activate; nothing breaks.
 *
 * Single shared client, lazily constructed on first access.
 */
import { createClient, type SupabaseClient } from '@supabase/supabase-js';

let cached: SupabaseClient | null | undefined;

function readEnv(name: string): string | undefined {
  // Vite exposes import.meta.env at build time. Falls back to undefined when
  // the env var isn't set, which we treat as "cloud disabled".
  const v = (import.meta.env as Record<string, string | undefined>)[name];
  if (typeof v !== 'string' || v.trim() === '') return undefined;
  return v.trim();
}

export function getSupabase(): SupabaseClient | null {
  if (cached !== undefined) return cached;
  const url = readEnv('VITE_SUPABASE_URL');
  const anonKey = readEnv('VITE_SUPABASE_ANON_KEY');
  if (!url || !anonKey) {
    cached = null;
    return null;
  }
  cached = createClient(url, anonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      // Magic-link emails redirect back here.
      detectSessionInUrl: true,
    },
  });
  return cached;
}

export function cloudEnabled(): boolean {
  return getSupabase() !== null;
}
