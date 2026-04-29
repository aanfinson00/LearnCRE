"""
Extract skill-keyword frequencies from raw Adzuna JSON dumps.

Usage:
  python scripts/jobs/extract.py
  python scripts/jobs/extract.py --role acquisitions

Reads data/jobs/<role>-*.json files, scans each listing's title + description,
counts how many listings mention each keyword from keywords.py, and writes a
CSV per role to data/jobs/<role>-keywords.csv with columns:

  keyword, mentions, postings_count, percent_of_postings

The percent_of_postings column is what report.py uses for the headline numbers.
A keyword appearing in 70% of acquisitions postings is a much stronger signal
than one with 20 raw mentions across 5 postings.
"""

from __future__ import annotations

import argparse
import csv
import json
import re
import sys
from pathlib import Path

from keywords import ROLE_QUERIES, all_keywords

OUT_DIR = Path(__file__).resolve().parents[2] / "data" / "jobs"


def _make_pattern(keyword: str) -> re.Pattern[str]:
    """Word-boundary regex around the keyword. Multi-word terms keep spaces."""
    # Escape regex specials but treat hyphens as literal
    esc = re.escape(keyword.lower())
    # \b doesn't work cleanly around non-word boundaries (e.g. "ic memo");
    # use lookarounds instead so multi-word phrases match precisely.
    return re.compile(rf"(?<![A-Za-z0-9]){esc}(?![A-Za-z0-9])", re.IGNORECASE)


def extract_role(role: str) -> dict[str, dict[str, int]]:
    """Returns {keyword: {mentions, postings_with_at_least_one_mention}}."""
    keywords = all_keywords()
    patterns = {kw: _make_pattern(kw) for kw in keywords}
    counts: dict[str, dict[str, int]] = {
        kw: {"mentions": 0, "postings": 0} for kw in keywords
    }
    n_postings = 0

    files = sorted(OUT_DIR.glob(f"{role}-*.json"))
    if not files:
        print(f"  [{role}] no data files at {OUT_DIR}/{role}-*.json", file=sys.stderr)
        return {"_meta": {"postings": 0, "files": 0}}

    for f in files:
        try:
            listings = json.loads(f.read_text())
        except Exception as e:
            print(f"  [{role}] error reading {f}: {e}", file=sys.stderr)
            continue
        for listing in listings:
            n_postings += 1
            text = " ".join(
                str(listing.get(k, "")) for k in ("title", "description", "category")
            )
            for kw, pat in patterns.items():
                hits = len(pat.findall(text))
                if hits > 0:
                    counts[kw]["mentions"] += hits
                    counts[kw]["postings"] += 1

    counts["_meta"] = {"postings": n_postings, "files": len(files)}
    return counts


def write_csv(role: str, counts: dict[str, dict[str, int]]) -> Path:
    meta = counts.pop("_meta", {"postings": 0, "files": 0})
    n = meta["postings"]
    out = OUT_DIR / f"{role}-keywords.csv"
    with out.open("w", newline="") as f:
        w = csv.writer(f)
        w.writerow(["keyword", "mentions", "postings_count", "percent_of_postings"])
        rows = sorted(
            counts.items(),
            key=lambda kv: (-kv[1]["postings"], -kv[1]["mentions"], kv[0]),
        )
        for kw, c in rows:
            pct = (c["postings"] / n * 100) if n > 0 else 0
            w.writerow([kw, c["mentions"], c["postings"], f"{pct:.1f}"])
    return out


def main() -> int:
    parser = argparse.ArgumentParser(description="Extract skill keywords from job JSON")
    parser.add_argument(
        "--role",
        choices=list(ROLE_QUERIES.keys()) + ["all"],
        default="all",
    )
    args = parser.parse_args()

    roles = list(ROLE_QUERIES.keys()) if args.role == "all" else [args.role]
    for role in roles:
        print(f"==> {role}", file=sys.stderr)
        counts = extract_role(role)
        out = write_csv(role, counts)
        print(f"    wrote {out}", file=sys.stderr)
    return 0


if __name__ == "__main__":
    sys.exit(main())
