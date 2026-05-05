import { useEffect, useState } from 'react';
import {
  MODELING_TEST_TEMPLATES,
  PLANNED_TEMPLATES,
} from '../excel/modelingTest/templates';
import { bestAttempt, loadDraft } from '../storage/modelingTest';
import type { ModelingTestTemplate } from '../types/modelingTest';
import { Button } from './ui/Button';
import { Card } from './ui/Card';
import { ModePrimer } from './ModePrimer';

interface Props {
  onOpen: (template: ModelingTestTemplate) => void;
  onBack: () => void;
}

interface TemplateStatus {
  hasDraft: boolean;
  bestPassed: boolean;
  bestScore: { correct: number; total: number } | null;
}

function loadStatus(t: ModelingTestTemplate): TemplateStatus {
  const draft = loadDraft(t.id);
  const best = bestAttempt(t.id);
  return {
    hasDraft: !!draft && Object.values(draft.formulas).some((f) => f.trim() !== ''),
    bestPassed: !!best?.result.passed,
    bestScore: best
      ? { correct: best.result.outputsCorrect, total: best.result.outputsTotal }
      : null,
  };
}

export function ModelingTestSetup({ onOpen, onBack }: Props) {
  const [statuses, setStatuses] = useState<Record<string, TemplateStatus>>({});

  useEffect(() => {
    const next: Record<string, TemplateStatus> = {};
    for (const t of MODELING_TEST_TEMPLATES) next[t.id] = loadStatus(t);
    setStatuses(next);
  }, []);

  return (
    <div className="mx-auto max-w-3xl space-y-6 py-10">
      <ModePrimer mode="modelingTest" />
      <header className="flex items-baseline justify-between gap-4">
        <div>
          <div className="display text-3xl text-warm-black">
            Modeling test<span className="text-copper">.</span>
          </div>
          <p className="font-mono text-[11px] uppercase tracking-widest text-warm-mute num">
            Take-home-style multi-cell exercises · graded on output cells
          </p>
        </div>
        <Button variant="ghost" onClick={onBack} className="text-xs">
          Back
        </Button>
      </header>

      <Card className="space-y-2 bg-copper/5 border-copper/30">
        <div className="font-mono text-[10px] uppercase tracking-widest text-copper-deep">
          How it works
        </div>
        <p className="text-sm leading-relaxed text-warm-ink">
          Each template hands you a partial model with assumptions filled in and target cells empty.
          Work through them in any order; auto-saves as you type. Submit when ready and you're graded
          on whether the designated <span className="text-copper-deep">output cells</span> hit their
          expected values within tolerance. Diagnostic checkpoints surface intermediate
          mistakes if your bottom-line numbers don't match.
        </p>
      </Card>

      <div className="space-y-3">
        {MODELING_TEST_TEMPLATES.map((t) => {
          const s = statuses[t.id];
          const ctaLabel = s?.hasDraft ? 'Resume' : s?.bestPassed ? 'Try again' : 'Start';
          return (
            <Card key={t.id} className="space-y-3">
              <div className="flex items-baseline justify-between gap-4">
                <div>
                  <div className="text-base font-medium text-warm-black">{t.title}</div>
                  <div className="mt-1 flex flex-wrap items-baseline gap-2 font-mono text-[10px] uppercase tracking-widest text-warm-mute num">
                    <span>{t.difficulty}</span>
                    <span>·</span>
                    <span>~{t.estimatedMinutes} min</span>
                    <span>·</span>
                    <span>
                      {t.outputs.length} outputs · {t.checkpoints.length} checkpoints
                    </span>
                  </div>
                </div>
                <StatusBadge status={s} />
              </div>
              <p className="text-sm leading-relaxed text-warm-ink">{t.scenario}</p>
              <div className="flex justify-end">
                <Button onClick={() => onOpen(t)}>{ctaLabel}</Button>
              </div>
            </Card>
          );
        })}

        {PLANNED_TEMPLATES.map((p) => (
          <Card
            key={p.id}
            className="space-y-2 border-dashed border-warm-line bg-warm-paper/30"
          >
            <div className="flex items-baseline justify-between gap-4">
              <div>
                <div className="text-base font-medium text-warm-stone">{p.title}</div>
                <div className="mt-1 font-mono text-[10px] uppercase tracking-widest text-warm-mute num">
                  {p.difficulty} · ~{p.estimatedMinutes} min · coming soon
                </div>
              </div>
              <span className="rounded-full border border-warm-line px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-warm-mute num">
                Planned
              </span>
            </div>
            <p className="text-sm leading-relaxed text-warm-stone">{p.description}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: TemplateStatus | undefined }) {
  if (!status) return null;
  if (status.bestPassed) {
    return (
      <span className="rounded-full bg-signal-good/15 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-signal-good-ink num">
        Passed
      </span>
    );
  }
  if (status.hasDraft) {
    return (
      <span className="rounded-full bg-copper/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-copper-deep num">
        In progress
      </span>
    );
  }
  if (status.bestScore && status.bestScore.correct > 0) {
    return (
      <span className="rounded-full border border-warm-line px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-warm-mute num">
        Best {status.bestScore.correct}/{status.bestScore.total}
      </span>
    );
  }
  return (
    <span className="rounded-full border border-warm-line px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-warm-mute num">
      Not started
    </span>
  );
}
