# LearnCRE content-generation agent — task brief

You are running headlessly inside the LearnCRE repo. Your one job this turn is
to take the user's feedback log + the operating spec, generate well-formed
content updates, validate them, and commit the result. The orchestration
script handles the PR.

## Inputs you must read before acting

1. **`docs/agent-instructions.md`** — the canonical operating spec for this
   repo. It defines what well-formed content looks like, where files live, the
   role taxonomy, the test invariants, and what NOT to do. Read it FIRST.

2. **`data/feedback/latest.md`** — the user's compiled feedback (produced by
   the in-app FeedbackButton's "Copy compiled markdown" action). Each entry
   has type / question id / prompt snippet / user feedback. May be empty or
   may not exist on a given run.

3. **One representative file per content type you intend to touch**, for
   pattern matching (e.g. `src/quiz/situational/capRateDivergence.ts` for
   situational, `src/quiz/templates/dscrLoanSizing.ts` for quiz templates).
   Read these *before* writing new content so the shape stays consistent.

## What to ship this run

Decide based on the feedback content:

- **If feedback contains bugs** (type=bug): fix them. Each bug points to a
  specific item id; find the file, fix the math/logic, run the relevant
  tests.
- **If feedback contains wording issues** (type=wording): edit the prose.
  Keep the structural shape identical — only the natural-language strings
  change.
- **If feedback contains content ideas** (type=idea): generate up to 3 new
  cases / templates following the existing pattern. Match the user's
  requested topic; don't drift.
- **If feedback is empty / vague / missing**: pick from the GAP list in
  `docs/agent-instructions.md` ("Topic ideas the user has prioritized").
  Generate up to 3 new pieces of content from that list.

## Hard limits this run

- **Max 5 files changed** (excluding the index files you must update for
  registration). Runaway commits get rejected.
- **No changes to** `src/types/`, `src/hooks/`, or `src/storage/` unless
  feedback explicitly demands a type change. Content changes only.
- **Tests must pass** before you finish. Run:
  ```bash
  npm run build && npx vitest run
  ```
  If build or tests fail, debug; do not commit broken code.
- **Do not commit yet.** Stop after the build + tests pass cleanly. The
  orchestration script handles git commit + PR creation.
- **Do not push.** Same as above.

## How to verify your work before stopping

After your edits and BEFORE you stop:

1. `npm run build` — must produce no tsc errors and a successful vite build.
2. `npx vitest run` — all tests must pass. The variety regression suite at
   `src/quiz/__tests__/variety.test.ts` is the canary for new templates;
   the situational pattern test is enforced by the existing builds.
3. Visual sanity-check: open the file you wrote and confirm:
   - Exactly one option has `isBest: true` (situational only)
   - The case is registered in the index file
   - The role tag is present and uses canonical role IDs

## Output format expected by the orchestration script

When you're done:
- All edits committed to the working tree (NOT git-committed; just on disk)
- Build + tests pass
- A short summary printed to stdout describing what you shipped, formatted as:
  ```
  AGENT SUMMARY
  -------------
  Files changed: N
  Content added: <list of new ids>
  Content edited: <list of edited ids>
  Tests: N/N passing
  ```

The orchestrator will detect file changes via `git status`, commit them with
a generated message, and open a draft PR labeled `auto-generated` for human
review.

## Constraints on tone + style of new content

- Match the existing voice: terse, opinionated, occasionally pointed
  ("This is the most-asked debt-side question — know it cold.")
- Takeaways are 1–2 sentences distilling the principle, NOT a recap
- Tips are 3 short rules-of-thumb, not full sentences
- No emoji in content unless the existing pattern uses them (it doesn't)
- No marketing language ("amazing", "powerful") — this is a learning tool

## When to do nothing

If the feedback log is empty AND the GAP list is exhausted, print:
```
AGENT SUMMARY
-------------
No actionable input. Exiting without changes.
```
The orchestrator detects this and exits 0 without opening a PR.
