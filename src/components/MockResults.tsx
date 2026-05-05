import { useMemo } from 'react';
import type { MockInterviewState } from '../types/mockInterview';
import { aggregateMockScore } from '../quiz/mockInterview';
import { Button } from './ui/Button';
import { Card } from './ui/Card';

interface Props {
  state: MockInterviewState;
  onRestart: () => void;
  onNewSetup: () => void;
}

const KIND_LABELS: Record<string, string> = {
  fit: 'Fit',
  behavioral: 'Behavioral',
  technical: 'Technical',
  situational: 'Situational',
  longform: 'Long-form',
  marketView: 'Market view',
};

export function MockResults({ state, onRestart, onNewSetup }: Props) {
  const score = useMemo(() => aggregateMockScore(state.attempts), [state.attempts]);
  const durationSec = Math.round((Date.now() - state.startedAt) / 1000);
  const counted = state.attempts.filter((a) => !a.skipped);
  const skipped = state.attempts.length - counted.length;

  return (
    <div className="mx-auto max-w-3xl space-y-5 py-10">
      <header className="space-y-2">
        <h1 className="display text-4xl text-warm-black">
          Mock Interview — Results
          <span className="text-copper">.</span>
        </h1>
        <p className="font-mono text-[11px] uppercase tracking-widest text-warm-mute num">
          {state.spec.title} · {Math.floor(durationSec / 60)}:
          {(durationSec % 60).toString().padStart(2, '0')}
        </p>
      </header>

      <Card
        className={`space-y-3 ${
          score.totalScorePct >= 0.75
            ? 'border-signal-good/40 bg-signal-good/5'
            : score.totalScorePct >= 0.5
              ? ''
              : 'border-signal-bad/30 bg-signal-bad/5'
        }`}
      >
        <div className="flex items-baseline justify-between gap-3">
          <div>
            <div className="text-xs font-medium uppercase tracking-widest text-warm-mute">
              Aggregate score
            </div>
            <div className="display text-4xl text-warm-black">
              {Math.round(score.totalScorePct * 100)}%
            </div>
            <div className="font-mono text-[11px] text-warm-mute num">
              {counted.length} answered · {skipped} skipped · {state.questions.length}{' '}
              total
            </div>
          </div>
          <div className="text-right">
            <Button onClick={onRestart} className="text-xs">
              Retry →
            </Button>
          </div>
        </div>
      </Card>

      <Card className="space-y-3">
        <div className="text-xs font-medium uppercase tracking-widest text-warm-stone">
          Score by question type
        </div>
        <div className="space-y-2">
          {Object.entries(score.perKindScore).map(([kind, b]) => {
            const avg = b.count === 0 ? 0 : b.scoreSum / b.count;
            return (
              <div key={kind} className="space-y-0.5">
                <div className="flex items-baseline justify-between font-mono text-[11px] num">
                  <span className="text-warm-ink">{KIND_LABELS[kind] ?? kind}</span>
                  <span className="text-warm-stone">
                    {b.count} q · {Math.round(avg * 100)}%
                  </span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-warm-paper">
                  <div
                    className={`h-full rounded-full transition-all duration-aa-slow ease-aa ${
                      avg >= 0.75
                        ? 'bg-signal-good'
                        : avg >= 0.5
                          ? 'bg-copper'
                          : 'bg-signal-bad'
                    }`}
                    style={{ width: `${avg * 100}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      <Card className="space-y-3">
        <div className="text-xs font-medium uppercase tracking-widest text-warm-stone">
          Per-question detail
        </div>
        <div className="space-y-1.5 font-mono text-[11px] num">
          {state.attempts.map((a, i) => {
            const q = state.questions[i];
            const score =
              a.kind === 'technical' || a.kind === 'situational'
                ? a.correct
                  ? 1
                  : 0
                : a.scorePct;
            const marker = a.skipped
              ? '— skipped'
              : score >= 0.75
                ? '✓ strong'
                : score >= 0.5
                  ? '· decent'
                  : score >= 0.25
                    ? '· soft'
                    : '✗ weak';
            const tone = a.skipped
              ? 'text-warm-mute'
              : score >= 0.75
                ? 'text-signal-good-ink'
                : score >= 0.5
                  ? 'text-warm-ink'
                  : 'text-signal-bad-ink';
            return (
              <div
                key={i}
                className="flex items-baseline justify-between border-b border-dotted border-warm-line/60 py-1 last:border-0"
              >
                <span className="text-warm-stone">
                  Q{i + 1} · {q?.sectionLabel ?? a.kind}
                </span>
                <span className={tone}>
                  {Math.round(score * 100)}% {marker}
                </span>
              </div>
            );
          })}
        </div>
      </Card>

      <div className="flex items-center justify-between border-t border-warm-line pt-3">
        <Button variant="secondary" onClick={onNewSetup} className="text-xs">
          ← New setup
        </Button>
        <Button onClick={onRestart} className="text-xs">
          Run again →
        </Button>
      </div>
    </div>
  );
}
