# Miami Heat NBA Portfolio + Retro Dunkman Banner Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a zero-dependency Miami Heat NBA-themed portfolio website for Dyle (`#3`, Computer Engineering Student & Junior Game Developer) featuring a playable `240×136` HTML5 Canvas remake of `cxong/Dunkman` in the Arena Jumbotron Hero Banner with a live "Heat Culture" / "Vice Nights" dual palette switcher.

**Architecture:** Modular ES Modules (`js/portfolio-data.js`, `js/dunkman-sprites.js`, `js/dunkman-audio.js`, `js/dunkman-engine.js`, `js/main.js`) paired with semantic HTML5 (`index.html`) and CSS Custom Property court themes (`css/styles.css`). The `Dunkman` engine renders to a `240×136` logical canvas using a 16-color indexed lookup table, procedural 2-segment inverse-kinematic arms (`arm(x1, y1, x2, y2)`), elliptical defender swipes (`HANDS1`–`HANDS3`), anime speedlines/focuslines, an Idle AI Attract Mode, and a 25-second Fast Break state machine synced at 60fps with the DOM Arena Scoreboard.

**Tech Stack:** HTML5, CSS3 (Custom Properties, Grid/Flexbox, `image-rendering: pixelated`), Vanilla ES Modules (JavaScript), HTML5 Canvas 2D API, Web Audio API, Node.js built-in test runner (`node --test`) for unit verification.

**Spec:** `docs/superpowers/specs/2026-10-17-miami-heat-portfolio-design.md`

## Global Constraints

- Logical game canvas resolution MUST be `WIDTH = 240`, `HEIGHT = 136` with `image-rendering: pixelated`.
- Default theme is `classic` (**Heat Culture**: `#09090B` bg, `#98002E` Flame Red, `#F9A01B` Championship Gold, `#F4F4F4` Jersey White); toggle theme is `vice` (**Vice Nights**: `#060712` bg, `#F9429E` Vice Pink, `#00B2A9` Vice Cyan, `#F4F4F4` White).
- All personal bio, `#3` jersey metadata, CpE/Game Dev skill ratings, projects, and Season Log entries MUST reside in `js/portfolio-data.js`.
- Web Audio API `AudioContext` MUST only initialize/resume on user interaction and default to muted/safe state during Idle AI Attract Mode so browser autoplay policies never throw errors.
- Arrow keys and Spacebar MUST only call `preventDefault()` when the game is actively in `PLAYER` control mode so normal page scrolling works unobstructed.

## Review Focus

1. **Elbow IK Singularity (`d === 0` or `d >= ARMLEN`)**: `computeArmJoint(x1, y1, x2, y2, armLen = 40)` must not divide by zero when `(x1, y1) === (x2, y2)` and must clamp elbow bend cleanly when `d >= armLen`.
2. **Elliptical Defender Swipe Bounds**: `Hand.getPos()` must return finite `(x, y)` coordinates across the entire `counter` lifecycle (`0..pi`) for both horizontal (`h = 0`) and arc (`h > 0`) swipe patterns.
3. **Palette Live Swap**: Calling `engine.setPalette('vice')` or `engine.setPalette('classic')` mid-frame must immediately switch the active 16-color array without resetting game progress or lives.
4. **Idle AI Attract-to-Player Handoff**: Any directional input (`Arrow*`, `WASD`, mouse move/touch on active game) when in `ATTRACT` mode must transition smoothly to `PLAYER` mode, and `resetGame(mode)` must restore `lives = 3` and `ticks = 0`.
5. **Project Filtering Consistency**: Filtering `PORTFOLIO_DATA.projects` by `'all'`, `'game'`, `'cpe'`, and `'software'` must match exact category keys and render non-empty cards for every tab.

---

### Task 1: Portfolio Data Config, 16-Color Palettes, Sprites & Web Audio Synthesizer

**Files:**
- Create: `js/portfolio-data.js`
- Create: `js/dunkman-sprites.js`
- Create: `js/dunkman-audio.js`
- Test: `tests/data-and-sprites.test.mjs`

**Interfaces:**
- Consumes: none
- Produces:
  - `js/portfolio-data.js`: exports `PORTFOLIO_DATA` (`player`, `vitals`, `skillCategories`, `projects`, `seasonLog`, `socials`) and `filterProjects(projects, category)`
  - `js/dunkman-sprites.js`: exports `WIDTH = 240`, `HEIGHT = 136`, `PALETTES` (`classic`, `vice` — each 16 hex strings), `SPRITES` (pixel grids & procedural sprite draw helpers `drawPlayerTorso`, `drawDefenderTorso`, `drawBasketball`, `drawHoop`, `drawJumpPlayer`, `drawSlamFrame`, `drawLoseFrame`, `drawPixelText`)
  - `js/dunkman-audio.js`: exports `class DunkmanAudio` with `toggleMute()`, `playMove()`, `playHit()`, `playCutIn()`, `playSlam()`, `playLose()`, `playTick()`

- [ ] **Step 1: Write the failing test in `tests/data-and-sprites.test.mjs`**

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { PORTFOLIO_DATA, filterProjects } from '../js/portfolio-data.js';
import { WIDTH, HEIGHT, PALETTES, SPRITES } from '../js/dunkman-sprites.js';

test('PORTFOLIO_DATA has Dyle #3 profile and all project categories', () => {
  assert.equal(PORTFOLIO_DATA.player.name, 'DYLE');
  assert.equal(PORTFOLIO_DATA.player.number, '#3');
  assert.equal( filterProjects(PORTFOLIO_DATA.projects, 'all').length, PORTFOLIO_DATA.projects.length );
  assert.ok(filterProjects(PORTFOLIO_DATA.projects, 'game').length >= 2);
  assert.ok(filterProjects(PORTFOLIO_DATA.projects, 'cpe').length >= 2);
  assert.ok(filterProjects(PORTFOLIO_DATA.projects, 'software').length >= 1);
});

test('Dunkman palettes and dimensions match TIC-80 240x136 16-color spec', () => {
  assert.equal(WIDTH, 240);
  assert.equal(HEIGHT, 136);
  assert.equal(PALETTES.classic.length, 16);
  assert.equal(PALETTES.vice.length, 16);
  assert.equal(typeof SPRITES.drawPlayerTorso, 'function');
  assert.equal(typeof SPRITES.drawBasketball, 'function');
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test tests/data-and-sprites.test.mjs`  
Expected: FAIL with `ERR_MODULE_NOT_FOUND`

- [ ] **Step 3: Implement `js/portfolio-data.js`, `js/dunkman-sprites.js`, and `js/dunkman-audio.js`**

- In `js/portfolio-data.js`: Define `PORTFOLIO_DATA` for **Dyle (`#3`)**, Computer Engineering Student & Junior Game Developer, including vitals, 3 skill categories (`Game Development`, `Computer Engineering & Embedded`, `Software & Web`) with 0–99 OVR ratings, 6 rich showcase projects across `'game'`, `'cpe'`, and `'software'`, 4 `seasonLog` quarters (`Q1`–`Q4`), and `socials`. Export `filterProjects(projects, category)`.
- In `js/dunkman-sprites.js`: Export `WIDTH = 240`, `HEIGHT = 136`, `PALETTES` (`classic` with Miami Heat Flame Red `#98002E` / Gold `#F9A01B` / Crimson / Yellow speedlines; `vice` with Neon Pink `#F9429E` / Vice Cyan `#00B2A9` / Violet / Laser Blue speedlines), and `SPRITES` Canvas 2D pixel-art drawing routines for Dyle `#3` (2-frame animated running torso, spiky hair, `#3` Miami Heat jersey), defender torso, rotating basketball with seams, backboard/rim/net, slow-mo jump pose, close-up slam dunk hand/rim, and spotlight lose pose.
- In `js/dunkman-audio.js`: Export `DunkmanAudio` using Web Audio API oscillators/noise buffers that safely no-op when muted or in Node/headless environments.

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test tests/data-and-sprites.test.mjs`  
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add js/portfolio-data.js js/dunkman-sprites.js js/dunkman-audio.js tests/data-and-sprites.test.mjs
git commit -m "feat: add portfolio data, 16-color Heat/Vice sprites, and 8-bit Web Audio synth"
```

---

### Task 2: `Dunkman` 240×136 Canvas Game Engine (`cxong/Dunkman` Port)

**Files:**
- Create: `js/dunkman-engine.js`
- Test: `tests/dunkman-engine.test.mjs`

**Interfaces:**
- Consumes: `WIDTH`, `HEIGHT`, `PALETTES`, `SPRITES` from `js/dunkman-sprites.js`; `DunkmanAudio` from `js/dunkman-audio.js`
- Produces:
  - `computeArmJoint(x1, y1, x2, y2, armLen = 40) -> { ex: number, ey: number, d: number }`
  - `outquad(t: number) -> number`, `inoutquad(t: number) -> number`, `outback(t: number) -> number`
  - `class Hand` (`getPos() -> { x: number, y: number }`, `tick(speed: number) -> boolean`)
  - `class DunkmanEngine` with `setPalette(themeName)`, `startPlayerGame()`, `startAttractMode()`, `setInputDirection(dx, dy)`, `setPointerPos(normX, normY)`, `step()`

- [ ] **Step 1: Write the failing test in `tests/dunkman-engine.test.mjs`**

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { computeArmJoint, outquad, Hand, DunkmanEngine } from '../js/dunkman-engine.js';

test('computeArmJoint handles zero distance and bends elbow when d < armLen', () => {
  const zero = computeArmJoint(100, 70, 100, 70, 40);
  assert.ok(Number.isFinite(zero.ex) && Number.isFinite(zero.ey));

  const bent = computeArmJoint(100, 70, 120, 70, 40);
  assert.equal(bent.ex, 110);
  assert.notEqual(bent.ey, 70); // perpendicular bend applied

  const stretched = computeArmJoint(100, 70, 160, 70, 40);
  assert.equal(stretched.ex, 130);
  assert.equal(stretched.ey, 70);
});

test('Hand elliptical trajectory progresses and finishes cleanly', () => {
  const hand = new Hand({ cx: 120, cy: 68, w: 60, h: 40, theta: 0, side: -1 });
  const start = hand.getPos();
  assert.ok(Number.isFinite(start.x) && Number.isFinite(start.y));
  let finished = false;
  for (let i = 0; i < 120; i++) {
    if (!hand.tick(60)) {
      finished = true;
      break;
    }
  }
  assert.equal(finished, true);
});

test('DunkmanEngine switches palettes, runs AI attract mode, and transitions to PLAYER mode', () => {
  const engine = new DunkmanEngine(null);
  assert.equal(engine.mode, 'ATTRACT');
  engine.setPalette('vice');
  assert.equal(engine.theme, 'vice');
  for (let i = 0; i < 30; i++) engine.step();
  assert.ok(engine.ticks > 0);
  engine.startPlayerGame();
  assert.equal(engine.mode, 'PLAYER');
  assert.equal(engine.lives, 3);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test tests/dunkman-engine.test.mjs`  
Expected: FAIL with `ERR_MODULE_NOT_FOUND`

- [ ] **Step 3: Implement `js/dunkman-engine.js`**

Implement the exact `cxong/Dunkman` math & state machine:
- `computeArmJoint(x1, y1, x2, y2, armLen = 40)` with perpendicular elbow calculation `ed = (armLen - d) / 2` when `d < armLen` and safe fallback when `d === 0`.
- `Speedlines` (symmetrical 5-band fiery gradient + 20 triangle speedlines moving at `dx = -50`) and `Focuslines` (50 radial rays from focal point `(fx, fy)`).
- `Ball` orbiting `(120, 68)` at `D = 40` in 8 directions + center with `LERP = 8` `outquad` interpolation, rotating ball sprite, procedural 2-segment left/right arms from shoulders `(106, 70)` and `(138, 77)`, and 60-frame hit invulnerability (`HITC = 60`, `COLRADIUS = 8`).
- `Hand` & `HandGen` implementing `HANDS1`, `HANDS2`, and `HANDS3` elliptical swipe patterns and escalating combinations across `FAST_BREAK_TICKS = 1500` (25 seconds at 60fps).
- Complete state machine (`CUTIN` -> `GAME` -> `HOOP` -> `SLAM` / `LOSE`), AI Attract Mode octant safety evaluator, keyboard (`Arrow*`/`WASD`) + pointer/touch octant resolver, and HUD callback hook `onHudUpdate(hudState)`.

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test tests/dunkman-engine.test.mjs`  
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add js/dunkman-engine.js tests/dunkman-engine.test.mjs
git commit -m "feat: implement 240x136 Dunkman game engine with IK arms, swipes, and AI attract mode"
```

---

### Task 3: Miami Heat Portfolio HTML, Dual-Court CSS & Main Controller

**Files:**
- Create: `index.html`
- Create: `css/styles.css`
- Create: `js/main.js`
- Test: `tests/dom-structure.test.mjs`

**Interfaces:**
- Consumes: `PORTFOLIO_DATA`, `filterProjects` from `js/portfolio-data.js`; `DunkmanEngine` from `js/dunkman-engine.js`
- Produces: Complete 5-section interactive portfolio (`index.html`, `css/styles.css`, `js/main.js`)

- [ ] **Step 1: Write the failing test in `tests/dom-structure.test.mjs`**

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

test('index.html and css/styles.css contain all 5 sections, Jumbotron canvas, and Heat/Vice theme tokens', () => {
  const html = fs.readFileSync(new URL('../index.html', import.meta.url), 'utf8');
  const css = fs.readFileSync(new URL('../css/styles.css', import.meta.url), 'utf8');

  assert.match(html, /id="dunkman-canvas"/);
  assert.match(html, /id="scouting-report"/);
  assert.match(html, /id="highlight-reel"/);
  assert.match(html, /id="season-log"/);
  assert.match(html, /id="front-office"/);
  assert.match(css, /#98002E/i); // Miami Flame Red
  assert.match(css, /#F9A01B/i); // Championship Gold
  assert.match(css, /#F9429E/i); // Vice Pink
  assert.match(css, /#00B2A9/i); // Vice Cyan
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test tests/dom-structure.test.mjs`  
Expected: FAIL with `ENOENT`

- [ ] **Step 3: Implement `index.html`, `css/styles.css`, and `js/main.js`**

- `index.html`: Build the Arena Scoreboard Header (`DYLE #3`, section navigation, `🔥 HEAT CULTURE / 🌴 VICE NIGHTS` court switcher, `🔊 8-BIT SFX` button), Section 1 **Arena Jumbotron Hero** (Left: Player Intro, live LED Shot-Clock/Scoreboard strip showing `DUNKING %`, `LIVES`, `STREAK`, `MODE`, CTAs; Right: `240×136` `#dunkman-canvas` cabinet with Theater Mode toggle, Play/Restart, AI Demo, and On-Screen D-Pad/Octant touch support), Section 2 **Scouting Report** (`#scouting-report`), Section 3 **Highlight Reel** (`#highlight-reel`), Section 4 **Season Log** (`#season-log`), and Section 5 **Front Office** (`#front-office`).
- `css/styles.css`: Define `:root` (`Heat Culture`) and `[data-theme="vice"]` (`Vice Nights`) tokens, Google Fonts (`Bebas Neue`, `Press Start 2P`, `Plus Jakarta Sans`), court geometry lines, LED scoreboard counters, Theater Mode expansion (`.hero-grid.theater-mode`), trading-card project bento grid with custom canvas/SVG project art headers, and mobile responsiveness.
- `js/main.js`: Mount `DunkmanEngine` on `#dunkman-canvas`, wire live HUD updates to the DOM scoreboard, handle theme switching (`document.documentElement.dataset.theme` + `engine.setPalette()`), Theater Mode toggle, project category filtering, skill bar animations, and the Front Office contract/contact form buzzer interaction.

- [ ] **Step 4: Run all tests to verify they pass**

Run: `node --test`  
Expected: PASS (all 3 test files green)

- [ ] **Step 5: Commit**

```bash
git add index.html css/styles.css js/main.js tests/dom-structure.test.mjs
git commit -m "feat: build Miami Heat 5-section portfolio UI, Vice Nights toggle, and Jumbotron integration"
```
