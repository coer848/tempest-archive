-- =============================================================================
-- Fase 0: Tabla de verificación de extremo a extremo (Supabase <-> Next.js <-> Vercel)
-- Seguridad: RLS activado obligatoriamente con política de lectura pública explícita.
-- =============================================================================

create table if not exists public.system_status (
  key text primary key,
  title text not null,
  message text not null,
  phase text not null,
  updated_at timestamptz not null default now()
);

comment on table public.system_status is
  'Registro de estado del núcleo analítico (Gran Sabio) para verificar conectividad Supabase-Next.js.';

-- Activar Row Level Security (obligatorio en todas las tablas de public)
alter table public.system_status enable row level security;

-- Permisos de rol en Data API
grant select on table public.system_status to anon, authenticated;

-- Política RLS explícita para lectura pública (anónimo y autenticado)
drop policy if exists "system_status_select_public" on public.system_status;
create policy "system_status_select_public"
  on public.system_status
  for select
  to anon, authenticated
  using (true);

-- Semilla idempotente de Fase 0
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
