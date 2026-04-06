import { describe, expect, it } from 'vitest';

import { landingContent } from '../../src/content/landing';
import HomePage from '../../src/pages/index.astro';
import {
  expectCount,
  expectLabelAbsent,
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

  it('keeps real links navigable and removes placeholder shell labels', () => {
    expectHonestLink(document, landingContent.header.brand, '/');
    landingContent.header.navLinks.forEach((link) => {
      expectHonestLink(document, link.label, link.href);
    });
    expectHonestLink(document, landingContent.header.primaryAction.label, landingContent.header.primaryAction.href);
    expectHonestLink(document, 'View demo', '#demo');
    expectHonestLink(document, 'Create your first mock API', '#cta');
    landingContent.footer.links.forEach((link) => {
      expectHonestLink(document, link.label, link.href);
    });

    ['Documentation', 'Changelog', 'Docs', 'GitHub', 'Contact'].forEach((label) => {
      expectLabelAbsent(document, label);
    });
  });
});
