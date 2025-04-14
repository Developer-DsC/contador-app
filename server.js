const express = require('express');
const path = require('path');
const app = express();

// ⚠️ Cambia esto para apuntar a la carpeta correcta
const distFolder = path.join(__dirname, 'dist/contador-app/browser');

app.use(express.static(distFolder));

app.get('/*', (req, res) => {
    res.sendFile(path.join(distFolder, 'index.html'));
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Servidor ejecutándose en el puerto ${port}`);
});

app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] IP: ${req.ip} - URL: ${req.originalUrl}`);
    next();
});