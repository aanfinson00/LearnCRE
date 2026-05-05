import type { QuestionKind } from './question';

export interface Profile {
  id: string;
  name: string;
  createdAt: number;
  lastActiveAt: number;
  /** small palette pick for the avatar dot */
  avatarColor: string;
}

export interface ProfilesRegistry {
  profiles: Profile[];
  activeId: string;
}

export interface SessionRecord {
  id: string;
  finishedAt: number;
  kind: 'quiz' | 'speedDrill' | 'walkthrough' | 'situational' | 'excel' | 'longform' | 'vocab' | 'mockInterview' | 'modelingTest';
  /** snapshot of the relevant config — not strongly typed to keep storage small */
  config: Record<string, unknown>;
  attempts: number;
  correct: number;
  accuracyPct: number;
  durationMs: number;
  xpEarned: number;
  perCategory?: Partial<Record<QuestionKind, { total: number; correct: number }>>;
}

export interface XpState {
  totalXp: number;
  bestSessionXp: number;
  currentStreak: number;
  bestStreak: number;
}

export interface TierState {
  /** Whether the user has bypassed soft gates */
  bypassGates: boolean;
}

export interface AchievementUnlock {
  id: string;
  unlockedAt: number;
}

export const AVATAR_COLORS = [
  '#d4895a', // copper
  '#6b8e5a', // signal-good
  '#8f5430', // copper-ink
  '#4a4340', // warm-stone
  '#b87040', // copper-deep
  '#3f5634', // signal-good-ink
] as const;
