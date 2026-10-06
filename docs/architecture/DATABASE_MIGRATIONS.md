# FinTest — Database Migrations

## Stage

Stage 09 — Database Migrations.

## Purpose

Database structure must evolve through versioned, reviewable SQL instead of manual edits in the hosted database.

The migration system provides:

- deterministic execution order;
- a persistent schema_migrations history;
- SHA-256 checksums to detect edits to applied migrations;
- one PostgreSQL transaction for a migration batch;
- a transaction-level advisory lock to serialize concurrent runners;
- a repeatable pnpm db:migrate command.

## Files

database/
  migrations/
    0001_create_schema_migrations.sql
    README.md
  scripts/
    migrate.mjs

Migration names use:

NNNN_description.sql

The numeric prefix must be unique.

## Execution

pnpm db:migrate
      ↓
load and validate migration files
      ↓
connect to PostgreSQL
      ↓
BEGIN
      ↓
transaction-level migration lock
      ↓
verify applied checksums
      ↓
execute pending SQL
      ↓
record migration + checksum
      ↓
COMMIT

If any migration fails, the transaction is rolled back and the migration is not recorded as applied.

## Safety rules

- DATABASE_URL is read only on the server/Node process.
- Applied migrations are immutable.
- A checksum mismatch stops the migration run.
- Migration SQL is trusted repository code; runtime/user input is never interpolated into it.
- The runner does not run automatically during a normal Vercel build or request.
- Production database changes must be an explicit migration operation.

The explicit migration step is intentional: a deployment build must not silently mutate the database.

## Stage 10 boundary

Stage 09 establishes the migration mechanism and metadata table.

Domain schema creation starts in Stage 10. This keeps database infrastructure separate from the first fintech domain model.
