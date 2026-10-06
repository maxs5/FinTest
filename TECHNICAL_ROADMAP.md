# FinTest — Technical Roadmap

## Current state

CURRENT STAGE: 06 — Backend/API Foundation

- [x] 01 — GitHub Repository
- [x] 02 — Vercel Project
- [x] 03 — Monorepo Foundation (workspace boundaries established)
- [x] 04 — TypeScript and Tooling (typecheck, formatting, and lint checks pass on Vercel)
- [x] 05 — Frontend Foundation (Vercel quality gate passed)
- [~] 06 — Backend/API Foundation
- [ ] 07 — PostgreSQL Connection
- [ ] 08 — Environment Configuration
- [ ] 09 — Database Migrations
- [ ] 10 — Database Schema
- [ ] 11 — Seed/Test Data
- [ ] 12–45 — Core fintech, QA Workspace and quality engineering

Verified Vercel state:
- Project: fin-test
- Framework: Vite
- GitHub: maxs5/FinTest
- Production deployment: READY
- Preview deployment from chore/verify-vercel: READY

Current application state:
- React/Vite/Tailwind presentation UI exists.
- No backend, database, persistence or automated test suite exists yet.
- Largest inspected source file is below the 1,500-line hard limit.

## Development rule

PLAN → IMPLEMENT → VERIFY → TEST → DOCUMENT → COMPLETE → NEXT

## Architecture

- Modular monolith first.
- React + TypeScript frontend.
- Node.js + TypeScript Vercel-compatible REST API.
- PostgreSQL.
- Route/Controller → Validation → Service → Repository → DB.
- Business rules stay outside UI.
- Shared types/validation/UI are reusable.
- Money uses exact arithmetic.
- Critical financial changes are atomic.
- Critical repeated operations are idempotent.
- Backend enforces object-level authorization.
- No mandatory Docker.
- No paid services or paid APIs.
- No file over 1,500 lines.

## Monorepo rule

pnpm-workspace.yaml defines:
- root application .
- future applications under apps/*
- future shared packages under packages/*

Do not create placeholder packages without a real consumer. Database, docs and test directories are introduced when their corresponding stage requires them.

## Environments

| Environment | Purpose | Mapping |
|---|---|---|
| DEV | Development/debugging | Local |
| QA | Main testing | Vercel Preview |
| STAGE | Release candidate | Selected Preview |
| PROD-SIM | Production-like simulation | Vercel Production |

## QA model

Requirement → Test Case/Checklist → Test Run → Bug → Fix → Retest → Release

## Forbidden

- Direct changes to main.
- Unverified functionality presented as implemented.
- Secrets in git.
- Unnecessary duplication.
- Business logic hidden in UI.
- Keeping both sides of a merge conflict: choose only the new intended version.

## Documentation

When product behavior, architecture, setup or workflow changes:
1. Update this roadmap.
2. Update README.md.
3. Update relevant QA/requirements documentation.
4. Record release impact.

## Branch

Current working branch: chore/monorepo-foundation

All work must use a new branch. main is never edited directly.

## Stage 05 scope

- Stable client-side navigation based on URL hashes so a selected workspace page survives refresh.
- Central page validity checks so unknown hashes fall back to Overview.
- Lazy loading remains the default for larger Banking and QA page groups.
- A root React error boundary prevents an isolated render failure from leaving a blank application shell.
- Loading state is exposed with accessible status semantics.
- No new runtime dependency is introduced in this stage.

Stage 05 is not complete until the full Vercel quality gate passes: typecheck, format check, lint and production build.

## Next

Finish Stage 05 verification, then proceed to Stage 06 — Backend/API Foundation.
