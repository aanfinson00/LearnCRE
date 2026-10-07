# Rocket Run — mini-game spec

**Status:** draft for review · **Mode id:** `rocket` · **Route:** `/rocket` · **Nav:** Drill → "Rocket run"

## 1. Pitch

Each correct answer fires the rocket's engines. Its points come from **accuracy × speed**,
and they launch the rocket higher. While you think, the rocket burns fuel. Take too long and
the tank runs dry: the engine cuts out and the rocket starts **falling**. Answer correctly
before it hits the ground and the engine relights. If it hits the ground, the run is over.

Your score is the **peak altitude** you reach.

The loop teaches the same mental math as Quiz mode but adds time pressure you can see. A slow
answer still counts, but it costs fuel. A fast, sloppy answer earns nothing.

## 2. Core loop

```
 ┌─ question shown ── fuel drains ──┬─ answer submitted ─┐
 │                                  │                    │
 │   fuel > 0 → rocket HOVERS       │  correct → BOOST: altitude += points × 25 m
 │   fuel = 0 → rocket FALLS        │            refuel, combo +1
 │   altitude ≤ 0 → CRASH (end)     │  miss    → no boost, fuel −10, combo reset
 │                                  │  skip    → no boost, combo reset
 └──────────────────────────────────┴─ reveal (clock frozen) → next question
```

Three visible states while a question is open:

| State | When | What the player sees |
|---|---|---|
| **Hover** | fuel > 25 | Rocket holds altitude, small steady flame, fuel gauge draining |
| **Low fuel** | 0 < fuel ≤ 25 | Flame sputters, gauge flashes, "LOW FUEL" warning |
| **Flameout / falling** | fuel = 0 | Flame off, smoke trail, rocket drops faster and faster, altimeter turns red |

**On the pad:** before the first correct answer the rocket is on the launch pad. No fuel
drains and it can't crash. Your first correct answer is the launch.

**Reveal:** after you submit, the clock **freezes** while the boost animation plays. A compact
result strip shows your answer, the correct value, points and refuel. Enter or Next moves on.
Full worked solutions wait for the end-of-run review, so reading them never costs fuel.

## 3. Scoring

All scoring is a **pure function** of `(question, userInput, elapsedMs, streak)`. The same
inputs always give the same points, so the score can later be recomputed server-side for
leaderboards (as `bfa023a` already does for daily/weekly).

### 3.1 Accuracy points (0–100)

This builds on `scoreAnswer()` in `src/quiz/tolerance.ts`, which already returns `deltaPct` /
`deltaAbs` and the question's tolerance band.

```
err      = |delta| / band          // 0 = exact, 1 = edge of tolerance
outside band (err > 1)   → 0      (MISS)
inside band              → 50 + 50 × (1 − err)     // 50 at the edge, 100 when exact
err ≤ 0.10               → 100 + "BULLSEYE" tag
```

### 3.2 Speed multiplier (1.0×–2.0×)

```
speedMult = 1 + max(0, 1 − t / par)
```

| Difficulty | `par` (s) | Answer in ¼ par | Answer at par or slower |
|---|---|---|---|
| Beginner | 20 | 1.75× | 1.0× |
| Intermediate | 30 | 1.75× | 1.0× |
| Advanced | 45 | 1.75× | 1.0× |

Slow answers are not penalized here. Fuel already handles that.

### 3.3 Difficulty and combo

- `diffMult` = 1.0 / 1.5 / 2.0 for beginner / intermediate / advanced
- `combo` = `1 + min(streak, 10) × 0.05`. This is the same curve as `xpForAttempt`, so it caps at 1.5×.

### 3.4 Points → altitude

```
points   = round(accuracy × speedMult × diffMult × combo)    // max ≈ 600
altitude += points × 25 m                                     // animated over ~1.2 s, ease-out
```

At 25 m per point, a strong 15-question run reaches about 100 km, the edge of space. That gives
the run a natural goal (§6).

**Worked example.** An intermediate question answered in 10 s, with the error at 40 % of the
band and a streak of 2:
`accuracy = 50 + 50×0.6 = 80` · `speedMult = 1 + (1 − 10/30) = 1.67` · `diffMult = 1.5` ·
`combo = 1.10` → **220 pts → +5,500 m**.

## 4. Fuel

Fuel is a single tank of 0–100 units. It **carries over** between questions, so a fast answer
saves fuel for a hard one later.

| Rule | Value |
|---|---|
| Starting fuel | 100 (full) |
| Capacity | 100 |
| Drain while a question is open | 3.0/s beginner · 2.25/s intermediate · 1.5/s advanced (a full tank lasts ~33 s / ~44 s / ~67 s) |
| Drain while on the pad or during reveal | 0 |
| Refuel on a correct answer | `30 + 20 × (accuracy − 50) / 50` → 30–50 units |
| Miss | −10 units (stops fast random guessing from refueling you) |
| Skip | ±0 |

**Balance check (intermediate):**

| Typical answer time | Fuel per question |
|---|---|
| 15 s | Drains ~34, refuels ~40. You hold steady. |
| 25 s | Drains ~56, refuels ~40. You lose ~16, so the tank runs dry around question 6 and you start losing altitude. |
| 10 s | You stay full. |

## 5. Falling and crashing

Once fuel hits 0:

```
fallSpeed(t) = min(g × t, terminal)      g = 100 m/s², terminal = 2,000 m/s
```

- t counts seconds since flameout. It resets whenever you refuel.
- After 10 s of flameout you've dropped ~5,000 m, about one average answer's worth.
- A **correct answer while falling** stops the fall immediately and boosts from the current
  altitude.
- A **miss while falling** doesn't stop the fall, and its −10 fuel penalty just stays at 0.
- **Crash:** altitude ≤ 0 after liftoff ends the run. Score = peak altitude reached.

Altitude is computed from timestamps (`Date.now()`), not by counting frames. That way a slow
device or a background tab can't change the outcome. The clock **keeps running when the tab is
hidden**. To stop, use the explicit Pause button, which hides the question.

## 6. Altitude bands (sky + milestones)

| Band | Altitude | Visual | Achievement |
|---|---|---|---|
| Launch pad | 0 | Ground, gantry | — |
| Troposphere | 0–12 km | Blue sky, clouds | — |
| Stratosphere | 12–50 km | Deep blue, thin clouds | *Stratospheric* |
| Mesosphere | 50–80 km | Indigo, first stars | *Mesosphere* |
| Thermosphere | 80–100 km | Near-black, stars | — |
| **Space** (Kármán line) | ≥ 100 km | Black, Earth curve | *Escape velocity* |

Other achievements to add to `src/quiz/achievements.ts`:

- *Bullseye ×5*: five bullseyes in one run.
- *Deadstick*: a correct answer while falling below 2 km.
- *Clean flight*: finish a mission without ever flaming out.

## 7. Run setup

Rocket Run reuses the quiz engine's inputs (`generateQuestion`) and keeps the setup to one screen:

| Option | Choices | Default |
|---|---|---|
| Length | **Mission** (15 questions) · **Endless** (until crash) | Mission |
| Difficulty | Beginner · Intermediate · Advanced · **Ramp** | Ramp |
| Categories | Same picker as Quiz | All |
| Answer mode | Free-form · Multiple choice | Free-form |
| Tolerance | Strict · Normal · Loose | Normal |

- **Ramp difficulty:** beginner questions below 20 km, intermediate from 20–60 km, advanced
  above 60 km. Difficulty climbs with the rocket, and so do points and fuel time.
- **Multiple choice:** a correct pick scores a flat 70 accuracy and can't be a bullseye. The
  points formula is otherwise unchanged. MC runs are labeled "MC" on personal bests.

**End states:**

- Mission complete: results show the peak altitude and the "landing" altitude.
- Crashed: results show "Crashed on Q9 · peak 41.2 km".
- Ended manually.

## 8. Screen layout

```
desktop (lg+)                                  mobile
┌───────────────┬──────────────────────────┐   ┌──────────────────────────┐
│               │  Q7 / 15   combo ×1.15   │   │ ▲ 41.2 km  ⛽▓▓▓▓░░  ×1.15│ ← HUD strip
│   SKY SCENE   │                          │   │ ┌──────────────────────┐ │
│   (SVG)       │  QuestionCard            │   │ │ mini sky + rocket    │ │ ← 120px scene
│      🚀       │  (reused)                │   │ └──────────────────────┘ │
│               │                          │   │ QuestionCard             │
│  altimeter    │  AnswerInput / ChoiceList│   │ AnswerInput              │
│  fuel gauge   │                          │   │                          │
└───────────────┴──────────────────────────┘   └──────────────────────────┘
```

- **Scene:** inline SVG, matching the other `components/viz` pieces. It shows the sky gradient
  for the current band, altitude tick marks that scroll past, the rocket with flame/smoke states,
  and floating "+220" points text on each boost.
- **Brand:** use the existing tokens. Copper is the flame, warm-black is space. Motion uses the
  existing `cubic-bezier(0.22, 1, 0.36, 1)` easing.
- **`prefers-reduced-motion`:** no screen shake or parallax. Altitude changes become quick
  crossfades. Flame states stay, as static icons.
- **Keyboard:** Enter submits/advances, `P` pauses, Esc ends the run (with confirm). Wire these
  through the existing `useKeyboard`.
- **Sound:** none in v1.

## 9. Results screen

- Peak altitude with its band badge. Below it: crashed / landed, questions answered, accuracy,
  average answer time, bullseyes, best combo, total flameout time.
- **Flight chart:** altitude over time as a sparkline (reuse `Sparkline.tsx`), with dots for
  boosts and red segments for falling.
- Personal best per profile, split by Mission/Endless × difficulty.
- **"Review answers"** opens the existing `ReviewScreen` with full math and tips for every question.

## 10. Progression integration

- **XP:** each correct answer grants normal `xpForAttempt` XP (difficulty + speed + streak), so
  Rocket Run creates no second XP economy. Altitude is game score, not XP.
- **Session record:** add `'rocket'` to `SessionRecord.kind` (`src/types/profile.ts`) and call
  `recordSession` at the end of the run. Also call `recordAttempt` and `recordMistake` per
  answer, so misses feed the mistake bank and spaced repetition like they do in Quiz.
- **Analytics:** `rocket_started`, `rocket_crashed` (question index, peak), and
  `rocket_completed`, via `track()`.
- **Gating:** none. The game is meant as an approachable on-ramp. *(See open questions.)*

## 11. Implementation plan

| File | What |
|---|---|
| `src/quiz/rocket.ts` | Pure functions and the constants table: `accuracyPoints`, `speedMult`, `pointsFor`, `refuelFor`, `fuelAt`, `altitudeAt`, `rampDifficulty`. All tuning lives in one exported `ROCKET_TUNING` object. |
| `src/quiz/__tests__/rocket.test.ts` | Formula edges (exact, band edge, just outside), the worked example in §3.4, fuel carry-over and cap, fall curve and terminal velocity, crash detection, ramp thresholds, and the miss-spam guard (rapid misses never increase fuel). |
| `src/hooks/useRocketRun.ts` | Reducer (`setup → onPad → question → reveal → … → crashed/complete`), timestamp clock driven by `requestAnimationFrame`, wraps `generateQuestion` + `scoreAnswer`. |
| `src/components/rocket/` | `RocketSetup`, `RocketScreen`, `RocketScene` (SVG), `RocketHud`, `RocketResults`. Reuses `QuestionCard`, `AnswerInput`, `ChoiceList`, `ReviewScreen`. |
| `src/modes/RocketMode.tsx` | Mode shell, loaded lazily like the other modes. |
| `src/router.ts`, `SideNav.tsx` | Add `'rocket'` → `/rocket`; nav item under Drill. |
| `ModePrimer`, `WelcomeModal` | First-visit primer blurb. |
| `src/quiz/achievements.ts` | The achievements in §6. |
| `src/storage/` | `rocket.best.v1` personal bests per profile. |

**Suggested PR split:**

1. Pure scoring/physics module + tests.
2. Hook + playable screen with a plain HUD (no art).
3. SVG scene, animations, reduced motion.
4. Results, review, personal bests, achievements, XP/session wiring.

## 12. Acceptance criteria

- [ ] On the pad, the rocket never drains fuel or crashes. The first correct answer launches it.
- [ ] With a question open and fuel > 0, altitude holds. At fuel = 0, it falls per §5.
- [ ] A correct answer while falling stops the fall in the same frame and boosts.
- [ ] Clock and fuel are frozen during reveal and pause. Pause hides the question.
- [ ] A hidden or backgrounded tab does not slow or stop the clock.
- [ ] Same inputs give the same points (unit tested), and the worked example yields 220.
- [ ] Ten rapid wrong answers leave fuel lower than it started.
- [ ] Crash ends the run and shows the peak altitude. A 15-question mission ends on the last reveal.
- [ ] XP, session history, mistake bank and achievements all update.
- [ ] Works in the standalone build (`#/rocket`) and at 375 px width with no horizontal scroll.
- [ ] Typecheck, tests and both builds pass in CI.

## 13. Out of scope for v1

- Leaderboards / daily rocket seed. Server-side verification of altitude will reuse the pure
  scoring module, which is why it's pure.
- Sound and haptics.
- Power-ups (shield, fuel drop) and rocket skins unlocked by tier.

## 14. Open questions

1. **Score = peak altitude or final altitude?** This spec uses peak, which is friendlier and
   still punishes slowness through crashes. Final altitude would make every second of falling cost score.
2. **Fuel carry-over vs. a fresh tank per question.** Carry-over (as specced) rewards banking
   fast answers, but a beginner who falls behind can spiral. Fallback: a minimum 10 s of fuel at
   the start of each question.
3. **Gate it?** Ungated is proposed. Alternatively, match Speed Drill's gate (Analyst I or 30 questions).
4. **Calculator / scratch sheet allowed?** Proposed yes. They cost time anyway.
5. **Name.** "Rocket Run" vs "Liftoff" vs "Escape Velocity".
