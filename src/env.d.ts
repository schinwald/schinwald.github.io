interface Environments {
  readonly SUPABASE_URL: string
  readonly SUPABASE_KEY: string
  readonly SENDGRID_API_KEY: string
  readonly MY_EMAIL: string
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
