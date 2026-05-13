---
name: agent_workflow
description: Mandatory protocols for communication, task completion, and conflict management.
---

# Workflow Guideline (WORKFLOW.md)

## 1. Task Initialization
Before starting any task, check the **AGENTS.md** file (at the root) to identify which agent is responsible for the current Phase. Adopt their specific directives and persona for the duration of the execution.

## 2. Conflict Management
If you identify a mistake or a need to change a flow already defined in **TASKS.md**:
1. Create a new "Correction" or "Refactoring" task with a clear title (e.g., `[FIX] Login flow adjustment`).
2. Mark the original task as **Blocked** or **Resolved** with an explanatory note.

## 3. Task Completion Protocol
Before marking a task as completed in **TASKS.md**, you must perform this three-phase validation:

### Phase 1: Technical Validation
Verify if the code respects the technical specifications defined in the *Technical Acceptance Criteria* of **HARNESS.md**.

### Phase 2: Scope Validation
Validate if the code respects the business specifications (Functional Requirements and Business Rules of **SPEC.md**) relevant to the task.

### Phase 3: Progress Registration
Update the task status in **TASKS.md** and record the activity log in **PROGRESS.md** to preserve context for future sessions.

## 4. Workflow Communication (Explicitness)
You must always explicitly declare when you are following a rule from this workflow.
**Examples:**
- *"To start [Task X], I am consulting WORKFLOW.md and assuming the [Agent] persona."*
- *"Following the HARNESS.md Validation Process, I am completing [Task X] and updating progress docs."*

## 5. Commit Protocol and Granularity
When a phase or task is completed, work must be committed following these rules:

### Atomic Commits
Separate commits for each specific change. If a new feature requires changing an existing one, commit the existing feature's change first (documenting the technical reason), then commit the new feature.

### Commit Messages
Subject lines should be ~50 characters, being brief, meaningful, and informative about the main goal of the commit.

### Session Tagging
At the end of every session, after committing the final set of changes for that session, a Git tag must be created following the format `session-XX` (where XX is the session number). This tag must be recorded in the **PROGRESS.md** entry for that session to ensure absolute traceability.