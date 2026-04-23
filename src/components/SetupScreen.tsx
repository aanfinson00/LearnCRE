import { useEffect, useMemo, useState } from 'react';
import { templates, allKinds } from '../quiz/templates';
import type { QuestionKind, AnswerMode } from '../types/question';
import type { SessionConfig, TolerancePreset, LifetimeStats } from '../types/session';
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

const MODES: { label: string; value: AnswerMode; hint: string }[] = [
  { label: 'Free-form', value: 'free', hint: 'Type your answer; tolerance band applies.' },
  { label: 'Multiple choice', value: 'mc', hint: 'Pick 1 of 4; exact match only.' },
];

const TOLERANCES: { label: string; value: TolerancePreset; hint: string }[] = [
  { label: 'Strict', value: 'strict', hint: '~±3%' },
  { label: 'Normal', value: 'normal', hint: '~±5%' },
  { label: 'Loose', value: 'loose', hint: '~±10%' },
];

export function SetupScreen({ onStart }: Props) {
  const stored = useMemo(() => loadConfig(), []);
  const [categories, setCategories] = useState<Set<QuestionKind>>(
    new Set(stored?.categories ?? allKinds),
  );
  const [mode, setMode] = useState<AnswerMode>(stored?.mode ?? 'free');
  const [plannedCount, setPlannedCount] = useState<number | null>(
    stored?.plannedCount ?? 10,
  );
  const [tolerance, setTolerance] = useState<TolerancePreset>(stored?.tolerancePreset ?? 'normal');
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
    };
    saveConfig(config);
    onStart(config);
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6 py-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold text-slate-900">LearnCRE</h1>
        <p className="text-slate-600">
          Drill your intuition on how CRE underwriting assumptions move valuations and returns.
        </p>
      </header>

      <Card className="space-y-5">
        <div>
          <div className="mb-2 flex items-center justify-between">
            <h2 className="font-medium text-slate-900">Categories</h2>
            <div className="flex gap-1 text-xs">
              <button className="text-slate-500 hover:text-slate-900 underline decoration-dotted" onClick={selectAll}>
                All
              </button>
              <span className="text-slate-300">·</span>
              <button className="text-slate-500 hover:text-slate-900 underline decoration-dotted" onClick={selectValuation}>
                Valuation
              </button>
              <span className="text-slate-300">·</span>
              <button className="text-slate-500 hover:text-slate-900 underline decoration-dotted" onClick={selectReturns}>
                Returns
              </button>
              <span className="text-slate-300">·</span>
              <button className="text-slate-500 hover:text-slate-900 underline decoration-dotted" onClick={selectNone}>
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
                  className={`flex cursor-pointer items-start gap-3 rounded-lg border p-3 ${
                    on ? 'border-slate-900 bg-slate-50' : 'border-slate-200 bg-white hover:border-slate-400'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={on}
                    onChange={() => toggle(kind)}
                    className="mt-1 h-4 w-4 rounded border-slate-400 text-slate-900 focus:ring-slate-600"
                  />
                  <div className="flex-1 text-sm">
                    <div className="font-medium text-slate-900">
                      {t.label}
                      <span className="text-xs font-normal text-slate-400">{accText}</span>
                    </div>
                    <div className="text-slate-500">{t.description}</div>
                  </div>
                </label>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          <div>
            <h2 className="mb-2 font-medium text-slate-900">Length</h2>
            <div className="flex flex-wrap gap-2">
              {LENGTHS.map((l) => (
                <button
                  key={l.label}
                  type="button"
                  onClick={() => setPlannedCount(l.value)}
                  className={`rounded-md border px-3 py-1.5 text-sm ${
                    plannedCount === l.value
                      ? 'border-slate-900 bg-slate-900 text-white'
                      : 'border-slate-300 bg-white text-slate-700 hover:border-slate-500'
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h2 className="mb-2 font-medium text-slate-900">Answer mode</h2>
            <div className="flex flex-wrap gap-2">
              {MODES.map((m) => (
                <button
                  key={m.value}
                  type="button"
                  onClick={() => setMode(m.value)}
                  className={`rounded-md border px-3 py-1.5 text-sm ${
                    mode === m.value
                      ? 'border-slate-900 bg-slate-900 text-white'
                      : 'border-slate-300 bg-white text-slate-700 hover:border-slate-500'
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
            <div className="mt-1.5 text-xs text-slate-500">
              {MODES.find((m) => m.value === mode)?.hint}
            </div>
          </div>

          <div>
            <h2 className="mb-2 font-medium text-slate-900">Tolerance</h2>
            <div className="flex flex-wrap gap-2">
              {TOLERANCES.map((t) => (
                <button
                  key={t.value}
                  type="button"
                  onClick={() => setTolerance(t.value)}
                  className={`rounded-md border px-3 py-1.5 text-sm ${
                    tolerance === t.value
                      ? 'border-slate-900 bg-slate-900 text-white'
                      : 'border-slate-300 bg-white text-slate-700 hover:border-slate-500'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
            <div className="mt-1.5 text-xs text-slate-500">
              {TOLERANCES.find((t) => t.value === tolerance)?.hint}
              {mode === 'mc' ? ' (disabled in MC mode)' : ''}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="text-sm text-slate-500">
            {lifetime && lifetime.attempts > 0
              ? `Lifetime: ${lifetime.correct}/${lifetime.attempts} (${Math.round((lifetime.correct / lifetime.attempts) * 100)}%)`
              : 'No history yet — start drilling.'}
          </div>
          <Button disabled={!canStart} onClick={start}>
            Start <span className="ml-2 text-slate-400">↵</span>
          </Button>
        </div>
      </Card>

      <footer className="text-center text-xs text-slate-400">
        Enter submits. S skips. 1–4 picks MC choices.
      </footer>
    </div>
  );
}
