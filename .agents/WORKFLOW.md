---
name: agent_workflow
description: Mandatory protocols for communication, task completion, and conflict management.
---

# Workflow Guideline (WORKFLOW.md)

## 1. Task Initialization
Before starting any task, check **AGENTS.md** to identify the responsible agent and adopt their persona.

## 2. Conflict Management
If a flow in **TASKS.md** needs changing:
1. Create a `[FIX]` task.
2. Mark the original as **Blocked** or **Resolved**.

## 3. Task Completion Protocol (CRITICAL)
Mandatory validation when marking a task as done:
- **Phase 1: Technical Validation:** Check against **HARNESS.md**.
- **Phase 2: Scope Validation:** Check against **SPEC.md**.
- **Phase 3: Progress Registration:** Update **TASKS.md** and **PROGRESS.md**.
- **Phase 4: Persistence Protocol:** Commit all changes following the **atomic_commit** skill.

## 4. Workflow Communication
Always explicitly and concisely declare when you are following a rule from this workflow (e.g., *"Following the HARNESS.md Validation..."*).

## 5. Historical Registry Integrity (CRITICAL)
- **Immutability:** Entries in **PROGRESS.md** for previous sessions are immutable records. 
- **Current Session only:** The AI is only authorized to edit/append the **latest** session or create a new one.

## 6. Commit & Tagging Protocol (CRITICAL)
Commit changes only after reaching a meaningful milestone to keep the history clean.
- **Triggers:** Commit only when a task/subtask in **TASKS.md** is finalized or when a session is registered in **PROGRESS.md** or when explicity asked.
- **Requirement:** Commits must be atomic (one logical change per commit) but can be executed in sequence at the end of the session.
- **Requirement:** The final commit of every session must be tagged as `session-XX`.