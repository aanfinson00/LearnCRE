import { useEffect, useState } from 'react';
import { useAuth } from '../cloud/auth';
import { fetchFollowerCount, follow, isFollowing, unfollow } from '../cloud/follows';
import { getPublicProfileByHandle } from '../cloud/profile';
import type { PublicProfileSnapshot } from '../cloud/types';
import { ACHIEVEMENTS } from '../quiz/achievements';
import { Button } from './ui/Button';
import { Card } from './ui/Card';

interface Props {
  handle: string;
}

function fmtRelative(iso: string | null): string {
  if (!iso) return '—';
  const t = new Date(iso).getTime();
  const days = Math.floor((Date.now() - t) / 86_400_000);
  if (days <= 0) return 'today';
  if (days === 1) return 'yesterday';
  if (days < 7) return `${days}d ago`;
  if (days < 30) return `${Math.floor(days / 7)}w ago`;
  if (days < 365) return `${Math.floor(days / 30)}mo ago`;
  return `${Math.floor(days / 365)}y ago`;
}

const MODE_LABEL: Record<string, string> = {
  quiz: 'Quiz',
  speedDrill: 'Speed drill',
  walkthrough: 'Walkthrough',
  situational: 'Situational',
  excel: 'Excel',
  longform: 'Longform',
  vocab: 'Vocab',
  mockInterview: 'Mock interview',
  modelingTest: 'Modeling test',
};

const ACH_LABEL: Record<string, string> = Object.fromEntries(
  ACHIEVEMENTS.map((a) => [a.id, a.label]),
);

export function PublicProfile({ handle }: Props) {
  const { user } = useAuth();
  const [snapshot, setSnapshot] = useState<PublicProfileSnapshot | null>(null);
  const [status, setStatus] = useState<'loading' | 'ready' | 'not-found'>('loading');
  const [followerCount, setFollowerCount] = useState<number>(0);
  const [following, setFollowing] = useState<boolean>(false);
  const [followBusy, setFollowBusy] = useState<boolean>(false);

  useEffect(() => {
    let active = true;
    setStatus('loading');
    getPublicProfileByHandle(handle).then((s) => {
      if (!active) return;
      if (s === null) {
        setStatus('not-found');
      } else {
        setSnapshot(s);
        setStatus('ready');
      }
    });
    return () => {
      active = false;
    };
  }, [handle]);

  useEffect(() => {
    if (!snapshot) return;
    let active = true;
    fetchFollowerCount(snapshot.profile.id).then((n) => {
      if (active) setFollowerCount(n);
    });
    if (user && user.id !== snapshot.profile.id) {
      isFollowing(user.id, snapshot.profile.id).then((f) => {
        if (active) setFollowing(f);
      });
    }
    return () => {
      active = false;
    };
  }, [snapshot, user]);

  async function handleFollowToggle() {
    if (!user || !snapshot) return;
    setFollowBusy(true);
    if (following) {
      const res = await unfollow(user.id, snapshot.profile.id);
      if (res.ok) {
        setFollowing(false);
        setFollowerCount((n) => Math.max(0, n - 1));
      }
    } else {
      const res = await follow(user.id, snapshot.profile.id);
      if (res.ok) {
        setFollowing(true);
        setFollowerCount((n) => n + 1);
      }
    }
    setFollowBusy(false);
  }

  if (status === 'loading') {
    return (
      <main className="mx-auto max-w-3xl space-y-4 py-12">
        <div className="font-mono text-xs uppercase tracking-widest text-warm-mute">
          Loading public profile…
        </div>
      </main>
    );
  }

  if (status === 'not-found' || !snapshot) {
    return (
      <main className="mx-auto max-w-3xl space-y-4 py-12">
        <Card className="space-y-2">
          <div className="text-xs font-medium uppercase tracking-widest text-warm-mute">
            Not found
          </div>
          <p className="text-sm text-warm-stone">
            No public profile for handle <code>{handle}</code>. The handle may
            not exist, or the owner has not opted in to public visibility.
          </p>
          <a
            href="/"
            className="inline-block font-mono text-xs text-copper-deep hover:underline"
          >
            ← Back to LearnCRE
          </a>
        </Card>
      </main>
    );
  }

  const { profile, totalXp, currentStreak, tier, achievements, recentSessions } = snapshot;
  const memberSince = new Date(profile.created_at).toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
  });
  const achievementCount = achievements.length;
  const lastSessionAt = recentSessions[0]?.ended_at ?? null;

  const isOwnProfile = user?.id === profile.id;
  const showFollowButton = user && !isOwnProfile;

  return (
    <main className="mx-auto max-w-3xl space-y-5 py-10">
      <header className="flex items-center gap-4">
        <div
          className="flex h-14 w-14 items-center justify-center rounded-full text-warm-paper"
          style={{ background: profile.avatar_color ?? '#d4895a' }}
        >
          <span className="display text-2xl">
            {(profile.display_name ?? profile.handle).slice(0, 1).toUpperCase()}
          </span>
        </div>
        <div className="flex-1">
          <div className="display text-3xl text-warm-black">
            {profile.display_name ?? profile.handle}
            <span className="text-copper">.</span>
          </div>
          <div className="font-mono text-[11px] uppercase tracking-widest text-warm-mute num">
            @{profile.handle} · {followerCount} follower{followerCount === 1 ? '' : 's'} · member since {memberSince} · last seen{' '}
            {fmtRelative(lastSessionAt)}
          </div>
        </div>
        {showFollowButton && (
          <Button
            variant={following ? 'ghost' : undefined}
            onClick={handleFollowToggle}
            disabled={followBusy}
            className="text-xs"
          >
            {followBusy ? '…' : following ? 'Following' : 'Follow'}
          </Button>
        )}
      </header>

      {profile.bio && (
        <Card className="space-y-2">
          <div className="text-xs font-medium uppercase tracking-widest text-warm-mute">
            Bio
          </div>
          <p className="editorial text-base text-warm-ink">{profile.bio}</p>
        </Card>
      )}

      <Card className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <Stat label="Total XP" value={totalXp.toLocaleString()} />
        <Stat label="Streak" value={`${currentStreak}d`} />
        <Stat label="Tier" value={tier ?? '—'} />
        <Stat label="Achievements" value={String(achievementCount)} />
      </Card>

      <Card className="space-y-2">
        <div className="text-xs font-medium uppercase tracking-widest text-warm-mute">
          Achievements
        </div>
        {achievements.length === 0 ? (
          <p className="text-sm text-warm-mute">No achievements unlocked yet.</p>
        ) : (
          <ul className="grid grid-cols-1 gap-1 font-mono text-[11px] num md:grid-cols-2">
            {achievements
              .slice()
              .sort((a, b) => a.unlocked_at.localeCompare(b.unlocked_at))
              .map((a) => (
                <li
                  key={a.achievement_id}
                  className="flex items-baseline justify-between border-b border-dotted border-warm-line py-1"
                >
                  <span className="text-warm-black">
                    {ACH_LABEL[a.achievement_id] ?? a.achievement_id}
                  </span>
                  <span className="text-warm-mute">
                    {fmtRelative(a.unlocked_at)}
                  </span>
                </li>
              ))}
          </ul>
        )}
      </Card>

      <Card className="space-y-2">
        <div className="text-xs font-medium uppercase tracking-widest text-warm-mute">
          Recent sessions
        </div>
        {recentSessions.length === 0 ? (
          <p className="text-sm text-warm-mute">No sessions yet.</p>
        ) : (
          <ul className="space-y-1 font-mono text-[11px] num">
            {recentSessions.map((s) => {
              const acc =
                s.attempts > 0
                  ? `${Math.round((s.correct / s.attempts) * 100)}%`
                  : '—';
              return (
                <li
                  key={s.id}
                  className="flex items-baseline justify-between border-b border-dotted border-warm-line py-1"
                >
                  <span className="text-warm-black">
                    {MODE_LABEL[s.mode] ?? s.mode}
                  </span>
                  <span className="text-warm-mute">
                    {s.correct}/{s.attempts} · {acc} ·{' '}
                    {fmtRelative(s.ended_at)}
                  </span>
                </li>
              );
            })}
          </ul>
        )}
      </Card>

      <footer className="pt-4">
        <a
          href="/"
          className="inline-block font-mono text-[11px] text-copper-deep hover:underline"
        >
          ← LearnCRE
        </a>
      </footer>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-wider text-warm-mute">{label}</div>
      <div className="mt-0.5 font-mono text-xl num text-warm-black">{value}</div>
    </div>
  );
}
