# Sistema de Diseño e Identidad Visual — Tempest Archive (`docs/DESIGN.md`)

Este documento define la dirección estética, el proceso obligatorio de **dos pasadas** (Sección 9.1 y 9.2), los tokens de color, la tipografía, el movimiento y los wireframes ASCII de **Tempest Archive**.

---

## 1. Dirección Estética e Índice DFII (`frontend-design`)

- **Nombre de la Dirección Estética:** _Archivo Analítico del Gran Sabio (Great Sage Gel-Codex)_.
- **Concepto Rector:** La interfaz no es una wiki genérica de tarjetas; es la **proyección cognitiva de la Habilidad Única «Gran Sabio» (_Dai-Kenja_) / «Raphael»**. Cada entidad se presenta como un expediente de análisis vivo sobre una superficie de **gelatina translúcida con refracción interna**, combinando precisión técnica (telemetría en monoespaciada, rangos de amenaza, cadenas evolutivas) con la atmósfera orgánica del Gran Bosque de Jura y la caverna sellada de Veldora.
- **Ancla de Diferenciación (Prueba de captura sin logo):**
  > Si alguien toma una captura de pantalla sin el logotipo, reconocerá inmediatamente a _Tempest Archive_ por tres elementos únicos: (1) la **portada que abre directamente dentro del grafo vivo** centrado en Rimuru con buscador superpuesto en cristal translúcido, (2) el **indicador persistente de Protocolo Antispoiler** (`Sin spoilers` · `Anime` · `Novela Ligera`) integrado como nivel de autorización del Gran Sabio, y (3) las **5 plantillas estructurales distintas** según el tipo de entidad (Ficha de Estado, Informe de Habilidad, Taxonomía de Raza, Cartografía de Nación y Cronología de Arco).

### Evaluación DFII (Design Feasibility & Impact Index)

| Dimensión                      | Puntuación (1–5)               | Justificación                                                                                                                                                             |
| ------------------------------ | ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Aesthetic Impact**           | `5`                            | Contraste entre tipografía editorial con eje óptico (`Fraunces`), telemetría analítica (`JetBrains Mono`) y superficies translúcidas con borde refractivo cian-esmeralda. |
| **Context Fit**                | `5`                            | Nace directamente de la narrativa de _Tensei Shitara Slime Datta Ken_ (los análisis del Gran Sabio y la evolución de especies/habilidades).                               |
| **Implementation Feasibility** | `4`                            | Construible al 100 % con CSS moderno, filtros SVG declarativos ligeros y Cytoscape.js (`fcose`).                                                                          |
| **Performance Safety**         | `5`                            | Sin WebGL ni shaders pesados en bucle; optimizado para mantener 60 fps en equipos con 3.84 GB de RAM e Intel Core i3.                                                     |
| **Consistency Risk**           | `1`                            | Riesgo bajo gracias a tokens CSS semánticos y esquemas compartidos en `@tempest-archive/shared`.                                                                          |
| **DFII Total**                 | **`18` → `14/15` (Excelente)** | `(5 + 5 + 4 + 5) - 1 = 18` (supera ampliamente el umbral `>= 12` para ejecución completa).                                                                                |

---

## 2. Principios de Diseño (4 Reglas Innegociables)

1. **El análisis reemplaza al adorno:** Ningún borde, línea divisoria, código numérico o insignia existe "para decorar". Cada línea o etiqueta codifica un metadato real (tipo de entidad, nivel de spoiler, estado de revisión o grado de conexión en el grafo).
2. **La forma sigue a la naturaleza de la entidad:** Un personaje no se lee igual que una habilidad o un arco argumental. Cada `entity_type` posee su propia estructura de cabecera y módulos de datos.
3. **Un único momento memorable — La «Evolución» (Morph):** El 95 % de la interfaz es silenciosa, rápida (< 220 ms) y sobria. El momento memorable ocurre al **seleccionar o expandir un nodo del grafo (doble clic)**: el nodo ejecuta un pulso orgánico tipo gelatina (_SVG goo filter_ controlado) al desplegar sus evoluciones o relaciones.
4. **Tema Claro y Tema Oscuro concebidos como mundos distintos:** No se invierten colores automáticamente. El **Tema Claro** evoca la _Niebla Matinal del Bosque de Jura y el Papiro de la Federación_; el **Tema Oscuro** evoca la _Caverna del Sello de Veldora iluminada por mineral de魔素 (Magi-steel) y gel bioluminiscente_.

---

## 3. Paleta de Colores y Tokens Semánticos

### 3.1 Paleta Base (6 Colores Fundacionales con Nombre del Universo)

| Nombre en el Universo                    | Token CSS          | Tema Claro (_Bosque de Jura_) | Tema Oscuro (_Caverna de Veldora_) | Rol y Contraste WCAG AA                                                                      |
| ---------------------------------------- | ------------------ | ----------------------------- | ---------------------------------- | -------------------------------------------------------------------------------------------- |
| **1. Niebla de Jura / Abismo del Sello** | `--bg-canvas`      | `#F2F5F3`                     | `#07110E`                          | Fondo principal (nunca blanco puro `#FFF` ni negro puro `#000`).                             |
| **2. Gel Translúcido de Rimuru**         | `--bg-surface`     | `rgba(255, 255, 255, 0.86)`   | `rgba(13, 29, 24, 0.82)`           | Superficie de paneles analíticos con `backdrop-filter: blur(12px)`.                          |
| **3. Piedra Mágica Elevada**             | `--bg-elevated`    | `#E6EFEA`                     | `#0F241D`                          | Bloques de código, cabeceras de tablas, estados activos y _skeletons_.                       |
| **4. Tinta de Cancillería / Luz Astral** | `--text-primary`   | `#0D1F18`                     | `#E6F4EF`                          | Texto principal (Contraste > `13.5:1` en ambos temas, supera AAA).                           |
| **5. Núcleo Cian del Gran Sabio**        | `--accent-slime`   | `#0F766E`                     | `#2DD4BF`                          | Acento primario interactivo, foco de teclado y nodo central (Contraste >= `5.1:1`).          |
| **6. Ámbar de Tormenta (Veldora)**       | `--accent-veldora` | `#B45309`                     | `#F59E0B`                          | Acento secundario para advertencias de spoiler, revisiones pendientes y nodos de alto rango. |

### 3.2 Colores Semánticos por Tipo de Entidad (`entity_type`)

Cada uno de los 8 tipos de entidad tiene un color e icono propio tanto en las insignias de la wiki como en los nodos de Cytoscape, garantizando contraste >= `4.5:1`:

| `entity_type`  | Etiqueta ES     | Icono Lucide | Color Nodo/Borde (Claro)     | Color Nodo/Borde (Oscuro)         | Significado en la Serie                                                   |
| -------------- | --------------- | ------------ | ---------------------------- | --------------------------------- | ------------------------------------------------------------------------- |
| `character`    | Personaje       | `UserCheck`  | `#0D9488` (Cian Slime)       | `#2DD4BF` (Cian Bioluminiscente)  | Individuos con nombre (_Named Monsters_, humanos, Señores Demonio).       |
| `skill`        | Habilidad       | `Sparkles`   | `#0369A1` (Azul Rúnico)      | `#38BDF8` (Celeste Voz del Mundo) | Habilidades Intrínsecas, Extra, Únicas y Definitivas (_Ultimate Skills_). |
| `race`         | Raza / Especie  | `Dna`        | `#15803D` (Verde Bosque)     | `#4ADE80` (Esmeralda Evolutivo)   | Linajes biológicos, monstruos mágicos y formas espirituales.              |
| `nation`       | Nación          | `Landmark`   | `#B45309` (Ámbar Imperial)   | `#FBBF24` (Oro de Tempest)        | Reinos, imperios y estados soberanos (Jura-Tempest, Dwargon, Falmuth).    |
| `organization` | Organización    | `Shield`     | `#9F1239` (Carmesí Octagram) | `#FB7185` (Rosa Escarlata)        | Órdenes, gremios y consejos (Octagram, Diez Grandes Santos, Tres Sabios). |
| `arc`          | Arco Argumental | `Milestone`  | `#4338CA` (Índigo Cronos)    | `#818CF8` (Índigo Astral)         | Etapas narrativas cronológicas del anime y la novela ligera.              |
| `location`     | Lugar           | `MapPin`     | `#4D7C0F` (Musgo de Jura)    | `#A3E635` (Lima Cartográfico)     | Regiones geográficas, laberintos y ciudades específicas.                  |
| `item`         | Objeto / Equipo | `Sword`      | `#57534E` (Acero Mágico)     | `#D6D3D1` (Plata Magi-steel)      | Armas de grado mítico/legendario, pociones y artefactos.                  |

### 3.3 Estilos de Aristas por Tipo de Relación (`relation_type`)

| `relation_type`   | Etiqueta ES      | Dirigida (`directed`)        | Estilo de Trazo         | Color (Oscuro / Claro) |
| ----------------- | ---------------- | ---------------------------- | ----------------------- | ---------------------- |
| `evolves_into`    | Evoluciona en    | Sí (flecha triangular llena) | Sólido grueso (`3px`)   | `#2DD4BF` / `#0F766E`  |
| `has_skill`       | Posee habilidad  | Sí (flecha diamante)         | Sólido (`2px`)          | `#38BDF8` / `#0369A1`  |
| `belongs_to_race` | Pertenece a raza | Sí (flecha abierta)          | Punteado (`dotted`)     | `#4ADE80` / `#15803D`  |
| `rules`           | Gobierna         | Sí (flecha corona/triángulo) | Sólido (`2.5px`)        | `#FBBF24` / `#B45309`  |
| `serves`          | Sirve a          | Sí (flecha estándar)         | Discontinuo (`dashed`)  | `#94A3B8` / `#475569`  |
| `member_of`       | Miembro de       | Sí (flecha círculo)          | Discontinuo corto       | `#FB7185` / `#9F1239`  |
| `ally_of`         | Aliado de        | No (bidireccional)           | Sólido (`2px`)          | `#34D399` / `#059669`  |
| `enemy_of`        | Enemigo de       | No (bidireccional)           | Discontinuo marcado     | `#F87171` / `#DC2626`  |
| `family_of`       | Vínculo familiar | No (bidireccional)           | Doble / Sólido fino     | `#C084FC` / `#7E22CE`  |
| `appears_in`      | Aparece en arco  | Sí                           | Punteado fino (`1.5px`) | `#818CF8` / `#4338CA`  |
| `located_in`      | Ubicado en       | Sí                           | Punteado medio          | `#A3E635` / `#4D7C0F`  |

---

## 4. Tipografía (Evaluación de 3 Combinaciones y Selección)

Se prohibieron explícitamente `Inter`, `Roboto`, `Arial` y `Space Grotesk` (Sección 9.2). Se evaluaron 3 combinaciones de Google Fonts con soporte completo de caracteres en español y nombres romanizados:

| Opción                 | Display / Titulares                                   | Cuerpo de Lectura                                                  | Monoespaciada (Datos)                                        | Veredicto                                                                                                                                                                                                                                                                        |
| ---------------------- | ----------------------------------------------------- | ------------------------------------------------------------------ | ------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Opción A**           | _Cinzel_                                              | _Source Sans 3_                                                    | _Fira Code_                                                  | Descartada: _Cinzel_ solo tiene mayúsculas versalitas, lo que contradice la regla de UX writing (9.4) de usar mayúscula solo en la inicial y dificulta leer títulos largos de habilidades.                                                                                       |
| **Opción B**           | _Syne_                                                | _DM Sans_                                                          | _IBM Plex Mono_                                              | Descartada: _Syne_ tiene proporciones ultra-anchas experimentales que desbordan en pantallas móviles de `360px` con nombres japoneses largos.                                                                                                                                    |
| **Opción C (ELEGIDA)** | **`Fraunces`** (Serif variable con eje óptico `opsz`) | **`Plus Jakarta Sans`** (Geométrica humanista de alta legibilidad) | **`JetBrains Mono`** (Técnica, ligaduras desactivadas en UI) | **Seleccionada:** `Fraunces` aporta el carácter de códice/enciclopedia fantástica en titulares sin perder legibilidad en minúsculas; `Plus Jakarta Sans` es nítida en artículos extensos; `JetBrains Mono` encarna la voz analítica del Gran Sabio en métricas, diffs y estados. |

### Escala Tipográfica Modular y Reglas de Composición

- **Ancho de línea en artículos:** Máximo `65ch` (siempre `< 80` caracteres) para lectura cómoda.
- **Interlineado:** `1.65` en cuerpo (`Plus Jakarta Sans`), `1.12` en titulares principales (`Fraunces`), `1.45` en bloques técnicos (`JetBrains Mono`).
- **Jerarquía:**
  - `Display Hero`: `clamp(2.25rem, 4vw + 1rem, 3.75rem)`, `font-display`, `tracking-tight`.
  - `H1 Artículo`: `clamp(1.875rem, 3vw + 0.5rem, 2.75rem)`, `font-display`, peso `600`.
  - `H2 Sección`: `1.5rem` (`24px`), `font-display`, borde inferior `1px solid var(--border-subtle)`.
  - `H3 Subsección`: `1.125rem` (`18px`), `font-sans`, peso `600`.
  - `Body`: `1rem` (`16px` mínimo en móvil), `font-sans`.
  - `Telemetry / Metadatos`: `0.75rem` (`12px`), `font-mono-sage`, `tabular-nums`.

---

## 5. Movimiento y Efecto Gelatina (_Slime Morph_)

Siguiendo la guía de `emil-design-eng` y la Sección 9.3:

1. **Secuencia de entrada única:** Al cargar una vista, los bloques principales aparecen con una única transición escalonada corta (`180ms`, `cubic-bezier(0.23, 1, 0.32, 1)`, retraso de `40ms` entre los 3 paneles principales) partiendo de `opacity: 0; transform: scale(0.97) translateY(6px)` (nunca desde `scale(0)`).
2. **Momento memorable — «Evolución de Nodo»:** Cuando el usuario hace clic o doble clic en un nodo del grafo para expandir sus vecinos o abrir su ficha:
   - El anillo exterior del nodo ejecuta una transición elástica suave (`260ms`, `cubic-bezier(0.23, 1, 0.32, 1)`) y el contenedor de insignia aplica un filtro SVG declarativo (`#tempest-goo`) que fusiona visualmente el nodo padre con sus nuevos nodos hijos durante la expansión.
3. **Micro-interacciones de respuesta:**
   - Todos los botones interactivos aplican `:active { transform: scale(0.97) }` en `140ms ease-out`.
   - Ninguna acción iniciada por teclado (como abrir el buscador rápido `Ctrl+K` / `/` o navegar la tabla accesible) tiene retraso de animación.
4. **Respeto absoluto a `prefers-reduced-motion: reduce`:** Elimina desplazamientos y animaciones de layout del grafo (`animate: false` en Cytoscape), conservando solo cambios de opacidad instantáneos.

---

## 6. Proceso de Dos Pasadas: Revisión Crítica Anti-Defaults (Sección 9.1 y 9.2)

Antes de construir las pantallas de las Fases 4, 5 y 6, se auditó el plan inicial (Pasada 1) contra la lista de defaults prohibidos (Sección 9.2) y se aplicaron las siguientes correcciones obligatorias (Pasada 2):

| Elemento Evaluado                           | Pasada 1 (Borrador Inicial)                                                                   | Problema / Default Detectado (Sección 9.2)                                                           | Pasada 2 (Diseño Final Corregido)                                                                                                                                                                                                          | Motivo del Cambio                                                                                                        |
| ------------------------------------------- | --------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------ |
| **Portada (`Hero`)**                        | Cabecera centrada con título grande, barra de búsqueda debajo y 3 tarjetas de estadísticas.   | Viola directamente _"Hero genérico (titular + buscador + tarjetas)"_ y el sesgo de centrado de LLMs. | **Hero = El Grafo Vivo interactivo desde el segundo 0.** La pantalla abre con el subgrafo real de `rimuru-tempest` ocupando el lienzo principal (7 columnas) y el panel del Gran Sabio con buscador integrado a la izquierda (5 columnas). | Hace que el producto sea inmediatamente reconocible y funcional desde el primer segundo sin parecer una landing de SaaS. |
| **Listado en Explorar (`/entities`)**       | Cuadrícula simétrica de 3 columnas (`grid-cols-3`) con tarjetas del mismo alto y sombra gris. | Viola _"Todo en tarjetas idénticas con el mismo radio y la misma sombra gris"_.                      | **Matriz Analítica Asimétrica:** Entidades destacadas con ficha expandida horizontal + índice denso con líneas divisorias `1px` (`border-subtle`), código de clasificación en monoespaciada e insignia de spoiler.                         | Mejora la densidad de escaneo en una enciclopedia de +40 entidades y rompe la monotonía visual.                          |
| **Vista de Artículo (`/entities/[slug]`)**  | Una sola plantilla Markdown con `infobox` lateral idéntica para todas las entradas.           | Viola _"Plantillas de artículo por tipo, no un molde único"_.                                        | **5 Cabeceras Estructurales Específicas por `entity_type`:** Ficha de Estado (Personajes), Diagrama de Síntesis (Habilidades), Árbol Evolutivo (Razas), Ficha Geopolítica (Naciones/Lugares) y Línea de Episodios (Arcos).                 | Refleja la semántica real de cada entidad en el universo de _Slime_.                                                     |
| **Etiquetas y Botones**                     | Etiquetas en MAYÚSCULAS sobre cada título y flechas `"→"` en todos los botones.               | Viola _"etiquetas en MAYÚSCULAS sobre cada título; flechas → en todos los botones"_.                 | Etiquetas en oración normal (`Nivel de spoiler: Anime`), verbos concretos en botones (`Guardar revisión`, `Explorar grafo`, `Restaurar versión`) sin flechas de texto decorativas.                                                         | Cumple las reglas de UX Writing (Sección 9.4) y limpia el ruido visual.                                                  |
| **Recorte de un accesorio (Sección 9.1.3)** | Fondo con partículas mágicas flotantes animadas en `<canvas>` detrás de toda la web.          | Accesorio decorativo sin función que consume CPU/GPU en un portátil de 3.84 GB de RAM.               | **Eliminado por completo.** En su lugar se usa una retícula topográfica estática en CSS puro de muy baja opacidad (`3 %`) que sirve como referencia espacial en el grafo y cuesta 0 % de CPU.                                              | Garantiza fluidez de 60 fps para Cytoscape.js y elimina distracciones durante la lectura.                                |

---

## 7. Wireframes ASCII y Estructura de Pantallas

### 7.1 Pantalla de Inicio (`/`) — «El Grafo Vivo del Gran Sabio» (1440 px Desktop / 360 px Mobile)

```text
+--------------------------------------------------------------------------------------------------+
| [Logo SVG] Tempest Archive     Explorar   Grafo   Cronología   | [Spoiler: Anime v] [Sol] [Login]|
+--------------------------------------------+-----------------------------------------------------+
| HABILIDAD ÚNICA: GRAN SABIO · ACTIVA       |  LIENZO INTERACTIVO EN VIVO (Cytoscape fcose)       |
|                                            |  +-----------------------------------------------+  |
| Archivo analítico de                       |  | [Filtro: Todos] [Profundidad: 2] [Tabla A11y] |  |
| Jura-Tempest                               |  |                                               |  |
|                                            |  |         (Veldora) ----ally_of---+             |  |
| +----------------------------------------+ |  |             \                    \            |  |
| | [Lupa] Buscar entidad o habilidad... / | |  |              \                    v           |  |
| +----------------------------------------+ |  |   (Demon Slime) <--belongs-- (( RIMURU ))     |  |
| | Sugerencias rápidas:                   | |  |                               /    |    \     |  |
| | · Rimuru Tempest      [Personaje]      | |  |                   has_skill  /   rules   \    |  |
| | · Raphael             [Habilidad]      | |  |                             v      v      v   |  |
| | · Federación Tempest  [Nación]         | |  |                     (Raphael) (Tempest) (Benimaru)
| +----------------------------------------+ |  |                                               |  |
|                                            |  +-----------------------------------------------+  |
| EXPEDIENTE SELECCIONADO EN EL GRAFO:       |  | Seleccionado: Rimuru Tempest · 14 conexiones  |  |
| +----------------------------------------+ |  | [Abrir artículo completo]  [Expandir vecinos] |  |
| | Rimuru Tempest (リムル＝テンペスト)      | |  +-----------------------------------------------+  |
| | Raza: Demon Slime · Spoiler: Anime     | |                                                     |
| | Gobernante fundador de la Federación   | |  ACCESO RÁPIDO POR CATEGORÍA TAXONÓMICA:            |
| | de Jura-Tempest y miembro de Octagram. | |  [Personajes (16)] [Habilidades (10)] [Razas (6)]   |
| | [Leer informe]   [Centrar en grafo]    | |  [Naciones (4)]    [Organizaciones (4)] [Arcos (5)] |
| +----------------------------------------+ |                                                     |
+--------------------------------------------+-----------------------------------------------------+
| Aviso legal: Proyecto de fans sin afiliación oficial · Privacidad · Términos · Estado BD: ONLINE |
+--------------------------------------------------------------------------------------------------+
```

### 7.2 Pantalla de Artículo (`/entities/[slug]`) — Plantillas diferenciadas por `entity_type`

```text
+--------------------------------------------------------------------------------------------------+
| Inicio / Personajes / Rimuru Tempest                        [Spoiler: Anime] [Historial] [Editar]|
+------------------------------------------------------------------+-------------------------------+
| CABECERA ESPECÍFICA SEGÚN TIPO (ej. Ficha de Estado - Character) | FICHA TÉCNICA DEL GRAN SABIO  |
| +--------------------------------------------------------------+ | +---------------------------+ |
| | [SVG Avatar]   Rimuru Tempest                                 | | | ID: char-rimuru-tempest   | |
| |  (Iniciales   Nombre JP: リムル＝テンペスト                    | | | Tipo: Personaje           | |
| |   + Silueta)  Resumen: Fundador de la Federación de          | | | Nivel Spoiler: Anime      | |
| |               Jura-Tempest y portador de Gran Sabio/Raphael. | | | Revisión: #4 (Aprobada)   | |
| +--------------------------------------------------------------+ | | Fuente: Jikan MAL #37430  | |
| | RAZA ACTUAL      | AFILIACIÓN PRINCIPAL | HABILIDAD NÚCLEO   | | +---------------------------+ |
| | Demon Slime      | Jura-Tempest /       | Gran Sabio ->      | |                               |
| | (Slime Demonio)  | Octagram             | Raphael            | | CONEXIONES DIRECTAS (GRAFO)   |
| +------------------+----------------------+--------------------+ | +---------------------------+ |
|                                                                  | | Evoluciona desde:         | |
| CONTENIDO DEL ARTÍCULO (Markdown sanitizado, máx. 65ch/línea)    | |  · Slime                  | |
| ---------------------------------------------------------------- | | Posee habilidades:        | |
| ## 1. Análisis de origen y reencarnación                         | |  · Gran Sabio             | |
| Tras renacer en la caverna sellada como un slime ciego pero      | |  · Depredador (Gluttony)  | |
| dotado de percepción mágica, establece su primer pacto con       | | Aliado de:                | |
| Veldora Tempest...                                               | |  · Veldora Tempest        | |
|                                                                  | |  · Milim Nava             | |
| ## 2. Evolución y despertar                                      | |                           | |
| [Bloque protegido si spoiler_level > preferencia del usuario]    | | [Ver en el grafo 2D]      | |
+------------------------------------------------------------------+-------------------------------+
```

### 7.3 Pantalla de Grafo a Pantalla Completa (`/graph`) con Alternativa Accesible en Tabla

```text
+--------------------------------------------------------------------------------------------------+
| GRAFO DE RELACIONES DE JURA-TEMPEST           [Vista: (o) Grafo Interactivo  ( ) Tabla Accesible]|
+--------------------------------------------------------------------------------------------------+
| Centro: [Rimuru Tempest v] | Profundidad: [1] [2*] [3] | Spoiler máx: [Anime v]                  |
| Tipos:  [x] Personajes [x] Habilidades [x] Razas [x] Naciones [x] Org [x] Arcos                  |
| Camino entre nodos: Desde [Rimuru Tempest v] -> Hasta [Hinata Sakaguchi v] [Calcular ruta]       |
+-------------------------------------------------------------------+------------------------------+
|                                                                   | PANEL DE INSPECCIÓN LATERAL  |
|                                                                   |                              |
|                     ( Visualización Cytoscape.js )                | Nodo activo:                 |
|                     Layout: fcose (cacheado)                      | **Veldora Tempest**          |
|                     Límite: <= 500 nodos @ 60fps                  | dragón verdadero (True Dragon|
|                                                                   |                              |
|       * Clic simple: abre resumen en este panel lateral           | Relaciones visibles (6):     |
|       * Doble clic: expande vecinos +1 con efecto evolución       | - Aliado de: Rimuru Tempest  |
|                                                                   | - Ubicado en: Bosque de Jura |
|                                                                   |                              |
| [Zoom +] [Zoom -] [Ajustar vista] [Exportar PNG] [Exportar JSON]  | [Abrir artículo completo]    |
+-------------------------------------------------------------------+------------------------------+
```

### 7.4 Pantalla de Editor, Historial/Diff y Cola de Moderación

```text
+--------------------------------------------------------------------------------------------------+
| Editando: Rimuru Tempest · Nueva revisión basada en #4                    [Cancelar] [Guardar]   |
+-------------------------------------------------+------------------------------------------------+
| EDITOR MARKDOWN (con barra de formato accesible)| VISTA PREVIA EN TIEMPO REAL (rehype-sanitize)  |
| +---------------------------------------------+ | +--------------------------------------------+ |
| | ## 1. Análisis de origen                    | | | 1. Análisis de origen                      | |
| | Tras renacer en la caverna sellada...       | | | Tras renacer en la caverna sellada...      | |
| +---------------------------------------------+ | +--------------------------------------------+ |
| Resumen de edición (obligatorio): [Corrección de habilidades obtenidas en el arco de Falmuth   ] |
| Nivel de spoiler de esta edición: ( ) Sin spoiler   (o) Anime   ( ) Novela ligera                |
| Nota de moderación: Si tu rol es 'editor', la revisión pasará a estado 'pending' hasta revisión. |
+-------------------------------------------------+------------------------------------------------+
```
