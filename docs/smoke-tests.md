# Smoke tests

- Run `npm run test:routes` for fast Node-only route contract checks powered by Vitest + Astro Container. This covers `/` and `/pricing` metadata, stable visible signals, bounded content counts, honest links, and absence of removed shell placeholders.
- Run `npm run smoke` to launch the Astro dev server without build and validate the landing root response.
- The smoke script remains complementary: it validates runtime/dev-server behavior and fetches both `/` and `/pricing` HTML/CSS without replacing route contract tests.
- Review sequence: `npm run check`, `npm run test:routes`, `npm run smoke`.
- The script checks `http://127.0.0.1:4321/` by default, expects HTTP 200 + `text/html`, and verifies key landing signals in the HTML.
- Optional overrides: `SMOKE_HOST`, `SMOKE_PORT`, `SMOKE_TIMEOUT_MS`.
