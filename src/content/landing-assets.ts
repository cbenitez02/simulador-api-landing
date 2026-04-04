export const landingAssetPolicy = {
  remote: [
    {
      name: 'Inter',
      provider: 'Google Fonts',
      purpose: 'Primary UI and marketing typography for stitch parity in v1.',
    },
    {
      name: 'Material Symbols Outlined',
      provider: 'Google Fonts',
      purpose: 'Icon font used by the current landing UI in v1.',
    },
  ],
  localPlaceholderDir: 'public/assets/',
  followUp: 'Self-host fonts/icons in public/assets before production hardening.',
} as const;
