# Smoke tests

- Run `npm run smoke` to launch the Astro dev server without build and validate the landing root response.
- The script checks `http://127.0.0.1:4321/` by default, expects HTTP 200 + `text/html`, and verifies key landing signals in the HTML.
- Optional overrides: `SMOKE_HOST`, `SMOKE_PORT`, `SMOKE_TIMEOUT_MS`.
