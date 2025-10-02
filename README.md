**Resumen**
- API NestJS para reservas de salas (PostgreSQL + TypeORM).
- Endpoints: `GET /salas`, `GET /reservas`, `POST /reservas` (valida que no haya solape en la misma sala).

**Requisitos**
- `Node 20`, `npm`
- `PostgreSQL 16`

**Variables de Entorno (.env)**
- Para ejecutar la API:
  - `PORT=3000`
  - `DB_HOST=localhost`
  - `DB_PORT=5432`
  - `DB_USER=reservas`
  - `DB_PASSWORD=reservas`
  - `DB_DATABASE=reservas`
  - `DB_SCHEMA=reservas`
- Pruebas unitarias: no requieren conexión a BD ni `.env` (repositorios mockeados). Opcional: `.env.test` con las mismas claves.

**Ejecución Local**
- Instalar dependencias y arrancar:
  - `npm ci`
  - `npm run build`
  - `npm run start` (o `npm run start:dev`)

**Base de Datos y Datos de Prueba (carpeta `db/`)**
- No se usan migraciones ni seeders de TypeORM para esta prueba técnica.
- Ejecuta en tu Postgres en este orden:
  1) Crear el esquema y fijar el `search_path` (las entidades usan el esquema `reservas`):
     - `psql -h <host> -U <user> -d <db> -c "CREATE SCHEMA IF NOT EXISTS reservas; SET search_path TO reservas, public;"`
  2) Crear tablas: `psql -h <host> -U <user> -d <db> -f "db/creacion tabla.sql"`
  3) Cargar datos de prueba: `psql -h <host> -U <user> -d <db> -f "db/carga datos de prueba.sql"`

**Pruebas**
- Unitarias backend (creación correcta y conflicto por solape):
  - `src/reservas/reservas.service.spec.ts`
  - `src/salas/salas.service.spec.ts`
- Comandos:
  - `npm test`
  - `npm run test:watch`
  - `npm run test:cov`

**Endpoints**
- `GET /salas` → lista de salas.
- `GET /reservas` → lista de reservas con sala y usuario.
- `POST /reservas` → crea una reserva.
  - Body ejemplo:
    - `{ "inicio": "2025-10-02T10:00:00Z", "fin": "2025-10-02T11:00:00Z", "titulo": "Reunión", "descripcion": "Detalle", "salaId": "1", "usuarioId": "1" }`
  - Regla: misma sala y rango de tiempo solapado → 400 “La sala ya está reservada en el horario solicitado”.

**CI**
- Jenkinsfile (`Jenkinsfile`) incluido para CI simple: instala, compila y ejecuta pruebas con Node 20.

**Notas**
- En tiempo de ejecución, Nest usa `src/config/database.config.ts` (TypeOrmModule). Asegúrate de que `DB_SCHEMA=reservas` y que las tablas estén creadas en ese esquema antes de iniciar la app.

