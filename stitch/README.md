# Stitch lifecycle policy

## Purpose

`stitch/` is the project source of truth for **human/manual reference bundles** only. Nothing under this directory is an approved automated regression baseline.

## Lifecycle states

| State | Meaning | Allowed usage |
|---|---|---|
| `active manual reference` | Current manual reference bundle for a live route/page. | Human review, design comparison, implementation handoff. |
| `historical manual reference` | Retained bundle from an older or inactive route state. | Traceability only; do not treat as current authority for new work. |
| `automated baseline` | Approved visual-regression artifact used by tests. | Only files under `tests/visual/__screenshots__/`. |

## Authority boundary

- `stitch/` contains manual reference material such as captured HTML, screenshots, and design notes for humans.
- `tests/visual/__screenshots__/` contains the approved automated baselines consumed by Playwright visual tests.
- `stitch/*.png`, `stitch/**/*.png`, and any other asset under `stitch/` are **never** automated baselines.
- If manual-reference guidance and test-baseline guidance appear to conflict, `stitch/README.md` defines Stitch authority and `tests/visual/README.md` defines baseline/test workflow.

## Inventory and current status

| Bundle | Route scope | Status | Assets | Authority notes |
|---|---|---|---|---|
| `stitch/` | `/` landing page | `active manual reference` | `stitch/code.html`, `stitch/screen.png`, `stitch/DESIGN.md` | Current human-review bundle for landing implementation and manual validation. |
| `stitch/pricing/` | `/pricing` | `historical manual reference` | `stitch/pricing/code.html`, `stitch/pricing/screen.png`, `stitch/pricing/DESIGN.md` | Retained for traceability/manual context only; not active authority unless explicitly reactivated in a future change. |

## Pricing reactivation rule

`stitch/pricing/` stays historical/manual-only until a future change **explicitly** reactivates it. Any such change must, in the same diff:

1. update the inventory table in this file,
2. update downstream docs that point to Stitch authority (`docs/manual-validation.md`, `tests/visual/README.md`, and any new related docs), and
3. keep the authority boundary clear between manual references and automated baselines.

Until those updates happen together, `stitch/pricing/` must not be treated as active manual authority.

## Path preservation for this policy change

This lifecycle-policy change is documentation-only. It does **not** move, rename, delete, or regenerate Stitch assets. The expected preserved paths are:

- `stitch/code.html`
- `stitch/screen.png`
- `stitch/DESIGN.md`
- `stitch/pricing/code.html`
- `stitch/pricing/screen.png`
- `stitch/pricing/DESIGN.md`
