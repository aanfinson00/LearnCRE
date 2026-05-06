import { useEffect, useState } from 'react';
import { useAuth } from '../cloud/auth';
import { fetchFriendsFeed, type FeedEvent } from '../cloud/follows';
import { Button } from './ui/Button';
import { Card } from './ui/Card';

interface Props {
  onBack: () => void;
}

function fmtRelative(iso: string): string {
  const t = new Date(iso).getTime();
  const mins = Math.floor((Date.now() - t) / 60_000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 7) return `${days}d ago`;
  if (days < 30) return `${Math.floor(days / 7)}w ago`;
  return `${Math.floor(days / 30)}mo ago`;
}

export function FriendsFeedScreen({ onBack }: Props) {
  const { user, cloudEnabled } = useAuth();
  const [events, setEvents] = useState<FeedEvent[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!cloudEnabled || !user) {
      setLoading(false);
      return;
    }
    let active = true;
    setLoading(true);
    fetchFriendsFeed(user.id, 30).then((rows) => {
      if (!active) return;
      setEvents(rows);
      setLoading(false);
    });
    return () => {
      active = false;
    };
  }, [user, cloudEnabled]);

  return (
    <div className="mx-auto max-w-3xl space-y-5 py-8">
      <header className="flex flex-wrap items-baseline justify-between gap-3">
        <div>
          <div className="display text-3xl text-warm-black">
            Friends feed<span className="text-copper">.</span>
          </div>
          <p className="font-mono text-[11px] uppercase tracking-widest text-warm-mute num">
            Recent activity from people you follow
          </p>
        </div>
        <Button variant="ghost" onClick={onBack} className="text-xs">
          ← Back
        </Button>
      </header>

      {!cloudEnabled && (
        <Card className="text-sm text-warm-stone">
          Cloud sync is off. Friends feed activates when{' '}
          <code>VITE_SUPABASE_URL</code> / <code>VITE_SUPABASE_ANON_KEY</code>{' '}
          are configured.
        </Card>
      )}

      {cloudEnabled && !user && (
        <Card className="text-sm text-warm-stone">
          Sign in on the Profile screen to see your friends' activity.
        </Card>
      )}

      {cloudEnabled && user && (
        <Card className="space-y-2">
          {loading ? (
            <p className="font-mono text-[11px] text-warm-mute">Loading…</p>
          ) : events.length === 0 ? (
            <div className="space-y-2">
              <p className="text-sm text-warm-stone">
                You're not following anyone yet, or the people you follow
                haven't been active recently.
              </p>
              <p className="font-mono text-[11px] text-warm-mute num">
                Visit a public profile (e.g. from the leaderboard) and click
                Follow to start building your feed.
              </p>
            </div>
          ) : (
            <ul className="space-y-3">
              {events.map((e, i) => (
                <li
                  key={`${e.kind}-${e.userId}-${e.timestamp}-${i}`}
                  className="flex items-start gap-3 border-b border-dotted border-warm-line pb-3 last:border-b-0 last:pb-0"
                >
                  <div
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-warm-paper"
                    style={{ background: e.avatarColor ?? '#d4895a' }}
                  >
                    <span className="display text-sm">
                      {(e.displayName ?? e.handle).slice(0, 1).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="text-sm">
                      <a
                        href={`/u/${e.handle}`}
                        className="font-medium text-warm-black hover:underline"
                      >
                        @{e.handle}
                      </a>{' '}
                      <span className="text-warm-stone">{e.headline}</span>
                    </div>
                    {e.detail && (
                      <div className="font-mono text-[11px] text-warm-mute num">
                        {e.detail}
                      </div>
                    )}
                    <div className="font-mono text-[10px] text-warm-mute num">
                      {fmtRelative(e.timestamp)}
                    </div>
                  </div>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-mono uppercase tracking-widest num ${
                      e.kind === 'achievement'
                        ? 'bg-copper/15 text-copper-deep'
                        : 'bg-warm-paper text-warm-stone'
                    }`}
                  >
                    {e.kind}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </Card>
      )}
    </div>
  );
}
