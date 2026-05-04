# Agent operating spec — content generation from feedback

This doc is the contract for any LLM session that picks up a "generate more
content" or "iterate on existing questions" task. The goal: a future-you (or a
future-me, or any LLM with file access) can sit down, read this, ingest a
compiled feedback log, and produce well-formed PRs that match every existing
pattern without further design discussion.

The operating mode is **iterative apprentice training**: the user works through
questions, logs feedback through the in-app feedback button, exports the
compiled markdown, and pastes it to the agent. The agent reads it, identifies
patterns, generates new content + edits to existing content, and ships a PR.

---

## Inputs the agent should expect

1. **Compiled feedback markdown** — produced by `Copy compiled markdown` in
   the in-app FeedbackButton's Log tab. Format documented in
   `src/storage/feedbackLog.ts → exportAsMarkdown()`. Includes per-entry
   question id, mode, type, prompt snippet, user feedback.

2. **Optional topic prompt** — e.g. "more cases on construction-loan draw
   mechanics" or "add a quiz template for waterfall pref math".

3. **Implicit input — the existing repo at `/home/user/LearnCRE/`**. Read the
   relevant files first; do not invent patterns that don't exist.

---

## What "well-formed content" means in this repo

Every shipped piece of content must:

1. **Match the existing type interface** in `src/types/`. New situational
   cases use `SituationalCase` from `src/types/situational.ts`; new quiz
   templates use `QuestionTemplate` from `src/types/question.ts`; new
   walkthroughs use `WalkthroughDef` from `src/types/walkthrough.ts`; new
   Excel templates use `ExcelTemplate` from `src/excel/types.ts`.

2. **Carry a `roles?: Role[]` tag** matching the position-focus filter. Pick
   from `acquisitions / assetManagement / mortgageUw / portfolioMgmt /
   development`. Multi-tag is fine. Use `src/quiz/situational/index.ts` and
   peers as the authority for canonical role IDs.

3. **Live in the right directory** —
   `src/quiz/situational/<id>.ts` for situational cases,
   `src/quiz/templates/<id>.ts` for quiz templates,
   `src/excel/templates/<id>.ts` for Excel templates,
   walkthroughs go inline in `src/quiz/walkthroughs.ts` as a factory
   function that returns a `WalkthroughDef`.

4. **Be registered in the corresponding `index.ts`** — both the import and
   the array push. Forgetting to register is the #1 mistake.

5. **For situational cases specifically:**
   - Exactly **one option** with `isBest: true`; the others are plausibly
     wrong and each gets a written explanation of *why* it's less defensible
   - 3–4 options total
   - `takeaway` is 1–2 sentences distilling the principle
   - `tips` array has 3 short, declarative rules-of-thumb
   - `scenario` is 2–4 sentences setting up the problem
   - `data` array is a sidebar fact grid (5–7 rows is typical)
   - Option order at run-time is shuffled by `pickCases` — do **not** assume
     the user sees option A first

6. **For quiz templates specifically:**
   - `kind: '...'` exactly matches a value in `QuestionKind` union (extend
     the union in `src/types/question.ts` if adding a new kind)
   - `generate(rng, difficulty, assetClass)` returns a `Question` with a
     deterministic `expected` value computable from the picked params
   - Use `pickBand(rng, bands.X, difficulty)` for numeric variety, NOT
     small `pickFromSet([…])` lists (those produce repetitive sessions —
     see the variety test in `src/quiz/__tests__/variety.test.ts`)
   - Tolerance on the answer band: `{ type: 'pct', band: 0.05 }` is a sensible
     default; tighten for clean integer answers, loosen for IRR

7. **For Excel templates specifically:**
   - `expected` MUST equal `evaluateFormula(exampleFormula, sheetFromLayout(layout))`
     — if not, the template-test will fail
   - Cell labels in column A; values in column B (and C if needed); the
     target cell role is `'target'`, assumption cells are `'assumption'`,
     header / spacer roles fill the rest
   - The example formula is what the user sees on submit; pick the
     idiomatic Excel form (e.g. `=PMT(rate/12, nper, -pv)` with the
     conventional negative pv)

---

## Workflow when given a feedback compile

Step-by-step:

1. **Read the feedback compile.** Note: types (bug/wording/idea/other),
   item ids referenced, and any patterns ("multiple users mentioned the
   solution prose is too dense in DSCR cases").

2. **Group entries** into actionable buckets:
   - **Bugs** — math wrong, expected mismatched, parser fails. Highest
     priority. Open the referenced file via the item id; verify the math
     by re-running the formula or hand-checking; fix.
   - **Wording** — unclear scenarios, ambiguous options, takeaways that
     don't land. Edit the prose; keep the structural shape.
   - **Ideas** — net-new content. Use these to prioritize new questions.
   - **Other** — read each and decide.

3. **For each bug:** find the file (search by id with
   `grep -rn "id: 'the-id'" src/`), read the math, fix the line that's
   wrong, run `npx vitest run src/quiz/__tests__/templates.test.ts` (for
   templates) or build the project (for situational).

4. **For each wording fix:** edit the relevant line. Run the build to
   ensure no syntax broken.

5. **For each new-content idea:** scan for the closest existing pattern,
   copy a representative case, and rewrite the body. DON'T invent a new
   shape; match what's there. Register in the index. Add a role tag.

6. **Run the local test suite** before declaring done:
   ```bash
   npm run build && npx vitest run
   ```
   Test count should match expected (currently 312+; check the latest
   commit for the exact number). All tests must pass.

7. **Commit + push** following the repo's commit style:
   - First line: short subject (≤72 chars)
   - Blank line, then a body explaining the *why* and listing the changes
   - Footer: `https://claude.ai/code/session_<id>`

---

## Topic ideas the user has expressed interest in

From recent conversation, the user wants more content on the **deal lifecycle
from cradle to grave** — operational, back-office, post-close work that's
distinct from the underwriting/valuation focus the bank initially targeted.

Already covered in `category: 'deal-process'`:
- capital-call-mechanics
- closing-prorations
- construction-cost-overrun
- lender-draw-mechanics
- bank-account-structure
- balance-sheet-refi-impact
- budget-vs-actual-variance
- distribution-waterfall-1tier

GAPs surfaced from `docs/interview-questions.md` (still open for content):
- capexReserveSizing quiz template (asset mgmt)
- refiStressTest quiz template (mortgage UW)
- feeDragOnIrr quiz template (portfolio mgmt)
- constructionLoanSizing quiz template (development)
- walk-distressed-1 walkthrough (cross-cutting)

Adjacent deal-lifecycle topics not yet covered (good candidates for next
batch):
- Closing checklist + due-diligence sequence (acquisitions process)
- Insurance program — master policy, builder's risk, GL, umbrella
- Loan covenant testing cadence (monthly DSCR / debt-yield certification)
- Year-end audit + K-1 timeline
- Property tax appeal process and economics
- Lease abstract + critical-date tracking
- Capex draw approval (funder, contractor, owner sign-off chain)
- Sponsor-LP communications cadence (monthly distrib, quarterly report,
  annual meeting)
- Asset reposition sequence — vacate, renovate, re-lease
- Reserve study — what one is and how it informs reserves

---

## What to NOT do

- **Don't invent new file structures.** If situational cases live in
  `src/quiz/situational/<id>.ts`, new ones go there too. No "lib" or "data"
  alternative directories.
- **Don't invent new types.** Extend the existing union, add an optional
  field, or re-use what's there. New top-level interfaces require explicit
  approval.
- **Don't ship without registering** in the `index.ts` of the relevant
  collection. Unregistered files are dead code and won't show up in the UI.
- **Don't skip tests.** A broken `vitest run` or `tsc` failure means a
  broken deploy.
- **Don't paraphrase legal / compliance content.** When uncertain about
  jurisdiction-specific facts (state-law security-deposit rules, recapture
  rates, 1031 mechanics), say "varies by jurisdiction" rather than
  inventing specifics. The user's audience may be in any US state.
- **Don't push to main directly.** The user's workflow is push-to-feature-
  branch then PR-merge to main when ready.

---

## Future: autonomous deployment

The aspiration the user expressed is an agent that can **deploy and run
overnight, ingesting feedback continuously and shipping content updates
without each task being manually initiated**. That's a real architecture, not
implemented today but documented here so a future iteration can pick it up:

### Components

1. **A trigger mechanism** — GitHub Actions on a schedule (e.g.
   nightly cron), or webhook from the feedback-export action.
2. **A storage location for feedback** — currently localStorage only. To go
   autonomous, the user needs a way to push feedback to the repo (or to a
   shared store) without manual paste. Options:
   - Manual export → commit to `data/feedback/<date>.md` (simplest)
   - In-app "Send to GitHub" button that opens a PR with the export
   - Cloud sync (the deferred PR L–U Supabase track)
3. **An LLM caller** — Anthropic Claude API or similar; a Python or JS
   script in `scripts/agent/` that:
   - Reads the latest feedback file
   - Reads the relevant repo files (this doc, `src/types/`, an example
     case file)
   - Generates new content per the spec above
   - Writes the new file(s) + updates the index
   - Runs `npm run build` and `npx vitest run` to validate
   - Opens a PR with the changes for human review
4. **Credentials** — `ANTHROPIC_API_KEY` (or whichever provider) stored as
   a GitHub Actions secret, never committed.
5. **Guardrails** — agent always opens a PR for human review (never pushes
   to main directly); agent rejects malformed feedback; agent self-limits
   to N new files per run to prevent runaway commits.

### Initial implementation scope

A minimum viable autonomous agent:
- `scripts/agent/run.py` — script that reads `data/feedback/latest.md` +
  this doc + chosen scope (e.g. "generate 3 new situational cases on topic
  X"), calls the API, writes new files, opens a PR via `gh` CLI
- `.github/workflows/agent.yml` — nightly cron that calls
  `python scripts/agent/run.py` if a feedback file is present
- A safety review: every PR opened by the agent has the `auto-generated`
  label so the maintainer can spot it instantly

This is deferred — get content + feedback compile working manually first,
prove the loop produces useful PRs, then automate.

---

## Quick reference: where things live

```
src/types/situational.ts            SituationalCase interface, categories
src/types/question.ts               QuestionTemplate, QuestionKind union
src/types/walkthrough.ts            WalkthroughDef interface
src/types/role.ts                   Role union, ROLES list, matchesRole()
src/excel/types.ts                  ExcelTemplate interface

src/quiz/situational/<id>.ts        One situational case per file
src/quiz/situational/index.ts       Registers all cases + filterCases()
src/quiz/templates/<kind>.ts        One quiz template per kind
src/quiz/templates/index.ts         Registers all templates + allKinds[]
src/quiz/walkthroughs.ts            All walkthrough factories inline
src/excel/templates/<id>.ts         One Excel template per file
src/excel/templates/index.ts        Registers all + filterTemplates() + sheetFromLayout()

src/quiz/bands.ts                   Numeric band definitions for pickBand()
src/quiz/random.ts                  RNG implementation; createRng()

src/quiz/__tests__/variety.test.ts  Regression guard for sample-space size
src/quiz/__tests__/templates.test.ts  Validates 1000 seeded questions per kind
src/excel/__tests__/templates.test.ts  Validates exampleFormula → expected

src/storage/feedbackLog.ts          Local feedback log; exportAsMarkdown()
src/hooks/useFeedbackContext.tsx    Per-question context provider

docs/interview-questions.md         52 curated CRE interview questions
docs/role-skill-evidence.md         (auto-generated) skill-frequency report
docs/agent-instructions.md          THIS FILE
```
