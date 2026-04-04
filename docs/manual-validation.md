# Manual Validation — astro-landing-page

## Scope
- Change: `astro-landing-page`
- Goal: close remaining verify warnings without build/test-framework overreach
- Reference artifacts: `stitch/code.html`, `stitch/screen.png`, `stitch/DESIGN.md`

## Structural / visual pass
- Reviewed current Astro section order against `stitch/code.html`: header → hero → problem → features → code demo → use cases → CTA → footer.
- Reviewed `stitch/screen.png` for dominant composition: sticky top nav, centered hero copy, dark palette, dashboard mockup prominence, alternating muted sections, narrow CTA card, compact footer.
- Result: current Astro implementation preserves the same narrative flow, CTA hierarchy, dark tonal system, and code-panel emphasis with only minor acceptable drift in exact border/radius details.

## Basic accessibility smoke
- Landmarks present in source: primary `nav`, `main`, footer nav, and `footer`.
- Heading order remains linear and valid: one `h1`, section-level `h2`s, and card-level `h3`s.
- Interactive labels remain meaningful (`Get Started for Free`, `View Documentation`, `Login`, `Sign up`, footer labels).
- Decorative icons/glows are hidden with `aria-hidden="true"` where appropriate.
- In-page anchors used by header/hero CTAs resolve to existing IDs: `#top`, `#features`, `#pricing`, `#docs`, `#login`, `#signup`.

## Placeholder link status
- Reduced low-cost placeholder debt by replacing CTA `Launch Console` from `#` to `#login`.
- Intentionally kept `Enterprise Demo`, `Terms`, `Privacy`, `Github`, and `Status` as placeholders because no real routes or canonical external URLs exist in the approved v1 scope.
- Those remaining placeholders are now documented in `src/content/landing.ts` with explicit reasons so final verify can classify them as intentional product-scope debt rather than accidental omissions.
