# Tempest Archive — Archivo Analítico del Gran Sabio

Wiki colaborativa en español y **grafo interactivo de relaciones** sobre el universo de _Tensei Shitara Slime Datta Ken_ (_That Time I Got Reincarnated as a Slime_), con control estricto de spoilers (`none`, `anime`, `novel`), historial de revisiones con _diff_ y moderación por roles.

> **Aviso legal:** Proyecto académico y de fans sin fines de lucro. Sin afiliación con Fuse, Mitz Vah, Kodansha ni 8bit Studio. Todo el texto es redacción 100 % original y los recursos gráficos usan placeholders vectoriales propios o contenido con licencia verificada.

---

## 1. Arquitectura (Sección 14: Supabase + Vercel)

| Capa                       | Tecnología                                                                                 |
| -------------------------- | ------------------------------------------------------------------------------------------ |
| **Monorepo**               | `pnpm` workspaces (`apps/web`, `packages/shared`, `packages/config`, `supabase/`)          |
| **Frontend + Backend SSR** | Next.js 16 (App Router, Server Components, Route Handlers `/api/v1/*`, Server Actions)     |
| **Base de datos y Auth**   | Supabase (PostgreSQL 17, RLS en el 100 % de tablas, Auth con Email/Google/GitHub, Storage) |
| **Validación y Tipos**     | TypeScript (`strict: true`) + Zod 4 + errores RFC 9457 (_Problem Details_)                 |
| **Grafo Interactivo**      | Cytoscape.js (`fcose`) conectado a RPC recursivo `graph_neighbors`                         |
| **Calidad y Pruebas**      | ESLint 10, Prettier, Husky, Commitlint, Vitest y Playwright E2E                            |

---

## 2. Requisitos del Sistema

- **Node.js** >= 22.0.0 (detectado en entorno: `v26.12.1`)
- **pnpm** >= 10.0.0 (detectado en entorno: `11.22.0`)
- **Git** >= 2.40
- **Cuenta en Supabase** (plan gratuito — proyecto `tempest-dev`) y **Vercel**
- _Nota sobre Docker:_ No se requiere Docker local (optimizado para equipos de ~4 GB de RAM según `docs/DECISIONS.md` ADR-002).

---

## 3. Instalación y Uso Rápido

```bash
# 1. Instalar dependencias del monorepo
pnpm install

# 2. Copiar variables de entorno de ejemplo
cp .env.example apps/web/.env.local

# 3. Levantar servidor de desarrollo en http://localhost:3000
pnpm dev
```

---

## 4. Comandos Principales

| Comando           | Descripción                                                               |
| ----------------- | ------------------------------------------------------------------------- |
| `pnpm dev`        | Inicia `apps/web` en modo desarrollo (`http://localhost:3000`)            |
| `pnpm build`      | Compila todos los paquetes y la aplicación Next.js para producción        |
| `pnpm lint`       | Ejecuta ESLint en todos los paquetes del monorepo                         |
| `pnpm typecheck`  | Verifica tipos con `tsc --noEmit` en todo el monorepo                     |
| `pnpm test`       | Ejecuta pruebas unitarias con Vitest                                      |
| `pnpm test:e2e`   | Ejecuta pruebas E2E con Playwright                                        |
| `pnpm db:migrate` | Aplica las migraciones SQL de `supabase/migrations/` al proyecto enlazado |
| `pnpm db:seed`    | Ejecuta la carga idempotente de datos en Supabase                         |

---

## 5. Documentación en `docs/`

- [`docs/DECISIONS.md`](./docs/DECISIONS.md): Decisiones de arquitectura (ADR).
- [`docs/SKILLS.md`](./docs/SKILLS.md): Catálogo y auditoría de skills activas.
- [`docs/SUPABASE_BASICO.md`](./docs/SUPABASE_BASICO.md): Guía rápida de 1 página sobre Supabase y su panel.
- [`PROGRESS.md`](./PROGRESS.md): Estado actual por fases y pasos para retomar.
