# Todo Mobile App

This is a simple React Native todo application used for TDD demonstrations.
Todos are saved locally using `AsyncStorage` so they persist between sessions.

## Features

- Add, edit and delete todo items
- Filter todos by status (all, active, completed)
- Persist todos locally between sessions
- **New:** shows the count of active todos remaining
- **New:** mark all todos as completed with one tap
- **New:** clear all todos at once

## Scripts

- `npm ci` - install dependencies
- `npm start` - start the Metro bundler
- `npm run ios` - run the iOS app in the simulator
- `npm run android` - run the Android app on a device or emulator
- `npm test` - run the test suite
- `npm run typecheck` - run TypeScript in strict mode
- `npm run build` - build release artifacts for iOS and Android using Fastlane

## Continuous Deployment

Pushes to `main` run the GitHub Actions workflow at `.github/workflows/deploy.yml` which installs dependencies, runs tests, builds the app, and triggers placeholder deploy steps.

Fastlane lanes defined in `fastlane/Fastfile` handle building and uploading the iOS and Android apps when invoked.
