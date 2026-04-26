import { describe, it, expect } from 'vitest';
import { nextTier, tierAtLeast, tierForXp } from '../tiers';

describe('quiz/tiers', () => {
  it('rookie at 0 XP', () => {
    expect(tierForXp(0).id).toBe('rookie');
    expect(tierForXp(499).id).toBe('rookie');
  });

  it('analyst1 at 500 XP', () => {
    expect(tierForXp(500).id).toBe('analyst1');
    expect(tierForXp(1499).id).toBe('analyst1');
  });

  it('analyst2 at 1500 XP', () => {
    expect(tierForXp(1500).id).toBe('analyst2');
    expect(tierForXp(3999).id).toBe('analyst2');
  });

  it('associate at 4000 XP', () => {
    expect(tierForXp(4000).id).toBe('associate');
    expect(tierForXp(9999).id).toBe('associate');
  });

  it('vp at 10000 XP, md at 25000 XP', () => {
    expect(tierForXp(10000).id).toBe('vp');
    expect(tierForXp(25000).id).toBe('md');
    expect(tierForXp(1_000_000).id).toBe('md');
  });

  it('nextTier returns next tier and gap', () => {
    expect(nextTier(0).tier?.id).toBe('analyst1');
    expect(nextTier(0).xpToGo).toBe(500);
    expect(nextTier(499).xpToGo).toBe(1);
    expect(nextTier(25000).tier).toBeNull();
  });

  it('tierAtLeast', () => {
    expect(tierAtLeast(500, 'analyst1')).toBe(true);
    expect(tierAtLeast(499, 'analyst1')).toBe(false);
    expect(tierAtLeast(10001, 'vp')).toBe(true);
    expect(tierAtLeast(0, 'rookie')).toBe(true);
  });
});
