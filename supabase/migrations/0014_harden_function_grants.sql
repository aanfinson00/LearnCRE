-- LearnCRE — tighten function privileges (Supabase security advisor)
--
-- Earlier migrations used `revoke all ... from public` to make RPCs
-- signed-in only, but Supabase grants EXECUTE on new public-schema functions
-- directly to anon and authenticated, so that revoke didn't remove them.
-- Every affected function already rejects a null auth.uid(); this makes the
-- grants match the intent.

revoke execute on function public.accept_match_by_token(uuid, text) from anon;
revoke execute on function public.join_cohort_by_token(text, text) from anon;

-- is_admin() and is_cohort_member() stay callable by anon on purpose: RLS
-- policies on cohorts, cohort_members, admins and question_submissions call
-- them, and a signed-out read must see zero rows, not a permission error.
-- Both just return false without a session.

-- Trigger function: never meant to be an RPC.
revoke execute on function public.notify_friends_on_achievement() from anon, authenticated;

-- unsubscribe_by_token stays callable by anon: email unsubscribe links work
-- signed out.

-- Pin search_path on trigger functions.
alter function public.set_updated_at() set search_path = public;
alter function public.matches_assign_seed() set search_path = public;
alter function public.xp_state_guard() set search_path = public;
alter function public.sessions_xp_guard() set search_path = public;
