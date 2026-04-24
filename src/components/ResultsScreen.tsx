import { templates } from '../quiz/templates';
import type { SessionConfig, SessionStats } from '../types/session';
import { Button } from './ui/Button';
import { Card } from './ui/Card';

interface Props {
  stats: SessionStats;
  config: SessionConfig;
  onRestart: () => void;
  onNewSetup: () => void;
  onReview: () => void;
  attemptCount: number;
}

export function ResultsScreen({ stats, config, onRestart, onNewSetup, onReview, attemptCount }: Props) {
  const categories = config.categories;

  return (
    <div className="mx-auto max-w-3xl space-y-6 py-8">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold">Session complete</h1>
        <p className="text-sm text-slate-500">
          {stats.total} answered · {config.mode === 'free' ? 'free-form' : 'multiple choice'} · {config.tolerancePreset} tolerance
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
                  <span className="text-slate-700">{templates[kind].label}</span>
                  <span className="font-mono text-slate-500 num">
                    {total === 0 ? '—' : `${correct}/${total} · ${Math.round(pct * 100)}%`}
                  </span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-emerald-500 transition-all"
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
        <Button onClick={onRestart}>Play again</Button>
      </div>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-slate-50 p-3">
      <div className="text-xs uppercase tracking-wide text-slate-500">{label}</div>
      <div className="mt-1 font-mono text-xl num text-slate-900">{value}</div>
    </div>
  );
}
