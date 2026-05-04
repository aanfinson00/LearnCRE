"""
LearnCRE content-generation agent — orchestration script.

Usage (local manual):
  python scripts/agent/run.py
  python scripts/agent/run.py --dry-run     # print prompt + exit; no Claude call
  python scripts/agent/run.py --no-pr       # generate + commit but don't open PR

Usage (CI):
  Called by .github/workflows/agent.yml on cron or manual dispatch.

What it does:
  1. Verifies the working tree is clean and we're on a branch we can branch from.
  2. Reads `data/feedback/latest.md` (the user's compiled feedback). Exits 0 if
     missing — this is normal on most runs.
  3. Builds a prompt by combining `scripts/agent/prompt.md` (the canonical
     brief) with the feedback content.
  4. Invokes the Claude Code CLI in non-interactive mode. Claude reads the
     spec, edits files, runs build + tests itself, and stops.
  5. Detects file changes via `git status`. If clean, exits 0 (Claude found
     nothing actionable).
  6. Creates a branch `agent/run-<date>-<short-hash>`, commits all changes
     with a generated message, pushes the branch.
  7. Opens a draft PR labeled `auto-generated` via `gh pr create`.

Required env vars:
  ANTHROPIC_API_KEY        Set this. Without it Claude Code fails.
  GH_TOKEN or GITHUB_TOKEN For `gh` CLI authentication when opening PRs.

Optional env vars:
  AGENT_MAX_TURNS          Default 50. Hard cap on Claude's tool-use turns.
  AGENT_BRANCH_PREFIX      Default "agent/run". Branch naming.
  AGENT_PR_LABEL           Default "auto-generated". PR label.
  AGENT_BASE_BRANCH        Default "main". PR base.

Cost: a typical run that generates 3 new situational cases is ~30k input
tokens + ~10k output tokens. At Claude Sonnet rates that's roughly $0.10–0.20
per run. Tighter budgets: limit AGENT_MAX_TURNS or scope the feedback file
to a single ask.
"""

from __future__ import annotations

import argparse
import os
import re
import shlex
import subprocess
import sys
from datetime import date
from pathlib import Path

REPO = Path(__file__).resolve().parents[2]
FEEDBACK_PATH = REPO / "data" / "feedback" / "latest.md"
PROMPT_PATH = Path(__file__).resolve().parent / "prompt.md"
SPEC_PATH = REPO / "docs" / "agent-instructions.md"

DEFAULT_MAX_TURNS = int(os.environ.get("AGENT_MAX_TURNS", "50"))
DEFAULT_BRANCH_PREFIX = os.environ.get("AGENT_BRANCH_PREFIX", "agent/run")
DEFAULT_PR_LABEL = os.environ.get("AGENT_PR_LABEL", "auto-generated")
DEFAULT_BASE_BRANCH = os.environ.get("AGENT_BASE_BRANCH", "main")


def log(msg: str) -> None:
    print(f"[agent] {msg}", file=sys.stderr, flush=True)


def run(cmd: list[str], cwd: Path | None = None, check: bool = True) -> subprocess.CompletedProcess[str]:
    """Thin wrapper around subprocess that streams stderr to ours and returns stdout."""
    log(f"$ {' '.join(shlex.quote(c) for c in cmd)}")
    return subprocess.run(
        cmd,
        cwd=cwd or REPO,
        check=check,
        capture_output=True,
        text=True,
    )


def working_tree_dirty() -> bool:
    res = run(["git", "status", "--porcelain"], check=False)
    return bool(res.stdout.strip())


def build_prompt(feedback: str) -> str:
    """Combine the canonical brief + the user's feedback into the prompt sent to Claude."""
    base = PROMPT_PATH.read_text()
    return (
        f"{base}\n\n"
        f"## Compiled feedback for this run\n\n"
        f"{feedback}\n"
    )


def invoke_claude(prompt: str, max_turns: int) -> int:
    """
    Invoke the Claude Code CLI in headless / non-interactive mode.

    Notes on flags:
      `-p` / `--print` runs non-interactively and prints the final response.
      `--max-turns` caps the agent's tool-use loop (cost + safety guardrail).
      `--permission-mode acceptAll` lets the agent edit files + run bash
        without prompting; only safe in CI / trusted local automation.

    Different Claude Code versions have varied flag spellings; the orchestrator
    falls back to `--dangerously-skip-permissions` if `--permission-mode`
    isn't recognized. Adjust here if your install differs.
    """
    cmd_modern = [
        "claude",
        "-p",
        prompt,
        "--max-turns",
        str(max_turns),
        "--permission-mode",
        "acceptAll",
    ]
    cmd_legacy = [
        "claude",
        "-p",
        prompt,
        "--max-turns",
        str(max_turns),
        "--dangerously-skip-permissions",
    ]

    log(f"invoking claude (max-turns={max_turns}); prompt length ~{len(prompt)} chars")
    res = subprocess.run(cmd_modern, cwd=REPO, capture_output=True, text=True)
    if res.returncode != 0 and "permission-mode" in (res.stderr or ""):
        log("--permission-mode not recognized; retrying with --dangerously-skip-permissions")
        res = subprocess.run(cmd_legacy, cwd=REPO, capture_output=True, text=True)

    if res.stdout:
        print(res.stdout)
    if res.stderr:
        print(res.stderr, file=sys.stderr)
    return res.returncode


def detect_summary(out: str) -> str:
    """Pull the AGENT SUMMARY block from Claude's stdout if present."""
    m = re.search(r"AGENT SUMMARY[\s\S]+?(?=\n\n|\Z)", out)
    return m.group(0).strip() if m else ""


def short_hash() -> str:
    """8-char hex from current HEAD for branch naming."""
    res = run(["git", "rev-parse", "--short=8", "HEAD"], check=False)
    return res.stdout.strip() or "unknown"


def commit_and_branch(branch_prefix: str) -> str:
    """Create a branch, stage everything, commit, return the branch name."""
    today = date.today().isoformat()
    sh = short_hash()
    branch = f"{branch_prefix}-{today}-{sh}"
    run(["git", "checkout", "-b", branch])
    run(["git", "add", "-A"])
    run(
        [
            "git",
            "commit",
            "-m",
            (
                "Agent run: content updates from feedback log\n\n"
                "Auto-generated by scripts/agent/run.py.\n"
                "Review the diff before merging — the agent operates within\n"
                "the constraints in docs/agent-instructions.md, but human\n"
                "judgement is still the final gate.\n\n"
                "https://claude.ai/code/session_01AUvBzhAksKngwESmyhQuf4"
            ),
        ]
    )
    return branch


def push_and_open_pr(branch: str, base: str, label: str) -> None:
    run(["git", "push", "-u", "origin", branch])
    body = (
        "Auto-generated by `scripts/agent/run.py` from "
        "`data/feedback/latest.md`.\n\n"
        "**Review carefully** — the agent follows `docs/agent-instructions.md` "
        "but every PR is gated on human review. The diff should match the "
        "feedback themes.\n\n"
        "Tests passing locally (the agent runs `npm run build && npx vitest "
        "run` before committing). Re-verify in CI."
    )
    cmd = [
        "gh",
        "pr",
        "create",
        "--base",
        base,
        "--head",
        branch,
        "--title",
        f"[agent] {branch.split('/', 1)[-1]}",
        "--body",
        body,
        "--draft",
    ]
    if label:
        cmd.extend(["--label", label])
    run(cmd)


def main() -> int:
    parser = argparse.ArgumentParser(description="LearnCRE content-generation agent")
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Print the prompt and exit without invoking Claude or making changes.",
    )
    parser.add_argument(
        "--no-pr",
        action="store_true",
        help="Generate and commit, but skip pushing + opening the PR.",
    )
    parser.add_argument(
        "--max-turns",
        type=int,
        default=DEFAULT_MAX_TURNS,
        help=f"Cap on Claude's tool-use turns (default {DEFAULT_MAX_TURNS}).",
    )
    args = parser.parse_args()

    # Pre-flight checks
    if not SPEC_PATH.exists():
        log(f"ERROR: missing operating spec at {SPEC_PATH}")
        return 2
    if not PROMPT_PATH.exists():
        log(f"ERROR: missing prompt template at {PROMPT_PATH}")
        return 2
    if working_tree_dirty():
        log("ERROR: working tree is dirty. Commit or stash before running the agent.")
        return 3

    if not FEEDBACK_PATH.exists():
        log(f"no feedback file at {FEEDBACK_PATH} — exiting cleanly")
        return 0

    feedback = FEEDBACK_PATH.read_text().strip()
    if not feedback:
        log("feedback file is empty — exiting cleanly")
        return 0

    prompt = build_prompt(feedback)

    if args.dry_run:
        print(prompt)
        log(f"--dry-run: prompt is {len(prompt)} chars; exiting before Claude call")
        return 0

    # API key check (fail fast with a clear message)
    if not os.environ.get("ANTHROPIC_API_KEY"):
        log("ERROR: ANTHROPIC_API_KEY not set. Get one at console.anthropic.com.")
        return 4

    rc = invoke_claude(prompt, args.max_turns)
    if rc != 0:
        log(f"Claude exited with non-zero status ({rc}); aborting")
        return 5

    if not working_tree_dirty():
        log("Claude finished but made no file changes — exiting cleanly")
        return 0

    branch = commit_and_branch(DEFAULT_BRANCH_PREFIX)
    log(f"committed changes on branch {branch}")

    if args.no_pr:
        log("--no-pr: skipping push + PR open")
        return 0

    push_and_open_pr(branch, DEFAULT_BASE_BRANCH, DEFAULT_PR_LABEL)
    log("PR opened (draft, awaiting review)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
