import { z } from "zod";

const supabasePublicEnvSchema = z.object({
  url: z
    .string()
    .url()
    .refine((val) => !val.includes("tu-proyecto-ref"), {
      message: "NEXT_PUBLIC_SUPABASE_URL aún contiene el valor de plantilla.",
    }),
  anonKey: z
    .string()
    .min(20)
    .refine((val) => !val.includes("tu-clave-publica"), {
      message: "NEXT_PUBLIC_SUPABASE_ANON_KEY aún contiene el valor de plantilla.",
    }),
});

export interface SupabasePublicConfig {
  isConfigured: boolean;
  url: string;
  anonKey: string;
  reason?: string;
}

export function getSupabasePublicConfig(): SupabasePublicConfig {
  const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
  const rawAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

  const parsed = supabasePublicEnvSchema.safeParse({
    url: rawUrl,
    anonKey: rawAnonKey,
  });

  if (!parsed.success) {
    const firstIssue = parsed.error.issues[0];
    return {
      isConfigured: false,
      url: rawUrl,
      anonKey: rawAnonKey,
      reason:
        firstIssue?.message ??
        "Variables NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_ANON_KEY pendientes de configurar.",
    };
  }

  return {
    isConfigured: true,
    url: parsed.data.url,
    anonKey: parsed.data.anonKey,
  };
}
