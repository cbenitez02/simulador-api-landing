# Visual regression

Esta capa cubre screenshots full-page de escritorio para `/` y `/pricing` con Playwright Chromium-only.

## Cuándo usar cada comando

- `npm run test:routes`: contratos rápidos de HTML/SEO/links con Vitest + Astro Container.
- `npm run smoke`: valida `astro dev` real sin build y señales críticas de `/` y `/pricing`.
- `npm run test:visual`: compara render visual aprobado contra baselines versionados.
- `npm run test:visual:update`: actualiza baselines de forma intencional cuando un cambio visual fue revisado y aprobado.

## Alcance

- Sólo Chromium.
- Sólo desktop.
- Sólo `/` y `/pricing`.
- No usa `stitch/*.png` como baseline automatizado; esas imágenes quedan como referencia manual.

## Guardrails de determinismo

- `webServer` dedicado sobre `127.0.0.1:4322` para no pisar `smoke` (`4321`).
- Viewport fijo `1440x3200` con `deviceScaleFactor: 1`.
- Espera `load` y `document.fonts.ready` antes de capturar.
- Inyección CSS test-only para neutralizar scroll suave, transiciones, animaciones y caret.

## Flujo recomendado

1. `npm run check`
2. `npm run test:routes`
3. `npm run smoke`
4. `npm run test:visual`

Si el cambio visual es intencional, corré `npm run test:visual:update`, revisá los PNG generados en `tests/visual/__screenshots__/` y comitealos junto con el cambio.
