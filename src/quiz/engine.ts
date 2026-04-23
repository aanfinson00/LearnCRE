import type { AnswerMode, Question, QuestionKind, Rng } from '../types/question';
import type { TolerancePreset } from '../types/session';
import { buildChoices } from './distractors';
import { createRng } from './random';
import { templates } from './templates';
import { applyPreset } from './tolerance';

export function generateQuestion(params: {
  categories: QuestionKind[];
  mode: AnswerMode;
  tolerancePreset: TolerancePreset;
  rng?: Rng;
}): Question {
  const rng = params.rng ?? createRng();
  if (params.categories.length === 0) {
    throw new Error('At least one category required');
  }
  const kind = params.categories[Math.floor(rng.next() * params.categories.length)];
  const template = templates[kind];
  const question = template.generate(rng);

  const withTolerance: Question = {
    ...question,
    tolerance: applyPreset(question.tolerance, params.tolerancePreset),
  };

  if (params.mode === 'mc') {
    withTolerance.choices = buildChoices(withTolerance, rng);
  }

  return withTolerance;
}
