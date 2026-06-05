import type { FeedbackQuestionContext } from '../hooks/useFeedbackContext';
import { profileKey } from './profiles';

const KEY_SUFFIX = 'notes.v1';

export interface QuestionNote {
  /** "{mode}::{itemKey}" — the canonical local key. */
  id: string;
  /** Mode bucket: 'quiz' | 'situational' | 'longform' | 'walkthrough' | 'excel' | 'mockInterview' | 'speedDrill'. */
  mode: string;
  /** Stable identifier within the mode. For quiz, this is the QuestionKind (Question.id is session-ephemeral). */
  itemKey: string;
  /** Free-text body. Empty string is a valid live state (e.g. user cleared then saved). */
  body: string;
  createdAt: number;
  updatedAt: number;
  /** Soft-delete tombstone (ms). null = live; non-null = deleted at that time. */
  deletedAt: number | null;
}

export function noteId(mode: string, itemKey: string): string {
  return `${mode}::${itemKey}`;
}

/**
 * Quiz Question.id values come from nextId() (Date.now() + counter) and don't
 * survive across sessions — so notes on quiz items are keyed by QuestionKind
 * ("my notes on cap compression questions"). Every other mode already has
 * stable, content-meaningful IDs.
 */
export function noteKeyFromContext(
  ctx: FeedbackQuestionContext,
): { mode: string; itemKey: string } {
  if (ctx.mode === 'quiz') return { mode: 'quiz', itemKey: ctx.kind ?? 'unknown' };
  return { mode: ctx.mode, itemKey: ctx.itemId };
}

export function loadNotes(profileId?: string): QuestionNote[] {
  try {
    const raw = localStorage.getItem(profileKey(KEY_SUFFIX, profileId));
    if (!raw) return [];
    const parsed = JSON.parse(raw) as QuestionNote[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveNotes(notes: QuestionNote[], profileId?: string): void {
  try {
    localStorage.setItem(profileKey(KEY_SUFFIX, profileId), JSON.stringify(notes));
  } catch {
    /* ignore */
  }
}

export function getNote(
  mode: string,
  itemKey: string,
  profileId?: string,
): QuestionNote | null {
  const id = noteId(mode, itemKey);
  return loadNotes(profileId).find((n) => n.id === id) ?? null;
}

export function upsertNote(
  mode: string,
  itemKey: string,
  body: string,
  profileId?: string,
): QuestionNote {
  const all = loadNotes(profileId);
  const id = noteId(mode, itemKey);
  const now = Date.now();
  const existing = all.find((n) => n.id === id);
  const next: QuestionNote = existing
    ? { ...existing, body, updatedAt: now, deletedAt: null }
    : { id, mode, itemKey, body, createdAt: now, updatedAt: now, deletedAt: null };
  const others = all.filter((n) => n.id !== id);
  saveNotes([...others, next], profileId);
  return next;
}

export function deleteNote(mode: string, itemKey: string, profileId?: string): void {
  const all = loadNotes(profileId);
  const id = noteId(mode, itemKey);
  const existing = all.find((n) => n.id === id);
  if (!existing) return;
  const now = Date.now();
  const tombstoned: QuestionNote = { ...existing, updatedAt: now, deletedAt: now };
  const others = all.filter((n) => n.id !== id);
  saveNotes([...others, tombstoned], profileId);
}

export function liveNotes(notes: QuestionNote[]): QuestionNote[] {
  return notes.filter((n) => n.deletedAt === null);
}
