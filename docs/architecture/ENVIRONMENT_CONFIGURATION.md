# FinTest — Environment Configuration

## Purpose

Environment configuration is the boundary between application code and deployment-specific values.

The same application code must work in local development, Vercel Preview and Vercel Production without hardcoded credentials or provider-specific deployment assumptions.

## Server variables

### DATABASE_URL

DATABASE_URL is server-only.

It contains the PostgreSQL connection string and must never be:

- committed to Git;
- rendered into browser code;
- exposed in API responses;
- copied into frontend environment variables.

The repository contains only the safe placeholder in .env.example.

## Environment mapping

| Logical environment | Runtime | Configuration source |
| --- | --- | --- |
| DEV | Local | local .env |
| QA | Vercel Preview | Vercel Preview environment variables |
| STAGE | Selected Vercel Preview | Vercel Preview environment variables |
| PROD-SIM | Vercel Production | Vercel Production environment variables |

The logical environment is a product/QA concept. It is not a separate Vercel project.

## Configuration rules

- Application code reads environment variables through configuration modules.
- API routes do not duplicate environment-variable parsing.
- Missing required configuration produces an explicit server-side error.
- Secrets are never imported by frontend code.
- .env.example documents variable names and safe placeholders only.
- New environment variables must be documented before use.

## Local setup

Create a local .env from .env.example and provide a valid PostgreSQL connection string.

Do not commit .env.

## Vercel setup

Set DATABASE_URL in the Vercel project for the required deployment targets.

Preview deployments use the Preview value. Production uses the Production value.

After changing a Vercel environment variable, create a new deployment so the new runtime configuration is applied.

## QA value

This separation makes configuration failures testable. A missing variable, invalid connection string or environment mix-up can become a reproducible QA scenario instead of an unexplained application failure.
