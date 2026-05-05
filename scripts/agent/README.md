# scripts/agent — autonomous content-generation loop

A scheduled (or manually-triggered) job that reads your compiled feedback,
calls Claude Code in headless mode to generate well-formed content updates,
and opens a draft PR for human review. The agent operates within the
constraints in `docs/agent-instructions.md` and is gated on tests passing.

## Setup (one-time, ~15 min)

### 1. Get an Anthropic API key (~3 min)

1. Sign in at https://console.anthropic.com
2. Settings → API Keys → Create Key. Name it "LearnCRE agent".
3. Copy the `sk-ant-…` value (one-time display).
4. Add ~$10 of credit to your account if you haven't already (estimate
   below; nightly runs at $0.10–0.20 each = ~$3–6/month).

### 2. Add the key to GitHub Actions secrets (~2 min)

1. Go to https://github.com/aanfinson00/learncre/settings/secrets/actions
2. New repository secret → Name: `ANTHROPIC_API_KEY`, Value: your `sk-ant-…`
3. Save. The `auto-generated` PR label is created automatically the first
   time the workflow runs (or you can pre-create it via Issues → Labels).

### 3. (Optional) Install Claude Code CLI locally for testing

If you want to dry-run or invoke the agent from your laptop:

```bash
npm install -g @anthropic-ai/claude-code
claude --version  # confirm it's on PATH
```

You don't need this for the GH Actions workflow — the workflow installs
Claude Code itself.

## Usage

### Manual trigger via GitHub UI

1. Go to https://github.com/aanfinson00/learncre/actions
2. Pick "Content agent (auto-generation from feedback)"
3. Click "Run workflow" → pick `main` → optionally adjust max-turns → Run
4. Wait ~3-8 min depending on what the agent decides to ship
5. Check the Pull Requests tab for the new draft PR labeled
   `auto-generated`

### Manual trigger from local terminal

```bash
# Dry-run (prints prompt, no Claude call, no changes)
python scripts/agent/run.py --dry-run

# Real run (requires ANTHROPIC_API_KEY env var)
ANTHROPIC_API_KEY=sk-ant-... python scripts/agent/run.py

# Generate + commit but skip pushing the PR (for local review)
ANTHROPIC_API_KEY=sk-ant-... python scripts/agent/run.py --no-pr
```

### Scheduled nightly run

The cron line in `.github/workflows/agent.yml` is commented out by default.
Uncomment it when you want overnight runs:

```yaml
schedule:
  - cron: "0 6 * * *"  # 06:00 UTC daily
```

Recommended cadence: nightly only if you're actively logging feedback.
Otherwise, manual triggers as needed are cheaper and produce more focused
PRs.

## How feedback gets to the agent

The agent reads `data/feedback/latest.md`. Three ways that file gets
populated:

1. **Manual paste (simplest, recommended for v1):** in the app, hit the
   floating 💬 button → Log tab → "Copy compiled markdown". Paste the
   contents into a local clone:
   ```bash
   pbpaste > data/feedback/latest.md
   git add data/feedback/latest.md
   git commit -m "feedback: <session date>"
   git push
   ```
   Then trigger the agent. The agent reads → ships PR → you merge → file
   stays around as a record of what was acted on.

2. **Per-session files (structured archive):** save each session as a
   dated file (`data/feedback/2026-04-15.md`) and symlink `latest.md` to
   the most recent. Same workflow, easier to look back.

3. **(Future) In-app push button:** add a button to the FeedbackButton's
   Log view that opens a PR creating `data/feedback/<date>.md` with the
   compiled markdown. Requires GitHub OAuth or a fine-grained PAT in the
   user's profile. Out of scope for the current scaffold.

## What the agent will and won't do

### Will

- Read `docs/agent-instructions.md` (the canonical operating spec) on
  every run and follow it
- Read 1–2 example files per content type before writing new content
- Generate up to 3 new pieces of content per run (cases / templates)
- Fix bugs flagged in feedback (math errors, parse errors, etc.)
- Edit wording flagged in feedback (clarity issues)
- Run `npm run build && npx vitest run` and refuse to commit if they fail
- Commit with a generated message
- Open a draft PR for human review

### Won't (by design)

- Push directly to `main` — every output is a draft PR
- Touch `src/types/`, `src/hooks/`, or `src/storage/` unless explicitly
  needed by the feedback
- Ship more than 5 changed files per run (runaway-commit guard)
- Skip tests
- Invent jurisdictional facts (state-law specifics, tax mechanics)
- Run if the working tree is dirty (manual safety check)

## Cost expectations

| Scenario | Approx cost per run |
|---|---|
| Empty feedback file (no-op exit) | $0 |
| Wording fixes only (1–3 file edits) | $0.05 |
| Generate 3 new situational cases | $0.15–0.25 |
| Generate 3 new cases + fix 2 bugs + 5 wording edits | $0.30–0.50 |

Pricing assumes Claude Sonnet via the Anthropic API. The `--max-turns` cap
(default 50) is the hard ceiling; if the agent spirals, the cap stops it.

Monthly budget at nightly cadence + active feedback: ~$5–15/month is
realistic. If costs feel high, lower `AGENT_MAX_TURNS` or trigger
manually instead of nightly.

## Safety + guardrails

The agent is constrained at three layers:

1. **Prompt-level** (`scripts/agent/prompt.md`): explicit rules about file
   limits, what NOT to touch, validation requirements before stopping.
2. **Orchestrator-level** (`scripts/agent/run.py`): refuses to run on a
   dirty tree; verifies tests passed; commits to a feature branch (never
   `main`); opens PR as draft.
3. **Workflow-level** (`.github/workflows/agent.yml`): 20-min job timeout;
   uses `GITHUB_TOKEN` (not a PAT with broader scopes); no destructive ops.

Every PR is human-gated. The agent never auto-merges. If the agent
produces bad content, close the PR and adjust `prompt.md` or
`docs/agent-instructions.md` to teach it.

## Troubleshooting

### "ANTHROPIC_API_KEY not set"

The orchestrator checks for the env var early. If you're running locally,
export it. If in GH Actions, add it as a repo secret (see Setup §2).

### "Claude Code CLI not on PATH"

The workflow installs `@anthropic-ai/claude-code` globally before running.
If install fails, swap in the alternative install method from
https://docs.claude.com/en/docs/claude-code/quickstart.

### "--permission-mode not recognized"

The orchestrator falls back to `--dangerously-skip-permissions`
automatically. Different Claude Code versions name this flag differently;
no action needed.

### "Working tree is dirty"

Commit or stash uncommitted changes before running the agent. The
orchestrator refuses to run on a dirty tree to avoid mixing your in-progress
work with agent-generated changes.

### Agent makes content I don't like

Two levers:
1. **Edit `prompt.md`** to give the agent clearer constraints next run.
2. **Edit `docs/agent-instructions.md`** if the issue is a structural
   pattern (file location, type interface, role tagging).

The agent re-reads both on every run, so changes take effect immediately.

## Future improvements

- **Conversation memory**: the agent currently runs as a one-shot. Long-
  running iterative content development would benefit from session memory
  (Anthropic API's prompt caching makes this cheap).
- **Per-PR retrospective**: after a human merges or closes an agent PR,
  feed that signal back via a "what did we learn from PR #N?" follow-up.
- **In-app push button**: eliminate the manual `pbpaste` step.
- **Cost telemetry**: log per-run input/output tokens to a file for trend
  watching.
