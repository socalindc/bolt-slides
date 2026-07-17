# Canonical PDF recipes

These recipes preserve pages Andrew has explicitly approved. They are not generic templates. Each recipe locks the relationship between evidence, editorial hierarchy, and action while leaving the actual sourced content variable.

Last reviewed: July 17, 2026.

## Recipe contract

Every recipe separates three kinds of decisions:

| Decision class | Meaning |
| --- | --- |
| Locked | Canvas, region proportions, palette roles, type roles, furniture, reading order, and source placement remain stable |
| Variable | Verified copy, data, approved imagery, names, and row count inside the documented range may change |
| Conditional | A documented alternate may be used only when the evidence or delivery profile genuinely requires it |

Changing variable content does not create a new design. Changing a locked decision creates a new recipe version and requires a side-by-side proof plus Andrew's approval.

## Shared authored-advisory foundation

Both recipes use the authored-advisory register and the house palette roles:

- Petrona for the principal editorial claim, giant address or identifier, and true-italic countervoice.
- Instrument Sans for explanatory prose, row names, proof copy, and operational labels that need immediate reading.
- JetBrains Mono for section identifiers, evidence tags, time labels, source lines, and compact furniture.
- Warm paper, ink, muted ink, oxblood, and the dark field come from `design-git.md`; do not introduce a one-off palette inside the recipe.
- Hairline rules and compact mono furniture establish continuity. Rounded cards, floating pills, and decorative shadows do not belong in these print recipes.
- Concept imagery is labeled as concept imagery. It never impersonates the actual site or operator.

## `pdf.observed-evidence.v1`

### Job

Show an observed pattern, explain the denominator or comparison limit, and translate the evidence into a primary operating implication plus a deliberately secondary future phase.

### Composition map

```text
┌──────────────────────────────────────────────────────┐
│ Brand / practice                    Section / subject │
├──────────────────────────────────────────────────────┤
│ Large evidence-led headline                          │
│ Explanatory deck / denominator warning               │
├───────────────┬──────────────────────────────────────┤
│ Row identity  │ Labeled evidence plot                │
│ and category  │ with one highlighted interval        │
│               │ and direct point labels              │
├───────────────┴──────────────────────────────────────┤
│ Source and method line                               │
├──────────────────────────────┬───────────────────────┤
│ Primary build-for conclusion │ Secondary phase note  │
├──────────────────────────────┴───────────────────────┤
│ Petrona italic closing interpretation                │
└──────────────────────────────────────────────────────┘
```

### Locked decisions

- Portrait report canvas with a quiet top rail: brand or practice at left, true section identifier at right, one continuous hairline beneath.
- The headline leads. It states the observed pattern rather than naming the chart type.
- A short sans deck directly beneath the headline explains what each mark represents and what must not be compared.
- The evidence field occupies the visual center. The row-identity column remains visually distinct from the plot but shares each row baseline.
- Exactly one interval may receive a pale semantic tint. The tint explains the conclusion; it does not decorate the plot.
- Points, labels, row rules, time ticks, and the highlighted interval use one consistent grammar across every use of the recipe.
- The source and method line sits immediately beneath the evidence field, not in a remote endnote.
- The primary conclusion occupies the larger dark block. The secondary phase occupies the smaller light block. Their unequal area expresses priority.
- A restrained Petrona italic sentence closes the page and interprets the evidence in plain language.
- No photography, map, aerial, or unrelated illustration is inserted into this page. Those belong on another page.

### Variable content

- Four to six observed rows.
- Row names, categories, point positions, point-label copy, highlighted interval, and source.
- Primary conclusion and secondary-phase copy, provided the priority relationship remains the same.

### Overflow and exception rules

- More than six rows moves to a second evidence page or a different approved recipe. Never reduce type until the labels become furniture-sized.
- Long row names wrap within the identity column; they do not compress the plot or collide with the first tick.
- Point labels may move left or right of their point to avoid collision, but stay attached to the same row and use the same component style.
- If the evidence is not temporal, the plot may change form only when the page still preserves thesis → denominator → evidence → source → prioritized action. Record the alternative as a conditional variant before use.
- If the bottom conclusion does not fit, shorten the copy. Do not equalize the two blocks or shrink the primary statement into body type.

## `pdf.recommendation.v1`

### Job

Make one recommendation unmistakable, show the desired operating energy, identify the site or box, state the factual caveat, and give three concise reasons it deserves the first call.

### Composition map

```text
┌──────────────────────────────────────────────────────┐
│ Full-bleed concept image                             │
│ logo / practice      section tab                     │
│ factual-status label                                 │
├──────────────────────────────────────────────────────┤
│ Giant address or identifier                          │
│ Large serif recommendation                           │
│ Concise sans feasibility caveat                      │
│ ──────────────────────────────────────────────────── │
│ Why this is the first call                           │
│ Proof one        │ Proof two        │ Proof three    │
└──────────────────────────────────────────────────────┘
```

### Locked decisions

- The image owns the upper field and the recommendation owns the lower dark field. Their boundary is decisive, not a soft blend.
- The upper image is a believable, high-energy concept direction with crop space for the logo, section tab, and factual-status label.
- The logo remains quiet and legible; the section tab names the recommendation stage rather than acting as decoration.
- `CONCEPT DIRECTION · NOT THE ACTUAL SPACE` or the equivalent factual-status label is visible on the image itself.
- The address or site identifier is the first element in the dark field and uses the accent as a navigational anchor.
- The recommendation is one Petrona statement, shaped manually into two to four lines. It is a command or decision, not a category heading.
- The sans caveat states the real condition—hood, utilities, capacity, seating, plan, availability, or another verified constraint—without weakening the recommendation into vagueness.
- Three proof columns follow one hairline. Each has a short title and one compact sourced reason. The column widths and divider grammar remain stable.
- No additional card grid, secondary hero, or decorative callout is added below the proof row.

### Variable content

- Approved concept image and crop.
- Address or site identifier.
- Recommendation, feasibility caveat, and three proof points.
- Section number and title, provided they reflect the document's true sequence.

### Overflow and exception rules

- A recommendation longer than four display lines must be edited, not shrunk into body type.
- A fourth proof point goes on a supporting evidence page. Do not turn the proof row into four cramped columns.
- If an approved image cannot preserve the overlay safe areas, recrop or select another image. Do not move the factual-status label into an unreadable corner.
- The concept image may be replaced with verified site photography when the job changes from aspiration to existing-condition proof. That is a conditional variant and must be labeled accordingly.

## Deterministic PDF rendering

Composition locks prevent redesign drift; the following checks prevent renderer drift:

1. Use the same declared page size, print CSS, renderer family, and pinned browser or PDF engine for every revision in a series.
2. Load approved local static font cuts for print. Do not depend on a late network font request or an untested variable font export.
3. Wait for `document.fonts.ready`, image decoding, and paged-media completion before printing.
4. Render every final PDF page to PNG and compare the canonical recipe pages with their approved clean proof images.
5. Inspect font names, page size, page count, clipping, line breaks, image crop, chart-label collisions, and source placement in the exported file.
6. Viewer chrome, refresh banners, assistant mascots, cursors, and browser extensions are not part of the design and must never appear in a clean proof image.

## Promotion and regression gate

- A recipe becomes canonical only after Andrew approves a clean rendered page, not a source file alone.
- Store the clean approved PNG beside the recipe when available. The screenshots reviewed on July 17, 2026 contained viewer overlays and therefore establish preference and composition, but are not yet pixel-comparison masters.
- The saved Sudley Manor v12–v14 PDFs demonstrate composition drift across revisions. They are evidence for the need for recipes, not interchangeable gold masters.
- The embedded-font audit confirms a real register change rather than a fallback accident: v12 and v13 use Playfair Display, DM Sans, and DM Mono; v14 uses Newsreader, Manrope, and IBM Plex Mono. A version series must declare one register and may not swap it silently between exports.
- Exact margins, point sizes, and region ratios should be measured from the next clean approved export rather than guessed from a screenshot.
- Any proposed recipe change gets a new version ID, a before/after proof sheet, and a short reason. Content updates inside the locked frame retain the existing version.
