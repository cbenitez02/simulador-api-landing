export type LandingLink = { label: string; href: string } | { label: string; placeholderReason: string };

export type LandingTone = 'primary' | 'secondary' | 'warning' | 'error';

export type LandingIconName =
  | 'rocket_launch'
  | 'spark'
  | 'warning'
  | 'speed'
  | 'branch'
  | 'code'
  | 'link'
  | 'sprout'
  | 'bug'
  | 'chart'
  | 'shield'
  | 'check_circle'
  | 'settings';

export const landingContent = {
  seo: {
    title: 'ObsidianArchitect | API Mock AI',
    description:
      'Mock APIs with real-world behavior in seconds. Generate endpoints from prompts or JSON, simulate latency and failures, and unblock frontend delivery without waiting for a backend.',
  },
  header: {
    brand: 'ObsidianArchitect',
    navLinks: [
      { label: 'Platform', href: '#simulation' },
      {
        label: 'Documentation',
        placeholderReason: 'Documentation is not published in this landing-only scope yet.',
      },
      {
        label: 'Changelog',
        placeholderReason: 'Changelog does not have a public destination in the current scope.',
      },
      {
        label: 'Pricing',
        href: '/pricing',
      },
    ] satisfies LandingLink[],
    primaryAction: { label: 'Get Started', href: '#cta' } satisfies LandingLink,
  },
  hero: {
    title: {
      prefix: 'Mock APIs with',
      highlight: 'real-world',
      suffix: 'behavior in seconds',
    },
    description:
      'Generate endpoints from prompts or JSON. Simulate latency, errors, empty states and multiple scenarios — without a backend.',
    actions: {
      primary: { label: 'Create your first mock API', href: '#cta' } satisfies LandingLink,
      secondary: { label: 'View demo', href: '#demo' } satisfies LandingLink,
    },
    visual: {
      label: 'Mock Prompt Editor',
      prompt: 'prompt: "GET /users with 20% errors and random 2s latency"',
      metrics: [
        { label: 'Latency', value: '2,000ms', tone: 'primary', fill: '66%' },
        { label: 'Error Rate', value: '20%', tone: 'error', fill: '20%' },
      ],
      responseTitle: '// Response Preview',
      responseLines: ['{', '  "id": 101,', '  "name": "Jane Doe",', '  "status": "active"', '}'],
    },
  },
  simulation: {
    title: 'Simulate Real Backend Behavior',
    description:
      'Responses are dynamic and configurable, not static files. Build resiliency by testing how your app handles slow networks and server crashes.',
    bullets: [
      'Probability-based response scenarios',
      'Dynamic data generation using AI',
      'Protocol-level simulation (Timeouts, CORS)',
    ],
    endpoint: {
      method: 'GET' as const,
      route: '/api/v1/users',
      latency: '2s latency',
    },
    scenarios: [
      {
        probability: '70%',
        title: 'Success Response',
        description: 'Returns User[] data with 200 OK',
        tone: 'primary',
      },
      {
        probability: '20%',
        title: 'Empty Array',
        description: 'Returns [] with 200 OK',
        tone: 'secondary',
      },
      {
        probability: '10%',
        title: 'Internal Error',
        description: 'Returns Error 500 JSON',
        tone: 'error',
      },
    ],
  },
  steps: {
    title: 'How It Works',
    items: [
      {
        title: 'Create a project',
        description: 'Organize your endpoints by application or team.',
      },
      {
        title: 'Describe endpoint',
        description: 'Use natural language prompts or paste JSON schemas.',
      },
      {
        title: 'Generate mock',
        description: 'AI instantly architectures the route and response logic.',
      },
      {
        title: 'Configure behavior',
        description: 'Fine-tune latency, error percentages, and headers.',
      },
      {
        title: 'Use instantly',
        description: 'Copy your unique base URL and start building.',
      },
    ],
  },
  features: {
    items: [
      {
        icon: 'spark' as const,
        tone: 'primary',
        title: 'AI Generation',
        description:
          'Build complex endpoints from simple text prompts. No manual JSON structure building required.',
      },
      {
        icon: 'warning' as const,
        tone: 'error',
        title: 'Error Simulation',
        description:
          "Simulate 404, 500, timeouts, and customized error bodies to test your app's resilience.",
      },
      {
        icon: 'speed' as const,
        tone: 'secondary',
        title: 'Latency Control',
        description:
          'Set fixed delays or randomized ranges to mimic real-world network conditions and edge connections.',
      },
      {
        icon: 'branch' as const,
        tone: 'warning',
        title: 'Multi-Response Scenarios',
        description: 'Define multiple states for a single endpoint and assign probability weights to each.',
      },
      {
        icon: 'code' as const,
        tone: 'primary',
        title: 'Live JSON Editor',
        description: 'Real-time editing with syntax highlighting and instant preview of generated data.',
      },
      {
        icon: 'link' as const,
        tone: 'secondary',
        title: 'Instant Base URL',
        description:
          'Production-ready URLs available the moment you save. No deployment cycles or restarts.',
      },
    ],
  },
  demo: {
    requestLabel: 'Client Request',
    requestCode: [
      'fetch("https://api.mock.ai/v1/users")',
      '  .then(res => res.json())',
      '  .then(data => console.log(data));',
    ],
    responseLabel: 'Mock API Response',
    responseStatus: '200 OK',
    responseTime: '(2.1s)',
    responseCode: [
      '{',
      '  "status": "success",',
      '  "data": [',
      '    {',
      '      "id": "usr_01H2J",',
      '      "name": "Marcus Aurelius",',
      '      "email": "m.aurelius@stoic.dev",',
      '      "role": "Architect"',
      '    },',
      '    {',
      '      "id": "usr_01H2K",',
      '      "name": "Seneca the Younger",',
      '      "email": "seneca@cordoba.io",',
      '      "role": "Validator"',
      '    }',
      '  ]',
      '}',
    ],
  },
  useCases: {
    title: 'Accelerate every phase of development',
    items: [
      {
        icon: 'sprout' as const,
        tone: 'primary',
        title: 'Early Frontend',
        description: 'Start building your UI before the backend team has even finished the spec.',
      },
      {
        icon: 'bug' as const,
        tone: 'error',
        title: 'Edge Case Testing',
        description: 'Instantly force 503 errors or slow timeouts to test your error handling UI.',
      },
      {
        icon: 'chart' as const,
        tone: 'secondary',
        title: 'Stakeholder Demos',
        description: 'Create high-fidelity demos that look and feel real with dynamic data flows.',
      },
      {
        icon: 'shield' as const,
        tone: 'warning',
        title: 'Contract Validation',
        description: 'Prototype API contracts and validate them against real UI needs before locking.',
      },
    ],
  },
  cta: {
    title: 'Start building without a backend today',
    description:
      'Stop waiting for services to be ready. Define your own reality and focus on the user experience.',
    primaryAction: { label: 'Create your first mock API', href: '#top' } satisfies LandingLink,
  },
  footer: {
    brand: 'Obsidian Architect',
    copyright: '© 2024 Obsidian Architect. All rights reserved.',
    links: [
      {
        label: 'Docs',
        placeholderReason: 'Docs need a real destination before they can become a navigable footer link.',
      },
      {
        label: 'GitHub',
        placeholderReason: 'The canonical repository URL is not defined in the project artifacts yet.',
      },
      {
        label: 'Pricing',
        href: '/pricing',
      },
      {
        label: 'Contact',
        placeholderReason: 'There is no contact flow in the current landing-only scope.',
      },
    ] satisfies LandingLink[],
  },
} as const;
