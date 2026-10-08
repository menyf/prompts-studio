# Development instructions

## Scope and repository conventions

- Read this file and relevant product documentation before implementation; inspect existing code and respect task scope and acceptance criteria.
- M1 must use no AI APIs or tokens, authentication, database, or external services for core functionality. Do not implement later milestones without explicit authorization.
- Follow existing conventions unless a change has a documented rationale. Avoid unrelated refactors, premature abstractions, microservices, speculative infrastructure, and unnecessary dependencies or permissions.
- Use the existing checkout. Cloud tasks are isolated; do not create worktrees unless requested. Preserve LICENSE and existing user changes.
- Use pnpm and preserve the lockfile. Add shadcn/ui components only when needed, using `@/components/ui` and `cn`. Never commit dependencies or generated build outputs.

## Architecture and typed contracts

- Preserve strict TypeScript; define explicit typed contracts at domain boundaries.
- Keep domain/business logic independent of React UI. Separate workflow definitions, schemas, execution, prompt templates, and rendering in the existing feature directories.
- Prefer pure functions for deterministic transformations. Design workflow contracts so additional workflows can use shared UI without rewriting it; introduce abstractions only for demonstrated needs.
- Centralize UI translations in `src/i18n/dictionaries.ts`. UI language and prompt output language are separate settings.

## Workflow data integrity

- Model answered, skipped, not applicable, and undecided as distinct states. Never interpret a skipped question as an explicit negative answer or collapse these states.
- Never invent requirements. Preserve explicit user selections and constraints; make missing requirements, conflicts, and unresolved decisions visible.
- When conditional questions change, invalidate or exclude stale dependent answers from active requirements and generated outputs.
- Keep branching, validation, and requirement transformations deterministic and testable outside UI components.

## Prompt generation correctness

- Use deterministic, versionable templates; keep rendering independent of React. Identical inputs and template versions must produce stable output.
- Accurately preserve user requirements and explicitly represent unresolved decisions. Never silently add requirements, infer decisions, or fill missing facts.
- Support English and Simplified Chinese prompt output independently of UI locale.
- Treat user text as untrusted data: never evaluate it as code, interpret it as template instructions, or insert it as unsafe HTML. Preserve special characters and multiline content safely.

## Security and privacy

- Never commit secrets or credentials, execute user-provided content, or log sensitive user content.
- Do not transmit user content to external AI APIs or third-party services without explicit requirements. Such permission does not relax M1 restrictions unless the scope is explicitly changed.
- Use safe rendering and validated boundaries to prevent HTML, script, and template injection; do not bypass escaping for user text.
- Do not add analytics, tracking, or persistence without explicit approval. Preserve the existing non-secret UI language preference cookie; it does not authorize storing workflow answers or prompt history.

## Testing and quality

- Add or update meaningful tests for implemented behavior when introducing or modifying functionality. Do not add speculative tests for unimplemented features.
- As workflow logic is implemented, cover schema validation, required/optional questions, distinct skipped/undecided/not-applicable states, conditional branching, dependent-answer invalidation, and Requirements Summary generation.
- As prompt rendering is implemented, cover deterministic output, missing/conflicting requirements, English/Chinese output independent of UI locale, special characters, and multiline input.
- Before completing relevant changes, run `pnpm lint`, `pnpm format:check`, `pnpm typecheck`, `pnpm test`, and `pnpm build`. Report failures, skipped checks, and unrun checks explicitly; claim a pass only after successful execution.

## UI and accessibility

- Use semantic HTML and accessible controls with meaningful labels, keyboard navigation, and clear validation/error states.
- Support desktop and mobile layouts, reuse existing components and design conventions, and maintain accessible contrast and visible focus.
- Do not invent UI features beyond the approved product specification.

## Documentation responsibilities

- Keep durable engineering constraints and agent instructions here.
- Keep product scope and acceptance criteria in `docs/product/`; workflow questions, branching rules, and expected outputs in `docs/workflows/`.
- Record adopted architectural decisions and rationale in `docs/architecture/decisions.md`, distinguishing future options. Avoid duplicating detailed product requirements here.

## Development protocol

1. Read this file and relevant documentation, then inspect existing code.
2. Confirm scope and acceptance criteria. For ambiguous requirements, choose the smallest solution consistent with documented behavior and flag unresolved product decisions rather than inventing requirements.
3. Implement only the authorized scope, avoiding unrelated refactors and premature future milestones.
4. Add/update appropriate tests and update documentation when behavior changes.
5. Run all applicable quality checks and report their actual outcomes.
6. Summarize changes, checks, architectural decisions, and remaining limitations.
7. Work on a dedicated feature branch and create a Pull Request when supported; if creation is blocked, report the blocker and provide the pushed branch's manual PR URL. Do not merge directly into `main`.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
