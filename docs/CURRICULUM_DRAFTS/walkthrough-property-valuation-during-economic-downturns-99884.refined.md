# Property Valuation During Economic Downturns

**Category:** macro-cycle  
**Audience:** analyst  

## Setup narrative

A core-plus office asset was acquired at a 5.0% going-in cap on $10.0M of stabilized NOI. Twelve months into a downturn, rents have softened (NOI compresses 10%) and buyers are demanding a higher risk premium (cap rates blow out 100 bps). Reprice the asset and attribute the value loss.

## Steps

### Step 1 — Acquisition value
- Prompt: At $10M NOI and a 5.0% cap rate, what was the acquisition value?
- Expected: $200,000,000 usd
- Unit: usd
- Hint: Value = NOI / cap rate.
- Result description: The asset was bought at a $200M basis — the benchmark we'll measure value loss against.

### Step 2 — Downturn NOI
- Prompt: NOI compresses 10% as concessions widen and a tenant downsizes. New NOI?
- Expected: $9,000,000 usd
- Unit: usd
- Hint: $10M × (1 − 0.10).
- Result description: $1M of NOI is gone before we touch the cap rate. This is the income-side hit.

### Step 3 — Repriced cap rate
- Prompt: Buyer-required cap rates widen 100 bps from the 5.0% going-in. New exit cap?
- Expected: 6.0 pct
- Unit: pct
- Hint: 100 bps = 1.0%.
- Result description: A 100 bps blowout looks small on paper but compresses value disproportionately because cap rate sits in the denominator.

### Step 4 — Repriced value
- Prompt: Apply the new NOI and new cap. What does the asset clear at today?
- Expected: $150,000,000 usd
- Unit: usd
- Hint: $9M / 6.0%.
- Result description: The asset reprices to $150M — a $50M markdown off cost basis.

### Step 5 — Value decline
- Prompt: Express the markdown as a % of acquisition value.
- Expected: 25.0 pct
- Unit: pct
- Hint: ($200M − $150M) / $200M.
- Result description: 10% NOI compression plus 100 bps of cap expansion compounded into a 25% value loss. Multiplicative, not additive.

### Step 6 — Cap-expansion attribution
- Prompt: Holding NOI flat at the downturn level of $9M, how much value did the 5.0% → 6.0% cap move alone destroy?
- Expected: $30,000,000 usd
- Unit: usd
- Hint: $9M/5.0% − $9M/6.0%.
- Result description: Cap expansion accounts for $30M of the $50M loss; the remaining $20M is NOI compression. In a downturn, cap movement usually dominates — that's the lesson.

## Takeaway

In a downturn, cap rate expansion and NOI compression compound multiplicatively. A modest-looking 10% NOI haircut plus 100 bps of cap blowout produced a 25% value loss — and 60% of that loss came from the cap rate alone. Underwriters who only flex the income side will systematically overstate downturn values.

## Notes for the converter

- All figures self-consistent: $200M → $9M NOI → 6.0% cap → $150M → 25% decline → $30M cap-driven loss.
- Attribution is sequential (NOI first, then cap). Reversing the order changes the $20M/$30M split but not the $50M total — call this out if the UI exposes both decompositions.
- Suitable difficulty: analyst-level; introduces multiplicative risk stacking, a recurring concept across macro-cycle topics.
