import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import "~/styles/globals.css"

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Astro description" />
        <meta name="generator" content="" />

        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"></link>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"></link>
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"></link>
        <link rel="manifest" href="/site.webmanifest"></link>

        {/* <!-- Primary Meta Tags --> */}
        <meta name="title" content="James Schinwald" />
        <meta name="description" content="Welcome to my portfolio! I'm James, a seasoned software engineer with expertise in full-stack development. Explore my projects and let's collaborate!" />

        {/* <!-- Open Graph / Facebook --> */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.schinwald.dev" />
        <meta property="og:title" content="James Schinwald" />
        <meta property="og:description" content="Welcome to my portfolio! I'm James, a seasoned software engineer with expertise in full-stack development. Explore my projects and let's collaborate!" />
        <meta property="og:image" content="/metadata.png" />

        {/* <!-- Twitter --> */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://www.schinwald.dev/" />
        <meta property="twitter:title" content="James Schinwald" />
        <meta property="twitter:description" content="Welcome to my portfolio! I'm James, a seasoned software engineer with expertise in full-stack development. Explore my projects and let's collaborate!" />
        <meta property="twitter:image" content="/metadata.png" />

        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
