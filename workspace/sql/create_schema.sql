-- Script: create_schema.sql
-- Crea la base de datos `petcontrol_db` y las tablas `usuarios` y `mascotas` según MODELO_ER.md

CREATE DATABASE IF NOT EXISTS `petcontrol_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `petcontrol_db`;

-- Tabla usuarios
CREATE TABLE IF NOT EXISTS `usuarios` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(255) NOT NULL,
  `fecha_creacion` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `nombre` VARCHAR(255),
  `password` VARCHAR(255) NOT NULL,
  `rol` ENUM('CLIENTE','VETERINARIO','ADMIN') NOT NULL DEFAULT 'CLIENTE',
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla mascotas
CREATE TABLE IF NOT EXISTS `mascotas` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `descripcion` VARCHAR(1000),
  `edad` INT,
  `especie` VARCHAR(255) NOT NULL,
  `fecha_actualizacion` DATETIME(6) NULL,
  `fecha_creacion` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `imagen` VARCHAR(255),
  `nombre` VARCHAR(255) NOT NULL,
  `raza` VARCHAR(255),
  `usuario_id` BIGINT NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_usuario_idx` (`usuario_id`),
  CONSTRAINT `FK_usuario` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Opcional: crear algunos índices adicionales
CREATE INDEX IF NOT EXISTS `IDX_mascotas_especie` ON `mascotas` (`especie`);

-- Fin del script
