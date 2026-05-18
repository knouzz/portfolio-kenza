// ── Countries ─────────────────────────────────────────────────────────────────
// type 'direct'   → clicking shows facts immediately (no city drill-down)
// type 'zoomable' → clicking zooms in and reveals city pins

export const countries = [
  {
    id: 'ma',
    name: 'Morocco',
    lat: 31.79,
    lng: -7.09,
    labelSide: 'right',
    type: 'direct',
    bounds: [[27.5, -13.5], [36.0, -1.0]],

  facts: {
  en: [
    "Born and raised in Morocco, where my interest in communication, brands, and consumer behaviour started long before analytics. It’s also where I began studying marketing, PR, and brand management while getting involved in associations that shaped my leadership skills.",
    
    "Growing up between different cultures and social environments taught me adaptability very early, something that still shapes the way I work across markets, teams, and projects today.",
    
    "Some of my favourite memories are still tied to Morocco: food feasts, football games, medinas, cafés, and long conversations. I still love bringing my international friends there whenever we can spend time together.",
  ],

  fr: [
    "Née et élevée au Maroc, où mon intérêt pour la communication, les marques et les comportements consommateurs a commencé bien avant l’analytics. C’est aussi là que j’ai commencé à étudier le marketing, les relations publiques et le brand management tout en m’impliquant dans des associations qui ont développé mon leadership.",
    
    "Grandir entre différentes cultures et environnements sociaux m’a appris l’adaptabilité très tôt, une compétence qui influence encore aujourd’hui ma manière de travailler entre marchés, équipes et projets.",
    
    "Certains de mes meilleurs souvenirs restent liés au Maroc : les festins autour de la nourriture, le football, les médinas, les cafés et les longues conversations. J’adore encore y emmener mes amis internationaux dès qu’on en a l’occasion.",
  ],
}
  },

  {
    id: 'fr',
    name: 'France',
    lat: 46.23,
    lng: 2.21,
    labelSide: 'right',
    type: 'zoomable',
    bounds: [[42.5, -5.0], [51.5, 8.5]],

    facts: {
  en: [
    "I never really planned on studying or working in France growing up, but I was genuinely drawn to the master’s program in Lille and initially moved there for that reason.",
    
    "Over time, I became increasingly interested in the pace and complexity of the French market, from consumer expectations to retail dynamics, reporting visibility, and commercial performance.",
    
    "Between Lille and Paris, I grew closer to the operational and analytical side behind brands: the systems, coordination, and execution layers that quietly shape whether products and campaigns actually succeed.",
  ],

  fr: [
    "Je n’avais pas vraiment prévu de venir étudier ou travailler en France en grandissant, mais le programme de master à Lille m’a sincèrement attirée et c’est ce qui m’a poussée à m’y installer au départ.",
    
    "Avec le temps, je me suis de plus en plus intéressée au rythme et à la complexité du marché français, entre attentes consommateurs, dynamiques retail, visibilité du reporting et performance commerciale.",
    
    "Entre Lille et Paris, je me suis progressivement rapprochée de la dimension opérationnelle et analytique derrière les marques : les systèmes, la coordination et l’exécution qui déterminent discrètement si un produit ou une campagne fonctionne réellement.",
  ],
}
  },

  {
    id: 'be',
    name: 'Belgium',
    lat: 50.50,
    lng: 4.47,
    labelSide: 'right',
    type: 'zoomable',
    bounds: [[49.4, 2.4], [51.6, 6.5]],

    facts: {
  en: [
    "I really wanted to work closely on the Benelux market, which led me to Brussels and category management projects at Henkel combining shopper insights, retail analysis, and commercial performance.",
    
    "Working across Belgium and the Netherlands showed me how differently neighbouring consumers can respond to the exact same product or retail strategy.",
    
    "Also, Belgian fries are absolutely not overrated. Promise.",
  ],

  fr: [
    "J’avais vraiment envie de travailler de près sur le marché Benelux, ce qui m’a menée à Bruxelles sur des projets de category management chez Henkel mêlant shopper insights, analyse retail et performance commerciale.",
    
    "Travailler entre la Belgique et les Pays-Bas m’a montré à quel point des consommateurs voisins peuvent réagir différemment face à un même produit ou dispositif retail.",
    
    "Et fun fact : les frites belges ne sont absolument pas surcotées. Promis.",
  ],
}
  },

  {
    id: 'nl',
    name: 'Netherlands',
    lat: 52.37,
    lng: 4.90,
    labelSide: 'right',
    type: 'zoomable',
    bounds: [[50.7, 3.2], [53.8, 7.3]],

      facts: {
    en: [
      "I regularly traveled to Rotterdam for work while living in Istanbul and working on projects across the Benelux markets.",
      
      "Rotterdam felt very urban, massive, and highly industrial compared to other Dutch cities I visited. Interesting to experience professionally, but I personally connected more with the calmer and more local atmosphere of smaller cities across the Netherlands.",
    ],

    fr: [
      "Je me rendais régulièrement à Rotterdam pour le travail pendant que je vivais à Istanbul et travaillais sur des projets pour les marchés Benelux.",
      
      "Rotterdam m’a semblé très urbaine, immense et industrielle comparée aux autres villes néerlandaises que j’ai visitées. Intéressante à découvrir professionnellement, mais j’ai personnellement davantage accroché avec l’atmosphère plus calme et locale des plus petites villes aux Pays-Bas.",
    ],
    },
  },

  {
    id: 'tr',
    name: 'Türkiye',
    lat: 38.96,
    lng: 35.24,
    labelSide: 'right',
    type: 'zoomable',
    bounds: [[35.8, 25.5], [42.2, 44.9]],

  facts: {
  en: [
    "I was living between Rotterdam and Istanbul while working on e-commerce and analytics projects for the Benelux markets, an experience that pushed me closer to digital customer behaviour, acquisition performance, and operational thinking.",
    
    "Istanbul is still one of the most fascinating cities I’ve experienced so far, even after traveling across 20+ countries. The city moves constantly, cultures, lifestyles, and influences blending together in real time between Europe and Asia.",
    
    "It reinforced my interest in behavioural dynamics: how emotion, identity, and social influence often shape decisions more than purely functional arguments.",
  ],

  fr: [
    "Je vivais entre Rotterdam et Istanbul tout en travaillant sur des projets e-commerce et analytics pour les marchés Benelux, une expérience qui m’a rapprochée des enjeux de comportement client digital, d’acquisition et de réflexion opérationnelle.",
    
    "Istanbul reste l’une des villes les plus fascinantes que j’ai découvertes jusqu’à présent, même après avoir voyagé dans plus de 20 pays. La ville est en mouvement permanent, entre influences européennes et asiatiques qui se mélangent en temps réel.",
    
    "Cette expérience a renforcé mon intérêt pour les dynamiques comportementales : la façon dont l’émotion, l’identité et l’influence sociale façonnent souvent davantage les décisions que les arguments purement fonctionnels.",
  ],
}
  },

  {
    id: 'kr',
    name: 'South Korea',
    lat: 36.50,
    lng: 127.80,
    labelSide: 'left',
    type: 'zoomable',
    bounds: [[33.0, 124.5], [38.8, 130.0]],

   facts: {
  en: [
    "I was based in Daejeon during my exchange semester and really enjoyed my advertising and marketing classes there. Since the city felt much more local than Seoul, I also started learning how to read and write Hangul to better keep up with everyday life.",
    
    "I travelled across South Korea from Busan to Jeju Island, but Seoul stayed with me the most. I loved observing how people interacted with brands, trends, retail, and digital culture in such a fast-moving environment.",
  ],

  fr: [
    "J’étais basée à Daejeon pendant mon semestre d’échange et j’y ai beaucoup apprécié mes cours de publicité et marketing. Comme la ville était beaucoup plus locale que Séoul, j’ai aussi commencé à apprendre à lire et écrire le hangeul pour mieux suivre le quotidien.",
    
    "J’ai voyagé à travers la Corée du Sud de Busan à l’île de Jeju, mais c’est Séoul qui m’a le plus marquée. J’aimais observer la façon dont les gens interagissaient avec les marques, les tendances, le retail et la culture digitale dans un environnement aussi rapide.",
  ],

    },
  },
]

export const cities = [
  {
    id: 'paris',
    name: 'Paris',
    countryId: 'fr',
    lat: 48.8566,
    lng: 2.3522,
    labelSide: 'right',
  },

  {
    id: 'lille',
    name: 'Lille',
    countryId: 'fr',
    lat: 50.6292,
    lng: 3.0573,
    labelSide: 'right',
  },

  {
    id: 'brussels',
    name: 'Brussels',
    countryId: 'be',
    lat: 50.8503,
    lng: 4.3517,
    labelSide: 'right',
  },

  {
    id: 'rotterdam',
    name: 'Rotterdam',
    countryId: 'nl',
    lat: 51.9244,
    lng: 4.4777,
    labelSide: 'right',
  },

  {
    id: 'istanbul',
    name: 'Istanbul',
    countryId: 'tr',
    lat: 41.0082,
    lng: 28.9784,
    labelSide: 'left',
  },

  {
    id: 'seoul',
    name: 'Seoul',
    countryId: 'kr',
    lat: 37.5665,
    lng: 126.9780,
    labelSide: 'left',
  },

  {
    id: 'daejeon',
    name: 'Daejeon',
    countryId: 'kr',
    lat: 36.3504,
    lng: 127.3845,
    labelSide: 'left',
  },
]