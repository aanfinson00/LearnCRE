import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import {
  deleteNote,
  getNote,
  liveNotes,
  loadNotes,
  noteId,
  noteKeyFromContext,
  upsertNote,
  type QuestionNote,
} from '../notes';
import type { FeedbackQuestionContext } from '../../hooks/useFeedbackContext';

// jsdom is configured globally but the localStorage global isn't always
// hydrated for these tests; install a minimal Map-backed shim so storage
// tests don't depend on jsdom's window.localStorage timing.
function installLocalStorage() {
  const store = new Map<string, string>();
  const mock = {
    getItem: (k: string) => (store.has(k) ? store.get(k)! : null),
    setItem: (k: string, v: string) => {
      store.set(k, String(v));
    },
    removeItem: (k: string) => {
      store.delete(k);
    },
    clear: () => {
      store.clear();
    },
    key: (i: number) => Array.from(store.keys())[i] ?? null,
    get length() {
      return store.size;
    },
  };
  Object.defineProperty(globalThis, 'localStorage', {
    value: mock,
    configurable: true,
    writable: true,
  });
}

beforeEach(() => {
  installLocalStorage();
});

afterEach(() => {
  localStorage.clear();
});

describe('storage/notes', () => {
  describe('noteId', () => {
    it('joins mode and itemKey with "::"', () => {
      expect(noteId('quiz', 'capCompression')).toBe('quiz::capCompression');
    });
  });

  describe('noteKeyFromContext', () => {
    const ctx = (overrides: Partial<FeedbackQuestionContext>): FeedbackQuestionContext => ({
      mode: 'situational',
      itemId: 'case-1',
      label: 'Test',
      ...overrides,
    });

    it('maps quiz mode to QuestionKind (workaround for session-ephemeral IDs)', () => {
      expect(noteKeyFromContext(ctx({ mode: 'quiz', itemId: 'q_abc_1', kind: 'capCompression' })))
        .toEqual({ mode: 'quiz', itemKey: 'capCompression' });
    });

    it('falls back to "unknown" when quiz mode has no kind', () => {
      expect(noteKeyFromContext(ctx({ mode: 'quiz', itemId: 'q_abc_1' })))
        .toEqual({ mode: 'quiz', itemKey: 'unknown' });
    });

    it('uses ctx.itemId for non-quiz modes', () => {
      expect(noteKeyFromContext(ctx({ mode: 'situational', itemId: 'case-xyz' })))
        .toEqual({ mode: 'situational', itemKey: 'case-xyz' });
      expect(noteKeyFromContext(ctx({ mode: 'walkthrough', itemId: 'def#step-1' })))
        .toEqual({ mode: 'walkthrough', itemKey: 'def#step-1' });
    });
  });

  describe('upsertNote', () => {
    it('inserts a fresh row when none exists', () => {
      const note = upsertNote('quiz', 'capCompression', 'remember bps ÷ cap → ΔV%', 'p1');
      expect(note.mode).toBe('quiz');
      expect(note.itemKey).toBe('capCompression');
      expect(note.body).toBe('remember bps ÷ cap → ΔV%');
      expect(note.deletedAt).toBeNull();
      expect(note.createdAt).toBe(note.updatedAt);
    });

    it('bumps updatedAt on overwrite, preserves createdAt', async () => {
      const first = upsertNote('quiz', 'capCompression', 'v1', 'p1');
      // tiny delay so timestamps differ
      await new Promise((r) => setTimeout(r, 5));
      const second = upsertNote('quiz', 'capCompression', 'v2', 'p1');
      expect(second.createdAt).toBe(first.createdAt);
      expect(second.updatedAt).toBeGreaterThan(first.updatedAt);
      expect(second.body).toBe('v2');
    });

    it('reviving a deleted note clears the tombstone', async () => {
      upsertNote('quiz', 'capCompression', 'v1', 'p1');
      deleteNote('quiz', 'capCompression', 'p1');
      const revived = upsertNote('quiz', 'capCompression', 'v2', 'p1');
      expect(revived.deletedAt).toBeNull();
      expect(revived.body).toBe('v2');
    });

    it('scopes notes by profile id', () => {
      upsertNote('quiz', 'capCompression', 'profile A note', 'pA');
      upsertNote('quiz', 'capCompression', 'profile B note', 'pB');
      expect(getNote('quiz', 'capCompression', 'pA')?.body).toBe('profile A note');
      expect(getNote('quiz', 'capCompression', 'pB')?.body).toBe('profile B note');
    });
  });

  describe('deleteNote', () => {
    it('tombstones the row but keeps it in storage', () => {
      upsertNote('quiz', 'capCompression', 'v1', 'p1');
      deleteNote('quiz', 'capCompression', 'p1');
      const all = loadNotes('p1');
      expect(all).toHaveLength(1);
      expect(all[0].deletedAt).not.toBeNull();
    });

    it('is a no-op when no note exists', () => {
      deleteNote('quiz', 'capCompression', 'p1');
      expect(loadNotes('p1')).toEqual([]);
    });
  });

  describe('liveNotes', () => {
    it('filters out tombstoned notes', () => {
      const now = Date.now();
      const notes: QuestionNote[] = [
        { id: 'a::1', mode: 'a', itemKey: '1', body: 'live', createdAt: now, updatedAt: now, deletedAt: null },
        { id: 'a::2', mode: 'a', itemKey: '2', body: 'dead', createdAt: now, updatedAt: now, deletedAt: now },
      ];
      expect(liveNotes(notes).map((n) => n.itemKey)).toEqual(['1']);
    });
  });
});
