import { Activity, Database, GitBranch, ShieldCheck } from "lucide-react";
import { getSystemStatus } from "@/lib/system-status";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const health = await getSystemStatus();

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-8 py-12 md:py-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Columna izquierda: Identidad del Gran Sabio */}
        <section className="lg:col-span-7 flex flex-col gap-6">
          <div className="inline-flex items-center gap-2.5 self-start px-3 py-1 rounded-full sage-panel text-xs font-mono-sage text-[var(--accent-slime)]">
            <Activity className="size-3.5" aria-hidden="true" />
            <span>HABILIDAD ÚNICA: GRAN SABIO · FASE 0 ACTIVA</span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.08]">
            Tempest Archive
          </h1>

          <p className="text-lg sm:text-xl text-[var(--text-secondary)] max-w-[62ch]">
            Archivo colaborativo y cartografía relacional de{" "}
            <em className="font-display not-italic text-[var(--text-primary)]">
              Tensei Shitara Slime Datta Ken
            </em>
            . Cada personaje, habilidad, linaje evolutivo y facción documentado bajo verificación de
            fuentes y filtro estricto de spoilers.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="sage-panel rounded-xl p-4 flex flex-col gap-1.5">
              <span className="font-mono-sage text-xs text-[var(--text-muted)]">ARQUITECTURA</span>
              <span className="font-semibold text-sm">Next.js + Supabase</span>
              <span className="text-xs text-[var(--text-secondary)]">
                App Router, SSR y PostgreSQL 17 con RLS estricto.
              </span>
            </div>

            <div className="sage-panel rounded-xl p-4 flex flex-col gap-1.5">
              <span className="font-mono-sage text-xs text-[var(--text-muted)]">SEGURIDAD</span>
              <span className="font-semibold text-sm">RLS en 100 % tablas</span>
              <span className="text-xs text-[var(--text-secondary)]">
                Políticas por rol: lector, editor, moderador y admin.
              </span>
            </div>

            <div className="sage-panel rounded-xl p-4 flex flex-col gap-1.5">
              <span className="font-mono-sage text-xs text-[var(--text-muted)]">ANTISPOILER</span>
              <span className="font-semibold text-sm">3 niveles de lectura</span>
              <span className="text-xs text-[var(--text-secondary)]">
                Sin spoilers, al día con el anime o novela ligera.
              </span>
            </div>
          </div>
        </section>

        {/* Columna derecha: Lectura en tiempo real desde la Base de Datos */}
        <aside
          aria-label="Diagnóstico de conexión con base de datos"
          className="lg:col-span-5 sage-panel rounded-2xl p-6 sm:p-8 flex flex-col gap-5"
        >
          <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-4">
            <div className="flex items-center gap-2.5">
              <Database className="size-5 text-[var(--accent-slime)]" aria-hidden="true" />
              <h2 className="font-mono-sage text-sm font-semibold tracking-wide">
                TELEMETRÍA DE BASE DE DATOS
              </h2>
            </div>
            <span
              className={`font-mono-sage text-xs px-2.5 py-0.5 rounded-full border ${
                health.connected
                  ? "border-[var(--accent-slime)] text-[var(--accent-slime)]"
                  : "border-[var(--accent-veldora)] text-[var(--accent-veldora)]"
              }`}
            >
              {health.connected ? "ONLINE · SUPABASE" : "PENDIENTE DE VÍNCULO"}
            </span>
          </div>

          <dl className="flex flex-col gap-3 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-[var(--text-muted)] font-mono-sage text-xs">REGISTRO CLAVE</dt>
              <dd className="font-mono-sage text-xs">{health.record.key}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-[var(--text-muted)] font-mono-sage text-xs">ORIGEN DE DATOS</dt>
              <dd className="font-mono-sage text-xs">
                {health.source === "supabase"
                  ? "PostgreSQL (public.system_status)"
                  : "Respaldo local (sin .env.local activo)"}
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-[var(--text-muted)] font-mono-sage text-xs">LATENCIA</dt>
              <dd className="font-mono-sage text-xs">{health.latencyMs} ms</dd>
            </div>
          </dl>

          <div className="rounded-xl bg-[var(--bg-elevated)] p-4 border border-[var(--border-subtle)] flex flex-col gap-2">
            <p className="font-mono-sage text-xs text-[var(--accent-slime)] font-semibold">
              {health.record.title}
            </p>
            <p className="text-sm text-[var(--text-primary)]">{health.record.message}</p>
            <p className="font-mono-sage text-[11px] text-[var(--text-muted)]">
              {health.record.phase}
            </p>
          </div>

          {health.diagnosticNote ? (
            <div className="text-xs text-[var(--text-secondary)] border-l-2 border-[var(--accent-veldora)] pl-3 py-1">
              <strong>Nota diagnóstica:</strong> {health.diagnosticNote}
            </div>
          ) : null}

          <div className="pt-2 border-t border-[var(--border-subtle)] flex items-center justify-between text-xs text-[var(--text-muted)]">
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="size-4 text-[var(--accent-slime)]" aria-hidden="true" />
              Endpoint: <code className="font-mono-sage">/api/v1/health</code>
            </span>
            <span className="inline-flex items-center gap-1.5 font-mono-sage">
              <GitBranch className="size-3.5" aria-hidden="true" />
              main
            </span>
          </div>
        </aside>
      </div>
    </main>
  );
}
