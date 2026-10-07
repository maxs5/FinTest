# FinTest — Database Connection

## Stage

Stage 07 — PostgreSQL Connection.

## Provider

FinTest uses PostgreSQL through Neon for the first hosted implementation.

The current Neon Free plan is sufficient for the project and keeps the project within the no-paid-services constraint. The application does not depend on Neon-specific SQL features in the domain layer.

## Connection

The API reads the PostgreSQL connection string from:

`DATABASE_URL`

The value is never committed to Git.

The connection is created inside the request path using `@neondatabase/serverless`, which is designed for serverless JavaScript environments.

## API health check

`GET /api/db-health`

Possible responses:

- `200` — PostgreSQL is reachable.
- `503 DATABASE_NOT_CONFIGURED` — `DATABASE_URL` is missing.
- `503 DATABASE_UNAVAILABLE` — the configured database cannot be reached or the query failed.
- `405` — request method is not GET.

## Architecture boundary

The dependency direction is:

```text
API route
  ↓
database connection adapter
  ↓
PostgreSQL
```

Domain services must not import the Neon driver directly.

When repositories are introduced, SQL access will live below the repository boundary so the business layer remains independent of the database provider.

## Security

- No database credentials in source control.
- No database credentials in client-side code.
- Health responses do not return connection details.
- Database errors are intentionally mapped to a generic public error.
