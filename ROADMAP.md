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

### Modes (11 + Profile)
- **Quiz** — pick categories, length (10/20/50/endless), difficulty, tolerance, answer mode, role filter, asset class
- **Speed Drill** — cap-rate times-tables grid (5×5/7×7/9×9) with timer, heatmap, per-row/col accuracy. 9 variants (cap compression, IRR↔EM, loan constant, NOI×cap→value, percent-of, divide-by, combined discount, nth root, reciprocal table)
- **Vocab** — flashcard drill on industry terminology, role-filtered, multiple format choices (definition / acronym / opposite-of)
- **Walkthroughs** — multi-step guided problems (combined-scenario value, DSCR loan sizing, mock acquisition); each step gates on the previous
- **Situational** — 69 hand-crafted reasoning cases across 8 categories (pricing, absorption, risk, investment thesis, diagnostic, lease econ, comp selection, sensitivity)
- **Case study** (long-form) — prose answers graded against a rubric; trains the 4-6 sentence interview answer
- **Mock interview** — 8 firm-archetype mocks (megafund acquisitions, regional asset mgr, debt shop, etc.) with mixed-mode question sets and self-graded rubrics, full run history
- **Excel formula** — one-formula-at-a-time drill with live preview, parser, and tolerance + structure check; 11+ templates spanning amortization, NOI roll-forward, IRR/XIRR, debt sizing, sensitivity
- **Modeling test** — 6 take-home-style multi-cell templates (5-yr DCF · 3-constraint loan sizing · construction loan sizing · MF acquisition pro-forma · refi-vs-sell · distressed basis-play). Grading on designated output cells with tolerance + diagnostic checkpoints; auto-save / resume
- **Study tables** — reference cheat sheets for cap rates, multiples, growth, debt, lease econ
- **Certify** — 5 role certifications (Acquisitions, Asset Mgmt, Mortgage UW, Development, Portfolio Mgmt) with benchmark exam, downloadable artifact
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

### Achievements (19)
First Steps · Foundations · Hot Streak · Week One · Hundred Club · Five-Hundred Club · Marathoner · Time Traveler · All Tracks · Pure Math Master · Walkthrough Apprentice · Mistake Crusher · Reasoning Apprentice · Diagnostic Eye · Spreadsheet Apprentice · Modeling Apprentice · Modeling Pro · Clean Sheet · Tour Guide. Idempotent evaluator runs on session-finish across every mode; toast host renders unlocks.

### UI / brand
- Austin Anfinson tokens: warm-black/copper/warm-white palette, Outfit + Instrument Serif, motion `cubic-bezier(0.22, 1, 0.36, 1)` at 150/250/400ms
- Persistent left **SideNav** (4 sections — Drill / Apply / Reference / Progress) with hamburger drawer below `lg`. Replaces the legacy 11-tab top nav
- TierBadge in sidebar header, ProfilePicker docked at sidebar footer (drop-up to avoid viewport clipping)
- Inline-SVG visualizations covering 63 of 63 question kinds. Foundations batch (20): cap compression, NOI waterfall, vacancy, IRR/hold, compound growth, rent roll change, TI vs rent, replacement cost, dev spread, debt yield, DSCR loan sizing, cash-on-cash, equity multiple, all-in basis, going-in cap, loan constant, DSCR-from-NOI/DS, DSCR pass test, GRM, price/SF, price/unit, rent/unit, opex/unit, sales/SF, other-income impact, loss-to-lease, occupancy cost ratio, OER, yield on cost, reversion value, break-even occupancy, NER, WALT, CAGR. Returns/Promote batch (9): pref accrual, GP catch-up, waterfall simple split, GP effective promote, levered IRR, hold-vs-sell IRR, IRR after promote, DSCR sensitivity rate, extension drag. Construction draws batch (5): cost to complete, draw allocation, contingency drawdown, retainage running, FF&E reserve dollars. Niche/asset-class batch (12): RevPAR, GOP margin, RevPOR vs RevPAR, percentage-rent breakpoint, clear-height premium, truck-doors per SF, tax reassessment, opex change, NOI from OER, TI payback, TI per SF per year of term, renewal-prob-weighted rent. Plus tax-adjusted exit waterfall + rent change + generic solution viz.
- Calculator panel, anchors card, review screen, results screens for every game mode
- Scratch sheet (open across any drill mode), feedback button (in-app log), achievement toasts

### Onboarding
- **Welcome modal** — 4 slides on first profile launch (what LearnCRE is · role pick · Compete &amp; contribute · ready-to-quiz CTA), dismissible at any slide via X / Skip / Esc / backdrop click. Compete slide surfaces the cloud-gated features (Daily / Weekly / Leaderboards / Head-to-head / Cohorts / Friends feed) + the Contribute submission form so first-time users discover the layers above the quiz core. Persists once-seen flag per profile.
- **Per-mode primers** — first-visit Card on every mode's setup screen with blurb / when-to-use / expected time. Dismissible per-mode-per-profile.
- Welcome modal's role pick flows into `loadPreferredRole()` which pre-fills SetupScreen on the user's first session.

### Build / deploy
- Vite + React 18 + TypeScript + Tailwind + Vitest
- `vite-plugin-singlefile` produces ~360 KB single-HTML for offline / corp-firewall use
- GitHub Pages deploy via `.github/workflows/deploy.yml`
- Standalone HTML kept in sync via `.github/workflows/update-standalone.yml`
- Vercel deploy via `vercel.json` (Vite framework, must-revalidate cache headers)

---

## 🛠️ In design / next up

Sequenced by readiness, not priority. Specs live in the design-spec section at the bottom.

- **Visualization coverage** — 63 of 63 question kinds shipped (Foundations + Returns/Promote + Construction draws + Niche/asset-class + post-tax exit). `taxAdjustedExit` was the lone parked viz; closed by extending `DealInputs` with `saleProceeds` / `accumulatedDep` / `saleCostRate` / `recaptureRate` / `capGainsRate`, threading those through the template's `context`, and shipping `TaxAdjustedExitViz` (6-bar waterfall: Sale → −Costs → Net → −Recapture → −Cap gains → After-tax + total-drag stat). Catalog complete.
- **Modeling test UX polish (shipped, full)** — ⌘↵ (next-empty target) + ⌘D (fill-from-left with relative-reference shift, Excel-style) via `shiftFormula` (11 unit tests) shipped earlier. Now closed with: (a) sticky-left row-number + corner-header cells in `ModelingTestGrid` so phones / narrow viewports keep their bearings during horizontal scroll on wider 7-column grids, and (b) ⌘↑ / ⌘↓ formula-history recall in the formula bar — session-wide history (capped at 50 unique entries; consecutive duplicates collapse) appended on every Tab / Enter / ⌘↵ advance, cycled by ⌘↑ (older) and ⌘↓ (newer). Cursor resets when the user types or switches focused cell, so cycling is anchored to the current edit. Hint line under the formula bar surfaces the new shortcuts. Native ⌘C/⌘V remains for free.
- **Interview-questions.md GAPs (shipped)** — three new quiz templates closing the named GAPs from item 11: `refiStressTest` (cap_stress = LTV × NOI / loan; mortgage-UW), `feeDragOnIrr` (LP IRR after committed-capital management fees; portfolio-mgmt), `leaseUpReserve` (linear-ramp NOI shortfall sizing for ground-up dev). Distressed-deal GAP was already shipped as `walk-distressed-1` walkthrough (`distressedLoanWorkoutWalk`). All 3 new kinds covered by the 1000-iteration template test.

---

## 🟡 Deferred — Cloud, accounts, leaderboards, social

The "v3 path B" arc. Each PR is independently shippable and can be sequenced after Excel + Situational land. See [Design spec — Cloud / leaderboards / challenges](#design-spec--cloud--leaderboards--challenges) for the architectural details.

- **PR L — Cloud identity foundation (shipped, frontend complete; user provides Supabase project + env vars to activate)** — `@supabase/supabase-js` client wrapper at `src/cloud/client.ts` with cloud-disabled fallback when env vars missing (app continues local-first). `useAuth()` hook + `AuthProvider` at `src/cloud/auth.tsx`; magic-link `SignIn` component on `ProfileScreen`; first-sign-in `ClaimLocalProfile` modal seeds the cloud `profiles` row from active local profile. SQL migration at `supabase/migrations/0001_initial.sql` defines `profiles` (RLS: owner read+write, public-read when `is_public=true`) plus 5 placeholder tables (`xp_state`, `tier_state`, `sessions`, `achievements`, `mistake_bank_items`) shape-only with owner-RLS — used by PR M for cross-device sync. `.env.example` documents the activation flow.
- **PR M — Cross-device sync (shipped)** — `src/cloud/sync.ts` exposes `pushAll(userId)` + `pullAll(userId)` over the 5 placeholder tables from PR L. Pure merge helpers (`mergeXp`, `mergeSessions`, `mergeAchievements`, `mergeMistakes`) use union-and-max semantics — no per-record `updated_at` plumbing required, which keeps the existing local writers untouched. `useCloudSync()` hook in `App` runs initial pull-then-push on auth-state-change, then a 30s periodic push, plus `beforeunload` flush. Activates only when cloud is enabled + signed in; full no-op otherwise. 9 unit tests covering the merge corner cases (empty local, id collisions, prompt-key uniqueness).
- **PR N — Public profiles (shipped)** — `/u/<handle>` route renders avatar/handle/display name, total XP, current streak, tier, achievements list, last 8 sessions. Hand-rolled router (`detectPublicProfileHandle()` early return in `App.tsx`) avoids adding a router dep for a single dynamic route. New 0002 migration adds public-read RLS on `xp_state`, `tier_state`, `sessions`, `achievements` gated on `profiles.is_public = true` (mistakes stay private). `SignIn` panel on Profile screen now exposes a make-public toggle + Copy-share-URL button. Privacy default unchanged: rows opt-in only.
- **PR O — Daily challenge (shipped)** — `Compete → Daily` in the SideNav. Same 10 questions worldwide for any UTC date (3 beginner / 5 intermediate / 2 advanced), seeded by FNV-1a hash of `YYYY-MM-DD`. `src/quiz/dailyChallenge.ts` exposes `dailyDate()`, `seedFromDate()`, `generateDaily()` plus local play-tracking. New 0003 migration adds `daily_results` table with primary-key (date, user_id) for one-play-per-day enforcement, owner-only insert, public read gated on `profiles.is_public`. Leaderboard view sorts by `correct DESC, time_ms ASC`; rows whose owner is private filter out client-side. Cloud-disabled fallback: app still plays locally, leaderboard hidden. 11 unit tests covering UTC date format, seed determinism, difficulty mix, question stability across calls.
- **PR P — Curated weekly challenges (shipped)** — `Compete → Weekly themes` in the SideNav. 6 hand-authored themes for May–June 2026 (Debt fundamentals, Lease economics, MF acquisition, Capital stack & promote, Hotel underwriting, Refi & exit) defined in `src/quiz/weeklyChallenges.ts` with explicit start/end ISO timestamps (Mondays 12:00 UTC). Themes are app code (not DB rows) so adding new ones is a code change, not a data migration. New 0004 migration adds `weekly_results` table mirroring daily — PK `(challenge_id, user_id)` enforces one play per theme. Leaderboard sorts by `correct DESC, time_ms ASC`; respects `is_public` RLS like daily. Empty-state shows next upcoming theme + curator handle. 12 unit tests cover theme uniqueness, non-overlapping windows, current/next selection, deterministic generation, kind-pool conformance.
- **PR Q — Head-to-head (shipped)** — `Compete → Head-to-head` in the SideNav. Host creates a match → gets a `(match_id, invite_token)` pair → opponent claims the slot via `accept_match_by_token()` SECURITY DEFINER fn → both play the same seeded 10-question set independently → result auto-settles when both have submitted via `submit_match_result()` SECURITY DEFINER fn (status flips to `settled` only when both `*_completed_at` are non-null). 7-day expiry baked into the row default. Higher correct wins; ties broken on speed. Refactored `dailyChallenge.ts` to expose `generateFromSeed(seed)` so both daily (date-derived) and h2h (random per match) share the question generator. New 0008 migration with two SECURITY DEFINER functions; RLS lets host do anything with their matches and opponent read theirs. 11 unit tests cover `settleOutcome` (host-win / opponent-win / draw / incomplete + tie-break) and `canPlay` (settled / expired / role / already-submitted).
- **PR R — Friends / follows (shipped)** — `Compete → Friends feed` in the SideNav. Asymmetric Twitter-style follows backed by a `follows` table (PK `follower_id, followee_id`, no self-follow check, RLS lets a user CRUD their own edges + lets anyone read edges whose followee profile is public so follower counts work). Follow / Following toggle + follower count on `/u/<handle>` for any signed-in viewer who isn't the profile owner. Friends feed aggregates achievements + daily-challenge results across followees, sorted descending by timestamp; rows from non-public followees never surface (RLS gates on linked profile). Pure `mergeFeedEvents` helper covered by 4 tests. Not in scope: muting (skipped — unfollow covers it), tier-up events in feed, follower lists on profile pages.
- **PR S — Global leaderboards (shipped)** — `Compete → Leaderboards` in the SideNav. 4 tabs: All-time XP, This week (ISO-week XP via session-payload sum), Longest streak, Daily today. Implemented as plain queries (Supabase free tier has no built-in cron for matview refresh) ordered + capped at 100. New 0005 migration adds `best_streak` column to `xp_state`; `sync.ts` now pushes/pulls it. Public visibility flows through existing RLS — only rows whose linked profile has `is_public = true` appear. ISO-week-start helper covered by 5 unit tests (Mon noon, Sun rollback, year boundary, Wed mid-week, time zeroing).
- **PR T — Cohort / org leaderboards (shipped)** — `Compete → Cohorts` in the SideNav. Owner creates a named cohort with a slug + auto-generated `invite_token`; invitees paste `(slug, token)` into a Join form which calls a `SECURITY DEFINER` `join_cohort_by_token()` function so non-members can't read tokens by guessing slugs. New 0007 migration: `cohorts` (with slug/name length+regex CHECKs) + `cohort_members` (PK `(cohort_id, user_id)`) + an `is_cohort_member()` SECURITY DEFINER helper that breaks the RLS-recursion you'd otherwise get on cross-table membership checks. Cohort detail screen shows member list, invite token (owner only) with Copy button, leave button (members), and a cohort-scoped XP leaderboard reusing the PR S query pattern filtered to `user_id IN (members)`. 9 unit tests cover slug normalization + validation.
- **PR U — Notifications (shipped, full)** — Email-only opt-in. `notification_preferences` table (off-by-default toggles for weekly digest / daily reminder / friend unlock + UTC reminder hour + per-row unsubscribe token). `unsubscribe_by_token()` SECURITY DEFINER fn flips every flag off in one click; granted to `anon` so unsubscribe links work without sign-in. Edge Function at `supabase/functions/send-notifications/` handles three branches: `?type=weekly_digest`, `?type=daily_reminder`, and `type=friend_unlock` (POST body: `user_id`, `achievement_id`). Friend-unlock is fired by an `AFTER INSERT` trigger on `achievements` (0012 migration) via `pg_net.http_post`; the trigger filters fresh-only unlocks (within 5 min of `now()`) so backfill / re-sync inserts don't spam followers, gracefully no-ops when `app.notification_function_url` / `app.cron_secret` settings are unset, and never blocks the achievement write on http failure. Edge Function fans out only when the actor's profile is public (so the email link works) and only to followers with `friend_unlock_enabled=true`. README documents the database-level setting setup. Frontend: `NotificationPreferencesCard` on Profile screen; `UnsubscribePage` rendered at `/unsubscribe?token=…`.
- **Community question submissions (shipped)** — `Contribute → Submit a question` in the SideNav. Cloud-authenticated users pitch new questions in three formats: multiple choice (2-8 choices, mark one correct via letter button), solvable (numeric answer + unit dropdown), or word problem (free-form prose answer). New 0010 migration adds `question_submissions` table with optional kind / role / difficulty / tags hints, an explanation field, and `status` (`pending → approved / rejected / integrated`) + `reviewer_notes` columns. RLS lets the submitter INSERT and SELECT their own rows and UPDATE while still pending (typo fixes). Pure `validateSubmission()` validator covered by 16 unit tests (per-type rules, length bounds, MC letter↔index range check, $/comma/% strip on numeric expected, single-letter parse case-insensitive). My-submissions list shows status chips + reviewer notes inline.
- **Admin submission review UI (shipped)** — `/admin/submissions` route via the hand-rolled router. Owner reviews pending community questions with filter tabs (Pending / Approved / Integrated / Rejected / All), per-row Approve / Mark integrated / Reject + reviewer notes, and a one-click "Copy template scaffold" that generates a TS template starter from the submission (kind hint + role + prompt + expected pre-filled, math left as TODOs). New 0011 migration adds `admins` table + `is_admin()` SECURITY DEFINER helper + admin SELECT/UPDATE RLS policies on `question_submissions`. First admin granted via service-role / SQL editor; after that admins can grant additional admins through the table.
- **URL invite pass (shipped)** — Single-link invites for cohorts and head-to-head. `/c/<slug>?token=…` and `/m/<id>?token=…` routes via the hand-rolled router land on dedicated `CohortInviteLanding` / `MatchInviteLanding` pages: signed-in users see auto-join in flight, signed-out users get an inline magic-link form whose `emailRedirectTo` is the invite URL itself so the magic-link callback returns to the same page and finishes the join in one shot. `signInWithEmail(email, redirectTo?)` gained the optional `redirectTo` arg used here. The two existing invite cards on `CohortsScreen` + `HeadToHeadScreen` now show a single copy-able URL plus a `<details>` reveal for the legacy slug+token / id+token pair (kept for any tooling that needs the raw values).
- **Interview-questions GAPs round 2 (shipped, content closed)** — The 4 situational items (`dev-ltc-vs-ltv`, `groundLeaseVsFee`, `risk-adjusted-return-framework`, `capital-allocation-priority`) were already shipped in earlier rounds. The lone remaining quiz template `constructionLoanSizing` now lands: equity check on a ground-up dev given total project cost + lender LTC. Inputs from existing `bands.projectCost` + a new `LTC_OPTIONS` set spanning 55-75%; equity = TPC × (1 − LTC). New `ltc` field on `DealInputs`. Per-kind recompute case added to the 1000-iteration template test (now 67k seeded generations across `allKinds`). Every Mortgage-UW / Development / Portfolio-mgmt GAP from `docs/interview-questions.md` is now mapped to shipped content.
- **Consolidation pass: `useChallengeRunner` hook (shipped)** — The Daily / Weekly / Head-to-head play loops were three near-identical state machines (~50 lines each: index, raw input, attempts array, per-step + total timers, refocus ref, score-and-advance-or-finalize logic). Extracted into `src/hooks/useChallengeRunner.ts` with `{ questions, onComplete }` -> `{ index, raw, setRaw, attempts, inputRef, submit, isFinished, totalMs }`. The three screens each got a small `*Player` sub-component that mounts only during the playing stage, uses the hook, and renders its own surrounding chrome (the per-screen "you are host" hint, the shared question-card layout, etc.). Net: ~150 lines of duplication deleted; future challenge variants are cheap. Behavior unchanged — 586/586 tests pass, bundle within ±0.5 KB of pre-refactor.
- **Question-base depth pass — Phase 1 (shipped)** — Audit revealed catalog distribution was heavily skewed: 88% of quiz templates tagged for `acquisitions`, longform layer had zero cases for `development` and `mortgageUw`, and asset-class skew was severe (hotel = 0 situationals, retail = 1, industrial = 2 vs MF/office at 11/9). This phase adds 7 pieces of content + 1 quiz template + extends `AssetClass` to include `'hotel'`. **3 longforms**: `dev-feasibility-memo` (development IC defense of a ground-up MF dev pencil), `loan-committee-memo` (mortgageUw credit memo on a stressed-market office permanent), `am-noi-diagnosis` (assetMgmt diagnostic on Year-2 NOI miss). **3 situationals**: `hotel-revpar-divergence` (RevPAR Index decomposition), `retail-percentage-rent-clause` (haircut + risk separation underwriting), `industrial-truck-court-bid` (physical-spec premium defense). **1 quiz template**: `capexReserveSizing` (closes the lone unaddressed `interview-questions.md` GAP — `reserve = SF × $/SF/yr × hold years`, mirrors `leaseUpReserve` shape, paired with the existing `capex-reserve-discipline` situational). Hotel asset class added with cap-rate band 6.5-9.5%, exit cap 7-10%, OpEx ratio 55-75% (operating-asset reflective). 586 → 587 tests; bundle 442.6 → 454.1 KB gzipped (+11.5 KB — most of it is the longform prose). Phases 2-4 queued (walkthrough role/asset retrofit + 2 new walkthroughs; modeling-test asset-class expansion; vocab depth pass).

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

> ✅ **Shipped.** Foundation + expansion both delivered. 11+ templates across `src/excel/templates/`. Kept here as historical reference for the architecture call.

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

## Design spec — Modeling test mode

> ✅ **Shipped.** All architecture in this spec landed. Templates 1-3 from the original spec shipped + three additional (construction loan sizing, refi-vs-sell Y5 decision, distressed-office basis-play) for 6 total. Achievements (Modeling Apprentice / Pro / Clean Sheet) wired. Auto-save / resume working. Modeling Pro now requires passing all 6.

### Why
Existing Excel mode is a recall drill: write one formula, get judged on that formula. Real interview take-homes and on-the-job modeling tests are different — you're handed a partial template, you fill in many cells, and you're judged on whether the bottom-line outputs (IRR, exit value, max loan) come out right. This mode closes the gap between "I can write `=IRR(B2:B7)`" and "I can build a model an MD will trust."

Sits alongside one-shot Excel mode in the sidebar; doesn't replace it. Different cadence: drill is 60–90 s per question, modeling test is 15–25 min per template.

### Mode shape
- User opens a template. Assumption cells are pre-filled and locked. Target cells are empty and editable.
- User fills cells in any order (no per-cell submission, no required sequence).
- "Save & exit" + "Submit" buttons. Auto-save on every formula edit (debounced ~500 ms).
- On submit: run user formulas through the existing parser/evaluator, compare designated outputs against the answer key, surface diagnostics from checkpoint cells.
- No formula-structure grading — too prescriptive past one-shot scope. Two analysts can model the same thing with different valid sheets; we grade outputs.

### Grading model
- Each template defines:
  - **3-6 designated output cells** — the bottom-line numbers an interviewer would care about (year-5 NOI, exit value, levered IRR, equity multiple, max loan, etc.).
  - **2-3 checkpoint cells** — diagnostic-only intermediates (annual debt service, year-3 NOI, loan constant). They don't count toward pass/fail; they exist to tell a user *why* an output is wrong.
- **Pass = every designated output within tolerance.** No partial credit on outputs — modeling tests in the real world are pass/fail.
- **Score** displayed alongside pass/fail = `outputsCorrect / outputsTotal` for ranking attempts and showing improvement over time.
- Tolerance per output: relative for IRRs/multiples (`rel: 0.005` = ±50 bps on a 12% IRR), absolute for $ amounts (`abs: 1000`).
- On a failed submission: every wrong output renders a `whenWrongTry` hint *plus* surfaces any checkpoints that are also wrong, with their `diagnostic` text. ("Levered IRR is off → year-3 NOI checkpoint is also off → recheck OpEx growth in row 8.")

### Data model

```ts
interface ModelingTestTemplate {
  id: string;
  title: string;                 // "5-Year DCF — Suburban Office"
  scenario: string;              // 2-4 sentence narrative
  brief?: { paragraphs: string[]; bullets?: string[] };
  estimatedMinutes: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  assetClass?: AssetClass;
  sheet: SheetSetup;
  outputs: OutputCell[];         // 3-6
  checkpoints: CheckpointCell[]; // 2-3
  rubric: string;                // post-grading narrative explaining what good looks like
}

interface SheetSetup {
  rows: number;
  cols: number;
  cells: {
    ref: string;                 // "B4"
    value: string | number;      // assumption value or section label
    locked?: boolean;            // locked cells render filled but uneditable
    label?: string;              // adjacent column header / row label for clarity
  }[];
}

interface OutputCell {
  ref: string;                   // "B27"
  label: string;                 // "Levered IRR"
  expected: number;
  tolerance: { abs?: number; rel?: number };
  whenWrongTry: string;          // hint shown post-grading if this output is wrong
}

interface CheckpointCell {
  ref: string;                   // "D14"
  label: string;                 // "Annual debt service"
  expected: number;
  tolerance: { abs?: number; rel?: number };
  diagnostic: string;            // "If this is off, your CFADS and IRR will both diverge"
}
```

### Persistence
- `learncre.profile.<id>.modelingTest.<templateId>.draft.v1` — `{ formulas: Record<ref, string>, lastEdited: ts }`. Written on every formula edit, debounced.
- `learncre.profile.<id>.modelingTest.history.v1` — rolling array of last 50 submitted attempts: `{ templateId, formulas, score, outputResults, checkpointResults, durationMs, completedAt }`.
- Setup screen reads draft existence to show "Resume" vs "Start" per template.

### UI

**ModelingTestSetup**
- List of templates: title · est. minutes · difficulty pill · status badge (`Not started` / `In progress` / `Passed` / best-attempt score).
- Click a template → show scenario + brief in a confirm panel → Start (or Resume).

**ModelingTestScreen**
- Top: title + collapsible scenario/brief panel (default open on first visit, collapsed thereafter).
- Center: editable spreadsheet grid reusing `ExcelGrid`. Locked cells render with a paper-tinted background; editable cells use the existing formula bar pattern from one-shot Excel.
- Right rail (or bottom on mobile): focused-cell context — label, what it represents, no answer hints. A "designated output" badge marks the high-stakes cells so the user knows what's being graded.
- Bottom-right: persistent timer (count-up, untimed v1 — just shows elapsed). Save & exit / Submit buttons.

**ModelingTestResults**
- Headline: pass/fail badge + score % + duration.
- **Outputs panel**: each output cell with expected vs actual, ✓/✗, `whenWrongTry` hint if wrong.
- **Checkpoint diagnostics**: only shown when at least one output is wrong. Each wrong checkpoint displays its `diagnostic` text. Visually links checkpoint → which output(s) it explains.
- **Rubric reveal**: narrative paragraph explaining what a good model looked like.
- Buttons: "Try again" (clears formulas, resets draft) · "View my formulas" (read-only sheet) · "Pick another template".

### Three starter templates

#### Template 1 — `dcf-5yr-suburban-office` (intermediate, ~20 min)
**Scenario:** $50M suburban office acquisition, 5-year hold. Underwrite NOI growth, exit, and capital structure; report unlevered + levered IRR.
**Sheet:** assumption block (purchase price, going-in cap, year-1 NOI, NOI growth schedule, exit cap, sale costs %, LTV, rate, amort) + year-by-year roll (NOI, debt service, unlevered CF, levered CF, exit value yr 5, net sale proceeds yr 5).
**Outputs (5):** year-5 NOI · exit value · net sale proceeds · unlevered IRR · levered IRR.
**Checkpoints (2):** annual debt service · total levered cash returned over hold.

#### Template 2 — `loan-sizing-three-constraint` (intermediate, ~15 min)
**Scenario:** Permanent loan on stabilized industrial. NOI $5M, value $80M. Lender uses 1.25× DSCR / 75% LTV / 8% debt yield. Solve max loan that passes all three; identify the binding constraint.
**Sheet:** assumption block (NOI, value, rate, amort, three thresholds) + calculation block (max loan from each constraint, binding-constraint label, final max loan = MIN of three).
**Outputs (5):** max loan (DSCR) · max loan (LTV) · max loan (debt yield) · binding constraint name · final max loan.
**Checkpoints (1):** loan constant.

#### Template 3 — `acq-proforma-sensitivity` (advanced, ~25 min)
**Scenario:** $40M multifamily acquisition. Build trended NOI yr 1-5, build a 5×5 sensitivity matrix (going-in cap × exit cap → levered IRR), and report base-case equity multiple.
**Sheet:** assumption block + NOI roll (5 yrs) + 5×5 sensitivity grid with axis cells pre-labeled.
**Outputs (5):** year-5 NOI · base-case levered IRR · base-case equity multiple · sensitivity corner [5.0% in / 5.0% out] · sensitivity corner [6.0% in / 7.0% out].
**Checkpoints (1):** any one mid-cell of the sensitivity matrix.

### Architecture
- `src/types/modelingTest.ts` — interfaces above.
- `src/excel/modelingTest/templates/<id>.ts` — one file per template.
- `src/excel/modelingTest/grade.ts` — pure function: `(template, userFormulas) → GradingResult`.
- `src/components/ModelingTestSetup.tsx`, `ModelingTestScreen.tsx`, `ModelingTestResults.tsx`.
- `src/hooks/useModelingTest.ts` — reducer + debounced auto-save.
- `'modelingTest'` mode in `App.tsx` and `SideNav.tsx` (Apply section, sibling to Excel).
- Reuses `src/excel/parser.ts`, `src/excel/evaluate.ts`, and `src/components/ExcelGrid.tsx` — no new evaluation code.
- Session record `kind: 'modelingTest'` so attempts appear in profile history and feed XP.

### XP / progression
- Pass = +XP scaled by template difficulty: beginner 75 · intermediate 150 · advanced 250.
- Failed attempt with score ≥ 60% = consolation 25 / 50 / 75 (don't reward random guesses; reward "almost right").
- First-time pass per template fires an achievement-eligible event.

### Achievements (proposed)
- **Modeling Apprentice** — pass any 1 template.
- **Modeling Pro** — pass all 3 starter templates.
- **Clean Sheet** — pass a template with 100% on outputs *and* checkpoints.

### Validation
Per template, ship three unit tests:
1. Fill with the canonical correct formulas → grading returns pass with all outputs ✓ and all checkpoints ✓.
2. Fill with deliberately-wrong formulas in known cells → grading flags the right outputs as ✗ and the corresponding checkpoint diagnostic surfaces.
3. Empty sheet → grading returns fail and all outputs flag as missing.

This catches answer-key drift any time the parser/evaluator or template changes.

### Out of scope (v1)
- Timer / time-pressure mode (v2 — opt-in; show elapsed only in v1).
- Multi-tab templates (single sheet only).
- Charts inside the grid.
- Companion text-question accompanying the model (e.g., "in 2 sentences, why did you pick this exit cap?").
- AI-graded narrative rubrics.
- Sharing your submitted model as a URL.

### Adjacent ideas to bundle later
- **Auditor mode** — given a model with 1-3 injected errors, find and fix them.
- **Speed mode** — opt-in clock with a per-template leaderboard once cloud lands.
- **Per-template study guide** link → Study tables.
- **Model export** to actual `.xlsx` for users to keep / share with mentors.
- **Template authoring tool** — internal-only screen to draft + verify new templates without hand-editing TS.

---

## Design spec — Situational case studies

> ✅ **Shipped.** Foundation + expansion both delivered. Catalog grew from the spec's 12-case starter set to 69 cases across 8 categories (pricing, absorption, risk, investment thesis, diagnostic, lease econ, comp selection, sensitivity). Achievements (Reasoning Apprentice, Diagnostic Eye) wired.

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

1. ✅ Situational foundation + expansion (now 69 cases across 8 categories)
2. ✅ Excel formula mode foundation + 11+ templates
3. ✅ Mock interview mode + 8 firm archetypes + run history
4. ✅ Theme 2 — capital-stack waterfalls, document literacy, vocab speed-drill, construction draws + cost overrun, asset-class-native math
5. ✅ Certifications — 5 role certs + benchmark exam + downloadable artifact
6. ✅ Sidebar navigation refactor (TopNav → SideNav, 4-section grouping)
7. ✅ PR Z — Modeling test mode + 6 templates (DCF, loan sizing, construction loan, MF pro-forma, refi-vs-sell, distressed basis-play)
8. ✅ Onboarding — welcome modal + per-mode primers + Tour Guide achievement
9. ✅ Visualization Foundations batch — 20 viz (per-SF/unit, cap/DSCR/GRM, operating ratios, yield/exit, NER/WALT/CAGR)
9b. ✅ Visualization Returns/Promote batch — 10 viz (pref/catch-up/waterfall/promote, levered IRR, hold-vs-sell, post-promote IRR, DSCR-rate sensitivity, extension drag, taxAdjustedExit waterfall)
9c. ✅ Visualization Construction draws batch — 5 viz (cost to complete, draw allocation, contingency drawdown, retainage running, FF&E reserve)
9d. ✅ Visualization Niche/asset-class batch — 12 viz (Hotel: RevPAR, GOP, RevPOR vs RevPAR; Retail/Industrial: % rent breakpoint, clear-height premium, truck-doors/SF; Operating: tax reassessment, opex change, NOI from OER, TI payback, TI/SF/yr-of-term, renewal-prob-weighted rent). Catalog closed at 63/63 once `taxAdjustedExit` shipped (DealInputs extended with sale proceeds + accumulated dep + tax rates + sale cost rate).
10. ✅ Modeling test UX polish (full: ⌘↵ next-empty, ⌘D fill-from-left, sticky-left row labels, ⌘↑/⌘↓ formula history)
11. ✅ Quiz / situational / walkthrough GAPs from `docs/interview-questions.md` (refiStressTest + feeDragOnIrr + leaseUpReserve quiz templates shipped; distressed walkthrough was already shipped as walk-distressed-1)
12. ✅ PR L — Cloud identity foundation (frontend + SQL migration shipped; activates when user supplies Supabase project + env vars)
12b. ✅ PR M — Cross-device sync (push/pull + merge helpers + useCloudSync lifecycle hook)
12c. ✅ PR N — Public profiles (`/u/<handle>` page + 0002 RLS migration + Make-public toggle on Profile screen)
12d. ✅ PR O — Daily challenge (deterministic seed-of-the-day, 10 questions, leaderboard, 0003 migration)
12e. ✅ PR P — Curated weekly themes (6 themes shipped May–June 2026, 0004 migration)
12f. ✅ PR S — Global leaderboards (4 tabs: alltime XP, weekly XP, longest streak, daily today; 0005 migration)
12g. ✅ PR R — Friends / follows (asymmetric follows, follow button on /u/<handle>, friends feed, 0006 migration)
12h. ✅ PR T — Cohort / org leaderboards (cohorts + cohort_members + RLS, invite token, scoped XP leaderboard, 0007 migration)
12i. ✅ PR Q — Head-to-head async match (matches + accept/submit SECURITY DEFINER fns, settle on both-submitted, 0008 migration)
12j. ✅ PR U — Notifications (preferences + Edge Function dispatcher + unsubscribe page, 0009 migration). Cloud track L → U complete.

Re-sequence freely as priorities shift. Update the "In design" section when a PR lands and move the entry up to "What's shipped today".

---

## Verification

- `ROADMAP.md` renders cleanly on GitHub (preview locally with `npx serve` or open in any markdown viewer)
- README "Planned" section links here
- Every shipped commit referenced is verifiable via `git log --oneline`
- Anyone can pick up the Situational or Excel design spec and start coding without further design conversation
