import { useEffect, useMemo, useState } from 'react';
import { useAuth } from '../cloud/auth';
import {
  fetchAlltimeStreak,
  fetchAlltimeXp,
  fetchTodaysDaily,
  fetchWeeklyXp,
  type LeaderboardEntry,
  type LeaderboardKind,
} from '../cloud/leaderboards';
import { Button } from './ui/Button';
import { Card } from './ui/Card';

interface Props {
  onBack: () => void;
}

interface TabSpec {
  id: LeaderboardKind;
  label: string;
  hint: string;
  metricLabel: string;
  formatValue: (n: number) => string;
}

const TABS: TabSpec[] = [
  {
    id: 'xpAlltime',
    label: 'All-time XP',
    hint: 'Top by lifetime XP earned across every mode.',
    metricLabel: 'XP',
    formatValue: (n) => n.toLocaleString(),
  },
  {
    id: 'xpWeekly',
    label: 'This week',
    hint: 'XP earned this ISO week (Mon 00:00 UTC → next Mon).',
    metricLabel: 'XP',
    formatValue: (n) => n.toLocaleString(),
  },
  {
    id: 'streakAlltime',
    label: 'Longest streak',
    hint: 'Highest daily-active streak ever held.',
    metricLabel: 'days',
    formatValue: (n) => `${n}d`,
  },
  {
    id: 'dailyToday',
    label: 'Daily today',
    hint: "Today's daily-challenge accuracy + speed.",
    metricLabel: 'correct',
    formatValue: (n) => `${n} / 10`,
  },
];

export function LeaderboardScreen({ onBack }: Props) {
  const { user, cloudEnabled } = useAuth();
  const [active, setActive] = useState<LeaderboardKind>('xpAlltime');
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const tab = useMemo(() => TABS.find((t) => t.id === active)!, [active]);

  useEffect(() => {
    if (!cloudEnabled) return;
    let cancelled = false;
    setLoading(true);
    setEntries([]);
    const fetcher =
      active === 'xpAlltime'
        ? fetchAlltimeXp
        : active === 'xpWeekly'
          ? fetchWeeklyXp
          : active === 'streakAlltime'
            ? fetchAlltimeStreak
            : fetchTodaysDaily;
    fetcher(100).then((rows) => {
      if (cancelled) return;
      setEntries(rows);
      setLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, [active, cloudEnabled]);

  const myEntry = entries.find((e) => e.userId === user?.id);
  const myRank = myEntry?.rank ?? null;

  return (
    <div className="mx-auto max-w-3xl space-y-5 py-8">
      <header className="flex flex-wrap items-baseline justify-between gap-3">
        <div>
          <div className="display text-3xl text-warm-black">
            Leaderboards<span className="text-copper">.</span>
          </div>
          <p className="font-mono text-[11px] uppercase tracking-widest text-warm-mute num">
            Top 100 · public profiles only
          </p>
        </div>
        <Button variant="ghost" onClick={onBack} className="text-xs">
          ← Back
        </Button>
      </header>

      <Card className="space-y-3">
        <div className="flex flex-wrap gap-1.5">
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setActive(t.id)}
              className={`rounded-full border px-3 py-1 font-mono text-[11px] uppercase tracking-widest transition-colors duration-aa ease-aa ${
                active === t.id
                  ? 'border-copper bg-copper text-warm-paper'
                  : 'border-warm-line bg-warm-paper/40 text-warm-stone hover:bg-warm-paper'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
        <p className="text-sm text-warm-stone">{tab.hint}</p>
      </Card>

      {!cloudEnabled && (
        <Card className="text-sm text-warm-stone">
          Cloud sync is off. Leaderboards activate when{' '}
          <code>VITE_SUPABASE_URL</code> / <code>VITE_SUPABASE_ANON_KEY</code>{' '}
          are configured.
        </Card>
      )}

      {cloudEnabled && (
        <Card className="space-y-2">
          {loading ? (
            <p className="font-mono text-[11px] text-warm-mute">Loading…</p>
          ) : entries.length === 0 ? (
            <p className="text-sm text-warm-mute">
              No public results yet. Toggle your profile to public to appear
              here.
            </p>
          ) : (
            <ol className="space-y-1 font-mono text-[11px] num">
              {entries.map((e) => {
                const isMe = user?.id === e.userId;
                return (
                  <li
                    key={e.userId}
                    className={`flex items-baseline justify-between border-b border-dotted border-warm-line py-1 ${
                      isMe ? 'text-copper-deep font-medium' : ''
                    }`}
                  >
                    <span className="flex items-baseline gap-2">
                      <span className="w-6 text-right text-warm-mute">
                        {e.rank}
                      </span>
                      <a
                        href={`/u/${e.handle}`}
                        className="text-warm-black hover:underline"
                      >
                        @{e.handle}
                      </a>
                    </span>
                    <span className="text-warm-stone">
                      {tab.formatValue(e.value)}
                      {e.secondary ? ` · ${e.secondary}` : ''}
                    </span>
                  </li>
                );
              })}
            </ol>
          )}
          {cloudEnabled && entries.length > 0 && user && !myRank && (
            <p className="border-t border-warm-line pt-2 font-mono text-[11px] text-warm-mute num">
              You're outside the top 100 on this leaderboard. Toggle your
              profile to public on the Profile screen to start ranking.
            </p>
          )}
          {myRank && myRank > 10 && (
            <p className="border-t border-warm-line pt-2 font-mono text-[11px] text-copper-deep num">
              You're #{myRank} on this leaderboard.
            </p>
          )}
        </Card>
      )}
    </div>
  );
}
