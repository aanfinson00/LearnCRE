import { useMemo, useState } from 'react';
import { filterCases } from '../quiz/longform';
import type {
  LongformDifficulty,
  LongformRunConfig,
} from '../types/longform';
import { ROLES, type Role } from '../types/role';
import { Button } from './ui/Button';
import { Card } from './ui/Card';
import { ModePrimer } from './ModePrimer';

interface Props {
  onStart: (config: LongformRunConfig) => void;
  onBack: () => void;
}

const LENGTHS: LongformRunConfig['length'][] = [1, 3, 5];
const DIFFICULTIES: { id: LongformDifficulty | 'all'; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'beginner', label: 'Beginner' },
  { id: 'intermediate', label: 'Intermediate' },
  { id: 'advanced', label: 'Advanced' },
];

export function LongformSetup({ onStart, onBack }: Props) {
  const [difficulty, setDifficulty] = useState<LongformDifficulty | 'all'>('all');
  const [role, setRole] = useState<Role | 'all'>('all');
  const [length, setLength] = useState<LongformRunConfig['length']>(1);

  const matched = useMemo(
    () => filterCases({ difficulty, role }),
    [difficulty, role],
  );
  const canStart = matched.length > 0;

  return (
    <div className="mx-auto max-w-3xl space-y-6 py-10">
      <ModePrimer mode="longform" />
      <header className="flex items-start justify-between gap-6">
        <div className="space-y-2">
          <h1 className="display text-4xl text-warm-black">
            Case study<span className="text-copper">.</span>
          </h1>
          <p className="editorial text-lg text-warm-stone">
            Long-form prose answers, graded against a model answer + rubric. Practice
            articulating the right framing — not just picking the right multiple choice.
            Self-grade for v1; LLM auto-grading is on the roadmap.
          </p>
        </div>
        <Button variant="secondary" onClick={onBack} className="text-xs">
          ← Back
        </Button>
      </header>

      <Card className="space-y-5">
        <Section label="Position focus">
          <Pill active={role === 'all'} onClick={() => setRole('all')}>All</Pill>
          {ROLES.map((r) => (
            <Pill key={r.id} active={role === r.id} onClick={() => setRole(r.id)}>
              {r.label}
            </Pill>
          ))}
        </Section>

        <Section label="Difficulty">
          {DIFFICULTIES.map((d) => (
            <Pill key={d.id} active={difficulty === d.id} onClick={() => setDifficulty(d.id)}>
              {d.label}
            </Pill>
          ))}
        </Section>

        <Section label="Length">
          {LENGTHS.map((n) => (
            <Pill key={n} active={length === n} onClick={() => setLength(n)}>
              {n} case{n === 1 ? '' : 's'}
            </Pill>
          ))}
        </Section>

        <div className="flex items-baseline justify-between border-t border-warm-line pt-4">
          <div className="font-mono text-xs text-warm-mute num">
            {matched.length} case{matched.length === 1 ? '' : 's'} match
            {canStart ? '' : ' — try widening filters'}
          </div>
          <Button onClick={() => canStart && onStart({ difficulty, role, length })} disabled={!canStart}>
            Start →
          </Button>
        </div>
      </Card>

      <Card className="bg-warm-paper/40 border-warm-line">
        <div className="text-xs font-medium uppercase tracking-widest text-warm-mute">
          How grading works
        </div>
        <p className="mt-2 text-sm text-warm-ink">
          You write a prose answer (4-8 sentences typically). On submit, you see the
          model answer side-by-side with yours and a rubric of 4-6 dimensions. Score
          yourself 0-3 on each. The total scales to 100%; ≥70% counts as "correct" for
          session stats. Scores + your answers persist locally and can be exported via
          the feedback button for review.
        </p>
      </Card>
    </div>
  );
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <div className="text-xs font-medium uppercase tracking-widest text-warm-stone">
        {label}
      </div>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

function Pill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-3 py-1.5 text-xs transition-colors duration-aa ease-aa ${
        active
          ? 'border-copper bg-copper/10 text-copper-deep'
          : 'border-warm-line bg-warm-white/70 text-warm-ink hover:border-copper/60 hover:text-copper-deep'
      }`}
    >
      {children}
    </button>
  );
}
