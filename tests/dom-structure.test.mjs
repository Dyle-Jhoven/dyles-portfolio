import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

test('index.html and css/styles.css contain all 5 sections, Jumbotron canvas, and Heat/Vice theme tokens', () => {
  const html = fs.readFileSync(new URL('../index.html', import.meta.url), 'utf8');
  const css = fs.readFileSync(new URL('../css/styles.css', import.meta.url), 'utf8');
  const mainJs = fs.readFileSync(new URL('../js/main.js', import.meta.url), 'utf8');

  assert.match(html, /id="dunkman-canvas"/);
  assert.match(html, /id="scouting-report"/);
  assert.match(html, /id="highlight-reel"/);
  assert.match(html, /id="season-log"/);
  assert.match(html, /id="front-office"/);
  assert.match(css, /#98002E/i); // Miami Flame Red
  assert.match(css, /#F9A01B/i); // Championship Gold
  assert.match(css, /#F9429E/i); // Vice Pink
  assert.match(css, /#00B2A9/i); // Vice Cyan
  assert.match(mainJs, /DunkmanEngine/);
});
