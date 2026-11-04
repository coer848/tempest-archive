-- Semilla base de Fase 0 (idempotente)
insert into public.system_status (key, title, message, phase, updated_at)
values (
  'great_sage_core',
  'Núcleo Analítico: Gran Sabio',
  'Informe: Vínculo con la base de datos de Jura-Tempest verificado en tiempo real. Archivo listo para indexar entidades y relaciones.',
  'Fase 0 — Conectividad Punta a Punta',
  now()
)
on conflict (key) do update
set
  title = excluded.title,
  message = excluded.message,
  phase = excluded.phase,
  updated_at = now();
