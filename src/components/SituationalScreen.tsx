import { useEffect, useState } from 'react';
import { DOC_TYPE_LABELS, type SituationalState } from '../types/situational';
import { useRegisterFeedbackContext } from '../hooks/useFeedbackContext';
import { Button } from './ui/Button';
import { Card } from './ui/Card';

interface Props {
  state: SituationalState;
  onSubmit: (pickedIndex: number | null, skipped: boolean) => void;
  onAdvance: () => void;
  onQuit: () => void;
}

export function SituationalScreen({ state, onSubmit, onAdvance, onQuit }: Props) {
  const c = state.cases[state.currentIndex];
  const lastAttempt = state.attempts[state.attempts.length - 1];
  const answered = lastAttempt?.caseId === c.id;
  const isLast = state.currentIndex === state.cases.length - 1;

  const [hovered, setHovered] = useState<number | null>(null);

  useEffect(() => {
    setHovered(null);
  }, [c.id]);

  // Push the active case into feedback context so the floating feedback
  // button auto-attaches the right item.
  useRegisterFeedbackContext({
    mode: 'situational',
    itemId: c.id,
    kind: c.category,
    label: c.title,
    prompt: c.scenario,
    difficulty: c.difficulty,
  });

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.repeat) return;
      const target = e.target as HTMLElement | null;
      const tag = target?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;

      if (!answered) {
        const n = Number(e.key);
        if (Number.isFinite(n) && n >= 1 && n <= c.options.length) {
          e.preventDefault();
          onSubmit(n - 1, false);
          return;
        }
        if (e.key.toLowerCase() === 's') {
          e.preventDefault();
          onSubmit(null, true);
          return;
        }
      } else if (e.key === 'Enter') {
        e.preventDefault();
        onAdvance();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [answered, c.options.length, onSubmit, onAdvance]);

  return (
    <div className="mx-auto max-w-3xl space-y-5 py-8">
      <div className="flex items-baseline justify-between">
        <div>
          <div className="display text-3xl text-warm-black">
            {c.title}
            <span className="text-copper">.</span>
          </div>
          <p className="font-mono text-[11px] uppercase tracking-widest text-warm-mute num">
            Case {state.currentIndex + 1} / {state.cases.length} · {c.category} ·{' '}
            {c.difficulty}
          </p>
        </div>
        <Button variant="ghost" onClick={onQuit} className="text-xs">
          Quit
        </Button>
      </div>

      <div className="flex gap-1">
        {state.cases.map((cs, i) => {
          const att = state.attempts.find((a) => a.caseId === cs.id);
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
              key={cs.id}
              className={`h-1.5 flex-1 rounded-full transition-all duration-aa ease-aa ${tone}`}
            />
          );
        })}
      </div>

      <Card className="space-y-4">
        {c.documentExcerpt && (
          <div className="overflow-hidden rounded-lg border border-warm-line bg-warm-paper/60">
            <div className="flex items-baseline justify-between border-b border-warm-line px-3 py-1.5 text-[10px] font-medium uppercase tracking-widest text-warm-mute">
              <span>{DOC_TYPE_LABELS[c.documentExcerpt.docType]}</span>
              {c.documentExcerpt.label && (
                <span className="text-warm-stone normal-case tracking-normal">
                  {c.documentExcerpt.label}
                </span>
              )}
            </div>
            <pre className="whitespace-pre-wrap p-3 font-mono text-xs leading-relaxed text-warm-ink">
              {c.documentExcerpt.text}
            </pre>
          </div>
        )}
        <p className="editorial text-base leading-relaxed text-warm-ink">{c.scenario}</p>
        {c.data && c.data.length > 0 && (
          <div className="grid grid-cols-1 gap-x-6 gap-y-1 rounded-lg border border-warm-line bg-warm-paper/40 p-3 sm:grid-cols-2">
            {c.data.map((d, i) => (
              <div
                key={i}
                className="flex items-baseline justify-between border-b border-dotted border-warm-line/60 py-1 last:border-0"
              >
                <span className="text-xs text-warm-stone">{d.label}</span>
                <span className="font-mono text-xs text-warm-black num">{d.value}</span>
              </div>
            ))}
          </div>
        )}
        <p className="text-base font-medium text-warm-black">{c.question}</p>
      </Card>

      <div className="space-y-2.5">
        {c.options.map((opt, i) => {
          const picked = lastAttempt?.pickedIndex === i;
          const showOutcome = answered;
          const tone = !showOutcome
            ? hovered === i
              ? 'border-copper bg-copper/5'
              : 'border-warm-line bg-warm-white/70 hover:border-copper/60'
            : opt.isBest
              ? 'border-copper bg-copper/15'
              : picked
                ? 'border-signal-bad/60 bg-signal-bad/10'
                : 'border-warm-line bg-warm-paper/40 opacity-80';
          return (
            <button
              key={i}
              type="button"
              disabled={answered}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => !answered && onSubmit(i, false)}
              className={`w-full rounded-lg border-2 p-4 text-left transition-all duration-aa ease-aa ${tone} ${answered ? 'cursor-default' : 'cursor-pointer'}`}
            >
              <div className="flex items-baseline gap-3">
                <span
                  className={`mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[10px] font-mono num ${
                    showOutcome && opt.isBest
                      ? 'border-copper bg-copper text-warm-white'
                      : showOutcome && picked
                        ? 'border-signal-bad bg-signal-bad text-warm-white'
                        : 'border-warm-line text-warm-stone'
                  }`}
                >
                  {showOutcome ? (opt.isBest ? '✓' : picked ? '✗' : i + 1) : i + 1}
                </span>
                <span
                  className={`text-sm leading-snug ${
                    showOutcome && opt.isBest
                      ? 'text-copper-deep font-medium'
                      : 'text-warm-ink'
                  }`}
                >
                  {opt.label}
                </span>
              </div>
              {showOutcome && (
                <div
                  className={`mt-2.5 ml-8 text-[13px] leading-relaxed ${
                    opt.isBest ? 'text-warm-ink' : 'text-warm-stone'
                  }`}
                >
                  {opt.explanation}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {!answered && (
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={() => onSubmit(null, true)} className="text-xs">
            Skip
          </Button>
          <div className="font-mono text-[11px] text-warm-mute num">
            <span className="text-warm-stone">1–{c.options.length}</span> pick ·{' '}
            <span className="text-warm-stone">S</span> skip
          </div>
        </div>
      )}

      {answered && (
        <Card className="border-copper/40 bg-copper/10">
          <div className="text-xs font-medium uppercase tracking-widest text-copper-ink">
            Takeaway
          </div>
          <p className="editorial mt-2 text-base leading-relaxed text-warm-ink">
            {c.takeaway}
          </p>
          {c.tips.length > 0 && (
            <ul className="mt-3 space-y-1 border-t border-copper/30 pt-3">
              {c.tips.map((t, i) => (
                <li key={i} className="text-xs text-warm-stone">
                  · {t}
                </li>
              ))}
            </ul>
          )}
        </Card>
      )}

      {answered && (
        <div className="flex justify-end">
          <Button onClick={onAdvance}>
            {isLast ? 'See results' : 'Next case'}{' '}
            <span className="ml-2 text-warm-paper/60">↵</span>
          </Button>
        </div>
      )}
    </div>
  );
}
