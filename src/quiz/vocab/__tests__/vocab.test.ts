import { describe, expect, it } from 'vitest';
import {
  VOCAB_TERMS,
  buildCard,
  buildCards,
  filterTerms,
  pickTerms,
  termById,
} from '..';
import { vocabWeight } from '../../../storage/vocab';

describe('vocab registry', () => {
  it('has terms across all 6 categories', () => {
    const cats = new Set(VOCAB_TERMS.map((t) => t.category));
    expect(cats.size).toBe(6);
    for (const cat of [
      'returns-math',
      'capital-structure',
      'debt',
      'lease-ops',
      'asset-class',
      'tax-regulatory',
    ] as const) {
      expect(cats.has(cat), `missing category ${cat}`).toBe(true);
    }
  });

  it('every term has a unique id', () => {
    const ids = VOCAB_TERMS.map((t) => t.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('every term has at least 3 distractors (forward MC)', () => {
    for (const t of VOCAB_TERMS) {
      expect(t.distractors.length, `${t.id} distractors`).toBeGreaterThanOrEqual(3);
    }
  });

  it('reverseDistractorIds resolve to real terms in the registry', () => {
    for (const t of VOCAB_TERMS) {
      for (const id of t.reverseDistractorIds) {
        expect(termById(id), `${t.id} -> unknown reverse distractor ${id}`).toBeDefined();
      }
    }
  });

  it('filterTerms narrows by category', () => {
    const debtOnly = filterTerms({ category: 'debt', difficulty: 'all' });
    expect(debtOnly.every((t) => t.category === 'debt')).toBe(true);
    expect(debtOnly.length).toBeGreaterThan(0);
  });

  it('filterTerms narrows by difficulty', () => {
    const advancedOnly = filterTerms({ category: 'all', difficulty: 'advanced' });
    expect(advancedOnly.every((t) => t.difficulty === 'advanced')).toBe(true);
  });
});

describe('vocab card builder', () => {
  it('builds a forward card with prompt = term and 4 options including the def', () => {
    const term = termById('cap-rate')!;
    const card = buildCard(term, 'forward', 1);
    expect(card.format).toBe('forward');
    expect(card.prompt).toBe(term.term);
    expect(card.options.length).toBe(4);
    expect(card.options[card.correctIndex].text).toBe(term.shortDef);
  });

  it('builds a reverse card with prompt = def and 4 options including the term', () => {
    const term = termById('cap-rate')!;
    const card = buildCard(term, 'reverse', 1);
    expect(card.format).toBe('reverse');
    expect(card.prompt).toBe(term.shortDef);
    expect(card.options.length).toBe(4);
    expect(card.options[card.correctIndex].text).toBe(term.term);
  });

  it('reverse-card distractors are different terms (no duplicates)', () => {
    const term = termById('cap-rate')!;
    const card = buildCard(term, 'reverse', 1);
    const labels = card.options.map((o) => o.text);
    expect(new Set(labels).size).toBe(labels.length);
  });

  it('buildCards produces N cards for N input terms', () => {
    const terms = VOCAB_TERMS.slice(0, 5);
    const cards = buildCards(terms, 'forward', 42);
    expect(cards.length).toBe(5);
    for (let i = 0; i < cards.length; i++) {
      expect(cards[i].termId).toBe(terms[i].id);
    }
  });

  it('mixed format alternates forward / reverse deterministically by seed', () => {
    const terms = VOCAB_TERMS.slice(0, 4);
    const cards = buildCards(terms, 'mixed', 0);
    const formats = cards.map((c) => c.format).join(',');
    expect(formats).toBe('forward,reverse,forward,reverse');
  });
});

describe('vocab spaced-rep weighting', () => {
  it('never-seen terms get the highest weight (4.0)', () => {
    const w = vocabWeight('rubs', {});
    expect(w).toBe(4.0);
  });

  it('100% accuracy yields lower weight than 0% accuracy', () => {
    const wPerfect = vocabWeight('a', {
      a: { total: 10, correct: 10, lastSeenAt: Date.now() },
    });
    const wTerrible = vocabWeight('b', {
      b: { total: 10, correct: 0, lastSeenAt: Date.now() },
    });
    expect(wPerfect).toBeLessThan(wTerrible);
  });

  it('long gaps surface terms more often (recency bonus)', () => {
    const now = Date.now();
    const wRecent = vocabWeight(
      'a',
      { a: { total: 10, correct: 5, lastSeenAt: now } },
      now,
    );
    const wOld = vocabWeight(
      'a',
      {
        a: {
          total: 10,
          correct: 5,
          lastSeenAt: now - 31 * 24 * 60 * 60 * 1000, // 31 days
        },
      },
      now,
    );
    expect(wOld).toBeGreaterThan(wRecent);
  });
});

describe('pickTerms (weighted sampler)', () => {
  it('returns N terms', () => {
    const picked = pickTerms(VOCAB_TERMS, 10, {}, 1);
    expect(picked.length).toBe(10);
  });

  it('returns at most pool.length when N exceeds pool', () => {
    const small = VOCAB_TERMS.slice(0, 3);
    const picked = pickTerms(small, 10, {}, 1);
    expect(picked.length).toBe(3);
  });

  it('returns no duplicates', () => {
    const picked = pickTerms(VOCAB_TERMS, 20, {}, 7);
    const ids = picked.map((t) => t.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
