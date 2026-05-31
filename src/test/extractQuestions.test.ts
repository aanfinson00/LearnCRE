import { describe, it, expect } from 'vitest';
import { mkdirSync, writeFileSync } from 'node:fs';
import {
  REVIEW_QUESTIONS,
  REVIEW_TARGET,
  reviewQuestionToMarkdown,
} from '../quiz/reviewQuestions';

/**
 * Doubles as (a) the validation suite for the Feedback studio dataset and
 * (b) the generator for the repo-side review artifacts. Run with:
 *   npx vitest run src/test/extractQuestions.test.ts
 * Regenerates QUESTION_REVIEW.md + feedback/questions.json from the same
 * REVIEW_QUESTIONS the in-app screen renders, so numbering never drifts.
 */
describe('feedback review dataset', () => {
  it('has exactly 100 sequentially-numbered, uniquely-id\'d questions', () => {
    expect(REVIEW_QUESTIONS).toHaveLength(REVIEW_TARGET);
    REVIEW_QUESTIONS.forEach((q, i) => expect(q.number).toBe(i + 1));
    expect(new Set(REVIEW_QUESTIONS.map((q) => q.id)).size).toBe(REVIEW_TARGET);
    for (const q of REVIEW_QUESTIONS) {
      expect(q.title.trim().length).toBeGreaterThan(0);
      expect(q.blocks.length).toBeGreaterThan(0);
    }
  });

  it('writes QUESTION_REVIEW.md + feedback/questions.json', () => {
    const md: string[] = [
      '# LearnCRE — Question Review Sheet (1–100)',
      '',
      'Wordier, framing-sensitive questions pulled live from the app (the same set the in-app **Feedback studio** serves). Work through 1–100 and record a voice memo per item on structure & framing. Each entry shows exactly what the learner reads. Model answers / explanations are omitted on purpose — this pass is about how the question is *posed*.',
      '',
      '---',
      '',
    ];
    for (const q of REVIEW_QUESTIONS) {
      md.push(reviewQuestionToMarkdown(q));
      md.push('');
    }
    md.push('---', '', `_Total questions: ${REVIEW_QUESTIONS.length}. Generated from live app content._`);
    writeFileSync('QUESTION_REVIEW.md', md.join('\n'));

    mkdirSync('feedback', { recursive: true });
    writeFileSync(
      'feedback/questions.json',
      JSON.stringify({ total: REVIEW_QUESTIONS.length, questions: REVIEW_QUESTIONS }, null, 2),
    );
  });
});
