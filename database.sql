-- Script de Inicialización de Base de Datos
-- Proyecto: Refactorización Sistema de Chat
-- Autor: [Tu Nombre o Usuario]

-- 1. Crear la base de datos si no existe
CREATE DATABASE IF NOT EXISTS mi_base_de_datos;
USE mi_base_de_datos;

-- 2. Estructura de tabla 'users'
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- (Opcional) Insertar un usuario de prueba
-- Nota: La contraseña es "123456" encriptada con Bcrypt
-- INSERT INTO users (username, email, password) VALUES 
-- ('Admin', 'admin@test.com', '$2b$10$P8.uS.p/..hash..generico..');