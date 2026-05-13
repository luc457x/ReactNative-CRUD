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

## 3. Task Completion Protocol
Mandatory three-phase validation before marking a task as done:
- **Phase 1: Technical Validation:** Check against **HARNESS.md**.
- **Phase 2: Scope Validation:** Check against **SPEC.md**.
- **Phase 3: Progress Registration:** Update **TASKS.md** and **PROGRESS.md**.

## 4. Workflow Communication
Always explicitly declare when you are following a rule from this workflow (e.g., *"Following the HARNESS.md Validation..."*).

## 5. Commit & Tagging Protocol
Every completion of a task or session must be saved following the **atomic_commit_cross** skill.
- **Requirement:** Commits must be atomic (one change per commit).
- **Requirement:** The final commit of every session must be tagged as `session-XX` and recorded in **PROGRESS.md**.