-- =============================================================
-- Script de inicialización de la base de datos de productos
-- Motor: MySQL
-- =============================================================

CREATE DATABASE IF NOT EXISTS `product_db`
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE `product_db`;

-- Tabla de productos
CREATE TABLE IF NOT EXISTS `products` (
  `id`          INT UNSIGNED    NOT NULL AUTO_INCREMENT,
  `name`        VARCHAR(255)    NOT NULL,
  `description` TEXT,
  `price`       DECIMAL(10, 2)  NOT NULL,
  `stock`       INT UNSIGNED    NOT NULL DEFAULT 0,
  `created_at`  TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at`  TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

