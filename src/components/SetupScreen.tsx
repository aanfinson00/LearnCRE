import { useEffect, useMemo, useState } from 'react';
import { templates, allKinds } from '../quiz/templates';
import type { QuestionKind, AnswerMode } from '../types/question';
import type { DifficultyMode, SessionConfig, TolerancePreset, LifetimeStats } from '../types/session';
import { AnchorsCard } from './AnchorsCard';
import { Button } from './ui/Button';
import { Card } from './ui/Card';
import { loadConfig, loadLifetime, saveConfig } from '../storage/localStorage';

interface Props {
  onStart: (config: SessionConfig) => void;
  onSwitchToSpeedDrill?: () => void;
}

const LENGTHS: { label: string; value: number | null }[] = [
  { label: '10', value: 10 },
  { label: '20', value: 20 },
  { label: '50', value: 50 },
  { label: 'Endless', value: null },
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

export function SetupScreen({ onStart, onSwitchToSpeedDrill }: Props) {
  const stored = useMemo(() => loadConfig(), []);
  const [categories, setCategories] = useState<Set<QuestionKind>>(
    new Set(stored?.categories ?? allKinds),
  );
  const [mode, setMode] = useState<AnswerMode>(stored?.mode ?? 'free');
  const [plannedCount, setPlannedCount] = useState<number | null>(
    stored?.plannedCount ?? 10,
  );
  const [tolerance, setTolerance] = useState<TolerancePreset>(stored?.tolerancePreset ?? 'normal');
  const [difficulty, setDifficulty] = useState<DifficultyMode>(stored?.difficulty ?? 'intermediate');
  const [lifetime, setLifetime] = useState<LifetimeStats | null>(null);

  useEffect(() => {
    setLifetime(loadLifetime());
  }, []);

  const toggle = (kind: QuestionKind) => {
    setCategories((s) => {
      const n = new Set(s);
      if (n.has(kind)) n.delete(kind);
      else n.add(kind);
      return n;
    });
  };

  const selectAll = () => setCategories(new Set(allKinds));
  const selectNone = () => setCategories(new Set());
  const selectValuation = () =>
    setCategories(new Set(allKinds.filter((k) => templates[k].category === 'valuation')));
  const selectReturns = () =>
    setCategories(new Set(allKinds.filter((k) => templates[k].category === 'returns')));

  const canStart = categories.size > 0;

  const start = () => {
    const config: SessionConfig = {
      mode,
      categories: [...categories],
      plannedCount,
      tolerancePreset: tolerance,
      difficulty,
    };
    saveConfig(config);
    onStart(config);
  };

  return (
    <div className="mx-auto max-w-3xl space-y-8 py-12">
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

      {onSwitchToSpeedDrill && (
        <div className="flex items-center gap-2">
          <span className="rounded-md bg-warm-black px-3 py-1.5 text-xs font-medium text-warm-white">
            Quiz
          </span>
          <button
            type="button"
            onClick={onSwitchToSpeedDrill}
            className="rounded-md border border-warm-line bg-warm-white/70 px-3 py-1.5 text-xs font-medium text-warm-ink transition-all duration-aa ease-aa hover:border-copper hover:text-copper-deep"
          >
            Times-table speed drill →
          </button>
        </div>
      )}

      <Card className="space-y-6">
        <div>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-medium uppercase tracking-widest text-warm-stone">
              Categories
            </h2>
            <div className="flex gap-1 text-xs">
              <button className="text-warm-mute transition-colors duration-aa-fast ease-aa hover:text-copper" onClick={selectAll}>
                All
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
              <button className="text-warm-mute transition-colors duration-aa-fast ease-aa hover:text-copper" onClick={selectNone}>
                None
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {allKinds.map((kind) => {
              const t = templates[kind];
              const on = categories.has(kind);
              const catStats = lifetime?.perCategory?.[kind];
              const accText =
                catStats && catStats.total > 0
                  ? `  ·  lifetime ${Math.round((catStats.correct / catStats.total) * 100)}%`
                  : '';
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
                    </div>
                    <div className="text-warm-stone">{t.description}</div>
                  </div>
                </label>
              );
            })}
          </div>
        </div>

        <div>
          <h2 className="mb-3 text-sm font-medium uppercase tracking-widest text-warm-stone">
            Difficulty
          </h2>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {DIFFICULTIES.map((d) => (
              <button
                key={d.value}
                type="button"
                onClick={() => setDifficulty(d.value)}
                className={`rounded-lg border p-3 text-left transition-all duration-aa ease-aa ${
                  difficulty === d.value
                    ? 'border-warm-black bg-warm-black text-warm-white'
                    : 'border-warm-line bg-warm-white/50 text-warm-ink hover:border-copper hover:text-copper-deep'
                }`}
              >
                <div className="text-sm font-medium">{d.label}</div>
                <div
                  className={`mt-0.5 text-xs ${difficulty === d.value ? 'text-warm-paper/70' : 'text-warm-mute'}`}
                >
                  {d.hint}
                </div>
              </button>
            ))}
          </div>
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
    </div>
  );
}
