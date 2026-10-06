# FinTest

FinTest is a fictional digital bank and a QA playground. It is designed for
manual, API, database, security, performance, and automated testing without
real money or payment credentials.

The product specification in
[`src/imports/FinTest_Full_Project_Specification_Vercel.pdf`](src/imports/FinTest_Full_Project_Specification_Vercel.pdf)
is the source of truth. Development follows its 45 stages in order and uses
small, verified vertical slices.

## Product scope

- Digital banking: authentication, accounts, transactions, transfers, cards,
  simulated payments, currency exchange, and notifications.
- QA workspace: requirements, test cases, checklists, test runs, defects,
  releases, test data, logical environments, API playground, logs, and reports.
- Traceability: Requirement → Test → Run → Bug → Release.
- Reproducible defect scenarios through a controlled Bug Engine.

No real funds, production banking data, or real payment credentials are used.

## Architecture

- **Frontend:** React 19 and TypeScript.
- **Styling:** Tailwind CSS 4.
- **Build:** Vite 8.
- **Backend target:** Node.js/TypeScript Vercel-compatible REST API with
  OpenAPI.
- **Database target:** PostgreSQL with migrations and deterministic seed data.
- **Deployment target:** GitHub → Vercel Preview → QA → Production
  (`PROD-SIM`).

The system starts as a modular monolith. Financial rules belong to backend
services, protected resources require object-level authorization, money is
handled with exact arithmetic, and critical state changes are atomic and
idempotent.

The repository currently uses the Figma Make React/Vite scaffold. The target
module boundaries (`apps`, `packages`, `database`, `docs`, and `tests`) will be
introduced at stage 3 rather than prematurely.

## Current status

| Stage | Status | Notes |
| --- | --- | --- |
| 01 — GitHub Repository | Complete | GitHub remote, documentation, ignore rules, committed baseline, and push are verified. |
| 02–45 | Not started | Work must not begin until the previous stage meets its Definition of Done. |

## Local development

Requirements are defined in [`.mise.toml`](.mise.toml). Install dependencies
with:

```bash
pnpm install
```

In Figma Make, the Vite development server is managed by the platform and must
not be started manually. Outside that environment:

```bash
pnpm dev
```

Available checks:

```bash
pnpm format
pnpm build
```

Do not commit `.env` files, credentials, tokens, private keys, generated build
output, logs, or platform-local state.

## Branch strategy

- `main` is protected conceptually and represents the latest production-ready
  state.
- Create short-lived branches from the latest `main`:
  - `feature/<short-name>` for product work;
  - `fix/<short-name>` for defect fixes;
  - `chore/<short-name>` for tooling and maintenance;
  - `docs/<short-name>` for documentation-only changes.
- Keep each branch focused on one stage or one small vertical slice.
- Open a pull request into `main`; do not push feature work directly to
  `main`.
- The Vercel Preview deployment is the QA environment for a pull request.
- Merge only after applicable formatting, type checking, tests, build, and QA
  checks pass.
- Use squash merging so `main` keeps one coherent commit per change.
- Never force-push `main` or bypass failing quality gates.

## Delivery rules

1. Inspect the repository and current diff before making changes.
2. Complete stages sequentially; do not claim unverified work.
3. Keep files modular and below the 1,500-line hard limit.
4. Update this README when capabilities, architecture, setup, or workflows
   change.
5. Keep secrets in environment settings only.
6. Do not add Docker or mandatory paid services without an explicit
   architecture decision.

## First vertical slice

The first milestone will connect the complete path:

`React UI → register/login → GET /me → account → PostgreSQL → dashboard`

It begins only after the repository, Vercel project, tooling, API foundation,
database connection, configuration, migrations, and schema stages have each
met their Definition of Done.
