# FinTest

FinTest is a fictional digital bank and QA playground for manual, API, database, security, performance, and automated testing without real money.

## Product

- Digital banking: authentication, accounts, transactions, transfers, cards, simulated payments, exchange and notifications.
- QA Workspace: requirements, test cases, checklists, test runs, bugs, releases, test data, environments, API playground, logs and reports.
- Traceability: Requirement → Test → Run → Bug → Release.
- Controlled reproducible defects through the Bug Engine.

All displayed banking and QA data is synthetic.

## Architecture

- React 19 + TypeScript
- Tailwind CSS 4
- Vite 8
- Node.js/TypeScript Vercel-compatible REST API
- PostgreSQL
- GitHub → Vercel Preview → Production (PROD-SIM)
- Modular monolith first

Financial rules belong in backend services. Protected resources require backend authorization. Money uses exact arithmetic. Critical state changes are atomic and idempotent.

## Repository structure

The current frontend remains at the repository root while the architecture is stabilized.

pnpm-workspace.yaml now defines the root application and future apps/* and packages/* workspace boundaries. Real packages are added only when they have a consumer; empty placeholder packages are forbidden.

Database migrations live under database/migrations and are executed explicitly with pnpm db:migrate. The migration runner keeps a checksum history in public.schema_migrations and never runs automatically as part of a normal Vercel build.

The Stage 10 domain schema is documented in docs/architecture/DATABASE_SCHEMA.md and is introduced by database/migrations/0002_create_fintech_schema.sql.

## Status

| Stage | Status |
| --- | --- |
| 01 — GitHub Repository | Complete |
| 02 — Vercel Project | Complete |
| 03 — Monorepo Foundation | Complete |
| 04 — TypeScript and Tooling | Complete |
| 05 — Frontend Foundation | Complete |
| 06 — Backend/API Foundation | Complete |
| 07 — PostgreSQL Connection | Complete |
| 08 — Environment Configuration | Complete |
| 09 — Database Migrations | Complete |
| 10 — Database Schema | In progress |
| 11–45 | Not started |

The current UI is still a synthetic presentation layer. Stages 05–09 established the frontend, API, PostgreSQL connection, environment boundaries and migration infrastructure. Stage 10 introduces the persistent fintech domain schema; application services and seeded data remain later stages.

## Development

Requirements: Node 22 and pnpm 10.34.3.

pnpm install
pnpm dev

Checks currently available:

pnpm format
pnpm format:check
pnpm typecheck
pnpm check
pnpm build
pnpm db:migrate

The production build runs typecheck, format check, lint, and then Vite build. These quality gates have been verified on Vercel.

Do not commit environment files, credentials, tokens, private keys, build output, logs or platform-local state.

## Branch strategy

- main is production-ready baseline.
- Use feature/*, fix/*, chore/*, or docs/*.
- Work starts from the latest main.
- Open a pull request into main.
- Never push feature work directly to main.
- Vercel Preview is the QA deployment for pull requests.
- Never bypass failing quality gates.

## Roadmap

See TECHNICAL_ROADMAP.md for the authoritative development state and next action.

## First vertical slice

React UI → API → service → repository → PostgreSQL → dashboard

It starts only after the foundation stages have been verified.
