import { createBrowserClient } from "@supabase/ssr";

export const supabase = createBrowserClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY,
  {
    isSingleton: true
  }
)