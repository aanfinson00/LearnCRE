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

## Standalone HTML (no server needed)

`npm run build` produces a single self-contained `dist/index.html` (~250 KB) with all JS and CSS inlined via `vite-plugin-singlefile`. Double-click it, email it, or host it anywhere — no Node, no npm, no server.

**Download the latest build:** [`standalone/LearnCRE.html`](./standalone/LearnCRE.html) — kept in sync by `.github/workflows/update-standalone.yml` on every push. On GitHub, click the file → **Download raw file** → open in any modern browser.

## Keyboard

- **Enter** — submit / next question
- **S** — skip
- **1–4** — pick a multiple-choice answer
- **←/→ or N/P** — navigate in review mode
- **Esc** — exit review

## Deployment

`.github/workflows/deploy.yml` builds and publishes to GitHub Pages on push to `main`. `vite-plugin-singlefile` + relative base (`./`) means the same artifact works via `file://` and under `/LearnCRE/` on Pages.

## Planned

The full backlog — shipped features, in-design work, deferred ideas, design specs — lives in [`ROADMAP.md`](./ROADMAP.md). Highlights of what's next:

- **Situational case studies** — short scenarios + multiple-choice reasoning (e.g. "why is this trading at 8 cap when comps are 6?")
- **Excel formula mode** — write the formula a junior analyst would actually type, against a mini-grid
- **Visualization backfill** for the remaining ~30 question kinds
- **Cloud sync, public profiles, leaderboards, daily / weekly / head-to-head challenges** (deferred track)

See [`ROADMAP.md`](./ROADMAP.md) for the full design specs and sequencing.
