import { templates } from '../quiz/templates';
import type { QuestionKind } from '../types/question';
import type { SessionConfig, SessionStats } from '../types/session';
import { Button } from './ui/Button';
import { Card } from './ui/Card';

interface Props {
  stats: SessionStats;
  config: SessionConfig;
  onRestart: () => void;
  onNewSetup: () => void;
  onReview: () => void;
  onRetryMistakes: (kinds: QuestionKind[]) => void;
  attemptCount: number;
  mistakeKinds: QuestionKind[];
}

export function ResultsScreen({
  stats,
  config,
  onRestart,
  onNewSetup,
  onReview,
  onRetryMistakes,
  attemptCount,
  mistakeKinds,
}: Props) {
  const categories = config.categories;

  return (
    <div className="mx-auto max-w-3xl space-y-6 py-8">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold">Session complete</h1>
        <p className="text-sm text-warm-stone">
          {stats.total} answered · {config.mode === 'free' ? 'free-form' : 'multiple choice'} ·{' '}
          {config.tolerancePreset} tolerance · {config.difficulty}
        </p>
      </header>

      <Card>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <Metric label="Accuracy" value={`${Math.round(stats.accuracyPct * 100)}%`} />
          <Metric label="Correct" value={`${stats.correct}/${stats.total}`} />
          <Metric label="Best streak" value={`${stats.bestStreak}`} />
          <Metric
            label="Avg time"
            value={stats.total === 0 ? '—' : `${(stats.avgResponseMs / 1000).toFixed(1)}s`}
          />
        </div>
      </Card>

      <Card>
        <h2 className="mb-3 font-medium">By category</h2>
        <div className="space-y-2">
          {categories.map((kind) => {
            const cat = stats.perCategory[kind];
            const total = cat?.total ?? 0;
            const correct = cat?.correct ?? 0;
            const pct = total === 0 ? 0 : correct / total;
            return (
              <div key={kind} className="space-y-1">
                <div className="flex items-baseline justify-between text-sm">
                  <span className="text-warm-ink">{templates[kind].label}</span>
                  <span className="font-mono text-warm-stone num">
                    {total === 0 ? '—' : `${correct}/${total} · ${Math.round(pct * 100)}%`}
                  </span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-warm-paper">
                  <div
                    className="h-full rounded-full bg-signal-good transition-all duration-aa ease-aa"
                    style={{ width: `${pct * 100}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      <div className="flex flex-wrap justify-center gap-3">
        <Button variant="secondary" onClick={onNewSetup}>
          Change setup
        </Button>
        <Button variant="secondary" onClick={onReview} disabled={attemptCount === 0}>
          Review answers
        </Button>
        <Button
          variant="secondary"
          onClick={() => onRetryMistakes(mistakeKinds)}
          disabled={mistakeKinds.length === 0}
          title={
            mistakeKinds.length === 0
              ? 'No mistakes — nothing to retry'
              : `Retry using ${mistakeKinds.length} missed kind${mistakeKinds.length > 1 ? 's' : ''}`
          }
        >
          Retry mistakes ({mistakeKinds.length})
        </Button>
        <Button onClick={onRestart}>Play again</Button>
      </div>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-warm-paper/50 p-3">
      <div className="text-xs uppercase tracking-wide text-warm-stone">{label}</div>
      <div className="mt-1 font-mono text-xl num text-warm-black">{value}</div>
    </div>
  );
}
