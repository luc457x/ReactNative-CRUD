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
* **Git Operations:** **Always** use the `atomic_commit_cross` skill for any commit. Commits must be atomic (separating infrastructure, logic, and documentation).

## 3. QA Protocol & Technical Acceptance
All code produced must pass this mandatory validation before marking a task as completed:

1.  **Build Check:** Verify if changes do not generate import, syntax, or bundling errors (Metro/Expo).
2.  **Code Sanitization:** Removal of debug `console.log()`, draft comments, and redundant `.gitkeep` files (only keep them in empty folders).
3.  **Responsiveness (NFR03):** Visual inspection of `SafeAreaView` and flexible layout for different screen sizes.
4.  **Persistence Validation (SQLite):** Confirm `try/catch` blocks in repositories and error logging.
5.  **Rule Cross-Check:** Validate if the logic respects Business Rules in `SPEC.md` (e.g., unique ID, expiration grouping).
6.  **Smoke Test:** If applicable, perform a quick verification using the **e2e_smoke_test** skill.

## 4. Approved Dependencies (Standard Stack)
To prevent different Agents from installing libraries that do the same thing (e.g., one installs `axios` and another installs `fetch`), the project will strictly use:

* **Navigation:** `@react-navigation/native` and `@react-navigation/native-stack`
* **Database:** `expo-sqlite`
* **Icons:** `@expo/vector-icons`
* **External requests:** Native JS `fetch` API (if applicable in the future).

## 5. SQLite Database Debugging
As the database will run embedded in the phone:
* Error Handling: All CRUD functions in the repository must wrap queries in `try/catch` blocks and print the error to the console to facilitate debugging via Metro Bundler.
