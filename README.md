# BajiPlay

BajiPlay is a Next.js App Router / React / TypeScript web application.

## Development

The repository uses pnpm (see the `packageManager` field in `package.json`).

```bash
pnpm install --frozen-lockfile
pnpm dev
```

## Validation

```bash
pnpm typecheck
pnpm build
```

GitHub Actions runs TypeScript validation and a production build for pull requests targeting `main` and pushes to `main` or audit branches.

## Product and compliance status

The current repository contains frontend demo fixtures for games, sports data, promotions, winner activity, and payment UI. These are not verified live feeds or financial services. Authentication, wallet balances, deposits, withdrawals, betting, and game launches must not be represented as operational until the required backend, provider contracts, security controls, and legal approvals are implemented and verified.

Do not deploy real-money wagering or payment functionality based only on a foreign licence or a demo interface. Confirm the operator's target jurisdictions and obtain qualified legal/compliance review before implementing regulated flows.

See [the audit and implementation plan](docs/IMPLEMENTATION_AUDIT.md).
