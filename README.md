# LearnCRE

CRE Learning Tool for building intuition on pricing, debt sizing, lease economics, and returns.

A single-page quiz app that drills the mental math you use when toggling underwriting assumptions. 27 question kinds across valuation, returns, basis, debt, and lease economics — plus a cap-rate times-table speed drill. Every question shows the formula, step-by-step math, and mental-math tips (cap → multiple anchors, rule of 72, sandwich technique) after you answer.

## Question types

**Valuation / assumptions (12)**
- Cap Rate Compression / Expansion
- Going-in Cap Rate
- Vacancy Sensitivity
- Other Income Impact
- Rent Change Impact
- OpEx Change Impact
- Combined Scenario (full proforma → value)
- Price per SF
- All-In Basis
- Gross Rent Multiplier (GRM)
- Rent Roll $/SF Change (per-SF rollover to market)
- Tax Reassessment Impact

**Returns / debt (10)**
- Equity Multiple
- Simple IRR (single-period)
- Target Equity Multiple (for target IRR)
- Debt Yield Loan Sizing
- DSCR Loan Sizing
- Cash-on-Cash Return
- Break-Even Occupancy
- Levered IRR (approx)
- Loan Constant
- Yield on Cost + Development Spread

**Lease economics (5)**
- Net Effective Rent (NER)
- TI vs Rent Tradeoff
- TI Payback Rent Premium
- Replacement Cost (sanity floor)

## Modes

- **Quiz** — pick categories, length (10/20/50/endless), difficulty (Beginner / Intermediate / Advanced / Dynamic), tolerance band, and answer mode (free-form or multiple choice). Review all answers at the end with full math + tips.
- **Cap Rate Speed Drill** — times-table-style grid (5×5 / 7×7 / 9×9) where rows = starting cap, columns = ending cap, and cells are the % value change. Timer, live heatmap, and end-of-drill summary with per-row/per-column accuracy.

## Running locally

```bash
npm install
npm run dev        # http://localhost:5173
npm test           # vitest
npm run build
```

## Builds

```bash
npm run build              # web build → dist/ (code-split, for Vercel)
npm run build:standalone   # single self-contained file → dist-standalone/index.html
```

The **web build** splits the app into lazily loaded chunks: a first-time visitor downloads only the landing page (~110 KB gzipped), and each mode (quiz, situational, modeling tests, …) loads when opened. Every mode has its own URL (`/quiz`, `/case-study`, `/certify/<id>/exam`, …) — see `src/router.ts`.

The **standalone build** inlines everything into one HTML file that works from `file://` (double-click it, email it, host it anywhere). It uses hash routes (`index.html#/quiz`) since a local file can't change its path.

**Download the latest standalone copy:** [`standalone/LearnCRE.html`](./standalone/LearnCRE.html) — rebuilt by `.github/workflows/update-standalone.yml` on every push. On GitHub, click the file → **Download raw file** → open in any modern browser.

## Content guardrails & CI

`.github/workflows/ci.yml` runs the typecheck, the full test suite and both builds on every PR and every push to `main`. Two suites under `src/test/content/` guard question quality:

- **`generators.test.ts`** sweeps every question template across all difficulties and asset classes. It fails on any of these:
  - broken output: NaN, `undefined`, float noise like `8.200000000000001`
  - "a 5 years hold" phrasing
  - malformed multiple-choice sets
  - answers outside a per-kind realism band, e.g. simple IRR ≤ 35% or 0.3–4 truck doors per 10k SF
- **`text.test.ts`** lints every situational case, long-form case, mock prompt, vocab term, walkthrough, Excel drill, modeling test and certification. It fails on:
  - drafting notes ("— wait, …", "let me re-state"), TODOs, broken interpolation, doubled words and unbalanced bold
  - malformed cases: not exactly one best answer, empty explanations, weak rubrics
  - duplicate ids or vocab terms

When you add a template, add its kind to `BOUNDS` in `generators.test.ts`. If a deliberate change moves a range, widen the band in the same commit and say why.

## Keyboard

- **Enter** — submit / next question
- **S** — skip
- **1–4** — pick a multiple-choice answer
- **←/→ or N/P** — navigate in review mode
- **Esc** — exit review

## Deployment

Vercel serves the code-split web build (`vercel.json`: SPA fallback to `index.html`, long-lived caching for hashed `/assets/*`). `.github/workflows/deploy.yml` publishes the standalone build to GitHub Pages on push to `main`, since its relative base and hash routing work under the `/LearnCRE/` subpath.

## Planned

The full backlog — shipped features, in-design work, deferred ideas, design specs — lives in [`ROADMAP.md`](./ROADMAP.md). Highlights of what's next:

- **Situational case studies** — short scenarios + multiple-choice reasoning (e.g. "why is this trading at 8 cap when comps are 6?")
- **Excel formula mode** — write the formula a junior analyst would actually type, against a mini-grid
- **Visualization backfill** for the remaining ~30 question kinds
- **Cloud sync, public profiles, leaderboards, daily / weekly / head-to-head challenges** (deferred track)

See [`ROADMAP.md`](./ROADMAP.md) for the full design specs and sequencing.
