import { useMemo } from 'react';
import { MOCK_ARCHETYPES } from '../quiz/mockInterview';
import { loadMockInterviewRecords } from '../storage/mockInterview';
import { useProfile } from '../hooks/useProfile';
import type { MockArchetypeId } from '../types/mockInterview';
import { Button } from './ui/Button';
import { Card } from './ui/Card';

interface Props {
  onStart: (archetypeId: MockArchetypeId) => void;
  onBack: () => void;
}

const KIND_LABELS: Record<string, string> = {
  fit: 'Fit / opening',
  behavioral: 'Behavioral',
  technical: 'Technical (math)',
  situational: 'Situational case',
  longform: 'Long-form prose',
  marketView: 'Market view',
};

export function MockSetup({ onStart, onBack }: Props) {
  const { active } = useProfile();
  const records = useMemo(() => loadMockInterviewRecords(active.id), [active.id]);

  return (
    <div className="mx-auto max-w-3xl space-y-6 py-10">
      <header className="flex items-start justify-between gap-6">
        <div className="space-y-2">
          <h1 className="display text-4xl text-warm-black">
            Mock interview<span className="text-copper">.</span>
          </h1>
          <p className="editorial text-lg text-warm-stone">
            Simulated interview rounds in firm-archetype style. Mixed-mode questions —
            fit, behavioral, math drills, case judgment, deal-defense prose, market views.
            Self-graded against rubrics; the score breakdown shows where you\'re strong
            and where to drill more.
          </p>
        </div>
        <Button variant="secondary" onClick={onBack} className="text-xs">
          ← Back
        </Button>
      </header>

      <div className="grid grid-cols-1 gap-4">
        {MOCK_ARCHETYPES.map((spec) => {
          const kindCounts: Record<string, number> = {};
          for (const slot of spec.composition) {
            kindCounts[slot.kind] = (kindCounts[slot.kind] ?? 0) + 1;
          }
          const myAttempts = records.filter((r) => r.archetypeId === spec.id);
          const bestScore = myAttempts.length
            ? Math.max(...myAttempts.map((r) => r.totalScorePct))
            : null;
          const lastAttempt = myAttempts[myAttempts.length - 1];

          return (
            <Card key={spec.id} className="space-y-4">
              <div className="flex items-baseline justify-between gap-3">
                <div>
                  <div className="display text-2xl text-warm-black">{spec.title}</div>
                  <p className="mt-1 text-sm text-warm-stone">{spec.description}</p>
                </div>
                <div className="text-right text-xs text-warm-mute">
                  <div className="font-mono num">~{spec.durationMin} min</div>
                  <div className="font-mono num">{spec.composition.length} questions</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {Object.entries(kindCounts).map(([kind, n]) => (
                  <span
                    key={kind}
                    className="inline-flex items-center rounded-full border border-warm-line px-2 py-0.5 text-[11px] text-warm-stone"
                  >
                    {n}× {KIND_LABELS[kind] ?? kind}
                  </span>
                ))}
              </div>

              {myAttempts.length > 0 && (
                <div className="grid grid-cols-3 gap-3 border-t border-warm-line pt-3 text-xs">
                  <Stat label="Attempts" value={`${myAttempts.length}`} />
                  <Stat
                    label="Best score"
                    value={
                      bestScore != null ? `${Math.round(bestScore * 100)}%` : '—'
                    }
                  />
                  <Stat
                    label="Last"
                    value={
                      lastAttempt
                        ? `${Math.round(lastAttempt.totalScorePct * 100)}%`
                        : '—'
                    }
                  />
                </div>
              )}

              <div className="flex items-center justify-end border-t border-warm-line pt-3">
                <Button onClick={() => onStart(spec.id)} className="text-sm">
                  Start mock →
                </Button>
              </div>
            </Card>
          );
        })}
      </div>

      <Card className="space-y-2 border-warm-mute/40 bg-warm-paper/40">
        <div className="text-xs font-medium uppercase tracking-widest text-warm-stone">
          About the format
        </div>
        <ul className="list-disc space-y-1 pl-5 text-xs text-warm-ink">
          <li>
            <span className="font-medium">Self-graded prose</span> — for fit / behavioral / longform / market-view, you type an answer, then self-grade against the rubric. Model answer + tips appear after.
          </li>
          <li>
            <span className="font-medium">Auto-graded math</span> — technical and situational items are scored against canonical answers.
          </li>
          <li>
            <span className="font-medium">No skip penalty</span> — skipped questions don\'t count toward the rubric, but they\'re still tracked.
          </li>
          <li>
            <span className="font-medium">Run history</span> — past mocks are saved per profile; you can see score progression over time.
          </li>
        </ul>
      </Card>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md bg-warm-paper/50 p-2">
      <div className="text-[10px] uppercase tracking-widest text-warm-mute">
        {label}
      </div>
      <div className="mt-0.5 font-mono text-sm num text-warm-black">{value}</div>
    </div>
  );
}
