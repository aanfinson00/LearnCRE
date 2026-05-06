-- LearnCRE PR S — leaderboard support
--
-- Adds best_streak column to xp_state (the local XpState interface already
-- tracks it; we just need a cloud-side column for the streak leaderboard).
--
-- All four leaderboards are computed at read-time via plain queries from
-- src/cloud/leaderboards.ts:
--   1. All-time XP — order by xp_state.total_xp desc
--   2. Weekly XP — sum sessions.payload->>'xpEarned' since ISO week start
--   3. Longest streak — order by xp_state.best_streak desc
--   4. Daily today — daily_results for today UTC, ordered by correct,time
--
-- Public visibility flows through the existing RLS policies on xp_state /
-- sessions / daily_results (public-read when linked profile.is_public).

alter table public.xp_state
  add column if not exists best_streak integer not null default 0;
