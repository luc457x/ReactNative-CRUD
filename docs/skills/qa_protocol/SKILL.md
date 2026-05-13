# QA Protocol Skill

## When to use
Mandatory before completing any task in `TASKS.md`, during the "Technical Validation" phase of the Task Completion Protocol.

## Goal
Ensure that the code respects the Technical Acceptance Criteria of `HARNESS.md` and the Business Rules of `SPEC.md`.

## Step by step
1. **Build Check**: Verify if changes do not generate import or syntax errors.
2. **Code Sanitization**: Remove `console.log()` and draft comments.
3. **Visual Inspection and Responsiveness**: Check `SafeAreaView` and flexible layout (NFR03).
4. **Persistence Validation (SQLite)**: Confirm `try/catch` blocks and error logs in the database.
5. **Rule Cross-Check**: Validate if the logic does not violate Business Rules (e.g., unique ID).
6. **Registration**: Include the note "Technical Validation Completed (Skill 3)" in `PROGRESS.md`.
