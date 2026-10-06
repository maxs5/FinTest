# FinTest — Technical Roadmap

## 1. Purpose
FinTest is a free fintech application and QA playground.

Goals:
- working fintech-like product without real money;
- realistic QA Workspace;
- reproducible defects and releases;
- manual, API, DB, security, performance and automated testing;
- modular, reusable and maintainable architecture.

README.md is the product summary. This file is the operational development roadmap and current-state tracker.

## 2. Current state

CURRENT STAGE: 02 — Vercel Project

- [x] Repository, main branch, README, ignore rules and baseline exist.
- [x] React/Vite/Tailwind presentation interface exists.
- [x] Synthetic banking and QA Workspace screens exist.
- [x] Vercel project connected to GitHub and Production deployment verified.
- [ ] Preview deployment verification.
- [ ] Backend/API.
- [ ] PostgreSQL.
- [ ] Persistent authentication.
- [ ] Real financial/business logic.
- [ ] Automated tests.
- [ ] CI/CD.
- [ ] Bug Engine.
- [ ] Production-like data flow.

The existing UI is a presentation prototype. Its screens do not prove that the corresponding backend features are implemented.

Observed repository state:
- React 19 + TypeScript + Vite 8 + Tailwind CSS 4.
- No backend source is present.
- No database, migrations or seeds are present.
- No test suite is present.
- package scripts currently provide dev, build, preview and format; test/lint/typecheck scripts are not defined.
- No GitHub Actions workflow is present.
- Largest inspected source file: src/pages/Quality.tsx — 826 lines; below the 1,500-line hard limit.

Never mark a stage complete without verification.

## 3. Development order

Rule for every stage:

PLAN → IMPLEMENT → VERIFY → TEST → DOCUMENT → COMPLETE → NEXT

### Foundation
- [x] 01 — GitHub Repository
- [ ] 02 — Vercel Project — GitHub connection and Production deployment verified; Preview verification in progress.
- [ ] 03 — Monorepo Foundation — introduce apps/packages/database/docs/tests only when needed.
- [ ] 04 — TypeScript and Tooling — strict checks, formatting, linting and reproducible scripts.
- [ ] 05 — Frontend Foundation — routing, shared UI, API client, loading/error/empty states.
- [ ] 06 — Backend/API Foundation — Vercel-compatible REST API, validation, errors, logging, health endpoint.
- [ ] 07 — PostgreSQL Connection — select a free provider after checking current limits.
- [ ] 08 — Environment Configuration — Development/Preview/Production variables; no secrets in git.
- [ ] 09 — Database Migrations — reproducible schema changes.
- [ ] 10 — Database Schema — users, accounts, transactions, constraints, indexes and relations.
- [ ] 11 — Seed/Test Data — deterministic synthetic users, accounts and states.

### Core fintech
- [ ] 12 — Authentication — register, login, logout, refresh, /me, hashing and middleware.
- [ ] 13 — Users — ownership model and backend object-level authorization.
- [ ] 14 — Accounts — multi-currency accounts, statuses and CRUD rules.
- [ ] 15 — Dashboard — real API-backed balances and activity.
- [ ] 16 — Transactions — list/detail/filter/sort/pagination/date filters.
- [ ] 17 — Transfers — validation, balance checks and transaction creation.
- [ ] 18 — Transaction Integrity — DB transactions, atomicity, rollback and concurrency strategy.
- [ ] 19 — Idempotency — Idempotency-Key and replay protection.
- [ ] 20 — Cards — virtual cards, status, freeze/unfreeze and limits.
- [ ] 21 — Payments — simulated merchant payments and statuses.
- [ ] 22 — Currency Exchange — rates, fees, exact arithmetic and rounding.
- [ ] 23 — Notifications — event-driven creation and read/unread state.
- [ ] 24 — RBAC — CUSTOMER, SUPPORT, MANAGER, ADMIN with backend enforcement.

### QA Workspace
- [ ] 25 — QA Workspace Foundation
- [ ] 26 — Requirements
- [ ] 27 — Test Cases
- [ ] 28 — Checklists
- [ ] 29 — Test Runs
- [ ] 30 — Bug Management
- [ ] 31 — Bug Seeding Engine
- [ ] 32 — Release Management
- [ ] 33 — Logical Environments — DEV / QA / STAGE / PROD-SIM.
- [ ] 34 — Test Data Management
- [ ] 35 — API Playground
- [ ] 36 — Structured Logs
- [ ] 37 — Audit Logs

### Quality engineering
- [ ] 38 — Automated Tests — unit, integration, API and E2E.
- [ ] 39 — Security Testing — auth, authz, IDOR, validation, rate limits and data exposure.
- [ ] 40 — Performance and Concurrency — critical paths and double-spend/race scenarios.
- [ ] 41 — Failure Simulation — controlled timeouts, duplicate requests and downstream failures.
- [ ] 42 — CI/CD — install → format/lint → typecheck → test → build.
- [ ] 43 — Vercel Release Pipeline — feature → Preview → QA → main → Production/PROD-SIM.
- [ ] 44 — Mobile — separate client using the stabilized API contract.
- [ ] 45 — Continuous FinTest — repeating releases, requirements, tests, bugs, fixes and regression.

## 4. Architecture rules
- Start as a modular monolith.
- React + TypeScript frontend.
- Node.js + TypeScript Vercel-compatible REST API.
- PostgreSQL.
- Route/Controller → Validation → Service → Repository → DB.
- Business rules must not live in UI components.
- SQL must not be scattered through UI or route handlers.
- Reuse shared types, validation and UI components.
- No duplicated business logic or types.
- Monetary calculations use exact arithmetic.
- Critical financial state changes are atomic.
- Critical repeatable operations are idempotent.
- Protected resources require backend object-level authorization.
- Keep business logic portable and not coupled to Vercel.
- No file may exceed 1,500 lines; prefer smaller focused modules.

## 5. Environment model
| Environment | Purpose | Deployment mapping |
|---|---|---|
| DEV | Active development/debugging | Local / Development |
| QA | Main testing | Vercel Preview |
| STAGE | Release candidate | Selected Preview/RC deployment |
| PROD-SIM | Production-like safe simulation | Vercel Production |

Do not describe these as four independent free cloud environments.

## 6. QA model
Requirement → Test Case/Checklist → Test Run → Bug → Fix → Retest → Release

Critical scenarios:
- authentication and authorization;
- IDOR/object ownership;
- balances and transfers;
- duplicate requests and concurrency;
- payment state transitions;
- exchange rounding;
- transaction consistency;
- notifications;
- auditability.

## 7. Defect model
Required fields: ID, title, description, environment, build/release, severity, priority, difficulty, component, steps, expected/actual, evidence, status and traceability links.

Lifecycle:
OPEN → IN PROGRESS → FIXED → READY FOR RETEST → VERIFIED

Alternative states: REOPENED / REJECTED / DUPLICATE / WONT FIX.

Seeded defects must be reproducible and tied to environment/release/component.

## 8. Release gate
- no open Critical defects;
- unacceptable High defects resolved or explicitly accepted;
- regression passed;
- migrations verified;
- build passed;
- applicable automated tests passed;
- Preview/release candidate verified;
- Production/PROD-SIM deployment verified;
- release documentation updated.

## 9. Forbidden
- Direct changes to main.
- Development without a feature/fix/chore/docs branch.
- Skipping stages without recording the reason and verification.
- Claiming unverified functionality as implemented.
- Fake backend/API/database behavior presented as real functionality.
- Paid services or paid APIs.
- Docker as a mandatory architecture dependency.
- Secrets, credentials or private keys in the repository.
- Files over 1,500 lines.
- Unnecessary duplication or dependencies.
- Business rules hidden inside UI.
- Breaking existing functionality without documenting and testing impact.
- During a Git conflict, never keep both versions: choose only the new intended version.

## 10. Documentation rule
When a feature changes:
1. Update this roadmap/status when the stage state changes.
2. Update README.md when product scope, architecture, setup or workflow changes.
3. Add/update requirements and acceptance criteria where applicable.
4. Add/update tests and QA documentation.
5. Record release impact.

Documentation must be short, factual and synchronized with code.

## 11. Branch rule
All work starts from the latest main.

Branch names:
- feature/<name>
- fix/<name>
- chore/<name>
- docs/<name>

Current branch: chore/verify-vercel

This branch contains only the requested roadmap. main must not be modified directly.

## 12. Agent operating rules
Before changing code:
1. Read this file.
2. Inspect the current branch and relevant files.
3. Identify the current stage.
4. Implement only the current stage or explicitly approved corrective work.
5. Verify the result.
6. Update documentation/status.
7. Report exactly what changed and what remains unverified.

If repository state contradicts this roadmap, inspect the code first. Do not invent status.

## 13. Next action
NEXT ACTION: Verify a Preview deployment for this branch, then complete stage 02.

Do not start backend, database or new fintech functionality until stage 02 and the required foundation stages are verified in order.