/**
 * Final-exam composition + scoring.
 *
 * The exam draws from a cert's `finalExam.contentScopes` and lays out
 * `composition` items. Quiz items are freshly generated questions; situational
 * items are picked from the in-scope cases. Walkthrough / Excel / Long-form
 * items in the composition are auto-credited — by the time the user is
 * eligible for the final exam, every module benchmark has been passed,
 * including the corresponding mode benchmarks. Auto-credit recognizes that
 * proven competence rather than re-testing the same skill.
 *
 * Scoring is per-item: each item contributes 1 / totalQuestions to the final
 * score. Pass = score >= cert.finalExam.passThresholdPct.
 */

import type { Cert, FinalExamSpec } from '../../types/cert';
import type { Question, QuestionKind } from '../../types/question';
import type { SituationalCase } from '../../types/situational';
import { generateQuestion } from '../engine';
import { caseById as situationalCaseById } from '../situational';
import { createRng } from '../random';

export interface QuizExamItem {
  kind: 'quiz';
  question: Question;
}

export interface SituationalExamItem {
  kind: 'situational';
  case: SituationalCase;
}

/** Items the user has effectively pre-passed by clearing the modules. */
export interface AutoCreditExamItem {
  kind: 'autoCredit';
  via: 'walkthrough' | 'excel' | 'longform';
  refId: string;
  /** Display label for the item card. */
  label: string;
}

export type FinalExamItem =
  | QuizExamItem
  | SituationalExamItem
  | AutoCreditExamItem;

export type FinalExamAnswer =
  | { kind: 'quiz'; userInput: number | null; correct: boolean }
  | {
      kind: 'situational';
      pickedIndex: number | null;
      correct: boolean;
    }
  | { kind: 'autoCredit'; correct: true };

export interface FinalExamRun {
  certId: string;
  items: FinalExamItem[];
  startedAt: number;
}

function pickN<T>(arr: readonly T[], n: number, seed: number): T[] {
  // Deterministic shuffle via mulberry-style LCG, take first n.
  const out = arr.slice();
  let s = (seed >>> 0) || 0x9e3779b9;
  for (let i = out.length - 1; i > 0; i--) {
    s = (s * 1664525 + 1013904223) >>> 0;
    const j = s % (i + 1);
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out.slice(0, Math.min(n, out.length));
}

function pickRotating<T>(arr: readonly T[], n: number, offset: number): T[] {
  if (arr.length === 0) return [];
  const out: T[] = [];
  for (let i = 0; i < n; i++) {
    out.push(arr[(offset + i) % arr.length]);
  }
  return out;
}

/**
 * Build the items for one exam attempt. Deterministic given the same seed +
 * cert spec — useful for tests; in app code we pass `Date.now()` or omit it.
 */
export function buildFinalExam(
  cert: Cert,
  seed: number = Date.now(),
): FinalExamRun {
  const items: FinalExamItem[] = [];
  const spec: FinalExamSpec = cert.finalExam;
  const scopes = spec.contentScopes;

  // Deterministic per-mode kind rotation: shuffle the available kinds once,
  // then rotate through them so we never repeat a kind until we've used all
  // of them.
  const quizKinds = pickN(
    (scopes.quizKinds ?? []) as readonly QuestionKind[],
    (scopes.quizKinds ?? []).length,
    seed,
  );

  for (const c of spec.composition) {
    if (c.mode === 'quiz' || c.mode === 'quizAccuracy') {
      const kinds = pickRotating(quizKinds, c.count, 0);
      for (let i = 0; i < c.count; i++) {
        const k = kinds[i];
        if (!k) continue;
        const rng = createRng(seed + items.length * 7919);
        const q = generateQuestion({
          categories: [k],
          mode: 'free',
          tolerancePreset: 'normal',
          difficulty: 'intermediate',
          rng,
        });
        items.push({ kind: 'quiz', question: q });
      }
    } else if (c.mode === 'situational' || c.mode === 'situationalCorrect') {
      const ids = scopes.situationalIds ?? [];
      const picked = pickN(ids, c.count, seed + 31);
      for (const id of picked) {
        const sCase = situationalCaseById(id);
        if (sCase) items.push({ kind: 'situational', case: sCase });
      }
    } else if (
      c.mode === 'walkthrough' ||
      c.mode === 'walkthroughComplete'
    ) {
      const refs = scopes.walkIds ?? [];
      const picked = pickN(refs, c.count, seed + 53);
      for (const id of picked) {
        items.push({
          kind: 'autoCredit',
          via: 'walkthrough',
          refId: id,
          label: `Walkthrough: ${id}`,
        });
      }
    } else if (c.mode === 'excel' || c.mode === 'excelTemplate') {
      const refs = scopes.excelIds ?? [];
      const picked = pickN(refs, c.count, seed + 71);
      for (const id of picked) {
        items.push({
          kind: 'autoCredit',
          via: 'excel',
          refId: id,
          label: `Excel template: ${id}`,
        });
      }
    } else if (c.mode === 'longform' || c.mode === 'longformScore') {
      const refs = scopes.longformIds ?? [];
      const picked = pickN(refs, c.count, seed + 97);
      for (const id of picked) {
        items.push({
          kind: 'autoCredit',
          via: 'longform',
          refId: id,
          label: `Long-form: ${id}`,
        });
      }
    }
  }

  return {
    certId: cert.id,
    items,
    startedAt: Date.now(),
  };
}

export interface FinalExamScore {
  correct: number;
  total: number;
  pct: number;
  passed: boolean;
  byMode: Record<string, { correct: number; total: number }>;
}

export function scoreFinalExam(
  spec: FinalExamSpec,
  items: FinalExamItem[],
  answers: (FinalExamAnswer | null)[],
): FinalExamScore {
  let correct = 0;
  const byMode: Record<string, { correct: number; total: number }> = {};
  const total = items.length;
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const a = answers[i];
    const modeKey =
      item.kind === 'autoCredit' ? item.via : item.kind;
    if (!byMode[modeKey]) byMode[modeKey] = { correct: 0, total: 0 };
    byMode[modeKey].total += 1;
    const isCorrect = !!a && a.correct;
    if (isCorrect) {
      correct += 1;
      byMode[modeKey].correct += 1;
    }
  }
  const pct = total > 0 ? correct / total : 0;
  return {
    correct,
    total,
    pct,
    passed: total > 0 && pct >= spec.passThresholdPct,
    byMode,
  };
}
