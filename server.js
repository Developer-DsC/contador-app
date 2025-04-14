const express = require('express');
const path = require('path');
const app = express();

// Middleware para registrar las IPs
app.use((req, res, next) => {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log(`Usuario accediendo desde la IP: ${ip}`);
    next(); // Asegúrate de llamar a 'next()' para que continúe la ejecución
});

app.use(express.static(path.join(__dirname, 'dist/contador-app')));

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/contador-app/index.html'));
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});