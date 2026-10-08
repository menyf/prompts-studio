# M1 Interactive HTML Mock — v0.3

A standalone interactive UX prototype, tracked in GitHub PR #3. This is **not production functionality**.

## Preview

The mock is at `public/mockups/m1/index.html`. On the PR Vercel Preview domain, append `/mockups/m1/index.html`. Or run the Next.js dev server and visit the same route.

## Design decisions and feedback

### v0.3 — Based on user feedback

1. **Workflow navigation moved to a compact left sidebar** instead of space-consuming cards across the top.
2. **Desktop uses three logical zones:** left workflow navigation; middle user input; right generated prompt output.
3. **Real-time generation:** as soon as a nonempty goal or prompt is entered, the right preview updates without a Generate button. Changes to inputs or output language recompute deterministic templates.
4. **Generated prompts are expanded by default** so users can evaluate content without clicking into each item.
5. Each prompt has inline Edit and Copy controls, and the output panel has Copy all.
6. On narrow screens, content stacks; on phones workflow navigation becomes a compact horizontal strip.
7. The UI retains English/Chinese and an independently selected prompt language.
8. Working workflows: Implement a Feature and Refine My Prompt. Disabled placeholders: Learn a Concept, Professional Reply, Code Review and Explore Ideas.

**Known tradeoff:** Manually edited prompt content is reset when input or output language changes, to keep the live preview consistent. We should validate whether this is acceptable during user review.

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
- Assess whether losing manual prompt edits on source changes is acceptable.

## Scope and privacy

No AI requests, account, project storage, analytics, external service, or persistence. The HTML mock runs in memory in the browser. Do not enter sensitive content in a public Preview environment. The file would be publicly available under this route if the PR is merged. Keep PR as Draft pending UX sign-off.
