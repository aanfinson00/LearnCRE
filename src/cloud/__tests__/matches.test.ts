import { describe, expect, it } from 'vitest';
import { canPlay, settleOutcome, type Match } from '../matches';

const baseMatch: Match = {
  id: 'm1',
  host_id: 'h',
  opponent_id: 'o',
  invite_token: 'tok',
  seed: 12345,
  status: 'accepted',
  host_correct: null,
  host_time_ms: null,
  host_completed_at: null,
  opponent_correct: null,
  opponent_time_ms: null,
  opponent_completed_at: null,
  created_at: '2026-05-01T00:00:00Z',
  updated_at: '2026-05-01T00:00:00Z',
  expires_at: '2026-05-08T00:00:00Z',
};

describe('cloud/matches — settleOutcome', () => {
  it('returns incomplete when either side is missing', () => {
    expect(settleOutcome(baseMatch)).toBe('incomplete');
    expect(
      settleOutcome({
        ...baseMatch,
        host_correct: 7,
        host_time_ms: 60_000,
        host_completed_at: '2026-05-02T00:00:00Z',
      }),
    ).toBe('incomplete');
  });

  it('host wins when correct is higher', () => {
    expect(
      settleOutcome({
        ...baseMatch,
        status: 'settled',
        host_correct: 8,
        host_time_ms: 60_000,
        host_completed_at: '2026-05-02T00:00:00Z',
        opponent_correct: 6,
        opponent_time_ms: 50_000,
        opponent_completed_at: '2026-05-03T00:00:00Z',
      }),
    ).toBe('host-win');
  });

  it('opponent wins when correct is higher', () => {
    expect(
      settleOutcome({
        ...baseMatch,
        status: 'settled',
        host_correct: 5,
        host_time_ms: 60_000,
        host_completed_at: '2026-05-02T00:00:00Z',
        opponent_correct: 9,
        opponent_time_ms: 55_000,
        opponent_completed_at: '2026-05-03T00:00:00Z',
      }),
    ).toBe('opponent-win');
  });

  it('breaks ties on speed (faster wins)', () => {
    const draw = {
      ...baseMatch,
      status: 'settled' as const,
      host_correct: 8,
      opponent_correct: 8,
      host_completed_at: '2026-05-02T00:00:00Z',
      opponent_completed_at: '2026-05-03T00:00:00Z',
    };
    expect(
      settleOutcome({
        ...draw,
        host_time_ms: 50_000,
        opponent_time_ms: 60_000,
      }),
    ).toBe('host-win');
    expect(
      settleOutcome({
        ...draw,
        host_time_ms: 65_000,
        opponent_time_ms: 60_000,
      }),
    ).toBe('opponent-win');
  });

  it('returns draw on identical correct + time', () => {
    expect(
      settleOutcome({
        ...baseMatch,
        status: 'settled',
        host_correct: 7,
        opponent_correct: 7,
        host_time_ms: 60_000,
        opponent_time_ms: 60_000,
        host_completed_at: '2026-05-02T00:00:00Z',
        opponent_completed_at: '2026-05-03T00:00:00Z',
      }),
    ).toBe('draw');
  });
});

describe('cloud/matches — canPlay', () => {
  it('returns false for settled matches', () => {
    expect(
      canPlay({ ...baseMatch, status: 'settled' }, 'h'),
    ).toBe(false);
  });

  it('returns false for expired matches', () => {
    expect(
      canPlay({ ...baseMatch, status: 'expired' }, 'h'),
    ).toBe(false);
  });

  it('returns true for host who has not yet submitted', () => {
    expect(canPlay(baseMatch, 'h')).toBe(true);
  });

  it('returns false for host who already submitted', () => {
    expect(
      canPlay(
        { ...baseMatch, host_completed_at: '2026-05-02T00:00:00Z' },
        'h',
      ),
    ).toBe(false);
  });

  it('returns true for opponent who has not yet submitted', () => {
    expect(canPlay(baseMatch, 'o')).toBe(true);
  });

  it('returns false for non-participants', () => {
    expect(canPlay(baseMatch, 'unrelated-user')).toBe(false);
  });
});
