import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

/**
 * Per-question context that play-screens push into so the feedback button
 * knows *which question* the user is reacting to. Cleared automatically
 * when no item is active (e.g. setup screens).
 */
export interface FeedbackQuestionContext {
  /** App mode: 'quiz' | 'situational' | 'walkthrough' | 'excel' | 'speedDrill' */
  mode: string;
  /** Stable identifier within the mode. Quiz = question id, situational =
   *  case id, walkthrough = `${defId}#${stepId}`, excel = template id. */
  itemId: string;
  /** Human-readable kind / category for grouping (e.g. quiz QuestionKind). */
  kind?: string;
  /** Title or short label shown as the entry's headline in the feedback log. */
  label: string;
  /** Longer prompt / scenario text. Truncated when exported. */
  prompt?: string;
  /** Optional expected value display, useful for "the answer is wrong" reports. */
  expectedDisplay?: string;
  /** Difficulty tag at generation time (when applicable). */
  difficulty?: string;
}

interface FeedbackContextValue {
  current: FeedbackQuestionContext | null;
  setCurrent: (ctx: FeedbackQuestionContext | null) => void;
}

const FeedbackCtx = createContext<FeedbackContextValue | null>(null);

export function FeedbackContextProvider({ children }: { children: ReactNode }) {
  const [current, setCurrentState] = useState<FeedbackQuestionContext | null>(null);
  const setCurrent = useCallback(
    (ctx: FeedbackQuestionContext | null) => setCurrentState(ctx),
    [],
  );
  const value = useMemo(() => ({ current, setCurrent }), [current, setCurrent]);
  return <FeedbackCtx.Provider value={value}>{children}</FeedbackCtx.Provider>;
}

export function useFeedbackContext(): FeedbackContextValue {
  const ctx = useContext(FeedbackCtx);
  if (!ctx) {
    throw new Error(
      'useFeedbackContext must be used inside <FeedbackContextProvider>',
    );
  }
  return ctx;
}

/**
 * Helper for play screens: registers a context entry on mount and clears
 * on unmount or when the item changes. Pass `null` to skip registration
 * (e.g. on setup screens where there's no active item).
 */
export function useRegisterFeedbackContext(
  ctx: FeedbackQuestionContext | null,
): void {
  const { setCurrent } = useFeedbackContext();
  // Stable JSON key so the effect only fires when content actually changes
  const key = ctx ? `${ctx.mode}::${ctx.itemId}::${ctx.label}` : '';
  useEffect(() => {
    setCurrent(ctx);
    return () => setCurrent(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);
}
