//Rutas de Usuario
const express = require('express');
const router = express.Router();
const controller = require('../controllers/userController');

// Importar el controlador de usuario
router.get('/test', controller.testConnection); // Ruta de prueba para verificar la conexión a la base de datos
router.post('/users', controller.registerUser); // Ruta para registrar un nuevo usuario
router.get('/users/:id', controller.getUser); // Ruta para obtener un usuario por su ID
router.put('/users/:id', controller.updateUser); // Ruta para actualizar un usuario por su ID
router.delete('/users/:id', controller.deleteUser); // Ruta para eliminar un usuario por su ID

//Modulo de exportación
module.exports = router;




