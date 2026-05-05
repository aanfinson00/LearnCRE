import { useEffect, useRef, useState } from 'react';
import { useProfile } from '../hooks/useProfile';

interface Props {
  dropUp?: boolean;
  align?: 'left' | 'right';
}

export function ProfilePicker({ dropUp = false, align = 'right' }: Props = {}) {
  const { active, profiles, switchTo, create, rename, remove } = useProfile();
  const [open, setOpen] = useState(false);
  const [creating, setCreating] = useState(false);
  const [renaming, setRenaming] = useState(false);
  const [draftName, setDraftName] = useState('');
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!wrapRef.current) return;
      if (!wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
        setCreating(false);
        setRenaming(false);
      }
    };
    if (open) document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, [open]);

  const closeAll = () => {
    setOpen(false);
    setCreating(false);
    setRenaming(false);
    setDraftName('');
  };

  const submitCreate = () => {
    const name = draftName.trim();
    if (!name) return;
    create(name);
    closeAll();
  };

  const submitRename = () => {
    const name = draftName.trim();
    if (!name) return;
    rename(active.id, name);
    closeAll();
  };

  const onDelete = () => {
    if (profiles.length <= 1) return;
    if (
      typeof window !== 'undefined' &&
      window.confirm(`Delete profile "${active.name}"? Stats and mistakes for this profile will be wiped.`)
    ) {
      remove(active.id);
      closeAll();
    }
  };

  return (
    <div ref={wrapRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-md border border-warm-line bg-warm-white/70 px-2.5 py-1 text-xs text-warm-ink transition-colors duration-aa ease-aa hover:border-copper hover:text-copper-deep"
        aria-label="Switch profile"
      >
        <span
          className="inline-block h-2 w-2 rounded-full"
          style={{ background: active.avatarColor }}
        />
        <span className="font-medium">{active.name}</span>
        <span className="text-warm-mute">▾</span>
      </button>

      {open && (
        <div
          role="menu"
          className={`absolute z-30 w-72 max-w-[calc(100vw-1.5rem)] rounded-lg border border-warm-line bg-warm-white shadow-aa ${
            align === 'right' ? 'right-0' : 'left-0'
          } ${dropUp ? 'bottom-full mb-2' : 'mt-2'}`}
        >
          <div className="border-b border-warm-line px-3 py-2 text-[10px] font-medium uppercase tracking-widest text-warm-mute">
            Profiles
          </div>
          <ul className="max-h-64 overflow-y-auto">
            {profiles.map((p) => (
              <li key={p.id}>
                <button
                  type="button"
                  onClick={() => {
                    switchTo(p.id);
                    closeAll();
                  }}
                  className={`flex w-full items-center gap-2 px-3 py-2 text-left text-sm transition-colors duration-aa-fast ease-aa hover:bg-warm-paper/60 ${
                    p.id === active.id ? 'bg-copper/10 text-copper-deep' : 'text-warm-ink'
                  }`}
                >
                  <span
                    className="inline-block h-2 w-2 rounded-full"
                    style={{ background: p.avatarColor }}
                  />
                  <span className="flex-1 font-medium">{p.name}</span>
                  {p.id === active.id && (
                    <span className="text-[10px] text-copper-deep">current</span>
                  )}
                </button>
              </li>
            ))}
          </ul>

          <div className="border-t border-warm-line p-2 space-y-1">
            {creating ? (
              <div className="space-y-1">
                <input
                  autoFocus
                  type="text"
                  value={draftName}
                  onChange={(e) => setDraftName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') submitCreate();
                    if (e.key === 'Escape') closeAll();
                  }}
                  placeholder="New profile name"
                  className="w-full rounded-md border border-warm-line bg-warm-white px-2 py-1 font-mono text-sm outline-none focus:border-copper"
                />
                <div className="flex justify-end gap-1">
                  <button
                    type="button"
                    onClick={closeAll}
                    className="rounded px-2 py-1 text-xs text-warm-mute hover:text-warm-black"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={submitCreate}
                    disabled={!draftName.trim()}
                    className="rounded bg-warm-black px-2 py-1 text-xs font-medium text-warm-white disabled:bg-warm-mute"
                  >
                    Create
                  </button>
                </div>
              </div>
            ) : renaming ? (
              <div className="space-y-1">
                <input
                  autoFocus
                  type="text"
                  value={draftName}
                  onChange={(e) => setDraftName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') submitRename();
                    if (e.key === 'Escape') closeAll();
                  }}
                  placeholder={active.name}
                  className="w-full rounded-md border border-warm-line bg-warm-white px-2 py-1 font-mono text-sm outline-none focus:border-copper"
                />
                <div className="flex justify-end gap-1">
                  <button
                    type="button"
                    onClick={closeAll}
                    className="rounded px-2 py-1 text-xs text-warm-mute hover:text-warm-black"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={submitRename}
                    disabled={!draftName.trim()}
                    className="rounded bg-warm-black px-2 py-1 text-xs font-medium text-warm-white disabled:bg-warm-mute"
                  >
                    Save
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-1 text-xs">
                <button
                  type="button"
                  onClick={() => {
                    setDraftName('');
                    setCreating(true);
                  }}
                  className="rounded px-2 py-1 text-warm-ink hover:bg-warm-paper/60"
                >
                  + New
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setDraftName(active.name);
                    setRenaming(true);
                  }}
                  className="rounded px-2 py-1 text-warm-ink hover:bg-warm-paper/60"
                >
                  Rename
                </button>
                <button
                  type="button"
                  onClick={onDelete}
                  disabled={profiles.length <= 1}
                  className="rounded px-2 py-1 text-signal-bad-ink hover:bg-signal-bad/10 disabled:cursor-not-allowed disabled:text-warm-mute disabled:hover:bg-transparent"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
