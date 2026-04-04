export const navLinks = [
  { label: 'Features', href: '#features', active: true },
  { label: 'Pricing', href: '#pricing', active: false },
  { label: 'Docs', href: '#docs', active: false },
] as const;

export const heroActions = {
  primary: { label: 'Get Started for Free', href: '#signup' },
  secondary: { label: 'View Documentation', href: '#docs' },
} as const;

export const ctaActions = {
  primary: { label: 'Launch Console', href: '#login' },
  secondary: {
    label: 'Enterprise Demo',
    href: '#',
    placeholderReason:
      'No enterprise contact flow or sales route exists in the current v1 scope; keep placeholder explicit until that destination is defined.',
  },
} as const;

export const useCases = [
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
] as const;

export const footerLinks = [
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
] as const;
