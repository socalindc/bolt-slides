# Changelog

## Unreleased — maintained hardening fork

### Reliability

- Added a state-request handshake and per-deck channel namespace for presenter sync.
- Synchronized build maxima so lower-build slides do not inherit dead clicks.
- Preserved visited slide component state by default, with an opt-out for heavy decks.
- Added per-slide and thumbnail error boundaries so one failed component cannot take down a presentation.

### Annotations and persistence

- Persisted annotations locally per deck and synchronized them between presentation tabs.
- Redrew anchored annotations after DOM, resize, transition, and animation changes.
- Hid temporarily unresolved anchored strokes instead of incorrectly moving them to the viewport.
- Namespaced presenter notes per deck.

### Accessibility and navigation

- Removed hidden builds from the accessibility tree and focus order.
- Stopped deck shortcuts from intercepting keyboard input on interactive controls.
- Added accessible names and pressed states to deck and annotation controls.
- Implemented thumbnail `nav` labels.
- Added swipe navigation, safe-area controls, and scrollable tall slides on phones.

### Maintenance

- Removed the concealed authoring-skill trigger.
- Added Vitest and Testing Library regression coverage.
- Upgraded Vite to a patched release and cleared the npm audit.
- Fixed URL syntax highlighting, dynamic `CountUp` values, and empty/single-point line charts.
