# Database migrations

Migration files are ordered SQL files:

NNNN_description.sql

Rules:

- The numeric prefix is unique and determines execution order.
- Applied migrations are stored in public.schema_migrations.
- Applied migration checksums are verified on every run.
- Never edit an already-applied migration. Add a new migration instead.
- Each migration runs inside the same PostgreSQL transaction as its metadata record.
- The migration runner uses a PostgreSQL transaction-level advisory lock so concurrent runners are serialized.
- 0001_create_schema_migrations.sql bootstraps the migration metadata table.
- 0002_create_fintech_schema.sql introduces the first persistent fintech domain model.

Current domain schema includes users, accounts, transactions, transfers, cards, payments, exchange rates, notifications and audit_log.

Run:

pnpm db:migrate
pnpm db:verify

The first command applies pending migrations. The second verifies that migration metadata and all required fintech tables are present.

Both commands require a server-side DATABASE_URL.
