#!/usr/bin/env python3
"""
curriculum-pipeline.py — Ollama-driven curriculum generation pipeline for LearnCRE.

Stages:
  1. Generate    — Ollama produces N curriculum topic ideas across configured categories
  2. Grade       — each idea scored on rubric (foundational, walkthroughFit, novelty, reach)
  3. Queue       — high-scoring ideas surface in docs/CURRICULUM_QUEUE.md for human vetting
  4. Draft       — for accepted ideas, Ollama drafts a walkthrough + quiz template as MARKDOWN
  5. Refine      — Claude (Opus) verifies math, fixes conceptual errors, polishes prose
  6. Knowledge base — .curriculum-state.json accumulates all ideas with full history

Idea status lifecycle:
  pending (ungraded)
     ↓ grade
  queued (≥ threshold)  OR  rejected (< threshold)
     ↓ human vets in queue.md → marks [x]
  accepted
     ↓ draft (Ollama)
  drafted (raw markdown in docs/CURRICULUM_DRAFTS/walkthrough-<id>.md + quiz-<id>.md)
     ↓ refine (Claude Opus via `claude -p` subprocess)
  refined (polished markdown in docs/CURRICULUM_DRAFTS/walkthrough-<id>.refined.md + quiz-<id>.refined.md)
     ↓ human reviews + manually merges to src/quiz/walkthroughs.ts and src/quiz/templates/
  shipped (manual status update)

DRAFT FORMAT: Ollama writes MARKDOWN, not TypeScript. Math hallucinations in markdown
are easier to spot during human review than math hallucinations in compiled code.

REFINEMENT: Ollama is fast and free but error-prone (math, concepts). Claude is expensive
but accurate. We use Ollama for high-volume ideation/drafting and Claude for the final
polish on the small subset of drafts that survive grading and human vetting.

CONFIGURATION: .curriculum.json (repo root)
STATE:         .curriculum-state.json (repo root)
QUEUE:         docs/CURRICULUM_QUEUE.md
DRAFTS:        docs/CURRICULUM_DRAFTS/walkthrough-<id>.md and quiz-<id>.md

USAGE:
  curriculum-pipeline.py generate [--n N]   # add N new ideas, auto-grade
  curriculum-pipeline.py grade              # grade any pending ungraded ideas
  curriculum-pipeline.py queue              # refresh docs/CURRICULUM_QUEUE.md
  curriculum-pipeline.py sync-queue         # re-read queue checkboxes into state
  curriculum-pipeline.py accept <id>        # mark idea as accepted
  curriculum-pipeline.py reject <id>        # mark idea as rejected
  curriculum-pipeline.py draft <id|next>    # draft walkthrough + quiz md for an accepted idea
  curriculum-pipeline.py refine <id|next>   # polish a drafted idea via Claude Opus
  curriculum-pipeline.py tick               # one auto step (refine > draft > grade > generate)
  curriculum-pipeline.py status             # print summary

LOOP:
  /loop 30m bash python3 scripts/curriculum-pipeline.py tick

DEPENDENCIES: stdlib only + local Ollama daemon with the configured model pulled +
the `claude` CLI on PATH (used for the refine stage; skip refine if unavailable).
"""

import argparse
import json
import re
import shutil
import subprocess
import sys
import time
import urllib.error
import urllib.request
from datetime import datetime, timezone
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent
CONFIG_PATH = REPO / ".curriculum.json"
STATE_PATH = REPO / ".curriculum-state.json"
QUEUE_PATH = REPO / "docs" / "CURRICULUM_QUEUE.md"
DRAFTS_DIR = REPO / "docs" / "CURRICULUM_DRAFTS"

OLLAMA_URL = "http://localhost:11434/api/generate"
OLLAMA_TIMEOUT = 300  # seconds; some prompts run long
CLAUDE_TIMEOUT = 600  # seconds; refinement can chew on long drafts

# ============================================================
# State + config
# ============================================================

def load_config():
    return json.loads(CONFIG_PATH.read_text())

def load_state():
    if not STATE_PATH.exists():
        return {"version": 1, "ideas": {}, "log": []}
    return json.loads(STATE_PATH.read_text())

def save_state(state):
    STATE_PATH.write_text(json.dumps(state, indent=2, sort_keys=True) + "\n")

def log(state, message):
    state.setdefault("log", []).append(
        {"at": datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"), "msg": message}
    )
    if len(state["log"]) > 500:
        state["log"] = state["log"][-500:]

def make_id(title, salt=""):
    slug = re.sub(r"[^a-z0-9]+", "-", title.lower()).strip("-")
    if salt:
        slug = f"{slug}-{salt}"
    return slug[:60]

# ============================================================
# Ollama client
# ============================================================

def ollama_generate(model, prompt, json_mode=False):
    payload = {"model": model, "prompt": prompt, "stream": False}
    if json_mode:
        payload["format"] = "json"
    req = urllib.request.Request(
        OLLAMA_URL,
        data=json.dumps(payload).encode("utf-8"),
        headers={"Content-Type": "application/json"},
    )
    try:
        with urllib.request.urlopen(req, timeout=OLLAMA_TIMEOUT) as resp:
            data = json.loads(resp.read().decode("utf-8"))
            return data.get("response", "")
    except urllib.error.URLError as e:
        raise RuntimeError(
            f"Ollama unreachable at {OLLAMA_URL}: {e}. "
            f"Is the daemon running? Try: `ollama serve` in another terminal."
        )

# ============================================================
# Claude client (refinement only — `claude -p` subprocess)
# ============================================================

def claude_available():
    return shutil.which("claude") is not None

def claude_refine(prompt, model="opus"):
    if not claude_available():
        raise RuntimeError(
            "`claude` CLI not on PATH. Refinement step requires Claude Code installed. "
            "Skip refinement by running `tick` after pinning state to 'drafted' externally."
        )
    result = subprocess.run(
        ["claude", "-p", "--model", model, prompt],
        capture_output=True,
        text=True,
        timeout=CLAUDE_TIMEOUT,
    )
    if result.returncode != 0:
        raise RuntimeError(
            f"`claude -p` exited {result.returncode}: {result.stderr.strip()[:500]}"
        )
    return result.stdout

# ============================================================
# Prompts
# ============================================================

GENERATE_PROMPT = """\
You generate curriculum topic IDEAS for a CRE (commercial real estate) learning app called LearnCRE.

DOMAIN: {domain}

CATEGORIES (each idea must be tagged with exactly one of these ids):
{categories_block}

AUDIENCE: career switchers entering CRE, pre-internship students, and working analysts/associates.

TASK: Generate exactly {n} FRESH ideas. Each must:
- Be a SPECIFIC, FOCUSABLE topic that could become a 5-8 step lesson (not a vague theme)
- Avoid the existing topics listed below
- Be self-contained enough that a learner could master it in one sitting

EXISTING TOPICS (do not duplicate):
{existing_block}

OUTPUT FORMAT: A JSON object with an "ideas" array. Each idea has:
  - "title": the topic name (5-12 words)
  - "category": one of the category ids above
  - "outline": 2-3 sentence description of what the lesson covers and why it matters
  - "key_numbers": list of suggested example values the lesson should use, if applicable

Return ONLY the JSON object, no commentary.
"""

GRADE_PROMPT = """\
You grade a CRE curriculum idea for the LearnCRE app on a 4-dimension rubric.

IDEA:
  Title:    {title}
  Category: {category}
  Outline:  {outline}

RUBRIC (each scored 1-5):
{rubric_block}

EXISTING CONTENT (sample): {existing_summary}

OUTPUT FORMAT: A JSON object with one key per dimension (use exactly these keys: {dim_keys}) plus a brief "reasoning" string.

Return ONLY the JSON, no commentary.
"""

WALKTHROUGH_DRAFT_PROMPT = """\
You draft a walkthrough lesson for the LearnCRE app, in strict MARKDOWN format.

WALKTHROUGH RULES:
- 5-8 steps. Each step asks the learner to compute ONE single number.
- Numbers must be ROUND and ARITHMETICALLY SELF-CONSISTENT across steps. If NOI = $1,000,000 and cap = 6.0%, then value = $16,666,667. Verify each step's number before writing it.
- Each step's "result description" teaches the deeper concept, not just the arithmetic.
- The final "takeaway" is the mental model the learner should walk away with.

IDEA TO DRAFT:
  Title:        {title}
  Category:     {category}
  Outline:      {outline}
  Key numbers:  {key_numbers}

OUTPUT FORMAT (strict markdown; do NOT wrap in code fences):

# {title}

**Category:** {category}
**Audience:** [pre-intern | career-switcher | analyst — list which apply]

## Setup narrative

[1-2 paragraphs anchoring the scenario: what we're underwriting, what the numbers are]

## Steps

### Step 1 — [label]
- **Prompt:** [single-question prompt asking for ONE computed number]
- **Expected:** [exact numerical answer with units]
- **Unit:** [usd | pct | bps | multiple | pctChange | usdChange | usdPerSf]
- **Hint:** [one sentence]
- **Result description:** [what the computation reveals; teaches concept, not just math]

### Step 2 — [label]
[repeat — 5 to 8 steps total]

## Takeaway

[2-4 sentences — the mental model the learner leaves with]

## Notes for the converter

[any caveats about the numbers, alternate scenarios considered, role tags to apply, etc]

Now produce ONLY the markdown for this idea. NO commentary outside the markdown.
"""

QUIZ_TEMPLATE_DRAFT_PROMPT = """\
You draft a quiz-template spec for the LearnCRE app, in strict MARKDOWN format.

A quiz template is a PROCEDURAL mental-math question generator. The learner sees a single computation; the template generates many variants by varying inputs across reasonable ranges.

CRITICAL: the "Expected computation" formula must be EXACT and produce the answer from the listed inputs alone.

IDEA TO DRAFT:
  Title:    {title}
  Category: {category}
  Outline:  {outline}
  (A walkthrough draft for this idea will exist in parallel; the quiz template should reinforce the same core mental math.)

OUTPUT FORMAT (strict markdown; do NOT wrap in code fences):

# Quiz template: [short label]

**Kind:** [camelCaseKindName, e.g. capRateSensitivity]
**Category:** [valuation | returns | debt | other]
**Roles:** [comma-separated subset of: acquisitions, assetManagement, mortgageUw, portfolioMgmt, development]
**Pattern (formula in one line):** [e.g. "%ΔV = (OldCap / NewCap) − 1"]

## Prompt template

[one-sentence prompt using {{var}} placeholders for random inputs, e.g. "NOI is {{noi}}. Cap rate moves from {{oldCap}} to {{newCap}}. What % change in value?"]

## Inputs to randomize

- `{{var1}}`: [range or set] — [what it represents]
- `{{var2}}`: [range or set] — [...]

## Expected computation

[single-expression formula producing the answer]

## Answer unit

[usd | pct | bps | multiple | pctChange | usdChange | usdPerSf]

## Tolerance

- type: [pct | abs]
- band: [numeric]

## Tips (3-5 lines, quick mental-math shortcuts)

- [tip]
- [tip]

## Solution narrative (template)

[2-3 sentence explanation referencing the inputs, used to render Solution.steps]

Now produce ONLY the markdown. NO commentary outside.
"""

REFINE_PROMPT = """\
You are refining curriculum drafts for LearnCRE, a CRE mental-math + concept app. The raw drafts below were produced by a smaller local model and frequently contain wrong arithmetic, conceptual errors (confusing cap rate with yield, mixing levered vs unlevered IRR, etc.), and structural mistakes.

Your job: produce CORRECT, POLISHED versions of BOTH the walkthrough and the quiz template.

IDEA CONTEXT
  Title:    {title}
  Category: {category}
  Outline:  {outline}

REFINEMENT REQUIREMENTS
- Walkthrough: 5-8 steps, each step computes ONE number. Numbers must be round and ARITHMETICALLY SELF-CONSISTENT across steps. Verify every value yourself before writing it.
- Quiz template: the "Expected computation" formula must produce the answer from the listed inputs alone, with no hidden steps.
- Concepts: fix anything that misrepresents CRE practice. If a step teaches the wrong mental model, rewrite the step.
- Structure: preserve the markdown headings/fields exactly — they are consumed downstream.
- Tone: punchy, analyst-grade, no hedging. Don't pad. If the draft is mostly right, change little.
- Numbers: prefer the units actually used on a deal (NOI in dollars, cap rates as percentages with one decimal, IRR as %, EM as multiple).

OUTPUT FORMAT
Emit BOTH refined documents, bracketed by these exact marker lines on their own line:

=====LEARNCRE-WALKTHROUGH-BEGIN=====
<refined walkthrough markdown>
=====LEARNCRE-WALKTHROUGH-END=====
=====LEARNCRE-QUIZ-BEGIN=====
<refined quiz template markdown>
=====LEARNCRE-QUIZ-END=====

NO commentary outside the marker blocks.

=====RAW WALKTHROUGH DRAFT (from Ollama)=====
{walkthrough_raw}
=====END RAW WALKTHROUGH=====

=====RAW QUIZ DRAFT (from Ollama)=====
{quiz_raw}
=====END RAW QUIZ=====
"""

# ============================================================
# Helpers
# ============================================================

def existing_topics_summary(_config, state):
    titles = [idea.get("title", "?") for idea in state.get("ideas", {}).values()]
    shipped = [
        "Combined Proforma", "DSCR Loan Sizing", "Mock Acquisition", "Value-Add Underwriting",
        "Development Feasibility", "Hold or Sell", "Distressed Loan Workout",
        "Capital-Stack Waterfall", "Construction Draw", "Hotel RevPAR", "Office WALT & rollover NER",
        "Cap rate — what it actually is", "Risk-adjusted return — what it actually is",
        "GP/LP — what it actually is",
    ]
    return titles + shipped

def categories_block(config):
    return "\n".join(
        f"  - {c['id']}: {c['label']} (e.g. {c['examples']})" for c in config["categories"]
    )

def rubric_block(config):
    return "\n".join(
        f"  - {r['id']}: {r['label']} ({r['scale']})" for r in config["rubric_dims"]
    )

# ============================================================
# Commands
# ============================================================

def cmd_generate(args):
    config = load_config()
    state = load_state()
    n = args.n or config.get("batch_size", 10)
    pending = [i for i in state["ideas"].values() if i["status"] == "pending"]
    max_pending = config.get("max_pending", 50)
    if len(pending) + n > max_pending:
        n = max(0, max_pending - len(pending))
        if n == 0:
            print(f"Pending queue at max ({len(pending)} / {max_pending}). Skipping generation.")
            return

    prompt = GENERATE_PROMPT.format(
        domain=config["domain"],
        categories_block=categories_block(config),
        n=n,
        existing_block="\n".join(f"  - {t}" for t in existing_topics_summary(config, state)[:80]),
    )
    print(f"Generating {n} ideas via Ollama ({config['ollama_model']})...")
    raw = ollama_generate(config["ollama_model"], prompt, json_mode=True)
    try:
        parsed = json.loads(raw)
    except json.JSONDecodeError as e:
        print(f"Failed to parse Ollama output as JSON: {e}", file=sys.stderr)
        print(raw[:500], file=sys.stderr)
        sys.exit(1)

    seen_titles = {idea["title"].lower() for idea in state["ideas"].values()}
    added = 0
    for raw_idea in parsed.get("ideas", []):
        title = (raw_idea.get("title") or "").strip()
        if not title or title.lower() in seen_titles:
            continue
        idea_id = make_id(title, salt=str(int(time.time()))[-4:] + str(added))
        state["ideas"][idea_id] = {
            "id": idea_id,
            "title": title,
            "category": raw_idea.get("category", "concept-primer"),
            "outline": (raw_idea.get("outline") or "").strip(),
            "key_numbers": raw_idea.get("key_numbers", []),
            "status": "pending",
            "scores": None,
            "score_total": None,
            "reasoning": None,
            "draft_walkthrough_path": None,
            "draft_quiz_path": None,
            "refined_walkthrough_path": None,
            "refined_quiz_path": None,
            "generated_at": datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"),
            "graded_at": None,
            "drafted_at": None,
            "refined_at": None,
        }
        seen_titles.add(title.lower())
        added += 1
    log(state, f"generate: added {added} new ideas (requested {n})")
    save_state(state)
    print(f"Added {added} new ideas.")
    cmd_grade(args)

def cmd_grade(args):
    config = load_config()
    state = load_state()
    ungraded = [i for i in state["ideas"].values() if i["status"] == "pending" and i["scores"] is None]
    if not ungraded:
        print("Nothing to grade.")
        return
    existing_summary = "; ".join(existing_topics_summary(config, state)[:30])
    dim_keys = ", ".join(r["id"] for r in config["rubric_dims"])
    print(f"Grading {len(ungraded)} ideas...")
    for idea in ungraded:
        prompt = GRADE_PROMPT.format(
            title=idea["title"],
            category=idea["category"],
            outline=idea["outline"],
            rubric_block=rubric_block(config),
            existing_summary=existing_summary,
            dim_keys=dim_keys,
        )
        raw = ollama_generate(config["ollama_model"], prompt, json_mode=True)
        try:
            scores = json.loads(raw)
        except json.JSONDecodeError:
            print(f"  ! {idea['title']!r}: bad JSON; skipping")
            continue
        dim_ids = [r["id"] for r in config["rubric_dims"]]
        clean = {d: int(scores.get(d, 0)) for d in dim_ids}
        total = sum(clean.values())
        idea["scores"] = clean
        idea["score_total"] = total
        idea["reasoning"] = scores.get("reasoning", "")
        idea["status"] = "queued" if total >= config["rubric_threshold_total"] else "rejected"
        idea["graded_at"] = datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")
        mark = "+" if idea["status"] == "queued" else "-"
        print(f"  {mark} [{total:>2}/20] {idea['title']}")
    log(state, f"grade: processed {len(ungraded)}")
    save_state(state)
    cmd_queue(args)

def cmd_queue(_args):
    state = load_state()
    DRAFTS_DIR.mkdir(parents=True, exist_ok=True)
    QUEUE_PATH.parent.mkdir(parents=True, exist_ok=True)
    active = [i for i in state["ideas"].values() if i["status"] in ("queued", "accepted", "drafted", "refined")]
    active.sort(key=lambda i: (-(i["score_total"] or 0), i["title"]))

    lines = ["# Curriculum vet queue", ""]
    now_iso = datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")
    lines.append(f"_Updated {now_iso}._")
    lines.append("")
    lines.append("Edit the checkboxes below, then run `python3 scripts/curriculum-pipeline.py sync-queue` to apply.")
    lines.append("")
    lines.append(
        "Status legend: `[ ]` queued · `[x]` accepted · `[r]` rejected · `[d]` drafted (Ollama markdown) · `[R]` refined (Claude-polished markdown; **review this one**)"
    )
    lines.append("")
    if not active:
        lines.append("_No queued ideas. Run `curriculum-pipeline.py generate` to add some._")
    else:
        by_cat = {}
        for idea in active:
            by_cat.setdefault(idea["category"], []).append(idea)
        for cat in sorted(by_cat.keys()):
            lines.append(f"## {cat}")
            lines.append("")
            for idea in by_cat[cat]:
                mark = {
                    "queued": "[ ]",
                    "accepted": "[x]",
                    "rejected": "[r]",
                    "drafted": "[d]",
                    "refined": "[R]",
                }.get(idea["status"], "[ ]")
                lines.append(f"- {mark} **{idea['title']}** — score {idea['score_total']}/20 — `{idea['id']}`")
                if idea["outline"]:
                    lines.append(f"      {idea['outline']}")
                if idea.get("refined_walkthrough_path"):
                    lines.append(f"      walkthrough (refined): `{idea['refined_walkthrough_path']}`")
                elif idea.get("draft_walkthrough_path"):
                    lines.append(f"      walkthrough draft: `{idea['draft_walkthrough_path']}`")
                if idea.get("refined_quiz_path"):
                    lines.append(f"      quiz (refined): `{idea['refined_quiz_path']}`")
                elif idea.get("draft_quiz_path"):
                    lines.append(f"      quiz draft: `{idea['draft_quiz_path']}`")
            lines.append("")
    QUEUE_PATH.write_text("\n".join(lines) + "\n")
    print(f"Wrote {QUEUE_PATH.relative_to(REPO)} ({len(active)} active ideas).")

def cmd_sync_queue(_args):
    if not QUEUE_PATH.exists():
        print(f"No queue at {QUEUE_PATH}; nothing to sync.")
        return
    state = load_state()
    text = QUEUE_PATH.read_text()
    pattern = re.compile(r"^- \[(?P<mark>[ xrdR])\] .*?`(?P<id>[a-z0-9\-]+)`", re.MULTILINE)
    mark_to_status = {" ": "queued", "x": "accepted", "r": "rejected", "d": "drafted", "R": "refined"}
    changes = 0
    for m in pattern.finditer(text):
        idea_id = m.group("id")
        new_status = mark_to_status.get(m.group("mark"))
        idea = state["ideas"].get(idea_id)
        if not idea or not new_status:
            continue
        if idea["status"] != new_status:
            idea["status"] = new_status
            changes += 1
    log(state, f"sync-queue: {changes} status changes")
    save_state(state)
    print(f"Synced {changes} status change(s).")

def cmd_accept(args):
    _mark(args.id, "accepted")

def cmd_reject(args):
    _mark(args.id, "rejected")

def _mark(idea_id, status):
    state = load_state()
    if idea_id not in state["ideas"]:
        print(f"No idea with id {idea_id!r}.", file=sys.stderr)
        sys.exit(1)
    state["ideas"][idea_id]["status"] = status
    log(state, f"manual: {idea_id} -> {status}")
    save_state(state)
    print(f"{idea_id} -> {status}")

def cmd_draft(args):
    config = load_config()
    state = load_state()
    if args.id == "next":
        candidates = [i for i in state["ideas"].values() if i["status"] == "accepted"]
        if not candidates:
            print("No accepted ideas waiting for a draft.")
            return
        candidates.sort(key=lambda i: -(i["score_total"] or 0))
        idea = candidates[0]
    else:
        idea = state["ideas"].get(args.id)
        if not idea:
            print(f"No idea with id {args.id!r}.", file=sys.stderr)
            sys.exit(1)
        if idea["status"] not in ("accepted", "drafted"):
            print(f"Idea {args.id} is {idea['status']!r}; only 'accepted' or 'drafted' can be drafted.", file=sys.stderr)
            sys.exit(1)
    DRAFTS_DIR.mkdir(parents=True, exist_ok=True)

    print(f"Drafting walkthrough for: {idea['title']}")
    wt_prompt = WALKTHROUGH_DRAFT_PROMPT.format(
        title=idea["title"],
        category=idea["category"],
        outline=idea["outline"],
        key_numbers=", ".join(str(k) for k in idea.get("key_numbers", [])) or "(none specified)",
    )
    wt_md = ollama_generate(config["ollama_model"], wt_prompt)
    wt_path = DRAFTS_DIR / f"walkthrough-{idea['id']}.md"
    wt_path.write_text(wt_md.rstrip() + "\n")

    print(f"Drafting quiz template for: {idea['title']}")
    quiz_prompt = QUIZ_TEMPLATE_DRAFT_PROMPT.format(
        title=idea["title"],
        category=idea["category"],
        outline=idea["outline"],
    )
    quiz_md = ollama_generate(config["ollama_model"], quiz_prompt)
    quiz_path = DRAFTS_DIR / f"quiz-{idea['id']}.md"
    quiz_path.write_text(quiz_md.rstrip() + "\n")

    idea["status"] = "drafted"
    idea["draft_walkthrough_path"] = str(wt_path.relative_to(REPO))
    idea["draft_quiz_path"] = str(quiz_path.relative_to(REPO))
    idea["drafted_at"] = datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")
    log(state, f"draft: {idea['id']} -> drafted")
    save_state(state)
    cmd_queue(args)
    print(f"\nDrafts written:\n  {wt_path.relative_to(REPO)}\n  {quiz_path.relative_to(REPO)}")

_REFINED_BLOCK_RE = re.compile(
    r"=====LEARNCRE-(?P<which>WALKTHROUGH|QUIZ)-BEGIN=====\s*\n"
    r"(?P<body>.*?)\n"
    r"=====LEARNCRE-(?P=which)-END=====",
    re.DOTALL,
)

def _split_refined(raw):
    """Pull the walkthrough + quiz blocks out of Claude's refined output."""
    found = {}
    for m in _REFINED_BLOCK_RE.finditer(raw):
        found[m.group("which")] = m.group("body").strip()
    if "WALKTHROUGH" not in found or "QUIZ" not in found:
        missing = [k for k in ("WALKTHROUGH", "QUIZ") if k not in found]
        raise RuntimeError(
            f"Refined output missing marker block(s): {missing}. "
            f"First 300 chars: {raw[:300]!r}"
        )
    return found["WALKTHROUGH"], found["QUIZ"]

def cmd_refine(args):
    config = load_config()
    state = load_state()
    if args.id == "next":
        candidates = [i for i in state["ideas"].values() if i["status"] == "drafted"]
        if not candidates:
            print("No drafted ideas waiting for refinement.")
            return
        candidates.sort(key=lambda i: -(i["score_total"] or 0))
        idea = candidates[0]
    else:
        idea = state["ideas"].get(args.id)
        if not idea:
            print(f"No idea with id {args.id!r}.", file=sys.stderr)
            sys.exit(1)
        if idea["status"] not in ("drafted", "refined"):
            print(f"Idea {args.id} is {idea['status']!r}; only 'drafted' or 'refined' can be refined.", file=sys.stderr)
            sys.exit(1)

    wt_path = REPO / (idea.get("draft_walkthrough_path") or "")
    quiz_path = REPO / (idea.get("draft_quiz_path") or "")
    if not wt_path.is_file() or not quiz_path.is_file():
        print(
            f"Draft files for {idea['id']} are missing — re-run `draft {idea['id']}` first.",
            file=sys.stderr,
        )
        sys.exit(1)

    print(f"Refining via Claude ({config.get('claude_model', 'opus')}): {idea['title']}")
    prompt = REFINE_PROMPT.format(
        title=idea["title"],
        category=idea["category"],
        outline=idea["outline"],
        walkthrough_raw=wt_path.read_text(),
        quiz_raw=quiz_path.read_text(),
    )
    raw = claude_refine(prompt, model=config.get("claude_model", "opus"))
    wt_refined, quiz_refined = _split_refined(raw)

    wt_refined_path = DRAFTS_DIR / f"walkthrough-{idea['id']}.refined.md"
    quiz_refined_path = DRAFTS_DIR / f"quiz-{idea['id']}.refined.md"
    wt_refined_path.write_text(wt_refined.rstrip() + "\n")
    quiz_refined_path.write_text(quiz_refined.rstrip() + "\n")

    idea["status"] = "refined"
    idea["refined_walkthrough_path"] = str(wt_refined_path.relative_to(REPO))
    idea["refined_quiz_path"] = str(quiz_refined_path.relative_to(REPO))
    idea["refined_at"] = datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")
    log(state, f"refine: {idea['id']} -> refined")
    save_state(state)
    cmd_queue(args)
    print(f"\nRefined drafts written:\n  {wt_refined_path.relative_to(REPO)}\n  {quiz_refined_path.relative_to(REPO)}")

def cmd_tick(args):
    config = load_config()
    state = load_state()
    ideas = state["ideas"].values()
    drafted = [i for i in ideas if i["status"] == "drafted"]
    accepted = [i for i in ideas if i["status"] == "accepted"]
    queued = [i for i in ideas if i["status"] == "queued"]
    pending = [i for i in ideas if i["status"] == "pending"]

    # Priority: refine drafted > draft accepted > grade pending > generate if queue is low.
    # Finishing items already in flight beats starting new ones.
    if drafted and claude_available():
        drafted.sort(key=lambda i: -(i["score_total"] or 0))
        args.id = drafted[0]["id"]
        cmd_refine(args)
        return
    if accepted:
        accepted.sort(key=lambda i: -(i["score_total"] or 0))
        args.id = accepted[0]["id"]
        cmd_draft(args)
        return
    if pending:
        cmd_grade(args)
        return
    if len(queued) < config["batch_size"]:
        args.n = config["batch_size"]
        cmd_generate(args)
        return
    waiting = [
        f"{len(queued)} queued awaiting vetting" if queued else None,
        f"{len(drafted)} drafted awaiting refine (claude CLI missing)" if drafted and not claude_available() else None,
    ]
    print("Tick: " + "; ".join(w for w in waiting if w) + "; nothing automatic to do.")

def cmd_status(_args):
    state = load_state()
    counts = {}
    for idea in state["ideas"].values():
        counts[idea["status"]] = counts.get(idea["status"], 0) + 1
    print(f"Curriculum pipeline — total ideas: {len(state['ideas'])}")
    for s in ("pending", "queued", "accepted", "drafted", "refined", "rejected"):
        print(f"  {s:>9}: {counts.get(s, 0)}")
    print(f"  claude CLI: {'available' if claude_available() else 'MISSING'}")
    recent = state.get("log", [])[-5:]
    if recent:
        print("\nRecent activity:")
        for entry in recent:
            print(f"  {entry['at']}  {entry['msg']}")

# ============================================================
# CLI
# ============================================================

def main():
    parser = argparse.ArgumentParser(description="LearnCRE curriculum pipeline (Ollama-driven)")
    sub = parser.add_subparsers(dest="cmd", required=True)

    p = sub.add_parser("generate", help="Generate new curriculum ideas")
    p.add_argument("--n", type=int, default=None)
    p.set_defaults(func=cmd_generate)

    p = sub.add_parser("grade", help="Grade pending ungraded ideas")
    p.set_defaults(func=cmd_grade)

    p = sub.add_parser("queue", help="Refresh docs/CURRICULUM_QUEUE.md from state")
    p.set_defaults(func=cmd_queue)

    p = sub.add_parser("sync-queue", help="Re-read queue markdown checkboxes into state")
    p.set_defaults(func=cmd_sync_queue)

    p = sub.add_parser("accept", help="Mark idea as accepted")
    p.add_argument("id")
    p.set_defaults(func=cmd_accept)

    p = sub.add_parser("reject", help="Mark idea as rejected")
    p.add_argument("id")
    p.set_defaults(func=cmd_reject)

    p = sub.add_parser("draft", help="Draft walkthrough + quiz md for an accepted idea (use 'next' for highest-scoring)")
    p.add_argument("id")
    p.set_defaults(func=cmd_draft)

    p = sub.add_parser("refine", help="Refine a drafted idea via Claude Opus (use 'next' for highest-scoring)")
    p.add_argument("id")
    p.set_defaults(func=cmd_refine)

    p = sub.add_parser("tick", help="One auto step: refine > draft > grade > generate")
    p.set_defaults(func=cmd_tick)

    p = sub.add_parser("status", help="Print pipeline state summary")
    p.set_defaults(func=cmd_status)

    args = parser.parse_args()
    args.func(args)

if __name__ == "__main__":
    main()
