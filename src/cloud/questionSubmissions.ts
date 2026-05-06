import { getSupabase } from './client';

export type SubmissionType = 'multipleChoice' | 'solvable' | 'wordProblem';
export type SubmissionStatus = 'pending' | 'approved' | 'rejected' | 'integrated';
export type SubmissionDifficulty = 'beginner' | 'intermediate' | 'advanced';

export interface QuestionSubmission {
  id: string;
  submitter_id: string;
  question_type: SubmissionType;
  prompt: string;
  expected_answer: string;
  choices: string[] | null;
  unit: string | null;
  explanation: string | null;
  kind_hint: string | null;
  role_hint: string | null;
  difficulty_hint: SubmissionDifficulty | null;
  tags: string[] | null;
  status: SubmissionStatus;
  reviewer_id: string | null;
  reviewer_notes: string | null;
  reviewed_at: string | null;
  created_at: string;
  updated_at: string;
}

/** Fields the user fills out — server fills in the rest. */
export interface SubmissionDraft {
  question_type: SubmissionType;
  prompt: string;
  expected_answer: string;
  choices?: string[] | null;
  unit?: string | null;
  explanation?: string | null;
  kind_hint?: string | null;
  role_hint?: string | null;
  difficulty_hint?: SubmissionDifficulty | null;
  tags?: string[] | null;
}

export interface ValidationError {
  field: string;
  message: string;
}

/**
 * Pure validator — returns a list of issues, empty when the draft is OK to
 * submit. Mirrors the SQL CHECK constraints + adds type-specific rules
 * (multipleChoice needs ≥ 2 choices, solvable needs a unit, etc.).
 */
export function validateSubmission(draft: SubmissionDraft): ValidationError[] {
  const errors: ValidationError[] = [];
  const prompt = draft.prompt.trim();
  if (prompt.length < 20) {
    errors.push({ field: 'prompt', message: 'Prompt must be at least 20 characters.' });
  }
  if (prompt.length > 2000) {
    errors.push({ field: 'prompt', message: 'Prompt must be under 2,000 characters.' });
  }
  const expected = draft.expected_answer.trim();
  if (expected.length < 1) {
    errors.push({ field: 'expected_answer', message: 'Expected answer is required.' });
  }
  if (expected.length > 500) {
    errors.push({ field: 'expected_answer', message: 'Expected answer must be under 500 characters.' });
  }

  if (draft.question_type === 'multipleChoice') {
    const choices = (draft.choices ?? []).map((c) => c.trim()).filter(Boolean);
    if (choices.length < 2) {
      errors.push({ field: 'choices', message: 'Multiple-choice needs at least 2 non-empty choices.' });
    }
    if (choices.length > 8) {
      errors.push({ field: 'choices', message: 'Cap at 8 choices.' });
    }
    // Expected answer for MC should be the letter (A/B/...) of the correct choice.
    if (!/^[A-Za-z]$/.test(expected)) {
      errors.push({
        field: 'expected_answer',
        message: 'For multiple choice, expected answer is the letter (A, B, C, …) of the correct choice.',
      });
    } else {
      const idx = expected.toUpperCase().charCodeAt(0) - 65;
      if (idx < 0 || idx >= choices.length) {
        errors.push({
          field: 'expected_answer',
          message: `Letter ${expected.toUpperCase()} doesn't match any of your choices.`,
        });
      }
    }
  }

  if (draft.question_type === 'solvable') {
    if (!Number.isFinite(Number(expected.replace(/[,$%]/g, '')))) {
      errors.push({
        field: 'expected_answer',
        message: 'For solvable, expected answer must be a number (commas / $ / % allowed).',
      });
    }
    if (!draft.unit) {
      errors.push({ field: 'unit', message: 'Pick a unit so we know how to grade the answer.' });
    }
  }

  return errors;
}

/** Submit a new question. Server stamps id / submitter_id / created_at. */
export async function submitQuestion(
  submitterId: string,
  draft: SubmissionDraft,
): Promise<{ ok: true; submission: QuestionSubmission } | { ok: false; error: string }> {
  const supabase = getSupabase();
  if (!supabase) return { ok: false, error: 'cloud disabled' };
  const errors = validateSubmission(draft);
  if (errors.length > 0) {
    return { ok: false, error: errors[0].message };
  }
  const payload = {
    submitter_id: submitterId,
    question_type: draft.question_type,
    prompt: draft.prompt.trim(),
    expected_answer: draft.expected_answer.trim(),
    choices: draft.question_type === 'multipleChoice'
      ? (draft.choices ?? []).map((c) => c.trim()).filter(Boolean)
      : null,
    unit: draft.question_type === 'solvable' ? draft.unit ?? null : null,
    explanation: draft.explanation?.trim() || null,
    kind_hint: draft.kind_hint?.trim() || null,
    role_hint: draft.role_hint || null,
    difficulty_hint: draft.difficulty_hint || null,
    tags: draft.tags && draft.tags.length > 0 ? draft.tags : null,
  };
  const { data, error } = await supabase
    .from('question_submissions')
    .insert(payload)
    .select('*')
    .maybeSingle();
  if (error || !data) {
    return { ok: false, error: error?.message ?? 'submit failed' };
  }
  return { ok: true, submission: data as QuestionSubmission };
}

/** Fetch the signed-in user's own submissions (most recent first). */
export async function fetchMySubmissions(
  submitterId: string,
): Promise<QuestionSubmission[]> {
  const supabase = getSupabase();
  if (!supabase) return [];
  const { data, error } = await supabase
    .from('question_submissions')
    .select('*')
    .eq('submitter_id', submitterId)
    .order('created_at', { ascending: false });
  if (error || !data) return [];
  return data as QuestionSubmission[];
}

/** Update a still-pending submission (typo fixes). */
export async function updateSubmission(
  id: string,
  patch: Partial<SubmissionDraft>,
): Promise<{ ok: boolean; error: string | null }> {
  const supabase = getSupabase();
  if (!supabase) return { ok: false, error: 'cloud disabled' };
  const updatePayload: Record<string, unknown> = {};
  if (patch.prompt !== undefined) updatePayload.prompt = patch.prompt.trim();
  if (patch.expected_answer !== undefined) updatePayload.expected_answer = patch.expected_answer.trim();
  if (patch.choices !== undefined) {
    updatePayload.choices = patch.choices && patch.choices.length > 0
      ? patch.choices.map((c) => c.trim()).filter(Boolean)
      : null;
  }
  if (patch.unit !== undefined) updatePayload.unit = patch.unit ?? null;
  if (patch.explanation !== undefined) updatePayload.explanation = patch.explanation?.trim() || null;
  if (patch.kind_hint !== undefined) updatePayload.kind_hint = patch.kind_hint?.trim() || null;
  if (patch.role_hint !== undefined) updatePayload.role_hint = patch.role_hint || null;
  if (patch.difficulty_hint !== undefined) updatePayload.difficulty_hint = patch.difficulty_hint || null;
  if (patch.tags !== undefined) updatePayload.tags = patch.tags && patch.tags.length > 0 ? patch.tags : null;
  const { error } = await supabase
    .from('question_submissions')
    .update(updatePayload)
    .eq('id', id);
  if (error) return { ok: false, error: error.message };
  return { ok: true, error: null };
}
