import { useEffect, useState } from 'react';
import { useAuth } from '../cloud/auth';
import {
  type Cohort,
  type CohortLeaderboardEntry,
  type CohortMember,
  createCohort,
  fetchCohortAlltimeXp,
  fetchCohortMembers,
  fetchMyCohorts,
  joinCohortByToken,
  leaveCohort,
  normalizeSlug,
} from '../cloud/cohorts';
import { Button } from './ui/Button';
import { Card } from './ui/Card';

interface Props {
  onBack: () => void;
}

export function CohortsScreen({ onBack }: Props) {
  const { user, cloudEnabled } = useAuth();
  const [cohorts, setCohorts] = useState<Cohort[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  async function refresh() {
    if (!user) {
      setLoading(false);
      return;
    }
    setLoading(true);
    const my = await fetchMyCohorts(user.id);
    setCohorts(my);
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
      <div className="mx-auto max-w-3xl space-y-5 py-8">
        <Header onBack={onBack} />
        <Card className="text-sm text-warm-stone">
          Cloud sync is off. Cohorts activate when{' '}
          <code>VITE_SUPABASE_URL</code> / <code>VITE_SUPABASE_ANON_KEY</code>{' '}
          are configured.
        </Card>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="mx-auto max-w-3xl space-y-5 py-8">
        <Header onBack={onBack} />
        <Card className="text-sm text-warm-stone">
          Sign in on the Profile screen to create or join a cohort.
        </Card>
      </div>
    );
  }

  if (selectedId) {
    const c = cohorts.find((x) => x.id === selectedId);
    if (!c) {
      setSelectedId(null);
      return null;
    }
    return (
      <CohortDetail
        cohort={c}
        userId={user.id}
        onBack={() => setSelectedId(null)}
        onLeft={() => {
          setSelectedId(null);
          refresh();
        }}
      />
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-5 py-8">
      <Header onBack={onBack} />

      <Card className="space-y-2">
        <div className="text-xs font-medium uppercase tracking-widest text-warm-mute">
          Your cohorts
        </div>
        {loading ? (
          <p className="font-mono text-[11px] text-warm-mute">Loading…</p>
        ) : cohorts.length === 0 ? (
          <p className="text-sm text-warm-stone">
            You're not in any cohorts yet. Create one below or paste an invite
            (slug + token) you received.
          </p>
        ) : (
          <ul className="space-y-1 font-mono text-[12px] num">
            {cohorts.map((c) => {
              const isOwner = c.owner_id === user.id;
              return (
                <li
                  key={c.id}
                  className="flex items-baseline justify-between border-b border-dotted border-warm-line py-1.5"
                >
                  <button
                    type="button"
                    onClick={() => setSelectedId(c.id)}
                    className="text-left text-warm-black hover:text-copper-deep hover:underline"
                  >
                    <span className="font-medium">{c.name}</span>{' '}
                    <span className="text-warm-mute">/{c.slug}</span>
                  </button>
                  <span className="text-[10px] uppercase tracking-widest text-warm-mute">
                    {isOwner ? 'owner' : 'member'}
                  </span>
                </li>
              );
            })}
          </ul>
        )}
      </Card>

      <CreateCohortCard userId={user.id} onCreated={refresh} />
      <JoinCohortCard onJoined={refresh} />
    </div>
  );
}

function Header({ onBack }: { onBack: () => void }) {
  return (
    <header className="flex flex-wrap items-baseline justify-between gap-3">
      <div>
        <div className="display text-3xl text-warm-black">
          Cohorts<span className="text-copper">.</span>
        </div>
        <p className="font-mono text-[11px] uppercase tracking-widest text-warm-mute num">
          Invite-only groups with their own leaderboard
        </p>
      </div>
      <Button variant="ghost" onClick={onBack} className="text-xs">
        ← Back
      </Button>
    </header>
  );
}

function CreateCohortCard({ userId, onCreated }: { userId: string; onCreated: () => void }) {
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const cleanSlug = normalizeSlug(slug || name);
    const res = await createCohort(userId, name, cleanSlug);
    setBusy(false);
    if (res.ok) {
      setName('');
      setSlug('');
      onCreated();
    } else {
      setError(res.error);
    }
  }

  return (
    <Card className="space-y-3">
      <div className="text-xs font-medium uppercase tracking-widest text-warm-mute">
        Create a cohort
      </div>
      <form onSubmit={handleSubmit} className="space-y-2">
        <label className="block space-y-1">
          <span className="font-mono text-[11px] uppercase tracking-widest text-warm-mute">
            Name
          </span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Acme RE summer interns"
            className="w-full rounded-lg border border-warm-line bg-warm-white px-3 py-2 text-sm outline-none focus:border-copper"
          />
        </label>
        <label className="block space-y-1">
          <span className="font-mono text-[11px] uppercase tracking-widest text-warm-mute">
            Slug (optional — derived from name)
          </span>
          <input
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="acme-re-summer-2026"
            className="w-full rounded-lg border border-warm-line bg-warm-white px-3 py-2 font-mono text-sm outline-none focus:border-copper"
          />
        </label>
        {error && (
          <p className="font-mono text-[11px] text-signal-bad-ink">{error}</p>
        )}
        <div className="flex justify-end">
          <Button type="submit" disabled={busy || !name.trim()}>
            {busy ? 'Creating…' : 'Create'}
          </Button>
        </div>
      </form>
    </Card>
  );
}

function JoinCohortCard({ onJoined }: { onJoined: () => void }) {
  const [slug, setSlug] = useState('');
  const [token, setToken] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    setDone(false);
    const res = await joinCohortByToken(slug, token);
    setBusy(false);
    if (res.ok) {
      setDone(true);
      setSlug('');
      setToken('');
      onJoined();
    } else {
      setError(res.error ?? 'join failed');
    }
  }

  return (
    <Card className="space-y-3">
      <div className="text-xs font-medium uppercase tracking-widest text-warm-mute">
        Join a cohort
      </div>
      <form onSubmit={handleSubmit} className="space-y-2">
        <label className="block space-y-1">
          <span className="font-mono text-[11px] uppercase tracking-widest text-warm-mute">
            Slug
          </span>
          <input
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="acme-re-summer-2026"
            className="w-full rounded-lg border border-warm-line bg-warm-white px-3 py-2 font-mono text-sm outline-none focus:border-copper"
          />
        </label>
        <label className="block space-y-1">
          <span className="font-mono text-[11px] uppercase tracking-widest text-warm-mute">
            Invite token
          </span>
          <input
            type="text"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="paste the token from the cohort owner"
            className="w-full rounded-lg border border-warm-line bg-warm-white px-3 py-2 font-mono text-sm outline-none focus:border-copper"
          />
        </label>
        {error && (
          <p className="font-mono text-[11px] text-signal-bad-ink">{error}</p>
        )}
        {done && (
          <p className="font-mono text-[11px] text-copper-deep">Joined.</p>
        )}
        <div className="flex justify-end">
          <Button type="submit" disabled={busy || !slug.trim() || !token.trim()}>
            {busy ? 'Joining…' : 'Join'}
          </Button>
        </div>
      </form>
    </Card>
  );
}

function CohortDetail({
  cohort,
  userId,
  onBack,
  onLeft,
}: {
  cohort: Cohort;
  userId: string;
  onBack: () => void;
  onLeft: () => void;
}) {
  const [members, setMembers] = useState<CohortMember[]>([]);
  const [leaderboard, setLeaderboard] = useState<CohortLeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [tokenCopied, setTokenCopied] = useState(false);
  const [busy, setBusy] = useState(false);
  const isOwner = cohort.owner_id === userId;

  useEffect(() => {
    let active = true;
    setLoading(true);
    Promise.all([
      fetchCohortMembers(cohort.id),
      fetchCohortAlltimeXp(cohort.id),
    ]).then(([m, lb]) => {
      if (!active) return;
      setMembers(m);
      setLeaderboard(lb);
      setLoading(false);
    });
    return () => {
      active = false;
    };
  }, [cohort.id]);

  async function copyToken() {
    try {
      await navigator.clipboard.writeText(cohort.invite_token);
      setTokenCopied(true);
      window.setTimeout(() => setTokenCopied(false), 1500);
    } catch {
      /* ignore */
    }
  }

  async function handleLeave() {
    if (!confirm(`Leave ${cohort.name}?`)) return;
    setBusy(true);
    const res = await leaveCohort(cohort.id, userId);
    setBusy(false);
    if (res.ok) onLeft();
  }

  return (
    <div className="mx-auto max-w-3xl space-y-5 py-8">
      <header className="flex flex-wrap items-baseline justify-between gap-3">
        <div>
          <div className="display text-3xl text-warm-black">
            {cohort.name}
            <span className="text-copper">.</span>
          </div>
          <p className="font-mono text-[11px] uppercase tracking-widest text-warm-mute num">
            /{cohort.slug} · {members.length} member
            {members.length === 1 ? '' : 's'}
            {isOwner ? ' · you own this cohort' : ''}
          </p>
        </div>
        <Button variant="ghost" onClick={onBack} className="text-xs">
          ← Cohorts
        </Button>
      </header>

      {isOwner && (
        <Card className="space-y-2">
          <div className="text-xs font-medium uppercase tracking-widest text-warm-mute">
            Invite link
          </div>
          <p className="text-sm text-warm-stone">
            Share these two values with anyone you want to invite. They'll
            paste them into the Join cohort form.
          </p>
          <div className="space-y-1 font-mono text-[11px] num">
            <div className="flex items-baseline justify-between border-b border-dotted border-warm-line py-1">
              <span className="text-warm-mute">slug</span>
              <span className="text-warm-black">{cohort.slug}</span>
            </div>
            <div className="flex items-baseline justify-between py-1">
              <span className="text-warm-mute">token</span>
              <span className="text-warm-black break-all">{cohort.invite_token}</span>
            </div>
          </div>
          <Button variant="ghost" onClick={copyToken} className="text-xs">
            {tokenCopied ? 'Copied!' : 'Copy token'}
          </Button>
        </Card>
      )}

      <Card className="space-y-2">
        <div className="text-xs font-medium uppercase tracking-widest text-warm-mute">
          XP leaderboard (cohort)
        </div>
        {loading ? (
          <p className="font-mono text-[11px] text-warm-mute">Loading…</p>
        ) : leaderboard.length === 0 ? (
          <p className="text-sm text-warm-mute">No XP recorded yet.</p>
        ) : (
          <ol className="space-y-1 font-mono text-[11px] num">
            {leaderboard.map((row) => {
              const isMe = row.userId === userId;
              return (
                <li
                  key={row.userId}
                  className={`flex items-baseline justify-between border-b border-dotted border-warm-line py-1 ${
                    isMe ? 'text-copper-deep font-medium' : ''
                  }`}
                >
                  <span className="flex items-baseline gap-2">
                    <span className="w-6 text-right text-warm-mute">
                      {row.rank}
                    </span>
                    <a
                      href={`/u/${row.handle}`}
                      className="text-warm-black hover:underline"
                    >
                      @{row.handle}
                    </a>
                  </span>
                  <span className="text-warm-stone">
                    {row.totalXp.toLocaleString()} XP
                  </span>
                </li>
              );
            })}
          </ol>
        )}
      </Card>

      <Card className="space-y-2">
        <div className="text-xs font-medium uppercase tracking-widest text-warm-mute">
          Members
        </div>
        {loading ? null : (
          <ul className="space-y-1 font-mono text-[11px] num">
            {members.map((m) => (
              <li
                key={m.user_id}
                className="flex items-baseline justify-between border-b border-dotted border-warm-line py-1"
              >
                <a
                  href={`/u/${m.handle}`}
                  className="text-warm-black hover:underline"
                >
                  @{m.handle}
                </a>
                <span className="text-warm-mute">
                  joined {new Date(m.joined_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </span>
              </li>
            ))}
          </ul>
        )}
      </Card>

      {!isOwner && (
        <div className="flex justify-end">
          <Button variant="ghost" onClick={handleLeave} disabled={busy} className="text-xs">
            {busy ? 'Leaving…' : 'Leave cohort'}
          </Button>
        </div>
      )}
    </div>
  );
}
