# M1 Interactive HTML Mock — v0.2

This is a **trackable, interactive design artifact**, not production product functionality.

## Preview

- File: `public/mockups/m1/index.html`
- In local Next.js: `/mockups/m1/index.html`
- On the PR's Vercel Preview deployment: append `/mockups/m1/index.html` to its preview domain.
- No build tools, AI API keys, authentication, or database are needed for the standalone HTML.

## UX review and changes from v0.1

We evaluated the mock with lightweight usability heuristics: visual hierarchy, recognition over recall, progressive disclosure, minimum user effort, feedback, affordances, responsive behavior and accessibility.

### Previous issues
1. Input form and all five generated results appeared simultaneously, creating split attention and a dense first impression.
2. The experience appeared to support only one workflow even though the product vision is broader.
3. The output area competed visually with the primary user action.
4. Editing and copying had low discoverability.
5. The mock did not demonstrate an extremely quick one-prompt task.

### v0.2 design changes
- **Workflow chooser:** Implement a Feature and Refine My Prompt are functional; Learn a Concept, Professional Reply, Code Review and Explore Ideas are visibly disabled placeholders.
- **Progressive disclosure:** start with one focused input panel; reveal results only after generation.
- **Reduced mental load:** one required field and one optional field for Implement a Feature; one field for Refine My Prompt.
- **Visible navigation:** step markers, Back to edit input, per-prompt View / Edit / Copy, Copy All.
- **Locale controls:** UI language independent from Prompt output language.
- **Mobile:** responsive cards and action wrapping.

## Functional behavior

### Implement a Feature
- Required: feature goal.
- Optional: additional context and constraints. This is temporary input, *not* a Project entity.
- Static deterministic generation of five prompts: Clarify Requirements, Plan Implementation, Implement Feature, Test & Verify, Review Code.
- Individual and all-in-one copy, editing of generated text.

### Refine My Prompt
- Required: user's original prompt or rough notes.
- No AI rewrite. Output is precisely the original input enclosed in a fenced code block, followed by an empty line and this verbatim instruction:

> First, review my full message and any attached files, even if my thoughts are rough, fragmented, or unfiltered. Tell me what you think I'm actually trying to achieve, then propose a plan for me to review. Stop and wait for my approval before starting the task.

- A safe-length backtick fence is chosen so backticks already in the input do not accidentally close the block.
- **Attached files are not uploaded or read by this mock.** The instruction references files only for the destination AI tool, if supplied there.
- The fixed appended English instruction is intentionally unchanged even when Chinese output is selected.

## Open questions for user review
1. Should the workflow chooser be cards or a compact dropdown?
2. Does two-step progressive disclosure feel better than the original side-by-side layout?
3. Should results auto-expand the first prompt, or remain collapsed?
4. Should Refine My Prompt copy only the complete wrapped prompt, or support alternate copy modes?
5. Are the four coming-soon placeholders the right candidate workflows?
6. When returning to input, should generated edits be retained if input has not changed?

## Scope constraints
- This is a review-only mock, kept in the design branch / draft PR.
- No login, project storage, AI API, analytics, external requests, persistence, or production UI implementation.
- Data entered is kept in memory for this page only; refresh clears it.
- The static HTML is served publicly at this route *if merged*. Do not input sensitive code/customer data in preview environments without appropriate access restrictions.
- Prompt templates are **illustrative** and not yet the final approved content for Codex implementation.
