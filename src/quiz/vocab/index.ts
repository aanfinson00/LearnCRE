import type {
  VocabCard,
  VocabCategory,
  VocabDifficulty,
  VocabFormat,
  VocabFormatChoice,
  VocabRunConfig,
  VocabTerm,
} from '../../types/vocab';
import { matchesRole } from '../../types/role';
import { vocabWeight, type VocabMasteryMap } from '../../storage/vocab';
import { RETURNS_MATH_TERMS } from './returnsMath';
import { CAPITAL_STRUCTURE_TERMS } from './capitalStructure';
import { DEBT_TERMS } from './debt';
import { LEASE_OPS_TERMS } from './leaseOps';
import { ASSET_CLASS_TERMS } from './assetClass';
import { TAX_REGULATORY_TERMS } from './taxRegulatory';

export const VOCAB_TERMS: VocabTerm[] = [
  ...RETURNS_MATH_TERMS,
  ...CAPITAL_STRUCTURE_TERMS,
  ...DEBT_TERMS,
  ...LEASE_OPS_TERMS,
  ...ASSET_CLASS_TERMS,
  ...TAX_REGULATORY_TERMS,
];

export function termById(id: string): VocabTerm | undefined {
  return VOCAB_TERMS.find((t) => t.id === id);
}

function matchesCategory(t: VocabTerm, c: VocabCategory | 'all'): boolean {
  return c === 'all' || t.category === c;
}

function matchesDifficulty(t: VocabTerm, d: VocabDifficulty | 'all'): boolean {
  return d === 'all' || t.difficulty === d;
}

export function filterTerms(
  config: Pick<VocabRunConfig, 'category' | 'difficulty' | 'role'>,
): VocabTerm[] {
  return VOCAB_TERMS.filter((t) => {
    if (!matchesCategory(t, config.category)) return false;
    if (!matchesDifficulty(t, config.difficulty)) return false;
    if (!matchesRole(t.roles, config.role)) return false;
    return true;
  });
}

/**
 * Pick N terms from the pool, weighted by mastery (low-mastery surfaces more often).
 * Deterministic for a given seed.
 */
export function pickTerms(
  pool: VocabTerm[],
  n: number,
  mastery: VocabMasteryMap,
  seed = Date.now(),
): VocabTerm[] {
  if (pool.length === 0) return [];
  const weighted = pool.map((t) => ({ term: t, w: vocabWeight(t.id, mastery) }));
  const out: VocabTerm[] = [];
  let remaining = weighted.slice();
  let s = (seed >>> 0) || 0x9e3779b9;
  const target = Math.min(n, pool.length);
  for (let i = 0; i < target; i++) {
    const total = remaining.reduce((acc, x) => acc + x.w, 0);
    if (total <= 0) break;
    s = (s * 1664525 + 1013904223) >>> 0;
    let r = (s / 0x100000000) * total;
    let idx = 0;
    for (let j = 0; j < remaining.length; j++) {
      r -= remaining[j].w;
      if (r <= 0) {
        idx = j;
        break;
      }
    }
    out.push(remaining[idx].term);
    remaining = remaining.filter((_, k) => k !== idx);
  }
  return out;
}

function pickFormat(format: VocabFormatChoice, seed: number, idx: number): VocabFormat {
  if (format === 'forward') return 'forward';
  if (format === 'reverse') return 'reverse';
  // mixed: alternate by seed + idx
  return ((seed + idx) % 2 === 0 ? 'forward' : 'reverse') as VocabFormat;
}

function shuffle4<T>(arr: readonly T[], seed: number): T[] {
  const out = arr.slice() as T[];
  let s = (seed >>> 0) || 0x9e3779b9;
  for (let i = out.length - 1; i > 0; i--) {
    s = (s * 1664525 + 1013904223) >>> 0;
    const j = s % (i + 1);
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

/**
 * Build a card for a single term in a given format. Distractors are sourced
 * from the term's own distractors (forward) or by resolving its
 * reverseDistractorIds against the term registry (reverse).
 */
export function buildCard(
  term: VocabTerm,
  format: VocabFormat,
  seed: number,
): VocabCard {
  if (format === 'forward') {
    // Term shown; pick the matching short def from 4 options.
    const distractors = term.distractors.slice(0, 3);
    const allOptions = [term.shortDef, ...distractors];
    const shuffled = shuffle4(allOptions, seed);
    return {
      termId: term.id,
      format,
      prompt: term.term,
      options: shuffled.map((text) => ({ text })),
      correctIndex: shuffled.indexOf(term.shortDef),
    };
  }
  // Reverse: short def shown; pick the matching term from 4.
  const distractorTerms = term.reverseDistractorIds
    .map((id) => termById(id))
    .filter((t): t is VocabTerm => !!t)
    .slice(0, 3);
  // Backfill with random terms if author didn't provide enough valid distractors.
  const fallbackPool = VOCAB_TERMS.filter(
    (t) =>
      t.id !== term.id && !distractorTerms.some((d) => d.id === t.id),
  );
  while (distractorTerms.length < 3 && fallbackPool.length > 0) {
    const idx = (seed + distractorTerms.length * 31) % fallbackPool.length;
    distractorTerms.push(fallbackPool[idx]);
    fallbackPool.splice(idx, 1);
  }
  const allOptions = [term.term, ...distractorTerms.map((d) => d.term)];
  const shuffled = shuffle4(allOptions, seed);
  return {
    termId: term.id,
    format,
    prompt: term.shortDef,
    options: shuffled.map((text) => ({ text })),
    correctIndex: shuffled.indexOf(term.term),
  };
}

/** Build N cards from a pool of terms, applying the chosen format strategy. */
export function buildCards(
  terms: VocabTerm[],
  format: VocabFormatChoice,
  seed: number,
): VocabCard[] {
  return terms.map((t, i) =>
    buildCard(t, pickFormat(format, seed, i), seed + i * 17),
  );
}
