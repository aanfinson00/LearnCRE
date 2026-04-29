import { useMemo, useState } from 'react';
import {
  EXCEL_CATEGORIES,
  type ExcelRunConfig,
  type ExcelTemplate,
  type ExcelTemplateCategory,
} from '../excel/types';
import { filterTemplates } from '../excel/templates';
import { ROLES, type Role } from '../types/role';
import { Button } from './ui/Button';
import { Card } from './ui/Card';

interface Props {
  onStart: (config: ExcelRunConfig) => void;
  onBack: () => void;
}

const LENGTHS: ExcelRunConfig['length'][] = [3, 5, 10];
const DIFFICULTIES: { id: ExcelTemplate['difficulty'] | 'all'; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'beginner', label: 'Beginner' },
  { id: 'intermediate', label: 'Intermediate' },
  { id: 'advanced', label: 'Advanced' },
];

export function ExcelSetup({ onStart, onBack }: Props) {
  const [category, setCategory] = useState<ExcelTemplateCategory | 'all'>('all');
  const [difficulty, setDifficulty] = useState<ExcelTemplate['difficulty'] | 'all'>('all');
  const [role, setRole] = useState<Role | 'all'>('all');
  const [length, setLength] = useState<ExcelRunConfig['length']>(3);

  const matched = useMemo(
    () => filterTemplates({ category, difficulty, role }),
    [category, difficulty, role],
  );
  const canStart = matched.length > 0;

  return (
    <div className="mx-auto max-w-3xl space-y-6 py-10">
      <header className="flex items-start justify-between gap-6">
        <div className="space-y-2">
          <h1 className="display text-4xl text-warm-black">
            Excel<span className="text-copper">.</span>
          </h1>
          <p className="editorial text-lg text-warm-stone">
            Read the assumptions on the grid, write the formula in the target cell. Tests the
            spreadsheet muscles a junior analyst leans on every day — SUM, AVERAGE, IRR, PMT,
            chained arithmetic.
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
          <Pill active={category === 'all'} onClick={() => setCategory('all')}>
            All
          </Pill>
          {EXCEL_CATEGORIES.map((c) => (
            <Pill key={c.id} active={category === c.id} onClick={() => setCategory(c.id)}>
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

        <Section label="Length">
          {LENGTHS.map((n) => (
            <Pill key={n} active={length === n} onClick={() => setLength(n)}>
              {n} templates
            </Pill>
          ))}
        </Section>

        <div className="flex items-baseline justify-between border-t border-warm-line pt-4">
          <div className="font-mono text-xs text-warm-mute num">
            {matched.length} template{matched.length === 1 ? '' : 's'} match
            {canStart ? '' : ' — try widening filters'}
          </div>
          <Button onClick={() => canStart && onStart({ category, difficulty, length, role })} disabled={!canStart}>
            Start →
          </Button>
        </div>
      </Card>

      <Card className="bg-warm-paper/40 border-warm-line">
        <div className="text-xs font-medium uppercase tracking-widest text-warm-mute">
          Supported functions
        </div>
        <p className="mt-2 font-mono text-xs text-warm-ink num">
          + − × ÷ ^ parens · cell refs (A1, $A$1) · ranges (A1:A5) · SUM · AVERAGE · MIN ·
          MAX · ROUND · ABS · IF · PMT · PV · IPMT · PPMT · NPV · IRR
        </p>
        <p className="mt-2 text-xs text-warm-stone">
          Type formulas with or without a leading =. Click any data cell on the grid to insert
          its address; shift-click another to extend into a range. Live preview updates as you
          type — invalid formulas show ⚠ in the target cell.
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
