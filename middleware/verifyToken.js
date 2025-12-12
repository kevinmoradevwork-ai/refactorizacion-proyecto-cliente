const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'clave_secreta_dev';

function verifyToken(req, res, next) {
    const auth = req.headers.authorization;
    if (!auth) return res.status(401).json({ error: 'Token requerido' });

    const token = auth.split(' ')[1];
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Token inválido' });
    }
}
module.exports = verifyToken;