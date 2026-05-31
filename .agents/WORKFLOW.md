# Workflow Guideline (WORKFLOW.md)

## 1. Task Initialization
Check **AGENTS_FULL.md** to identify the responsible agent and adopt their persona.

## 2. Conflict Management
If a flow in **TASKS.md** needs changing:
1. Create a `[FIX]` task.
2. Mark the original as **Blocked** or **Resolved**.

## 3. Task Completion Protocol (CRITICAL)
Mandatory validation when marking a task as done:
1. **Technical Validation:** Check against **HARNESS.md**.
2. **Scope Validation:** Check against **SPEC.md**.
3. **Progress Registration:** Update **TASKS.md** and **PROGRESS.md**.
4. **Commit:** Follow the **atomic_commit** skill.

## 4. Workflow Communication
Always explicitly and concisely declare when you are following a rule from this workflow (e.g., *"Following the HARNESS.md Validation..."*).

## 5. Historical Registry Integrity (CRITICAL)
- Entries in **PROGRESS.md** for previous sessions are immutable.
- Only edit/append the **latest** session or create a new one.
- Archive old sessions to **PROGRESS_ARCHIVE.md** when PROGRESS.md exceeds ~3 sessions.

## 6. Commit & Tagging Protocol (CRITICAL)
Commit changes only after reaching a meaningful milestone to keep the history clean.
- **Triggers:** Commit only when a task/subtask in **TASKS.md** is finalized or when a session is registered in **PROGRESS.md** or when explicity asked.
- **Requirement:** Commits must be atomic (one logical change per commit) but can be executed in sequence at the end of the session.
- **Requirement:** The final commit of every session must be tagged as `session-XX`.