-- Salas
INSERT into reservas.salas (nombre, color, activa, fecha_actualizacion) VALUES
  ('Sala A', 'blue',   TRUE,  NULL),
  ('Sala B', 'green',  TRUE,  NOW()),
  ('Sala C', 'gray',   FALSE, NOW()),
  ('Sala D', 'yellow', TRUE,  NULL),
  ('Sala E', 'green',  TRUE,  NOW());
  
 -- Usuario
INSERT INTO reservas.usuarios (nombres, apellidos, correo, nombre_usuario, activo, fecha_actualizacion)
VALUES ('Christian', 'Jara Huayta', 'christian.jara@example.com', 'christian.jara', TRUE, NOW());

-- Reservas
INSERT into reservas.reservas (sala_id, usuario_id, inicio, fin, titulo, descripcion, fecha_actualizacion)
SELECT s.id, u.id,
       TIMESTAMPTZ '2025-10-03 10:00:00-05',
       TIMESTAMPTZ '2025-10-03 11:00:00-05',
       'Daily Standup', 'Reunión diaria de coordinación.', NOW()
FROM salas s CROSS JOIN usuarios u
WHERE s.nombre = 'Sala A' AND u.correo = 'christian.jara@example.com';

INSERT INTO reservas (sala_id, usuario_id, inicio, fin, titulo, descripcion, fecha_actualizacion)
SELECT s.id, u.id,
       TIMESTAMPTZ '2025-10-03 15:00:00-05',
       TIMESTAMPTZ '2025-10-03 16:00:00-05',
       'Sprint Planning', 'Planificación del sprint.', NOW()
FROM salas s CROSS JOIN usuarios u
WHERE s.nombre = 'Sala B' AND u.correo = 'christian.jara@example.com';

INSERT INTO reservas (sala_id, usuario_id, inicio, fin, titulo, descripcion, fecha_actualizacion)
SELECT s.id, u.id,
       TIMESTAMPTZ '2025-10-04 09:30:00-05',
       TIMESTAMPTZ '2025-10-04 10:30:00-05',
       'Revisión técnica', 'Revisión de PRs y calidad.', NOW()
FROM salas s CROSS JOIN usuarios u
WHERE s.nombre = 'Sala C' AND u.correo = 'christian.jara@example.com';

INSERT INTO reservas (sala_id, usuario_id, inicio, fin, titulo, descripcion, fecha_actualizacion)
SELECT s.id, u.id,
       TIMESTAMPTZ '2025-10-06 14:00:00-05',
       TIMESTAMPTZ '2025-10-06 15:00:00-05',
       'One-on-One', 'Reunión de seguimiento.', NOW()
FROM salas s CROSS JOIN usuarios u
WHERE s.nombre = 'Sala D' AND u.correo = 'christian.jara@example.com';

INSERT INTO reservas (sala_id, usuario_id, inicio, fin, titulo, descripcion, fecha_actualizacion)
SELECT s.id, u.id,
       TIMESTAMPTZ '2025-10-07 11:00:00-05',
       TIMESTAMPTZ '2025-10-07 12:00:00-05',
       'Demo interna', 'Presentación de avances.', NOW()
FROM salas s CROSS JOIN usuarios u
WHERE s.nombre = 'Sala E' AND u.correo = 'christian.jara@example.com';
