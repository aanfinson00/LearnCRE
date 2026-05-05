import { describe, expect, it } from 'vitest';
import { evaluateBenchmark, evaluateCert } from '../evaluate';
import { creFundamentals } from '../cre-fundamentals';
import type {
  ExcelTemplateBenchmark,
  LongformScoreBenchmark,
  QuizAccuracyBenchmark,
  SituationalCorrectBenchmark,
  WalkthroughCompleteBenchmark,
} from '../../../types/cert';
import type { SessionRecord } from '../../../types/profile';

function quizSession(
  partial: Partial<SessionRecord> & {
    categories: string[];
    difficulty?: string;
    perCategory?: SessionRecord['perCategory'];
    attempts: number;
    correct: number;
  },
): SessionRecord {
  return {
    id: `q_${Math.random()}`,
    finishedAt: Date.now(),
    kind: 'quiz',
    config: {
      categories: partial.categories,
      difficulty: partial.difficulty ?? 'intermediate',
      appliedDifficulty: partial.difficulty ?? 'intermediate',
    },
    attempts: partial.attempts,
    correct: partial.correct,
    accuracyPct: partial.attempts === 0 ? 0 : partial.correct / partial.attempts,
    durationMs: 1000,
    xpEarned: 0,
    perCategory: partial.perCategory,
  };
}

describe('cert evaluator — quizAccuracy', () => {
  it('passes at threshold + min attempts', () => {
    const bench: QuizAccuracyBenchmark = {
      id: 'b1',
      kind: 'quizAccuracy',
      label: 'cap quiz',
      kindSet: ['capCompression', 'goingInCap'],
      minAccuracyPct: 0.8,
      minAttempts: 30,
      minDifficulty: 'intermediate',
    };
    const sessions: SessionRecord[] = [
      quizSession({
        categories: ['capCompression'],
        attempts: 30,
        correct: 25,
        perCategory: { capCompression: { total: 30, correct: 25 } },
      }),
    ];
    const r = evaluateBenchmark(bench, sessions);
    expect(r.passed).toBe(true);
    expect(r.progress).toBe(1);
  });

  it('fails below threshold', () => {
    const bench: QuizAccuracyBenchmark = {
      id: 'b1',
      kind: 'quizAccuracy',
      label: 'cap quiz',
      kindSet: ['capCompression'],
      minAccuracyPct: 0.8,
      minAttempts: 30,
    };
    const sessions: SessionRecord[] = [
      quizSession({
        categories: ['capCompression'],
        attempts: 30,
        correct: 20,
        perCategory: { capCompression: { total: 30, correct: 20 } },
      }),
    ];
    const r = evaluateBenchmark(bench, sessions);
    expect(r.passed).toBe(false);
    expect(r.progress).toBeLessThan(1);
  });

  it('fails below min attempts even with high accuracy', () => {
    const bench: QuizAccuracyBenchmark = {
      id: 'b1',
      kind: 'quizAccuracy',
      label: 'cap quiz',
      kindSet: ['capCompression'],
      minAccuracyPct: 0.8,
      minAttempts: 30,
    };
    const sessions: SessionRecord[] = [
      quizSession({
        categories: ['capCompression'],
        attempts: 5,
        correct: 5,
        perCategory: { capCompression: { total: 5, correct: 5 } },
      }),
    ];
    const r = evaluateBenchmark(bench, sessions);
    expect(r.passed).toBe(false);
  });

  it('skips beginner sessions when minDifficulty=intermediate', () => {
    const bench: QuizAccuracyBenchmark = {
      id: 'b1',
      kind: 'quizAccuracy',
      label: 'cap quiz',
      kindSet: ['capCompression'],
      minAccuracyPct: 0.8,
      minAttempts: 30,
      minDifficulty: 'intermediate',
    };
    const sessions: SessionRecord[] = [
      quizSession({
        categories: ['capCompression'],
        difficulty: 'beginner',
        attempts: 30,
        correct: 30,
        perCategory: { capCompression: { total: 30, correct: 30 } },
      }),
    ];
    const r = evaluateBenchmark(bench, sessions);
    expect(r.passed).toBe(false);
  });
});

describe('cert evaluator — situationalCorrect', () => {
  it('counts correct attempts across in-scope cases', () => {
    const bench: SituationalCorrectBenchmark = {
      id: 'b1',
      kind: 'situationalCorrect',
      label: 'cases',
      caseIds: ['cap-rate-divergence', 'going-in-vs-exit-cap-spread'],
      minBestAnswerPct: 0.7,
      minAttempts: 4,
    };
    const sessions: SessionRecord[] = [
      {
        id: 's_1',
        finishedAt: Date.now(),
        kind: 'situational',
        config: {
          attemptedCaseIds: [
            'cap-rate-divergence',
            'going-in-vs-exit-cap-spread',
            'noi-growth-smell-test', // out of scope
          ],
          correctCaseIds: ['cap-rate-divergence', 'going-in-vs-exit-cap-spread'],
        },
        attempts: 3,
        correct: 2,
        accuracyPct: 0.66,
        durationMs: 1,
        xpEarned: 0,
      },
      {
        id: 's_2',
        finishedAt: Date.now(),
        kind: 'situational',
        config: {
          attemptedCaseIds: ['cap-rate-divergence', 'going-in-vs-exit-cap-spread'],
          correctCaseIds: ['cap-rate-divergence', 'going-in-vs-exit-cap-spread'],
        },
        attempts: 2,
        correct: 2,
        accuracyPct: 1,
        durationMs: 1,
        xpEarned: 0,
      },
    ];
    const r = evaluateBenchmark(bench, sessions);
    // 4 in-scope attempts (2 from each session); all 4 correct = 100%
    expect(r.passed).toBe(true);
  });
});

describe('cert evaluator — walkthroughComplete', () => {
  it('uses the best run, not the average', () => {
    const bench: WalkthroughCompleteBenchmark = {
      id: 'b1',
      kind: 'walkthroughComplete',
      label: 'walk',
      walkId: 'walk-combined-1',
      minStepAccuracyPct: 0.8,
    };
    const sessions: SessionRecord[] = [
      {
        id: 'w1',
        finishedAt: Date.now(),
        kind: 'walkthrough',
        config: { defId: 'walk-combined-1', kind: 'combinedScenarioWalk' },
        attempts: 4,
        correct: 2, // 50% — fails
        accuracyPct: 0.5,
        durationMs: 1,
        xpEarned: 0,
      },
      {
        id: 'w2',
        finishedAt: Date.now(),
        kind: 'walkthrough',
        config: { defId: 'walk-combined-1', kind: 'combinedScenarioWalk' },
        attempts: 4,
        correct: 4, // 100% — passes
        accuracyPct: 1,
        durationMs: 1,
        xpEarned: 0,
      },
    ];
    const r = evaluateBenchmark(bench, sessions);
    expect(r.passed).toBe(true);
  });
});

describe('cert evaluator — excelTemplate', () => {
  it('counts unique template ids that have ever passed', () => {
    const bench: ExcelTemplateBenchmark = {
      id: 'b1',
      kind: 'excelTemplate',
      label: 'excel',
      templateIds: ['noi-roll-forward', 'equity-multiple'],
      minPassRatePct: 1.0,
    };
    const sessions: SessionRecord[] = [
      {
        id: 'x1',
        finishedAt: Date.now(),
        kind: 'excel',
        config: { correctTemplateIds: ['noi-roll-forward'] },
        attempts: 1,
        correct: 1,
        accuracyPct: 1,
        durationMs: 1,
        xpEarned: 0,
      },
      {
        id: 'x2',
        finishedAt: Date.now(),
        kind: 'excel',
        config: { correctTemplateIds: ['equity-multiple'] },
        attempts: 1,
        correct: 1,
        accuracyPct: 1,
        durationMs: 1,
        xpEarned: 0,
      },
    ];
    const r = evaluateBenchmark(bench, sessions);
    expect(r.passed).toBe(true);
  });
});

describe('cert evaluator — longformScore', () => {
  it('averages scores across in-scope cases', () => {
    const bench: LongformScoreBenchmark = {
      id: 'b1',
      kind: 'longformScore',
      label: 'longform',
      caseIds: ['walk-me-through-bid'],
      minAvgScorePct: 0.7,
    };
    const sessions: SessionRecord[] = [
      {
        id: 'l1',
        finishedAt: Date.now(),
        kind: 'longform',
        config: {
          attempts: [{ caseId: 'walk-me-through-bid', score: 80 }],
        },
        attempts: 1,
        correct: 1,
        accuracyPct: 1,
        durationMs: 1,
        xpEarned: 0,
      },
    ];
    const r = evaluateBenchmark(bench, sessions);
    expect(r.passed).toBe(true);
  });
});

describe('CRE Fundamentals cert structure', () => {
  it('has 4 modules + final exam spec', () => {
    expect(creFundamentals.modules).toHaveLength(4);
    expect(creFundamentals.finalExam.totalQuestions).toBe(20);
    const sumComp = creFundamentals.finalExam.composition.reduce(
      (s, c) => s + c.count,
      0,
    );
    expect(sumComp).toBe(creFundamentals.finalExam.totalQuestions);
  });

  it('each benchmark id is unique within the cert', () => {
    const ids = new Set<string>();
    for (const m of creFundamentals.modules) {
      for (const b of m.benchmarks) {
        expect(ids.has(b.id), `duplicate benchmark id ${b.id}`).toBe(false);
        ids.add(b.id);
      }
    }
  });

  it('evaluateCert with empty sessions reports 0/4 modules passed', () => {
    const view = evaluateCert(creFundamentals, [], []);
    expect(view.modulesPassed).toBe(0);
    expect(view.totalModules).toBe(4);
    expect(view.eligibleForFinal).toBe(false);
    expect(view.earned).toBe(false);
  });
});
