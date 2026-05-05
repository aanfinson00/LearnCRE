import { useMemo, useState } from 'react';
import {
  VOCAB_CATEGORIES,
  type VocabCategory,
  type VocabDifficulty,
  type VocabFormatChoice,
  type VocabRunConfig,
  type VocabRunMode,
} from '../types/vocab';
import { filterTerms } from '../quiz/vocab';
import { ROLES, type Role } from '../types/role';
import { Button } from './ui/Button';
import { Card } from './ui/Card';

interface Props {
  onStart: (config: VocabRunConfig) => void;
  onBack: () => void;
}

const DIFFICULTIES: { id: VocabDifficulty | 'all'; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'beginner', label: 'Beginner' },
  { id: 'intermediate', label: 'Intermediate' },
  { id: 'advanced', label: 'Advanced' },
];

const FORMATS: { id: VocabFormatChoice; label: string; hint: string }[] = [
  { id: 'forward', label: 'Forward', hint: 'Term shown; pick the definition.' },
  { id: 'reverse', label: 'Reverse', hint: 'Definition shown; pick the term.' },
  { id: 'mixed', label: 'Mixed', hint: 'Random mix of forward and reverse.' },
];

const MODES: { id: VocabRunMode; label: string; hint: string }[] = [
  { id: 'untimed', label: 'Flashcards', hint: 'Untimed; explanations after each.' },
  { id: 'timed', label: 'Timed drill', hint: 'Race the clock; auto-advance.' },
];

const LENGTHS: VocabRunConfig['length'][] = [10, 25, 50];
const TIME_LIMITS: VocabRunConfig['timeLimitSec'][] = [60, 120];

const pillBase =
  'rounded-md border px-3 py-1.5 text-sm transition-all duration-aa ease-aa';
const pillOn = 'border-warm-black bg-warm-black text-warm-white';
const pillOff =
  'border-warm-line bg-warm-white/70 text-warm-ink hover:border-copper hover:text-copper-deep';

export function VocabSetup({ onStart, onBack }: Props) {
  const [category, setCategory] = useState<VocabCategory | 'all'>('all');
  const [difficulty, setDifficulty] = useState<VocabDifficulty | 'all'>('all');
  const [format, setFormat] = useState<VocabFormatChoice>('mixed');
  const [mode, setMode] = useState<VocabRunMode>('untimed');
  const [length, setLength] = useState<VocabRunConfig['length']>(25);
  const [timeLimitSec, setTimeLimitSec] =
    useState<VocabRunConfig['timeLimitSec']>(60);
  const [role, setRole] = useState<Role | 'all'>('all');

  const matchedPool = useMemo(
    () => filterTerms({ category, difficulty, role }),
    [category, difficulty, role],
  );
  const canStart = matchedPool.length > 0;

  const handleStart = () => {
    if (!canStart) return;
    onStart({ category, difficulty, format, mode, length, timeLimitSec, role });
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6 py-10">
      <header className="flex items-start justify-between gap-6">
        <div className="space-y-2">
          <h1 className="display text-4xl text-warm-black">
            Vocab<span className="text-copper">.</span>
          </h1>
          <p className="editorial text-lg text-warm-stone">
            Industry terminology drilled flashcard-style. Forward (term → definition)
            or reverse (definition → term) — and timed for warm-ups, untimed for
            depth. Mastery tracked per term across sessions.
          </p>
        </div>
        <Button variant="secondary" onClick={onBack} className="text-xs">
          ← Back
        </Button>
      </header>

      <Card className="space-y-5">
        <Section label="Category">
          <Pill active={category === 'all'} onClick={() => setCategory('all')}>
            All
          </Pill>
          {VOCAB_CATEGORIES.map((c) => (
            <Pill
              key={c.id}
              active={category === c.id}
              onClick={() => setCategory(c.id)}
              hint={c.hint}
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

        <Section label="Format">
          {FORMATS.map((f) => (
            <Pill
              key={f.id}
              active={format === f.id}
              onClick={() => setFormat(f.id)}
              hint={f.hint}
            >
              {f.label}
            </Pill>
          ))}
        </Section>

        <Section label="Mode">
          {MODES.map((m) => (
            <Pill
              key={m.id}
              active={mode === m.id}
              onClick={() => setMode(m.id)}
              hint={m.hint}
            >
              {m.label}
            </Pill>
          ))}
        </Section>

        {mode === 'untimed' && (
          <Section label="Length">
            {LENGTHS.map((n) => (
              <Pill key={n} active={length === n} onClick={() => setLength(n)}>
                {n}
              </Pill>
            ))}
          </Section>
        )}

        {mode === 'timed' && (
          <Section label="Time limit">
            {TIME_LIMITS.map((t) => (
              <Pill
                key={t}
                active={timeLimitSec === t}
                onClick={() => setTimeLimitSec(t)}
              >
                {t}s
              </Pill>
            ))}
          </Section>
        )}

        <div className="flex items-center justify-between border-t border-warm-line pt-4">
          <div className="font-mono text-xs text-warm-mute num">
            {matchedPool.length} terms in pool
          </div>
          <Button onClick={handleStart} disabled={!canStart}>
            Start <span className="ml-2 text-warm-paper/60">↵</span>
          </Button>
        </div>
      </Card>
    </div>
  );
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="mb-2 text-xs font-medium uppercase tracking-widest text-warm-stone">
        {label}
      </h3>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

function Pill({
  active,
  onClick,
  children,
  hint,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={hint}
      className={`${pillBase} ${active ? pillOn : pillOff}`}
    >
      {children}
    </button>
  );
}
