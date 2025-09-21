interface Environments {
  readonly ORIGIN: string;
  readonly APP_ENVIRONMENT: "development" | "production";
  readonly COOKIE_SESSION_SECRET: string;
  readonly GITHUB_CLIENT_ID: string;
  readonly GITHUB_CLIENT_SECRET: string;
  readonly GOOGLE_CLIENT_ID: string;
  readonly GOOGLE_CLIENT_SECRET: string;
  readonly GOOGLE_RECAPTCHA_SITE_KEY: string;
  readonly GOOGLE_RECAPTCHA_SECRET_KEY: string;
  readonly GOOGLE_RECAPTCHA_PROJECT_ID: string;
  readonly DATABASE_URL: string;
  readonly SUPABASE_URL: string;
  readonly SUPABASE_KEY: string;
  readonly GOOGLE_APP_USER: string;
  readonly GOOGLE_APP_PASSWORD: string;
  readonly GOOGLE_API_KEY: string;
}

// Vite
declare namespace JSX {
  interface IntrinsicElements {
    // biome-ignore lint/suspicious/noExplicitAny: Custom web component
    "dotlottie-player": any;
  }
}

declare global {
  namespace NodeJS {
    interface ProcessEnv extends Environments {}
  }
}

export {};
