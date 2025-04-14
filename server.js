const express = require('express');
const path = require('path');
const app = express();

// Middleware para registrar las IPs
app.use((req, res, next) => {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log(`Usuario accediendo desde la IP: ${ip}`);
    next(); // Asegúrate de llamar a 'next()' para que continúe la ejecución
});

// Configura Express para servir archivos estáticos
app.use(express.static(path.join(__dirname, 'dist/contador-app/browser')));

// Define la ruta para todas las demás peticiones
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/contador-app/browser/index.html'));
});

// Inicia el servidor en el puerto especificado
const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});