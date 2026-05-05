import { useMemo } from 'react';
import { buildSheet } from '../excel/modelingTest/grade';
import type {
  CheckpointResult,
  ModelingTestState,
  OutputResult,
} from '../types/modelingTest';
import { ModelingTestGrid } from './ModelingTestGrid';
import { Button } from './ui/Button';
import { Card } from './ui/Card';

interface Props {
  state: ModelingTestState;
  onTryAgain: () => void;
  onPickAnother: () => void;
}

function formatExpected(o: { format?: string; expected: number }): string {
  switch (o.format) {
    case 'usd':
      return `$${o.expected.toLocaleString('en-US', { maximumFractionDigits: 0 })}`;
    case 'pct':
      return `${(o.expected * 100).toFixed(2)}%`;
    case 'multiple':
      return `${o.expected.toFixed(2)}x`;
    case 'years':
      return `${o.expected.toFixed(1)} yrs`;
    case 'bps':
      return `${Math.round(o.expected * 10_000)} bps`;
    default:
      return o.expected.toLocaleString('en-US', { maximumFractionDigits: 2 });
  }
}

function formatComputed(o: {
  format?: string;
  computed: number | null;
}): string {
  if (o.computed === null) return '—';
  return formatExpected({ format: o.format, expected: o.computed });
}

export function ModelingTestResults({ state, onTryAgain, onPickAnother }: Props) {
  const { template, formulas, result } = state;
  const { sheet, parseErrors } = useMemo(
    () => buildSheet(template, formulas),
    [template, formulas],
  );
  const outputRefs = useMemo(
    () => new Set(template.outputs.map((o) => o.ref)),
    [template],
  );

  if (!result) return null;

  const failedOutputRefs = new Set(
    result.outputs.filter((o) => o.grade !== 'pass').map((o) => o.ref),
  );
  const surfacedCheckpoints = result.checkpoints.filter((cp) => {
    if (cp.grade === 'pass') return false;
    if (failedOutputRefs.size === 0) return false;
    if (!cp.explains) return true;
    return cp.explains.some((ref) => failedOutputRefs.has(ref));
  });

  return (
    <div className="mx-auto max-w-5xl space-y-6 py-10">
      <header className="flex flex-wrap items-baseline justify-between gap-3">
        <div>
          <div className="display text-3xl text-warm-black">
            Results<span className="text-copper">.</span>
          </div>
          <p className="font-mono text-[11px] uppercase tracking-widest text-warm-mute num">
            {template.title}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" onClick={onPickAnother} className="text-xs">
            Pick another template
          </Button>
          <Button onClick={onTryAgain}>Try again</Button>
        </div>
      </header>

      <Card
        className={`flex items-baseline justify-between gap-4 ${
          result.passed
            ? 'border-signal-good/60 bg-signal-good/10'
            : 'border-signal-bad/60 bg-signal-bad/10'
        }`}
      >
        <div>
          <div
            className={`text-2xl font-medium ${
              result.passed ? 'text-signal-good-ink' : 'text-signal-bad-ink'
            }`}
          >
            {result.passed ? 'Pass' : 'Did not pass'}
          </div>
          <div className="mt-1 font-mono text-[11px] uppercase tracking-widest text-warm-mute num">
            {result.outputsCorrect} / {result.outputsTotal} output cells correct
          </div>
        </div>
      </Card>

      <section className="space-y-3">
        <div className="font-mono text-[11px] uppercase tracking-widest text-warm-mute num">
          Outputs
        </div>
        <div className="space-y-2">
          {result.outputs.map((o) => (
            <OutputRow key={o.ref} output={o} />
          ))}
        </div>
      </section>

      {surfacedCheckpoints.length > 0 && (
        <section className="space-y-3">
          <div className="font-mono text-[11px] uppercase tracking-widest text-warm-mute num">
            Diagnostics
          </div>
          <div className="space-y-2">
            {surfacedCheckpoints.map((cp) => (
              <CheckpointRow key={cp.ref} checkpoint={cp} />
            ))}
          </div>
        </section>
      )}

      <section className="space-y-3">
        <div className="font-mono text-[11px] uppercase tracking-widest text-warm-mute num">
          Your sheet
        </div>
        <ModelingTestGrid
          layout={template.layout}
          sheet={sheet}
          parseErrors={parseErrors}
          outputRefs={outputRefs}
          focusRef={null}
          onTargetClick={() => {}}
          onInsertClick={() => {}}
          reveal={result}
        />
      </section>

      <Card className="bg-warm-paper/40 border-warm-line space-y-2">
        <div className="font-mono text-[10px] uppercase tracking-widest text-warm-mute">
          Rubric
        </div>
        <p className="text-sm leading-relaxed text-warm-ink">{template.rubric}</p>
      </Card>
    </div>
  );
}

function OutputRow({ output: o }: { output: OutputResult }) {
  const tone =
    o.grade === 'pass'
      ? 'border-signal-good/40 bg-signal-good/5'
      : o.grade === 'missing'
        ? 'border-warm-line bg-warm-paper/40'
        : 'border-signal-bad/40 bg-signal-bad/5';
  const badge =
    o.grade === 'pass'
      ? { label: '✓', cls: 'bg-signal-good/15 text-signal-good-ink' }
      : o.grade === 'missing'
        ? { label: '—', cls: 'bg-warm-paper text-warm-mute' }
        : { label: '✗', cls: 'bg-signal-bad/15 text-signal-bad-ink' };
  return (
    <div className={`rounded-lg border px-4 py-3 ${tone}`}>
      <div className="flex items-baseline justify-between gap-3">
        <div>
          <div className="text-sm font-medium text-warm-black">{o.label}</div>
          <div className="mt-0.5 font-mono text-[10px] uppercase tracking-widest text-warm-mute num">
            cell {o.ref}
          </div>
        </div>
        <span
          className={`rounded-full px-2 py-0.5 font-mono text-[10px] num ${badge.cls}`}
        >
          {badge.label}
        </span>
      </div>
      <div className="mt-2 grid grid-cols-2 gap-3 font-mono text-xs num">
        <div>
          <div className="text-warm-mute">Your value</div>
          <div className="text-warm-black">{formatComputed(o)}</div>
        </div>
        <div>
          <div className="text-warm-mute">Expected</div>
          <div className="text-warm-black">{formatExpected(o)}</div>
        </div>
      </div>
      {o.rawFormula && (
        <div className="mt-2 font-mono text-[11px] num">
          <span className="text-warm-mute">Your formula: </span>
          <span className="text-warm-stone">{o.rawFormula}</span>
        </div>
      )}
      {o.parseError && (
        <div className="mt-1 font-mono text-[11px] text-signal-bad-ink num">
          ⚠ {o.parseError}
        </div>
      )}
      {o.grade !== 'pass' && (
        <div className="mt-2 text-xs leading-relaxed text-warm-stone">
          <span className="font-medium text-warm-ink">Try: </span>
          {o.whenWrongTry}
        </div>
      )}
    </div>
  );
}

function CheckpointRow({ checkpoint: cp }: { checkpoint: CheckpointResult }) {
  return (
    <div className="rounded-lg border border-copper/40 bg-copper/5 px-4 py-3">
      <div className="flex items-baseline justify-between gap-3">
        <div>
          <div className="text-sm font-medium text-warm-black">{cp.label}</div>
          <div className="mt-0.5 font-mono text-[10px] uppercase tracking-widest text-warm-mute num">
            cell {cp.ref}
          </div>
        </div>
        <span className="rounded-full bg-copper/15 px-2 py-0.5 font-mono text-[10px] text-copper-deep num">
          checkpoint
        </span>
      </div>
      <div className="mt-2 grid grid-cols-2 gap-3 font-mono text-xs num">
        <div>
          <div className="text-warm-mute">Your value</div>
          <div className="text-warm-black">{formatComputed(cp)}</div>
        </div>
        <div>
          <div className="text-warm-mute">Expected</div>
          <div className="text-warm-black">{formatExpected(cp)}</div>
        </div>
      </div>
      <div className="mt-2 text-xs leading-relaxed text-warm-stone">
        {cp.diagnostic}
      </div>
    </div>
  );
}
