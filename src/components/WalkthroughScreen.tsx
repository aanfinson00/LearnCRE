import { useEffect, useRef, useState } from 'react';
import type { WalkthroughState } from '../types/walkthrough';
import {
  formatBps,
  formatPctChange,
  formatUsd,
} from '../math/rounding';
import { parseInput } from '../quiz/parseInput';
import { useRegisterFeedbackContext } from '../hooks/useFeedbackContext';
import { Button } from './ui/Button';
import { Card } from './ui/Card';

interface Props {
  state: WalkthroughState;
  onSubmit: (input: number | null, skipped: boolean) => void;
  onAdvance: () => void;
  onQuit: () => void;
}

export function WalkthroughScreen({ state, onSubmit, onAdvance, onQuit }: Props) {
  const [raw, setRaw] = useState('');
  const [showHint, setShowHint] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const step = state.def.steps[state.currentStep];
  const lastAttempt = state.attempts[state.attempts.length - 1];
  // Step is "answered" when its attempt is the most recent and matches stepId
  const stepAnswered = lastAttempt?.stepId === step.id;
  const isLast = state.currentStep === state.def.steps.length - 1;

  useEffect(() => {
    setRaw('');
    setShowHint(false);
    if (!stepAnswered) inputRef.current?.focus();
  }, [step.id, stepAnswered]);

  // Register the active step in the feedback context.
  useRegisterFeedbackContext({
    mode: 'walkthrough',
    itemId: `${state.def.id}#${step.id}`,
    kind: state.def.kind,
    label: `${state.def.label} — ${step.label}`,
    prompt: step.prompt,
  });

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && stepAnswered) {
        e.preventDefault();
        onAdvance();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [stepAnswered, onAdvance]);

  const submitFree = () => {
    const parsed = parseInput(raw, step.unit);
    if (parsed === null) return;
    onSubmit(parsed, false);
  };

  const skip = () => onSubmit(null, true);

  const formatExpected = (v: number) => {
    switch (step.unit) {
      case 'bps':
        return formatBps(v / 10_000);
      case 'pct':
      case 'pctChange':
        return `${(v * 100).toFixed(2)}%`;
      case 'multiple':
        return `${v.toFixed(2)}x`;
      case 'usdPerSf':
        return `$${v.toFixed(2)}/SF`;
      default:
        return formatUsd(v);
    }
  };

  return (
    <div className="mx-auto max-w-3xl space-y-5 py-8">
      <div className="flex items-baseline justify-between">
        <div>
          <div className="display text-3xl text-warm-black">
            {state.def.label}
            <span className="text-copper">.</span>
          </div>
          <p className="editorial mt-1 text-base text-warm-stone">
            {state.def.description}
          </p>
        </div>
        <Button variant="ghost" onClick={onQuit} className="text-xs">
          Quit
        </Button>
      </div>

      <Card>
        <p className="text-sm leading-relaxed text-warm-ink">{state.def.setupNarrative}</p>
      </Card>

      <div className="flex gap-2">
        {state.def.steps.map((s, i) => {
          const att = state.attempts.find((a) => a.stepId === s.id);
          const isCurrent = i === state.currentStep;
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
            <div key={s.id} className="flex-1 space-y-1">
              <div className={`h-1.5 rounded-full transition-all duration-aa ease-aa ${tone}`} />
              <div className="font-mono text-[10px] text-warm-mute num">Step {i + 1}</div>
            </div>
          );
        })}
      </div>

      <Card className="space-y-4">
        <div>
          <div className="text-xs font-medium uppercase tracking-widest text-warm-stone">
            {step.label}
          </div>
          <p className="mt-2 text-lg leading-relaxed text-warm-black">{step.prompt}</p>
        </div>

        {!stepAnswered && (
          <div className="space-y-3">
            <div className="flex items-stretch rounded-lg border border-warm-line bg-warm-white focus-within:border-copper">
              <input
                ref={inputRef}
                type="text"
                inputMode="decimal"
                value={raw}
                placeholder={
                  step.unit === 'bps'
                    ? 'e.g. 720'
                    : step.unit === 'pct' || step.unit === 'pctChange'
                      ? 'e.g. 12.5'
                      : step.unit === 'usdPerSf'
                        ? 'e.g. 22.50'
                        : 'e.g. 4750000'
                }
                onChange={(e) => setRaw(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    submitFree();
                  }
                }}
                className="flex-1 bg-transparent px-3 py-2.5 font-mono outline-none num placeholder:text-warm-mute/70"
              />
            </div>
            {step.hint && (
              <button
                type="button"
                onClick={() => setShowHint((v) => !v)}
                className="text-xs text-warm-stone underline decoration-dotted hover:text-copper"
              >
                {showHint ? 'Hide hint' : 'Show hint'}
              </button>
            )}
            {showHint && step.hint && (
              <div className="rounded-md border border-copper/40 bg-copper/10 p-3 text-sm text-warm-ink">
                {step.hint}
              </div>
            )}
            <div className="flex items-center justify-between">
              <Button variant="ghost" onClick={skip} className="text-xs">
                Skip
              </Button>
              <Button onClick={submitFree} disabled={parseInput(raw, step.unit) === null}>
                Submit <span className="ml-2 text-warm-paper/60">↵</span>
              </Button>
            </div>
          </div>
        )}

        {stepAnswered && lastAttempt && (
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
                  ? `Correct (within ${formatPctChange(Math.abs(lastAttempt.deltaPct))})`
                  : `Off by ${formatPctChange(lastAttempt.deltaPct)}`}
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-md bg-warm-paper/50 p-3">
                <div className="text-xs uppercase tracking-wide text-warm-stone">Your answer</div>
                <div className="mt-1 font-mono text-lg num">
                  {lastAttempt.userInput === null ? '—' : formatExpected(lastAttempt.userInput)}
                </div>
              </div>
              <div className="rounded-md bg-warm-paper/50 p-3">
                <div className="text-xs uppercase tracking-wide text-warm-stone">Correct</div>
                <div className="mt-1 font-mono text-lg num">{formatExpected(step.expected)}</div>
              </div>
            </div>
            <div className="rounded-md border border-warm-line bg-warm-paper/40 p-3 text-sm text-warm-ink">
              {step.resultDescription}
            </div>
            <div className="flex justify-end">
              <Button onClick={onAdvance}>
                {isLast ? 'See takeaway' : 'Next step'}{' '}
                <span className="ml-2 text-warm-paper/60">↵</span>
              </Button>
            </div>
          </div>
        )}
      </Card>

      <div className="text-center font-mono text-[11px] text-warm-mute num">
        {stepAnswered ? (
          <>
            <span className="text-warm-stone">↵</span> {isLast ? 'see takeaway' : 'next step'}
          </>
        ) : (
          <>
            <span className="text-warm-stone">↵</span> submit
          </>
        )}
      </div>
    </div>
  );
}
