const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'dist/contador-app')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/contador-app/index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});