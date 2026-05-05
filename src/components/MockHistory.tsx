import { useMemo, useState } from 'react';
import type { MockArchetypeId, MockInterviewRecord } from '../types/mockInterview';
import { MOCK_ARCHETYPES, archetypeById } from '../quiz/mockInterview';
import { Card } from './ui/Card';

interface Props {
  records: MockInterviewRecord[];
}

const KIND_LABELS: Record<string, string> = {
  fit: 'Fit',
  behavioral: 'Behavioral',
  technical: 'Technical',
  situational: 'Situational',
  longform: 'Long-form',
  marketView: 'Market view',
};

function formatDate(ms: number): string {
  return new Date(ms).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function formatDuration(ms: number): string {
  const min = Math.floor(ms / 60_000);
  const sec = Math.round((ms % 60_000) / 1000);
  return `${min}:${sec.toString().padStart(2, '0')}`;
}

export function MockHistory({ records }: Props) {
  const [filter, setFilter] = useState<MockArchetypeId | 'all'>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const sorted = [...records].sort((a, b) => b.startedAt - a.startedAt);
    if (filter === 'all') return sorted;
    return sorted.filter((r) => r.archetypeId === filter);
  }, [records, filter]);

  // Aggregate per-archetype best/avg
  const aggByArchetype = useMemo(() => {
    const byId: Record<string, { count: number; best: number; avg: number }> = {};
    for (const a of MOCK_ARCHETYPES) {
      const ar = records.filter((r) => r.archetypeId === a.id);
      if (ar.length === 0) {
        byId[a.id] = { count: 0, best: 0, avg: 0 };
      } else {
        const best = Math.max(...ar.map((r) => r.totalScorePct));
        const avg = ar.reduce((s, r) => s + r.totalScorePct, 0) / ar.length;
        byId[a.id] = { count: ar.length, best, avg };
      }
    }
    return byId;
  }, [records]);

  if (records.length === 0) {
    return (
      <Card className="space-y-2">
        <div className="text-xs font-medium uppercase tracking-widest text-warm-stone">
          Run history
        </div>
        <p className="text-sm text-warm-stone">
          No mock interviews yet. Start one above to begin tracking your progress
          across archetypes.
        </p>
      </Card>
    );
  }

  return (
    <Card className="space-y-3">
      <div className="flex items-baseline justify-between">
        <div className="text-xs font-medium uppercase tracking-widest text-warm-stone">
          Run history · {records.length} total
        </div>
        <div className="flex gap-1">
          <FilterPill active={filter === 'all'} onClick={() => setFilter('all')}>
            All
          </FilterPill>
          {MOCK_ARCHETYPES.map((a) => {
            const count = aggByArchetype[a.id]?.count ?? 0;
            if (count === 0) return null;
            return (
              <FilterPill
                key={a.id}
                active={filter === a.id}
                onClick={() => setFilter(a.id)}
              >
                {a.title.split(' ')[0]} · {count}
              </FilterPill>
            );
          })}
        </div>
      </div>

      {/* Per-archetype best/avg summary */}
      {filter === 'all' && (
        <div className="grid grid-cols-1 gap-2 border-b border-warm-line pb-3 sm:grid-cols-2">
          {MOCK_ARCHETYPES.filter((a) => aggByArchetype[a.id]?.count > 0).map((a) => {
            const agg = aggByArchetype[a.id];
            return (
              <div
                key={a.id}
                className="flex items-baseline justify-between rounded-md bg-warm-paper/50 px-3 py-2"
              >
                <span className="text-sm font-medium text-warm-ink">{a.title}</span>
                <span className="font-mono text-[11px] text-warm-stone num">
                  best {Math.round(agg.best * 100)}% · avg {Math.round(agg.avg * 100)}% ·{' '}
                  {agg.count} run{agg.count === 1 ? '' : 's'}
                </span>
              </div>
            );
          })}
        </div>
      )}

      {/* Per-record list */}
      <div className="space-y-2">
        {filtered.map((r) => {
          const expanded = expandedId === r.id;
          const archetype = archetypeById(r.archetypeId);
          const archetypeTitle = archetype?.title ?? r.archetypeId;
          const counted = r.attempts.filter((a) => !a.skipped);
          const skipped = r.attempts.length - counted.length;
          const tone =
            r.totalScorePct >= 0.75
              ? 'text-signal-good-ink'
              : r.totalScorePct >= 0.5
                ? 'text-warm-ink'
                : 'text-signal-bad-ink';
          return (
            <div
              key={r.id}
              className="overflow-hidden rounded-md border border-warm-line bg-warm-white/50"
            >
              <button
                type="button"
                onClick={() => setExpandedId(expanded ? null : r.id)}
                className="flex w-full items-baseline justify-between gap-3 px-3 py-2 text-left transition-colors duration-aa-fast ease-aa hover:bg-warm-paper/40"
              >
                <div>
                  <div className="text-sm font-medium text-warm-ink">{archetypeTitle}</div>
                  <div className="font-mono text-[10px] text-warm-mute num">
                    {formatDate(r.startedAt)} · {formatDuration(r.durationMs)} ·{' '}
                    {counted.length}/{r.attempts.length} answered
                    {skipped > 0 && ` (${skipped} skipped)`}
                  </div>
                </div>
                <div className={`font-mono text-sm num ${tone}`}>
                  {Math.round(r.totalScorePct * 100)}%
                  <span className="ml-2 text-xs text-warm-mute">{expanded ? '▴' : '▾'}</span>
                </div>
              </button>

              {expanded && (
                <div className="space-y-2 border-t border-warm-line bg-warm-paper/30 px-3 py-2">
                  {/* Per-kind breakdown */}
                  <div className="space-y-1">
                    {Object.entries(r.perKindScore).map(([kind, b]) => {
                      const avg = b.count === 0 ? 0 : b.scoreSum / b.count;
                      return (
                        <div
                          key={kind}
                          className="flex items-baseline justify-between font-mono text-[10px] num"
                        >
                          <span className="text-warm-stone">
                            {KIND_LABELS[kind] ?? kind} · {b.count}q
                          </span>
                          <span className="text-warm-ink">{Math.round(avg * 100)}%</span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Per-question strip */}
                  <div className="border-t border-warm-line pt-2">
                    <div className="mb-1 text-[10px] uppercase tracking-widest text-warm-mute">
                      Per-question
                    </div>
                    <div className="flex gap-0.5">
                      {r.attempts.map((a, i) => {
                        const score =
                          a.kind === 'technical' || a.kind === 'situational'
                            ? a.correct
                              ? 1
                              : 0
                            : a.scorePct;
                        const dotTone = a.skipped
                          ? 'bg-warm-line'
                          : score >= 0.75
                            ? 'bg-signal-good'
                            : score >= 0.5
                              ? 'bg-copper'
                              : 'bg-signal-bad';
                        return (
                          <div
                            key={i}
                            title={`Q${i + 1} ${a.kind} · ${
                              a.skipped ? 'skipped' : Math.round(score * 100) + '%'
                            }`}
                            className={`h-3 flex-1 rounded-sm ${dotTone}`}
                          />
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {filtered.length === 0 && (
          <p className="text-xs text-warm-stone">No runs match this filter.</p>
        )}
      </div>
    </Card>
  );
}

function FilterPill({
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
      className={`rounded-full border px-2 py-0.5 text-[11px] transition-colors duration-aa-fast ease-aa ${
        active
          ? 'border-warm-black bg-warm-black text-warm-white'
          : 'border-warm-line bg-warm-white/70 text-warm-ink hover:border-copper'
      }`}
    >
      {children}
    </button>
  );
}
