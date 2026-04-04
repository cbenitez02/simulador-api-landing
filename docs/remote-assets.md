# Remote assets used in v1

## Original remote dependencies

- **Google Fonts / Inter** via `fonts.googleapis.com` and `fonts.gstatic.com`
- **Material Symbols Outlined** via `fonts.googleapis.com`

## Current status

- **Inter** is now self-hosted from `public/assets/fonts/inter-latin.woff2` and `public/assets/fonts/inter-latin-ext.woff2`.
- **Material Symbols Outlined** is no longer loaded at runtime; the landing now uses a local inline SVG icon map in `src/components/Icon.astro`.

## Why this approach

- Self-hosting Inter preserves the existing typographic feel with low implementation risk.
- Replacing the icon font with a tiny local SVG map removes the Google Fonts runtime dependency entirely for icons.
- The SVG set covers the currently used icons only: `rocket_launch`, `neurology`, `speed`, `lock_open`, `warning`, and `close`.

## Follow-up recommendation

- If new icons are added, extend the SVG map deliberately or migrate to a first-class local icon pipeline.
- Keep the Inter preload/font-display strategy unless broader locale coverage requires additional subsets.
