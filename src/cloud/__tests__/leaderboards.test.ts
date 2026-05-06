import { describe, expect, it } from 'vitest';
import { startOfIsoWeek } from '../leaderboards';

describe('cloud/leaderboards — startOfIsoWeek', () => {
  it('rolls a Monday at 12:00 UTC back to 00:00 UTC same day', () => {
    const mondayNoon = new Date(Date.UTC(2026, 0, 5, 12, 0, 0)); // 2026-01-05 is Mon
    const start = startOfIsoWeek(mondayNoon);
    expect(start.toISOString()).toBe('2026-01-05T00:00:00.000Z');
  });

  it('rolls a Sunday back to the prior Monday', () => {
    const sunday = new Date(Date.UTC(2026, 0, 11, 23, 30, 0)); // 2026-01-11 is Sun
    const start = startOfIsoWeek(sunday);
    expect(start.toISOString()).toBe('2026-01-05T00:00:00.000Z');
  });

  it('rolls a Wednesday back to Monday of same week', () => {
    const wed = new Date(Date.UTC(2026, 5, 3, 18, 45, 0)); // 2026-06-03 is Wed
    const start = startOfIsoWeek(wed);
    expect(start.toISOString()).toBe('2026-06-01T00:00:00.000Z');
  });

  it('handles year boundary correctly', () => {
    // 2026-01-01 is a Thursday — start-of-week is Mon 2025-12-29
    const newYearsDay = new Date(Date.UTC(2026, 0, 1, 9, 0, 0));
    const start = startOfIsoWeek(newYearsDay);
    expect(start.toISOString()).toBe('2025-12-29T00:00:00.000Z');
  });

  it('zeroes out hours / minutes / seconds / ms', () => {
    const d = new Date(Date.UTC(2026, 2, 15, 14, 33, 22, 500));
    const start = startOfIsoWeek(d);
    expect(start.getUTCHours()).toBe(0);
    expect(start.getUTCMinutes()).toBe(0);
    expect(start.getUTCSeconds()).toBe(0);
    expect(start.getUTCMilliseconds()).toBe(0);
  });
});
