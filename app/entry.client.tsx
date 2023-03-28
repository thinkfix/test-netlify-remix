import { RemixBrowser, useLocation, useMatches  } from "@remix-run/react";
import { startTransition, StrictMode, useEffect } from "react";
// import * as Sentry from "@sentry/remix";
import { hydrateRoot } from "react-dom/client";

// Sentry.init({
//   dsn: "https://bd32a7ac0ac64c5f80fd25bd727f5c79:b0f0f265ff2445e38b4a08641c5c5d35@o4504576276037632.ingest.sentry.io/4504916542488576",
//   tracesSampleRate: 1,
//   integrations: [
//     new Sentry.BrowserTracing({
//       routingInstrumentation: Sentry.remixRouterInstrumentation(
//           useEffect,
//           useLocation,
//           useMatches
//       ),
//     }),
//   ],
// });

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
