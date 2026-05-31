import { useEffect, useRef, useState } from 'react';
import { Button } from './ui/Button';
import { Card } from './ui/Card';
import { DEFAULT_BATCH, useFeedbackReview } from '../hooks/useFeedbackReview';
import type { ReviewBlock } from '../quiz/reviewQuestions';
import type { BatchMemoMeta } from '../storage/voiceMemos';

interface Props {
  onBack: () => void;
}

const TOTAL = 100;

function clampNum(n: number): number {
  if (Number.isNaN(n)) return 1;
  return Math.max(1, Math.min(TOTAL, Math.round(n)));
}

function BlockView({ block }: { block: ReviewBlock }) {
  switch (block.kind) {
    case 'doc':
      return (
        <div className="overflow-hidden rounded-lg border border-warm-line bg-warm-paper/60">
          <div className="flex items-baseline justify-between border-b border-warm-line px-3 py-1.5 text-[10px] font-medium uppercase tracking-widest text-warm-mute">
            <span>{block.docType.toUpperCase()}</span>
            {block.label && (
              <span className="normal-case tracking-normal text-warm-stone">{block.label}</span>
            )}
          </div>
          <pre className="whitespace-pre-wrap p-3 font-mono text-xs leading-relaxed text-warm-ink">
            {block.text}
          </pre>
        </div>
      );
    case 'prose':
      return <p className="editorial text-base leading-relaxed text-warm-ink">{block.text}</p>;
    case 'data':
      return (
        <div className="grid grid-cols-1 gap-x-6 gap-y-1 rounded-lg border border-warm-line bg-warm-paper/40 p-3 sm:grid-cols-2">
          {block.points.map((d, i) => (
            <div
              key={i}
              className="flex items-baseline justify-between border-b border-dotted border-warm-line/60 py-1 last:border-0"
            >
              <span className="text-xs text-warm-stone">{d.label}</span>
              <span className="num font-mono text-xs text-warm-black">{d.value}</span>
            </div>
          ))}
        </div>
      );
    case 'ask':
      return <p className="text-base font-medium text-warm-black">{block.text}</p>;
    case 'options':
      return (
        <ol className="space-y-1.5">
          {block.options.map((o, i) => (
            <li
              key={i}
              className="flex gap-2 rounded-lg border border-warm-line bg-warm-white/50 px-3 py-2 text-sm text-warm-ink"
            >
              <span className="font-mono text-xs font-semibold text-copper">
                {String.fromCharCode(65 + i)}
              </span>
              <span>{o}</span>
            </li>
          ))}
        </ol>
      );
    case 'steps':
      return (
        <ol className="space-y-1.5">
          {block.steps.map((s, i) => (
            <li key={i} className="text-sm text-warm-ink">
              <span className="font-mono text-xs text-warm-mute">{i + 1}.</span>{' '}
              <span className="font-medium text-warm-black">{s.label}</span> — {s.prompt}
            </li>
          ))}
        </ol>
      );
    case 'note':
      return <p className="text-sm italic text-warm-stone">{block.text}</p>;
    default:
      return null;
  }
}

function MemoRow({
  memo,
  busy,
  onRemove,
  loadAudioUrl,
}: {
  memo: BatchMemoMeta;
  busy: boolean;
  onRemove: () => void;
  loadAudioUrl: (id: string) => Promise<string | null>;
}) {
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    let live = url;
    let alive = true;
    loadAudioUrl(memo.id).then((u) => {
      if (!alive) {
        if (u) URL.revokeObjectURL(u);
        return;
      }
      live = u;
      setUrl(u);
    });
    return () => {
      alive = false;
      if (live) URL.revokeObjectURL(live);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [memo.id, memo.updatedAt]);

  return (
    <div className="space-y-2 rounded-lg border border-warm-line bg-warm-white/50 p-3">
      <div className="flex items-center justify-between gap-2">
        <div className="min-w-0">
          <span className="num inline-block rounded bg-copper/10 px-2 py-0.5 font-mono text-xs font-semibold text-copper">
            Q{memo.fromNumber}–{memo.toNumber}
          </span>
          {memo.note && <span className="ml-2 text-sm text-warm-ink">{memo.note}</span>}
          <span className="ml-2 truncate text-[11px] text-warm-mute">{memo.filename}</span>
        </div>
        <Button variant="ghost" className="shrink-0 text-xs" onClick={onRemove} disabled={busy}>
          Remove
        </Button>
      </div>
      {url && (
        <audio key={url} controls src={url} className="w-full">
          <track kind="captions" />
        </audio>
      )}
    </div>
  );
}

export function FeedbackReviewScreen({ onBack }: Props) {
  const fb = useFeedbackReview();
  const { current } = fb;

  const [from, setFrom] = useState(1);
  const [to, setTo] = useState(Math.min(DEFAULT_BATCH, TOTAL));
  const [note, setNote] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        fb.next();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        fb.prev();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [fb]);

  const handleFile = async (file: File) => {
    const lo = clampNum(Math.min(from, to));
    const hi = clampNum(Math.max(from, to));
    await fb.saveBatch({ fromNumber: lo, toNumber: hi, note, file });
    // Advance the default range to the next batch for a smooth flow.
    const nextFrom = clampNum(hi + 1);
    setFrom(nextFrom);
    setTo(clampNum(nextFrom + DEFAULT_BATCH - 1));
    setNote('');
  };

  return (
    <div className="mx-auto max-w-3xl space-y-5 py-8">
      <div className="flex items-baseline justify-between">
        <div>
          <div className="display text-3xl text-warm-black">
            Feedback studio<span className="text-copper">.</span>
          </div>
          <p className="text-xs leading-relaxed text-warm-stone">
            Read the questions below, record one voice memo covering a batch (10–15 at a time),
            then upload it tagged with the range it covers.
          </p>
        </div>
        <Button variant="ghost" onClick={onBack} className="text-xs">
          Back
        </Button>
      </div>

      {/* ---- Batch memo uploader ---- */}
      <Card className="space-y-3 border-copper/30 bg-copper/[0.03]">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-warm-black">Add a batch memo</h3>
          <span className="text-xs text-warm-stone">
            <span className="num font-mono text-warm-black">{fb.coveredCount}</span> / {TOTAL} questions covered
          </span>
        </div>

        <div className="flex flex-wrap items-end gap-3">
          <label className="text-xs text-warm-stone">
            Covers Q
            <input
              type="number"
              min={1}
              max={TOTAL}
              value={from}
              onChange={(e) => setFrom(clampNum(Number(e.target.value)))}
              className="num ml-1 w-16 rounded border border-warm-line bg-warm-white px-2 py-1 font-mono text-sm text-warm-black"
            />
          </label>
          <label className="text-xs text-warm-stone">
            to
            <input
              type="number"
              min={1}
              max={TOTAL}
              value={to}
              onChange={(e) => setTo(clampNum(Number(e.target.value)))}
              className="num ml-1 w-16 rounded border border-warm-line bg-warm-white px-2 py-1 font-mono text-sm text-warm-black"
            />
          </label>
          <button
            type="button"
            onClick={() => {
              setFrom(current.number);
              setTo(clampNum(current.number + DEFAULT_BATCH - 1));
            }}
            className="rounded border border-warm-line px-2 py-1 text-[11px] text-warm-stone transition-colors duration-aa ease-aa hover:border-warm-black hover:text-warm-black"
          >
            From current (Q{current.number})
          </button>
        </div>

        <input
          type="text"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Optional label (e.g. 'pricing cases')"
          className="w-full rounded border border-warm-line bg-warm-white px-2 py-1.5 text-sm text-warm-ink placeholder:text-warm-mute"
        />

        <input
          ref={fileRef}
          type="file"
          accept="audio/*"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) handleFile(f);
            e.target.value = '';
          }}
        />
        <Button
          variant="primary"
          className="w-full"
          disabled={fb.busy}
          onClick={() => fileRef.current?.click()}
        >
          {fb.busy ? 'Saving…' : `Upload memo for Q${Math.min(from, to)}–${Math.max(from, to)}`}
        </Button>
        <p className="text-[11px] leading-relaxed text-warm-mute">
          Stored locally on this device. Use Export to bundle every memo with a manifest mapping each
          recording to the questions it covers.
        </p>
      </Card>

      {/* ---- Saved memos ---- */}
      {fb.memos.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-warm-black">
              Your memos ({fb.memos.length})
            </h3>
            <Button
              variant="secondary"
              className="text-xs"
              disabled={fb.busy}
              onClick={() => fb.exportAll()}
            >
              Export all
            </Button>
          </div>
          {fb.memos.map((m) => (
            <MemoRow
              key={m.id}
              memo={m}
              busy={fb.busy}
              onRemove={() => fb.removeBatch(m.id)}
              loadAudioUrl={fb.loadAudioUrl}
            />
          ))}
        </div>
      )}

      {/* ---- Question reader ---- */}
      <div className="border-t border-warm-line pt-5">
        <p className="num mb-2 font-mono text-[11px] uppercase tracking-widest text-warm-mute">
          Question {current.number} / {TOTAL} · {current.meta}
        </p>

        {/* Jump rail — current + covered-by-a-memo at a glance. */}
        <div className="mb-4 grid grid-cols-10 gap-1">
          {fb.questions.map((q, i) => {
            const isCur = i === fb.index;
            const covered = fb.coveredNumbers.has(q.number);
            const tone = isCur
              ? 'bg-copper text-warm-white'
              : covered
                ? 'bg-signal-good/20 text-warm-black ring-1 ring-signal-good/50'
                : 'bg-warm-line/40 text-warm-mute hover:bg-warm-line';
            return (
              <button
                key={q.id}
                type="button"
                onClick={() => fb.goto(i)}
                title={`${q.number}. ${q.title}`}
                className={`num rounded py-1 text-[10px] font-mono transition-colors duration-aa ease-aa ${tone}`}
              >
                {q.number}
              </button>
            );
          })}
        </div>

        <Card className="space-y-4">
          <div className="display text-xl text-warm-black">{current.title}</div>
          {current.blocks.map((b, i) => (
            <BlockView key={i} block={b} />
          ))}
        </Card>

        <div className="mt-4 flex items-center justify-between">
          <Button variant="secondary" onClick={fb.prev} disabled={fb.index === 0}>
            ← Previous
          </Button>
          <span className="text-xs text-warm-mute">Use ← / → to move</span>
          <Button variant="secondary" onClick={fb.next} disabled={fb.index === TOTAL - 1}>
            Next →
          </Button>
        </div>
      </div>
    </div>
  );
}
