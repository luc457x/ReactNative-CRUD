---
name: agent_workflow
description: Mandatory protocols for communication, task completion, and conflict management.
---

# Workflow Guideline (WORKFLOW.md)

1. **Before starting a task** always check the `AGENTS.md` file (at the root) to see which agent is responsible for the Phase the task is in, and adopt their directives/persona for execution.
2. **Conflict Management:** If you make a mistake or need to change a flow already defined in `docs/TASKS.md`, create a new "Correction" or "Refactoring" task with a clear title (e.g., "[FIX] Login flow adjustment") and mark the old task as **Blocked** or **Resolved** with an explanatory note.
3. **Task Completion Protocol:** Before marking a task as completed in `TASKS.md`, you must mandatorily:
   - **Phase 1: Technical Validation:** Verify if the code **respects the technical specifications** defined in the *Technical Acceptance Criteria* of **[`docs/HARNESS.md`](docs/HARNESS.md)**.
   - **Phase 2: Scope Validation:** Validate if the code **respects the business specifications** (Functional Requirements and Business Rules of **[`docs/SPEC.md`](docs/SPEC.md)**) relevant to this specific task.
   - **Phase 3: Progress Registration:** Update the task status in `TASKS.md` and record the activity log in **[`docs/PROGRESS.md`](docs/PROGRESS.md)** to preserve context.
4. **Workflow Communication (Explicitness):** You must always explicitly declare when you are following a rule from this workflow. Examples:
   - "To start [Task X], I am consulting `WORKFLOW.md` and assuming the [Agent] persona as defined in `AGENTS.md`."
   - "According to the workflow, I will create a new correction task with the title '[FIX] Adjustment in [...]' to address the change in the completed task."
   - "Following the `HARNESS.md` Validation Process, I am completing [Task X] and updating the progress documents."
5. **Commit Protocol and Granularity:** Whenever a phase, task, or subtask is completed, the work must be committed following these guidelines:
   - **Atomic Commits:** Separate commits for each specific change. If adding a feature requires changing an existing one, commit the change to the existing feature first (documenting the technical reason for the change due to the new implementation) and then commit the new feature.
   - **Commit Messages:** The subject line should be about 50 characters, being brief, meaningful, and informative about the main goal of the commit.