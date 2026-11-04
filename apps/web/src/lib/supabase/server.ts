import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { getSupabasePublicConfig } from "@/lib/env";

export async function createClient() {
  const config = getSupabasePublicConfig();
  if (!config.isConfigured) {
    throw new Error(config.reason ?? "Supabase no está configurado en el servidor.");
  }

  const cookieStore = await cookies();

  return createServerClient(config.url, config.anonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        } catch {
          // Ignorar cuando se invoca desde un Server Component de solo lectura;
          // el middleware refrescará la cookie de sesión.
        }
      },
    },
  });
}
