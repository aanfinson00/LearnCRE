import { CONTENT_STATS } from '../content/stats';
import { allKinds } from '../quiz/templates';
import { SITUATIONAL_CASES } from '../quiz/situational';
import { VOCAB_TERMS } from '../quiz/vocab';
import { MOCK_ARCHETYPES } from '../quiz/mockInterview';
import { EXCEL_TEMPLATES } from '../excel/templates';

describe('landing-page catalog counts', () => {
  it('match the real content (update src/content/stats.ts when adding content)', () => {
    expect(CONTENT_STATS).toEqual({
      questionKinds: allKinds.length,
      situationalCases: SITUATIONAL_CASES.length,
      vocabTerms: VOCAB_TERMS.length,
      excelDrills: EXCEL_TEMPLATES.length,
      mockArchetypes: MOCK_ARCHETYPES.length,
    });
  });
});
