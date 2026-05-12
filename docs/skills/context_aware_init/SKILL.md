---
name: context_aware_init
description: Initializes the Git repository and configures .gitignore intelligently based on project technologies (SPEC.md and HARNESS.md).
---

# Context Aware Initialization Skill

## When to use
At the beginning of any foundation phase of a project, right after the planning phase (Phase 0), or when explicitly requested to prepare the ground for versioning.

## Goal
Ensure that versioning and file shielding are done intelligently and adapted to the tech stack defined in the documentation, before starting to write code.

## Step by step
1. **Read Context**: Read the `SPEC.md` and `HARNESS.md` files (both in `docs/`) to identify all project technologies (e.g., React Native, Expo, SQLite, Python, Node, etc.).
2. **Create Customized .gitignore**: Generate a robust `.gitignore` that excludes dependencies, builds, DBs, and IDE files.
3. **Initialize Repository**: Execute `git init` in the terminal.
4. **Report**: Inform the user that the repository was created in synergy with the required tech stack.
