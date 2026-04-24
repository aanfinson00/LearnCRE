# LearnCRE

CRE Learning Tool for building intuition on pricing based on changes in rent, other income, cap rates, vacancy, and equity returns.

A single-page quiz app that drills the mental math you use when toggling underwriting assumptions. Pick categories, pick a length, pick free-form or multiple-choice — each question shows the formula and step-by-step math after you answer so every miss teaches.

## Question types (MVP)

**Valuation**
- Cap Rate Compression / Expansion — `%Δ value = (OldCap / NewCap) − 1`
- Going-in Cap Rate — `NOI / Price` (answer in bps)
- Vacancy Sensitivity — `ΔNOI = Gross × Δvac → ΔValue = ΔNOI / Cap`
- Other Income Impact — `ΔValue = Δother × (1 − vac) / Cap`
- Rent Change Impact — `ΔNOI = ΔRent × (1 − vac) → ΔValue`
- OpEx Change Impact — `ΔValue = −ΔOpEx / Cap`
- Combined Scenario — full proforma → implied value

**Returns**
- Equity Multiple — `Out / In`
- Simple IRR (single-period) — `(Out / In)^(1/n) − 1`
- Target Equity Multiple — `(1 + IRR)^n`

## Running locally

```bash
npm install
npm run dev        # http://localhost:5173
npm test           # vitest
npm run build
```

## Standalone HTML (no server needed)

`npm run build` produces a single self-contained `dist/index.html` (~190 KB) with all JS and CSS inlined via `vite-plugin-singlefile`. You can double-click it, email it, or host it anywhere — no Node, no npm, no server.

**Download the latest standalone build:** [`standalone/LearnCRE.html`](./standalone/LearnCRE.html) — kept in sync automatically by `.github/workflows/update-standalone.yml` on every push. On GitHub, click the file, then click the **Download raw file** button. Open the downloaded `.html` in any modern browser.

## Keyboard

- **Enter** — submit / next question
- **S** — skip
- **1–4** — pick a multiple-choice answer

## Deployment

`.github/workflows/deploy.yml` builds and publishes to GitHub Pages on push to `main`. Vite's `base` is set to `/LearnCRE/`.

## Planned (v2)

- **Per-SF rent roll changes** — e.g. "rate moves from $7.00/SF to $8.00/SF across half a 200k-SF building — how does that affect valuation at a 6% cap with 5% vacancy?" Needs building SF + a subset (% of RBA) of the rent roll.
- **TI / LC per SF** — "TI goes up $3/SF on the same rollover — how does it affect value?" Up-front capex reduces value ~1-for-1 (not capped), so drill intuition for one-time vs recurring impact.
- Exit cap / reversion and rent-growth-plus-exit combined scenarios.
- Multi-period IRR with interim cash flows (Newton's method).
- Waterfall / promote — required deal-level return to hit LP pref + split.
- DSCR / debt yield / LTV sensitivity.
- Spaced-repetition weighting toward weak categories.
- Mistake-review mode.
- Shareable seeds (URL-encoded RNG seed + categories).
