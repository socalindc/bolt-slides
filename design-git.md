# Editorial design system

This repository uses a flexible editorial system for presentations, reports, dashboards, and decision tools. The goal is not to make every view look identical. The goal is to make every view feel art-directed by the same house while choosing a visual mode that fits the information.

HN Daily is a useful reference because it changes genre by story—cover, manifesto, dossier, terminal, broadsheet, blueprint—without losing its underlying identity. Borrow that operating model, not its branding or exact compositions.

## Direction preflight

Do this before choosing tokens or building components. The intent is to ground the work in its actual subject rather than manufacture distinction with decorative effects.

1. **Name the subject, audience, and single job.** Write one concrete sentence for each. “Premium real-estate deck” is not a subject or a job; “persuade this owner to pursue a Peruvian chicken operator for the former buffet box” is.
2. **Inventory the subject world.** List the materials, forms, places, behaviors, evidence types, language, and visual vernacular that genuinely belong to the subject. Separate factual cues from atmospheric ones.
3. **Draft the direction before the screen.** Choose the contextual font register, compact palette, image language, and one-sentence layout idea. Add a quick ASCII wireframe when hierarchy or interaction is not obvious.
4. **Choose one subject-derived signature.** It may be a crop, measured diagram, numeral treatment, evidence device, material texture, or interaction. Take one justifiable aesthetic risk and keep the rest of the system disciplined.
5. **Run an anti-template critique.** Ask what could only belong to this subject, what would survive if the trendy effects were removed, and whether the same composition could accept unrelated content unchanged. Revise the direction before implementation if the answers are weak.

For a new artifact, compare the established house direction with one credible subject-derived alternative before defaulting. Warm paper, a high-contrast serif, and rust or oxblood can be excellent—and are proven in several artifacts here—but the combination has also become a common generic “editorial AI” shortcut. Preserve it for continuity or when the subject earns it; do not apply it automatically.

On web, the hero should embody the page's thesis through the subject's most characteristic element. Do not default to a giant statistic, oversized product screenshot, or centered marketing headline when another form would explain the idea more honestly.

### Reference provenance and confidence

For every external design reference, record the URL or artifact, date inspected, pages and states examined, and the exact mechanism being considered. Mark each conclusion as `observed`, `inferred`, or `proposed`, then list proprietary assets, missing states, and known gaps. A third-party design analysis is a lead, not source truth. Never promote an inferred token, substitute font, brand-specific device, or generated extension into the house system until it passes a local specimen, screenshot review, and Andrew's approval.

### Artifact capsule

Before implementation, save a one-screen handoff that declares the output profile and target canvases, selected typography register and palette pack, editorial modes, subject-derived signature, sequence and tonal rhythm, image factual status and crop plan, desktop-to-mobile transformations, forbidden treatments, and unresolved assumptions. Reference canonical tokens instead of duplicating their values inside the brief.

### Sequence rhythm

Storyboard the complete artifact at thumbnail scale before polishing individual views. Mark every slide, page, or major web band by dominant mode, tonal value, density, and image weight. Repetition is intentional only when it reinforces a real sequence; otherwise vary composition and intensity while preserving the selected register and palette.

## The house foundation

These choices remain stable across every mode.

### Output profile

Declare the intended medium before choosing a grid, type scale, or composition. Record the canvas, safe area, viewing conditions, and final deliverables at the top of the design brief.

| Profile | Starting point | Production priorities |
| --- | --- | --- |
| Screen presentation | 16:9 canvas with a 5–7% safe area | Distance legibility, deliberate builds, strong thumbnail rhythm, clean PDF/PPTX export |
| Portrait report | US Letter or A4 with 0.55–0.8in working margins | Page turns, source placement, print crop safety, landscape pages for genuinely wide exhibits |
| Responsive web | 1440px reference view, 1200–1240px principal container | Fluid type and spacing, desktop-to-mobile hierarchy, final animation state |
| Dashboard or decision tool | Viewport and data density defined by the actual task | Scannability, stable controls, meaningful comparison, fast state changes |

Do not design once and mechanically resize. Preserve the argument and house identity while recomposing for each medium.

### Palette

| Role | Token | Value | Use |
| --- | --- | --- | --- |
| Paper | `--bg` | `#EEE9DD` | Primary field and document surface |
| Ink | `--fg` | `#201A17` | Headlines, rules, decisive copy |
| Muted ink | `--fg-muted` | `#5D554E` | Explanations and secondary material |
| Faint ink | `--fg-faint` | `#91877F` | Folios, captions, metadata |
| Oxblood | `--primary` | `#9F3E2C` | The single default accent and redline signal |
| Dark field | `#241C19` | Rare inverse surfaces |

Keep one expressive accent per artifact. Functional colors may encode positive, negative, warning, comparison, or reference states, but they must earn their presence through meaning rather than decorate adjacent cards.

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
- Add `--positive`, `--negative`, `--warning`, and `--reference` only when the artifact contains those states. Derive them from the selected palette pack so they feel native to the same color world.
- Components consume semantic roles rather than introducing one-off hex values.
- Palette packs set the semantic roles at the artifact root. Mode-level overrides may adjust those roles only when the content requires a semantic distinction.
- Repeated spacing, type, rule, radius, and motion decisions should also become tokens or reusable primitives instead of drifting between views.

### Typography

Typography has contextual defaults and approval tiers. Do not confuse an interesting typeface with a proven choice, and do not erase a successful artifact-specific voice in pursuit of false consistency.

1. **Proven registers:** Use the approved register that matches the artifact. The repository has three current contextual controls built from two font stacks, and Andrew's vault contributes three additional benchmark registers that have already succeeded in real work. Proven does not mean universal.
2. **Artifact continuity:** An existing artifact that already has a proven register keeps it unless Andrew asks for a change or the register demonstrably fails the content, language, or delivery format. `design-git.md` is not permission to restyle successful work automatically.
3. **Separate approvals:** Andrew may approve a composition, chart grammar, image direction, palette, numeral treatment, or typeface independently. Approval of one is never silent approval of the others. Record the approved mechanisms explicitly.
4. **Certified alternates:** A maximum of three additional complete registers may live here. This tier is currently empty. A register enters it only after Andrew approves a real-content specimen and it passes web, mobile, PDF, and PPTX delivery checks.
5. **Audition bench:** Promising open-source families documented in [`design/typography/library.md`](design/typography/library.md). These are candidates, not automatic design permissions.
6. **Specialist shelf:** Condensed, poster, blackletter-adjacent, high-contrast, or otherwise expressive faces approved for one named job such as a cover, giant numeral, map label, section break, or finale. A specialist does not silently spread through the artifact.
7. **Rejected archive:** Failed real-content tests stay recorded so later agents do not keep proposing the same mismatch as a fresh idea.

| Proven register | Display voice | Supporting voice | Data and furniture | Use |
| --- | --- | --- | --- | --- |
| Authored advisory — dramatic | Petrona | Instrument Sans | JetBrains Mono | Persuasive reports, cinematic recommendation pages, hero numerals, hospitality, PDF, and PPTX work |
| Authored advisory — restrained | Newsreader | Manrope | IBM Plex Mono | Sentence-led recommendations, quiet evidence pages, mixed upright/italic phrasing, and analytical report modes |
| Stick interactive | Newsreader | Manrope | IBM Plex Mono | Stick Deck, interactive slide systems, web-based editorial storytelling, and presentation chrome |
| Vault print editorial | Playfair Display | DM Sans | DM Mono | Continuing the confirmed cream/rust/ink print benchmark or explicitly requesting that established voice |
| Bécane editorial terminal | Instrument Serif | Space Grotesk | JetBrains Mono | Light market-intelligence microsites, data-journalism reports, and continuous interactive arguments |
| Editorial magazine | Fraunces | Inter | `ui-monospace` system stack | Story-forward issues, digests, and heterogeneous editorial spreads |

- Use one display family, one supporting family, and one mono family at most.
- A deliberately scoped specialist may replace the display face for one named moment after approval; it does not create a second deck-wide register.
- Choose and declare the register before composing. Petrona and Newsreader are alternative authored-advisory modes; do not mix them inside one artifact merely because both are approved.
- The July 17 Sudley Manor screenshots approve the evidence layout, chart grammar, photographic direction, dark field, cream copy, blush accent, and oversized-number behavior. Their headline faces are acceptable references, not locked favorites. Reusing those compositions requires a separate headline-font decision.
- Treat italics as a change of voice: qualifier, counterpoint, or editorial aside. Never add them merely to make a page look designed.
- Let one phrase dominate. Supporting text should be visibly quieter.
- Set major line breaks manually. A headline is not finished until its shape, rhythm, and final exported wrap have been inspected.
- Keep explanatory paragraphs within an intentional measure. As a starting point, use 45–65 characters per line on screen and up to roughly 75 in report prose.
- Use the supporting sans for charts, tables, map labels, annotations, and dense explanatory copy. Display faces do not belong in small operational text.
- A register is not implementation-ready until the active output profile defines role-level values for `hero`, `section title`, `body`, `caption/source`, and `mono/data`: family, size, weight, line height, tracking, relevant font features or variation settings, and fallback. Do not reuse a web type scale unchanged in PDF or PPTX.

#### Petrona register

- Use Petrona for authored advisory work where warmth, authority, numerals, and a genuine editorial countervoice matter.
- Begin principal headlines around weight 450–600, with compact line height, restrained negative tracking, and manually shaped breaks. Petrona exposes a weight axis, not optical size; tune size, weight, tracking, and leading manually and inspect the final export.
- Use the true italic for complete qualifiers, counterpoints, or editorial asides. Keep it quieter than the principal claim.
- Large addresses and singular hero figures may use Petrona when they act as editorial statements. Aligned tables, repeated metrics, source furniture, and calculations belong in Instrument Sans or JetBrains Mono.
- Petrona's success in a giant `7821` or other display figure does not require Petrona to carry the surrounding sentence headline. Approve numeral behavior and headline voice separately.
- Use Instrument Sans for explanatory prose, charts, maps, tables, and annotations. Use JetBrains Mono for evidence labels, citations, calculations, and compact metadata.
- Avoid thin Petrona weights on photography, low-contrast fields, projected slides, or small type. Never synthesize bold or italic styles.

#### Newsreader advisory register

- The Sudley Manor v14 dark recommendation panel proves Newsreader Medium, Newsreader Italic, Manrope, and IBM Plex Mono as a restrained authored-advisory register. It is not limited to Stick Deck.
- Use Newsreader for sentence-led editorial claims, elegant mixed upright/italic phrasing, and large identifiers that need authority without the more dramatic Petrona voice. The `Chase 7821, the former Grato box.` treatment is an approved reference.
- Use the true italic as a colored counterphrase when it changes voice or emphasis. The blush treatment is approved; the italic should remain structurally connected to the upright sentence rather than becoming decoration.
- Use Manrope for explanatory prose and IBM Plex Mono for kickers, availability labels, source furniture, and compact technical facts.
- The same families may serve Stick interactive work, but advisory and interactive artifacts require separate output-profile values for size, measure, leading, spacing, and furniture. Sharing a stack does not mean sharing a typescale.

#### Stick interactive register

- Preserve Newsreader, Manrope, and IBM Plex Mono in Stick Deck unless Andrew explicitly requests another voice. This combination is an approved design choice, not a temporary fallback.
- Use Newsreader for editorial headlines, narrative turns, large slide statements, and selective italic voice. Let its optical sizing and moderate contrast carry the authored character.
- On web, enable optical sizing when the loaded Newsreader variable file exposes `opsz`. For PDF or PPTX, use a tested static Display or Text cut rather than assuming the export preserves variable-axis behavior.
- Use Manrope for controls, explanatory copy, navigation, labels, and responsive UI. Its neutrality is what lets Newsreader remain distinctive without making the interface feel literary everywhere.
- Use IBM Plex Mono for slide numbers, evidence labels, keyboard hints, presenter chrome, citations, and compact system language.
- Keep the existing token contract: `--font-head`, `--font-body`, and `--font-mono`. A new theme may change palette and composition without replacing the proven font register.
- Do not “upgrade” Stick Deck to Petrona simply because Petrona wins in a client-report context. The two registers solve different jobs.

#### Vault benchmark registers

- The vault is a read-only source of preference evidence. Ordinary repo work must not edit the vault or require it at runtime; the usable rules are recorded here.
- **Vault print editorial:** Playfair Display Bold or Black carries the main headline, a real Playfair italic supplies one rust-colored qualifier, DM Sans carries prose and tables, and DM Mono carries letterspaced kickers, column labels, and footers. This remains valid for the established cream/rust/ink benchmark. Start new authored-advisory work with Petrona, but never restyle a successful Playfair artifact merely because Petrona is newer.
- **Bécane editorial terminal:** Instrument Serif carries display headlines, large figures, and the restrained italic voice; Space Grotesk carries body and UI; JetBrains Mono carries labels, tables, and every data figure. Keep it for light, continuous, data-forward interactive work. Do not substitute the print or Stick stack inside it.
- **Editorial magazine:** Fraunces carries display work at heavy weights, with its true italic and `WONK` axis reserved for a single countervoice; Inter carries body and UI; `ui-monospace` carries terminal and data furniture. This is a proven story-forward register, not a new default for reports or dashboards.
- **Cinematic war-room specialist:** Oswald or Bebas Neue may carry poster-scale condensed headlines, while Space Grotesk or IBM Plex Mono carries tactical labels. The benchmark was matched from rasterized work rather than extracted fonts, so audition Oswald and Bebas against the actual headline before choosing one. Do not use this register for routine body copy or quiet institutional reports.

#### Type audition

Never approve a type register from an alphabet specimen alone. Compare it directly with the relevant proven control using the same size, width, color, and line breaks: Petrona for dramatic authored advisory work, Newsreader for restrained advisory or Stick-like interactive work, or the named vault benchmark when continuing one of those established systems. Test the real property or product name, longest headline, address or identifier, lowercase `a` and `g`, italic sentence, uppercase furniture, dense paragraph, table row, source note, and representative figures such as `7821`, `$93,903.60`, `7.25%`, `3,210 RSF → 3,061 RSF`, and `47.6% HISPANIC / LATINO`. Inspect tabular alignment rather than assuming it from the family name.

Only open an audition when the proven register cannot express the requested voice or fails a real requirement. The first audition is a neutral font atlas. Only finalists advance to a real cover, evidence page, finale, and 390 × 844 mobile specimen. Promotion requires visual approval plus successful export checks; novelty, popularity, a Google Fonts listing, or an attractive alphabet sheet is not enough.

#### Rejected and restricted directions

| Family or direction | Status | Evidence |
| --- | --- | --- |
| Gloock | Rejected as a house or Sudley display face | The July 17, 2026 Sudley test felt fussier and more fashion-editorial than Petrona. Do not propose it again without a materially different brief. |
| Besley and heavy Americana slabs | Rejected as a house default | The period mercantile voice is too literal and heavy for the preferred warm editorial register. |
| Playfair Display | Proven only in the vault print register | The cream/rust/ink benchmark is confirmed successful. Preserve it there, but do not treat familiarity as a reason to choose it for new authored-advisory work. |
| Bodoni Moda and similar Didones | Low-priority specialist only | Shares the high-contrast fashion signal that failed in the Gloock test. |
| Instrument Serif | Proven in the Bécane register; audition elsewhere | Its restraint is an asset inside the light editorial terminal, not a universal answer. |
| Fraunces | Proven in the editorial-magazine register; specialist elsewhere | Use its heavy and wonk-italic behavior as part of that system rather than scattering it through unrelated work. |
| Grenze, Eczar, Young Serif, Big Shoulders, and Anybody | Specialist shelf | May own one expressive moment after a real-content test; never assume content category alone approves them. |
| Bricolage Grotesque | Web and contemporary-strategy audition only | Useful when a product-like voice is intentional, not as an automatic editorial upgrade. |

#### Font delivery

- Use fonts with verified open redistribution rights. Record the exact license and official upstream source; catalog presence is a discovery signal, not the license record.
- Default to SIL Open Font License 1.1 or Apache 2.0 families. A nonstandard license requires an explicit review before the font can leave the audition bench.
- Keep each font's original copyright and license file beside committed binaries. Record the upstream version or commit and a checksum in `design/typography/manifest.json`.
- Prefer static TTF cuts for PowerPoint and PDF production. Use WOFF2 or a tested variable font for web delivery.
- Verify the actual exported PDF contains the intended fonts. Do not infer success from the source file.
- Embed fonts in PPTX when the font and authoring tool permit it. Otherwise supply a font manifest and test the fallback before delivery.
- Never synthesize a missing bold or italic. If the family lacks the needed style, choose another family or change the composition.
- Self-host production web fonts and verify the computed browser family, offline fallback, and a clean-machine export.
- Do not commit proprietary freeware font binaries to the public repository. A visually strong font with distribution restrictions is an experiment, not a house dependency.
- Do not commit every audition font. The repository stores catalog records and specimens; `public/fonts/` is reserved for production-approved binaries and their licenses.

### Grid and furniture

- Use a 12-column grid for wide presentations and web views, and a 6-column grid for portrait reports and narrow layouts. Scale the rhythm to the output profile rather than hard-coding desktop pixels everywhere.
- Use thin rules, folios, section labels, source notes, and dates as recurring page furniture.
- Keep responsive-web content inside a 1200–1240px principal container at the 1440px reference width. Presentation and report safe areas come from their output profiles.
- Prefer asymmetric compositions. A view should have one dominant visual gesture and one clear reading path.
- Use sharp edges and restrained radii. Elevation is reserved for genuine layering or document depth.
- Texture should feel printed: faint grain, hairlines, registration marks, or very low-contrast geometry.
- Structural furniture must encode real hierarchy, order, status, or provenance. Use `01 / 02 / 03` only for a genuine sequence or index; decorative numbering creates a false information model.

### Depth budget

Declare no more than three depth levels per artifact: field, contained surface, and temporary overlay. Choose one primary depth mechanism—surface contrast, rule, photographic depth, or shadow—and do not stack mechanisms without a real layering reason. Shadows communicate physical or interaction state; they are not decoration.

### Motion

- Use restrained reveals: opacity plus short translation, approximately 400ms with a smooth spring-like ease.
- Animate only hierarchy or sequence. Do not animate every label.
- Use progressive builds when disclosure changes the argument.
- Ensure the final state is complete without animation so exports, screenshots, and direct navigation never omit content.

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

## Canonical PDF recipes

Modes describe meaning; recipes lock a successful arrangement. When a new PDF page has the same job as an approved recipe, reuse the recipe instead of recomposing it from scratch.

| Recipe ID | Page job | Locked character |
| --- | --- | --- |
| `pdf.observed-evidence.v1` | Turn sourced behavior or timing evidence into a clear operating implication | Warm-paper thesis, labeled evidence field, one highlighted interval, direct source line, dark primary conclusion block, lighter secondary-phase block, italic close |
| `pdf.recommendation.v1` | Make one site or operator recommendation and prove why it is the first call | Full-bleed concept image with factual-status label, dark recommendation field, giant address or identifier, serif verdict, concise caveat, three proof columns |

The complete composition, overflow, and rendering contracts live in [`design/pdf-recipes.md`](design/pdf-recipes.md). Canvas, region proportions, typography roles, palette roles, furniture, and evidence-to-action order are locked. Copy, sourced data, approved concept imagery, and row count within the documented range are variable. A material composition change creates a new recipe version and requires approval; it must not silently replace the accepted recipe.

## Composition rules

- Give every slide, page, or viewport one primary analytical or decision job. It may contain several facts, but they must all support the same conclusion.
- Use one primary editorial mode and at most one supporting pattern. If a view needs three unrelated modes to work, split it.
- One dominant headline, generally 9–16 words and no more than three lines.
- One primary accent.
- One evidence source or provenance line when facts matter.
- One clear next action when the view is decision-oriented.
- Numbers align and use tabular figures.
- Empty space is part of the hierarchy; do not fill it reflexively.
- Borrow mechanisms from references, never their names, mastheads, colors, or copy.

## Evidence and data integrity

- Place the unit, period, geography, denominator, and source close enough to the evidence that the meaning survives extraction or screenshotting.
- Compare values visually only when they are genuinely comparable. Related small multiples use the same scale unless the difference is explicitly explained.
- Label tenant-specific, within-category, indexed, estimated, and modeled values so they cannot be mistaken for absolute market demand.
- Never let decorative area, bar length, icon count, or type size imply a quantitative relationship that the data does not support.
- Keep methodology concise but visible. A beautiful chart with an unclear denominator is unfinished.
- When a number drives the recommendation, show the reasoning bridge between the evidence and the decision rather than repeating the number as decoration.

## Anti-default discipline

- Prefer a named, inspected reference over adjectives such as “clean,” “modern,” or “premium.” Extract its mechanisms and map each one to a real content need.
- Do not default to purple-blue gradients, electric cyan on dark, gold-on-black, generic glassmorphism, repeated equal-card grids, decorative pills, or an eyebrow label above every section.
- A fashionable treatment is not forbidden merely because it is overexposed, but it needs a content, brand, or audience reason. Familiarity alone is not a reason.
- Use one coherent visual register per artifact. Do not mix editorial, terminal, luxury, and dashboard conventions simply to create variety.
- Never turn one attractive device—dark finales, double-bezel cards, giant radii, grain, stamps, condensed type, or scroll reveals—into a mandatory house signature.

## The craft test

Before shipping, ask whether another deck's content could replace the current content without requiring a meaningful change to the composition. If the answer is yes, the work is still template-driven.

Every principal view needs at least one content-specific art-direction decision: measured geometry, an evidence hierarchy, a purposeful crop, a semantic comparison, a meaningful sequence, or another gesture that could only belong to this material. Craft is not extra ornament; it is visible evidence that the design was fitted to the audience, argument, and action.

Make one memorable decision that is specific enough to defend in a sentence. Distinction should come from that decision and the subject—not from stacking several conspicuous effects.

Equal three-column layouts are permitted only when the content is truly equal. When one option, risk, tenant, or recommendation matters more, the composition must make that hierarchy visible.

## Image direction and truth

- Every image has a job: proof, context, detail, atmosphere, or spatial explanation. If its job cannot be named, remove it.
- Prefer genuine site, product, operator, people, and evidence imagery when the subject is factual.
- Clearly distinguish actual photography, reference imagery, concepts, and renderings. Generated imagery may establish mood or explain an idea; it must not impersonate evidence.
- Specify crop intent—context, facade detail, circulation, food texture, operator energy, or another real purpose—instead of requesting a generically attractive image.
- Reuse an image only as a deliberate callback or with a materially different crop and narrative function.
- Real-property concepts begin with reference decomposition: materials, facade color, canopy, signage band, paving, landscaping, massing, and surrounding context.

### Structured image briefs

Write generated-image prompts as saved structured briefs rather than adjective strings. A brief should declare factual status, local context, visual job, subject, spatial or material logic, camera, lighting, composition, realism target, crop safety, and explicit exclusions. Location is not a decorative keyword: translate it into plausible building type, audience, price position, landscape, weather, and human behavior.

```json
{
  "task": "Describe the single image and the artifact it serves.",
  "factual_status": "Concept direction only; not the actual site, product, or operator.",
  "context": {
    "location": "City, state, country",
    "audience": "Who will judge the image",
    "occasion": "The behavior or decision it should make visible"
  },
  "subject": {
    "hero": "Primary subject",
    "support": ["Only details that strengthen the job"]
  },
  "camera": {
    "format": "Plausible camera format",
    "lens": "Lens and viewpoint",
    "aperture": "Depth-of-field intent",
    "frame": "Aspect ratio"
  },
  "lighting": {
    "time": "Time of day",
    "sources": "Motivated light sources",
    "exposure": "Highlight and shadow behavior",
    "color": "Color-temperature guardrail"
  },
  "composition": {
    "hero_position": "Where the subject sits",
    "negative_space": "Where copy or evidence must remain legible",
    "crop_safety": "What must survive alternate crops"
  },
  "realism": {
    "target": "The photographic or rendering standard",
    "details": "Physical irregularities and technical details that must be credible",
    "post_processing": "Permitted grade and texture"
  },
  "forbid": [
    "text",
    "logos",
    "watermarks",
    "invented evidence",
    "CGI sheen",
    "impossible geometry",
    "AI artifacts"
  ]
}
```

Save the final brief beside every approved generated asset. Photorealism must come from believable optics, motivated light, correct material behavior, human-scale imperfection, and physically coherent detail—not from merely asking for “ultra realistic.”

## Responsive translation

Do not flatten the design into generic stacked cards on small screens.

- Preserve the folio, typography contrast, rules, and accent.
- Stack split layouts in reading order and turn horizontal timelines vertical.
- Let tables use smaller type before introducing horizontal scrolling.
- Keep the dominant idea visible in the first mobile viewport.
- Verify responsive work at 1440px, 1024px, and 390 × 844, and ensure `scrollWidth <= clientWidth`.
- Use `min-height: 100dvh` where a full-screen composition is intentional.
- For every nontrivial wide element, declare one narrow-screen action: `retain`, `reflow`, `simplify`, `crop`, `scroll`, or `replace`. Preserve the evidence and action, not the desktop geometry. A multi-panel composite, map, or dense diagram may become one focused panel instead of an unreadable miniature.

## Interaction quality

- Interactive elements have intentional hover, pressed, selected, and disabled treatments where applicable.
- Motion communicates hierarchy, sequence, causality, or state. It does not decorate every label.
- Controls remain visually consistent across desktop and mobile translations.
- Preserve existing presenter, navigation, annotation, and mobile behavior while redesigning the visual layer.

### Interface writing

- Begin controls with active verbs and use nouns the user already recognizes from the task.
- Keep one action name consistent across navigation, buttons, tooltips, confirmations, and documentation.
- Use sentence case unless a compact data label or established visual register calls for uppercase furniture.
- State errors directly, preserve the user's work, and name the next recoverable action.
- Make empty states useful: explain why the area is empty and offer the relevant first action instead of decorative reassurance.

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
- Maintain a three-tier token path: primitive values → semantic roles → component or recipe tokens. Named variants cover default, hover, focus, active or pressed, selected, disabled, loading, and error states when those states exist.
- Do not add a new styling framework solely to reproduce a reference component.
- Preserve content, engine behavior, keyboard controls, presenter mode, and mobile behavior.
- Validate TypeScript, tests, production build, output-profile views, progressive builds, and final animation states before publishing.

`design-git.md` remains the human creative source of truth. If machine-readable interoperability becomes useful, generate a linted companion from the real CSS tokens and typography manifest rather than hand-maintaining duplicate YAML. Google's DESIGN.md format is currently alpha; pin the tool version, validate broken references and structural drift, and do not treat third-party brand extractions as implementation authority.

## Final creative QA

Inspect real screenshots at target desktop and mobile sizes during implementation, not only after the layout is “finished.” Run all four passes again on the exported artifact, not only the source:

1. **Thumbnail pass:** pacing, tonal rhythm, repetition, and whether one view unexpectedly dominates or disappears.
2. **Reading pass:** headline sequence, argument, unnecessary repetition, and whether every view advances the decision.
3. **Evidence pass:** figures, labels, units, denominators, dates, geography, sources, and visual comparability.
4. **Export pass:** font identity, line breaks, clipping, crop quality, image resolution, animation end states, PDF rendering, and PPTX portability.

When a register, palette pack, component family, or PDF recipe is promoted, update a rendered proof sheet showing color roles, type roles, spacing and radii, depth levels, interactive states where relevant, one evidence or table specimen, one image treatment, and its target-size translations. Markdown alone is not proof.

The artifact is finished only when the final files look intentional on a machine or browser that did not create them.

Process reference, adapted rather than copied: [Anthropic frontend-design skill](https://github.com/anthropics/skills/blob/main/skills/frontend-design/SKILL.md). Project-specific rules and proven registers in this file take precedence.

Pattern-atlas reference: [VoltAgent awesome-design-md](https://github.com/VoltAgent/awesome-design-md), inspected July 17, 2026. It is third-party reverse engineering with uneven provenance, proprietary brand assets, and incomplete preview claims; use it to discover documentation mechanisms, not as brand or implementation authority. Machine-readable guidance comes from the official [Google DESIGN.md specification](https://github.com/google-labs-code/design.md/blob/main/docs/spec.md), currently alpha.

Reference inspected: [HN Daily](https://hn-daily.pages.dev/) on July 17, 2026.
