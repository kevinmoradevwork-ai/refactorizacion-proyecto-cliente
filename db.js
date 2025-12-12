/**
 * @file db.js
 * @description Conexión a Base de Datos MySQL.
 */
const mysql = require('mysql2/promise');
require('dotenv').config();

// Configuración leída del archivo .env
const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '',
    database: process.env.DB_NAME || 'mi_base_datos',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
};

let pool;

try {
    pool = mysql.createPool(dbConfig);
    console.log('🔌 Intentando conectar a la Base de Datos...');
} catch (error) {
    console.error('Error fatal al configurar DB:', error);
}

module.exports = pool;