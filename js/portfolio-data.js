export const PORTFOLIO_DATA = {
  player: {
    name: 'DYLE',
    fullName: 'Dyle — Computer Engineering & Game Dev',
    number: '#3',
    position: 'COMPUTER ENGINEERING STUDENT / JR. GAME DEVELOPER',
    team: 'MIAMI HEAT DEV ROSTER',
    archetype: 'Two-Way Gameplay & Embedded Systems Engineer',
    tagline:
      'Building frame-perfect interactive games, low-level hardware systems, and high-voltage web experiences with Miami Heat intensity.',
    status: 'AVAILABLE FOR INTERNSHIPS & GAME DEV ROLES',
    location: 'Home Court // Engineering Lab',
    bio: [
      "I'm Dyle, a Computer Engineering student and Junior Game Developer obsessed with how games and machines work from the silicon up to the screen. Whether I'm writing custom 60FPS state machines, inverse-kinematic procedural animations, or programming microcontrollers in C/C++, I bring championship-level polish to every build.",
      'Inspired by classic 16-bit arcade action and Miami Heat Culture, my work bridges tight gameplay feel with solid systems architecture—turning hardware constraints and pixel grids into unforgettable player experiences.'
    ]
  },

  vitals: [
    { label: 'JERSEY', value: '#3', sub: 'Franchise Playmaker' },
    { label: 'DEGREE', value: 'B.S. CpE', sub: 'Computer Engineering' },
    { label: 'ROLE', value: 'JR. GAME DEV', sub: 'Gameplay & Systems' },
    { label: 'FRAME TARGET', value: '60 FPS', sub: 'Zero Frame Drops' },
    { label: 'SPECIALTY', value: 'IK & PIXEL', sub: 'Procedural Engines' },
    { label: 'COURT MODE', value: 'HEAT / VICE', sub: 'Dual 16-Color Shader' }
  ],

  skillCategories: [
    {
      id: 'gamedev',
      title: 'GAME DEVELOPMENT & GRAPHICS',
      badge: 'OFFENSIVE PACKAGE',
      ovr: 94,
      skills: [
        { name: 'HTML5 Canvas / Pixel & Procedural Engines', rating: 96, tag: 'SIGNATURE MOVE' },
        { name: 'Unity (C#) & Godot (GDScript / C++)', rating: 93, tag: 'STARTER' },
        { name: 'Gameplay State Machines, Physics & 2D IK', rating: 95, tag: 'PLAYMAKER' },
        { name: 'Custom Shaders, Palettes & Particle Juice', rating: 91, tag: 'HIGHLIGHT' }
      ]
    },
    {
      id: 'cpe',
      title: 'COMPUTER ENGINEERING & HARDWARE',
      badge: 'DEFENSIVE ANCHOR',
      ovr: 92,
      skills: [
        { name: 'C / C++ & Memory-Safe Low-Level Systems', rating: 94, tag: 'LOCKDOWN' },
        { name: 'Microcontrollers (ESP32, Arduino, STM32)', rating: 92, tag: 'HARDWARE' },
        { name: 'Digital Logic, Verilog/FPGA & Computer Arch', rating: 90, tag: 'SILICON' },
        { name: 'Embedded Displays, Sensors & Serial Protocols', rating: 91, tag: 'TELEMETRY' }
      ]
    },
    {
      id: 'software',
      title: 'SOFTWARE & FULL-STACK ENGINEERING',
      badge: 'FLOOR GENERAL',
      ovr: 91,
      skills: [
        { name: 'JavaScript (ES6+) / TypeScript & Web Audio API', rating: 94, tag: 'CLUTCH' },
        { name: 'Python (Tooling, Asset Pipelines, RLE Encoders)', rating: 92, tag: 'UTILITY' },
        { name: 'Data Structures, Algorithms & Git Workflows', rating: 90, tag: 'FUNDAMENTALS' }
      ]
    }
  ],

  projects: [
    {
      id: 'dunkman-heat',
      title: 'DUNKMAN: MIAMI HEAT EDITION',
      category: 'game',
      categoryLabel: 'GAME DEV // ARCADE ENGINE',
      number: 'PLAY #01',
      year: '2026',
      featured: true,
      statLine: '240×136 PX • 60 FPS • 16-COLOR PALETTE',
      summary:
        'A faithful HTML5 Canvas remake of cxong/Dunkman re-engineered for the Miami Heat. Features procedural 2-segment inverse-kinematic arms, elliptical defender swipe patterns, anime speedlines, AI attract mode, and live Classic/Vice palette swapping.',
      tech: ['HTML5 Canvas', 'Procedural 2D IK', 'State Machine', 'Web Audio Synth'],
      artStyle: 'dunkman',
      demoUrl: '#hero-arena',
      repoUrl: 'https://github.com/cxong/Dunkman'
    },
    {
      id: 'esp32-pocket-arcade',
      title: 'HEATWAVE POCKET ARCADE CABINET',
      category: 'cpe',
      categoryLabel: 'COMPUTER ENG // EMBEDDED',
      number: 'PLAY #02',
      year: '2026',
      featured: true,
      statLine: 'ESP32-S3 • SPI TFT 60HZ • C++ FIRMWARE',
      summary:
        'Custom handheld retro console powered by a dual-core ESP32-S3 driving a 320×240 ILI9341 SPI display via DMA double-buffering, tactile microswitch joystick, and PWM piezo chiptune audio.',
      tech: ['C/C++', 'ESP32-S3', 'DMA SPI', 'PCB Design', 'FreeRTOS'],
      artStyle: 'hardware',
      demoUrl: '#highlight-reel',
      repoUrl: 'https://github.com/'
    },
    {
      id: 'vice-drift-racers',
      title: 'VICE NIGHTS: OUTRUN DRIFT 16-BIT',
      category: 'game',
      categoryLabel: 'GAME DEV // PSEUDO-3D',
      number: 'PLAY #03',
      year: '2025',
      featured: true,
      statLine: 'SCANLINE RASTER • CUSTOM PHYSICS • GODOT/JS',
      summary:
        'Arcade synthwave street racer set in neon Miami featuring scanline road projection, drift boost telemetry, dynamic synthwave stems, and ghost replay serialization.',
      tech: ['Godot 4', 'GDScript', 'Custom Shaders', 'Arcade Physics'],
      artStyle: 'vice',
      demoUrl: '#highlight-reel',
      repoUrl: 'https://github.com/'
    },
    {
      id: 'riscv-cpu-core',
      title: '5-STAGE PIPELINED RISC-V PROCESSOR',
      category: 'cpe',
      categoryLabel: 'COMPUTER ENG // ARCHITECTURE',
      number: 'PLAY #04',
      year: '2025',
      featured: false,
      statLine: 'VERILOG HDL • HAZARD UNIT • FPGA SYNTH',
      summary:
        'Designed and verified a 32-bit RV32I 5-stage pipelined processor with data forwarding, branch prediction, and memory-mapped GPIO/VGA output on an Artix-7 FPGA board.',
      tech: ['Verilog', 'FPGA', 'RISC-V RV32I', 'Digital Logic'],
      artStyle: 'silicon',
      demoUrl: '#highlight-reel',
      repoUrl: 'https://github.com/'
    },
    {
      id: 'pixel-rle-pipeline',
      title: 'TIC-80 / RETRO CARTRIDGE ASSET COMPILER',
      category: 'software',
      categoryLabel: 'SOFTWARE // GAME TOOLING',
      number: 'PLAY #05',
      year: '2025',
      featured: false,
      statLine: 'PYTHON CLI • RLE COMPRESSION • PALETTE QUANT',
      summary:
        'Automated sprite-sheet quantizer and Run-Length Encoding (RLE) packer inspired by TIC-80 cartridge constraints, shrinking full-screen pixel art animations by 78%.',
      tech: ['Python', 'RLE Compression', 'Image Processing', 'CLI Tooling'],
      artStyle: 'tooling',
      demoUrl: '#highlight-reel',
      repoUrl: 'https://github.com/'
    },
    {
      id: 'shotclock-telemetry',
      title: 'ARENA SHOT-CLOCK & TELEMETRY HUD',
      category: 'software',
      categoryLabel: 'SOFTWARE // REALTIME WEB',
      number: 'PLAY #06',
      year: '2026',
      featured: false,
      statLine: 'WEBSOCKETS • ZERO-DEPS • SUB-16MS SYNC',
      summary:
        'Real-time basketball analytics and hardware scoreboard controller with LED matrix serialization, shot-chart heatmaps, and frame-accurate clock synchronization.',
      tech: ['JavaScript ES6+', 'Canvas 2D', 'WebSockets', 'Serial API'],
      artStyle: 'telemetry',
      demoUrl: '#highlight-reel',
      repoUrl: 'https://github.com/'
    }
  ],

  seasonLog: [
    {
      quarter: 'Q4 // CURRENT SEASON',
      period: '2025 — PRESENT',
      title: 'JUNIOR GAME DEVELOPER & INDIE ENGINE BUILDER',
      org: 'Interactive Arcade & Gameplay Lab',
      highlights: [
        'Architected playable retro web games with procedural 2D inverse kinematics, custom collision broadphases, and 16-color indexed shaders.',
        'Built zero-dependency Web Audio API chiptune synthesizers and asset compression pipelines for instant browser boot times.'
      ],
      badge: 'STARTING LINEUP'
    },
    {
      quarter: 'Q3 // HARDWARE & SILICON RUN',
      period: '2024 — PRESENT',
      title: 'B.S. IN COMPUTER ENGINEERING',
      org: 'College of Engineering — Embedded & Architecture Track',
      highlights: [
        'Hands-on coursework and lab leadership in Microprocessors, Digital Logic Design, Embedded C/C++, Computer Networks, and Operating Systems.',
        'Developed DMA-driven SPI game displays on ESP32 and synthesized custom RISC-V logic modules on FPGA hardware.'
      ],
      badge: 'HONOR ROLL'
    },
    {
      quarter: 'Q2 // GAME JAM PLAYOFFS',
      period: '2024 — 2025',
      title: 'GAME JAM COMPETITOR & SYSTEMS PROGRAMMER',
      org: 'Ludum Dare / itch.io Community Jams',
      highlights: [
        'Shipped rapid-prototype arcade games under 48-hour and 72-hour shot clocks, focusing on game feel, screen shake, radial focus lines, and tight controls.',
        'Collaborated across pixel art, procedural animation, and C#/GDScript/JS gameplay scripting.'
      ],
      badge: 'CLUTCH PERFORMER'
    },
    {
      quarter: 'Q1 // ROOKIE TIP-OFF',
      period: '2023 — 2024',
      title: 'FOUNDATIONS IN C++, ALGORITHMS & DIGITAL CIRCUITS',
      org: 'Engineering Student Society & Makerspace',
      highlights: [
        'Built first custom physics simulations, microcontroller robotics prototypes, and arcade clones from scratch.',
        'Established a relentless Heat Culture engineering ethic: clean code, measurable frame times, and zero excuses.'
      ],
      badge: 'ROOKIE OF THE YEAR'
    }
  ],

  socials: {
    email: 'dyle.gamedev@heatculture.dev',
    github: 'https://github.com/',
    itch: 'https://itch.io/',
    linkedin: 'https://linkedin.com/',
    resumeLabel: 'DOWNLOAD SCOUTING DOSSIER (PDF)'
  }
};

export function filterProjects(projects, category = 'all') {
  if (!category || category === 'all') {
    return projects;
  }
  return projects.filter((project) => project.category === category);
}
