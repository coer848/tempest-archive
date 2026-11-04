# Arquitectura del Sistema — Tempest Archive (`docs/ARCHITECTURE.md`)

Este documento describe la arquitectura técnica de punta a punta de **Tempest Archive**, siguiendo la **Sección 14 (Supabase + Vercel)** como arquitectura prioritaria y preservando el diseño en capas, la validación estricta con Zod y el estándar de errores **RFC 9457 (Problem Details)**.

---

## 1. Diagrama General de Contenedores y Servicios (Mermaid)

```mermaid
flowchart TB
    subgraph Client["Navegador del Usuario (Desktop / Mobile)"]
        UI["Next.js App Router UI (React 19)\nServer & Client Components"]
        Graph["Grafo Interactivo\nCytoscape.js (layout fcose) + Vista Tabla A11y"]
        Consent["Gestor de Consentimiento\n(Ley 1581 / Privacidad)"]
    end

    subgraph Vercel["Vercel Cloud (Frontend + Backend Serverless)"]
        MW["Middleware SSR (@supabase/ssr)\nRefresco de sesión + Cabeceras CSP/HSTS"]
        RSC["Server Components & Server Actions\nLecturas SSR/ISR y Mutaciones"]
        API["Route Handlers (/api/v1/*)\nCapas: Route -> Controller -> Service -> Repository"]
    end

    subgraph Supabase["Supabase Cloud (tempest-dev / tempest-prod)"]
        Auth["Supabase Auth\nEmail + Google + GitHub OAuth"]
        PG[("PostgreSQL 17\nRLS en 100% tablas\npg_trgm + unaccent + tsvector")]
        RPC["Funciones SQL (RPC)\n- search_entities()\n- graph_neighbors()"]
        Storage["Supabase Storage\nBucket público 'media' (<= 2 MB)"]
    end

    subgraph External["Servicios Externos"]
        Resend["Resend SMTP\nVerificación y Recuperación"]
        Sentry["Sentry\nMonitoreo de Errores (sin PII)"]
        PostHog["PostHog Analytics\nEventos anónimos tras consentimiento"]
    end

    UI --> MW
    Graph --> API
    MW --> RSC
    MW --> API
    RSC --> PG
    RSC --> RPC
    API --> Auth
    API --> PG
    API --> RPC
    API --> Storage
    Auth --> Resend
    API -.-> Sentry
    UI -.-> Sentry
    Consent -->|Solo si acepta| PostHog
```

---

## 2. Estructura de Capas en el Servidor (`apps/web/src/server/`)

Aunque los endpoints viven dentro de Next.js (`apps/web/src/app/api/v1/*`) conforme a la Sección 14.2, el código mantiene la **separación estricta en 4 capas** exigida en la Sección 5 (cero lógica de negocio dentro de los archivos `route.ts`):

```text
apps/web/src/
├─ app/
│  ├─ api/v1/                 # 1. Capa de Rutas (Route Handlers HTTP)
│  │  ├─ health/route.ts
│  │  ├─ entities/route.ts
│  │  ├─ entities/[slug]/route.ts
│  │  ├─ entities/[slug]/revisions/route.ts
│  │  ├─ revisions/[id]/diff/route.ts
│  │  ├─ revisions/[id]/approve/route.ts
│  │  ├─ relations/route.ts
│  │  ├─ graph/route.ts
│  │  ├─ search/route.ts
│  │  ├─ media/route.ts
│  │  ├─ mod/queue/route.ts
│  │  ├─ reports/route.ts
│  │  └─ admin/...
├─ server/
│  ├─ controllers/            # 2. Capa de Controladores (parseo Zod, respuestas HTTP, ETag/Cache)
│  ├─ services/               # 3. Capa de Servicios (reglas de negocio, RBAC, diff, cálculo de caminos)
│  ├─ repositories/           # 4. Capa de Repositorios (consultas tipadas a Supabase Postgres / RPC)
│  └─ middleware/             # Rate-limiting por IP/usuario, manejo de errores RFC 9457 y auditoría
```

### Estándar de Errores: RFC 9457 (Problem Details)

Toda respuesta de error (`4xx` o `5xx`) en `/api/v1/*` devuelve `Content-Type: application/problem+json` utilizando `createProblemDetails()` de `@tempest-archive/shared`:

```json
{
  "type": "https://tempest-archive.vercel.app/probs/http-422",
  "title": "Datos de entrada inválidos",
  "status": 422,
  "detail": "El campo 'summary' no puede superar los 280 caracteres.",
  "instance": "/api/v1/entities",
  "errors": {
    "summary": ["Máximo 280 caracteres permitidos"]
  }
}
```

---

## 3. Flujos Principales (Diagramas de Secuencia)

### 3.1 Flujo de Edición y Moderación de Artículos

```mermaid
sequenceDiagram
    actor Editor as Usuario (Editor)
    actor Mod as Usuario (Moderator / Admin)
    participant Web as Next.js App / API (/api/v1)
    participant DB as Supabase PostgreSQL (RLS)

    Editor->>Web: POST /api/v1/entities/:slug/revisions (content_md, edit_summary, spoiler_level)
    Web->>Web: Validar esquema con Zod + Sanitizar vista previa
    Web->>DB: INSERT INTO public.revisions (author_id, status)
    alt Editor confiable (is_trusted_editor) o Moderator/Admin
        DB-->>Web: status = 'approved'
        Web->>DB: UPDATE entities SET current_revision_id = new_rev.id + INSERT audit_log
        Web-->>Editor: 201 Created (Publicada inmediatamente)
    else Editor estándar
        DB-->>Web: status = 'pending'
        Web-->>Editor: 202 Accepted (En cola de moderación)
        Mod->>Web: GET /api/v1/mod/queue
        Web->>DB: SELECT revisions WHERE status = 'pending'
        Mod->>Web: POST /api/v1/revisions/:id/approve
        Web->>DB: Verificar has_role(['moderator','admin'])
        Web->>DB: UPDATE revisions SET status='approved' + UPDATE entities.current_revision_id + INSERT audit_log
        Web-->>Mod: 200 OK (Revisión publicada)
    end
```

### 3.2 Flujo del Grafo Interactivo y Filtro Antispoiler

```mermaid
sequenceDiagram
    actor User as Lector
    participant GraphUI as Lienzo Cytoscape.js (Cliente)
    participant API as GET /api/v1/graph
    participant RPC as Supabase RPC graph_neighbors()

    User->>GraphUI: Abre / o /graph?center=rimuru-tempest&depth=2&spoiler=anime
    GraphUI->>API: Solicita subgrafo (center, depth=2, types, spoiler='anime', limit=500)
    API->>API: Valida parámetros con Zod
    API->>RPC: SELECT * FROM public.graph_neighbors('rimuru-tempest', 2, types, 'anime', 500)
    Note over RPC: CTE recursiva que recorre 'relations' hasta profundidad N\nfiltrando entidades y aristas cuyo spoiler_level <= 'anime'
    RPC-->>API: Nodos (con grado de conexión) + Aristas filtradas
    API-->>GraphUI: 200 OK { nodes, edges, meta } (Cache-Control + ETag)
    GraphUI->>GraphUI: Ejecuta layout 'fcose' una sola vez y cachea posiciones
    User->>GraphUI: Doble clic en nodo "Veldora Tempest"
    GraphUI->>API: Carga perezosa de vecinos de "veldora-tempest" (depth=1)
    API-->>GraphUI: Nuevos nodos/aristas -> Animación "Evolución" (Morph)
```

---

## 4. Estrategia de Rendimiento, Caché y Límites de Hardware

1. **Adaptación a 3.84 GB de RAM en Desarrollo:**
   - Un único servidor local (`next dev` con Turbopack) sin contenedores Docker ni procesos duplicados.
   - Base de datos delegada a Supabase Cloud (`hgibmdokzoihofbkcajy`).
2. **Rendimiento del Grafo:**
   - Límite duro de `500` nodos por consulta inicial en el RPC `graph_neighbors`.
   - Posiciones calculadas por `fcose` cacheadas en memoria (`Map<string, Position>`) por combinación de filtros para mantener **60 fps**.
3. **Búsqueda Híbrida (`tsvector` + `pg_trgm`):**
   - La función SQL `search_entities(query_text, filter_type, max_spoiler, result_limit)` combina `websearch_to_tsquery('spanish', unaccent(query_text))` sobre el índice GIN `search_vector` con `similarity(unaccent(name), unaccent(query_text)) > 0.25` (`pg_trgm`), logrando tiempos de respuesta `p95 < 100 ms`.
