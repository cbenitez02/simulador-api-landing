import { describe, expect, it } from 'vitest';

import { pricingContent } from '../../src/content/pricing';
import PricingPage from '../../src/pages/pricing.astro';
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

const pricingHeaderPrimaryAction = { label: 'Get Started', href: '#comparison' };
const pricingPlatformHref = '/#simulation';

describe('route contract: /pricing', async () => {
  const { document, html } = await renderRoute(PricingPage, '/pricing');

  it('renders stable metadata and pricing branding', () => {
    expect(getTitle(document)).toBe(pricingContent.seo.title);
    expect(getMetaContent(document, 'meta[name="description"]')).toBe(pricingContent.seo.description);
    expect(getMetaContent(document, 'meta[property="og:title"]')).toBe(pricingContent.seo.title);
    expect(getMetaContent(document, 'meta[property="og:site_name"]')).toBe(pricingContent.brand);
    expect(getMetaContent(document, 'meta[name="twitter:title"]')).toBe(pricingContent.seo.title);
    expect(html).toContain('application/ld+json');
    expect(html).toContain(pricingContent.brand);
    expect(html).not.toContain('ObsidianArchitect');
  });

  it('renders stable pricing signals and bounded content counts', () => {
    expectText(document, pricingContent.hero.title);
    expectText(document, pricingContent.hero.disclaimer);
    expectText(document, 'Why Engineer-First Mocks?');
    expectText(document, pricingContent.comparison.title);
    expectText(document, 'Developer FAQ');
    expectText(document, pricingContent.faq[0].question);

    expectSectionIds(document, ['top', 'comparison', 'faq']);
    expectCount(document, '.pricing-plan-card', pricingContent.plans.length);
    expectCount(document, '.pricing-proof h3', pricingContent.proofCards.length);
    expectCount(document, '.pricing-comparison tbody tr', pricingContent.comparison.rows.length);
    expectCount(document, '.pricing-faq__item', pricingContent.faq.length);
  });

  it('keeps pricing CTAs anchored to real in-page destinations', () => {
    expectHonestLink(document, pricingContent.header.brand, '/');
    expectHonestLink(document, 'Platform', pricingPlatformHref);
    expectHonestLink(document, 'Pricing', '/pricing');
    expectHonestLink(document, pricingHeaderPrimaryAction.label, pricingHeaderPrimaryAction.href);

    pricingContent.plans.forEach((plan) => {
      expectHonestLink(document, plan.cta.label, plan.cta.href);
      expect(plan.cta.href).toMatch(/^#(faq|comparison)$/);
    });

    ['Documentation', 'Changelog', 'Docs', 'GitHub', 'Contact'].forEach((label) => {
      expectDisabledPlaceholder(document, label);
    });

    expect(html).not.toMatch(/checkout|stripe|billing portal/i);
  });
});
