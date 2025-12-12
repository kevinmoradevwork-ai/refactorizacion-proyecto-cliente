/**
 * @file auth.js (Rutas)
 * @description Define los endpoints y delega la lógica al controlador.
 */
const express = require('express');
const router = express.Router();

// Importamos el "Cerebro" que acabamos de crear
const authController = require('../controllers/authController');

// --- Definición de Rutas ---

// POST /auth/register -> Ejecuta la función register del controlador
router.post('/register', authController.register);

// POST /auth/login -> Ejecuta la función login del controlador
router.post('/login', authController.login);

module.exports = router;