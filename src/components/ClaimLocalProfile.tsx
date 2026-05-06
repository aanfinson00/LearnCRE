import { useEffect, useState } from 'react';
import { useAuth } from '../cloud/auth';
import { claimLocalProfile, fetchCloudProfile, suggestHandle } from '../cloud/profile';
import { activeProfile } from '../storage/profiles';
import { Button } from './ui/Button';
import { Card } from './ui/Card';

/**
 * On first sign-in, prompts the user to claim their active local profile
 * by uploading basic identity (handle + display name) to the cloud
 * `profiles` table. Once a row exists, this becomes a no-op.
 *
 * Cross-device data sync (xp, sessions, mistakes) is PR M — this
 * component only seeds the cloud profile row.
 */
export function ClaimLocalProfile() {
  const { user, cloudEnabled } = useAuth();
  const [needsClaim, setNeedsClaim] = useState(false);
  const [handle, setHandle] = useState(suggestHandle());
  const [displayName, setDisplayName] = useState(activeProfile().name);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!cloudEnabled || !user) {
      setNeedsClaim(false);
      return;
    }
    let active = true;
    fetchCloudProfile(user.id).then((p) => {
      if (!active) return;
      setNeedsClaim(p === null);
    });
    return () => {
      active = false;
    };
  }, [cloudEnabled, user]);

  if (!cloudEnabled || !user || !needsClaim) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!user) return;
    const cleanHandle = handle.trim().toLowerCase();
    if (!/^[a-z0-9_-]{3,24}$/.test(cleanHandle)) {
      setError('Handle must be 3–24 chars, lowercase letters/numbers/-/_ only.');
      return;
    }
    setSubmitting(true);
    setError(null);
    const local = activeProfile();
    const result = await claimLocalProfile(user.id, {
      handle: cleanHandle,
      display_name: displayName.trim() || null,
      avatar_color: local.avatarColor,
      local_profile_id: local.id,
    });
    setSubmitting(false);
    if (result.ok) {
      setNeedsClaim(false);
    } else {
      setError(result.error ?? 'Could not claim profile.');
    }
  }

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-warm-black/30 px-4">
      <div className="w-full max-w-md">
        <Card className="space-y-3">
          <div className="text-xs font-medium uppercase tracking-widest text-warm-mute">
            Claim your profile
          </div>
          <p className="text-sm text-warm-stone">
            Pick a public handle. This is what shows up on leaderboards and
            your shareable profile URL. Display name and avatar color carry
            over from your local profile.
          </p>
          <form onSubmit={handleSubmit} className="space-y-3">
            <label className="block space-y-1">
              <span className="font-mono text-[11px] uppercase tracking-widest text-warm-mute">
                Handle
              </span>
              <input
                type="text"
                value={handle}
                onChange={(e) => setHandle(e.target.value)}
                spellCheck={false}
                autoComplete="off"
                autoCorrect="off"
                className="w-full rounded-lg border border-warm-line bg-warm-white px-3 py-2 font-mono text-sm outline-none focus:border-copper"
              />
              <span className="block font-mono text-[10px] text-warm-mute">
                3–24 chars · lowercase letters, numbers, - and _
              </span>
            </label>
            <label className="block space-y-1">
              <span className="font-mono text-[11px] uppercase tracking-widest text-warm-mute">
                Display name
              </span>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full rounded-lg border border-warm-line bg-warm-white px-3 py-2 text-sm outline-none focus:border-copper"
              />
            </label>
            {error && (
              <p className="font-mono text-[11px] text-signal-bad-ink">{error}</p>
            )}
            <div className="flex items-center justify-end gap-2">
              <Button type="submit" disabled={submitting}>
                {submitting ? 'Claiming…' : 'Claim profile'}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
