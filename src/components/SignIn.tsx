import { useState } from 'react';
import { useAuth } from '../cloud/auth';
import { Button } from './ui/Button';
import { Card } from './ui/Card';

interface Props {
  /** Optional: render compact (drawer/dropdown) vs full-card. */
  compact?: boolean;
}

export function SignIn({ compact = false }: Props) {
  const { signInWithEmail, cloudEnabled, user, signOut } = useAuth();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>(
    'idle',
  );
  const [error, setError] = useState<string | null>(null);

  if (!cloudEnabled) {
    return (
      <Card className="space-y-2">
        <div className="text-xs font-medium uppercase tracking-widest text-warm-mute">
          Cloud sync
        </div>
        <p className="text-sm text-warm-stone">
          Cloud sync is not configured for this build. The app continues to
          work fully offline. To enable: set <code>VITE_SUPABASE_URL</code>{' '}
          and <code>VITE_SUPABASE_ANON_KEY</code>, run the SQL migration in{' '}
          <code>supabase/migrations/</code>, and rebuild.
        </p>
      </Card>
    );
  }

  if (user) {
    return (
      <Card className="space-y-2">
        <div className="text-xs font-medium uppercase tracking-widest text-warm-mute">
          Signed in
        </div>
        <p className="text-sm text-warm-black">{user.email}</p>
        <Button variant="ghost" onClick={signOut} className="text-xs">
          Sign out
        </Button>
      </Card>
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus('sending');
    setError(null);
    const errorMessage = await signInWithEmail(email.trim());
    if (errorMessage) {
      setStatus('error');
      setError(errorMessage);
    } else {
      setStatus('sent');
    }
  }

  return (
    <Card className={compact ? 'space-y-2' : 'space-y-3'}>
      <div className="text-xs font-medium uppercase tracking-widest text-warm-mute">
        Sign in
      </div>
      {status === 'sent' ? (
        <p className="text-sm text-warm-stone">
          Magic link sent to <span className="text-warm-black">{email}</span>.
          Click the link in your email to finish signing in. You can close
          this tab.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-2">
          <p className="text-sm text-warm-stone">
            Optional. Sign in to sync progress across devices and unlock
            leaderboards.
          </p>
          <input
            type="email"
            required
            placeholder="you@email.com"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-warm-line bg-warm-white px-3 py-2 font-mono text-sm outline-none focus:border-copper"
          />
          <div className="flex items-center justify-between">
            <Button type="submit" disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending…' : 'Email magic link'}
            </Button>
            {status === 'error' && error && (
              <span className="font-mono text-[11px] text-signal-bad-ink">
                {error}
              </span>
            )}
          </div>
        </form>
      )}
    </Card>
  );
}
