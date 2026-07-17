---
name: apply-editorial-art-direction
description: Apply this repository's editorial design system to websites, slide decks, dashboards, reports, and decision tools. Use when creating or redesigning visual interfaces in this workspace, when selecting design elements from a reference site, or when the user asks for a premium, editorial, world-class, magazine-like, dossier, ledger, broadsheet, blueprint, or redline treatment.
---

# Apply editorial art direction

Use the repository's `design-git.md` as the source of truth for its house foundation, semantic design modes, and validation contract.

## Workflow

1. Locate the repository root and read `design-git.md` completely.
2. Inspect the existing artifact, framework, styling system, brand assets, and interaction behavior before proposing changes.
3. Define the job of each view in one verb: inform, compare, warn, prove, sequence, or decide.
4. Choose the smallest set of editorial modes that fits those jobs. State the selection briefly when it involves judgment.
5. Keep the house foundation stable; borrow a reference's mechanism, not its identity.
6. Implement within the existing stack. Prefer tokens and reusable primitives. Do not introduce a styling framework merely to copy a component.
7. Validate the real artifact on desktop and mobile, including final animation states, keyboard paths, progressive builds, and overflow.

## Selection guardrails

- Use one dominant gesture per view.
- Use no more than three expressive modes in a short deck.
- Reserve Dossier, Redline, Manifesto, Terminal, and Blueprint for content that semantically warrants them.
- Keep one accent per artifact unless `design-git.md` explicitly defines a semantic exception.
- Preserve facts, provenance, controls, accessibility, and existing functionality.
- Reject reference elements that are attractive but do not improve hierarchy, comprehension, trust, or action.

## Reference handling

When a user supplies a reference site or image:

1. Inspect the full experience, not only the hero.
2. Record the reusable principles: typography, grid, hierarchy, content density, motion, interaction, and responsive behavior.
3. Map each chosen principle to a concrete content need in the target artifact.
4. Do not copy brand names, copy, proprietary assets, or an entire composition.

## Completion checks

- The chosen modes are evident without fragmenting the house identity.
- Every view has a clear reading order and dominant idea.
- Dense data remains aligned and legible.
- Mobile preserves the editorial character instead of collapsing into generic cards.
- Type checks, tests, and production builds pass when the project provides them.
