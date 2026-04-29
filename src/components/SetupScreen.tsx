import { useEffect, useMemo, useState } from 'react';
import { templates, allKinds } from '../quiz/templates';
import type { QuestionKind, AnswerMode } from '../types/question';
import type { AssetClass, DifficultyMode, SessionConfig, TolerancePreset, LifetimeStats } from '../types/session';
import { applicableKinds, assetClassOrder, assetClasses } from '../quiz/assetClasses';
import { ROLES, matchesRole, type Role } from '../types/role';
import { gateLabel, isUnlocked, loadTierState, saveTierState } from '../quiz/gates';
import { loadXp } from '../quiz/xp';
import { nextTier, tierForXp } from '../quiz/tiers';
import { mistakeCounts, recentMissKinds } from '../storage/mistakeBank';
import { AnchorsCard } from './AnchorsCard';
import { Button } from './ui/Button';
import { Card } from './ui/Card';
import { loadConfig, loadLifetime, saveConfig } from '../storage/localStorage';

interface Props {
  onStart: (config: SessionConfig) => void;
}

const LENGTHS: { label: string; value: number | null }[] = [
  { label: '10', value: 10 },
  { label: '20', value: 20 },
  { label: '50', value: 50 },
  { label: 'Endless', value: null },
];

const FOUNDATIONS: QuestionKind[] = [
  'capCompression',
  'goingInCap',
  'vacancySensitivity',
  'otherIncomeImpact',
  'rentChange',
  'combinedScenario',
  'equityMultiple',
  'irrSimple',
];

const MODES: { label: string; value: AnswerMode; hint: string }[] = [
  { label: 'Free-form', value: 'free', hint: 'Type your answer; tolerance band applies.' },
  { label: 'Multiple choice', value: 'mc', hint: 'Pick 1 of 4; exact match only.' },
];

const TOLERANCES: { label: string; value: TolerancePreset; hint: string }[] = [
  { label: 'Strict', value: 'strict', hint: '~±3%' },
  { label: 'Normal', value: 'normal', hint: '~±5%' },
  { label: 'Loose', value: 'loose', hint: '~±10%' },
];

const DIFFICULTIES: { label: string; value: DifficultyMode; hint: string }[] = [
  { label: 'Beginner', value: 'beginner', hint: 'Round numbers, 1% caps, clean holds.' },
  { label: 'Intermediate', value: 'intermediate', hint: '25 bps caps, $25k NOI, realistic deals.' },
  { label: 'Advanced', value: 'advanced', hint: 'Ugly numbers, 5 bps caps, any hold period.' },
  {
    label: 'Dynamic',
    value: 'dynamic',
    hint: 'Adapts to your last 10 answers. First 10 calibrate.',
  },
];

const chipBase =
  'rounded-md border px-3 py-1.5 text-sm transition-all duration-aa ease-aa';
const chipOn = 'border-warm-black bg-warm-black text-warm-white';
const chipOff =
  'border-warm-line bg-warm-white/70 text-warm-ink hover:border-copper hover:text-copper-deep';

function ParcelMark({ accent = 4 }: { accent?: number }) {
  return (
    <div className="aa-parcel h-12 w-12">
      {Array.from({ length: 9 }).map((_, i) => (
        <div key={i} className={i === accent ? 'accent' : ''} />
      ))}
    </div>
  );
}

export function SetupScreen({ onStart }: Props) {
  const stored = useMemo(() => loadConfig(), []);
  const [categories, setCategories] = useState<Set<QuestionKind>>(
    new Set(stored?.categories ?? FOUNDATIONS),
  );
  const [mode, setMode] = useState<AnswerMode>(stored?.mode ?? 'free');
  const [plannedCount, setPlannedCount] = useState<number | null>(
    stored?.plannedCount ?? 10,
  );
  const [tolerance, setTolerance] = useState<TolerancePreset>(stored?.tolerancePreset ?? 'normal');
  const [difficulty, setDifficulty] = useState<DifficultyMode>(stored?.difficulty ?? 'intermediate');
  const [assetClass, setAssetClass] = useState<AssetClass>(stored?.assetClass ?? 'mixed');
  const [role, setRole] = useState<Role | 'all'>(stored?.role ?? 'all');
  const [spacedRepetition, setSpacedRepetition] = useState<boolean>(stored?.spacedRepetition ?? false);
  const [lifetime, setLifetime] = useState<LifetimeStats | null>(null);
  const [missKinds, setMissKinds] = useState<QuestionKind[]>([]);
  const [missByKind, setMissByKind] = useState<Record<string, number>>({});
  const [bypassGates, setBypassGates] = useState<boolean>(() => loadTierState().bypassGates);
  const [totalXp, setTotalXp] = useState<number>(() => loadXp().totalXp);

  const visibleKinds = useMemo(
    () =>
      applicableKinds(assetClass, allKinds).filter((k) =>
        matchesRole(templates[k].roles, role),
      ),
    [assetClass, role],
  );

  // Drop any selected kinds that aren't applicable to the current asset class.
  useEffect(() => {
    setCategories((s) => {
      const visibleSet = new Set(visibleKinds);
      const next = new Set<QuestionKind>();
      for (const k of s) if (visibleSet.has(k)) next.add(k);
      if (next.size === s.size) return s;
      return next;
    });
  }, [visibleKinds]);

  useEffect(() => {
    setLifetime(loadLifetime());
    setMissKinds(recentMissKinds());
    setMissByKind(mistakeCounts());
    setBypassGates(loadTierState().bypassGates);
    setTotalXp(loadXp().totalXp);
  }, []);

  const lifetimeAttempts = lifetime?.attempts ?? 0;
  const gateCtx = { totalXp, lifetimeAttempts, bypassGates };
  const advancedUnlocked = isUnlocked('difficulty.advanced', gateCtx);
  const dynamicUnlocked = isUnlocked('difficulty.dynamic', gateCtx);

  const toggleBypass = () => {
    const next = !bypassGates;
    setBypassGates(next);
    saveTierState({ bypassGates: next });
  };

  const toggle = (kind: QuestionKind) => {
    setCategories((s) => {
      const n = new Set(s);
      if (n.has(kind)) n.delete(kind);
      else n.add(kind);
      return n;
    });
  };

  const selectAll = () => setCategories(new Set(visibleKinds));
  const selectNone = () => setCategories(new Set());
  const selectValuation = () =>
    setCategories(new Set(visibleKinds.filter((k) => templates[k].category === 'valuation')));
  const selectReturns = () =>
    setCategories(new Set(visibleKinds.filter((k) => templates[k].category === 'returns')));
  const selectFoundations = () =>
    setCategories(new Set(visibleKinds.filter((k) => FOUNDATIONS.includes(k))));
  const selectMisses = () => {
    const visibleSet = new Set(visibleKinds);
    setCategories(new Set(missKinds.filter((k) => visibleSet.has(k))));
  };

  const canStart = categories.size > 0;
  const visibleMissCount = missKinds.filter((k) => visibleKinds.includes(k)).length;

  const start = () => {
    const config: SessionConfig = {
      mode,
      categories: [...categories],
      plannedCount,
      tolerancePreset: tolerance,
      difficulty,
      assetClass,
      role,
      spacedRepetition,
    };
    saveConfig(config);
    onStart(config);
  };

  return (
    <div className="mx-auto max-w-3xl space-y-8 py-12 pb-32 sm:pb-12">
      <header className="flex items-start justify-between gap-6">
        <div className="space-y-3">
          <h1 className="display text-5xl text-warm-black">
            LearnCRE<span className="text-copper">.</span>
          </h1>
          <p className="editorial text-xl text-warm-stone">
            Drill your intuition on how small changes in rent, cap rate, and capital
            structure move valuations.
          </p>
        </div>
        <ParcelMark />
      </header>

      <Card className="space-y-6">
        <div>
          <h2 className="mb-3 text-sm font-medium uppercase tracking-widest text-warm-stone">
            Position focus
          </h2>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
            <button
              type="button"
              onClick={() => setRole('all')}
              className={`rounded-lg border p-2.5 text-left transition-all duration-aa ease-aa ${
                role === 'all'
                  ? 'border-copper bg-copper/10 text-warm-black'
                  : 'border-warm-line bg-warm-white/50 text-warm-ink hover:border-copper hover:text-copper-deep'
              }`}
            >
              <div className="text-sm font-medium">All</div>
              <div className={`mt-0.5 text-xs ${role === 'all' ? 'text-copper-ink' : 'text-warm-mute'}`}>
                Every kind, no role filter.
              </div>
            </button>
            {ROLES.map((r) => {
              const on = role === r.id;
              return (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => setRole(r.id)}
                  className={`rounded-lg border p-2.5 text-left transition-all duration-aa ease-aa ${
                    on
                      ? 'border-copper bg-copper/10 text-warm-black'
                      : 'border-warm-line bg-warm-white/50 text-warm-ink hover:border-copper hover:text-copper-deep'
                  }`}
                >
                  <div className="text-sm font-medium">{r.label}</div>
                  <div className={`mt-0.5 text-xs ${on ? 'text-copper-ink' : 'text-warm-mute'}`}>
                    {r.hint}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <h2 className="mb-3 text-sm font-medium uppercase tracking-widest text-warm-stone">
            Asset class
          </h2>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
            {assetClassOrder.map((id) => {
              const ac = assetClasses[id];
              const on = assetClass === id;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => setAssetClass(id)}
                  className={`rounded-lg border p-3 text-left transition-all duration-aa ease-aa ${
                    on
                      ? 'border-copper bg-copper/10 text-warm-black'
                      : 'border-warm-line bg-warm-white/50 text-warm-ink hover:border-copper hover:text-copper-deep'
                  }`}
                >
                  <div className="text-sm font-medium">{ac.label}</div>
                  <div className={`mt-0.5 text-xs ${on ? 'text-copper-ink' : 'text-warm-mute'}`}>
                    {ac.hint}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-medium uppercase tracking-widest text-warm-stone">
              Categories
            </h2>
            <div className="flex flex-wrap gap-1 text-xs">
              <button className="text-copper-deep font-medium transition-colors duration-aa-fast ease-aa hover:text-copper" onClick={selectFoundations}>
                Foundations
              </button>
              <span className="text-warm-line">·</span>
              <button className="text-warm-mute transition-colors duration-aa-fast ease-aa hover:text-copper" onClick={selectValuation}>
                Valuation
              </button>
              <span className="text-warm-line">·</span>
              <button className="text-warm-mute transition-colors duration-aa-fast ease-aa hover:text-copper" onClick={selectReturns}>
                Returns
              </button>
              <span className="text-warm-line">·</span>
              <button className="text-warm-mute transition-colors duration-aa-fast ease-aa hover:text-copper" onClick={selectAll}>
                All
              </button>
              <span className="text-warm-line">·</span>
              <button className="text-warm-mute transition-colors duration-aa-fast ease-aa hover:text-copper" onClick={selectNone}>
                None
              </button>
              {visibleMissCount > 0 && (
                <>
                  <span className="text-warm-line">·</span>
                  <button
                    className="font-medium text-signal-bad-ink transition-colors duration-aa-fast ease-aa hover:text-copper"
                    onClick={selectMisses}
                    title="Pick only the kinds you've missed recently"
                  >
                    Review missed ({visibleMissCount})
                  </button>
                </>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {visibleKinds.map((kind) => {
              const t = templates[kind];
              const on = categories.has(kind);
              const catStats = lifetime?.perCategory?.[kind];
              const accText =
                catStats && catStats.total > 0
                  ? `  ·  lifetime ${Math.round((catStats.correct / catStats.total) * 100)}%`
                  : '';
              const misses = missByKind[kind] ?? 0;
              return (
                <label
                  key={kind}
                  className={`flex cursor-pointer items-start gap-3 rounded-lg border p-3 transition-all duration-aa ease-aa ${
                    on
                      ? 'border-copper bg-copper/5'
                      : 'border-warm-line bg-warm-white/50 hover:border-copper hover:bg-copper/5'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={on}
                    onChange={() => toggle(kind)}
                    className="mt-1 h-4 w-4 rounded border-warm-line accent-copper"
                  />
                  <div className="flex-1 text-sm">
                    <div className="font-medium text-warm-black">
                      {t.label}
                      <span className="text-xs font-normal text-warm-mute">{accText}</span>
                      {misses > 0 && (
                        <span
                          className="ml-2 inline-flex items-center rounded-full bg-signal-bad/15 px-1.5 py-0.5 text-[10px] font-medium text-signal-bad-ink"
                          title={`You've missed ${misses} ${misses === 1 ? 'time' : 'times'}`}
                        >
                          ⚑ {misses}
                        </span>
                      )}
                    </div>
                    <div className="text-warm-stone">{t.description}</div>
                  </div>
                </label>
              );
            })}
          </div>
        </div>

        <div>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-medium uppercase tracking-widest text-warm-stone">
              Difficulty
            </h2>
            <label className="flex cursor-pointer items-center gap-2 text-[11px] text-warm-mute">
              <input
                type="checkbox"
                checked={bypassGates}
                onChange={toggleBypass}
                className="h-3.5 w-3.5 rounded border-warm-line accent-copper"
              />
              <span>Show me everything</span>
            </label>
          </div>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {DIFFICULTIES.map((d) => {
              const locked =
                (d.value === 'advanced' && !advancedUnlocked) ||
                (d.value === 'dynamic' && !dynamicUnlocked);
              const gateText =
                d.value === 'advanced'
                  ? gateLabel('difficulty.advanced')
                  : d.value === 'dynamic'
                    ? gateLabel('difficulty.dynamic')
                    : '';
              const on = difficulty === d.value;
              return (
                <button
                  key={d.value}
                  type="button"
                  onClick={() => setDifficulty(d.value)}
                  className={`relative rounded-lg border p-3 text-left transition-all duration-aa ease-aa ${
                    on
                      ? 'border-warm-black bg-warm-black text-warm-white'
                      : 'border-warm-line bg-warm-white/50 text-warm-ink hover:border-copper hover:text-copper-deep'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{d.label}</span>
                    {locked && (
                      <span
                        className={`inline-flex items-center rounded-full border px-1.5 py-0.5 text-[9px] uppercase tracking-widest ${
                          on
                            ? 'border-warm-paper/40 text-warm-paper/80'
                            : 'border-warm-line text-warm-mute'
                        }`}
                        title={gateText}
                      >
                        🔒 {gateText}
                      </span>
                    )}
                  </div>
                  <div
                    className={`mt-0.5 text-xs ${on ? 'text-warm-paper/70' : 'text-warm-mute'}`}
                  >
                    {d.hint}
                  </div>
                </button>
              );
            })}
          </div>
          {(() => {
            const next = nextTier(totalXp);
            const tier = tierForXp(totalXp);
            if (!next.tier) return null;
            return (
              <div className="mt-2 font-mono text-[11px] text-warm-mute num">
                {tier.label} · {totalXp.toLocaleString()} XP — {next.xpToGo.toLocaleString()} to {next.tier.label}
              </div>
            );
          })()}
        </div>

        <div>
          <label className="flex cursor-pointer items-center gap-3 rounded-md border border-warm-line bg-warm-white/50 p-3 text-sm">
            <input
              type="checkbox"
              checked={spacedRepetition}
              onChange={(e) => setSpacedRepetition(e.target.checked)}
              className="h-4 w-4 rounded border-warm-line accent-copper"
            />
            <div className="flex-1">
              <div className="font-medium text-warm-black">Spaced repetition</div>
              <div className="text-xs text-warm-stone">
                Sample more from kinds where your lifetime accuracy is lower. Once a kind has 3+
                attempts, weight scales between 0.5× (you nail it) and 4× (you miss often).
              </div>
            </div>
          </label>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          <div>
            <h2 className="mb-2 text-sm font-medium uppercase tracking-widest text-warm-stone">
              Length
            </h2>
            <div className="flex flex-wrap gap-2">
              {LENGTHS.map((l) => (
                <button
                  key={l.label}
                  type="button"
                  onClick={() => setPlannedCount(l.value)}
                  className={`${chipBase} ${plannedCount === l.value ? chipOn : chipOff}`}
                >
                  {l.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h2 className="mb-2 text-sm font-medium uppercase tracking-widest text-warm-stone">
              Answer mode
            </h2>
            <div className="flex flex-wrap gap-2">
              {MODES.map((m) => (
                <button
                  key={m.value}
                  type="button"
                  onClick={() => setMode(m.value)}
                  className={`${chipBase} ${mode === m.value ? chipOn : chipOff}`}
                >
                  {m.label}
                </button>
              ))}
            </div>
            <div className="mt-1.5 text-xs text-warm-mute">
              {MODES.find((m) => m.value === mode)?.hint}
            </div>
          </div>

          <div>
            <h2 className="mb-2 text-sm font-medium uppercase tracking-widest text-warm-stone">
              Tolerance
            </h2>
            <div className="flex flex-wrap gap-2">
              {TOLERANCES.map((t) => (
                <button
                  key={t.value}
                  type="button"
                  onClick={() => setTolerance(t.value)}
                  className={`${chipBase} ${tolerance === t.value ? chipOn : chipOff}`}
                >
                  {t.label}
                </button>
              ))}
            </div>
            <div className="mt-1.5 text-xs text-warm-mute">
              {TOLERANCES.find((t) => t.value === tolerance)?.hint}
              {mode === 'mc' ? ' (disabled in MC mode)' : ''}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-warm-line pt-5">
          <div className="text-sm text-warm-stone">
            {lifetime && lifetime.attempts > 0
              ? `Lifetime: ${lifetime.correct}/${lifetime.attempts} (${Math.round((lifetime.correct / lifetime.attempts) * 100)}%)`
              : 'No history yet — start drilling.'}
          </div>
          <Button disabled={!canStart} onClick={start}>
            Start <span className="ml-2 text-warm-paper/60">↵</span>
          </Button>
        </div>
      </Card>

      <AnchorsCard />

      <footer className="text-center text-xs text-warm-mute">
        Enter submits. S skips. 1–4 picks MC choices.
      </footer>

      {/* Sticky floating Start pill, visible on smaller viewports / once the user scrolls */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-warm-line bg-warm-white/90 backdrop-blur-md sm:hidden">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-3 px-4 py-3">
          <div className="font-mono text-xs text-warm-mute num">
            {categories.size} cat · {plannedCount ?? '∞'} Q · {difficulty}
          </div>
          <Button disabled={!canStart} onClick={start} className="px-6">
            Start <span className="ml-2 text-warm-paper/60">↵</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
