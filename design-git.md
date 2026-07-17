# Editorial design system

This repository uses a flexible editorial system for presentations, reports, dashboards, and decision tools. The goal is not to make every view look identical. The goal is to make every view feel art-directed by the same house while choosing a visual mode that fits the information.

HN Daily is a useful reference because it changes genre by story—cover, manifesto, dossier, terminal, broadsheet, blueprint—without losing its underlying identity. Borrow that operating model, not its branding or exact compositions.

## The house foundation

These choices remain stable across every mode.

### Palette

| Role | Token | Value | Use |
| --- | --- | --- | --- |
| Paper | `--bg` | `#EEE9DD` | Primary field and document surface |
| Ink | `--fg` | `#201A17` | Headlines, rules, decisive copy |
| Muted ink | `--fg-muted` | `#5D554E` | Explanations and secondary material |
| Faint ink | `--fg-faint` | `#91877F` | Folios, captions, metadata |
| Oxblood | `--primary` | `#9F3E2C` | The single default accent and redline signal |
| Dark field | `#241C19` | Rare inverse surfaces |

Keep one accent per artifact. A semantic mode may tint that accent, but it must not introduce a rainbow of unrelated colors.

### Approved palette packs

Paper, ink, and oxblood remain the default house palette. When the audience or argument needs a materially different world, replace the complete palette for the entire artifact rather than recoloring individual slides.

| Pack | Surface and ink | Accent | Best fit |
| --- | --- | --- | --- |
| Forest and tan | Deep forest or charcoal with warm bone | Sage `#A3B18A` or tan `#C5A880` | Nature-forward places, suburban communities, grounded strategy |
| Trust navy and copper | Navy `#0D2A4A` with warm paper | Copper `#B87333` | Institutional reports, professional-services audiences, owner materials |
| Espresso and aubergine | Warm white `#F7F3ED` with espresso `#3C2A21` | Aubergine `#7A1E3A` | Restrained luxury, decisive finales, premium alternatives to gold-on-black |

Choose one pack per artifact. Do not mix palette worlds slide by slide. Modes may alter composition and emphasis, but they stay inside the chosen pack.

### Token architecture

- Treat raw color values as primitives and expose them to components through the existing semantic roles: `--bg`, `--fg`, `--fg-muted`, `--fg-faint`, and `--primary`.
- Components consume semantic roles rather than introducing one-off hex values.
- Palette packs set the semantic roles at the artifact root. Mode-level overrides may adjust those roles only when the content requires a semantic distinction.
- Repeated spacing, type, rule, radius, and motion decisions should also become tokens or reusable primitives instead of drifting between views.

### Typography

- Display and editorial headlines: Newsreader. Use weight 400–500, tight tracking, and balanced line breaks.
- Interface and explanatory text: Manrope. Keep paragraphs between 45 and 65 characters per line.
- Folios, evidence labels, citations, and figures: IBM Plex Mono with tabular numbers.
- Use italic serif type to change voice or emphasis, never merely as decoration.
- Let one phrase dominate. Supporting text should be visibly quieter.

### Grid and furniture

- Build on a 12-column grid with an 80px reference rhythm at desktop scale.
- Use thin rules, folios, section labels, source notes, and dates as recurring page furniture.
- Keep the principal content inside a 1200–1240px container.
- Prefer asymmetric compositions. A view should have one dominant visual gesture and one clear reading path.
- Use sharp edges and restrained radii. Elevation is reserved for genuine layering or document depth.
- Texture should feel printed: faint grain, hairlines, registration marks, or very low-contrast geometry.

### Motion

- Use restrained reveals: opacity plus short translation, approximately 400ms with a smooth spring-like ease.
- Animate only hierarchy or sequence. Do not animate every label.
- Use progressive builds when disclosure changes the argument.
- Respect `prefers-reduced-motion` and ensure the final state is complete without animation.

## Editorial modes

Choose modes by meaning. A mode is a composition recipe, not a theme.

| Mode | Choose it for | Required ingredients | Avoid |
| --- | --- | --- | --- |
| Executive cover | Opening a deck, memo, or major section | Masthead, oversized title, one italic countervoice, issue metadata | Marketing hero buttons or generic gradients |
| Index | Contents, agendas, portfolios, or option sets | Numbered list, page references, disciplined rules, visible hierarchy | Equal card grids |
| Ledger | Rent schedules, KPIs, comparisons, or reconciliations | Tabular figures, aligned baselines, subtotal emphasis, source note | Dashboard-card chrome around every number |
| Dossier | Risks, discrepancies, legal issues, or due diligence | Case number, stamp or flag, evidence panel, exposure statement | Decorative crime-file clichés or fake distressing |
| Redline alert | One material correction or decision-critical exception | Dark or oxblood field, one giant figure or clause, minimal explanation | Multiple competing metrics |
| Broadsheet | Analysis, narrative findings, or a nuanced argument | Strong headline, column structure, pull quote or sidebar, source line | Long unbroken body copy |
| Manifesto | A principle, recommendation, or decisive point of view | Singular sentence, aggressive whitespace, one proof block | Using it for routine status copy |
| Terminal | Code, automation, technical workflows, or system evidence | Monospace syntax, command/result hierarchy, authentic technical content | Neon terminal styling for ordinary business data |
| Blueprint | Site plans, spatial constraints, construction, or systems | Measured grid, drawing number, labeled geometry, restrained technical tint | Using blue merely because it looks different |
| Contrast | Draft versus agreed terms, before versus after, or two positions | Hard split, common baseline, explicit labels, visible resolution | Symmetric comparison cards with no conclusion |
| Timeline | Transaction paths, dependencies, and milestones | Directional spine, dates, decision gates, terminal outcome | Decorative chronology with no owner or consequence |
| Wire | Secondary findings, appendix items, or rapid briefs | Compact numbered rows, one-line takeaway, source or status | Giving minor items the weight of primary findings |
| Finale | A decision, next move, or close | One imperative sentence, one rationale, proof strip | Generic “thank you” slides |

## Choosing modes

1. State the job of the view in plain language: inform, compare, warn, prove, sequence, or decide.
2. Choose the mode whose semantics match that job.
3. Keep the house foundation unchanged.
4. Add one distinctive gesture from the selected mode.
5. Remove any treatment that does not clarify priority, provenance, or action.

Use no more than three expressive modes in a short deck. Ledger, Index, Timeline, and Wire are neutral support modes and may recur. Dossier, Manifesto, Terminal, Blueprint, and Redline are emphasis modes; use them deliberately.

## Composition rules

- One idea per slide or viewport.
- One dominant headline, generally 9–16 words and no more than three lines.
- One primary accent.
- One evidence source or provenance line when facts matter.
- One clear next action when the view is decision-oriented.
- Numbers align and use tabular figures.
- Empty space is part of the hierarchy; do not fill it reflexively.
- Borrow mechanisms from references, never their names, mastheads, colors, or copy.

## Anti-default discipline

- Prefer a named, inspected reference over adjectives such as “clean,” “modern,” or “premium.” Extract its mechanisms and map each one to a real content need.
- Do not default to purple-blue gradients, electric cyan on dark, gold-on-black, generic glassmorphism, repeated equal-card grids, decorative pills, or an eyebrow label above every section.
- A fashionable treatment is not forbidden merely because it is overexposed, but it needs a content, brand, or audience reason. Familiarity alone is not a reason.
- Use one coherent visual register per artifact. Do not mix editorial, terminal, luxury, and dashboard conventions simply to create variety.

## The craft test

Before shipping, ask whether another deck's content could replace the current content without requiring a meaningful change to the composition. If the answer is yes, the work is still template-driven.

Every principal view needs at least one content-specific art-direction decision: measured geometry, an evidence hierarchy, a purposeful crop, a semantic comparison, a meaningful sequence, or another gesture that could only belong to this material. Craft is not extra ornament; it is visible evidence that the design was fitted to the audience, argument, and action.

## Responsive translation

Do not flatten the design into generic stacked cards on small screens.

- Preserve the folio, typography contrast, rules, and accent.
- Stack split layouts in reading order and turn horizontal timelines vertical.
- Let tables use smaller type before introducing horizontal scrolling.
- Keep the dominant idea visible in the first mobile viewport.
- Verify at 390 × 844 and ensure `scrollWidth <= clientWidth`.
- Use `min-height: 100dvh` where a full-screen composition is intentional.

## Interaction and accessibility

- Every interactive element needs hover, pressed, focus-visible, and disabled states where applicable.
- Navigation must work by keyboard.
- Never depend on color alone to communicate risk or status.
- Maintain readable contrast on tinted and inverse surfaces.
- Keep headings semantic and preserve a logical document outline.
- Provide meaningful alt text for informative imagery.

## What to borrow from HN Daily

- The stable folio and issue furniture.
- The large serif/italic/mono typographic triad.
- Section-specific visual modes chosen by content.
- Dossier panels for evidence-heavy risk.
- Broadsheet sidebars and pull quotes for nuanced analysis.
- A compact contents/index system for navigation.
- Pure-CSS texture and geometry when imagery would be ornamental.
- Mobile layouts that retain the publication identity.

## What not to borrow

- Its masthead, barcode, story copy, or exact compositions.
- Bright cyan, neon green, pink, orange, and blueprint blue in the same artifact.
- Terminal or blueprint styling without semantic justification.
- Constant genre switching in an eleven-slide business deck.
- Magazine-length body copy inside presentation slides.
- Decorative pills, stamps, or tickers that do not carry information.

## Implementation contract

- Work within the existing React and CSS architecture.
- Prefer tokens and reusable layout primitives over one-off inline styles.
- Do not add a new styling framework solely to reproduce a reference component.
- Preserve content, engine behavior, keyboard controls, presenter mode, and mobile behavior.
- Validate TypeScript, tests, production build, desktop views, mobile views, progressive builds, and final animation states before publishing.

Reference inspected: [HN Daily](https://hn-daily.pages.dev/) on July 17, 2026.
