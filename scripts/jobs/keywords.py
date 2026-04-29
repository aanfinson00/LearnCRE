"""
Skill-keyword vocabulary used by extract.py + report.py.

Add or remove keywords here; the pipeline picks them up automatically.
Keywords are lowercase substrings matched against job-description text;
the matcher applies word-boundary regex so "irr" matches "IRR" but not
"mirror".

Each role-bucket maps to the LearnCRE Role union from src/types/role.ts:
  acquisitions / assetManagement / mortgageUw / portfolioMgmt / development
"""

from __future__ import annotations

# Search terms used by fetch.py to query the jobs API. Each role-bucket maps
# to one or more queries; we typically pull ~100 listings per query.
ROLE_QUERIES: dict[str, list[str]] = {
    "acquisitions": [
        "real estate acquisitions analyst",
        "real estate acquisitions associate",
        "commercial real estate acquisitions",
    ],
    "assetManagement": [
        "real estate asset management analyst",
        "commercial real estate asset manager",
        "REIT asset management",
    ],
    "mortgageUw": [
        "commercial real estate underwriter",
        "CRE debt analyst",
        "commercial mortgage underwriter",
    ],
    "portfolioMgmt": [
        "real estate portfolio manager",
        "real estate fund analyst",
        "real estate investment management",
    ],
    "development": [
        "real estate development analyst",
        "real estate development associate",
        "commercial real estate development",
    ],
}

# Skill keywords to count in job descriptions. Grouped for readability;
# the pipeline flattens the values across groups.
KEYWORD_GROUPS: dict[str, list[str]] = {
    "core_metrics": [
        "irr",
        "moic",
        "equity multiple",
        "noi",
        "cap rate",
        "dscr",
        "debt yield",
        "ltv",
        "ltc",
        "cash on cash",
        "yield on cost",
        "lease-up",
        "stabilized",
        "mark-to-market",
    ],
    "tools": [
        "argus",
        "argus enterprise",
        "excel",
        "vba",
        "sql",
        "python",
        "tableau",
        "power bi",
        "powerbi",
        "microsoft office",
    ],
    "deal_lifecycle": [
        "underwriting",
        "due diligence",
        "acquisition",
        "disposition",
        "asset management",
        "portfolio management",
        "development",
        "refinance",
        "refi",
        "value-add",
        "value add",
        "ground-up",
    ],
    "lender_focus": [
        "loan sizing",
        "credit memo",
        "loan committee",
        "intercreditor",
        "covenants",
        "appraisal",
        "btb",
        "agency",
        "fannie",
        "freddie",
        "cmbs",
        "bridge debt",
    ],
    "asset_class": [
        "multifamily",
        "office",
        "industrial",
        "retail",
        "hospitality",
        "self-storage",
        "data center",
        "medical office",
        "mixed-use",
        "student housing",
        "senior housing",
    ],
    "fund_econ": [
        "promote",
        "waterfall",
        "preferred return",
        "carried interest",
        "fund-level",
        "lp",
        "gp",
        "j-curve",
        "co-invest",
    ],
    "soft": [
        "financial modeling",
        "modeling",
        "presentation",
        "memo",
        "ic memo",
        "investment committee",
        "investor relations",
    ],
}


def all_keywords() -> list[str]:
    """Flatten KEYWORD_GROUPS into a single deduped lowercase list."""
    out: list[str] = []
    seen: set[str] = set()
    for group in KEYWORD_GROUPS.values():
        for kw in group:
            k = kw.lower()
            if k not in seen:
                seen.add(k)
                out.append(k)
    return out
