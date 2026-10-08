# M1 interactive HTML mock

This is an **interactive design artifact**, not product functionality. It lives at `public/mockups/m1/index.html` so it can be versioned, reviewed, and iterated alongside the product.

## Open it
- Run the existing Next.js development server and visit `/mockups/m1/index.html`.
- Or open the file directly in a browser. No build tools or external services are needed for this HTML file.
- Once the branch is deployed to Vercel Preview, open `/mockups/m1/index.html` on the preview domain.

## Interaction checklist
1. Describe one feature in the required input.
2. Optionally include constraints or implementation context (free text only; **no project entity**).
3. Click **Generate Prompt Set**.
4. Review the goal summary and five deterministic prompts.
5. Expand **Edit**, modify a prompt, and copy it individually or use **Copy all**.
6. Switch UI language using **EN / 中文** and independently choose the prompt output language.
7. Refresh to verify that inputs are **not stored**.

## Feedback notes
Please record product feedback on the PR as comments. Useful topics:
- Is the amount of typing acceptable?
- Is the generated Prompt Set actually easier to reuse than one long prompt?
- Do the five prompts need a different order or wording?
- Is the editing/copy interaction intuitive?
- Does the mobile experience feel lightweight?

## Scope guardrails
- Only the **Implement a Feature** workflow is represented.
- No AI API calls, login, project storage, analytics, or database.
- Prompt templates here are illustrative and **not** the authoritative production workflow specification.
- No existing app code was changed to create this mock.
- The HTML lives under `public/` and is available as a static asset; **do not place sensitive data in it**.
- Do not merge into production without reviewing the mock's public URL and deciding whether it should remain publicly served.
