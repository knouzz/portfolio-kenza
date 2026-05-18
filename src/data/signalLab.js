// ─── SIGNAL LAB — Scalable data layer ─────────────────────────────────────────
// To add a new signal: push a new object into `signals` with status 'active' | 'coming' | 'archived'
// The section automatically picks up the first 'active' signal as the featured one.

export const signalLabMeta = {
  name:     'Michael vs. DWP2',
  tagline:  'Started with a personal opinion. Ended with a live audience signal system.',
  tagline_fr: 'Parti d\'une opinion personnelle. Abouti à un système de signal d\'audience live.',
  badge:    'LATEST CURIOSITY',
  badge_fr: 'DERNIÈRE CURIOSITÉ',
}

// ─── Signal registry ──────────────────────────────────────────────────────────
export const signals = [
  // ── ACTIVE ──────────────────────────────────────────────────────────────────
  {
    id:       'cultural-sentiment-q3-2026',
    status:   'active',
    quarter:  'LATEST CURISOTY',
    title:    'Cultural Sentiment Intelligence',
    subtitle: 'Continuous audience intelligence · Reddit · YouTube · Google Trends · AI-powered · Automated delivery',
    question: 'Comparing online audience reactions around The Devil Wears Prada 2 vs Michael : which film currently holds the strongest cultural momentum, and what does it mean for pre-release strategy?',
    tags:     ['Audience Intelligence', 'Sentiment Quality', 'Behavioral Segments', 'Risk Detection', 'Automated Delivery'],
    methodology: [
      'Collects live audience conversations from Reddit, YouTube, and Google Trends : refreshed automatically every 6 hours through a workflow I did on n8n.',
      'Scores the tone, excitement level, and concern intensity of each post separating genuine audience quality from surface-level hype through scraping and organising on Python.',
      'Groups audiences into 8 distinct behavioral archetypes based on how they relate emotionally to each release.',
      'Generates plain-English intelligence summaries automatically decision-ready without technical interpretation.',
    ],

    // ── Executive recommendation ─────────────────────────────────────────────
    verdict: {
      recommended:  'Michael',
      reason:       'Higher sentiment purity, more stable audience base, lower concern signal density.',
      momentum:     'Michael',
      momentumDiff: '+7.3pp sentiment lead across all platforms',
      sentimentWinner: 'Michael',
      hyper: {
        leader: 'The Devil Wears Prada 2',
        insight: 'DWP2 generates stronger hype volume (index 0.48 vs 0.32) but weaker sentiment quality — a classic hype–quality divergence.',
      },
    },

    // ── Head-to-head KPIs (real data from kpi_summary.csv) ──────────────────
    films: [
      {
        id:              'michael',
        title:           'Michael',
        type:            'Biographical',
        posts:           420,
        avgSentiment:    0.179,
        positivePct:     53.1,
        negativePct:     24.3,
        neutralPct:      22.6,
        excitementIndex: 0.507,
        hypeIndex:       0.319,
        avgEngagement:   5.74,
        winner:          true,
        verdict:         'Sentiment leader. Audience quality > volume.',
        platforms: [
          { name: 'Reddit',       sentiment: 0.234, posts: 73  },
          { name: 'Twitter/X',    sentiment: 0.226, posts: 70  },
          { name: 'TikTok',       sentiment: 0.182, posts: 80  },
          { name: 'Instagram',    sentiment: 0.153, posts: 100 },
          { name: 'YouTube',      sentiment: 0.128, posts: 97  },
        ],
        clusters: [
          { label: 'Legacy Believers',   share: 86.4, sentiment: 0.169, excitement: 0.489, positive: 50.4, negative: 23.4, hype: 0.29, tone: 'Loyal but cautious', dominant: ['film', 'real', 'music', 'genuinely'] },
          { label: 'Cultural Analysts',  share: 5.5,  sentiment: 0.476, excitement: 0.790, positive: 100,  negative: 0,    hype: 1.09, tone: 'Highly enthusiastic', dominant: ['trailer gave chills', 'deserves told', 'michael jackson'] },
          { label: 'Music Enthusiasts',  share: 4.3,  sentiment: 0.391, excitement: 0.736, positive: 94.4, negative: 5.6,  hype: 0.06, tone: 'Emotionally driven', dominant: ['love', 'want', 'controversy', 'complicated'] },
          { label: 'Critical Observers', share: 3.8,  sentiment: -0.260, excitement: 0.144, positive: 0,   negative: 100,  hype: 0.06, tone: 'Concerned, skeptical', dominant: ['allegations', 'celebrating MJ artistry', 'feels'] },
        ],
      },
      {
        id:              'dwp2',
        title:           'The Devil Wears Prada 2',
        type:            'Fashion Drama',
        posts:           450,
        avgSentiment:    0.143,
        positivePct:     47.6,
        negativePct:     32.7,
        neutralPct:      19.8,
        excitementIndex: 0.473,
        hypeIndex:       0.484,
        avgEngagement:   5.73,
        winner:          false,
        verdict:         'High hype, fragmented sentiment. Legacy risk present.',
        platforms: [
          { name: 'YouTube',      sentiment: 0.222, posts: 82  },
          { name: 'Instagram',    sentiment: 0.184, posts: 88  },
          { name: 'Twitter/X',    sentiment: 0.159, posts: 89  },
          { name: 'TikTok',       sentiment: 0.111, posts: 104 },
          { name: 'Reddit',       sentiment: 0.049, posts: 87  },
        ],
        clusters: [
          { label: 'Industry Analysts',  share: 67.1, sentiment: 0.165, excitement: 0.472, positive: 46.0, negative: 27.5, hype: 0.47, tone: 'Observational, cautious', dominant: ['fashion', 'sequel', 'meryl', 'thoughts'] },
          { label: 'Fashion Insiders',   share: 19.1, sentiment: 0.118, excitement: 0.446, positive: 44.2, negative: 45.4, hype: 0.09, tone: 'Divided — excited & anxious', dominant: ['prada', 'devil', 'real', 'sequel'] },
          { label: 'Cautious Fans',      share: 9.1,  sentiment: 0.391, excitement: 0.719, positive: 90.2, negative: 9.8,  hype: 0.56, tone: 'Hopeful, engaged', dominant: ['can\'t wait', 'hoping', 'dynamics'] },
          { label: 'Nostalgia Advocates',share: 4.7,  sentiment: -0.548, excitement: 0.027, positive: 0,  negative: 100,  hype: 2.14, tone: 'Protective of original', dominant: ['anne hathaway', 'devastating', 'means emotionally'] },
        ],
      },
    ],

    // ── Strategic insights ───────────────────────────────────────────────────
    insights: [
      { n: 1, signal: 'DIVERGENCE', text: 'Hype volume does not translate into positive perception. DWP2 leads hype signals (0.48 vs 0.32) while trailing on sentiment quality by 7.3pp — a textbook hype–quality gap.' },
      { n: 2, signal: 'STABILITY',  text: "Michael's Legacy Believers cluster (86.4% of audience) represents the most stable sentiment base observed across the analysis — high share, low concern density, consistent tone." },
      { n: 3, signal: 'RISK',       text: "The Nostalgia Advocates segment (DWP2, 4.7%) carries the highest concern signal of any cluster (2.14 avg hype signal, 100% negative rate) — a memory-protection risk that could amplify if early reviews disappoint." },
      { n: 4, signal: 'PLATFORM',   text: 'Reddit sentiment gap is the widest cross-platform divergence: Michael +0.234 vs DWP2 +0.049. Reddit audiences are known early-adopter proxies — this gap is a leading indicator.' },
      { n: 5, signal: 'ENGAGEMENT', text: 'Total engagement is near-identical across both films (5.74 vs 5.73 avg engagement score) — volume parity. The differentiator is entirely sentiment quality, not reach.' },
    ],

    // ── French overrides ─────────────────────────────────────────────────────
    fr: {
      title:    'Intelligence de Sentiment Culturel',
      subtitle: 'Intelligence audience continue · Reddit · YouTube · Google Trends · Propulsé par IA · Livraison automatisée',
      question: 'Comparer les réactions des audiences en ligne autour de The Devil Wears Prada 2 vs Michael : quel film détient actuellement la plus forte dynamique culturelle, et qu\'est-ce que cela signifie pour la stratégie pré-sortie ?',
      methodology: [
        'Collecte de conversations d\'audience live depuis Reddit, YouTube et Google Trends : rafraîchi automatiquement toutes les 6 heures via un workflow n8n.',
        'Score du ton, du niveau d\'excitation et de l\'intensité de préoccupation de chaque post — distinguant la vraie qualité d\'audience de la hype de surface, via scraping et organisation Python.',
        'Regroupement des audiences en 8 archétypes comportementaux distincts selon leur relation émotionnelle à chaque sortie.',
        'Génération automatique de résumés d\'intelligence en langage clair — prêts à l\'action sans interprétation technique.',
      ],
      verdict: {
        recommended:     'Michael',
        reason:          'Pureté du sentiment plus élevée, base d\'audience plus stable, densité de signal de préoccupation plus faible.',
        momentum:        'Michael',
        momentumDiff:    '+7,3pp d\'avance sur le sentiment sur toutes les plateformes',
        sentimentWinner: 'Michael',
        hyper: {
          leader:  'The Devil Wears Prada 2',
          insight: 'DWP2 génère un volume de hype plus fort (index 0,48 vs 0,32) mais une qualité de sentiment plus faible — une divergence hype-qualité classique.',
        },
      },
      insights: [
        { n: 1, signal: 'DIVERGENCE', text: 'Le volume de hype ne se traduit pas en perception positive. DWP2 mène sur les signaux de hype (0,48 vs 0,32) tout en étant derrière sur la qualité du sentiment de 7,3pp — un fossé hype-qualité typique.' },
        { n: 2, signal: 'STABILITY',  text: 'Le cluster Legacy Believers de Michael (86,4% de l\'audience) représente la base de sentiment la plus stable observée dans l\'analyse — part élevée, faible densité de préoccupation, ton constant.' },
        { n: 3, signal: 'RISK',       text: 'Le segment Nostalgia Advocates (DWP2, 4,7%) porte le signal de préoccupation le plus élevé de tous les clusters (2,14 signal hype moyen, 100% de taux négatif) — un risque de protection mémorielle qui pourrait s\'amplifier si les premières critiques déçoivent.' },
        { n: 4, signal: 'PLATFORM',   text: 'L\'écart de sentiment sur Reddit est la plus grande divergence cross-plateforme : Michael +0,234 vs DWP2 +0,049. Les audiences Reddit sont des proxies early-adopter connus — cet écart est un indicateur avancé.' },
        { n: 5, signal: 'ENGAGEMENT', text: 'L\'engagement total est quasi-identique entre les deux films (5,74 vs 5,73 score d\'engagement moyen) — parité de volume. Le différenciateur est entièrement la qualité du sentiment, pas la portée.' },
      ],
    },
  },

  // ── COMING SOON ─────────────────────────────────────────────────────────────
  {
    id:      'gta6-digital-pulse',
    status:  'coming',
    quarter: 'Q4 2026',
    title:   'GTA 6 — Digital Pulse',
    subtitle: 'Pre-release cultural momentum & sentiment mapping',
    tags:    ['Gaming Culture', 'Social Listening', 'Hype Analysis'],
  },
  {
    id:      'fashion-week-sentiment',
    status:  'coming',
    quarter: 'Q1 2027',
    title:   'Fashion Week Cultural Sentiment',
    subtitle: 'Cross-city audience reactions & brand perception shifts',
    tags:    ['Fashion Intelligence', 'Brand Sentiment', 'Cultural Trend'],
  },
  {
    id:      'spotify-culture-pulse',
    status:  'coming',
    quarter: 'Q2 2027',
    title:   'Spotify Culture Trends',
    subtitle: 'Streaming behavior, genre momentum & audience identity signals',
    tags:    ['Music Culture', 'Streaming Analytics', 'Audience Identity'],
  },
  {
    id:      'ai-adoption-pulse',
    status:  'coming',
    quarter: 'Ongoing',
    title:   'AI Adoption Sentiment',
    subtitle: 'Consumer fear, excitement & trust signals around AI tools',
    tags:    ['Tech Culture', 'Consumer Trust', 'Sentiment Tracking'],
  },
]

export const activeSignal = signals.find(s => s.status === 'active')
export const upcomingSignals = signals.filter(s => s.status === 'coming')
