---
name: incremental-implementation
description: Delivers changes incrementally in thin, verifiable slices. Use when implementing any feature or change that touches more than one file, or when picking up the next task from a plan. Use when rolling a change out behind a feature flag, when you're about to write a large amount of code at once, or when a task feels too big to land in one step.
---

# Incremental Implementation

## Overview

Build in thin vertical slices — implement one piece, test it, verify it, then expand. Avoid implementing an entire feature in one pass. Each increment should leave the system in a working, testable state.

## When to Use

- Implementing any multi-file change
- Building a new feature from a task breakdown
- Refactoring existing code
- Any time you're tempted to write more than ~100 lines before testing

**When NOT to use:** Single-file, single-function changes where the scope is already minimal.

## The Increment Cycle

```
Implement ──→ Test ──→ Verify ──→ Next slice
```

For each slice:
1. **Implement** the smallest complete piece of functionality.
2. **Test** — run the test suite or verify the isolated component.
3. **Verify** — confirm the slice works as expected (`npx tsc --noEmit`, `npm test`).
4. **Move to the next slice** — carry forward clean progress.

## Slicing Strategies

- **Vertical Slices (Preferred):** One complete path through the stack (DB → API → UI) delivering end-to-end user value.
- **Contract-First Slicing:** Define TypeScript interfaces / OpenAPI contracts first, enabling parallel frontend/backend development.
- **Risk-First Slicing:** Prove the highest-risk integration (e.g. Leaflet map rendering or third-party API) first before building auxiliary UI.

## Implementation Rules

1. **Simplicity First:** Implement the naive, obviously-correct version first. Avoid premature abstractions.
2. **Scope Discipline:** Touch only what the task requires. Do not refactor unrelated files.
3. **One Thing at a Time:** Keep increments focused on a single logical change.
4. **Keep It Compilable:** Maintain clean typecheck and test pass rates across increments.
5. **Safe Defaults:** Feature flags or opt-in toggles for incomplete work.
