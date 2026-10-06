/**
 * Catalog counts shown on the landing page. Kept as constants so the landing
 * chunk doesn't have to download every content library just to count it;
 * `src/test/contentStats.test.ts` fails if these drift from the real catalog.
 */
export const CONTENT_STATS = {
  questionKinds: 68,
  situationalCases: 71,
  vocabTerms: 98,
  excelDrills: 13,
  mockArchetypes: 5,
} as const;
