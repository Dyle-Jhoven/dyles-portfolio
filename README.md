# 🏀 Dyle's Portfolio

> **Miami Heat NBA Themed Portfolio & Playable Retro TIC-80 "Dunkman" Banner**  
> Built for **Dyle Jhoven E. Payla (#71)** — Sports Facility Operations, Basketball Referee & Creative Computer Technology.

[![Miami Heat Theme](https://img.shields.io/badge/Theme-Miami%20Heat%20Culture-98002E?style=for-the-badge&logo=nba)](https://github.com/Dyle-Jhoven)
[![Miami Vice Nights](https://img.shields.io/badge/Court-Vice%20Nights-F9429E?style=for-the-badge)](https://github.com/Dyle-Jhoven)
[![Zero Dependencies](https://img.shields.io/badge/Stack-Vanilla%20JS%20%2F%20HTML5%20Canvas-F9A01B?style=for-the-badge)](https://github.com/Dyle-Jhoven)
[![Node Test Suite](https://img.shields.io/badge/Tests-9%2F9%20Passing-00B2A9?style=for-the-badge)](https://github.com/Dyle-Jhoven)

---

## 🌟 Overview

A high-performance personal portfolio website celebrating **Dyle Jhoven E. Payla (#71)** with an authentic **Miami Heat NBA** aesthetic and an auto-launching 240×136 retro canvas game banner inspired by `cxong/Dunkman` (TIC-80).

### Key Features
* 🎮 **Interactive Retro Game Banner:** Faithful HTML5 Canvas 240×136 recreation of the TIC-80 basketball minigame *Dunkman* featuring procedural 2-segment inverse-kinematic arms, 8-directional radial guarding, elliptical defender swipes, anime speedlines, and a slam dunk sequence.
* 🤖 **Autonomous AI Attract Demo & Watchdog:** The game banner automatically plays in AI Attract Demo mode when you are idle or on page open, dodging defender swipes and completing dunks. Any control interaction seamlessly transitions into live player control, and an inactivity timer returns to AI Demo after 6 seconds of idle time.
* 🎨 **Dual-Court Theme Switching:** Toggle between **Classic Heat Culture** (`#98002E` Flame Red, `#F9A01B` Gold, Jet Black) and **Vice Nights** (`#F9429E` Laser Pink, `#00B2A9` Cyan, Deep Indigo), dynamically re-shading the website and the 16-color retro game canvas in real time.
* 🔊 **8-Bit Chiptune Audio Synthesizer:** Zero-dependency Web Audio API sound generator producing custom retro chiptune effects for dribbles, defensive steals, anime cut-in fanfares, and slam dunk bass drops.
* 🏟️ **Pixel-Art Miami Heat Arena:** Rafters with '06, '12, and '13 championship banners, animated crowd with camera flashes, scrolling LED ribbon board, and a parquet basketball court with the flaming ball logo.
* 📋 **Authentic Portfolio Dossier:** Grounded credentials in sports facility operations at the **Antipolo City Sports Hub**, certified basketball officiating, and computer technology studies at **ICCT**.

---

## 🕹️ Game Controls

| Action | Controls |
|---|---|
| **Guard Direction** | `W` `A` `S` `D` or `Arrow Keys` (Up / Down / Left / Right) |
| **Pointer / Touch** | Move cursor or touch-drag across the canvas in any 8 radial directions |
| **Control Pad** | On-screen 8-directional octant guard buttons (`↖` `↑` `↗` `←` `🏀` `→` `↙` `↓` `↘`) |
| **Take Over / Slam** | `Spacebar` or Click **"PLAY BANNER"** / **"PLAY NOW"** |
| **AI Attract Demo** | Click **"AI DEMO"** or leave controls idle for 6 seconds |
| **Court Theme** | Click **"COURT: HEAT CULTURE"** toggle in the header |
| **Audio SFX** | Click **"🔇 8-BIT SFX"** button in the header |

---

## 🚀 Quick Start & Local Preview

This project requires **zero external build tools or npm dependencies**. It runs natively in any modern web browser.

### Option 1: Python HTTP Server
```bash
python -m http.server 8080
```
Then open `http://localhost:8080/` in your browser.

### Option 2: Node.js HTTP Server
```bash
npx serve .
```

### Run Unit Tests
The project includes a built-in automated test suite running with Node.js test runner:
```bash
node --test
```
*(All 9 tests execute and verify data integrity, sprite rendering, audio synthesizer, and state machine transitions in ~300ms).*

---

## 📁 Repository Structure

```text
├── index.html                   # Semantic HTML5 arena layout & Jumbotron cabinet
├── css/
│   └── styles.css               # Complete Miami Heat & Vice Nights styling
├── js/
│   ├── main.js                  # Main controller, input routing & HUD synchronization
│   ├── portfolio-data.js        # Dyle #71 player bio, vitals, plays & contact details
│   ├── dunkman-engine.js        # 240x136 game engine (IK arms, AI demo, states, timer)
│   ├── dunkman-sprites.js       # Procedural 16-color pixel-art sprites & arena
│   └── dunkman-audio.js         # Zero-dependency 8-bit Web Audio synthesizer
├── assets/
│   ├── dunkman.tic              # Original TIC-80 cartridge binary
│   └── cover.gif                # Original cartridge artwork
├── tests/
│   ├── data-and-sprites.test.mjs
│   ├── dom-structure.test.mjs
│   └── dunkman-engine.test.mjs
└── README.md
```

---

## 👤 About Dyle Jhoven E. Payla

* **Jersey:** #71
* **Role:** Sports Facility Operations / Certified Basketball Official / Creative Computer Technology
* **Affiliations:** Antipolo City Sports Hub & Institute of Creative Computer Technology (ICCT)
* **Location:** Barangay San Roque, Antipolo City, Rizal, Philippines
* **Contact Email:** [dylejhoven17@gmail.com](mailto:dylejhoven17@gmail.com)
* **Contact Phone:** `09184511708`

---

## 🏀 Credits & Acknowledgments
* Original game reference: [cxong/Dunkman](https://github.com/cxong/Dunkman) created by congusbongus for Ludum Dare 46 on [TIC-80](https://tic80.com/dev/congusbongus/dunkman).
* Visual aesthetics and theme inspired by the **Miami Heat NBA** franchise and the classic Miami Heat Vice Nights identity.
