# Remote assets used in v1

## Active remote dependencies

- **Google Fonts / Inter** via `fonts.googleapis.com` and `fonts.gstatic.com`
- **Material Symbols Outlined** via `fonts.googleapis.com`

## Why they remain remote in v1

- The reference relies heavily on Inter and Material Symbols for visual fidelity.
- Keeping them remote avoids adding extra asset packaging complexity during the first Astro implementation.

## Follow-up recommendation

- Self-host both font families in `public/` or replace Material Symbols with local SVG icons before production hardening.
- Add `font-display` and preload strategy when those assets are localized.
