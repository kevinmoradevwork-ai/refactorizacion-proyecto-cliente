const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(express.json());

// Servir la app web
app.use(express.static(path.join(__dirname, 'public')));

// Ruta para OpenAI (el bot)
app.post('/api/chat', async (req, res) => {
    try {
        const { message } = req.body;

        const completion = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-4o-mini",
                messages: [{ role: "user", content: message }]
            })
        });

        const data = await completion.json();
        res.json({ reply: data.choices[0].message.content });

    } catch (error) {
        res.status(500).json({ error: "Error en el servidor" });
    }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor activo en http://localhost:${PORT}`));
