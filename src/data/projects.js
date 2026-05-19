export const projects = [
  {id:       'product-data-hub',
flagship: true,
category: 'Operational Strategy · Workflow Automation',
tags:     ['Process Optimization', 'Data Automation', 'VBA', 'Power BI', 'Operational Design'],
metrics: [
  { value: '75%',   label: { en: 'Creation time reduced',          fr: 'Temps de création réduit' } },
  { value: '360h',  label: { en: 'Saved every year',               fr: 'Économisées chaque année' } },
  { value: '€9K',   label: { en: 'Estimated annual savings',       fr: 'Économies annuelles estimées' } },
],

en: {
  title:    'Product Hub',
  subtitle: 'Operational Workflow & Product Data Automation System',

  impact:
    'I designed an Excel and VBA system that transformed how Sushi Shop creates products, replacing fragmented workflows with a single entry point that automates everything downstream.',

  context:
    'Launching a product at Sushi Shop meant multiple teams manually entering the same data across disconnected Excel files. Slow, repetitive and error-prone.',

  problem:
    'Every product launch required hours of duplicate data entry. One mistake could break cash registers, kiosks or digital platforms.',

  approach:
    'I mapped the full workflow end to end, identified every duplication and bottleneck, then redesigned it around one principle: enter data once, automate the rest.',

  solution:
    'Product Hub centralises product data and automates IT file generation via Excel and VBA, with a structured Home interface, archive system and a Power BI layer in development.',

  result:
    'Creation time dropped from 2 hours to 30 minutes (-75%). The system saves 360 hours per year and was validated by leadership across teams.',

},

fr: {
  title:    'Product Hub',
  subtitle: "Système d'automatisation des workflows et données produits",

  impact:
    "J'ai concu un systeme Excel et VBA qui a transforme la creation produit chez Sushi Shop, remplacant des workflows fragmentes par un point d'entree unique automatisant tout en aval.",

  context:
    "Lancer un produit chez Sushi Shop impliquait plusieurs equipes saisissant les memes donnees dans des fichiers Excel deconnectes. Lent, repetitif et source d'erreurs.",

  problem:
    "Chaque lancement necessitait des heures de ressaisie. Une seule erreur pouvait impacter les caisses, les bornes ou les plateformes digitales.",

  approach:
    "J'ai analyse le workflow de bout en bout, identifie chaque doublon et point de blocage, puis repense l'ensemble autour d'un principe : saisir une fois, automatiser le reste.",

  solution:
    "Product Hub centralise les donnees produit et automatise la generation des fichiers IT via Excel et VBA, avec une interface Home structuree et une couche Power BI en developpement.",

  result:
    "Le temps de creation est passe de 2h a 30 min (-75%). Le systeme economise 360 heures par an et a ete valide par la direction.",

},

demo: {
  video: null,
  screenshots: [
    { src: '/demos/product-data-hub/01.png', caption: { en: 'Product Hub - Home (where user can start and end the product launch process).', fr: 'Product Hub - Accueil (point de depart et darrivee du processus de lancement produit).' } },
    { src: '/demos/product-data-hub/02.png', caption: { en: 'Product Hub - Raw data organisation.', fr: 'Product Hub - Organisation des donnees brutes.' } },
    { src: '/demos/product-data-hub/03.png', caption: { en: 'Product Hub - Mapping organisation.', fr: 'Product Hub - Organisation du mapping.' } },
    { src: '/demos/product-data-hub/04.png', caption: { en: 'Product Hub - VBA code automation.', fr: 'Product Hub - Automatisation du code VBA.' } },
  ],

  highlights: [
    {
      en: 'Single-entry workflow replacing repetitive multi-file product creation.',

      fr: 'Workflow à saisie unique remplaçant les ressaisies multiples.',

    },
    {
      en: 'Automated IT file generation through Excel + VBA logic.',

      fr: 'Génération automatisée des fichiers IT via Excel et VBA.',

    },
    {
      en: 'Structured Home interface improving onboarding and team coordination.',

      fr: 'Interface Home structurée facilitant la coordination des équipes.',

    },
    {
      en: 'Integrated archive system preserving centralized product history.',

      fr: "Système d'archivage intégré centralisant l'historique produit.",

    },
    {
      en: 'Power BI performance dashboard currently in development.',

      fr: 'Dashboard Power BI de suivi de performance en cours de développement.',

    },
  ],
},
  },

  {
    id:       'sales-dashboard',
    flagship: false,
    category: 'Business Intelligence · Decision Support',
    tags:     ['Power BI', 'Customer Analytics', 'KPI Architecture', 'Commercial Intelligence'],
    metrics: [
      { value: '4w→1d', label: { en: 'Reporting cycle',             fr: 'Cycle de reporting' } },
      { value: '15+',   label: { en: 'Live performance indicators', fr: 'Indicateurs en direct' } },
      { value: '3',     label: { en: 'Regions covered',             fr: 'Régions couvertes' } },
    ],
    en: {
      title:    'Sales Performance Dashboard',
      subtitle: 'Customer & Commercial Intelligence Platform',
      impact:
        'I replaced monthly PowerPoint decks with a live Power BI platform giving sales and marketing teams daily visibility into what is actually driving results.',
      context:
        'Commercial teams had no view between monthly reports. By the time data arrived, the moment to act had already passed.',
      problem:
        'Without real-time insight, decisions defaulted to gut feel. High-value segments were not caught in time and underperforming channels were not corrected fast enough.',
      approach:
        'I worked backwards from the decisions managers needed to make, building the KPI architecture around real commercial questions rather than available data.',
      solution:
        'A daily-updating Power BI platform across three regions covering customer segments, acquisition and conversion, promotions and target-vs-actual tracking.',
      result:
        'The team moved from monthly retrospectives to daily intelligence. Behaviour patterns became visible mid-month, enabling faster and better-grounded decisions.',
    },
    fr: {
      title:    'Dashboard Performance Commerciale',
      subtitle: "Plateforme d'intelligence client & commerciale",
      impact:
        "J'ai remplace les presentations mensuelles par une plateforme Power BI en direct donnant aux equipes commerciales une visibilite quotidienne sur ce qui drive les resultats.",
      context:
        "Les equipes naviguaient a l'aveugle entre les rapports mensuels. Quand les chiffres arrivaient, il etait trop tard pour agir.",
      problem:
        "Sans visibilite en temps reel, les decisions reposaient sur l'intuition. Les segments a forte valeur n'etaient pas identifies a temps.",
      approach:
        "J'ai travaille a rebours des decisions que les managers devaient prendre, en construisant l'architecture KPI autour de vraies questions commerciales.",
      solution:
        "Une plateforme Power BI mise a jour quotidiennement sur trois regions couvrant segments clients, acquisition, conversion, promotions et suivi objectif-versus-realise.",
      result:
        "L'equipe est passee de retrospectives mensuelles a une intelligence quotidienne. Les patterns comportementaux sont devenus visibles en cours de mois.",
    },
    demo: {
      video: { url: '/demos/sales-dashboard/demo.mp4', caption: { en: 'Sales Performance Dashboard walkthrough.', fr: 'Parcours du dashboard de performance commerciale.' } },
      screenshots: [],
      highlights: [
        {
          en: 'Live customer segment performance tracking by channel and territory.',

          fr: 'Suivi en direct de la performance par segment client, canal et territoire.',

        },
        {
          en: 'Acquisition and conversion funnel analysis across three regions.',

          fr: "Analyse des entonnoirs d'acquisition et de conversion sur trois régions.",

        },
        {
          en: 'Promotion effectiveness overlaid with behavioural trend data.',

          fr: 'Efficacité promotionnelle croisée avec les tendances comportementales.',
        },
        {
          en: 'Daily target-vs-actual KPI dashboard — updated and accessible across all devices.',

          fr: 'Tableau KPI quotidien objectif-versus-réalisé — mis à jour et accessible sur tous les appareils.',

        },
      ],
    },
  },

  {
    id:       'collaboration-analytics',
    flagship: false,
    category: 'Customer Analytics · Commercial Performance',
    tags:     ['Customer Behavior Analysis', 'Retail Intelligence', 'KPI Framework', 'Performance Analytics'],
    metrics: [
      { value: '+60%', label: { en: 'Decision efficiency',         fr: 'Efficacité décisionnelle' } },
      { value: '1',    label: { en: 'Unified performance view',    fr: 'Vue performance unifiée' } },
      { value: '100%', label: { en: 'Cross-team adoption',         fr: 'Adoption inter-équipes' } },
    ],
    en: {
      title:    'Collaboration Performance Analytics',
      subtitle: 'Customer & Commercial Performance Intelligence',
      impact:
        'I built Power BI dashboards tracking collab campaign performance, giving managers clear visibility into what works and who to partner with next.',
      context:
        'The brand ran regular collabs with artists and major brands. After each one, performance analysis meant digging through spreadsheets with no shared view.',
      problem:
        'No easy way to compare a niche artist with a tight community against a big brand with a diverse audience. The data existed but was not readable.',
      approach:
        'I mapped the decisions managers needed to make: which partner profiles generate the best engagement quality and which communities actually convert.',
      solution:
        'Power BI dashboards tracking reach, engagement quality, audience profile and conversion per collab, with side-by-side partner comparisons built in.',
      result:
        'Managers can now review collab results in minutes and make grounded decisions on when to go for depth (tight artist community) versus breadth (big brand audience).',
    },
    fr: {
      title:    'Analytics de Performance Collaborative',
      subtitle: 'Intelligence performance client & commerciale',
      impact:
        "J'ai construit des dashboards Power BI pour suivre la performance des campagnes collab, donnant aux managers une visibilite claire sur ce qui fonctionne et avec qui collaborer ensuite.",
      context:
        "La marque menait des collaborations regulieres avec des artistes et de grandes marques. Analyser les resultats necessitait de fouiller des tableurs sans vue partagee.",
      problem:
        "Impossible de comparer facilement un artiste de niche a communaute engagee contre une grande marque a audience diversifiee. Les donnees existaient sans etre lisibles.",
      approach:
        "J'ai cartographie les decisions que les managers devaient prendre : quels profils generent le meilleur engagement et quelles communautes convertissent vraiment.",
      solution:
        "Dashboards Power BI suivant portee, qualite d'engagement, profil audience et conversion par collab, avec comparaison de partenaires integree.",
      result:
        "Les managers analysent les resultats en quelques minutes et decidient entre profondeur (artiste a communaute soudee) et largeur (grande marque a audience diverse).",
    },
    demo: {
      video: null,
      screenshots: [],
      highlights: [
        {
          en: 'Unified customer and product performance metrics across all retail partnerships.',

          fr: 'Métriques unifiées de performance client et produit sur tous les partenariats retail.',

        },
        {
          en: 'Behavioural trend analysis segmented by channel, period and customer profile.',

          fr: 'Analyse des tendances comportementales par canal, période et profil client.',

        },
        {
          en: 'Automated data pulls from retail systems with built-in reconciliation.',

          fr: 'Extractions automatisées depuis les systèmes retail avec réconciliation intégrée.',

        },
        {
          en: 'Structured quarterly review cadence with shared KPI framework.',

          fr: 'Cadence de revue trimestrielle structurée avec cadre KPI partagé.',

        },
      ],
    },
  },

  {
    id:       'la-redoute',
    flagship: false,
    category: 'E-Commerce Intelligence · Customer Performance',
    tags:     ['Power BI', 'DAX', 'E-Commerce Analytics', 'Customer Acquisition'],
    metrics: [
      { value: '↑',    label: { en: 'Conversion rate insights',       fr: 'Insights taux de conversion' } },
      { value: '3+',   label: { en: 'Acquisition funnels mapped',     fr: 'Entonnoirs acquisition cartographiés' } },
      { value: '100%', label: { en: 'Self-serve reporting adoption',   fr: 'Adoption reporting autonome' } },
    ],
    en: {
      title:    'La Redoute — E-Commerce Intelligence',
      subtitle: 'Customer & Acquisition Performance Platform',
      impact:
        'I built an e-commerce intelligence platform connecting acquisition spend to customer lifetime value, giving the team a clear read on which channels actually work.',
      context:
        'La Redoute needed to know which acquisition channels created loyal shoppers. Data existed but nothing tied acquisition, conversion and retention together.',
      problem:
        'Channels were measured in silos. No cross-journey view meant the team could not tell high-value customers from low-retention ones or allocate budget wisely.',
      approach:
        'I built the framework around the customer journey from first click to repeat purchase, linking acquisition costs to funnel metrics and retention signals.',
      solution:
        'A Power BI platform covering multi-channel acquisition funnels, conversion by source and segment, basket behaviour, repeat purchase cohorts and campaign ROI.',
      result:
        'The team can now distinguish quality customers from volume. Conversion reviews moved from monthly to weekly, with budget decisions grounded in real behaviour.',
    },
    fr: {
      title:    'La Redoute — Intelligence e-commerce',
      subtitle: "Plateforme performance client & acquisition",
      impact:
        "J'ai construit une plateforme d'intelligence e-commerce reliant l'investissement acquisition a la valeur vie client, donnant a l'equipe une lecture claire des canaux qui fonctionnent.",
      context:
        "La Redoute avait besoin de savoir quels canaux creaient des clients fideles. Les donnees existaient mais rien ne reliait acquisition, conversion et retention.",
      problem:
        "Les canaux etaient mesures en silos. Sans vue cross-parcours, impossible de distinguer les clients a forte valeur des profils faible retention.",
      approach:
        "J'ai construit le cadre autour du parcours client, du premier clic a l'achat repete, en reliant couts d'acquisition aux metriques de tunnel et signaux de retention.",
      solution:
        "Une plateforme Power BI couvrant entonnoirs d'acquisition multi-canal, conversion par source et segment, comportement panier, cohortes d'achats repetes et ROI campagnes.",
      result:
        "L'equipe distingue desormais clients de qualite et simple volume. Les revues de conversion passent du mensuel a l'hebdomadaire, avec des decisions budgetaires basees sur le comportement.",
    },
    demo: {
      video: null,
      screenshots: [],
      highlights: [
        {
          en: 'Multi-channel acquisition funnel with cross-source customer journey mapping.',

          fr: "Entonnoir d'acquisition multi-canal avec cartographie du parcours client cross-source.",

        },
        {
          en: 'Conversion rate analysis segmented by traffic source, device and customer profile.',

          fr: 'Analyse du taux de conversion par source de trafic, appareil et profil client.',

        },
        {
          en: 'Retention cohort analysis connecting acquisition cost to lifetime value.',

          fr: "Analyse de cohortes de rétention reliant coût d'acquisition à la valeur vie client.",

        },
        {
          en: 'Campaign ROI modelling with automated self-serve reporting for commercial teams.',

          fr: 'Modélisation du ROI des campagnes avec reporting self-serve automatisé pour les équipes commerciales.',

        },
      ],
    },
  },

  {
    id:       'ubisoft-gaming-trends',
    flagship: false,
    category: 'Consumer Trend Analysis · Behavioural Intelligence',
    tags:     ['NLP', 'Trend Modelling', 'Gaming Analytics', 'Consumer Behaviour'],
    metrics: [
      { value: '3rd',  label: { en: 'Ranked out of 17 teams',         fr: 'Classée sur 17 équipes' } },
      { value: '4',    label: { en: 'Trend vectors identified',        fr: 'Vecteurs de tendances identifiés' } },
      { value: 'NLP',  label: { en: 'Text mining & sentiment model',   fr: 'Modèle NLP & sentiment mining' } },
    ],
    en: {
      title:    'Ubisoft Challenge 2023',
      subtitle: 'Gaming Trends & Player Behaviour Analysis',
      impact:
        'My team and I placed 3rd out of 17 in the Ubisoft Challenge by building a player intelligence model that turned unstructured gamer language into four strategic trend vectors.',
      context:
        'The challenge asked teams to deliver real strategic intelligence on gaming trends. We needed to understand what players were actually saying across reviews, forums and social platforms.',
      problem:
        'Player behaviour is scattered across reviews, forums and social feeds. Analysing each source in isolation misses the patterns that matter.',
      approach:
        'I led the analytics workstream: NLP-based sentiment and topic extraction, then a trend framework linking language patterns to behavioural indicators across four strategic vectors.',
      solution:
        'A player intelligence system combining NLP analysis across reviews, forums and social content, cross-referenced with engagement and retention data.',
      result:
        'Third place out of 17 teams. The four trend vectors were validated by the Ubisoft panel as directly relevant to active product decisions.',
    },
    fr: {
      title:    'Ubisoft Challenge 2023',
      subtitle: 'Analyse des tendances gaming & comportement joueurs',
      impact:
        "Mon equipe et moi avons obtenu la 3eme place sur 17 au Ubisoft Challenge en construisant un modele d'intelligence joueur transformant le langage non structure en quatre vecteurs strategiques.",
      context:
        "Le challenge demandait une vraie intelligence strategique sur les tendances gaming. Il fallait comprendre ce que les joueurs disaient sur reviews, forums et reseaux sociaux.",
      problem:
        "Le comportement des joueurs est disperse sur de multiples sources. Analyser chaque canal isolement fait perdre les patterns qui comptent.",
      approach:
        "J'ai pilote le volet analytique : extraction NLP de sentiment et de themes, puis construction d'un cadre reliant patterns linguistiques a des indicateurs comportementaux.",
      solution:
        "Un systeme d'intelligence joueur combinant analyse NLP sur reviews, forums et contenu social, croise avec des donnees d'engagement et de retention.",
      result:
        "3eme sur 17 equipes. Les quatre vecteurs de tendances ont ete valides par le jury Ubisoft comme directement pertinents pour les decisions produits en cours.",
    },
    demo: {
      video: null,
      screenshots: [],
      highlights: [
        {
          en: 'NLP sentiment and topic mining across reviews, forums and social gaming communities.',

          fr: 'Text mining NLP du sentiment et des sujets sur reviews, forums et communautés gaming sociales.',

        },
        {
          en: "Four strategic trend vectors mapped to Ubisoft's product categories.",

          fr: "Quatre vecteurs de tendances stratégiques mappés sur les catégories produits Ubisoft.",

        },
        {
          en: 'Cross-referencing language patterns with engagement and retention behavioural data.',

          fr: "Croisement des patterns linguistiques avec les données comportementales d'engagement et de rétention.",

        },
        {
          en: "Trend modelling framework validated by Ubisoft's strategic panel — ranked 3rd/17.",

          fr: 'Cadre de modélisation de tendance validé par le jury stratégique Ubisoft — 3ème/17.',

        },
      ],
    },
  },

  {
    id:       'forecasting-model',
    flagship: false,
    category: 'Analytical Modelling · Demand Intelligence',
    tags:     ['Demand Forecasting', 'Customer Demand Analysis', 'Analytical Modelling', 'Supply Chain'],
    metrics: [
      { value: '+22%',   label: { en: 'Forecast accuracy',            fr: 'Précision des prévisions' } },
      { value: '↓',      label: { en: 'Stockout incidents',           fr: 'Incidents de rupture' } },
      { value: 'Better', label: { en: 'Working capital efficiency',   fr: 'Efficacité du BFR' } },
    ],
    en: {
      title:    'Demand Forecasting Model',
      subtitle: 'Customer Demand Intelligence System',
      impact:
        'I built a demand forecasting model that improved accuracy by 22%, reducing stockouts and overstock across a multi-SKU portfolio.',
      context:
        'The supply chain team needed a structured way to read demand signals. Across a multi-SKU portfolio, the gap between forecast and actual behaviour quietly generated waste.',
      problem:
        'Forecasts relied on gut feel and spreadsheets. Seasonality, promo response and channel velocity were not modelled, leading to stockouts at peak and surplus when demand slowed.',
      approach:
        'I analysed three years of sell-in and sell-out data, quantified seasonality and promo uplift by category and channel, then built a scenario-ready framework.',
      solution:
        'A multi-factor demand model combining sell-out velocity, weighted sell-in history, promotional adjustments and seasonality. High-risk SKUs are flagged automatically.',
      result:
        'Forecast accuracy up 22%. Stockouts fell on key SKUs, overstock shrank and planning shifted from reactive to proactive.',
    },
    fr: {
      title:    'Modèle de prévision de la demande',
      subtitle: "Système d'intelligence de la demande client",
      impact:
        "J'ai construit un modele de prevision de la demande ameliorant la precision de 22%, reduisant les ruptures et les surstocks sur un portefeuille multi-SKU.",
      context:
        "L'equipe supply avait besoin d'une approche structuree pour lire les signaux de demande. Sur un portefeuille multi-SKU, l'ecart entre prevision et realite generait du gaspillage.",
      problem:
        "Les previsions reposaient sur l'intuition et des tableurs. Saisonnalite, reponse promotionnelle et velocite par canal n'etaient pas modelisees.",
      approach:
        "J'ai analyse trois ans de donnees sell-in et sell-out, quantifie la saisonnalite et l'uplift promo par categorie et canal, puis construit un cadre de scenarios.",
      solution:
        "Un modele de demande multi-facteurs combinant velocite sell-out, historique sell-in pondere, ajustements promotionnels et saisonnalite. SKUs a risque signalee automatiquement.",
      result:
        "Precision des previsions en hausse de 22%. Les ruptures ont baisse sur les SKUs cles, les surstocks ont reduit et la planification est devenue proactive.",
    },
    demo: {
      video: null,
      screenshots: [],
      highlights: [
        {
          en: 'Multi-factor demand model combining sell-out velocity and weighted sell-in history.',

          fr: 'Modèle de demande multi-facteurs combinant vélocité sell-out et historique sell-in pondéré.',

        },
        {
          en: 'Seasonality indices and promotional uplift coefficients by category and channel.',

          fr: "Indices de saisonnalité et coefficients d'uplift promotionnel par catégorie et canal.",

        },
        {
          en: 'Automated high-risk SKU detection with period-end accuracy reporting.',

          fr: 'Détection automatisée des SKUs à risque avec reporting de précision en fin de période.',

        },
        {
          en: 'Scenario-planning capabilities for peak demand and promotional periods.',

          fr: 'Capacités de planification par scénarios pour les périodes de forte demande et promotions.',

        },
      ],
    },
  },

  {
    id:       'customer-switching',
    flagship: false,
    category: 'Behavioural Analytics · Consumer Research',
    tags:     ['SPSS', 'PCA', 'Qualtrics', 'Kotler 6A Framework'],
    metrics: [
      { value: '6A',  label: { en: 'Kotler framework applied',        fr: 'Framework Kotler appliqué' } },
      { value: 'PCA', label: { en: 'Dimensionality reduction model',  fr: 'Modèle de réduction dimensionnelle' } },
      { value: '4',   label: { en: 'Switching driver archetypes',      fr: 'Archétypes de drivers de switching' } },
    ],
    en: {
      title:    'Customer Switching Behaviour Intelligence',
      subtitle: 'Behavioural Drivers & Loyalty Defection Analysis',
      impact:
        "I applied Kotler's 6A framework and PCA to decode four distinct customer switching archetypes, giving brands a predictive lens on churn before it happens.",
      context:
        'Understanding why customers switch brands is commercially valuable but hard to study. This project aimed to move beyond stated reasons to find actual behavioural patterns.',
      problem:
        'Traditional loyalty analysis only surfaces symptoms like a bad last interaction or price sensitivity, without capturing the deeper drivers that predict switching.',
      approach:
        'I designed a Qualtrics study around the 6A framework to capture attitudes at each stage, then applied PCA in SPSS to surface the latent factors driving switching.',
      solution:
        'A behavioural model combining survey data, PCA-derived factors and the 6A framework, producing four switching archetypes mapped to intervention points in the customer journey.',
      result:
        'Four archetypes emerged, each with a distinct path to switching. Most decisions are predictable before defection through attitudinal erosion earlier in the 6A cycle.',
    },
    fr: {
      title:    'Intelligence du comportement de switching client',
      subtitle: 'Drivers comportementaux & analyse de défection de fidélité',
      impact:
        "J'ai applique le framework 6A de Kotler et la PCA pour decoder quatre archetypes de switching client, donnant aux marques une lecture predictive du churn avant qu'il arrive.",
      context:
        "Comprendre pourquoi les clients changent de marque est precieux mais methodologiquement difficile. Ce projet visait a aller au-dela des declarations pour trouver les vrais patterns comportementaux.",
      problem:
        "L'analyse classique de la fidelite ne remonte que des symptomes comme une mauvaise interaction ou la sensibilite prix, sans capter les drivers profonds qui predisent le switching.",
      approach:
        "J'ai concu une etude Qualtrics autour du framework 6A pour capter les attitudes a chaque etape, puis applique la PCA dans SPSS pour identifier les facteurs latents du switching.",
      solution:
        "Un modele comportemental combinant donnees d'enquete, facteurs PCA et framework 6A, produisant quatre archetypes de switching mappes sur des points d'intervention du parcours client.",
      result:
        "Quatre archetypes, chacun avec un chemin distinct vers le switching. La plupart des decisions sont previsibles avant la defection via une erosion attitudinale en amont du cycle 6A.",
    },
    demo: {
      video: null,
      screenshots: [],
      highlights: [
        {
          en: 'Kotler 6A framework mapped to a structured Qualtrics survey instrument across brand stages.',

          fr: 'Framework 6A de Kotler appliqué à un questionnaire Qualtrics structuré sur les étapes de la marque.',

        },
        {
          en: 'PCA in SPSS reducing the attitudinal dataset to latent factor structure driving switching.',

          fr: 'PCA dans SPSS réduisant le jeu de données attitudinal à la structure factorielle latente pilotant le switching.',

        },
        {
          en: 'Four behavioural switching archetypes with statistically grounded profiles.',

          fr: 'Quatre archétypes de switching comportemental avec profils statistiquement fondés.',

        },
        {
          en: 'Intervention mapping by archetype — identifying predictable switching conditions before defection.',

          fr: 'Cartographie des interventions par archétype — identifier les conditions de switching avant la défection.',

        },
      ],
    },
  },

  // ── Cultural Sentiment Intelligence ────────────────────────────────────────
  {
    id:       'cultural-sentiment-intelligence',
    flagship: false,
    type:     'seasonal',
    category: 'Signal Monitoring · Cultural Intelligence',
    tags:     ['Social Listening', 'Sentiment Analysis', 'Audience Segmentation', 'Python', 'Tableau', 'n8n Automation'],
    metrics: [
      { value: '870',  label: { en: 'posts analysed',        fr: 'posts analysés' } },
      { value: '6h',   label: { en: 'automated refresh cycle', fr: 'cycle d’analyse automatisé' } },
      { value: '8',    label: { en: 'audience archetypes',   fr: 'archétypes d’audience' } },
    ],
    en: {
      title:    'Michael Jackson or The Devil Wears Prada 2?',
      subtitle: 'Live cultural sentiment tracking · AI-assisted monitoring · Automated audience intelligence',
      impact:
        'What started as a casual debate around me : "Michael Jackson or The Devil Wears Prada 2? What to watch first? Are they even worth our time?" became a live cultural intelligence experiment for me. I built an automated system that tracks online conversations every 6 hours, scraps data, measures sentiment shifts, identifies audience archetypes, and keeps asking the same simple question: which release is actually gaining stronger cultural momentum?',
      context:
        'The project started from real conversations. Different groups around me had completely different opinions: some were excited, some were skeptical, and some had already decided one movie was not worth watching. I wanted to move beyond my own circle and understand what online audiences were really saying.',
      problem:
        'Movie hype is noisy. Volume alone does not tell you whether people are excited, doubtful, nostalgic, defensive, or simply arguing. The challenge was to separate attention from actual audience quality — and to keep tracking it as sentiment evolves.',
      approach:
        'Built a recurring workflow using n8n and Python: social conversations are collected from multiple platforms, cleaned, scored for sentiment, grouped into audience archetypes, and refreshed every 6 hours. The goal was not to "review" the movies, but to read the cultural signals around them.',
      solution:
        'A seasonal signal-monitoring system producing sentiment KPIs, audience clusters, platform-level mood analysis, Tableau dashboards, and automated intelligence outputs. The project is designed to be reused every few months with a new cultural topic, trend, launch, or internet debate.',
      result:
        'For now, Michael is leading on audience quality: stronger positive sentiment (+7.3pp), higher excitement index (0.507 vs 0.473), and a more stable audience base. Devil Wears Prada 2 creates strong hype, but with more fragmented and anxiety-driven reactions. The signal is live — and the system keeps reevaluating it every 6 hours.',
    },
    fr: {
      title:    'Seasonal Signals',
      subtitle: 'Suivi live du sentiment culturel · Monitoring assisté par IA · Intelligence audience automatisée',
      impact:
        'Tout est parti d’un débat très simple autour de moi : "Michael Jackson ou Devil Wears Prada 2 ?" Très vite, les avis se sont divisés. J’en ai fait une expérimentation d’intelligence culturelle live : un système automatisé qui suit les conversations en ligne toutes les 6h, mesure les changements de sentiment, identifie des archétypes d’audience et répond à une question simple : quelle sortie gagne vraiment en momentum culturel ?',
      context:
        'Le projet est né de vraies conversations. Autour de moi, les réactions étaient très différentes : certains étaient très enthousiastes, d’autres sceptiques, et certains avaient déjà décidé qu’un des deux films ne valait pas le détour. J’ai voulu sortir de mon cercle et comprendre ce que les audiences en ligne disaient réellement.',
      problem:
        'La hype autour d’un film est bruyante. Le volume de conversations ne suffit pas à savoir si les gens sont enthousiastes, nostalgiques, méfiants, critiques ou simplement en train de débattre. L’enjeu était donc de distinguer l’attention de la vraie qualité d’audience — et de suivre son évolution dans le temps.',
      approach:
        'J’ai construit un workflow récurrent avec n8n et Python : les conversations sociales sont collectées sur plusieurs plateformes, nettoyées, scorées en sentiment, regroupées en archétypes d’audience et réévaluées toutes les 6h. L’objectif n’était pas de "critiquer" les films, mais de lire les signaux culturels qui se forment autour d’eux.',
      solution:
        'Un système saisonnier de monitoring culturel produisant des KPIs de sentiment, des clusters d’audience, une analyse d’humeur par plateforme, des dashboards Tableau et des sorties d’intelligence automatisées. Le projet est conçu pour être réutilisé tous les quelques mois sur un nouveau sujet culturel, une tendance, un lancement ou un débat internet.',
      result:
        'Pour l’instant, Michael mène sur la qualité d’audience : sentiment positif plus fort (+7,3pp), index d’excitation plus élevé (0,507 vs 0,473) et base d’audience plus stable. Devil Wears Prada 2 génère beaucoup de hype, mais avec des réactions plus fragmentées et anxieuses. Le signal reste live — le système continue de le réévaluer toutes les 6h.',
    },
    demo: {
      tableau: {
        file:  '/demos/cultural-sentiment-intelligence/Cultural_Sentiment_Intelligence.twbx',
        title: {
          en: 'Seasonal Signals — Tableau Dashboard.',

          fr: 'Seasonal Signals — Dashboard Tableau.',

        },
        caption: {
          en: 'Cultural sentiment dashboard · Open with Tableau Desktop or Tableau Public.',

          fr: 'Dashboard de sentiment culturel · Ouvrir avec Tableau Desktop ou Tableau Public.',

        },
        sheets: ['KPI Overview', 'Sentiment Distribution', 'Sentiment Over Time', 'PCA Clusters', 'Cluster Heatmap', 'Platform Sentiment', 'Hype vs Concern'],
      },
      diagrams: [
        {
          src:     '/demos/cultural-sentiment-intelligence/diagrams/01_system_architecture.svg',
          caption: { en: 'System overview — from online debate to live cultural signal tracking', fr: 'Vue système — du débat en ligne au suivi live des signaux culturels' },
          note:    { en: 'Social conversations → Sentiment scoring → Audience archetypes → Automated refresh', fr: 'Conversations sociales → Scoring sentiment → Archétypes d’audience → Actualisation automatisée' },
        },
        {
          src:     '/demos/cultural-sentiment-intelligence/diagrams/02_data_flow.svg',
          caption: { en: 'The signal journey — how scattered opinions become structured audience intelligence', fr: 'Le parcours du signal — comment des opinions dispersées deviennent une intelligence audience structurée' },
          note:    { en: 'Capture → Clean → Score → Segment → Compare — refreshed every 6 hours', fr: 'Capturer → Nettoyer → Scorer → Segmenter → Comparer — actualisé toutes les 6h' },
        },
        {
          src:     '/demos/cultural-sentiment-intelligence/diagrams/03_ai_pipeline.svg',
          caption: { en: 'AI-assisted interpretation — surfacing hype, concern, nostalgia and emotional momentum', fr: 'Interprétation assistée par IA — faire émerger hype, inquiétude, nostalgie et momentum émotionnel' },
          note:    { en: 'Built to separate conversation volume from audience quality', fr: 'Conçu pour distinguer le volume de conversation de la qualité d’audience' },
        },
      ],
      screenshots: [
        {
          src:     '/demos/cultural-sentiment-intelligence/01_kpi_overview.png',
          caption: { en: 'KPI overview — which movie is winning the cultural signal?', fr: 'Vue KPI — quel film gagne le signal culturel ?' },
          note:    { en: 'Michael currently leads on avg sentiment (0.179 vs 0.143) and excitement index (0.507 vs 0.473)', fr: 'Michael mène actuellement sur le sentiment moyen (0,179 vs 0,143) et l’index d’excitation (0,507 vs 0,473)' },
        },
        {
          src:     '/demos/cultural-sentiment-intelligence/02_sentiment_distribution.png',
          caption: { en: 'Sentiment distribution — not all hype is positive', fr: 'Distribution du sentiment — toute hype n’est pas positive' },
          note:    { en: 'DWP2 carries a higher negative rate (32.7% vs 24.3%), showing more divided pre-release reactions', fr: 'DWP2 affiche un taux négatif plus élevé (32,7% vs 24,3%), signe de réactions pré-sortie plus divisées' },
        },
        {
          src:     '/demos/cultural-sentiment-intelligence/03_sentiment_over_time.png',
          caption: { en: 'Sentiment over time — how online mood shifts as the debate evolves', fr: 'Sentiment dans le temps — comment l’humeur en ligne évolue avec le débat' },
          note:    { en: 'The workflow keeps reevaluating sentiment every 6 hours to capture momentum changes', fr: 'Le workflow réévalue le sentiment toutes les 6h pour capter les changements de momentum' },
        },
        {
          src:     '/demos/cultural-sentiment-intelligence/04_pca_clusters.png',
          caption: { en: 'PCA cluster map — audience groups behind the debate', fr: 'Carte PCA — les groupes d’audience derrière le débat' },
          note:    { en: '8 audience archetypes reveal how different communities emotionally position each movie', fr: '8 archétypes d’audience montrent comment différentes communautés positionnent émotionnellement chaque film' },
        },
        {
          src:     '/demos/cultural-sentiment-intelligence/05_cluster_heatmap.png',
          caption: { en: 'Cluster heatmap — emotional signatures by audience segment', fr: 'Heatmap des clusters — signatures émotionnelles par segment d’audience' },
          note:    { en: 'Each segment carries a different mix of excitement, doubt, nostalgia and concern', fr: 'Chaque segment porte un mélange différent d’excitation, de doute, de nostalgie et d’inquiétude' },
        },
        {
          src:     '/demos/cultural-sentiment-intelligence/06_engagement_vs_sentiment.png',
          caption: { en: 'Engagement vs sentiment — attention does not always mean approval', fr: 'Engagement vs sentiment — l’attention ne signifie pas toujours l’adhésion' },
          note:    { en: 'Engagement is almost equal, but sentiment quality diverges — volume is not the same as audience confidence', fr: 'L’engagement est presque égal, mais la qualité du sentiment diverge — le volume n’est pas la confiance d’audience' },
        },
        {
          src:     '/demos/cultural-sentiment-intelligence/07_platform_sentiment.png',
          caption: { en: 'Platform mood — where each movie wins or worries audiences', fr: 'Humeur par plateforme — où chaque film gagne ou inquiète les audiences' },
          note:    { en: 'Reddit shows the widest gap in Michael\'s favour, making it a key early signal platform', fr: 'Reddit montre le plus grand écart en faveur de Michael, ce qui en fait une plateforme signal clé' },
        },
        {
          src:     '/demos/cultural-sentiment-intelligence/08_excitement_index.png',
          caption: { en: 'Excitement index — measuring emotional momentum, not just mentions', fr: 'Index d’excitation — mesurer le momentum émotionnel, pas seulement les mentions' },
          note:    { en: 'Michael scores 0.507 vs DWP2\'s 0.473 on a 0–1 composite scale', fr: 'Michael obtient 0,507 vs 0,473 pour DWP2 sur une échelle composite de 0 à 1' },
        },
        {
          src:     '/demos/cultural-sentiment-intelligence/09_hype_vs_concern.png',
          caption: { en: 'Hype vs concern — the real tension behind pre-release buzz', fr: 'Hype vs inquiétude — la vraie tension derrière le buzz pré-sortie' },
          note:    { en: 'DWP2 leads on hype but trails on sentiment quality — a pre-release risk pattern worth watching', fr: 'DWP2 mène sur la hype mais reste derrière sur la qualité du sentiment — un risque pré-sortie à surveiller' },
        },
      ],
      highlights: [
        { en: 'Built from a real-life debate: which movie should we actually watch first?', fr: 'Né d’un vrai débat autour de moi : quel film devrait-on vraiment regarder en premier ?' },
        { en: 'Automated 6h refresh cycle — the system keeps rereading the internet as opinions shift', fr: 'Actualisation automatisée toutes les 6h — le système relit Internet à mesure que les opinions évoluent' },
        { en: 'Designed as a seasonal series — every few months, a new cultural signal gets tracked', fr: 'Pensé comme une série saisonnière — tous les quelques mois, un nouveau signal culturel est analysé' },
        { en: 'Combines curiosity, automation and audience intelligence — not a movie review, a signal-reading system', fr: 'Mêle curiosité, automatisation et intelligence audience — pas une critique de film, un système de lecture des signaux' },
      ],
    },
  },
]
