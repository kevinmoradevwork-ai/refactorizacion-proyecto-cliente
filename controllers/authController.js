/**
 * @file authController.js
 * @description Controlador que maneja la lógica de negocio para usuarios.
 * Recibe la petición, procesa los datos y devuelve la respuesta.
 */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../db'); // Importamos la conexión a la DB

const JWT_SECRET = process.env.JWT_SECRET || 'clave_secreta_dev';

// Lógica de REGISTRO
exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Validación básica
        if (!username || !email || !password) {
            return res.status(400).json({ error: 'Faltan datos obligatorios' });
        }

        // Encriptar contraseña
        const hashed = await bcrypt.hash(password, 10);

        // Guardar en Base de Datos
        const [result] = await pool.query(
            'INSERT INTO users (username, email, password) VALUES (?,?,?)',
            [username, email, hashed]
        );

        // Crear Token
        const user = { id: result.insertId, username, email };
        const token = jwt.sign(user, JWT_SECRET, { expiresIn: '7d' });

        res.status(201).json({
            message: 'Usuario registrado exitosamente',
            user,
            token
        });

    } catch (err) {
        console.error(err);
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ error: 'El email ya está registrado' });
        }
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Lógica de LOGIN
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Faltan datos' });
        }

        // Buscar usuario
        const [rows] = await pool.query('SELECT * FROM users WHERE email=? LIMIT 1', [email]);

        if (rows.length === 0) {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }

        const user = rows[0];

        // Verificar contraseña
        const ok = await bcrypt.compare(password, user.password);
        if (!ok) {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }

        // Generar Token
        const token = jwt.sign(
            { id: user.id, email: user.email },
            JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.json({
            message: 'Login exitoso',
            user: { id: user.id, username: user.username, email: user.email },
            token
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};