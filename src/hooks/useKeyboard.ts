import { useEffect } from 'react';

export function useKeyboard(handler: (e: KeyboardEvent) => void, deps: unknown[]) {
  useEffect(() => {
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
