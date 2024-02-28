/// <reference types="astro/client" />
declare namespace JSX {
  interface IntrinsicElements {
    "dotlottie-player": any;
  }
}

interface ImportMetaEnv {
  readonly SUPABASE_URL: string
  readonly SUPABASE_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
