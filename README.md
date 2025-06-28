# Todo Mobile App

This is a simple React Native todo application used for TDD demonstrations.

## Scripts

- `npm test` - run the test suite
- `npm run typecheck` - run TypeScript in strict mode

## Continuous Deployment

Pushes to `main` run the GitHub Actions workflow at `.github/workflows/deploy.yml` which installs dependencies, runs tests, builds the app, and triggers placeholder deploy steps.
