import { useEffect, useMemo, useState } from 'react';
import type {
  MockInterviewState,
  MockProsePrompt,
  MockQuestion,
  MockQuestionAttempt,
} from '../types/mockInterview';
import type { LongformCase, LongformRubricItem } from '../types/longform';
import type { SituationalCase } from '../types/situational';
import type { Question } from '../types/question';
import { rubricScorePct } from '../quiz/mockInterview';
import { scoreAnswer } from '../quiz/tolerance';
import { parseInput } from '../quiz/parseInput';
import { Button } from './ui/Button';
import { Card } from './ui/Card';
import { QuestionCard } from './QuestionCard';
import { AnswerInput } from './AnswerInput';

interface Props {
  state: MockInterviewState;
  onSubmit: (attempt: MockQuestionAttempt) => void;
  onAdvance: () => void;
  onQuit: () => void;
}

export function MockScreen({ state, onSubmit, onAdvance, onQuit }: Props) {
  const q = state.questions[state.currentIndex];
  const lastAttempt = state.attempts[state.attempts.length - 1];
  const answered =
    !!lastAttempt && state.attempts.length === state.currentIndex + 1;
  const isLast = state.currentIndex === state.questions.length - 1;

  return (
    <div className="mx-auto max-w-3xl space-y-5 py-8">
      <header className="flex items-baseline justify-between gap-3">
        <div>
          <h1 className="display text-3xl text-warm-black">
            {state.spec.title}
            <span className="text-copper">.</span>
          </h1>
          <p className="font-mono text-[11px] uppercase tracking-widest text-warm-mute num">
            Question {state.currentIndex + 1} / {state.questions.length} ·{' '}
            {q.sectionLabel}
          </p>
        </div>
        <Button
          variant="ghost"
          onClick={() => {
            if (
              window.confirm(
                'Quit the mock interview? Progress on this attempt will be lost.',
              )
            ) {
              onQuit();
            }
          }}
          className="text-xs"
        >
          Quit
        </Button>
      </header>

      <ProgressStrip
        questions={state.questions}
        attempts={state.attempts}
        current={state.currentIndex}
      />

      {q.kind === 'technical' && (
        <TechnicalCard
          key={`tech-${state.currentIndex}`}
          question={q.question}
          questionId={q.questionId}
          answered={answered}
          onSubmit={onSubmit}
        />
      )}

      {q.kind === 'situational' && (
        <SituationalCard
          key={`sit-${state.currentIndex}`}
          c={q.case}
          caseId={q.caseId}
          answered={answered}
          lastAttempt={lastAttempt}
          onSubmit={onSubmit}
        />
      )}

      {(q.kind === 'fit' || q.kind === 'behavioral' || q.kind === 'marketView') && (
        <ProseCard
          key={`prose-${state.currentIndex}`}
          kind={q.kind}
          prompt={q.prompt}
          promptId={q.promptId}
          answered={answered}
          onSubmit={onSubmit}
        />
      )}

      {q.kind === 'longform' && (
        <LongformCard
          key={`lf-${state.currentIndex}`}
          c={q.case}
          caseId={q.caseId}
          answered={answered}
          onSubmit={onSubmit}
        />
      )}

      {answered && (
        <div className="flex items-center justify-end">
          <Button onClick={onAdvance} className="text-sm">
            {isLast ? 'Finish mock' : 'Next →'}
          </Button>
        </div>
      )}
    </div>
  );
}

// -------------------- Progress strip --------------------

function ProgressStrip({
  questions,
  attempts,
  current,
}: {
  questions: MockQuestion[];
  attempts: MockQuestionAttempt[];
  current: number;
}) {
  return (
    <div className="flex gap-1">
      {questions.map((_, i) => {
        const a = attempts[i];
        const isCurrent = i === current;
        let scoreRatio = 0;
        if (a) {
          scoreRatio =
            a.kind === 'technical' || a.kind === 'situational'
              ? a.correct
                ? 1
                : 0
              : a.scorePct;
        }
        const tone = a
          ? a.skipped
            ? 'bg-warm-line'
            : scoreRatio >= 0.66
              ? 'bg-signal-good'
              : scoreRatio >= 0.34
                ? 'bg-copper'
                : 'bg-signal-bad'
          : isCurrent
            ? 'bg-copper'
            : 'bg-warm-line/60';
        return (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full transition-all duration-aa ease-aa ${tone}`}
          />
        );
      })}
    </div>
  );
}

// -------------------- Technical --------------------

function TechnicalCard({
  question,
  questionId,
  answered,
  onSubmit,
}: {
  question: Question;
  questionId: string;
  answered: boolean;
  onSubmit: (a: MockQuestionAttempt) => void;
}) {
  const [raw, setRaw] = useState('');
  const [start] = useState(Date.now());
  const submit = () => {
    if (answered) return;
    const parsed = parseInput(raw, question.unit);
    const correct =
      parsed !== null && scoreAnswer(parsed, question).correct === true;
    onSubmit({
      kind: 'technical',
      questionId,
      userInput: parsed,
      correct,
      elapsedMs: Date.now() - start,
      skipped: false,
    });
  };
  const skip = () => {
    onSubmit({
      kind: 'technical',
      questionId,
      userInput: null,
      correct: false,
      elapsedMs: Date.now() - start,
      skipped: true,
    });
  };

  return (
    <Card className="space-y-4">
      <QuestionCard question={question} />
      <AnswerInput
        unit={question.unit}
        value={raw}
        onChange={setRaw}
        onSubmit={submit}
        disabled={answered}
      />
      {!answered && (
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={skip} className="text-xs">
            Skip
          </Button>
          <Button variant="secondary" onClick={submit} className="text-xs">
            Submit ↵
          </Button>
        </div>
      )}
      {answered && (
        <div className="rounded-lg border border-copper/40 bg-copper/5 p-3 text-sm text-warm-ink">
          Expected: {question.solution.answerDisplay}
        </div>
      )}
    </Card>
  );
}

// -------------------- Situational --------------------

function SituationalCard({
  c,
  caseId,
  answered,
  lastAttempt,
  onSubmit,
}: {
  c: SituationalCase;
  caseId: string;
  answered: boolean;
  lastAttempt: MockQuestionAttempt | undefined;
  onSubmit: (a: MockQuestionAttempt) => void;
}) {
  const [start] = useState(Date.now());
  const pickedIndex =
    lastAttempt && lastAttempt.kind === 'situational' ? lastAttempt.pickedIndex : null;

  const pick = (i: number) => {
    if (answered) return;
    const correct = !!c.options[i]?.isBest;
    onSubmit({
      kind: 'situational',
      caseId,
      pickedIndex: i,
      correct,
      elapsedMs: Date.now() - start,
      skipped: false,
    });
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
                <span className="leading-snug text-warm-ink">{opt.label}</span>
              </div>
              {answered && (
                <div className="mt-2 ml-8 text-[12px] leading-relaxed text-warm-stone">
                  {opt.explanation}
                </div>
              )}
            </button>
          );
        })}
      </div>
    </Card>
  );
}

// -------------------- Prose (fit / behavioral / marketView) --------------------

function ProseCard({
  kind,
  prompt,
  promptId,
  answered,
  onSubmit,
}: {
  kind: 'fit' | 'behavioral' | 'marketView';
  prompt: MockProsePrompt;
  promptId: string;
  answered: boolean;
  onSubmit: (a: MockQuestionAttempt) => void;
}) {
  return (
    <ProseGradeFlow
      header={prompt.prompt}
      subheader={`Target ~${prompt.expectedDurationSec}s`}
      rubric={prompt.rubric}
      modelAnswer={prompt.modelAnswer}
      tips={prompt.tips}
      promptOrCaseId={promptId}
      kind={kind}
      answered={answered}
      onSubmit={onSubmit}
    />
  );
}

// -------------------- Longform --------------------

function LongformCard({
  c,
  caseId,
  answered,
  onSubmit,
}: {
  c: LongformCase;
  caseId: string;
  answered: boolean;
  onSubmit: (a: MockQuestionAttempt) => void;
}) {
  return (
    <ProseGradeFlow
      header={c.title}
      scenario={c.scenario}
      data={c.data}
      question={c.question}
      rubric={c.rubric}
      modelAnswer={c.modelAnswer}
      tips={c.tips}
      promptOrCaseId={caseId}
      kind="longform"
      answered={answered}
      onSubmit={onSubmit}
    />
  );
}

// -------------------- Shared prose-grade flow --------------------

function ProseGradeFlow(props: {
  header: string;
  subheader?: string;
  scenario?: string;
  data?: { label: string; value: string }[];
  question?: string;
  rubric: LongformRubricItem[];
  modelAnswer: string;
  tips: string[];
  promptOrCaseId: string;
  kind: 'fit' | 'behavioral' | 'marketView' | 'longform';
  answered: boolean;
  onSubmit: (a: MockQuestionAttempt) => void;
}) {
  const [text, setText] = useState('');
  const [scores, setScores] = useState<Record<string, number>>({});
  const [stage, setStage] = useState<'writing' | 'grading'>('writing');
  const [start] = useState(Date.now());

  // Reset scores whenever prompt changes (parent re-mounts via key, so this
  // mostly matters for clarity).
  useEffect(() => {
    setText('');
    setScores({});
    setStage('writing');
  }, [props.promptOrCaseId]);

  const finishWriting = () => setStage('grading');

  const skip = () => {
    props.onSubmit({
      kind: props.kind,
      promptOrCaseId: props.promptOrCaseId,
      userAnswer: '',
      rubricScores: {},
      scorePct: 0,
      elapsedMs: Date.now() - start,
      skipped: true,
    });
  };

  const submitGrades = () => {
    const scorePct = rubricScorePct(props.rubric, scores);
    props.onSubmit({
      kind: props.kind,
      promptOrCaseId: props.promptOrCaseId,
      userAnswer: text,
      rubricScores: scores,
      scorePct,
      elapsedMs: Date.now() - start,
      skipped: false,
    });
  };

  const allRubricScored = useMemo(
    () => props.rubric.length === 0 || props.rubric.every((r) => r.id in scores),
    [props.rubric, scores],
  );

  return (
    <Card className="space-y-4">
      <div>
        <div className="display text-xl text-warm-black">{props.header}</div>
        {props.subheader && (
          <div className="font-mono text-[11px] text-warm-mute num">{props.subheader}</div>
        )}
      </div>

      {props.scenario && (
        <p className="editorial text-base leading-relaxed text-warm-ink">
          {props.scenario}
        </p>
      )}

      {props.data && props.data.length > 0 && (
        <div className="grid grid-cols-1 gap-x-6 gap-y-1 rounded-lg border border-warm-line bg-warm-paper/40 p-3 sm:grid-cols-2">
          {props.data.map((d, i) => (
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

      {props.question && (
        <p className="text-base font-medium text-warm-black">{props.question}</p>
      )}

      {/* Stage 1: writing */}
      {!props.answered && stage === 'writing' && (
        <>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type your answer..."
            rows={8}
            className="w-full rounded-lg border border-warm-line bg-warm-white/80 p-3 font-mono text-sm leading-relaxed text-warm-ink outline-none focus:border-copper"
          />
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={skip} className="text-xs">
              Skip
            </Button>
            <Button
              onClick={finishWriting}
              disabled={text.trim().length < 20}
              className="text-xs"
            >
              Done writing → grade
            </Button>
          </div>
        </>
      )}

      {/* Stage 2: self-grade */}
      {!props.answered && stage === 'grading' && props.rubric.length > 0 && (
        <div className="space-y-3">
          <div className="text-xs font-medium uppercase tracking-widest text-warm-stone">
            Self-grade · 0 (missed) · 1 (partial) · 2 (good) · 3 (nailed it)
          </div>
          {props.rubric.map((item) => (
            <div key={item.id} className="rounded-md border border-warm-line bg-warm-white/50 p-2.5">
              <div className="text-sm text-warm-ink">{item.dimension}</div>
              <div className="mt-2 flex gap-2">
                {[0, 1, 2, 3].map((n) => {
                  const sel = scores[item.id] === n;
                  return (
                    <button
                      key={n}
                      type="button"
                      onClick={() =>
                        setScores((s) => ({ ...s, [item.id]: n }))
                      }
                      className={`rounded-md border px-3 py-1 text-sm font-mono num ${
                        sel
                          ? 'border-warm-black bg-warm-black text-warm-white'
                          : 'border-warm-line bg-warm-white/70 hover:border-copper'
                      }`}
                    >
                      {n}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => setStage('writing')}
              className="text-xs"
            >
              ← Edit answer
            </Button>
            <Button
              onClick={submitGrades}
              disabled={!allRubricScored}
              className="text-xs"
            >
              Submit grades →
            </Button>
          </div>
        </div>
      )}

      {/* No-rubric warmup (e.g. fit kinds with empty rubric) — auto-credit completion */}
      {!props.answered && stage === 'grading' && props.rubric.length === 0 && (
        <div className="space-y-3">
          <p className="text-sm text-warm-stone">
            This is a warm-up; no rubric. Submit to advance.
          </p>
          <Button onClick={submitGrades} className="text-xs">
            Submit
          </Button>
        </div>
      )}

      {/* Post-answer reveal */}
      {props.answered && (
        <div className="space-y-3">
          <Card className="border-copper/40 bg-copper/5">
            <div className="text-xs font-medium uppercase tracking-widest text-copper-ink">
              Model answer
            </div>
            <p className="editorial mt-2 text-sm leading-relaxed text-warm-ink">
              {props.modelAnswer}
            </p>
          </Card>
          {props.tips.length > 0 && (
            <Card>
              <div className="text-xs font-medium uppercase tracking-widest text-warm-stone">
                Tips
              </div>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-xs text-warm-stone">
                {props.tips.map((t, i) => (
                  <li key={i}>{t}</li>
                ))}
              </ul>
            </Card>
          )}
        </div>
      )}
    </Card>
  );
}
