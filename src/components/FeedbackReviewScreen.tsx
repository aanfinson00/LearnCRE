import { useEffect, useRef, useState } from 'react';
import { Button } from './ui/Button';
import { Card } from './ui/Card';
import { useFeedbackReview } from '../hooks/useFeedbackReview';
import type { ReviewBlock, ReviewQuestion } from '../quiz/reviewQuestions';

interface Props {
  onBack: () => void;
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

function MemoPanel({
  question,
  attached,
  version,
  busy,
  onAttach,
  onRemove,
  loadAudioUrl,
}: {
  question: ReviewQuestion;
  attached: boolean;
  /** Bumps when the memo is replaced so playback reloads the new file. */
  version: number;
  busy: boolean;
  onAttach: (file: File) => void;
  onRemove: () => void;
  loadAudioUrl: (id: string) => Promise<string | null>;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  useEffect(() => {
    let url: string | null = null;
    let alive = true;
    if (attached) {
      loadAudioUrl(question.id).then((u) => {
        if (!alive) {
          if (u) URL.revokeObjectURL(u);
          return;
        }
        url = u;
        setAudioUrl(u);
      });
    } else {
      setAudioUrl(null);
    }
    return () => {
      alive = false;
      if (url) URL.revokeObjectURL(url);
    };
  }, [question.id, attached, version, loadAudioUrl]);

  return (
    <Card className="space-y-3 border-copper/30 bg-copper/[0.03]">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-warm-black">
          Voice memo {attached ? '· attached' : ''}
        </h3>
        {attached && (
          <Button variant="ghost" className="text-xs" onClick={onRemove} disabled={busy}>
            Remove
          </Button>
        )}
      </div>

      {attached && audioUrl && (
        <audio key={audioUrl} controls src={audioUrl} className="w-full">
          <track kind="captions" />
        </audio>
      )}

      <input
        ref={fileRef}
        type="file"
        accept="audio/*"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) onAttach(f);
          e.target.value = '';
        }}
      />
      <Button
        variant={attached ? 'secondary' : 'primary'}
        className="w-full"
        disabled={busy}
        onClick={() => fileRef.current?.click()}
      >
        {busy ? 'Saving…' : attached ? 'Replace memo' : 'Upload voice memo'}
      </Button>
      <p className="text-[11px] leading-relaxed text-warm-mute">
        Record your feedback on this question (phone voice memo, etc.) and attach the audio file.
        Stored locally on this device; use Export to bundle every memo for review.
      </p>
    </Card>
  );
}

export function FeedbackReviewScreen({ onBack }: Props) {
  const fb = useFeedbackReview();
  const { current } = fb;
  const attached = Boolean(fb.memos[current.id]);

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

  return (
    <div className="mx-auto max-w-3xl space-y-5 py-8">
      <div className="flex items-baseline justify-between">
        <div>
          <div className="display text-3xl text-warm-black">
            Feedback studio<span className="text-copper">.</span>
          </div>
          <p className="num font-mono text-[11px] uppercase tracking-widest text-warm-mute">
            Question {current.number} / {fb.questions.length} · {current.meta}
          </p>
        </div>
        <Button variant="ghost" onClick={onBack} className="text-xs">
          Back
        </Button>
      </div>

      <div className="flex items-center justify-between gap-3">
        <span className="text-xs text-warm-stone">
          <span className="num font-mono text-warm-black">{fb.attachedCount}</span> / {fb.questions.length} memos attached
        </span>
        <Button
          variant="secondary"
          className="text-xs"
          disabled={fb.busy || fb.attachedCount === 0}
          onClick={() => fb.exportAll()}
        >
          Export all ({fb.attachedCount})
        </Button>
      </div>

      {/* Numbered jump rail — current + attached state at a glance. */}
      <div className="grid grid-cols-10 gap-1">
        {fb.questions.map((q, i) => {
          const isCur = i === fb.index;
          const has = Boolean(fb.memos[q.id]);
          const tone = isCur
            ? 'bg-copper text-warm-white'
            : has
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

      <MemoPanel
        question={current}
        attached={attached}
        version={fb.memos[current.id]?.updatedAt ?? 0}
        busy={fb.busy}
        onAttach={(f) => fb.attach(f)}
        onRemove={() => fb.remove()}
        loadAudioUrl={fb.loadAudioUrl}
      />

      <div className="flex items-center justify-between">
        <Button variant="secondary" onClick={fb.prev} disabled={fb.index === 0}>
          ← Previous
        </Button>
        <span className="text-xs text-warm-mute">Use ← / → to move</span>
        <Button
          variant="secondary"
          onClick={fb.next}
          disabled={fb.index === fb.questions.length - 1}
        >
          Next →
        </Button>
      </div>
    </div>
  );
}
