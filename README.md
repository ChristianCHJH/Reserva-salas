**Resumen**
- API NestJS para reservas de salas (PostgreSQL + TypeORM).
- Endpoints principales: `GET /salas`, `GET /reservas`, `POST /reservas` (valida que no haya solape en la misma sala).

**Requisitos**
- `Node 20`, `npm`
- `PostgreSQL 16` (o usar Docker Compose)

**Variables de entorno (.env)**
- Requeridas para ejecutar la API (no necesarias para pruebas unitarias):
  - `PORT=3000`
  - `DB_HOST=localhost`
  - `DB_PORT=5432`
  - `DB_USER=reservas`
  - `DB_PASSWORD=reservas`
  - `DB_DATABASE=reservas`
  - `DB_SCHEMA=reservas`
- Pruebas unitarias: no requieren conexión a BD ni `.env` (los repositorios están mockeados). Si quieres aislar config en pruebas, puedes crear opcionalmente un `.env.test` con las mismas claves.

**Ejecutar con Docker (recomendado para empezar)**
- `docker compose up --build`
- API: `http://localhost:3000`
- DB: `localhost:5432` (`reservas`/`reservas`/`reservas`)
- Creación de tablas y datos de prueba: usa los scripts SQL en `db/` (no se usan migraciones ni seeders de TypeORM).
  - Copiar y ejecutar en el contenedor de Postgres:
    - `docker cp "db/creacion tabla.sql" reservas_db:/tmp/creacion.sql`
    - `docker cp "db/carga datos de prueba.sql" reservas_db:/tmp/seed.sql`
    - `docker exec -it reservas_db psql -U reservas -d reservas -c "CREATE SCHEMA IF NOT EXISTS reservas; SET search_path TO reservas, public;"`
    - `docker exec -it reservas_db psql -U reservas -d reservas -f /tmp/creacion.sql`
    - `docker exec -it reservas_db psql -U reservas -d reservas -f /tmp/seed.sql`

**Ejecutar local (sin Docker)**
- Crear base de datos y variables de entorno `.env` similares a:
  - DB_HOST=localhost
  - DB_PORT=5432
  - DB_USER=reservas
  - DB_PASSWORD=reservas
  - DB_DATABASE=reservas
  - DB_SCHEMA=reservas
- Instalar y arrancar:
  - `npm ci`
  - `npm run build`
  - `npm run start` (o `npm run start:dev`)

**Base de Datos y datos de prueba (SQL en carpeta db/)**
- No se usan migraciones ni seeders de TypeORM para esta prueba.
- Ejecuta en tu Postgres (Docker o local) en este orden:
  1) Crear el esquema y fijar el `search_path` para que las tablas queden bajo `reservas` (las entidades lo esperan):
     - `psql -h <host> -U <user> -d <db> -c "CREATE SCHEMA IF NOT EXISTS reservas; SET search_path TO reservas, public;"`
  2) Crear tablas: `psql -h <host> -U <user> -d <db> -f "db/creacion tabla.sql"`
  3) Cargar datos de prueba: `psql -h <host> -U <user> -d <db> -f "db/carga datos de prueba.sql"`

**Pruebas**
- Unitarias backend (creación correcta y conflicto por solape):
  - `src/reservas/reservas.service.spec.ts:1`
  - `src/salas/salas.service.spec.ts:1`
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
  - Reglas: misma sala y rango de tiempo solapado → 400 “La sala ya está reservada en el horario solicitado”.

**CI/CD**
- CI sencillo con Jenkins: `Jenkinsfile:1` (agent Docker Node 20; instala, compila y prueba).
- Opcional: Dockerfile y `docker-compose.yml` para empaquetar y levantar entorno.

**Notas**
- En tiempo de ejecución, Nest usa `src/config/database.config.ts:1` (TypeOrmModule). Asegúrate de que `DB_SCHEMA=reservas` y que las tablas estén creadas en ese esquema (siguiendo los pasos anteriores).
