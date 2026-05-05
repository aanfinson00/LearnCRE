import type {
  MockArchetypeId,
  MockArchetypeSpec,
  MockQuestion,
  MockQuestionAttempt,
  MockQuestionKind,
} from '../../types/mockInterview';
import type { LongformRubricItem } from '../../types/longform';
import { caseById as longformCaseById } from '../longform';
import { caseById as situationalCaseById } from '../situational';
import { generateQuestion } from '../engine';
import { createRng } from '../random';
import { MEGA_FUND_ACQ } from './archetypes/megaFundAcq';
import { prosePromptById } from './prompts';

export const MOCK_ARCHETYPES: MockArchetypeSpec[] = [MEGA_FUND_ACQ];

export function archetypeById(id: MockArchetypeId): MockArchetypeSpec | undefined {
  return MOCK_ARCHETYPES.find((a) => a.id === id);
}

/**
 * Assemble a concrete question list from an archetype spec + a seed.
 * Pure function: deterministic given the same seed; useful for testing
 * + replay later.
 */
export function assembleQuestions(
  spec: MockArchetypeSpec,
  seed: number = Date.now(),
): MockQuestion[] {
  const out: MockQuestion[] = [];
  const usedProseIds = new Set<string>();
  const usedSituationalIds = new Set<string>();
  const usedLongformIds = new Set<string>();

  // Track quiz-kind index so consecutive technical slots draw distinct kinds.
  let quizSlotIdx = 0;

  for (const slot of spec.composition) {
    const slotSeed = seed + out.length * 7919;

    if (slot.kind === 'technical') {
      const pool = spec.contentScopes.technicalKindPool ?? [];
      if (pool.length === 0) continue;
      const kind = pool[(slotSeed >>> 0) % pool.length] ?? pool[quizSlotIdx % pool.length];
      quizSlotIdx += 1;
      const rng = createRng(slotSeed);
      const question = generateQuestion({
        categories: [kind],
        mode: 'free',
        tolerancePreset: 'normal',
        difficulty: slot.difficulty ?? 'intermediate',
        rng,
      });
      out.push({
        kind: 'technical',
        sectionLabel: slot.sectionLabel,
        questionId: question.id,
        question,
      });
    } else if (slot.kind === 'situational') {
      const pool = (spec.contentScopes.situationalIdPool ?? []).filter(
        (id) => !usedSituationalIds.has(id),
      );
      if (pool.length === 0) continue;
      const id = pool[(slotSeed >>> 0) % pool.length];
      usedSituationalIds.add(id);
      const c = situationalCaseById(id);
      if (!c) continue;
      out.push({
        kind: 'situational',
        sectionLabel: slot.sectionLabel,
        caseId: id,
        case: c,
      });
    } else if (slot.kind === 'longform') {
      const pool = (spec.contentScopes.longformIdPool ?? []).filter(
        (id) => !usedLongformIds.has(id),
      );
      if (pool.length === 0) continue;
      const id = pool[(slotSeed >>> 0) % pool.length];
      usedLongformIds.add(id);
      const c = longformCaseById(id);
      if (!c) continue;
      out.push({
        kind: 'longform',
        sectionLabel: slot.sectionLabel,
        caseId: id,
        case: c,
      });
    } else {
      // fit / behavioral / marketView
      const proseKey: 'fitIdPool' | 'behavioralIdPool' | 'marketViewIdPool' =
        slot.kind === 'fit'
          ? 'fitIdPool'
          : slot.kind === 'behavioral'
            ? 'behavioralIdPool'
            : 'marketViewIdPool';
      const pool = (spec.contentScopes[proseKey] ?? []).filter(
        (id) => !usedProseIds.has(id),
      );
      if (pool.length === 0) continue;
      const id = pool[(slotSeed >>> 0) % pool.length];
      usedProseIds.add(id);
      const prompt = prosePromptById(id);
      if (!prompt) continue;
      out.push({
        kind: slot.kind,
        sectionLabel: slot.sectionLabel,
        promptId: id,
        prompt,
      });
    }
  }

  return out;
}

/** Compute a 0-1 rubric self-grade from per-item scores (0-3 scale). */
export function rubricScorePct(
  rubric: LongformRubricItem[],
  scores: Record<string, number>,
): number {
  if (rubric.length === 0) return 1; // no rubric = warmup, treat as full credit on completion
  let earned = 0;
  let max = 0;
  for (const item of rubric) {
    const w = item.weight ?? 1;
    earned += (scores[item.id] ?? 0) * w;
    max += 3 * w;
  }
  return max === 0 ? 0 : earned / max;
}

/** Aggregate scoring across all attempts in a finished run. */
export function aggregateMockScore(
  attempts: MockQuestionAttempt[],
): {
  totalScorePct: number;
  perKindScore: Partial<Record<MockQuestionKind, { count: number; scoreSum: number }>>;
} {
  const perKind: Partial<Record<MockQuestionKind, { count: number; scoreSum: number }>> = {};
  let total = 0;
  let count = 0;
  for (const a of attempts) {
    if (a.skipped) continue;
    const score =
      a.kind === 'technical'
        ? a.correct
          ? 1
          : 0
        : a.kind === 'situational'
          ? a.correct
            ? 1
            : 0
          : a.scorePct;
    const bucket = perKind[a.kind] ?? { count: 0, scoreSum: 0 };
    bucket.count += 1;
    bucket.scoreSum += score;
    perKind[a.kind] = bucket;
    total += score;
    count += 1;
  }
  return {
    totalScorePct: count === 0 ? 0 : total / count,
    perKindScore: perKind,
  };
}
