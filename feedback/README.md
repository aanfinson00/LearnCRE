# Feedback — voice-memo review of the 100 wordy questions

This folder is the bridge between the in-app **Feedback studio** (Contribute →
Feedback studio) and a future review session.

## What's here

- **`questions.json`** — the 100 questions (1–100), generated from live app
  content (`src/quiz/reviewQuestions.ts`). Each entry has `number`, `id`,
  `type`, `title`, `meta`, and the renderable `blocks`. This is the
  machine-readable companion to the human-readable `../QUESTION_REVIEW.md`.
- **`voice-memos/`** — where the audio feedback lands (see below). Empty until
  memos are added.

Regenerate `questions.json` (and `../QUESTION_REVIEW.md`) after any question
content changes:

```
npx vitest run src/test/extractQuestions.test.ts
```

## How the memos get here

Memos are **batch memos**: one recording covers a range of questions (e.g.
"Q1–15"), not one file per question. The Feedback studio is local-first — each
uploaded memo is stored in the browser (IndexedDB) tagged with the range it
covers. When you click **Export all**, it downloads a single zip:

```
learncre-feedback-YYYY-MM-DD.zip
├── manifest.json            # per-memo range + the questions it covers
└── voice-memos/
    ├── q001-015-<slug>.m4a
    ├── q016-030-<slug>.m4a
    └── …
```

The audio filename encodes the range: `q{from}-{to}-{label}.<ext>`.

To make the memos reviewable here, unzip it into this `feedback/` folder so the
audio lands in `feedback/voice-memos/` and `manifest.json` sits alongside
`questions.json`, then commit.

## For the review session

`manifest.json` shape:

```json
{
  "memos": [
    {
      "fromNumber": 1,
      "toNumber": 15,
      "note": "pricing cases",
      "memoFile": "q001-015-pricing-cases.m4a",
      "covers": [{ "number": 1, "id": "sit:...", "title": "…" }, …]
    }
  ]
}
```

To pair feedback with questions: for each memo, transcribe the audio, then walk
its `covers[]` (or read questions `fromNumber..toNumber` from `questions.json`)
and attribute each segment of spoken feedback to the question it addresses —
producing structure/framing edits. The `q{from}-{to}` prefix on each filename is
enough to recover the range even without the manifest.
