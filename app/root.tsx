import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
} from "react-router";
import { BackgroundGradient } from "./components/background-gradient";

import "~/styles/globals.css";
import { Code } from "./components/code";
import { NavigationProvider } from "./components/navigation";
import { OverlayProvider } from "./hooks/overlay";
import { Container } from "./layouts/container";
import { loader as actualLoader } from "./loader";
import { action as actualAction } from "./routes/_index/.server/actions";

export const loader = await actualLoader;
export const action = await actualAction;

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Astro description" />
        <meta name="generator" content="" />

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />

        {/* <!-- Primary Meta Tags --> */}
        <meta name="title" content="James Schinwald" />
        <meta
          name="description"
          content="Welcome to my portfolio! I'm James, a seasoned software engineer with expertise in full-stack development. Explore my projects and let's collaborate!"
        />

        {/* <!-- Open Graph / Facebook --> */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.schinwald.dev" />
        <meta property="og:title" content="James Schinwald" />
        <meta
          property="og:description"
          content="Welcome to my portfolio! I'm James, a seasoned software engineer with expertise in full-stack development. Explore my projects and let's collaborate!"
        />
        <meta property="og:image" content="/metadata.png" />

        {/* <!-- Twitter --> */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://www.schinwald.dev/" />
        <meta property="twitter:title" content="James Schinwald" />
        <meta
          property="twitter:description"
          content="Welcome to my portfolio! I'm James, a seasoned software engineer with expertise in full-stack development. Explore my projects and let's collaborate!"
        />
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

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error) && error.status === 404) {
    return (
      <main className="w-screen h-screen text-foreground flex flex-col justify-center items-center">
        <div className="flex flex-col justify-center items-center gap-2">
          <h2>Page Not Found</h2>
          <p>Are you lost?</p>
        </div>
        <BackgroundGradient />
      </main>
    );
  }

  if (process.env.NODE_ENV === "development" && error instanceof Error) {
    return (
      <main className="w-screen h-screen text-foreground flex flex-col justify-center items-center">
        <div className="flex flex-col justify-center items-center gap-2 p-10">
          <Container variant="narrow">
            <Code className="overflow-scroll w-full h-[600px] outline outline-destructive">
              {error.stack}
            </Code>
          </Container>
        </div>
        <BackgroundGradient />
      </main>
    );
  }

  return (
    <main className="w-screen h-screen text-foreground flex flex-col justify-center items-center">
      <div className="flex flex-col justify-center items-center gap-2">
        <h2>Oh no!</h2>
        <p>Something went wrong.</p>
      </div>
      <BackgroundGradient />
    </main>
  );
}

export default function App() {
  return (
    <NavigationProvider>
      <OverlayProvider>
        <Outlet />
      </OverlayProvider>
    </NavigationProvider>
  );
}
