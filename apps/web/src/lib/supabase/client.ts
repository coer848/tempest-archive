"use client";

import { createBrowserClient } from "@supabase/ssr";
import { getSupabasePublicConfig } from "@/lib/env";

export function createClient() {
  const config = getSupabasePublicConfig();
  if (!config.isConfigured) {
    throw new Error(config.reason ?? "Supabase no está configurado en el cliente.");
  }
  return createBrowserClient(config.url, config.anonKey);
}
