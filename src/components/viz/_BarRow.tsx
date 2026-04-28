/**
 * Shared horizontal-bar-with-label row used by most viz components.
 *
 * label | filled bar (width = `width%`) | value-text
 *
 * Underscore prefix marks this as a viz internal — not dispatchable on its own.
 */

export type BarTone = 'muted' | 'good' | 'bad' | 'copper-soft' | 'stone';

interface Props {
  label: string;
  /** 0–100 */
  width: number;
  value: string;
  tone: BarTone;
  /** Width of the label column in px. Default 80. */
  labelWidthPx?: number;
}

const TONE_CLASS: Record<BarTone, string> = {
  good: 'bg-copper',
  bad: 'bg-signal-bad/70',
  muted: 'bg-warm-mute/40',
  'copper-soft': 'bg-copper-soft/70',
  stone: 'bg-warm-stone/60',
};

export function BarRow({ label, width, value, tone, labelWidthPx = 80 }: Props) {
  return (
    <div
      className="grid items-center gap-3"
      style={{ gridTemplateColumns: `${labelWidthPx}px 1fr 120px` }}
    >
      <span className="text-warm-stone text-right">{label}</span>
      <div className="h-5 rounded bg-warm-paper/60 overflow-hidden">
        <div
          className={`h-full rounded transition-all duration-aa-slow ease-aa ${TONE_CLASS[tone]}`}
          style={{ width: `${Math.max(0, Math.min(100, width))}%` }}
        />
      </div>
      <span className="text-warm-black text-right">{value}</span>
    </div>
  );
}
