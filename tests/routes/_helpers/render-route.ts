import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import type { AstroComponentFactory } from 'astro/runtime/server/index.js';
import { parseHTML } from 'linkedom';

const TEST_ORIGIN = 'https://route-tests.local';

type RenderedRoute = {
  html: string;
  document: Document;
};

let containerPromise: Promise<AstroContainer> | undefined;

function getContainer() {
  containerPromise ??= AstroContainer.create();
  return containerPromise;
}

export async function renderRoute(page: AstroComponentFactory, pathname: string): Promise<RenderedRoute> {
  const container = await getContainer();
  const request = new Request(new URL(pathname, TEST_ORIGIN));
  const html = await container.renderToString(page, {
    partial: false,
    request,
  });
  const { document } = parseHTML(html);

  return {
    html,
    document,
  };
}
