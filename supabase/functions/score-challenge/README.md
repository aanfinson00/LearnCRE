# score-challenge

Server-side grading for the competitive modes: daily, weekly and head-to-head. Clients never write their own scores.

## How it works

1. **Begin** → `{ action: 'start', kind, ref }`. The function checks the challenge is open (and that the caller is a participant, for matches). It then records `challenge_attempts.started_at` on the server. Restarting keeps the original start time.
2. **Finish** → `{ action: 'submit', kind, ref, answers }`. The function:
   - regenerates the exact seeded question set (`src/server/challengeScoring.ts`)
   - grades the raw answers with the same tolerance rules the app uses
   - measures time from the server-recorded start
   - writes the result with the service role
3. **Flagging:** runs faster than 2.5 s per question are recorded but `flagged`, and hidden from public leaderboards.

`kind` is one of these, with its matching `ref`:

| `kind` | `ref` |
|---|---|
| `daily` | the date, `YYYY-MM-DD` (UTC) |
| `weekly` | the challenge id |
| `match` | the match id |

The request logic lives in `src/server/scoreChallengeHandler.ts` and is unit-tested in `src/test/scoreChallengeHandler.test.ts`. `npm run build:edge` bundles it, with the question generators, into `../_shared/scoring.bundle.js`. CI fails if that bundle is stale.

## Deploy

Order matters: the database first, then the function, then the app.

```bash
supabase db push                              # applies 0013_server_scoring.sql
supabase functions deploy score-challenge     # uses SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY (set by the platform)
```

Then deploy the web app. It calls the function via `supabase.functions.invoke('score-challenge')`.

## What it does and doesn't stop

**It stops:** posting arbitrary scores or times, replaying a challenge, writing the other player's match score, choosing a match seed, and implausibly fast perfect runs reaching the leaderboard.

**It doesn't stop:** a determined user scripting the seeded questions offline. The question generators ship in the app bundle, so a bot can compute answers. Server timing plus the speed floor keeps such runs off the board unless they deliberately pace themselves. Closing that gap means salting seeds with a server secret and serving questions only after `start`.
