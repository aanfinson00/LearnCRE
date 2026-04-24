import { bands, type Band } from './bands';
import type { QuestionKind } from '../types/question';

export type AssetClass = 'mixed' | 'multifamily' | 'office' | 'retail' | 'industrial';

export interface AssetClassProfile {
  id: AssetClass;
  label: string;
  hint: string;
  /** Noun to substitute in prompts ("apartment building", "warehouse"). */
  noun: string;
  /** Slightly varied plural or generic phrase. */
  nounPlural: string;
  /** Lease structure description shown in prompts where relevant. */
  leaseType: 'gross' | 'nn' | 'nnn' | 'residential';
  /** Override bands — leave undefined to inherit the default from bands.ts */
  bandOverrides: Partial<{
    capRate: Band;
    opexRatio: Band;
    rentPerSf: Band;
    sf: Band;
    units: Band;
    pgiPerSf: Band;
    rentPerUnitYear: Band;
    opexPerUnitYear: Band;
    pricePerUnitValue: Band;
    exitCapRate: Band;
  }>;
  /** Discrete OpEx ratios specific to this asset class. */
  opexRatios: readonly number[];
  /** Question kinds excluded for this asset class (e.g. rentPerUnit outside multifamily). */
  excludeKinds?: QuestionKind[];
}

const MF: AssetClassProfile = {
  id: 'multifamily',
  label: 'Multifamily',
  hint: 'Apartments. Per-unit metrics, 30–40% OpEx, 4.5–6.5% caps.',
  noun: 'apartment building',
  nounPlural: 'apartment units',
  leaseType: 'residential',
  bandOverrides: {
    capRate: { min: 0.04, max: 0.065, step: 0.0025 },
    exitCapRate: { min: 0.045, max: 0.075, step: 0.0025 },
    opexRatio: { min: 0.3, max: 0.45, step: 0.025 },
    rentPerUnitYear: { min: 12_000, max: 40_000, step: 500 },
    opexPerUnitYear: { min: 4_500, max: 10_000, step: 250 },
    pricePerUnitValue: { min: 150_000, max: 500_000, step: 5_000 },
  },
  opexRatios: [0.3, 0.35, 0.4, 0.45] as const,
};

const OFFICE: AssetClassProfile = {
  id: 'office',
  label: 'Office',
  hint: 'Gross / modified gross leases. High 40–50% OpEx, 6.5–9% caps post-2023.',
  noun: 'office building',
  nounPlural: 'office tower',
  leaseType: 'gross',
  bandOverrides: {
    capRate: { min: 0.06, max: 0.095, step: 0.0025 },
    exitCapRate: { min: 0.065, max: 0.1, step: 0.0025 },
    opexRatio: { min: 0.35, max: 0.55, step: 0.025 },
    rentPerSf: { min: 20, max: 75, step: 0.25 },
    pgiPerSf: { min: 25, max: 80, step: 0.5 },
    sf: { min: 50_000, max: 1_000_000, step: 10_000 },
  },
  opexRatios: [0.4, 0.45, 0.5] as const,
  excludeKinds: ['rentPerUnit', 'opexPerUnit', 'pricePerUnit'],
};

const RETAIL: AssetClassProfile = {
  id: 'retail',
  label: 'Retail',
  hint: 'NNN / NN strip & power centers. 15–30% OpEx landlord, 6–8% caps.',
  noun: 'retail center',
  nounPlural: 'retail strip',
  leaseType: 'nnn',
  bandOverrides: {
    capRate: { min: 0.055, max: 0.085, step: 0.0025 },
    exitCapRate: { min: 0.06, max: 0.09, step: 0.0025 },
    opexRatio: { min: 0.15, max: 0.3, step: 0.025 },
    rentPerSf: { min: 18, max: 55, step: 0.25 },
    pgiPerSf: { min: 20, max: 60, step: 0.5 },
    sf: { min: 20_000, max: 400_000, step: 5_000 },
  },
  opexRatios: [0.15, 0.2, 0.25, 0.3] as const,
  excludeKinds: ['rentPerUnit', 'opexPerUnit', 'pricePerUnit'],
};

const INDUSTRIAL: AssetClassProfile = {
  id: 'industrial',
  label: 'Industrial',
  hint: 'NNN distribution / logistics. 10–20% OpEx landlord, 5–7% caps.',
  noun: 'industrial warehouse',
  nounPlural: 'distribution facility',
  leaseType: 'nnn',
  bandOverrides: {
    capRate: { min: 0.045, max: 0.07, step: 0.0025 },
    exitCapRate: { min: 0.05, max: 0.075, step: 0.0025 },
    opexRatio: { min: 0.1, max: 0.25, step: 0.025 },
    rentPerSf: { min: 6, max: 22, step: 0.25 },
    pgiPerSf: { min: 7, max: 25, step: 0.5 },
    sf: { min: 100_000, max: 1_500_000, step: 25_000 },
  },
  opexRatios: [0.1, 0.15, 0.2, 0.25] as const,
  excludeKinds: ['rentPerUnit', 'opexPerUnit', 'pricePerUnit'],
};

const MIXED: AssetClassProfile = {
  id: 'mixed',
  label: 'Mixed',
  hint: 'Default. All asset classes in the pool.',
  noun: 'property',
  nounPlural: 'property',
  leaseType: 'gross',
  bandOverrides: {},
  opexRatios: [0.3, 0.35, 0.4, 0.45, 0.5] as const,
};

export const assetClasses: Record<AssetClass, AssetClassProfile> = {
  mixed: MIXED,
  multifamily: MF,
  office: OFFICE,
  retail: RETAIL,
  industrial: INDUSTRIAL,
};

export const assetClassOrder: AssetClass[] = [
  'mixed',
  'multifamily',
  'office',
  'retail',
  'industrial',
];

export function getProfile(assetClass: AssetClass): AssetClassProfile {
  return assetClasses[assetClass];
}

type BandKey = keyof typeof bands;

export function classBand(key: BandKey, assetClass: AssetClass = 'mixed'): Band {
  const profile = getProfile(assetClass);
  const override = (profile.bandOverrides as Record<string, Band | undefined>)[key];
  return override ?? (bands[key] as Band);
}

export function classOpexRatios(assetClass: AssetClass = 'mixed'): readonly number[] {
  return getProfile(assetClass).opexRatios;
}

export function classNoun(assetClass: AssetClass = 'mixed'): string {
  return getProfile(assetClass).noun;
}

export function applicableKinds(
  assetClass: AssetClass,
  allKinds: QuestionKind[],
): QuestionKind[] {
  const profile = getProfile(assetClass);
  if (assetClass === 'multifamily') {
    // Everything applies to multifamily; per-unit kinds are native.
    return allKinds;
  }
  if (profile.excludeKinds && profile.excludeKinds.length > 0) {
    const excluded = new Set(profile.excludeKinds);
    return allKinds.filter((k) => !excluded.has(k));
  }
  return allKinds;
}
