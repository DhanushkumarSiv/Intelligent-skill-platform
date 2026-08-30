import { createServerClient } from "@supabase/ssr";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || (import.meta as any).env?.VITE_SUPABASE_URL || "https://oaylkobjuhdlewtkkmzu.supabase.co";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || "sb_publishable_sRyxjqnasgKpySyNyTC6lw_871l6Ak4";

export const createClient = (request: any) => {
  const supabase = createServerClient(
    supabaseUrl!,
    supabaseKey!,
    {
      cookies: {
        getAll() {
          return request?.cookies?.getAll ? request.cookies.getAll() : [];
        },
        setAll(cookiesToSet) {
          if (request?.cookies) {
            cookiesToSet.forEach(({ name, value }) => request.cookies.set?.(name, value));
          }
        },
      },
    },
  );

  return supabase;
};
