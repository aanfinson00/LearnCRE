import { describe, expect, it } from 'vitest';
import { createRng } from '../random';
import { templates, allKinds } from '../templates';

const N = 100;

/**
 * Variety floor for the question generators. The user reported that quiz
 * questions felt repetitive — root cause was tight `pickFromSet` lists and a
 * coarse beginner step multiplier in `bands.ts`. After cleanup, every kind
 * should produce >20 distinct expected values across 100 generated questions
 * (intermediate / mixed asset class).
 *
 * The >20 floor is a regression guard, not a quality bar — it catches future
 * tightening of bands or new templates that lean on tiny pickFromSet lists.
 */
describe('quiz/variety — sample-space sanity', () => {
  it.each(allKinds)(
    'kind %s: produces >20 distinct expected values per 100 (intermediate / mixed)',
    (kind) => {
      const rng = createRng(12345);
      const expectedSet = new Set<number>();
      for (let i = 0; i < N; i++) {
        const q = templates[kind].generate(rng, 'intermediate', 'mixed');
        expectedSet.add(Number(q.expected.toFixed(6)));
      }
      expect(expectedSet.size, `kind ${kind} only produced ${expectedSet.size}/${N} distinct values`).toBeGreaterThan(20);
    },
  );

  it('beginner difficulty + multifamily still produces >10 distinct values per 100', () => {
    // Multifamily on beginner is the worst-case combination — narrowest cap-rate
    // band, tightest opex set. Should still produce reasonable variety after
    // dropping the beginner step multiplier from 4× to 2×.
    const rng = createRng(67890);
    const sample = new Set<number>();
    for (let i = 0; i < N; i++) {
      const q = templates.capCompression.generate(rng, 'beginner', 'multifamily');
      sample.add(Number(q.expected.toFixed(6)));
    }
    expect(sample.size).toBeGreaterThan(10);
  });

  it('DSCR templates produce varied DSCR thresholds (>5 distinct per 50)', () => {
    // After replacing 3-element pickFromSets with pickBand calls.
    const rng = createRng(54321);
    const seen = new Set<number>();
    for (let i = 0; i < 50; i++) {
      const q = templates.dscrTestPasses.generate(rng, 'intermediate', 'mixed');
      const t = (q.context as { dscrTarget?: number }).dscrTarget;
      if (t !== undefined) seen.add(Number(t.toFixed(4)));
    }
    expect(seen.size).toBeGreaterThan(5);
  });
});
