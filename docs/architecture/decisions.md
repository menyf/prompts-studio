# Architecture decisions

## Adopted

- Next.js App Router in the repository root with `src/`: established routing and direct Vercel deployment without custom infrastructure.
- Strict TypeScript and `@/*` aliases: clear contracts and maintainable imports.
- Feature-oriented domain boundaries: definitions separate from workflow execution, templates separate from rendering, and business logic separate from React. Reserved directories contain no speculative implementation.
- Deterministic pure transformations for M1: no AI costs or service dependencies. Zod is available for future workflow boundary validation, with no premature schemas.
- Centralized typed English/Chinese dictionaries: a lightweight localization foundation. A UI preference cookie lets the shared server page and HTML language agree on first render. The cookie makes the homepage request-rendered; static export is not supported or required. Prompt output language will be independently selected.
- Tailwind and Lucide, with a shared `cn` utility: minimal styling and icon dependencies. Add shadcn/ui source components only when a real reusable control is needed.
- System fonts: no build-time font downloads or external runtime font services.
- Vitest for pure utilities and locale configuration; ESLint, Prettier, type checking, and production build in CI.
- Standard Next.js server deployment: portable beyond Vercel; no platform-only runtime APIs.

## Future options, not adopted

Supabase, authentication, persistent history, personalization, and AI evaluation require later explicit requirements. No persistence abstraction, authentication scaffolding, AI client, or microservice is introduced now. Route-level locale URLs and richer localization tooling can be considered if SEO or translation complexity requires them.
