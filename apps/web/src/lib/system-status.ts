import type { SystemStatusRecord } from "@tempest-archive/shared";
import { getSupabasePublicConfig } from "@/lib/env";
import { createClient } from "@/lib/supabase/server";

export interface SystemHealthReport {
  connected: boolean;
  source: "supabase" | "local-fallback";
  latencyMs: number;
  record: SystemStatusRecord;
  diagnosticNote?: string;
}

const FALLBACK_RECORD: SystemStatusRecord = {
  key: "great_sage_core",
  title: "Núcleo Analítico: Gran Sabio (Modo Local)",
  message:
    "Aviso: Estructura de monorepo activa. Conecte las credenciales de Supabase en .env.local para leer la tabla public.system_status en vivo.",
  phase: "Fase 0 — Arranque y Diagnóstico",
  updatedAt: new Date("2026-11-03T00:00:00.000Z").toISOString(),
};

export async function getSystemStatus(): Promise<SystemHealthReport> {
  const startedAt = Date.now();
  const config = getSupabasePublicConfig();

  if (!config.isConfigured) {
    return {
      connected: false,
      source: "local-fallback",
      latencyMs: Date.now() - startedAt,
      record: FALLBACK_RECORD,
      diagnosticNote: config.reason,
    };
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("system_status")
      .select("key, title, message, phase, updated_at")
      .eq("key", "great_sage_core")
      .maybeSingle();

    const latencyMs = Date.now() - startedAt;

    if (error || !data) {
      return {
        connected: false,
        source: "local-fallback",
        latencyMs,
        record: FALLBACK_RECORD,
        diagnosticNote:
          error?.message ??
          "No se encontró el registro 'great_sage_core' en public.system_status. Ejecute la migración de Fase 0.",
      };
    }

    return {
      connected: true,
      source: "supabase",
      latencyMs,
      record: {
        key: String(data.key),
        title: String(data.title),
        message: String(data.message),
        phase: String(data.phase),
        updatedAt: String(data.updated_at),
      },
    };
  } catch (err) {
    return {
      connected: false,
      source: "local-fallback",
      latencyMs: Date.now() - startedAt,
      record: FALLBACK_RECORD,
      diagnosticNote:
        err instanceof Error ? err.message : "Error inesperado al consultar Supabase.",
    };
  }
}
