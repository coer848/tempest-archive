import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!url || !serviceKey || url.includes("tu-proyecto-ref")) {
  console.log(
    "[seed:phase0] Variables de Supabase no configuradas aún en .env.local. Omitiendo seed remoto.",
  );
  process.exit(0);
}

const supabase = createClient(url, serviceKey);

const { error } = await supabase.from("system_status").upsert(
  {
    key: "great_sage_core",
    title: "Núcleo Analítico: Gran Sabio",
    message:
      "Informe: Vínculo con la base de datos de Jura-Tempest verificado en tiempo real. Archivo listo para indexar entidades y relaciones.",
    phase: "Fase 0 — Conectividad Punta a Punta",
    updated_at: new Date().toISOString(),
  },
  { onConflict: "key" },
);

if (error) {
  console.error("[seed:phase0] Error al insertar registro inicial:", error.message);
  process.exit(1);
}

console.log("[seed:phase0] Registro 'great_sage_core' verificado en public.system_status.");
