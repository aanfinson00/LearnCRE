import { useEffect, useState } from 'react';
import { useAuth } from '../cloud/auth';
import {
  fetchNotificationPreferences,
  type NotificationPreferences,
  updateNotificationPreferences,
} from '../cloud/notifications';
import { Card } from './ui/Card';

export function NotificationPreferencesCard() {
  const { user, cloudEnabled } = useAuth();
  const [prefs, setPrefs] = useState<NotificationPreferences | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!cloudEnabled || !user) return;
    let active = true;
    fetchNotificationPreferences(user.id, user.email ?? null).then((p) => {
      if (active) setPrefs(p);
    });
    return () => {
      active = false;
    };
  }, [cloudEnabled, user]);

  if (!cloudEnabled || !user || !prefs) return null;

  async function patch(p: Partial<NotificationPreferences>) {
    if (!user || !prefs) return;
    setBusy(true);
    setError(null);
    const optimistic = { ...prefs, ...p };
    setPrefs(optimistic);
    const res = await updateNotificationPreferences(user.id, p);
    if (!res.ok) {
      setError(res.error ?? 'update failed');
      // Revert
      setPrefs(prefs);
    }
    setBusy(false);
  }

  return (
    <Card className="space-y-3">
      <div className="text-xs font-medium uppercase tracking-widest text-warm-mute">
        Email notifications
      </div>
      <p className="text-sm text-warm-stone">
        Off by default. Toggle on what you want; turn it all off in one click
        from any email's footer.
      </p>

      <Toggle
        label="Weekly digest"
        hint="XP earned this week + your leaderboard movement. Sent Monday."
        checked={prefs.weekly_digest_enabled}
        onChange={(v) => patch({ weekly_digest_enabled: v })}
      />
      <Toggle
        label="Daily challenge reminder"
        hint="One nudge per day at your chosen UTC hour, only when you haven't yet played."
        checked={prefs.daily_reminder_enabled}
        onChange={(v) => patch({ daily_reminder_enabled: v })}
      />
      {prefs.daily_reminder_enabled && (
        <label className="block space-y-1 pl-6 border-l-2 border-warm-line">
          <span className="font-mono text-[11px] uppercase tracking-widest text-warm-mute">
            Reminder hour (UTC)
          </span>
          <select
            value={prefs.daily_reminder_hour_utc}
            onChange={(e) => patch({ daily_reminder_hour_utc: Number(e.target.value) })}
            className="rounded-lg border border-warm-line bg-warm-white px-3 py-1.5 font-mono text-sm outline-none focus:border-copper"
          >
            {Array.from({ length: 24 }, (_, i) => (
              <option key={i} value={i}>
                {String(i).padStart(2, '0')}:00 UTC
              </option>
            ))}
          </select>
        </label>
      )}
      <Toggle
        label="Friend unlocked an achievement"
        hint="Someone you follow earned a new achievement."
        checked={prefs.friend_unlock_enabled}
        onChange={(v) => patch({ friend_unlock_enabled: v })}
      />

      <div className="border-t border-warm-line pt-2 font-mono text-[10px] text-warm-mute num">
        Sending to: {prefs.email ?? user.email ?? 'no email on file'}
        {busy && ' · saving…'}
      </div>
      {error && (
        <p className="font-mono text-[11px] text-signal-bad-ink">{error}</p>
      )}
    </Card>
  );
}

function Toggle({
  label,
  hint,
  checked,
  onChange,
}: {
  label: string;
  hint: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-start gap-3">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-1 h-4 w-4 accent-copper"
      />
      <div className="flex-1">
        <div className="text-sm font-medium text-warm-black">{label}</div>
        <div className="text-[11px] text-warm-mute">{hint}</div>
      </div>
    </label>
  );
}

interface UnsubscribePageProps {
  token: string;
}

export function UnsubscribePage({ token }: UnsubscribePageProps) {
  const [status, setStatus] = useState<'pending' | 'done' | 'error'>('pending');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    import('../cloud/notifications').then(({ unsubscribeByToken }) =>
      unsubscribeByToken(token).then((res) => {
        if (!active) return;
        if (res.ok) setStatus('done');
        else {
          setStatus('error');
          setError(res.error);
        }
      }),
    );
    return () => {
      active = false;
    };
  }, [token]);

  return (
    <main className="mx-auto max-w-xl space-y-4 py-12">
      <header>
        <div className="display text-3xl text-warm-black">
          Unsubscribe<span className="text-copper">.</span>
        </div>
      </header>
      <Card className="space-y-2">
        {status === 'pending' && (
          <p className="font-mono text-[11px] text-warm-mute">Working…</p>
        )}
        {status === 'done' && (
          <>
            <p className="text-sm text-warm-black">
              All email notifications turned off. You can re-enable any of
              them on the Profile screen if you change your mind.
            </p>
            <p>
              <a
                href="/"
                className="inline-block font-mono text-xs text-copper-deep hover:underline"
              >
                ← Back to LearnCRE
              </a>
            </p>
          </>
        )}
        {status === 'error' && (
          <>
            <p className="text-sm text-signal-bad-ink">
              Could not unsubscribe: {error ?? 'unknown error'}.
            </p>
            <p className="font-mono text-[11px] text-warm-mute">
              The link may be expired or already used. Sign in and turn the
              toggles off on the Profile screen if needed.
            </p>
          </>
        )}
      </Card>
    </main>
  );
}
