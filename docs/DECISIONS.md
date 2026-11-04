# Registro de Decisiones de Arquitectura (ADR) — Tempest Archive

Este documento registra todas las decisiones técnicas, arquitectónicas y de diseño tomadas durante el desarrollo de **Tempest Archive**, siguiendo el formato **Contexto → Opciones → Decisión → Motivo**.

---

## ADR-001: Nombre e identidad del proyecto

- **Fecha:** 2026-11-03
- **Contexto:** Se requiere un nombre para la wiki colaborativa y grafo interactivo de _Tensei Shitara Slime Datta Ken_ que refleje la identidad de la obra sin infringir marcas registradas.
- **Opciones:**
  1. **Tempest Archive** (nombre base propuesto, acompañado del concepto visual _Registros del Gran Sabio_).
  2. _Jura Codex_ (centrado solo en el bosque de Jura).
  3. _Octagram Wiki_ (centrado en los Señores Demonio, excluyente para los primeros arcos).
- **Decisión:** Mantener **Tempest Archive** como nombre principal del proyecto y repositorio (`tempest-archive`), adoptando el subtítulo conceptual **"Archivo Analítico del Gran Sabio"** para la interfaz.
- **Motivo:** Es claro, memorable, abarca tanto la Federación de Jura-Tempest como todas las facciones, habilidades y líneas evolutivas de la obra, y conecta directamente con la dirección visual de análisis técnico-mágico.

---

## ADR-002: Arquitectura Supabase + Vercel y omisión de Docker local

- **Fecha:** 2026-11-03
- **Contexto:** La inspección del entorno local reveló:
  - **SO:** Windows 11 Home Single Language (10.0.26200)
  - **CPU:** Intel Core i3-10110U @ 2.10 GHz (2 núcleos físicos, 4 hilos)
  - **RAM:** 3.84 GB totales (~0.45 GB libres en reposo)
  - **Disco:** 81.19 GB libres en `C:`
  - **Herramientas instaladas:** Node.js v26.12.1, pnpm 11.22.0, Git 2.54.0, GitHub CLI 2.97.0. Docker no está instalado.
    Además, la **Sección 14** del documento maestro tiene prioridad explícita sobre las secciones 4, 5, 6, 7, 10 y 11.1, indicando no usar Docker local en equipos de ~4 GB de RAM.
- **Opciones:**
  1. Instalar Docker Desktop + levantar PostgreSQL/Fastify/Mailpit localmente.
  2. Adoptar la arquitectura **Supabase Cloud (`tempest-dev` / `tempest-prod`) + Next.js App Router (Route Handlers y Server Actions) + Vercel**, sin Docker local para desarrollo.
- **Decisión:** Opción 2 (Supabase en la nube + Next.js en Vercel, sin Docker local). Se conserva una carpeta `docker/` únicamente con referencia documental si se requiere en servidores CI/externos, pero todo el flujo principal usa `pnpm dev` conectado a Supabase Cloud.
- **Motivo:** Cumple estrictamente la prioridad de la Sección 14.2 y protege la estabilidad del equipo de 3.84 GB de RAM, donde correr Docker Desktop + contenedores bloquearía el sistema por agotamiento de memoria.

---

## ADR-003: Estructura del Monorepo y reemplazo de Fastify/Prisma por Route Handlers + SQL de Supabase

- **Fecha:** 2026-11-03
- **Contexto:** La Sección 5 planteaba `apps/api` (Fastify) + `prisma/`, pero la Sección 14.2 establece:
  - `apps/api` (Fastify) → `apps/web/app/api/*` (Route Handlers) y Server Actions.
  - Prisma + Postgres en Docker → Supabase Postgres con migraciones SQL (`supabase/migrations`) y generación de tipos (`supabase gen types typescript`).
- **Opciones:**
  1. Aplicación monolítica sin monorepo.
  2. Monorepo con `pnpm` workspaces manteniendo separación limpia entre `apps/web` (Next.js frontend + API Route Handlers), `packages/shared` (esquemas Zod, tipos de dominio, errores RFC 9457), `packages/config` (configuraciones compartidas) y `supabase/` (migraciones SQL, funciones RPC, políticas RLS y seeds).
- **Decisión:** Opción 2 (Monorepo con `pnpm` workspaces + carpeta `supabase/` en la raíz).
- **Motivo:** Permite compartir validaciones Zod y tipos estrictos entre el cliente, los Server Actions/Route Handlers y los scripts de seed/pruebas, reduciendo el consumo de RAM al levantar un único proceso de desarrollo (`next dev`) en lugar de dos servidores separados.

---

## ADR-004: Selección y auditoría de Skills locales

- **Fecha:** 2026-11-03
- **Contexto:** Las secciones 1.1 y 1.2 solicitan evaluar e instalar skills de diseño, frontend, backend/Supabase, pruebas y seguridad, revisando su código antes de ejecutar cualquier script remoto y limitando el conjunto activo para no saturar el contexto ni la RAM.
- **Opciones:**
  1. Ejecutar `npx skills add` descargando repositorios remotos adicionales.
  2. Utilizar las skills oficiales y comunitarias ya instaladas y auditadas localmente en `C:\Users\gabri\.agents\skills`, que cubren el 100 % de las categorías requeridas (`frontend-design`, `ui-ux-pro-max`, `shadcn`, `design-taste-frontend`, `emil-design-eng`, `web-design-guidelines`, `webapp-testing`, `supabase`, `supabase-postgres-best-practices`, `nextjs-supabase-auth`, `nextjs-best-practices`, `vercel-deployment`, `playwright-skill`, `security-auditor`, `mermaid-expert`).
- **Decisión:** Opción 2. Usar las skills locales ya presentes y auditadas en `.agents/skills`, documentándolas en `docs/SKILLS.md`.
- **Motivo:** Garantiza seguridad (cero ejecución de scripts remotos no verificados), rapidez y cumplimiento exacto del catálogo de diseño de la Sección 1.2.
