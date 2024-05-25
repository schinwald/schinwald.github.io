interface Environments {
  readonly APP_ENVIRONMENT: 'development' | 'production'
  readonly AUTH_TRUST_HOST: string
  readonly AUTH_SECRET: string
  readonly GITHUB_CLIENT_ID: string
  readonly GITHUB_CLIENT_SECRET: string
  readonly GOOGLE_CLIENT_ID: string
  readonly GOOGLE_CLIENT_SECRET: string
  readonly VITE_GOOGLE_RECAPTCHA_SITE_KEY: string
  readonly GOOGLE_RECAPTCHA_SECRET_KEY: string
  readonly SUPABASE_URL: string
  readonly SUPABASE_KEY: string
  readonly SENDGRID_API_KEY: string
}

// Vite
declare namespace JSX {
  interface IntrinsicElements {
    "dotlottie-player": any;
  }
}

interface ImportMetaEnv extends Environments {}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare global {
  namespace NodeJS {
    interface ProcessEnv extends Environments {}
  }
}

export {}