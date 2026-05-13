---
name: technical_harness
description: Technical acceptance criteria, approved commands, and code quality/cleanliness standards.
---

# Technical Harness (HARNESS.md)

## 1. Fundamental Rule
Always keep the existing model, style, and conventions of a file unless explicitly asked otherwise.

## 2. Official Commands
As this is a React Native project (preferably using Expo), the official commands for the AI or developer to execute in the terminal are:

* **Start the server (Metro Bundler):** `npx expo start`
* **Run on Android emulator:** (With expo running) Press `a`
* **Clear bundler cache (Resolve build errors):** `npx expo start -c`
* **Install new dependencies:** `npx expo install <package>` (Always use `expo install` instead of `npm install` for native packages).

## 3. Technical Acceptance Criteria (Quality Checklist)
All code produced must pass this technical validation before delivery:
1. **Intact Build:** The code must not break the Metro Bundler or the Expo build.
2. **Cleanliness:** Removal of debug `console.log()` and draft comments.
3. **Responsiveness (NFR03):** Correct use of Flexbox and `SafeAreaView` for compatibility with different screen sizes.
4. **Error Patterns:** Verification if error handling follows the standards in Section 5.

## 4. Approved Dependencies (Standard Stack)
To prevent different Agents from installing libraries that do the same thing (e.g., one installs `axios` and another installs `fetch`), the project will strictly use:

* **Navigation:** `@react-navigation/native` and `@react-navigation/native-stack`
* **Database:** `expo-sqlite`
* **Icons:** `@expo/vector-icons`
* **External requests:** Native JS `fetch` API (if applicable in the future).

## 5. SQLite Database Debugging
As the database will run embedded in the phone:
* Error Handling: All CRUD functions in the repository must wrap queries in `try/catch` blocks and print the error to the console to facilitate debugging via Metro Bundler.
