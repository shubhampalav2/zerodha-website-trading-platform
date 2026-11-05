# GitHub publishing guide

Use this checklist to publish TangelTrader from the repository root. It covers creating a GitHub repository, checking the files being published, and pushing a branch.

## Important: clean credentials before publishing

This repository’s history contains local environment files at `backend/.env` and `frontend/atlas-credentials.env`. They may contain live credentials. They are now ignored and staged for removal from the current Git index; `.gitignore` does not erase them from previous commits.

Before pushing to GitHub, especially to a public repository:

1. Rotate the MongoDB database credential and the JWT signing secret. Treat any credential that has ever been committed as exposed.
2. Keep a secure backup of any local values you still need. Do not put the backup in the repository.
3. Remove the environment files from Git tracking and remove them from repository history. For a shared repository, coordinate this history rewrite with all contributors first.
4. Verify history and the staged file list contain no secrets. Do not push if any credential remains.

If `git filter-repo` is installed, history cleanup can be performed from a separate clean clone after backing up local configuration:

```bash
git filter-repo --force \
  --path backend/.env \
  --path frontend/atlas-credentials.env \
  --invert-paths
```

This rewrites commit history and may remove the `origin` remote. Re-add the correct remote after cleanup, then force-push only after reviewing the rewritten history. Rewriting shared history changes commit IDs and requires collaborators to re-clone or carefully reset their local branches.

## 1. Create an empty GitHub repository

On GitHub, create a new repository for TangelTrader. Do not initialize it with a README, license, or `.gitignore`; this project already has files and commit history locally. Copy the repository’s HTTPS or SSH URL.

## 2. Prepare local configuration

The root `.gitignore` excludes local `.env` and `*.env` files. Copy the safe templates when setting up a local environment:

```text
backend/.env.example    → backend/.env
dashboard/.env.example → dashboard/.env (optional)
```

Use fresh local values after rotating credentials. Never replace an example file with actual secrets.

## 3. Review the working tree

From the repository root:

```bash
git status --short
git diff --check
git ls-files '*.env'
```

The last command lists environment files still tracked by Git. Resolve any tracked secret files and scrub repository history before continuing. Review the exact paths to be included in the commit:

```bash
git add -A
git diff --cached --check
git diff --cached --name-only
```

If any secret, credential, local database file, build output, or dependency directory appears, unstage it and correct the ignore rules before committing.

## 4. Add or update the GitHub remote

Check whether a remote already exists:

```bash
git remote -v
```

If there is no `origin`, add the URL copied from GitHub:

```bash
git remote add origin https://github.com/<YOUR-USER>/<YOUR-REPOSITORY>.git
```

If `origin` exists and points to the wrong repository, update it deliberately:

```bash
git remote set-url origin https://github.com/<YOUR-USER>/<YOUR-REPOSITORY>.git
```

## 5. Commit and push

After credential cleanup and review, commit the work:

```bash
git commit -m "docs: document TangelTrader setup and operations"
```

For a new repository using the `main` branch:

```bash
git branch -M main
git push -u origin main
```

For an existing branch, check its name with `git branch --show-current` and push that branch:

```bash
git push -u origin <YOUR-BRANCH>
```

If history was scrubbed, normal push may be rejected because commit IDs changed. Only after confirming the remote is the intended repository and coordinating with collaborators, update the rewritten branches and tags:

```bash
git push --force --all origin
git push --force --tags origin
```

Do not use force push to work around an unrelated rejection.

## 6. Verify the GitHub repository

After pushing:

1. Open the repository page and confirm the README renders.
2. Inspect the committed file list and confirm `.env` files, credentials, `node_modules`, and build output are absent.
3. Review commit history and confirm removed environment files are not present in earlier commits.
4. Run the local setup from the root README on a clean checkout.
5. If this will be public, confirm no secret was exposed in issues, pull requests, actions logs, or release artifacts. Continue to treat rotated credentials as compromised if they appeared anywhere remote.
