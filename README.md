**Resumen**
- API NestJS para reservas de salas (PostgreSQL + TypeORM).
- Endpoints principales: `GET /salas`, `GET /reservas`, `POST /reservas` (valida que no haya solape en la misma sala).

**Requisitos**
- `Node 20`, `npm`
- `PostgreSQL 16` (o usar Docker Compose)

**Ejecutar con Docker (recomendado para empezar)**
- `docker compose up --build`
- API: `http://localhost:3000`
- DB: `localhost:5432` (`reservas`/`reservas`/`reservas`)
- Crea tablas y datos de prueba automáticamente vía `docker/postgres/init.sql`.

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

**Base de Datos, Migraciones y Seed**
- Opción A (Docker): `docker/postgres/init.sql` crea el esquema/tablas y agrega datos de ejemplo.
- Opción B (Migraciones TypeORM):
  - Archivo de configuración CLI: `data-source.ts:1`
  - Migraciones incluidas:
    - `src/migrations/1700000000000-InitSchema.ts:1` (creación de tablas)
    - `src/migrations/1700000001000-SeedInitialData.ts:1` (datos de prueba)
  - Scripts:
    - `npm run migration:run` (aplica las migraciones en orden: primero esquema, luego seed)
    - `npm run migration:revert` (revierte la última)

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
- En tiempo de ejecución, Nest usa `src/config/database.config.ts:1` (TypeOrmModule). La CLI de migraciones usa `data-source.ts:1`. Mantén las variables de entorno coherentes.
