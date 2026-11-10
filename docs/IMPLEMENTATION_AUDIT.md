# BajiPlay audit and implementation plan

Audit date: 2026-11-11
Repository: Mr-xVoidExecutor/bajiplay
Audited branch: main
Working branch: audit/safe-foundation-2026-11-11

## Scope and safety boundary

The requested product direction is a licensed platform while preserving the current design. This document records the code-level baseline and a safe delivery sequence. No real-money wagering, casino launch, deposit/withdrawal processing, payment credentials, odds feed, or game-provider integration should be enabled until the operator supplies verifiable licensing and jurisdiction approvals and qualified counsel confirms the product may be offered to the intended users. A foreign licence must not be assumed to authorize operation in every country.

Until that gate is cleared, work should be limited to a non-monetary demo / informational experience, account UX without financial functionality, content management, accessibility, reliability, and secure infrastructure.

## Verified baseline from main

- Next.js App Router application using React 19 and TypeScript.
- package manager declares pnpm 12.3.4.
- package scripts currently include dev, build, and start only; no lint or test scripts are declared.
- next.config.mjs sets typescript.ignoreBuildErrors to true. This hides TypeScript errors from production builds and must be removed only alongside fixing the errors it reveals.
- app/page.tsx composes the home page from existing header, category navigation, hero slider, winner ticker, sports ticker, game sections, footer, mobile navigation, and support widget.
- app/layout.tsx sets metadata that describes casino and sports betting, and sets the root html lang to en.
- components/auth-modal.tsx prevents form submission and closes the modal; no authentication request is made.
- components/payment-modal.tsx explicitly labels itself a front-end demo and does not process payments or withdrawals. It contains a placeholder merchant number fallback.
- components/site-header.tsx displays a hard-coded balance of ৳12,450.00.
- components/support-widget.tsx appends local canned messages in browser state; no support service is contacted.
- lib/casino-data.ts contains hard-coded game catalog, match scores/odds, recent wins, promotional copy, and payment method labels. These are fixture data, not verified live provider data.
- No README.md was present at the repository root at the time of this audit.
- The repository has main and responsive-mobile-desktop branches; main is not protected according to the repository branch listing.

## Priority findings

### P0 — trust, legal and build integrity
1. Remove the TypeScript build-error bypass after resolving all reported type errors.
2. Remove or clearly label unverified claims and fixture content: live odds, live scores, player counts, winners, RTP, bonuses, provider affiliations, and payment availability.
3. Do not display a plausible user balance before a real authenticated account and authoritative ledger exist.
4. Remove real-money deposit/withdrawal calls to action from any public production deployment until licensing, jurisdiction, age/KYC/AML, payment-provider approval, and legal review are documented.
5. Do not add payment secrets or service-role keys to NEXT_PUBLIC_* variables or client-side code.

### P1 — application foundation
1. Add lint, typecheck, unit-test, and production-build scripts with CI.
2. Add a documented environment-variable contract and keep secrets server-side.
3. Add error boundaries, loading/empty/error states, form validation, accessible labels, keyboard handling, and rate-limited server endpoints.
4. Add a server-side authentication integration only after selecting the deployment region and identity requirements.
5. Add database migrations, row-level security, least-privilege roles, audit events, backup and recovery procedures.
6. Implement support as a ticket workflow; do not imply an agent is online unless that status is real.
7. Add real provider data only under signed agreements and documented API permissions.

### P2 — product quality
1. Preserve the existing visual design while improving mobile layout and navigation.
2. Make search, filters, language selection, and navigation functional.
3. Add localization metadata and correct document language when the selected locale changes.
4. Add privacy, terms, responsible-use, contact, and complaints pages with reviewed content.
5. Add monitoring, dependency review, accessibility checks, and staging deployment.

## Recommended backend decision

Do not connect a production backend or choose a payment processor until jurisdiction, data residency, licensing, and compliance requirements are confirmed. For a non-monetary demo and ordinary account/content features, Supabase (Postgres + Auth + Storage) is a reasonable candidate, subject to region and privacy review. Keep all privileged operations server-side and apply row-level security. Do not treat a database balance field as a financial ledger.

## Delivery gates

- Gate A: jurisdiction and licence evidence reviewed by qualified counsel.
- Gate B: provider contracts, payment acquiring approval, age/KYC/AML and responsible-gaming requirements documented.
- Gate C: architecture, data model, threat model, and privacy assessment approved.
- Gate D: typecheck, lint, tests, production build, security review, and staging acceptance pass.
- Gate E: production launch approved by the operator and relevant legal/compliance reviewers.

## Immediate safe next steps

1. Keep work isolated on this audit branch; do not push directly to main.
2. Add CI and quality scripts, then run them and fix all surfaced issues.
3. Remove fake financial values and clearly identify all sample content as demo data.
4. Disable money movement and wagering UI in production until Gate A and Gate B are met.
5. Collect the operator's intended launch countries, licence issuer/number/verification URL, company operating entity, and provider/payment approvals before designing any regulated flows.
