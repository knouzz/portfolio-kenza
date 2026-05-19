// Structured display data for ProjectModal case study view.
// Keyed by project id, then lang ('en' | 'fr').
// Each entry has: context[], challenge[], approach[{n, text}], insights[], impact[]

export const projectBullets = {

'product-data-hub': {
  en: {
    context: [
      'At Sushi Shop, product launches relied on multiple disconnected Excel files shared between Marketing, NPD, IT and international operations teams, creating a fragmented and highly manual workflow.',
      'The same product information had to be entered repeatedly across recipe sheets, marketing documents and IT files, with no centralized structure or automated logic.',
      'As the number of launches and collaborations increased, operational complexity grew faster than the process itself could handle.',
    ],

    challenge: [
      'Creating a single product could take up to 2 hours due to repetitive manual input across multiple files and departments.',
      'A small inconsistency in one document could impact cash registers, kiosks or digital ordering platforms downstream.',
      'The real issue wasn’t individual execution, it was a workflow architecture that depended too heavily on manual repetition.',
    ],

    approach: [
      { n: 1, text: 'Started with a full workflow analysis to understand how product information moved between NPD, Marketing, IT and international operational teams.' },

      { n: 2, text: 'Conducted field observations and interviews with cross-functional stakeholders to identify bottlenecks, duplicate tasks and coordination gaps.' },

      { n: 3, text: 'Redesigned the process around a single-entry logic: input information once and automate all downstream IT documentation.' },

      { n: 4, text: 'Developed Product Hub using Excel, VBA and structured data architecture, including automated IT file generation, archive management and role-based workflows.' },

      { n: 5, text: 'Integrated analytical thinking into the project through a Power BI performance dashboard currently in development to support long-term decision making.' },
    ],

    insights: [
      'Operational inefficiency often comes from fragmented systems rather than from people or lack of effort.',
      'The biggest performance gains came from simplifying workflows and reducing unnecessary human intervention.',
      'Tools designed around real user behavior drive adoption far more effectively than overly complex systems.',
    ],

    impact: [
      '75% reduction in product creation time (from 2 hours to 30 minutes)',
      '≈360 operational hours saved annually.',
      'Estimated €9,000 annual operational savings.',
      'Significant reduction in data inconsistencies and manual errors.',
      'Improved coordination between Marketing, IT, NPD and operational teams.',
    ],
  },

  fr: {
    context: [
      'Chez Sushi Shop, les lancements produits reposaient sur plusieurs fichiers Excel déconnectés partagés entre les équipes Marketing, NPD, IT et opérations internationales, créant un workflow fragmenté et très manuel.',
      'Les mêmes informations devaient être ressaisies dans différents documents : fiches recettes, fichiers marketing et documents IT, sans structure centralisée ni logique automatisée.',
      'Avec l’augmentation des lancements et des collaborations, la complexité opérationnelle grandissait plus vite que les processus existants ne pouvaient la supporter.',
    ],

    challenge: [
      'La création d’un seul produit pouvait prendre jusqu’à 2 heures en raison des multiples saisies manuelles entre fichiers et départements.',
      'Une simple incohérence dans un document pouvait avoir un impact direct sur les caisses, bornes ou plateformes digitales.',
      'Le problème principal ne venait pas des équipes, mais d’une architecture de workflow trop dépendante de la répétition manuelle.',
    ],

    approach: [
      { n: 1, text: 'Analyse complète du workflow afin de comprendre la circulation des données entre les équipes NPD, Marketing, IT et opérations internationales.' },

      { n: 2, text: 'Observations terrain et entretiens avec plusieurs parties prenantes pour identifier les points de friction, les doublons et les problèmes de coordination.' },

      { n: 3, text: 'Refonte du processus autour d’une logique de saisie unique : entrer l’information une seule fois puis automatiser tous les documents IT en aval.' },

      { n: 4, text: 'Développement du Product Hub sur Excel et VBA avec génération automatique des fichiers IT, système d’archivage et workflows organisés par équipe.' },

      { n: 5, text: 'Intégration d’une dimension analytique via un dashboard Power BI actuellement en développement afin de soutenir le pilotage de la performance produit.' },
    ],

    insights: [
      'Les inefficacités opérationnelles proviennent souvent de systèmes fragmentés plus que d’un manque d’effort des équipes.',
      'Les gains de performance les plus importants viennent de la simplification des workflows et de la réduction des manipulations inutiles.',
      'Les outils conçus autour des usages réels des équipes favorisent beaucoup plus l’adoption que les systèmes trop complexes.',
    ],

    impact: [
      '75 % de réduction du temps de création produit (de 2 heures à 30 minutes)',
      '≈360 heures opérationnelles économisées par an.',
      '≈9 000 € d’économies opérationnelles estimées par an.',
      'Forte réduction des erreurs et incohérences liées aux données produits.',
      'Amélioration de la coordination entre les équipes Marketing, IT, NPD et opérations.',
    ],
  },
},

  'sales-dashboard': {
    en: {
      context: [
        'Commercial team had no real-time visibility into what was driving performance reporting arrived monthly, retrospectively, and too late for any meaningful response.',
        'Customer purchasing patterns, channel efficiency gaps, and performance risks were invisible until the opportunity had passed.',
        'Commercial decisions defaulted to intuition because the data, though it existed, was inaccessible when decisions needed to be made.',
      ],
      challenge: [
        'High-performing customer segments went unrecognised until too late to capitalise; underperforming channels went uncorrected in time.',
        'No KPI architecture existed each team tracked different metrics with no common framework for commercial performance.',
        'Building a dashboard people would actually use required designing backwards from the decision, not from the available data.',
      ],
      approach: [
        { n: 1, text: 'Decision-first architecture: mapped what each role needed to know and act on commercial manager, regional lead, business manager before selecting a single metric.' },
        { n: 2, text: 'Defined 15+ KPIs across customer segment performance, channel acquisition and conversion, promotional effectiveness, and target-vs-actual tracking.' },
        { n: 3, text: 'Built the Power BI data model connecting all source systems automated daily refresh, accessible across devices.' },
        { n: 4, text: 'Designed views by user role: 30-second executive view, drill-down operational views per region and channel.' },
        { n: 5, text: 'Ran adoption sessions with commercial team designed UX for non-analysts, no training required to read key signals.' },
      ],
      insights: [
        'Designing backwards from the decision (not from the data) is what separates dashboards that get used from dashboards that get ignored.',
        'Cycle time from 4 weeks to 1 day is not a reporting improvement, it fundamentally changes which decisions can be made proactively.',
        'One regional manager identified a mid-cycle distribution gap using the dashboard that would have been invisible until quarter-end under the old system.',
      ],
      impact: [
        'Reporting cycle reduced from 4 weeks to 1 day.',
        '15+ live performance indicators across 3 regions.',
        '100% commercial team adoption no dedicated training needed.',
        'Enabled proactive in-period intervention for the first time.',
      ],
    },
    fr: {
      context: [
        'L\'équipe commerciale n\'avait aucune visibilité en temps réel sur les drivers de performance reporting mensuel, rétrospectif, trop tardif pour toute réponse significative.',
        'Les patterns d\'achat client, les gaps d\'efficacité par canal et les risques de performance étaient invisibles jusqu\'à ce que l\'opportunité soit passée.',
        'Les décisions commerciales se prenaient à l\'instinct car les données, bien qu\'existantes, n\'étaient pas accessibles au moment des décisions.',
      ],
      challenge: [
        'Les segments clients performants non reconnus à temps ; les canaux sous-performants non corrigés avant que les dégâts soient faits.',
        'Aucune architecture KPI n\'existait chaque équipe suivait des métriques différentes sans cadre commun de performance commerciale.',
        'Construire un dashboard que les gens utiliseraient vraiment exigeait de concevoir à rebours de la décision, pas de la donnée disponible.',
      ],
      approach: [
        { n: 1, text: 'Architecture décision-first : cartographie de ce que chaque rôle devait savoir et faire manager commercial, responsable régional, business manager avant de sélectionner une seule métrique.' },
        { n: 2, text: 'Définition de 15+ KPIs : performance par segment client, acquisition et conversion par canal, efficacité promotionnelle, suivi objectif-vs-réel.' },
        { n: 3, text: 'Construction du modèle de données Power BI connectant tous les systèmes sources actualisation automatisée quotidienne, accessible sur tous les appareils.' },
        { n: 4, text: 'Vues conçues par rôle utilisateur : vue exécutive 30 secondes, vues opérationnelles drill-down par région et canal.' },
        { n: 5, text: 'Sessions d\'adoption avec l\'équipe commerciale UX conçue pour les non-analystes, aucune formation requise pour lire les signaux clés.' },
      ],
      insights: [
        'Concevoir à rebours de la décision (pas de la donnée) est ce qui distingue les dashboards utilisés de ceux ignorés.',
        'Passer de 4 semaines à 1 jour n\'est pas une amélioration de reporting cela change fondamentalement quelles décisions peuvent être prises proactivement.',
        'Un responsable régional a détecté un gap de distribution en milieu de cycle qui aurait été invisible jusqu\'à la fin de trimestre dans l\'ancien système.',
      ],
      impact: [
        'Cycle de reporting réduit de 4 semaines à 1 jour.',
        '15+ indicateurs de performance en direct sur 3 régions.',
        '100% d\'adoption par l\'équipe commerciale aucune formation dédiée.',
        'Intervention proactive en cours de période rendue possible pour la première fois.',
      ],
    },
  },

  'collaboration-analytics': {
    en: {
      context: [
        'Commercial team and retail partners measuring performance differently, tracking different customer metrics, and drawing different conclusions from the same market signals.',
        'No shared visibility into customer purchasing behavior trends, channel-specific patterns, or product performance by retail environment.',
        'Collaborative planning sessions built on competing assumptions no common evidence base for commercial decisions.',
      ],
      challenge: [
        'Without a unified KPI framework, every planning conversation started by debating the numbers rather than acting on them.',
        'Customer behavioral data existed across multiple retail systems but was never integrated into a single commercial view.',
        'The analytical framework had to work for both internal commercial teams and external retail partners simultaneously.',
      ],
      approach: [
        { n: 1, text: 'Mapped all data sources across retail systems identified overlaps, gaps, and reconciliation requirements before building anything.' },
        { n: 2, text: 'Built the KPI framework from the customer up: behavioral patterns by channel and segment, what was actually driving purchasing decisions.' },
        { n: 3, text: 'Structured metrics around shared commercial objectives rather than internal process making both sides measure the same thing.' },
        { n: 4, text: 'Automated data pulls from retail systems with built-in reconciliation logic to ensure data consistency at source.' },
        { n: 5, text: 'Designed a structured quarterly review cadence with defined input/output templates replacing ad hoc conversations with evidence-led planning.' },
      ],
      insights: [
        'The measurement problem was the planning problem once both sides shared a definition of success, planning conversations fundamentally changed in quality.',
        'Starting from the customer (not from the admin process) produced a KPI model that both commercial and retail teams wanted to use.',
        '+60% decision efficiency came from eliminating the pre-meeting data debate, not from faster reporting.',
      ],
      impact: [
        '+60% improvement in planning decision efficiency.',
        '1 unified performance view shared across all retail partnerships.',
        '100% cross-team adoption of the shared KPI framework.',
        'Planning shifted from assumption-based to evidence-led.',
      ],
    },
    fr: {
      context: [
        'Équipe commerciale et partenaires retail mesurant la performance différemment, suivant des métriques client différentes, et tirant des conclusions différentes des mêmes signaux marché.',
        'Aucune visibilité partagée sur les tendances de comportement d\'achat client, les patterns par canal, ni la performance produit par environnement retail.',
        'Sessions de planification collaborative basées sur des hypothèses concurrentes aucune base de preuve commune pour les décisions commerciales.',
      ],
      challenge: [
        'Sans framework KPI unifié, chaque conversation de planification commençait par débattre des chiffres plutôt qu\'agir dessus.',
        'Les données comportementales client existaient dans plusieurs systèmes retail mais n\'avaient jamais été intégrées en vue commerciale unique.',
        'Le cadre analytique devait fonctionner simultanément pour les équipes commerciales internes et les partenaires retail externes.',
      ],
      approach: [
        { n: 1, text: 'Cartographie de toutes les sources de données des systèmes retail, identification des chevauchements, lacunes et exigences de réconciliation avant de construire quoi que ce soit.' },
        { n: 2, text: 'Construction du framework KPI en partant du client : patterns comportementaux par canal et segment, ce qui pilotait vraiment les décisions d\'achat.' },
        { n: 3, text: 'Métriques structurées autour d\'objectifs commerciaux partagés plutôt que de processus internes, faire mesurer la même chose aux deux parties.' },
        { n: 4, text: 'Extractions automatisées des systèmes retail avec logique de réconciliation intégrée pour assurer la cohérence des données à la source.' },
        { n: 5, text: 'Cadence de revue trimestrielle structurée avec templates input/output définis, remplaçant les conversations ad hoc par une planification fondée sur les preuves.' },
      ],
      insights: [
        'Le problème de mesure était le problème de planification, une fois que les deux parties partageaient une définition du succès, les conversations ont fondamentalement changé de qualité.',
        'Partir du client (pas du processus administratif) a produit un modèle KPI que les deux équipes voulaient utiliser.',
        '+60% d\'efficacité décisionnelle en éliminant le débat pré-réunion sur les données, pas en accélérant le reporting.',
      ],
      impact: [
        '+60% d\'amélioration de l\'efficacité décisionnelle en planification.',
        '1 vue performance unifiée partagée sur tous les partenariats retail.',
        '100% d\'adoption du framework KPI partagé cross-équipes.',
        'Planification passée de basée sur les hypothèses à fondée sur les preuves.',
      ],
    },
  },

  'la-redoute': {
    en: {
      context: [
        'La Redoute, one of France\'s leading fashion and home e-commerce brands with access to raw acquisition and conversion data but no structured intelligence layer.',
        'Acquisition channels tracked in silos: paid search, social, email, and organic each reported independently with no cross-channel view of customer journey quality.',
        'The team couldn\'t identify which customer segments were generating genuine lifetime value versus high-acquisition, low-retention profiles.',
      ],
      challenge: [
        'Last-click attribution and siloed reporting made it impossible to understand which channels were actually driving quality customers vs. volume.',
        'Conversion analysis was retrospective and surface-level no visibility into where and why customers were dropping off.',
        'Budget allocation was based on top-line traffic metrics, not on behavioral quality, creating systematic misallocation.',
      ],
      approach: [
        { n: 1, text: 'Mapped the full customer journey: from first acquisition touchpoint to repeat purchase behavior identified 3+ distinct acquisition funnels.' },
        { n: 2, text: 'Built a Power BI data model connecting acquisition cost data to conversion funnel metrics and retention signals downstream.' },
        { n: 3, text: 'Developed advanced DAX measures for customer segment performance, basket behavior, upsell patterns, and cohort retention tracking.' },
        { n: 4, text: 'Designed campaign ROI modelling layer connecting spend to customer lifetime value, not just first-purchase conversion.' },
        { n: 5, text: 'Deployed self-serve reporting with automated refresh commercial stakeholders could access intelligence directly without analyst dependency.' },
      ],
      insights: [
        'Acquisition cost and customer quality were inversely correlated in certain channels the cheapest traffic was generating the highest-churn customers.',
        'Basket behavior and repeat purchase patterns were the real quality differentiators between segment types, invisible under top-line conversion metrics.',
        'Moving from monthly retrospective to weekly cycle review changed which decisions could be made not just how fast.',
      ],
      impact: [
        'Multi-channel acquisition funnel visibility : 3+ funnels mapped end-to-end.',
        'Conversion analysis moved from monthly retrospective to weekly cycle review.',
        '100% self-serve reporting adoption by commercial stakeholders.',
        'Budget allocation decisions grounded in behavioral customer quality, not traffic volume.',
      ],
    },
    fr: {
      context: [
        'La Redoute, l\'une des premières enseignes françaises de mode et maison en e-commerce avec accès à des données d\'acquisition et conversion brutes mais pas de couche d\'intelligence structurée.',
        'Canaux d\'acquisition suivis en silos : search payant, social, email et organique reportaient indépendamment sans vision cross-canal de la qualité du parcours client.',
        'L\'équipe ne pouvait pas identifier quels segments clients généraient une vraie valeur vie versus des profils haute acquisition-faible rétention.',
      ],
      challenge: [
        'Attribution last-click et reporting en silos rendaient impossible de comprendre quels canaux généraient vraiment des clients de qualité vs. du volume.',
        'L\'analyse de conversion était rétrospective et superficielle aucune visibilité sur où et pourquoi les clients abandonnaient.',
        'L\'allocation budgétaire basée sur les métriques de trafic global, pas sur la qualité comportementale, créant une mauvaise allocation systématique.',
      ],
      approach: [
        { n: 1, text: 'Cartographie du parcours client complet : du premier point de contact d\'acquisition au comportement d\'achat répété, 3+ entonnoirs d\'acquisition distincts identifiés.' },
        { n: 2, text: 'Construction d\'un modèle de données Power BI connectant coût d\'acquisition aux métriques de funnel de conversion et signaux de rétention en aval.' },
        { n: 3, text: 'Mesures DAX avancées : performance par segment client, comportement panier, patterns d\'upsell et tracking de rétention par cohorte.' },
        { n: 4, text: 'Couche de modélisation ROI campagnes reliant les dépenses à la valeur vie client, pas seulement à la conversion premier achat.' },
        { n: 5, text: 'Déploiement du reporting self-serve avec actualisation automatisée les parties prenantes commerciales accèdent à l\'intelligence directement sans dépendance analyste.' },
      ],
      insights: [
        'Coût d\'acquisition et qualité client inversement corrélés dans certains canaux le trafic le moins cher générait les clients avec le churn le plus élevé.',
        'Comportement panier et patterns d\'achat répété étaient les vrais différenciateurs de qualité entre types de segments invisibles sous les métriques de conversion global.',
        'Passer de la rétrospective mensuelle à la revue hebdomadaire a changé quelles décisions pouvaient être prises pas seulement à quelle vitesse.',
      ],
      impact: [
        'Visibilité funnel d\'acquisition multi-canal : 3+ entonnoirs cartographiés de bout en bout.',
        'Analyse de conversion passée de rétrospective mensuelle à revue hebdomadaire.',
        '100% d\'adoption du reporting self-serve par les parties prenantes commerciales.',
        'Allocation budgétaire fondée sur la qualité comportementale client, pas le volume de trafic.',
      ],
    },
  },

  'ubisoft-gaming-trends': {
    en: {
      context: [
        'Ubisoft Challenge 2023: tasked student teams with delivering genuine strategic intelligence on gaming market trends and player behavior not summaries, but data-driven insight for real product and marketing decisions.',
        'Player behavior fragmented across platforms, communities, and content formats: reviews, forums, social, streaming each carry different signals.',
        'The challenge required going beyond public statistics to understand what players were actually saying, feeling, and anticipating.',
      ],
      challenge: [
        'Integrating signals from heterogeneous unstructured sources into a coherent trend model with commercial relevance without losing analytical rigor.',
        'NLP applied to player-generated content at scale required designing a collection, cleaning, and modeling pipeline from scratch.',
        'Strategic insight had to be mapped to Ubisoft\'s actual product categories not generic gaming trends but actionable intelligence for specific decisions.',
      ],
      approach: [
        { n: 1, text: 'Designed multi-source data collection: reviews (Steam, Metacritic), community forums (Reddit, Discord), and social gaming content structured taxonomy per source.' },
        { n: 2, text: 'Applied NLP text mining to extract sentiment polarity and topic clusters from player-generated content at scale.' },
        { n: 3, text: 'Cross-referenced language patterns with engagement and retention behavioral indicators to validate signal quality.' },
        { n: 4, text: 'Built a trend modeling framework structured around 4 strategic vectors most relevant to Ubisoft\'s portfolio decisions.' },
        { n: 5, text: 'Synthesised into a decision-ready strategic brief mapped to Ubisoft\'s product categories and target player segments with intervention recommendations.' },
      ],
      insights: [
        'Unstructured player language, when properly mined and modeled, surfaces strategic signal well ahead of conventional market research timelines.',
        'Community forum sentiment diverged significantly from review scores players articulating evolving expectations that review ratings did not capture.',
        'Four trend vectors identified were validated by Ubisoft\'s panel as directly relevant to active product development decisions.',
      ],
      impact: [
        'Ranked 3rd out of 17 teams by Ubisoft\'s strategic panel.',
        '4 actionable trend vectors identified and validated.',
        'NLP + behavioral data integration methodology demonstrated for strategic use cases.',
        'Framework validated as directly applicable to active Ubisoft product development decisions.',
      ],
    },
    fr: {
      context: [
        'Ubisoft Challenge 2023 : équipes étudiantes mandatées pour livrer une véritable intelligence stratégique sur les tendances gaming et le comportement joueur pas des synthèses, mais des insights data-driven pour de vraies décisions produit et marketing.',
        'Comportement joueur fragmenté sur plateformes, communautés et formats de contenu : reviews, forums, social, streaming portent chacun des signaux différents.',
        'Le défi exigeait d\'aller au-delà des statistiques publiques pour comprendre ce que les joueurs disaient, ressentaient et anticipaient réellement.',
      ],
      challenge: [
        'Intégrer des signaux de sources hétérogènes non structurées en un modèle de tendances cohérent à pertinence commerciale sans perdre la rigueur analytique.',
        'NLP appliqué au contenu joueur à grande échelle nécessitait de concevoir un pipeline de collecte, nettoyage et modélisation from scratch.',
        'L\'insight stratégique devait être mappé sur les catégories produits réelles d\'Ubisoft pas des tendances gaming génériques mais une intelligence actionnable pour des décisions spécifiques.',
      ],
      approach: [
        { n: 1, text: 'Collecte multi-sources : reviews (Steam, Metacritic), forums communautaires (Reddit, Discord), contenu gaming social taxonomie structurée par source.' },
        { n: 2, text: 'Text mining NLP : extraction de polarité de sentiment et clusters thématiques du contenu joueur généré à grande échelle.' },
        { n: 3, text: 'Croisement des patterns linguistiques avec indicateurs comportementaux d\'engagement et rétention pour valider la qualité du signal.' },
        { n: 4, text: 'Framework de modélisation des tendances structuré autour de 4 vecteurs stratégiques les plus pertinents pour les décisions de portefeuille Ubisoft.' },
        { n: 5, text: 'Synthèse en brief stratégique decision-ready mappé sur les catégories produits et segments joueurs d\'Ubisoft avec recommandations d\'intervention.' },
      ],
      insights: [
        'Le langage joueur non structuré, correctement miné et modélisé, fait émerger un signal stratégique bien avant les délais de recherche marché conventionnels.',
        'Le sentiment des forums communautaires divergeait significativement des scores de reviews des attentes évolutives que les notes ne capturaient pas.',
        'Les 4 vecteurs de tendances identifiés ont été validés par le jury Ubisoft comme directement pertinents pour des décisions de développement produit actives.',
      ],
      impact: [
        'Classée 3ème sur 17 équipes par le jury stratégique Ubisoft.',
        '4 vecteurs de tendances actionnables identifiés et validés.',
        'Méthodologie NLP + intégration données comportementales démontrée pour des cas d\'usage stratégiques.',
        'Framework validé comme directement applicable aux décisions de développement produit Ubisoft actives.',
      ],
    },
  },

  'forecasting-model': {
    en: {
      context: [
        'Supply chain team across a multi-SKU FMCG portfolio with no structured system for reading customer demand signals forecasting relied on intuition with a spreadsheet as the only paper trail.',
        'Customer demand patterns, seasonality, promotional response, channel-specific velocity were not being systematically captured or modeled.',
        'The margin of error was costing the business on both ends: stockouts during demand peaks and overstock during slowdowns.',
      ],
      challenge: [
        'Three years of historical sell-in and sell-out data existed but had never been structured for analytical use pattern extraction required significant data preparation first.',
        'Promotional uplift, seasonality, and channel velocity behaved differently across SKUs no single model fit all categories.',
        'The output had to be usable by non-analysts in supply chain planning not just analytically rigorous, but operationally actionable.',
      ],
      approach: [
        { n: 1, text: 'Structured 3 years of sell-in and sell-out historical data by category, channel, and period, built clean analytical foundation before any modeling.' },
        { n: 2, text: 'Identified seasonality indices per category using decomposition analysis quantified recurring patterns in customer purchasing cycles.' },
        { n: 3, text: 'Quantified promotional uplift coefficients by SKU and channel measured actual customer demand response to promotional events historically.' },
        { n: 4, text: 'Modeled channel-specific velocity differentials recognized that sell-out patterns differ meaningfully by retail environment and customer profile.' },
        { n: 5, text: 'Built multi-factor demand model with scenario-planning capability, automated high-risk SKU flagging, and period-end accuracy reporting for continuous calibration.' },
      ],
      insights: [
        'Promotional uplift was being systematically overestimated in planning actual customer response was 15-30% lower than assumed across key SKUs.',
        'Channel velocity differentials meant that aggregate sell-in data masked significant variation at the SKU×channel level where the real risk sat.',
        'Accuracy reporting closing the loop: knowing where the model was wrong enabled continuous improvement in subsequent periods.',
      ],
      impact: [
        '+22% improvement in forecast accuracy.',
        'Reduction in stockout incidents across key SKUs.',
        'Supply planning shifted from reactive to proactive.',
        'Working capital efficiency improved as overstock positions reduced.',
      ],
    },
    fr: {
      context: [
        'Équipe supply chain sur un portefeuille FMCG multi-SKU sans système structuré pour lire les signaux de demande client les prévisions reposaient sur l\'intuition avec un tableur comme seule trace.',
        'Les patterns de demande client saisonnalité, réponse promotionnelle, vélocité par canal, n\'étaient pas capturés ni modélisés de façon systématique.',
        'La marge d\'erreur coûtait à l\'entreprise dans les deux sens : ruptures pendant les pics de demande et surstocks pendant les creux.',
      ],
      challenge: [
        'Trois ans de données historiques sell-in et sell-out existaient mais n\'avaient jamais été structurées pour usage analytique l\'extraction de patterns nécessitait d\'abord une préparation significative des données.',
        'L\'uplift promotionnel, la saisonnalité et la vélocité par canal se comportaient différemment selon les SKUs aucun modèle unique ne convenait à toutes les catégories.',
        'L\'output devait être utilisable par des non-analystes en planification supply chain pas seulement analytiquement rigoureux, mais opérationnellement actionnable.',
      ],
      approach: [
        { n: 1, text: 'Structuration de 3 ans de données historiques sell-in et sell-out par catégorie, canal et période fondation analytique propre avant tout modèle.' },
        { n: 2, text: 'Identification des indices de saisonnalité par catégorie via analyse de décomposition quantification des patterns récurrents dans les cycles d\'achat client.' },
        { n: 3, text: 'Quantification des coefficients d\'uplift promotionnel par SKU et canal mesure de la réponse réelle de la demande client aux événements promotionnels.' },
        { n: 4, text: 'Modélisation des différentiels de vélocité par canal, reconnaissance que les patterns sell-out diffèrent significativement selon l\'environnement retail et le profil client.' },
        { n: 5, text: 'Modèle de demande multi-facteurs avec capacité de scénarios, signalement automatisé des SKUs à risque élevé et reporting de précision en fin de période pour calibrage continu.' },
      ],
      insights: [
        'L\'uplift promotionnel était systématiquement surestimé en planification la réponse client réelle était 15-30% inférieure aux hypothèses sur les SKUs clés.',
        'Les différentiels de vélocité par canal signifiaient que les données sell-in agrégées masquaient une variation significative au niveau SKU×canal, là où se trouvait le vrai risque.',
        'Le reporting de précision fermant la boucle : savoir où le modèle se trompait permettait une amélioration continue dans les périodes suivantes.',
      ],
      impact: [
        '+22% d\'amélioration de la précision des prévisions.',
        'Réduction des incidents de rupture sur les SKUs clés.',
        'Planification supply chain passée de réactive à proactive.',
        'Efficacité du BFR améliorée à mesure que les positions de surstock se réduisaient.',
      ],
    },
  },

  'customer-switching': {
    en: {
      context: [
        'Research project built around one of the hardest questions in consumer analytics: what actually predicts a customer\'s propensity to switch brands before they do it?',
        'Traditional loyalty analysis surfaces symptoms of switching (price sensitivity at a moment, last-interaction dissatisfaction) without capturing the latent attitudinal drivers.',
        'Brands end up reacting to defection events rather than anticipating the conditions that create switching intent.',
      ],
      challenge: [
        'Moving beyond stated consumer preferences to identify the latent behavioral and attitudinal structures that actually predict switching decisions, not what people say, but what drives them.',
        'Structuring a survey instrument that captured attitudinal data at each stage of the brand relationship, not just at the point of switching.',
        'Reducing a complex multi-variable attitudinal dataset to a model that was both statistically valid and commercially interpretable.',
      ],
      approach: [
        { n: 1, text: 'Structured the primary research instrument around Kotler\'s 6A consumer decision framework (Aware, Appeal, Ask, Act, Advocate, Aware) capturing attitudinal data at each stage of the brand relationship lifecycle.' },
        { n: 2, text: 'Designed and fielded a Qualtrics survey built to surface latent attitudinal patterns, not just satisfaction scores or stated preferences.' },
        { n: 3, text: 'Applied Principal Component Analysis (PCA) in SPSS to reduce the dimensionality of the attitudinal dataset and identify the latent factor structure driving switching behavior.' },
        { n: 4, text: 'Validated the factor structure against switching propensity outcomes confirmed statistical significance of each archetype\'s behavioral pathway.' },
        { n: 5, text: 'Mapped archetypes to specific intervention points in the 6A brand relationship lifecycle translating statistical output into targeting logic for retention strategy.' },
      ],
      insights: [
        'Most switching decisions were predictable well before the defection event driven by attitudinal erosion at the Appeal and Ask stages of the 6A cycle, not at the point of price comparison.',
        'Four archetypes emerged with meaningfully different switching pathways: each required a different type of intervention at a different stage in the relationship.',
        'The PCA revealed that stated loyalty was a poor predictor of actual switching propensity latent attitudinal factors were far more predictive than self-reported measures.',
      ],
      impact: [
        '4 behavioral switching archetypes identified with statistically grounded profiles (PCA, SPSS)',
        'Kotler 6A framework operationalised as a quantitative research instrument not just a conceptual model.',
        'Switching predictable at earlier brand relationship stages reframing retention from reactive to anticipatory.',
        'Archetype-level targeting logic developed for retention strategy recommendations.',
      ],
    },
    fr: {
      context: [
        'Projet de recherche construit autour de l\'une des questions les plus difficiles en analytique consommateur : qu\'est-ce qui prédit réellement la propension d\'un client à switcher de marque avant qu\'il ne le fasse ?',
        'L\'analyse de fidélité traditionnelle fait remonter les symptômes du switching (sensibilité prix, insatisfaction de dernière interaction) sans capturer les drivers attitudinaux latents.',
        'Les marques réagissent aux événements de défection plutôt qu\'anticiper les conditions créant l\'intention de switching.',
      ],
      challenge: [
        'Aller au-delà des préférences déclarées pour identifier les structures comportementales et attitudinales latentes qui prédisent vraiment les décisions de switching pas ce que les gens disent, mais ce qui les pousse.',
        'Structurer un instrument de sondage capturant les données attitudinales à chaque étape de la relation marque, pas seulement au moment du switching.',
        'Réduire un dataset attitudinal multi-variables complexe en un modèle à la fois statistiquement valide et commercialement interprétable.',
      ],
      approach: [
        { n: 1, text: 'Instrument de recherche primaire structuré autour du framework 6A de Kotler (Aware, Appeal, Ask, Act, Advocate, Aware) capture des données attitudinales à chaque étape du cycle de vie de la relation marque.' },
        { n: 2, text: 'Conception et administration d\'une enquête Qualtrics construite pour faire émerger des patterns attitudinaux latents, pas seulement des scores de satisfaction ou des préférences déclarées.' },
        { n: 3, text: 'Application de l\'Analyse en Composantes Principales (ACP) dans SPSS pour réduire la dimensionnalité du dataset attitudinal et identifier la structure factorielle latente pilotant le switching.' },
        { n: 4, text: 'Validation de la structure factorielle contre les outcomes de propension au switching confirmation de la significativité statistique du chemin comportemental de chaque archétype.' },
        { n: 5, text: 'Mapping des archétypes sur des points d\'intervention spécifiques dans le cycle de vie 6A traduction de l\'output statistique en logique de ciblage pour la stratégie de rétention.' },
      ],
      insights: [
        'La plupart des décisions de switching étaient prévisibles bien avant l\'événement de défection, pilotées par une érosion attitudinale aux stades Appeal et Ask du cycle 6A, pas au moment de la comparaison de prix.',
        'Quatre archétypes avec des chemins de switching significativement différents : chacun nécessitait un type d\'intervention différent à un stade différent de la relation.',
        'L\'ACP a révélé que la fidélité déclarée était un mauvais prédicteur de la propension réelle au switching les facteurs attitudinaux latents étaient bien plus prédictifs que les mesures auto-reportées.',
      ],
      impact: [
        '4 archétypes de switching comportemental identifiés avec profils statistiquement fondés (ACP, SPSS)',
        'Framework 6A de Kotler opérationnalisé comme instrument de recherche quantitative pas seulement un modèle conceptuel.',
        'Switching prévisible à des stades antérieurs de la relation marque refonte de la rétention de réactive à anticipatoire.',
        'Logique de ciblage par archétype développée pour les recommandations de stratégie de rétention.',
      ],
    },
  },

  'cultural-sentiment-intelligence': {
    en: {
      context: [
        'Cultural releases, films, drops, brand moments generate enormous audience conversation before launch. Most of it goes unread, or arrives too late to act on.',
        'The gap: a continuous way to monitor what audiences are actually feeling not counting mentions, but distinguishing genuine excitement from anxiety-driven hype.',
        'This evolved from a one-time audience analysis into an automated intelligence product, built to run continuously and deliver on schedule, without analyst intervention.',
      ],
      challenge: [
        'Designing a system that generates intelligence on a schedule rather than on demand running automatically every 6 hours without anyone triggering it.',
        'Moving beyond surface metrics to separate genuine audience enthusiasm from fragmented or concern-driven hype volume alone doesn\'t tell you which.',
        'Producing output that non-technical stakeholders can act on immediately no data interpretation required, no analyst in the middle.',
      ],
      approach: [
        { n: 1, text: 'Connected three live audience data sources : Reddit, YouTube, and Google Trends into a unified signal feed refreshed automatically every 6 hours.' },
        { n: 2, text: 'Built an audience tone layer: excitement, concern, and sentiment quality scored per post distinguishing genuine enthusiasm from surface-level hype.' },
        { n: 3, text: 'Segmented audiences into 8 behavioral archetypes each defined by their emotional relationship to the release, not just their volume or engagement rate.' },
        { n: 4, text: 'Added an AI layer that reads the structured analysis and writes plain-English summaries automatically ready for a brand director or distribution team, no interpretation needed.' },
        { n: 5, text: 'Set up automated delivery: a severity alert when risk signals spike, and a Mon–Fri morning briefing intelligence arrives without anyone asking for it.' },
      ],
      insights: [
        'Hype volume and audience quality are often inversely correlated : DWP2 led on hype (0.484 vs 0.319) while trailing on positive sentiment (47.6% vs 53.1%): more noise, less confidence.',
        'A 4.7% audience segment carried 100% of the concern signal invisible under aggregate metrics, but critical for pre-release risk strategy.',
        'Automating the pipeline changed what the work is: from building analysis on demand to monitoring continuously and escalating only when something actually matters.',
        'Business-ready format removed the barrier between data and decision output went directly to stakeholders without analyst translation.',
      ],
      impact: [
        'Continuous monitoring across 3 live data sources refreshed every 6 hours, zero manual input.',
        '8 audience segments with distinct behavioral and emotional profiles.',
        'AI-generated summaries, stakeholder-ready intelligence, no analyst translation needed.',
        'Automated alerts + Mon–Fri briefings, intelligence arrives on schedule, not on request.',
        'Architecture built to extend to any cultural vertical or release type.',
      ],
    },
    fr: {
      context: [
        'Les sorties culturelles films, drops, moments de marque génèrent d\'énormes conversations d\'audience avant le lancement. La plupart passe inaperçue, ou arrive trop tard pour agir.',
        'Le manque : un moyen continu de monitorer ce que les audiences ressentent réellement pas compter les mentions, mais distinguer l\'enthousiasme genuine de la hype anxieuse.',
        'Ce projet a évolué d\'une analyse ponctuelle vers un produit d\'intelligence automatisé conçu pour tourner en continu et délivrer sur calendrier, sans intervention analyste.',
      ],
      challenge: [
        'Concevoir un système qui génère de l\'intelligence sur un calendrier plutôt qu\'à la demande tournant automatiquement toutes les 6h sans déclenchement manuel.',
        'Dépasser les métriques de surface pour séparer l\'enthousiasme genuine de la hype anxieuse le volume seul ne dit pas lequel c\'est.',
        'Produire une sortie sur laquelle les parties prenantes non techniques peuvent agir immédiatement sans interprétation des données, sans analyste intermédiaire.',
      ],
      approach: [
        { n: 1, text: 'Connexion de trois sources de données d\'audience live : Reddit, YouTube et Google Trends en un flux de signaux unifié rafraîchi automatiquement toutes les 6 heures.' },
        { n: 2, text: 'Couche d\'analyse du ton : excitation, préoccupation et qualité du sentiment scorés par post distinguant l\'enthousiasme genuine de la hype de surface.' },
        { n: 3, text: 'Segmentation des audiences en 8 archétypes comportementaux chacun défini par sa relation émotionnelle à la sortie, pas seulement le volume ou le taux d\'engagement.' },
        { n: 4, text: 'Ajout d\'une couche IA qui lit l\'analyse structurée et rédige des résumés en langage clair automatiquement prêts pour un directeur de marque ou une équipe de distribution.' },
        { n: 5, text: 'Livraison automatisée : alerte de sévérité quand les signaux de risque s\'emballent, et bilan matinal Lun–Ven l\'intelligence arrive sans que personne ne la demande.' },
      ],
      insights: [
        'Volume de hype et qualité d\'audience sont souvent inversement corrélés DWP2 menait sur le hype (0,484 vs 0,319) tout en étant derrière sur le sentiment positif (47,6% vs 53,1%) : plus de bruit, moins de confiance.',
        'Un segment de 4,7% portait 100% du signal de préoccupation invisible sous les métriques agrégées, mais critique pour la stratégie de risque pré-sortie.',
        'Automatiser le pipeline a changé la nature du travail : de la construction d\'analyses à la demande vers une intelligence continue qui n\'escalade que quand quelque chose compte vraiment.',
        'Le format business-ready a supprimé la barrière entre donnée et décision la sortie allait directement aux parties prenantes sans traduction analyste.',
      ],
      impact: [
        'Monitoring continu sur 3 sources de données live rafraîchi toutes les 6h, zéro saisie manuelle.',
        '8 segments d\'audience avec des profils comportementaux et émotionnels distincts.',
        'Résumés générés par IA intelligence prête pour les parties prenantes, sans traduction analyste.',
        'Alertes automatisées + bilans Lun–Ven l\'intelligence arrive sur calendrier, pas sur demande.',
        'Architecture conçue pour s\'étendre à tout vertical culturel ou type de sortie.',
      ],
    },
  },
}
