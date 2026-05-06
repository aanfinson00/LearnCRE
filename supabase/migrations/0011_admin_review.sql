-- LearnCRE — admin role + question-submission review extensions
--
-- Single-table admin model: a user is an admin iff they have a row in
-- public.admins. The first admin is granted via service-role / SQL editor
-- (`insert into admins (user_id) values ('<your auth.users.id>');`); after
-- that, admins can grant additional admins through the admin UI / SQL.
--
-- is_admin() SECURITY DEFINER lets RLS policies on other tables check
-- admin membership without recursion.

create table if not exists public.admins (
  user_id    uuid primary key references auth.users(id) on delete cascade,
  granted_at timestamptz not null default now(),
  granted_by uuid references auth.users(id) on delete set null
);

-- ============================================================
-- is_admin() — SECURITY DEFINER membership check
-- ============================================================
create or replace function public.is_admin()
returns boolean
language sql
security definer
stable
set search_path = public
as $$
  select exists (
    select 1 from public.admins where user_id = auth.uid()
  );
$$;
revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to authenticated;

-- ============================================================
-- RLS — admins table
-- ============================================================
alter table public.admins enable row level security;

-- Self-row visibility so any user can ask "am I admin?".
drop policy if exists admins_self_select on public.admins;
create policy admins_self_select on public.admins
  for select using (auth.uid() = user_id);

-- Admins see + manage the full admin list.
drop policy if exists admins_full_select on public.admins;
create policy admins_full_select on public.admins
  for select using (is_admin());

drop policy if exists admins_grant on public.admins;
create policy admins_grant on public.admins
  for insert with check (is_admin());

drop policy if exists admins_revoke on public.admins;
create policy admins_revoke on public.admins
  for delete using (is_admin());

-- ============================================================
-- RLS extensions — question_submissions admin access
-- ============================================================
-- Admin can SELECT every submission (review queue).
drop policy if exists submissions_admin_select on public.question_submissions;
create policy submissions_admin_select on public.question_submissions
  for select using (is_admin());

-- Admin can UPDATE any submission (status / reviewer_id / reviewer_notes /
-- reviewed_at). The trigger from 0001 auto-bumps updated_at.
drop policy if exists submissions_admin_update on public.question_submissions;
create policy submissions_admin_update on public.question_submissions
  for update using (is_admin()) with check (is_admin());
