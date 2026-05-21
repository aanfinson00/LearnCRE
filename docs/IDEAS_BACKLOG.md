# Ideas backlog — deduped from daily brainstorms

The deduped, status-annotated distillation of the daily LLM-brainstorm snapshots produced by `brainstorm-daily.py` (run locally via launchd; not in-repo). Each new dated dump lands in [`brainstorm-archive/`](./brainstorm-archive/); the script's rolling `docs/IDEAS_TO_IMPLEMENT.md` working file stays gitignored to avoid conflicts with the Claude Code cloud agent. When a dated snapshot is reviewed, surviving ideas get merged into **this** file with a status tag.

This is the **brainstorm-side** backlog. The hand-curated active backlog (Question-base depth pass Phases 2-4 + Adjacent / nice-to-have) lives in [`../ROADMAP.md`](../ROADMAP.md). Brainstorm ideas that overlap an Adjacent bullet are marked `merge: <anchor>` below — work them in `ROADMAP.md`, not here.

**Snapshots merged:** `IDEAS_TO_IMPLEMENT.2026-05-12.md`, `IDEAS_TO_IMPLEMENT.2026-05-19.md`, `IDEAS_TO_IMPLEMENT.2026-05-20.md`. The May 19 file also has a runaway "End of Document / Final Thoughts" LLM-hallucination tail and a corrupted `Source subsystem(s)` field on row #18 (cloud-synced analytics) — clean values in the dedupe table below; archived file kept as-is for provenance.

---

## Already shipped (do not re-pitch)

Brainstorm ideas that recur across snapshots but already exist per `ROADMAP.md`. Each line links to the shipped entry in the ROADMAP archive.

- **Auto-sync of progress / quiz results** (May 12 #4, May 20 #3) → PR M Cross-device sync.
- **Leaderboards** in any form — by difficulty, by category, by total XP (May 12 #5, #14, May 19 #5, #16, May 20 #7) → PR S Global leaderboards (4 tabs) + PR T Cohort leaderboards.
- **Daily challenge / streak in week** type achievements (May 12 #12, May 20) → PR O Daily challenge + 19 shipped achievements.
- **Cloud sync visual indicators / status UI** (May 12 #6) → covered by `useCloudSync()` lifecycle hook + sign-in panel state.
- **Personalized recommendations / targeted weakness practice** (May 12 #7, May 19 #15, #20, May 20 #13) → Mistake bank with spaced-repetition weighting toward weak categories (shipped under Persistence).
- **Achievement for completing all modeling-test checkpoints clean** (May 12 #8) → Clean Sheet achievement (shipped).
- **Achievement gallery / icons / progress UI** (May 12 #15, May 19 #12, #22) → Profile screen achievements gallery (shipped).
- **Notification preferences settings menu** (May 19 #9, #21) → NotificationPreferencesCard on Profile screen (PR U).
- **Adaptive difficulty by user performance** (May 19 #3, May 20) → Dynamic difficulty tier (shipped under Question framework).
- **Interactive onboarding / tutorial mode** (May 20 #15) → Welcome modal (4 slides) + per-mode primers (shipped under Onboarding).
- **Achievement for complex scenario completion** (May 20 #8) → Modeling Pro (pass all 6 modeling-test templates).
- **Cap rate compression sensitivity drill** (May 19 #1) → cap-compression speed-drill variant (shipped under Speed Drill 9 variants).
- **Cert progress widget** (May 19 #6) → Profile screen tier ladder + by-difficulty bars + Certify mode benchmark (shipped).

---

## Already out of scope (do not re-pitch)

Brainstorm ideas that map to an entry in `ROADMAP.md` → ❌ Out of scope.

- **Real-time collaboration / live races** (May 12 #2) → Real-time multiplayer is out of scope; async head-to-head (PR Q) is the chosen substitute.
- **Personalized coaching with experienced real estate professionals** (May 12 #3) → out of scope (humans + LLM dependency).
- **Push notifications** for any event (May 12 #9, #16, May 20 #1) → out of scope; email-only is the lane (PR U). Listed explicitly in ROADMAP "Out of scope".
- **Video walkthroughs / video tutorials** for cap rate / IRR / DSCR (May 19 #14, #19, #24) → out of scope (bundle bloat + hosting + clashes with singlefile build). Listed explicitly in ROADMAP "Out of scope".

---

## Open ideas — ranked

Deduped across the 3 snapshots. `Total` is the max score across days the idea appeared; `Sources` lists the originating dump dates. `Status`:

- `new` — not represented in ROADMAP, candidate for promotion
- `merge: <anchor>` — overlaps an existing Adjacent / nice-to-have bullet in `ROADMAP.md`; canonical entry stays there
- `extends: <feature>` — incremental polish on top of a shipped feature; weigh against just doing it inline

| # | Idea | Bucket | Source subsystem(s) | Impact | Novelty | Feasibility | Total | Sources | Status | Why a user cares |
|---|------|--------|---------------------|--------|---------|-------------|-------|---------|--------|------------------|
| 1 | Adaptive XP rewards keyed to user performance history (rolling-window quality bonus on top of base + speed + streak) | new-feature | xp-and-achievements, certification-and-progression | 5 | 4 | 4 | 13 | 5-12, 5-20 | new | Rewards sustained high performers proportionally; deepens the existing XP curve without breaking it |
| 2 | Daily XP cap for speed drills (anti-grind + variety nudge) | new-use | xp-and-achievements, speed-drill | 4 | 3 | 4 | 11 | 5-20 | new | Prevents farming and encourages varied drill engagement |
| 3 | Achievement milestones for mastering DSCR / IRR / NER / waterfall families ("Mastery Track") | UX | xp-and-achievements | 4 | 4 | 3 | 11 | 5-20 | extends: 19 shipped achievements | Per-metric mastery is finer-grained than the current breadth-of-modes ladder |
| 4 | Daily XP graph on the dashboard (split by mode) | UX | xp-and-achievements | 4 | 4 | 2 | 10 | 5-20 | extends: Profile screen | Surfaces habit shape, not just totals |
| 5 | Conflict-resolution UI when local diverges from cloud (manual pick) | new-feature | cloud-sync-and-social | 3 | 4 | 3 | 10 | 5-20 | new (limited — current merge is union-and-max, so conflicts are rare) | Restores user control on the edge cases the auto-merge can't resolve |
| 6 | Version history view of achievements / mistakes ("where did I improve") | UX | cloud-sync-and-social, xp-and-achievements | 5 | 2 | 3 | 10 | 5-20 | merge: [`end-of-session-diff`](../ROADMAP.md#end-of-session-diff) | Variant of "what changed" — extend that bullet to cover longer time horizons |
| 7 | Advanced benchmark analytics — performance by difficulty × category over time | new-feature | certification-and-progression, xp-and-achievements | 4 | 4 | 3 | 10 | 5-20 | extends: Profile screen / Certify benchmark | Higher-resolution view of the same data; could replace the bare accuracy trend |
| 8 | Specialization-track certifications (pick "debt sizing" or "lease economics" sub-paths) | new-feature | certification-and-progression | 3 | 4 | 3 | 10 | 5-20 | new | Layers on top of the 5 role certs; first move would be sub-cert badges within an existing cert |
| 9 | Customizable XP thresholds for streak bonuses (let users tune) | new-feature | xp-and-achievements | 4 | 3 | 2 | 9 | 5-20 | new (low priority — settings creep) | Niche; defer until users ask |
| 10 | Personal learning goals per question kind (target N correct of kind X this month) | new-use | certification-and-progression | 4 | 3 | 2 | 9 | 5-20 | new | Alignment with study-plan workflows; small surface |
| 11 | Highlight recent achievement on home / setup screen | UX | xp-and-achievements | 4 | 3 | 1 | 8 | 5-20 | extends: toast-on-unlock (shipped) | Persistence of "you just earned X" beyond the toast lifetime |
| 12 | Better error messages on sync failure (network vs constraint vs RLS) | UX | cloud-sync-and-social | 3 | 3 | 2 | 8 | 5-20 | new | Currently auth failures are visible but sync errors are silent |
| 13 | Selective sync (achievements only / mistakes only) | new-feature | cloud-sync-and-social | 4 | 3 | 1 | 8 | 5-20 | new (low priority) | Niche storage / privacy preference; weigh against complexity of partitioning `pushAll/pullAll` |
| 14 | Cap rate compression sensitivity *analysis* — deeper than the existing speed-drill variant; multi-scenario sweeps in modeling-test mode | new-use | quiz-engine-and-difficulty | 5 | 4 | 4 | 13 | 5-19 | extends: speed-drill cap-compression variant + modeling-test acq-proforma-sensitivity | Pure-math sensitivity scope expanded to multi-variable sweeps |
| 15 | Personalized email notifications on milestone hits | new-use | certification-and-progression, xp-and-achievements | 5 | 3 | 4 | 12 | 5-19 | extends: PR U weekly digest + daily reminder | Milestone-specific email would slot into the existing send-notifications Edge Function |
| 16 | User-created custom quizzes (cloud-synced) | new-use | cloud-sync-and-social, quiz-engine-and-difficulty | 5 | 3 | 4 | 12 | 5-19 | new (large surface — would need authoring UI + storage table + RLS) | Closer to LMS-content-builder than the current curated catalog; consider scope carefully |
| 17 | Auto-format axis values in drills with predefined rounding rules | UX | speed-drill, quiz-engine-and-difficulty | 4 | 2 | 5 | 11 | 5-19 | new (low priority) | Marginal readability gain |
| 18 | Sortable variant outputs in speed drill (ascending / descending) | UX | speed-drill | 4 | 3 | 4 | 11 | 5-19 | new | Niche power-user feature |
| 19 | Achievement-sharing UI with personal notes | UX | cloud-sync-and-social | 4 | 3 | 4 | 11 | 5-19 | new (consider whether public profile / followers feed already covers this) | Caption-on-share is a small enhancement on existing share-URL flow |
| 20 | Detailed input hints inside drill variants (DSCR / IRR-to-equity formulas, expected format) | UX | quiz-engine-and-difficulty, speed-drill | 4 | 2 | 5 | 11 | 5-19 | merge: [`hint-reveal`](../ROADMAP.md#hint-reveal) | Subsumed by graduated hint reveal; tighten that bullet |
| 21 | Dynamic achievement icons that change with mastery level | UX | xp-and-achievements | 4 | 3 | 4 | 11 | 5-19 | new (low priority) | Visual polish on an already-shipped gallery |
| 22 | Achievement tooltips / pop-ups with detail-on-hover | UX | xp-and-achievements | 4 | 2 | 5 | 11 | 5-19 | new (small UX polish) | Discoverability of what each badge means |
| 23 | Adaptive responsive layout polish (orientation, narrow viewports) | UX | quiz-engine-and-difficulty, speed-drill | 4 | 2 | 5 | 11 | 5-19 | extends: existing responsive layout | Specific viewport issues should be filed as bugs, not roadmap items |
| 24 | Cloud-synced detailed performance analytics over time | new-use | certification-and-progression, cloud-sync-and-social | 4 | 3 | 4 | 11 | 5-19 | merge: row #7 above | Same idea as row #7 (advanced benchmark analytics); collapse on next dedupe |
| 25 | Dynamic XP bonuses based on question complexity (per-kind multiplier on top of difficulty) | new-feature | xp-and-achievements, speed-drill, certification-and-progression | 5 | 4 | 4 | 13 | 5-12 | new (overlap with row #1 — adaptive history bonus is performance-based; this is kind-based) | Pay more for harder kinds, not just harder difficulty |
| 26 | Achievement unlock animations + sound effects | UX | xp-and-achievements | 3 | 2 | 4 | 9 | 5-12 | new (low priority — borderline gimmick per Council review) | Toast already covers visual; sound is opt-in territory |

---

## Rejected as generic / out-of-scope (collapsed from per-day "Dropped" sections)

- Generic formula labels / input hints in drill variants (recurring; per-question hint reveal in `ROADMAP.md` covers it).
- Generic visual-feedback tweaks (color-coded difficulty pills, animation polish) — already addressed by existing UI tokens.
- Generic interface re-organization / dashboard reshuffles ("prioritize recent progress", "switch between question types more easily") — the SideNav refactor already shipped.
- Generic detailed-explanation-on-quiz-summary screens — review screen + step-by-step solution + anchors card already cover this.
- Tolerance-band configuration as a per-question UI control — tolerance modes already exist (tight / standard / loose); per-question override is too granular.
- Cloud-based leaderboards for multi-device interaction (multiple variants pitched) — collapses into PR S already shipped.

---

## Latest council review (model: deepseek-r1:14b, May 20 snapshot)

### 🔻 Weakest entries (per council)
- **Dynamic certification paths** — too generic to gamified learning; users can already filter by question type.
- **Interactive tutorial mode for new users** — common feature, modest impact; addressed by shipped Welcome modal.
- **Interactive dashboard with pie/bar charts** — clashes with the "no chart libraries" stance in `ROADMAP.md` → out of scope.

### 💎 Hidden gems (per council)
- **Advanced analytics for benchmark results across difficulty × category** (row #7).
- **Personalized recommendation engines linked to quiz performance** — already shipped via mistake bank with spaced-repetition weighting; council was rating the brainstorm without seeing the existing implementation.

Council notes from May 12 / May 19 snapshots remain in `brainstorm-archive/` for provenance.
