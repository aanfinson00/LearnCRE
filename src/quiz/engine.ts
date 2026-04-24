import type { AnswerMode, Question, QuestionKind, Rng } from '../types/question';
import type { Attempt, Difficulty, DifficultyMode, TolerancePreset } from '../types/session';
import { buildChoices } from './distractors';
import { computeDynamicDifficulty } from './dynamic';
import { createRng } from './random';
import { templates } from './templates';
import { applyPreset } from './tolerance';

export function resolveDifficulty(
  mode: DifficultyMode,
  attempts: Attempt[] = [],
): Difficulty {
  if (mode === 'dynamic') return computeDynamicDifficulty(attempts);
  return mode;
}

export function generateQuestion(params: {
  categories: QuestionKind[];
  mode: AnswerMode;
  tolerancePreset: TolerancePreset;
  difficulty: DifficultyMode;
  attempts?: Attempt[];
  rng?: Rng;
}): Question {
  const rng = params.rng ?? createRng();
  if (params.categories.length === 0) {
    throw new Error('At least one category required');
  }
  const kind = params.categories[Math.floor(rng.next() * params.categories.length)];
  const template = templates[kind];
  const appliedDifficulty = resolveDifficulty(params.difficulty, params.attempts);
  const question = template.generate(rng, appliedDifficulty);

  const withTolerance: Question = {
    ...question,
    appliedDifficulty,
    tolerance: applyPreset(question.tolerance, params.tolerancePreset),
  };

  if (params.mode === 'mc') {
    withTolerance.choices = buildChoices(withTolerance, rng);
  }

  return withTolerance;
}
