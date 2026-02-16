export interface SlideContent {
  id: string;
  title: string;
  narration: string[];
  facts?: Fact[];
}

export interface Fact {
  text: string;
  sources: string[];
}

export const slides: SlideContent[] = [
  {
    id: 'opening',
    title: 'The Stage is Set',
    narration: [
      'From 2010 to February 2026',
      'A journey through sound, soul, and showmanship',
      'Welcome to the music of Jamie Foxx'
    ]
  },
  {
    id: 'artist-identity',
    title: 'Artist Identity',
    narration: [
      'Vocalist, pianist, and R&B storyteller',
      'Roots in gospel and soul traditions',
      'A performer who brings the stage to every recording'
    ],
    facts: [
      {
        text: 'Jamie Foxx is a Grammy-winning R&B artist known for his vocal range and piano skills',
        sources: ['grammy-history']
      }
    ]
  },
  {
    id: '2010-album',
    title: '2010: Best Night of My Life',
    narration: [
      'The album that marked a new chapter',
      'Blending R&B, pop, and soul',
      'Chart success and critical recognition'
    ],
    facts: [
      {
        text: 'Best Night of My Life was released in 2010 as Jamie Foxx\'s third studio album',
        sources: ['best-night-album']
      },
      {
        text: 'The album featured collaborations with artists like T-Pain, Drake, and T.I.',
        sources: ['best-night-album']
      }
    ]
  },
  {
    id: 'sound-style',
    title: 'Sound & Style',
    narration: [
      'Smooth R&B vocals with emotional depth',
      'Piano-driven arrangements',
      'Themes of love, celebration, and resilience',
      'Influences from classic soul to contemporary R&B'
    ]
  },
  {
    id: '2015-album',
    title: '2015 Album Era',
    narration: [
      'Hollywood: A Story of a Dozen Roses',
      'A return to the studio',
      'Artistic evolution and mature sound'
    ],
    facts: [
      {
        text: 'Hollywood: A Story of a Dozen Roses was released in 2015 as Jamie Foxx\'s fourth studio album',
        sources: ['hollywood-album']
      }
    ]
  },
  {
    id: 'quiet-years',
    title: 'Quiet Years → Return Signals',
    narration: [
      'A period of focus on other creative endeavors',
      'The music never left',
      'Signals of a return to recording'
    ]
  },
  {
    id: '2026-somebody',
    title: 'Feb 13, 2026: "Somebody"',
    narration: [
      'A comeback single released on Valentine\'s Day',
      'Themes of searching for connection and rebound romance',
      'A return to the spotlight with new music'
    ],
    facts: [
      {
        text: '"Somebody" was released on February 13, 2026, timed for Valentine\'s Day',
        sources: ['somebody-release']
      },
      {
        text: 'The song explores themes of searching for a rebound romance and new connection',
        sources: ['somebody-release']
      }
    ]
  },
  {
    id: 'closing',
    title: 'The Music Formula',
    narration: [
      'Soul',
      'Showmanship',
      'Resilience',
      'The music continues'
    ]
  }
];

export const timeline = {
  start: 2010,
  end: 2026,
  milestones: [
    { year: 2010, event: 'Best Night of My Life' },
    { year: 2015, event: 'Hollywood: A Story of a Dozen Roses' },
    { year: 2026, event: '"Somebody" (Feb 13)' }
  ]
};


