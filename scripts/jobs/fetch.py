"""
Fetch CRE job listings from the Adzuna API and dump raw JSON to data/jobs/.

Usage:
  ADZUNA_APP_ID=... ADZUNA_APP_KEY=... python scripts/jobs/fetch.py
  ADZUNA_APP_ID=... ADZUNA_APP_KEY=... python scripts/jobs/fetch.py --role acquisitions
  ADZUNA_APP_ID=... ADZUNA_APP_KEY=... python scripts/jobs/fetch.py --pages 2

Free tier: 100 calls/day; one call returns up to 50 results. Default config
fetches 50 results × 3 queries × 5 roles = 15 calls per full run, well under
the limit.

The raw JSON is saved per role to data/jobs/<role>-<date>.json. Run extract.py
next to pull skill keywords out of the descriptions.

Environment variables (required):
  ADZUNA_APP_ID
  ADZUNA_APP_KEY

See https://developer.adzuna.com/signup for free credentials.
"""

from __future__ import annotations

import argparse
import json
import os
import sys
import time
import urllib.parse
import urllib.request
from datetime import date
from pathlib import Path
from typing import Any

from keywords import ROLE_QUERIES

OUT_DIR = Path(__file__).resolve().parents[2] / "data" / "jobs"
ADZUNA_BASE = "https://api.adzuna.com/v1/api/jobs/us/search"


def fetch_page(
    app_id: str,
    app_key: str,
    query: str,
    page: int = 1,
    results_per_page: int = 50,
) -> dict[str, Any]:
    """One Adzuna API call. Returns parsed JSON dict or raises on error."""
    params = {
        "app_id": app_id,
        "app_key": app_key,
        "results_per_page": results_per_page,
        "what": query,
        "content-type": "application/json",
    }
    url = f"{ADZUNA_BASE}/{page}?{urllib.parse.urlencode(params)}"
    req = urllib.request.Request(
        url,
        headers={"Accept": "application/json", "User-Agent": "LearnCRE-jobs-pipeline"},
    )
    try:
        with urllib.request.urlopen(req, timeout=20) as resp:
            payload = resp.read()
    except urllib.error.HTTPError as e:
        body = e.read().decode("utf-8", errors="replace")[:300]
        raise RuntimeError(f"Adzuna {e.code}: {body}") from e
    return json.loads(payload)


def fetch_role(
    app_id: str,
    app_key: str,
    role: str,
    queries: list[str],
    pages: int = 1,
) -> list[dict[str, Any]]:
    """Pull `pages` × `len(queries)` × 50 listings, dedup by id."""
    by_id: dict[str, dict[str, Any]] = {}
    for q in queries:
        for p in range(1, pages + 1):
            print(f"  [{role}] query='{q}' page={p}", file=sys.stderr)
            try:
                payload = fetch_page(app_id, app_key, q, page=p)
            except Exception as e:
                print(f"  [{role}] error: {e}", file=sys.stderr)
                continue
            results = payload.get("results", [])
            for r in results:
                rid = str(r.get("id"))
                if rid and rid not in by_id:
                    by_id[rid] = r
            # Be polite — Adzuna doesn't formally rate-limit but stagger anyway
            time.sleep(0.5)
    return list(by_id.values())


def main() -> int:
    parser = argparse.ArgumentParser(description="Fetch CRE jobs from Adzuna")
    parser.add_argument(
        "--role",
        choices=list(ROLE_QUERIES.keys()) + ["all"],
        default="all",
        help="Role to fetch; 'all' iterates every role bucket",
    )
    parser.add_argument(
        "--pages",
        type=int,
        default=1,
        help="Pages per query (1 = 50 results / query)",
    )
    args = parser.parse_args()

    app_id = os.environ.get("ADZUNA_APP_ID", "").strip()
    app_key = os.environ.get("ADZUNA_APP_KEY", "").strip()
    if not app_id or not app_key:
        print(
            "ERROR: set ADZUNA_APP_ID and ADZUNA_APP_KEY env vars.\n"
            "       Get free creds at https://developer.adzuna.com/signup",
            file=sys.stderr,
        )
        return 2

    OUT_DIR.mkdir(parents=True, exist_ok=True)

    roles = list(ROLE_QUERIES.keys()) if args.role == "all" else [args.role]
    today = date.today().isoformat()
    for role in roles:
        print(f"==> {role}", file=sys.stderr)
        listings = fetch_role(app_id, app_key, role, ROLE_QUERIES[role], args.pages)
        out_path = OUT_DIR / f"{role}-{today}.json"
        out_path.write_text(json.dumps(listings, indent=2))
        print(f"    saved {len(listings)} listings to {out_path}", file=sys.stderr)

    return 0


if __name__ == "__main__":
    sys.exit(main())
