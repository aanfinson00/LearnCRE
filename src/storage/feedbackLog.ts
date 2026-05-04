/**
 * Per-profile feedback log. The user logs feedback as they work through
 * questions; entries accumulate locally; an export-as-markdown action
 * compiles everything into a single document the user can paste into a
 * conversation with the maintainer for content iteration.
 */

import type { FeedbackQuestionContext } from '../hooks/useFeedbackContext';
import { profileKey } from './profiles';

const KEY_SUFFIX = 'feedback.v1';

export type FeedbackEntryType = 'bug' | 'wording' | 'idea' | 'other';

export interface FeedbackEntry {
  /** Stable id, used for delete-by-id. */
  id: string;
  /** Wall-clock timestamp at save. */
  createdAt: number;
  /** User-selected feedback type. */
  type: FeedbackEntryType;
  /** Free-text "where" — auto-prefilled from page title or question label. */
  where: string;
  /** Free-text body. */
  description: string;
  /** Snapshot of the current question context (if any). Captured at save. */
  question: FeedbackQuestionContext | null;
  /** Page URL at save time, useful for layout/UI bugs. */
  url?: string;
}

function uuid(): string {
  return `fb_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;
}

export function loadFeedback(profileId?: string): FeedbackEntry[] {
  try {
    const raw = localStorage.getItem(profileKey(KEY_SUFFIX, profileId));
    if (!raw) return [];
    const parsed = JSON.parse(raw) as FeedbackEntry[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveFeedback(entries: FeedbackEntry[], profileId?: string): void {
  try {
    localStorage.setItem(profileKey(KEY_SUFFIX, profileId), JSON.stringify(entries));
  } catch {
    /* ignore quota / privacy-mode failures */
  }
}

export function appendFeedback(
  entry: Omit<FeedbackEntry, 'id' | 'createdAt'>,
  profileId?: string,
): FeedbackEntry {
  const full: FeedbackEntry = {
    ...entry,
    id: uuid(),
    createdAt: Date.now(),
  };
  const all = loadFeedback(profileId);
  all.push(full);
  saveFeedback(all, profileId);
  return full;
}

export function removeFeedback(id: string, profileId?: string): void {
  const all = loadFeedback(profileId).filter((e) => e.id !== id);
  saveFeedback(all, profileId);
}

export function clearFeedback(profileId?: string): void {
  saveFeedback([], profileId);
}

/**
 * Compile every logged entry into a single markdown document the user can
 * paste into a chat with the maintainer for iterative content review.
 *
 * Format is structured so an LLM can ingest it cleanly:
 *   - top-level summary stats
 *   - one section per entry with the question id + scenario + user feedback
 *   - chronological order so the reader sees the user's session arc
 */
export function exportAsMarkdown(entries: FeedbackEntry[]): string {
  if (entries.length === 0) {
    return '# LearnCRE feedback log\n\n_(no entries)_\n';
  }

  const sorted = [...entries].sort((a, b) => a.createdAt - b.createdAt);
  const total = sorted.length;
  const byType = sorted.reduce<Record<FeedbackEntryType, number>>(
    (acc, e) => {
      acc[e.type] = (acc[e.type] ?? 0) + 1;
      return acc;
    },
    { bug: 0, wording: 0, idea: 0, other: 0 },
  );
  const byMode = sorted.reduce<Record<string, number>>((acc, e) => {
    const m = e.question?.mode ?? '_no-context';
    acc[m] = (acc[m] ?? 0) + 1;
    return acc;
  }, {});

  const lines: string[] = [];
  lines.push('# LearnCRE feedback log');
  lines.push('');
  lines.push(`_Generated ${new Date().toISOString()} · ${total} entries_`);
  lines.push('');
  lines.push('## Summary');
  lines.push('');
  lines.push(
    [
      `${byType.bug}× bug`,
      `${byType.wording}× wording`,
      `${byType.idea}× idea`,
      `${byType.other}× other`,
    ].join(' · '),
  );
  lines.push('');
  lines.push(
    'Modes: ' +
      Object.entries(byMode)
        .sort((a, b) => b[1] - a[1])
        .map(([m, n]) => `${n}× ${m}`)
        .join(' · '),
  );
  lines.push('');
  lines.push('---');
  lines.push('');

  sorted.forEach((e, i) => {
    const num = i + 1;
    const ts = new Date(e.createdAt).toISOString();
    const headline = e.question
      ? `${e.question.mode} / ${e.question.itemId}`
      : '(no active question)';
    lines.push(`## Entry ${num} — ${headline}`);
    lines.push('');
    lines.push(`**Type:** ${e.type}`);
    lines.push(`**Where:** ${e.where || '_(unspecified)_'}`);
    lines.push(`**At:** ${ts}`);
    if (e.question) {
      lines.push(`**Item id:** \`${e.question.itemId}\``);
      if (e.question.kind) lines.push(`**Kind:** ${e.question.kind}`);
      if (e.question.difficulty)
        lines.push(`**Difficulty:** ${e.question.difficulty}`);
      lines.push(`**Headline:** ${e.question.label}`);
      if (e.question.prompt) {
        lines.push('');
        lines.push('**Prompt / scenario (truncated):**');
        lines.push('');
        lines.push('> ' + e.question.prompt.slice(0, 600).replace(/\n+/g, ' '));
        if (e.question.prompt.length > 600) lines.push('> _(truncated)_');
      }
      if (e.question.expectedDisplay) {
        lines.push('');
        lines.push(`**Expected:** \`${e.question.expectedDisplay}\``);
      }
    }
    if (e.url) {
      lines.push('');
      lines.push(`**URL:** ${e.url}`);
    }
    lines.push('');
    lines.push('**Feedback:**');
    lines.push('');
    lines.push('> ' + (e.description || '_(empty)_').replace(/\n/g, '\n> '));
    lines.push('');
    lines.push('---');
    lines.push('');
  });

  return lines.join('\n');
}
