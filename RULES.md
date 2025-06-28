# Project Development Rules

This document defines the conventions for commits, pull requests, and CI within this repository. These rules ensure that both local development and automated pipelines remain consistent.

## Local commands

All feature development and validation should use the following npm scripts:

- `npm ci` – install dependencies
- `npm start` – run the Metro bundler
- `npm run ios` – build and run the iOS app
- `npm run android` – build and run the Android app
- `npm test` – execute the full test suite
- `npm run typecheck` – run TypeScript in strict mode
- `npm run build` – invoke Fastlane to create release builds for iOS and Android

Every change should be validated locally using `npm ci`, `npm test`, `npm run typecheck`, and `npm run build`. CI expects these commands to succeed without additional setup.

## Pull request titles

Use the following prefixes so reviewers know the purpose and target branch of a pull request:

- **Feature:** … – merge to `develop`
- **Bugfix:** … – merge to `develop`
- **Cleanup:** … – merge to `develop`
- **Pipeline:** … – merge to `develop`
- **Hotfix:** … – merge directly to `main`

The pull request description must include a **Codex CI** section summarising the success or failure of each CI step (`install`, `build`, `typecheck`, `test`).

## Commit messages

Commits must follow conventional commit style to adhere to semantic versioning. Examples:

```
feat: add dark mode toggle
fix: handle null todo values
chore: update dependencies
```

Commit messages that do not match this format will fail the commit lint hook.

## CI dependencies

All dependencies required for tests, builds, and type checking must be installed via `npm ci` before executing CI jobs. GitHub Actions and Codex CI both rely on these dependencies.

## Super-Linter

This repository uses GitHub's Super-Linter to enforce code quality. The workflow file is located at `.github/workflows/super-linter.yml`. The linter runs on every pull request.

