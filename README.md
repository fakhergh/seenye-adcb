# Seenye

Seenye is a React Native app dedicated to helping users **see events** and **manage bookmarks** with ease. It targets both Android and iOS platforms.

_The name "Seenye" is inspired by the French word "signe," reflecting the app's focus on helping users discover and keep track of events._

---

## Demo Video

Here is a recorded demo of the app running on my device:

[![Seenye App Demo](https://img.youtube.com/vi/xhQ9LCVaZ1k/0.jpg)](https://youtu.be/xhQ9LCVaZ1k)

_Click the image above to watch the video._

---

## Android APK

If you want to test the app on an Android device, you can download the latest APK here:

[Download Seenye APK](https://drive.google.com/file/d/1gyQ43z1meqVS3e1_J7h6w72CBcAnKZ2Z/view?usp=sharing)

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Running the App](#running-the-app)
- [Available Commands](#available-commands)
- [Project Structure](#project-structure)
- [Testing](#testing)

---

## Overview

Seenye allows users to browse and search for events, manage bookmarks, and supports multi-language functionality. It features Firebase authentication, biometric login, and integrates with Google Maps for event locations.

---

## Features

- User authentication with Firebase
- Browsing events
- Searching events
- Managing bookmarks
- Multi-language support
- Biometric login (Face ID / Fingerprint)

---

## Tech Stack

- React Native v0.80.2
- React Navigation
- React Query
- React Native MMKV (storage)
- React Native Firebase
- React-i18n for internationalization
- Shopify Restyle for styling
- React Native Biometrics & Keychain for biometric login
- Formik and Yup for form state management and validation
- React Native Maps
- React Native Bootsplash

---

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/fakhergh/seenye.git
   cd seenye
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Place your Firebase config files in case you want to manage users by yourself from your firebase panel: (Optional)
   - `GoogleService-Info.plist` for iOS under `ios/` folder
   - `google-services.json` for Android under `android/app/` folder

4. Install iOS pods:

   ```bash
   npm run pod-install
   ```

5. Create a `.env` file in the root with the following environment variables:

   ```
   # MMKV encryption key
   STORAGE_ENCRYPTION_KEY=xxxxxxxxxxx

   # TicketMaster API
   TICKET_MASTER_BASE_URL=https://app.ticketmaster.com/discovery/v2
   TICKET_MASTER_API_KEY=xxxxxxxxxxx
   ```

---

## Running the App

### iOS

```bash
    npm run ios
    # or
    npx react-native run-ios
```

### Android

```bash
    npm run android
    # or
    npx react-native run-android
```

Make sure your environment variables and Firebase configs are properly set before running.

---

## Available Commands

| Command                | Description                                                  |
| ---------------------- | ------------------------------------------------------------ |
| `npm run prepare`      | Runs husky to set up git hooks.                              |
| `npm run pod-install`  | Installs iOS CocoaPods with the new architecture enabled.    |
| `npm run android`      | Builds and runs the app on an Android device/emulator.       |
| `npm run ios`          | Builds and runs the app on an iOS device/simulator.          |
| `npm run lint`         | Runs ESLint to check for code style issues.                  |
| `npm run start`        | Starts the Metro bundler for React Native.                   |
| `npm run test`         | Runs Jest unit tests.                                        |
| `npm run static:check` | Runs ESLint and Prettier to check code style and formatting. |
| `npm run static:fix`   | Automatically fixes linting and formatting issues.           |

**Command Descriptions:**

- `npm run prepare`: Sets up Git hooks using Husky to help enforce code quality and automate tasks during commits.
- `npm run pod-install`: Installs iOS CocoaPods dependencies with new architecture enabled to ensure the iOS build works correctly.
- `npm run android`: Builds and launches the app on a connected Android device or emulator.
- `npm run ios`: Builds and launches the app on an iOS simulator or connected device.
- `npm run lint`: Runs ESLint to analyze code for stylistic errors or deviations from best practices.
- `npm run start`: Starts the Metro bundler which serves your React Native JavaScript code.
- `npm run test`: Runs unit tests with Jest (no tests currently implemented).
- `npm run static:check`: Runs ESLint and Prettier to check that code style and formatting conform to the project standards.
- `npm run static:fix`: Automatically fixes code style and formatting issues using ESLint and Prettier.

---

## Project Structure

```
├───components         # Reusable UI components
│   ├───fields         # Form field components
│   ├───forms          # Form related components
│   └───ui             # Basic UI components (buttons, icons, etc.)
├───constants          # App-wide constants
├───containers         # Components connected to data or state
├───core               # Core app logic and services
│   ├───adapters       # Adapter layer for external APIs or services
│   ├───lib            # Utility libraries
│   ├───services       # API calls and business logic
│   └───types          # TypeScript types/interfaces
├───hocs               # Higher Order Components
├───hooks              # Custom React hooks
├───i18n               # Internationalization files
│   └───locales        # Language JSON files
├───layouts            # Layout components
├───navigation         # Navigation setup and configurations
├───screens            # Screen components representing app pages
├───styles             # Styling files and themes
├───types              # Global types
└───utils              # Utility functions
App.tsx                # Main app entry point
index.js               # App bootstrap and registration
```

---

## Architecture

This project follows a **Container-based Architecture** where components are categorized into **containers** that combine both **UI rendering** and **business logic**. This approach ensures the application remains maintainable while keeping logic and rendering tightly coupled in the same components. Here's an overview of the architecture:

- Containers are components that manage both **UI rendering** and **business logic** (e.g., data fetching, state management, handling side effects).
- They handle communication with external services, such as API calls, and manage state or side effects like form submissions or authentication.
- Containers are often the **"smart" components** that encapsulate complex logic and state management, and then pass down data or actions to **presentational components** via props.
- They are typically **stateful** and are responsible for the **data flow** in the application.

**Example of a Container Component**:

```tsx
import { useState, useEffect } from 'react';
import { fetchUserData } from '@/services/api';
import UserProfile from '@/components/UserProfile';

const UserContainer = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchUserData();
      setUserData(data);
    };

    loadData();
  }, []);

  return <UserProfile user={userData} />;
};

export default UserContainer;
```

---

## Styling

We use [Shopify Restyle](https://github.com/Shopify/restyle) for styling. The app leverages Restyle’s design system approach to ensure consistency and scalability across components.

The general rule is to use Restyle’s theming and styling utilities as much as possible, and only add custom styles when absolutely necessary.

---

## Testing

No tests have been implemented for this project.

---

## Troubleshooting
