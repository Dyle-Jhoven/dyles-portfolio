# Miami Heat NBA Portfolio + Retro "Dunkman" Banner — Design Specification

**Date:** 2026-10-17  
**Author:** Dyle (`#3`) & Antigravity  
**Status:** Draft for User Review  
**Reference Game:** [cxong/Dunkman](https://github.com/cxong/Dunkman) (TIC-80 240×136 retro basketball arcade game)

---

## 1. Purpose, Audience & Success Criteria

### 1.1 Purpose
Build a high-impact personal portfolio website for **Dyle**, a **Computer Engineering Student & Junior Game Developer**, themed around the **Miami Heat NBA** franchise and anchored by a playable HTML5 Canvas remake of `cxong/Dunkman` in the Hero Banner.

### 1.2 Target Audience
- Game studio recruiters and technical leads looking for immediate proof of gameplay programming, state machines, procedural animation, and polish.
- Computer Engineering / Software Engineering recruiters evaluating systems, embedded, and full-stack software projects.

### 1.3 Success Criteria
1. **Playable Retro Game Banner (`cxong/Dunkman` Fidelity)**: Runs at native `240×136` logical pixel resolution upscaled with crisp nearest-neighbor rendering (`image-rendering: pixelated`), featuring procedural 2-segment inverse-kinematic arms (`arm(x1, y1, x2, y2)`), anime speedlines, radial focus lines, 8-direction ball guarding (`WASD` / `Arrow Keys` / `Mouse` / `Touch`), elliptical defender arm swipes (`HANDS1`–`HANDS3`), and a 25-second Fast Break to `100.0% DUNKING` culminating in the slow-motion jump and close-up slam dunk sequence.
2. **Idle AI Attract Mode & Theater Mode**: When the visitor lands on the page without pressing keys, an AI controller automatically dodges incoming defender swipes so the banner looks alive immediately. Clicking "PLAY NOW" or pressing movement keys hands control to the player and optionally expands the Arena Jumbotron into Theater Mode.
3. **Dual Miami Heat Court Palette System**:
   - **Classic "Heat Culture" (Default)**: Jet Black (`#09090B`), Miami Flame Red (`#98002E`), Championship Gold (`#F9A01B`), Arena White (`#F4F4F4`).
   - **"Vice Nights" Edition (Toggle)**: Midnight Black (`#060712`), Vice Neon Pink (`#F9429E`), Vice Miami Cyan (`#00B2A9`), Crisp White (`#F4F4F4`).
   - Switching themes updates both CSS Custom Properties across the entire website AND the 16-color indexed lookup palette inside the `Dunkman` canvas engine in real time.
4. **Zero-Dependency Modular Architecture**: Built with standard HTML5, CSS3, and ES Modules (`index.html`, `css/styles.css`, `js/*.js`) with all personal bio, skills, projects, and timeline items stored in `js/portfolio-data.js`.

---

## 2. Visual System & Miami Heat Aesthetics

### 2.1 Color Tokens & Court Editions

| Token | Classic "Heat Culture" (Default) | "Vice Nights" Edition (Toggle) | Purpose |
| :--- | :--- | :--- | :--- |
| `--bg-primary` | `#09090B` (Arena Obsidian) | `#060712` (South Beach Midnight) | Main page background |
| `--bg-surface` | `#121216` (Locker Room Charcoal) | `#0D1021` (Neon Court Navy) | Card & scoreboard surfaces |
| `--bg-elevated` | `#1A1A20` | `#151932` | Hover states & modal panels |
| `--accent-primary` | `#98002E` (Miami Flame Red) | `#F9429E` (Vice Sunset Pink) | Primary CTAs, jersey trim, key lines |
| `--accent-bright` | `#D81E5B` / `#E0243C` | `#FF5EB3` | Glow highlights & active borders |
| `--accent-secondary` | `#F9A01B` (Championship Gold) | `#00B2A9` (Vice Turquoise Cyan) | Secondary badges, ratings, shot clock |
| `--text-primary` | `#F4F4F4` (Jersey White) | `#F4F4F4` (Jersey White) | Headings & primary copy |
| `--text-muted` | `#A1A1AA` | `#94A3B8` | Metadata, stat labels, descriptions |
| `--border-subtle` | `rgba(249, 160, 27, 0.18)` | `rgba(0, 178, 169, 0.25)` | Court geometry borders |

### 2.2 Typography
- **Display / Jersey & Arena Headers**: `'Bebas Neue'`, `'Anton'`, or `'Teko'` (Google Fonts, fallback `Impact, sans-serif`) — tall, condensed athletic block lettering matching NBA jersey numbers and arena banners.
- **Retro Game & Scoreboard LED**: `'Press Start 2P'` / `'VT323'` / `'JetBrains Mono'` with `font-variant-numeric: tabular-nums` for shot-clock timers, `DUNKING %`, stat bars, and arcade overlays.
- **Body Copy**: `'Inter'` or `'Plus Jakarta Sans'` for clean readability in project case studies and engineering descriptions.

---

## 3. System Architecture & File Structure

```text
c:/Users/lande/Downloads/DYLE PORTFOLIO/
├── index.html                  # Semantic 5-section layout, Scoreboard Navbar, Hero Jumbotron
├── css/
│   └── styles.css              # Theme tokens, Heat/Vice styles, Arena Jumbotron, Bento cards
├── js/
│   ├── main.js                 # App entry: DOM rendering, filters, theme toggle, HUD sync
│   ├── portfolio-data.js       # Editable config: Dyle's #3 profile, CpE/GameDev skills, projects
│   ├── dunkman-sprites.js      # 16-color Classic/Vice palettes, pixel art matrices & bitmap text
│   ├── dunkman-audio.js        # Web Audio API 8-bit SFX & arcade synth loop (with mute state)
│   └── dunkman-engine.js       # 240x136 Canvas state machine, IK arms, speedlines, AI attract mode
└── docs/
    └── superpowers/
        └── specs/
            └── 2026-10-17-miami-heat-portfolio-design.md
```

---

## 4. Component Design

### 4.1 Top Arena Scoreboard Navigation (`<header>`)
- **Left**: Miami Heat-inspired flame/basketball emblem + `DYLE #3` player tag + live status badge (`ROOKIE / JR. GAME DEV & CpE`).
- **Center**: Quick section links (`01 TIP-OFF`, `02 SCOUTING REPORT`, `03 HIGHLIGHT REEL`, `04 SEASON LOG`, `05 FRONT OFFICE`).
- **Right**:
  - **Court Edition Switcher**: Toggle pill between `🔥 HEAT CULTURE` and `🌴 VICE NIGHTS`.
  - **Audio Toggle**: `🔊 8-BIT SFX` mute/unmute button.

### 4.2 Section 1: Arena Jumbotron Hero & `Dunkman` Game Banner
- **Asymmetric Split Layout** (expands to centered **Theater Mode** when toggled or actively playing):
  - **Left Column (Player Introduction)**:
    - Headline: `DYLE` with `#3` jersey badge, subtitle `COMPUTER ENGINEERING STUDENT & JUNIOR GAME DEVELOPER`.
    - Live **Arena Shot-Clock / Scoreboard Strip** synced at 60fps with the canvas game: displays `DUNKING PROGRESS (0.0% - 100.0%)`, `LIVES REMAINING`, `DUNK STREAK`, and `MODE (AI ATTRACT / PLAYER 1)`.
    - Primary CTAs: `🏀 PLAY DUNKMAN (FOCUS MODE)` and `VIEW HIGHLIGHT REEL`.
  - **Right Column (The `240×136` Dunkman Arcade Jumbotron)**:
    - Framed inside a Miami Heat LED Jumbotron cabinet with corner shot-clock indicators and on-screen control hints (`WASD / ARROWS / MOUSE / TOUCH`).
    - Includes quick buttons in the cabinet bezel: `PLAY / RESTART`, `AI DEMO`, `THEATER SIZE`, and `SOUND`.

### 4.3 `Dunkman` Game Engine Specification (`js/dunkman-engine.js`)
Faithfully adapts `cxong/Dunkman` (`dunkman.moon`) to HTML5 Canvas (`WIDTH = 240`, `HEIGHT = 136`):
1. **16-Color Indexed Palette System**:
   - All drawing operations reference color indices `0..15`.
   - `PALETTE_CLASSIC` maps the fiery background bands and jersey colors to Miami Heat Black, Flame Red (`#98002E`), Crimson (`#D63600`), Championship Gold (`#F9A01B`), Bright Yellow (`#FFFF00`), and Home White/Black `#3` jersey with Heat red/gold trim.
   - `PALETTE_VICE` remaps the speedline bands and jersey accents to Deep Midnight, Electric Magenta (`#F9429E`), Neon Violet (`#8B5CF6`), Vice Cyan (`#00B2A9`), and Laser Blue (`#73EFF7`).
2. **Procedural Effects**:
   - **`Speedlines`**: Symmetrical horizontal gradient bands from top and bottom edges toward the center, with fast horizontal triangular streaks (`dx = -50` scaled to 60fps delta) shooting right-to-left.
   - **`Focuslines`**: 50 triangular rays radiating outward from a configurable focal point `(fx, fy)` used in `CutInState`, `HoopState`, and `SlamState`.
   - **Procedural 2-Segment IK Arms (`arm(x1, y1, x2, y2)`)**:
     - Computes distance `d` between shoulder `(x1, y1)` and hand/ball `(x2, y2)`.
     - When `d < ARMLEN (40)`, bends the elbow `(ex, ey)` perpendicular to the arm vector by `ed = (ARMLEN - d) / 2`.
     - Renders black outline (`ARMOUTC = 0`, radius `6`) and skin-tone fill (`ARMFILLC = 7`, radius `5`) using dual-triangle thick line segments and circular joints.
3. **Ball Guarding & Controls (`Ball` class)**:
   - Orbits `(CENTERX = 120, CENTERY = 68)` at radius `D = 40` in 8 cardinal/diagonal directions (`N, NE, E, SE, S, SW, W, NW`) plus center `(0, 0)`.
   - Smoothly interpolates over `LERP = 8` frames using `outquad(t) = 1 - (1 - t)^2` while rotating the basketball sprite (`angle += 0.1`).
   - **Multi-Input Support**:
     - **Keyboard**: `Arrow Keys` or `WASD` (supports diagonals).
     - **Mouse / Touch**: Moving cursor/finger inside the canvas snaps the ball toward the nearest of the 8 guard octants (or center if near torso).
     - **Idle AI Attract Mode**: When in `ATTRACT` mode, inspects active `Hand` trajectories and automatically picks the safest octant every 12 frames so the protagonist actively jukes and dunks in the background! Any keyboard/mouse/touch input on the game switches immediately to `PLAYER 1` mode.
4. **Defender Spawning & Elliptical Swipes (`Hand` & `HandGen`)**:
   - Defenders in opposing jerseys slide in from left or right (`outback` easing) and sweep their long procedural arms along elliptical arcs (`x = cos(theta + t) * w + cx`, `y = sin(theta + t) * h + cy`, `t = inoutquad(counter / pi) * pi`).
   - Implements all 3 swipe archetypes from `cxong/Dunkman` (`HANDS1` horizontal jabs, `HANDS2` wide/diagonal hooks, `HANDS3` half-screen sweeping arcs) with escalating combinations across the **25-second Fast Break** (`1500` ticks at 60fps).
5. **State Machine Flow**:
   - `TitleState` (`DUNKMAN: HEAT EDITION` title art + prompt) →
   - `CutInState` (Comic dialogue + letterboxed shaking cut-in: `"ONE POINT DOWN, 25 SECONDS ON THE SHOT CLOCK..."` → `"I AM DYLE — THE DUNKMAN!!!"` over radial focus lines) →
   - `GameState` (25-second Fast Break from `0.0%` to `100.0%`, 3 Lives, hit invulnerability flashing for 60 frames) →
   - `HoopState` (Slow-motion mid-air glide toward the right backboard/rim over white-on-black radial focus lines) →
   - `SlamState` (Close-up hand slamming basketball through the rim with screen shake, confetti/sparks, and `+2 PTS / DUNK STREAK` increment) →
   - `LoseState` (Defeated spotlight pose on the court with `"TURNOVER! PRESS PLAY OR SPACE TO RUN IT BACK"`).

### 4.4 Section 2: Scouting Report (About & Player Attributes)
- **Player Bio Card**: Styled like an official Miami Heat Draft Combine / Scouting Report (`PLAYER: DYLE`, `NUMBER: #3`, `POSITION: GAME DEV / COMPUTER ENG`, `ARCHETYPE: TWO-WAY SYSTEMS & GAMEPLAY ENGINEER`).
- **Skill Rating Bars (NBA 2K / Scouting Style, 0–99 OVR)**:
  - **Game Development**: Unity / Godot / HTML5 Canvas, Gameplay State Machines & Physics, Shaders / Pixel Art Pipelines, C# & GDScript.
  - **Computer Engineering**: C / C++ & Embedded Systems, Microcontrollers (Arduino / ESP32 / STM32), Digital Logic & Computer Architecture, Python & Hardware Interfacing.
  - **Web & Software**: JavaScript / TypeScript, Git & CI/CD, Data Structures & Algorithms.

### 4.5 Section 3: Highlight Reel (Filterable Projects Showcase)
- **Category Filter Tabs**: `ALL PLAYS`, `🎮 GAME DEV`, `⚡ COMPUTER ENG & HARDWARE`, `💻 SOFTWARE & WEB`.
- **Project Cards (Game Tape / Trading Card Aesthetic)**:
  - Each card features a custom procedural pixel/vector preview banner or thumbnail, project category badge, "Game Stats" metrics (e.g., `60 FPS`, `C++ / OpenGL`, `ESP32`), concise engineering breakdown, tech tags, and action buttons (`PLAY / LIVE DEMO`, `SOURCE CODE`).
  - Pre-populated in `js/portfolio-data.js` with 6 tailored showcase projects (including **Dunkman: Heat Edition**, a 2D/3D indie game project, an FPGA/Microcontroller arcade hardware build, a custom physics/raycasting engine, etc.) that Dyle can edit in seconds.

### 4.6 Section 4: Season Log (Experience, Education & Game Jams)
- Vertical "Play-by-Play" timeline formatted as quarters (`Q1`–`Q4` / Seasons):
  - BS in Computer Engineering coursework & hardware labs
  - Game Jam entries (Ludum Dare / itch.io jams)
  - Junior Game Developer projects & open-source contributions

### 4.7 Section 5: Front Office (Contact & Draft Call)
- High-contrast **Contract Offer / Draft Card** with one-click copy email, Resume download link, GitHub, itch.io, and LinkedIn links, plus an interactive message form that triggers a celebratory scoreboard buzzer animation on submit.

---

## 5. Error Handling, Accessibility & Verification

- **Audio Autoplay Policy**: Web Audio `AudioContext` is initialized/resumed only on explicit user gesture (clicking unmute or game controls) so browser autoplay policies never throw console errors.
- **Responsive Scaling**: The `240×136` canvas scales cleanly to any container width while maintaining a strict `16:9` aspect ratio (`aspect-ratio: 240 / 136`) and touch virtual octant detection on mobile screens.
- **Keyboard Scroll Lock Prevention**: Arrow keys and Spacebar only prevent default page scrolling when the player is actively in `PLAYER 1` focus mode inside the game banner; scrolling the rest of the portfolio remains smooth.
