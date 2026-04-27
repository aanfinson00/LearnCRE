import { useEffect, useState } from 'react';
import { loadXp } from '../quiz/xp';
import { nextTier, tierForXp } from '../quiz/tiers';

export function TierBadge() {
  const [xp, setXp] = useState<number>(() => loadXp().totalXp);

  useEffect(() => {
    // Refresh on storage change so other tabs / hooks update us
    const refresh = () => setXp(loadXp().totalXp);
    const onStorage = (e: StorageEvent) => {
      if (e.key && e.key.includes('.xp.v1')) refresh();
    };
    const interval = window.setInterval(refresh, 2_000); // soft polling for in-tab updates
    window.addEventListener('storage', onStorage);
    return () => {
      window.clearInterval(interval);
      window.removeEventListener('storage', onStorage);
    };
  }, []);

  const tier = tierForXp(xp);
  const { tier: next, xpToGo } = nextTier(xp);

  return (
    <div className="flex items-baseline gap-2 font-mono text-[11px] num">
      <span className="rounded-md bg-warm-paper/60 px-2 py-0.5 font-medium text-warm-ink">
        {tier.label}
      </span>
      <span className="text-warm-mute">
        {next ? `${xp.toLocaleString()} XP · ${xpToGo.toLocaleString()} → ${next.label}` : `${xp.toLocaleString()} XP`}
      </span>
    </div>
  );
}
