# Atomic Commit Cross-Platform Skill

## When to use
Upon completing a task, subtask, or phase, following the granularity guidelines of `WORKFLOW.md`.

## Goal
Ensure that changes are saved consistently, organized by priority, and compatible with any Operating System (Windows, Linux, macOS).

## Step by step
1. **Priority Analysis**: Evaluate changes and separate them into atomic blocks. Always prioritize functional code and business rules (Core) before infrastructure or documentation commits.
2. **List Changes**: Identify which files belong to each defined priority block.
3. **Execution**: Execute the commit command using the appropriate syntax for the current shell (see `/examples/COMMIT_EXAMPLES.md`).
4. **Language**: Always write the commit message in **English**.
5. **Verify Success**: Confirm command output before starting the next block.
