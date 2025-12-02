# Modelo Entidad-Relación (ER) - PetControl

## Descripción General
PetControl es una aplicación fullstack para gestionar información de mascotas con tres roles de usuario:
- **ADMIN**: Acceso total al sistema
- **VETERINARIO**: Visualiza todas las mascotas y usuarios
- **CLIENTE**: Gestiona solo sus mascotas propias

---

## Entidades

### 1. USUARIOS
Almacena información de los usuarios del sistema.

| Campo | Tipo | Restricciones | Descripción |
|-------|------|---------------|-------------|
| `id` | BIGINT | PK, AUTO_INCREMENT | Identificador único |
| `email` | VARCHAR(255) | UNIQUE, NOT NULL | Email del usuario (login único) |
| `password` | VARCHAR(255) | NOT NULL | Contraseña hasheada |
| `nombre` | VARCHAR(255) | NULL | Nombre completo |
| `rol` | ENUM('CLIENTE','VETERINARIO','ADMIN') | NOT NULL, DEFAULT='CLIENTE' | Rol del usuario |
| `fecha_creacion` | DATETIME(6) | NOT NULL | Timestamp de creación |

**Índices:**
- `UK_kfsp0s1tflm1cwlj8idhqsad0` (UNIQUE en email)

---

### 2. MASCOTAS
Almacena información de las mascotas registradas.

| Campo | Tipo | Restricciones | Descripción |
|-------|------|---------------|-------------|
| `id` | BIGINT | PK, AUTO_INCREMENT | Identificador único |
| `nombre` | VARCHAR(255) | NOT NULL | Nombre de la mascota |
| `especie` | VARCHAR(255) | NOT NULL | Tipo de animal (perro, gato, etc.) |
| `raza` | VARCHAR(255) | NULL | Raza específica |
| `edad` | INTEGER | NULL | Edad en años |
| `descripcion` | VARCHAR(1000) | NULL | Descripción adicional |
| `imagen` | VARCHAR(255) | NULL | URL o ruta de imagen |
| `usuario_id` | BIGINT | NOT NULL, FK | Referencia al dueño (Usuario) |
| `fecha_creacion` | DATETIME(6) | NOT NULL | Timestamp de creación |
| `fecha_actualizacion` | DATETIME(6) | NULL | Timestamp de última actualización |

**Índices:**
- `FK_sipbn9kucyamwbaqlpc2lf4vr` (FK a `usuarios.id`)

---

## Relaciones

```
USUARIOS (1) ──────→ (N) MASCOTAS
   id                 usuario_id
```

### Relación: USUARIOS → MASCOTAS
- **Tipo**: Uno a Muchos (1:N)
- **Descripción**: Un usuario (dueño) puede tener múltiples mascotas
- **Integridad**: 
  - CASCADE DELETE: Si se elimina un usuario, se eliminan todas sus mascotas
  - LAZY LOADING: Las mascotas se cargan bajo demanda (relación lazy)
- **Clave Foránea**: `mascotas.usuario_id` → `usuarios.id`

---

## Diagrama ER Visual

```
┌─────────────────────────────────────────┐
│             USUARIOS                    │
├─────────────────────────────────────────┤
│ ⭐ id (PK)                              │
│ 📧 email (UNIQUE)                       │
│ 🔐 password                             │
│ 👤 nombre                               │
│ 🎭 rol (ENUM)                           │
│ 📅 fecha_creacion                       │
└──────────────┬──────────────────────────┘
               │ (1)
               │ 1 ─ N
               │
               ▼
┌─────────────────────────────────────────┐
│             MASCOTAS                    │
├─────────────────────────────────────────┤
│ ⭐ id (PK)                              │
│ 🐾 nombre                               │
│ 🦮 especie                              │
│ 📋 raza                                 │
│ 📊 edad                                 │
│ 📝 descripcion                          │
│ 🖼️  imagen                              │
│ 👤 usuario_id (FK) ──────→ usuarios.id  │
│ 📅 fecha_creacion                       │
│ 📅 fecha_actualizacion                  │
└─────────────────────────────────────────┘
```

---

## Scripts SQL de Creación

### Tabla USUARIOS
```sql
CREATE TABLE usuarios (
    id BIGINT NOT NULL AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL UNIQUE,
    fecha_creacion DATETIME(6) NOT NULL,
    nombre VARCHAR(255),
    password VARCHAR(255) NOT NULL,
    rol ENUM('CLIENTE','VETERINARIO','ADMIN') NOT NULL DEFAULT 'CLIENTE',
    PRIMARY KEY (id),
    CONSTRAINT UK_kfsp0s1tflm1cwlj8idhqsad0 UNIQUE (email)
) ENGINE=InnoDB;
```

### Tabla MASCOTAS
```sql
CREATE TABLE mascotas (
    id BIGINT NOT NULL AUTO_INCREMENT,
    descripcion VARCHAR(1000),
    edad INTEGER,
    especie VARCHAR(255) NOT NULL,
    fecha_actualizacion DATETIME(6),
    fecha_creacion DATETIME(6) NOT NULL,
    imagen VARCHAR(255),
    nombre VARCHAR(255) NOT NULL,
    raza VARCHAR(255),
    usuario_id BIGINT NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT FKsipbn9kucyamwbaqlpc2lf4vr 
        FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
) ENGINE=InnoDB;
```

---

## Características de Integridad

### Restricciones de Integridad Referencial

1. **ON DELETE CASCADE**: Si se elimina un usuario, se eliminan automáticamente todas sus mascotas
2. **ON UPDATE RESTRICT**: No se puede cambiar el `id` de un usuario mientras tenga mascotas asociadas
3. **NOT NULL constraints**: Email, password, nombre (en mascotas), especie y usuario_id son obligatorios

### Validaciones a Nivel de Aplicación

1. **Email único y válido** (Java Validation + DB UNIQUE)
2. **Contraseña hasheada** con bcrypt (Spring Security)
3. **Rol por defecto** = CLIENTE (para nuevos usuarios)
4. **Edad positiva** (Positive constraint en modelo Mascota)
5. **Rol restringido** a enum: CLIENTE, VETERINARIO, ADMIN

---

## Consultas Comunes

### Obtener todas las mascotas de un usuario
```sql
SELECT m.* FROM mascotas m
WHERE m.usuario_id = ?;
```

### Obtener usuario con sus mascotas
```sql
SELECT u.*, m.* FROM usuarios u
LEFT JOIN mascotas m ON u.id = m.usuario_id
WHERE u.id = ?;
```

### Estadísticas por especie
```sql
SELECT m.especie, COUNT(*) as total
FROM mascotas m
GROUP BY m.especie;
```

### Eliminar usuario y sus mascotas (CASCADE)
```sql
DELETE FROM usuarios WHERE id = ?;
-- Las mascotas se eliminan automáticamente
```

---

## Notas Técnicas

- **Motor**: InnoDB (soporte para foreign keys y transactions)
- **Charset**: UTF-8 (compatible con caracteres especiales)
- **Timestamps**: DATETIME(6) para precisión de microsegundos
- **Lazy Loading**: Las relaciones se cargan bajo demanda (optimización)
- **Soft Delete**: Actualmente no implementado (podrías agregar `deleted_at`)

---

## Expansión Futura (Opciones)

Si necesitas mejorar el modelo, considera:

1. **Tabla NOTAS_MEDICAS** (para registros veterinarios)
   - `id`, `mascota_id`, `veterinario_id`, `fecha`, `contenido`

2. **Tabla CITAS** (para agendar citas veterinarias)
   - `id`, `mascota_id`, `veterinario_id`, `fecha`, `estado`

3. **Tabla HISTORICO_CAMBIOS** (auditoría)
   - `id`, `usuario_id`, `tabla`, `accion`, `fecha`

4. **Campo `deleted_at`** en ambas tablas (soft delete)

