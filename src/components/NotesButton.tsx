import { useEffect, useRef, useState } from 'react';
import { useAuth } from '../cloud/auth';
import { pushAll } from '../cloud/sync';
import { useFeedbackContext } from '../hooks/useFeedbackContext';
import {
  deleteNote,
  getNote,
  noteKeyFromContext,
  upsertNote,
  type QuestionNote,
} from '../storage/notes';

export function NotesButton() {
  const { current } = useFeedbackContext();
  const { user, cloudEnabled } = useAuth();
  const [open, setOpen] = useState(false);
  const [body, setBody] = useState('');
  const [existing, setExisting] = useState<QuestionNote | null>(null);
  const [saved, setSaved] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const key = current ? noteKeyFromContext(current) : null;
  const disabled = key === null;

  // Refresh the editor when the modal opens or the active question changes.
  useEffect(() => {
    if (!open || !key) return;
    const found = getNote(key.mode, key.itemKey);
    setExisting(found);
    setBody(found?.body ?? '');
    requestAnimationFrame(() => textareaRef.current?.focus());
  }, [open, key?.mode, key?.itemKey]);

  // Esc closes.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        setOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  // Surface a badge dot when a non-empty live note exists for the active item.
  // Re-evaluated when the active question changes or after we save/delete.
  const [hasLiveNote, setHasLiveNote] = useState(false);
  useEffect(() => {
    if (!key) {
      setHasLiveNote(false);
      return;
    }
    const found = getNote(key.mode, key.itemKey);
    setHasLiveNote(found !== null && found.deletedAt === null && found.body.trim() !== '');
  }, [key?.mode, key?.itemKey, open, saved]);

  const triggerCloudPush = () => {
    if (!user || !cloudEnabled) return;
    void pushAll(user.id);
  };

  const handleSave = () => {
    if (!key) return;
    upsertNote(key.mode, key.itemKey, body);
    setSaved(true);
    setTimeout(() => setSaved(false), 1200);
    triggerCloudPush();
  };

  const handleDelete = () => {
    if (!key || !existing) return;
    deleteNote(key.mode, key.itemKey);
    setBody('');
    setExisting(null);
    triggerCloudPush();
    setOpen(false);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => !disabled && setOpen(!open)}
        disabled={disabled}
        aria-label={disabled ? 'Notes (open a question first)' : open ? 'Close notes' : 'Open notes'}
        title={
          disabled
            ? 'Open a question to take notes'
            : open
              ? 'Close notes'
              : hasLiveNote
                ? 'View / edit note for this question'
                : 'Take a note on this question'
        }
        className={`fixed bottom-28 right-4 z-40 flex h-11 w-11 items-center justify-center rounded-full border shadow-aa transition-all duration-aa ease-aa ${
          disabled
            ? 'cursor-not-allowed border-warm-line bg-warm-paper/60 text-warm-mute opacity-60'
            : open
              ? 'border-copper bg-copper text-warm-white'
              : 'border-warm-line bg-warm-white text-warm-stone hover:border-copper hover:text-copper-deep'
        }`}
      >
        <span className="text-base leading-none">📓</span>
        {hasLiveNote && !open && !disabled && (
          <span
            aria-hidden
            className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-warm-white bg-copper"
          />
        )}
      </button>

      {open && current && key && (
        <>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close notes"
            className="fixed inset-0 z-30 bg-warm-black/30 backdrop-blur-sm"
          />

          <div
            role="dialog"
            aria-label="Question notes"
            className="fixed left-1/2 top-1/2 z-30 flex max-h-[90vh] w-full max-w-xl -translate-x-1/2 -translate-y-1/2 flex-col rounded-xl border border-warm-line bg-warm-white shadow-aa"
          >
            <header className="flex items-baseline justify-between border-b border-warm-line px-5 py-3">
              <div>
                <div className="display text-lg text-warm-black">
                  Notes<span className="text-copper">.</span>
                </div>
                <p className="font-mono text-[10px] uppercase tracking-widest text-warm-mute num">
                  Private notes synced to your account
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-md border border-warm-line bg-warm-white px-2 py-0.5 text-xs text-warm-stone hover:border-warm-black hover:text-warm-black"
              >
                ✕
              </button>
            </header>

            <div className="flex-1 space-y-4 overflow-y-auto p-5">
              <div className="rounded-md border border-copper/40 bg-copper/5 p-2 text-[11px] text-warm-ink">
                <div className="font-mono uppercase tracking-widest text-copper-deep num text-[9px]">
                  Auto-attached question
                </div>
                <div className="mt-1 font-medium text-warm-black">{current.label}</div>
                <div className="mt-0.5 font-mono text-[10px] text-warm-mute num">
                  {key.mode} · <code>{key.itemKey}</code>
                  {current.difficulty ? ` · ${current.difficulty}` : ''}
                </div>
                {current.mode === 'quiz' && (
                  <div className="mt-1 font-mono text-[9px] uppercase tracking-widest text-warm-mute num">
                    Note is shared across all questions of this type
                  </div>
                )}
              </div>

              <div className="space-y-1">
                <label
                  htmlFor="notes-body"
                  className="text-xs font-medium uppercase tracking-widest text-warm-stone"
                >
                  Your note
                </label>
                <textarea
                  ref={textareaRef}
                  id="notes-body"
                  rows={10}
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  placeholder="What clicked? What tripped you up? Mnemonics, formulas, gotchas."
                  className="w-full resize-y rounded-md border border-warm-line bg-warm-white px-2.5 py-1.5 font-mono text-sm text-warm-black outline-none focus:border-copper"
                />
              </div>
            </div>

            <footer className="flex items-center justify-between gap-2 border-t border-warm-line px-5 py-3">
              <button
                type="button"
                onClick={handleDelete}
                disabled={!existing || existing.deletedAt !== null}
                className="rounded-md border border-warm-line bg-warm-white px-3 py-1.5 text-xs text-warm-stone transition-colors duration-aa ease-aa hover:border-signal-bad hover:text-signal-bad-ink disabled:cursor-not-allowed disabled:opacity-50"
              >
                Delete
              </button>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-md border border-warm-line bg-warm-white px-3 py-1.5 text-xs text-warm-stone transition-colors duration-aa ease-aa hover:border-warm-black hover:text-warm-black"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  className="rounded-md bg-warm-black px-3 py-1.5 text-xs font-medium text-warm-white transition-colors duration-aa ease-aa hover:bg-warm-ink"
                >
                  {saved ? '✓ Saved' : 'Save'}
                </button>
              </div>
            </footer>
          </div>
        </>
      )}
    </>
  );
}
