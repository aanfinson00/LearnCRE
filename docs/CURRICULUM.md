# Curriculum pipeline

An Ollama-driven loop that proposes CRE curriculum topics, grades them, queues high-scorers for your review, then drafts walkthrough + quiz markdown for the ones you accept.

## What it produces

- **Vet queue:** `docs/CURRICULUM_QUEUE.md` — checkbox interface to accept/reject ranked ideas
- **Drafts:** `docs/CURRICULUM_DRAFTS/walkthrough-<id>.md` and `quiz-<id>.md` per accepted idea
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
[YOU merge] ─ Review the markdown; translate to TS in src/quiz/walkthroughs.ts + templates/
```

**Why markdown drafts, not TypeScript?** Ollama hallucinates numbers. Math errors in markdown are easy to spot during review; math errors in compiled `generate()` functions ship silently.

## Configuration

`.curriculum.json` (repo root) holds:
- `ollama_model` — default `qwen2.5:14b`; override to match what you have pulled
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
python3 scripts/curriculum-pipeline.py draft <id|next>   # draft md for an accepted idea
python3 scripts/curriculum-pipeline.py status            # print summary

# Automated loop (one-shot tick: draft if accepted; else grade; else generate)
python3 scripts/curriculum-pipeline.py tick

# Run the tick continuously every 30 minutes
/loop 30m bash python3 scripts/curriculum-pipeline.py tick
```

## Vetting workflow

1. `python3 scripts/curriculum-pipeline.py generate` — adds & grades a batch
2. Open `docs/CURRICULUM_QUEUE.md`, change `[ ]` to `[x]` for ideas you want to pursue (and `[r]` for ideas to kill)
3. `python3 scripts/curriculum-pipeline.py sync-queue` — applies your checkboxes to state
4. `python3 scripts/curriculum-pipeline.py draft next` — drafts the highest-scoring accepted idea
5. Review `docs/CURRICULUM_DRAFTS/walkthrough-<id>.md` — manually translate to TypeScript in `src/quiz/walkthroughs.ts` (and the quiz draft into `src/quiz/templates/`)
6. Update the idea's status to `shipped` in `.curriculum-state.json` (or just leave it `drafted` — it's a knowledge-base record, not a build artifact)

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
- Configured model pulled: `ollama pull qwen2.5:14b`
- Python 3.8+ (stdlib only — no pip install)
