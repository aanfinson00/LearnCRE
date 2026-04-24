import { useEffect, useRef, useState } from 'react';
import type { QuizSession, SessionStats } from '../types/session';
import { AnswerInput, type AnswerInputHandle } from './AnswerInput';
import { CalculatorPanel } from './CalculatorPanel';
import { ChoiceList } from './ChoiceList';
import { FeedbackPanel } from './FeedbackPanel';
import { QuestionCard } from './QuestionCard';
import { StatsBar } from './StatsBar';
import { Button } from './ui/Button';
import { Card } from './ui/Card';
import { useKeyboard } from '../hooks/useKeyboard';
import { parseInput } from '../quiz/parseInput';

const CALC_PREF_KEY = 'learncre.calcEnabled.v1';
function loadCalcPref(): boolean {
  try {
    return localStorage.getItem(CALC_PREF_KEY) === '1';
  } catch {
    return false;
  }
}
function saveCalcPref(on: boolean): void {
  try {
    localStorage.setItem(CALC_PREF_KEY, on ? '1' : '0');
  } catch {
    /* ignore */
  }
}

interface Props {
  session: QuizSession;
  stats: SessionStats;
  onSubmit: (userInput: number | null, skipped: boolean) => void;
  onNext: () => void;
  onEnd: () => void;
  onQuit: () => void;
}

export function QuizScreen({ session, stats, onSubmit, onNext, onEnd, onQuit }: Props) {
  const q = session.currentQuestion;
  const [raw, setRaw] = useState('');
  const [mcPick, setMcPick] = useState<number | null>(null);
  const [calcOn, setCalcOn] = useState<boolean>(loadCalcPref);
  const inputRef = useRef<AnswerInputHandle>(null);

  const toggleCalc = () => {
    setCalcOn((v) => {
      saveCalcPref(!v);
      return !v;
    });
  };

  useEffect(() => {
    setRaw('');
    setMcPick(null);
    if (session.status === 'active') {
      inputRef.current?.focus();
    }
  }, [session.currentQuestion?.id, session.status]);

  const isAnswered = session.status === 'answered';
  const lastAttempt = session.lastAttempt;

  const submitFree = () => {
    if (!q || session.status !== 'active') return;
    const parsed = parseInput(raw, q.unit);
    if (parsed === null) return;
    onSubmit(parsed, false);
  };

  const submitMC = (choice: number) => {
    if (!q || session.status !== 'active') return;
    setMcPick(choice);
    onSubmit(choice, false);
  };

  const skip = () => {
    if (session.status !== 'active') return;
    onSubmit(null, true);
  };

  useKeyboard(
    (e) => {
      const target = e.target as HTMLElement | null;
      const inInput = target?.tagName === 'INPUT' || target?.tagName === 'TEXTAREA';

      if (isAnswered) {
        if (e.key === 'Enter' || e.key === 'n' || e.key === 'N') {
          e.preventDefault();
          onNext();
        }
        return;
      }
      if (q?.choices) {
        if (/^[1-4]$/.test(e.key)) {
          const idx = parseInt(e.key, 10) - 1;
          const choice = q.choices[idx];
          if (choice !== undefined) {
            e.preventDefault();
            submitMC(choice);
          }
          return;
        }
      }
      if ((e.key === 's' || e.key === 'S') && !inInput) {
        e.preventDefault();
        skip();
      }
    },
    [session.status, q?.id, raw, isAnswered, onNext],
  );

  if (!q) return null;
  const total = session.config.plannedCount;
  const isLast = total !== null && session.currentIndex + 1 >= total;

  return (
    <div className="mx-auto max-w-3xl space-y-5 py-6">
      <div className="flex items-center justify-between">
        <StatsBar
          stats={stats}
          currentIndex={session.currentIndex}
          plannedCount={total}
          level={session.config.difficulty === 'dynamic' ? q.appliedDifficulty : undefined}
        />
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            onClick={toggleCalc}
            className={`text-xs ${calcOn ? 'text-copper-deep' : ''}`}
            title={calcOn ? 'Hide calculator' : 'Show calculator panel'}
          >
            {calcOn ? 'Calc on' : 'Calc'}
          </Button>
          <Button
            variant="ghost"
            onClick={onEnd}
            className="text-xs"
            disabled={session.attempts.length === 0}
            title={
              session.attempts.length === 0
                ? 'Answer at least one question first'
                : 'Stop here and jump to your results / review'
            }
          >
            End & review
          </Button>
          <Button variant="ghost" onClick={onQuit} className="text-xs">
            Quit
          </Button>
        </div>
      </div>

      <Card className="space-y-5">
        <QuestionCard question={q} />

        {calcOn && <CalculatorPanel />}

        {!isAnswered &&
          (q.choices ? (
            <ChoiceList
              question={q}
              selected={mcPick}
              onSelect={submitMC}
              correctValue={null}
            />
          ) : (
            <div className="space-y-3">
              <AnswerInput
                ref={inputRef}
                unit={q.unit}
                value={raw}
                onChange={setRaw}
                onSubmit={submitFree}
              />
              <div className="flex justify-between">
                <Button variant="ghost" onClick={skip} className="text-xs">
                  Skip (S)
                </Button>
                <Button onClick={submitFree} disabled={parseInput(raw, q.unit) === null}>
                  Submit <span className="ml-2 text-warm-mute">↵</span>
                </Button>
              </div>
            </div>
          ))}

        {isAnswered && q.choices && (
          <ChoiceList
            question={q}
            selected={lastAttempt?.userInput ?? null}
            onSelect={() => undefined}
            disabled
            correctValue={q.expected}
          />
        )}

        {isAnswered && lastAttempt && (
          <FeedbackPanel
            question={q}
            attempt={lastAttempt}
            onNext={onNext}
            isLast={isLast}
          />
        )}
      </Card>
    </div>
  );
}
