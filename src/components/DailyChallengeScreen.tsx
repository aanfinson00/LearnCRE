import { useEffect, useMemo, useState } from 'react';
import { useAuth } from '../cloud/auth';
import {
  fetchDailyLeaderboard,
  fetchMyDailyResult,
  submitDailyResult,
  type LeaderboardRow,
} from '../cloud/dailyChallenge';
import {
  dailyDate,
  generateDaily,
  markPlayedLocally,
  wasPlayedLocally,
} from '../quiz/dailyChallenge';
import {
  type ChallengeAttempt,
  useChallengeRunner,
} from '../hooks/useChallengeRunner';
import type { Question } from '../types/question';
import { AnswerInput } from './AnswerInput';
import { Button } from './ui/Button';
import { Card } from './ui/Card';
import { QuestionCard } from './QuestionCard';

interface Props {
  onBack: () => void;
}

type Stage = 'intro' | 'playing' | 'finished';

function fmtMs(ms: number): string {
  const total = Math.round(ms / 1000);
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
}

export function DailyChallengeScreen({ onBack }: Props) {
  const { user, cloudEnabled } = useAuth();
  const today = useMemo(() => dailyDate(), []);
  const questions = useMemo(() => generateDaily(today), [today]);

  const [stage, setStage] = useState<Stage>(
    wasPlayedLocally(today) ? 'finished' : 'intro',
  );
  const [finalAttempts, setFinalAttempts] = useState<ChallengeAttempt[]>([]);
  const [finalTotalMs, setFinalTotalMs] = useState(0);

  const [leaderboard, setLeaderboard] = useState<LeaderboardRow[]>([]);
  const [myCloudResult, setMyCloudResult] = useState<{
    correct: number;
    time_ms: number;
  } | null>(null);
  const [submitState, setSubmitState] = useState<'idle' | 'pending' | 'done' | 'error'>('idle');

  // Load leaderboard + own cloud result whenever finished + signed in.
  useEffect(() => {
    if (stage !== 'finished') return;
    if (!cloudEnabled) return;
    let active = true;
    (async () => {
      const top = await fetchDailyLeaderboard(today);
      if (active) setLeaderboard(top);
      if (user) {
        const mine = await fetchMyDailyResult(user.id, today);
        if (active && mine) {
          setMyCloudResult({ correct: mine.correct, time_ms: mine.time_ms });
        }
      }
    })();
    return () => {
      active = false;
    };
  }, [stage, today, cloudEnabled, user]);

  async function handlePlayerComplete(attempts: ChallengeAttempt[], totalMs: number) {
    const correctCount = attempts.filter((a) => a.correct).length;
    setFinalAttempts(attempts);
    setFinalTotalMs(totalMs);
    markPlayedLocally(today);
    setStage('finished');

    if (cloudEnabled && user) {
      setSubmitState('pending');
      const res = await submitDailyResult(
        user.id,
        today,
        correctCount,
        questions.length,
        totalMs,
      );
      setSubmitState(res.ok ? 'done' : 'error');
    }
  }

  const correctCount = finalAttempts.filter((a) => a.correct).length;

  return (
    <div className="mx-auto max-w-3xl space-y-5 py-8">
      <header className="flex flex-wrap items-baseline justify-between gap-3">
        <div>
          <div className="display text-3xl text-warm-black">
            Daily challenge<span className="text-copper">.</span>
          </div>
          <p className="font-mono text-[11px] uppercase tracking-widest text-warm-mute num">
            {today} · 10 questions · same set worldwide
          </p>
        </div>
        <Button variant="ghost" onClick={onBack} className="text-xs">
          ← Back
        </Button>
      </header>

      {stage === 'intro' && (
        <Card className="space-y-3">
          <p className="editorial text-base text-warm-ink">
            Ten questions, same set for everyone today. Mixed difficulty (3
            beginner · 5 intermediate · 2 advanced). Faster + more correct
            wins ties on the leaderboard.
          </p>
          <p className="text-sm text-warm-stone">
            One play per day, locked at submit. Resets at 00:00 UTC.
            {!cloudEnabled && ' Cloud sync is off, so you can play locally but the leaderboard is hidden.'}
          </p>
          <div className="flex justify-end pt-2">
            <Button onClick={() => setStage('playing')}>Begin daily</Button>
          </div>
        </Card>
      )}

      {stage === 'playing' && (
        <DailyPlayer questions={questions} onComplete={handlePlayerComplete} />
      )}

      {stage === 'finished' && (
        <>
          <Card className="space-y-2">
            <div className="text-xs font-medium uppercase tracking-widest text-warm-mute">
              Your run
            </div>
            {finalAttempts.length > 0 ? (
              <div className="grid grid-cols-3 gap-3 font-mono text-sm num">
                <Stat label="Correct" value={`${correctCount} / ${questions.length}`} />
                <Stat label="Accuracy" value={`${Math.round((correctCount / questions.length) * 100)}%`} />
                <Stat label="Time" value={fmtMs(finalTotalMs)} />
              </div>
            ) : myCloudResult ? (
              <div className="grid grid-cols-3 gap-3 font-mono text-sm num">
                <Stat
                  label="Correct"
                  value={`${myCloudResult.correct} / ${questions.length}`}
                />
                <Stat
                  label="Accuracy"
                  value={`${Math.round((myCloudResult.correct / questions.length) * 100)}%`}
                />
                <Stat label="Time" value={fmtMs(myCloudResult.time_ms)} />
              </div>
            ) : (
              <p className="text-sm text-warm-stone">
                You played today. Come back at 00:00 UTC for tomorrow's set.
              </p>
            )}
            {submitState === 'pending' && (
              <p className="font-mono text-[11px] text-warm-mute">Submitting…</p>
            )}
            {submitState === 'error' && (
              <p className="font-mono text-[11px] text-signal-bad-ink">
                Could not save to cloud. Result kept locally.
              </p>
            )}
          </Card>

          {cloudEnabled ? (
            <Card className="space-y-2">
              <div className="text-xs font-medium uppercase tracking-widest text-warm-mute">
                Today's leaderboard
              </div>
              {leaderboard.length === 0 ? (
                <p className="text-sm text-warm-mute">
                  No public results yet. Be the first — flip your profile to
                  public on the Profile screen to appear here.
                </p>
              ) : (
                <ol className="space-y-1 font-mono text-[11px] num">
                  {leaderboard.map((row, i) => {
                    const acc = Math.round((row.correct / row.total) * 100);
                    const isMe = user?.id === row.user_id;
                    return (
                      <li
                        key={row.user_id}
                        className={`flex items-baseline justify-between border-b border-dotted border-warm-line py-1 ${
                          isMe ? 'text-copper-deep font-medium' : ''
                        }`}
                      >
                        <span className="flex items-baseline gap-2">
                          <span className="w-6 text-right text-warm-mute">
                            {i + 1}
                          </span>
                          <a
                            href={`/u/${row.handle}`}
                            className="text-warm-black hover:underline"
                          >
                            @{row.handle}
                          </a>
                        </span>
                        <span className="text-warm-stone">
                          {row.correct}/{row.total} · {acc}% · {fmtMs(row.time_ms)}
                        </span>
                      </li>
                    );
                  })}
                </ol>
              )}
            </Card>
          ) : (
            <Card className="text-sm text-warm-stone">
              Sign in to compete on the daily leaderboard.
            </Card>
          )}
        </>
      )}
    </div>
  );
}

function DailyPlayer({
  questions,
  onComplete,
}: {
  questions: Question[];
  onComplete: (attempts: ChallengeAttempt[], totalMs: number) => void;
}) {
  const runner = useChallengeRunner({ questions, onComplete });
  const q = questions[runner.index];
  const isLast = runner.index + 1 === questions.length;
  return (
    <Card className="space-y-3">
      <div className="flex items-baseline justify-between font-mono text-[11px] uppercase tracking-widest text-warm-mute num">
        <span>
          Question {runner.index + 1} / {questions.length}
        </span>
        <span>{q.appliedDifficulty ?? '—'}</span>
      </div>
      <QuestionCard question={q} />
      <AnswerInput
        ref={runner.inputRef}
        unit={q.unit}
        value={runner.raw}
        onChange={runner.setRaw}
        onSubmit={runner.submit}
      />
      <div className="flex items-center justify-end">
        <Button onClick={runner.submit} disabled={runner.raw.trim() === ''}>
          {isLast ? 'Submit final' : 'Next →'}
        </Button>
      </div>
    </Card>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-wider text-warm-mute">{label}</div>
      <div className="mt-0.5 text-warm-black">{value}</div>
    </div>
  );
}
