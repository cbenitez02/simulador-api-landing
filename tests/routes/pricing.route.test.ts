import { describe, expect, it } from 'vitest';

import Footer from '../../src/components/landing/Footer.astro';
import Header from '../../src/components/landing/Header.astro';
import { landingContent } from '../../src/content/landing';
import { pricingContent } from '../../src/content/pricing';
import PricingPage from '../../src/pages/pricing.astro';
import {
  expectCount,
  expectLabelAbsent,
  expectHonestLink,
  expectSectionIds,
  expectText,
  getMetaContent,
  getTitle,
} from './_helpers/html-contracts';
import { renderAstro, renderRoute } from './_helpers/render-route';

const pricingHeaderPrimaryAction = { label: 'Get Started', href: '#comparison' };
const pricingPlatformHref = '/#simulation';
const pricingHeaderNavLinks = landingContent.header.navLinks.map((link) => (
  link.label === 'Platform'
    ? { ...link, href: pricingPlatformHref }
    : link
));

function findAnchorByLabel(document: Document, label: string) {
  return [...document.querySelectorAll('a')].find((link) => link.textContent?.trim() === label);
}

describe('route contract: /pricing', async () => {
  const { document, html } = await renderRoute(PricingPage, '/pricing');
  const { document: arbitraryActiveLabelDocument } = await renderAstro(Header, {
    pathname: '/pricing',
    props: {
      activeNavLabel: 'Anything else',
      brand: pricingContent.header.brand,
      navLinks: pricingHeaderNavLinks,
      pageClass: 'pricing-page',
      primaryAction: pricingHeaderPrimaryAction,
    },
  });
  const { document: footerOverrideDocument } = await renderAstro(Footer, {
    pathname: '/pricing',
    props: {
      brand: pricingContent.footer.brand,
      copyright: pricingContent.footer.copyright,
      links: [{ label: 'Custom footer link', href: '/pricing#custom-footer-link' }],
      pageClass: 'pricing-page',
    },
  });

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
    landingContent.footer.links.forEach((link) => {
      expectHonestLink(document, link.label, link.href);
    });

    pricingContent.plans.forEach((plan) => {
      expectHonestLink(document, plan.cta.label, plan.cta.href);
      expect(plan.cta.href).toMatch(/^#(faq|comparison)$/);
    });

    ['Documentation', 'Changelog', 'Docs', 'GitHub', 'Contact'].forEach((label) => {
      expectLabelAbsent(document, label);
    });

    expect(html).not.toMatch(/checkout|stripe|billing portal/i);
  });

  it('marks the known pricing nav label as current without breaking other links', () => {
    const pricingLink = findAnchorByLabel(document, 'Pricing');
    const platformLink = findAnchorByLabel(document, 'Platform');

    expect(pricingLink?.getAttribute('href')).toBe('/pricing');
    expect(pricingLink?.getAttribute('aria-current')).toBe('page');
    expect(platformLink?.getAttribute('href')).toBe(pricingPlatformHref);
    expect(platformLink?.getAttribute('aria-current')).toBeNull();
  });

  it('accepts arbitrary activeNavLabel values without invalidating header output', () => {
    const navLinks = [...arbitraryActiveLabelDocument.querySelectorAll('.site-header__nav a')];

    expect(navLinks).toHaveLength(pricingHeaderNavLinks.length);
    pricingHeaderNavLinks.forEach((link) => {
      expect(findAnchorByLabel(arbitraryActiveLabelDocument, link.label)?.getAttribute('href')).toBe(link.href);
    });
    expect(arbitraryActiveLabelDocument.querySelector('[aria-current="page"]')).toBeNull();
    expect(arbitraryActiveLabelDocument.querySelector('[aria-disabled="true"]')).toBeNull();
  });

  it('supports explicit footer links overrides with the same href-only contract', () => {
    const footerLinks = [...footerOverrideDocument.querySelectorAll('footer nav a')];

    expect(footerLinks).toHaveLength(1);
    expect(footerLinks[0]?.textContent?.trim()).toBe('Custom footer link');
    expect(footerLinks[0]?.getAttribute('href')).toBe('/pricing#custom-footer-link');
    expect(findAnchorByLabel(footerOverrideDocument, landingContent.footer.links[0].label)).toBeUndefined();
  });
});
