# FinTest — Technical Roadmap

## Current state

CURRENT STAGE: 03 — Monorepo Foundation

- [x] 01 — GitHub Repository
- [x] 02 — Vercel Project
- [x] 03 — Monorepo Foundation (workspace boundaries established)
- [ ] 04 — TypeScript and Tooling
- [ ] 05 — Frontend Foundation
- [ ] 06 — Backend/API Foundation
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

## Next

Stage 04 — TypeScript and Tooling.

Stage 04 must establish strict checks, formatting, linting and reproducible scripts before backend development begins.
