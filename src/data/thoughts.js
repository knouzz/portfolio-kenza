// ─── THOUGHTS — Personal Intelligence Notebook ────────────────────────────────
// To add a new thought: push a new object into `thoughts`.
//
// Fields:
//   id              — unique slug
//   title           — short, punchy title (under ~65 chars)
//   category        — 'culture' | 'people' | 'systems'
//   tags            — display tags (2–4 max)
//   insight         — 2–3 sentences, personal + analytical. Can use '\n\n' for paragraph breaks.
//   signal          — { label: string, type: 'high' | 'human' | 'emerging' | 'cultural' | 'structural' }
//   nextExploration — array of short strings: future directions to investigate
//   tools           — array of short strings: tools/methods to explore
//   date            — display date string e.g. 'May 2026'

export const thoughts = [
  {
    id:       'football-strangers-connection',
    title:    'Why football is one of the last places where strangers still feel connected',
    title_fr: 'Pourquoi le football est l\'un des derniers endroits où les étrangers se sentent encore connectés',
    category: 'culture',
    tags:     ['Community', 'Emotion', 'Human Behavior'],
    insight:  'Football creates temporary emotional ecosystems where thousands of strangers synchronize around the same moments, frustrations, and hopes.\n\nVery few modern experiences still generate that kind of collective emotional intensity offline.',
    insight_fr: 'Le football crée des écosystèmes émotionnels temporaires où des milliers d\'inconnus se synchronisent autour des mêmes moments, des mêmes frustrations et des mêmes espoirs.\n\nTrès peu d\'expériences modernes génèrent encore ce type d\'intensité émotionnelle collective hors ligne.',
    signal:   { label: 'HIGH HUMAN SIGNAL', type: 'human' },
    nextExploration: [
      'Fan identity psychology and tribal belonging',
      'Community loyalty models in sports ecosystems',
      'Emotional behavior before, during, and after match events',
    ],
    tools:    ['Sentiment analysis', 'Community mapping', 'Engagement clustering'],
    date:     'May 2026',
  },
  {
    id:       'automation-human-behavior',
    title:    'Why automation makes me think more about human behavior, not less',
    title_fr: 'Pourquoi l\'automatisation me fait penser davantage au comportement humain, pas moins',
    category: 'systems',
    tags:     ['AI', 'Automation', 'Behavior', 'Systems'],
    insight:  'The more repetitive operational friction gets automated, the more interesting the human layer becomes: decision-making, interpretation, emotion, trust, and prioritization.\n\nAutomation removes noise. It does not replace meaning.',
    insight_fr: 'Plus les frictions opérationnelles répétitives sont automatisées, plus la couche humaine devient intéressante : prise de décision, interprétation, émotion, confiance et priorisation.\n\nL\'automatisation supprime le bruit. Elle ne remplace pas le sens.',
    signal:   { label: 'EMERGING SHIFT', type: 'emerging' },
    nextExploration: [
      'AI-assisted decision systems and human override patterns',
      'Workflow psychology — when do people trust machines?',
      'Operational behavior under reduced friction',
    ],
    tools:    ['Workflow automation', 'AI summarization pipelines', 'Behavioral analytics'],
    date:     'May 2026',
  },
  {
    id:       'strangers-perception-shift',
    title:    'Why talking to strangers changes perception faster than social media',
    title_fr: 'Pourquoi parler à des inconnus change la perception plus vite que les réseaux sociaux',
    category: 'people',
    tags:     ['Travel', 'Digital Behavior', 'Human Interaction'],
    insight:  'Algorithms optimize for familiarity. Random conversations do the opposite.\n\nTraveling and speaking with strangers often exposes more emotional nuance and complexity than any highly personalized digital feed ever could.',
    insight_fr: 'Les algorithmes optimisent pour la familiarité. Les conversations aléatoires font l\'inverse.\n\nVoyager et parler à des inconnus expose souvent davantage de nuances émotionnelles et de complexité que n\'importe quel fil d\'actualité ultra-personnalisé.',
    signal:   { label: 'CULTURAL INSIGHT', type: 'cultural' },
    nextExploration: [
      'Algorithmic echo chambers vs. lived exposure diversity',
      'How random social encounters reshape mental models',
      'Emotional perception mapping across cultural contexts',
    ],
    tools:    ['Social listening', 'Qualitative analysis', 'Behavioral segmentation'],
    date:     'Apr 2026',
  },
  {
    id:       'jazz-human-pattern',
    title:    'Why jazz feels more human than algorithmic perfection',
    title_fr: 'Pourquoi le jazz semble plus humain que la perfection algorithmique',
    category: 'culture',
    tags:     ['Music', 'Improvisation', 'Creativity', 'Emotion'],
    insight:  'Jazz creates emotional tension through imperfection, timing, unpredictability, and listening. Its value comes less from technical perfection and more from the interaction dynamics between people in real time.\n\nThat gap — between what is planned and what actually happens — is where the feeling lives.',
    insight_fr: 'Le jazz crée une tension émotionnelle à travers l\'imperfection, le timing, l\'imprévisibilité et l\'écoute. Sa valeur vient moins de la perfection technique que des dynamiques d\'interaction entre les personnes en temps réel.\n\nCet écart — entre ce qui est prévu et ce qui se passe réellement — c\'est là que réside le ressenti.',
    signal:   { label: 'HUMAN PATTERN', type: 'human' },
    nextExploration: [
      'Emotional timing and anticipation in live music',
      'Improvisation as a systems thinking model',
      'Human unpredictability vs. AI-generated composition',
    ],
    tools:    ['Pattern analysis', 'Behavioral comparison frameworks', 'AI music generation testing'],
    date:     'Apr 2026',
  },
]

// ─── Filter categories ─────────────────────────────────────────────────────────
export const thoughtCategories = [
  { id: 'all',     label: 'All',            labelFr: 'Tout' },
  { id: 'culture', label: 'Culture',        labelFr: 'Culture' },
  { id: 'people',  label: 'People & Travel',labelFr: 'Personnes & Voyage' },
  { id: 'systems', label: 'AI & Systems',   labelFr: 'IA & Systèmes' },
]
