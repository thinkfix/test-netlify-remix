import { LinksFunction, MetaFunction } from "@remix-run/node";
import {
    Links,
    Meta,
    LiveReload,
    ScrollRestoration,
    Scripts,
    Outlet
} from "@remix-run/react";

import Header from "~/components/Header";
import Footer from "~/components/Footer";

import styles from "./styles/app.css";

export const links: LinksFunction = () => {
    return [
        { rel: "stylesheet", href: styles },
        { rel: "stylesheet", href: "https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.min.css" }
    ];
};

export const meta: MetaFunction = () => ({
    charset: "utf-8",
    title: "Tiny Elephant - Skreddersydde nettbutikker med Adobe Commerce / Magento som plattform",
    viewport: "width=device-width,initial-scale=1",
    description: "Vi lager skreddersydde nettbutikker med Magento som plattform"
});

export default function App() {
  return (
      <html lang="nb">
      <head>
          <Meta />
          <Links />
      </head>
      <body className={'bg-te-gray-0 font-styrene'}>
      <Header />
      <main className={"min-h-[600px] overflow-hidden"}>
          <Outlet />
      </main>
      <Footer />
      <ScrollRestoration />
      <Scripts />
      <LiveReload />
      </body>
      </html>
  );
}