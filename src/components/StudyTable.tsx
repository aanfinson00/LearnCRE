import { Card } from './ui/Card';

interface StudyTableProps {
  title: string;
  description?: string;
  rowLabel: string;
  colLabel: string;
  rowValues: number[];
  colValues: number[];
  formatRow: (v: number) => string;
  formatCol: (v: number) => string;
  compute: (rowVal: number, colVal: number) => number;
  formatCell: (v: number) => string;
  highlightDiagonal?: boolean;
  highlightRule?: (rowVal: number, colVal: number, cell: number) => boolean;
}

export function StudyTable({
  title,
  description,
  rowLabel,
  colLabel,
  rowValues,
  colValues,
  formatRow,
  formatCol,
  compute,
  formatCell,
  highlightDiagonal,
  highlightRule,
}: StudyTableProps) {
  return (
    <Card className="overflow-x-auto">
      <div className="mb-3">
        <h2 className="editorial text-xl text-warm-black">{title}</h2>
        {description && (
          <p className="mt-1 text-sm text-warm-stone">{description}</p>
        )}
      </div>
      <table className="min-w-full table-fixed border-collapse font-mono text-xs num">
        <thead>
          <tr>
            <th className="sticky left-0 z-10 bg-warm-white/90 px-2 py-2 text-left text-[10px] font-medium uppercase tracking-widest text-warm-mute">
              {rowLabel} ↓ / {colLabel} →
            </th>
            {colValues.map((c, i) => (
              <th
                key={i}
                className="border-b border-warm-line px-2 py-2 text-warm-ink font-medium"
              >
                {formatCol(c)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rowValues.map((rowVal, r) => (
            <tr key={r}>
              <th className="sticky left-0 z-10 border-r border-warm-line bg-warm-white/90 px-2 py-2 text-left text-warm-ink font-medium">
                {formatRow(rowVal)}
              </th>
              {colValues.map((colVal, c) => {
                const cell = compute(rowVal, colVal);
                const isDiagonal =
                  highlightDiagonal && Math.abs(rowVal - colVal) < 1e-9;
                const isHighlighted = highlightRule
                  ? highlightRule(rowVal, colVal, cell)
                  : false;
                let bg = 'bg-warm-white/40 text-warm-ink';
                if (isDiagonal) bg = 'bg-warm-paper text-warm-mute';
                else if (isHighlighted) bg = 'bg-copper/15 text-copper-ink';
                return (
                  <td
                    key={c}
                    className={`h-10 border border-warm-line px-2 text-center ${bg}`}
                  >
                    {isDiagonal ? '—' : formatCell(cell)}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}

interface SimpleListProps {
  title: string;
  description?: string;
  rows: { label: string; value: string; hint?: string }[];
}

export function SimpleStudyList({ title, description, rows }: SimpleListProps) {
  return (
    <Card className="space-y-3">
      <div>
        <h2 className="editorial text-xl text-warm-black">{title}</h2>
        {description && <p className="mt-1 text-sm text-warm-stone">{description}</p>}
      </div>
      <dl className="font-mono text-sm num">
        {rows.map((r) => (
          <div
            key={r.label}
            className="flex items-baseline justify-between gap-4 border-b border-dotted border-warm-line py-1.5"
          >
            <dt className="text-warm-ink">{r.label}</dt>
            <dd className="flex items-baseline gap-3">
              <span className="text-warm-black">{r.value}</span>
              {r.hint && <span className="text-xs text-warm-mute font-sans">{r.hint}</span>}
            </dd>
          </div>
        ))}
      </dl>
    </Card>
  );
}
