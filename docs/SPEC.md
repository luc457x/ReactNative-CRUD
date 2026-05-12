---
name: project_spec
description: Technical and business specification, including functional requirements, non-functional requirements, and business rules.
---

# Project Specification (SPEC.md)

Project Goals
• Deliver a digital inventory control system developed in React Native with JS and SQLite database.
• Allow user login, product registration, quantity control, and stock overview.

Scope
• Development of a cross-platform mobile application (Android and iOS).
• Integration with SQLite database.
• Simple and intuitive interface for employees.
• Features for login, registration, deletion, and update of products.
• Stock quantity control with increment/decrement buttons.

Problem Description
The current inventory control is done manually on paper, prone to errors and loss of information. There are no clear reports, making replacement difficult and increasing losses due to expiration. The project seeks to solve these flaws with a digital solution.

Proposed Solution Description
An application will be developed in React Native with JS and with SQLite database. The system will have:
• Login screen for registered users.
• Product registration with attributes: ID, name, category, quantity, unit price, and expiration date.
• Stock overview with product listing.
• Buttons to increase/decrease quantity.
• Deletion and update of products.
• Simple and intuitive interface for use on tablets or phones.

Functional Requirements
• FR01: Allow login for registered users.
• FR02: Allow registration, update, and deletion of products (Full CRUD).
• FR03: Display stock overview with listing of all products.
• FR04: Offer quick access buttons to increment/decrement the quantity of a product.
• FR05: Allow registration of administrators/employees for system access.

Business Rules
• Each product must have a unique ID.
• Products with the same name but different expiration dates must be registered separately.
• Users must be registered to access the system.
• Changes in stock must be recorded immediately in the database.

Use Case Diagram (Overview)
*(See the `UML/use_case.puml` file for the detailed diagram)*

Class Diagram
*(See the `UML/class.puml` file for the detailed class diagram)*

Non-Functional Requirements
• NFR01: The system must be developed in React Native using JavaScript.
• NFR02: The database must be embedded SQLite (local/offline operation).
• NFR03: The interface must be cross-platform (Android and iOS) and adaptable to tablets and phones.

Project Constraints
• There will be no external integration with supplier systems or issuance of invoices.