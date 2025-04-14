const express = require('express');
const path = require('path');
const app = express();

// Servir archivos estáticos de la carpeta dist/contador-app
app.use(express.static(path.join(__dirname, 'dist', 'contador-app')));

// Redirigir todas las solicitudes a index.html
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'contador-app', 'index.html'));
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});