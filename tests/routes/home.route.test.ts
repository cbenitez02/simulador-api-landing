import { describe, expect, it } from 'vitest';

import { landingContent } from '../../src/content/landing';
import HomePage from '../../src/pages/index.astro';
import {
  expectCount,
  expectDisabledPlaceholder,
  expectHonestLink,
  expectSectionIds,
  expectText,
  getMetaContent,
  getTitle,
} from './_helpers/html-contracts';
import { renderRoute } from './_helpers/render-route';

describe('route contract: /', async () => {
  const { document, html } = await renderRoute(HomePage, '/');

  it('renders stable metadata and branding', () => {
    expect(getTitle(document)).toBe(landingContent.seo.title);
    expect(getMetaContent(document, 'meta[name="description"]')).toBe(landingContent.seo.description);
    expect(getMetaContent(document, 'meta[property="og:title"]')).toBe(landingContent.seo.title);
    expect(getMetaContent(document, 'meta[property="og:site_name"]')).toBe(landingContent.footer.brand);
    expect(getMetaContent(document, 'meta[name="twitter:title"]')).toBe(landingContent.seo.title);
    expect(html).toContain('application/ld+json');
    expect(html).toContain('Obsidian Architect');
    expect(html).not.toContain('ObsidianArchitect');
  });

  it('renders stable visible landing signals and bounded counts', () => {
    expectText(document, landingContent.header.brand);
    expectText(document, landingContent.hero.visual.label);
    expectText(document, landingContent.simulation.title);
    expectText(document, landingContent.steps.title);
    expectText(document, landingContent.useCases.title);
    expectText(document, landingContent.cta.title);

    expectSectionIds(document, ['top', 'simulation', 'how-it-works', 'features', 'demo', 'use-cases', 'cta']);
    expectCount(document, '.landing-metric-card', landingContent.hero.visual.metrics.length);
    expectCount(document, '.landing-scenario-card', landingContent.simulation.scenarios.length);
    expectCount(document, '.landing-step-card', landingContent.steps.items.length);
    expectCount(document, '.landing-feature-card', landingContent.features.items.length);
    expectCount(document, '.landing-use-case-card', landingContent.useCases.items.length);
  });

  it('keeps real links navigable and placeholders honest', () => {
    expectHonestLink(document, landingContent.header.brand, '/');
    expectHonestLink(document, 'Platform', '#simulation');
    expectHonestLink(document, 'Pricing', '/pricing');
    expectHonestLink(document, 'Get Started', '#cta');
    expectHonestLink(document, 'View demo', '#demo');
    expectHonestLink(document, 'Create your first mock API', '#cta');

    ['Documentation', 'Changelog', 'Docs', 'GitHub', 'Contact'].forEach((label) => {
      expectDisabledPlaceholder(document, label);
    });
  });
});
