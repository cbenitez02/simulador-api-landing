# Git workflow

## Branching model

This repository uses a **main-only workflow** with short-lived branches.

- `main` is the only long-lived stable branch.
- All changes should land through pull requests.
- Feature branches should be deleted after merge.

We do **not** use a permanent `develop` branch.
We also avoid release branches unless the project later needs a formal release train.

## Branch naming

Use one of these prefixes:

- `feat/`
- `fix/`
- `refactor/`
- `docs/`
- `test/`
- `chore/`

Examples:

- `feat/pricing-page`
- `fix/global-branding`
- `refactor/shared-shell`
- `test/route-contracts`
- `docs/stitch-lifecycle`

## Core rule

**One branch = one scope.**

Do not mix unrelated work in the same branch.

Good:

- branding in one branch
- route tests in another
- visual regression in another

Bad:

- branding + pricing + tests + docs all in one branch

## Standard flow

1. Create or approve an issue.
2. Branch from `main`.
3. Implement the change.
4. Run the relevant validations.
5. Open a pull request.
6. Merge into `main`.
7. Delete local and remote feature branches.

## Stacked branches

Use stacked branches only when changes have a real dependency chain.

Example:

```text
main
 └─ feat/base-change
     └─ feat/depends-on-base
         └─ feat/depends-on-that
```

In that case:

- PR 1 targets `main`
- PR 2 targets `feat/base-change`
- PR 3 targets `feat/depends-on-base`

Once all stacked PRs are merged, open a final integration PR to `main` if needed.

## Commit convention

Use conventional commits:

- `feat: ...`
- `fix: ...`
- `refactor: ...`
- `docs: ...`
- `test: ...`
- `chore: ...`

Examples:

- `feat: add dedicated pricing page`
- `fix: unify branding across landing and pricing`
- `test: add dedicated route tests for marketing pages`

## Pull request rules

Each pull request should:

- close an approved issue
- use exactly one PR type label when applicable
- stay focused on a single concern
- include a short test plan

## Hotfixes

For urgent fixes, branch directly from `main`:

```text
main
 └─ fix/critical-bug
```

Then open a PR back to `main`.

## Cleanup policy

After merge:

- delete the remote feature branch
- delete the local feature branch
- keep the repo centered on `main`

## Recommendation for this project

For this repository, the preferred workflow is:

- `main` as the only stable branch
- short-lived feature branches
- stacked PRs only for true dependencies
- PR-based merges only
- aggressive branch cleanup after merge
