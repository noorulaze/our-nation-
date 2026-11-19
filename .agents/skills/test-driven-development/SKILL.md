---
name: test-driven-development
description: Drives development with tests using the red-green-refactor loop. Use when implementing any logic, fixing any bug, or changing any behavior. Use when you need to prove that code works, when a bug report arrives, or when you're about to modify existing functionality.
---

# Test-Driven Development

## Overview

Write a failing test before writing the code that makes it pass. For bug fixes, reproduce the bug with a test before attempting a fix. Tests are proof — "seems right" is not done.

## When to Use

- Implementing any new logic or behavior
- Fixing any bug (The Prove-It Pattern)
- Modifying existing functionality
- Adding edge case handling
- Any change that could break existing behavior

**When NOT to use:** Pure documentation updates or static style tweaks with no behavioral impact.

## The TDD Cycle

```
    RED                GREEN              REFACTOR
 Write a test    Write minimal code    Clean up the
 that fails  ──→  to make it pass  ──→  implementation  ──→  (repeat)
      │                  │                    │
      ▼                  ▼                    ▼
   Test FAILS        Test PASSES         Tests still PASS
```

### Step 1: RED — Write a Failing Test
Write the test first. It must fail. A test that passes immediately proves nothing.

### Step 2: GREEN — Make It Pass
Write the minimum code to make the test pass. Avoid premature over-engineering.

### Step 3: REFACTOR — Clean Up
With tests green, improve the code without changing behavior:
- Extract shared logic
- Improve naming and readability
- Remove duplication
- Optimize verified bottlenecks

## The Prove-It Pattern (Bug Fixes)

1. Write a test that reproduces the bug.
2. Confirm the test fails (bug confirmed).
3. Implement the minimal fix.
4. Confirm test passes (proof of fix).
5. Run regression suite (`npm test`).

## Key Principles

- **Test state, not interactions:** Assert on outcomes, not internal mock invocations.
- **DAMP over DRY:** Descriptive And Meaningful Phrases in test setup.
- **Prefer real implementations:** Use real DB/fakes over complex mock trees where practical.
- **One concept per test:** Clear assertions that pinpoint failures immediately.
