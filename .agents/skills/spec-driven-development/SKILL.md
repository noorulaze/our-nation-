---
name: spec-driven-development
description: Creates specs before coding. Use when starting a new project, feature, or significant change and no specification exists yet. Use when drafting a PRD or requirements document with objectives and scope, or when requirements are unclear, ambiguous, or only exist as a vague idea.
---

# Spec-Driven Development

## Overview

Write a structured specification before writing any code. The spec is the shared source of truth between you and the user — it defines what we're building, why, and how we'll know it's done. Code without a spec is guessing.

## When to Use

- Starting a new project or feature
- Requirements are ambiguous or incomplete
- The change touches multiple files or modules
- You're about to make an architectural decision
- The task would take more than 30 minutes to implement

**When NOT to use:** Single-line fixes, typo corrections, or changes where requirements are unambiguous and self-contained.

## The Gated Workflow

```
SPECIFY ──→ PLAN ──→ TASKS ──→ IMPLEMENT
   │          │        │          │
   ▼          ▼        ▼          ▼
 Human      Human    Human      Human
 reviews    reviews  reviews    reviews
```

### Phase 1: Specify

1. **Objective** — What are we building and why? Who is the user? What does success look like?
2. **Commands** — Full executable commands with flags, not just tool names.
3. **Project Structure** — Where source code lives, where tests go, where docs belong.
4. **Code Style** — Real code snippets illustrating conventions.
5. **Testing Strategy** — Frameworks, test levels, coverage.
6. **Boundaries** — Three-tier system: Always / Ask first / Never.

### Phase 2: Plan

With the validated spec, generate a technical implementation plan:
1. Major components and dependencies
2. Implementation order (what must be built first)
3. Risks and mitigation strategies
4. Checkpoints between phases

### Phase 3: Tasks

Break the plan into discrete, implementable tasks:
- Each task completable in a single focused session
- Explicit acceptance criteria
- Verification step (test, build, manual check)
- Touches <= 5 files

### Phase 4: Implement

Execute tasks one at a time following test-driven development and incremental implementation.
