export const landingAssetPolicy = {
  local: [
    {
      name: 'Inter',
      location: '/assets/fonts/inter-latin.woff2 + /assets/fonts/inter-latin-ext.woff2',
      purpose: 'Primary UI and marketing typography self-hosted with local WOFF2 subsets.',
    },
    {
      name: 'Inline SVG icon set',
      location: 'src/components/Icon.astro',
      purpose: 'Local outlined icon primitives replacing the remote Material Symbols dependency.',
    },
  ],
  localPlaceholderDir: 'public/assets/',
  followUp: 'If the icon surface grows, consider extracting the inline SVG map into a dedicated asset module.',
} as const;
