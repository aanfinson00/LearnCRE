import { useEffect, useMemo, useState } from 'react';
import type { VocabState } from '../types/vocab';
import { termById } from '../quiz/vocab';
import { Button } from './ui/Button';
import { Card } from './ui/Card';

interface Props {
  state: VocabState;
  onSubmit: (pickedIndex: number | null, skipped: boolean) => void;
  onAdvance: () => void;
  onFinish: () => void;
  onQuit: () => void;
}

export function VocabScreen({
  state,
  onSubmit,
  onAdvance,
  onFinish,
  onQuit,
}: Props) {
  const card = state.cards[state.currentIndex];
  const isTimed = state.config.mode === 'timed';
  const term = termById(card.termId);
  const lastAttempt = state.attempts[state.attempts.length - 1];
  const answered =
    !!lastAttempt && state.attempts.length === state.currentIndex + 1;

  // Tick a timer for timed mode display.
  const [now, setNow] = useState<number>(Date.now());
  useEffect(() => {
    if (!isTimed || !state.deadlineMs) return;
    const t = setInterval(() => setNow(Date.now()), 250);
    return () => clearInterval(t);
  }, [isTimed, state.deadlineMs]);
  const remainingMs = state.deadlineMs ? Math.max(0, state.deadlineMs - now) : 0;
  const remainingSec = Math.ceil(remainingMs / 1000);

  // In timed mode: auto-advance ~700ms after answer.
  useEffect(() => {
    if (!isTimed || !answered) return;
    const t = setTimeout(() => onAdvance(), 700);
    return () => clearTimeout(t);
  }, [isTimed, answered, onAdvance]);

  // Keyboard: 1-4 to pick, S to skip, Enter to advance after answer.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.repeat) return;
      const target = e.target as HTMLElement | null;
      const tag = target?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;
      if (!answered) {
        const n = Number(e.key);
        if (Number.isFinite(n) && n >= 1 && n <= card.options.length) {
          e.preventDefault();
          onSubmit(n - 1, false);
          return;
        }
        if (e.key.toLowerCase() === 's') {
          e.preventDefault();
          onSubmit(null, true);
        }
      } else if (e.key === 'Enter') {
        e.preventDefault();
        onAdvance();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [answered, card.options.length, onSubmit, onAdvance]);

  const stats = useMemo(() => {
    const counted = state.attempts.filter((a) => !a.skipped);
    const correct = counted.filter((a) => a.correct).length;
    return { correct, attempts: counted.length };
  }, [state.attempts]);

  const isLast = state.currentIndex === state.cards.length - 1;

  return (
    <div className="mx-auto max-w-3xl space-y-5 py-8">
      <header className="flex items-baseline justify-between gap-3">
        <div>
          <h1 className="display text-3xl text-warm-black">
            Vocab<span className="text-copper">.</span>
          </h1>
          <p className="font-mono text-[11px] uppercase tracking-widest text-warm-mute num">
            Card {state.currentIndex + 1} / {state.cards.length} ·{' '}
            {card.format === 'forward' ? 'term → def' : 'def → term'}
          </p>
        </div>
        <div className="flex items-center gap-3">
          {isTimed && (
            <div
              className={`font-mono text-sm num ${
                remainingSec <= 10 ? 'text-signal-bad-ink' : 'text-warm-ink'
              }`}
            >
              ⏱ {remainingSec}s
            </div>
          )}
          <div className="font-mono text-xs text-warm-mute num">
            {stats.correct}/{stats.attempts}
          </div>
          <Button variant="ghost" onClick={onQuit} className="text-xs">
            Quit
          </Button>
          {isTimed && (
            <Button variant="secondary" onClick={onFinish} className="text-xs">
              End
            </Button>
          )}
        </div>
      </header>

      {/* Progress bar */}
      <div className="flex gap-1">
        {state.cards.map((_, i) => {
          const att = state.attempts[i];
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
              key={i}
              className={`h-1.5 flex-1 rounded-full transition-all duration-aa ease-aa ${tone}`}
            />
          );
        })}
      </div>

      <Card className="space-y-4">
        <div className="text-xs font-medium uppercase tracking-widest text-warm-mute">
          {card.format === 'forward' ? 'Term' : 'Definition'}
        </div>
        <div
          className={
            card.format === 'forward'
              ? 'display text-3xl text-warm-black'
              : 'text-base leading-relaxed text-warm-ink'
          }
        >
          {card.prompt}
        </div>
      </Card>

      <div className="space-y-2.5">
        {card.options.map((opt, i) => {
          const picked = lastAttempt?.pickedIndex === i;
          const isCorrect = i === card.correctIndex;
          const showOutcome = answered;
          const tone = !showOutcome
            ? 'border-warm-line bg-warm-white/70 hover:border-copper/60'
            : isCorrect
              ? 'border-signal-good/60 bg-signal-good/10'
              : picked
                ? 'border-signal-bad/60 bg-signal-bad/10'
                : 'border-warm-line bg-warm-paper/40 opacity-80';
          return (
            <button
              key={i}
              type="button"
              disabled={answered}
              onClick={() => !answered && onSubmit(i, false)}
              className={`w-full rounded-lg border-2 p-3 text-left transition-all duration-aa ease-aa ${tone} ${
                answered ? 'cursor-default' : 'cursor-pointer'
              }`}
            >
              <div className="flex items-baseline gap-3">
                <span
                  className={`mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[10px] font-mono num ${
                    showOutcome && isCorrect
                      ? 'border-signal-good bg-signal-good text-warm-white'
                      : showOutcome && picked
                        ? 'border-signal-bad bg-signal-bad text-warm-white'
                        : 'border-warm-line text-warm-stone'
                  }`}
                >
                  {showOutcome ? (isCorrect ? '✓' : picked ? '✗' : i + 1) : i + 1}
                </span>
                <span
                  className={`text-sm leading-snug ${
                    showOutcome && isCorrect
                      ? 'text-signal-good-ink font-medium'
                      : 'text-warm-ink'
                  }`}
                >
                  {opt.text}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {!answered && (
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => onSubmit(null, true)}
            className="text-xs"
          >
            Skip
          </Button>
          <div className="font-mono text-[11px] text-warm-mute num">
            <span className="text-warm-stone">1–{card.options.length}</span> pick ·{' '}
            <span className="text-warm-stone">S</span> skip
          </div>
        </div>
      )}

      {/* Untimed: show explanation + Next */}
      {!isTimed && answered && term && (
        <Card className="space-y-2 border-copper/40 bg-copper/5">
          <div className="text-xs font-medium uppercase tracking-widest text-copper-ink">
            {term.term}
          </div>
          <p className="text-sm leading-relaxed text-warm-ink">{term.longDef}</p>
          {term.context && (
            <p className="border-t border-copper/30 pt-2 text-xs text-warm-stone">
              {term.context}
            </p>
          )}
          <div className="flex items-center justify-end pt-2">
            <Button onClick={onAdvance} className="text-xs">
              {isLast ? 'Finish' : 'Next →'}{' '}
              <span className="ml-2 text-warm-paper/60">↵</span>
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}
