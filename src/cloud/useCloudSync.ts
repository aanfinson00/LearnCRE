import { useEffect, useRef } from 'react';
import { useAuth } from './auth';
import { pullAll, pushAll } from './sync';

const PUSH_INTERVAL_MS = 30_000;

/**
 * Top-level cloud-sync lifecycle hook. Call once in App.
 *
 * Behavior:
 * - Cloud disabled OR signed out → no-op
 * - Signed in: runs an initial pull-then-push to reconcile, then a
 *   periodic push every 30s. Also flushes on tab close.
 * - Sign out clears the timer and beforeunload handler.
 */
export function useCloudSync() {
  const { user, cloudEnabled } = useAuth();
  const userIdRef = useRef<string | null>(null);

  useEffect(() => {
    if (!cloudEnabled || !user) {
      userIdRef.current = null;
      return;
    }
    const userId = user.id;
    userIdRef.current = userId;
    let cancelled = false;

    (async () => {
      const pulled = await pullAll(userId);
      if (cancelled) return;
      if (!pulled.ok) {
        console.warn('cloud pull failed:', pulled.error);
        return;
      }
      // Push our (possibly merged) state up so cloud reflects the union.
      const pushed = await pushAll(userId);
      if (!pushed.ok) console.warn('cloud push failed:', pushed.error);
    })();

    const interval = window.setInterval(() => {
      if (cancelled) return;
      pushAll(userId).catch((e) => console.warn('periodic push failed:', e));
    }, PUSH_INTERVAL_MS);

    const onUnload = () => {
      // Best-effort; the browser may not wait for the network response.
      pushAll(userId).catch(() => {
        /* noop */
      });
    };
    window.addEventListener('beforeunload', onUnload);

    return () => {
      cancelled = true;
      window.clearInterval(interval);
      window.removeEventListener('beforeunload', onUnload);
    };
  }, [cloudEnabled, user]);
}
