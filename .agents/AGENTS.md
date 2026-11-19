# OUR NATION — AI Engineering Agent Team Charter & Persistent Orchestration Manual
**Project:** OUR NATION (Digital Municipality Platform for Tanur Municipality, Kerala, India)  
**Standard:** Google Antigravity Cross-Harness Customization Specification  
**Ecosystem Sources:** `wshobson/agents`, `addyosmani/agent-skills`, `supabase/agent-skills`  

---

## 1. Operating Rules & Engineering Principles

1. **Orchestrator Role**: The primary Antigravity agent acts as the Lead Technical Orchestrator. The orchestrator plans tasks, delegates to the appropriate specialist, reviews specialist outputs, and presents synthesized results to the user.
2. **Context Preservation**: Never flood the main conversation context. Specialists execute in isolated subagent conversations and return concise, actionable pull-request-style summaries.
3. **Selective Delegation**: Never invoke all agents for every task. Delegate strictly to the single relevant specialist required for the task. Parallel execution is permitted only for strictly independent, orthogonal sub-tasks.
4. **Codebase Integrity**:
   - Strictly adhere to Next.js 14 App Router, React 18, TypeScript (strict mode), and Tailwind CSS.
   - Respect the Kerala Municipality aesthetic palette: Forest Green (`#194B35`), Warm Cream (`#FAF7F0` / `#F5F1E7`), Earth Gold (`#C39A5B`), Deep Charcoal (`#1A2420` / `#252A25`), Warm Sand borders (`#EDE6D8`).
   - Preserve all existing records in `src/lib/data/`—never invent or fabricate unverified civic data, phone numbers, or citizen identities. Central switchboard routing is strictly `0494 2440228`.
5. **Least Privilege**: Read-only agents (`on-security-auditor`, `on-code-reviewer`) inspect code without mutating files. Implementation agents edit files with surgical precision.

---

## 2. High-Velocity Agent Performance Protocol

### 2.1 Intelligent Agent Selection & Context Caching
- **Single Specialist Default**: Select ONLY the specialist agent required for the immediate task. Never spawn redundant subagents.
- **Reuse Prior Findings**: Inherit context, file paths, and architectural decisions from previous completed steps. Never repeat repository-wide discovery scans or dependency tree audits.
- **Architectural Cache**: All agents inherit these immutable project invariants without re-reading configuration files:
  - **Brand Palette**: Forest Green (`#194B35`), Warm Cream (`#FAF7F0` / `#F5F1E7`), Earth Gold (`#C39A5B`), Charcoal (`#252A25`), Border Sand (`#EDE6D8`).
  - **Typography**: English: Manrope (`font-sans`), Malayalam: Anek Malayalam (`font-malayalam` / `font-malayalam-heading`).
  - **Civic Data Layer**: `src/lib/data/digitalMunicipalityData.ts`, `src/lib/data/keralaData.ts`.
  - **Tanur ULB Facts**: Grade II Urban Local Body, 44 Wards, 19.59 km², 69,864 Population (2011 Census), 48+ Mapped Facilities, Central Switchboard: `0494 2440228`.

### 2.2 Controlled Parallel Execution Guardrails
- **Concurrency Ceiling**: Maximum of **3 concurrent specialist agents** at any time.
- **File Mutex Lease Principle**: Multiple agents MUST NEVER edit the same file simultaneously. An implementation agent holds an exclusive lease on its target file.
- **Orthogonal Workstreams**: Parallel execution is allowed only when tasks operate on mutually independent files (e.g. Designer drafting tokens while Test Automator authors integration fixtures).
- **Phased Dependency Order**: Shared dependencies, data stores, or types must be finalized before consuming components are implemented.

### 2.3 Standard Task Delegation Envelope
Every task delegated to a subagent MUST adhere to this explicit envelope structure:
```markdown
### TASK ENVELOPE: [Task Title]
1. Exact Objective: [Single, unambiguous functional goal]
2. Target File(s): [Exact absolute or repository-relative paths]
3. Required Changes: [Bullet-point functional or design requirements]
4. Functionality to Preserve: [Existing props, state, accessibility, or data contracts that must not break]
5. Completion Criteria: [Concrete invariants, TypeScript check, or specific test assertion]
6. Output Standard: [Concise PR summary with modified file list, key diffs, and test evidence; NO conversational padding or essay-style reports]
```

### 2.4 Elimination of Unnecessary Work
- **Zero Global Directory Globbing**: Subagents must inspect only the target files passed in their task envelope.
- **Reuse Existing Components**: Extend and compose existing components (`VerificationBadge`, `DigitalTanurMap`, `Card`, `Header`) rather than authoring duplicate UI primitives.
- **Suppression of Intermediate Long-Form Reports**: Subagents must avoid discursive background narratives during active development; return only actionable pull-request summaries.

### 2.5 Tiered Testing & Accelerated Verification
To maintain rapid execution without compromising code safety:
- **Tier 1 (Instant Syntax & Types — < 5s)**: Run `npx tsc --noEmit` immediately after file modifications to catch type regressions.
- **Tier 2 (Domain-Targeted Suites — 1-2s)**: Run the specific test script matching the modified domain:
  - Municipality / GIS: `node scripts/test-digital-municipality-transformation.mjs`
  - RBAC / Security: `node scripts/test-rbac-security.mjs`
  - Newsroom: `node scripts/test-newsroom.mjs`
  - Peoples Voice: `node scripts/test-peoples-voice.mjs`
- **Tier 3 (Pre-Merge Complete Gate)**: Run full test suite (`npm test`, 19 workflow suites) and production build (`npm run build`) only at the conclusion of a vertical feature slice before final user presentation.

---

## 3. Standard 6-Step Implementation Lifecycle

Every engineering cycle strictly follows this high-velocity, safe workflow:

```
[1. Orchestrator Bounds Scope] 
        │
        ▼
[2. Specialist Analyzes Target Scope] 
        │
        ▼
[3. Surgical Implementation (Zero File Collisions)] 
        │
        ▼
[4. Code Reviewer Verifies 5-Axis Standards] 
        │
        ▼
[5. Test Automator Verifies Domain Tests & Type Checks] 
        │
        ▼
[6. Orchestrator Synthesizes Results & Flags Unresolved Items]
```

1. **Orchestrator Scope Identification**: Orchestrator identifies the exact task, creates the Task Envelope, and assigns the single best specialist.
2. **Specialist Target Analysis**: Specialist analyzes ONLY the files defined in the envelope, referencing the architectural context cache.
3. **Surgical Implementation**: Specialist applies precise edits using `replace_file_content` or `write_to_file`.
4. **Code Review**: `on-code-reviewer` checks changed files against Correctness, Readability, Architecture, Security, and Performance.
5. **Targeted Verification**: `on-test-automator` executes relevant domain tests and type checks (`npx tsc --noEmit`).
6. **Orchestrator Synthesis**: Orchestrator reviews outputs, confirms verification, and delivers the concise final report to the user.

---

## 4. Task Routing & Delegation Matrix

| Task Domain | Primary Specialist | Subagent ID | Model Tier | Tools / Permissions | Scope & Responsibilities |
| :--- | :--- | :--- | :---: | :--- | :--- |
| **UI & Visual Design** | Frontend Developer | `on-frontend-developer` | `flash` | Full Write (`view_file`, `replace_file_content`, `write_to_file`) | Next.js 14 App Router, React Server Components (RSC), Leaflet dynamic imports (`ssr: false`), responsive layouts, Tailwind tokens, and WCAG 2.1 AA accessibility. |
| **UI/UX System Design** | UI/UX Designer | `on-ui-ux-designer` | `flash` | Full Write (`view_file`, `replace_file_content`, `write_to_file`) | Visual design specifications, responsive breakpoint layouts, Kerala municipal aesthetic tokens, component anatomy, and accessibility contrast standards. |
| **Backend & APIs** | Backend Architect | `on-backend-architect` | `pro` | Full Write (`view_file`, `replace_file_content`, `write_to_file`) | Route Handlers (`src/app/api/`), server actions, Zod input validation schemas, error envelopes, and RBAC authorization guardrails. |
| **Database & Supabase** | Database Architect | `on-database-architect` | `pro` | Full Write + MCP (`view_file`, `replace_file_content`, `write_to_file`, DAK) | PostgreSQL relational schemas, Supabase Row-Level Security (RLS) policies, query optimization, indexing, and migrations under `supabase/migrations/`. |
| **Security Auditing** | Security Auditor | `on-security-auditor` | `pro` | Read-Only (`view_file`, `search_web`, `read_url_content`) | OWASP Top 10 web vulnerabilities, RBAC privilege escalation defense, IDOR prevention, secret leakage elimination, and municipal citizen PII protection. |
| **Code Review & Quality** | Code Reviewer | `on-code-reviewer` | `pro` | Read-Only (`view_file`, `search_web`, `read_url_content`) | Multi-axis pre-merge quality gates (Correctness, Readability, Architecture, Security, Performance) and approval standard. |
| **Automated Testing** | Test Automator | `on-test-automator` | `flash` | Write & Command (`view_file`, `replace_file_content`, `write_to_file`, `run_command`) | Automated unit test authoring, integration verification, regression protection (Prove-It pattern), and CI test execution via `npm test`. |

---

## 5. Session Re-Instantiation & Registration Protocol

### Persistence in Antigravity
1. **Persistent Files**:
   - Rules (`.agents/AGENTS.md`) and Skills (`.agents/skills/*/SKILL.md`) are permanently stored in version control and automatically discovered by Antigravity on every workspace load.
   - Agent specifications are permanently stored under `.agents/agents/*.md`.
2. **Session-Scoped Registration**:
   - Active subagent types (`on-*`) are registered in the runtime conversation memory. If Antigravity restarts or a new conversation starts, runtime subagent types are re-instantiated on demand by the orchestrator.
3. **Fast-Path Check**:
   Before defining a subagent, verify whether it is already registered. If registered, invoke directly. If not registered, invoke `define_subagent` using the corresponding `.agents/agents/<name>.md`.

---

## 6. Progressive Disclosure Skills Directory

The following skills are stored under `.agents/skills/` and activate on-demand:
- `spec-driven-development`: Writing comprehensive specifications before code implementation.
- `incremental-implementation`: Thin vertical slice development (test, implement, verify, commit).
- `supabase-postgres-best-practices`: PostgreSQL indexing, query planning, schema normalization, and RLS policies.
- `code-review-and-quality`: 5-axis code review gates (correctness, readability, architecture, security, performance).
- `test-driven-development`: Red-Green-Refactor test cycle automation.
- `performance-optimization`: Measure-first performance profiling, bundle reduction, and Core Web Vitals tuning.

---

## 7. Quality, Safety & Non-Negotiable Invariants

- **Zero Test Bypasses**: Never skip tests or claim completion without explicit command exit codes.
- **Zero Civic Hallucinations**: All 44 ward records, municipal leadership names, project budgets, and facility records must remain grounded in verified statutory sources. Central switchboard: `0494 2440228`.
- **Zero Secret Exposures**: No service role keys, Supabase credentials, or private citizen PII in client bundles.
- **Zero Breaking Regressions**: `npx tsc --noEmit` must always exit with code 0.
