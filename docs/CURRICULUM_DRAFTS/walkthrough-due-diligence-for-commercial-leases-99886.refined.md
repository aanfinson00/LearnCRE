# Due Diligence for Commercial Leases

**Category:** legal-document
**Audience:** analyst | career-switcher

## Setup narrative

You're underwriting a 5-year office lease on behalf of the tenant before signing the LOI. The premises are 10,000 SF. The landlord's term sheet quotes a $30.00/SF starting base rent (flat across the term, NNN), 6 months of free rent in Year 1, and a $40.00/SF tenant improvement allowance. Your job is to translate the face economics into a net effective rent so the C-suite can compare this deal against the two competing buildings on the shortlist.

## Steps

### Step 1 — Year 1 base rent
- **Prompt:** Calculate the Year 1 base rent before any concessions.
- **Expected:** 300,000 usd
- **Hint:** Multiply rentable square footage by the starting base rent per SF.
- **Result description:** Year 1 face rent is the headline number the broker will quote. It is the anchor every concession is measured against — do not skip it just because it looks trivial.

### Step 2 — Aggregate face rent over the term
- **Prompt:** Compute total contractual base rent over the 5-year term (flat rent, no escalations).
- **Expected:** 1,500,000 usd
- **Hint:** Year 1 base rent times the term in years, since the rent is flat.
- **Result description:** Aggregate face rent is the gross exposure the tenant is signing up for. Every concession reduces this number; everything outside this number (opex, parking, signage) is incremental.

### Step 3 — Dollar value of free rent
- **Prompt:** Quantify the 6 months of free rent in Year 1 as a dollar concession.
- **Expected:** 150,000 usd
- **Hint:** Six months is half a year. Take half of Year 1 base rent.
- **Result description:** Free rent is a timing concession, not a rate concession — the landlord still books face rent for reporting, but the tenant's cash outlay drops by this amount. Always price it in dollars, never in months.

### Step 4 — Tenant improvement allowance
- **Prompt:** Calculate the total TI allowance the landlord is funding.
- **Expected:** 400,000 usd
- **Hint:** TI per SF times rentable square footage.
- **Result description:** TI is a capital concession that offsets the tenant's buildout cost. From the tenant's perspective it behaves like negative rent: a dollar of TI is worth the same as a dollar of free rent at signing.

### Step 5 — Net effective rent over the term
- **Prompt:** Compute the net effective rent the tenant actually pays over the 5-year term after free rent and TI.
- **Expected:** 950,000 usd
- **Hint:** Aggregate face rent minus the free rent concession minus the TI allowance.
- **Result description:** Net effective rent strips out the marketing and gives you the real economics. This is the number you compare across competing buildings — face rent alone is misleading whenever concessions differ.

### Step 6 — Net effective rent per SF per year
- **Prompt:** Express the net effective rent on a per-SF, per-year basis.
- **Expected:** 19.00 usdPerSf
- **Hint:** Divide net effective rent by rentable SF and by term in years.
- **Result description:** A $30.00/SF face rent prints as $19.00/SF on a net effective basis — a 37% discount once concessions are amortized. This is the apples-to-apples figure that belongs on the deal memo.

## Takeaway

Commercial lease DD is about translating the landlord's marketing economics into the tenant's cash economics. Face rent, free rent, and TI are three separate levers landlords flex independently; net effective rent collapses them into one comparable number. Always run NER before signing an LOI — a building with a higher face rent can easily be the cheaper deal once concessions clear.

## Notes for the converter

Numbers are flat-rent for arithmetic clarity. If escalations are added later, recompute aggregate face rent as the sum of annual rents, not Year 1 × term. NER per SF/year here uses the simple (undiscounted) convention — a discounted NER would require a tenant discount rate and is out of scope for this walkthrough.
