# LearnCRE Roadmap

The durable home for shipped features, in-design work, and the deferred ideas pile. Updated as features land. For day-one usage see [`README.md`](./README.md).

**Status legend:** ✅ shipped · 🛠️ in design · 🟡 deferred / future · ❌ explicitly out of scope

---

## ✅ What's shipped today

### Question framework
- 35 question kinds across valuation, returns, debt, lease economics, basis, growth
- 4 difficulty tiers: Beginner / Intermediate / Advanced / Dynamic (auto-adapts to recent accuracy)
- Asset class profiles: All / Multifamily / Office / Retail / Industrial — overrides bands & vocabulary
- Tolerance modes (tight / standard / loose), free-form numeric input + multiple-choice mode
- Distractor generation with band-aware near-misses; seedable RNG (`mulberry32`)
- Per-question cards: prompt + assumptions + step-by-step solution + mental-math anchors

### Modes
- **Quiz** — pick categories, length (10/20/50/endless), difficulty, tolerance, answer mode
- **Speed Drill** — cap-rate times-tables grid (5×5/7×7/9×9) with timer, heatmap, per-row/col accuracy. 9 variants (cap compression, IRR↔EM, loan constant, NOI×cap→value, percent-of, divide-by, combined discount, nth root, reciprocal table)
- **Walkthroughs** — multi-step guided problems (combined-scenario value, DSCR loan sizing); each step gates on the previous
- **Study** — reference tables for cap rates, multiples, growth, debt, lease econ
- **Profile** — XP / tier / accuracy trend / by-difficulty bars / achievements gallery / recent sessions

### Persistence & profiles
- Multi-profile localStorage namespacing (`learncre.profile.<id>.<suffix>`)
- One-time legacy migration from v2 single-user keys
- Rolling 100-session history with kind/config/accuracy/duration
- Mistake bank with spaced-repetition weighting toward weak categories

### Progression & gating
- 6-tier ladder: Rookie → Analyst I → Analyst II → Associate → VP → MD (0 / 500 / 1.5k / 4k / 10k / 25k XP)
- Weighted XP: base by difficulty + speed bonus (<15s) + streak multiplier (1+min(streak,10)×0.05)
- Soft gates: Advanced needs Analyst I or 50 Q · Dynamic needs Analyst II or 200 Q · Speed Drill needs Analyst I or 30 Q · Walkthroughs need Analyst I or 25 Q
- Per-profile "show me everything" bypass toggle

### Achievements (12)
First Steps · Foundations · Hot Streak · Week One · Hundred Club · Five-Hundred Club · Marathoner · Time Traveler · All Tracks · Pure Math Master · Walkthrough Apprentice · Mistake Crusher. Idempotent evaluator runs on session-finish across all three game modes; toast host renders unlocks.

### UI / brand
- Austin Anfinson tokens: warm-black/copper/warm-white palette, Outfit + Instrument Serif, motion `cubic-bezier(0.22, 1, 0.36, 1)` at 150/250/400ms
- TopNav with 5 tabs + ProfilePicker dropdown + TierBadge
- 6 inline-SVG visualizations (cap compression, NOI waterfall, vacancy, IRR/hold, compound growth, generic solution viz)
- Calculator panel, anchors card, review screen, results screens for all three modes

### Build / deploy
- Vite + React 18 + TypeScript + Tailwind + Vitest
- `vite-plugin-singlefile` produces ~360 KB single-HTML for offline / corp-firewall use
- GitHub Pages deploy via `.github/workflows/deploy.yml`
- Standalone HTML kept in sync via `.github/workflows/update-standalone.yml`
- Vercel deploy via `vercel.json` (Vite framework, must-revalidate cache headers)

---

## 🛠️ In design / next up

Sequenced by readiness, not priority. Specs live in the design-spec section at the bottom.

- **PR W — Situational case mode foundation** — types, hook, setup/play/results screens, 6 hand-crafted cases. See [Design spec — Situational case studies](#design-spec--situational-case-studies).
- **PR X — Situational expansion** — 6 more cases, per-asset-class filtering, achievements ("Reasoning Apprentice", "Diagnostic Eye").
- **PR Y — Excel formula mode foundation** — formula parser + evaluator + 5 starter templates (amortization, NOI roll-forward, IRR/XIRR mapping, growth-rate fill, per-unit normalization). See [Design spec — Excel formula mode](#design-spec--excel-formula-mode).
- **PR Y+ — Excel mode expansion** — 5 more templates, formula-error coaching, tolerance for rounding differences, mini-grid styling polish.
- **Visualization coverage** — 6 of 35 question kinds have viz today. Backfill the highest-impact 10 (rent roll change, mark-to-market, TI vs rent, replacement cost, dev spread, debt yield, DSCR, cash-on-cash, equity multiple, all-in basis).

---

## 🟡 Deferred — Cloud, accounts, leaderboards, social

The "v3 path B" arc. Each PR is independently shippable and can be sequenced after Excel + Situational land. See [Design spec — Cloud / leaderboards / challenges](#design-spec--cloud--leaderboards--challenges) for the architectural details.

- **PR L — Cloud identity foundation** — Supabase project, magic-link auth, profile sync schema, "claim local profile" flow that uploads existing localStorage state on first sign-in.
- **PR M — Cross-device sync** — sessions/XP/achievements/mistake bank reconcile via last-write-wins + per-record `updated_at`. localStorage stays the source of truth for offline; cloud is an async mirror.
- **PR N — Public profiles** — opt-in shareable URL `/u/<handle>` showing tier, lifetime stats, achievements, recent sessions. Privacy default: handle-only, no email.
- **PR O — Daily challenge** — deterministic seed of the day, same 10 questions for everyone, leaderboard for the day's accuracy + speed.
- **PR P — Curated weekly challenges** — hand-authored 10-question themed sets ("debt fundamentals", "lease econ", "MF acquisition") with leaderboards.
- **PR Q — Head-to-head** — 1v1 async match: same seed, both players play independently, results compared at end.
- **PR R — Friends / follows** — follow other handles, see their recent unlocks + sessions in a feed.
- **PR S — Global leaderboards** — all-time XP, weekly XP, daily challenge accuracy, longest streak.
- **PR T — Cohort / org leaderboards** — invite-by-link cohorts (e.g. "Acme RE summer interns") with their own ranking. Useful for instructor-led use.
- **PR U — Notifications** — opt-in email weekly digest, friend unlocked an achievement, daily challenge reminder.

---

## 🟡 Adjacent / nice-to-have

Not blocking, not deferred-by-architecture — just lower-priority polish, engagement, and UX wins. Pick off opportunistically.

- **Shareable seeds** — URL-encoded RNG seed + categories so friends can replay your exact set
- **Mistake-only mode** — start a session restricted to your open misses, weighted by how stale each is
- **Per-question hint reveal** — graduated hints (formula → first step → solved one variable) for stuck users
- **End-of-session "what changed"** — diff your accuracy / time-per-question vs your last session
- **Anchor flashcards** — pull just the anchors content into a 60-second flashcard mode
- **Session length presets named** — "Coffee break (5 Q)", "Subway ride (15 Q)", "Lunch (30 Q)"
- **Calculator history** — last 10 expressions, click to re-run
- **Theme variants** — high-contrast mode, larger-type mode (a11y)
- **Glossary popovers** — hover a term in a question to see its definition + related anchors
- **Per-kind cheat sheet on first-attempt** — tiny inline reference the first three times a user encounters a new kind
- **"Why was I wrong" deep-dive** — link from review-screen wrong answer to the precise math step that diverged
- **Speed-drill ghost runs** — replay your best previous attempt cell-by-cell over the new run
- **Streak save** — one-time "freeze" per week to protect a streak after a missed day

---

## ❌ Out of scope

Explicitly not pursuing. Listed so future contributors don't burn cycles relitigating.

- **Multi-tier waterfalls** — pref + catch-up + multiple promote tiers. Out of pedagogical scope; closer to LP/GP modeling than valuation intuition.
- **Real-time multiplayer** — sync cursors, live races. Async head-to-head (PR Q) covers the social need without WebSocket infra.
- **Charting libraries** (Recharts, D3) — inline SVG covers what we need; libraries balloon bundle size and clash with the singlefile build.
- **Server-side question rendering** — questions stay client-generated for offline use and to keep cloud costs at zero.
- **Mobile-native apps** — responsive web is sufficient; PWA install is the upgrade path if needed.
- **Tax modeling beyond reassessment** — depreciation recapture, 1031 exchange mechanics, cost segregation. Too domain-specific.
- **Tenant-credit-rating data** — would need a third-party feed; can be referenced narratively in situational cases instead.
- **AI-graded long-form answers (verbal mode)** — interesting but adds an LLM dependency and a billing surface. Listed under Situational adjacent ideas, deferred.

---

## Design spec — Excel formula mode

### Why
Existing kinds test "can the user compute". Excel mode tests "can the user write the formula a junior analyst would actually type". Closes the gap between mental math and real-world deliverables.

### Shape
- Mini-grid (5–8 rows × 3–5 cols) renders inline with assumptions in named cells
- Prompt names a target cell and asks for the formula
- User types the formula in a monospace input; preview shows tokenized parse + computed value
- Submit checks: (a) value within tolerance, (b) formula structure matches one of N accepted patterns

### Parser / evaluator
- Hand-rolled recursive-descent parser (no `eval`, no `mathjs` dependency)
- Supported: `+ - * / ^`, parens, cell refs (A1-style), ranges (`A1:A5`), absolute (`$A$1`)
- Functions v1: `SUM`, `AVERAGE`, `IF`, `MIN`, `MAX`, `ROUND`, `PMT`, `IPMT`, `PPMT`, `IRR`, `NPV`, `XIRR`
- Functions v2: `XLOOKUP`, `INDEX`, `MATCH`, `SUMIF`, `OFFSET`
- Live preview with friendly errors ("unknown function `PMT2` — did you mean `PMT`?")

### 10 starter templates
1. Amortization schedule — fill the year-3 principal column
2. NOI roll-forward — gross → vacancy → EGI → opex → NOI with growth
3. IRR from cash flows — write `=IRR(B2:B7)`
4. Loan sizing from DSCR — solve for max loan
5. Cap rate from sale comps — average filtered comps
6. Per-unit normalization — convert dollar columns to $/unit
7. Mark-to-market lift — in-place vs market rent diff
8. Equity multiple — total distributions / total contributions
9. Rent bumps with steps — 3% for 3 years then $0.50/SF flat bumps
10. Reversion value — exit NOI / exit cap, with sale costs

### Architecture
- `src/excel/parser.ts` — tokenizer + AST
- `src/excel/evaluate.ts` — pure functional evaluator over a `Sheet` map
- `src/excel/templates/<name>.ts` — one file per template (assumption cells, target cell, accepted formula patterns)
- `src/components/ExcelGrid.tsx` — render a `Sheet` with editable target cell
- `src/components/ExcelScreen.tsx` — host (prompt + grid + formula input + preview + submit)
- `src/hooks/useExcelSession.ts` — reducer for in-progress runs

### Adjacent ideas to bundle later
- "Find the bug" mode — pre-filled formula has one error; user fixes it
- "Refactor" mode — working formula is verbose; user shortens to a target character count
- Formula-vs-formula head-to-head — both players solve the same template, faster correct wins

---

## Design spec — Situational case studies

### Why
Every existing kind tests *can the user compute*. Situational tests *can the user reason about why a deal looks the way it does*. Closes the analytical gap between mechanics and judgment. Hand-crafted, never random-generated.

### Question shape

```ts
interface SituationalCase {
  id: string;
  title: string;            // "Why is this trading off-market?"
  category: SituationalCategory;
  scenario: string;         // 2–4 sentence narrative
  data?: { label: string; value: string }[];   // sidebar facts grid
  question: string;
  options: SituationalOption[];   // 3–4 options
  takeaway: string;         // one-paragraph lesson
  tips: string[];           // related rules-of-thumb
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  assetClass?: AssetClass;
}

interface SituationalOption {
  label: string;
  isBest: boolean;          // exactly one best answer; others "wrong but plausible"
  explanation: string;      // why it's best, or why it's less defensible
}

type SituationalCategory =
  | 'pricing'            // why does this cap rate / price look off?
  | 'absorption'         // lease-up / supply / demand timing
  | 'risk'               // identifying material risks in a deal sheet
  | 'investment-thesis'  // does this fit core / value-add / opportunistic?
  | 'diagnostic'         // smell-test a proforma assumption
  | 'lease-econ'         // TI vs rent / NER / structure tradeoffs
  | 'comp-selection'     // which comps to use / discard
  | 'sensitivity';       // what changes if X moves?
```

### Initial 12 hand-crafted cases
1. **Cap rate divergence** — subject 8 cap vs 6 cap comps. Best: short remaining lease term + below-market rents (mark-to-market upside).
2. **Absorption timing** — 85% leased, +300 units coming, 50/mo absorption → ~16 mos to 95%.
3. **Why is the rent roll undervalued?** — long-term in-place leases with 1% bumps in a 4% market.
4. **NOI growth smell test** — proforma 8%/yr for stabilized MF. Best: aggressive vs 2–3% historical norm.
5. **TI vs rent give-back** — 5-yr lease, $20/SF rent, $30/SF TI request → ~$14 NER.
6. **Mark-to-market upside** — in-place $24/SF, market $32/SF, expiry in 12 mos → ~33% lift.
7. **Refi vs sell** — same IRR; "it depends" on tax + reinvestment rate.
8. **Going-in vs exit cap spread** — 5% in / 6% out is realistic conservative for 5–7 yr hold.
9. **Property tax reassessment surprise** — $50M sale, 1.25% reassessment → ~−$425k NOI / ~−$8.5M value at 5%.
10. **Vacancy spike interpretation** — 95% → 80% in a quarter: investigate single-tenant vs market-wide.
11. **Comp set vetting** — discard the off-submarket comp + the 18-mo-old comp; use the remaining 3.
12. **Going-in cap with tenant credit** — IG tenant on 15-yr lease deserves ~50–100 bps tighter pricing.

### UI
- New "Situational" tab in TopNav, sibling to Quiz / Speed drill / Walkthrough / Study / Profile
- Setup: pick category (or "all"), difficulty, asset class. Length 5/10/20.
- Play card: title + scenario paragraph + optional sidebar facts grid + 3–4 stacked option buttons (1–4 keyboard)
- Post-submit reveal: every option's explanation expands; correct in copper, others greyed with "✗ here's why this is less defensible"
- Takeaway card in copper-tinted styling at the bottom; tips collapse below

### Architecture
- `src/types/situational.ts` — interfaces + category union
- `src/quiz/situational/` — one file per case + `index.ts` that exports the catalog
- `src/components/SituationalSetup.tsx`, `SituationalScreen.tsx`, `SituationalResults.tsx` — modeled after walkthrough screens
- `src/hooks/useSituational.ts` — reducer for in-progress runs
- `'situational'` mode in `App.tsx` and `TopNav.tsx`
- Achievement hooks: "Reasoning Apprentice" (10 cases done) · "Diagnostic Eye" (90% on diagnostic category)
- Session history reuses `SessionRecord` with `kind: 'situational'`

### Difficulty tiers
- **Beginner** — 3 options, one obviously right, two obviously wrong
- **Intermediate** — 4 options, two plausible, one best
- **Advanced** — 4 options, all defensible to a degree, one most-defensible — emphasize *quality* of reasoning, not just answer

### Math reuse
Computational cases (absorption timing, mark-to-market, reassessment) reference existing `src/math/` primitives in their explanations. Numbers hand-tuned per case; not regenerated.

### Adjacent ideas to bundle later
- Ranking exercises — drag-to-order 3 things by quality / risk
- Multi-step diagnostics — 3-question follow-up where each answer narrows the next set
- Trade-off framing — "what would change your answer" follow-up after each case
- Case generator from a real deal sheet — paste OM data, autosuggest a case (out of scope v1)
- Verbal explanation mode — user types a rationale, AI grades against the takeaway (LLM dependency, deferred)

---

## Design spec — Cloud / leaderboards / challenges

### Why
Local-first works for a single user, but doesn't survive device switches or enable social proof / friendly competition. Cloud sync is opt-in: the app keeps working unsigned-in.

### Identity
- Supabase project (free tier) — `auth.users` + magic-link email login, no passwords
- `profiles` row 1:1 with `auth.users.id`: `handle` (unique, public), `display_name`, `avatar_color`, `bio`, `created_at`
- "Claim local profile" flow on first sign-in: list local profiles, user picks which to upload; rows merged into cloud with `imported_at` stamp
- RLS: profile row visible to all if `is_public = true`; mutable only by owner

### Sync model
- Local-first stays primary. Cloud is async mirror.
- Per-record `updated_at` timestamps; last-write-wins on conflict
- Tables: `sessions`, `xp_state`, `achievements`, `mistake_bank_items`, `tier_state`
- Background sync job (debounced 10s, batched) pushes deltas; pulls on app open
- All tables RLS-locked to owner except read-public views for leaderboards

### Public profiles
- `/u/<handle>` route renders tier, lifetime stats, achievements unlocked, last 8 sessions
- Owner toggles `is_public` in Profile screen settings
- No email or device IDs ever exposed

### Leaderboards
- Materialized views refreshed every 5 min:
  - `lb_xp_alltime` — top 100 by lifetime XP
  - `lb_xp_weekly` — top 100 by XP gained this ISO week
  - `lb_streak_alltime` — top 100 by best daily streak
  - `lb_daily_today` — top 100 by today's daily-challenge accuracy + speed
- Filters: global · friends · cohort
- "Where you rank" sticky row when user is outside top 100

### Challenges
- **Daily** — deterministic seed = `YYYY-MM-DD`; 10 questions, fixed config; everyone gets the same set
- **Weekly themed** — hand-authored 10-question set, swaps Monday 12:00 UTC; theme + curator handle shown
- **Head-to-head** — invite-by-link, both players play same seed independently, results compared on settle. 7-day expiry.

### Friends / follows
- Asymmetric follow (Twitter-style)
- Feed: friends' achievement unlocks, daily-challenge results, milestone tier-ups
- Mute / unfollow controls

### Notifications
- Email-only (no push); opt-in per type:
  - Weekly digest (your XP + leaderboard movement)
  - Friend unlocked an achievement
  - Daily challenge reminder (configurable time)
- Unsubscribe link on every email; preferences in Profile screen

### Architecture
- `supabase/migrations/` — schema + RLS policies + materialized views
- `src/cloud/client.ts` — Supabase client wrapper
- `src/cloud/sync.ts` — debounced delta-push + on-open pull
- `src/cloud/leaderboards.ts` — read-side queries with cache
- `src/cloud/challenges.ts` — daily seed derivation + weekly fetch + head-to-head settle
- `src/components/SignIn.tsx`, `PublicProfile.tsx`, `Leaderboard.tsx`, `ChallengeCard.tsx`, `FriendsFeed.tsx`
- Auth state propagated via `useAuth()` hook; `useCloudSync()` reactivates sync on auth change

### Out-of-scope (cloud track)
- Real-time multiplayer / WebSockets
- Federated identity (Google / GitHub) until magic-link friction proves it's needed
- Comments, DMs, chat
- Server-rendered question content
- Paid tier / billing — track stays free until Supabase free-tier limits force the conversation

---

## Implementation order (current)

1. ✅ This `ROADMAP.md` lands. README links to it.
2. PR W — Situational foundation
3. PR X — Situational expansion
4. PR Y — Excel mode foundation
5. PR Y+ — Excel mode expansion
6. Visualization backfill (10 highest-impact kinds)
7. PR L → PR U — cloud track, in order

Re-sequence freely as priorities shift. Update the "In design" section when a PR lands and move the entry up to "What's shipped today".

---

## Verification

- `ROADMAP.md` renders cleanly on GitHub (preview locally with `npx serve` or open in any markdown viewer)
- README "Planned" section links here
- Every shipped commit referenced is verifiable via `git log --oneline`
- Anyone can pick up the Situational or Excel design spec and start coding without further design conversation
