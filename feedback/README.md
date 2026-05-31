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

The Feedback studio is local-first: as you work through the questions it stores
each uploaded memo in the browser (IndexedDB). When you click **Export all**, it
downloads a single zip:

```
learncre-feedback-YYYY-MM-DD.zip
├── manifest.json            # number ↔ id ↔ title ↔ memoFile
└── voice-memos/
    ├── q001-<slug>.m4a
    ├── q002-<slug>.m4a
    └── …
```

To make the memos reviewable here, unzip it into this `feedback/` folder so the
audio lands in `feedback/voice-memos/` and `manifest.json` sits alongside
`questions.json`, then commit. (If you instead keep memos in iCloud named
`q001…q100`, just drop them into `feedback/voice-memos/` before review.)

## For the review session

To pair feedback with questions: read `questions.json`, then for each
`voice-memos/qNNN-*.<ext>` (or `manifest.json[].memoFile`), the leading `qNNN`
is the question `number`. Transcribe each memo and map it back to that question
to produce structure/framing edits.
