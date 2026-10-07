# FinTest — Database Schema

## Stage

Stage 10 — Database Schema.

## Purpose

The domain schema provides the persistent model for the first fintech vertical slices while keeping financial rules in backend services.

## Core tables

| Table | Responsibility |
| --- | --- |
| users | Customer/support/manager/admin identities and account status |
| accounts | Currency accounts and exact decimal balances |
| transactions | Account ledger entries and resulting balance snapshots |
| transfers | Account-to-account money movement and idempotency |
| cards | Virtual card lifecycle and spending limits |
| payments | Simulated merchant payments and idempotency |
| exchange_rates | Versioned currency conversion rates and fees |
| notifications | User-facing banking events |
| audit_log | Security and business-operation audit trail |

## Design rules

### Money

Financial values use PostgreSQL `NUMERIC`, not floating-point types.

- Account balances: `NUMERIC(20, 8)`
- Transaction/transfer/payment amounts: `NUMERIC(20, 8)`
- Exchange rates: `NUMERIC(20, 10)`

Application services remain responsible for currency-specific rounding and business rules.

### Identity and authorization

Users have explicit roles:

- CUSTOMER
- SUPPORT
- MANAGER
- ADMIN

Resource ownership is represented with foreign keys. Card-to-account ownership is enforced with composite foreign keys, and card-to-account payment consistency is enforced at the database level. Backend authorization remains mandatory; database constraints do not replace object-level authorization.

### Idempotency

Transfers and payments have unique, non-empty idempotency keys. This gives the service layer a durable database constraint against accidental duplicate processing.

### Transaction history

Transactions are stored separately from transfers and payments so one account can have a unified ledger view across operation types.

### Auditability

`audit_log` stores security and business-operation events without putting sensitive credentials into the record. The application layer decides which actions must be audited and what metadata is safe to persist.

## Migration

The schema is introduced by:

`database/migrations/0002_create_fintech_schema.sql`

It depends on migration 0001 and must never be edited after being applied. Future schema changes use new migrations.

## Intentionally deferred

The schema does not yet implement:

- authentication/session tables;
- refresh-token storage;
- password-reset tokens;
- QA Workspace persistence;
- seeded test data;
- automated bug injection;
- service/repository code.

Those concerns are introduced by later roadmap stages so the first domain migration remains reviewable and focused.
