# Curriculum pipeline

A two-tier loop: Ollama does the high-volume ideation, grading, and drafting (free, fast, error-prone); Claude (Opus) does the final refinement on the small subset of drafts that survive grading and human vetting (expensive, accurate).

## What it produces

- **Vet queue:** `docs/CURRICULUM_QUEUE.md` — checkbox interface to accept/reject ranked ideas
- **Raw drafts:** `docs/CURRICULUM_DRAFTS/walkthrough-<id>.md` and `quiz-<id>.md` (Ollama output)
- **Refined drafts:** `docs/CURRICULUM_DRAFTS/walkthrough-<id>.refined.md` and `quiz-<id>.refined.md` (Claude-polished — this is what you actually review)
- **Knowledge base:** `.curriculum-state.json` — every idea ever generated with status, scores, timestamps

## Pipeline stages

```
generate ─┐
          │ Ollama produces N ideas across configured categories
          ▼
grade  ───┤ Ollama scores rubric (foundational, walkthrough-fit, novelty, reach)
          │   ≥ threshold → queued      < threshold → rejected
          ▼
queue  ───┤ Refreshes docs/CURRICULUM_QUEUE.md
          ▼
[YOU vet] ─ Check [x] in the queue markdown → run `sync-queue`
          ▼
draft  ───┤ Ollama drafts walkthrough.md + quiz.md per accepted idea
          ▼
refine ───┤ Claude Opus verifies math, fixes concepts, polishes prose → *.refined.md
          ▼
[YOU merge] ─ Review the refined markdown; translate to TS in src/quiz/walkthroughs.ts + templates/
```

**Why two tiers?** Ollama hallucinates numbers and occasionally mangles concepts. Doing the high-volume work locally costs nothing in tokens; spending Claude only on accepted ideas keeps the bill bounded while still catching the math/concept errors before they ship.

**Why keep both raw and refined files?** The diff is informative — looking at what Claude had to fix shows where the rubric or prompts let weak ideas through.

## Configuration

`.curriculum.json` (repo root) holds:
- `ollama_model` — default `qwen2.5:14b`; override to match what you have pulled
- `claude_model` — default `opus`; passed as `--model` to the `claude` CLI for refinement
- `categories` — the topic buckets the generator picks from
- `rubric_dims` + `rubric_threshold_total` — grading rubric and pass mark
- `batch_size` — ideas per generate call
- `max_pending` — caps the ungraded backlog

## Usage

```sh
# One-shot commands
python3 scripts/curriculum-pipeline.py generate          # add a batch of ideas
python3 scripts/curriculum-pipeline.py grade             # grade any ungraded
python3 scripts/curriculum-pipeline.py queue             # refresh queue.md
python3 scripts/curriculum-pipeline.py sync-queue        # re-read queue checkboxes into state
python3 scripts/curriculum-pipeline.py accept <id>       # accept by id from CLI
python3 scripts/curriculum-pipeline.py reject <id>       # reject by id from CLI
python3 scripts/curriculum-pipeline.py draft <id|next>   # draft md for an accepted idea (Ollama)
python3 scripts/curriculum-pipeline.py refine <id|next>  # polish a drafted idea (Claude Opus)
python3 scripts/curriculum-pipeline.py status            # print summary

# Automated loop (one-shot tick: refine > draft > grade > generate)
python3 scripts/curriculum-pipeline.py tick

# Run the tick continuously every 30 minutes
/loop 30m bash python3 scripts/curriculum-pipeline.py tick
```

## Vetting workflow

1. `python3 scripts/curriculum-pipeline.py generate` — adds & grades a batch (Ollama)
2. Open `docs/CURRICULUM_QUEUE.md`, change `[ ]` to `[x]` for ideas to pursue (and `[r]` for ideas to kill)
3. `python3 scripts/curriculum-pipeline.py sync-queue` — applies your checkboxes to state
4. `python3 scripts/curriculum-pipeline.py draft next` — Ollama drafts the highest-scoring accepted idea
5. `python3 scripts/curriculum-pipeline.py refine next` — Claude Opus polishes the highest-scoring drafted idea
6. Review `docs/CURRICULUM_DRAFTS/walkthrough-<id>.refined.md` — manually translate to TypeScript in `src/quiz/walkthroughs.ts` (and the refined quiz into `src/quiz/templates/`). Compare against the raw `.md` to see what Claude fixed.
7. Update the idea's status to `shipped` in `.curriculum-state.json` (or just leave it `refined` — it's a knowledge-base record, not a build artifact)

Or use `tick` in a `/loop` to automate steps 1, 4, and 5 — the loop will refine whatever is `drafted`, draft whatever is `accepted`, grade whatever is `pending`, and top up the queue when it's low. Steps 2-3 and 6-7 stay manual.

## Knowledge base

Everything ever generated stays in `.curriculum-state.json`:
- Rejected ideas are still searchable (avoids regenerating the same dud)
- Generated topics seed future deduplication
- The log tracks generate/grade/draft activity timeline

Sort/filter outside the pipeline with `jq`:
```sh
jq '.ideas | to_entries | map(.value) | sort_by(-.score_total)' .curriculum-state.json
jq '.ideas | to_entries | map(.value) | map(select(.status=="rejected"))' .curriculum-state.json
```

## Prerequisites

- Local Ollama daemon: `ollama serve` (or background)
- Configured Ollama model pulled: `ollama pull qwen2.5:14b`
- `claude` CLI on PATH (Claude Code) — used for the refine stage; if missing, `tick` will skip refinement and surface drafted ideas as pending
- Python 3.8+ (stdlib only — no pip install)
