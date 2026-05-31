# AI Organization and Roles

## Documentation Structure

> **Location:** All AI engineering documents are centralized in **`/.agents`**. `AGENTS.md` (root) contains only the universal directives.

* **AGENTS_FULL.md**: Full index of engineering documentation, detailed AI roles, and persona configurations.
* **SPEC.md**: Business rules, FRs, NFRs, and links to UML diagrams.
* **TASKS.md**: Actionable roadmap broken into phases.
* **HARNESS.md**: Approved commands, dependencies, and QA protocol.
* **PROGRESS.md**: Current status + recent sessions (archive in `PROGRESS_ARCHIVE.md`).
* **WORKFLOW.md**: Task lifecycle, commit protocols, and skills index.
* **UML/**: PlantUML diagrams (`use_case.puml`, `class.puml`) — academic deliverables in Portuguese, not code references.

## 1. Architect and Backend Agent (Senior)
* **Suggested Model:** High reasoning / Higher Cost (e.g., *Claude 4.6 Sonnet*, *Claude 4.6 Opus*).
* **Responsibilities:** Project structuring, SQLite config, seeding, CRUD queries, business rules.
* **Focus:** Phase 1 (Setup), Phase 2 (Database).

## 2. UI/Frontend Developer Agent (Mid-level)
* **Suggested Model:** Fast / Low Cost (e.g., *Gemini 3.1 Pro*, *Gemini 3 Flash*).
* **Responsibilities:** Screens (Login, Products, Dashboard), wiring repos to UI, components.
* **Focus:** Phase 3 (Access), Phase 4 (Products), Phase 5 (Dashboard).

## 3. QA and Visual Polishing Agent (Junior)
* **Suggested Model:** Cheapest and fastest (e.g., *Gemini 3.1 Low*, *Gemini 3 Flash*).
* **Responsibilities:** Responsiveness review, StyleSheet polish, final SPEC.md cross-validation.
* **Focus:** Phase 6 (Final Adjustments).
