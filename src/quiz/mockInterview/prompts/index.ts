import type { MockProsePrompt } from '../../../types/mockInterview';
import { FIT_PROMPTS } from './fitPrompts';
import { BEHAVIORAL_PROMPTS } from './behavioralPrompts';
import { MARKET_VIEW_PROMPTS } from './marketViewPrompts';

/** Combined prose-prompt registry across all 3 prose kinds. */
export const PROSE_PROMPTS: MockProsePrompt[] = [
  ...FIT_PROMPTS,
  ...BEHAVIORAL_PROMPTS,
  ...MARKET_VIEW_PROMPTS,
];

export function prosePromptById(id: string): MockProsePrompt | undefined {
  return PROSE_PROMPTS.find((p) => p.id === id);
}

export { FIT_PROMPTS, BEHAVIORAL_PROMPTS, MARKET_VIEW_PROMPTS };
