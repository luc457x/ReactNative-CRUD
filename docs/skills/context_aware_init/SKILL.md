# Context-Aware Initialization Skill

## When to use
At the very beginning of a project or when a specific stack-aware configuration (like `.gitignore` or repository structure) needs to be initialized.

## Goal
Establish a technical foundation that is pre-optimized for the specific tech stack (e.g., React Native + SQLite) and AI-friendly (with `.agentignore`).

## Step by step
1. **Stack Detection**: Identify the languages and frameworks (e.g., JS, React Native, Expo).
2. **Standard Structure**: Create the documentation folder (`/docs`) and source folder (`/src`).
3. **Optimized Ignore**: 
   - Create a `.gitignore` covering standard IDEs and build folders.
   - Create a `.agentignore` to hide `node_modules` and binary builds from the AI.
4. **Git Initialization**: `git init` and initial commit following the `atomic_commit_cross` standard.
