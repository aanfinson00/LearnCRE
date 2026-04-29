# scripts/jobs — CRE jobs skill-evidence pipeline

Three-stage pipeline that pulls CRE job postings, extracts skill-keyword
frequencies per role, and writes a markdown report we use to validate
content priorities.

## Setup (one-time, ~5 min)

1. Sign up at https://developer.adzuna.com/signup (free, no credit card).
2. Confirm email → dashboard shows `Application ID` and `Application Key`.
3. Export them to your shell:

   ```bash
   export ADZUNA_APP_ID=xxxxxxxx
   export ADZUNA_APP_KEY=xxxxxxxxxxxxxxxxxxxx
   ```

   Or put them in a local `.env` file (don't commit it — `data/jobs/` is in
   `.gitignore` but the repo's top-level `.env` should also stay local).

4. Free tier limits: **100 calls/day**. A full pipeline run is 15 calls
   (3 queries × 5 roles × 1 page), well under the limit. Each call returns up
   to 50 listings, so a default run nets ~250 listings per role after dedup.

## Three-stage pipeline

```bash
# 1. Pull raw JSON from Adzuna → data/jobs/<role>-<date>.json
python scripts/jobs/fetch.py

# 2. Extract keyword frequencies → data/jobs/<role>-keywords.csv
python scripts/jobs/extract.py

# 3. Render the markdown report → docs/role-skill-evidence.md
python scripts/jobs/report.py
```

Each stage is independently re-runnable. If you want to add more keywords to
the vocabulary, edit `keywords.py` and re-run extract + report (no re-fetch
needed — the raw JSON is preserved).

### Per-role iteration

```bash
python scripts/jobs/fetch.py --role acquisitions --pages 2  # 2 × 50 × 3 queries = 300 listings
python scripts/jobs/extract.py --role acquisitions
python scripts/jobs/report.py --top 40
```

## What gets generated

| Path | Content | Committed? |
|---|---|---|
| `data/jobs/<role>-<date>.json` | Raw Adzuna response, deduped by listing id | **No** (gitignored) |
| `data/jobs/<role>-keywords.csv` | Keyword × frequency per role | **No** (gitignored) |
| `docs/role-skill-evidence.md` | Human-readable report — top keywords per role | **Yes** |

Raw JSON is gitignored to keep the repo lean and to avoid stale data piling
up. Re-run the pipeline to refresh; the `Last refresh:` line in the report
shows when it was generated.

## Vocabulary: editing `keywords.py`

`keywords.py` controls both the search queries and the keyword vocabulary.
Two lists matter:

- `ROLE_QUERIES`: per role, the search strings sent to Adzuna's `what` field.
- `KEYWORD_GROUPS`: skill keywords organized into groups for readability.

To add a new keyword (e.g. `cppi`), append it to the right group in
`KEYWORD_GROUPS`. The pipeline picks up the change on the next `extract.py`
run.

To rebalance role queries (e.g. add "asset management associate" because the
existing queries are too senior), append to the relevant `ROLE_QUERIES` list.
This will widen the listing pool but use more daily-call budget.

## Honest limitations

1. **Adzuna's coverage is not exhaustive.** Some senior-only / specialized
   CRE jobs post exclusively on Selby Jennings, A.CRE Jobs, or LinkedIn
   recruiter-only and won't surface here. The pipeline captures *generalist*
   junior-to-mid postings, which is what most LearnCRE users are prepping for.

2. **Substring-matching has false positives.** "noi" matches "noise" if we
   weren't careful with regex; we use word-boundary lookarounds in
   `extract.py` to mitigate but no regex is perfect. Inspect the CSV's
   `mentions` column for outliers before drawing conclusions.

3. **Job-posting language is recruiter-flavored.** Postings list "Argus" and
   "financial modeling" with high frequency because those are the recruiter
   keywords; actual interview math drills different muscles. Use the report
   alongside `docs/interview-questions.md` (curated interview questions),
   not as a standalone signal.

4. **No LinkedIn scraping.** LinkedIn TOS prohibits it; we don't go there.
   Adzuna pulls from Indeed-style aggregators which have their own coverage
   tradeoffs.

## What's *not* in this pipeline

- **No login-walled scraping** (Wall Street Oasis paid-tier, Glassdoor)
- **No personally-identifying data** — we drop names / contact / employer
  identifiers if they accidentally surface in descriptions
- **No high-volume scraping** — capped at Adzuna's free tier
- **No automated content-gap proposals** — the report surfaces frequency
  data; humans decide what to add
