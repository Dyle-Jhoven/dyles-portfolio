import { WIDTH, HEIGHT, PALETTES, SPRITES } from './dunkman-sprites.js';
import { DunkmanAudio } from './dunkman-audio.js';

export const CENTERX = WIDTH / 2; // 120
export const CENTERY = HEIGHT / 2; // 68
export const GUARD_RADIUS = 40;
export const ARMLEN = 40;
export const COLRADIUS = 8.5;
export const HIT_INVULN_TICKS = 60;
export const FAST_BREAK_TICKS = 1500; // 25 seconds at 60fps

export function outquad(t) {
  const c = Math.max(0, Math.min(1, t));
  return -c * (c - 2);
}

export function inoutquad(t) {
  let c = Math.max(0, Math.min(1, t)) * 2;
  if (c < 1) return 0.5 * c * c;
  c -= 1;
  return -0.5 * (c * (c - 2) - 1);
}

export function outback(t) {
  const s = 1.70158;
  const c = Math.max(0, Math.min(1, t)) - 1;
  return c * c * ((s + 1) * c + s) + 1;
}

/**
 * Exact 2-segment procedural arm inverse kinematics from cxong/Dunkman:
 * Computes the elbow joint (ex, ey) between shoulder (x1, y1) and hand/ball (x2, y2).
 * When distance d < armLen, bends the elbow outward perpendicular to the arm vector.
 */
export function computeArmJoint(x1, y1, x2, y2, armLen = ARMLEN, bendSign = 1) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const d = Math.hypot(dx, dy);

  if (d < 0.0001) {
    return { ex: x1, ey: y1 + armLen * 0.4, d: 0 };
  }

  let ex = (x1 + x2) / 2;
  let ey = (y1 + y2) / 2;

  if (d < armLen) {
    const nx = (dy / d) * bendSign;
    const ny = (-dx / d) * bendSign;
    const ed = (armLen - d) / 2;
    ex += nx * ed;
    ey += ny * ed;
  }

  return { ex, ey, d };
}

function drawThickSegment(ctx, x1, y1, x2, y2, radius, color) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const d = Math.hypot(dx, dy);
  if (d < 0.001) return;
  const nx = (dy / d) * radius;
  const ny = (-dx / d) * radius;

  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(x1 + nx, y1 + ny);
  ctx.lineTo(x1 - nx, y1 - ny);
  ctx.lineTo(x2 - nx, y2 - ny);
  ctx.lineTo(x2 + nx, y2 + ny);
  ctx.closePath();
  ctx.fill();
}

function drawCircle(ctx, x, y, r, fillColor, strokeColor = null) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  if (fillColor) {
    ctx.fillStyle = fillColor;
    ctx.fill();
  }
  if (strokeColor) {
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = 1.25;
    ctx.stroke();
  }
}

/**
 * Renders the 2-segment procedural arm with black outline (index 0) and skin fill (index 7),
 * matching `arm(x1, y1, x2, y2)` in dunkman.moon.
 */
export function drawProceduralArm(ctx, palette, x1, y1, x2, y2, bendSign = 1) {
  const { ex, ey } = computeArmJoint(x1, y1, x2, y2, ARMLEN, bendSign);
  const outColor = palette[0];
  const fillColor = palette[7];

  // Outer black silhouette pass
  drawCircle(ctx, x1, y1, 6, outColor);
  drawThickSegment(ctx, x1, y1, ex, ey, 6, outColor);
  drawCircle(ctx, ex, ey, 6, outColor);
  drawThickSegment(ctx, ex, ey, x2, y2, 6, outColor);
  drawCircle(ctx, x2, y2, 8.5, outColor);

  // Inner skin-tone fill pass
  drawCircle(ctx, x1, y1, 4.8, fillColor);
  drawThickSegment(ctx, x1, y1, ex, ey, 4.8, fillColor);
  drawCircle(ctx, ex, ey, 4.8, fillColor);
  drawThickSegment(ctx, ex, ey, x2, y2, 4.8, fillColor);
  drawCircle(ctx, x2, y2, 7.2, fillColor);
}

/**
 * Horizontal anime speedlines background from cxong/Dunkman (`Speedlines` class).
 */
export class Speedlines {
  constructor() {
    this.lines = [];
    for (let i = 0; i < 20; i++) {
      this.lines.push(this.createLine(Math.random() * WIDTH));
    }
  }

  createLine(x = WIDTH) {
    const bandIndex = Math.floor(Math.random() * 4);
    const colorChoices = [15, 1, 2, 3, 4];
    const c = colorChoices[bandIndex + Math.floor(Math.random() * 2)];
    let y = (bandIndex * 2 + 1) * (HEIGHT / 16) + (Math.random() * 16 - 8);
    if (Math.random() < 0.5) {
      y = HEIGHT - y;
    }
    return {
      x,
      y,
      w: 50 + Math.random() * 140,
      h: 2 + Math.random() * 3.5,
      c
    };
  }

  tick() {
    for (let i = 0; i < this.lines.length; i++) {
      this.lines[i].x -= 14;
      if (this.lines[i].x + this.lines[i].w < 0) {
        this.lines[i] = this.createLine(WIDTH + Math.random() * 30);
      }
    }
  }

  draw(ctx, palette) {
    const bandColors = [15, 1, 2, 3];
    for (let i = 0; i < bandColors.length; i++) {
      const y = (i * HEIGHT) / 10;
      const h = HEIGHT / 10 + 1;
      ctx.fillStyle = palette[bandColors[i]];
      ctx.fillRect(0, y, WIDTH, h);
      ctx.fillRect(0, HEIGHT - y - h + 1, WIDTH, h);
    }
    // Bright center core band
    ctx.fillStyle = palette[4];
    ctx.fillRect(0, (4 * HEIGHT) / 10, WIDTH, (2 * HEIGHT) / 10 + 1);

    // Draw shooting triangular speed streaks
    this.drawStreaks(ctx, palette);
  }

  drawStreaks(ctx, palette) {
    for (const line of this.lines) {
      ctx.fillStyle = palette[line.c];
      ctx.beginPath();
      ctx.moveTo(line.x + line.w, line.y - line.h / 2);
      ctx.lineTo(line.x + line.w, line.y + line.h / 2);
      ctx.lineTo(line.x, line.y);
      ctx.closePath();
      ctx.fill();
    }
  }
}

/**
 * Retro Pixelated Basketball Arena Miami Heat Theme Background
 * Featuring arena rafters, championship banners, packed Miami Heat crowd,
 * animated LED ribbon board, and parquet basketball hardwood court!
 */
export class PixelArena {
  constructor() {
    this.scrollX = 0;
    this.ribbonScroll = 0;
    this.flashes = [];
  }

  tick() {
    this.scrollX = (this.scrollX + 11) % 480;
    this.ribbonScroll = (this.ribbonScroll + 1.25) % 240;

    // Random crowd camera flashes
    if (Math.random() < 0.28) {
      this.flashes.push({
        x: Math.random() * WIDTH,
        y: 16 + Math.random() * 22,
        r: 2 + Math.random() * 3,
        life: 4
      });
    }
    for (let i = this.flashes.length - 1; i >= 0; i--) {
      this.flashes[i].life -= 1;
      if (this.flashes[i].life <= 0) {
        this.flashes.splice(i, 1);
      }
    }
  }

  draw(ctx, p) {
    // 1. Rafters & Stadium Ceiling (y: 0..16)
    ctx.fillStyle = p[0];
    ctx.fillRect(0, 0, WIDTH, 16);

    // Arena spotlight cones
    ctx.fillStyle = p[11];
    ctx.globalAlpha = 0.12;
    ctx.beginPath();
    ctx.moveTo(35, 0);
    ctx.lineTo(8, 52);
    ctx.lineTo(65, 52);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(205, 0);
    ctx.lineTo(175, 52);
    ctx.lineTo(235, 52);
    ctx.closePath();
    ctx.fill();
    ctx.globalAlpha = 1.0;

    // Steel Rafter Girders
    ctx.strokeStyle = p[14];
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, 5);
    ctx.lineTo(WIDTH, 5);
    ctx.moveTo(0, 11);
    ctx.lineTo(WIDTH, 11);
    for (let x = 0; x < WIDTH; x += 16) {
      ctx.moveTo(x, 5);
      ctx.lineTo(x + 8, 11);
      ctx.lineTo(x + 16, 5);
    }
    ctx.stroke();

    // Miami Heat Championship Banners hanging from rafters ('06, '12, '13)
    const banners = [
      { x: 18, year: "'06" },
      { x: 58, year: "'12" },
      { x: 184, year: "'13" }
    ];
    for (const b of banners) {
      ctx.fillStyle = p[12];
      ctx.fillRect(b.x, 6, 15, 14);
      ctx.fillStyle = p[15];
      ctx.fillRect(b.x + 2, 7, 11, 2);
      ctx.fillRect(b.x + 2, 10, 11, 7);
      ctx.fillStyle = p[3];
      ctx.font = '5px monospace';
      ctx.fillText(b.year, b.x + 2, 16);
      ctx.beginPath();
      ctx.moveTo(b.x, 20);
      ctx.lineTo(b.x + 7.5, 23);
      ctx.lineTo(b.x + 15, 20);
      ctx.fillStyle = p[12];
      ctx.fill();
    }

    // 2. Pixelated Miami Heat Arena Crowd (y: 16..38)
    const crowdRows = [
      { y: 17, color: p[8] },
      { y: 22, color: p[15] },
      { y: 27, color: p[0] },
      { y: 32, color: p[1] }
    ];
    const fanShirtPalette = [p[15], p[0], p[12], p[3], p[1]];

    for (let rowIdx = 0; rowIdx < crowdRows.length; rowIdx++) {
      const row = crowdRows[rowIdx];
      ctx.fillStyle = p[0];
      ctx.fillRect(0, row.y, WIDTH, 5);

      for (let x = 2; x < WIDTH; x += 5) {
        const hash = (x * 7 + rowIdx * 13) % fanShirtPalette.length;
        const shirtColor = fanShirtPalette[hash];
        const headColor = p[7];

        ctx.fillStyle = headColor;
        ctx.fillRect(x + 1, row.y, 2, 2);
        ctx.fillStyle = shirtColor;
        ctx.fillRect(x, row.y + 2, 4, 3);
      }
    }

    // Dynamic Crowd Camera Flashes
    for (const f of this.flashes) {
      ctx.fillStyle = p[4];
      ctx.beginPath();
      ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = p[12];
      ctx.fillRect(Math.round(f.x - 1), Math.round(f.y - 1), 2, 2);
    }

    // 3. LED Arena Ribbon Board (y: 38..48)
    ctx.fillStyle = p[0];
    ctx.fillRect(0, 38, WIDTH, 10);
    ctx.fillStyle = p[15];
    ctx.fillRect(0, 38, WIDTH, 1);
    ctx.fillRect(0, 47, WIDTH, 1);

    const message = "  ★ MIAMI HEAT ★ HEAT CULTURE ★ KASEYA CENTER ★ DEFENSE! ★ LET'S GO HEAT! ★  ";
    ctx.fillStyle = p[3];
    ctx.font = 'bold 7px monospace';
    const msgW = ctx.measureText(message).width || 380;
    const ribbonX = -(this.ribbonScroll % msgW);
    ctx.fillText(message, ribbonX, 45);
    ctx.fillText(message, ribbonX + msgW, 45);

    // 4. Parquet Hardwood Basketball Court (y: 48..136)
    const courtY = 48;
    const courtH = HEIGHT - courtY;

    // Wood floor base
    ctx.fillStyle = p[5];
    ctx.fillRect(0, courtY, WIDTH, courtH);

    // Parquet horizontal wood plank strips
    const plankH = 6;
    for (let py = courtY; py < HEIGHT; py += plankH) {
      const plankIdx = Math.floor((py - courtY) / plankH);
      ctx.fillStyle = plankIdx % 2 === 0 ? p[6] : p[5];
      ctx.fillRect(0, py, WIDTH, plankH);

      const plankOffset = ((plankIdx * 37 - this.scrollX) % 32 + 32) % 32;
      ctx.fillStyle = p[0];
      for (let px = plankOffset; px < WIDTH; px += 32) {
        ctx.fillRect(px, py, 1, plankH);
      }
    }

    // Court Sideline Borders
    ctx.fillStyle = p[15];
    ctx.fillRect(0, courtY, WIDTH, 2);
    ctx.fillStyle = p[3];
    ctx.fillRect(0, courtY + 2, WIDTH, 1);

    // Scrolling Center Court Line & Miami Heat Flaming Ball Logo
    const logoX = ((360 - this.scrollX * 0.8) % 320 + 320) % 320 - 40;
    const logoY = 92;

    ctx.strokeStyle = p[12];
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.ellipse(logoX, logoY, 26, 14, 0, 0, Math.PI * 2);
    ctx.stroke();

    // Center Court Miami Heat Flaming Basketball Logo
    ctx.fillStyle = p[15];
    ctx.beginPath();
    ctx.moveTo(logoX - 18, logoY + 2);
    ctx.lineTo(logoX - 4, logoY - 10);
    ctx.lineTo(logoX + 12, logoY);
    ctx.lineTo(logoX - 2, logoY + 6);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = p[3];
    ctx.beginPath();
    ctx.moveTo(logoX - 12, logoY + 2);
    ctx.lineTo(logoX - 2, logoY - 6);
    ctx.lineTo(logoX + 8, logoY);
    ctx.closePath();
    ctx.fill();

    ctx.strokeStyle = p[12];
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.ellipse(logoX + 2, logoY, 9, 5, 0, 0, Math.PI * 2);
    ctx.stroke();
  }
}


/**
 * Radial anime focus lines radiating from a focal point (cxong/Dunkman `Focuslines`).
 */
export class Focuslines {
  constructor(fx = CENTERX, fy = CENTERY) {
    this.fx = fx;
    this.fy = fy;
    this.lines = [];
    for (let i = 0; i < 46; i++) {
      this.lines.push(this.createRay());
    }
  }

  createRay() {
    const angle = Math.random() * Math.PI * 2;
    return {
      dx: Math.cos(angle),
      dy: Math.sin(angle),
      r: 35 + Math.random() * 75,
      w: 1.5 + Math.random() * 3.5,
      speed: 2 + Math.random() * 3
    };
  }

  tick() {
    for (let i = 0; i < this.lines.length; i++) {
      this.lines[i].r -= this.lines[i].speed;
      if (this.lines[i].r < 18) {
        this.lines[i] = this.createRay();
      }
    }
  }

  draw(ctx, colorStr) {
    ctx.fillStyle = colorStr;
    for (const ray of this.lines) {
      const x1 = this.fx + ray.dx * ray.r;
      const y1 = this.fy + ray.dy * ray.r;
      const x2 = this.fx + ray.dx * 320;
      const y2 = this.fy + ray.dy * 320;
      const nx = -ray.dy * ray.w;
      const ny = ray.dx * ray.w;

      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2 + nx, y2 + ny);
      ctx.lineTo(x2 - nx, y2 - ny);
      ctx.closePath();
      ctx.fill();
    }
  }
}

/**
 * Defender Hand & Elliptical Swipe Archetypes from cxong/Dunkman (`Hand` & `HANDS1..3`).
 */
export class Hand {
  constructor({ cx, cy, w, h, theta, side = -1 }) {
    this.cx = cx;
    this.cy = cy;
    this.w = w;
    this.h = h;
    this.theta = theta;
    this.side = side; // -1: left defender, +1: right defender
    this.counter = 0;
  }

  getPos(counterOverride = this.counter) {
    const progress = Math.min(1, Math.max(0, counterOverride / Math.PI));
    const t = inoutquad(progress) * Math.PI;
    const x = Math.cos(this.theta + t) * this.w + this.cx;
    const y = Math.sin(this.theta + t) * this.h + this.cy;
    return { x, y };
  }

  tick(speed = 95) {
    this.counter += Math.PI / speed;
    return this.counter < Math.PI;
  }

  draw(ctx, palette) {
    // Defender body slides in with outback easing during first 20% of counter, slides out at end
    let slideT = 1;
    if (this.counter < 0.5) {
      slideT = outback(this.counter / 0.5);
    } else if (this.counter > Math.PI - 0.45) {
      slideT = Math.max(0, (Math.PI - this.counter) / 0.45);
    }

    const baseDefX = this.side === -1 ? 26 : WIDTH - 26;
    const offDefX = this.side === -1 ? -40 : WIDTH + 40;
    const defX = offDefX + (baseDefX - offDefX) * slideT;
    const defY = Math.max(36, Math.min(HEIGHT - 28, this.cy));

    SPRITES.drawDefenderTorso(ctx, palette, defX, defY, this.side);

    const shoulderX = defX + (this.side === -1 ? 10 : -10);
    const shoulderY = defY - 2;
    const pos = this.getPos();

    drawProceduralArm(ctx, palette, shoulderX, shoulderY, pos.x, pos.y, this.side);
  }
}

// Swipe pattern templates faithfully ported from cxong/Dunkman
const SWIPE_ARCHETYPES = {
  single: [
    { cx: CENTERX - 28, cy: CENTERY - 38, w: 62, h: 0, theta: Math.PI },
    { cx: CENTERX - 28, cy: CENTERY, w: 62, h: 0, theta: Math.PI }
  ],
  double: [
    { cx: CENTERX - 18, cy: CENTERY - 38, w: 78, h: 0, theta: Math.PI },
    { cx: CENTERX - 18, cy: CENTERY, w: 78, h: 0, theta: Math.PI },
    { cx: CENTERX - 26, cy: CENTERY - 18, w: 68, h: 48, theta: Math.PI * 0.75 }
  ],
  triple: [
    { cx: CENTERX - 18, cy: CENTERY, w: 78, h: HEIGHT / 2 - 4, theta: Math.PI },
    { cx: CENTERX - 28, cy: CENTERY, w: 60, h: HEIGHT / 2 - 4, theta: Math.PI * 0.5 }
  ]
};

function spawnArchetypeHand(tier = 'single') {
  const pool = SWIPE_ARCHETYPES[tier] || SWIPE_ARCHETYPES.single;
  const tpl = pool[Math.floor(Math.random() * pool.length)];
  let { cx, cy, w, h, theta } = tpl;
  let side = -1;

  // Randomly mirror horizontally (right-side defender)
  if (Math.random() < 0.5) {
    cx = WIDTH - cx;
    w = -w;
    side = 1;
  }
  // Randomly mirror vertically
  if (Math.random() < 0.5) {
    cy = HEIGHT - cy;
    h = -h;
  }

  return new Hand({ cx, cy, w, h, theta, side });
}

/**
 * Main Dunkman Game Engine (`WIDTH = 240`, `HEIGHT = 136`)
 */
export class DunkmanEngine {
  constructor(canvas = null, options = {}) {
    this.canvas = canvas;
    this.ctx = canvas ? canvas.getContext('2d') : null;
    if (this.canvas) {
      this.canvas.width = WIDTH;
      this.canvas.height = HEIGHT;
    }

    this.theme = options.theme || 'classic';
    this.palette = PALETTES[this.theme] || PALETTES.classic;
    this.audio = options.audio || new DunkmanAudio();
    this.onHudUpdate = options.onHudUpdate || null;

    this.arena = new PixelArena();
    this.speedlines = new Speedlines();
    this.focuslines = new Focuslines(CENTERX, 58);

    this.mode = options.mode || 'ATTRACT'; // 'ATTRACT' | 'PLAYER'
    this.state = 'GAME'; // 'CUTIN' | 'GAME' | 'HOOP' | 'SLAM' | 'LOSE'
    this.stateTicks = 0;
    this.ticks = 0;
    this.lives = 3;
    this.streak = 0;
    this.bestPercent = 0;
    this.hitCooldown = 0;

    // Ball & Procedural Player Arm Tracking
    this.ball = {
      x: CENTERX,
      y: CENTERY,
      startX: CENTERX,
      startY: CENTERY,
      targetX: CENTERX,
      targetY: CENTERY,
      lerpTicks: 8,
      angle: 0,
      lax: CENTERX - 18,
      lay: CENTERY + 16,
      rax: CENTERX + 18,
      ray: CENTERY + 16
    };

    this.inputDir = { dx: 0, dy: 0 };
    this.hands = [];
    this.spawnCooldown = 25;
  }

  setPalette(themeName) {
    if (PALETTES[themeName]) {
      this.theme = themeName;
      this.palette = PALETTES[themeName];
    }
  }

  resetBall() {
    this.ball.x = CENTERX;
    this.ball.y = CENTERY;
    this.ball.startX = CENTERX;
    this.ball.startY = CENTERY;
    this.ball.targetX = CENTERX;
    this.ball.targetY = CENTERY;
    this.ball.lerpTicks = 8;
    this.ball.lax = CENTERX - 18;
    this.ball.lay = CENTERY + 16;
    this.ball.rax = CENTERX + 18;
    this.ball.ray = CENTERY + 16;
  }

  startPlayerGame(withCutIn = true) {
    this.mode = 'PLAYER';
    this.lives = 3;
    this.ticks = 0;
    this.hitCooldown = 0;
    this.hands = [];
    this.spawnCooldown = 35;
    this.resetBall();

    if (withCutIn) {
      this.state = 'CUTIN';
      this.stateTicks = 0;
      this.focuslines = new Focuslines(CENTERX, 58);
      this.audio.playCutIn();
    } else {
      this.state = 'GAME';
      this.stateTicks = 0;
    }
    this.emitHud();
  }

  startAttractMode() {
    this.mode = 'ATTRACT';
    this.lives = 3;
    this.ticks = 0;
    this.hitCooldown = 0;
    this.hands = [];
    this.spawnCooldown = 25;
    this.state = 'GAME';
    this.stateTicks = 0;
    this.resetBall();
    this.emitHud();
  }

  setInputDirection(dx, dy, fromPlayer = true) {
    if (fromPlayer && this.mode === 'ATTRACT') {
      this.startPlayerGame(false);
    }

    let ndx = dx;
    let ndy = dy;
    const len = Math.hypot(ndx, ndy);
    if (len > 0.01) {
      ndx /= len;
      ndy /= len;
    } else {
      ndx = 0;
      ndy = 0;
    }

    const nextTargetX = CENTERX + ndx * GUARD_RADIUS;
    const nextTargetY = CENTERY + ndy * GUARD_RADIUS;

    if (
      Math.abs(nextTargetX - this.ball.targetX) > 1 ||
      Math.abs(nextTargetY - this.ball.targetY) > 1
    ) {
      this.ball.startX = this.ball.x;
      this.ball.startY = this.ball.y;
      this.ball.targetX = nextTargetX;
      this.ball.targetY = nextTargetY;
      this.ball.lerpTicks = 0;
      if (fromPlayer && this.state === 'GAME') {
        this.audio.playMove();
      }
    }
  }

  /**
   * Converts normalized (0..1) pointer coordinates on the canvas into one of the 8 octants or center.
   */
  setPointerPos(normX, normY) {
    const px = normX * WIDTH - CENTERX;
    const py = normY * HEIGHT - CENTERY;
    const dist = Math.hypot(px, py);

    if (dist < 14) {
      this.setInputDirection(0, 0, true);
      return;
    }

    // Snap angle to nearest 45-degree octant
    const angle = Math.atan2(py, px);
    const octant = Math.round(angle / (Math.PI / 4)) * (Math.PI / 4);
    this.setInputDirection(Math.cos(octant), Math.sin(octant), true);
  }

  /**
   * Idle AI Attract Mode: Evaluates the 9 guard positions (center + 8 octants)
   * against incoming defender hand positions over the next 15 ticks and picks the safest spot.
   */
  updateAttractAI() {
    if (this.ticks % 10 !== 0) return;

    const candidates = [{ dx: 0, dy: 0 }];
    for (let i = 0; i < 8; i++) {
      const a = (i * Math.PI) / 4;
      candidates.push({ dx: Math.cos(a), dy: Math.sin(a) });
    }

    let bestCandidate = candidates[0];
    let bestScore = -Infinity;

    for (const cand of candidates) {
      const cx = CENTERX + cand.dx * GUARD_RADIUS;
      const cy = CENTERY + cand.dy * GUARD_RADIUS;
      let minHandDist = 999;

      for (const hand of this.hands) {
        const nowPos = hand.getPos();
        const futurePos = hand.getPos(hand.counter + 0.32);
        const d1 = Math.hypot(cx - nowPos.x, cy - nowPos.y);
        const d2 = Math.hypot(cx - futurePos.x, cy - futurePos.y);
        minHandDist = Math.min(minHandDist, d1, d2);
      }

      // Slight movement variety when no hands are close
      const varietyBonus =
        this.hands.length === 0
          ? Math.sin(this.ticks * 0.05 + cand.dx * 2 + cand.dy * 3) * 8
          : 0;
      const score = minHandDist + varietyBonus;
      if (score > bestScore) {
        bestScore = score;
        bestCandidate = cand;
      }
    }

    this.setInputDirection(bestCandidate.dx, bestCandidate.dy, false);
  }

  spawnWave() {
    const progress = this.ticks / FAST_BREAK_TICKS;
    if (progress < 0.25) {
      this.hands.push(spawnArchetypeHand('single'));
    } else if (progress < 0.55) {
      this.hands.push(spawnArchetypeHand('double'));
      if (Math.random() < 0.45) this.hands.push(spawnArchetypeHand('single'));
    } else if (progress < 0.8) {
      this.hands.push(spawnArchetypeHand('triple'));
      this.hands.push(spawnArchetypeHand('single'));
    } else {
      this.hands.push(spawnArchetypeHand('triple'));
      this.hands.push(spawnArchetypeHand('double'));
    }
  }

  step() {
    this.stateTicks += 1;

    if (this.state === 'CUTIN') {
      this.focuslines.tick();
      if (this.stateTicks >= 95) {
        this.state = 'GAME';
        this.stateTicks = 0;
      }
      this.render();
      this.emitHud();
      return;
    }

    if (this.state === 'HOOP') {
      this.focuslines.tick();
      if (this.stateTicks >= 120) {
        this.state = 'SLAM';
        this.stateTicks = 0;
        this.streak += 1;
        this.focuslines = new Focuslines(105, 86);
        this.audio.playSlam();
      }
      this.render();
      this.emitHud();
      return;
    }

    if (this.state === 'SLAM') {
      this.focuslines.tick();
      if (this.stateTicks >= 130) {
        if (this.mode === 'ATTRACT') {
          this.startAttractMode();
        } else {
          // Start next quarter / fast-break while keeping streak!
          this.ticks = 0;
          this.hands = [];
          this.state = 'GAME';
          this.stateTicks = 0;
        }
      }
      this.render();
      this.emitHud();
      return;
    }

    if (this.state === 'LOSE') {
      if (this.stateTicks >= 120) {
        if (this.mode === 'ATTRACT') {
          this.startAttractMode();
        } else {
          this.startPlayerGame(false);
        }
      }
      this.render();
      this.emitHud();
      return;
    }

    // Main 'GAME' state
    this.ticks += 1;
    this.arena.tick();
    this.speedlines.tick();

    if (this.mode === 'ATTRACT') {
      this.updateAttractAI();
    }

    // Interpolate ball position (LERP = 8 frames with outquad)
    if (this.ball.lerpTicks < 8) {
      this.ball.lerpTicks += 1;
      const t = outquad(this.ball.lerpTicks / 8);
      this.ball.x = this.ball.startX + (this.ball.targetX - this.ball.startX) * t;
      this.ball.y = this.ball.startY + (this.ball.targetY - this.ball.startY) * t;
    } else {
      this.ball.x = this.ball.targetX;
      this.ball.y = this.ball.targetY;
    }
    this.ball.angle += 0.11;

    // Smooth-follow player's left and right hands toward the ball (from dunkman.moon Ball.tick)
    const leftTargetX =
      this.ball.x > CENTERX + 20 ? CENTERX - 24 : this.ball.x - 10;
    const leftTargetY =
      this.ball.x > CENTERX + 20 ? CENTERY + 18 : this.ball.y + 4;
    const rightTargetX =
      this.ball.x < CENTERX - 20 ? CENTERX + 26 : this.ball.x + 10;
    const rightTargetY =
      this.ball.x < CENTERX - 20 ? CENTERY + 20 : this.ball.y + 4;

    this.ball.lax += (leftTargetX - this.ball.lax) * 0.35;
    this.ball.lay += (leftTargetY - this.ball.lay) * 0.35;
    this.ball.rax += (rightTargetX - this.ball.rax) * 0.35;
    this.ball.ray += (rightTargetY - this.ball.ray) * 0.35;

    // Spawn & update defender hands
    this.spawnCooldown -= 1;
    if (this.spawnCooldown <= 0) {
      this.spawnWave();
      const progress = this.ticks / FAST_BREAK_TICKS;
      this.spawnCooldown = Math.max(38, Math.round(78 - progress * 28));
    }

    const swipeSpeed = Math.max(58, Math.round(92 - (this.ticks / FAST_BREAK_TICKS) * 24));
    const remainingHands = [];

    for (const hand of this.hands) {
      const alive = hand.tick(swipeSpeed);
      if (alive) {
        remainingHands.push(hand);
        if (this.hitCooldown === 0) {
          const pos = hand.getPos();
          const dist = Math.hypot(pos.x - this.ball.x, pos.y - this.ball.y);
          if (dist < COLRADIUS * 2) {
            if (this.mode === 'ATTRACT') {
              // In attract mode, trigger brief flash without dying so banner stays hype
              this.hitCooldown = 30;
            } else {
              this.lives = Math.max(0, this.lives - 1);
              this.hitCooldown = HIT_INVULN_TICKS;
              this.audio.playHit();
              if (this.lives <= 0) {
                this.state = 'LOSE';
                this.stateTicks = 0;
                this.streak = 0;
                this.audio.playLose();
              }
            }
          }
        }
      }
    }
    this.hands = remainingHands;

    if (this.hitCooldown > 0) {
      this.hitCooldown -= 1;
    }

    const pct = Math.min(100, (this.ticks / FAST_BREAK_TICKS) * 100);
    if (pct > this.bestPercent) {
      this.bestPercent = pct;
    }

    // Check if player reached 100.0% DUNKING!
    if (this.ticks >= FAST_BREAK_TICKS) {
      this.state = 'HOOP';
      this.stateTicks = 0;
      this.focuslines = new Focuslines(180, 48);
      this.audio.playCutIn();
    }

    this.render();
    this.emitHud();
  }

  getDunkingPercent() {
    if (this.state === 'HOOP' || this.state === 'SLAM') return 100;
    return Math.min(100, (this.ticks / FAST_BREAK_TICKS) * 100);
  }

  emitHud() {
    if (typeof this.onHudUpdate === 'function') {
      this.onHudUpdate({
        mode: this.mode,
        state: this.state,
        lives: this.lives,
        streak: this.streak,
        percent: this.getDunkingPercent(),
        bestPercent: this.bestPercent,
        theme: this.theme
      });
    }
  }

  render() {
    if (!this.ctx) return;
    const ctx = this.ctx;
    const p = this.palette;

    ctx.save();

    if (this.state === 'CUTIN') {
      ctx.fillStyle = p[0];
      ctx.fillRect(0, 0, WIDTH, HEIGHT);
      const sx = (Math.random() - 0.5) * 3;
      const sy = (Math.random() - 0.5) * 3;
      SPRITES.drawCutInBanner(ctx, p, this.focuslines, sx, sy);

      ctx.fillStyle = p[11];
      ctx.font = 'bold 8px monospace';
      ctx.fillText('"I AM DYLE #3 — THE DUNKMAN!!!"', 18, 102);
      ctx.fillStyle = p[12];
      ctx.font = '7px monospace';
      ctx.fillText('PROTECT THE ROCK FOR 25 SECONDS!', 18, 116);
      ctx.restore();
      return;
    }

    if (this.state === 'HOOP') {
      // Dramatic slow-motion white-on-black radial focus lines jump toward hoop (HoopState)
      ctx.fillStyle = p[0];
      ctx.fillRect(0, 0, WIDTH, HEIGHT);
      this.focuslines.draw(ctx, p[12]);
      SPRITES.drawHoop(ctx, p, 0, 0);

      const jumpX = 64 + (this.stateTicks / 120) * 76;
      const jumpY = 98 - Math.sin((this.stateTicks / 120) * Math.PI * 0.75) * 44;
      SPRITES.drawJumpPlayer(ctx, p, jumpX, jumpY);

      ctx.fillStyle = p[3];
      ctx.font = 'bold 8px monospace';
      ctx.fillText('ELEVATING FOR THE HAMMER...', 12, 16);
      ctx.restore();
      return;
    }

    if (this.state === 'SLAM') {
      // Close-up slam dunk impact frame with radial lines and camera shake (SlamState)
      ctx.fillStyle = p[0];
      ctx.fillRect(0, 0, WIDTH, HEIGHT);
      this.focuslines.draw(ctx, p[3]);

      const Decay = Math.max(0, 1 - this.stateTicks / 60);
      const sx = (Math.random() - 0.5) * 8 * Decay;
      const sy = (Math.random() - 0.5) * 8 * Decay;
      SPRITES.drawSlamFrame(ctx, p, sx, sy);

      // Banner overlay
      ctx.fillStyle = p[0];
      ctx.fillRect(8, 8, 168, 22);
      ctx.strokeStyle = p[3];
      ctx.strokeRect(8, 8, 168, 22);
      ctx.fillStyle = p[4];
      ctx.font = 'bold 9px monospace';
      ctx.fillText('KABOOM!! SLAM DUNK! +2 PTS', 14, 22);
      ctx.restore();
      return;
    }

    if (this.state === 'LOSE') {
      // Yamcha defeated spotlight pose on black court (LoseState)
      ctx.fillStyle = p[0];
      ctx.fillRect(0, 0, WIDTH, HEIGHT);
      SPRITES.drawLoseFrame(ctx, p);

      ctx.fillStyle = p[12];
      ctx.font = 'bold 8px monospace';
      ctx.fillText('TURNOVER! STOLEN AT THE BUZZER', 14, 114);
      ctx.fillStyle = p[3];
      ctx.font = '7px monospace';
      ctx.fillText('CLICK PLAY OR PRESS SPACE TO RUN IT BACK', 14, 126);
      ctx.restore();
      return;
    }

    // Render 'GAME' State with Retro Miami Heat Arena Background
    this.arena.draw(ctx, p);
    this.speedlines.drawStreaks(ctx, p);

    // 2-frame running torso animation toggling every 10 ticks
    const runFrame = Math.floor(this.ticks / 10) % 2;
    SPRITES.drawPlayerTorso(ctx, p, runFrame, 0, 0);

    // Draw defenders and their sweeping procedural arms
    for (const hand of this.hands) {
      hand.draw(ctx, p);
    }

    // Draw Dyle's procedural 2-segment left & right arms attached to shoulders (106, 70) and (138, 77)
    drawProceduralArm(ctx, p, 106, 70, this.ball.lax, this.ball.lay, 1);
    drawProceduralArm(ctx, p, 138, 77, this.ball.rax, this.ball.ray, -1);

    // Draw spinning basketball (flashes during hit invulnerability)
    const flashBall = this.hitCooldown > 0 && Math.floor(this.hitCooldown / 3) % 2 === 0;
    SPRITES.drawBasketball(ctx, p, this.ball.x, this.ball.y, this.ball.angle, flashBall);

    // Top-center HUD: DUNKING: xx.x%
    const pctStr = `DUNKING: ${this.getDunkingPercent().toFixed(1)}%`;
    ctx.font = 'bold 8px monospace';
    ctx.fillStyle = p[0];
    ctx.fillText(pctStr, 81, 13);
    ctx.fillStyle = p[12];
    ctx.fillText(pctStr, 80, 12);

    // Bottom-left HUD: LIVES: x
    const flashLives = this.hitCooldown > 0 && Math.floor(this.hitCooldown / 4) % 2 === 0;
    const livesStr = `LIVES: ${this.lives}`;
    ctx.fillStyle = p[0];
    ctx.fillText(livesStr, 11, HEIGHT - 7);
    ctx.fillStyle = flashLives ? p[15] : p[12];
    ctx.fillText(livesStr, 10, HEIGHT - 8);

    // Bottom-right Mode indicator
    const modeTag = this.mode === 'ATTRACT' ? 'AI DEMO [MOVE TO PLAY]' : `STREAK: ${this.streak}`;
    ctx.font = '7px monospace';
    ctx.fillStyle = p[0];
    ctx.fillText(modeTag, WIDTH - 109, HEIGHT - 7);
    ctx.fillStyle = this.mode === 'ATTRACT' ? p[4] : p[11];
    ctx.fillText(modeTag, WIDTH - 110, HEIGHT - 8);

    ctx.restore();
  }
}
