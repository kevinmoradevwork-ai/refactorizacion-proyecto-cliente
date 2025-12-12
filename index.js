require('dotenv').config();
const express = require('express');
const cors = require('cors');
// Importamos la conexión (si db.js simula, no fallará)
const pool = require('./db');
// Importamos rutas
const authRoutes = require('./routes/auth');

const app = express();

app.use(cors());
app.use(express.json());

const path = require('path');

// Servir archivos estáticos (HTML, CSS, JS que estén en la raíz)
app.use(express.static(path.join(__dirname, '/')));

// Ruta principal: Enviar el Dashboard
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'prueba.html'));
});

// Rutas de autenticación
app.use('/auth', authRoutes);

// Ruta temporal de usuarios
app.get('/users', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT id, username, email FROM users');
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error de base de datos' });
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`✅ Servidor escuchando en el puerto ${port}`);
});