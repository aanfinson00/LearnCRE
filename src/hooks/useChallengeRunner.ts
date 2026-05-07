import { useRef, useState } from 'react';
import { parseInput } from '../quiz/parseInput';
import { scoreAnswer } from '../quiz/tolerance';
import type { AnswerInputHandle } from '../components/AnswerInput';
import type { Question } from '../types/question';

export interface ChallengeAttempt {
  correct: boolean;
  userInput: number | null;
  elapsedMs: number;
}

interface Options {
  questions: Question[];
  /** Fires once the final attempt has been recorded. The hook guards against
   *  re-fire — repeated `submit()` calls after completion are no-ops. */
  onComplete: (attempts: ChallengeAttempt[], totalMs: number) => void;
}

export interface ChallengeRunnerApi {
  /** Index of the question currently displayed (0-based). */
  index: number;
  /** Raw value of the answer input. */
  raw: string;
  setRaw: (v: string) => void;
  /** All attempts recorded so far. */
  attempts: ChallengeAttempt[];
  /** Ref to forward to the AnswerInput so we can refocus on advance. */
  inputRef: React.RefObject<AnswerInputHandle>;
  /** Submit the current answer. Advances to the next question or fires
   *  onComplete when the last question has been submitted. */
  submit: () => void;
  /** True after the final question has been submitted. */
  isFinished: boolean;
  /** Total elapsed time across all attempts (ms). */
  totalMs: number;
}

/**
 * Shared state machine for the play loop in Daily / Weekly / Head-to-head
 * challenge screens. Holds index, current input, attempts, per-step + total
 * timers, and a refocus ref. Each caller renders its own surrounding UI
 * (header, progress chip, submit-state banner) and supplies the
 * `onComplete` callback that does the cloud submit / navigation / etc.
 *
 * Mount the component that uses this hook only when entering the play
 * stage; unmount when leaving. Timers initialize on first render.
 */
export function useChallengeRunner({
  questions,
  onComplete,
}: Options): ChallengeRunnerApi {
  const [index, setIndex] = useState(0);
  const [raw, setRaw] = useState('');
  const [attempts, setAttempts] = useState<ChallengeAttempt[]>([]);
  const [isFinished, setIsFinished] = useState(false);
  const startRef = useRef<number>(Date.now());
  const stepStartRef = useRef<number>(Date.now());
  const inputRef = useRef<AnswerInputHandle>(null);
  // finishedRef guards onComplete against double-fire on rapid submits.
  const finishedRef = useRef(false);

  function submit() {
    if (finishedRef.current) return;
    const q = questions[index];
    const value = parseInput(raw, q.unit);
    const now = Date.now();
    const elapsed = now - stepStartRef.current;
    let correct = false;
    if (value !== null) {
      const result = scoreAnswer(value, q);
      correct = result.correct;
    }
    const next: ChallengeAttempt = { correct, userInput: value, elapsedMs: elapsed };
    const newAttempts = [...attempts, next];
    setAttempts(newAttempts);

    if (index + 1 >= questions.length) {
      finishedRef.current = true;
      setIsFinished(true);
      const totalMs = Date.now() - startRef.current;
      onComplete(newAttempts, totalMs);
    } else {
      setIndex(index + 1);
      setRaw('');
      stepStartRef.current = now;
      window.setTimeout(() => inputRef.current?.focus(), 0);
    }
  }

  const totalMs = attempts.reduce((sum, a) => sum + a.elapsedMs, 0);
  return {
    index,
    raw,
    setRaw,
    attempts,
    inputRef,
    submit,
    isFinished,
    totalMs,
  };
}
