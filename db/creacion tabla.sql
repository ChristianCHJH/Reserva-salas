CREATE TABLE usuarios (
  id           		   BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  nombres              VARCHAR(100) NOT NULL,
  apellidos            VARCHAR(120) NOT NULL,
  correo               VARCHAR(255) NOT NULL UNIQUE,
  nombre_usuario       VARCHAR(50) UNIQUE,
  activo               BOOLEAN NOT NULL DEFAULT TRUE,
  fecha_creacion       TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  fecha_actualizacion  TIMESTAMPTZ
);


CREATE TABLE salas (
  id              BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  nombre               VARCHAR(100) NOT NULL UNIQUE,
  color   			   VARCHAR(32) NOT NULL,
  activa               BOOLEAN NOT NULL DEFAULT TRUE,
  fecha_creacion       TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  fecha_actualizacion  TIMESTAMPTZ
);

CREATE TABLE reservas (
  id           BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  sala_id              BIGINT NOT NULL
                       REFERENCES salas(id)
                       ON UPDATE CASCADE
                       ON DELETE RESTRICT,
  usuario_id           BIGINT NOT NULL
                       REFERENCES usuarios(id)
                       ON UPDATE CASCADE
                       ON DELETE RESTRICT,
  inicio               TIMESTAMPTZ NOT NULL,
  fin                  TIMESTAMPTZ NOT NULL,
  titulo               VARCHAR(140),
  descripcion          TEXT,
  fecha_creacion       TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  fecha_actualizacion  TIMESTAMPTZ
);