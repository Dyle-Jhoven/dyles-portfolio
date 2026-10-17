import test from 'node:test';
import assert from 'node:assert/strict';
import { PORTFOLIO_DATA, filterProjects } from '../js/portfolio-data.js';
import { WIDTH, HEIGHT, PALETTES, SPRITES } from '../js/dunkman-sprites.js';
import { DunkmanAudio } from '../js/dunkman-audio.js';

test('PORTFOLIO_DATA has Dyle #3 profile and all project categories', () => {
  assert.equal(PORTFOLIO_DATA.player.name, 'DYLE');
  assert.equal(PORTFOLIO_DATA.player.number, '#3');
  assert.equal(filterProjects(PORTFOLIO_DATA.projects, 'all').length, PORTFOLIO_DATA.projects.length);
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
  assert.equal(typeof SPRITES.drawDefenderTorso, 'function');
  assert.equal(typeof SPRITES.drawHoop, 'function');
  assert.equal(typeof SPRITES.drawJumpPlayer, 'function');
  assert.equal(typeof SPRITES.drawSlamFrame, 'function');
  assert.equal(typeof SPRITES.drawLoseFrame, 'function');
});

test('DunkmanAudio initializes safely in headless environment and toggles mute', () => {
  const audio = new DunkmanAudio();
  assert.equal(audio.muted, true);
  assert.equal(audio.toggleMute(), false);
  audio.playMove();
  audio.playHit();
  audio.playSlam();
  assert.equal(audio.toggleMute(), true);
});
