import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { setTimeout as delay } from 'node:timers/promises';

const HOST = process.env.SMOKE_HOST ?? '127.0.0.1';
const PORT = Number(process.env.SMOKE_PORT ?? 4321);
const BASE_URL = `http://${HOST}:${PORT}`;
const TIMEOUT_MS = Number(process.env.SMOKE_TIMEOUT_MS ?? 30000);
const SECTION_ORDER = ['top', 'simulation', 'how-it-works', 'features', 'demo', 'use-cases', 'cta'];
const PAGE_REQUIRED_SIGNALS = [
  'ObsidianArchitect',
  'Mock APIs with',
  'real-world',
  'behavior in seconds',
  'Mock Prompt Editor',
  'Simulate Real Backend Behavior',
  'Probability-based response scenarios',
  'How It Works',
  'Create a project',
  'Use instantly',
  'AI Generation',
  'Instant Base URL',
  'Client Request',
  'Mock API Response',
  'Accelerate every phase of development',
  'Edge Case Testing',
  'Start building without a backend today',
  'Obsidian Architect',
  'Docs',
  'GitHub',
  'Contact',
];
const DISABLED_PLACEHOLDER_LABELS = ['Documentation', 'Changelog', 'Pricing', 'Docs', 'GitHub', 'Contact'];
const MOBILE_HEADER_CSS_CHECKS = [
  {
    label: 'mobile breakpoint declaration',
    pattern: /@media\s*\(max-width:\s*720px\)/,
  },
  {
    label: 'mobile header shell stacking',
    pattern:
      /@media\s*\(max-width:\s*720px\)\s*\{[\s\S]*?\.landing-page \.site-header__shell,\s*[\s\S]*?\.landing-page \.site-header__group[\s\S]*?flex-direction:\s*column;[\s\S]*?align-items:\s*stretch;/,
  },
  {
    label: 'mobile header nav wrapping',
    pattern:
      /@media\s*\(max-width:\s*720px\)\s*\{[\s\S]*?\.landing-page \.site-header__nav[\s\S]*?flex-wrap:\s*wrap;[\s\S]*?justify-content:\s*center;/,
  },
  {
    label: 'mobile header action group full width',
    pattern:
      /@media\s*\(max-width:\s*720px\)\s*\{[\s\S]*?\.landing-page \.site-header__group--actions\s*\{[\s\S]*?width:\s*100%;/,
  },
  {
    label: 'mobile header actions full width',
    pattern:
      /@media\s*\(max-width:\s*720px\)\s*\{[\s\S]*?\.landing-page \.site-header__action\s*\{[\s\S]*?width:\s*100%;/,
  },
  {
    label: 'landing page namespace',
    pattern: /\.landing-page\s*\{/,
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

function getDisabledPlaceholderPattern(label) {
  return new RegExp(
    `<span(?=[^>]*aria-disabled="true")(?=[^>]*title="[^"]+")[^>]*>\\s*${label}\\s*<\\/span>`,
  );
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getSectionFragment(html, id) {
  const match = html.match(new RegExp(`<section[^>]*id="${escapeRegExp(id)}"[^>]*>[\\s\\S]*?<\\/section>`));

  if (!match) {
    throw new Error(`Could not locate section fragment for #${id}.`);
  }

  return match[0];
}

function countMatches(content, pattern) {
  return [...content.matchAll(pattern)].length;
}

function assertIncludes(content, expected, label) {
  if (!content.includes(expected)) {
    throw new Error(`Expected ${label} to include "${expected}".`);
  }
}

function assertCount(content, pattern, expected, label) {
  const actual = countMatches(content, pattern);

  if (actual !== expected) {
    throw new Error(`Expected ${label} count to be ${expected} but received ${actual}.`);
  }
}

function assertPattern(content, pattern, label) {
  if (!pattern.test(content)) {
    throw new Error(`Expected ${label} to match ${pattern}.`);
  }
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

  const missingSignals = PAGE_REQUIRED_SIGNALS.filter((signal) => !html.includes(signal));

  if (missingSignals.length > 0) {
    throw new Error(`Landing is missing expected visible signals: ${missingSignals.join(', ')}`);
  }

  const missingPlaceholders = DISABLED_PLACEHOLDER_LABELS.filter((label) => !getDisabledPlaceholderPattern(label).test(html));

  if (missingPlaceholders.length > 0) {
    throw new Error(
      `Landing placeholders are missing honest disabled rendering for: ${missingPlaceholders.join(', ')}`,
    );
  }

  if (html.includes('href="#"')) {
    throw new Error('Landing still exposes deceptive href="#" placeholders.');
  }

  const mainMatch = html.match(/<main[^>]*id="main-content"[^>]*>[\s\S]*?<\/main>/);

  if (!mainMatch) {
    throw new Error('Could not locate the landing main content fragment.');
  }

  const sectionPositions = SECTION_ORDER.map((id) => mainMatch[0].indexOf(`id="${id}"`));

  if (sectionPositions.some((position) => position === -1)) {
    throw new Error(`Landing is missing one or more required sections: ${SECTION_ORDER.join(', ')}`);
  }

  for (let index = 1; index < sectionPositions.length; index += 1) {
    if (sectionPositions[index] <= sectionPositions[index - 1]) {
      throw new Error(`Landing sections are out of order. Expected: ${SECTION_ORDER.join(' -> ')}`);
    }
  }

  const simulationSection = getSectionFragment(mainMatch[0], 'simulation');
  const howItWorksSection = getSectionFragment(mainMatch[0], 'how-it-works');
  const featuresSection = getSectionFragment(mainMatch[0], 'features');
  const demoSection = getSectionFragment(mainMatch[0], 'demo');
  const useCasesSection = getSectionFragment(mainMatch[0], 'use-cases');

  assertCount(simulationSection, /class="landing-scenario-card"/g, 3, 'simulation scenario cards');
  assertIncludes(simulationSection, '/api/v1/users', 'simulation section');
  assertIncludes(simulationSection, '2s latency', 'simulation section');
  ['70%', 'Success Response', '20%', 'Empty Array', '10%', 'Internal Error'].forEach((signal) =>
    assertIncludes(simulationSection, signal, 'simulation section'),
  );

  assertCount(howItWorksSection, /class="landing-step-card"/g, 5, 'How It Works steps');
  ['1', '2', '3', '4', '5', 'Create a project', 'Use instantly'].forEach((signal) =>
    assertIncludes(howItWorksSection, signal, 'How It Works section'),
  );

  assertCount(featuresSection, /class="landing-feature-card"/g, 6, 'feature cards');
  ['AI Generation', 'Error Simulation', 'Latency Control', 'Multi-Response Scenarios', 'Live JSON Editor', 'Instant Base URL'].forEach((signal) =>
    assertIncludes(featuresSection, signal, 'features section'),
  );

  assertIncludes(demoSection, 'Client Request', 'demo section');
  assertIncludes(demoSection, 'Mock API Response', 'demo section');
  assertIncludes(demoSection, '200 OK', 'demo section');
  assertIncludes(demoSection, '(2.1s)', 'demo section');
  assertPattern(demoSection, /status[\s\S]*success/, 'demo section response payload');
  assertIncludes(demoSection, 'Marcus Aurelius', 'demo section');

  assertCount(useCasesSection, /class="landing-use-case-card"/g, 4, 'use case cards');
  ['Early Frontend', 'Edge Case Testing', 'Stakeholder Demos', 'Contract Validation'].forEach((signal) =>
    assertIncludes(useCasesSection, signal, 'use cases section'),
  );

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
