import { useEffect, useMemo, useState } from 'react';
import { useAuth } from '../cloud/auth';
import { startChallenge, submitChallenge } from '../cloud/challengeScoring';
import {
  fetchMyWeeklyResult,
  fetchWeeklyLeaderboard,
  type WeeklyLeaderboardRow,
} from '../cloud/weeklyChallenge';
import {
  WEEKLY_CHALLENGES,
  generateWeekly,
  getCurrentWeeklyChallenge,
  getNextWeeklyChallenge,
  markWeeklyPlayedLocally,
  wasWeeklyPlayedLocally,
} from '../quiz/weeklyChallenges';
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

function fmtRange(startsAtIso: string, endsAtIso: string): string {
  const fmt = (iso: string) =>
    new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  return `${fmt(startsAtIso)} – ${fmt(endsAtIso)}`;
}

export function WeeklyChallengeScreen({ onBack }: Props) {
  const { user, cloudEnabled } = useAuth();
  const current = useMemo(() => getCurrentWeeklyChallenge(), []);
  const next = useMemo(() => getNextWeeklyChallenge(), []);

  if (!current) {
    return (
      <div className="mx-auto max-w-3xl space-y-5 py-8">
        <header className="flex flex-wrap items-baseline justify-between gap-3">
          <div>
            <div className="display text-3xl text-warm-black">
              Weekly challenge<span className="text-copper">.</span>
            </div>
            <p className="font-mono text-[11px] uppercase tracking-widest text-warm-mute num">
              No active theme right now
            </p>
          </div>
          <Button variant="ghost" onClick={onBack} className="text-xs">
            ← Back
          </Button>
        </header>
        <Card className="space-y-2">
          <p className="editorial text-base text-warm-ink">
            Weekly challenges swap Mondays at 12:00 UTC.
          </p>
          {next && (
            <p className="text-sm text-warm-stone">
              Up next: <span className="font-medium text-warm-black">{next.theme}</span>{' '}
              · {fmtRange(next.startsAtIso, next.endsAtIso)} · curated by{' '}
              <a href={`/u/${next.curatorHandle}`} className="text-copper-deep hover:underline">
                @{next.curatorHandle}
              </a>
            </p>
          )}
        </Card>
        <UpcomingThemes />
      </div>
    );
  }

  return <WeeklyRunner challenge={current} onBack={onBack} cloudEnabled={cloudEnabled} userId={user?.id ?? null} />;
}

interface RunnerProps {
  challenge: ReturnType<typeof getCurrentWeeklyChallenge> & object;
  onBack: () => void;
  cloudEnabled: boolean;
  userId: string | null;
}

function WeeklyRunner({ challenge, onBack, cloudEnabled, userId }: RunnerProps) {
  const questions = useMemo(() => generateWeekly(challenge), [challenge]);
  const [stage, setStage] = useState<Stage>(
    wasWeeklyPlayedLocally(challenge.id) ? 'finished' : 'intro',
  );
  const [finalAttempts, setFinalAttempts] = useState<ChallengeAttempt[]>([]);
  const [finalTotalMs, setFinalTotalMs] = useState(0);

  const [leaderboard, setLeaderboard] = useState<WeeklyLeaderboardRow[]>([]);
  const [myCloudResult, setMyCloudResult] = useState<{
    correct: number;
    time_ms: number;
  } | null>(null);
  const [submitState, setSubmitState] = useState<'idle' | 'pending' | 'done' | 'error'>('idle');
  // Ranked runs are graded and timed by the score-challenge Edge Function.
  const [ranked, setRanked] = useState(false);
  const [starting, setStarting] = useState(false);
  const [flagged, setFlagged] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  async function begin() {
    if (cloudEnabled && userId) {
      setStarting(true);
      const res = await startChallenge('weekly', challenge.id);
      setStarting(false);
      if (!res.ok && res.error === 'already_played') {
        markWeeklyPlayedLocally(challenge.id);
        if (res.result) setMyCloudResult({ correct: res.result.correct, time_ms: res.result.timeMs });
        setStage('finished');
        return;
      }
      setRanked(res.ok);
      if (!res.ok) setNotice("Couldn't reach the leaderboard server, so this run won't be ranked.");
    }
    setStage('playing');
  }

  useEffect(() => {
    if (stage !== 'finished') return;
    if (!cloudEnabled) return;
    let active = true;
    (async () => {
      const top = await fetchWeeklyLeaderboard(challenge.id);
      if (active) setLeaderboard(top);
      if (userId) {
        const mine = await fetchMyWeeklyResult(userId, challenge.id);
        if (active && mine) {
          setMyCloudResult({ correct: mine.correct, time_ms: mine.time_ms });
        }
      }
    })();
    return () => {
      active = false;
    };
  }, [stage, challenge.id, cloudEnabled, userId]);

  async function handlePlayerComplete(attempts: ChallengeAttempt[], totalMs: number) {
    setFinalAttempts(attempts);
    setFinalTotalMs(totalMs);
    markWeeklyPlayedLocally(challenge.id);
    setStage('finished');

    if (ranked) {
      setSubmitState('pending');
      const res = await submitChallenge('weekly', challenge.id, attempts.map((a) => a.userInput));
      if (res.ok) {
        setMyCloudResult({ correct: res.correct, time_ms: res.timeMs });
        setFlagged(res.flagged);
        setSubmitState('done');
      } else {
        setSubmitState('error');
      }
    }
  }

  const correctCount = finalAttempts.filter((a) => a.correct).length;
  const totalMs = finalTotalMs;

  return (
    <div className="mx-auto max-w-3xl space-y-5 py-8">
      <header className="flex flex-wrap items-baseline justify-between gap-3">
        <div>
          <div className="display text-3xl text-warm-black">
            {challenge.theme}<span className="text-copper">.</span>
          </div>
          <p className="font-mono text-[11px] uppercase tracking-widest text-warm-mute num">
            {fmtRange(challenge.startsAtIso, challenge.endsAtIso)} · 10 questions ·{' '}
            curated by{' '}
            <a
              href={`/u/${challenge.curatorHandle}`}
              className="text-copper-deep hover:underline"
            >
              @{challenge.curatorHandle}
            </a>
          </p>
        </div>
        <Button variant="ghost" onClick={onBack} className="text-xs">
          ← Back
        </Button>
      </header>

      {stage === 'intro' && (
        <Card className="space-y-3">
          <p className="editorial text-base text-warm-ink">{challenge.blurb}</p>
          <p className="text-sm text-warm-stone">
            One play per theme; same questions for everyone. Faster + more
            correct wins ties on the leaderboard.
            {!cloudEnabled && ' Cloud sync is off, so you can play locally but the leaderboard is hidden.'}
          </p>
          <div className="flex justify-end pt-2">
            <Button onClick={begin} disabled={starting}>
              {starting ? 'Starting…' : `Begin ${challenge.theme}`}
            </Button>
          </div>
        </Card>
      )}

      {stage === 'playing' && (
        <WeeklyPlayer questions={questions} onComplete={handlePlayerComplete} />
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
                <Stat label="Time" value={fmtMs(myCloudResult?.time_ms ?? totalMs)} />
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
                You played this week's theme. Come back Monday for a new one.
              </p>
            )}
            {submitState === 'pending' && (
              <p className="font-mono text-[11px] text-warm-mute">Submitting…</p>
            )}
            {submitState === 'error' && (
              <p className="font-mono text-[11px] text-signal-bad-ink">
                Could not record this run on the leaderboard.
              </p>
            )}
            {submitState === 'done' && !flagged && (
              <p className="font-mono text-[11px] text-warm-mute">Graded and timed on the server · ranked.</p>
            )}
            {flagged && (
              <p className="font-mono text-[11px] text-signal-bad-ink">
                Recorded, but finished too fast to rank publicly.
              </p>
            )}
            {notice && <p className="font-mono text-[11px] text-warm-mute">{notice}</p>}
          </Card>

          {cloudEnabled ? (
            <Card className="space-y-2">
              <div className="text-xs font-medium uppercase tracking-widest text-warm-mute">
                Theme leaderboard
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
                    const isMe = userId === row.user_id;
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
              Sign in to compete on the theme leaderboard.
            </Card>
          )}
        </>
      )}
    </div>
  );
}

function UpcomingThemes() {
  const upcoming = WEEKLY_CHALLENGES.filter(
    (c) => Date.parse(c.startsAtIso) > Date.now(),
  ).slice(0, 4);
  if (upcoming.length === 0) return null;
  return (
    <Card className="space-y-2">
      <div className="text-xs font-medium uppercase tracking-widest text-warm-mute">
        Upcoming themes
      </div>
      <ul className="space-y-1 font-mono text-[11px] num">
        {upcoming.map((c) => (
          <li
            key={c.id}
            className="flex items-baseline justify-between border-b border-dotted border-warm-line py-1"
          >
            <span className="text-warm-black">{c.theme}</span>
            <span className="text-warm-mute">
              {fmtRange(c.startsAtIso, c.endsAtIso)}
            </span>
          </li>
        ))}
      </ul>
    </Card>
  );
}

function WeeklyPlayer({
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
