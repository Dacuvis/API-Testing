# Contributing to CivicInsight AI

Thank you for your interest in contributing to CivicInsight AI.

CivicInsight AI aims to help citizens access reliable information regarding public services, social assistance, healthcare, child protection, administrative procedures, and civic issues through an AI-powered platform.

## Development Workflow

### 1. Fork or Clone the Repository

```bash
git clone https://github.com/Dacuvis/API-Testing
cd API-Testing
```

### 2. Create a Branch

Please create a dedicated branch before making any changes.

```bash
git checkout -b feature/your-feature-name
```

Examples:

```text
feature/news-api
feature/auth-system
feature/civic-problem-solver
fix/user-validation
docs/update-readme
```

---

## Commit Convention

Use clear and meaningful commit messages.

```text
feat: add news aggregation service
feat: implement citizen report endpoint
fix: resolve validation issue
docs: update project documentation
refactor: improve service structure
```

---

## Code Standards

### General Rules

* Follow the existing project structure.
* Write clean and maintainable code.
* Avoid unnecessary dependencies.
* Keep functions focused on a single responsibility.
* Remove unused code before creating a Pull Request.

### Backend

* Keep controllers lightweight.
* Place business logic inside services.
* Validate incoming requests.
* Handle errors properly.
* Use consistent API response formats.

### Database

* Do not modify database structures without discussion.
* Document schema changes clearly.
* Ensure migrations are safe and reversible.

---

## Pull Request Process

1. Create a feature branch.
2. Commit your changes.
3. Push your branch.

```bash
git push origin your-branch-name
```

4. Open a Pull Request (PR).
5. Describe:

   * What was changed
   * Why it was changed
   * Any related issues
6. Wait for review before merging.

---

## Reporting Issues

When creating an issue, include:

* Problem description
* Steps to reproduce
* Expected behavior
* Screenshots (if applicable)

---

## Project Vision

CivicInsight AI is designed to:

* Improve access to public information
* Reduce misinformation
* Simplify government procedures
* Assist citizens in solving civic-related problems
* Promote digital literacy and civic awareness

All contributions should align with these goals.

---

## Thank You

Every contribution, whether code, documentation, testing, or ideas, helps make CivicInsight AI more useful for the community.

Thank you for contributing.
