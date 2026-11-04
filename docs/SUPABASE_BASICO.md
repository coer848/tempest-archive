# Guía Básica de Supabase — Tempest Archive

Esta guía de una página explica qué es cada pieza de **Supabase** que usamos en **Tempest Archive** y dónde encontrarla dentro del panel web (`https://supabase.com/dashboard`).

---

## 1. Glosario Esencial (7 conceptos clave)

| Concepto                                          | ¿Qué es y para qué sirve?                                                                                                                                                                                                                            |
| ------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Proyecto (`Project`)**                          | Es tu espacio en la nube que incluye una base de datos PostgreSQL, sistema de usuarios (Auth) y almacenamiento de archivos (Storage). Usamos `tempest-dev` para desarrollo y `tempest-prod` para producción.                                         |
| **Tabla (`Table`)**                               | Es como una hoja de cálculo con columnas tipadas donde se guardan los datos (por ejemplo, `entities` para personajes/habilidades, `revisions` para el historial de ediciones y `relations` para las conexiones del grafo).                           |
| **RLS (`Row Level Security`)**                    | Significa _Seguridad a Nivel de Fila_. Es el candado de la base de datos: obliga a que PostgreSQL revise quién hace la consulta antes de devolver o modificar cualquier fila. Sin políticas RLS activas, nadie puede leer ni escribir por accidente. |
| **Política (`Policy`)**                           | Es una regla concreta dentro de RLS. Por ejemplo: _"Cualquier visitante puede leer entidades aprobadas, pero solo un `moderator` o `admin` puede aprobar una revisión"_.                                                                             |
| **Clave pública (`anon` / `publishable key`)**    | Es la llave que usa el navegador (`NEXT_PUBLIC_SUPABASE_ANON_KEY`) para conectarse a Supabase. Es seguro que sea pública **únicamente porque RLS está activado** en todas las tablas y filtra qué puede hacer cada usuario.                          |
| **Clave secreta (`service_role` / `secret key`)** | Es la llave maestra que **se salta todas las reglas RLS**. **NUNCA** debe ponerse en el navegador, ni en variables `NEXT_PUBLIC_*`, ni subirse a Git. Solo se usa en el servidor para tareas administrativas o seeds locales.                        |
| **Migración (`Migration`)**                       | Es un archivo `.sql` numerado por fecha dentro de `supabase/migrations/` que guarda paso a paso cómo se crearon o cambiaron las tablas, índices y políticas. Permite reconstruir la base de datos idéntica en cualquier momento.                     |

---

## 2. ¿Dónde mirar cada cosa en el panel de Supabase?

En el menú lateral izquierdo de tu proyecto en Supabase encontrarás estas secciones:

1. **Table Editor (icono de tabla):**
   - Muestra tus tablas (`profiles`, `entities`, `revisions`, `relations`, etc.) como una hoja de cálculo.
   - Sirve para ver rápidamente las filas guardadas y comprobar si una tabla tiene el escudo de **RLS enabled**.
2. **SQL Editor (icono de terminal `>_`):**
   - Permite ejecutar consultas SQL directamente en la base de datos.
   - Útil para probar funciones de búsqueda o verificar datos manualmente.
3. **Authentication (icono de candado / usuarios):**
   - **Users:** lista las cuentas registradas (correo, Google, GitHub).
   - **Providers:** donde activas el inicio de sesión con Email, Google y GitHub.
   - **URL Configuration:** donde defines la _Site URL_ y las _Redirect URLs_ (por ejemplo, `http://localhost:3000/auth/callback` y tu dominio de Vercel).
   - **SMTP Settings (en Project Settings → Authentication):** donde se conecta **Resend** para enviar correos reales de verificación y recuperación de contraseña.
4. **Storage (icono de carpeta / archivos):**
   - Contiene los _buckets_ (carpetas en la nube). Aquí vive el bucket `media` donde se guardan las imágenes subidas con límite de 2 MB.
5. **Advisors (icono de escudo / rayo):**
   - **Security Advisor:** revisa automáticamente si olvidaste activar RLS en alguna tabla o si una función tiene permisos inseguros.
   - **Performance Advisor:** avisa si falta algún índice o si una consulta es lenta.
6. **Logs (icono de lista / actividad):**
   - Muestra en tiempo real las consultas a la base de datos (`Postgres Logs`), inicios de sesión (`Auth Logs`) y subidas de archivos (`Storage Logs`) para diagnosticar errores.
7. **Project Settings → API / Data API:**
   - Aquí copias los dos datos públicos necesarios para `.env.local`: el **Project URL** (`https://<ref>.supabase.co`) y la **clave pública** (`anon` / `publishable`).
