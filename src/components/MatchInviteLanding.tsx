import { useEffect, useState } from 'react';
import { useAuth } from '../cloud/auth';
import { acceptMatchByToken } from '../cloud/matches';
import { Button } from './ui/Button';
import { Card } from './ui/Card';

interface Props {
  matchId: string;
  token: string;
}

type Stage =
  | 'idle'
  | 'accepting'
  | 'accepted'
  | 'failed'
  | 'sending'
  | 'sent';

export function MatchInviteLanding({ matchId, token }: Props) {
  const { user, cloudEnabled, signInWithEmail, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [stage, setStage] = useState<Stage>('idle');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!cloudEnabled || loading) return;
    if (!user) return;
    if (stage !== 'idle') return;
    setStage('accepting');
    acceptMatchByToken(matchId, token).then((res) => {
      if (res.ok) {
        setStage('accepted');
      } else {
        setStage('failed');
        setError(res.error);
      }
    });
  }, [cloudEnabled, user, loading, matchId, token, stage]);

  return (
    <main className="mx-auto max-w-xl space-y-4 py-12">
      <header>
        <div className="display text-3xl text-warm-black">
          Head-to-head invite<span className="text-copper">.</span>
        </div>
        <p className="font-mono text-[11px] uppercase tracking-widest text-warm-mute num">
          1v1 async match · 10 questions · same seed both sides · 7-day expiry
        </p>
      </header>

      {!cloudEnabled && (
        <Card className="text-sm text-warm-stone">
          Cloud sync is off in this build. Match invites need cloud configured.
        </Card>
      )}

      {cloudEnabled && (loading || stage === 'accepting') && (
        <Card className="font-mono text-[11px] text-warm-mute num">
          {loading ? 'Checking session…' : 'Accepting match…'}
        </Card>
      )}

      {cloudEnabled && stage === 'accepted' && (
        <Card className="space-y-2">
          <p className="text-sm text-warm-black">Match accepted.</p>
          <p className="font-mono text-[11px] text-warm-mute num">
            Open <code>Compete → Head-to-head</code> to play your side.
          </p>
          <p>
            <a
              href="/"
              className="inline-block font-mono text-xs text-copper-deep hover:underline"
            >
              ← Open LearnCRE
            </a>
          </p>
        </Card>
      )}

      {cloudEnabled && stage === 'failed' && (
        <Card className="space-y-2">
          <p className="text-sm text-signal-bad-ink">
            Couldn't accept: {error ?? 'unknown error'}
          </p>
          <p className="font-mono text-[11px] text-warm-mute num">
            The match may be expired, already accepted by someone else, or
            you may be the host (you can't accept your own match — share
            the link with someone else).
          </p>
          <p>
            <a
              href="/"
              className="inline-block font-mono text-xs text-copper-deep hover:underline"
            >
              ← Back to LearnCRE
            </a>
          </p>
        </Card>
      )}

      {cloudEnabled && !user && !loading && stage !== 'sending' && stage !== 'sent' && (
        <Card className="space-y-3">
          <p className="text-sm text-warm-black">
            Sign in to accept the match. We'll email you a magic link;
            clicking it brings you back here and accepts the invite in one
            step.
          </p>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              if (!email.trim()) return;
              setStage('sending');
              setError(null);
              const err = await signInWithEmail(email.trim(), window.location.href);
              if (err) {
                setStage('failed');
                setError(err);
              } else {
                setStage('sent');
              }
            }}
            className="space-y-2"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
              className="w-full rounded-lg border border-warm-line bg-warm-white px-3 py-2 font-mono text-sm outline-none focus:border-copper"
            />
            <div className="flex justify-end">
              <Button type="submit">Send magic link</Button>
            </div>
          </form>
        </Card>
      )}

      {cloudEnabled && stage === 'sending' && (
        <Card className="font-mono text-[11px] text-warm-mute num">Sending…</Card>
      )}

      {cloudEnabled && stage === 'sent' && (
        <Card className="space-y-2">
          <p className="text-sm text-warm-black">
            Magic link sent to <span className="font-medium">{email}</span>.
          </p>
          <p className="font-mono text-[11px] text-warm-mute num">
            Click the link in your email; you'll come back here and the
            match accept completes automatically. You can close this tab.
          </p>
        </Card>
      )}
    </main>
  );
}
