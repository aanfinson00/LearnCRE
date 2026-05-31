import { useEffect, useRef, useState } from 'react';
import { Button } from './ui/Button';
import { Card } from './ui/Card';
import { DEFAULT_BATCH, useFeedbackReview } from '../hooks/useFeedbackReview';
import type { ReviewAnswer, ReviewBlock } from '../quiz/reviewQuestions';
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
    case 'note':
      return <p className="text-sm italic text-warm-stone">{block.text}</p>;
    default:
      return null;
  }
}

function TakeawayCard({ takeaway, tips }: { takeaway?: string; tips?: string[] }) {
  if (!takeaway && !(tips && tips.length)) return null;
  return (
    <Card className="border-copper/40 bg-copper/10">
      <div className="text-xs font-medium uppercase tracking-widest text-copper-ink">Takeaway</div>
      {takeaway && (
        <p className="editorial mt-2 text-base leading-relaxed text-warm-ink">{takeaway}</p>
      )}
      {tips && tips.length > 0 && (
        <ul className="mt-3 space-y-1 border-t border-copper/30 pt-3">
          {tips.map((t, i) => (
            <li key={i} className="text-xs text-warm-stone">
              · {t}
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}

/** Situational-style clickable options with reveal, mirroring the real mode. */
function ChoiceAnswer({ answer }: { answer: Extract<ReviewAnswer, { kind: 'choice' }> }) {
  const [picked, setPicked] = useState<number | null>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  const answered = picked !== null;

  return (
    <div className="space-y-2.5">
      {answer.options.map((opt, i) => {
        const isPicked = picked === i;
        const tone = !answered
          ? hovered === i
            ? 'border-copper bg-copper/5'
            : 'border-warm-line bg-warm-white/70 hover:border-copper/60'
          : opt.isBest
            ? 'border-copper bg-copper/15'
            : isPicked
              ? 'border-signal-bad/60 bg-signal-bad/10'
              : 'border-warm-line bg-warm-paper/40 opacity-80';
        return (
          <button
            key={i}
            type="button"
            disabled={answered}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => !answered && setPicked(i)}
            className={`w-full rounded-lg border-2 p-4 text-left transition-all duration-aa ease-aa ${tone} ${answered ? 'cursor-default' : 'cursor-pointer'}`}
          >
            <div className="flex items-baseline gap-3">
              <span
                className={`num mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border font-mono text-[10px] ${
                  answered && opt.isBest
                    ? 'border-copper bg-copper text-warm-white'
                    : answered && isPicked
                      ? 'border-signal-bad bg-signal-bad text-warm-white'
                      : 'border-warm-line text-warm-stone'
                }`}
              >
                {answered ? (opt.isBest ? '✓' : isPicked ? '✗' : i + 1) : i + 1}
              </span>
              <span
                className={`text-sm leading-snug ${
                  answered && opt.isBest ? 'font-medium text-copper-deep' : 'text-warm-ink'
                }`}
              >
                {opt.label}
              </span>
            </div>
            {answered && (
              <div
                className={`ml-8 mt-2.5 text-[13px] leading-relaxed ${
                  opt.isBest ? 'text-warm-ink' : 'text-warm-stone'
                }`}
              >
                {opt.explanation}
              </div>
            )}
          </button>
        );
      })}

      {!answered && (
        <p className="num text-right font-mono text-[11px] text-warm-mute">
          Click an answer to see the reasoning
        </p>
      )}

      {answered && (
        <>
          <TakeawayCard takeaway={answer.takeaway} tips={answer.tips} />
          <div className="flex justify-end">
            <Button variant="ghost" className="text-xs" onClick={() => setPicked(null)}>
              Try again
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

/** Open-text (longform / mock): draft an answer, then reveal the model answer. */
function ModelAnswer({ answer }: { answer: Extract<ReviewAnswer, { kind: 'model' }> }) {
  const [draft, setDraft] = useState('');
  const [revealed, setRevealed] = useState(false);

  return (
    <div className="space-y-3">
      {answer.guidanceHint && (
        <p className="text-sm italic text-warm-stone">Guidance: {answer.guidanceHint}</p>
      )}
      <textarea
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        rows={5}
        placeholder={
          answer.expectedDurationSec
            ? `Draft your answer (aim for ~${answer.expectedDurationSec}s spoken)…`
            : 'Draft your answer…'
        }
        className="w-full rounded-lg border border-warm-line bg-warm-white px-3 py-2 text-sm leading-relaxed text-warm-ink placeholder:text-warm-mute"
      />
      {!revealed ? (
        <Button variant="secondary" className="w-full" onClick={() => setRevealed(true)}>
          Reveal model answer
        </Button>
      ) : (
        <>
          <Card className="space-y-3">
            <div className="text-xs font-medium uppercase tracking-widest text-copper-ink">
              Model answer
            </div>
            <p className="editorial whitespace-pre-line text-[15px] leading-relaxed text-warm-ink">
              {answer.modelAnswer}
            </p>
            <div className="border-t border-warm-line pt-3">
              <div className="text-xs font-medium uppercase tracking-widest text-warm-mute">
                Graded on
              </div>
              <ul className="mt-2 space-y-1">
                {answer.rubric.map((r, i) => (
                  <li key={i} className="text-xs text-warm-stone">
                    · {r}
                  </li>
                ))}
              </ul>
            </div>
          </Card>
          <TakeawayCard takeaway={answer.takeaway} tips={answer.tips} />
        </>
      )}
    </div>
  );
}

/** Walkthrough steps: reveal the chained solution + per-step expected. */
function StepsAnswer({ answer }: { answer: Extract<ReviewAnswer, { kind: 'steps' }> }) {
  const [revealed, setRevealed] = useState(false);
  return (
    <div className="space-y-3">
      <ol className="space-y-1.5">
        {answer.steps.map((s, i) => (
          <li key={i} className="text-sm text-warm-ink">
            <span className="font-mono text-xs text-warm-mute">{i + 1}.</span>{' '}
            <span className="font-medium text-warm-black">{s.label}</span> — {s.prompt}
            {revealed && (
              <div className="ml-5 mt-1 text-[13px] text-warm-stone">
                <span className="num font-mono text-copper-deep">
                  = {s.expected} {s.unit}
                </span>{' '}
                — {s.resultDescription}
              </div>
            )}
          </li>
        ))}
      </ol>
      {!revealed ? (
        <Button variant="secondary" className="w-full" onClick={() => setRevealed(true)}>
          Reveal solution
        </Button>
      ) : (
        <TakeawayCard takeaway={answer.takeaway} />
      )}
    </div>
  );
}

function AnswerView({ answer }: { answer: ReviewAnswer }) {
  if (answer.kind === 'choice') return <ChoiceAnswer answer={answer} />;
  if (answer.kind === 'model') return <ModelAnswer answer={answer} />;
  return <StepsAnswer answer={answer} />;
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
    let live: string | null = null;
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
            Answer each question like a real user — click through, see the reasoning — then record
            one voice memo covering a batch (10–15 at a time) and upload it tagged with its range.
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
            <h3 className="text-sm font-semibold text-warm-black">Your memos ({fb.memos.length})</h3>
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

      {/* ---- Question reader (real interactive experience) ---- */}
      <div className="border-t border-warm-line pt-5">
        <p className="num mb-2 font-mono text-[11px] uppercase tracking-widest text-warm-mute">
          Question {current.number} / {TOTAL} · {current.meta}
        </p>

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

        {/* key on id so the interaction state resets per question */}
        <div className="mt-4">
          <AnswerView key={current.id} answer={current.answer} />
        </div>

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
