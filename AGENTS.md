---
name: agents_config
description: Defines the roles, responsibilities, and suggested models for the AI agents in the project.
---

# AI Organization and Roles (AGENTS.md)

## AI Engineering Documentation Structure

> **Location:** All AI engineering documents (except this file) are centralized in **`/docs`**. `AGENTS.md` remains at the root so that tools and rule systems find it automatically.

This project is guided by a set of Markdown files designed to instruct, restrict, and guide LLMs during development:
* **[`docs/SPEC.md`](docs/SPEC.md)**: The scope's brain. Contains business rules, FRs, NFRs, and links to UML diagrams.
* **[`docs/TASKS.md`](docs/TASKS.md)**: The roadmap. Breaks `docs/SPEC.md` into actionable granular steps.
* **[`docs/HARNESS.md`](docs/HARNESS.md)**: The technical "rails". Defines allowed terminal commands, approved dependencies, and testing rules.
* **[`docs/PROGRESS.md`](docs/PROGRESS.md)**: The logbook. Keeps track of what has been done and records pending items to preserve context between different sessions.
* **`AGENTS.md`** (This file — root): The AI's HR. Defines which persona and model to use for different parts of `docs/TASKS.md`.
* **[`docs/SKILLS.md`](docs/SKILLS.md)**: The spellbook. Maps step-by-step standard processes so that AIs perform repetitive tasks (like initialization or deploys) consistently.
* **[`docs/UML/`](docs/UML/)**: Project PlantUML diagrams (`use_case.puml`, `class.puml`).

## Universal Workflow Directive (Mandatory)
> **ATTENTION TO ALL AGENTS:**
1. **Always** write in English (including commits and logs), unless requested otherwise. Be as **concise** as possible to save tokens.
2. **Always** when asked to start or complete a development task or phase, consult the **[`docs/WORKFLOW.md`](docs/WORKFLOW.md)** document to read the mandatory workflow and task completion guidelines.
---

## 1. Architect and Backend Agent (Senior)
* **Complexity/Priority:** High (System Core)
* **Suggested Model:** High reasoning models / Higher Cost (e.g., *Claude 4.6 Sonnet*, *Claude 4.6 Opus*).
* **Main Responsibilities:** 
  * Initial structuring of the React Native project.
  * SQLite configuration, creation of the seeding script (admin user), and creation of queries (CRUD).
  * Rigorous application of the Business Rules described in `docs/SPEC.md`.
* **Focus on [`docs/TASKS.md`](docs/TASKS.md):** 
  * **Phase 1** (Setup and Infrastructure)
  * **Phase 2** (Database and Modeling)

## 2. UI/Frontend Developer Agent (Mid-level)
* **Complexity/Priority:** Medium/Low (Repetitive Component Work)
* **Suggested Model:** Fast models / Low Cost (e.g., *Gemini 3.1 Pro (High)*, *Gemini 3 Flash*).
* **Main Responsibilities:**
  * Develop screens (Login, Product Registration, Dashboard).
  * Connect database functions (already created by the Architect) to React Native buttons and lists.
  * Develop components such as increment/decrement buttons.
* **Focus on [`docs/TASKS.md`](docs/TASKS.md):**
  * **Phase 3** (Access and User Screens)
  * **Phase 4** (Product Management - Interface)
  * **Phase 5** (Overview and Inventory Control)

## 3. QA and Visual Polishing Agent (Junior)
* **Complexity/Priority:** Low (Review and Aesthetics)
* **Suggested Model:** Super cheap and fast models (e.g., *Gemini 3.1 (Low)*, *Gemini 3 Flash*).
* **Main Responsibilities:**
  * Review responsiveness (test visual logic on Tablets and Phones - NFR03).
  * Polish colors and margins in `StyleSheet`.
  * Perform final checklist verifying if any item from `docs/SPEC.md` is missing.
* **Focus on [`docs/TASKS.md`](docs/TASKS.md):**
  * **Phase 6** (Final Adjustments and UX)
