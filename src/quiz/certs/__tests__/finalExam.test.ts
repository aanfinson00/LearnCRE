import { describe, expect, it } from 'vitest';
import { buildFinalExam, scoreFinalExam } from '../finalExam';
import { creFundamentals } from '../cre-fundamentals';

describe('finalExam — buildFinalExam', () => {
  it('produces totalQuestions items matching the cert composition', () => {
    const run = buildFinalExam(creFundamentals, 1);
    expect(run.items.length).toBe(creFundamentals.finalExam.totalQuestions);
  });

  it('lays out items in composition order', () => {
    const run = buildFinalExam(creFundamentals, 42);
    const counts = { quiz: 0, situational: 0, autoCredit: 0 };
    for (const it of run.items) counts[it.kind] += 1;
    // CRE Fundamentals: 12 quiz + 5 situational + 2 excel + 1 walkthrough
    // Excel + walkthrough are auto-credited (3 total).
    expect(counts.quiz).toBe(12);
    expect(counts.situational).toBe(5);
    expect(counts.autoCredit).toBe(3);
  });

  it('only picks situational cases that exist in the case bank', () => {
    const run = buildFinalExam(creFundamentals, 7);
    for (const it of run.items) {
      if (it.kind === 'situational') {
        expect(it.case.id).toBeDefined();
        expect(it.case.options.length).toBeGreaterThan(0);
      }
    }
  });

  it('quiz items include intermediate-difficulty questions', () => {
    const run = buildFinalExam(creFundamentals, 99);
    for (const it of run.items) {
      if (it.kind === 'quiz') {
        expect(it.question.appliedDifficulty).toBe('intermediate');
        expect(typeof it.question.expected).toBe('number');
      }
    }
  });

  it('different seeds produce different orderings', () => {
    const a = buildFinalExam(creFundamentals, 1);
    const b = buildFinalExam(creFundamentals, 2);
    // Quiz questions are randomly generated, so compare situational picks.
    const aSitIds = a.items
      .filter((it) => it.kind === 'situational')
      .map((it) => (it as { case: { id: string } }).case.id)
      .join(',');
    const bSitIds = b.items
      .filter((it) => it.kind === 'situational')
      .map((it) => (it as { case: { id: string } }).case.id)
      .join(',');
    // Not strictly required, but very likely with different seeds; if these
    // ever coincidentally match, bump the seed pair.
    expect(aSitIds === bSitIds).toBe(false);
  });
});

describe('finalExam — scoreFinalExam', () => {
  it('passes when score >= passThresholdPct', () => {
    const run = buildFinalExam(creFundamentals, 1);
    // All items correct
    const answers = run.items.map((it) =>
      it.kind === 'quiz'
        ? { kind: 'quiz' as const, userInput: 0, correct: true }
        : it.kind === 'situational'
          ? { kind: 'situational' as const, pickedIndex: 0, correct: true }
          : { kind: 'autoCredit' as const, correct: true as true },
    );
    const score = scoreFinalExam(creFundamentals.finalExam, run.items, answers);
    expect(score.passed).toBe(true);
    expect(score.pct).toBe(1);
    expect(score.correct).toBe(score.total);
  });

  it('fails when score < passThresholdPct', () => {
    const run = buildFinalExam(creFundamentals, 1);
    // Half correct → 50% < 75% threshold
    const answers = run.items.map((it, i) => {
      const correct = i % 2 === 0;
      if (it.kind === 'quiz') {
        return { kind: 'quiz' as const, userInput: 0, correct };
      }
      if (it.kind === 'situational') {
        return { kind: 'situational' as const, pickedIndex: 0, correct };
      }
      // Auto-credit is always correct, but test the wrong path doesn't matter
      return { kind: 'autoCredit' as const, correct: true as true };
    });
    const score = scoreFinalExam(creFundamentals.finalExam, run.items, answers);
    expect(score.passed).toBe(false);
    expect(score.pct).toBeLessThan(creFundamentals.finalExam.passThresholdPct);
  });

  it('treats unanswered items as wrong', () => {
    const run = buildFinalExam(creFundamentals, 1);
    const answers = run.items.map(() => null);
    const score = scoreFinalExam(creFundamentals.finalExam, run.items, answers);
    expect(score.correct).toBe(0);
    expect(score.passed).toBe(false);
  });
});
