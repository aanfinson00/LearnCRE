import { getSupabase } from './client';
import type {
  QuestionSubmission,
  SubmissionStatus,
} from './questionSubmissions';

/** Is the signed-in user an admin? Cheap select on the admins table. */
export async function isCurrentUserAdmin(userId: string): Promise<boolean> {
  const supabase = getSupabase();
  if (!supabase) return false;
  const { data, error } = await supabase
    .from('admins')
    .select('user_id')
    .eq('user_id', userId)
    .maybeSingle();
  if (error) return false;
  return data !== null;
}

/** Admin-only: fetch submissions, optionally filtered by status. */
export async function fetchAllSubmissions(
  status?: SubmissionStatus,
): Promise<QuestionSubmission[]> {
  const supabase = getSupabase();
  if (!supabase) return [];
  let q = supabase
    .from('question_submissions')
    .select('*')
    .order('created_at', { ascending: false });
  if (status) q = q.eq('status', status);
  const { data, error } = await q;
  if (error) {
    console.warn('fetchAllSubmissions error', error);
    return [];
  }
  return (data ?? []) as QuestionSubmission[];
}

/** Admin-only: stamp status + reviewer_id + reviewer_notes + reviewed_at. */
export async function reviewSubmission(
  submissionId: string,
  reviewerId: string,
  status: 'approved' | 'rejected' | 'integrated',
  notes: string,
): Promise<{ ok: boolean; error: string | null }> {
  const supabase = getSupabase();
  if (!supabase) return { ok: false, error: 'cloud disabled' };
  const { error } = await supabase
    .from('question_submissions')
    .update({
      status,
      reviewer_id: reviewerId,
      reviewer_notes: notes.trim() || null,
      reviewed_at: new Date().toISOString(),
    })
    .eq('id', submissionId);
  if (error) return { ok: false, error: error.message };
  return { ok: true, error: null };
}

// ============== template-scaffold helper ==============

/**
 * Copy-paste starter for a new question template. Fills in what the
 * submission tells us and leaves TODO markers for the math.
 */
export function buildTemplateScaffold(s: QuestionSubmission): string {
  const kindGuess = s.kind_hint?.trim() || 'TODO_KIND';
  const camel = kindGuess.replace(/[^a-zA-Z0-9]+/g, '');
  const role = s.role_hint || 'acquisitions';
  const isMC = s.question_type === 'multipleChoice';
  const unit = s.unit ?? 'pct';

  return `import type { QuestionTemplate, Solution } from '../../types/question';
import { nextId } from '../random';
${isMC ? '' : "import { bands, pickBand } from '../bands';"}

function buildSolution(/* TODO: math inputs */): Solution {
  return {
    formula: '/* TODO */',
    steps: [
      // TODO: each step has { label, expression, result }
    ],
    answerDisplay: '/* TODO */',
  };
}

export const ${camel}Template: QuestionTemplate<'${kindGuess}'> = {
  kind: '${kindGuess}',
  label: '/* TODO: short title */',
  description: ${JSON.stringify(s.prompt.slice(0, 120) + (s.prompt.length > 120 ? '…' : ''))},
  category: 'returns', // or 'valuation'
  roles: ['${role}'],
  pattern: '/* TODO: e.g. NOI / price */',
  tips: [
    ${(s.explanation ?? '').split('\\n').filter(Boolean).map((line) => JSON.stringify(line.trim().slice(0, 200))).join(',\\n    ') || "'/* TODO: 3-5 mental-math anchors */'"},
  ],
  generate(rng, _difficulty = 'intermediate', _assetClass = 'mixed') {
    // TODO: derive prompt + expected from rng-picked bands so each draw
    // is a fresh question (not a verbatim copy of the submission).
    const expected = ${JSON.stringify(s.expected_answer)} as unknown as number;
    return {
      id: nextId('${camel}'),
      kind: '${kindGuess}',
      prompt: ${JSON.stringify(s.prompt)},
      context: { /* TODO: DealInputs fields */ },
      expected,
      unit: '${unit}',
      tolerance: { type: 'pct', band: 0.03 },
      solution: buildSolution(/* TODO */),
    };
  },
};
`;
}
