# Development instructions

- Follow the feature-oriented structure and existing conventions; use the existing checkout. Cloud tasks are isolated: do not create worktrees unless requested.
- Preserve strict TypeScript. Prefer explicit types at domain boundaries.
- Keep business logic independent of React. Workflow definitions, schemas, and execution belong in their separate directories; prompt templates and rendering also remain separate.
- Use pure functions for deterministic transformations and test workflow and prompt rendering logic when introduced.
- M1 must not use AI APIs, authentication, or databases. Add these only with explicit requirements; do not implement later milestones prematurely.
- UI translations belong in `src/i18n/dictionaries.ts`. UI locale and future prompt output locale are independent concepts.
- Use pnpm and preserve the lockfile. Add shadcn/ui components when actually needed, using `@/components/ui` and `cn`.
- Run `pnpm lint`, `pnpm format:check`, `pnpm typecheck`, `pnpm test`, and `pnpm build` before completing relevant changes.
- Preserve LICENSE and existing user changes. Never commit credentials, generated build outputs, or dependencies.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
