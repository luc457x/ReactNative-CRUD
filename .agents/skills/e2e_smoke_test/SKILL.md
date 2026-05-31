---
name: e2e_smoke_test
description: End-to-end verification and happy path validation protocol.
---

# Universal E2E Smoke Test Skill

## When to use
After implementing a feature, logic, or interface that affects the application's critical user flow.

## Goal
Verify that the "Happy Path" is functional using the most appropriate tool for the current technology stack.

## Step by step

1. **Select mode** based on platform:
   - **Web/Hybrid:** Use browser subagent → "Navigate to URL. Perform [Action]. Verify [Result]."
   - **API:** `npx jest` or `curl -X GET http://localhost:PORT/api/health`
   - **Native:** `npx detox test` or equivalent test runner.
2. **Ensure** the app/service is running and testable.
3. **Execute** verification and check for errors, timeouts, or logic violations.
4. **Compare** output against `SPEC.md` requirements.
5. **Document** result: "Smoke Test Passed ([Mode])" in the task validation.

