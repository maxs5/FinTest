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
- Domain tables begin with the next migration in Stage 10.

Run:

pnpm db:migrate

The command requires a server-side DATABASE_URL.
