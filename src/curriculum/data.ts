/**
 * Bakes the curriculum pipeline state and draft markdown into the bundle at build time.
 *
 * The pipeline lives in scripts/curriculum-pipeline.py and writes:
 *  - .curriculum-state.json (repo root)
 *  - docs/CURRICULUM_DRAFTS/walkthrough-<id>.md, quiz-<id>.md (raw Ollama)
 *  - docs/CURRICULUM_DRAFTS/walkthrough-<id>.refined.md, quiz-<id>.refined.md (Claude)
 *
 * Vite's `?raw` import baked-in at build time picks all of these up. To refresh
 * what the deployed site shows, regenerate locally via the pipeline, commit, and push.
 */

import rawState from '../../.curriculum-state.json';

export type IdeaStatus =
  | 'pending'
  | 'queued'
  | 'accepted'
  | 'drafted'
  | 'refined'
  | 'rejected';

export interface Idea {
  id: string;
  title: string;
  category: string;
  outline: string;
  key_numbers?: (string | number)[];
  status: IdeaStatus;
  scores: Record<string, number> | null;
  score_total: number | null;
  reasoning: string | null;
  draft_walkthrough_path: string | null;
  draft_quiz_path: string | null;
  refined_walkthrough_path: string | null;
  refined_quiz_path: string | null;
  generated_at: string;
  graded_at: string | null;
  drafted_at: string | null;
  refined_at: string | null;
}

interface CurriculumState {
  version: number;
  ideas: Record<string, Idea>;
  log?: { at: string; msg: string }[];
}

export const state = rawState as unknown as CurriculumState;

// Eager-load every markdown draft as a string. Key shape:
//   "../../docs/CURRICULUM_DRAFTS/walkthrough-some-id.md"
const draftFiles = import.meta.glob('../../docs/CURRICULUM_DRAFTS/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

// Index by the leaf filename so callers can look up by relative path stored in state.
const draftsByName = new Map<string, string>();
for (const [path, body] of Object.entries(draftFiles)) {
  const name = path.split('/').pop();
  if (name) draftsByName.set(name, body);
}

/** Look up a draft body by the relative path stored in idea.draft_*_path / refined_*_path. */
export function loadDraft(relativePath: string | null): string | null {
  if (!relativePath) return null;
  const name = relativePath.split('/').pop();
  if (!name) return null;
  return draftsByName.get(name) ?? null;
}
