import { PORTFOLIO_DATA, filterProjects } from './portfolio-data.js';
import { DunkmanEngine } from './dunkman-engine.js';

function renderVitalsAndProfile() {
  const vitalsGrid = document.getElementById('vitals-grid');
  if (vitalsGrid) {
    vitalsGrid.innerHTML = PORTFOLIO_DATA.vitals
      .map(
        (v) => `
        <div class="vital-card">
          <div class="vital-card__label">${v.label}</div>
          <div class="vital-card__value">${v.value}</div>
          <div class="vital-card__sub">${v.sub}</div>
        </div>
      `
      )
      .join('');
  }

  const bioContainer = document.getElementById('dossier-bio');
  if (bioContainer) {
    bioContainer.innerHTML = PORTFOLIO_DATA.player.bio.map((p) => `<p>${p}</p>`).join('');
  }

  const skillsContainer = document.getElementById('skills-container');
  if (skillsContainer) {
    skillsContainer.innerHTML = PORTFOLIO_DATA.skillCategories
      .map(
        (cat) => `
        <div class="skill-group-card">
          <div class="skill-group-card__top">
            <h3 class="skill-group-card__title">${cat.title}</h3>
            <span class="ovr-badge">${cat.ovr} OVR // ${cat.badge}</span>
          </div>
          ${cat.skills
            .map(
              (s) => `
              <div class="skill-row">
                <div class="skill-row__meta">
                  <span>${s.name}</span>
                  <span class="skill-row__rating">${s.rating} OVR [${s.tag}]</span>
                </div>
                <div class="skill-bar-track">
                  <div class="skill-bar-fill" style="width: ${s.rating}%"></div>
                </div>
              </div>
            `
            )
            .join('')}
        </div>
      `
      )
      .join('');
  }
}

function renderProjects(category = 'all') {
  const grid = document.getElementById('projects-grid');
  if (!grid) return;

  const list = filterProjects(PORTFOLIO_DATA.projects, category);
  grid.innerHTML = list
    .map(
      (proj) => `
      <article class="project-card" data-category="${proj.category}">
        <div class="project-card__banner" data-play="${proj.number}">
          <div class="project-card__top-tags">
            <span class="project-cat-pill">${proj.categoryLabel}</span>
            <span>${proj.year}</span>
          </div>
          <div class="project-stat-line">${proj.statLine}</div>
        </div>
        <div class="project-card__body">
          <h3 class="project-card__title">${proj.title}</h3>
          <p class="project-card__summary">${proj.summary}</p>
          <div class="project-tech-list">
            ${proj.tech.map((t) => `<span class="tech-chip">${t}</span>`).join('')}
          </div>
          <div class="project-card__actions">
            <a href="${proj.demoUrl}" class="bezel-btn bezel-btn--accent" data-project-id="${proj.id}">
              ${proj.id === 'dunkman-heat' ? '🏀 PLAY ABOVE' : '▶ LIVE DEMO'}
            </a>
            <a href="${proj.repoUrl}" target="_blank" rel="noopener noreferrer" class="bezel-btn">
              SOURCE CODE ↗
            </a>
          </div>
        </div>
      </article>
    `
    )
    .join('');
}

function renderSeasonLog() {
  const timeline = document.getElementById('season-timeline');
  if (!timeline) return;

  timeline.innerHTML = PORTFOLIO_DATA.seasonLog
    .map(
      (item) => `
      <article class="season-card">
        <div class="season-card__meta">
          <span>${item.quarter}</span>
          <span>${item.period}</span>
        </div>
        <h3 class="season-card__title">${item.title}</h3>
        <div class="season-card__org">${item.org} • [${item.badge}]</div>
        <ul class="season-card__list">
          ${item.highlights.map((h) => `<li>${h}</li>`).join('')}
        </ul>
      </article>
    `
    )
    .join('');
}

function initPortfolioApp() {
  renderVitalsAndProfile();
  renderProjects('all');
  renderSeasonLog();

  const canvas = document.getElementById('dunkman-canvas');
  const hudPercent = document.getElementById('hud-percent');
  const hudProgressFill = document.getElementById('hud-progress-fill');
  const hudLives = document.getElementById('hud-lives');
  const hudStateText = document.getElementById('hud-state-text');
  const hudStreak = document.getElementById('hud-streak');
  const hudBest = document.getElementById('hud-best');
  const hudModeBadge = document.getElementById('hud-mode-badge');
  const attractOverlay = document.getElementById('attract-overlay');

  const engine = new DunkmanEngine(canvas, {
    theme: 'classic',
    mode: 'PLAYER',
    onHudUpdate(hud) {
      if (hudPercent) hudPercent.textContent = `${hud.percent.toFixed(1)}%`;
      if (hudProgressFill) hudProgressFill.style.width = `${hud.percent}%`;
      if (hudLives) {
        hudLives.textContent =
          hud.lives > 0 ? '🏀 '.repeat(hud.lives).trim() : '❌ TURNOVER';
      }
      if (hudStateText) {
        const labels = {
          CUTIN: '🔥 "I AM THE DUNKMAN!"',
          GAME: '⚡ FAST BREAK GUARDING',
          HOOP: '🚀 ELEVATING TO THE RIM',
          SLAM: '💥 KABOOM! SLAM DUNK!',
          LOSE: '🚨 BALL STOLEN — RUNNING IT BACK'
        };
        hudStateText.textContent = labels[hud.state] || hud.state;
      }
      if (hudStreak) hudStreak.textContent = String(hud.streak);
      if (hudBest) hudBest.textContent = `BEST: ${hud.bestPercent.toFixed(0)}%`;
      if (hudModeBadge) {
        hudModeBadge.textContent =
          hud.mode === 'ATTRACT' ? 'AI ATTRACT DEMO' : 'LIVE GAMEPLAY (#3 DYLE)';
      }
      if (attractOverlay) {
        attractOverlay.classList.toggle('hidden', hud.mode === 'PLAYER');
      }
    }
  });

  // Auto-launch the game banner immediately the moment the website opens!
  engine.startPlayerGame(false);

  // 60FPS Game Loop
  function loop() {
    engine.step();
    window.requestAnimationFrame(loop);
  }
  window.requestAnimationFrame(loop);

  // Keyboard Controls (Arrow keys & WASD)
  const pressedKeys = new Set();
  const keyMap = {
    ArrowUp: [0, -1],
    KeyW: [0, -1],
    ArrowDown: [0, 1],
    KeyS: [0, 1],
    ArrowLeft: [-1, 0],
    KeyA: [-1, 0],
    ArrowRight: [1, 0],
    KeyD: [1, 0]
  };

  function syncKeyboardVector() {
    let dx = 0;
    let dy = 0;
    for (const code of pressedKeys) {
      const vec = keyMap[code];
      if (vec) {
        dx += vec[0];
        dy += vec[1];
      }
    }
    engine.setInputDirection(dx, dy, true);
  }

  window.addEventListener('keydown', (e) => {
    const tag = document.activeElement ? document.activeElement.tagName : '';
    if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;

    if (e.code === 'Space' && (engine.state === 'LOSE' || engine.mode === 'ATTRACT')) {
      e.preventDefault();
      engine.startPlayerGame(true);
      return;
    }

    if (keyMap[e.code]) {
      if (engine.mode === 'PLAYER') {
        e.preventDefault();
      }
      pressedKeys.add(e.code);
      syncKeyboardVector();
    }
  });

  window.addEventListener('keyup', (e) => {
    if (keyMap[e.code]) {
      pressedKeys.delete(e.code);
      if (engine.mode === 'PLAYER') {
        syncKeyboardVector();
      }
    }
  });

  // Pointer / Touch Controls directly on the 240x136 Canvas
  if (canvas) {
    const handlePointer = (clientX, clientY) => {
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const normX = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
      const normY = Math.max(0, Math.min(1, (clientY - rect.top) / rect.height));
      engine.setPointerPos(normX, normY);
    };

    canvas.addEventListener('pointerdown', (e) => {
      canvas.focus();
      if (engine.mode === 'ATTRACT' || engine.state === 'LOSE') {
        engine.startPlayerGame(true);
      } else {
        handlePointer(e.clientX, e.clientY);
      }
    });

    canvas.addEventListener('pointermove', (e) => {
      if (engine.mode === 'PLAYER' && engine.state === 'GAME') {
        handlePointer(e.clientX, e.clientY);
      }
    });
  }

  // Interactive 8-Direction Octant Guard Pad
  document.querySelectorAll('.oct-btn').forEach((btn) => {
    const triggerOctant = () => {
      const dx = Number(btn.dataset.dx || 0);
      const dy = Number(btn.dataset.dy || 0);
      engine.setInputDirection(dx, dy, true);
      document.querySelectorAll('.oct-btn').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
    };
    btn.addEventListener('pointerdown', triggerOctant);
    btn.addEventListener('mouseenter', (e) => {
      if (e.buttons === 1 || engine.mode === 'PLAYER') {
        triggerOctant();
      }
    });
  });

  // Play, AI Demo, and Theater Mode Buttons
  const startPlayHandler = () => {
    engine.startPlayerGame(true);
    if (canvas) canvas.focus();
  };

  document.getElementById('hero-play-btn')?.addEventListener('click', startPlayHandler);
  document.getElementById('cabinet-play-btn')?.addEventListener('click', startPlayHandler);
  document.getElementById('cabinet-ai-btn')?.addEventListener('click', () => {
    engine.startAttractMode();
  });

  const bannerCabinet =
    document.querySelector('.jumbotron-cabinet--banner') ||
    document.querySelector('.jumbotron-cabinet');

  const toggleTheater = () => {
    if (!bannerCabinet) return;
    const isFocus = bannerCabinet.classList.toggle('banner-focus-mode');
    const expandBtn = document.getElementById('cabinet-expand-btn');
    const heroTheaterBtn = document.getElementById('hero-theater-btn');
    if (expandBtn) expandBtn.textContent = isFocus ? '⊡ RESTORE BANNER' : '⛶ FULL FOCUS';
    if (heroTheaterBtn) heroTheaterBtn.textContent = isFocus ? '⊡ RESTORE BANNER' : '⛶ FULLSCREEN FOCUS';
  };

  document.getElementById('hero-theater-btn')?.addEventListener('click', toggleTheater);
  document.getElementById('cabinet-expand-btn')?.addEventListener('click', toggleTheater);

  // Court Edition Theme Switcher (Classic Heat Culture <-> Miami Vice Nights)
  const themeBtn = document.getElementById('theme-toggle-btn');
  const themeLabel = document.getElementById('theme-toggle-label');
  themeBtn?.addEventListener('click', () => {
    const nextTheme = engine.theme === 'classic' ? 'vice' : 'classic';
    document.documentElement.setAttribute('data-theme', nextTheme);
    engine.setPalette(nextTheme);
    if (themeLabel) {
      themeLabel.textContent =
        nextTheme === 'classic' ? 'COURT: HEAT CULTURE' : 'COURT: VICE NIGHTS';
    }
  });

  // 8-Bit Web Audio SFX Toggle
  const audioBtn = document.getElementById('audio-toggle-btn');
  const audioLabel = document.getElementById('audio-toggle-label');
  audioBtn?.addEventListener('click', () => {
    const isMuted = engine.audio.toggleMute();
    audioBtn.setAttribute('aria-pressed', String(!isMuted));
    if (audioLabel) {
      audioLabel.textContent = isMuted ? '🔇 8-BIT SFX: OFF' : '🔊 8-BIT SFX: ON';
    }
  });

  // Project Filter Tabs
  document.querySelectorAll('.filter-tab').forEach((tab) => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.filter-tab').forEach((t) => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      renderProjects(tab.dataset.filter || 'all');
    });
  });

  // Copy Email Button
  const copyBtn = document.getElementById('copy-email-btn');
  copyBtn?.addEventListener('click', () => {
    navigator.clipboard?.writeText(PORTFOLIO_DATA.socials.email).catch(() => {});
    copyBtn.textContent = '✓ COPIED TO CLIPBOARD';
    setTimeout(() => {
      copyBtn.textContent = 'COPY EMAIL';
    }, 2000);
  });

  // Front Office Contract Offer Form Buzzer
  const contractForm = document.getElementById('contract-form');
  const formStatusMsg = document.getElementById('form-status-msg');
  contractForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    engine.audio.playSlam();
    const formData = new FormData(contractForm);
    const scoutName = formData.get('scoutName') || 'Scout';
    if (formStatusMsg) {
      formStatusMsg.textContent = `🚨 BUZZER SOUNDED! Scouting offer from ${scoutName} logged for DYLE #3!`;
    }
    contractForm.reset();
  });
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPortfolioApp);
  } else {
    initPortfolioApp();
  }
}
