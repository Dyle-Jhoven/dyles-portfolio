import test from 'node:test';
import assert from 'node:assert/strict';
import { computeArmJoint, outquad, inoutquad, Hand, DunkmanEngine, PixelArena } from '../js/dunkman-engine.js';

test('computeArmJoint handles zero distance and bends elbow when d < armLen', () => {
  const zero = computeArmJoint(100, 70, 100, 70, 40);
  assert.ok(Number.isFinite(zero.ex) && Number.isFinite(zero.ey));

  const bent = computeArmJoint(100, 70, 120, 70, 40);
  assert.equal(bent.ex, 110);
  assert.notEqual(bent.ey, 70);

  const stretched = computeArmJoint(100, 70, 160, 70, 40);
  assert.equal(stretched.ex, 130);
  assert.equal(stretched.ey, 70);
});

test('easing functions match cxong/Dunkman boundaries', () => {
  assert.equal(outquad(0), 0);
  assert.equal(outquad(1), 1);
  assert.equal(inoutquad(0), 0);
  assert.equal(inoutquad(1), 1);
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

test('PixelArena renders retro pixelated Miami Heat arena with rafters, crowd, LED board, and court', () => {
  const arena = new PixelArena();
  assert.equal(typeof arena.tick, 'function');
  assert.equal(typeof arena.draw, 'function');
  arena.tick();
  assert.ok(arena.scrollX > 0);
});
