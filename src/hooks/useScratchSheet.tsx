import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { evaluateScratch, type ScratchEvalResult } from '../excel/scratch';

const ROWS = 5;
const COLS = 3; // A B C

interface ScratchContextValue {
  open: boolean;
  rows: number;
  cols: number;
  cells: Record<string, string>;
  evalResult: ScratchEvalResult;
  setOpen: (v: boolean) => void;
  toggle: () => void;
  setCell: (address: string, raw: string) => void;
  clear: () => void;
}

const ScratchContext = createContext<ScratchContextValue | null>(null);

export function ScratchSheetProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [cells, setCells] = useState<Record<string, string>>({});

  const setCell = useCallback((address: string, raw: string) => {
    setCells((s) => ({ ...s, [address]: raw }));
  }, []);

  const clear = useCallback(() => setCells({}), []);

  const toggle = useCallback(() => setOpen((v) => !v), []);

  // Global S keyboard shortcut. Skip when focus is in any input/textarea/contenteditable.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.repeat) return;
      const t = e.target as HTMLElement | null;
      if (!t) return;
      const tag = t.tagName;
      const editable =
        tag === 'INPUT' ||
        tag === 'TEXTAREA' ||
        (t as HTMLElement).isContentEditable;
      if (editable) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      // Backtick toggles the scratch sheet from anywhere. Chosen because no
      // other screen binds it (S is "skip" in Quiz / Situational / Walkthrough /
      // Speed Drill / Excel — can't reuse it without breaking muscle memory).
      if (e.key === '`') {
        e.preventDefault();
        setOpen((v) => !v);
      } else if (e.key === 'Escape' && open) {
        e.preventDefault();
        setOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const evalResult = useMemo(() => evaluateScratch(cells), [cells]);

  const value: ScratchContextValue = {
    open,
    rows: ROWS,
    cols: COLS,
    cells,
    evalResult,
    setOpen,
    toggle,
    setCell,
    clear,
  };

  return <ScratchContext.Provider value={value}>{children}</ScratchContext.Provider>;
}

export function useScratchSheet(): ScratchContextValue {
  const ctx = useContext(ScratchContext);
  if (!ctx) {
    throw new Error('useScratchSheet must be used inside <ScratchSheetProvider>');
  }
  return ctx;
}
