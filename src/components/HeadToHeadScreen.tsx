import { useEffect, useMemo, useRef, useState } from 'react';
import { useAuth } from '../cloud/auth';
import {
  acceptMatchByToken,
  canPlay,
  createMatch,
  fetchMatchById,
  fetchMatchProfiles,
  fetchMyMatches,
  type Match,
  type MatchWithProfiles,
  settleOutcome,
  submitMatchResult,
} from '../cloud/matches';
import { generateFromSeed } from '../quiz/dailyChallenge';
import { parseInput } from '../quiz/parseInput';
import { scoreAnswer } from '../quiz/tolerance';
import type { Question } from '../types/question';
import { AnswerInput, type AnswerInputHandle } from './AnswerInput';
import { Button } from './ui/Button';
import { Card } from './ui/Card';
import { QuestionCard } from './QuestionCard';

interface Props {
  onBack: () => void;
}

function fmtMs(ms: number | null): string {
  if (ms == null) return '—';
  const total = Math.round(ms / 1000);
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
}

export function HeadToHeadScreen({ onBack }: Props) {
  const { user, cloudEnabled } = useAuth();
  const [matches, setMatches] = useState<Match[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  async function refresh() {
    if (!user) {
      setLoading(false);
      return;
    }
    setLoading(true);
    const list = await fetchMyMatches(user.id);
    setMatches(list);
    setLoading(false);
  }

  useEffect(() => {
    if (!cloudEnabled || !user) {
      setLoading(false);
      return;
    }
    refresh();
  }, [cloudEnabled, user]);

  if (!cloudEnabled) {
    return (
      <Layout onBack={onBack}>
        <Card className="text-sm text-warm-stone">
          Cloud sync is off. Head-to-head activates when{' '}
          <code>VITE_SUPABASE_URL</code> / <code>VITE_SUPABASE_ANON_KEY</code>{' '}
          are configured.
        </Card>
      </Layout>
    );
  }

  if (!user) {
    return (
      <Layout onBack={onBack}>
        <Card className="text-sm text-warm-stone">
          Sign in on the Profile screen to create or accept matches.
        </Card>
      </Layout>
    );
  }

  if (selectedId) {
    return (
      <MatchDetail
        matchId={selectedId}
        userId={user.id}
        onBack={() => {
          setSelectedId(null);
          refresh();
        }}
      />
    );
  }

  return (
    <Layout onBack={onBack}>
      <Card className="space-y-2">
        <div className="text-xs font-medium uppercase tracking-widest text-warm-mute">
          Your matches
        </div>
        {loading ? (
          <p className="font-mono text-[11px] text-warm-mute">Loading…</p>
        ) : matches.length === 0 ? (
          <p className="text-sm text-warm-stone">
            No matches yet. Create one below or accept an invite from a peer.
          </p>
        ) : (
          <ul className="space-y-1 font-mono text-[11px] num">
            {matches.map((m) => (
              <MatchListRow
                key={m.id}
                match={m}
                userId={user.id}
                onOpen={() => setSelectedId(m.id)}
              />
            ))}
          </ul>
        )}
      </Card>
      <CreateMatchCard userId={user.id} onCreated={(id) => { refresh(); setSelectedId(id); }} />
      <AcceptMatchCard onAccepted={(id) => { refresh(); setSelectedId(id); }} />
    </Layout>
  );
}

function Layout({ onBack, children }: { onBack: () => void; children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-3xl space-y-5 py-8">
      <header className="flex flex-wrap items-baseline justify-between gap-3">
        <div>
          <div className="display text-3xl text-warm-black">
            Head-to-head<span className="text-copper">.</span>
          </div>
          <p className="font-mono text-[11px] uppercase tracking-widest text-warm-mute num">
            1v1 async match · 10 questions, same seed both sides · 7-day expiry
          </p>
        </div>
        <Button variant="ghost" onClick={onBack} className="text-xs">
          ← Back
        </Button>
      </header>
      {children}
    </div>
  );
}

function MatchListRow({
  match,
  userId,
  onOpen,
}: {
  match: Match;
  userId: string;
  onOpen: () => void;
}) {
  const isHost = match.host_id === userId;
  const role = isHost ? 'You hosted' : 'Invite from peer';
  const dateLabel = new Date(match.created_at).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
  let stateLabel: string;
  if (match.status === 'open') stateLabel = 'awaiting opponent';
  else if (match.status === 'expired') stateLabel = 'expired';
  else if (match.status === 'settled') {
    const o = settleOutcome(match);
    if (o === 'draw') stateLabel = 'draw';
    else stateLabel = (isHost && o === 'host-win') || (!isHost && o === 'opponent-win') ? 'you won' : 'you lost';
  } else {
    // accepted: figure out next-action from this user's POV
    const youDone = isHost ? match.host_completed_at != null : match.opponent_completed_at != null;
    stateLabel = youDone ? 'waiting on opponent' : 'play now';
  }
  return (
    <li className="flex items-baseline justify-between border-b border-dotted border-warm-line py-1.5">
      <button
        type="button"
        onClick={onOpen}
        className="text-left text-warm-black hover:text-copper-deep hover:underline"
      >
        <span className="text-warm-stone">{role}</span>{' '}
        <span className="text-warm-mute">· {dateLabel}</span>
      </button>
      <span
        className={`text-[10px] uppercase tracking-widest ${
          stateLabel === 'play now' ? 'text-copper-deep font-medium' : 'text-warm-mute'
        }`}
      >
        {stateLabel}
      </span>
    </li>
  );
}

function CreateMatchCard({ userId, onCreated }: { userId: string; onCreated: (matchId: string) => void }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleCreate() {
    setBusy(true);
    setError(null);
    const res = await createMatch(userId);
    setBusy(false);
    if (res.ok) onCreated(res.match.id);
    else setError(res.error);
  }

  return (
    <Card className="space-y-2">
      <div className="text-xs font-medium uppercase tracking-widest text-warm-mute">
        Challenge a peer
      </div>
      <p className="text-sm text-warm-stone">
        Creates a match with a random seed. Share the (id, token) pair with the
        person you want to play. Both of you complete the same 10-question set
        independently; results compare automatically once both have submitted.
      </p>
      {error && <p className="font-mono text-[11px] text-signal-bad-ink">{error}</p>}
      <div className="flex justify-end">
        <Button onClick={handleCreate} disabled={busy}>
          {busy ? 'Creating…' : 'Create new match'}
        </Button>
      </div>
    </Card>
  );
}

function AcceptMatchCard({ onAccepted }: { onAccepted: (matchId: string) => void }) {
  const [matchId, setMatchId] = useState('');
  const [token, setToken] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleAccept(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const res = await acceptMatchByToken(matchId.trim(), token);
    setBusy(false);
    if (res.ok) {
      onAccepted(matchId.trim());
      setMatchId('');
      setToken('');
    } else {
      setError(res.error ?? 'accept failed');
    }
  }

  return (
    <Card className="space-y-2">
      <div className="text-xs font-medium uppercase tracking-widest text-warm-mute">
        Accept a match
      </div>
      <form onSubmit={handleAccept} className="space-y-2">
        <input
          type="text"
          value={matchId}
          onChange={(e) => setMatchId(e.target.value)}
          placeholder="match id (uuid)"
          className="w-full rounded-lg border border-warm-line bg-warm-white px-3 py-2 font-mono text-sm outline-none focus:border-copper"
        />
        <input
          type="text"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="invite token"
          className="w-full rounded-lg border border-warm-line bg-warm-white px-3 py-2 font-mono text-sm outline-none focus:border-copper"
        />
        {error && <p className="font-mono text-[11px] text-signal-bad-ink">{error}</p>}
        <div className="flex justify-end">
          <Button type="submit" disabled={busy || !matchId.trim() || !token.trim()}>
            {busy ? 'Accepting…' : 'Accept'}
          </Button>
        </div>
      </form>
    </Card>
  );
}

interface MatchDetailProps {
  matchId: string;
  userId: string;
  onBack: () => void;
}

function MatchDetail({ matchId, userId, onBack }: MatchDetailProps) {
  const [match, setMatch] = useState<MatchWithProfiles | null>(null);
  const [loading, setLoading] = useState(true);
  const [playing, setPlaying] = useState(false);

  async function refresh() {
    setLoading(true);
    const m = await fetchMatchById(matchId);
    if (m) {
      const enriched = await fetchMatchProfiles(m);
      setMatch(enriched);
    } else {
      setMatch(null);
    }
    setLoading(false);
  }

  useEffect(() => {
    refresh();
  }, [matchId]);

  if (loading) {
    return (
      <Layout onBack={onBack}>
        <Card className="font-mono text-[11px] text-warm-mute">Loading…</Card>
      </Layout>
    );
  }
  if (!match) {
    return (
      <Layout onBack={onBack}>
        <Card className="text-sm text-warm-stone">
          Match not found, or you don't have access.
        </Card>
      </Layout>
    );
  }

  if (playing) {
    return (
      <PlayMatch
        match={match}
        userId={userId}
        onDone={() => {
          setPlaying(false);
          refresh();
        }}
        onCancel={() => setPlaying(false)}
      />
    );
  }

  const isHost = match.host_id === userId;
  const opponentName = match.opponent_id
    ? match.opponent_handle ?? '(private profile)'
    : null;
  const playable = canPlay(match, userId);

  return (
    <Layout onBack={onBack}>
      <Card className="space-y-2">
        <div className="text-xs font-medium uppercase tracking-widest text-warm-mute">
          Match · {match.status}
        </div>
        <div className="grid grid-cols-2 gap-3 font-mono text-[11px] num">
          <div>
            <div className="text-[10px] uppercase tracking-wider text-warm-mute">
              Host
            </div>
            <div className="text-warm-black">
              {match.host_handle ? `@${match.host_handle}` : '(private)'}
              {isHost ? ' · you' : ''}
            </div>
            <div className="text-warm-mute">
              {match.host_completed_at
                ? `${match.host_correct}/10 · ${fmtMs(match.host_time_ms)}`
                : 'not yet played'}
            </div>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-wider text-warm-mute">
              Opponent
            </div>
            <div className="text-warm-black">
              {opponentName ?? 'awaiting accept'}
              {match.opponent_id === userId ? ' · you' : ''}
            </div>
            <div className="text-warm-mute">
              {match.opponent_completed_at
                ? `${match.opponent_correct}/10 · ${fmtMs(match.opponent_time_ms)}`
                : 'not yet played'}
            </div>
          </div>
        </div>
      </Card>

      {match.status === 'open' && isHost && (
        <Card className="space-y-2">
          <div className="text-xs font-medium uppercase tracking-widest text-warm-mute">
            Invite a peer
          </div>
          <p className="text-sm text-warm-stone">
            Share both values — they'll paste them into the Accept-a-match form.
          </p>
          <div className="space-y-1 font-mono text-[11px] num">
            <div className="flex items-baseline justify-between border-b border-dotted border-warm-line py-1">
              <span className="text-warm-mute">match id</span>
              <span className="text-warm-black break-all">{match.id}</span>
            </div>
            <div className="flex items-baseline justify-between py-1">
              <span className="text-warm-mute">token</span>
              <span className="text-warm-black break-all">{match.invite_token}</span>
            </div>
          </div>
        </Card>
      )}

      {match.status === 'settled' && <SettledCard match={match} userId={userId} />}

      {playable && (
        <div className="flex justify-end">
          <Button onClick={() => setPlaying(true)}>Play your side</Button>
        </div>
      )}
      {match.status === 'accepted' && !playable && (
        <Card className="text-sm text-warm-stone">
          You've submitted your side. Waiting on the other player.
        </Card>
      )}
    </Layout>
  );
}

function SettledCard({ match, userId }: { match: MatchWithProfiles; userId: string }) {
  const o = settleOutcome(match);
  const isHost = match.host_id === userId;
  let headline: string;
  let tone: string;
  if (o === 'draw') {
    headline = 'Draw';
    tone = 'text-warm-stone';
  } else if ((isHost && o === 'host-win') || (!isHost && o === 'opponent-win')) {
    headline = 'You won';
    tone = 'text-copper-deep';
  } else {
    headline = 'You lost';
    tone = 'text-signal-bad-ink';
  }
  return (
    <Card className="space-y-2">
      <div className="text-xs font-medium uppercase tracking-widest text-warm-mute">
        Result
      </div>
      <div className={`display text-2xl ${tone}`}>{headline}</div>
      <p className="font-mono text-[11px] text-warm-mute num">
        Higher correct wins · ties broken on speed
      </p>
    </Card>
  );
}

interface PlayProps {
  match: MatchWithProfiles;
  userId: string;
  onDone: () => void;
  onCancel: () => void;
}

interface Attempt {
  correct: boolean;
  userInput: number | null;
  elapsedMs: number;
}

function PlayMatch({ match, userId, onDone, onCancel }: PlayProps) {
  const questions = useMemo(() => generateFromSeed(match.seed), [match.seed]);
  const [index, setIndex] = useState(0);
  const [raw, setRaw] = useState('');
  const [attempts, setAttempts] = useState<Attempt[]>([]);
  const startRef = useRef<number>(Date.now());
  const stepStartRef = useRef<number>(Date.now());
  const inputRef = useRef<AnswerInputHandle>(null);
  const [submitState, setSubmitState] = useState<'idle' | 'pending' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);

  async function finalize(finalAttempts: Attempt[]) {
    const correctCount = finalAttempts.filter((a) => a.correct).length;
    const totalMs = Date.now() - startRef.current;
    setSubmitState('pending');
    const res = await submitMatchResult(match.id, correctCount, totalMs);
    if (!res.ok) {
      setSubmitState('error');
      setError(res.error ?? 'submit failed');
      return;
    }
    onDone();
  }

  function handleSubmit() {
    const q: Question = questions[index];
    const value = parseInput(raw, q.unit);
    const now = Date.now();
    const elapsed = now - stepStartRef.current;
    let correct = false;
    if (value !== null) {
      const result = scoreAnswer(value, q);
      correct = result.correct;
    }
    const next: Attempt = { correct, userInput: value, elapsedMs: elapsed };
    const newAttempts = [...attempts, next];
    setAttempts(newAttempts);

    if (index + 1 >= questions.length) {
      finalize(newAttempts);
    } else {
      setIndex(index + 1);
      setRaw('');
      stepStartRef.current = now;
      window.setTimeout(() => inputRef.current?.focus(), 0);
    }
  }

  return (
    <Layout onBack={onCancel}>
      <Card className="space-y-3">
        <div className="flex items-baseline justify-between font-mono text-[11px] uppercase tracking-widest text-warm-mute num">
          <span>
            Question {index + 1} / {questions.length}
          </span>
          <span>{questions[index].appliedDifficulty ?? '—'}</span>
        </div>
        <QuestionCard question={questions[index]} />
        <AnswerInput
          ref={inputRef}
          unit={questions[index].unit}
          value={raw}
          onChange={setRaw}
          onSubmit={handleSubmit}
        />
        <div className="flex items-center justify-between">
          <span className="font-mono text-[11px] text-warm-mute num">
            {match.host_id === userId ? 'You are host' : 'You are opponent'}
          </span>
          <Button onClick={handleSubmit} disabled={raw.trim() === '' || submitState === 'pending'}>
            {submitState === 'pending'
              ? 'Submitting…'
              : index + 1 === questions.length
                ? 'Submit final'
                : 'Next →'}
          </Button>
        </div>
        {submitState === 'error' && error && (
          <p className="font-mono text-[11px] text-signal-bad-ink">{error}</p>
        )}
      </Card>
    </Layout>
  );
}
