import { useEffect, useState } from 'react';
import { useAuth } from '../cloud/auth';
import { fetchCloudProfile, setProfilePublic } from '../cloud/profile';
import type { CloudProfile } from '../cloud/types';
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
    return <SignedInPanel email={user.email ?? ''} userId={user.id} onSignOut={signOut} />;
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

function SignedInPanel({
  email,
  userId,
  onSignOut,
}: {
  email: string;
  userId: string;
  onSignOut: () => Promise<void>;
}) {
  const [profile, setProfile] = useState<CloudProfile | null>(null);
  const [busy, setBusy] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    fetchCloudProfile(userId).then((p) => {
      if (active) setProfile(p);
    });
    return () => {
      active = false;
    };
  }, [userId]);

  async function handleToggle() {
    if (!profile) return;
    setBusy(true);
    setError(null);
    const res = await setProfilePublic(userId, !profile.is_public);
    setBusy(false);
    if (res.ok) {
      setProfile({ ...profile, is_public: !profile.is_public });
    } else {
      setError(res.error ?? 'Could not update.');
    }
  }

  async function handleCopy() {
    if (!profile) return;
    const url = `${window.location.origin}/u/${profile.handle}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      /* ignore */
    }
  }

  return (
    <Card className="space-y-3">
      <div className="text-xs font-medium uppercase tracking-widest text-warm-mute">
        Signed in
      </div>
      <p className="text-sm text-warm-black">{email}</p>
      {profile ? (
        <div className="space-y-2 border-t border-warm-line pt-3">
          <div className="font-mono text-[11px] uppercase tracking-widest text-warm-mute num">
            Public profile
          </div>
          <div className="flex items-center justify-between gap-3">
            <div className="text-sm">
              <div className="text-warm-black">@{profile.handle}</div>
              <div className="font-mono text-[11px] text-warm-mute num">
                {profile.is_public
                  ? 'Public — visible at /u/' + profile.handle
                  : 'Private — only you can see it'}
              </div>
            </div>
            <Button
              variant="ghost"
              onClick={handleToggle}
              disabled={busy}
              className="text-xs"
            >
              {busy
                ? '…'
                : profile.is_public
                  ? 'Make private'
                  : 'Make public'}
            </Button>
          </div>
          {profile.is_public && (
            <Button variant="ghost" onClick={handleCopy} className="text-xs">
              {copied ? 'Copied!' : 'Copy share URL'}
            </Button>
          )}
          {error && (
            <p className="font-mono text-[11px] text-signal-bad-ink">{error}</p>
          )}
        </div>
      ) : (
        <p className="font-mono text-[11px] text-warm-mute">
          Loading profile…
        </p>
      )}
      <Button variant="ghost" onClick={onSignOut} className="text-xs">
        Sign out
      </Button>
    </Card>
  );
}
