// Native TIC-80 resolution used by cxong/Dunkman
export const WIDTH = 240;
export const HEIGHT = 136;

/**
 * 16-Color Indexed Palettes modeled after cxong/Dunkman's TIC-80 palette:
 *  0: Black / Outline
 *  1: Outer Speedline Band 2 (Deep Flame Red / Deep Magenta)
 *  2: Mid Speedline Band 3 (Blaze Orange / Electric Violet)
 *  3: Inner Speedline Band 4 (Championship Gold / Neon Cyan-Blue)
 *  4: Center Speedline Core (Bright Yellow / Laser Aqua)
 *  5: Basketball Base / Court Hardwood (Rich Orange-Brown / Neon Coral)
 *  6: Skin Shadow / Tan
 *  7: Skin Fill / Peach (ARMFILLC = 7)
 *  8: Accent Dark (Deep Red / Deep Indigo)
 *  9: Secondary Trim (Championship Gold / Vice Pink)
 * 10: Hair / Highlight Primary (Flame Red-Gold / Vice Cyan)
 * 11: Hair / Text Cyan-Gold Highlight (Championship Gold / Bright Cyan)
 * 12: Jersey Primary White (#f4f4f4)
 * 13: Light Grey / Netting (#a3a3a3)
 * 14: Dark Grey / Backboard Strut (#525252)
 * 15: Outer Edge Band 1 / Rim / Defender Jersey (Miami Heat Red #98002E / Vice Pink #F9429E)
 */
export const PALETTES = {
  classic: [
    '#070709', // 0: Black outline
    '#c41e3a', // 1: Flame Crimson
    '#e45c00', // 2: Heat Blaze Orange
    '#f9a01b', // 3: Championship Gold
    '#ffe642', // 4: Bright Arena Yellow
    '#d9531e', // 5: Basketball Orange
    '#d98254', // 6: Skin Shadow
    '#f7b88e', // 7: Skin Peach (ARMFILLC)
    '#5e001b', // 8: Dark Heat Maroon
    '#f9a01b', // 9: Gold Jersey Trim
    '#ff2a55', // 10: Fiery Red Hair Highlight
    '#ffd166', // 11: Gold-White Hair / HUD Accent
    '#f4f4f4', // 12: Home Jersey Crisp White
    '#b0b4be', // 13: Net Light Grey
    '#525663', // 14: Backboard Dark Grey
    '#98002e'  // 15: Official Miami Heat Flame Red
  ],
  vice: [
    '#05060f', // 0: Midnight Outline
    '#b5179e', // 1: Deep Vice Magenta
    '#7209b7', // 2: Neon Ultra Violet
    '#00b2a9', // 3: Official Miami Vice Cyan
    '#73eff7', // 4: Laser Vice Aqua
    '#ff3d8b', // 5: Neon Vice Basketball Pink-Orange
    '#d98254', // 6: Skin Shadow
    '#f7b88e', // 7: Skin Peach (ARMFILLC)
    '#1f1147', // 8: Deep Synth Indigo
    '#f9429e', // 9: Vice Sunset Pink Trim
    '#00b2a9', // 10: Vice Cyan Hair Base
    '#73eff7', // 11: Electric Cyan Hair / HUD Accent
    '#f4f4f4', // 12: Crisp White Jersey
    '#a5b4fc', // 13: Net Ice Grey
    '#475569', // 14: Backboard Slate
    '#f9429e'  // 15: Official Miami Vice Neon Pink
  ]
};

function pxRect(ctx, x, y, w, h, color) {
  ctx.fillStyle = color;
  ctx.fillRect(Math.round(x), Math.round(y), Math.round(w), Math.round(h));
}

function drawPolygon(ctx, points, fillColor, strokeColor = null) {
  if (!points.length) return;
  ctx.beginPath();
  ctx.moveTo(Math.round(points[0][0]), Math.round(points[0][1]));
  for (let i = 1; i < points.length; i++) {
    ctx.lineTo(Math.round(points[i][0]), Math.round(points[i][1]));
  }
  ctx.closePath();
  if (fillColor) {
    ctx.fillStyle = fillColor;
    ctx.fill();
  }
  if (strokeColor) {
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = 1;
    ctx.stroke();
  }
}

export const SPRITES = {
  /**
   * Renders the protagonist (Dyle #3 in Miami Heat jersey) running forward in the center of the 240x136 canvas.
   * Shoulders are positioned at Left (106, 70) and Right (138, 77) to match cxong/Dunkman's procedural IK arms.
   */
  drawPlayerTorso(ctx, palette, frameIndex = 0, offsetX = 0, offsetY = 0) {
    const ox = Math.round(offsetX);
    const oy = Math.round(offsetY);
    const bob = frameIndex % 2 === 0 ? 0 : 2;
    const legShift = frameIndex % 2 === 0 ? 0 : 4;

    // Legs & Shoes (bottom of screen y: 112..136)
    // Left leg stepping forward/back
    drawPolygon(
      ctx,
      [
        [98 + ox, 114 + oy + bob],
        [110 + ox, 116 + oy + bob],
        [102 + ox - legShift, 135 + oy],
        [90 + ox - legShift, 135 + oy]
      ],
      palette[7],
      palette[0]
    );
    // Right leg stepping
    drawPolygon(
      ctx,
      [
        [126 + ox, 114 + oy + bob],
        [138 + ox, 114 + oy + bob],
        [146 + ox + legShift, 135 + oy],
        [134 + ox + legShift, 135 + oy]
      ],
      palette[7],
      palette[0]
    );

    // Basketball Shorts (White with Miami Heat Red & Gold side stripes)
    drawPolygon(
      ctx,
      [
        [102 + ox, 96 + oy + bob],
        [134 + ox, 98 + oy + bob],
        [142 + ox, 118 + oy + bob],
        [122 + ox, 120 + oy + bob],
        [118 + ox, 110 + oy + bob],
        [112 + ox, 120 + oy + bob],
        [94 + ox, 116 + oy + bob]
      ],
      palette[12],
      palette[0]
    );
    // Heat side stripe on shorts
    pxRect(ctx, 97 + ox, 100 + oy + bob, 4, 15, palette[15]);
    pxRect(ctx, 134 + ox, 100 + oy + bob, 4, 15, palette[9]);

    // Torso / Miami Heat Jersey (armless so procedural arms attach cleanly at (106,70) and (138,77))
    drawPolygon(
      ctx,
      [
        [105 + ox, 64 + oy + bob],
        [139 + ox, 68 + oy + bob],
        [134 + ox, 99 + oy + bob],
        [102 + ox, 97 + oy + bob]
      ],
      palette[12],
      palette[0]
    );

    // Jersey V-neck collar & armhole trim in Heat Flame Red + Gold
    pxRect(ctx, 114 + ox, 65 + oy + bob, 14, 3, palette[15]);
    pxRect(ctx, 116 + ox, 68 + oy + bob, 10, 2, palette[9]);

    // Mini "HEAT" chest wordmark (pixel blocks)
    pxRect(ctx, 111 + ox, 73 + oy + bob, 18, 2, palette[15]);
    pxRect(ctx, 113 + ox, 76 + oy + bob, 14, 1, palette[9]);

    // Iconic #3 Jersey Number on torso
    ctx.fillStyle = palette[15];
    pxRect(ctx, 116 + ox, 79 + oy + bob, 10, 2, palette[15]);
    pxRect(ctx, 123 + ox, 81 + oy + bob, 3, 4, palette[15]);
    pxRect(ctx, 117 + ox, 84 + oy + bob, 9, 2, palette[15]);
    pxRect(ctx, 123 + ox, 86 + oy + bob, 3, 5, palette[15]);
    pxRect(ctx, 116 + ox, 90 + oy + bob, 10, 2, palette[15]);
    // Gold drop-shadow pixel on #3
    pxRect(ctx, 126 + ox, 80 + oy + bob, 1, 12, palette[9]);

    // Neck & Head (leaning forward in intense anime sprint)
    pxRect(ctx, 118 + ox, 56 + oy + bob, 10, 10, palette[6]);
    drawPolygon(
      ctx,
      [
        [114 + ox, 38 + oy + bob],
        [135 + ox, 40 + oy + bob],
        [136 + ox, 58 + oy + bob],
        [116 + ox, 59 + oy + bob]
      ],
      palette[7],
      palette[0]
    );

    // Headband (Miami Heat Red & Gold)
    pxRect(ctx, 114 + ox, 41 + oy + bob, 22, 3, palette[15]);
    pxRect(ctx, 114 + ox, 44 + oy + bob, 22, 1, palette[9]);

    // Intense Anime Eyes & Gritted Teeth
    pxRect(ctx, 123 + ox, 46 + oy + bob, 4, 2, palette[0]);
    pxRect(ctx, 130 + ox, 46 + oy + bob, 4, 2, palette[0]);
    pxRect(ctx, 124 + ox, 47 + oy + bob, 2, 1, palette[12]);
    pxRect(ctx, 131 + ox, 47 + oy + bob, 2, 1, palette[12]);
    // Gritted teeth mouth
    pxRect(ctx, 124 + ox, 53 + oy + bob, 9, 3, palette[0]);
    pxRect(ctx, 125 + ox, 54 + oy + bob, 7, 1, palette[12]);

    // Spiky Shonen Hair (Suzuki / Dunkman silhouette)
    drawPolygon(
      ctx,
      [
        [110 + ox, 42 + oy + bob],
        [106 + ox, 33 + oy + bob],
        [115 + ox, 35 + oy + bob],
        [117 + ox, 26 + oy + bob],
        [123 + ox, 34 + oy + bob],
        [129 + ox, 25 + oy + bob],
        [132 + ox, 34 + oy + bob],
        [140 + ox, 30 + oy + bob],
        [136 + ox, 41 + oy + bob]
      ],
      palette[11],
      palette[0]
    );
    // Hair inner highlight
    pxRect(ctx, 118 + ox, 35 + oy + bob, 12, 4, palette[10]);
  },

  /**
   * Draws an opposing defender sliding in from the left or right edge.
   * Just like cxong/Dunkman, one shoulder attaches to the sweeping procedural arm.
   */
  drawDefenderTorso(ctx, palette, x, y, side = -1) {
    const rx = Math.round(x);
    const ry = Math.round(y);
    ctx.save();
    ctx.translate(rx, ry);
    if (side === 1) {
      ctx.scale(-1, 1);
    }

    // Defender back arm (static bent arm)
    drawPolygon(
      ctx,
      [
        [-16, -2],
        [-28, 12],
        [-22, 26],
        [-15, 24],
        [-19, 13],
        [-10, 4]
      ],
      palette[6],
      palette[0]
    );

    // Defender Jersey Torso (Rival Crimson/Dark Jersey)
    drawPolygon(
      ctx,
      [
        [-16, -4],
        [14, -4],
        [12, 32],
        [-18, 32]
      ],
      palette[1],
      palette[0]
    );
    // Jersey collar trim
    pxRect(ctx, -8, -4, 14, 3, palette[0]);
    pxRect(ctx, -5, 6, 8, 12, palette[12]);

    // Defender Head & Flat-top retro anime hair
    drawPolygon(
      ctx,
      [
        [-8, -24],
        [10, -24],
        [11, -5],
        [-7, -5]
      ],
      palette[6],
      palette[0]
    );
    // Hair
    pxRect(ctx, -10, -31, 21, 8, palette[0]);
    // Scowling brow & gritted teeth
    pxRect(ctx, -2, -18, 10, 2, palette[0]);
    pxRect(ctx, 0, -11, 8, 3, palette[12]);
    pxRect(ctx, 0, -12, 8, 1, palette[0]);

    ctx.restore();
  },

  /**
   * Draws the 32x32 rotating pixel-art basketball with authentic seams.
   */
  drawBasketball(ctx, palette, x, y, angle = 0, flash = false) {
    const radius = 14;
    ctx.save();
    ctx.translate(Math.round(x), Math.round(y));
    ctx.rotate(angle);

    // Outer black border
    ctx.beginPath();
    ctx.arc(0, 0, radius + 1.5, 0, Math.PI * 2);
    ctx.fillStyle = palette[0];
    ctx.fill();

    // Basketball body fill
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, Math.PI * 2);
    ctx.fillStyle = flash ? palette[12] : palette[5];
    ctx.fill();

    // Top-left specular highlight
    ctx.beginPath();
    ctx.arc(-4, -4, 5, 0, Math.PI * 2);
    ctx.fillStyle = flash ? palette[4] : palette[3];
    ctx.fill();

    // Basketball seams (cross + curved ribs)
    ctx.strokeStyle = palette[0];
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(-radius, 0);
    ctx.lineTo(radius, 0);
    ctx.moveTo(0, -radius);
    ctx.lineTo(0, radius);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(-9, 0, 10, -Math.PI * 0.42, Math.PI * 0.42);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(9, 0, 10, Math.PI * 0.58, Math.PI * 1.42);
    ctx.stroke();

    ctx.restore();
  },

  /**
   * Draws the basketball backboard, support struts, rim, and pixel net (board.png in cxong/Dunkman).
   */
  drawHoop(ctx, palette, offsetX = 0, offsetY = 0) {
    const ox = Math.round(offsetX);
    const oy = Math.round(offsetY);

    // Support frame strut on right side (x: 205..240)
    ctx.strokeStyle = palette[14];
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(212 + ox, 2 + oy);
    ctx.lineTo(212 + ox, 54 + oy);
    ctx.lineTo(240 + ox, 54 + oy);
    ctx.moveTo(212 + ox, 6 + oy);
    ctx.lineTo(240 + ox, 62 + oy);
    ctx.stroke();

    // Backboard vertical pillar
    pxRect(ctx, 206 + ox, 2 + oy, 6, 54, palette[13]);
    pxRect(ctx, 205 + ox, 2 + oy, 1, 54, palette[0]);

    // Rim bracket & red/pink breakaway rim
    pxRect(ctx, 162 + ox, 44 + oy, 44, 4, palette[15]);
    pxRect(ctx, 196 + ox, 47 + oy, 10, 4, palette[15]);

    // Crisscross pixel net
    ctx.strokeStyle = palette[13];
    ctx.lineWidth = 1;
    for (let i = 0; i <= 5; i++) {
      const topX = 164 + ox + i * 6;
      const botX = 168 + ox + i * 4.2;
      ctx.beginPath();
      ctx.moveTo(topX, 48 + oy);
      ctx.lineTo(botX, 74 + oy);
      ctx.stroke();

      if (i < 5) {
        ctx.beginPath();
        ctx.moveTo(topX + 6, 48 + oy);
        ctx.lineTo(botX, 74 + oy);
        ctx.stroke();
      }
    }
  },

  /**
   * Draws Dyle #3 soaring mid-air one-handed toward the rim (pend.png in HoopState).
   */
  drawJumpPlayer(ctx, palette, x, y) {
    const rx = Math.round(x);
    const ry = Math.round(y);
    ctx.save();
    ctx.translate(rx, ry);

    // Basketball held high in raised right hand
    this.drawBasketball(ctx, palette, 28, -28, 0.35, false);

    // Raised right arm reaching for the rim
    drawPolygon(
      ctx,
      [
        [10, -2],
        [24, -24],
        [30, -20],
        [16, 4]
      ],
      palette[7],
      palette[0]
    );

    // Trailing left arm
    drawPolygon(
      ctx,
      [
        [-8, 2],
        [-18, 16],
        [-13, 28],
        [-7, 25],
        [-11, 16],
        [-2, 6]
      ],
      palette[7],
      palette[0]
    );

    // Airborne legs (leaping knee drive)
    drawPolygon(
      ctx,
      [
        [-8, 36],
        [-20, 52],
        [-12, 56],
        [0, 40]
      ],
      palette[7],
      palette[0]
    );
    drawPolygon(
      ctx,
      [
        [8, 34],
        [22, 44],
        [14, 58],
        [8, 55],
        [13, 45],
        [2, 38]
      ],
      palette[7],
      palette[0]
    );

    // Shorts & Jersey in side-profile leap
    drawPolygon(
      ctx,
      [
        [-10, 22],
        [12, 22],
        [16, 38],
        [-12, 38]
      ],
      palette[12],
      palette[0]
    );
    pxRect(ctx, -2, 24, 4, 13, palette[15]);

    drawPolygon(
      ctx,
      [
        [-8, -4],
        [12, -2],
        [11, 23],
        [-9, 23]
      ],
      palette[12],
      palette[0]
    );
    pxRect(ctx, 2, 5, 6, 10, palette[15]);

    // Head & Spiky Hair looking up at the rim
    drawPolygon(
      ctx,
      [
        [-4, -20],
        [10, -20],
        [11, -5],
        [-3, -5]
      ],
      palette[7],
      palette[0]
    );
    pxRect(ctx, -4, -17, 14, 2, palette[15]);
    drawPolygon(
      ctx,
      [
        [-10, -18],
        [-14, -26],
        [-5, -24],
        [-2, -31],
        [5, -24],
        [10, -29],
        [8, -18]
      ],
      palette[11],
      palette[0]
    );

    ctx.restore();
  },

  /**
   * Draws the dramatic close-up slam dunk frame (slam.png in SlamState).
   */
  drawSlamFrame(ctx, palette, shakeX = 0, shakeY = 0) {
    const sx = Math.round(shakeX);
    const sy = Math.round(shakeY);

    // Giant close-up basketball being stuffed through the cylinder
    ctx.save();
    ctx.translate(105 + sx, 108 + sy);
    ctx.beginPath();
    ctx.arc(0, 0, 38, 0, Math.PI * 2);
    ctx.fillStyle = palette[5];
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = palette[0];
    ctx.stroke();

    // Close-up basketball seams
    ctx.strokeStyle = palette[3];
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(10, 0, 34, -Math.PI * 0.5, Math.PI * 0.5);
    ctx.moveTo(-36, -6);
    ctx.lineTo(36, 8);
    ctx.moveTo(-12, -36);
    ctx.lineTo(8, 36);
    ctx.stroke();
    ctx.restore();

    // Forearm & Hand gripping the rim from left (slam.png exact composition)
    drawPolygon(
      ctx,
      [
        [0 + sx, 114 + sy],
        [24 + sx, 68 + sy],
        [68 + sx, 60 + sy],
        [98 + sx, 67 + sy],
        [64 + sx, 76 + sy],
        [36 + sx, 85 + sy],
        [14 + sx, 136 + sy],
        [0 + sx, 136 + sy]
      ],
      palette[7],
      palette[0]
    );

    // Heavy close-up angled Rim & Bracket
    drawPolygon(
      ctx,
      [
        [46 + sx, 76 + sy],
        [168 + sx, 59 + sy],
        [170 + sx, 66 + sy],
        [48 + sx, 83 + sy]
      ],
      palette[15],
      palette[0]
    );
    // Right rim mounting bars
    ctx.strokeStyle = palette[15];
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(168 + sx, 62 + sy);
    ctx.lineTo(240 + sx, 62 + sy);
    ctx.moveTo(168 + sx, 65 + sy);
    ctx.lineTo(240 + sx, 90 + sy);
    ctx.stroke();

    // Stretched Dynamic Netting over the slammed ball
    ctx.strokeStyle = palette[13];
    ctx.lineWidth = 1.2;
    for (let i = 0; i <= 6; i++) {
      const rx = 54 + sx + i * 18;
      const ry = 81 + sy - i * 2.5;
      ctx.beginPath();
      ctx.moveTo(rx, ry);
      ctx.lineTo(rx + 14, 136 + sy);
      ctx.moveTo(rx + 14, ry - 2);
      ctx.lineTo(rx - 8, 136 + sy);
      ctx.stroke();
    }
  },

  /**
   * Draws the Yamcha-parody defeated spotlight pose (lose.png in LoseState).
   */
  drawLoseFrame(ctx, palette) {
    // White spotlight oval in center of pitch-black court
    ctx.save();
    ctx.translate(120, 68);
    ctx.scale(1.45, 0.88);
    ctx.beginPath();
    ctx.arc(0, 0, 42, 0, Math.PI * 2);
    ctx.fillStyle = palette[12];
    ctx.fill();
    ctx.restore();

    // Defeated player crumpled inside the spotlight
    // Legs
    drawPolygon(ctx, [[108, 68], [92, 82], [96, 87], [114, 73]], palette[7], palette[0]);
    drawPolygon(ctx, [[118, 74], [105, 92], [111, 95], [125, 78]], palette[7], palette[0]);
    // Shoes
    pxRect(ctx, 88, 81, 6, 7, palette[0]);
    pxRect(ctx, 101, 90, 6, 7, palette[0]);
    // Shorts & #3 Jersey back
    drawPolygon(ctx, [[110, 62], [126, 54], [134, 68], [116, 76]], palette[12], palette[0]);
    drawPolygon(ctx, [[122, 52], [140, 46], [146, 58], [128, 66]], palette[12], palette[0]);
    pxRect(ctx, 130, 51, 6, 8, palette[15]);
    // Bowed arm & spiky hair
    drawPolygon(ctx, [[138, 54], [152, 60], [148, 68], [142, 66]], palette[7], palette[0]);
    drawPolygon(ctx, [[138, 42], [146, 36], [152, 43], [144, 50]], palette[11], palette[0]);
  },

  /**
   * Draws the letterboxed anime cut-in banner ("I AM DYLE — THE DUNKMAN!!!") for CutInState.
   */
  drawCutInBanner(ctx, palette, focuslines, shakeX = 0, shakeY = 0) {
    const sx = Math.round(shakeX);
    const sy = Math.round(shakeY);

    ctx.save();
    ctx.beginPath();
    ctx.rect(0, 40, WIDTH, 42);
    ctx.clip();

    // Red/ Pink background strip
    pxRect(ctx, 0, 40, WIDTH, 42, palette[15]);
    focuslines.draw(ctx, palette[3]);

    // Close-up head/shoulders of Dyle in the center of the cut-in strip
    drawPolygon(
      ctx,
      [
        [104 + sx, 82 + sy],
        [114 + sx, 68 + sy],
        [142 + sx, 70 + sy],
        [148 + sx, 82 + sy]
      ],
      palette[12],
      palette[0]
    );
    drawPolygon(
      ctx,
      [
        [115 + sx, 48 + sy],
        [136 + sx, 49 + sy],
        [137 + sx, 69 + sy],
        [116 + sx, 69 + sy]
      ],
      palette[7],
      palette[0]
    );
    pxRect(ctx, 115 + sx, 51 + sy, 22, 3, palette[15]);
    pxRect(ctx, 122 + sx, 56 + sy, 4, 2, palette[0]);
    pxRect(ctx, 130 + sx, 56 + sy, 4, 2, palette[0]);
    pxRect(ctx, 123 + sx, 63 + sy, 9, 3, palette[12]);
    drawPolygon(
      ctx,
      [
        [108 + sx, 52 + sy],
        [104 + sx, 42 + sy],
        [115 + sx, 45 + sy],
        [119 + sx, 38 + sy],
        [126 + sx, 45 + sy],
        [133 + sx, 39 + sy],
        [141 + sx, 46 + sy],
        [137 + sx, 53 + sy]
      ],
      palette[11],
      palette[0]
    );

    ctx.restore();

    // Top and bottom white border lines on the cut-in bar
    pxRect(ctx, 0, 40, WIDTH, 1, palette[12]);
    pxRect(ctx, 0, 81, WIDTH, 1, palette[12]);
  }
};
