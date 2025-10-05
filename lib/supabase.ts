import { createBrowserClient } from '@supabase/ssr';
import type { Database } from './database.types';

// Client-side Supabase client (for use in Client Components)
// Using the new @supabase/ssr package instead of deprecated auth-helpers
export const supabase = createBrowserClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// For backwards compatibility
export const createSupabaseClient = () => supabase;

