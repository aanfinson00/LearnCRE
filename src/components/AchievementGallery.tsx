import { useEffect, useState } from 'react';
import { ACHIEVEMENTS, loadUnlocked } from '../quiz/achievements';
import type { AchievementUnlock } from '../types/profile';

function fmtDate(t: number): string {
  const d = new Date(t);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export function AchievementGallery() {
  const [unlocks, setUnlocks] = useState<AchievementUnlock[]>([]);

  useEffect(() => {
    setUnlocks(loadUnlocked());
  }, []);

  const unlockedIds = new Map(unlocks.map((u) => [u.id, u.unlockedAt]));

  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
      {ACHIEVEMENTS.map((a) => {
        const at = unlockedIds.get(a.id);
        const unlocked = at !== undefined;
        return (
          <div
            key={a.id}
            className={`rounded-lg border p-3 transition-colors duration-aa ease-aa ${
              unlocked
                ? 'border-copper/40 bg-copper/10'
                : 'border-warm-line bg-warm-paper/30 opacity-60'
            }`}
          >
            <div className="flex items-start gap-2">
              <span className="text-xl leading-none">{a.icon}</span>
              <div className="flex-1">
                <div
                  className={`text-sm font-medium ${
                    unlocked ? 'text-warm-black' : 'text-warm-mute'
                  }`}
                >
                  {a.label}
                </div>
                <div
                  className={`text-[11px] leading-snug ${
                    unlocked ? 'text-warm-stone' : 'text-warm-mute'
                  }`}
                >
                  {a.description}
                </div>
                {unlocked && (
                  <div className="mt-1 font-mono text-[10px] text-copper-deep num">
                    Unlocked {fmtDate(at!)}
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
