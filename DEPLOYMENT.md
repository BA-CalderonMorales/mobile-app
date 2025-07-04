# CI/CD Setup Guide

This document explains how to configure and use the automated CI/CD pipeline for building and deploying the mobile app to iOS App Store and Google Play Store.

## Overview

The CI/CD pipeline automatically:
- Runs tests and type checking
- Builds iOS and Android apps in parallel
- Signs the apps with proper certificates
- Uploads iOS builds to TestFlight
- Uploads Android builds to Google Play Store (internal track)
- Manages version numbers automatically

## Prerequisites

### iOS Setup
1. **Apple Developer Account**: You need a paid Apple Developer account
2. **App Store Connect API Key**: Generate an API key for automated uploads
3. **Certificates and Provisioning Profiles**: Set up via Fastlane Match (recommended)

### Android Setup
1. **Google Play Console Account**: You need a Google Play Developer account
2. **Google Play Console API**: Enable the API and create a service account
3. **Android Keystore**: Create a release keystore for signing

## Required GitHub Secrets

Add these secrets to your GitHub repository (Settings > Secrets and variables > Actions):

### iOS Secrets
- `FASTLANE_USER`: Your Apple ID email
- `FASTLANE_APPLE_APPLICATION_SPECIFIC_PASSWORD`: App-specific password for your Apple ID
- `FASTLANE_SESSION`: Session cookie (optional, for 2FA automation)
- `APP_STORE_CONNECT_API_KEY_ID`: API key ID from App Store Connect
- `APP_STORE_CONNECT_API_ISSUER_ID`: Issuer ID from App Store Connect
- `APP_STORE_CONNECT_API_KEY`: Base64 encoded .p8 file content
- `MATCH_PASSWORD`: Password for Fastlane Match (if using)
- `TEMP_KEYCHAIN_PASSWORD`: Temporary password for CI keychain

### Android Secrets
- `ANDROID_KEYSTORE`: Base64 encoded release keystore file
- `ANDROID_KEYSTORE_PASSWORD`: Password for the keystore
- `ANDROID_KEY_ALIAS`: Alias of the signing key
- `ANDROID_KEY_PASSWORD`: Password for the signing key
- `GOOGLE_PLAY_JSON_KEY`: JSON content of the Google Play service account key

## Workflow Triggers

### Automatic Deployment
- **Push to `main` branch**: Automatically builds and deploys both iOS and Android

### Manual Deployment
- **Workflow Dispatch**: Manually trigger with options to choose iOS, Android, or both

## Setting Up Secrets

### iOS App Store Connect API Key
1. Go to App Store Connect > Users and Access > Keys
2. Create a new API key with "Developer" role
3. Download the .p8 file
4. Convert to base64: `base64 -i AuthKey_XXXXXXXXXX.p8 | pbcopy`
5. Add to GitHub secrets as `APP_STORE_CONNECT_API_KEY`

### Android Keystore
1. Generate keystore: `keytool -genkey -v -keystore release.keystore -alias your-alias -keyalg RSA -keysize 2048 -validity 10000`
2. Convert to base64: `base64 -i release.keystore | pbcopy`
3. Add to GitHub secrets as `ANDROID_KEYSTORE`

### Google Play Service Account
1. Go to Google Play Console > Setup > API access
2. Create a new service account or use existing
3. Download the JSON key file
4. Add the JSON content directly to GitHub secrets as `GOOGLE_PLAY_JSON_KEY`

## Project Structure Requirements

### iOS
```
ios/
├── TodoMobileApp.xcodeproj/
└── TodoMobileApp.xcworkspace/
```

### Android
```
android/
├── app/
│   └── build.gradle
└── gradlew
```

## Version Management

- **iOS**: Build number is automatically incremented
- **Android**: Version code is automatically incremented
- Version names should be updated manually in the respective platform files

## Deployment Tracks

- **iOS**: Uploads to TestFlight (internal testing)
- **Android**: Uploads to Play Store internal track

## Troubleshooting

### Common Issues

1. **iOS Build Fails**
   - Check certificates and provisioning profiles
   - Verify App Store Connect API key permissions
   - Ensure bundle identifier matches

2. **Android Build Fails**
   - Check keystore configuration
   - Verify Google Play API permissions
   - Ensure package name matches

3. **Fastlane Issues**
   - Check Ruby version compatibility
   - Verify all required gems are installed
   - Check environment variables

### Debug Mode

To debug issues:
1. Check the GitHub Actions logs
2. Run Fastlane locally: `fastlane ios build` or `fastlane android build`
3. Verify secrets are properly configured

## Manual Commands

You can run builds locally using:

```bash
# Install dependencies
npm ci
cd fastlane && bundle install

# Build iOS (requires macOS)
fastlane ios build

# Build Android
fastlane android build

# Deploy to stores (requires proper secrets)
fastlane ios release
fastlane android release
```

## Security Notes

- Never commit signing certificates or API keys to the repository
- Use GitHub secrets for all sensitive data
- Regularly rotate API keys and certificates
- Review access permissions for service accounts

## Monitoring

- GitHub Actions provides detailed logs for each build
- Set up notifications for failed builds
- Monitor app store review status separately

## Support

For issues with:
- GitHub Actions: Check the workflow logs
- Fastlane: Refer to [Fastlane documentation](https://docs.fastlane.tools/)
- iOS deployment: Check Apple Developer documentation
- Android deployment: Check Google Play Console documentation