import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { setTimeout as delay } from 'node:timers/promises';

const HOST = process.env.SMOKE_HOST ?? '127.0.0.1';
const PORT = Number(process.env.SMOKE_PORT ?? 4321);
const BASE_URL = `http://${HOST}:${PORT}`;
const TIMEOUT_MS = Number(process.env.SMOKE_TIMEOUT_MS ?? 30000);
const HEADER_REQUIRED_SIGNALS = [
  'API Mock AI',
  'Platform',
  'Documentation',
  'Changelog',
  'Pricing',
  'Sign In',
  'Get Started',
  'href="#docs"',
  'href="#pricing"',
  'href="#login"',
  'href="#signup"',
  'aria-disabled="true"',
];

const HEADER_FORBIDDEN_SIGNALS = ['ArchitectOS', 'nav-link--active', 'href="#">Platform</a>', 'href="#">Changelog</a>'];
const HEADER_PLACEHOLDER_LABELS = ['Platform', 'Changelog'];
const MOBILE_HEADER_CSS_CHECKS = [
  {
    label: 'mobile breakpoint declaration',
    pattern: /@media\s*\(max-width:\s*720px\)/,
  },
  {
    label: 'mobile header shell stacking',
    pattern:
      /@media\s*\(max-width:\s*720px\)\s*\{[\s\S]*?\.site-header__shell,\s*[\s\S]*?\.site-header__group,\s*[\s\S]*?flex-direction:\s*column;[\s\S]*?align-items:\s*stretch;/,
  },
  {
    label: 'mobile header nav wrapping',
    pattern:
      /@media\s*\(max-width:\s*720px\)\s*\{[\s\S]*?\.site-header__nav,\s*[\s\S]*?flex-wrap:\s*wrap;[\s\S]*?justify-content:\s*center;/,
  },
  {
    label: 'mobile header action group full width',
    pattern:
      /@media\s*\(max-width:\s*720px\)\s*\{[\s\S]*?\.site-header__group--actions\s*\{[\s\S]*?width:\s*100%;/,
  },
  {
    label: 'mobile header actions full width',
    pattern:
      /@media\s*\(max-width:\s*720px\)\s*\{[\s\S]*?\.site-header__action\s*\{[\s\S]*?width:\s*100%;/,
  },
];

const astroCli = path.join(
  process.cwd(),
  'node_modules',
  'astro',
  'astro.js',
);

if (!existsSync(astroCli)) {
  throw new Error(`Astro CLI not found at ${astroCli}. Run npm install first.`);
}

const server = spawn(
  process.execPath,
  [astroCli, 'dev', '--host', HOST, '--port', String(PORT), '--strictPort'],
  {
    cwd: process.cwd(),
    env: { ...process.env },
    stdio: ['ignore', 'pipe', 'pipe'],
  },
);

server.stdout.on('data', (chunk) => {
  process.stdout.write(`[astro] ${chunk}`);
});

server.stderr.on('data', (chunk) => {
  process.stderr.write(`[astro] ${chunk}`);
});

async function waitForServer() {
  const startedAt = Date.now();

  while (Date.now() - startedAt < TIMEOUT_MS) {
    if (server.exitCode !== null) {
      throw new Error(`Astro dev server exited early with code ${server.exitCode}.`);
    }

    try {
      const response = await fetch(`${BASE_URL}/`);

      if (response.ok) {
        return response;
      }
    } catch {
      // Server is still booting.
    }

    await delay(500);
  }

  throw new Error(`Timed out waiting for Astro dev server at ${BASE_URL}.`);
}

async function fetchText(url) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Expected HTTP 200 for ${url} but received ${response.status}.`);
  }

  return response.text();
}

function getLinkedStylesheetUrls(html) {
  return [...html.matchAll(/<link[^>]+rel=["'][^"']*stylesheet[^"']*["'][^>]+href=["']([^"']+)["'][^>]*>/gi)].map(
    ([, href]) => new URL(href, `${BASE_URL}/`).toString(),
  );
}

function getInlineStyles(html) {
  return [...html.matchAll(/<style(?:\s[^>]*)?>([\s\S]*?)<\/style>/gi)].map(([, css]) => css);
}

function getHeaderPlaceholderPattern(label) {
  return new RegExp(
    `<span(?=[^>]*site-header__link--placeholder)(?=[^>]*aria-disabled="true")(?=[^>]*title="[^"]+")[^>]*>\\s*${label}\\s*<\\/span>`,
  );
}

async function stopServer() {
  if (server.exitCode !== null || server.killed) {
    return;
  }

  server.kill('SIGTERM');

  await Promise.race([
    new Promise((resolve) => server.once('close', resolve)),
    delay(5000),
  ]);

  if (server.exitCode === null) {
    server.kill('SIGKILL');
  }
}

try {
  const response = await waitForServer();
  const html = await response.text();
  const contentType = response.headers.get('content-type') ?? '';

  if (response.status !== 200) {
    throw new Error(`Expected HTTP 200 but received ${response.status}.`);
  }

  if (!contentType.includes('text/html')) {
    throw new Error(`Expected text/html but received "${contentType}".`);
  }

  const headerMatch = html.match(/<header[^>]*class="site-header"[^>]*>[\s\S]*?<\/header>/);

  if (!headerMatch) {
    throw new Error('Could not locate the site header fragment in the rendered HTML.');
  }

  const headerHtml = headerMatch[0];

  const missingSignals = HEADER_REQUIRED_SIGNALS.filter((signal) => !headerHtml.includes(signal));

  if (missingSignals.length > 0) {
    throw new Error(`Header is missing expected signals: ${missingSignals.join(', ')}`);
  }

  const forbiddenSignals = HEADER_FORBIDDEN_SIGNALS.filter((signal) => headerHtml.includes(signal));

  if (forbiddenSignals.length > 0) {
    throw new Error(`Header still contains legacy or deceptive signals: ${forbiddenSignals.join(', ')}`);
  }

  const missingPlaceholders = HEADER_PLACEHOLDER_LABELS.filter(
    (label) => !getHeaderPlaceholderPattern(label).test(headerHtml),
  );

  if (missingPlaceholders.length > 0) {
    throw new Error(
      `Header placeholders are missing honest disabled rendering for: ${missingPlaceholders.join(', ')}`,
    );
  }

  const fakePlaceholderAnchors = HEADER_PLACEHOLDER_LABELS.filter((label) =>
    new RegExp(`<a[^>]*href="#"[^>]*>\\s*${label}\\s*<\\/a>`).test(headerHtml),
  );

  if (fakePlaceholderAnchors.length > 0) {
    throw new Error(
      `Header still exposes fake placeholder anchors for: ${fakePlaceholderAnchors.join(', ')}`,
    );
  }

  if (!/<meta[^>]+name="viewport"[^>]+content="[^"]*width=device-width[^"]*initial-scale=1(?:\.0)?[^"]*"/i.test(html)) {
    throw new Error('Landing is missing the responsive viewport meta required for mobile header evidence.');
  }

  const linkedStylesheetUrls = getLinkedStylesheetUrls(html);
  const linkedStylesheets = await Promise.all(linkedStylesheetUrls.map(fetchText));
  const combinedCss = [...getInlineStyles(html), ...linkedStylesheets].join('\n');

  if (!combinedCss.trim()) {
    throw new Error('Could not load rendered stylesheet content for header validation.');
  }

  const missingMobileCssChecks = MOBILE_HEADER_CSS_CHECKS.filter(({ pattern }) => !pattern.test(combinedCss)).map(
    ({ label }) => label,
  );

  if (missingMobileCssChecks.length > 0) {
    throw new Error(
      `Rendered CSS is missing expected mobile header evidence: ${missingMobileCssChecks.join(', ')}`,
    );
  }

  console.log(`Smoke test passed for ${BASE_URL}/`);
} finally {
  await stopServer();
}
