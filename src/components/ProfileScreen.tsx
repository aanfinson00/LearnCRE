import { useEffect, useMemo, useState } from 'react';
import { useProfile } from '../hooks/useProfile';
import { loadXp } from '../quiz/xp';
import { loadTierState, saveTierState } from '../quiz/gates';
import { nextTier, tierForXp } from '../quiz/tiers';
import { loadLifetime, loadSessions } from '../storage/localStorage';
import { loadMistakes } from '../storage/mistakeBank';
import type { LifetimeStats } from '../types/session';
import type { SessionRecord, XpState } from '../types/profile';
import { AchievementGallery } from './AchievementGallery';
import { Card } from './ui/Card';
import { Sparkline } from './Sparkline';
import { CertBadge } from './CertBadge';
import { useCertProgress } from '../hooks/useCertProgress';
import { CERTS, certById } from '../quiz/certs';
import { SignIn } from './SignIn';

interface Props {
  onBack: () => void;
}

function fmtDate(t: number): string {
  const d = new Date(t);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function fmtMinutes(ms: number): string {
  const minutes = Math.round(ms / 60_000);
  if (minutes < 60) return `${minutes}m`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m === 0 ? `${h}h` : `${h}h ${m}m`;
}

export function ProfileScreen({ onBack }: Props) {
  const { active } = useProfile();
  const { views, records } = useCertProgress();
  const [xp, setXp] = useState<XpState>(() => loadXp());
  const [lifetime, setLifetime] = useState<LifetimeStats>(() => loadLifetime());
  const [sessions, setSessions] = useState<SessionRecord[]>(() => loadSessions());
  const [bypass, setBypass] = useState<boolean>(() => loadTierState().bypassGates);
  const [outstandingMisses, setOutstandingMisses] = useState<number>(0);

  useEffect(() => {
    setXp(loadXp());
    setLifetime(loadLifetime());
    setSessions(loadSessions());
    setBypass(loadTierState().bypassGates);
    setOutstandingMisses(loadMistakes().length);
  }, [active.id]);

  const tier = tierForXp(xp.totalXp);
  const next = nextTier(xp.totalXp);
  const tierProgressPct = next.tier
    ? Math.max(0, Math.min(1, (xp.totalXp - tier.minXp) / (next.tier.minXp - tier.minXp)))
    : 1;

  const totalMs = useMemo(() => sessions.reduce((acc, s) => acc + s.durationMs, 0), [sessions]);

  // Last 30 sessions, accuracy trend
  const recent = useMemo(() => sessions.slice(-30), [sessions]);
  const accuracyTrend = useMemo(() => recent.map((s) => Math.round(s.accuracyPct * 100)), [recent]);

  // Difficulty breakdown from recent quiz sessions
  const difficultyBreakdown = useMemo(() => {
    const breakdown: Record<string, { total: number; correct: number }> = {
      beginner: { total: 0, correct: 0 },
      intermediate: { total: 0, correct: 0 },
      advanced: { total: 0, correct: 0 },
      dynamic: { total: 0, correct: 0 },
    };
    for (const s of sessions) {
      if (s.kind !== 'quiz') continue;
      const d = (s.config as { difficulty?: string } | undefined)?.difficulty ?? 'intermediate';
      const cur = breakdown[d] ?? { total: 0, correct: 0 };
      breakdown[d] = { total: cur.total + s.attempts, correct: cur.correct + s.correct };
    }
    return breakdown;
  }, [sessions]);

  const toggleBypass = () => {
    const v = !bypass;
    setBypass(v);
    saveTierState({ bypassGates: v });
  };

  return (
    <div className="mx-auto max-w-3xl space-y-5 py-10">
      <header className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <span
            className="inline-block h-8 w-8 rounded-full"
            style={{ background: active.avatarColor }}
          />
          <div>
            <h1 className="display text-3xl text-warm-black">
              {active.name}
              <span className="text-copper">.</span>
            </h1>
            <p className="font-mono text-xs text-warm-mute num">
              Member since {fmtDate(active.createdAt)}
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={onBack}
          className="rounded-md border border-warm-line bg-warm-white/70 px-3 py-1.5 text-xs text-warm-ink hover:border-copper hover:text-copper-deep"
        >
          ← Back
        </button>
      </header>

      <Card className="space-y-3">
        <div className="flex items-baseline justify-between">
          <div className="text-xs font-medium uppercase tracking-widest text-warm-stone">
            Tier
          </div>
          <div className="font-mono text-[11px] text-warm-mute num">
            {xp.totalXp.toLocaleString()} XP total
          </div>
        </div>
        <div className="flex items-baseline gap-3">
          <span className="rounded-md bg-warm-black px-3 py-1 text-sm font-medium text-warm-white">
            {tier.label}
          </span>
          {next.tier ? (
            <span className="font-mono text-xs text-warm-stone num">
              {next.xpToGo.toLocaleString()} XP to {next.tier.label}
            </span>
          ) : (
            <span className="font-mono text-xs text-warm-stone">Top tier reached.</span>
          )}
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-warm-paper">
          <div
            className="h-full rounded-full bg-copper transition-all duration-aa-slow ease-aa"
            style={{ width: `${tierProgressPct * 100}%` }}
          />
        </div>
        <label className="flex cursor-pointer items-center gap-2 pt-2 text-xs text-warm-stone">
          <input
            type="checkbox"
            checked={bypass}
            onChange={toggleBypass}
            className="h-3.5 w-3.5 rounded border-warm-line accent-copper"
          />
          <span>Show me everything (bypass gated features regardless of tier)</span>
        </label>
      </Card>

      <Card className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <Metric label="Answered" value={lifetime.attempts.toLocaleString()} />
        <Metric
          label="Accuracy"
          value={
            lifetime.attempts === 0
              ? '—'
              : `${Math.round((lifetime.correct / lifetime.attempts) * 100)}%`
          }
        />
        <Metric label="Time on task" value={fmtMinutes(totalMs)} />
        <Metric label="Streak best" value={`${xp.bestStreak}`} />
        <Metric label="Sessions" value={sessions.length.toLocaleString()} />
        <Metric label="Current streak" value={`${xp.currentStreak}`} />
        <Metric label="Best session XP" value={`${xp.bestSessionXp}`} />
        <Metric label="Open misses" value={`${outstandingMisses}`} />
      </Card>

      <Card className="space-y-3">
        <div className="flex items-baseline justify-between">
          <div className="text-xs font-medium uppercase tracking-widest text-warm-stone">
            Accuracy trend (last {recent.length} sessions)
          </div>
          {recent.length > 0 && (
            <span className="font-mono text-[11px] text-warm-mute num">
              {accuracyTrend[0]}% → {accuracyTrend[accuracyTrend.length - 1]}%
            </span>
          )}
        </div>
        <Sparkline values={accuracyTrend} ariaLabel="Accuracy over last sessions" />
      </Card>

      <Card className="space-y-2">
        <div className="text-xs font-medium uppercase tracking-widest text-warm-stone">
          By difficulty
        </div>
        <div className="space-y-1.5">
          {(['beginner', 'intermediate', 'advanced', 'dynamic'] as const).map((d) => {
            const cell = difficultyBreakdown[d];
            const pct = cell.total === 0 ? 0 : cell.correct / cell.total;
            return (
              <div key={d} className="space-y-0.5">
                <div className="flex items-baseline justify-between font-mono text-[11px] num">
                  <span className="text-warm-ink capitalize">{d}</span>
                  <span className="text-warm-stone">
                    {cell.total === 0
                      ? '—'
                      : `${cell.correct}/${cell.total} · ${Math.round(pct * 100)}%`}
                  </span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-warm-paper">
                  <div
                    className="h-full rounded-full bg-copper transition-all duration-aa-slow ease-aa"
                    style={{ width: `${pct * 100}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      <Card className="space-y-3">
        <div className="flex items-baseline justify-between">
          <div className="text-xs font-medium uppercase tracking-widest text-warm-stone">
            Earned certifications
          </div>
          <div className="font-mono text-[11px] text-warm-mute num">
            {CERTS.filter((c) => views[c.id]?.earned).length}/{CERTS.length}
          </div>
        </div>
        {(() => {
          const earnedCerts = CERTS.filter((c) => views[c.id]?.earned);
          if (earnedCerts.length === 0) {
            return (
              <p className="text-sm text-warm-stone">
                None yet. Open the Certify tab to start.
              </p>
            );
          }
          return (
            <div className="grid grid-cols-1 gap-2">
              {earnedCerts.map((c) => {
                const rec = records[c.id];
                const view = views[c.id];
                if (!rec?.earnedAt) return null;
                const cert = certById(c.id)!;
                return (
                  <CertBadge
                    key={c.id}
                    compact
                    cert={cert}
                    earnedAt={rec.earnedAt}
                    scorePct={view?.bestFinalScorePct ?? null}
                  />
                );
              })}
            </div>
          );
        })()}
      </Card>

      <Card className="space-y-3">
        <div className="flex items-baseline justify-between">
          <div className="text-xs font-medium uppercase tracking-widest text-warm-stone">
            Achievements
          </div>
        </div>
        <AchievementGallery />
      </Card>

      <Card className="space-y-2">
        <div className="text-xs font-medium uppercase tracking-widest text-warm-stone">
          Recent sessions
        </div>
        {sessions.length === 0 ? (
          <p className="text-sm text-warm-stone">No sessions yet — finish one and it'll show up here.</p>
        ) : (
          <div className="space-y-1.5 font-mono text-[11px] num">
            {sessions
              .slice()
              .reverse()
              .slice(0, 8)
              .map((s) => (
                <div key={s.id} className="flex items-baseline justify-between border-b border-dotted border-warm-line py-1">
                  <span className="text-warm-stone">
                    {fmtDate(s.finishedAt)} · {s.kind}
                  </span>
                  <span className="text-warm-black">
                    {s.correct}/{s.attempts} · {Math.round(s.accuracyPct * 100)}% · {fmtMinutes(s.durationMs)}
                  </span>
                </div>
              ))}
          </div>
        )}
      </Card>

      <SignIn />
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-warm-paper/50 p-3">
      <div className="text-xs uppercase tracking-wide text-warm-stone">{label}</div>
      <div className="mt-1 font-mono text-xl num text-warm-black">{value}</div>
    </div>
  );
}
