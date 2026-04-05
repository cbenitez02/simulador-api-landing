export const landingContent = {
  header: {
    brand: 'API Mock AI',
    navLinks: [
      {
        label: 'Platform',
        href: '#',
        placeholderReason: 'Platform page or section does not exist yet.',
      },
      { label: 'Documentation', href: '#docs' },
      {
        label: 'Changelog',
        href: '#',
        placeholderReason: 'Changelog page or section does not exist yet.',
      },
      { label: 'Pricing', href: '#pricing' },
    ],
    actions: {
      login: { label: 'Sign In', href: '#login' },
      signup: { label: 'Get Started', href: '#signup' },
    },
  },
  hero: {
    eyebrow: 'Precision Engine v2.4',
    title: 'Generate intelligent mock APIs in seconds',
    lead:
      'Stop waiting for the backend. Instantly provision high-performance, AI-driven endpoints that mimic production behavior with zero latency.',
    actions: {
      primary: { label: 'Get Started for Free', href: '#signup', icon: 'rocket_launch' },
      secondary: { label: 'View Documentation', href: '#docs' },
    },
    preview: {
      url: 'https://api.mock.ai/v1/projects/architect-os',
      title: 'Active Endpoints',
      status: '3 Endpoints Live',
      endpoints: [
        { method: 'GET', route: '/users/profile', latency: '24ms delay' },
        { method: 'POST', route: '/auth/register', latency: '420ms delay (Simulated)' },
        { method: 'DELETE', route: '/posts/{id}', latency: 'Immediate' },
      ],
    },
  },
  problem: {
    title: 'The API Bottleneck is Over',
    description:
      "Frontend teams shouldn't stall while backend schemas are being debated. Our AI engine infers data structures and provides realistic response payloads so you can start building before the first line of server code is even written.",
    painPoints: [
      {
        icon: 'close',
        title: 'Static JSON Files',
        description: 'Hard to manage, zero logic, and impossible to scale.',
      },
      {
        icon: 'close',
        title: 'Backend Delays',
        description: 'Waiting weeks for simple endpoint updates or schema changes.',
      },
    ],
    metrics: [
      { value: '64%', label: 'Dev Time Wasted', tone: undefined },
      { value: '10x', label: 'Faster Iteration', tone: 'success' },
    ],
    quote: {
      body:
        '“We reduced our feature delivery cycle by 3 weeks using ArchitectOS to mock our microservices.”',
      author: '— Lead Architect, CloudCorp',
    },
  },
  features: {
    title: 'Built for Precision',
    items: [
      {
        title: 'AI Schema Inference',
        description:
          'Paste a prompt or an example object. Our engine generates a fully typed, dynamic API with realistic relations and varied data payloads.',
        icon: 'neurology',
        iconTone: 'secondary',
        variant: 'wide decorated',
        snippet: undefined,
      },
      {
        title: 'Zero-Latency Edge',
        description:
          'Deployed on global edge nodes. Simulate ideal conditions or inject custom latency to test edge cases.',
        icon: 'speed',
        iconTone: 'primary',
        variant: undefined,
        snippet: undefined,
      },
      {
        title: 'Smart Auth',
        description:
          'Simulate JWT, API Keys, or OAuth flow and verify how your app handles denied states.',
        icon: 'lock_open',
        iconTone: 'warning',
        variant: undefined,
        snippet: undefined,
      },
      {
        title: 'Chaos Mode',
        description:
          'Inject random failures, 500 errors, and timeouts to ensure your application is resilient under pressure.',
        icon: 'warning',
        iconTone: 'error',
        variant: 'wide chaos',
        snippet: '{ "error": "Internal Server Error", "code": 500, "trace_id": "8x-291-ck9" }',
      },
    ],
  },
  codeDemo: {
    title: 'Connect in 3 seconds.',
    description:
      "Switch your base URL and you're live. No SDK required, no heavy libraries, just pure REST architecture.",
    steps: [
      'Describe your entity (e.g. “User with 5 posts”)',
      'Get your unique endpoint',
      'Integrate and start building',
    ],
    tabs: ['JavaScript', 'Response JSON'],
    snippet: [
      "<span class=\"token token--keyword\">const</span> response = <span class=\"token token--keyword\">await</span> fetch(<span class=\"token token--primary\">'https://api.mock.ai/v1/user/1'</span>);",
      '<span class="token token--keyword">const</span> data = <span class="token token--keyword">await</span> response.json();',
      '',
      'console.log(data.profile);',
      '',
      '<span class="token token--muted">// Expected Output:</span>',
      '&#123;',
      '  <span class="token token--primary">"id"</span>: <span class="token token--warning">"usr_9281"</span>,',
      '  <span class="token token--primary">"name"</span>: <span class="token token--warning">"Alex Architect"</span>,',
      '  <span class="token token--primary">"role"</span>: <span class="token token--warning">"Senior Engineer"</span>,',
      '  <span class="token token--primary">"tags"</span>: [<span class="token token--warning">"frontend"</span>, <span class="token token--warning">"obsidian"</span>]',
      '&#125;',
    ].join('\n'),
  },
  useCases: {
    title: 'Master Your Workflow',
    description: 'ArchitectOS adapts to your specific development phase.',
    items: [
      {
        title: 'Prototyping',
        description: 'Spin up a full backend in seconds to show stakeholders the real flow.',
        tone: 'primary',
      },
      {
        title: 'Unit Testing',
        description: 'Deterministic responses for CI/CD pipelines without external dependencies.',
        tone: 'secondary',
      },
      {
        title: 'Mobile Dev',
        description: 'Simulate offline states and slow 3G networks with precision.',
        tone: 'warning',
      },
      {
        title: 'Integration',
        description: 'Test how your UI reacts to malformed payloads and missing keys.',
        tone: 'error',
      },
    ],
  },
  cta: {
    title: ['BUILD SMARTER.', 'MOCK FASTER.'],
    description:
      'Join 15,000+ developers who have stopped waiting for the backend and started building the future.',
    actions: {
      primary: { label: 'Launch Console', href: '#login' },
      secondary: {
        label: 'Enterprise Demo',
        href: '#',
        placeholderReason:
          'No enterprise contact flow or sales route exists in the current v1 scope; keep placeholder explicit until that destination is defined.',
      },
    },
  },
  footer: {
    copyright: '© 2024 Obsidian Architect. Precision Engine.',
    links: [
      {
        label: 'Terms',
        href: '#',
        placeholderReason:
          'Legal pages are intentionally out of scope for this one-page v1 landing and still need real destinations.',
      },
      {
        label: 'Privacy',
        href: '#',
        placeholderReason:
          'Legal pages are intentionally out of scope for this one-page v1 landing and still need real destinations.',
      },
      {
        label: 'Github',
        href: '#',
        placeholderReason:
          'No canonical repository URL is defined in the project artifacts yet, so the footer keeps this placeholder documented.',
      },
      {
        label: 'Status',
        href: '#',
        placeholderReason:
          'No public status page exists in the current scope, so the placeholder remains explicit for now.',
      },
    ],
  },
} as const;

export type LandingIconName =
  | 'rocket_launch'
  | 'close'
  | 'neurology'
  | 'speed'
  | 'lock_open'
  | 'warning';
