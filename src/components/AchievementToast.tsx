import { useEffect, useState } from 'react';
import { ACHIEVEMENTS } from '../quiz/achievements';

interface ToastEntry {
  id: string;
  shownAt: number;
}

let publish: ((id: string) => void) | null = null;

/** Imperative API used by hooks to enqueue a toast for a newly-unlocked achievement. */
export function showAchievementToast(id: string): void {
  if (publish) publish(id);
}

export function AchievementToastHost() {
  const [queue, setQueue] = useState<ToastEntry[]>([]);

  useEffect(() => {
    publish = (id: string) => {
      setQueue((q) => [...q, { id, shownAt: Date.now() }]);
    };
    return () => {
      publish = null;
    };
  }, []);

  // Auto-dismiss after 5s
  useEffect(() => {
    if (queue.length === 0) return;
    const timers = queue.map((t) => {
      const elapsed = Date.now() - t.shownAt;
      return window.setTimeout(() => {
        setQueue((q) => q.filter((x) => x.id !== t.id));
      }, Math.max(500, 5000 - elapsed));
    });
    return () => timers.forEach((id) => window.clearTimeout(id));
  }, [queue]);

  const dismiss = (entryShownAt: number) =>
    setQueue((q) => q.filter((x) => x.shownAt !== entryShownAt));

  if (queue.length === 0) return null;

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-6 z-50 flex flex-col items-center gap-2 px-4">
      {queue.map((t) => {
        const def = ACHIEVEMENTS.find((a) => a.id === t.id);
        if (!def) return null;
        return (
          <div
            key={`${t.id}-${t.shownAt}`}
            className="pointer-events-auto flex max-w-md items-start gap-3 rounded-xl border border-copper/40 bg-warm-white shadow-aa px-4 py-3 transition-all duration-aa-slow ease-aa"
          >
            <span className="text-2xl">{def.icon}</span>
            <div className="flex-1">
              <div className="text-[10px] font-medium uppercase tracking-widest text-copper-deep">
                Achievement unlocked
              </div>
              <div className="font-medium text-warm-black">{def.label}</div>
              <div className="text-xs text-warm-stone">{def.description}</div>
            </div>
            <button
              type="button"
              onClick={() => dismiss(t.shownAt)}
              className="text-warm-mute hover:text-warm-black"
              aria-label="Dismiss"
            >
              ×
            </button>
          </div>
        );
      })}
    </div>
  );
}
