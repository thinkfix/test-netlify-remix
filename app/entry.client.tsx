import { RemixBrowser, useLocation, useMatches  } from "@remix-run/react";
import { startTransition, StrictMode, useEffect } from "react";
import * as Sentry from "@sentry/remix";
import { hydrateRoot } from "react-dom/client";

Sentry.init({
  dsn: "https://021af590360540af8dddb2fb9c361872:8d63b44a36d540818ed63917e139afe8@o4504909773471744.ingest.sentry.io/4504910217609216",
  tracesSampleRate: 1,
  integrations: [
    new Sentry.BrowserTracing({
      routingInstrumentation: Sentry.remixRouterInstrumentation(
          useEffect,
          useLocation,
          useMatches
      ),
    }),
  ],
});

function hydrate() {
  startTransition(() => {
    hydrateRoot(
      document,
      <StrictMode>
        <RemixBrowser />
      </StrictMode>
    );
  });
}

if (window.requestIdleCallback) {
  window.requestIdleCallback(hydrate);
} else {
  // Safari doesn't support requestIdleCallback
  // https://caniuse.com/requestidlecallback
  window.setTimeout(hydrate, 1);
}
