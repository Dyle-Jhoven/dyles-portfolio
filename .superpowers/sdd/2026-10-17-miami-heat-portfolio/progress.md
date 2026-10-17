# SDD ledger — plan: docs/superpowers/plans/2026-10-17-miami-heat-portfolio.md

- Pre-flight: Task 2 consumes `WIDTH`, `HEIGHT`, `PALETTES`, `SPRITES` (`js/dunkman-sprites.js`) and `DunkmanAudio` (`js/dunkman-audio.js`) from Task 1 — interfaces match.
- Pre-flight: Task 3 consumes `PORTFOLIO_DATA`, `filterProjects` (`js/portfolio-data.js`) and `DunkmanEngine` (`js/dunkman-engine.js`) from Tasks 1 & 2 — interfaces match.
- Task 1: complete (tests: `node --test tests/data-and-sprites.test.mjs` → 3/3 pass)
- Task 2: complete (tests: `node --test` → 7/7 pass)
