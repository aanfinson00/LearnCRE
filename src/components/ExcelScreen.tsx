import { useEffect, useMemo, useRef, useState } from 'react';
import type { ExcelState } from '../excel/types';
import { evaluatePreview } from '../hooks/useExcel';
import { ExcelGrid } from './ExcelGrid';
import { Button } from './ui/Button';
import { Card } from './ui/Card';

interface Props {
  state: ExcelState;
  onSubmit: (rawFormula: string, skipped: boolean) => void;
  onAdvance: () => void;
  onQuit: () => void;
}

export function ExcelScreen({ state, onSubmit, onAdvance, onQuit }: Props) {
  const t = state.templates[state.currentIndex];
  const lastAttempt = state.attempts[state.attempts.length - 1];
  const answered = lastAttempt?.templateId === t.id;
  const isLast = state.currentIndex === state.templates.length - 1;

  const [raw, setRaw] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setRaw('');
    if (!answered) inputRef.current?.focus();
  }, [t.id, answered]);

  const preview = useMemo(() => evaluatePreview(raw, t), [raw, t]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.repeat) return;
      const target = e.target as HTMLElement | null;
      const isInput = target?.tagName === 'INPUT' || target?.tagName === 'TEXTAREA';
      if (e.key === 'Enter' && answered) {
        e.preventDefault();
        onAdvance();
        return;
      }
      if (!answered && !isInput && e.key.toLowerCase() === 's') {
        e.preventDefault();
        onSubmit('', true);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [answered, onAdvance, onSubmit]);

  const handleSubmit = () => {
    if (raw.trim() === '') return;
    onSubmit(raw, false);
  };

  const reveal =
    answered && lastAttempt
      ? {
          expected: t.expected,
          submitted: lastAttempt.computedValue,
          correct: lastAttempt.correct,
        }
      : null;

  return (
    <div className="mx-auto max-w-3xl space-y-5 py-8">
      <div className="flex items-baseline justify-between">
        <div>
          <div className="display text-3xl text-warm-black">
            {t.title}
            <span className="text-copper">.</span>
          </div>
          <p className="font-mono text-[11px] uppercase tracking-widest text-warm-mute num">
            Template {state.currentIndex + 1} / {state.templates.length} · {t.category} ·{' '}
            {t.difficulty}
          </p>
        </div>
        <Button variant="ghost" onClick={onQuit} className="text-xs">
          Quit
        </Button>
      </div>

      <div className="flex gap-1">
        {state.templates.map((tt, i) => {
          const att = state.attempts.find((a) => a.templateId === tt.id);
          const isCurrent = i === state.currentIndex;
          const tone = att
            ? att.skipped
              ? 'bg-warm-line'
              : att.correct
                ? 'bg-signal-good'
                : 'bg-signal-bad'
            : isCurrent
              ? 'bg-copper'
              : 'bg-warm-line/60';
          return (
            <div
              key={tt.id}
              className={`h-1.5 flex-1 rounded-full transition-all duration-aa ease-aa ${tone}`}
            />
          );
        })}
      </div>

      <Card className="space-y-3">
        <p className="editorial text-base leading-relaxed text-warm-ink">{t.scenario}</p>
        <p className="text-sm font-medium text-warm-black">{t.instruction}</p>
      </Card>

      <ExcelGrid
        layout={t.layout}
        livePreview={preview.value}
        livePreviewError={preview.error !== null}
        reveal={reveal}
      />

      {!answered && (
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs text-warm-stone">
            <span className="font-mono text-warm-mute num">{t.targetCell}</span>
            <span>=</span>
          </div>
          <div className="flex items-stretch rounded-lg border border-warm-line bg-warm-white focus-within:border-copper">
            <span className="flex items-center px-3 font-mono text-warm-mute num">=</span>
            <input
              ref={inputRef}
              type="text"
              value={raw}
              spellCheck={false}
              autoComplete="off"
              autoCorrect="off"
              placeholder={`type a formula — e.g. ${t.exampleFormula.replace(/^=/, '')}`}
              onChange={(e) => setRaw(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleSubmit();
                }
              }}
              className="flex-1 bg-transparent px-2 py-2.5 font-mono text-sm outline-none num placeholder:text-warm-mute/70"
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="font-mono text-[11px] text-warm-mute num">
              {preview.error ? (
                <span className="text-signal-bad-ink">⚠ {preview.error}</span>
              ) : preview.value !== null ? (
                <span className="text-warm-stone">
                  Live: <span className="text-warm-black">{Number.isFinite(preview.value) ? preview.value.toLocaleString('en-US', { maximumFractionDigits: 4 }) : '—'}</span>
                </span>
              ) : (
                <span>start typing — preview updates live</span>
              )}
            </div>
            <div className="flex items-center gap-3">
              <Button variant="ghost" onClick={() => onSubmit('', true)} className="text-xs">
                Skip
              </Button>
              <Button onClick={handleSubmit} disabled={raw.trim() === ''}>
                Submit <span className="ml-2 text-warm-paper/60">↵</span>
              </Button>
            </div>
          </div>
        </div>
      )}

      {answered && lastAttempt && (
        <div className="space-y-3">
          <div
            className={`rounded-lg border-2 px-4 py-3 font-medium ${
              lastAttempt.skipped
                ? 'bg-warm-paper border-warm-line text-warm-ink'
                : lastAttempt.correct
                  ? 'bg-signal-good/10 border-signal-good/60 text-signal-good-ink'
                  : 'bg-signal-bad/10 border-signal-bad/60 text-signal-bad-ink'
            }`}
          >
            {lastAttempt.skipped
              ? 'Skipped'
              : lastAttempt.correct
                ? `Correct — within ${(((t.tolerancePct ?? 0.005) * 100)).toFixed(1)}% tolerance`
                : !lastAttempt.parsedOk
                  ? 'Formula didn\'t parse — see below'
                  : `Off by ${(lastAttempt.deltaPct * 100).toFixed(1)}%`}
          </div>

          {!lastAttempt.skipped && (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="rounded-md bg-warm-paper/50 p-3">
                <div className="text-xs uppercase tracking-wide text-warm-stone">Your formula</div>
                <div className="mt-1 font-mono text-sm num text-warm-black">
                  {lastAttempt.rawFormula || '—'}
                </div>
              </div>
              <div className="rounded-md bg-warm-paper/50 p-3">
                <div className="text-xs uppercase tracking-wide text-warm-stone">
                  Example formula
                </div>
                <div className="mt-1 font-mono text-sm num text-warm-black">
                  {t.exampleFormula}
                </div>
              </div>
            </div>
          )}

          <Card className="border-copper/40 bg-copper/10">
            <div className="text-xs font-medium uppercase tracking-widest text-copper-ink">
              Solution
            </div>
            <p className="editorial mt-2 text-base leading-relaxed text-warm-ink">{t.solution}</p>
          </Card>

          <Card className="bg-warm-paper/40 border-warm-line">
            <div className="text-xs font-medium uppercase tracking-widest text-warm-mute">
              Takeaway
            </div>
            <p className="mt-2 text-sm leading-relaxed text-warm-ink">{t.takeaway}</p>
          </Card>

          <div className="flex justify-end">
            <Button onClick={onAdvance}>
              {isLast ? 'See results' : 'Next template'}{' '}
              <span className="ml-2 text-warm-paper/60">↵</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
