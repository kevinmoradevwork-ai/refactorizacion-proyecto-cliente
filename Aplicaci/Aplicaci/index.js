/**
 * @file index.js
 * @description Punto de entrada principal del servidor API.
 * Configura los middleware, conecta la base de datos y define las rutas principales.
 */

// 1. Carga de Variables de Entorno
require('dotenv').config();

// 2. Importación de Librerías (Dependencias)
const express = require('express');
const cors = require('cors');

// 3. Importación de Módulos Locales
const pool = require('./db'); // Conexión a la Base de Datos
const authRoutes = require('./routes/auth'); // Rutas de autenticación

// 4. Inicialización de la App
const app = express();

// --- Middlewares Globales ---
// Permite solicitudes desde otros dominios (CORS)
app.use(cors());
// Permite recibir datos en formato JSON en el cuerpo de las peticiones
app.use(express.json());

// --- Definición de Rutas ---

// Ruta base para verificar estado del servidor
app.get('/', (req, res) => {
    res.send('Proyecto integrado - Servidor funcionando correctamente 🚀');
});

// Rutas de Autenticación (Login, Registro, etc.)
// Todas las rutas en authRoutes empezarán con /auth
app.use('/auth', authRoutes);

/**
 * GET /users
 * @description Obtiene lista de usuarios (ID, nombre, email).
 * NOTA: Esta ruta consulta directamente la DB. En el futuro, mover a un controlador.
 */
app.get('/users', async (req, res) => {
  try {
    // Usamos destructuración [rows] para obtener solo los datos de la respuesta
    const [rows] = await pool.query('SELECT id, username, email FROM users');
    res.json(rows);
  } catch (err) {
    console.error('[Error DB] Fallo al obtener usuarios:', err);
    res.status(500).json({ error: 'Error interno al consultar la base de datos' });
  }
});

// --- Arranque del Servidor ---
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`✅ Servidor escuchando en el puerto ${port}`);
});