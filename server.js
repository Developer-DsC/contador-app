const express = require('express');
const path = require('path');
const app = express();

// Middleware para registrar las IPs solo una vez por sesión
app.use((req, res, next) => {
    if (!req.session) {
        req.session = {}; // Asegúrate de que la sesión esté inicializada
    }
    if (!req.session.ip) {
        const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        console.log(`Usuario accediendo desde la IP: ${ip}`);
        req.session.ip = ip; // Guarda la IP en la sesión para evitar registros repetidos
    }
    next();
});

app.use(express.static(path.join(__dirname, 'dist/contador-app/browser')));

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/contador-app/browser/index.html'));
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});