---
name: supabase-postgres-best-practices
description: "Postgres best practices maintained by Supabase, for Postgres running anywhere. Load this skill BEFORE writing or changing anything that lives in a Postgres database: creating or altering tables and columns (including choosing column types), schema design, migrations and declarative schema files, RLS policies and the tests that verify them, indexes, triggers, database functions, queues and scheduled jobs (pg_cron, pgmq), vector/semantic search (pgvector), and restoring dumps (pg_restore) or importing data. Also load it when diagnosing slow queries, high CPU, timeouts, EXPLAIN plans, connection exhaustion, locking, bloat, or rows visible to the wrong user or tenant."
license: MIT
metadata:
  author: supabase
  organization: Supabase
---

# Supabase Postgres Best Practices
*Source: official supabase/agent-skills repository*

Comprehensive performance optimization and security guide for Postgres, maintained by Supabase. Contains rules across 8 categories, prioritized by impact to guide automated query optimization and schema design.

## When to Apply
Reference these guidelines when:
- Writing SQL queries or designing schemas
- Implementing indexes or query optimization
- Reviewing database performance issues
- Configuring connection pooling or scaling
- Optimizing for Postgres-specific features
- Working with Row-Level Security (RLS)

## Core Engineering Rules for OUR NATION

### 1. Row-Level Security (RLS) Discipline
- Always enable RLS on every table: `ALTER TABLE tablename ENABLE ROW LEVEL SECURITY;`.
- Never write permissive `USING (true)` for mutation policies (`INSERT`, `UPDATE`, `DELETE`).
- Separate policies by command (`FOR SELECT`, `FOR INSERT`, `FOR UPDATE`, `FOR DELETE`) rather than using blanket `FOR ALL`.
- For user-owned data, check `auth.uid() = user_id`.
- Protect administrative fields: prevent users from updating their own `role` or `is_verified` columns via database triggers and restricted policies.

### 2. Indexing Best Practices
- Every foreign key constraint must have a corresponding index on the child table to avoid full table locks during parent deletes.
- Use B-tree indexes for equality and range queries (`=`, `<`, `<=`, `>`, `>=`).
- Use GIN indexes for JSONB columns (`jsonb_path_ops`) and array columns.
- Use partial indexes when filtering on high-cardinality status flags (e.g. `CREATE INDEX idx_issues_unresolved ON civic_issues (ward_number) WHERE status != 'Resolved';`).

### 3. Query Performance & EXPLAIN Analysis
- Avoid `SELECT *` in production application code; project only required columns.
- Never wrap indexed columns in non-immutable functions within `WHERE` clauses (e.g. `WHERE LOWER(name) = ...` requires a functional index on `LOWER(name)`).
- Avoid N+1 queries by leveraging Postgres relational joins or JSON aggregation (`json_agg`, `json_build_object`).
