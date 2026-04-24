import type { QuestionKind, Rng } from '../types/question';
import type { LifetimeStats } from '../types/session';

/**
 * Returns a kind to ask, weighted by lifetime accuracy. Lower accuracy → more
 * weight. Kinds with no history get a baseline weight equal to the average so
 * fresh kinds aren't starved.
 */
export function pickKindWeighted(
  candidates: QuestionKind[],
  stats: LifetimeStats | null,
  rng: Rng,
): QuestionKind {
  if (candidates.length === 0) {
    throw new Error('No candidate kinds');
  }
  if (candidates.length === 1) return candidates[0];

  const weights = weightsForKinds(candidates, stats);
  const total = weights.reduce((a, b) => a + b, 0);
  if (total === 0) {
    return candidates[Math.floor(rng.next() * candidates.length)];
  }
  let r = rng.next() * total;
  for (let i = 0; i < candidates.length; i++) {
    r -= weights[i];
    if (r <= 0) return candidates[i];
  }
  return candidates[candidates.length - 1];
}

/**
 * Public for testing. Each kind gets a weight in [0.5, 4.0]:
 *   accuracy 100% → 0.5  (rare)
 *   accuracy 80%  → 1.0  (baseline)
 *   accuracy 60%  → 1.7
 *   accuracy 40%  → 2.4
 *   accuracy 0%   → 4.0
 * Untested kinds get a baseline 1.5 (slightly favored — push exploration).
 */
export function weightsForKinds(
  candidates: QuestionKind[],
  stats: LifetimeStats | null,
): number[] {
  return candidates.map((k) => {
    const cat = stats?.perCategory?.[k];
    if (!cat || cat.total < 3) return 1.5;
    const acc = cat.correct / cat.total;
    return Math.max(0.5, Math.min(4.0, 4.0 - 3.5 * acc));
  });
}
