import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || (!anonKey && !serviceKey) || url.includes("tu-proyecto-ref")) {
  console.log(
    "[seed:phase0] Variables de Supabase no configuradas aún en .env.local. Omitiendo verificación remota.",
  );
  process.exit(0);
}

if (serviceKey) {
  const adminClient = createClient(url, serviceKey);
  const { error } = await adminClient.from("system_status").upsert(
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
    console.error("[seed:phase0] Error al insertar con service_role:", error.message);
    process.exit(1);
  }
}

const publicClient = createClient(url, anonKey || serviceKey);
const { data, error: readError } = await publicClient
  .from("system_status")
  .select("key, title, message, phase, updated_at")
  .eq("key", "great_sage_core")
  .single();

if (readError || !data) {
  console.error("[seed:phase0] Error al leer public.system_status:", readError?.message);
  process.exit(1);
}

console.log(
  `[seed:phase0] Lectura en vivo desde Supabase exitosa -> [${data.key}] ${data.title}: "${data.message}"`,
);
