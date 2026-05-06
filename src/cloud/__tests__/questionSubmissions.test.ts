import { describe, expect, it } from 'vitest';
import { validateSubmission, type SubmissionDraft } from '../questionSubmissions';

const longPrompt = 'How do you compute the cap rate for an income property?';

describe('cloud/questionSubmissions — validateSubmission', () => {
  describe('common rules', () => {
    it('rejects prompt under 20 chars', () => {
      const errors = validateSubmission({
        question_type: 'wordProblem',
        prompt: 'short',
        expected_answer: 'something',
      });
      expect(errors.some((e) => e.field === 'prompt')).toBe(true);
    });

    it('rejects prompt over 2000 chars', () => {
      const errors = validateSubmission({
        question_type: 'wordProblem',
        prompt: 'a'.repeat(2001),
        expected_answer: 'something',
      });
      expect(errors.some((e) => e.field === 'prompt')).toBe(true);
    });

    it('rejects empty expected answer', () => {
      const errors = validateSubmission({
        question_type: 'wordProblem',
        prompt: longPrompt,
        expected_answer: '',
      });
      expect(errors.some((e) => e.field === 'expected_answer')).toBe(true);
    });
  });

  describe('multipleChoice rules', () => {
    const base: SubmissionDraft = {
      question_type: 'multipleChoice',
      prompt: longPrompt,
      expected_answer: 'A',
      choices: ['NOI / price', 'NOI / equity', 'NOI / debt service', 'EBITDA / cap'],
    };

    it('passes a well-formed MC submission', () => {
      expect(validateSubmission(base)).toEqual([]);
    });

    it('requires at least 2 non-empty choices', () => {
      const errors = validateSubmission({ ...base, choices: ['only one'] });
      expect(errors.some((e) => e.field === 'choices')).toBe(true);
    });

    it('caps at 8 choices', () => {
      const errors = validateSubmission({
        ...base,
        choices: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'],
        expected_answer: 'A',
      });
      expect(errors.some((e) => e.field === 'choices')).toBe(true);
    });

    it('strips empty choice slots before counting', () => {
      const errors = validateSubmission({
        ...base,
        choices: ['real', '', '   ', 'also real'],
        expected_answer: 'B',
      });
      expect(errors).toEqual([]);
    });

    it('requires expected_answer to be a single letter', () => {
      const errors = validateSubmission({ ...base, expected_answer: 'NOI / price' });
      expect(errors.some((e) => e.field === 'expected_answer')).toBe(true);
    });

    it("rejects letters that don't index into the choices", () => {
      // 4 choices means A-D; F is out of range.
      const errors = validateSubmission({ ...base, expected_answer: 'F' });
      expect(errors.some((e) => e.field === 'expected_answer')).toBe(true);
    });

    it('accepts lowercase letter and matches case-insensitively', () => {
      expect(validateSubmission({ ...base, expected_answer: 'a' })).toEqual([]);
    });
  });

  describe('solvable rules', () => {
    const base: SubmissionDraft = {
      question_type: 'solvable',
      prompt: longPrompt,
      expected_answer: '5.5',
      unit: 'pct',
    };

    it('passes with a number + unit', () => {
      expect(validateSubmission(base)).toEqual([]);
    });

    it('strips $/comma/% before checking numeric', () => {
      expect(
        validateSubmission({ ...base, expected_answer: '$1,250,000', unit: 'usd' }),
      ).toEqual([]);
      expect(
        validateSubmission({ ...base, expected_answer: '6.5%', unit: 'pct' }),
      ).toEqual([]);
    });

    it('rejects non-numeric expected_answer', () => {
      const errors = validateSubmission({ ...base, expected_answer: 'about five' });
      expect(errors.some((e) => e.field === 'expected_answer')).toBe(true);
    });

    it('rejects missing unit', () => {
      const errors = validateSubmission({ ...base, unit: null });
      expect(errors.some((e) => e.field === 'unit')).toBe(true);
    });
  });

  describe('wordProblem rules', () => {
    it('passes with prose answer (no numeric / unit constraint)', () => {
      expect(
        validateSubmission({
          question_type: 'wordProblem',
          prompt: longPrompt,
          expected_answer: 'You would compare the basis to replacement cost…',
        }),
      ).toEqual([]);
    });

    it('rejects empty answer the same as the other types', () => {
      const errors = validateSubmission({
        question_type: 'wordProblem',
        prompt: longPrompt,
        expected_answer: '   ',
      });
      expect(errors.some((e) => e.field === 'expected_answer')).toBe(true);
    });
  });
});
