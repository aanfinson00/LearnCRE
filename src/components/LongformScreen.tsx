import { useEffect, useState } from 'react';
import type { LongformState } from '../types/longform';
import { computeScorePct } from '../types/longform';
import { useRegisterFeedbackContext } from '../hooks/useFeedbackContext';
import { Button } from './ui/Button';
import { Card } from './ui/Card';

interface Props {
  state: LongformState;
  onSubmit: (args: {
    userAnswer: string;
    rubricScores: Record<string, number>;
    skipped: boolean;
  }) => void;
  onAdvance: () => void;
  onQuit: () => void;
}

type Phase = 'writing' | 'grading';

export function LongformScreen({ state, onSubmit, onAdvance, onQuit }: Props) {
  const c = state.cases[state.currentIndex];
  const lastAttempt = state.attempts[state.attempts.length - 1];
  const answered = lastAttempt?.caseId === c.id;
  const isLast = state.currentIndex === state.cases.length - 1;

  const [phase, setPhase] = useState<Phase>('writing');
  const [answer, setAnswer] = useState('');
  const [scores, setScores] = useState<Record<string, number>>({});

  // Reset on case change
  useEffect(() => {
    if (answered) {
      setPhase('grading');
      setAnswer(lastAttempt.userAnswer);
      setScores(lastAttempt.rubricScores);
    } else {
      setPhase('writing');
      setAnswer('');
      setScores({});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [c.id]);

  // Register the active case in feedback context
  useRegisterFeedbackContext({
    mode: 'longform',
    itemId: c.id,
    label: c.title,
    prompt: c.scenario,
    difficulty: c.difficulty,
  });

  const livePreviewScore = computeScorePct(c.rubric, scores);
  const allRubricScored = c.rubric.every((r) => scores[r.id] !== undefined);

  const handleSubmitAnswer = () => {
    // Move into grading phase; the case isn't recorded until rubric is complete.
    setPhase('grading');
  };

  const handleSkip = () => {
    onSubmit({ userAnswer: answer, rubricScores: {}, skipped: true });
  };

  const handleSaveGrade = () => {
    onSubmit({ userAnswer: answer, rubricScores: scores, skipped: false });
  };

  return (
    <div className="mx-auto max-w-3xl space-y-5 py-8">
      <div className="flex items-baseline justify-between">
        <div>
          <div className="display text-3xl text-warm-black">
            {c.title}
            <span className="text-copper">.</span>
          </div>
          <p className="font-mono text-[11px] uppercase tracking-widest text-warm-mute num">
            Case {state.currentIndex + 1} / {state.cases.length} · {c.difficulty}
          </p>
        </div>
        <Button variant="ghost" onClick={onQuit} className="text-xs">
          Quit
        </Button>
      </div>

      <div className="flex gap-1">
        {state.cases.map((cs, i) => {
          const att = state.attempts.find((a) => a.caseId === cs.id);
          const isCurrent = i === state.currentIndex;
          const tone = att
            ? att.skipped
              ? 'bg-warm-line'
              : att.totalScorePct >= 70
                ? 'bg-signal-good'
                : att.totalScorePct >= 40
                  ? 'bg-warm-stone/60'
                  : 'bg-signal-bad'
            : isCurrent
              ? 'bg-copper'
              : 'bg-warm-line/60';
          return (
            <div
              key={cs.id}
              className={`h-1.5 flex-1 rounded-full transition-all duration-aa ease-aa ${tone}`}
            />
          );
        })}
      </div>

      <Card className="space-y-3">
        <p className="editorial text-base leading-relaxed text-warm-ink">{c.scenario}</p>
        {c.data && c.data.length > 0 && (
          <div className="grid grid-cols-1 gap-x-6 gap-y-1 rounded-lg border border-warm-line bg-warm-paper/40 p-3 sm:grid-cols-2">
            {c.data.map((d, i) => (
              <div
                key={i}
                className="flex items-baseline justify-between border-b border-dotted border-warm-line/60 py-1 last:border-0"
              >
                <span className="text-xs text-warm-stone">{d.label}</span>
                <span className="font-mono text-xs text-warm-black num">{d.value}</span>
              </div>
            ))}
          </div>
        )}
        <p className="text-base font-medium text-warm-black">{c.question}</p>
        {c.guidanceHint && (
          <p className="text-xs italic text-warm-mute">{c.guidanceHint}</p>
        )}
      </Card>

      {/* WRITING PHASE — user composes their answer */}
      {phase === 'writing' && !answered && (
        <Card className="space-y-3">
          <div className="text-xs font-medium uppercase tracking-widest text-warm-stone">
            Your answer
          </div>
          <textarea
            rows={10}
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Type your prose answer here. Use the floating ⊟ button for any math you need to scratch out."
            className="w-full resize-y rounded-md border border-warm-line bg-warm-white px-3 py-2 font-mono text-sm leading-relaxed text-warm-black outline-none focus:border-copper"
          />
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={handleSkip} className="text-xs">
              Skip
            </Button>
            <Button onClick={handleSubmitAnswer} disabled={answer.trim().length < 20}>
              Submit + see model answer →
            </Button>
          </div>
          <p className="font-mono text-[10px] text-warm-mute num">
            Word count: {answer.trim().split(/\s+/).filter(Boolean).length}
          </p>
        </Card>
      )}

      {/* GRADING PHASE — show model answer + rubric */}
      {phase === 'grading' && (
        <>
          <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
            <Card className="space-y-2">
              <div className="text-xs font-medium uppercase tracking-widest text-warm-stone">
                Your answer
              </div>
              <p className="whitespace-pre-wrap font-mono text-[12px] leading-relaxed text-warm-ink">
                {answer || '(empty)'}
              </p>
            </Card>
            <Card className="space-y-2 border-copper/40 bg-copper/5">
              <div className="text-xs font-medium uppercase tracking-widest text-copper-ink">
                Model answer
              </div>
              <p className="whitespace-pre-wrap text-[13px] leading-relaxed text-warm-ink">
                {c.modelAnswer}
              </p>
            </Card>
          </div>

          <Card className="space-y-3">
            <div className="flex items-baseline justify-between">
              <div className="text-xs font-medium uppercase tracking-widest text-warm-stone">
                Rubric — score yourself 0-3 on each
              </div>
              <div className="font-mono text-xs text-copper-deep num">
                {allRubricScored ? `Total: ${livePreviewScore}%` : `(${Object.keys(scores).length}/${c.rubric.length})`}
              </div>
            </div>
            <div className="space-y-2">
              {c.rubric.map((r) => (
                <div key={r.id} className="rounded-lg border border-warm-line bg-warm-white/70 p-3">
                  <div className="flex items-baseline justify-between gap-3">
                    <div className="text-sm text-warm-ink">{r.dimension}</div>
                    {r.weight && r.weight !== 1 && (
                      <span className="font-mono text-[10px] text-warm-mute num">
                        weight {r.weight}x
                      </span>
                    )}
                  </div>
                  <div className="mt-2 flex gap-1.5">
                    {[0, 1, 2, 3].map((v) => {
                      const on = scores[r.id] === v;
                      return (
                        <button
                          key={v}
                          type="button"
                          disabled={answered}
                          onClick={() =>
                            !answered && setScores((s) => ({ ...s, [r.id]: v }))
                          }
                          className={`h-7 w-7 rounded-md border text-xs font-mono num transition-colors duration-aa ease-aa ${
                            on
                              ? v === 0
                                ? 'border-signal-bad bg-signal-bad/10 text-signal-bad-ink'
                                : v === 3
                                  ? 'border-signal-good bg-signal-good/15 text-signal-good-ink'
                                  : 'border-copper bg-copper/15 text-copper-deep'
                              : 'border-warm-line bg-warm-white text-warm-mute hover:border-copper/60'
                          } disabled:cursor-not-allowed`}
                        >
                          {v}
                        </button>
                      );
                    })}
                    <span className="ml-2 self-center text-[10px] uppercase tracking-wider text-warm-mute">
                      {scores[r.id] === 0
                        ? 'missed'
                        : scores[r.id] === 1
                          ? 'partial'
                          : scores[r.id] === 2
                            ? 'mostly'
                            : scores[r.id] === 3
                              ? 'nailed it'
                              : ''}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="border-copper/40 bg-copper/10">
            <div className="text-xs font-medium uppercase tracking-widest text-copper-ink">
              Takeaway
            </div>
            <p className="editorial mt-2 text-base leading-relaxed text-warm-ink">
              {c.takeaway}
            </p>
            {c.tips.length > 0 && (
              <ul className="mt-3 space-y-1 border-t border-copper/30 pt-3">
                {c.tips.map((t, i) => (
                  <li key={i} className="text-xs text-warm-stone">
                    · {t}
                  </li>
                ))}
              </ul>
            )}
          </Card>

          <div className="flex justify-end gap-2">
            {!answered && (
              <Button onClick={handleSaveGrade} disabled={!allRubricScored}>
                Save grade ({livePreviewScore}%)
              </Button>
            )}
            {answered && (
              <Button onClick={onAdvance}>
                {isLast ? 'See results' : 'Next case'}{' '}
                <span className="ml-2 text-warm-paper/60">↵</span>
              </Button>
            )}
          </div>
        </>
      )}
    </div>
  );
}
