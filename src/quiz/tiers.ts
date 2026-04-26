export interface Tier {
  id: 'rookie' | 'analyst1' | 'analyst2' | 'associate' | 'vp' | 'md';
  label: string;
  /** Minimum total XP to be at this tier */
  minXp: number;
}

export const TIERS: Tier[] = [
  { id: 'rookie', label: 'Rookie', minXp: 0 },
  { id: 'analyst1', label: 'Analyst I', minXp: 500 },
  { id: 'analyst2', label: 'Analyst II', minXp: 1500 },
  { id: 'associate', label: 'Associate', minXp: 4000 },
  { id: 'vp', label: 'VP', minXp: 10000 },
  { id: 'md', label: 'MD', minXp: 25000 },
];

export function tierForXp(xp: number): Tier {
  let active = TIERS[0];
  for (const t of TIERS) {
    if (xp >= t.minXp) active = t;
    else break;
  }
  return active;
}

export function nextTier(xp: number): { tier: Tier | null; xpToGo: number } {
  const current = tierForXp(xp);
  const idx = TIERS.findIndex((t) => t.id === current.id);
  const next = TIERS[idx + 1];
  if (!next) return { tier: null, xpToGo: 0 };
  return { tier: next, xpToGo: next.minXp - xp };
}

export function tierIndex(id: Tier['id']): number {
  return TIERS.findIndex((t) => t.id === id);
}

export function tierAtLeast(currentXp: number, minTier: Tier['id']): boolean {
  return tierIndex(tierForXp(currentXp).id) >= tierIndex(minTier);
}
