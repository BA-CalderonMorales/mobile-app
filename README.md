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
- **New:** remembers your last chosen filter across app restarts

## Scripts

- `npm ci` - install dependencies
- `npm start` - start the Metro bundler
- `npm run ios` - run the iOS app in the simulator
- `npm run android` - run the Android app on a device or emulator
- `npm test` - run the test suite
- `npm run typecheck` - run TypeScript in strict mode
- `npm run build` - build release artifacts for iOS and Android using Fastlane

## Continuous Deployment

This project includes a comprehensive CI/CD pipeline that automatically builds and deploys apps to both iOS App Store and Google Play Store.

### Automatic Deployment
- **Push to `main`**: Automatically builds and deploys to TestFlight (iOS) and Play Store internal track (Android)
- **Manual trigger**: Use GitHub Actions workflow dispatch to deploy to specific platforms

### Setup
1. Configure GitHub secrets for signing certificates and store API keys
2. See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed setup instructions
3. Push to `main` branch to trigger automatic deployment

### Build Commands
- `npm run build` - build release artifacts for both platforms using Fastlane
- `npm run build:ios` - build iOS app using Fastlane
- `npm run build:android` - build Android app using Fastlane

The GitHub Actions workflow at `.github/workflows/deploy.yml` handles the complete build, sign, and deploy process. Fastlane lanes in `fastlane/Fastfile` manage platform-specific build and upload operations.
