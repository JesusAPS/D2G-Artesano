//Archivo principal del backend

// Importar las dependencias necesarias
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');

// Crear una instancia de la aplicación Express
const app = express();
const port = process.env.PORT || 3000;

// Middleware para manejar CORS
app.use(cors());
// Middleware para parsear el cuerpo de las solicitudes como JSON
app.use(express.json());
// Rutas para el manejo de usuarios
app.use('/api', userRoutes);

// Ruta de prueba para verificar que el servidor está funcionando
app.use('/', (req, res, next) => {
    console.error(err.stack);
    res.status(500).json({error: 'Algo Salió Mal!'});// Ruta de error genérica
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});

