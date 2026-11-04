# Memoria de Progreso — Tempest Archive (`PROGRESS.md`)

> **Instrucción para el agente:** Lee este archivo junto con `docs/DECISIONS.md` al iniciar cada sesión o tras compactar contexto.

---

## Estado General

- **Fase actual:** Fase 0 — Diagnóstico, skills/MCP, monorepo base y conexión punta a punta (GitHub + Supabase + Vercel).
- **Estado de código local (Fase 0):** Monorepo creado en `C:\Users\gabri\tempest-archive`, linters, TypeScript estricto, Vitest, CI de GitHub Actions, migración SQL inicial (`20261103000000_phase0_system_status.sql`) y página de telemetría del Gran Sabio lista.
- **Estado de Modo Tutor (Sección 14.5):** Esperando confirmación del usuario para los pasos manuales de nube de Fase 0 (Paso 1: Repositorio en GitHub → Paso 2: Proyecto `tempest-dev` en Supabase → Paso 3: `.env.local` → Paso 4/5: Despliegue en Vercel).

---

## Registro por Fases

| Fase       | Estado                                                                  | Resumen                                                                                                                                                                                                                                                                             |
| ---------- | ----------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Fase 0** | 🟡 En cierre (Local 100 % en verde; pendiente vínculo nube con usuario) | Entorno inspeccionado (Windows 11, i3-10110U, 3.84 GB RAM, Node 26.12.1, pnpm 11.22.0, sin Docker). Creados `docs/SKILLS.md`, `docs/DECISIONS.md`, `docs/SUPABASE_BASICO.md`, monorepo `pnpm`, migración SQL de Fase 0 con RLS y vista inicial que consulta `public.system_status`. |
| **Fase 1** | ⏳ Pendiente                                                            | Diseño (`docs/DESIGN.md` con 2 pasadas, wireframes ASCII, tokens, `docs/ARCHITECTURE.md`, `docs/ERD.md`).                                                                                                                                                                           |
| **Fase 2** | ⏳ Pendiente                                                            | Esquema completo en Supabase (`profiles`, `entities`, `revisions`, `categories`, `relations`, `media`, `reports`, `audit_log`, `favorites`), RLS para los 4 roles, Auth (`@supabase/ssr`) y Route Handlers.                                                                         |
| **Fase 3** | ⏳ Pendiente                                                            | Seed idempotente con >= 40 entidades reales y >= 80 relaciones verificadas con niveles de spoiler y `source_ref`.                                                                                                                                                                   |
| **Fase 4** | ⏳ Pendiente                                                            | Frontend base (layout, tema claro/oscuro, inicio, explorar por tipo, plantillas de artículo, búsqueda, login/registro).                                                                                                                                                             |
| **Fase 5** | ⏳ Pendiente                                                            | Edición Markdown con vista previa sanitizada, historial de revisiones, diff, restauración, cola de moderación y reportes.                                                                                                                                                           |
| **Fase 6** | ⏳ Pendiente                                                            | Grafo interactivo Cytoscape (`fcose`) + RPC `graph_neighbors`, filtros, camino entre dos nodos, tabla accesible y exportación PNG/JSON.                                                                                                                                             |
| **Fase 7** | ⏳ Pendiente                                                            | Seguridad (CSP, rate-limit, Advisors de Supabase), rendimiento y auditoría visual (`audit` + `polish`).                                                                                                                                                                             |
| **Fase 8** | ⏳ Pendiente                                                            | Pruebas E2E con Playwright, `docs/ACADEMICO.md` (SENA), `docs/SECURITY.md`, `docs/API.md` y cierre de documentación.                                                                                                                                                                |
| **Fase 9** | ⏳ Pendiente                                                            | Producción (`tempest-prod`), Resend SMTP, PostHog con consentimiento (Ley 1581), Sentry y backups `pg_dump`.                                                                                                                                                                        |

---

## Comandos para Retomar

```powershell
cd C:\Users\gabri\tempest-archive
pnpm install
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm dev
```
