export type PricingLink = { label: string; href: string };

export type PricingPlan = {
  slug: string;
  name: string;
  summary: string;
  price: string;
  cadence: string;
  featured: boolean;
  badge?: string;
  cta: PricingLink;
  note?: string;
  features: string[];
};

export type PricingProofCard = {
  title: string;
  body: string;
  eyebrow?: string;
  icon?: 'spark' | 'warning' | 'speed' | 'branch' | 'settings';
  tone?: 'primary' | 'secondary' | 'warning';
  featured?: boolean;
};

export type PricingComparisonRowValue = {
  label: string;
  included?: boolean;
  emphasis?: boolean;
};

export type PricingComparisonRow = {
  capability: string;
  values: [PricingComparisonRowValue, PricingComparisonRowValue, PricingComparisonRowValue];
};

export type PricingFaqItem = {
  question: string;
  answer: string;
};

export const pricingContent = {
  brand: 'Obsidian Architect',
  seo: {
    title: 'Obsidian Architect Pricing | Engineer-first API mock plans',
    description:
      'Compare Obsidian Architect plans for realistic API simulation, collaboration, and resilient frontend delivery without waiting for a backend.',
  },
  header: {
    brand: 'Obsidian Architect',
  },
  footer: {
    brand: 'Obsidian Architect',
    copyright: '© 2024 Obsidian Architect. Built for resilient frontend delivery.',
  },
  hero: {
    eyebrow: 'Engineer-first pricing',
    title: 'Precision-engineered pricing for resilient frontend teams',
    description:
      'Choose the plan that matches your delivery stage — from quick prototypes to shared simulation workspaces that help teams validate failure states before production.',
    billingToggle: {
      monthlyLabel: 'Monthly',
      yearlyLabel: 'Yearly',
      savingsBadge: 'Save 20%',
    },
    disclaimer:
      'Prices shown are static reference pricing for this landing experience only. No billing flow or automatic yearly recalculation is implemented yet.',
  },
  plans: [
    {
      slug: 'starter',
      name: 'Starter',
      summary: 'For quick prototyping',
      price: '$0',
      cadence: '/mo',
      featured: false,
      cta: { label: 'Start building for free', href: '#faq' },
      features: [
        'Up to 5 endpoints',
        'Basic latency simulation',
        'Single response per endpoint',
        'JSON response editor',
      ],
    },
    {
      slug: 'pro',
      name: 'Pro',
      summary: 'For realistic API simulation',
      price: '$29',
      cadence: '/mo',
      featured: true,
      badge: 'Most popular',
      cta: { label: 'Start 14-day trial', href: '#comparison' },
      note: 'Upgrade to unlock realistic API behavior and advanced testing scenarios.',
      features: [
        'Unlimited endpoints',
        'Multiple response scenarios',
        'Error simulation (500, 404, timeouts)',
        'Dynamic latency control',
        'Faker data and scenario probability',
      ],
    },
    {
      slug: 'team',
      name: 'Team',
      summary: 'For collaboration and scaling',
      price: '$99',
      cadence: '/mo',
      featured: false,
      cta: { label: 'Talk to sales', href: '#faq' },
      features: [
        'Everything in Pro',
        'Shared workspaces',
        'Scenario collaboration',
        'Role-based permissions',
        'Priority support',
      ],
    },
  ] satisfies PricingPlan[],
  proofCards: [
    {
      eyebrow: 'Resilience testing',
      title: 'Simulate production chaos before your users do',
      body: 'Define slow responses, retries, failures, and scenario probabilities so your frontend survives the messy reality of real backend behavior.',
      icon: 'warning',
      tone: 'primary',
      featured: true,
    },
    {
      title: 'Zero-dependency frontend delivery',
      body: 'Unblock UI work even when backend implementation is still moving. Teams can validate contracts, flows, and edge states earlier.',
      icon: 'branch',
      tone: 'secondary',
    },
    {
      title: 'Shared simulation language',
      body: 'Designers, frontend engineers, and QA align around the same request/response scenarios instead of chasing unstable staging environments.',
      icon: 'settings',
      tone: 'warning',
    },
  ] satisfies PricingProofCard[],
  comparison: {
    title: 'Feature matrix',
    columns: ['Starter', 'Pro', 'Team'] as const,
    rows: [
      {
        capability: 'Response scenarios',
        values: [
          { label: 'Single' },
          { label: 'Unlimited', emphasis: true },
          { label: 'Unlimited' },
        ],
      },
      {
        capability: 'Error simulation',
        values: [{ label: 'None' }, { label: 'Included', included: true }, { label: 'Included', included: true }],
      },
      {
        capability: 'Latency control',
        values: [{ label: 'Basic' }, { label: 'Dynamic' }, { label: 'Dynamic' }],
      },
      {
        capability: 'Faker data integration',
        values: [
          { label: 'Static only' },
          { label: 'Included', included: true },
          { label: 'Included', included: true },
        ],
      },
      {
        capability: 'Scenario probability',
        values: [{ label: 'Manual' }, { label: 'Automated' }, { label: 'Automated' }],
      },
      {
        capability: 'Workspaces',
        values: [{ label: 'Personal' }, { label: 'Personal' }, { label: 'Shared', emphasis: true }],
      },
    ] satisfies PricingComparisonRow[],
  },
  faq: [
    {
      question: 'Do I need a backend before using Obsidian Architect?',
      answer:
        'No. Obsidian Architect acts as a temporary backend so frontend teams can build against defined contracts, simulate failures, and validate UX without waiting for server implementation.',
    },
    {
      question: 'Can I simulate realistic production failures?',
      answer:
        'Yes. The pricing page highlights scenario-based responses, latency control, and error simulation so teams can test loading, empty, and failure states before release.',
    },
    {
      question: 'Is this pricing page connected to real billing?',
      answer:
        'Not yet. This route is a static pricing experience only, so CTAs and the billing toggle are intentionally non-transactional in the current scope.',
    },
    {
      question: 'What changes in the Team plan?',
      answer:
        'Team adds shared workspaces, collaboration around scenarios, and operational support so multiple engineers can coordinate around one mock environment.',
    },
  ] satisfies PricingFaqItem[],
} as const;
