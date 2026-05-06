-- LearnCRE PR — community question submissions
--
-- Cloud-authenticated users can submit a question + answer in one of three
-- shapes: multiple choice, solvable (numeric), or word problem. The owner
-- reviews pending submissions via service-role / SQL editor and integrates
-- the best ones into the question base manually.
--
-- Submitter can:
--   - INSERT (with auth.uid() = submitter_id)
--   - SELECT their own submissions (status + reviewer notes)
--   - UPDATE their own submissions while still pending (typo fixes)
-- The owner reviews via service-role; no app-side reviewer UI in this PR.

create table if not exists public.question_submissions (
  id              uuid primary key default gen_random_uuid(),
  submitter_id    uuid not null references auth.users(id) on delete cascade,
  question_type   text not null
                  check (question_type in ('multipleChoice', 'solvable', 'wordProblem')),
  prompt          text not null,
  expected_answer text not null,
  choices         jsonb,                -- array of strings; required when type=multipleChoice
  unit            text,                  -- e.g. 'pct', 'usd', 'multiple'; for solvable
  explanation     text,
  kind_hint       text,                  -- which existing QuestionKind this maps to (free-form)
  role_hint       text,                  -- e.g. 'acquisitions' / 'mortgageUw'
  difficulty_hint text
                  check (difficulty_hint is null
                         or difficulty_hint in ('beginner', 'intermediate', 'advanced')),
  tags            text[],
  status          text not null default 'pending'
                  check (status in ('pending', 'approved', 'rejected', 'integrated')),
  reviewer_id     uuid references auth.users(id) on delete set null,
  reviewer_notes  text,
  reviewed_at     timestamptz,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now(),
  check (length(prompt) between 20 and 2000),
  check (length(expected_answer) between 1 and 500)
);

create index if not exists submissions_submitter_idx
  on public.question_submissions(submitter_id, created_at desc);
create index if not exists submissions_status_idx
  on public.question_submissions(status, created_at desc);

-- Auto-bump updated_at on UPDATE (reuses the trigger function from 0001).
drop trigger if exists submissions_updated_at on public.question_submissions;
create trigger submissions_updated_at
  before update on public.question_submissions
  for each row execute function public.set_updated_at();

alter table public.question_submissions enable row level security;

-- Submitter can insert rows where they're the submitter.
drop policy if exists submissions_self_insert on public.question_submissions;
create policy submissions_self_insert on public.question_submissions
  for insert with check (auth.uid() = submitter_id);

-- Submitter can read their own submissions (status + reviewer notes).
drop policy if exists submissions_self_select on public.question_submissions;
create policy submissions_self_select on public.question_submissions
  for select using (auth.uid() = submitter_id);

-- Submitter can edit their own submission while it's still pending.
drop policy if exists submissions_self_update on public.question_submissions;
create policy submissions_self_update on public.question_submissions
  for update using (auth.uid() = submitter_id and status = 'pending')
              with check (auth.uid() = submitter_id and status = 'pending');

-- No app-side delete policy. The submitter can leave a typo'd row sitting
-- as 'rejected' or have the reviewer purge it via service-role.
