# prompts.yifan.men

An open-source **Guided Prompt Set Builder**: think clearly, build better prompts.

The product will guide people through structured questions, clarify requirements and unresolved decisions, and generate reusable prompt sets for ChatGPT, Claude Code, and Cursor. This repository currently implements only the initialization milestone: a responsive bilingual placeholder homepage and a tested development foundation.

## Stack

Next.js App Router, React, strict TypeScript, Tailwind CSS, Lucide React, Zod, Vitest, ESLint, Prettier, and pnpm. `cn` and `src/components/ui/` are prepared for shadcn/ui components when needed; no component generator or unused UI library is installed.

## Local development

Use Node.js 24 LTS and pnpm 11.19.0 (pinned in `package.json`). Install pnpm via your preferred trusted installation method or Corepack where available.

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Open the development server at port 3000. No environment variables or external services are required; `.env.example` documents this. English is the default; the language switcher stores a non-secret UI preference cookie and refreshes the shared server-rendered page. Prompt output language will be a separate workflow setting.

| Command             | Purpose                                        |
| ------------------- | ---------------------------------------------- |
| `pnpm dev`          | Development server                             |
| `pnpm build`        | Production build                               |
| `pnpm start`        | Serve the production build                     |
| `pnpm lint`         | ESLint                                         |
| `pnpm typecheck`    | Generate route types and run strict TypeScript |
| `pnpm test`         | Unit tests                                     |
| `pnpm test:watch`   | Watch unit tests                               |
| `pnpm format`       | Format source and documentation                |
| `pnpm format:check` | Check formatting                               |

## Structure

```text
src/app/                  Routes, root layout, and global CSS
src/components/{ui,layout}/ Shared UI and layout components
src/features/workflows/   Components, definitions, schemas, and engine (reserved)
src/features/prompts/     Components, templates, and renderer (reserved)
src/lib/utils/            Shared utilities
src/i18n/                 UI locale types and dictionaries
src/types/                Future shared types
docs/{product,architecture,workflows}/
public/                   Static assets
```

Empty feature directories mark boundaries only; workflow execution and prompt generation are not implemented.

## Deploy to Vercel

Import `menyf/prompts-studio`, keep the repository root as the project root, and select the automatically detected Next.js framework. Use Node.js 24 and pnpm; the lockfile and package-manager pin select the package manager. Standard install and build commands work without overrides (`pnpm install --frozen-lockfile`, `pnpm build`). No database, AI API keys, or other credentials are required. Deploy through Vercel; production domains are configured separately by the project owner. The app also runs with `pnpm build && pnpm start` outside Vercel.

## Scope and roadmap

M1 plans workflow selection, guided questions, static suggestions, requirement review, deterministic template-based prompt sets, preview/edit/copy, and English/Simplified Chinese support. See [M1 scope](docs/product/milestone-1.md). Only the homepage and localization foundation are implemented here.

Future options include Supabase, authentication, personalization, prompt history, and AI evaluation. They are not dependencies or commitments of this foundation.

## Contributing

Read [AGENTS.md](AGENTS.md) and [architecture decisions](docs/architecture/decisions.md). Keep changes focused, add tests for domain logic, run the commands above, and submit a pull request. GitHub Actions checks lint, formatting, types, tests, and production build. The project is licensed under the existing [MIT license](LICENSE).
