/**
 * Pure-function benchmark evaluators.
 *
 * Each evaluator takes a benchmark spec + the relevant slice of session
 * history and returns whether the benchmark is passed plus a 0-1 progress
 * fraction (useful for showing partial-progress bars in the UI).
 *
 * The evaluators are intentionally side-effect-free so they can be called
 * from React render paths cheaply and from unit tests deterministically.
 */

import type { SessionRecord } from '../../types/profile';
import type { QuestionKind } from '../../types/question';
import type {
  Benchmark,
  Cert,
  CertProgressView,
  ExcelTemplateBenchmark,
  LongformScoreBenchmark,
  Module,
  QuizAccuracyBenchmark,
  SituationalCorrectBenchmark,
} from '../../types/cert';

const DIFFICULTY_RANK: Record<string, number> = {
  beginner: 0,
  intermediate: 1,
  advanced: 2,
  dynamic: 1, // dynamic difficulty averages around intermediate
};

export interface BenchmarkResult {
  benchmarkId: string;
  passed: boolean;
  /** 0-1 — fraction of the way to passing. 1 means passed. */
  progress: number;
  /** Human-readable status (e.g. "12/30 attempts · 76% accuracy"). */
  detail: string;
}

// -------------------- Per-mode aggregations --------------------

function quizAccuracyOver(
  sessions: SessionRecord[],
  bench: QuizAccuracyBenchmark,
): { attempts: number; correct: number } {
  // Quiz session config carries `categories` (selected kinds) and
  // `difficulty`. Per-attempt detail isn't preserved in SessionRecord, so we
  // attribute the session's accuracy to the kinds in its categories that
  // overlap with the benchmark scope. This is approximate but conservative
  // (we never overcount correct answers).
  const minRank = bench.minDifficulty
    ? DIFFICULTY_RANK[bench.minDifficulty] ?? 1
    : 0;
  const wantedKinds = new Set<QuestionKind>(bench.kindSet);

  let attempts = 0;
  let correct = 0;
  for (const s of sessions) {
    if (s.kind !== 'quiz') continue;
    const cfg = s.config as
      | {
          categories?: QuestionKind[];
          difficulty?: string;
          appliedDifficulty?: string;
        }
      | undefined;
    const cats = cfg?.categories ?? [];
    if (!cats.some((k) => wantedKinds.has(k))) continue;
    const diff = cfg?.appliedDifficulty ?? cfg?.difficulty ?? 'intermediate';
    if ((DIFFICULTY_RANK[diff] ?? 1) < minRank) continue;
    // Use perCategory if available (more precise), else session-level.
    const perCat = s.perCategory;
    if (perCat) {
      for (const k of bench.kindSet) {
        const c = perCat[k];
        if (c) {
          attempts += c.total;
          correct += c.correct;
        }
      }
    } else {
      attempts += s.attempts;
      correct += s.correct;
    }
  }
  return { attempts, correct };
}

function situationalAttemptsOver(
  sessions: SessionRecord[],
  bench: SituationalCorrectBenchmark,
): { attempts: number; correct: number } {
  const wanted = new Set(bench.caseIds);
  let attempts = 0;
  let correct = 0;
  for (const s of sessions) {
    if (s.kind !== 'situational') continue;
    const cfg = s.config as
      | {
          attemptedCaseIds?: string[];
          correctCaseIds?: string[];
          caseIds?: string[];
        }
      | undefined;
    const attempted = cfg?.attemptedCaseIds ?? cfg?.caseIds ?? [];
    const correctSet = new Set(cfg?.correctCaseIds ?? []);
    for (const id of attempted) {
      if (!wanted.has(id)) continue;
      attempts += 1;
      if (correctSet.has(id)) correct += 1;
    }
  }
  return { attempts, correct };
}

function bestWalkthroughStepAccuracy(
  sessions: SessionRecord[],
  walkId: string,
): number {
  let best = 0;
  for (const s of sessions) {
    if (s.kind !== 'walkthrough') continue;
    const cfg = s.config as { defId?: string } | undefined;
    if (cfg?.defId !== walkId) continue;
    if (s.attempts === 0) continue;
    const acc = s.correct / s.attempts;
    if (acc > best) best = acc;
  }
  return best;
}

function excelTemplatePassRate(
  sessions: SessionRecord[],
  bench: ExcelTemplateBenchmark,
): { passed: number; total: number } {
  const wanted = new Set(bench.templateIds);
  const passedSet = new Set<string>();
  for (const s of sessions) {
    if (s.kind !== 'excel') continue;
    const cfg = s.config as { correctTemplateIds?: string[] } | undefined;
    for (const id of cfg?.correctTemplateIds ?? []) {
      if (wanted.has(id)) passedSet.add(id);
    }
  }
  return { passed: passedSet.size, total: bench.templateIds.length };
}

function longformAvgScore(
  sessions: SessionRecord[],
  bench: LongformScoreBenchmark,
): { avg: number; attempts: number } {
  const wanted = new Set(bench.caseIds);
  let totalScore = 0;
  let attempts = 0;
  for (const s of sessions) {
    if (s.kind !== 'longform') continue;
    const cfg = s.config as
      | { attempts?: { caseId: string; score: number }[] }
      | undefined;
    for (const a of cfg?.attempts ?? []) {
      if (!wanted.has(a.caseId)) continue;
      totalScore += a.score;
      attempts += 1;
    }
  }
  return {
    avg: attempts === 0 ? 0 : totalScore / attempts,
    attempts,
  };
}

// -------------------- Per-benchmark evaluators --------------------

export function evaluateBenchmark(
  bench: Benchmark,
  sessions: SessionRecord[],
): BenchmarkResult {
  switch (bench.kind) {
    case 'quizAccuracy': {
      const { attempts, correct } = quizAccuracyOver(sessions, bench);
      const accuracy = attempts === 0 ? 0 : correct / attempts;
      const attemptsProgress = Math.min(1, attempts / bench.minAttempts);
      const accuracyProgress = Math.min(1, accuracy / bench.minAccuracyPct);
      const passed =
        attempts >= bench.minAttempts && accuracy >= bench.minAccuracyPct;
      return {
        benchmarkId: bench.id,
        passed,
        progress: Math.min(attemptsProgress, accuracyProgress),
        detail: `${correct}/${attempts} attempts · ${(accuracy * 100).toFixed(0)}% (need ≥${(bench.minAccuracyPct * 100).toFixed(0)}% over ${bench.minAttempts}+)`,
      };
    }
    case 'situationalCorrect': {
      const { attempts, correct } = situationalAttemptsOver(sessions, bench);
      const rate = attempts === 0 ? 0 : correct / attempts;
      const attemptsProgress = Math.min(1, attempts / bench.minAttempts);
      const rateProgress = Math.min(1, rate / bench.minBestAnswerPct);
      const passed =
        attempts >= bench.minAttempts && rate >= bench.minBestAnswerPct;
      return {
        benchmarkId: bench.id,
        passed,
        progress: Math.min(attemptsProgress, rateProgress),
        detail: `${correct}/${attempts} cases · ${(rate * 100).toFixed(0)}% (need ≥${(bench.minBestAnswerPct * 100).toFixed(0)}% over ${bench.minAttempts}+)`,
      };
    }
    case 'walkthroughComplete': {
      const acc = bestWalkthroughStepAccuracy(sessions, bench.walkId);
      const passed = acc >= bench.minStepAccuracyPct;
      return {
        benchmarkId: bench.id,
        passed,
        progress: Math.min(1, acc / bench.minStepAccuracyPct),
        detail: passed
          ? `Best run: ${(acc * 100).toFixed(0)}% step accuracy`
          : acc > 0
            ? `Best run: ${(acc * 100).toFixed(0)}% (need ≥${(bench.minStepAccuracyPct * 100).toFixed(0)}%)`
            : 'Not yet attempted',
      };
    }
    case 'excelTemplate': {
      const { passed: passedCount, total } = excelTemplatePassRate(
        sessions,
        bench,
      );
      const rate = total === 0 ? 0 : passedCount / total;
      const passed = rate >= bench.minPassRatePct;
      return {
        benchmarkId: bench.id,
        passed,
        progress: Math.min(1, rate / bench.minPassRatePct),
        detail: `${passedCount}/${total} templates passed (need ≥${(bench.minPassRatePct * 100).toFixed(0)}%)`,
      };
    }
    case 'longformScore': {
      const { avg, attempts } = longformAvgScore(sessions, bench);
      const passed = attempts > 0 && avg / 100 >= bench.minAvgScorePct;
      return {
        benchmarkId: bench.id,
        passed,
        progress: Math.min(1, avg / 100 / bench.minAvgScorePct),
        detail:
          attempts === 0
            ? 'No attempts yet'
            : `Avg ${avg.toFixed(0)}% over ${attempts} attempt${attempts === 1 ? '' : 's'} (need ≥${(bench.minAvgScorePct * 100).toFixed(0)}%)`,
      };
    }
  }
}

// -------------------- Module + cert progress --------------------

export interface ModuleProgressView {
  moduleId: string;
  passed: boolean;
  benchmarkResults: BenchmarkResult[];
}

export function evaluateModule(
  m: Module,
  sessions: SessionRecord[],
): ModuleProgressView {
  const results = m.benchmarks.map((b) => evaluateBenchmark(b, sessions));
  return {
    moduleId: m.id,
    passed: results.length > 0 && results.every((r) => r.passed),
    benchmarkResults: results,
  };
}

export function evaluateCert(
  cert: Cert,
  sessions: SessionRecord[],
  finalExamAttempts: { passed: boolean; scorePct: number }[],
  earnedAt?: number,
): CertProgressView {
  const moduleResults = cert.modules.map((m) => evaluateModule(m, sessions));
  const modulesPassed = moduleResults.filter((m) => m.passed).length;
  const totalModules = moduleResults.length;
  const benchmarksPassed = moduleResults.reduce(
    (sum, m) => sum + m.benchmarkResults.filter((b) => b.passed).length,
    0,
  );
  const totalBenchmarks = moduleResults.reduce(
    (sum, m) => sum + m.benchmarkResults.length,
    0,
  );
  const eligibleForFinal = modulesPassed === totalModules && totalModules > 0;
  const finalExamPassed = finalExamAttempts.some((a) => a.passed);
  const bestFinalScorePct =
    finalExamAttempts.length === 0
      ? null
      : Math.max(...finalExamAttempts.map((a) => a.scorePct));
  return {
    certId: cert.id,
    modulesPassed,
    totalModules,
    benchmarksPassed,
    totalBenchmarks,
    eligibleForFinal,
    finalExamPassed,
    earned: !!earnedAt,
    bestFinalScorePct,
  };
}

/** Convenience: per-module results, used by CertDetail to render. */
export function evaluateAllModules(
  cert: Cert,
  sessions: SessionRecord[],
): ModuleProgressView[] {
  return cert.modules.map((m) => evaluateModule(m, sessions));
}
