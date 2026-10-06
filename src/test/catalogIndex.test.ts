import {
  MODELING_TEST_IDS,
  SITUATIONAL_CATEGORY_BY_ID,
  WALKTHROUGH_IDS,
} from '../content/catalogIndex';
import { SITUATIONAL_CASES } from '../quiz/situational';
import { walkthroughs } from '../quiz/walkthroughs';
import { MODELING_TEST_TEMPLATES } from '../excel/modelingTest/templates';

describe('catalog index (src/content/catalogIndex.ts)', () => {
  it('maps every situational case to its category', () => {
    expect(SITUATIONAL_CATEGORY_BY_ID).toEqual(
      Object.fromEntries(SITUATIONAL_CASES.map((c) => [c.id, c.category])),
    );
  });

  it('lists every walkthrough and modeling test id', () => {
    expect([...WALKTHROUGH_IDS]).toEqual(walkthroughs.map((w) => w.id));
    expect([...MODELING_TEST_IDS]).toEqual(MODELING_TEST_TEMPLATES.map((t) => t.id));
  });
});
