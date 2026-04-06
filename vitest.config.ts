import { getViteConfig } from 'astro/config';
import { defineConfig } from 'vitest/config';

export default getViteConfig(
  defineConfig({
    test: {
      environment: 'node',
      globals: false,
      include: ['tests/routes/**/*.route.test.ts'],
    },
  }),
);
