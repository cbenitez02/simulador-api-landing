import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { setTimeout as delay } from 'node:timers/promises';

const HOST = process.env.SMOKE_HOST ?? '127.0.0.1';
const PORT = Number(process.env.SMOKE_PORT ?? 4321);
const BASE_URL = `http://${HOST}:${PORT}`;
const TIMEOUT_MS = Number(process.env.SMOKE_TIMEOUT_MS ?? 30000);
const REQUIRED_SIGNALS = [
  'ArchitectOS',
  'Generate intelligent mock APIs in seconds',
  'Get Started for Free',
  'Active Endpoints',
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

  const missingSignals = REQUIRED_SIGNALS.filter((signal) => !html.includes(signal));

  if (missingSignals.length > 0) {
    throw new Error(`Landing is missing expected signals: ${missingSignals.join(', ')}`);
  }

  console.log(`Smoke test passed for ${BASE_URL}/`);
} finally {
  await stopServer();
}
