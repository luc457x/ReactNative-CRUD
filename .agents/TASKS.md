---
name: tasks_roadmap
description: Granular roadmap divided into phases and actionable tasks for project development.
---

# Task Plan (TASKS.md)

## Phase 1: Project Setup and Infrastructure
- [x] **T1.1:** Initialize the project in React Native (using Expo or Bare Workflow).
- [x] **T1.2:** Configure base navigation with `react-navigation`.
- [x] **T1.3:** Install and configure the SQLite library (`expo-sqlite` or `react-native-sqlite-storage`).
- [x] **T1.4:** Create the project folder structure (e.g., `/src/components`, `/src/screens`, `/src/database`, `/src/utils`).

## Phase 2: Database and Modeling (Ref: NFR02, Class Diagram)
- [x] **T2.1:** Create database initialization script (`Users` and `Products` tables).
  - [x] **T2.1.1:** Create default `admin` user in SQLite (seed) if the table is empty. The password will be `admin` and it will have `admin` permission, to be normally authenticated by the app.
- [x] **T2.2:** Implement repository (CRUD) for Users.
- [x] **T2.3:** Implement repository (CRUD) for Products.
- [x] **T2.4:** Implement business rules at the data level:
  - [x] Ensure unique ID (Auto-increment/UUID).
  - [x] Allow insertion of products with the same name as separate entries in the database, provided they have different expiration dates.

## Phase 3: Access and User Screens
- [x] **T3.1:** Develop Login Screen (Ref: FR01).
- [x] **T3.2:** Develop User/Employee Registration Screen (Ref: FR05).
- [x] **T3.3:** Integrate access screens with the SQLite repository.
- [ ] **T3.4:** Fix: Make "Register" screen only accessible for logged admins.

## Phase 4: Product Management (Ref: FR02)
- [ ] **T4.1:** Develop Product Registration Screen/Modal (Inputs: Name, Category, Qty, Price, Expiration).
- [ ] **T4.2:** Develop logic for Editing existing Product.
- [ ] **T4.3:** Integrate Product deletion.

## Phase 5: Overview and Inventory Control (Ref: FR03, FR04)
- [ ] **T5.1:** Develop Main Screen (Dashboard) with a simple listing of products in stock (grouping items by name, showing only name, category, price, and total quantity).
  - [ ] **T5.1.1:** When clicking on a grouped product, display a screen with more details showing the different entries of that same product separately and showing full data.
- [ ] **T5.2:** Implement increment (+) and decrement (-) buttons directly in the listing or quick panel.
- [ ] **T5.3:** Connect the listing to the database to reflect changes "immediately" (Ref: Business Rule).

## Phase 6: Final Adjustments and UX (Ref: NFR03)
- [ ] **T6.1:** Refine style to ensure responsiveness (phones and tablets).
- [ ] **T6.2:** Offline flow and persistence tests.
- [ ] **T6.3:** Final cross-validation with `SPEC.md` and `UML/use_case.puml`.
