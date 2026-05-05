import { useEffect, useMemo, useState } from 'react';
import type { Cert } from '../types/cert';
import { certById } from '../quiz/certs';
import {
  buildFinalExam,
  scoreFinalExam,
  type FinalExamAnswer,
  type FinalExamItem,
  type FinalExamRun,
} from '../quiz/certs/finalExam';
import { scoreAnswer } from '../quiz/tolerance';
import { parseInput } from '../quiz/parseInput';
import { useCertProgress } from '../hooks/useCertProgress';
import { Button } from './ui/Button';
import { Card } from './ui/Card';
import { QuestionCard } from './QuestionCard';
import { AnswerInput } from './AnswerInput';

interface Props {
  certId: string;
  onExit: () => void;
}

interface Phase {
  status: 'active' | 'finished';
  index: number;
  answers: (FinalExamAnswer | null)[];
}

export function FinalExamScreen({ certId, onExit }: Props) {
  const cert = certById(certId);
  const { recordExam } = useCertProgress();
  const [run, setRun] = useState<FinalExamRun | null>(null);
  const [phase, setPhase] = useState<Phase>({
    status: 'active',
    index: 0,
    answers: [],
  });
  const [submittedAt, setSubmittedAt] = useState<number | null>(null);
  const [examRecorded, setExamRecorded] = useState<boolean>(false);

  // Build the run once on mount (or when cert changes).
  useEffect(() => {
    if (!cert) return;
    const r = buildFinalExam(cert);
    setRun(r);
    setPhase({
      status: 'active',
      index: 0,
      answers: r.items.map(() => null),
    });
    setSubmittedAt(null);
    setExamRecorded(false);
  }, [cert?.id]);

  if (!cert || !run) {
    return (
      <div className="mx-auto max-w-3xl py-10">
        <Card>
          <div className="text-sm text-warm-stone">
            Cert not found, or no exam to run.
          </div>
          <div className="mt-3">
            <Button variant="secondary" onClick={onExit} className="text-xs">
              ← Back
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  const item = run.items[phase.index];
  const isLast = phase.index === run.items.length - 1;
  const currentAnswer = phase.answers[phase.index];
  const answeredCurrent = currentAnswer !== null;

  const recordAnswer = (a: FinalExamAnswer) => {
    setPhase((p) => {
      const next = [...p.answers];
      next[p.index] = a;
      return { ...p, answers: next };
    });
  };

  const advance = () => {
    if (phase.index < run.items.length - 1) {
      setPhase((p) => ({ ...p, index: p.index + 1 }));
    } else {
      setPhase((p) => ({ ...p, status: 'finished' }));
      setSubmittedAt(Date.now());
    }
  };

  // Persist the exam attempt once when we transition to finished.
  useEffect(() => {
    if (phase.status !== 'finished' || examRecorded || !submittedAt) return;
    const score = scoreFinalExam(cert.finalExam, run.items, phase.answers);
    recordExam(cert.id, {
      startedAt: run.startedAt,
      finishedAt: submittedAt,
      scorePct: score.pct,
      passed: score.passed,
    });
    setExamRecorded(true);
  }, [phase.status, examRecorded, submittedAt, cert, run, phase.answers, recordExam]);

  if (phase.status === 'finished') {
    return (
      <FinalExamResults
        cert={cert}
        run={run}
        answers={phase.answers}
        onExit={onExit}
      />
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-5 py-8">
      <header className="flex items-baseline justify-between gap-3">
        <div>
          <h1 className="display text-3xl text-warm-black">
            {cert.title} — Final exam
            <span className="text-copper">.</span>
          </h1>
          <p className="font-mono text-[11px] uppercase tracking-widest text-warm-mute num">
            Item {phase.index + 1} / {run.items.length} ·{' '}
            {item.kind === 'autoCredit' ? item.via : item.kind}
          </p>
        </div>
        <Button
          variant="ghost"
          onClick={() => {
            if (
              window.confirm(
                'Quit the final exam? Progress on this attempt will be lost.',
              )
            ) {
              onExit();
            }
          }}
          className="text-xs"
        >
          Quit
        </Button>
      </header>

      <ProgressStrip items={run.items} answers={phase.answers} current={phase.index} />

      {item.kind === 'quiz' && (
        <QuizExamItemView
          key={`quiz-${phase.index}`}
          item={item}
          answer={currentAnswer}
          onAnswer={recordAnswer}
        />
      )}

      {item.kind === 'situational' && (
        <SituationalExamItemView
          key={`sit-${phase.index}`}
          item={item}
          answer={currentAnswer}
          onAnswer={recordAnswer}
        />
      )}

      {item.kind === 'autoCredit' && (
        <AutoCreditItemView
          key={`auto-${phase.index}`}
          item={item}
          answer={currentAnswer}
          onAnswer={recordAnswer}
        />
      )}

      <div className="flex items-center justify-end">
        <Button onClick={advance} disabled={!answeredCurrent} className="text-sm">
          {isLast ? 'Submit exam' : 'Next →'}
        </Button>
      </div>
    </div>
  );
}

// -------------------- Sub-components --------------------

function ProgressStrip({
  items,
  answers,
  current,
}: {
  items: FinalExamItem[];
  answers: (FinalExamAnswer | null)[];
  current: number;
}) {
  return (
    <div className="flex gap-1">
      {items.map((it, i) => {
        const a = answers[i];
        const isCurrent = i === current;
        const tone = a
          ? a.correct
            ? 'bg-signal-good'
            : 'bg-signal-bad'
          : isCurrent
            ? 'bg-copper'
            : 'bg-warm-line/60';
        const title = `${i + 1}. ${
          it.kind === 'autoCredit' ? it.via : it.kind
        }${a ? (a.correct ? ' — correct' : ' — wrong') : ''}`;
        return (
          <div
            key={i}
            title={title}
            className={`h-1.5 flex-1 rounded-full transition-all duration-aa ease-aa ${tone}`}
          />
        );
      })}
    </div>
  );
}

interface QuizItemProps {
  item: Extract<FinalExamItem, { kind: 'quiz' }>;
  answer: FinalExamAnswer | null;
  onAnswer: (a: FinalExamAnswer) => void;
}

function QuizExamItemView({ item, answer, onAnswer }: QuizItemProps) {
  const [raw, setRaw] = useState('');
  const answered = !!answer;

  const submit = () => {
    if (answered) return;
    const parsed = parseInput(raw, item.question.unit);
    if (parsed === null) {
      onAnswer({ kind: 'quiz', userInput: null, correct: false });
      return;
    }
    const { correct } = scoreAnswer(parsed, item.question);
    onAnswer({ kind: 'quiz', userInput: parsed, correct });
  };

  return (
    <Card className="space-y-4">
      <QuestionCard question={item.question} />
      <AnswerInput
        unit={item.question.unit}
        value={raw}
        onChange={setRaw}
        onSubmit={submit}
        disabled={answered}
      />
      {!answered && (
        <div className="flex items-center justify-between">
          <div className="font-mono text-[11px] text-warm-mute num">
            <span className="text-warm-stone">↵</span> submit
          </div>
          <Button variant="secondary" onClick={submit} className="text-xs">
            Submit
          </Button>
        </div>
      )}
      {answered && (
        <div
          className={`rounded-lg border p-3 text-sm ${
            answer!.correct
              ? 'border-signal-good/40 bg-signal-good/5 text-signal-good-ink'
              : 'border-signal-bad/40 bg-signal-bad/5 text-signal-bad-ink'
          }`}
        >
          {answer!.correct
            ? '✓ Correct'
            : `✗ Expected ${item.question.solution.answerDisplay}`}
        </div>
      )}
    </Card>
  );
}

interface SitItemProps {
  item: Extract<FinalExamItem, { kind: 'situational' }>;
  answer: FinalExamAnswer | null;
  onAnswer: (a: FinalExamAnswer) => void;
}

function SituationalExamItemView({ item, answer, onAnswer }: SitItemProps) {
  const c = item.case;
  const answered = !!answer;
  const pickedIndex =
    answer && answer.kind === 'situational' ? answer.pickedIndex : null;

  const pick = (i: number) => {
    if (answered) return;
    const correct = !!c.options[i]?.isBest;
    onAnswer({ kind: 'situational', pickedIndex: i, correct });
  };

  return (
    <Card className="space-y-4">
      <div>
        <div className="text-xs font-medium uppercase tracking-widest text-warm-mute">
          {c.category} · {c.difficulty}
        </div>
        <div className="display text-xl text-warm-black">{c.title}</div>
      </div>
      <p className="editorial text-base leading-relaxed text-warm-ink">
        {c.scenario}
      </p>
      {c.data && c.data.length > 0 && (
        <div className="grid grid-cols-1 gap-x-6 gap-y-1 rounded-lg border border-warm-line bg-warm-paper/40 p-3 sm:grid-cols-2">
          {c.data.map((d, i) => (
            <div
              key={i}
              className="flex items-baseline justify-between border-b border-dotted border-warm-line/60 py-1 last:border-0"
            >
              <span className="text-xs text-warm-stone">{d.label}</span>
              <span className="font-mono text-xs text-warm-black num">
                {d.value}
              </span>
            </div>
          ))}
        </div>
      )}
      <p className="text-base font-medium text-warm-black">{c.question}</p>
      <div className="space-y-2">
        {c.options.map((opt, i) => {
          const picked = pickedIndex === i;
          const tone = !answered
            ? 'border-warm-line bg-warm-white/70 hover:border-copper/60'
            : opt.isBest
              ? 'border-copper bg-copper/15'
              : picked
                ? 'border-signal-bad/60 bg-signal-bad/10'
                : 'border-warm-line bg-warm-paper/40 opacity-80';
          return (
            <button
              key={i}
              type="button"
              disabled={answered}
              onClick={() => pick(i)}
              className={`w-full rounded-lg border-2 p-3 text-left text-sm transition-all duration-aa ease-aa ${tone} ${
                answered ? 'cursor-default' : 'cursor-pointer'
              }`}
            >
              <div className="flex items-baseline gap-3">
                <span
                  className={`mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[10px] font-mono num ${
                    answered && opt.isBest
                      ? 'border-copper bg-copper text-warm-white'
                      : answered && picked
                        ? 'border-signal-bad bg-signal-bad text-warm-white'
                        : 'border-warm-line text-warm-stone'
                  }`}
                >
                  {answered ? (opt.isBest ? '✓' : picked ? '✗' : i + 1) : i + 1}
                </span>
                <span
                  className={`leading-snug ${
                    answered && opt.isBest
                      ? 'text-copper-deep font-medium'
                      : 'text-warm-ink'
                  }`}
                >
                  {opt.label}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </Card>
  );
}

interface AutoItemProps {
  item: Extract<FinalExamItem, { kind: 'autoCredit' }>;
  answer: FinalExamAnswer | null;
  onAnswer: (a: FinalExamAnswer) => void;
}

function AutoCreditItemView({ item, answer, onAnswer }: AutoItemProps) {
  const answered = !!answer;
  return (
    <Card className="space-y-3 border-copper/30 bg-copper/5">
      <div className="text-xs font-medium uppercase tracking-widest text-copper-ink">
        Auto-credit · {item.via}
      </div>
      <div className="text-sm text-warm-ink">{item.label}</div>
      <p className="text-xs text-warm-stone">
        You passed the corresponding module benchmark, so this exam item is
        credited automatically. The interactive {item.via} test was the module
        benchmark itself — re-running it inside the exam wouldn't add signal.
      </p>
      {!answered && (
        <Button
          variant="secondary"
          onClick={() => onAnswer({ kind: 'autoCredit', correct: true })}
          className="text-xs"
        >
          Accept credit
        </Button>
      )}
      {answered && (
        <div className="text-xs text-signal-good-ink">✓ Credited</div>
      )}
    </Card>
  );
}

// -------------------- Results --------------------

interface ResultsProps {
  cert: Cert;
  run: FinalExamRun;
  answers: (FinalExamAnswer | null)[];
  onExit: () => void;
}

function FinalExamResults({ cert, run, answers, onExit }: ResultsProps) {
  const score = useMemo(
    () => scoreFinalExam(cert.finalExam, run.items, answers),
    [cert, run, answers],
  );
  return (
    <div className="mx-auto max-w-3xl space-y-5 py-10">
      <header className="space-y-2">
        <h1 className="display text-4xl text-warm-black">
          Final exam — {cert.title}
          <span className="text-copper">.</span>
        </h1>
      </header>

      <Card
        className={`space-y-3 ${
          score.passed
            ? 'border-signal-good/40 bg-signal-good/5'
            : 'border-signal-bad/30 bg-signal-bad/5'
        }`}
      >
        <div className="flex items-baseline justify-between gap-3">
          <div>
            <div className="text-xs font-medium uppercase tracking-widest text-warm-mute">
              {score.passed ? '★ Passed' : 'Did not pass'}
            </div>
            <div className="display text-3xl text-warm-black">
              {Math.round(score.pct * 100)}%
            </div>
            <div className="font-mono text-[11px] text-warm-mute num">
              {score.correct}/{score.total} items · need ≥
              {Math.round(cert.finalExam.passThresholdPct * 100)}% to pass
            </div>
          </div>
          <Button onClick={onExit} className="text-sm">
            ← Back to cert
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-2 border-t border-warm-line pt-3 sm:grid-cols-4">
          {Object.entries(score.byMode).map(([mode, s]) => (
            <div key={mode} className="rounded-md border border-warm-line bg-warm-white/50 p-2">
              <div className="text-[10px] uppercase tracking-widest text-warm-mute">
                {mode}
              </div>
              <div className="font-mono text-sm text-warm-ink num">
                {s.correct}/{s.total}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {score.passed && (
        <Card className="border-signal-good/40">
          <div className="text-sm text-warm-ink">
            ★ <span className="font-medium">{cert.title}</span> earned. The
            badge is on your cert detail page; you can also view it on the
            Profile screen.
          </div>
        </Card>
      )}
      {!score.passed && (
        <Card>
          <div className="text-sm text-warm-stone">
            Brush up on the items you missed and retry the exam — your modules
            stay passed.
          </div>
        </Card>
      )}
    </div>
  );
}
