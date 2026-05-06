import { describe, expect, it } from 'vitest';
import { mergeFeedEvents, type FeedEvent } from '../follows';

const ev = (timestamp: string, kind: FeedEvent['kind'] = 'achievement'): FeedEvent => ({
  kind,
  userId: `u-${timestamp}`,
  handle: 'someone',
  displayName: null,
  avatarColor: null,
  timestamp,
  headline: 'something happened',
});

describe('cloud/follows — mergeFeedEvents', () => {
  it('merges and sorts descending by timestamp', () => {
    const a = [ev('2026-05-10T12:00:00Z'), ev('2026-05-08T10:00:00Z')];
    const b = [ev('2026-05-09T14:00:00Z'), ev('2026-05-11T08:00:00Z')];
    const merged = mergeFeedEvents(a, b);
    expect(merged.map((e) => e.timestamp)).toEqual([
      '2026-05-11T08:00:00Z',
      '2026-05-10T12:00:00Z',
      '2026-05-09T14:00:00Z',
      '2026-05-08T10:00:00Z',
    ]);
  });

  it('handles empty lists', () => {
    expect(mergeFeedEvents([], [])).toEqual([]);
  });

  it('preserves both kinds in the merged stream', () => {
    const merged = mergeFeedEvents(
      [ev('2026-05-10T12:00:00Z', 'achievement')],
      [ev('2026-05-10T13:00:00Z', 'daily')],
    );
    expect(merged.map((e) => e.kind)).toEqual(['daily', 'achievement']);
  });

  it('is stable on equal timestamps (preserves input order)', () => {
    const a = [ev('2026-05-10T12:00:00Z', 'achievement')];
    const b = [ev('2026-05-10T12:00:00Z', 'daily')];
    const merged = mergeFeedEvents(a, b);
    // First arg's row appears before the second when timestamps tie
    expect(merged[0].kind).toBe('achievement');
    expect(merged[1].kind).toBe('daily');
  });
});
