---
name: code-review-and-quality
description: Conducts multi-axis code review. Use before merging any change. Use when reviewing code written by yourself, another agent, or a human. Use when you need to assess code quality across multiple dimensions before it enters the main branch. Use when asked to review a diff or a pull request.
license: Apache-2.0
metadata:
  author: addyosmani
  organization: Google Chrome
---

# Code Review and Quality
*Source: addyosmani/agent-skills (Google Chrome team lead)*

## Overview
Multi-dimensional code review with quality gates. Every change gets reviewed before merge — no exceptions. Review covers five axes: correctness, readability, architecture, security, and performance.

**The approval standard:** Approve a change when it definitely improves overall code health, even if it isn't perfect. Perfect code doesn't exist — the goal is continuous improvement. Don't block a change because it isn't exactly how you would have written it. If it improves the codebase and follows the project's conventions, approve it.

## The Five-Axis Review
Every review evaluates code across these dimensions:

### 1. Correctness
- Does it match the spec or task requirements?
- Are edge cases handled (null, empty, boundary values)?
- Are error paths handled (not just the happy path)?
- Does it pass all tests? Are the tests actually testing the right things?
- Are there off-by-one errors, race conditions, or state inconsistencies?

### 2. Readability & Simplicity
- Can another engineer (or agent) understand this code without the author explaining it?
- Are names descriptive and consistent with project conventions?
- Is the control flow straightforward (avoid nested ternaries, deep callbacks)?
- **Could this be done in fewer lines?** (1000 lines where 100 suffice is a failure).
- **Are abstractions earning their complexity?** (Don't generalize until the third use case).

### 3. Architecture & Consistency
- Does it follow existing patterns or introduce a new one? If new, is it justified?
- Does it maintain clean module boundaries?
- Is feature-specific logic leaking into a shared or general-purpose module?
- Are type boundaries explicit? Question gratuitous `any`/`unknown`/casts.

### 4. Security
- Is user input validated and sanitized?
- Are secrets kept out of code, logs, and version control?
- Is authorization checked server-side?
- Are SQL queries parameterized?
- Are outputs encoded to prevent XSS?

### 5. Performance
- Any N+1 query patterns?
- Any unbounded loops or unconstrained data fetching?
- Any unnecessary re-renders in UI components?
- Any missing pagination on list endpoints?
