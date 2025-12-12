const express = require('express');
const router = express.Router();
const pool = require('../db') || require('./db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'cambia_esta_clave';

router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) return res.status(400).json({ error: 'missing fields' });
  try {
    const hashed = await bcrypt.hash(password, 10);
    const [result] = await pool.query('INSERT INTO users (username, email, password) VALUES (?,?,?)', [username, email, hashed]);
    const user = { id: result.insertId, username, email };
    const token = jwt.sign(user, JWT_SECRET, { expiresIn: '7d' });
    res.json({ user, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'db error' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'missing fields' });
  try {
    const [rows] = await pool.query('SELECT id, username, email, password FROM users WHERE email=? LIMIT 1', [email]);
    if (!rows || rows.length === 0) return res.status(401).json({ error: 'invalid credentials' });
    const user = rows[0];
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ error: 'invalid credentials' });
    const token = jwt.sign({ id: user.id, username: user.username, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ user: { id: user.id, username: user.username, email: user.email }, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'db error' });
  }
});

module.exports = router;
