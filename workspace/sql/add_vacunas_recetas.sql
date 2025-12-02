-- Script para agregar las tablas de Vacunas y Recetas al sistema PetControl

USE petcontrol_db;

-- Tabla de Vacunas
CREATE TABLE IF NOT EXISTS vacunas (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    mascota_id BIGINT NOT NULL,
    nombre_vacuna VARCHAR(255) NOT NULL,
    fecha_aplicacion DATE NOT NULL,
    proxima_dosis DATE,
    lote VARCHAR(255),
    veterinario_responsable VARCHAR(255),
    observaciones VARCHAR(500),
    fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (mascota_id) REFERENCES mascotas(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabla de Recetas Médicas
CREATE TABLE IF NOT EXISTS recetas (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    mascota_id BIGINT NOT NULL,
    diagnostico VARCHAR(255) NOT NULL,
    medicamentos VARCHAR(1000) NOT NULL,
    dosificacion VARCHAR(500),
    indicaciones VARCHAR(1000),
    veterinario VARCHAR(255) NOT NULL,
    fecha_emision DATETIME DEFAULT CURRENT_TIMESTAMP,
    dias_tratamiento INT,
    FOREIGN KEY (mascota_id) REFERENCES mascotas(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Índices para mejorar el rendimiento
CREATE INDEX idx_vacunas_mascota ON vacunas(mascota_id);
CREATE INDEX idx_vacunas_fecha ON vacunas(fecha_aplicacion);
CREATE INDEX idx_recetas_mascota ON recetas(mascota_id);
CREATE INDEX idx_recetas_fecha ON recetas(fecha_emision);

-- Verificar tablas creadas
SHOW TABLES;
