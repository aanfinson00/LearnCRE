import { useMemo, useState } from 'react';
import {
  SITUATIONAL_CATEGORIES,
  type SituationalCategory,
  type SituationalDifficulty,
  type SituationalRunConfig,
} from '../types/situational';
import { filterCases } from '../quiz/situational';
import { assetClassOrder, assetClasses, type AssetClass } from '../quiz/assetClasses';
import { ROLES, type Role } from '../types/role';
import { Button } from './ui/Button';
import { Card } from './ui/Card';

interface Props {
  onStart: (config: SituationalRunConfig) => void;
  onBack: () => void;
}

const LENGTHS: SituationalRunConfig['length'][] = [5, 10, 20];
const DIFFICULTIES: { id: SituationalDifficulty | 'all'; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'beginner', label: 'Beginner' },
  { id: 'intermediate', label: 'Intermediate' },
  { id: 'advanced', label: 'Advanced' },
];

export function SituationalSetup({ onStart, onBack }: Props) {
  const [category, setCategory] = useState<SituationalCategory | 'all'>('all');
  const [difficulty, setDifficulty] = useState<SituationalDifficulty | 'all'>('all');
  const [assetClass, setAssetClass] = useState<AssetClass>('mixed');
  const [role, setRole] = useState<Role | 'all'>('all');
  const [length, setLength] = useState<SituationalRunConfig['length']>(5);

  const matchedPool = useMemo(
    () => filterCases({ category, difficulty, assetClass, role }),
    [category, difficulty, assetClass, role],
  );
  const canStart = matchedPool.length > 0;

  const handleStart = () => {
    if (!canStart) return;
    onStart({ category, difficulty, assetClass, length, role });
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6 py-10">
      <header className="flex items-start justify-between gap-6">
        <div className="space-y-2">
          <h1 className="display text-4xl text-warm-black">
            Situational<span className="text-copper">.</span>
          </h1>
          <p className="editorial text-lg text-warm-stone">
            Read a short scenario, pick the most-defensible answer. Less mental math, more
            reasoning — why a deal looks the way it does, and what to do about it.
          </p>
        </div>
        <Button variant="secondary" onClick={onBack} className="text-xs">
          ← Back
        </Button>
      </header>

      <Card className="space-y-5">
        <Section label="Position focus">
          <Pill active={role === 'all'} onClick={() => setRole('all')}>
            All
          </Pill>
          {ROLES.map((r) => (
            <Pill key={r.id} active={role === r.id} onClick={() => setRole(r.id)}>
              {r.label}
            </Pill>
          ))}
        </Section>

        <Section label="Category">
          <Pill
            active={category === 'all'}
            onClick={() => setCategory('all')}
          >
            All
          </Pill>
          {SITUATIONAL_CATEGORIES.map((c) => (
            <Pill
              key={c.id}
              active={category === c.id}
              onClick={() => setCategory(c.id)}
            >
              {c.label}
            </Pill>
          ))}
        </Section>

        <Section label="Difficulty">
          {DIFFICULTIES.map((d) => (
            <Pill
              key={d.id}
              active={difficulty === d.id}
              onClick={() => setDifficulty(d.id)}
            >
              {d.label}
            </Pill>
          ))}
        </Section>

        <Section label="Asset class">
          {assetClassOrder.map((ac) => (
            <Pill
              key={ac}
              active={assetClass === ac}
              onClick={() => setAssetClass(ac)}
            >
              {assetClasses[ac].label}
            </Pill>
          ))}
        </Section>

        <Section label="Length">
          {LENGTHS.map((n) => (
            <Pill key={n} active={length === n} onClick={() => setLength(n)}>
              {n} cases
            </Pill>
          ))}
        </Section>

        <div className="flex items-baseline justify-between border-t border-warm-line pt-4">
          <div className="font-mono text-xs text-warm-mute num">
            {matchedPool.length} case{matchedPool.length === 1 ? '' : 's'} match
            {canStart ? '' : ' — try widening filters'}
          </div>
          <Button onClick={handleStart} disabled={!canStart}>
            Start →
          </Button>
        </div>
      </Card>

      <Card className="bg-warm-paper/40 border-warm-line">
        <div className="text-xs font-medium uppercase tracking-widest text-warm-mute">
          How this differs from the quiz
        </div>
        <p className="mt-2 text-sm text-warm-ink">
          Quiz questions test the math. Situational tests the judgment that comes after — why
          a number looks off, which comp belongs in the set, what an aggressive proforma is
          really telling you. Each option has a written explanation, including why the wrong
          ones look plausible.
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
