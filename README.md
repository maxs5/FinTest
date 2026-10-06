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

## Status

| Stage | Status |
| --- | --- |
| 01 — GitHub Repository | Complete |
| 02 — Vercel Project | Complete |
| 03 — Monorepo Foundation | Complete |
| 04 — TypeScript and Tooling | In progress |
| 05–45 | Not started |

The current UI is a presentation prototype with typed synthetic data. It does not yet persist data or perform real financial operations.

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

The production build runs TypeScript checking before Vite build. Linting is not yet enabled; it will be added with a reproducible lockfile update.

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

React UI → register/login → GET /me → account → PostgreSQL → dashboard

It starts only after the foundation stages have been verified.
