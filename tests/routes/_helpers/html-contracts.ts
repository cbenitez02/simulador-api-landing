import { expect } from 'vitest';

function normalizeWhitespace(value: string | null | undefined) {
  return (value ?? '').replace(/\s+/g, ' ').trim();
}

function findExactTextNode<T extends Element>(elements: Iterable<T>, label: string) {
  const normalizedLabel = normalizeWhitespace(label);

  return [...elements].find((element) => normalizeWhitespace(element.textContent) === normalizedLabel);
}

export function getTitle(document: Document) {
  return normalizeWhitespace(document.querySelector('title')?.textContent);
}

export function getMetaContent(document: Document, selector: string) {
  return normalizeWhitespace(document.querySelector(selector)?.getAttribute('content'));
}

export function expectText(document: Document, text: string) {
  expect(normalizeWhitespace(document.documentElement.textContent)).toContain(normalizeWhitespace(text));
}

export function expectCount(document: Document, selector: string, expected: number) {
  expect(document.querySelectorAll(selector)).toHaveLength(expected);
}

export function expectSectionIds(document: Document, ids: string[]) {
  ids.forEach((id) => {
    expect(document.querySelector(`#${id}`), `Expected section #${id} to exist`).not.toBeNull();
  });
}

export function expectHonestLink(document: Document, label: string, href: string) {
  const link = findExactTextNode(document.querySelectorAll('a'), label);

  expect(link, `Expected navigable link labeled "${label}"`).toBeTruthy();
  expect(link?.getAttribute('href')).toBe(href);

  if (href.startsWith('#')) {
    expect(document.querySelector(href), `Expected anchor target ${href} for link "${label}" to exist`).not.toBeNull();
  }
}

export function expectLabelAbsent(document: Document, label: string) {
  const placeholder = findExactTextNode(document.querySelectorAll('[aria-disabled="true"]'), label);
  const navigableLink = findExactTextNode(document.querySelectorAll('a'), label);

  expect(placeholder, `Expected removed shell label "${label}" to stay absent from disabled placeholders`).toBeUndefined();
  expect(navigableLink, `Expected removed shell label "${label}" to stay absent from navigable links`).toBeUndefined();
}
