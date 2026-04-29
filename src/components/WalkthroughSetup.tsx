import { useMemo, useState } from 'react';
import { walkthroughs } from '../quiz/walkthroughs';
import type { WalkthroughDef } from '../types/walkthrough';
import { ROLES, matchesRole, type Role } from '../types/role';
import { Button } from './ui/Button';
import { Card } from './ui/Card';

interface Props {
  onStart: (def: WalkthroughDef) => void;
  onBack: () => void;
}

export function WalkthroughSetup({ onStart, onBack }: Props) {
  const [role, setRole] = useState<Role | 'all'>('all');
  const visible = useMemo(
    () => walkthroughs.filter((w) => matchesRole(w.roles, role)),
    [role],
  );

  return (
    <div className="mx-auto max-w-3xl space-y-6 py-10">
      <header className="flex items-start justify-between gap-6">
        <div className="space-y-2">
          <h1 className="display text-4xl text-warm-black">
            Walkthroughs<span className="text-copper">.</span>
          </h1>
          <p className="editorial text-lg text-warm-stone">
            Decompose a deal into the chain of arithmetic steps that makes it. Submit each
            intermediate value before seeing the next — catches where reasoning breaks down.
          </p>
        </div>
        <Button variant="secondary" onClick={onBack} className="text-xs">
          ← Back
        </Button>
      </header>

      <div className="space-y-2">
        <div className="text-xs font-medium uppercase tracking-widest text-warm-stone">
          Position focus
        </div>
        <div className="flex flex-wrap gap-2">
          <RolePill active={role === 'all'} onClick={() => setRole('all')}>
            All
          </RolePill>
          {ROLES.map((r) => (
            <RolePill key={r.id} active={role === r.id} onClick={() => setRole(r.id)}>
              {r.label}
            </RolePill>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {visible.length === 0 && (
          <div className="rounded-lg border border-warm-line bg-warm-paper/40 p-4 text-sm text-warm-stone">
            No walkthroughs match this role yet — try All.
          </div>
        )}
        {visible.map((w) => (
          <button
            key={w.id}
            type="button"
            onClick={() => onStart(w)}
            className="group rounded-xl border border-warm-line bg-warm-white/70 p-5 text-left transition-all duration-aa ease-aa hover:border-copper hover:shadow-aa"
          >
            <div className="flex items-baseline justify-between">
              <div className="text-base font-medium text-warm-black">{w.label}</div>
              <span className="text-xs text-warm-mute group-hover:text-copper-deep transition-colors">
                {w.steps.length} steps →
              </span>
            </div>
            <div className="mt-1 text-sm text-warm-stone">{w.description}</div>
          </button>
        ))}
      </div>

      <Card className="bg-warm-paper/40 border-warm-line">
        <div className="text-xs font-medium uppercase tracking-widest text-warm-mute">
          Why walkthroughs
        </div>
        <p className="mt-2 text-sm text-warm-ink">
          A single quiz question hides where your error came from. Walkthroughs make each
          arithmetic step explicit so you see exactly which link in the chain is weak — then drill
          that link in the regular quiz.
        </p>
      </Card>
    </div>
  );
}

function RolePill({
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
