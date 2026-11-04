# Memoria de Progreso — Tempest Archive (`PROGRESS.md`)

> **Instrucción para el agente:** Lee este archivo junto con `docs/DECISIONS.md` al iniciar cada sesión o tras compactar contexto.

---

## Estado General

- **Fase actual:** Fase 0 completada al 100 % · Listo para iniciar **Fase 1 (Diseño, Wireframes, Tokens, ERD y Arquitectura)**.
- **URL pública activa:** `https://tempest-archive.vercel.app` (conectada a GitHub `coer848/tempest-archive` y Supabase `hgibmdokzoihofbkcajy`).
- **Estado de código:** `lint`, `typecheck`, `test` y `build` en verde; endpoint `/api/v1/health` respondiendo `connected: true` desde PostgreSQL con RLS activo.

---

## Registro por Fases

| Fase       | Estado        | Resumen                                                                                                                                                                                                                                                                                                       |
| ---------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Fase 0** | 🟢 Completada | Entorno inspeccionado; creados `docs/SKILLS.md`, `docs/DECISIONS.md` y `docs/SUPABASE_BASICO.md`; monorepo `pnpm` + CI en GitHub Actions; migración `20261103000000_phase0_system_status.sql` aplicada en Supabase (`tempest-dev`); desplegado en `https://tempest-archive.vercel.app` leyendo datos en vivo. |
| **Fase 1** | ⏳ Pendiente  | Diseño (`docs/DESIGN.md` con 2 pasadas, wireframes ASCII, tokens, `docs/ARCHITECTURE.md`, `docs/ERD.md`).                                                                                                                                                                                                     |
| **Fase 2** | ⏳ Pendiente  | Esquema completo en Supabase (`profiles`, `entities`, `revisions`, `categories`, `relations`, `media`, `reports`, `audit_log`, `favorites`), RLS para los 4 roles, Auth (`@supabase/ssr`) y Route Handlers.                                                                                                   |
| **Fase 3** | ⏳ Pendiente  | Seed idempotente con >= 40 entidades reales y >= 80 relaciones verificadas con niveles de spoiler y `source_ref`.                                                                                                                                                                                             |
| **Fase 4** | ⏳ Pendiente  | Frontend base (layout, tema claro/oscuro, inicio, explorar por tipo, plantillas de artículo, búsqueda, login/registro).                                                                                                                                                                                       |
| **Fase 5** | ⏳ Pendiente  | Edición Markdown con vista previa sanitizada, historial de revisiones, diff, restauración, cola de moderación y reportes.                                                                                                                                                                                     |
| **Fase 6** | ⏳ Pendiente  | Grafo interactivo Cytoscape (`fcose`) + RPC `graph_neighbors`, filtros, camino entre dos nodos, tabla accesible y exportación PNG/JSON.                                                                                                                                                                       |
| **Fase 7** | ⏳ Pendiente  | Seguridad (CSP, rate-limit, Advisors de Supabase), rendimiento y auditoría visual (`audit` + `polish`).                                                                                                                                                                                                       |
| **Fase 8** | ⏳ Pendiente  | Pruebas E2E con Playwright, `docs/ACADEMICO.md` (SENA), `docs/SECURITY.md`, `docs/API.md` y cierre de documentación.                                                                                                                                                                                          |
| **Fase 9** | ⏳ Pendiente  | Producción (`tempest-prod`), Resend SMTP, PostHog con consentimiento (Ley 1581), Sentry y backups `pg_dump`.                                                                                                                                                                                                  |

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
