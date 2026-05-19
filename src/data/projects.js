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
    'I designed and developed an internal operational system that transformed how Sushi Shop creates and manages products reducing manual work, eliminating repetitive input and turning fragmented Excel workflows into a centralized, scalable process.',

  context:
    'At Sushi Shop, launching a product required multiple teams to manually enter the same information across several disconnected Excel files. Marketing, NPD, IT and international operations all worked in parallel, creating a slow, repetitive and error-prone workflow.',

  problem:
    'Every new product required hours of duplicate data entry across recipe sheets, product information files and multiple IT documents. A single mistake could impact cash registers, kiosks or digital platforms. Teams spent more time managing spreadsheets than focusing on strategy, launches or performance.',

  approach:
    'I started by mapping the entire product creation workflow from end to end, identifying bottlenecks, duplicated tasks and communication gaps between teams. Through field observations, interviews and process analysis, I redesigned the workflow around a single principle: input data once, automate everything else.',

  solution:
    'I built Product Hub, an Excel + VBA operational system designed to centralize product data and automate downstream IT workflows. The tool includes a structured Home interface, automated IT file generation, archive management, role-based workflows and a Power BI performance layer currently in development.',

  result:
    'Product creation time dropped from 2 hours to 30 minutes per product (-75%). The system saves an estimated 360 hours annually, significantly reduces human error and improves coordination between marketing, IT and operational teams. Product Hub was officially presented to leadership and cross-functional teams, receiving strong internal validation.',

},

fr: {
  title:    'Product Hub',
  subtitle: 'Système d’automatisation des workflows et données produits',

  impact:
    'Conception et développement d’un système opérationnel interne ayant transformé la manière dont Sushi Shop crée et gère ses produits en réduisant les tâches manuelles, les ressaisies et en centralisant des workflows auparavant fragmentés.',

  context:
    'Chez Sushi Shop, le lancement d’un produit impliquait plusieurs équipes devant saisir les mêmes informations dans différents fichiers Excel indépendants. Les équipes marketing, NPD, IT et opérations internationales travaillaient en parallèle dans un processus long, répétitif et peu structuré.',

  problem:
    'Chaque nouveau produit nécessitait plusieurs heures de ressaisie entre fiches recettes, fichiers marketing et documents IT. Une simple erreur pouvait avoir un impact direct sur les caisses, les bornes ou les plateformes digitales. Les équipes passaient davantage de temps à gérer des fichiers qu’à se concentrer sur la stratégie et la performance.',

  approach:
    'J’ai commencé par analyser l’ensemble du workflow de création produit afin d’identifier les points de friction, les doublons et les problèmes de coordination entre équipes. À travers des observations terrain, des entretiens et une analyse des processus, j’ai repensé le fonctionnement autour d’un principe simple : saisir l’information une seule fois et automatiser le reste.',

  solution:
    'J’ai développé Product Hub, un système opérationnel conçu sur Excel et VBA permettant de centraliser les données produits et d’autatiser les workflows IT. L’outil intègre une interface Home structurée, la génération automatique des fichiers IT, un système d’archivage, des workflows organisés par équipe ainsi qu’une couche analytique connectée à Power BI actuellement en développement.',

  result:
    'Le temps de création d’un produit est passé de 2 heures à 30 minutes (-75 %). Le système permet d’économiser environ 360 heures par an, réduit fortement les erreurs humaines et améliore la coordination entre les équipes marketing, IT et opérations. Product Hub a été présenté aux équipes et à la direction marketing avec des retours très positifs.',

},

demo: {
  video: null,
  screenshots: [
    { src: '/demos/product-data-hub/01.png', caption: { en: 'Product Hub - Screenshot 1', fr: 'Product Hub - Capture 1' } },
    { src: '/demos/product-data-hub/02.png', caption: { en: 'Product Hub - Screenshot 2', fr: 'Product Hub - Capture 2' } },
    { src: '/demos/product-data-hub/03.png', caption: { en: 'Product Hub - Screenshot 3', fr: 'Product Hub - Capture 3' } },
    { src: '/demos/product-data-hub/04.png', caption: { en: 'Product Hub - Screenshot 4', fr: 'Product Hub - Capture 4' } },
  ],

  highlights: [
    {
      en: 'Single-entry workflow replacing repetitive multi-file product creation',
      fr: 'Workflow à saisie unique remplaçant les ressaisies multiples',
    },
    {
      en: 'Automated IT file generation through Excel + VBA logic',
      fr: 'Génération automatisée des fichiers IT via Excel et VBA',
    },
    {
      en: 'Structured Home interface improving onboarding and team coordination',
      fr: 'Interface Home structurée facilitant la coordination des équipes',
    },
    {
      en: 'Integrated archive system preserving centralized product history',
      fr: 'Système d’archivage intégré centralisant l’historique produit',
    },
    {
      en: 'Power BI performance dashboard currently in development',
      fr: 'Dashboard Power BI de suivi de performance en cours de développement',
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
        'I replaced monthly PowerPoint decks with a live dashboard that lets sales and marketing teams see what\'s driving results today not four weeks from now.',
      context:
        'Our commercial teams were flying blind between monthly reports. By the time numbers were compiled, the window to act had closed. There was no simple way to see which customers were buying, which channels were faltering or whether promotions were paying off.',
      problem:
        'Without timely insight into customer patterns and channel dynamics, decisions defaulted to gut feeling. High-value segments weren\'t spotted in time, underperforming channels weren\'t corrected quickly enough, and the data existed but wasn\'t accessible when it mattered.',
      approach:
        'I worked backwards from the decisions managers needed to make. What signals tell a regional lead where to focus today? What can a busy manager digest in 30 seconds and act on? I designed the KPI architecture around those answers rather than whatever data happened to be available.',
      solution:
        'A Power BI platform updating daily across three regions, covering customer segment performance, channel acquisition and conversion, product trends, promotion effectiveness and target-versus-actual tracking. It\'s accessible on any device and uses alert logic to surface anomalies automatically.',
      result:
        'The team moved from monthly retrospectives to daily operational intelligence. Behaviour patterns became visible mid-month, enabling proactive intervention. One regional manager spotted a distribution gap mid-cycle that would have cost significant volume — something the old system would have missed.',
    },
    fr: {
      title:    'Dashboard Performance Commerciale',
      subtitle: "Plateforme d'intelligence client & commerciale",
      impact:
        'J\'ai remplacé des présentations mensuelles par un tableau de bord en direct qui permet aux équipes de voir ce qui motive les résultats aujourd\'hui pas dans quatre semaines.',
      context:
        "Les équipes commerciales naviguaient à l'aveugle entre les rapports mensuels. Quand les chiffres arrivaient, il était trop tard pour agir. Impossible de voir simplement quels clients achetaient, quels canaux faiblissaient ou si les promotions étaient rentables.",
      problem:
        "Sans visibilité rapide sur les comportements clients et la dynamique des canaux, les décisions se prenaient à l'intuition. Les segments à forte valeur n'étaient pas repérés à temps, les canaux sous-performants n'étaient pas corrigés assez vite, et les données existaient mais n'étaient pas accessibles au bon moment.",
      approach:
        "J'ai travaillé à rebours des décisions nécessaires. Quels signaux indiquent à un responsable régional où se concentrer aujourd'hui ? Que peut lire un manager pressé en 30 secondes et transformer en action ? J'ai structuré l'architecture KPI en fonction de ces réponses plutôt qu'en fonction des données disponibles.",
      solution:
        "Une plateforme Power BI mise à jour quotidiennement sur trois régions, couvrant la performance par segment client, l'acquisition et la conversion par canal, les tendances produit, l'efficacité promotionnelle et le suivi objectif-versus-réalisé. Accessible sur tous les appareils et dotée d'alertes pour remonter automatiquement les anomalies.",
      result:
        "L'équipe est passée de rétrospectives mensuelles à une intelligence opérationnelle quotidienne. Les patterns comportementaux sont devenus visibles en cours de mois, permettant des interventions proactives. Un responsable régional a détecté une lacune de distribution en milieu de cycle qui aurait coûté un volume important — un signal qu'on aurait manqué auparavant.",
    },
    demo: {
      video: null,
      screenshots: [],
      highlights: [
        {
          en: 'Live customer segment performance tracking by channel and territory',
          fr: 'Suivi en direct de la performance par segment client, canal et territoire',
        },
        {
          en: 'Acquisition and conversion funnel analysis across three regions',
          fr: "Analyse des entonnoirs d'acquisition et de conversion sur trois régions",
        },
        {
          en: 'Promotion effectiveness overlaid with behavioural trend data',
          fr: 'Efficacité promotionnelle croisée avec les tendances comportementales',
        },
        {
          en: 'Daily target-vs-actual KPI dashboard — updated and accessible across all devices',
          fr: 'Tableau KPI quotidien objectif-versus-réalisé — mis à jour et accessible sur tous les appareils',
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
        'I created a single performance compass for retail partners and our commercial team making joint planning evidence-based rather than assumption-driven.',
      context:
        'Working across Belgium, the Netherlands and Luxembourg meant juggling different reporting styles, metrics and stories from each side. Without a shared view of how customers behaved and how products performed, planning sessions turned into battles of opinion.',
      problem:
        'Everyone measured performance differently, tracked different customer metrics and drew their own conclusions. There was no shared visibility into behaviour trends, channel differences or product success by retail environment. Plans were built on competing hypotheses rather than common evidence.',
      approach:
        'I built the analysis from the customer up. I mapped purchasing patterns by channel and segment, identified what truly influenced decisions, and designed a KPI model reflecting real commercial dynamics rather than administrative compromise.',
      solution:
        'A commercial intelligence system unifying customer and product metrics, automating data pulls from retail partners, analysing behavioural trends by channel and segment, and setting a structured review cadence. Both sides now see the same facts in the same format at the same time.',
      result:
        'Customer behaviour and product performance became visible and comparable across the Benelux market. Planning shifted from guesswork to evidence. Quarterly reviews now focus on behavioural insights and commercial optimisation, improving alignment and outcomes.',
    },
    fr: {
      title:    'Analytics de Performance Collaborative',
      subtitle: 'Intelligence performance client & commerciale',
      impact:
        'J\'ai créé un compas de performance partagé pour les partenaires retail et notre équipe commerciale pour des plans basés sur des preuves plutôt que sur des opinions.',
      context:
        "Travailler en Belgique, aux Pays-Bas et au Luxembourg signifiait jongler avec des styles de reporting, des métriques et des récits différents de chaque côté. Sans vue partagée du comportement client et de la performance produit, les sessions de planification devenaient des affrontements d'opinion.",
      problem:
        "Chacun mesurait la performance différemment, suivait des métriques clients différentes et tirait ses propres conclusions. Pas de visibilité partagée sur les tendances comportementales, les différences de canal ou la réussite produit selon l'environnement retail. Les plans reposaient sur des hypothèses concurrentes plutôt que sur des preuves communes.",
      approach:
        "J'ai construit l'analyse à partir du client. J'ai cartographié les patterns d'achat par canal et segment, identifié ce qui influençait réellement les décisions et conçu un modèle KPI reflétant la dynamique commerciale réelle plutôt qu'un compromis administratif.",
      solution:
        "Un système d'intelligence commerciale unifiant les métriques client et produit, automatisant l'extraction des données des partenaires, analysant les tendances comportementales par canal et segment, et fixant une cadence de revue structurée. Les deux parties voient désormais les mêmes faits, sous la même forme, au même moment.",
      result:
        "Le comportement client et la performance produit sont devenus visibles et comparables sur le marché Benelux. La planification est passée de la conjecture à la preuve. Les revues trimestrielles se concentrent sur les insights comportementaux et l'optimisation commerciale, améliorant l'alignement et les résultats.",
    },
    demo: {
      video: null,
      screenshots: [],
      highlights: [
        {
          en: 'Unified customer and product performance metrics across all retail partnerships',
          fr: 'Métriques unifiées de performance client et produit sur tous les partenariats retail',
        },
        {
          en: 'Behavioural trend analysis segmented by channel, period and customer profile',
          fr: 'Analyse des tendances comportementales par canal, période et profil client',
        },
        {
          en: 'Automated data pulls from retail systems with built-in reconciliation',
          fr: 'Extractions automatisées depuis les systèmes retail avec réconciliation intégrée',
        },
        {
          en: 'Structured quarterly review cadence with shared KPI framework',
          fr: 'Cadence de revue trimestrielle structurée avec cadre KPI partagé',
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
        'My team and I built an end-to-end e-commerce intelligence system that connects acquisition spend to lifetime value turning fragmented data into clear commercial decisions.',
      context:
        'La Redoute needed more than traffic reports; they needed to know which acquisition channels were creating loyal shoppers and which ones were burning budget. Raw data existed, but there was no unified view tying acquisition, conversion and retention together.',
      problem:
        'Channels were measured in silos — paid search, social, email and organic each reported separately with no cross-journey view. Conversion analysis was backward-looking and shallow. The team couldn\'t tell which customers were high-value versus low-retention, making it hard to invest wisely.',
      approach:
        'I built the framework around the customer journey, from first click to repeat purchase. Using Power BI and advanced DAX, I linked acquisition costs to funnel metrics and retention signals, creating a single view of commercial performance.',
      solution:
        'A Power BI platform covering multi-channel acquisition funnels, conversion rates by traffic source and segment, basket behaviour and upsell patterns, repeat purchase cohorts and campaign ROI modelling. It refreshes automatically and is fully self-serve for the commercial team.',
      result:
        'The team can now see clearly which channels bring quality customers versus just volume. Conversion reviews moved from monthly to weekly. Budget decisions are grounded in behaviour rather than vanity metrics, improving marketing efficiency.',
    },
    fr: {
      title:    'La Redoute — Intelligence e-commerce',
      subtitle: "Plateforme performance client & acquisition",
      impact:
        "Nous avons créé un système d'intelligence e-commerce de bout en bout qui relie l'investissement acquisition à la valeur vie transformant des données fragmentées en décisions claires.",
      context:
        "La Redoute avait besoin de plus que des rapports de trafic : il fallait savoir quels canaux d'acquisition créaient des clients fidèles et lesquels brûlaient du budget. Les données existaient, mais sans vue unifiée reliant acquisition, conversion et rétention.",
      problem:
        "Les canaux étaient mesurés en silos — search payant, social, email et organique reportaient séparément sans vue cross-parcours. L'analyse de conversion était rétroactive et superficielle. L'équipe ne pouvait pas distinguer les clients à forte valeur des profils faible rétention, rendant difficile l'allocation optimale du budget.",
      approach:
        "J'ai construit le cadre autour du parcours client, du premier clic à l'achat répété. Grâce à Power BI et aux mesures DAX avancées, j'ai relié les coûts d'acquisition aux métriques de tunnel et aux signaux de rétention, créant une vue unique de la performance.",
      solution:
        "Une plateforme Power BI couvrant les entonnoirs d'acquisition multi-canal, les taux de conversion par source et segment, le comportement panier et les patterns d'upsell, les cohortes d'achats répétés et la modélisation ROI des campagnes. Actualisation automatique et reporting self-serve.",
      result:
        "L'équipe voit désormais clairement quels canaux apportent des clients de qualité versus du volume. Les revues de conversion passent du mensuel à l'hebdomadaire. Les décisions budgétaires s'appuient sur le comportement plutôt que sur des métriques de vanité, améliorant l'efficacité marketing.",
    },
    demo: {
      video: null,
      screenshots: [],
      highlights: [
        {
          en: 'Multi-channel acquisition funnel with cross-source customer journey mapping',
          fr: "Entonnoir d'acquisition multi-canal avec cartographie du parcours client cross-source",
        },
        {
          en: 'Conversion rate analysis segmented by traffic source, device and customer profile',
          fr: 'Analyse du taux de conversion par source de trafic, appareil et profil client',
        },
        {
          en: 'Retention cohort analysis connecting acquisition cost to lifetime value',
          fr: "Analyse de cohortes de rétention reliant coût d'acquisition à la valeur vie client",
        },
        {
          en: 'Campaign ROI modelling with automated self-serve reporting for commercial teams',
          fr: 'Modélisation du ROI des campagnes avec reporting self-serve automatisé pour les équipes commerciales',
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
        'My team and I got third place in a hackathon challenge by building a trend model that links what gamers say to how they act to turn noise into signals that matter to product teams.',
      context:
        'The Ubisoft Challenge asked student teams to go beyond summaries and deliver strategic intelligence on gaming trends and player behaviour. We needed to understand what players were actually saying, feeling and doing across multiple platforms.',
      problem:
        'Player behaviour is scattered across reviews, forums, social feeds and streams. Analysing each in isolation misses the bigger picture. We had to integrate these signals to see where expectations were shifting and why.',
      approach:
        'I led the analytics workstream: collecting data from multiple sources, applying NLP to extract sentiment and themes, and building a trend framework linking language patterns to behavioural indicators. We focused on four strategic vectors relevant to Ubisoft\'s portfolio.',
      solution:
        'A player intelligence system combining NLP sentiment and topic analysis across reviews, forums and social content, cross-referenced with engagement and retention data. We synthesised four trend vectors with direct strategic implications for Ubisoft\'s product categories.',
      result:
        'We placed third out of 17 teams. Our method showed how unstructured player language, when properly mined, can surface strategic signals well ahead of conventional research. The four vectors we identified were validated by Ubisoft\'s panel as relevant to active product decisions.',
    },
    fr: {
      title:    'Ubisoft Challenge 2023',
      subtitle: 'Analyse des tendances gaming & comportement joueurs',
      impact:
        "Mon équipe et moi avons gagné la troisième place à un hackathon en construisant un modèle de tendances qui relie ce que les joueurs disent à ce qu'ils font transformant le bruit en signaux utiles pour les équipes produit.",
      context:
        "Le Ubisoft Challenge demandait aux équipes étudiantes d'aller au-delà des résumés et de livrer une intelligence stratégique sur les tendances et le comportement joueurs. Il fallait comprendre ce que les joueurs disaient, ressentaient et faisaient réellement.",
      problem:
        "Le comportement des joueurs est dispersé entre critiques, forums, réseaux sociaux et streams. Analyser chaque source isolément fait perdre la vue d'ensemble. Il fallait intégrer ces signaux pour voir où les attentes évoluaient et pourquoi.",
      approach:
        "J'ai piloté le volet analytique : collecte de données multi-sources, application de NLP pour extraire sentiment et thèmes, et construction d'un cadre de tendances reliant patterns linguistiques à des indicateurs comportementaux. Nous nous sommes concentrés sur quatre vecteurs stratégiques pertinents pour le portefeuille Ubisoft.",
      solution:
        "Un système d'intelligence joueur combinant analyse NLP du sentiment et des thèmes sur critiques, forums et contenus sociaux, croisée avec des données d'engagement et de rétention. Nous avons synthétisé quatre vecteurs avec des implications directes pour les catégories de produits d'Ubisoft.",
      result:
        "Nous avons terminé troisièmes sur 17 équipes. La méthode a montré comment le langage joueur non structuré, correctement exploité, peut faire émerger des signaux stratégiques bien avant les recherches classiques. Les quatre vecteurs identifiés ont été validés par le jury comme pertinents pour les décisions produits en cours.",
    },
    demo: {
      video: null,
      screenshots: [],
      highlights: [
        {
          en: 'NLP sentiment and topic mining across reviews, forums and social gaming communities',
          fr: 'Text mining NLP du sentiment et des sujets sur reviews, forums et communautés gaming sociales',
        },
        {
          en: "Four strategic trend vectors mapped to Ubisoft's product categories",
          fr: "Quatre vecteurs de tendances stratégiques mappés sur les catégories produits Ubisoft",
        },
        {
          en: 'Cross-referencing language patterns with engagement and retention behavioural data',
          fr: "Croisement des patterns linguistiques avec les données comportementales d'engagement et de rétention",
        },
        {
          en: "Trend modelling framework validated by Ubisoft's strategic panel — ranked 3rd/17",
          fr: 'Cadre de modélisation de tendance validé par le jury stratégique Ubisoft — 3ème/17',
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
        'I boosted forecast accuracy by 22% reducing stockouts and overstock while giving the supply team confidence that the numbers matched reality.',
      context:
        'The supply chain team needed a structured way to read demand signals and translate them into accurate inventory calls. Across a multi-SKU portfolio, the gap between forecast and actual behaviour quietly generated waste.',
      problem:
        'Forecasts relied on gut feeling and spreadsheets. Seasonality, promo response and channel velocity weren\'t systematically captured or modelled. Errors meant empty shelves in peak times and too much inventory when demand slowed.',
      approach:
        'I analysed three years of sell-in and sell-out data to map real purchasing behaviour by category, channel and period. I quantified seasonality, promo uplift and channel velocity differences, then folded them into a scenario-ready framework.',
      solution:
        'A multi-factor demand model combining sell-out velocity, weighted sell-in history, promotional calendar adjustments, seasonality and scenario planning. High-risk SKUs are flagged automatically and end-of-period accuracy reports enable continuous calibration.',
      result:
        'Forecast accuracy improved by 22%. Stockouts fell across key SKUs, overstock shrank and working capital efficiency improved. Planning shifted from reactive to proactive with a clear read on demand.',
    },
    fr: {
      title:    'Modèle de prévision de la demande',
      subtitle: "Système d'intelligence de la demande client",
      impact:
        "Amélioration de la précision des prévisions de 22 % — réduisant les ruptures et les surstocks tout en donnant confiance à l'équipe supply dans la fiabilité des chiffres.",
      context:
        "L'équipe supply avait besoin d'une approche structurée pour lire les signaux de demande et les traduire en décisions de stock. Sur un portefeuille multi-SKU, l'écart entre prévision et réalité générait discrètement des gaspillages.",
      problem:
        "Les prévisions reposaient sur l'intuition et des tableurs. Saisonnalité, réactions promotionnelles et vélocité par canal n'étaient pas capturées ni modélisées. Les erreurs entraînaient des ruptures en période de forte demande et des surstocks lorsque le marché ralentissait.",
      approach:
        "J'ai analysé trois ans de données sell-in et sell-out pour cartographier le comportement d'achat réel par catégorie, canal et période. J'ai quantifié la saisonnalité, l'uplift promotionnel et les différences de vélocité par canal, puis intégré le tout dans un cadre de scénarios.",
      solution:
        "Un modèle de demande multi-facteurs combinant vélocité de sell-out, historique sell-in pondéré, ajustements du calendrier promotionnel, indices de saisonnalité et planification par scénarios. Les SKUs à risque sont signalés automatiquement et les rapports de précision de fin de période permettent un calibrage continu.",
      result:
        "La précision des prévisions s'est améliorée de 22 %. Les ruptures ont diminué sur les SKUs clés, les surstocks ont réduit et l'efficacité du BFR s'est améliorée. La planification est devenue proactive grâce à une lecture claire de la demande.",
    },
    demo: {
      video: null,
      screenshots: [],
      highlights: [
        {
          en: 'Multi-factor demand model combining sell-out velocity and weighted sell-in history',
          fr: 'Modèle de demande multi-facteurs combinant vélocité sell-out et historique sell-in pondéré',
        },
        {
          en: 'Seasonality indices and promotional uplift coefficients by category and channel',
          fr: "Indices de saisonnalité et coefficients d'uplift promotionnel par catégorie et canal",
        },
        {
          en: 'Automated high-risk SKU detection with period-end accuracy reporting',
          fr: 'Détection automatisée des SKUs à risque avec reporting de précision en fin de période',
        },
        {
          en: 'Scenario-planning capabilities for peak demand and promotional periods',
          fr: 'Capacités de planification par scénarios pour les périodes de forte demande et promotions',
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
        'I used Kotler\'s 6A framework and PCA to decode why customers really switch to uncover four archetypes that would help brands in FMCG retain their audience.',
      context:
        'Understanding why customers change brands is commercially valuable but methodologically tough. This project sought to move beyond what people say to uncover the behavioural and attitudinal patterns that actually predict switching.',
      problem:
        'Traditional loyalty analysis only highlights symptoms — a bad last interaction or momentary price sensitivity — without capturing deeper drivers. Brands end up reacting to churn instead of anticipating it. The question: what signals predict switching before it happens?',
      approach:
        'I designed a primary study in Qualtrics around the Kotler 6A framework (Aware, Appeal, Ask, Act, Advocate, Aware again) to capture attitudes at each stage. Then I applied PCA in SPSS to reduce dimensionality and find the latent factors driving switching.',
      solution:
        'A behavioural model combining survey data, PCA-derived factors and the 6A framework. It yielded four distinct switching archetypes with clear behavioural profiles, mapped to intervention points in the customer journey.',
      result:
        'Four archetypes emerged, each representing a different path to switching. The model showed that most decisions are predictable well before defection, driven by attitudinal erosion earlier in the 6A cycle. It informed retention strategies with targeting logic by archetype.',
    },
    fr: {
      title:    'Intelligence du comportement de switching client',
      subtitle: 'Drivers comportementaux & analyse de défection de fidélité',
      impact:
        "J'ai utilisé le framework 6A de Kotler et la PCA pour décoder pourquoi les clients changent vraiment dévoilant quatre archétypes qui pourraient aider les marques dans la FMCG à retenir leur audience.",
      context:
        "Comprendre pourquoi les clients changent de marque est précieux commercialement mais difficile méthodologiquement. Ce projet visait à dépasser les déclarations pour révéler les patterns comportementaux et attitudinaux qui prédisent le switching.",
      problem:
        "L'analyse classique de la fidélité ne fait remonter que des symptômes — une mauvaise dernière interaction ou une sensibilité prix ponctuelle — sans capter les drivers profonds. Les marques réagissent au churn au lieu de l'anticiper. La question : quels signaux prédisent le switching avant qu'il n'arrive ?",
      approach:
        "J'ai conçu une étude primaire sur Qualtrics autour du framework 6A (Aware, Appeal, Ask, Act, Advocate, Aware again) pour capter l'attitude à chaque étape. Ensuite, j'ai appliqué la PCA dans SPSS pour réduire la dimension et trouver les facteurs latents qui pilotent le switching.",
      solution:
        "Un modèle comportemental combinant données d'enquête, facteurs dérivés de la PCA et framework 6A. Il a produit quatre archétypes distincts avec des profils comportementaux clairs, mappés sur des points d'intervention du parcours client.",
      result:
        "Quatre archétypes ont émergé, chacun représentant un chemin différent vers le switching. Le modèle a montré que la plupart des décisions sont prévisibles bien avant la défection, pilotées par une érosion attitudinale en amont dans le cycle 6A. Il a éclairé des stratégies de rétention avec un ciblage par archétype.",
    },
    demo: {
      video: null,
      screenshots: [],
      highlights: [
        {
          en: 'Kotler 6A framework mapped to a structured Qualtrics survey instrument across brand stages',
          fr: 'Framework 6A de Kotler appliqué à un questionnaire Qualtrics structuré sur les étapes de la marque',
        },
        {
          en: 'PCA in SPSS reducing the attitudinal dataset to latent factor structure driving switching',
          fr: 'PCA dans SPSS réduisant le jeu de données attitudinal à la structure factorielle latente pilotant le switching',
        },
        {
          en: 'Four behavioural switching archetypes with statistically grounded profiles',
          fr: 'Quatre archétypes de switching comportemental avec profils statistiquement fondés',
        },
        {
          en: 'Intervention mapping by archetype — identifying predictable switching conditions before defection',
          fr: 'Cartographie des interventions par archétype — identifier les conditions de switching avant la défection',
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
          en: 'Seasonal Signals — Tableau Dashboard',
          fr: 'Seasonal Signals — Dashboard Tableau',
        },
        caption: {
          en: 'Cultural sentiment dashboard · Open with Tableau Desktop or Tableau Public',
          fr: 'Dashboard de sentiment culturel · Ouvrir avec Tableau Desktop ou Tableau Public',
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
