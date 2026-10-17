export const PORTFOLIO_DATA = {
  player: {
    name: 'DYLE',
    fullName: 'Dyle Jhoven E. Payla',
    number: '#3',
    position: 'SPORTS HUB PERSONNEL / BASKETBALL OFFICIAL / COMPUTER TECH',
    team: 'ANTIPOLO SPORTS HUB & ICCT',
    archetype: 'Basketball Operations, Game Officiating & Creative Computer Tech',
    tagline:
      'Antipolo City Sports Hub personnel and experienced basketball official with a foundation in creative computer technology from ICCT.',
    status: 'ACTIVE AT ANTIPOLO SPORTS HUB // OPEN FOR OPPORTUNITIES',
    location: 'Barangay San Roque, Antipolo City',
    contactNumber: '09184511708',
    age: 23,
    address: 'Blk 10 Lot 9 Marigman Street, Golden Hills, Barangay San Roque, Antipolo City',
    references: 'Available upon request',
    bio: [
      'My name is Dyle Jhoven E. Payla. I am 23 years old from Antipolo City. Currently, I work on a job order basis at the Antipolo City Sports Hub, where I support daily facility operations, coordinate activities, and ensure that tournaments and sporting events run smoothly.',
      'On the court, I am an experienced basketball referee skilled in officiating games under pressure. I apply basketball rules, fouls, and violations consistently, make quick and fair calls, execute official signals, and maintain positive game flow.',
      'Alongside my sports operations work, I studied at the Institute of Creative Computer Technology (ICCT). I am computer literate, comfortable with digital software and computer systems, and passionate about interactive technology including retro game engines.'
    ]
  },

  vitals: [
    { label: 'FULL NAME', value: 'DYLE PAYLA', sub: 'Dyle Jhoven E. Payla' },
    { label: 'AGE', value: '23 YEARS', sub: 'Antipolo City, Rizal' },
    { label: 'WORK', value: 'SPORTS HUB', sub: 'Antipolo City Sports Hub' },
    { label: 'OFFICIATING', value: 'REFEREE', sub: 'Basketball Game Official' },
    { label: 'COLLEGE', value: 'ICCT', sub: 'Creative Computer Tech' },
    { label: 'CONTACT', value: '09184511708', sub: 'Call / SMS Direct' }
  ],

  skillCategories: [
    {
      id: 'officiating',
      title: 'BASKETBALL OFFICIATING & GAME MANAGEMENT',
      badge: 'COURT ARBITRATION',
      skills: [
        {
          name: 'Basketball Rules & Regulations',
          desc: 'Thorough knowledge of official rules, fouls, and violations with consistent application across all quarters.'
        },
        {
          name: 'Decisive Calls Under Pressure',
          desc: 'Makes fast, fair, and impartial referee calls in intense game situations.'
        },
        {
          name: 'Officiating Signals & Mechanics',
          desc: 'Uses standardized referee hand signals to communicate clearly with table officials and players.'
        },
        {
          name: 'Game Flow & Pace Control',
          desc: 'Manages game tempo, dead-ball intervals, and maintains court discipline.'
        }
      ]
    },
    {
      id: 'operations',
      title: 'SPORTS FACILITY & EVENT OPERATIONS',
      badge: 'VENUE COORDINATION',
      skills: [
        {
          name: 'Daily Facility Operations',
          desc: 'Job order personnel supporting sports facility operations at Antipolo City Sports Hub.'
        },
        {
          name: 'Activity & Court Scheduling',
          desc: 'Coordinates court use, team practices, and organized community tournament bookings.'
        },
        {
          name: 'Game Equipment & Scoreboard Support',
          desc: 'Assists with arena equipment setup, digital scoreboards, shot clocks, and court readiness.'
        },
        {
          name: 'Facility Organization & Safety',
          desc: 'Maintains clean, orderly, and secure athletic areas for players and guests.'
        }
      ]
    },
    {
      id: 'technology',
      title: 'COMPUTER LITERACY & DIGITAL TECHNOLOGY',
      badge: 'TECHNICAL PROFICIENCY',
      skills: [
        {
          name: 'Computer Literacy & Common Software',
          desc: 'Skilled in computer operations, productivity tools, document handling, and digital data management.'
        },
        {
          name: 'ICCT Coursework & Studies',
          desc: 'Studied at the Institute of Creative Computer Technology with a focus on computing systems.'
        },
        {
          name: 'Interactive Web & Retro Game Engines',
          desc: 'Hands-on experience building web interfaces and retro canvas games like the Miami Heat Dunkman banner.'
        },
        {
          name: 'Hardware & Systems Troubleshooting',
          desc: 'Basic computer hardware setup, peripheral management, and operational troubleshooting.'
        }
      ]
    },
    {
      id: 'communication',
      title: 'COMMUNICATION & TEAM COLLABORATION',
      badge: 'INTERPERSONAL SKILLS',
      skills: [
        {
          name: 'Clear & Respectful Communication',
          desc: 'Communicates effectively with players, coaches, customers, supervisors, and co-workers.'
        },
        {
          name: 'Calm Demeanor in Tense Moments',
          desc: 'De-escalates heated disputes and maintains composure during high-pressure situations.'
        },
        {
          name: 'Teamwork & Shift Reliability',
          desc: 'Dependable team player with experience covering shifts and assisting across multiple roles.'
        },
        {
          name: 'Customer Service & Hospitality',
          desc: 'Assists guests and visitors with positive, courteous, and professional attention.'
        }
      ]
    }
  ],

  projects: [
    {
      id: 'dunkman-heat',
      title: 'DUNKMAN: MIAMI HEAT 240x136 RETRO ENGINE',
      category: 'game',
      categoryLabel: 'INTERACTIVE GAME ENGINE',
      number: 'PLAY #01',
      year: '2026',
      featured: true,
      statLine: '240x136 PX : 60 FPS : 16-COLOR PALETTE',
      summary:
        'A retro HTML5 Canvas basketball minigame inspired by cxong/Dunkman on TIC-80. Features procedural 2-segment inverse-kinematic arms, 8-directional ball protection, swiping defender arms, speedlines, audio synthesizer, and dual-court Classic/Vice palette switching.',
      tech: ['HTML5 Canvas', 'Procedural 2D IK', 'State Machine', 'Web Audio Synth'],
      artStyle: 'dunkman',
      demoUrl: '#hero-arena',
      repoUrl: 'https://github.com/cxong/Dunkman'
    },
    {
      id: 'sports-hub-operations',
      title: 'ANTIPOLO CITY SPORTS HUB FACILITY OPERATIONS',
      category: 'cpe',
      categoryLabel: 'FACILITY OPERATIONS',
      number: 'PLAY #02',
      year: '2026',
      featured: true,
      statLine: 'ANTIPOLO CITY SPORTS HUB : ACTIVE JOB ORDER',
      summary:
        'Active operational support at the Antipolo City Sports Hub. Responsibilities include daily sports facility management, maintaining court readiness, supporting event logistics, and assisting players, tournament organizers, and visitors.',
      tech: ['Sports Facility Operations', 'Venue Coordination', 'Event Logistics', 'Court Management'],
      artStyle: 'hardware',
      demoUrl: '#season-log',
      repoUrl: '#front-office'
    },
    {
      id: 'basketball-officiating',
      title: 'BASKETBALL GAME OFFICIATING & RULES ENFORCEMENT',
      category: 'cpe',
      categoryLabel: 'GAME ARBITRATION',
      number: 'PLAY #03',
      year: '2026',
      featured: true,
      statLine: 'OFFICIAL REFEREE : RULES & VIOLATIONS : SIGNALS',
      summary:
        'Experienced on-court basketball officiating. Enforces FIBA and local tournament regulations, identifies fouls and violations accurately, makes quick decisions under pressure, and communicates using standardized referee signals.',
      tech: ['Rules Enforcement', 'Game Officiating', 'Conflict Resolution', 'Pace Control'],
      artStyle: 'vice',
      demoUrl: '#season-log',
      repoUrl: '#front-office'
    },
    {
      id: 'icct-tech-lab',
      title: 'ICCT COMPUTER TECHNOLOGY & LITERACY LAB',
      category: 'software',
      categoryLabel: 'COMPUTER TECHNOLOGY',
      number: 'PLAY #04',
      year: '2025',
      featured: false,
      statLine: 'ICCT COLLEGES : COMPUTER SYSTEMS : PRODUCTIVITY',
      summary:
        'Computer technology and literacy training at the Institute of Creative Computer Technology (ICCT). Covers operating systems, office applications, digital tournament records, computer maintenance, and interactive web tools.',
      tech: ['Computer Literacy', 'Productivity Software', 'Digital Workflows', 'ICCT Studies'],
      artStyle: 'tooling',
      demoUrl: '#scouting-report',
      repoUrl: '#front-office'
    },
    {
      id: 'retro-pixel-arena',
      title: 'RETRO 16-COLOR MIAMI HEAT ARENA SYSTEM',
      category: 'game',
      categoryLabel: 'PIXEL ART GRAPHICS',
      number: 'PLAY #05',
      year: '2026',
      featured: false,
      statLine: '16 COLORS : RAFTERS : CHAMPIONSHIP BANNERS : SCANLINES',
      summary:
        'Procedural pixel-art arena rendering engine featuring Miami Heat championship banners (06, 12, 13), dynamic crowd with camera flashes, scrolling LED ribbon board, and a parquet court with the flaming ball insignia.',
      tech: ['Procedural Pixel Art', 'Indexed Palette Swap', 'CRT Scanlines', 'Canvas 2D'],
      artStyle: 'silicon',
      demoUrl: '#hero-arena',
      repoUrl: 'https://github.com/cxong/Dunkman'
    },
    {
      id: 'bakery-reliever-operations',
      title: 'RETAIL SHIFT RELIEVER & CUSTOMER SERVICE',
      category: 'software',
      categoryLabel: 'CUSTOMER SERVICE & WORK HISTORY',
      number: 'PLAY #06',
      year: '2020',
      featured: false,
      statLine: '6-MONTH TENURE : SHIFT COVERAGE : AREA HYGIENE',
      summary:
        'Six-month work experience as a reliever in a busy bakery shop. Handled customer service with courteous communication, covered varied shifts reliably, assisted with daily bakery tasks, and maintained a clean, organized work station.',
      tech: ['Customer Service', 'Shift Assistance', 'Workplace Organization', 'Cash & Orders'],
      artStyle: 'telemetry',
      demoUrl: '#season-log',
      repoUrl: '#front-office'
    }
  ],

  seasonLog: [
    {
      quarter: 'CURRENT TENURE',
      period: 'SEPTEMBER 2026 - PRESENT',
      title: 'JOB ORDER PERSONNEL',
      org: 'Antipolo City Sports Hub',
      highlights: [
        'Currently working on a job order basis supporting daily sports facility operations at the Antipolo City Sports Hub.',
        'Assists with court schedules, equipment preparation, visitor inquiries, and tournament logistics to keep sports activities running smoothly.'
      ],
      badge: 'ACTIVE ROLE'
    },
    {
      quarter: 'COLLEGE EDUCATION',
      period: 'HIGHER EDUCATION',
      title: 'COMPUTER TECHNOLOGY STUDIES',
      org: 'Institute of Creative Computer Technology (ICCT)',
      highlights: [
        'Studied computer literacy, information technology fundamentals, office applications, and digital systems.',
        'Applied computing knowledge toward building interactive web projects, portfolio systems, and digital records management.'
      ],
      badge: 'COLLEGE'
    },
    {
      quarter: 'WORK EXPERIENCE',
      period: 'OCTOBER 2019 - MARCH 2020',
      title: 'RELIEVER & CUSTOMER SERVICE',
      org: 'Bakery Shop (6 Months)',
      highlights: [
        'Worked as a reliever covering shifts and assisting with day-to-day operations and food service tasks.',
        'Served customers respectfully, handled orders, and kept the work and service counters clean and organized.'
      ],
      badge: '6 MONTHS'
    },
    {
      quarter: 'ACADEMIC FOUNDATIONS',
      period: 'PRIMARY & SECONDARY EDUCATION',
      title: 'BASIC & SECONDARY EDUCATION',
      org: 'Antipolo Schools',
      highlights: [
        'Senior High School: St John\'s Wort Montessori School',
        'Junior High School: San Roque National High School',
        'Elementary School: Lores Elementary School'
      ],
      badge: 'GRADUATE'
    }
  ],

  personalInfo: {
    name: 'Dyle Jhoven E. Payla',
    age: 23,
    address: 'Blk 10 Lot 9 Marigman Street, Golden Hills, Barangay San Roque, Antipolo City',
    contactNo: '09184511708',
    references: 'Available upon request.'
  },

  socials: {
    contactNumber: '09184511708',
    location: 'Antipolo City, Rizal, Philippines',
    tic80: 'https://tic80.com/dev/congusbongus/dunkman',
    github: 'https://github.com/cxong/Dunkman'
  }
};

export function filterProjects(projects, category = 'all') {
  if (!category || category === 'all') {
    return projects;
  }
  return projects.filter((project) => project.category === category);
}
