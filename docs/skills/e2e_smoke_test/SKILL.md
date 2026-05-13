# Universal E2E Smoke Test Skill

## When to use
After implementing a feature, logic, or interface that affects the application's critical user flow.

## Goal
Verify that the "Happy Path" is functional using the most appropriate tool for the current technology stack.

## Step by step

### 1. Select Testing Mode
Identify the platform and the corresponding verification tool (see `examples/SMOKE_EXAMPLES.md`).

### 2. Prepare Environment
Ensure the application or service is running and in a testable state.

### 3. Execution & Verification
Execute the verification using the selected tool (Browser subagent or Terminal commands).

### 4. Analyze Results
- Check for errors, timeouts, or logic violations.
- Compare the actual output with the requirements in `SPEC.md`.

### 5. Documentation
If the flow is confirmed, document **"Smoke Test Passed ([Mode Used])"** in the task validation.
