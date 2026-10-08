# M1 Interactive HTML Mock — v0.4

A standalone interactive UX prototype, tracked in GitHub PR #3. This is **not production functionality**.

## Preview

The mock is at `public/mockups/m1/index.html`. On the PR Vercel Preview domain, append `/mockups/m1/index.html`. Preview and interaction validation use Vercel; do not start a local server or run pnpm for this design iteration.

## Design decisions and feedback

### v0.4 — Review and adopted interaction decisions

Priorities from the v0.3 review:

1. **Prevent surprising edit loss.** v0.3 discarded edits on source, output-language, and workflow changes. Keep per-workflow manual edits in memory. Unedited prompts remain live. Mark an edited prompt when its generated source differs, explicitly stating that copying includes the retained edit. Each edited prompt offers **Use latest generated**, which replaces that edit with the current template. Switching UI language or workflows preserves drafts. Deleting source temporarily hides the output; re-entering it restores edits with the appropriate warning. Clear deliberately clears the current workflow's inputs and edits. Reloading clears everything.
2. **Improve reading and navigation.** Remove the duplicated goal/context summary, expand all prompt text without nested preview scrollbars, use 13px readable body text, and add five jump links. On desktop, input stays alongside the output while the page scrolls; a short viewport may scroll the input panel to keep its controls reachable. At 1050px and below, input and output stack. Jump links copy nothing; individual Copy and Copy all copy the exact displayed content, including edits. Copy all adds numbered headings and separators.
3. **Reduce visual load.** Narrow the sidebar, reduce headline and panel padding, and show quieter but readable disabled items. Mobile uses two compact active workflow buttons plus a small Coming soon group containing all four placeholders.
4. **Make copy status visible.** Show inline success/failure in a polite live region and temporary button feedback, with no alert dialogs. Failure asks users to select text manually. Copy controls have prompt-specific accessible names.
5. **Remove misleading configuration.** Refine My Prompt hides the output-language selector and explains that it preserves the original plus the fixed English instruction. The feature workflow's language selection is retained independently from UI language.
6. **Avoid silent input loss.** Remove arbitrary textarea length limits. Example insertion offers Undo example until further source editing. Refine's adaptive fence handles embedded backticks and preserves whitespace-only input too. Original text remains browser textarea text; browsers normalize CRLF to LF.

**Trade-offs to review on Vercel:** retaining a draft means that prompt may contain old requirements or an old output language until explicitly reset; the per-prompt warning makes this visible. Full expansion makes the page longer, especially with long source text; jump links keep all stages reachable without hiding content. Mobile prioritizes input first, with output below rather than simultaneous columns. Editing the Refine output is an explicit override; Use latest generated restores exact wrapping and the required suffix.

### v0.3 — Historical iteration

1. **Workflow navigation moved to a compact left sidebar** instead of space-consuming cards across the top.
2. **Desktop uses three logical zones:** left workflow navigation; middle user input; right generated prompt output.
3. **Real-time generation:** as soon as a nonempty goal or prompt is entered, the right preview updates without a Generate button. Changes to inputs or output language recompute deterministic templates.
4. **Generated prompts are expanded by default** so users can evaluate content without clicking into each item.
5. Each prompt has inline Edit and Copy controls, and the output panel has Copy all.
6. On narrow screens, content stacks; on phones workflow navigation becomes a compact horizontal strip.
7. The UI retains English/Chinese and an independently selected prompt language.
8. Working workflows: Implement a Feature and Refine My Prompt. Disabled placeholders: Learn a Concept, Professional Reply, Code Review and Explore Ideas.

**Superseded in v0.4:** v0.3 reset manually edited prompts on source changes.

### v0.2 — Earlier findings

The original large two-column view displayed all prompts before any input. v0.2 introduced a separate input/result step and a top-of-page workflow gallery. User feedback favored side-by-side live updating and a sidebar instead. v0.3 replaces that interaction.

## Workflow rules

### Implement a Feature

One required Goal and one optional Context field. Five deterministic prompts are generated: Clarify Requirements, Plan Implementation, Implement Feature, Test & Verify, Review Code. No Project entity.

### Refine My Prompt

One input for the original prompt or rough draft. Wrap **the exact original text**, including whitespace, in a Markdown fenced code block. The fence expands beyond any runs of backticks in the input. Append one blank line, then this exact English instruction:

> First, review my full message and any attached files, even if my thoughts are rough, fragmented, or unfiltered. Tell me what you think I'm actually trying to achieve, then propose a plan for me to review. Stop and wait for my approval before starting the task.

The fixed instruction is deliberately not translated. This mock does not support file uploads; "attached files" refers to files subsequently supplied in the destination AI tool.

## Review checklist

- Try both functional workflows.
- Type, edit, and delete input; confirm preview appears, updates and clears accordingly.
- Check every prompt is expanded when generated.
- Edit and copy an individual prompt; copy all prompts.
- Switch UI language and output language separately.
- Test desktop split layout, tablet stacking and narrow mobile sidebar/strip.
- Test Refine My Prompt with embedded triple-backtick blocks.
- Edit a prompt, change source/output language, switch workflows and return; verify edit retention, stale warning, exact copied draft, and explicit reset.
- Verify empty/whitespace-only input, long inputs, backticks, special HTML characters, example undo, and copy failure.
- Check desktop/tablet/mobile layout, jump navigation, keyboard focus and console errors.

## Scope and privacy

No AI requests, account, project storage, analytics, external service, or persistence. The HTML mock runs in memory in the browser. Do not enter sensitive content in a public Preview environment. The file would be publicly available under this route if the PR is merged. Keep PR as Draft pending UX sign-off.

## Validation for v0.4

Inline JavaScript syntax is checked with Node. Browser interaction checks target the Vercel Preview, using the existing installed Playwright tooling without adding project dependencies. Remote Preview interaction checks passed: both workflows, five expanded prompts, live updates, exact Refine wrapping/suffix with embedded backticks, whitespace-only and long input, safe special characters, edited draft retention/reset, independent languages, Copy/Copy all, clipboard failure, example undo, jump links, clear/empty states, and no page errors. Layout checks passed at 1440, 1024, 768, 390 and 320px, with no horizontal overflow. Desktop and mobile screenshots were visually reviewed. The Vercel remote build passed.

The repeatable browser check is `docs/design/m1-preview-check.cjs`. Run it with Node and the Preview mock URL. It expects externally installed `@playwright/test`; set `PLAYWRIGHT_MODULE` to an existing installation if necessary. For a protected deployment, use the Vercel CLI's authorized cookie jar via `VERCEL_COOKIE_JAR`. No credentials or screenshot artifacts are committed. This is design validation tooling, not application code or a new project dependency.

Vercel Preview requires authorized Vercel login because deployment protection is enabled. Automated validation used Vercel CLI authorization without disabling protection. Inline syntax, targeted Prettier formatting, and `git diff --check` passed. Local pnpm lint, format:check, typecheck, test, and build are not run at the user's request; GitHub CI and Vercel provide the remote build/check results when available.
