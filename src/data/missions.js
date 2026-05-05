export const missions = [
  {
    id: '01',
    title: 'sales performance dashboard',
    subtitle: 'power bi',
    type: 'dashboard',
    tools: ['power bi', 'dax', 'sql', 'excel'],
    status: 'completed',
    impact: 'high',
    description:
      'multi-market sales performance tracking dashboard enabling real-time kpi monitoring and cross-market comparisons across 5 regions.',
    context:
      'a regional sales team relied on weekly manual excel reports to track performance across 5 markets, causing delays, inconsistent views, and reactive decision-making.',
    problem:
      'no single source of truth for sell-in / sell-out data. decision-makers worked with outdated snapshots, leading to missed trends and slow responses.',
    approach: [
      'audited existing data sources and manual reporting workflows',
      'aligned on priority kpis with commercial and sales leadership',
      'designed a consolidated data model across market inputs',
      'built interactive visuals with drill-down by market, category, and period',
      'configured automated data refresh and alert thresholds',
    ],
    solution:
      'a consolidated power bi dashboard with automated refresh, cross-market comparisons, and executive-level summary views — accessible to all stakeholders.',
    impact_detail:
      'reduced reporting time by ~80%. enabled weekly business reviews with live data. improved visibility for 3 regional managers across 5 markets.',
    featured: false,
    demoUrl: null,
    githubUrl: null,
    imageAlt: 'sales performance dashboard preview',
  },
  {
    id: '02',
    title: 'marketing & sea dashboard',
    subtitle: 'power bi',
    type: 'dashboard',
    tools: ['power bi', 'dax', 'excel'],
    status: 'completed',
    impact: 'high',
    description:
      'integrated marketing performance dashboard tracking paid search (sea), campaign roi, and channel efficiency in a unified view.',
    context:
      'marketing and e-commerce teams tracked sea performance in separate tools with no unified view of campaign spend vs. revenue outcomes.',
    problem:
      'fragmented reporting made it impossible to evaluate roi across campaigns or allocate budget based on actual performance data.',
    approach: [
      'mapped all marketing data sources and aligned metric definitions',
      'standardized kpi logic across campaigns and channels',
      'designed a layered dashboard: executive summary + operational detail',
      'implemented cost-per-acquisition and roas tracking',
      'connected campaign data to revenue outcomes',
    ],
    solution:
      'a unified power bi dashboard connecting sea data, campaign metrics, and revenue outcomes — enabling spend vs. performance analysis in one interface.',
    impact_detail:
      'enabled faster budget reallocation decisions. gave the marketing team a single weekly reference point, replacing 3 separate tracking sheets.',
    featured: false,
    demoUrl: null,
    githubUrl: null,
    imageAlt: 'marketing & sea dashboard preview',
  },
  {
    id: '03',
    title: 'business performance dashboard',
    subtitle: 'power bi',
    type: 'dashboard',
    tools: ['power bi', 'dax', 'sql', 'excel'],
    status: 'completed',
    impact: 'high',
    description:
      'executive-level business performance dashboard consolidating commercial, operational, and category kpis for leadership reporting.',
    context:
      'senior leadership lacked a structured way to monitor business health across departments. monthly reviews relied on ad hoc slides assembled manually.',
    problem:
      'no integrated view of commercial performance, market share, and operational efficiency — making strategic decisions reactive rather than data-led.',
    approach: [
      'conducted stakeholder interviews to align on priority kpis',
      'designed a data model spanning commercial and operational sources',
      'built an executive summary view with supporting drill-through pages',
      'implemented automated refresh and threshold-based indicators',
      'iterated on layout based on leadership feedback',
    ],
    solution:
      'a structured power bi report used in monthly leadership reviews, covering revenue, market share, and category performance with consistent methodology.',
    impact_detail:
      'replaced 4+ manual slide decks. became the primary reporting artifact for monthly leadership meetings. adopted as standard across the business unit.',
    featured: false,
    demoUrl: null,
    githubUrl: null,
    imageAlt: 'business performance dashboard preview',
  },
  {
    id: '04',
    title: 'product data hub',
    subtitle: 'excel + vba automation',
    type: 'automation tool',
    tools: ['excel', 'vba', 'data modeling', 'process design'],
    status: 'completed',
    impact: 'critical',
    description:
      'centralized excel-based data hub that automated product data management end-to-end — reducing weekly processing from hours to minutes.',
    context:
      'a product management team maintained master data across multiple disconnected excel files. formats were inconsistent, updates were manual, and errors propagated upstream into commercial reports.',
    problem:
      'hours spent every week on manual copy-paste workflows. no single source of truth for product attributes, listings, or market data. recurring errors impacted downstream decisions.',
    approach: [
      'mapped the full data lifecycle: raw input → validation → structured output',
      'identified every manual bottleneck and error-prone step in the workflow',
      'designed a centralized data model with clear ownership and input logic',
      'built vba macros to automate data consolidation, deduplication, and validation',
      'added error-catching routines, status flags, and user-facing feedback',
      'created a clean interface for non-technical team members',
    ],
    solution:
      'a structured excel hub with automated data flows, vba-powered processing, built-in validation, and a clear interface — designed to be owned and maintained by the team without technical support.',
    impact_detail:
      'reduced weekly data processing time by ~90%. eliminated a recurring class of data errors. adopted as the standard tool across the team. freed ~3 hours/week per team member.',
    featured: true,
    demoUrl: null,
    githubUrl: null,
    imageAlt: 'product data hub architecture overview',
  },
  {
    id: '05',
    title: 'forecasting model',
    subtitle: 'excel',
    type: 'analytical model',
    tools: ['excel', 'statistical modeling', 'data analysis'],
    status: 'completed',
    impact: 'high',
    description:
      'structured excel forecasting model for demand planning and budget projection across product categories and markets.',
    context:
      'category managers produced forecasts manually using intuition and basic trend lines. no consistent methodology existed across markets, making s&op discussions fragmented.',
    problem:
      'inconsistent forecast quality and no structured baseline for planning discussions. difficult to scenario-plan for new product launches or market shifts.',
    approach: [
      'analyzed historical sell-in / sell-out patterns by category and market',
      'designed a baseline forecasting methodology aligned with planning cycles',
      'built a structured model with configurable inputs and sensitivity controls',
      'added scenario planning tabs for upside / downside projections',
      'documented all assumptions and logic for team use and audit',
    ],
    solution:
      'a reproducible excel forecasting model with configurable assumptions, baseline projections, and scenario planning — structured for both analyst use and stakeholder presentation.',
    impact_detail:
      'standardized forecasting methodology across 5 markets. improved s&op meeting quality. used for quarterly planning cycles and new product launch projections.',
    featured: false,
    demoUrl: null,
    githubUrl: null,
    imageAlt: 'forecasting model structure overview',
  },
]
