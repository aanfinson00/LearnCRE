# Question bank — area coverage & phrasing queue

Tracks how many questions each `Role` area (`src/types/role.ts`) carries across
the shipped question bank — situational cases, longform cases, quiz templates,
and walkthroughs — and queues candidate phrasings for whichever area is most
underrepresented. Counts a case once per role it's tagged with (a case tagged
`['development', 'acquisitions']` counts toward both).

Regenerate the counts with:

```sh
grep -c "roles:" src/quiz/situational/*.ts src/quiz/longform/*.ts src/quiz/templates/*.ts | grep -v index | awk -F: '{s+=$2} END{print s}'
```

or the equivalent per-file `roles: [...]` scan across `situational/`, `longform/`,
`templates/`, and `walkthroughs.ts`.

## 2026-09-07 snapshot

| Area | Situational | Longform | Templates | Walkthroughs | Total |
|---|---|---|---|---|---|
| acquisitions | 40 | 6 | 60 | 8 | **114** |
| assetManagement | 31 | 3 | 20 | 4 | **58** |
| portfolioMgmt | 25 | 4 | 16 | 3 | **48** |
| mortgageUw | 19 | 1 | 16 | 2 | **38** |
| development | 9 | 1 | 10 | 2 | **22** |

**Development is the least-covered area** — roughly a fifth of acquisitions'
count and clearly behind every other role, consistently across all four
content types (not just one weak bucket dragging the average down).

Existing development-tagged situational cases (for de-duplication): construction
draw mechanics, LTC vs. LTV, equity-first vs. pari-passu structuring, a $2M cost
overrun, change-order pricing, retainage release, liquidated damages, ground
lease vs. fee simple, and lease-up absorption timing. The 10 phrasings below
were chosen to fill gaps in the development lifecycle (entitlement → land basis
→ capital stack → draws → lease-up → stabilization) that none of those already
cover.

## Candidate phrasings — development (queued, not yet drafted into full cases)

1. You're six months from the zoning vote — how much of the land basis is actually at risk if it fails?
2. GMP vs. cost-plus — which contract actually protects your budget on a cost overrun?
3. The GC just walked off the job — what do the payment and performance bonds actually cover?
4. The completion guaranty just got called — what does the sponsor now owe, and to whom?
5. The construction loan needs 60% pre-leased to fund the next draw — how many square feet is that?
6. You've hit stabilization — does this deal actually qualify for takeout (mini-perm) financing?
7. Yield-on-cost is 6.5% and today's exit cap is 5.5% — is that spread wide enough to break ground?
8. Construction mezzanine — where does it actually sit in the capital stack if the deal goes sideways?
9. The city offers a density bonus for including affordable units — does the extra height actually pencil?
10. A Phase II environmental report comes back with contamination mid-construction — who pays for remediation, and does the loan survive?

**Next step:** pick from this list (or the community `question_submissions`
queue, once the app's Supabase project is reachable — the three Supabase
projects visible to this session don't match LearnCRE's schema, so the
`question_submissions.status = 'approved'` counts by `role_hint` couldn't be
pulled directly this run) and draft full situational cases in
`src/quiz/situational/` following the existing file shape (scenario, data
points, 4-option choice with reasoning, takeaway, tips).
