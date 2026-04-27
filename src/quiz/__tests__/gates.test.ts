import { describe, it, expect } from 'vitest';
import { isUnlocked } from '../gates';

const ctx = (over: Partial<{ totalXp: number; lifetimeAttempts: number; bypassGates: boolean }>) => ({
  totalXp: 0,
  lifetimeAttempts: 0,
  bypassGates: false,
  ...over,
});

describe('quiz/gates', () => {
  it('advanced locked at 0 XP / 0 attempts', () => {
    expect(isUnlocked('difficulty.advanced', ctx({}))).toBe(false);
  });

  it('advanced unlocks at Analyst I', () => {
    expect(isUnlocked('difficulty.advanced', ctx({ totalXp: 500 }))).toBe(true);
  });

  it('advanced unlocks at 50 attempts even before tier', () => {
    expect(isUnlocked('difficulty.advanced', ctx({ lifetimeAttempts: 50 }))).toBe(true);
  });

  it('dynamic requires Analyst II or 200 attempts', () => {
    expect(isUnlocked('difficulty.dynamic', ctx({ totalXp: 500 }))).toBe(false);
    expect(isUnlocked('difficulty.dynamic', ctx({ totalXp: 1500 }))).toBe(true);
    expect(isUnlocked('difficulty.dynamic', ctx({ lifetimeAttempts: 200 }))).toBe(true);
  });

  it('bypassGates unlocks everything', () => {
    expect(isUnlocked('difficulty.advanced', ctx({ bypassGates: true }))).toBe(true);
    expect(isUnlocked('difficulty.dynamic', ctx({ bypassGates: true }))).toBe(true);
    expect(isUnlocked('mode.speedDrill', ctx({ bypassGates: true }))).toBe(true);
    expect(isUnlocked('mode.walkthrough', ctx({ bypassGates: true }))).toBe(true);
  });

  it('speedDrill + walkthrough have lower attempt thresholds', () => {
    expect(isUnlocked('mode.speedDrill', ctx({ lifetimeAttempts: 30 }))).toBe(true);
    expect(isUnlocked('mode.walkthrough', ctx({ lifetimeAttempts: 25 }))).toBe(true);
  });
});
