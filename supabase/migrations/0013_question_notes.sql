-- LearnCRE — per-question personal notes (idea #7)
--
-- One free-text note per (user, mode, item_key). Local-first: the app writes
-- notes to localStorage immediately and reconciles with this table on the
-- standard pullAll/pushAll cycle. Newer updated_at wins on merge; soft-delete
-- via deleted_at keeps tombstones so a delete on one device propagates.
--
-- item_key meaning by mode:
--   quiz          -> QuestionKind (e.g. 'capCompression') — quiz Question.id
--                    is session-ephemeral so we scope to the type.
--   situational   -> case id (stable string in src/quiz/situational/*.ts)
--   longform      -> case id
--   walkthrough   -> `${defId}#${stepId}`
--   excel         -> template id
--   mockInterview -> firm archetype id (or item id when applicable)

create table if not exists public.question_notes (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users(id) on delete cascade,
  mode        text not null,
  item_key    text not null,
  body        text not null default '',
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  deleted_at  timestamptz,
  unique (user_id, mode, item_key)
);

-- Hot read path: list-all-for-user.
create index if not exists question_notes_user_idx
  on public.question_notes(user_id, updated_at desc);

-- Reuse the project-wide updated_at trigger (defined in 0001_initial.sql).
drop trigger if exists question_notes_updated_at on public.question_notes;
create trigger question_notes_updated_at
  before update on public.question_notes
  for each row execute function public.set_updated_at();

alter table public.question_notes enable row level security;

drop policy if exists question_notes_owner on public.question_notes;
create policy question_notes_owner on public.question_notes
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
