import { useState } from 'react';
import { useAuth } from '../cloud/auth';
import { Button } from './ui/Button';

const DISMISS_KEY = 'learncre.saveNudgeDismissed.v1';

function isDismissed(): boolean {
  try {
    return localStorage.getItem(DISMISS_KEY) === '1';
  } catch {
    return false;
  }
}

/**
 * Post-session sign-up prompt. Shown at the moment of value (a finished
 * session) to signed-out users on builds with cloud sync configured.
 */
export function SaveProgressNudge({ accuracyPct }: { accuracyPct: number }) {
  const { cloudEnabled, user, signInWithEmail } = useAuth();
  const [dismissed, setDismissed] = useState(isDismissed);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);

  if (!cloudEnabled || user || dismissed) return null;

  const dismiss = () => {
    try {
      localStorage.setItem(DISMISS_KEY, '1');
    } catch {
      /* ignore */
    }
    setDismissed(true);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus('sending');
    setError(null);
    const err = await signInWithEmail(email.trim());
    if (err) {
      setStatus('error');
      setError(err);
    } else {
      setStatus('sent');
    }
  };

  const pct = Math.round(accuracyPct * 100);

  return (
    <div className="relative rounded-xl border border-copper/40 bg-copper/10 p-5">
      <button
        type="button"
        onClick={dismiss}
        aria-label="Dismiss"
        className="absolute right-3 top-3 rounded p-1 text-warm-mute hover:text-warm-black"
      >
        ✕
      </button>
      <div className="font-mono text-[11px] uppercase tracking-widest text-copper-ink">
        Save your progress · free
      </div>
      <div className="mt-1 text-lg font-medium text-warm-black">
        {pct >= 80 ? `${pct}% — see where that ranks.` : 'Keep your streak and your mistake bank.'}
      </div>
      <p className="mt-1 text-sm text-warm-stone">
        Create a free account to sync across devices, join the daily challenge and leaderboards, and
        drill head-to-head with friends. One email link, no password.
      </p>
      {status === 'sent' ? (
        <p className="mt-3 text-sm text-warm-ink">
          Check <span className="font-medium">{email}</span> for your sign-in link.
        </p>
      ) : (
        <form onSubmit={submit} className="mt-3 flex flex-col gap-2 sm:flex-row">
          <input
            type="email"
            required
            placeholder="you@school.edu"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="min-w-0 flex-1 rounded-md border border-warm-line bg-warm-white px-3 py-2 text-sm outline-none focus:border-copper"
          />
          <Button type="submit" disabled={status === 'sending'}>
            {status === 'sending' ? 'Sending…' : 'Save my progress'}
          </Button>
        </form>
      )}
      {status === 'error' && error && (
        <p className="mt-2 font-mono text-[11px] text-signal-bad-ink">{error}</p>
      )}
    </div>
  );
}
