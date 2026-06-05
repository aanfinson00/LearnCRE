# Quiz template: Disclosed referral fee — net commission

**Kind:** creEthicsScenarioAnalysis
**Category:** trust-relationships
**Roles:** acquisitions, assetManagement, development

## Prompt template

"A listing brokerage earns a gross commission of {gross_commission} on a sale. State ethics rules require it to disclose and pay a {referral_pct}% referral fee to the broker who originated the client. What is the brokerage's net commission after the disclosed referral?"

## Inputs to randomize

- `{gross_commission}`: [50000..500000 step 5000] — Gross commission earned on the listing side (USD).
- `{referral_pct}`: [10..30 step 5] — Disclosed referral fee, as a percent of gross commission.

## Expected computation

\({gross\_commission} \times (1 - {referral\_pct}/100)\)

## Answer unit

usd

## Tolerance

- type: abs
- band: 100

## Tips (3-5 lines, quick mental-math shortcuts)

- Flip the referral percent to a keep-rate first: 20% out → keep 80%.
- Multiply by the keep-rate, not the referral rate — fewer subtraction errors.
- Sanity check: a 25% referral on $200,000 nets $150,000.
- If the referral is 10%, just shave one tenth off the gross.

## Solution narrative (template)

"Gross commission is {gross_commission}. The disclosed referral consumes {referral_pct}% of that, so the brokerage keeps (100 − {referral_pct})% = the remaining share. Net = {gross_commission} × (1 − {referral_pct}/100). The disclosure is what makes the payment legal; the arithmetic is just the split."
